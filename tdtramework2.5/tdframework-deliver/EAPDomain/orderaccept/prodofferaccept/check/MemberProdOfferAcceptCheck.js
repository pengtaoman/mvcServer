/**
 * 此模块放置所有业务检测处理逻辑
 * 
 * @module
 */
defineModule("orderaccept.prodofferaccept.check.MemberProdOfferAcceptCheck", ["../util", "./ProdOfferChgCheck",
                "./ProdOfferChangeCommCheck"], function(util, ProdOfferChgCheck, ProdOfferChangeCommCheck) {
	        
	        dojo.declare("orderaccept.prodofferaccept.check.MemberProdOfferAcceptCheck", [ProdOfferChgCheck,
	                        ProdOfferChangeCommCheck], {
		                postscript : function() {

		                },
		                /**
						 * 执行订单侧的业务检测
						 * 
						 * @method
						 */
		                doOrderBusCheck : function(param) {
			                var selectedMemberProdOfferList = param.selectedMemberProdOfferList,
				                self = this,
				                quitList = dojo.filter(selectedMemberProdOfferList || [], function(memberProdOffer) {
					                        return memberProdOffer.action == 'quit';
				                        }),
				                serviceOfferId = self.controller
				                        .getServiceOfferConfigVO(util.ACTION_CD_CONST.PRODOFFER_CANCEL_ACTION).serviceOfferId,
				                paramList = dojo.map(quitList, function(member) {
					                        var requestParam = {
						                        customerId : $ac$.requestParam.customerData.custId,
						                        productId : member.productId,
						                        serviceOfferId : serviceOfferId,
						                        cityCode : member.prodInstVO.cityCode,
						                        userId : member.prodInstVO.prodInstId,
						                        serviceId : member.prodInstVO.accNbr,
						                        ifProdOfferAccept : "1"
						                        
					                        };
					                        return requestParam;
					                        
				                        }),
				                failure = dojo.some(paramList, function(requestParam) {
					                        var paramString = BusCard.buildParam(requestParam);
					                        var checkRequestUrl = BusCard.path.contextPath
					                                + "/secondAcceptAjaxAction.do?method=doCheckOrderValid&"
					                                + paramString;
					                        var jsonStr = BusCard.doGet(checkRequestUrl);
					                        var flag = executeAjaxResult(jsonStr);
					                        // assert check failure
					                        if (flag === false) { return true; }
					                        
				                        });
			                if (failure) {
				                return false;
			                } else {
				                failure = dojo.some(paramList, function(requestParam) {
					                var paramString = BusCard.buildParam(requestParam);
					                var checkRequestUrl = BusCard.path.contextPath
					                        + "/secondAcceptAjaxAction.do?method=doCheckServiceWait&" + paramString;
					                var jsonStr = BusCard.doGet(checkRequestUrl);
					                var resultJson = executeAjaxResult(jsonStr);
					                // assert check failure
					                if (resultJson === false) { return true; }
					                var preHandleFlag = "0";
					                var mutualOrderItemId = "0";
					                if (resultJson) {
						                if (window
						                        .confirm("\u5b58\u5728\u670d\u52a1\u4e92\u65a5\u53d7\u7406\u7b49\u5f85\u8ba2\u5355\uff0c\u8ba2\u5355\u7f16\u53f7\u4e3a"
						                                + resultJson + ",\u662f\u5426\u7ee7\u7eed?")) {
							                preHandleFlag = "1";
							                mutualOrderItemId = resultJson;
						                } else {
							                // assert check failure
							                return true;
						                }
					                }
					                
				                });
				                // assert check failure
				                if (failure) { return false; }
				                if (this.memberProdOfferChangeValidate(selectedMemberProdOfferList) === false) { return false; }
				                return true;
			                }
			                
		                },
		                /**
						 * container product-quit check
						 * 
						 * @override
						 * @method
						 */
		                doCheckMemberProdOfferSelect : function(param) {
			                if (this.inherited(arguments) === false) { return false; }
			                return this.doOrderBusCheck(param);
		                }
	                });
	        
        });