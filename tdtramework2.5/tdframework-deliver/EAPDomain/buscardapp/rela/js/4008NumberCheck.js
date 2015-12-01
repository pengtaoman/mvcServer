BusCard.define('/buscardapp/rela/js/4008NumberCheck.js', function(_buscard, cardParam) {
	        var Me = this;
	        var ConstantsPool = dojo.require("orderaccept.common.js.ConstantsPool");
 			var ServingStatusConst = ConstantsPool.load("ServingStatusConst").ServingStatusConst;	
 			var ProductIdConst = ConstantsPool.load("ProductIdConst").ProductIdConst;
	        Me.$("serviceId").onblur = function(){
//	        	if(BusCard.trim(Me.$("serviceId"))!=""&&BusCard.trim(Me.$("serviceId")).length!=10){
//	        		orderaccept.common.dialog.MessageBox.alert({
//	        			message:"4008\u4E1A\u52A1\u53F7\u7801\u957F\u5EA6\u4E0D\u6B63\u786E"
//	        		});
//	        		Me.$("serviceId").value="";
//	        		return false;
//	        	}	    
	        	if(BusCard.trim(Me.$("serviceId").value)!=""){
	        	
	        		var cityCode = '';
	        		if(!!cardParam.cityCode){
	        			cityCode = cardParam.cityCode;
	        		}else{
	        			cityCode = $ac$.requestParam.customerData.cityCode;
	        		}
	        		var resourceInfo = BusCard.$remote("mktResInterfaceBO").check400Number(
	        								cityCode,
	        								56,
	        								BusCard.trim(Me.$("serviceId").value));
					if(resourceInfo.FLAG!=1){
						orderaccept.common.dialog.MessageBox.alert({
		        			message:resourceInfo.MSG
		        		});
		        		Me.$("serviceId").value="";
						return false;
					}else{
						var prodOfferId = '';
		        		if(!!cardParam.prodOfferId){
		        			prodOfferId = cardParam.prodOfferId;
		        		}else{
		        			prodOfferId = $ac$.selectedMainProdOfferInfoVO.prodOfferId;
		        		}
						var level = BusCard.$remote("serviceParamBO").getProductLevel(prodOfferId);
						if(level!=null&&level>resourceInfo.NUMBE_SORT){
							orderaccept.common.dialog.MessageBox.alert({
			        			message:"输入的号码不适合该套餐"
			        		});
			        		Me.$("serviceId").value="";
							return false;
						}
					}
	        	}
	        }
        });