dojo.provide('unieap.grid.manager.PagingManager');
dojo.require("unieap.global");
dojo.declare("unieap.grid.manager.PagingManager",null,{
	/**
	 * @summary:
	 * 		翻页控制器
	 * @classDescription：
	 * 		控制Grid的翻页功能。上一页,下一页,第一页,最后一页等操作。
	 * @declaredClass:
	 * 		unieap.grid.manager.PagingManager
	 * @example:
	 * |	<div dojoType="unieap.grid.Grid">
	 * |		<toolbar paging="{parameters:{name:'psd'},url:"/demo.do"}">
	 * |		</toolbar>
	 * |	</div>
	 * 		通过toolbar的标签定义初始化翻页信息
	 * @example
	 * |	var manager=grid.getManager('PagingManager');
	 * |	manager.firstPage();
	 * 		翻到第一页
	 * @example:
	 * |	var manager=grid.getManager('PagingManager');
	 * |	manager.prevPage();
	 * 		翻到上一页
	 * @example：
	 * |	var manager=grid.getManager('PagingManager');
	 * |	manager.nextPage();
	 * 		翻到下一页
	 * @example：
	 * |	var manager=grid.getManager('PagingManager');
	 * |	manager.lastPage();
	 * 		翻到最后一页
	 */
	
	ui:{
		getPageInfo:true,
		setPageNumber:true,
		getPageNumber:true,
		getTotalPage:true,
		nextPage:true,
		lastPage:true,
		prevPage:true,
		firstPage:true,
		setInfo:true,
		clientPaging:true,
		getSelectedCachedData:true,
		clearPageData:true,
		hidePagingBar:true,
		showPagingBar:true,
		exportSelectedData:true,
		onPagingModified:true,
		updateUserPageSize:true
	},
	
	/**
	 * @summary:
	 * 		是否进行翻页缓存
	 * @description:
	 * 		客户端缓存只缓存数据,不缓存用户动态设置的样式(比如调用setRowStyles等)
	 * @type：
	 * 		{boolean}
	 * @default：
	 * 		false
	 */
	pageCache:false,
	
	
	
	/**
	 * @summary:
	 * 		翻页使用的url
	 * @type:
	 * 		{string}
	 * @example:
	 * |	<div dojoType='unieap.grid.Grid'>
	 * |		<header></header>
	 * |		<toolbar paging="{url:'test.do'}" >
	 * |		</toolbar>
	 * |	</div>
	 * 		可在toolbar标签上定义url
	 * @example:
	 * |	var manager=grid.getManager('PagingManager');
	 * |	manager.setInfo({url:'test.do'});
	 * 		可以通过setInfo方法设置翻页控制器的url
	 */
	url:null,
	
	/**
	 * @summary:
	 * 		翻页使用的parameters
	 * @type:
	 * 		{object}
	 * @example:
	 * |	<div dojoType='unieap.grid.Grid'>
	 * |		<header></header>
	 * |		<toolbar paging="{parameters:{user:'y',password:'f'}}" >
	 * |		</toolbar>
	 * |	</div>
	 * 		可在toolbar标签上定义parameters
	 * @example:
	 * |	var manager=grid.getManager('PagingManager');
	 * |	manager.setInfo({parameters:{user:'y',password:'f'}});
	 * 		可以通过setInfo方法设置翻页控制器的parameters
	 */
	parameters:null,
	
	
	/**
	 * @summary:
	 * 		是否显示翻页条,默认显示
	 * @description:
	 * 		默认情况下,在Grid控件里书写<toolbar></toolbar>会显示翻页条信息
	 * @type:
	 * 		{boolean}
	 * @default:
	 * 		true
	 * @example:
	 * |<div dojoType="unieap.grid.Grid" id="grid">
	 * |	<headr>
	 * |		<cell label="编号" name="attr_name"></cell>
	 * |		<cell label="职位" name="attr_job"></cell>
	 * |	</header>
	 * |	<toolbar paging="{display:false}"></toolbar>
	 * |</div>
	 * @img:
	 * 		images/grid/grid_toolbar_displayPagingBar.png
	 */
	display:true,
	
	
	/**
	 * @summary:
	 * 		设置每页显示的数据条数
	 * @description:
	 * 		该属性会在toolbar上创建一个下拉框,用户可以选择下拉框控件的值来动态改变每页显示的数据条数.
	 * 		只有当display属性为true的情况下,该属性才有效
	 * @type:
	 * 		{boolean|array}
	 * @default:
	 * 		false
	 * @example:
	 * |<div dojoType="unieap.grid.Grid" id="grid">
	 * |	<headr>
	 * |		<cell label="编号" name="attr_name"></cell>
	 * |		<cell label="职位" name="attr_job"></cell>
	 * |	</header>
	 * |	<toolbar paging="{userPageSize:true}"></toolbar>
	 * |</div>
	 * @img:
	 * 		images/grid/grid_toolbar_customPageSize.png
	 * @example:
	 * |<div dojoType="unieap.grid.Grid" id="grid">
	 * |	<headr>
	 * |		<cell label="编号" name="attr_name"></cell>
	 * |		<cell label="职位" name="attr_job"></cell>
	 * |	</header>
	 * |	<toolbar paging="{userPageSize:[100,200,300,400]}"></toolbar>
	 * |</div>
	 * @img:
	 * 		images/grid/grid_toolbar_configCustomPageSize.png
	 */
	userPageSize:false,
	
	
	/**
	 * @summary:
	 * 		是否支持客户端翻页
	 * @description:
	 * 		用户可以修改DataStore的pageSize属性来让每页显示多少条数据,用户需保证DataStore的recordCount属性正确
	 * @type:
	 * 		{boolean}
	 * default:
	 * 		false
	 * @example:
	 * |<div dojoType="unieap.grid.Grid" id="grid">
	 * |	<headr>
	 * |		<cell label="编号" name="attr_name"></cell>
	 * |		<cell label="职位" name="attr_job"></cell>
	 * |	</header>
	 * |	<toolbar paging="{clientPage:true}"></toolbar>
	 * |</div>
	 */
	clientPaging:false,
	
	/*
	 * @summary:
	 * 		grid翻页时，当本页发生变化时默认采取的操作
	 * @description:
	 * 		discard： 不提示，不保存，翻页
	 * 
	 * 		saveconfirm： 根据提示进行操作 “数据发生改变，是否保存修改?”
	 * 				  选择确定：保存，不翻页
	 * 				  选择取消：不保存，翻页
	 * 		discardconfirm：根据提示进行操作，“数据发生改变，是否放弃修改？”
	 * 				  选择确定：不保存，翻页
	 * 				  选择取消：	不保存，不翻页
	 * @type:
	 * 		{string}
	 * @enum:
	 * 		{"discard"|"saveconfirm"|"discardconfirm"}
	 * @default:
	 * 		"saveconfirm"
	 */
	pagingModifiedSave:unieap.widget.grid.pagingModifiedSave,
	
	
	constructor: function(param) {
		dojo.mixin(this,param);
		if(this.pageCache==true){
			if(this.grid.managers.get("ViewManager").orderType=="server"){
				this.grid.subscribe("onBeforeSort.clearPageData",this,function(){
					this.onServerSort();
				});
			}
		}
	},
	

	/**
	 * @summary:
	 * 		显示toolbar上的翻页条
	 * @example:
	 * |<div dojoType="unieap.grid.Grid" id="grid">
	 * |	<headr>
	 * |		<cell label="编号" name="attr_name"></cell>
	 * |		<cell label="职位" name="attr_job"></cell>
	 * |	</header>
	 * |	<toolbar paging="{display:false}"></toolbar>
	 * |</div>
	 * |<div dojoType="unieap.form.Button" label="显示翻页条" onClick="show"></div>
	 * |<script type="text/javascript">
	 * |	function show(){
	 * |		unieap.byId("grid").getManager("PagingManager").showPagingBar();
	 * |	}
	 * |</script>
	 */
	showPagingBar:function(){
		if(!this.display){
			this.display=true;
			this.grid.getToolBar()._showPagingBar();
		}
	},
	
	
	/**
	 * @summary:
	 * 		同步自定义显示每页条数的下拉框中的值
	 * @description:
	 * 		在某些情况下，用户修改了Grid控件绑定的DataStore的pageSize，但是自定义每页显示数据条数的下拉框的值却不同步。
	 * 		调用本方法可以同步下拉框中的值
	 * @example:
	 * |<script type="text/javascript">
	 * |	unieap.byId("grid").getManager("PagingManager").updateUserPageSize();
	 * |</script>
	 */
	updateUserPageSize:function(){
		var toolbar=this.grid.getToolBar(),
			combobox=toolbar&&toolbar.getComboBox();
		if(combobox){
			var info=this.grid.managers.get('PagingManager').getPageInfo();
			combobox.setValue(info.pageSize)
			
		}
	},
	
	/**
	 * @summary:
	 * 		隐藏toolbar上的翻页条
	 * @example:
	 * |<div dojoType="unieap.grid.Grid" id="grid">
	 * |	<headr>
	 * |		<cell label="编号" name="attr_name"></cell>
	 * |		<cell label="职位" name="attr_job"></cell>
	 * |	</header>
	 * |	<toolbar paging="{display:false}"></toolbar>
	 * |</div>
	 * |<div dojoType="unieap.form.Button" label="隐藏翻页条" onClick="hide"></div>
	 * |<script type="text/javascript">
	 * |	function hide(){
	 * |		unieap.byId("grid").getManager("PagingManager").hidePagingBar();
	 * |	}
	 * |</script>
	 */
	hidePagingBar:function(){
		if(this.display){
			this.display=false;
			this.grid.getToolBar()._hidePagingBar();
		}
	},



	
	/**
	 * @summary:
	 * 		设置翻页信息
	 * @param 
	 * 		{object} pageInfo
	 * @example:
	 * |	var manager=grid.getManager('PagingManager');
	 * |	var pageInfo={
	 * |		url:'test',
	 * |		parameters:{user:'chen',password:'s'}
	 * |	}
	 * |	manager.setInfo(pageInfo);
	 * 		设置翻页控制器的url与parameters属性。在翻页查询数据时用到。
	 */
	setInfo:function(pageInfo){
		dojo.mixin(this,pageInfo);
	},
	
	/**
	 * @summary:
	 * 		得到翻页信息
	 * @return
	 * 		{object}
	 */
	getPageInfo:function(){
		var model=this.grid.getBinding();
		var store=model.store;
		var info={};
		if(store){
			//总记录数
			info.totalCount=store.getRecordCount();
			
			//每页显示的记录数
			info.pageSize=store.getPageSize();
			
			//页码
			info.pageNumber=store.getPageNumber();
			
			//本页主缓冲区的记录区域
			info.pageCount=store.getRowSet().getRowCount();
			
			//本页当前有效记录数  主缓冲区过滤缓冲区
	 		info.totalPageCount=info.pageCount+store.getRowSet().getRowCount(unieap.ds.Buffer.FILTER);
			//本页初始有效记录树 主缓冲区过滤缓冲区
			info.initialPageCount=store.getRowSet().getInitialCount();
		}
		return info;
	},
	
	/**
	 * @summary:
	 * 		进行翻页
	 * @param
	 * 		{number} no 页码
	 * @param
	 * 		{object|null} pageInfo 翻页信息
	 * @example：
	 * |	var manager=grid.getManager('PagingManager');
	 * |	var pageInfo={
	 * |		url:'test',
	 * |		parameters:{user:'chen',password:'s'}
	 * |	}
	 * |	manager.setPageNumber(2,pageInfo);
	 * 		翻到第2页,使用特定的翻页信息,没有参数时使用默认的翻页信息
	 */
	setPageNumber:function(no,pageInfo){
		var model=this.grid.getBinding();
		var store=model.getDataStore();
		var _store=store.collect('auto');
		_store.setPageNumber(no);
		if(this.onBeforePaging(_store)===false){
			return;
		}
		var indata={};
		if(this.url){
			indata.url=this.url;
		}
		if(this.parameters){
			indata.parameters=this.parameters;
		}
		if(pageInfo){
			if(pageInfo.url){
				indata.url=pageInfo.url;
			}
			if(pageInfo.parameters){
				indata.parameters=pageInfo.parameters;
			}
		}
		this._setPageNumber(no,indata,_store);
	},
	
	/**
	 * @summary:
	 * 		当翻页时，本页数据有变化时触发
	 * @param:
	 * 		{unieap.ds.DataStore} store
	 * @param:
	 * 		{unieap.grid.Binding} binding
	 * @description:
	 * 		默认实现为if(confirm("保存修改？")){binding.save();},
	 * 		可重新实现这个方法。
	 * 		在global.js中可以修改默认实现。
	 * @example:
	 * |<div dojoType="unieap.grid.Grid" id="grid">
	 * |	<header>
	 * |		<cell name="attr_empno" label="编号"></cell>
	 * |		<cell name="attr_ename" label="姓名"></cell>
	 * |	</header>
	 * |	<toolbar paging="{onPagingModified:onPM}">
	 * |	</toolbar>
	 * |</div>
	 * |<script type="text/javascript">
	 * |	//重新实现翻页时的保存信息
	 * |	function onPM(store,binding){
	 * |		var choice=confirm("保存修改?");
	 * |		if(choice){
	 * |			//由于save方法会延时执行,当配置pageCache为true时,不建议返回为false
	 * |			//即当有数据修改时,不翻页,只是保存数据
	 * |			binding.save({url:'/test.do'});
	 * |			return true; //保存不翻页
	 * |		}
	 * |		return false; //不保存翻页
	 * |	}
	 * |}
	 * 		
	 * @return:
	 * 	{boolean} 返回true不翻页 返回false进行翻页
	 */
	onPagingModified : function(store,binding){
		if(this.pagingModifiedSave=="saveconfirm"){
			if(confirm(RIA_I18N.grid.paging.saveModified)){
				binding.validate(true)&&binding.save();
				return true;
			}
		}else if(this.pagingModifiedSave=="discard"){
			//donothing
		}else if(this.pagingModifiedSave=="discardconfirm"){
			if(confirm(RIA_I18N.grid.paging.discardModified)){
				return false;
			}else{
				return true;
			}
		}
		return false;
	},
	
	//翻页操作,翻到第no页
	_setPageNumber:function(no,indata,_store){
		var model=this.grid.getBinding(),
			self=this,
			store=model.getDataStore();
		
		if(model.isModified()&&this.onPagingModified(store,model)){
			
		}else{
			if(this.pageCache){ 
				//缓存当前页
				this.cachePageData(store);
				var key = String(no);
				if(this._pageCache&&this._pageCache[key]){
					store.getRowSet()["primary"] = this._pageCache[key];
//					var primaryData = store.getRowSet().getData(unieap.ds.Buffer.PRIMARY);
//					primaryData = this._pageCache[key];
					store.setPageNumber(no);
					var dsName = store.getName();
					model.setDataStore(store);
					this.onAfterPaging();
					return;
				}
			}else{
				this.clearPageData();
			}
			//客户端排序翻页时，去掉排序状态
			if(this.grid.managers.get('ViewManager').orderType=='client'){
				this.grid.sortInfo=[];
			}
			if(this.clientPaging){
				this.doClientPaging(no);
			}else{
				this.doServerPaging(no,indata,_store);
			}
		}
	},
	
	//客户端翻页
	doClientPaging:function(pageNumber){
		var model=this.grid.getBinding();
		model.setDataStore(model.getDataStoreByPageNumber(pageNumber));
	},
	
	//服务端翻页
	doServerPaging:function(no,indata,_store){
		var model=this.grid.getBinding(),
			rpc=model.rpc,
			self=this;
		var callback=function(a,b){
			var ds,dc;
			if(arguments.length==2){
				ds=a;
				dc=b;
			}else if(arguments.length==1){
				dc=a;
			}else{
				return;
			}
			!ds&&(ds=dc.getSingleDataStore());
			//判断Grid绑定的DataStore是否在DataCenter中
			if(model.getDataStore() == dataCenter.getDataStore(ds.getName())) {
				dataCenter.append(dc,"replace");
			}else{
				model.setDataStore(ds);
			}
			self.onAfterPaging();
		}
		//rpc用于用户自己去发送请求，返回一个dc即可
		if(dojo.isFunction(rpc)){
			rpc(_store,callback,this.grid,'paging');
		}else{
			unieap.Action.doQuery(_store,dojo.mixin({
				load:function(ds,dc){
					callback(ds,dc);
				},
				sync:false
			},indata));
		}
		
	},
	
	
	/**
	 * @summary:
	 * 		返回当前页码
	 * @return：
	 * 		{number}
	 */
	getPageNumber:function(){
		var	store=this.grid.getBinding().store;
		if(store){
			return store.getPageNumber()
		}else{
			return 1;
		}
	},
	
	/**
	 * @summary:
	 * 		得到总的页数。
	 * @description:
	 * 		由totalCount/pageSize计算得来。
	 * @return：
	 * 		{number}
	 */
	getTotalPage:function(){
		var	store=this.grid.getBinding().store;
		if(store){
			var totalCount=store.getRecordCount();
			var pageSize=store.getPageSize();
			return Math.ceil(totalCount/pageSize);
		}else{
			return 1;
		}
	},
	
	/**
	 * @summary:
	 * 		翻到第一页
	 * @param
	 * 		{object|null} pageInfo 翻页信息
	 * @example
	 * |	var manager=grid.getManager('PagingManager');
	 * |	var pageInfo={
	 * |		url:'test',
	 * |		parameters:{user:'chen',password:'s'}
	 * |	}
	 * |	manager.firstPage(pageInfo);
	 * 		翻到第一页,使用特定的翻页信息,没有参数时使用默认的翻页信息
	 */
	firstPage:function(pageInfo){
		this.setPageNumber(1,pageInfo);
	},
	
	/**
	 * @summary:
	 * 		翻到上一页
	 * @param
	 * 		{object|null} pageInfo 翻页信息
	 * @example
	 * |	var manager=grid.getManager('PagingManager');
	 * |	var pageInfo={
	 * |		url:'test',
	 * |		parameters:{user:'chen',password:'s'}
	 * |	}
	 * |	manager.prevPage(pageInfo);
	 * 		翻到上一页,使用特定的翻页信息,没有参数时使用默认的翻页信息
	 */
	prevPage:function(pageInfo){
		var no=this.getPageNumber();
		if(no>1){
			this.setPageNumber(no-1,pageInfo);
		}
	},

	/**
	 * @summary:
	 * 		翻到下一页
	 * @param
	 * 		{object|null} pageInfo 翻页信息
	 * @example
	 * |	var manager=grid.getManager('PagingManager');
	 * |	var pageInfo={
	 * |		url:'test',
	 * |		parameters:{user:'chen',password:'s'}
	 * |	}
	 * |	manager.nextPage(pageInfo);
	 * 		翻到下一页,使用特定的翻页信息,没有参数时使用默认的翻页信息
	 */
	nextPage:function(pageInfo){
		var totalPage=this.getTotalPage();
		var no=this.getPageNumber();
		if(no<totalPage){
			this.setPageNumber(no+1,pageInfo);
		}
	},
	
	/**
	 * @summary:
	 * 		翻到最后一页
	 * @param
	 * 		{object|null} pageInfo 翻页信息
	 * @example
	 * |	var manager=grid.getManager('PagingManager');
	 * |	var pageInfo={
	 * |		url:'test',
	 * |		parameters:{user:'chen',password:'s'}
	 * |	}
	 * |	manager.lastPage(pageInfo);
	 * 		翻到最后一页,使用特定的翻页信息,没有参数时使用默认的翻页信息
	 */
	lastPage:function(pageInfo){
		var totalPage=this.getTotalPage();
		this.setPageNumber(totalPage,pageInfo);
	},
	

	onServerSort:function(){
		this.clearPageData();
	},
	
	
	//缓存翻页数据	
	cachePageData : function(store){
		var rowset=store.getRowSet(),
			key = String(store.getPageNumber());
		if(rowset.getSelectedCount(unieap.ds.Buffer.PRIMARY)>0||rowset.getSelectedCount(unieap.ds.Buffer.FILTER)>0){
			var primaryData = rowset.getData(unieap.ds.Buffer.PRIMARY),
				filterData=rowset.getData(unieap.ds.Buffer.FILTER),
				data=primaryData.concat(filterData);
			this._pageCache = this._pageCache || {};
			this._pageCache[key] = data;
		}else{
			this._pageCache&&this._pageCache[key]&&(delete this._pageCache[key]);
		}
	},
	
	
	//是否支持客户端翻页
	supportClientPaging:function(){
		return this.clientPaging;
	},
	
	
	/**
	 * @summary:
	 * 		获得在设置翻页缓存后,Grid视图中被选中(复选框)的行数据
	 * @return:
	 * 		{array}
	 * @example:
	 * |	var pagingMan=unieap.byId("grid").getManager("PagingManager");
	 * |	var data=pagingMan.getSelectedCachedData();
	 * |	unieap.debug(data);
	 */
	getSelectedCachedData:function(){
		var data=[],_pageCache;
		if(this.pageCache&&this._pageCache){
			_pageCache=this._pageCache;
			for(var key in _pageCache ){
				_pageCache[key]&&this._getSelectedItems(data,_pageCache[key])
			}
		}
		//获取本页选中的数据,并判断是否在_pageCache中
		var store=this.grid.getBinding().getDataStore(),
			rowset=store.getRowSet(),
			totalData=rowset.getData(unieap.ds.Buffer.PRIMARY).concat(rowset.getData(unieap.ds.Buffer.FILTER));
			pageNumber=String(store.getPageNumber());
		if(this._pageCache&&this._pageCache[pageNumber]){
			return data;
		}
		dojo.forEach(totalData,function(item){
			var row = new unieap.ds.Row(store.getRowSet(),item);
			row.isRowSelected()&&data.push(item);
			//item["_s"]==true&&data.push(item);
		});
		return data;
	},
	
	_getSelectedItems:function(aArray,rowDatas){
		for(var key in rowDatas ){
			var row = new unieap.ds.Row(this.grid.getBinding().getRowSet(),rowDatas[key]);
			row.isRowSelected()&&aArray.push(rowDatas[key]);
			//rowDatas[key]["_s"]==true&&aArray.push(rowDatas[key]);
		}
	},
	
	
	/**
	 * @summary:
	 * 		当有翻页缓存时,导出选中的记录
	 * @param:
	 * 		{Object||null} exportInfo
	 * @example:
	 * |<div dojoType="unieap.form.Button" label="导出选中数据"></div>
	 * |<script type="text/javascript">
	 * |var info={
	 * |	url:'/user_export.do?method=export',
	 * |	parameters:{'id':'2.7182818284590451'}
	 * |}
	 * |function doExport(){
	 * |	unieap.byId("grid").getManager("PagingManager").exportSelectedData(info);
	 * |}
	 * |</script>
	 * 
	 */
	exportSelectedData:function(exportInfo){
		if(!this.pageCache) return;
		var gridData=this.grid.getGridData(),
			data=this.getSelectedCachedData(),
			dsName=gridData['store'].getName();
		delete gridData['store'];
		dojo.mixin(gridData,exportInfo||{},{type:'client'},{
			store:new unieap.ds.DataStore(dsName,data)
		});
		unieap.Action.doExport(gridData);
		
	},
	
	/**
	 * @summary:
	 * 		清空缓存的翻页数据
	 * @description:
	 * 		设置新的store后,如果不想使用之前的翻页缓存信息。
	 * 		需要调用clearPageData方法。
	 */
	clearPageData : function(){
		this._pageCache = null;
	},
	
     /**
	 * @summary:
	 * 		在Grid翻页前监听的事件，若返回false，将会阻止翻页进行
	 * @param
	 * 		{unieap.ds.DataStore} store 要翻页的store   
	 * @return
	 *    {boolean}  
	 * @example:
	 * |	<div dojoType="unieap.grid.Grid" binding="{...}">
	 * |		<header>
	 * |			...
	 * |		</header>
	 * |		<toolbar paging="{parameters:{...},onBeforePaging:beforePage}">
	 * |		</toolbar>
	 * |	</div>
	 * |	function beforePage(store){
	 * |		if(store.getPageNumber()==2){
	 * |			return false;//此时不允许翻至第二页
	 * |		}
	 * |		return true;
	 * |	}
	 */
	onBeforePaging:function(store){
		return true;
	},
	
	 /**
	 * @summary:
	 * 		在Grid翻页后监听的事件
	 * @example:
	 * |	<div dojoType="unieap.grid.Grid" binding="{...}">
	 * |		<header>
	 * |			...
	 * |		</header>
	 * |		<toolbar paging="{parameters:{...},onAfterPaging:afterPage}">
	 * |		</toolbar>
	 * |	</div>
	 * |	function afterPage(){
	 * |		alert("翻页完成");
	 * |	}
	 */
	onAfterPaging:function(){
		
	}
});