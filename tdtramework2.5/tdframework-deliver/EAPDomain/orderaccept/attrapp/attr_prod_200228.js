BusCard.define('/orderaccept/attrapp/attr_prod_200228',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	if(Me.$("200228").value!=null){
		var oldValue = Me.$("200228").value;
	}
	Me.$("200228").onblur = function(){
		if(Me.$("200228").value==""){
			orderaccept.common.dialog.MessageBox.alert({
	        	message:"请填写正确的虚号码！"
	        })
	        return false;
		}
		if(Me.$("200228").value==oldValue){
			return true;
		}
		if(!prodOfferAcceptLoader.prodResRelaMap){
			prodOfferAcceptLoader.prodResRelaMap ={};
		}
		var vServiceId = Me.$("200228").value;
		var resourceValidateVO = {
			cityCode: $ac$.requestParam.customerData.cityCode,
			objectType:2,
			resourceType:9,
			objectID:vServiceId,
			serviceOfferId:$ac$.requestParam.actionCD,
			productId:100000,//用PSTN为例
			acceptDealer:_buscard.$session.acceptDealer,
			validateContent:{
				checkVirtualStatus:"1"
			}
		}	
		try {
			var result = orderaccept.prodofferaccept.util.ServiceFactory.
						getService("spring:commResourceBO").validateAndSelectResourceInfo(resourceValidateVO);
			prodOfferAcceptLoader.prodResRelaMap["200228"] = {
				serviceId : vServiceId,
				mktResInstId : result.INST_ID
			}
		}catch (e) {
	        orderaccept.common.dialog.MessageBox.alert({
	        	message:"不是有效的虚号码！"
	        });
	        Me.$("200228").value="";
			//BusCard.showErrorStack(e);
	        //throw e;
        }
	};
	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
	         * 综合查询页面处理分支
	         * @method
	         */
	        var allInfoQueryPageDispatch = function() {};
	        /**
	         * 二次业务处理分支
	         * @method
	         */
	        var secondBusinessPageDispatch = function() {};
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {};
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
