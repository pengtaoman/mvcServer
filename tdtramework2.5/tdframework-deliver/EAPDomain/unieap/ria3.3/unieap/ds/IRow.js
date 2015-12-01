if(!dojo._hasResource["unieap.ds.IRow"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
	dojo._hasResource["unieap.ds.IRow"] = true;
	dojo.provide("unieap.ds.IRow");
	dojo.declare("unieap.ds.IRow",null,{
		
		/** 
		 * @summary:
		 * 		Row的构造函数
		 * @param 
		 * 		{unieap.ds.IRowSet} rowset 
		 * 		该IRow对象所在的IRowSet对象
		 * @param
		 * 		{object} data 
		 * 		Row的初始化数据
		 * @param 
		 * 		{number} index 
		 * 		该IRow在IRowSet中的索引，索引从0开始
		 * @example：
		 * |	${1}new unieap.ds.Row(rowset,{key:'value',key2:'value2'},0)
		 * ${1}创建了一条数据
		 */
		constructor  : function(rowset, data, index){},
		
		/**
		 * @summary:
		 *		取得当前Row对象的状态
		 * @description:
		 * 		unieap.ds.Status.NEWMODIFIED=1;
		 * 		unieap.ds.Status.NOTMODIFIED=2;
		 * 		unieap.ds.Status.DATAMODIFIED=3;
		 * @return 
		 * 		{Integer} 
		 * 		行状态。如果该行数据没有状态标志，则默认为"未修改"状态。
		 */
		getRowStatus : function (){},
		
		/**
		 * @summary:
		 * 		设置当前Row对象的状态
		 * @param
		 * 		{number} status 
		 * 		状态标志
		 */
		setRowStatus : function (status){},
		
		/**
		 * @summary:
		 * 		判断当前Row对象是否是被选中状态
		 * @description:
		 * 		选择状态是相对于页面而言，譬如页面的checkBox元素。
		 * @return: 
		 * 		{boolean} 
		 * 		选中则为true 
		 */
		isRowSelected : function (){},
		
		/**
		 * @summary:
		 * 		设置当前Row对象的选择状态
		 * @param 
		 * 		{boolean} 
		 * 		selected=true：选择，selected=false：取消选择
		 */
		setRowSelected : function (selected){},
		
		/**
		 * @summary:
		 * 		获取Row内所有数据
		 * @description:
		 * 		也可以通过Row.data获取
		 * @return 
		 * 		{object} 
		 * 		具有键值对的数据对象
		 */
		getData: function(){},
		
		/**
		 * @summary:
		 * 		取得当前行所属的RowSet对象
		 * @description:
		 * 		也可以通过Row.rowset得到
		 * @return 
		 * 		{unieap.ds.RowSet} 
		 * 		当前行所属的RowSet对象
		 * @example:
		 * |	row.getRowSet();
		 */
		getRowSet: function(){},
		
		/**
		 * @summary:
		 * 		取得当前行所在RowSet中的索引
		 * @description:
		 * 		也可以通过Row.index取得
		 * @return 
		 * 		{number}
		 *  	当前行所在的RowSet的索引
		 */
		getIndex: function(){},
		
		/**
		 * @summary:
		 * 		取得当前Row对象某字段的值
		 * @param:
		 * 		{string} name 
		 * 		字段名称
		 * @return:
		 * 		{object}
		 * 		该字段的值,如果当前Row对象没有该对应项，则返回null
		 */
		getItemValue : function(name){},
		
		/**
		 * @summary:
		 * 		取得当前Row对象某字段的原始值
		 * @description:
		 * 		如果该字段没有被修改过，则返回当前值
		 * @param 
		 * 		{string} name
		 * 		字段名称
		 * @return 
		 * 		{object} 该字段的原始值。 
		 */
		getItemOrigValue : function(name){},
		
		/**
		 * @summary：
		 * 		给当前Row对象中的某个字段赋值。
		 * @description：
		 * 		如果当前Row对象中不存在该字段，则会自动创建该字段。
		 * 		在执行赋值操作前后，会被该Row所在的RowSet对象的onItemChanging和onItemChanged拦截。
		 * 		执行赋值操作前，会执行该Row对应的RowSet对象的onItemChanging事件，
		 * 		如果自定义的onItemChanging事件存在并且返回false，则不会给Row对象赋值,并且该setItemValue返回false，后续的onItemChanged不会被执行。
		 * 		执行赋值操作后，会执行该Row对应的RowSet对象的onItemChanged事件。
		 * 		如果onItemChanging和onItemChanged事件均未实现，则赋值后返回true
		 * @param: 
		 * 	{string} name 
		 * 	字段名称
		 * @param: 
		 * 	value 
		 * 	被赋的值
		 * @param: 
		 * 	{boolean}  nullable
		 * 	是否为可为空
		 * @return:
		 * 	{boolean}
		 * 	设置后的状态值
		 */
		setItemValue : function(name, value,nullable){},
		
		/**
		 * @summary：
		 * 		判断当前Row对象中某字段是否被修改过
		 * @param 
		 * 		{string} name
		 * 		字段名称
		 * @return 
		 * 		{boolean}
		 * 		false：该字段未被修改，true：该字段被修改过
		 */
		isItemChanged : function(name){},
		
		/**
		 * @summary：
		 * 		判断当前Row是否修改过
		 * @return
		 * 		{boolean}
		 * 		false：该Row未被修改，true：该字段被修改过
		 */
		isModified : function(){},
		
		/**
		 * @summary：
		 * 		清理当前Row对象
		 * 		只更新数据，不做状态更新
		 * 		如果需要做状态更新，使用RowSet中的resetUpdate(rowIndex) 替代（需要传入row的index）。
		 * @description:
		 * 		保留最新的状态，即删除掉所有原始值
		 */
		resetUpdate : function(){},
		
		/**
		 * @summary：	
		 * 		恢复当前Row的原始值
		 * @description
		 * 		去掉编辑状态
		 */
		discardUpdate : function(){},
		
		/**
		 * @summary：
		 * 		清空Row内的数据
		 * @description:
		 * 		保留信息：选择,状态修改,原始值。
		 */
		clear : function(){},
		
		/*
		 * @summary：
		 * 		得到Row数据上的某个标识的值，如在实现分组的时候，曾经增加名为_g的标识
		 * @description:
		 * 		在实现组件功能时，会使用本功能，该方法不对最终开发人员开放
		 * @param
		 * 		name 标识的名称
		 * @param
		 * 		parent 父标识的名称
		 * @example:
		 * |	row.getIdentifier("ep","_g")
		 * @return
		 *     返回指定标识对应的值
		 */
		getIdentifier:function(name){},
		
		/*
		 * @summary：
		 * 		设置Row数据上某个标识的值
		 * @description:
		 * 		在实现组件功能时，会使用本功能，该方法不对最终开发人员开放
		 * @example:
		 * |	row.setIdentifier("_g",{ep:true})
		 * @param
		 * 		name 标识名称
		 * @param
		 * 		value 标识值
		 * 		
		 */
		setIdentifier:function(name,value){},
		
		/*
		 * @summary：
		 * 		移除Row数据上某个标识
		 * @description:
		 * 		在实现组件功能时，会使用本功能，该方法不对最终开发人员开放
		 * @example:
		 * |	row.removeIdentifier("_g")
		 * @param
		 * 		name 标识名称
		 * 		
		 */
		removeIdentifier:function(name){}
	})
}