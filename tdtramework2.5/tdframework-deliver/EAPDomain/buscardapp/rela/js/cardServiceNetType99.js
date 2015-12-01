BusCard.define('/buscardapp/rela/js/cardServiceNetType99.js',function(_buscard,cardParam){ 
	var Me = this;
	
	
	var b = arguments[1];
	Me.uniqueId = b.uniqueId;
	/**
	 * ҵ��������99�Ĳ�Ʒ��ҵ�������Ҫ���
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
		//����SP��½Э����������,���ҵ������λ��
		var attrSPValue = Me.getSPAttrValue();
		if(attrSPValue!=null){
			//5λ
			if(attrSPValue==1){
				if(currentValue.length != 5){
					orderaccept.common.dialog.MessageBox.alert({
						message:"\u5f53SP\u767b\u9646\u534f\u8bae\u7c7b\u578b\u9009\u62e9\u201cSGIP\u201d\u65f6\uff0c\u4e1a\u52a1\u53f7\u7801\u5fc5\u987b\u662f5\u4f4d\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01"
					});
					Me.$("serviceId").value="";
					return false;
				}
			//5~8λ
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
	 * ��ȡ����idΪ100019������ֵ�������Ծ����˽������ҵ�����
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
