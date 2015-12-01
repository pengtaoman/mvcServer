/**
 * 此模块放置所有业务检测处理逻辑 
 * 
 * @module
 */
defineModule("orderaccept.prodofferaccept.check.MainProdOfferChgCheck", ["./ProdOfferNewCheck", "../util",
                "orderaccept.common.dialog.MessageBox", "./ProdOfferChangeCommCheck"], function(ProdOfferNewCheck,
                util, messageBox, ProdOfferChangeCommCheck) {
	        dojo.declare("orderaccept.prodofferaccept.check.MainProdOfferChgCheck", [ProdOfferNewCheck,
	                        ProdOfferChangeCommCheck], {
		                postscript : function() {

		                },
		                /**
						 * 变更主销售品时销售品树的点击事件的检测
						 * 以后变更主销售品检测都加到这个里面,检测有先后顺序
						 */
		                doCheckBeforeClickMainProdOffer : function(mainProdOfferId) {
			                
			                if (this.doCommonMainProdOfferChgCheck(mainProdOfferId) === false) { return false; }
			                // 变更主销售品检测宽带标准化套餐的变更，宽带标准化套餐不允许变更为非宽带标准化套餐
			                if (!this.doCheckIfOfferStandard(mainProdOfferId)) { return false; }
			                // 预付费用户不允许变更为组合销售品
			                if (!this.doCheckIfOCSUser(mainProdOfferId)) { return false; }
			                /*如果当前销售品正在使用促销政策，需要校验新销售品是否能使用该政策*/
							/*402规则*/
							if (!this.doCheckMainOfferChangePromotion(mainProdOfferId)){
			                	return false;
			                }
			                return true;
		                },
		                
		                /**
						 * OCS预付费用户不可以变更为组合销售品
						 */
		                doCheckIfOCSUser : function(mainProdOfferId) {
			                var currentMainProdOffer = null;
			                // 先判断
			                var mainProdOfferInstVO = $ac$.mainProdOfferInstVO;
			                // 组合的不管
			                if (mainProdOfferInstVO.ifBundle == 1) { return true; }
			                // 单销售品下的产品信息
			                var prodInstList = mainProdOfferInstVO.prodInstList;
			                if (prodInstList && prodInstList.length > 0) {
				                var prodInstVo = prodInstList[0];
				                // 不是预付费直接返回，不检测
				                if (prodInstVo.paymentModeCd != ConstantsPool.load("PaymentModeConst").PaymentModeConst.PREPAID) { return true; }
			                }
			                if (!!$ac$.get("_tempMainProdOffer_")) {
				                currentMainProdOffer = $ac$.get("_tempMainProdOffer_");
			                } else {
				                currentMainProdOffer = util.ProdOfferHelper.getProdOfferDetail(mainProdOfferId);
			                }
			                // 如果是组合(包含共享和自主)
			                if (currentMainProdOffer.bindType == 2 || currentMainProdOffer.bindType == 1) {
				                var tips = "号码[" + prodInstList[0].accNbr + "]是预付费用户,不允许变更为组合销售品，请确认!";
				                messageBox.alert({
					                        busiCode : "08410147",
					                        infoList : [tips]
				                        });
				                return false;
			                }
			                return true;
		                },
		                
		                /**
						 * 待实现,需要调用PPM接口检测两个主套餐在规格层面是否允许变更 FIXME
						 * 
						 * @method
						 */
		                doCommonMainProdOfferChgCheck : function(mainProdOfferId) {
			                // //旧的主销售品实例信息
			                var mainProdOfferInstVO = $ac$.mainProdOfferInstVO;
			                var productIdList = [];
			                if (mainProdOfferInstVO.ifBundle == 1 && mainProdOfferInstVO.prodInstList.length == 0) {
				                // 获取自主板的组合
				                dojo.forEach($ac$.userHasProdOfferInfoList || [], function(userHasProdOfferInfo) {
					                        if (userHasProdOfferInfo.prodOfferType == 11
					                                && userHasProdOfferInfo.prodOfferType == "11") {
						                        dojo.forEach(userHasProdOfferInfo.prodInstList || [], function(
						                                        prodInstInfo) {
							                                productIdList.push(prodInstInfo.productId);
						                                });
					                        }
				                        });
			                } else {
				                productIdList = dojo.map(mainProdOfferInstVO.prodInstList || [],
				                        function(prodInstInfo) {
					                        return prodInstInfo.productId;
				                        });
			                }
			                var param = "&newProdOfferId=" + mainProdOfferId + "&oldProdOfferId="
			                        + mainProdOfferInstVO.prodOfferId;
			                var resultData = util.ServiceFactory.getService(
			                        "url:orderDetailAction.do?method=doCheckMainOfferIfCanChange", null, {
				                        method : 'post',
				                        content : {
					                        prodOfferId : mainProdOfferId,
					                        productList : productIdList
				                        }
			                        });
			                if (resultData == "0") {
				                // alert("不允许进行主销售品变更，请确认!");
				                var tips = "不允许进行主销售品变更，请确认!";
				                messageBox.alert({
					                        busiCode : "08410147",
					                        infoList : [tips]
				                        });
				                return false;
			                }
			                return true;
			                
		                },
		                
		                /**
						 * 宽带标准化套餐与非宽带标准化套餐之间的检测 根据约定，标准-》标准，标准-》组合
						 */
		                doCheckIfOfferStandard : function(mainProdOfferId) {
			                // 获取旧的主销售品实例信息
			                var mainProdOfferInstVO = $ac$.mainProdOfferInstVO;
			                // 旧的主销售品下的协议信息
			                var offerStandardInstList = mainProdOfferInstVO.offerStandardInstList;
			                // 如果没有协议信息则不做该检测
			                if (!offerStandardInstList || offerStandardInstList.length == 0) { return true; }
			                // 当前新选择的主销售品信息
			                var currentMainProdOffer = util.ProdOfferHelper.getProdOfferDetail(mainProdOfferId);
			                $ac$.set("_tempMainProdOffer_", currentMainProdOffer);
			                // 判断新的套餐下面是否有相同的产品id的产品，如果没有，则不允许变更
			                if (!dojo.some(currentMainProdOffer.offerProdRelaList || [], function(offerProdRelaVO) {
				                        return offerProdRelaVO.productId == mainProdOfferInstVO.prodInstList[0].productId;
			                        })) {
				                // alert("不能变更为销售品["+currentMainProdOffer.prodOfferName+"]");
				                messageBox.alert({
					                        busiCode : "08410204",
					                        infoList : [currentMainProdOffer.prodOfferName]
				                        });
				                return false;
			                }
			                // bindType为2或者是1，说明是组合销售品,允许进行变更
			                if (currentMainProdOffer.bindType == 2 || currentMainProdOffer.bindType == 1) { return true; }
			                // 非组合销售品
							// ，判断下面是否有协议信息。如果没有不允许进行变更。新的套餐销售品下的协议信息
			                var offerAgreementVOList = currentMainProdOffer.offerAgreementVO;
			                // 判断是否含有连个属性值
			                if (this.doCheckIfHasAttrForOfferStandard(offerAgreementVOList)) { return true; }
			                // alert("不能变更为销售品["+currentMainProdOffer.prodOfferName+"]");
			                messageBox.alert({
				                        busiCode : "08410204",
				                        infoList : [currentMainProdOffer.prodOfferName]
			                        });
			                return false;
		                },
		                /**
						 * 判断是否有两个协议属性，如果有，则说明是协议销售品
						 */
		                doCheckIfHasAttrForOfferStandard : function(offerAgreementVOList) {
			                if (offerAgreementVOList != null && offerAgreementVOList.length > 0) {
				                for (var p = 0; p < offerAgreementVOList.length; p++) {
					                var offerAgreementVO = offerAgreementVOList[p];
					                // 和产品接口约定，如果协议模板id为2，则为协议销售品
					                if (offerAgreementVO.templetId == '2' || offerAgreementVO.templetId == 2) { return true; }
				                }
			                }
			                return false;
		                },
		                /**
						 * container product-quit check
						 * 
						 * @override
						 * @method
						 */
		                doCheckMemberProdOfferSelect : function(param) {
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
				                
				                return this.inherited(arguments);
			                }
			                
		                },
		                /**
						 * 如当前用户有促销政策，判断新选中销售品是否可以使用该促销政策。不可以使用则提示错误信息，调用规则
						 * add by zhuguojun 20121203
						 * @override
						 * @method
						 */
		                doCheckMainOfferChangePromotion : function(mainProdOfferId){
		                	var mainProdOfferInstVO = $ac$.mainProdOfferInstVO;
		                	if(mainProdOfferInstVO.bundleType == 0){
		                		var promotionList = dojo.global.$appContext$.get("orderPromotionList");
		                		if(promotionList && promotionList.length > 0){
		                			var prodInstVO = mainProdOfferInstVO.prodInstList[0];
									var promptVO = util.ServiceFactory.getService(
										"url:orderDetailAction.do?method=doCheckMainOfferChangePromotion", null, {
											method : 'post',
											content : {
												cityCode : mainProdOfferInstVO.cityCode,
												serviceId : prodInstVO.accNbr,
												userId : prodInstVO.accProdInstId,
												prodOfferInstId : mainProdOfferInstVO.prodOfferInstId,
												productId : prodInstVO.productId,
												prodOfferId : mainProdOfferInstVO.prodOfferId,
												newProdOfferId : mainProdOfferId,
												serviceKind : prodInstVO.serviceRelationVO.serviceKind
											}
										}
									);
									if (promptVO && promptVO.code != null && parseInt(promptVO.code + "") < 0) {
										messageBox.alert({
											message : promptVO.message
										});
										return false;
									}
		                		}
		                	}
		                	return true;
		                }
	                });
	        
        });