if (!dojo._hasResource["unieap.form.Formatter"]) {
	dojo._hasResource["unieap.form.Formatter"] = true;
	dojo.provide("unieap.form.Formatter");
	dojo.declare("unieap.form.Formatter", null, {
		/**
		 * @declaredClass:
		 * 		unieap.form.ValueFormatter
		 * @summary:
		 * 		Form组件格式化控制器的接口。
		 */
		/**
		 * @summary:
		 * 		从value值格式化成相应的值
		 * @param:
		 * 		{object} value
		 * @return:
		 * 		{string}
		 */
		format: function(value){
			return value;
		},
		
		/**
		 * @summary:
		 * 		format的相反过程，将值解析为value
		 * @param:
		 * 		{string} value
		 * @return:
		 * 		{object}
		 */
		parse: function(value){
			return value;
		}
	});
}