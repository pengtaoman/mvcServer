/**
 * 此模块放置所有业务检测处理逻辑
 * 
 * @module
 */
defineModule("orderaccept.prodofferaccept.check.ProdOfferChangeCommCheck", ["../util",
                "orderaccept.common.dialog.MessageBox"], function(util, messageBox) {
	        dojo.declare("orderaccept.prodofferaccept.check.ProdOfferChangeCommCheck", [], {
		                memberProdOfferChangeValidate : function(selectedMemberProdOfferList) {
			                var currentMainProdOfferInfoVO = $ac$.get("currentMainProdOfferInfoVO");
			                var mainProdOfferInstVO = $ac$.get("mainProdOfferInstVO");
			                var custId = $ac$.get("requestParam").customerData.custId;
			                var cityCode = mainProdOfferInstVO.cityCode;
			                if (currentMainProdOfferInfoVO.bindType != 2) { return true; }
			                var resultList = dojo.map(dojo.filter(selectedMemberProdOfferList, function(member) {
				                                return true;
				                                if (member.action == 'split' || member.action == 'change'
				                                        || member.action == 'nochange' || member.action == 'quit') {
					                                return true || (member.prodOfferId != member.offerInstVO.prodOfferId);
					                                
				                                } else {
					                                return false;
				                                }
				                                
			                                }), function(memb) {
				                        var data = {
					                        productId : memb.productId,
					                        userId : memb.prodInstVO ? memb.prodInstVO.prodInstId : null,
					                        serviceId : memb.prodInstVO ? memb.prodInstVO.accNbr : null,
					                        prodOfferId : memb.offerInstVO ? memb.offerInstVO.prodOfferId : null,
					                        newProdOfferId : memb.prodOfferId,
					                        prodOfferInstId : memb.offerInstVO
					                                ? memb.offerInstVO.prodOfferInstId
					                                : null,
					                        custId : custId,
					                        cityCode : memb.prodInstVO ? memb.prodInstVO.cityCode : cityCode || null,
					                        actionCD : memb.action,
					                        stateCD : memb.prodInstVO ? memb.prodInstVO.stateCD : null
				                        };
				                        return data;
				                        
			                        });
			                
			                if (resultList && resultList.length) {
			                	/*add by zhuguojun for REQ2012040929926   权限控制营业员是否可以做组合拆分和欠费用户组合拆分 start*/
				                var haveNoRight = dojo.some(resultList, function(mem){
				                	if(mem.actionCD == 'split'){
										var param = "menuId=841ABWA";
										var resultJsonStrNormal = executeRequest("prodOfferSaleAjaxAction", "InnetCheck", param);
										if(resultJsonStrNormal != "1"){
											messageBox.alert({
												message : "没有权限做组合拆分操作"
											});
					                		return true;
										}
										if(mem.stateCD == "129997"){
											var param = "menuId=841ABWB";
											var resultJsonStrNormal = executeRequest("prodOfferSaleAjaxAction", "InnetCheck", param);
											if(resultJsonStrNormal != "1"){
												messageBox.alert({
													message : "没有权限做欠费组合拆分操作"
												});
						                		return true;
											}
										}
				                	}
				                	return false;
				                });
				                
				                if(haveNoRight){
					                return false;
				                }
				                /*add by zhuguojun for REQ2012040929926   权限控制营业员是否可以做组合拆分和欠费用户组合拆分 end*/
				                /*add by zhuguojun for 老套餐为包周期销售品时，变化或拆分后的新套餐必需为包賳销售品 start*/
				                var agreementCheck = dojo.some(selectedMemberProdOfferList, function(memb){
				                	if(memb.action == 'change' || memb.action == 'split'){//如果成员是做变更或拆分，需要检测包周期销售品
				                		if(util.ProdOfferHelper.ifAgreementpRrodOffer(memb.offerInstVO, 2)){//如果老销售品是包周期销售品
				                			if(!util.ProdOfferHelper.ifAgreementpRrodOffer(memb.prodOfferId, 3)){
				                				messageBox.alert({
													message : "不能由宽带标准化套餐变更为普通周价销售品"
												});
												return true;
				                			}
				                		}
				                	}
				                	return false;
				                });
				                if(agreementCheck) {
				                	return false;
				                }
				                /*add by zhuguojun for 老套餐为包周期销售品时，变化或拆分后的新套餐必需为包賳销售品 end*/
				                var data = {
					                prodOfferInstId : mainProdOfferInstVO.prodOfferInstId,
					                prodOfferId : currentMainProdOfferInfoVO.prodOfferId,
					                actionCD : $ac$.get("requestParam").actionCD,
					                custId : $ac$.get("requestParam").customerData.custId,
					                cityCode : cityCode,
					                acceptCity : BusCard.$session.cityCode,
					                offerChangeValidVOList : resultList
				                };
				                
				                var promptVO = BusCard.doPost(BusCard.path.contextPath
				                                + "/orderDetailAction.do?method=memberProdOfferChangeValidate", data);
				                if (promptVO && promptVO.code != null && parseInt(promptVO.code + "") < 0) {
					                messageBox.alert({
						                        message : promptVO.message
					                        });
					                return false;
					                
				                }
			                }
			                
			                return true;
			                
		                }
	                });
	        
        });
