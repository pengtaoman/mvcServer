dojo.provide("unieap.tree.CheckLogic");
dojo.require("unieap.tree.Tree");
dojo.declare("unieap.tree.CheckLogic",null,{
	 /**
	 * @declaredClass:
	 * 		unieap.tree.CheckLogic
	 * @summary:
	 * 		树对复选功能的支持实现类
	 * @classDescription:
	 *      支持多种复选逻辑
	 *      能够按照指定的复选逻辑得到所有选中的Item对象（若数据未加载的话，将会加载需要的数据）
	 * @example:
	 * |<div dojoType="unieap.tree.Tree" 
	 * |	${1}checkLogic="{model:'cascade',showRootCheckbox:true}" 
	 * |	id="lazyTree2" label="UniEAP" 
	 * |	loader="{'getLocalData':doGetLocalData}" 
	 * |	binding = "{'leaf':'isLeaf','label':'title','id':'treeId',
	 * |		'rootNodeId':'','parent':'parentID',query:{name:'parentID',relation:'=',value:''}}" > 
	 * |</div>
	 * ${1}设置树支持复选
	 */
     
	/**
	 * @summary:
	 *      指定树的复选逻辑
	 * @enum: 
	 *     {'multiple'|'cascade'|'parentCascade'|'childCascade'|'single'|'halfChecked'}
	 * @default:
	 * 		multiple
	 * @type:
	 * 		{string} 
	 * @description:
     *     定义树节点的复选逻辑，具体如下：
     *         multiple为可多选且没有复选逻辑
     *         cascade关联所有的父子节点
     *         parentCascade关联所有父节点
     *         childCascade关联所有子节点
     *         single只能选择一个节点
     *         halfChecked当某节点的子节点未完全选中时，该节点处于半选状态
     *     值得注意的是，程序若需要将一些节点设为readonly或disabled，此时树只支持multiple模式的复选逻辑。
	 */
	 model : "multiple",
	 
	 /**
	 * @summary:
	 *       是否显示根结点的复选框
	 * @type:
	 * 		{boolean}  
	 * @default:
	 * 		false
	 * @description:
     *     是否显示根结点的复选框，默认不显示。若显示该复选框，点击会选中或非选中所有节点。
     *     此时应保证树上不会有节点处于readonly或disabled状态。
	 */
	 showRootCheckbox : false,
	 
	 //选中的item
	 _selectedItems : null,
	 
	 //
	 _isSelectAll : false,
	 
	 constructor: function(params){
        dojo.mixin(this, params);
		if(this.model=="multiple"){
			this.checkLogic = dojo.hitch(this,this._checkOfMultiple);
		}
		else if(this.model=="cascade"){
			this.checkLogic = dojo.hitch(this,this._checkOfCascade);
		}
		else if(this.model=="parentCascade"){
			this.checkLogic = dojo.hitch(this,this._checkOfParentCascade);
		}
		else if(this.model=="childCascade"){
			this.checkLogic = dojo.hitch(this,this._checkOfChildCascade);
		}
		else if(this.model=="single"){
			this.checkLogic = dojo.hitch(this,this._checkOfSingle);
		}
		else if(this.model=="halfChecked"){
			this.checkLogic = dojo.hitch(this,this._checkOfHalfChecked);
		}
		else{
			this.checkLogic = dojo.hitch(this,this._checkOfMultiple);
		}
		this._selectedItems = {};
    },
	
	//没有复选逻辑的操作
	_checkOfMultiple : function(){
		return;
	},
	
	//关联父子节点的操作
	_checkOfCascade : function(node,checked){
		this._checkOfChildCascade(node,checked);
		this._checkOfParentCascade(node,checked);
	},
	
	//关联父节点的操作
	_checkOfParentCascade : function(node,checked){
		var logic = "ParentCascade";
		var p = node.getParent();
		//选中节点对应的逻辑
		if (checked) {
			if (p && !p.isRoot()&&p.isChecked()!=true) 
				this.setChecked(p, checked,logic);
		}
		//取消选中节点对应的逻辑
	    else{
		        while(p!=null&&!p.isRoot()) {
		          var checkedChildsLength = 0;
		          var children = this.widget.getChildrenByDom(p.domNode);
		          if(children&&children.length>0){
			          dojo.forEach(children,function(child){
			              if(child.associatedData.isChecked){
			                 checkedChildsLength++;
			              }
			          });
			         if(checkedChildsLength>0&&!p.isChecked()){
			            this.setChecked(p,true,logic);
			         }else if(checkedChildsLength==0){
			            this.setChecked(p,false,logic);
			         }
		          }
		       p = p.getParent();
		      }		
		}
	},
	
	//关联子节点的操作
	_checkOfChildCascade :function(node,checked){
		var logic = "ChildCascade";
		if (node.domNode.associatedData.state == "LOADED") {
			var children = this.widget.getChildrenByDom(node.domNode);
			var _this = this;
			if (children && children.length > 0) {
				dojo.forEach(children, function(child){
					var tempTreeNode  = _this.widget.getNodeByDom(child);
					_this.setChecked(tempTreeNode, checked,logic);
				});
			}
		}
		else if(node.getItem().loaded){
			this.setItemChildrenChecked(node.getItem(),checked);
		}
		else 
			return;
	},

    //只能选择一个节点的操作
   _checkOfSingle : function(node,checked){
   	var _this = this;
   	  if (checked) {
	  	for (var item in this._selectedItems) {
	  		if (_this._selectedItems[item].domNode != node.domNode) {
				var tempTreeNode  = _this.widget.getNodeByDom(_this._selectedItems[item].domNode);
	  			_this.setChecked(tempTreeNode, false, "Multiple");
	  		}
	  	}
	  }
   },
   
   //半选逻辑的操作
   _checkOfHalfChecked : function(node,checked){
   	    this._checkOfChildCascade(node,checked);
		var p = node.getParent();
   	    while(p!=null&&!p.isRoot()) {
		          var fullCheckedChildsLength = 0;
		          var halfCheckedChildsLength = 0;
		          var children = this.widget.getChildrenByDom(p.domNode);
				  var _this = this;
		          if(children&&children.length>0){
			          dojo.forEach(children,function(child){
			              if(_this.widget.getBinding().isSelected(child.associatedData.item)){
			                 fullCheckedChildsLength++;
			              }else if(child.associatedData.isChecked){
			                halfCheckedChildsLength++
			              }
			          });
                     if((fullCheckedChildsLength>0&&fullCheckedChildsLength<children.length)||halfCheckedChildsLength>0){
					 	if(this.widget.getBinding().isSelected(p.getItem())){
							this.setItemSelected(p.getItem(),false);
						}
			            p.domNode.associatedData.isChecked  = true;
				        this._setHalfCheckedClass(p.domNode);
			         }else	 if(fullCheckedChildsLength==children.length){
			            this.setChecked(p,true,"Multiple");
			         }else{
			            this.setChecked(p,false,"Multiple");
			         }
		          }
		       p = p.getParent();
		      }		
   },
   
   //选中所有节点，要求树上不存在readonly或disabled的节点
   selectAll : function(checked){
   	  if(this.model=="single")
	     return;
   	  var rootNode = this.widget.getRootNode();
	  this._isSelectAll = checked;
   	  this._checkOfChildCascade(rootNode,checked);
   },
   
	//将节点设置为选中或非选中状态，并根据复选逻辑，确定相关父子节点的复选状态。
	//通过树的setChecked方法调用，用户直接调用树的方法即可
	setChecked : function(node,checked,logic,evt){
		if(checked){
			var flag = this.onBeforeChecked(node);
			 if (flag === false) {
                return;
             }
		}else{
			var flag = this.onBeforeUnChecked(node);
			 if (flag === false) {
                  return;
             }
		}
		if(checked){
			this._setCheckedClass(node.domNode);
		}else{
			this._setUnCheckedClass(node.domNode);
		}
		node.domNode.associatedData.isChecked = checked;
		if(node.isRoot()){
			this.selectAll(checked);
		}else{
			this.setItemSelected(node.getItem(),checked);
		    if(logic){
			  this["_checkOf" + logic](node,checked);
		    }else{
				this.checkLogic(node,checked);
			}
		}	
		if(checked){
			 if(evt){
				 this.onHandleChecked(node);
			 }
			var flag = this.onChecked(node);
			 if (flag === false) {
				 return;
             }
			 this.onAfterChecked(node);
		}else{
			 if(evt){
				 this.onHandleUnChecked(node);
			 }
			var flag = this.onUnChecked(node);
			 if (flag === false) {
				 return;
             }
			  this.onAfterUnChecked(node);
		}
	},
	
	//设置为选中的样式
	 _setCheckedClass : function(domNode){
	 	this.widget.getCheckboxNode(domNode).className = "dijitCheckBox dijitCheckBoxChecked";
	 },
	 
	 	//设置为非选中的样式
	  _setUnCheckedClass : function(domNode){
	 	this.widget.getCheckboxNode(domNode).className = "dijitCheckBox";
	 },
	 
	 	//设置为半选的样式
	  _setHalfCheckedClass : function(domNode){
	 	this.widget.getCheckboxNode(domNode).className = "dijitCheckBox dijitCheckBoxCheckedDisabled";
	 },
	 
	 //判断是否显示根结点的复选框
	 isShowRootCheckbox : function(){
	 	return this.showRootCheckbox;
	 },
	
	//对新生成的节点设置是否选中
	 setCheckedForNewNode : function(node){
	 	if(this._isSelectAll||this.model =="cascade"||this.model =="childCascade"||this.model =="halfChecked"||this.widget.getBinding().isSelected(node.getItem())){
			this.setChecked(node,true,"Multiple");
		}
	 },
	 
	 /**
	  * @summary:
	  *         得到所有选中的item对象，并执行回调函数
	  * @param {function} callback
	  * @description:
	  *      若数据尚未加载，而复选逻辑是关联子节点或者半选的话，将会将关联的所有数据取出，构成一个数组，作为参数执行回调函数
	  *      若没有选中的数据，则会将null作为回调函数的参数
	  *      与树的getSelectedNodes方法的不同之处：树的getSelectedNodes只会将已经生成的且被选中的树节点返回
	  *  @example:
	  *  |tree.getCheckLogic().getSelectedItems(function(items){unieap.debug(items)})
	  * @img:
	  *      images/tree/getSelectedItems.png   
	  */
	 getSelectedItems : function(callback){
	 	if (this._isSelectAll||this.model == "cascade" || this.model == "childCascade" || this.model == "halfChecked") {
			this.arr = [];
			for (var item in this._selectedItems) {
				Array.prototype.push.call(this.arr, this._selectedItems[item]);
			}
			if (this.arr.length > 0) 
				this.loadItemChildren(this.arr[0], callback);
			else{
				callback(null);
			}
		}
		else{
			var selctedItemArray=[];
			for (var item in this._selectedItems) {
				Array.prototype.push.call(selctedItemArray, this._selectedItems[item]);
			}
			callback(selctedItemArray);
		}
	 } ,
	 
	 //getSelectedItems的辅助方法
	 loadItemChildren : function(item,callback){
	 	var onComplete = dojo.hitch(this,function(items){
			this.arr.shift();
//			if (items&&items.length > 0) {
//				for (var i = 0; i < items.length; i++) {
//						Array.prototype.push.call(this.arr, items[i]);
//						this.setItemSelected(items[i],true)	
//				}
//			}
			if (items&&items.length > 0) {
				for (var i = 0; i < items.length; i++) {
						var node = this.widget.getNodeByItem(items[i]);
						if(node){
							if(node.isChecked()){
								Array.prototype.push.call(this.arr, items[i]);
								this.setItemSelected(items[i],true)	
							}
						}else{
							Array.prototype.push.call(this.arr, items[i]);
							this.setItemSelected(items[i],true)	
						}
				}
			}
			if(this.arr.length>0){
				 this.loadItemChildren(this.arr[0],callback);
			}
			else{
				var selctedItemArray=[];
			    for (var item in this._selectedItems) {
				    Array.prototype.push.call(selctedItemArray, this._selectedItems[item]);
			     }
			    callback(selctedItemArray);
				return;
			}
		})
		//如果数据已经加载过，已经将其子节点对应的数据置于数组中了
//		if(item.loaded == true){
//			this.arr.shift();
//			if(this.arr.length>0){
//				 this.loadItemChildren(this.arr[0],callback);
//			}
//			else{
//				var selctedItemArray=[];
//			    for (var item in this._selectedItems) {
//				    Array.prototype.push.call(selctedItemArray, this._selectedItems[item]);
//			     }
//			    callback(selctedItemArray);
//				return;
//			}
//		}
//	 	else
		    this.widget.loadNodeData(item,onComplete);
	 }
,
	 
	//将item设置为选中或非选中状态
	 setItemSelected : function(item,checked){
	 	if (checked) {
			this._selectedItems[this.widget.getBinding().getId(item)] = item;
		}
		else{
			delete this._selectedItems[this.widget.getBinding().getId(item)];
		}
		 this.widget.getBinding().setSelected(item, checked);
	 },
	 
	 //通过递归调用将所有子数据对象设为选中状态，在关联所有子节点的逻辑下会用到的内部方法
	 setItemChildrenChecked : function(item, checked){
	 	this.setItemSelected(item, checked);
	 	if(item.loaded&&item.children){
			for(var i=0;i<item.children.length;i++){
				this.setItemChildrenChecked(item.children[i],checked);
			}
		}
	 },
	 
	 /**
	  * @summary:
	  *       若树的复选逻辑为“halfChecked”，将指定节点设为半选状态
	  * @param {unieap.tree.TreeNode}   node
	  * @description:
	  *     主要用于以下场景，在初始化的时候，若需要根据指定数据将某些节点设为半选可以调用此方法。
	  *     节点在半选的时候，数据不会选中，只是节点处于一种特殊的样式
	  * @example:
	  * |function setHalf(node){ 
	  * |	unieap.byId("unieapTree").getCheckLogic().setHalfChecked(node);
	  * |} 
	  */
	 setHalfChecked : function(node){
	 	if(this.model!="halfChecked"){
			return;
		}
	 	if(this.widget.getBinding().isSelected(node.getItem())){
			this.setItemSelected(node.getItem(),false);
	    }
	    node.domNode.associatedData.isChecked  = true;
	    this._setHalfCheckedClass(node.domNode);
	 },
	 
	 /**
	  * @summary:
	  *       在节点被选中之前进行调用的监听
	  * @param {unieap.tree.TreeNode}   node
	  * @return 
	  *      {boolean}
	  * @description:
	  *     若返回为false，将不会执行后续的UI和数据操作
	  * @example:
	  * |function beforeChecked(node){ 
	  * |	return confirm("确定要选中树节点"+node.getLabel()+"么？"); 
	  * |} 
	  * |<div dojoType="unieap.tree.Tree" id="basicTree"  animate="false" label="UniEAP" 
	  * |	checkLogic="{onBeforeChecked:beforeChecked}" 
	  * |	binding = "{'leaf':'leaf', 'store':treeStorePart,
	  * |			'parent':'parentID', query:{name:'parentID',relation:'=',value:''}}">
	  * |</div> 
	  */
	 onBeforeChecked : function(node){
	 	return true;
	 },
	 
	  /**
	  * @summary:
	  *       在节点被置为非选中之前进行调用的监听
	  * @param {unieap.tree.TreeNode}   node
	  * @return 
	  *      {boolean}
	  * @description:
	  *     若返回为false，将不会执行后续的UI和数据操作
	  * @example:
	  * |function beforeUnChecked(node){ 
	  * |	return confirm("确定要取消选中树节点"+node.getLabel()+"么？"); 
	  * |} 
	  * |<div dojoType="unieap.tree.Tree" id="basicTree"  animate="false" label="UniEAP" 
	  * |	checkLogic="{onBeforeUnChecked:beforeUnChecked}" 
	  * |	binding = "{'leaf':'leaf', 'store':treeStorePart,
	  * |			'parent':'parentID', query:{name:'parentID',relation:'=',value:''}}">
	  * |</div>
	  */
	 onBeforeUnChecked : function(node){
	 	return true;
	 },
	 
	 /**
	  * @summary:
	  *       在节点被置为选中时调用的监听
	  * @param {unieap.tree.TreeNode}   node
	  * @return 
	  *      {boolean}
	  * @description:
	  *     此时选中的UI和数据操作已经完成，若返回为false，将不会执行onAfterChecked监听
	  * @example:
	  * |function nodeChecked(node){ 
	  * |	unieapTree.setCurrentNode(node); //设置被选中节点为当前节点 
	  * |}
	  * |<div dojoType="unieap.tree.Tree" id="basicTree"  animate="false" label="UniEAP" 
	  * |	checkLogic="{onChecked:nodeChecked}" 
	  * |	binding = "{'leaf':'leaf', 'store':treeStorePart,
	  * |			'parent':'parentID', query:{name:'parentID',relation:'=',value:''} }">
	  * |</div>
	  */
	 onChecked : function(node){
	 	return true;
	 },
	 
	 /**
	  * @summary:
	  *       在节点被置为非选中时调用的监听
	  * @param {unieap.tree.TreeNode}   node
	  * @return 
	  *      {boolean}
	  * @description:
	  *     此时选中的UI和数据操作已经完成，若返回为false，将不会执行onAfterUnChecked监听
	  * @example:
	  * |function nodeUnChecked(node){ 
	  * |alert("您取消选中了节点"+node.getLabel()); 
	  * |} 
	  * |<div dojoType="unieap.tree.Tree" id="basicTree" id="unieapTree" 
	  * |	animate="false" label="UniEAP" checkLogic="{onUnChecked:nodeUnChecked}" 
	  * |	binding = "{'leaf':'leaf', 'store':treeStorePart,
	  * |			'parent':'parentID', query:{name:'parentID',relation:'=',value:''} }">
	  * |</div>
	  */
	 onUnChecked : function(node){
	 	return true;
	 },
	 
	  /**
	  * @summary:
	  *       在节点被置为选中时后调用的监听
	  * @param {unieap.tree.TreeNode}   node
	  * @description:
	  *     此时选中的UI和数据操作已经完成
	  * @example:
	  * |function nodeAfterCheck(node){ 
	  * |	unieapTree.setCurrentNode(node); 
	  * |}
	  * |<div dojoType="unieap.tree.Tree" id="basicTree" id="unieapTree" 
	  * |	animate="false" label="UniEAP" 
	  * |	checkLogic="{onUnChecked:nodeUnChecked,onAfterChecked:nodeAfterCheck}" 
	  * |	binding = "{'leaf':'leaf', 'store':treeStorePart,
	  * |			'parent':'parentID', query:{name:'parentID',relation:'=',value:''} }">
	  * |</div> 
	  */
	 onAfterChecked : function(node){
	 },
	 
	 /**
	  * @summary:
	  *       在节点被置为非选中时后调用的监听
	  * @param {unieap.tree.TreeNode}   node
	  * @description:
	  *     此时选中的UI和数据操作已经完成
	  * @example:
	  * |function nodeAfterUnCheck(node){ 
	  * |	alert("您已经取消选中了节点"+node.getLabel()); 
	  * |} 
	  * |<div dojoType="unieap.tree.Tree" id="basicTree"  animate="false" label="UniEAP" 
	  * |	checkLogic="{onUnChecked:nodeUnChecked,onAfterUnChecked:nodeAfterUnCheck}" 
	  * |	binding = "{'leaf':'leaf', 'store':treeStorePart,
	  * |			'parent':'parentID', query:{name:'parentID',relation:'=',value:''} }">
	  * |</div>
	  */
	 onAfterUnChecked : function(node){
	 },
	 
	 
	 /**
	  * @summary:
	  *       手动点击使一个节点选中的事件
	  * @param {unieap.tree.TreeNode}   node
	  * @description:
	  *     此时选中的UI和数据操作已经完成
	  */
	 onHandleChecked:function(node){
		 
	 },
	 
	 /**
	  * @summary:
	  *       手动点击使一个节点取消选中的事件
	  * @param {unieap.tree.TreeNode}   node
	  * @description:
	  *     此时选中的UI和数据操作已经完成
	  */
	 onHandleUnChecked:function(node){
		 
	 }

})