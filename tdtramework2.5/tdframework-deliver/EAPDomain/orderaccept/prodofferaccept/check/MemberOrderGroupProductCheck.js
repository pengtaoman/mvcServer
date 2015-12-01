/**
 * 此模块放置所有业务检测处理逻辑
 * 
 * @module
 */
defineModule("orderaccept.prodofferaccept.check.MemberOrderGroupProductCheck", ["../util",
                "./ProdOfferNewCheck","orderaccept.common.dialog.MessageBox"],
                function(util, ProdOfferNewCheck,messageBox) {
	        
	        dojo.declare("orderaccept.prodofferaccept.check.MemberOrderGroupProductCheck",
	                [ProdOfferNewCheck], {
		                postscript : function() {
							
		                },
		                doCheckedSubProdOffer : function(data){
		                	var subProdOfferCartDataProvider = data.subProdOfferCartDataProvider;
					        var bindingData = subProdOfferCartDataProvider.getSubGridBindingData(),
						        rowIndex = data.rowIndex,
						        controller = this.controller,
						        checkInstance = this,
						        subProdOfferOrderGridDom = subProdOfferCartDataProvider.subProdOfferOrderGrid.domNode,
						        currentBindData = dojo.filter(bindingData, function(loopData) {
							                return loopData.rowIndex == rowIndex;
						                })[0],
						        currentProdOfferInfo = currentBindData.subProdOfferInfo,
						        currentProdOfferInst = currentBindData.prodOfferInst,
						        prodOfferRelaList = util.ProdOfferHelper.getProdOfferRelaList(currentProdOfferInfo);
					        
					        // 1.判断是否有销售品实例信息
					        if (currentProdOfferInst != null) {
					        	subProdOfferCartDataProvider.updateCurrentProdOfferStyle(currentBindData, "prod-offer-change");
					        } else {
					        	subProdOfferCartDataProvider.updateCurrentProdOfferStyle(currentBindData, "prod-offer-add");
					        }
					        // 2.(1)销售品分组最大最小值监测
					        if(!checkInstance.doCheckProdOfferGroupCount(data)) { return false; }
					        // 2.(2)销售品分组检测(暂时先注释掉)
					        if (!checkInstance.doCheckProdOfferGroupExclusion(data)) { return false; }
		                },
		                //通过集团CRM录入工单，不允许省内BSS进行成员 订购\变更\退订 集团操作
		                businessAcceptCheck : function(productId){
		                	var flag =true;
		                	var sf = util.ServiceFactory;
		                	var param = {
		                		cityCode:$ac$.requestParam.customerData.cityCode,
		                		serviceKind:-1,
		                		serviceOfferId:302,
		                		objectId:productId
		                	};
		                	var businessParamVO=sf.getService("spring:businessparamDAO").query(param)[0];
		                	if(businessParamVO.objectValue==0){
		                			flag = false;
		                			messageBox.alert({busiCode : "08410221"});        
		                		}
		                	return flag;
		                },
		                //判断用户的netType是否能订购此集团产品
		                groupProductOrderCheck : function (groupProductName,memberProductName){
		                	var sf = util.ServiceFactory;
		                	var param = {
		                		cityCode: $ac$.requestParam.customerData.cityCode,
		                		serviceKind:$ac$.requestParam.memberProductInfo.netType,
		                		serviceOfferId:302,
		                		infoValue:$ac$.get("groupProdInstInfo").productId,
		                		orderProductName:groupProductName,
		                		productName:memberProductName,
		                		serviceId:$ac$.get("_memberProdInstInfo").prodInstVO.accNbr,
		                		userId:$ac$.get("_memberProdInstInfo").prodInstVO.prodInstId
		                	};
		                	var result = sf.getService("spring:validOrderActionBO").orderGroupProductValidate(param);
		                	if(result.code<0){
		                		messageBox.alert({message : result.message});
		                		return false;
		                	}
		                	return true;
		                },
		                //集团最大用户数量限制
                        maxIvpnUserCheck : function(groupProdInstInfo){
                            //var ivpnFlag = groupProdInstInfo.productId==567?true:false;
                            //if(ivpnFlag){
                            var groupCheck = BusCard.$load("com.neusoft.crm.ordermgr.common.ruleplugin.groupcheck.GroupCheck");
                            var num = groupCheck.validGroupMemberCount(groupProdInstInfo);
                            if(num==0){
                                messageBox.alert({message : "已超过此集团产品规定的最大用户数量，不允许再次订购！"});
                                return false;
                            }
                            //}
                        },
                        //行业应用个人产品重复订购检测（只需要判断100598，集团不需要，因为不能重复加入集团）
                        checkProdOfferOrder : function(userHasGroupOfferInfoList){
                        	//1、根据集团个人销售品找到已订购的可选包实例
		                	var memberProdOfferInst = dojo.filter(userHasGroupOfferInfoList,function(offerInstVO){
		                		return offerInstVO.prodOfferId == $ac$.requestParam.memberGroupOfferInfo.prodOfferId;
		                	})
		                	if(!!memberProdOfferInst){
		                		var memberProdInst = memberProdOfferInst[0].prodInstList[0];
		                		//2、根据个人产品实例和选中的集团产品实例判断是否有关系
			                	var prodInstList = BusCard.$remote("prodInstCommFacadeBO").queryNotInValidProdInstRela({
			                		relatedProdInstId:memberProdInst.prodInstId,
			                		relationTypeCd:ConstantsPool.load("ProdInstRelationCDConst").ProdInstRelationCDConst.INDUSTRY_APP_PERSONAL_PROD		                		
			                	})
			                	if(!!prodInstList&&prodInstList.length>0){
			                		var aProdInst = prodInstList[0];
			                		//3、如果行业应用群子关系A端不是选择的该行业应用产品实例，则说明已经在其他行业应用下订购了对应的个人销售品
			                		if(aProdInst.relaProdInstId!=$ac$.groupProdInstInfo.prodInstId){
			                			var prodInstVO = BusCard.$remote("prodInstCommFacadeBO").getProdInst(aProdInst.relaProdInstId);
			                			var groupInfo = BusCard.$remote("groupInfoBO").getGroupInfoByCustId({
											custId: prodInstVO.ownerCustId
										});
			                			messageBox.alert({message : "用户已经在【"+groupInfo.groupName+"】企业下选择了该销售品，不能重复选择！"});
                             		    return false;
			                		}
			                	}
		                	}
		                	return true;
                        }
	                });
	        
        });