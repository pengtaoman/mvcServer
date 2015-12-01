dojo.provide("unieap.form.CheckGroupProvider");
dojo.require("unieap.util.util");
dojo.declare("unieap.form.CheckGroupProvider", null,{
	/**
	 * @declaredClass:
	 * 		unieap.form.CheckGroupProvider
	 * @summary:
	 * 		按钮组数据源控制器
	 */
	 
	/**
	 * @summary:
	 * 		设置按钮组绑定的DataStore。
	 * @type:
	 * 		{string|unieap.ds.Datastore}
	 */
	store: null,
	
	constructor: function(params) {
		dojo.mixin(this, params);		
		this.store = unieap.getDataStore(this.store,null,true);
	},
	
	/**
	  * @summary:
	  * 	取得数据源对象
	  * @return：
	  * 	unieap.ds.DataStore
	  */
	getDataStore: function() {
		return this.store;
	},
	
	/**
	  * @summary:
	  * 	设置数据源
	  * @param：
	  * 	{unieap.ds.DataStore|string} store
	  */
	setDataStore: function(store) {
		this.store = unieap.getDataStore(store,null,true);
		this.widget.setLayout(this.store);		
	},
	
	/**
	 * @summary:
	 * 		取得指定条目的值
	 * @param:
	 * 		{string} name
	 * 		列名
	 * @param:
	 * 		{number} inRowIndex
	 * 		行号
	 */
	getItemValue: function(name,inRowIndex) {
		return this.store.getRowSet().getItemValue(inRowIndex,name);
	}
});
