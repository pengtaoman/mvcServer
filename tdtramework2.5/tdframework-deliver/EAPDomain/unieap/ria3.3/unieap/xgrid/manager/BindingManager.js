dojo.provide('unieap.xgrid.manager.BindingManager');
dojo.require("unieap.xgrid.manager.Manager");
dojo.require("unieap.util.util");
dojo.declare("unieap.xgrid.manager.BindingManager", unieap.xgrid.manager.Manager, {
	/**
	 * @declaredClass:
	 * 		unieap.xgrid.manager.BindingManager
	 * @summary:
	 * 		Grid数据绑定
	 * @description:
	 * 		Grid控件的数据绑定模块(binding)，用来和DataCenter的数据进行绑定
	 * @example:
	 * |<div id="grid" id="grid" dojoType="unieap.xgrid.Grid" width="500px" height="300px"
	 * |	binding="{store:'empDataStore'}">
     * |	<header>
     * |		<cell label="员工编号" width="150" name="attr_empno"></cell>
     * |		<cell width="100px" label="姓名" name="NAME"></cell>
     * |		<cell width="150px" label="职位" name="attr_job"></cell>
     * |		<cell width="150px" label="工资" name="attr_sal" dataType="number"></cell>
     * |	</header>
	 * |</div>
	 */
	
	/**
	 * @summary:
	 * 		设置Grid控件所绑定的DataStore对象
	 * 
	 * @type:
	 * 		{unieap.ds.DataStore}
	 * @example:
	 * |<div dojoType="unieap.xgrid.Grid" binding="{store:'empDs'}">
	 * |	...
	 * |</div>
	 */
	store: null,
	
	/*
	 * @summary:
	 * 		用户自定义获得datastore，给V4模型提供接口实现
	 * @param:
	 * 		{unieap.ds.DataStore} ds Grid控件绑定的datastore
	 * @param:
	 * 		{function} load 回调成功后执行
	 */
	rpc: null,
	
	//配置前台翻页后，分割原始datastore后新生成的datastore的名字
	_pagingStoreName: '_client_paging_ds' +new Date().getTime(),
	
	create: function() {
		this.connects = [];
		this.grid=this.widget;
		var store=this.store,
			tempDs=new unieap.ds.DataStore(store || "temp");
		if((!store || !store.rowSet) && !dojo.isString(store)){
			this.store =tempDs ;
		}else{
			var center;
			if(this.datacenter){
				center = this.datacenter;
			}else if(currentDataCenter){
				center = currentDataCenter;
			}else{
				center=dataCenter;
			}
			dojo.isString(this.store)?
					(this.originStore=unieap.getDataStore(this.store, center, false)):(this.originStore= this.store);
			//如果支持客户端翻页，构建一个新的datastore
			this._supportClientPaging()?
				(this.store = this.getDataStoreByPageNumber(this.originStore.getPageNumber())):(this.store = this.originStore);
		}
		this.setData(this.store||tempDs);
	},
	
	/**
	 * @summary:
	 * 		设置表格的数据源
	 * @param:
	 * 		{unieap.ds.DataStore} store
	 */
	setDataStore: function(store) {
		!store && (store=new unieap.ds.DataStore("temp"));
		var dsName=store.getName();
		//判断是否支持前台翻页
		if(this._supportClientPaging() && dsName.indexOf(this._pagingStoreName)==-1){
			this.originStore=store;
			this.store=this.getDataStoreByPageNumber(this.originStore.getPageNumber());
			this.setData(this.store);
		}else{
			this.setData(store);
		}
		this.grid.onStoreChanged();
	},
	
	
	//通过pageNumber属性从原始datastore中来读取数据
	getDataStoreByPageNumber: function(pageNumber){
		pageNumber=pageNumber||1;
		var store=this.originStore,
			rows = store.getRowSet().getData(),
			pageSize=store.getPageSize(),
			recordCount=store.getRecordCount();
		//构建datastore
		var start = (pageNumber-1)*pageSize,
			rowData = rows.slice(start, start+pageSize),
			dsObj = {
				pageSize: pageSize,
				pageNumber: pageNumber,
				recordCount: recordCount,
				rowSet:rowData,
				name:this._pagingStoreName,
				metaData:store.getMetaData()
			};
		return  new unieap.ds.DataStore(dsObj);
	},
	
	//是否支持客户端翻页
	_supportClientPaging: function(){
		var pagingManager=this.grid['PagingManager'];
		if(pagingManager){
			return pagingManager.supportClientPaging();
		}
		return false;
	},
	
	/**
	 * @summary:
	 * 		当有客户端翻页时，返回grid初始绑定的DataStore
	 * @return:
	 * 		{unieap.ds.DataStore}
	 */
	getOriginStore:function(){
		return this.originStore;
	},
	
	//删除当前grid绑定的datastore时，同步原始的主datastore
	syncOriginStore:function(indexs){
		if(this._supportClientPaging()){
			var pagingManager=this.grid['PagingManager'],
				pageInfo=pagingManager.getPageInfo(),
				totalCount=pageInfo['totalCount'],
				pageNumber=pageInfo['pageNumber'],
				pageSize=pageInfo['pageSize'],
				startNumber=(pageNumber-1)*pageSize;
			indexs=dojo.map(indexs,function(index){
				return startNumber+index;
			});
			if (totalCount > 0){
				this.originStore.getRowSet().deleteRows(indexs);
				//更新主datastore的总记录数
				this.originStore.setRecordCount(totalCount-indexs.length);
				//让当前页面总是显示为pageSize条记录
				this.setDataStore(this.getDataStoreByPageNumber(pageNumber));
			}
		}
	},
	
	
	/**
	 * @summary:
	 * 		取得Grid绑定的DataStore
	 * @return:
	 * 		{unieap.ds.DataStore}
	 */
	getDataStore: function() {
		return this.store;
	},
	
	/**
	 * @summary:
	 * 		清空表格的数据
	 * @description：
	 * 		清空表格的数据，相当于getBinding().setDataStore(null)
	 */
	clear : function(){
		this.setDataStore(null);
	},
	
	setData: function(data) {
		this.disconnect();
		this.store = (data ||  new unieap.ds.DataStore(this.store.getName()));
		this.setRowData(this.getRowSet().getData());
		this.grid.trigger && this.bindDataSetTrigger();
	},
	setRowData: function(data) {
		this.rowData = data;
	},
	
	//DataStore rowData同步更新this.rowData
	updateRowData: function() {
		this.setRowData(this.getRowSet().getData());
	},
	/**
	 * @summary:
	 * 		取得Grid绑定的RowSet
	 * @return:
	 * 		{unieap.ds.RowSet}
	 */
	getRowSet: function() {
		return this.store.getRowSet();
	},
	
	/**
	 * @summary:
	 * 		取得当前Grid的数据行数
	 * @return:
	 * 		{number}
	 */
	getRowCount: function() {
		return this.getRowData().length;
	},
	getRowData: function() {
		return this.rowData;
	},
	/**
	 * @summary:
	 * 		取得Grid的指定行数据
	 * @param:
	 * 		{number} inRowIndex
	 * @return:
	 * 		{object}
	 */
	getRow: function(inRowIndex) {
		return this.getRowData()[inRowIndex];
	},
	
	//取得锁定行数据
	getLockedRowData : function(){
		var d=[];
		if(this.grid.lockedRow){
			var statistics=this.grid.lockedRow.statistics;
			var getLockedRow=this.grid.lockedRow.getLockedRow;
			var setLockedRowData=this.grid.lockedRow.setLockedRowData;
			if(setLockedRowData){
				return setLockedRowData;
			}
			if(getLockedRow){
				if(typeof(getLockedRow)=='function'){
					var data=getLockedRow.apply(this.grid);
					if(data){
						d=d.concat(data);
					}
				}
			}
			if(statistics){
				var datas = this.store.getStatistics();
				if(datas){
					if (!dojo.isArray(statistics)) {
						statistics=[statistics];
					}
					dojo.forEach(statistics,function(statistic){
						var data={};
						for(var name in statistic){
							if(datas[name]&&datas[name][statistic[name]]){
								dojo.require('unieap.util.util')
								var statisticName=unieap.translate(statistic[name])||"计";
								data[name]=statisticName+": "+datas[name][statistic[name]]
							}
						}
						d.push(data);
					})
				}
			}
		}
		return d;
	},
	
	getDatum: function(inRowIndex, colName) {
		var row=this.getRowData()[inRowIndex];
		if(!row)return "";
		var value = this.getRowData()[inRowIndex][colName];
		if(value==null) return "";
		//对Grid单元格中的数据进行转义
		return String(value).replace(/&/g,"&amp;").
							 replace(/</g,"&lt;").
							 replace(/>/g,"&gt;").
							 replace(/\s/g,"&nbsp;");
							 
	},
	
	selectedData : function(inRowIndex){
//		var row = this.getRowData()[inRowIndex];
//		row["_s"] = true;
		var row = unieap.ds.Row(this.getRowSet(),this.getRowData()[inRowIndex]);
		row.setRowSelected(true);
	},
	unSelectedData : function(inRowIndex){
//		var row = this.getRowData()[inRowIndex];
//		row["_s"] = false;
		var row = unieap.ds.Row(this.getRowSet(),this.getRowData()[inRowIndex]);
		row.setRowSelected(false);
	},
	
	/**
	 * @summary:
	 * 		往Grid绑定的RowSet中插入一行数据
	 * @description:
	 * 		往RowSet中插入一行数据后，Grid会自动刷新并且显示该行数据
	 * 		如果不传入任何参数或者传入的第一个参数不为对象,将在控件的最前面增加一条记录。
	 * @param:
	 * 		{object} inData 要插入的数据对象
	 * @param:
	 * 		{number} inRowIndex 设置在哪个位置插入数据
	 * @example:
	 * |var binding=unieap.byId('grid').getBinding();
	 * |binding.insertRow({deptno:10},0); //在第一行插入一条记录
	 */
	insertRow: function(inData, inRowIndex){
		var len=arguments.length;
		if(len>=2){
			this.getRowSet().insertRow(inData,inRowIndex);
		}else if(len==1){
			typeof(inData)!='object'&&(inData={});
			this.getRowSet().insertRow(inData,0);
		}else{
			this.getRowSet().insertRow({},0);
		}
	},
	/**
	 * @summary:
	 * 		删除Grid绑定的RowSet中的某一行数据
	 * @description:
	 * 		删除RowSet中的一行记录后,Grid会自动刷新表格数据
	 * @param:
	 * 		{number} inRowIndex
	 * @example:
	 * |var binding=unieap.byId('grid').getBinding();
	 * |binding.deleteRow(0) //删除第一条数据
	 */
	deleteRow: function(inRowIndex) {
		this.getRowSet().deleteRow(inRowIndex);
		this.syncOriginStore([inRowIndex]);
	},
	/**
	 * @summary:
	 * 		删除Grid绑定的RowSet中的多行数据
	 * @description:
	 * 		删除RowSet中的多行记录后,Grid会自动刷新表格数据
	 * @param:
	 * 		{array} rowsIndexArray
	 * @example:
	 * |var binding=unieap.byId('grid').getBinding();
	 * |binding.deleteRows([0,1]) //删除Grid中的第一条和第二个数据
	 */
	deleteRows: function(rowsIndexArray) {
		this.getRowSet().deleteRows(rowsIndexArray);
		this.syncOriginStore(rowsIndexArray);
	},
	bindDataSetTrigger : function(){
		var grid = this.grid,
			rowset = this.getRowSet(),
			self = this;
		this.connects.push(dojo.connect(
			rowset,
			"onItemChanged",
			function(thisRow, itemName, value, index){
				grid.onItemChanged(index,itemName);
			}
		));
		/*监听RowSet的postAddRow事件*/
		this.connects.push(dojo.connect(
			rowset,
			"onAfterAddRow",
			function(){
				grid.onRowSetChanged();	
			}
		));
		/*监听RowSet的postAddRows事件*/
		this.connects.push(dojo.connect(
			rowset,
			"onAfterAddRows",
			function(){
				grid.onRowSetChanged();
			}
		));
		/*监听RowSet的postDeleteRow事件*/
		this.connects.push(dojo.connect(
			rowset,
			"onAfterDeleteRow",
			function(){
				grid.onRowSetChanged();
			}
		));
		/*监听RowSet的postDeleteRows事件*/
		this.connects.push(dojo.connect(
			rowset,
			"onAfterDeleteRows",
			function(){
				grid.onRowSetChanged();
			}
		));
		/*监听RowSet的postDeleteAllRows事件*/
		this.connects.push(dojo.connect(
			rowset,
			"onAfterDeleteAllRows",
			function(){
				grid.onStoreChanged();
			}
		));
		/*监听RowSet的onAfterDeleteSelectedRows事件*/
        this.connects.push(dojo.connect(
            this.getRowSet(),
            "onAfterDeleteSelectedRows",
            function(){
                grid.onRowSetChanged();
            }
        ));
		/*监听datastore的onRowSetChanged事件*/
		this.connects.push(dojo.connect(
			this.store,
			"onRowSetChanged",
			this,
			function(){
				grid.setDataStore(this.store);
			}
		));
		this.connects.push(dojo.connect(
			rowset,
			"onSort",function(){
				grid.onSorted();
		}));
	},
	//销毁绑定
	disconnect: function() {
		while(this.connects.length>0){
			dojo.disconnect(this.connects.pop());	
		}
	},
	//销毁绑定
	destroy: function() {
		this.disconnect();
	},
	/**
	 * @summary:
	 * 		判断Grid绑定的RowSet是否被修改
	 * @return:
	 * 		{boolean}
	 * @example:
	 * |var binding=unieap.byId('grid').getBinding();
	 * |var modified=binding.isModified();
	 */
	isModified: function() {
		return this.getDataStore().getRowSet().isModified();
	},
	/**
	 * @summary:
	 * 		求某一列的最大值
	 * @param:
	 * 		{string} name 列名
	 * @return:
	 * 		{number}
	 * @example:
	 * |var binding=unieap.byId('grid').getBinding();
	 * |var max=binding.max('attr_sal'); //获得RowSet中列为attr_sal的最大值
	 */
	max : function(name){
		return this.getRowSet().max(name);
	},
	/**
	 * @summary:
	 * 		求某一列的最小值
	 * @param:
	 * 		{string} name 列名
	 * @return:
	 * 		{number}
	 * @example:
	 * |var binding=unieap.byId('grid').getBinding();
	 * |var min=binding.min('attr_sal'); //获得RowSet中列为attr_sal的最小值
	 */
	min : function(name){
		return this.getRowSet().min(name);
	},
	/**
	 * @summary:
	 * 		求某一列的总和
	 * @param:
	 * 		{string} name 列名
	 * @param:
	 * 		{string} pattern 格式化字符串
	 * @return:
	 * 		{number}
	 * @example:
	 * |var binding=unieap.byId('grid').getBinding();
	 * |var sum=binding.sum('attr_sal'); //获得RowSet中列为attr_sal的总和
	 * |var sum1=binding.sum('attr_sal','###,###.000'); //sum1值形如123.25
	 */
	sum : function(name,pattern){
		return this.getRowSet().sum(name,pattern);
	},
	/**
	 * @summary:
	 * 		求某一列的平均值
	 * @param:
	 * 		{string} name 列名
	 * @param:
	 * 		{string} pattern 格式化字符串
	 * @return:
	 * 		{number}
	 * @example:
	 * |var binding=unieap.byId('grid').getBinding();
	 * |var avg=binding.avg('attr_sal'); //获得RowSet中列为attr_sal的平均值
	 * |var avg1=binding.avg('attr_sal','###,###.000'); //avg1值形如123.25
	 */
	avg : function(name,pattern){
		return this.getRowSet().avg(name,pattern);
	},
	/**
	 * @summary:
	 * 		持久化表格中的数据
	 * @param:
	 * 		{object} inData 要传入的对象
	 * @example:
	 * |var grid=unieap.byId('grid')
	 * |grid.getBinding().save()
	 * |grid.getBinding().save({url:'/demo.do?method=update'});
	 */
	save: function(inData){
		if(this.onBeforeSave()==false){
			return;
		}
		var _store=this.store,inData=inData||{};
		if(_store){
			if(inData['load']){
				dojo.connect(inData,'load',dojo.hitch(this,this._onAfterSave))
			}else{
				dojo.mixin(inData,{'load':dojo.hitch(this,this._onAfterSave)})
			}
			unieap.Action.doUpdate(_store,inData);
		}

	},
	_onAfterSave: function(){
		this.grid.ViewManager.refresh();
		this.onAfterSave();
	},
	
	/**
	 * @summary:
	 * 		表格保存前事件
	 * @description:
	 * 		此方法返回false时，保存操作将取消。
	 * @return:
	 * 		{boolean}
	 * @example:
	 * |<div dojoType="unieap.xgrid.Grid" id="grid" binding="{onBeforeSave:fn}">
	 * |</div>
	 * |function fn(){
	 * |	var isValid=unieap.byId("grid").getBinding().isValid();
	 * |    return isValid; //如果校验不成功,就不执行保存操作
	 * |}
	 * |unieap.byId("grid").getBinding().save(); //save执行之前会执行fn
	 */
	onBeforeSave: function() {
		return true;
	},
	
	/**
	 * @summary:
	 * 		表格持久化后回调事件
	 * @description:
	 * 		此方法会刷新表格的视图
	 * @example:
	 * |<div dojoType="unieap.xgrid.Grid" id="grid" binding="{onAfterSave:fn}">
	 * |</div>
	 * |function fn(){
	 * |	unieap.byId("grid").getBinding().save(); //save执行完毕后会执行fn
	 * |}
	 * |
	 */
	onAfterSave: function() {
	},
	/**
	 * @summary:
	 * 		表格排序
	 * @param:
	 * 		{unieap.xgrid.Cell} inCell
	 * @param:
	 * 		{number} asc 可选值为-1和1,-1表示降序，1表示升序
	 */
	sort: function(inCell, asc){
		if (this.onBeforeSort(inCell, asc)==false || !inCell.name) return;
		asc && (inCell.asc = asc);
		this.grid.setSortInfo(inCell);
		var sortInfo = this.grid.getSortInfo();
		//client sort	
		if(this.grid.ViewManager.orderType=="client") {
			//this.getRowSet().sorts(sortInfo);
			this.getRowSet().sort(inCell.name,inCell.asc,inCell.dataType);
			this.onAfterSort(inCell, asc);
		}else { //server sort
			var store = this.getDataStore(),
				    result = [];
			for(var i=0;i<sortInfo.length;i++){
				var order = sortInfo[i].name; 
				if(!store.getStatementName()){
					if(unieap.dbDialect&&unieap.dbDialect=='drm'){
						order = "[".concat(order).concat("]");
					}
					
				}
				order = order.concat(" ").concat(sortInfo[i].asc>0?"asc":"desc");
				result.push(order);
			}
			if(this.isModified()&&confirm("保存修改？")) {
					this.save();
			}
			 store.setOrder(result.join(","));
			 //请求处理，调用回调刷新表格，清除所有状态翻到第一页
			 store=store.collect('none');
			 store.setPageNumber(1);
			 var self=this,
			 	 callback=function(a,b){
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
					self.setDataStore(ds);
					self.onAfterSort(inCell, asc);
			 	 };

			 if(dojo.isFunction(this.rpc)){
			 	this.rpc(this.getDataStore().collect("none"),callback,this.grid,'sort');
			 }else{
				unieap.Action.doQuery(store,{
				 	load:function(ds,dc){
						callback(ds,dc);
					},
					sync:false
				 });
			 }	
		}
	},
	
	/**
	 * @summary:
	 * 		表格列排序前事件
	 * @description:
	 * 		此方法返回false时，排序操作将取消。
	 * @param:
	 * 		{unieap.xgrid.Cell} inCell
	 * @param:
	 * 		{number} asc 可选值为-1和1,-1表示降序，1表示升序
	 * @return:
	 * 		{boolean}
	 * @example:
	 *|<div dojoType="unieap.xgrid.Grid" id="grid" width="80%" height="250px" 
	 *| 	binding="{store:'empDataStore',onBeforeSort:fn}">
     *|</div>
     *|function fn(inCell,asc){
     *|}
	 */
	onBeforeSort: function(inCell, asc) {
		return true;
	},
	/**
	 * @summary:
	 * 		表格列排序后回调事件
	 * @param:
	 * 		{unieap.xgrid.Cell} inCell
	 * @param:
	 * 		{number} asc 可选值为-1和1,-1表示降序，1表示升序
	 * @example:
	 *|<div dojoType="unieap.xgrid.Grid" id="grid" height="250px"
	 *| 	binding="{store:'empDataStore',onAfterSort:test}">
	 *|</div>
     *|function fn(inCell,asc){
     *|}
	 */
	onAfterSort: function(inCell, asc) {
	}
});