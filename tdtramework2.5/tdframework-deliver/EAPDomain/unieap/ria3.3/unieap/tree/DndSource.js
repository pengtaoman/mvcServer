dojo.provide("unieap.tree.DndSource");
dojo.require("unieap.tree.Tree");
dojo.require("dojo.dnd.Manager");
dojo.require("unieap.tree.DndSelector")
dojo.declare("unieap.tree.DndSource",unieap.tree.DndSelector,{
	 /**
	 * @declaredClass:
	 * 		unieap.tree.DndSource
	 * @summary:
	 * 		拖拽源针对树的实现，树拖拽功能的实现类
	 * @classDescription:
	 *      支持一次拖拽一个节点且非懒加载树的情况
	 *      通过重写特定方法，可以将其他节点拖拽到树上
	 * @example:
	 * |<div dojoType="unieap.tree.Tree" 
	 * |	id="lazyTree1"  label="UniEAP" 
	 * |	treeDnd="{isSource:true,dragThreshold:8}" 
	 * |	binding = "{'leaf':'leaf','store':'treeStoreForLazyLoad',
	 * |			'parent':'parentID',query:{name:'parentID',relation:'=',value:''}}" >
	 * |</div>
	 */
	
	/**
	 * @summary:
	 *        设置是否为拖拽源
	 * @type
	 *         {boolean}
	 * @default:
	 *        true
	 * @description:
	 *      设置是否是拖拽源，默认为true，即可以在树上选择节点进行拖拽
	 *      如果设置为false的话，对应的树的节点不能进行拖拽，只能接受拖拽进来的节点      
	 */
	isSource: true,

   	/**
	 * @summary:
	 *        设置开始拖拽的灵敏度
	 * @type
	 *         {number}
	 * @default:
	 *        2
	 * @description:
	 *       设置在一个节点上点击下鼠标并移动多大位置时开始拖拽状态。
	 *       默认值为2，即在一个节点上点击下鼠标并开始移动2个像素时，进入拖拽状态。
	 *       若需要在点击下鼠标，并鼠标移动一定位置再进入拖拽状态时，可将此值设为一个大于零的整数，即鼠标移动该单位px后进入拖拽状态。
	 *         
	 */
	dragThreshold: 2,

   /**
	 * @summary:
	 *        设置何时将被拖拽节点置于目标节点的前后
	 * @type
	 *         {number}
	 * @default:
	 *        2
	 * @description:
	 *        在进行拖拽时，当鼠标的位置在目标节点前后的距离在该值以内，则会将被拖拽节点置于目标节点的前后
	 *        若此值被设为0，则不允许往目标节点的前后放置节点。    
	 */
	betweenThreshold: 2,

	constructor: function(params){
		if(!params){ params = {}; }
		dojo.mixin(this, params);
		this.isSource = typeof params.isSource == "undefined" ? true : params.isSource;
		this.isDragging = false;
		this.mouseDown = false;
		this.targetAnchor = null;	
		this.targetAnchorId = null;
		this.targetBox = null;	
		this.dropPosition = "";	
		this._lastX = 0;
		this._lastY = 0;
		this.sourceState  = "";
		if(this.isSource){
			dojo.addClass(this.node, "dojoDndSource");
		}
		this.targetState  = "";
		dojo.addClass(this.node, "dojoDndTarget");
		this.topics = [
			dojo.subscribe("/dnd/source/over", this, "onDndSourceOver"),
			dojo.subscribe("/dnd/start",  this, "onDndStart"),
			dojo.subscribe("/dnd/drop",   this, "onDndDrop"),
			dojo.subscribe("/dnd/cancel", this, "onDndCancel")
		];
		this.events.push(
			dojo.connect(this.node, "onmousemove", this, "onMouseMove")
		);
	},

	/**
	 * @summary:
	 *      判断参数拖拽源的内容是否能够拖入本拖拽源
	 * @param {unieap.tree.DndSource} source
	 * @param {array} nodes
	 * @return
	 *     {boolean}
	 * @description:
	 *     当拖拽开始或者从另一个拖拽源拖动节点到本拖拽源时会触发该方法，用户可以重写该方法
	 *     如果规定本拖拽源的树不能在一棵树内部进行拖拽，需要将返回值设为false；若本拖拽源不接受特定拖拽源的节点，也可以重写该方法，设置逻辑，确定返回值
	 *     默认返回值为true
	 * @example:
	 * |function canDrop(source,nodes){ 
	 * |	return false; 
	 * |} 
	 * |<div dojoType="unieap.tree.Tree" 
	 * |	id="lazyTree2"  label="UniEAP" 
	 * |	treeDnd="{checkAcceptance:canDrop}" 
	 * |	binding = "{'leaf':'leaf','store':'treeStoreForLazyLoad', 'parent':'parentID',
	 * |			'query':{name:'parentID',relation:'=',value:''}}" >
	 * |</div>
	 */
	checkAcceptance: function(source, nodes){
		return true;	
	},
    
	//dojo拖拽框架内部使用的方法，此时返回false
	copyState: function(keyPressed){
		return false;	
	},
	
	//销毁时调用的函数，解除对事件的绑定
	destroy: function(){
		this.inherited("destroy",arguments);
		dojo.forEach(this.topics, dojo.unsubscribe);
		this.targetAnchor = null;
	},

   //处于拖拽过程中的时候，对mousemove和mouseover时的辅助处理，确定拖拽相关的目标节点以及是否可以将要拖拽的节点放到目标节点的适当位置
	_onDragMouse: function(e){
		    var m = dojo.dnd.manager(),
			oldTarget = this.targetAnchor,			//鼠标在移动的过程中的上一节点（dom）
			newTarget = this.current,				// 鼠标在移动的过程中的当前节点（dom）
			oldDropPosition = this.dropPosition,     //上一次要落入节点的位置    
			oldTargetId = this.targetAnchorId
			newTargetId = this.currentId;	
			var oldNode =  this.tree.getNodeById(oldTargetId);//原目标节点的TreeNode对象
			var  newNode = this.tree.getNodeById(newTargetId);//新目标节点的TreeNode对象
		//判断要将节点放到节点的什么位置，可以为“before”、“after”和“over”
		   var newDropPosition = "Over";
		   //允许“before”和“after”
		   if(newTarget && this.betweenThreshold > 0){
			if(!this.targetBox || oldTarget != newTarget){
				this.targetBox = {
					xy: dojo.coords(newTarget, true),
					w: newTarget.offsetWidth,
					h: newTarget.offsetHeight
				};
			}
			if((e.pageY - this.targetBox.xy.y) <= this.betweenThreshold){
				newDropPosition = "Before";
			}else if((e.pageY - this.targetBox.xy.y) >= (this.targetBox.h - this.betweenThreshold)){
				newDropPosition = "After";
			}
		}
		//设置样式
		if(newTarget != oldTarget || newDropPosition != oldDropPosition){
			if(oldTarget){
				this._removeItemClass(oldTarget, oldDropPosition);
			}
			if(newTarget){
				this._addItemClass(newTarget, newDropPosition);
			}
			//判断是否可以拖拽到目标节点的指定位置 
			
			//在同一棵树上进行拖拽操作时，不允许拖拽节点到其子孙节点上
			var flag = false;
			if(m.source == this){
				//得到正在拖拽的节点
				var selectedNode = [];
				for(var id in this.selection){
				  selectedNode.push(id)
				}
				var draggingNode =  this.tree.getNodeById(selectedNode[0]);
				//目标节点
			    var p = newNode;
			    while(p){
				  if(p.domNode==draggingNode.domNode){
			               flag = true;
			               break;
			       }
			         p = p.getParent()
				}
			}
				
			if(!newTarget){
				m.canDrop(false);
			}else if(newNode.isRoot() && newDropPosition != "Over"){
				// 不能拖拽到与根结点同级的位置
				m.canDrop(false);
			}else if(m.source == this && ((newTargetId in this.selection)||flag)){
				//不能拖拽到本身上，不能拖到所有子节点上的判断
				m.canDrop(false);
			}else if(this.checkItemAcceptance(newNode, m.source, newDropPosition.toLowerCase())){
				m.canDrop(true);
			}else{
				m.canDrop(false);
			}
			this.targetAnchor = newTarget;
			this.targetAnchorId = newTargetId;
			this.dropPosition = newDropPosition;
		}
	},

	onMouseMove: function(e){
		if(this.isDragging && this.targetState == "Disabled"){ return; }
		var m = dojo.dnd.manager();
		if(this.isDragging){
			if(this.betweenThreshold > 0){
				this._onDragMouse(e);
			}
		}else{
			if(this.mouseDown && this.isSource &&
			   (Math.abs(e.pageX-this._lastX)>=this.dragThreshold || Math.abs(e.pageY-this._lastY)>=this.dragThreshold)){
				var n = this.getSelectedNodes();
				var nodes=[];
				for (var i in n){
					nodes.push(n[i]);
				}
				if(nodes.length){
					//RIA树拖拽不支持节点复制,只支持移动
					//dojo1.4中dojo.dnd.getCopyKeyState改为dojo.isCopyKey
					//不过这里根本就不需要传入参数,this.copyState直接返回false
					//m.startDrag(this, nodes, this.copyState(dojo.dnd.getCopyKeyState(e)));
					m.startDrag(this, nodes, this.copyState());
				}
			}
		}
	},

	onMouseDown: function(e){
		if(this.widget._editing){
			var currentNode = this.widget.getCurrentNode();
		    if(currentNode)
		       var id = this.widget.getBinding().getId(currentNode.getItem());
		    var eventNode = this.widget._getTreeDomNodeByEvent(e);
		    if(eventNode)
		      var eventId = this.widget.getBinding().getId(this.widget.getNodeByDom(eventNode).getItem());
		    if(id!=eventId){
			  unieap.blurWidget();
		    }else if(id==eventId){
			  return;
		    }
		}
		this.mouseDown = true;
		this.mouseButton = e.button;
		this._lastX = e.pageX;
		this._lastY = e.pageY;
		this.inherited("onMouseDown",arguments);
	},

	onMouseUp: function(e){
		if(this.mouseDown){
			this.mouseDown = false;
			this.inherited("onMouseUp",arguments);
		}
	},

	onMouseOver: function( widget, e){
		this.inherited(arguments);
		if(this.isDragging){
			this._onDragMouse(e);
		}
	},

	onMouseOut: function(){
		this.inherited(arguments);
		this._unmarkTargetAnchor();
	},

   	/**
	 * @summary:
	 *      判断参数拖拽源的内容是否能够置于目标节点的指定位置
	 * @param    {unieap.tree.TreeNode}  target
	 * @param {unieap.tree.DndSource} source
	 * @param {string} position
	 * @return
	 *     {boolean}
	 * @description:
	 *     当拖拽着节点在其他节点上移动时，会调用该方法确定是否可以将目标节点置于指定位置，默认返回值为true
	 *     用户如果有特殊的业务逻辑要进行必要的判断，可以重写该方法
	 * @example:
	 * |function canDrop(target,source,position){ 
	 * |	if(target.getItem().data["id"]=="1001"){ 
	 * |		//被拖拽的节点不允许放在目标树中id='1001'的节点上 
	 * |		return false; 
	 * |	} 
	 * |	return true; 
	 * |}
	 * |<div dojoType="unieap.tree.Tree" id="lazyTree1" id="lazyTree1" label="UniEAP" 
	 * |	treeDnd="{checkItemAcceptance :canDrop}" 
	 * |	binding = "{'leaf':'leaf','store':'treeStoreForLazyLoad',
	 * |			'parent':'parentID','query':{name:'parentID',relation:'=',value:''}}" >
	 * |</div>
	 */
	checkItemAcceptance: function(target, source, position){
		return true;	
	},
	
	onDndSourceOver: function(source){
		if(this != source){
			this.mouseDown = false;
			this._unmarkTargetAnchor();
		}else if(this.isDragging){
			var m = dojo.dnd.manager();
			m.canDrop(false);
		}
	},
	
	onDndStart: function(source, nodes, copy){
		if(this.isSource){
			this._changeState("Source", this == source ? (copy ? "Copied" : "Moved") : "");
		}
		var accepted = this.checkAcceptance(source, nodes);
		this._changeState("Target", accepted ? "" : "Disabled");
		if(accepted){
			dojo.dnd.manager().overSource(this);
		}
		this.isDragging = true;
	},
	
	/**
	 * @summary:
	 *        两个树之间拖拽或从其他源拖拽节点到当前树上，创建新节点的item
	 * @param {array} nodes  为domNode的数组
	 * @param {unieap.tree.DndSource} source  其他树的拖拽源或其他可拖拽的源
	 * @param {unieap.tree.TreeNode} target   目标节点
	 * @description:
	 *       已提供了从另外的树上拖拽节点到当前树的操作，若从其他拖拽源拖拽节点到本树需要重写该方法，已构成新生成节点的item
	 * @example: 
	 * |function createTreeNode(nodes,source,target){ 
	 * |	//用户自定义如何创建树节点对应的数据 
	 * |} 
	 * |<div dojoType="unieap.tree.Tree" 
	 * |	id="lazyTree2"  label="UniEAP" 
	 * |	treeDnd="{}" 
	 * |	binding = "{'leaf':'leaf','store':'treeStoreForLazyLoad',
	 * |			'parent':'parentID', query:{name:'parentID',relation:'=',value:''}}" > 
	 * |</div> 
     * |<div dojoType="unieap.tree.Tree" id="lazyTree1"  label="UniEAP" 
     * |	treeDnd="{itemCreator:createTreeNode}" 
     * |	binding = "{'leaf':'leaf','store':'treeStoreForLazyLoad',
     * |			'parent':'parentID','query':{name:'parentID',relation:'=',value:''}}" >
     * |</div>
     * //以上为两棵树之间拖拽时，自定义节点item的实现
	 */
	itemCreator: function(nodes,source,target){
		var  allchildren = [];
		if (source.tree) {
			for(var i =0;i<nodes.length;i++){
				 var sourceTree = source.tree;
		         var treeNode =  source.getTreeNodeDom(nodes[i]);
		         var childTreeNode = this.tree.getNodeByDom(treeNode),
			     childItem = childTreeNode.getItem(),
			     oldParentItem = childTreeNode.getParent().getItem();
				 var childrenItems = source.tree.getBinding().getChildrenItems(childItem);
				 allchildren.push(childrenItems);
			}
		}else {
            for(var i =0;i<nodes.length;i++){
			   var  item = {"id": nodes[i].id,"label": nodes[i].textContent || nodes[i].innerText || ""};
			   allchildren.push(item)
		    }
		}
		return  allchildren;
	},

	onDndDrop: function(source, nodes, copy){
		if(this.containerState == "Over"){
			var tree = this.tree,target = this.targetAnchor;	
			this.isDragging = false;
			var targetWidget = this.tree.getNodeById(this.targetAnchorId);
			if(!targetWidget)  {
				this.onDndCancel();
				return;
			}
			var newParentItem;
			var insertIndex;
			var newParentDomNode = targetWidget.domNode;
			if(this.dropPosition == "Before" || this.dropPosition == "After"){
				newParentItem = (targetWidget.getParent() && targetWidget.getParent().getItem());
				newParentDomNode = (targetWidget.getParent() && targetWidget.getParent().getDomNode());
				insertIndex = targetWidget.getPosition();
				if(this.dropPosition == "After"){
					insertIndex =insertIndex + 1;
				}
			}else{
				newParentItem  = targetWidget.getItem();
			}
			var newItemsParams;
			//当拖拽的源不是当前树的话，需要调用itemCreator来构建新建节点的item，用户可自定义该方法
			if(source != this){
				newItemsParams = this.itemCreator(nodes,source,targetWidget);
			}
			dojo.forEach(nodes, function(node, idx){
				if(source == this){
					//一棵树之间的拖拽
					var treeNode =  this.getTreeNodeDom(node);
					var childTreeNode = this.tree.getNodeByDom(treeNode),
					childItem = childTreeNode.getItem(),
					oldParentItem = childTreeNode.getParent().getItem();
					if(typeof insertIndex == "number"){
						//同一父节点下的节点拖拽，且想将要拖拽的节点拖到父节点的最后一个节点的位置
						if(newParentItem == oldParentItem && childTreeNode.getPosition() < insertIndex){
							insertIndex -= 1;
						}
					}
					this.tree.getBinding().pasteItem(childItem,oldParentItem,newParentItem,insertIndex);
					this.tree.deleteNode(childTreeNode,false);
					this.tree._addChildren(childItem,newParentDomNode,insertIndex);
				}else{
					//拖拽的节点来源于其他树或其他可支持拖拽的源
					if(source.tree){
						//来源于其他的树，将原来树上的节点删除
						var treeNode =  source.getTreeNodeDom(node);
					    var childTreeNode = source.tree.getNodeByDom(treeNode);
						source.tree.deleteNode(childTreeNode,true);
						var parentItem = [];
						for(var i=0;i<newItemsParams.length;i++){
							for (var j = 0; j < newItemsParams[i].length; j++) {
								if(j==0){
									var item = this.tree.getBinding().addItemForDnd(newItemsParams[i][j], newParentItem,true);
									parentItem.push(item);
								}else{
									this.tree.getBinding().addItemForDnd(newItemsParams[i][j], newParentItem);
								}
							}
						}
						for (var i = 0; i < parentItem.length; i++) {
							this.tree.getBinding().refresh(parentItem[i]);
							this.tree._addChildren(parentItem[i], newParentDomNode, insertIndex);
							
						}
					}else{
						//来源于其他可支持拖拽的源，暂不实现
					}
				}
			}, this);
			this.tree._expandNode(targetWidget.getDomNode());
		}
		this.onAfterDrop(source, nodes);
		this.onDndCancel();
	},
	
	//拖拽取消的处理
	onDndCancel: function(){
		this.selectNone();
		this._unmarkTargetAnchor();
		this.isDragging = false;
		this.mouseDown = false;
		delete this.mouseButton;
		this._changeState("Source", "");
		this._changeState("Target", "");
	},
	
	// When focus moves in/out of the entire Tree
	onOverEvent: function(){
		this.inherited(arguments);
		dojo.dnd.manager().overSource(this);
	},
	onOutEvent: function(){
		this._unmarkTargetAnchor();
		var m = dojo.dnd.manager();
		if(this.isDragging){
			m.canDrop(false);
		}
		m.outSource(this);

		this.inherited(arguments);
	},

	_unmarkTargetAnchor: function(){
		if(!this.targetAnchor){ return; }
		this._removeItemClass(this.targetAnchor, this.dropPosition);
		this.targetAnchor = null;
		this.targetBox = null;
		this.dropPosition = null;
	},

	_markDndStatus: function(copy){
		this._changeState("Source", copy ? "Copied" : "Moved");
	},
	
    getTreeNodeDom: function(node){
		if(!node)  
		      return null;
        for (var p = node; p; p = p.parentNode) {
            var treeDomNode = null;
            var flag = p.getAttribute && p.getAttribute("isTreeNode");
            if (flag) {
                treeDomNode = p;
                break;
            }
        }
        return treeDomNode;
    },
	
	
	onAfterDrop: function(source, nodes){
	}
	
});
