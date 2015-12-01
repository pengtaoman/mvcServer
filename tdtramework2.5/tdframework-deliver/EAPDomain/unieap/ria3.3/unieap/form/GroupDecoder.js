if(!dojo._hasResource["unieap.form.GroupDecoder"]){
dojo._hasResource["unieap.form.GroupDecoder"] = true;
dojo.provide("unieap.form.GroupDecoder");

dojo.declare("unieap.form.GroupDecoder", null,{
	/**
	 * @declaredClass:
	 * 		unieap.form.GroupDecoder
	 * @summary:
	 * 		按钮组的转码控制器
	 */
	
	/**
	 * @summary:
	 * 		指定特定的字段值在作为关键字，与displayAttr一起使用
	 * @type:
	 * 		{string}
	 * @default:
	 * 		"CODEVALUE"
	 */
	valueAttr: "CODEVALUE",
	
	/**
	 * @summary:
	 * 		指定特定的字段值在文本控件中显示，与valueAttr一起使用
	 * @type：
	 * 		{string}
	 * @default：
	 * 		 "CODENAME"
	 */
	displayAttr: "CODENAME",
	
	constructor: function(params) {
		dojo.mixin(this, params);
	},
	
	/**
	 * @summary:
	 * 		转码方法
	 */
	decode: function(value) {
		return value;
	},
	
	/**
	 * @summary:
	 * 		取得属性值
	 * @return:
	 * 		string
	 */
	getValueAttr: function() {
		return this.valueAttr;
	},
	
	/**
	 * @summary:
	 * 		取得属性显示值
	 * @return:
	 * 		string
	 */
	getDisplayAttr: function() {
		return this.displayAttr;
	}
	
});
}
