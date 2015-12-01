BusCard.define('/buscardapp/rela/js/cardService800.js',function(_buscard,cardParam){ 
	var Me = this;
	var b = arguments[1];
	Me.serviceOfferId = b.serviceOfferId;
	
	(function(){
		Me.$("serviceId").value="800915";
	})();
	
	/**
	 * 800业务必须以118955
	 */
	Me.$("serviceId").onblur = function(){
		var currentValue = Me.$("serviceId").value;
		if(!(currentValue.startWith("800915"))){
			orderaccept.common.dialog.MessageBox.alert({
				message:"\u53f7\u7801\u5fc5\u987b\u4ee5800915\u5f00\u5934"
			});
			Me.$("serviceId").value="800915";
			return false;
		}
		if(currentValue.length!=10){
			orderaccept.common.dialog.MessageBox.alert({
				message:"\u53f7\u7801\u5fc5\u987b\u4e3a10\u4f4d\u6570\u5b57\u5b57\u7b26\u4e32"
			});
			Me.$("serviceId").value="800915";
			return false;
		}
	};
	
	Me.addPreDataBuilderAspect(function(ignoreCheck){
		if(window.prodOfferAcceptLoader!=null){
			if(Me.serviceOfferId == prodOfferAcceptLoader
			                .getServiceOfferConfigVO(orderaccept.prodofferaccept.util.ACTION_CD_CONST.PRODUCT_INSTALL).serviceOfferId){
				if(!!ignoreCheck){
					return true;
				}
				var currentValue = Me.$("serviceId").value;
				if(!(currentValue.startWith("800915"))){
					orderaccept.common.dialog.MessageBox.alert({
						message:"\u53f7\u7801\u5fc5\u987b\u4ee5800915\u5f00\u5934",
						onComplete : function() {
								        return function() {
									        Me.$("serviceId").focus();
								        }
							        }()
					});
					Me.$("serviceId").value="800915";
					return false;
				}
				if(currentValue.length!=10){
					orderaccept.common.dialog.MessageBox.alert({
						message:"\u4e1a\u52a1\u53f7\u7801\u5fc5\u987b\u4e3a10\u4f4d\u6570\u5b57\u5b57\u7b26\u4e32",
						onComplete : function() {
								        return function() {
									        Me.$("serviceId").focus();
								        }
							        }()
					});
					Me.$("serviceId").value="800915";
					return false;
				}
			}else{
				return true;
			}
		}else{
			return true;
		}
	});
});
