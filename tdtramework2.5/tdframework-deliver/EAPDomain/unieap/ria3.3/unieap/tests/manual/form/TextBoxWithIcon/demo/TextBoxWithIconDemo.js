dojo.provide("unieap.tests.manual.form.TextBoxWithIcon.demo.TextBoxWithIconDemo");
dojo.require("unieap.form.TextBoxWithIcon");
dojo.declare("unieap.tests.manual.form.TextBoxWithIcon.demo.TextBoxWithIconDemo",unieap.form.TextBoxWithIcon,{
	
	popupClass:'unieap.tests.manual.form.TextBoxWithIcon.demo.PopupDemo',
	
	customWidget:null,
	
	//覆盖父类的文本框点击事件
	_onClick:function(evt){
		this.inherited(arguments);
		this._onIconClick();
	},
	
	//覆盖父类的图标点击事件
	_onIconClick:function(evt){
		var me=this;
		//如果控件是禁用状态,一切操作都无效
		if(!this.diabled){
			if(!this.customWidget){ //缓存textarea控件
				dojo.require("unieap.form.Textarea");
				this.customWidget=new unieap.form.Textarea({
					width:'195px',
					height:'170px'
				});
				this.customWidget.placeAt(this.getPopup().domNode);
			}
			//判断弹出窗口是否打开
			if(this.getPopup()._isShowingNow){
				this.getPopup().close();
			}else{
				this.getPopup().open();
			}
			this.onIconClick(evt);
		}
	}
	
})
