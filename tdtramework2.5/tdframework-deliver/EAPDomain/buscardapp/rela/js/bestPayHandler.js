BusCard.define('/buscardapp/rela/js/bestPayHandler.js', function(_buscard, cardParam) {
	        var Me = this;
	        if (!cardParam.serviceRelation) {
		        var userId = cardParam.userId;
		        if (window.prodOfferAcceptLoader) {
			        var accessProdInstList = BusCard.jsonPath(dojo.global.$appContext$.get("userHasProdOfferInfoList")
			                        || [], "$[*].prodInstList[?(@.serviceRelationVO!=null)]");
			        if (accessProdInstList && accessProdInstList.length > 0) {
				        var prodInstVO = BusCard.find(accessProdInstList, function(instVO) {
					                return instVO.prodInstId == cardParam.userId;
				                });
				        if (prodInstVO && prodInstVO.serviceRelationVO) {
					        cardParam.serviceRelation = prodInstVO.serviceRelationVO;
				        }
				        
			        }
		        }
		        if(!cardParam.serviceRelation&&cardParam.userId){
		        	cardParam.serviceRelation = BusCard.$remote("serviceRelationDAO").queryById({userId:cardParam.userId+""});
		        }
		        
	        }
	        var parameters = "&serviceId=" + cardParam.serviceRelation.serviceId;
	        parameters += "&productId=" + cardParam.productId;
	        parameters += "&cityCode=" + (cardParam.cityCode||cardParam.serviceRelation.cityCode);
	        parameters += "&serviceOfferId=" + cardParam.serviceOfferId;
	        parameters += "&userId=" + cardParam.userId;
	        
	        try {
		        // Ô¤²ð»ú ¡¢²ð»ú ÒíÖ§¸¶ÕË»§Óà¶î¼ì²â
		        resultJsonStr = executeRequest("secondAcceptAjaxAction", "bestPayAccountCheck", parameters);
		        result = executeAjaxResult(resultJsonStr);
		        if (result) {
			        Me.$("wingPaymentBalance").value = result;
			        if (window.confirm("\u7ffc\u652f\u4ed8\u8d26\u6237\u4f59\u989d" + result
			                + "\u5143,\u662f\u5426\u653e\u5f03?")) {
				        $("ifGiveupBalance").value = 1;
			        } else {
				        $("ifGiveupBalance").value = 0;
			        }
		        }
	        }
	        catch (e) {
		        alert(e.message);
	        }
        });