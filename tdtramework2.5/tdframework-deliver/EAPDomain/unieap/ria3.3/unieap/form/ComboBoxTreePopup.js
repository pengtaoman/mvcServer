dojo.provide("unieap.form.ComboBoxTreePopup");
dojo.require("unieap.form.Popup")
dojo.declare("unieap.form.ComboBoxTreePopup",unieap.form.Popup,{
	
	/**
	 * @declaredClass:
	 * 		unieap.form.ComboBoxTreePopup
	 * @superClass:
	 * 		unieap.form.Popup
	 * @summary:
	 * 		下拉树的弹出窗口管理
	 */
	
	_isShowingNow:false,
	/**
	 * @summary:
	 * 		设置下拉树弹出窗口的高度
	 * @type：
	 * 		{string}
	 * @default:
	 * 		172px
	 */
	height:"172px",
	
	open:function(){
		if(!this.widget._canPopOpen()){
			return;
		}
		this.inherited(arguments);
		dojo.style(this.popupcontainer,{
			overflow:'auto',
			border: '1px solid #7f9db9'
		});
	}
});