BusCard.define('/buscardapp/rela/js/cardServiceNetType99.js',function(_buscard,cardParam){ 
	var Me = this;
	
	
	var b = arguments[1];
	Me.uniqueId = b.uniqueId;
	/**
	 * 业务类型是99的产品的业务号码需要检测
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
		//根据SP登陆协议类型属性,检测业务号码的位数
		var attrSPValue = Me.getSPAttrValue();
		if(attrSPValue!=null){
			//5位
			if(attrSPValue==1){
				if(currentValue.length != 5){
					orderaccept.common.dialog.MessageBox.alert({
						message:"\u5f53SP\u767b\u9646\u534f\u8bae\u7c7b\u578b\u9009\u62e9\u201cSGIP\u201d\u65f6\uff0c\u4e1a\u52a1\u53f7\u7801\u5fc5\u987b\u662f5\u4f4d\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01"
					});
					Me.$("serviceId").value="";
					return false;
				}
			//5~8位
			}else if(attrSPValue==2){
				if(currentValue.length<5||currentValue.length>8){
					orderaccept.common.dialog.MessageBox.alert({
						message:"\u5f53SP\u767b\u9646\u534f\u8bae\u7c7b\u578b\u9009\u62e9\u201cSMGP\u201d\u65f6\uff0c\u4e1a\u52a1\u53f7\u7801\u53ef\u4ee5\u662f5~8\u4f4d\u7684\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01"
					});
					Me.$("serviceId").value="";
					return false;
				}
			}
		}
	};
	/**
	 * 获取属性id为100019的属性值，该属性决定了接入类的业务号码
	 */
	Me.getSPAttrValue = function(){
		if(prodOfferAcceptLoader&&prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_"+Me.uniqueId].attrCardWidget.busCardInstance){
			var targetAttr =prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_"+Me.uniqueId].attrCardWidget.busCardInstance.$('100019');
			if(!!targetAttr){
				return targetAttr.value;
			}
		}
		return null;
	};
});
