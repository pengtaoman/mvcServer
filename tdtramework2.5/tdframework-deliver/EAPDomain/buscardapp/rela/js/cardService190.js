BusCard.define('/buscardapp/rela/js/cardService190.js',function(_buscard,cardParam){ 
	var Me = this;
	/**
	 * 190业务只能输入纯数字
	 */
	Me.$("serviceId").onblur = function(){
		var currentValue = Me.$("serviceId").value;
		if(!/^\d+$/.test(currentValue)){
			orderaccept.common.dialog.MessageBox.alert({
				message:"\u4e1a\u52a1\u53f7\u7801\u5fc5\u987b\u8f93\u5165\u7eaf\u6570\u5b57!"
			});
			Me.$("serviceId").value="";
			return false;
		}
	};
	
	/**
	 * 绑定提示信息
	 */
	(function(){
		if(Me.$("serviceId")){
			Me.$("serviceId").title ='190\u5fc5\u987b\u8f93\u5165\u533a\u53f7';
		}
		if(Me.$('label_serviceId')){
			Me.$('label_serviceId').innerHTML = "<span class='buscard-label'><span class='formRequested'>*</span>\u4e1a\u52a1\u53f7\u7801\uff1a<font color='red'>(190\u5fc5\u987b\u8f93\u5165\u533a\u53f7)<font></span>"
		}
	})();

	
});
