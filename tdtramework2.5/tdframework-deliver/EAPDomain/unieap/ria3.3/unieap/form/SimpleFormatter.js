if (!dojo._hasResource["unieap.form.SimpleFormatter"]) {
	dojo._hasResource["unieap.form.SimpleFormatter"] = true;
	dojo.provide("unieap.form.SimpleFormatter");
	dojo.require("unieap.form.Formatter");
	dojo.declare("unieap.form.SimpleFormatter", unieap.form.Formatter, {
		/**
		 * @declaredClass:
		 * 		unieap.form.SimpleFormatter
		 * @summary:
		 * 		格式化控制器。
		 */
		/**
		 * @summary:
		 * 		格式化字符串
		 * @type:
		 * 		{string}
		 */
		dataFormat: "",
		
		constructor: function(params){
			dojo.mixin(this, params);
		},
		/**
		 * @summary:
		 * 		设置格式化字符串
		 * @description：
		 * 		给dataFormat属性赋值
		 * @param:
		 * 		{string} dataFormat
		 */
		setFormat: function(dataFormat){
			this.dataFormat = dataFormat;
		},
		
		/**
		 * @summary:
		 * 		获取格式化字符串
		 * @description：
		 * 		获取dataFormat属性值
		 * @return:
		 * 		{string}
		 */
		getFormat: function(){
			return this.dataFormat;
		}
	});
	
}