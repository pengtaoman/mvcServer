dojo.provide("unieap.form.ComboBoxDecoder");
dojo.declare("unieap.form.ComboBoxDecoder", null, {
	/**
	 * @declaredClass:
	 * 		unieap.form.ComboboxDecoder
	 * @summary:
	 * 		下拉框的转码控制器
	 * @example:
	 * |	<div dojoType="unieap.form.ComboBox" 
	 * |		decoder="{displayAttr:'display',valueAttr:'value'}">
	 * |	</div>
	 * 		显示值为'display'字段值,value值为'value'字段值
	 */
	
	constructor: function(params) {
		dojo.mixin(this, params);
	},
	
	/**
	 * @summary:
	 * 		指定特定的字段值在文本控件中显示，与valueAttr一起使用
	 * @type：
	 * 		{string}
	 * @default：
	 * 		 "CODENAME"
	 */
	displayAttr: "CODENAME",
	
	/**
	 * @summary:
	 * 		指定特定的字段值在作为关键字，与displayAttr一起使用
	 * @type:
	 * 		{string}
	 * @default:
	 * 		CODEVALUE
	 */
	valueAttr: "CODEVALUE",
	
	code: function(item) {
		if (item == null) return null;
		return item[this.valueAttr];
	},
	
	decode: function(item) {
		if (item == null) return null;
		return item[this.displayAttr];
	}
});
