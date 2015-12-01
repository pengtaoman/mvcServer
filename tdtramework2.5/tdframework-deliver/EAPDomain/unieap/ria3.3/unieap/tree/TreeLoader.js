dojo.provide("unieap.tree.TreeLoader");
dojo.require("unieap.tree.Tree");
dojo.require("unieap.rpc");
dojo.require("unieap.ds");
dojo.declare("unieap.tree.TreeLoader",null,{
	 /**
	 * @declaredClass:
	 * 		unieap.tree.TreeLoader
	 * @summary:
	 * 		加载树数据的类
	 * @classDescription:
	 *     支持通过发送ajax请求，实现懒加载数据
	 *     允许用户在发送请求的时候，传递自定义参数
	 *     支持取本地数据
	 * @example:
	 * |  <div dojoType="unieap.tree.Tree" 
	 * |      id="lazyTree" label="UniEAP" 
	 * |      loader="{'url':unieap.WEB_APP_NAME+'/getLazyDataTest.do?method=getData',
	 * |			parameters:{aa:'ddd',bb:'vvv'}}" 
	 * |      binding = "{'leaf':'leaf', 'store':'treeStoreForLazyLoad',
	 * |			'parent':'parentID', query:{name:'parentID',relation:'=',value:''}}" > 
	 * |  </div> 
	 *   RowSet格式数据的懒加载
	 * @example:
	 * | <div dojoType="unieap.tree.Tree" label="根结点" 
	 * |   loader ="{'url':unieap.WEB_APP_NAME+'/getLazyDataTest.do?method=getData2'}" 
	 * |   binding = "{bindingClass :'unieap.tree.JsonTreeBinding','leaf':'leaf',
	 * |			'jsonData':jsondata, 'label':'text', id:'text'}">
	 * | </div>   
	 *  Json格式数据的懒加载
	 */
	
	/**
	 * @summary：
	 * 	     指定请求后台数据的连接地址
	 * @type
	 * 		{string} 
	 */
	url :  "",
	
	
	/**
	 * @summary：
	 * 		设置要同时传递到后台的其他参数
	 * @type：
	 * 		{object} 
	 * @example：
	 * 	| {event:"security",name:"getRole"}	
	 */
	parameters : null,	
	
	constructor: function(params){
			dojo.mixin(this, params);
	},
	
	/**
	 * @summary：
	 * 		在进行后台请求时，要同时提交到后台的数据
	 * @param：
	 * 	   {object}item
	 * @return :
	 *     {object}
	 * @description:
	 *     该数据将作为unieap.Action.requestData的第二个参数传到后台，格式应该为一个DataCenter
	 *     默认为null，如果用户要提交自定义的数据，可重写本函数。
	 * @example:
	 * |function doGetPostData(item){ 
	 * |	var dc = new unieap.ds.DataCenter(); 
	 * |	var label = item.data["label"]; 
	 * |	if(label){ 
	 * |		dc.setParameter("label",label); 
	 * |	} 
	 * |	return dc; 
	 * |}
	 * |<div dojoType="unieap.tree.Tree" 
	 * |	id="lazyTree" label="UniEAP" 
	 * |	loader="{'url':unieap.WEB_APP_NAME+'/getLazyDataTest.do?method=getData',
	 * |		getPostData:doGetPostData}" 
	 * |	binding = "{'leaf':'leaf', 'store':'treeStoreForLazyLoad',
	 * |		'parent':'parentID', query:{name:'parentID',relation:'=',value:''}}" >
	 * |</div>
	 */
	getPostData : function(item){
		return null;
	},
	
	/**
	 * @summary：
	 * 		在进行后台请求前的回调函数
	 * @param：
	 * 		{object}item
	 * @return :
	 *     {boolean}
	 * @description:
	 *     返回值为布尔类型，若为false，则不会请求后台数据
	 * @example:
	 *  |function beforeload(item){ 
	 *  |	return confirm("您确定要加载"+item.data["label"]+"的孩子节点么？"); 
	 *  |} 
	 *  |<div dojoType="unieap.tree.Tree" id="lazyTree" label="UniEAP" 
	 *  |	loader="{'url':unieap.WEB_APP_NAME+'/getLazyDataTest.do?method=getData',
	 *  |			onBeforeLoad:beforeload}" 
	 *  |	binding = "{'leaf':'leaf', 'store':'treeStoreForLazyLoad',
	 *  |			'parent':'parentID', query:{name:'parentID',relation:'=',value:''}}" >
	 *  |</div> 
	 */
	onBeforeLoad : function(item){
		return true;
	},
	
	/**
	 * @summary：
	 * 		在进行后台请求后的回调函数
	 * @param：
	 * 		{unieap.ds.DataCenter|string}dc
	 * @param:
	 *     {object}item
	 * @description:
	 *     对得到的unieap.ds.DataCenter或json串进行必要的操作
	 *     提供了默认实现，对RowSet结构的树数据，设置查询条件以确定当前节点的第一层子节点数据
	 * @example:
	 * |function afterload(dc,item){ 
	 * |	//用户自定义逻辑
	 * |} 
	 * |<div dojoType="unieap.tree.Tree" id="lazyTree" label="UniEAP" 
	 * |	loader="{'url':unieap.WEB_APP_NAME+'/getLazyDataTest.do?method=getData',
	 * |		'onAfterLoad':afterload}" 
	 * |	binding = "{'leaf':'leaf', 'store':'treeStoreForLazyLoad',
	 * |		'parent':'parentID', 'query':{name:'parentID',relation:'=',value:''}}" >
	 * |</div> 
	 */
	onAfterLoad : function(dc,item){	
		this.widget.afterLoad(dc,item);
	},
	
	/**
	 * @summary：
	 * 		取本地数据，构建子节点数据
	 * @param：
	 * 		{object}item
	 * @return :
	 *     {unieap.ds.DataStore|string}
	 * @description:
	 *      若不需要请求后台，只是取本地数据可以重写该方法
	 *      在配置loader且不配置url属性的情况下，将会调用此函数
	 * @example:
	 * |var treeStorePart = new unieap.ds.DataStore("treeStore",[
	 * |	{treeId:"1",title:"node1",parentID:"",isLeaf:false}, 
	 * |	{treeId:"2",title:"node2",parentID:"",isLeaf:true}, 
	 * |	{treeId:"3",title:"node3",parentID:"",isLeaf:true}
	 * |]); 
	 * |var treeStorePart2 = new unieap.ds.DataStore("treeStore2",[
	 * |	{treeId:"4",title:"new_node11",parentID:"1",isLeaf:true},
	 * |	{treeId:"5",title:"new_node12",parentID:"1",isLeaf:true}, 
	 * |	{treeId:"6",title:"new_node13",parentID:"1",isLeaf:true} 
	 * |]); 
	 * |function doGetLocalData(item){ 
	 * |	if(item.data["treeId"]==""){ 
	 * |		return treeStorePart; 
	 * |	}else if(item.data["treeId"]=="1"){ 
	 * |		return treeStorePart2; 
	 * |	}else{ return null; } 
	 * |} 
	 * |<div dojoType="unieap.tree.Tree" id="lazyTree2" label="UniEAP" 
	 * |	loader="{'getLocalData':doGetLocalData}" 
	 * |	binding = "{'leaf':'isLeaf', 'label':'title',
	 * |			'rootNodeId':'','parent':'parentID', 'id':'treeId',
	 * |			'query':{name:'parentID',relation:'=',value:''}}" >
	 * |</div>
	 *   从本地取数据构建树结构
	 * @img:
	 *      images/tree/getLocalData.png
	 */
	getLocalData : function(item){
		return null;
	},
	
	
	/**
	 * @summary:
	 * 		当树为懒加载时,设置是以是同步还是异步方式来获取数据
	 * @description:
	 * 		默认为异步方式
	 * @default:
	 * 		false
	 */
	sync:false,
	
	
	/*
	 * @summary:
	 * 		用于懒加载树，让用户主动往后台发送请求，给V4提供接口实现
	 * @param {object} item
	 * @param {function} load
	 * @param {function} error
	 */
	rpc:null,
	
	
	//发送Ajax请求，得到懒加载树子节点的数据
	load : function(item,callback){	  
		if (this.url||this.rpc) {
			var flag  = this.onBeforeLoad(item),self=this;
			if(flag ==false){
				callback(null);
				return ;
			}
			var loadCB=function(dc){
				if(dc instanceof unieap.ds.DataCenter){
					self.onAfterLoad(dc,item);
					callback(dc);
				}
			};
			var errorCB=function(){
				callback(null);
			};
			if(dojo.isFunction(this.rpc)){
				this.rpc(item,loadCB,errorCB);
			}else{
				unieap.Action.requestData({
					url : this.url,
					sync:this.sync,
					parameters: this.buliderParams(this.parameters,item),
					load: function(dc){
						loadCB(dc);
					},
					error: function(){
						errorCB();
					}
				},this.getPostData(item),false);
			}
		}else {
			var result = this.getLocalData(item);
			callback(result);
		}
	},
	
	/**
	 * @summary：
	 * 		构建往后台发请求取数据的参数
	 * @param 
	 * 		{object} params   即为初始定义的parameters
	 * 	@param 
	 * 		{object} item
	 * @return：
	 * 		{object}
	 * @description:
	 *     构建在请求后台数据时的参数，默认会增加一个node属性，其值为当前item对应的id
	 *     用户如果需要传递更多的参数，可以重写该方法
	 * @example:
	 * |//用户自定义参数函数
	 * |function doBuilderParams(){ 
	 * |	params = params?params:{}; 
	 * |	params.nodeID = this.widget.getBinding().getId(item); 
	 * |	params.label=item.data["label"]; 
	 * |	return params;
	 * |}
	 * |//后台取参数
	 * |String aa=request.getParameter("aa"); 
	 * |String bb=request.getParameter("bb"); 
	 * |String nodeID = request.getParameter("nodeID"); 
	 * |String label = request.getParameter("label");
	 * |//标签生成树
	 * |<div dojoType="unieap.tree.Tree" id="lazyTree" label="UniEAP" 
	 * |	loader="{'url':unieap.WEB_APP_NAME+'/getLazyDataTest.do?method=getData',
	 * |			parameters:{aa:'ddd',bb:'vvv'},'buliderParams':doBuilderParams}" 
	 * |	binding = "{'leaf':'leaf', 'store':'treeStoreForLazyLoad',
	 * |			'parent':'parentID', query:{name:'parentID',relation:'=',value:''}}" >
	 * |</div> 
	 * |
	 */
	buliderParams : function(params,item){
		params  = params?params:{};
	    params.node = this.widget.getBinding().getId(item);
        return params;
	} ,
	
	/**
	 * @summary：
	 * 		重新设置发送请求的url地址
	 * @param 
	 * 		{string} url   为树对应的loader对象重新设置url
	 * @description:
	 *      如果对于不同的节点会发向不同的请求地址，可以使用该方法动态设置请求数据的url地址
	 * @example:
	 * |unieap.byId("basicTree").getLoader().setUrl("/getTreeNode.do?method=getData");
	 */
	setUrl : function(url){
		this.url = url;
	}
	
});

