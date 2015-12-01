BusCard.define('/orderaccept/attrapp/attr_prod_200202.js',function(_buscard,cardParam){ 
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
    var util = dojo.require("orderaccept.prodofferaccept.util");
	Me.reset = function(){
		Me.$("200202").value = "";
		return false;
	}
	Me.checkUniqueNo = function(){
	    var requestParam = dojo.global.$appContext$.get("requestParam");
	    var  cityCode=requestParam.customerData.cityCode;
		var custId = requestParam.customerData.custId;
		var prodOfferInfoVO = $ac$.get("currentMainProdOfferInfoVO");
		var param = "&custId=" + custId + "&subGrpProdOfferId=" + prodOfferInfoVO.prodOfferId;
        var chekSubGroupProdInfo = util.ServiceFactory
                .getService("url:prodOfferSaleAjaxAction.do?method=getProductRelByGRPOfferList" + param);
        if (chekSubGroupProdInfo != "" && chekSubGroupProdInfo != undefined) {
           var   prodRelaList= chekSubGroupProdInfo.prodRelaList;
             dojo.forEach(prodRelaList, function(vo) {
                var prodB=vo.prodB;
                var prodInstList=BusCard.$remote('prodInstCommonBO').queryNotInValidProdInst({productId:prodB,cityCode:cityCode,ownerCustId:custId});
                if(!!prodInstList){
                    dojo.forEach(prodInstList,function(prodInstVO){
                    	var groupProdInstId=prodInstVO.accProdInstId;
	                	var count = orderaccept.prodofferaccept.util.ServiceFactory.getService("spring:prodInstRelaBO").getMemberAttrCount(parseInt(groupProdInstId),Me.$("200202").value,200202);		
						if(count>0){
							orderaccept.common.dialog.MessageBox.alert({
								message:"子群名称已被占用，请重新输入！"
							});
							Me.reset();	
							return ;
						}else{
							var countTemp=orderaccept.prodofferaccept.util.ServiceFactory.getService("spring:prodInstRelaBO").getMemberAttrTempCount(parseInt(groupProdInstId),Me.$("200202").value,200202);
							if(countTemp>0){
								orderaccept.common.dialog.MessageBox.alert({
									message:"子群名称已被占用，请重新输入！"
								});
								Me.reset();	
								return ;
							}
						}
                    });
                }
             });
        }
	}
	Me.$("200202").onblur = function(){
		Me.checkUniqueNo();
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
