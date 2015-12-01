dojo.provide("unieap.tests.manual.form.TextBoxWithIcon.demo.PopupDemo");
dojo.require("unieap.form.Popup");
dojo.declare("unieap.tests.manual.form.TextBoxWithIcon.demo.PopupDemo",unieap.form.Popup,{

	_isShowingNow:false,

	height:"172px",
	
	//覆盖父类的_needFocus方法,当点击popup内的控件时,光标不focus到控件的文本域中
	_needFocus:function(){
		return false;
	},
	
	open:function(){
		this.inherited(arguments);
		dojo.style(this.popupcontainer,{
			overflow:'auto',
			border: '1px solid #7f9db9'
		});
	}
	
	
})
