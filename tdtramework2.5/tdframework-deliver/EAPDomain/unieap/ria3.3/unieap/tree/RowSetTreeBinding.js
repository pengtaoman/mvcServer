dojo.provide("unieap.tree.RowSetTreeBinding");
dojo.require("unieap.tree.Tree");
dojo.require("unieap.tree.TreeBinding");
dojo.require("unieap.util.util");
dojo.require("unieap.ds");
dojo.declare("unieap.tree.RowSetTreeBinding", unieap.tree.TreeBinding, {
      /**
	 * @declaredClass:
	 * 		unieap.tree.RowSetTreeBinding
	 * @summary:
	 * 		树绑定Rowset数据的实现类
	 * @classDescription:
	 *     对RowSet结构的数据，提供了对树的支持
	 *     支持懒加载的情况，也即一棵树上会有多个RowSet
	 *     支持给指定节点重新设置store
	 * @superClass
	 *        unieap.tree.TreeBinding
	 * @example:
	 * |<div dojoType="unieap.tree.Tree" id="basicTree" 
	 * |	animate="false" label="UniEAP" 
	 * |	binding = "{'leaf':'isLeaf', 'id':'treeId', 'store':treeStorePart,'label':'title',
	 * |		'parent':'parentID', query:{name:'parentID',relation:'=',value:''} }"> 
	 * |</div> 
	 */

	/**
	 * @summary：
	 * 		指定数据集DataStore对象，可以是名称或对象
	 * @type
	 * 		{unieap.ds.DataStore|string} 
	 */
    store: null,
    
	/**
	 * @summary:
	 * 		设置Tree控件所绑定的DataStore对象来源于哪个DataCenter，仅在store属性为DataStore名称时生效
	 * 		若没有指明,将会在全局的DataCenter对象(即dataCenter)中获取DataStore
	 * @type:
	 * 		{unieap.ds.DataCenter}
	 * @example:
	 * |<div dojoType="unieap.tree.Tree" id="basicTree" 
	 * |	binding = "{'leaf':'isLeaf', 'id':'treeId', 'store':treeStorePart,'label':'title',datacenter:dc,
	 * |		'parent':'parentID', query:{name:'parentID',relation:'=',value:''} }"> 
	 * |</div> 
	 */
	datacenter: null,
    
    
	/**
	 * @summary：
	 * 		指定数据中标识父节点的字段名
	 * @type：
	 * 		 {string} 
	 * @default：
	 * 		"parent"
	 */
    parent: "parent",
   
	
	/*
	 * @summary：
	 * 		树包含的所有store的数组
	 * @type：
	 * 		{array}
	 * @default：
	 * 		null 
	 * 		
	 */
	stores : null,
	
    /**
	 * @summary：
	 * 		构建树的第一层节点的查询条件
	 * @type：
	 * 		{object}
	 * @default：
	 * 		null 
	 * @description:
	 *   确定树的第一层节点查询条件，将会对给定RowSet执行该属性的查询条件，将查询结果构建树的第一层节点
	 *   如果不设置该属性，默认实现会是将parent对应字段为“”的数据构建第一层节点	
	 */
	query : null,
	
    /**
	 * @summary：
	 * 		删除节点时是否修改对应父节点的leaf字段的值
	 * @type：
	 * 		{boolean}
	 * @default：
	 * 		true 
	 */
	changeLeaf:true,
    
    constructor: function(params){
		dojo.mixin(this, params);
		this.stores = {};
		if(!this.query){
			this.query = {
					name: this.parent,
					relation: "=",
					value: ""
			}			
		}
		this.createRootNodeItem();
		var center;
		if(this.datacenter){
			center = this.datacenter;
		}else if(currentDataCenter){
			center = currentDataCenter;
		}else{
			center=dataCenter;
		}
		if(dojo.isString(this.store)){
			this.store=unieap.getDataStore(this.store, center, false);
		}
		
		this.rowsetCache = {};
		if (this.store) {
			this.setQuery(this.store,this.query,this.getRootNodeItem());	
			var item = this.getRootNodeItem();
			item["rs"] = this.store.getRowSet();
		}	
		//通过桥接模式，为Tree增加	afterLoad方法，配置在加载数据完成后要设置查询条件的函数
		this.widget.afterLoad = dojo.hitch(this,"afterLoad");
    },
	
	/**
	 * @summary:
	 *       在懒加载树的情况下，设置得到datastore的query条件
	 * @param {unieap.ds.DataCenter} dc
	 * @param {object} item
	 * @description:
	 *       如果是懒加载树，会得到一个DataCenter，里面包含当前节点子节点的数据，
	 *       但可能并不是得到的所有数据都是当前节点的直接子节点，因此通过重写该方法，进行数据的过滤，得到直接子节点的信息
	 *       默认情况下，会根据当前节点的id确定查询条件
	 *       该方法用户不会直接调用，而是在TreeLoader中，数据加载完成后自动调用的，用户可以自定义该方法
	 * @example:
	 * |function doAfterLoad(dc,item){ 
	 * |	//用户可在这里自定义逻辑 
	 * |} 
	 * |<div dojoType="unieap.tree.Tree" 
	 * |	id="basicTree"  animate="false" label="UniEAP" 
	 * |	binding = "{'leaf':'isLeaf', 'id':'treeId', 'store':treeStorePart, 
	 * |		'label':'title', 'parent':'parentID', 
	 * |		'query':{name:'parentID',relation:'=',value:''}, afterLoad:doAfterLoad }"> 
	 * |</div>
	 */
	afterLoad : function(dc,item){
		var query = null;
		//定义查询条件
		if(this.getRootNodeItem()==item){
			query = this.query;
		}else{
			query = {
				name: this.parent,
				relation: "=",
				value: item.data[this.id]
			};
		}
		var stores = dc.getDataStores();
		for (var name in stores) {
		  //在stores map中添加该store并设置对应的初始query
		  this.setQuery(stores[name],query,item);									
		}
	},
	

	/*
	 * @private:
	 * @summary：
	 * 		根据查询条件得到行记录的子集
	 * @param query
	 * 		{object} 
	 * @return：
	 * 		{array}
	 */
	getSubRowSet : function(rowset,query){
		var props = {rs:rowset};
		if(this.widget.loader==null){
			props["loaded"] = true;
		}
		var result = rowset.generateTreeSet({
			
			id : this.id,
			parent : this.parent,
			root : query.value,
			props : props
		});
		return result && result.children || [];
	},
   
   /**
    * @summary:
    *       得到一个节点的子节点对应的数据组成的数组，并执行给定的回调方法
    * @param {object} item
    * @param {function} callback
    * @description:
    *       根据一个item，得到其子节点对应的数据对象组成的数组，并执行回调函数，回调函数的参数即为得到的items
    * @example:
    * |var node = unieap.byId("basicTree").getCurrentNode();
    * |unieap.byId("basicTree").getBinding().getChildren(node.getItem(),function(items){unieap.debug(items)});
    */
    getChildren: function(item, callback){
				callback = callback || function(){};
				//如果子节点的数据已经加载过了，只需要取该item的children就可以了
				if(item.loaded){
					callback(item[this.children]);
					return;
				}
				//将节点的状态标示为已加载过
				item.loaded = true;
				//如果是叶子节点，回调函数执行其参数设置为null，并返回
                if (this.isLeaf(item)) {
                	if(this.widget.loader!=null){
						callback(null);
                	}
					return;
				}
				//在父节点对应的store中进行查找，看是否有当前节点子节点的数据
				//对于非懒加载的数据，会执行到此处得到预期的数据
		       var  loadedItem = this.doPreLoad(item);
        	 	if (loadedItem.length>0) 
					callback(loadedItem);
				else  if (this.widget.loader){
					    //对于懒加载的数据，此处将会通过TreeLoader发送ajax请求
						var loader = this.widget.getLoader();
						var onComplete = dojo.hitch(this,function(res){
							var childItems = [];
							//得到的是DataCenter，发送请求得到的数据
							if (res && res.declaredClass == "unieap.ds.DataCenter") { 
								var store = res.getSingleDataStore();
								if(store.getRowSet().getRowCount()>0){
									childItems = this.getSubRowSet(store.getRowSet(), this.stores[item.data[this.id]].query);
								}
								item[this.children] = childItems;
								callback(childItems,false);
							}else if(res && res.declaredClass == "unieap.ds.DataStore"){  
								//得到的是DataStore，是通过TreeLoader的getLocalData方法得到，取本地的数据
								  if(res.getRowSet().getRowCount()>0){
									  if(!this.stores[item.data[this.id]]){ 
									  		var newQuery = {name: this.parent,relation: "=",value: item.data[this.id]};
									  	    this.setQuery(res,newQuery,item);
									  }
									  childItems = this.getSubRowSet(res.getRowSet(), this.stores[item.data[this.id]].query);
								  }
								  item[this.children] = childItems;
								  callback(childItems);
							}
							else{
								callback(null);    
							}
						})
						loader.load(item,onComplete);
				}
				else 
						callback(null);        
    },
	
	 //在执行TreeLoader的load方法前，先在已有的数据中进行查询，得到子节点的数据对象数组
	doPreLoad: function(item){
		var childItems = [];
		if(item==this.treeRoot){ 
			if(this.store){
				item.rs = this.store.getRowSet();
			    childItems = this.getSubRowSet(this.store.getRowSet(),this.query);
			}
		}
		else {
//			var newQuery = {
//						name: this.parent,
//						relation: "=",
//						value: item.data[this.id]
//			};
//			childItems = this.getSubRowSet(item.rs,newQuery);
			childItems = item[this.children] || [];
		}
		item[this.children] = childItems;
		return childItems ;
	},
	
    //指定store的查询条件，并将该store放到map中
	setQuery : function(store,query,item){
		if(item){
			if(item == this.getRootNodeItem()){
				item.rs = store.getRowSet();
			}
	    	this.stores[item.data[this.id]]={store:store,query:query};
		}
		else{
			 this.stores[this.rootNodeId]={store:store,query:query};
		}
	},
	
     //将传递过来的item设置选中或非选中状态
	setSelected : function(item,checked){
		item.data["_s"] = checked;
	},
	
	//返回item是否选中
	isSelected : function(item){
		if(item&&item.data&&item.data["_s"])
		  return item.data["_s"]==true;
		if(item==this.treeRoot){ //判断根节点的选中状态
			return item.domNode.associatedData.isChecked;
		}
		return false;
	},
	
	/**
	 * @summary：
	 * 		设置某节点数据对象对应的显示字段的值
	 * @param  
	 *     {unieap.tree.TreeNode}node
	 * @param  
	 * 		{sring} label
	 * @example:
	 * |var node = unieap.byId("basicTree").getCurrentNode(); 
	 * |unieap.byId("basicTree").getBinding().setLabel(node,"newLabel");
	 */ 
	 setLabel : function(node,label){
	 	if(!node||node.isRoot()){
			return ;
		}
		var item = node.getItem();
		 var row = new unieap.ds.Row(item.rs,item.data);
		 row.setItemValue(this.label,label);
		 this.widget.fireDataChange(node);
	},
	
	//将一个item从其从父节点的item剪切并粘贴到另一个节点的item下，用于单棵树之间的拖拽
	//不支持懒加载的情况
	pasteItem :  function(childItem,oldParentItem, newParentItem, insertIndex){
		//在原父节点children中删除当前的item
		if(oldParentItem){
			var brotherItem = oldParentItem.children; 
			for(var i=0;i<brotherItem.length;i++){
				if(brotherItem[i]==childItem){
					brotherItem.splice(i,1)
					break;
				}
			}
		   if(brotherItem.length==0&&this.leaf)
			        oldParentItem.data[this.leaf]=true;
		  } 
			var oncomplete = function(){
				var parentId = '';
				if (newParentItem.domNode.associatedData.isRoot) {
					//移往根结点时，得到新增节点parent字段的值
					if(newParentItem.children&&newParentItem.children.length>0){
					  parentId = this.getParentId(newParentItem.children[0]);
					}else if(this.query&&this.query.name == this.parent){
					  parentId = this.query.value;
					}else{
					  return this.getFirstLevelNodeParent();
					}
				}
				else {
					parentId = this.getId(newParentItem);
				}
				var row = new unieap.ds.Row(childItem.rs,childItem.data);
				row.setItemValue(this.parent,parentId);
				var brotherItems = newParentItem.children;
				if(!brotherItems||brotherItems.length==0){
					  newParentItem.children = [];
			         brotherItems = newParentItem.children
		              if(this.leaf){
			            newParentItem.data[this.leaf]=false;
		              }
				}
				if (typeof insertIndex == "number") 
					brotherItems.splice(insertIndex, 0, childItem);
				else {
					brotherItems.push(childItem)
				}
			}
		  if(!newParentItem.loaded){
			this.widget.loadNodeData(newParentItem,dojo.hitch(this,oncomplete));
		}
		else{
			dojo.hitch(this,oncomplete)();
		}  
	},
	
	//本方法用于两棵树之间的拖拽
	//在拖拽的时候，往指定的父节点上添加item，此时不一定会生成对应的节点
	//需要在已删除的数据中寻找是否已经有该条数据，如果已经有的话，将其取出
	//仅用于非懒加载的情况
	addItemForDnd : function(data,parentItem,changeParent){
	     if(!parentItem.loaded){
			    var complete =  dojo.hitch(this,function(){
			     })
			      this.widget.loadNodeData(parentItem,complete);
		     }
			  var item = this.addItemForDndHelper(data,parentItem,changeParent);
			  //树节点的拖拽，被拖拽节点的子节点并不需要更改父节点的字段值
			  if (changeParent) {
			  	var parentId = '';
				if (parentItem.domNode.associatedData.isRoot) {
					//移往根结点时，得到新增节点parent字段的值
					if(parentItem.children&&parentItem.children.length>1){
					  parentId = this.getParentId(parentItem.children[0]);
					}else if(this.query&&this.query.name == this.parent){
					  parentId = this.query.value;
					}else{
					  return this.getFirstLevelNodeParent();
					}
				}else {
			  		parentId = this.getId(parentItem);
			  	}
			  	var row = new unieap.ds.Row(item.rs, item.data);
			  	row.setItemValue(this.parent, parentId);
			  }
			 return item;
	},
	
	//为了两个树之间的拖拽提供的帮助方法
	addItemForDndHelper : function(data,parentItem,changeParent){
		var brothersItems = parentItem.children;
		var newItem = null;
		//如果存在兄弟节点，添加在兄弟节点所在的rowset中
		if(brothersItems&&brothersItems.length>0){
			var rs  = brothersItems[0].rs;
			var deleteBuffer = rs["delete"];
			var deleteData = null;
			for(var i = 0;i<deleteBuffer.length;i++){
				if(data[this.id]==deleteBuffer[i][this.id]){
					deleteData = deleteBuffer.splice(i,1);
				}
			}
			if(deleteData){
			  newItem = {data:deleteData[0],rs:rs};
			  //不能直接调用addRow方法，因为这样会给该行数据增加一个新增标识符，而且性能也不如直接操作缓存区
			  //rs.addRow(deleteData[0]);
			 // rs["primary"].push(deleteData[0]);
			  rs.getData(unieap.ds.Buffer.PRIMARY).push(deleteData[0]);
			  var row = rs.getRow(rs.getRowCount()-1);
			  row.setItemValue(this.parent, data[this.parent]);
			}else{
			  var cloneData = dojo.clone(data);
			  newItem = {data:cloneData,rs:rs} 
			  rs.addRow(cloneData);	
			}
			//放到父节点的item的children属性中
			if (changeParent == true||data[this.parent]==this.getId(parentItem)) {
				brothersItems.push(newItem);
			}
		}else{
			var rs  = parentItem.rs;
		    if(this.leaf){
			    parentItem.data[this.leaf]=false;
		     }
			 var deleteBuffer = rs["delete"];
			 var deleteData = null;
			for(var i = 0;i<deleteBuffer.length;i++){
				if(data[this.id]==deleteBuffer[i][this.id]){
					deleteData = deleteBuffer.splice(i,1);
				}
			}
			if(deleteData){
			  newItem = {data:deleteData[0],rs:rs} 
			  //rs.addRow(deleteData[0]);
			  //rs["primary"].push(deleteData[0]);
			  rs.getData(unieap.ds.Buffer.PRIMARY).push(deleteData[0]);
			  var row = rs.getRow(rs.getRowCount()-1);
			  row.setItemValue(this.parent, data[this.parent]);
			}else{
				var cloneData = dojo.clone(data);
				newItem = {data:cloneData,rs:rs} 
				rs.addRow(cloneData);
			}
			parentItem.children = [];
			parentItem.children.push(newItem);
		}
		return newItem;
	},
	
	//增加一条数据，默认情况下，会将该条数据增加到兄弟所在的rowset里面
	//若无兄弟节点，则增加到父节点对应的rowset里面，可以通过重写addItemToLeaf方法修改叶子节点增加子节点的逻辑
	addItem : function(data,parentItem,changeParent){
		var brothersItems = parentItem.children;
		if(brothersItems&&brothersItems.length>0){
			var rs  = brothersItems[0].rs;
			var newItem = {data:data,rs:rs,children:[],loaded:true} ;
			brothersItems.push(newItem);
			rs.addRow(data);
		   return newItem;
		}else{
			var newItem = this.addItemToLeaf(data,parentItem);
			return newItem;
		}
	},
    
	/**
	 * @summary:
	 *       添加一条数据到一个叶子节点，提供了默认实现，用户可重写
	 * @param {object} data
	 * @param {object} parentItem
	 * @description:
	 *        往叶子节点添加数据，默认的情况是往父节点的RowSet里添加数据，如果是懒加载的树，用户可自定义该方法，往指定的RowSet中添加数据
	 * @example:
	 * |function doAddItemToLeaf(data,parentItem){ 
	 * |//用户可在这里自定义逻辑 
	 * |} 
	 * |<div dojoType="unieap.tree.Tree" id="basicTree"  
	 * |	animate="false" label="UniEAP" 
	 * |	binding = "{'leaf':'isLeaf', 'id':'treeId', 'store':treeStorePart, 
	 * |		'label':'title', 'parent':'parentID', 
	 * |		'query':{name:'parentID',relation:'=',value:''}, addItemToLeaf:doAddItemToLeaf }"> 
	 * |</div> 
	 */
	addItemToLeaf : function(data,parentItem){
		    var rs  = parentItem.rs;
			var newItem = {data:data,rs:rs,children:[],loaded:true} 
			parentItem.children = [];
			parentItem.children.push(newItem);
		    if(this.leaf){
			    parentItem.data[this.leaf]=false;
		     }
			 rs.addRow(data);
		    return newItem;
	},
	

	
	/**
	 * @summary:
	 *       删除一条数据
	 * @description:
	 *        对一条数据执行删除操作，并不会进行UI的操作
	 *        删除数据，默认情况下会删除该节点的所有的关联子节点，若树是懒加载，会将相关数据加载进来后删除
     *        用户如要自定义逻辑，可以重写本方法
	 * @param:
	 * 		{object} item 删除节点源数据对象,形如：
	 * 		{data:{label:'子节点',id:"2",parent:"1"}}
	 * @param: 
	 * 		{object} parentItem 父节点源数据对象,形如：
	 * 		{data:{label:'父节点',id:"1",parent:"0"},children : [{data:{label:'子节点',id:"2",parent:"1"}}]}
	 * @param:
	 * 		{function} callback 回调方法，存在异步请求情况
     * @example:
     * |function doDeleteItem(item,parentItem,callback){ 
     * |	//用户可在这里自定义逻辑 
     * |} 
     * |<div dojoType="unieap.tree.Tree" 
     * |	id="basicTree"  label="UniEAP" 
     * |	binding = "{deleteItem:doDeleteItem,'leaf':'isLeaf', 'id':'treeId', 
     * |		'store':treeStorePart, 'label':'title', 'parent':'parentID', 
     * |		'query':{name:'parentID',relation:'=',value:''}}"> 
     * |</div> 
	 */
	deleteItem  : function(item,parentItem,callback){
		this.rowsetContainToDelete = {};
		if(parentItem){
			var brotherItem = parentItem.children; 
			for(var i=0;i<brotherItem.length;i++){
				if(brotherItem[i]==item){
					brotherItem.splice(i,1)
					break;
				}
			}
			if(brotherItem.length==0&&this.leaf && 
				parentItem.data[this.leaf]!=null&&this.changeLeaf){
			     parentItem.data[this.leaf]=true;
			}
		  }
		 this.arr = [];
		 this.arr.push(item);
		 var load = dojo.hitch(this,function(){
		 	for(var serial in this.rowsetContainToDelete){
				    var toDeleteRowIndex = [];
					var rs = this.rowsetContainToDelete[serial];
					for (var i = 0 ,len = rs.getData(unieap.ds.Buffer.PRIMARY).length; i < len; i++) {
							if(rs.getData(unieap.ds.Buffer.PRIMARY)[i]["unieap_item_to_be_deleted"]){
								delete rs.getData(unieap.ds.Buffer.PRIMARY)[i]["unieap_item_to_be_deleted"];
								toDeleteRowIndex.push(i);
						}
					}
					rs.deleteRows(toDeleteRowIndex);
			}
			callback && callback();
		 })
        	this._deleteRelatedItems(item,load);
		},
		
	//删除数据的辅助方法
	_deleteRelatedItems : function(item,callback){
		    this._bulidToDeleteCache(item);
			item.data["unieap_item_to_be_deleted"] = 1;
			var onComplete = dojo.hitch(this,function(items){
			  delete item.children ;
			  this.arr.shift();
			  if (items&&items.length > 0) {
				for (var i = 0; i < items.length; i++) {
					this.arr.push(items[i]);
				}
			}
			if(this.arr.length>0){
				 this._deleteRelatedItems(this.arr[0],callback);
			}
			else{
			    callback();
				return;
			}
		})
		if(item.loaded){
			this.arr.shift();
			if (item.children) 
				for (var i = 0, l = item.children.length; i < l; i++) {
					this.arr.push( item.children[i]);
				}
			delete item.children ;
			if(this.arr.length>0){
				 this._deleteRelatedItems(this.arr[0],callback);
			}
			else{
			    callback();
				return;
			}
		}
	 	else
		    this.widget.loadNodeData(item,onComplete);
		},
		
		_bulidToDeleteCache : function(item){
			var rowset = item.rs;
		    rowset.serial = rowset.serial || "rowset_".concat(unieap.getUnique());
		    this.rowsetContainToDelete[rowset.serial] = rowset;
		},
		
		/**
		 * @summary:
		 *       根据TreeNode对象得到对应的Row对象
		 * @param {unieap.tree.TreeNode} node
		 * @description:
		 *      因为树节点支持两种不同的数据结构，因此将该方法置于此处
		 * @example:
		 * |var node = unieap.byId("basicTree").getCurrentNode(); 
		 * |var row = unieap.byId("basicTree").getBinding().getRow(node); 
		 * |unieap.debug(row); 
		 * @img:
	     *      images/tree/binding_getRow.png
		 */
		getRow : function(node){
			if(!node||node.isRoot())
			     return null;
			dojo.require("unieap.ds");
			var item  = node.getItem();
		    var row = new unieap.ds.Row(item.rs,item.data);
			return row;
		},
		
		/**
		 * @summary：
		 *          给指定节点设置store，将原来的所有子节点删除
		 * @description:
		 * 		给定store中的列字段与tree标签配置的列字段要一致
		 * @param: 
		 * 		{unieap.tree.TreeNode} node
		 * @param: 
		 * 		{unieap.ds.DataStore} store
		 * @param:  
		 * 		{object} args   
		 * 		该store相关的参数，如查询条件等
		 * @example:
		 * |<script>
		 * | var newDS = new unieap.ds.DataStore("newDS",[
		 * |	{id:"2",label:"节点1",parent:"1",leaf:false},
		 * |	{id:"3",label:"节点2",parent:"2",leaf:true}
		 * | ]);
		 * | var root = unieap.byId("basicTree").getRootNode(); 
		 * | var arg={query:{name:'parentID',relation:'=',value:'999'}}; 
		 * | unieap.byId("basicTree").getBinding().setDataStore(root,newDS,arg); 
		 * |</script>
		 * |<div dojoType="unieap.tree.Tree" 
		 * |	id="lazytree" 
		 * |	label="rowset" 
		 * |	loader="{'url':unieap.WEB_APP_NAME+'/getLazyData.do?method=getTrueData'}" 
		 * |	binding = "{'leaf':'leaf','id':'id','label':'label','parent':'parent',query:{name:'id',relation:'=',value:''}}">
		 * |</div>
		 */
		setDataStore : function(node,store,args){
			 if(!node||!store)  return; 
			 var childrenDomNode = this.widget.getChildrenByDom(node.domNode);
		     if(childrenDomNode&&childrenDomNode.length>0){
			     for(var i=0;i<childrenDomNode.length;i++){
				     node.destroyChildren(childrenDomNode[i]);
			     }
		     }
		   node.domNode.associatedData.state = "UNCHECKED";
		   node.getItem().loaded = true;
		   node.getItem()[this.widget.getBinding().children] = [];
		   var query;
		   if(args&&args.id&&node.isRoot()){
			   this.id = args.id;
		   }
		   if(args&&args.query){
		   	   query = args.query
		   }else if(node.isRoot()){
		   	  query = this.query;
		   }else{
		   	 query = {
						name: this.parent,
						relation: "=",
						value: node.item.data[this.id]
			 };
		   }
		  this.setQuery(store,query,node.item);									
		  var childItems = this.getSubRowSet(store.getRowSet(), this.stores[node.item.data[this.id]].query);
		  node.item[this.children] = childItems;
		  if(childItems.length>0){
		  	 node.domNode.associatedData.isExpanded = true;
//		  	 if(node.isLeaf()){
//		  	 }
		  	 var item = node.item;
		  	 if(this.leaf && item.data[this.leaf]!=null){
		  	 	item.data[this.leaf] = false;
		  	 }
		  }
		  if (node.isOpend()) {
		  	this.widget.collapseNode(node,false);
		  	this.widget.expandNode(node);
		  }
		},
		//刷新该item对应的RowSet
		refresh : function(item){
			if(item && item.data ){
				var id = item.data[this.id],
					rowset  = this.stores[id] && this.stores[id].store.getRowSet() || item.rs,
    				props = {rs:rowset};
				if(this.widget.loader==null){
					props["loaded"] = true;
				}
				if(item==this.getRootNodeItem()){
					id = this.query.value;
				}
    			var result = rowset.generateTreeSet({
					id : this.id,
					parent : this.parent,
					"root" : id,
					props : props
				});
				item[this.children] = result[this.children] || []; 
    		}
		},
		
		//得到一个item的所有子节点对应的data所组成的数组，适合于非懒加载的树
		//目前仅用于两棵树之间的拖拽，若从一棵树拖拽节点到另外一棵树，需要将原树上所有的item删掉，并将其移至目标树上
		getChildrenItems : function(item){
			var array = [];
			array.push(item.data);
			var arr = [];
			arr.push(item);
            var complete =  dojo.hitch(this,function(items){
				  arr.shift();
			      if (items&&items.length>0) 
				       for (var i = 0, l = items.length; i < l; i++) {
					      arr.push(items[i]);
						  array.push(items[i].data)
				       }
			       if (arr.length == 0) {
					   	return array;
				    }
			})
			for (var i = 0; i < arr.length; i++) {
				if (arr[0].loaded) {
				   var newItem =  arr.shift();
			        if (newItem.children) 
				       for (var j = 0, l = newItem.children.length; j < l; j++) {
					      arr.push(newItem.children[j]);
						  array.push(newItem.children[j].data)
				       }
			           if (arr.length > 0) {
					   	 i--;
					   	 continue;
					   }else {
					   	return array;
					   }
				}
				else {
					this.widget.loadNodeData(arr[0], complete);
				}
				i--;
			}
			return array;
		},
		getParentId : function(item){
		  return item.data[this.parent]
		},
		
		/**
		 * @summary:
		 *    得到第一层节点parent对应字段的值
		 * @return
		 *    {string}
		 * @description:
		 *     应用场景是在两个树之间的拖拽，若一棵树没有任何节点，且在query中也没有指定第一层节点的获取方法，将会根据此方法的返回值确定新移入节点的parent字段的值
		 * @example:
		 * |function() firstLevelNodeParent{
		 * |	return "root";
		 * |}
		 * |<div dojoType="unieap.tree.Tree" id="basicTree"
	     * |	label="UniEAP" treeDnd="{}" 
	     * |	binding = "{'getFirstLevelNodeParent':firstLevelNodeParent,
	     * |		'leaf':'leaf', 'store':treeStorePart, 'label':'label', 'parent':'parentID'}">
	     * |</div>    
		 */
		getFirstLevelNodeParent : function(){
		  return "";
		},
		
		 /**
		 * @summary:
		 *    得到树对应的store
		 * @return
		 *    {unieap.ds.DataStore}
		 * @description:
		 *     得到树对应的DataStore对象。若树非懒加载且通过标签配置store，则返回此指定的DataStore对象；若树是懒加载的，将会返回通过标签指定的DataStore对象。
		 * @example:
		 * |var store = unieap.byId("basicTree").getBinding().getStore();
		 */
		getStore : function(){
			return this.getRootNodeItem().rs.getDataStore();
		},
		
		 /**
		 * @summary:
		 *    得到树对应的所有store
		 * @return
		 *    {array}
		 * @description:
		 *     得到树的所有DataStore组成的数组，若树不是懒加载且没有通过setDataStore方法动态添加store，则会返回最初设置的DataStore，否则将会返回所有和树关联的DataStore。
		 * @example:
		 * |var stores = unieap.byId("basicTree").getBinding().getStores();
		 */
		getStores : function(){
			var  stores = this.stores;
			var allStores = [];
			for(var name in stores){
				allStores.push(stores[name].store);
			}
			return allStores;
		}
})