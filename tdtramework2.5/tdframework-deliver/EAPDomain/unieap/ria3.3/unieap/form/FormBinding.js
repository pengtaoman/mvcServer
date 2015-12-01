dojo.provide("unieap.form.FormBinding");
dojo.require("unieap.util.util");
dojo.declare("unieap.form.FormBinding",null,{
	/**
	 * @declaredClass:
	 * 		unieap.form.FormBinding
	 * @summary:
	 * 		FormBinding为Form控件的数据绑定模块，负责Form的数据绑定相关操作
	 * @example:
	 * |<div dojoType="unieap.form.Form" binding="{store:'storeName',bindIndex:1}">
	 * |	<div dojoType="unieap.form.TextBox" binding="{name:'name'}"></div>
	 * |</div>
	 * 		配置Form的binding属性，
	 * 		创建了一个Form及相应的数据绑定模块FormBinding。
	 */
	 
	 constructor:function(params){
	 	dojo.mixin(this,params);
	 	this.connects = [];
		this.store&&this._initRow(this.store,this.bindIndex);

	 },
	 
	/**
	 * @summary:
	 * 		标识Form控件的数据来源
	 * @description：
	 * 		即Form控件和哪个DataStore进行数据绑定
	 * @type:
	 * 		{unieap.ds.DataStore}
	 * @example:
	 * |<div dojoType="unieap.form.Form" binding="{store:'productStore'}">
	 * |</div>
	 * 		绑定了名为'productStore'的DataStore
	 */
	store: null,
	
	/**
	 * @summary:
	 * 		设置Form控件所绑定的DataStore对象来源于哪个DataCenter，仅在store属性为DataStore名称时生效
	 * 		若没有指明,将会在全局的DataCenter对象(即dataCenter)中获取DataStore
	 * @type:
	 * 		{unieap.ds.DataCenter}
	 * @example:
	 * |<div dojoType="unieap.form.Form" binding="{store:'productStore',datacenter:dc}">
	 * |</div>
	 * 		将DataCenter dc中名为'productStore'的DataStore绑定在form上
	 */
	datacenter: null,
	
	/**
	 * @summary:
	 * 		指定DataStore中哪条Row与Form控件进行数据绑定
	 * @description:
	 * 		bindIndex是Row的索引,默认值为0，即绑定DataStore中的第一条Row记录
	 * @type:
	 * 		{number}
	 * @example:
	 * |<div dojoType="unieap.form.Form" binding="{store:'demo',bindIndex:1}">
	 * |</div>
	 */
	bindIndex: 0,
	
	//事件绑定
	connects : null,
	/**
	 * @summary:
	 * 		获得与Form控件绑定的DataStore
	 * @return:
	 * 		{unieap.ds.DataStore}
	 * @example:
	 * |var form=unieap.byId('form');
	 * |var store=form.getBinding().getDataStore();
	 * |unieap.debug(store);
	 * 
	 */
	getDataStore: function() {
		return this.store;
	},
	
	/**
	 * @summary:
	 * 		重新设置与Form控件绑定的DataStore
	 * @description:
	 * 		重新绑定后,Form控件的值将发生变化
	 * @param:
	 * 		{unieap.ds.DataStore} store
	 * @param:
	 * 		{number} bindIndex datastore中Row的索引
	 * @example:
	 * |var form=unieap.byId('form');
	 * |var binding=form.getBinding();
	 * |var ds=new unieap.ds.DataStore('demo',[{name:'jack',age:21},{name:'Jim',age:19}]);
	 * |binding.setDataStore(ds,1);
	 * 绑定名为demo的DataStore的第2条Row
	 */
	setDataStore: function(store, bindIndex) {
		this._initRow(store, bindIndex);
		this.bind(this.row);
	},
	
	//绑定行对象
	_initRow: function(store, bindIndex) {
		typeof(bindIndex)=='undefined'&&(bindIndex=0); //bindIndex不存在时默认为0
		
		var center;
		if(this.datacenter){
			center = this.datacenter;
		}else if(currentDataCenter){
			center = currentDataCenter;
		}else{
			center=dataCenter;
		}
		if(dojo.isString(store)){
			this.store=unieap.getDataStore(store, center, false);
		}else{
			this.store = store;
		}
		if(!this.store) return;
		var count = this.store.getRowSet().getRowCount();
		if (count == 0) {
			this.store.getRowSet().addRow({});
			count = 1;
		}
		this.bindIndex = (count<=bindIndex || bindIndex<0 ) ? (count-1) : bindIndex;
		this.row = this.store.getRowSet().getRow(bindIndex);
	},
	
	/**
	 * @summary:
	 * 		获取与Form控件绑定的Row
	 * @return:
	 * 		{unieap.ds.Row}
	 * @example:
	 * |var form = unieap.byId('formId');
	 * |var row = form.getBinding().getRow();
	 */
	getRow: function() {
		return this.row;
	},
	
	/**
	 * @summary:
	 * 		对表单进行数据绑定
	 * @param:
	 * 		{unieap.ds.Row} row 表单控件要绑定的Row
	 * @example:
	 * |<div dojoType="unieap.form.Form" id="form">
	 * |	<div dojoType="unieap.form.TextBox" binding="{name:'name'}"></div>
	 * |	<div dojoType="unieap.form.TextBox" binding="{name:'age'}"></div>
	 * |</div>
	 * |var form=unieap.byId('form');
	 * |var ds=new unieap.ds.DataStore('demo',[{name:'jack',age:22},{name:'Jim',age:19}]);
	 * |var row=ds.getRowSet().getRow(0);
	 * |form.getBinding().bind(row);
	 * 		给Form绑定一条数据
	 */
	bind: function(row) {
		
		this.unbind();
		!row && this.widget.clear();
		if(!row||row.declaredClass!="unieap.ds.Row"){
			return;
		}
		if(this.row!=row||!this.row){
			this.row=row;
			var rs = this.row.getRowSet();
			if(rs){
				this.store= rs.getDataStore();
			}
		}
		this._bind(row);
		this.addEventListener();
	},
	
	_bind: function(row) {
		var storeList = [],widgetList=[],temp;
		dojo.forEach(this.widget.getDescendants(), 
			function(widget,index,widgets) {
				if(!(widget instanceof unieap.form.FormWidget)) return;
				//收集值转义的DataStore,包括ComboBox和InlineEditBox等组件
				//ComboBox和ComboBoxTree组件 转义 配置dataProvider属性，其他组件配置decoder属性
				if(((temp = widget.dataProvider) && temp.store) ||((temp = widget.decoder) && temp.store)){
						var store = unieap.getDataStore(temp.store,null,true);
						if(!store){
							storeList.push(temp.store);
							widgetList.push(widget);
						}else{
							widget.getBinding()&&widget.getBinding().bind(row);
						}
				}else{
					//绑定不需要转码的控件
					widget.getBinding()&&widget.getBinding().bind(row);
				}
		});
			
		//绑定需要转码的控件
		if(storeList.length>0){
			unieap.Action.getMultiCodeList(storeList,dojo.hitch(this,function(){
				dojo.forEach(widgetList,function(widget){
					widget.getBinding()&&widget.getBinding().bind(row);
				});
				this.onBind();
			}));
		}
		else{
			this.onBind();
		}
		
		//第一次调用之后，重写_bind方法的方法体：之后调用不做如上逻辑判断，直接绑定	
		this._bind	= function(row){
			dojo.forEach(this.widget.getDescendants(), 
			function(widget,index,widgets) {
				widget.getBinding()&&widget.getBinding().bind(row);});
		}
	},
	onBind : function(){
		
	},
	
	/**
	 * @summary:
	 * 		解除表单控件和DataStore的绑定
	 * @description:
	 * 		假设有一个表单控件已经和DataStore进行了绑定,调用该方法,表单控件将解除和DataStore的绑定关系
	 * @example:
	 * |var form=unieap.byId('form');
	 * |form.getBinding().unbind();
	 */
	unbind: function() {
		//清除绑定状态
		dojo.forEach(this.widget.getDescendants(), function(widget) {
			widget.setModified(false);
			widget.getValidator()&&widget.getValidator().handleError(true);
			var binding = widget.getBinding();
			binding && binding.unbind();
		});
		this.row=null;
		this.store=null;
		this.removelEventListener();
	},
	addEventListener : function(){
		if(this.row.getRowSet()!=null){
			this.connects.push(dojo.connect(this.row.getRowSet(),"onResetUpdate",this,function(){
				this.bind(this.row);
			}));
			this.connects.push(dojo.connect(this.getDataStore(),"onRowSetChanged",this,function(){
				//debugger;
				this.setDataStore(this.getDataStore());
			}));
		}
	},
	removelEventListener : function(){
		while(this.connects.length){
			dojo.disconnect(this.connects.pop());
		}
	}
});
