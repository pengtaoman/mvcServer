dojo.provide("unieap.form.RadioButton");
dojo.require("unieap.form.CheckBox");
dojo.declare("unieap.form.RadioButton", unieap.form.CheckBox, {
	/**
	 * @declaredClass:
	 * 		unieap.form.RadioButton
	 * @summary:
	 * 		单选按钮，支持数据绑定
	 * @superClass:
	 * 		unieap.form.CheckBox
	 */
	templateString:"<div class=\"u-form-rdoBtn\" >" +
			"<div dojoAttachPoint=\"modifiedNode\" class=\"u-form-modified\"></div>"+
			"<input type=\"radio\" class=\"u-form-chkInput\" name=\"${name}\"  dojoAttachPoint=\"inputNode,focusNode\" onfocus=\"unieap.fep&&unieap.fep(this)\"/>"+
			"</div>",
	
	
	//在ie<8下,无法把一组单选按钮变为按钮组,例如:
	//<input type='radio' /><input type='radio' /><input type='raido'>
	//dojo.forEach(document.getElementsByTagName('input'),function(ele){
	//       ele.name='radioBtn'
	//})
	// 事实上,他们依然不是单选按钮组,单选按钮组中的元素可以通过左右箭头进行导航
	//
	name:'radioBtn',
	
	_onButtonClick: function(evt) {
		if(!this.onBeforeClick()||!this.onBeforeChange()){
			dojo.stopEvent(evt);
			return;
		
		}
		this.setChecked(true);
		this.onClick(evt);
		this._onChange();
	}
});
