/**
 * 此模块放置所有业务检测处理逻辑
 * 
 * @module
 */
defineModule("orderaccept.prodofferaccept.check.ProdOfferNewCheck", ["../util",
                "orderaccept.prodofferaccept.ProductDateBuilder", "orderaccept.common.dialog.MessageBox",
                "orderaccept.common.js.ConstantsPool"], function(
                util, builder, messageBox,ConstantsPool) {
	        
	        dojo.declare("orderaccept.prodofferaccept.check.ProdOfferNewCheck", [], {
		        controller : null,
		        constructor : function(controller) {
			        this.controller = controller;
		        },
		        postscript : function() {

		        },
		        /**
				 * FIXME this method will be invoked after building
				 * CustOrderAcceptInfoVO data
				 * 
				 * @method
				 */
		        doGlobalBusAndRuleCheck : function(custOrderAcceptInfoVO) {
			        if (this.doCheck10000NbrAccept(custOrderAcceptInfoVO) == false) { return false; }
                    if (this.doCheckBatchDevice(custOrderAcceptInfoVO) == false){return false;}
			        return true;
			        
		        },
		        checkCollectProdOffer : function(prodOfferId, prodOfferType, mainProdOfferId) {
			        var flag = false;
			        //主销售品的检测
			        if(prodOfferType == 1){
				        var collectProdOfferInfoList = util.ServiceFactory
				                .getService("url:prodOfferSaleAjaxAction.do?method=getPersonalCollectProdOffer&prodOfferType="
				                        + prodOfferType + "&mainProdOfferId=" + mainProdOfferId);
				        if (collectProdOfferInfoList) { 
//				        	return dojo.some(collectProdOfferInfoList||[], function(
//				                        collectProdOfferInfo) {
//					                return prodOfferId == collectProdOfferInfo.prodOfferId
//				                }); 
				        	var collectSUbProdOfferInfo = dojo.filter(collectProdOfferInfoList||[], function(
				                        collectProdOfferInfo) {
					                return prodOfferId == collectProdOfferInfo.prodOfferId
				                });
				                if(collectSUbProdOfferInfo.length>0){
				                	//判断是个人收藏的还是客户进行初始化的
					            	if(collectSUbProdOfferInfo[0].workNo == -1 || collectSUbProdOfferInfo[0].workNo == '-1'){
					            		return -1;
					            	}else{
					            		return true;
					            	}
				                }
				        }
			        }else{
			        	var collectProdOfferInfoList = util.ServiceFactory
				                .getService("url:prodOfferSaleAjaxAction.do?method=getPersonalCollectSubProdOffer&prodOfferType="
				                        + prodOfferType + "&mainProdOfferId=" + mainProdOfferId);
				        if (collectProdOfferInfoList) { 
				        		var collectSUbProdOfferInfo = dojo.filter(collectProdOfferInfoList||[], function(
				                        collectProdOfferInfo) {
					                return prodOfferId == collectProdOfferInfo.prodOfferId
				                });
				                if(collectSUbProdOfferInfo.length>0){
				                	//判断是个人收藏的还是客户进行初始化的
					            	if(collectSUbProdOfferInfo[0].workNo == -1 || collectSUbProdOfferInfo[0].workNo == '-1'){
					            		return -1;
					            	}else{
					            		return true;
					            	}
				                }
				         }       
//			        	//可选包的检测s
//				        if(!!$ac$.get("_allSubProdOffers_")){
//				        	var collectSUbProdOfferInfo = dojo.filter($ac$.get("_allSubProdOffers_")||[], function(
//				                        collectProdOfferInfo) {
//					                return prodOfferId == collectProdOfferInfo.prodOfferId
//				                });
//				            if(collectSUbProdOfferInfo.length>0){
//				            	//判断是个人收藏的还是客户进行初始化的
//				            	if(collectSUbProdOfferInfo[0].workNo == -1 || collectSUbProdOfferInfo[0].workNo == '-1'){
//				            		return -1;
//				            	}else{
//				            		return true;
//				            	}
//				            }
//				        }
			        }
			        return flag;
		        },
		        
		        /**
		         * 促销收藏前检测
		         */
		        checkCollectPromotion : function(prodOfferId,prodOfferType){
		        	var flag = false;
			        var collectPromotionInfoList = util.ServiceFactory
			                .getService("url:prodOfferSaleAjaxAction.do?method=getPersonalCollectPromotion&prodOfferType="
			                        + prodOfferType);
			        if (collectPromotionInfoList) { return dojo.some(collectPromotionInfoList, function(
			                        collectPromotionInfo) {
				                return prodOfferId == collectPromotionInfo.prodOfferId
			                }); }
			        return flag;
		        },
		        
		        /**
				 * 可选包树上的点击事件 subProdOfferDetail -
				 * 双击销售品树上的节点，选择的销售品的详细信息
				 */
		        checkBeforeChooseSubProdOffer : function(data) {
			        var prodOfferInfoVO = data.prodOfferInfoVO,
				        allProdBasicTrList = data.allProdBasicTrList,
				        chooseNumberList = data.chooseNumberList,
				        subProdOfferCartDataProvider = data.subProdOfferCartDataProvider,
				        subProdOfferOrderGrid = subProdOfferCartDataProvider.subProdOfferOrderGrid.domNode,
				        checkInstance = this,
				        subBindingData = data.subBindingData;
			        if (this.doCheckByProdType(prodOfferInfoVO)) { return true; }
			        // 没有使用号码，说明该可选包销售品是给主销售品用的,这种销售品只允许订购一次
			        if (allProdBasicTrList.length == 0) {
				        var targetData = dojo.filter(subBindingData, function(data) {
					        var rowIndex = data.rowIndex;
					        return data.subProdOfferInfo.prodOfferId == prodOfferInfoVO.prodOfferId
					                && !dojo.query(".subProdOfferDetail-" + rowIndex, subProdOfferOrderGrid)[0].childNodes[0].checked;
				        });
				        if (targetData.length > 0) {
					        var rowIndex = targetData[0].rowIndex;
					        dojo.query(".subProdOfferDetail-" + rowIndex, subProdOfferOrderGrid)[0].childNodes[0].checked = true;
					        //dojo.query(".orderStatus_" + rowIndex, subProdOfferOrderGrid)[0].innerText = "已订购";
					        checkInstance.doCheckedSubProdOffer({
						                rowIndex : targetData[0].rowIndex,
						                subProdOfferCartDataProvider : subProdOfferCartDataProvider
					                });
					        return false;
				        }
				        // 判断可选包购物车中是否已经订购了该销售品,如果已经订购过了，则不允许再进行订购
				        if (dojo.some(subBindingData, function(data) {
					                return data.subProdOfferInfo.prodOfferId == prodOfferInfoVO.prodOfferId;
				                })) {
					        // alert("已经订购过该销售品【" +
					        // prodOfferInfoVO.prodOfferName +
					        // "】，不允许重复订购");
					        messageBox.alert({
						                busiCode : "08410122",
						                infoList : [prodOfferInfoVO.prodOfferName]
					                });
					        return false;
				        }
				        return true;
			        }
			        if (allProdBasicTrList.length > 0 && chooseNumberList.length == 0) {
				        var serviceIdStr = "";
				        dojo.forEach(allProdBasicTrList, function(prodBasicTr) {
					                var viewId = dojo.attr(prodBasicTr, "viewId");
					                serviceIdStr += "【" + dojo.query(".serviceId-" + viewId, prodBasicTr)[0].value
					                        + "】,";
				                });
				        // alert("请先为销售品【" +
				        // prodOfferInfoVO.prodOfferName + "】选择使用号码" +
				        // serviceIdStr + "中至少一个，再选择可选包销售品");
				        messageBox.alert({
					                busiCode : "08410123",
					                infoList : [prodOfferInfoVO.prodOfferName, serviceIdStr]
				                });
				        return false;
			        }
			        if (chooseNumberList.length == 1) {
				        // 找出当前销售品,如果没选中，则直接选中
				        var targetData = dojo.filter(subBindingData, function(data) {
					        var rowIndex = data.rowIndex;
					        return data.subProdOfferInfo.prodOfferId == prodOfferInfoVO.prodOfferId
					                && !dojo.query(".subProdOfferDetail-" + rowIndex, subProdOfferOrderGrid)[0].childNodes[0].checked;
				        });
				        if (targetData.length > 0) {
					        var rowIndex = targetData[0].rowIndex;
					        dojo.query(".subProdOfferDetail-" + rowIndex, subProdOfferOrderGrid)[0].childNodes[0].checked = true;
					        //dojo.query(".orderStatus_" + rowIndex, subProdOfferOrderGrid)[0].innerText = "已订购";
					        //升速
					        subProdOfferCartDataProvider.dealRaiseXDSLSpeed(targetData[0].subProdOfferInfo,
			                		targetData[0].showData.chooseNumberObj, true, targetData[0]);
					        checkInstance.doCheckedSubProdOffer({
						                rowIndex : targetData[0].rowIndex,
						                subProdOfferCartDataProvider : subProdOfferCartDataProvider
					                });
					        return false;
				        }
				        if (dojo.some(subBindingData, function(data) {
					                return data.subProdOfferInfo.prodOfferId == prodOfferInfoVO.prodOfferId;
				                })) {
					        // alert("已经订购过该销售品【" +
					        // prodOfferInfoVO.prodOfferName +
					        // "】，不允许重复订购");
					        messageBox.alert({
						                busiCode : "08410122",
						                infoList : [prodOfferInfoVO.prodOfferName]
					                });
					        return false;
				        }
			        }
			        return true;
		        },
		          //add by liuzhongwei 检测是不是大客户集团
		        doCheckIfBigGroup:function(data){
		        	var  groupId=data.groupId;
		        	var cityCode=data.cityCode;
		        	var count=BusCard.$remote("groupInfoBO").getIfBigGroup(cityCode,groupId);
		        	if(count>0){
		        		return true;
		        	}
		        	return false;
		        	
		        },
		        /**
				 * 检测该销售品是否是升速销售品
				 */
		        doCheckByRateSpeed : function(prodOfferInfoVO, chooseNumObj) {
			        // 获取升速信息
			        var raiseSpeedObj = util.ProdOfferHelper.getRaiseSpeedObj(prodOfferInfoVO);
			        if (raiseSpeedObj == null) {
				        return false;
			        } else {
				        var uniqueId = chooseNumObj.uniqueId;
				        if (!!prodOfferAcceptLoader.rateAttrMap[uniqueId]) {
					        var _flag = dojo.some(prodOfferAcceptLoader.rateAttrMap[uniqueId]||[],function(_data_){
				        		return _data_.operKind == 1;
				        	});
					        if (_flag) {
					            // alert("已经订购过升速销售品，不允许再次订购升速销售品["+prodOfferInfoVO.prodOfferName+"]");
						        messageBox.alert({
							                busiCode : "08410124",
							                infoList : [prodOfferInfoVO.prodOfferName]
						                });
						        return true;
					        }
				        } else {
					        return false;
				        }
			        }
			        return false;
		        },
		        /**
				 * 根据销售品的产品类型允许用户针对同一个使用号码订购同一个销售品
				 * 针对营销资源类的销售品，则允许用户订购多个
				 */
		        doCheckByProdType : function(prodOfferInfoVO) {
			        // 约定，如果销售品下只有一个产品，并且该产品的类型是营销资源类销售品，则允许订购多个
			        var offerProdRelaList = prodOfferInfoVO.offerProdRelaList;
			        if (offerProdRelaList && offerProdRelaList.length == 0) { return false; }
			        // if
			        // (offerProdRelaList[0].productInfoVO.prodFuncType
			        // == "104") { return true; }
			        // return false;
			        // modify by liuzhongwei
			        var param = "&productId=" + offerProdRelaList[0].productInfoVO.productId;
			        var ifCanInitMore = util.ServiceFactory
			                .getService("url:prodOfferSaleAjaxAction.do?method=ifCanInitMore" + param);
			        if (ifCanInitMore == 1) { return true; }
			        return false;
		        },
		        /**
				 * 检测促销政策间是否存在互斥关系
				 */
		        doCheckBeforeShowPromotionDetail : function(checkData) {
			        var flag = false;
			        var currentPromotionId = checkData.currentPromotionId;// 当前选中促销政策id
			        var currentPromotionDetail = checkData.currentPromotionDetail;// 当前选中促销政策详细信息
			        var checkedPromotionList = checkData.checkedPromotionList;// 已选中促销政策id集合
			        var targetProdOfferDetailList = checkData.targetProdOfferDetailList;// 促销政策作用销售品详细信息集合
			        var bindingData = checkData.bindingData;
			        var salesPromotionOrderGrid = checkData.salesPromotionOrderGrid;
			        // 获取与当前促销政策所在分组相关的分组(包括当前促销政策所在分组为A端和Z端)
			        var currentPromotionGroup = util.ServiceFactory
			                .getService("url:prodOfferSaleAjaxAction.do?method=getPromotionGroupInfo&currentPromotionId"
			                        + currentPromotionId);
			        // 与当前促销政策所在分组存在互斥关系的所有分组
			        // var currentPromotionEXTYPEGroup =
			        // dojo.filter(currentPromotionGroup.prodOfferGroupRelVO
			        // || [],function(groupInfo){
			        // return groupInfo.relationTypeCD ==
			        // util.PRODOFFERTYPE.EX_TYPE;
			        // });
			        // 获取用户已订购的预约生效的销售品或可选包
//			        var reserveProdOfferList = dojo.global.$appContext$.reserveProdOfferList;
//			        if (reserveProdOfferList) {
//				        for (var i = 0; i < reserveProdOfferList.length; i++) {
//					        var date1 = util.DateHelper.getDateFromString(reserveProdOfferList[i].effDate, 1);
//					        var date2 = util.DateHelper.getDateFromString(currentPromotionDetail.expDate, 1);
//					        if (dojo.date.compare(date1, date2) < 0) {
//						        /**
//								 * messageBox.alert({ title :
//								 * "\u63d0\u793a\u4fe1\u606f", message :
//								 * "\u9009\u62e9\u7684\u4fc3\u9500\u653f\u7b56\u534f\u8bae\u671f\u4e0d\u80fd\u5927\u4e8e\u5df2\u8ba2\u8d2d\u9884\u7ea6\u9500\u552e\u54c1\u7684\u751f\u6548\u671f" },
//								 * dojo.byId("PromotionCart"));
//								 */
//						        messageBox.alert({
//							                busiCode : "08410125"
//						                }, dojo.byId("PromotionCart"));
//						        return true;
//					        }
//				        }
//			        }
			        for (var key in checkedPromotionList || []) {
			        	if(!checkedPromotionList.hasOwnProperty(key)){													
							continue;
						}
				        var checkPromotionId = checkedPromotionList[key];
				        var checkedPromotionDetail = util.ProdOfferHelper.getSalesPromotionDetail(checkPromotionId);
//				        if (currentPromotionId == checkPromotionId) {// 已被选择
//					        /**
//							 * messageBox.alert({ title :
//							 * "\u63d0\u793a\u4fe1\u606f", message :
//							 * "\u8be5\u4fc3\u9500\u653f\u7b56\u5df2\u8ba2\u8d2d" },
//							 * dojo.byId("PromotionCart"));
//							 */
//					        messageBox.alert({
//						                busiCode : "08410126"
//					                }, dojo.byId("PromotionCart"));
//					        return true;
//				        }
				        // 先判断两促销政策间是否存在互斥关系
				        var param = "&currentPromotionId=" + currentPromotionId + "&otherPromotionId="
				                + checkPromotionId;
				        var offerRelList = util.ServiceFactory
				                .getService("url:prodOfferSaleAjaxAction.do?method=getPromotionRel" + param);
				        dojo.forEach(offerRelList || [], function(offerRel) {
					        if (offerRel.relationTypeCD == util.PRODOFFERTYPE.EX_TYPE) {// 两促销政策间存在互斥关系
						        var dataArray = dojo.filter(bindingData, function(oneBindingData) {
							                return oneBindingData.promotionInfo.promotionId == checkPromotionId;
						                });
						        messageBox.confirm({
							        title : "\u4e92\u65a5\u5173\u7cfb\u786e\u8ba4",
							        // message : "【" +
							        // currentPromotionDetail.promotionName
							        // + "】与【"
							        // +
							        // checkedPromotionDetail.promotionName
							        // + "】存在互斥关系,不能同时订购" + "是否选择【"
							        // +
							        // currentPromotionDetail.promotionName
							        // + "】替换【"
							        // +
							        // checkedPromotionDetail.promotionName
							        // + "】?",
							        busiCode : "08410150",
							        infoList : [currentPromotionDetail.promotionName,
							                checkedPromotionDetail.promotionName, currentPromotionDetail.promotionName,
							                checkedPromotionDetail.promotionName],
							        onComplete : function(dataArray) {
								        return function(value) {
									        if (value) {
										        if (value) {// 替换
											        dojo.forEach(dataArray, function(data) {
												        dojo.query(".promotionNameDetail-" + data.rowIndex)[0].childNodes[0].checked = false;
												        dojo.query(".promotionStatus-" + data.rowIndex)[0].innerHTML = "\u672a\u8ba2\u8d2d";
											        });
											        flag = false;
										        } else {
											        flag = true;
										        }
									        }
								        }
							        }(dataArray),
							        isClose : false
						        }, dojo.byId("PromotionCart"))
					        }
				        });
				        // 如果两促销政策间不存在互斥关系，再判断两促销政策所在分组间是否存在互斥关系
				        var checkPromotionInfo = util.ServiceFactory
				                .getService("url:prodOfferSaleAjaxAction.do?method=getPromotionGroupInfo&otherPromotionId"
				                        + checkPromotionId);
				        if (currentPromotionGroup) {
					        var groupName = currentPromotionGroup.groupName;// 当前促销政策所在分组名称
					        var prodOfferGroupRelList = currentPromotionGroup.prodOfferGroupRelVO;// 所有关系分组
					        dojo.forEach(prodOfferGroupRelList || [], function(currentPromotionGroupInfo) {
						        if (currentPromotionGroupInfo.relationTypeCD == util.PRODOFFERTYPE.EX_TYPE
						                && currentPromotionGroupInfo.groupZID == checkPromotionInfo.prodOfferGroupId) {// 两促销政策所在分组关系为互斥
							        var dataArray = dojo.filter(bindingData, function(oneBindingData) {
								                return oneBindingData.promotionInfo.promotionId == checkPromotionId;
							                });
							        messageBox.confirm({
								        title : "\u5206\u7ec4\u5173\u7cfb\u4e92\u65a5\u786e\u8ba4",
								        // message : "【" +
								        // currentPromotionDetail.promotionName
								        // + "】所在分组【" + groupName
								        // + "】与【" +
								        // checkedPromotionDetail.promotionName
								        // + "】所在分组" + "【"
								        // +
								        // checkPromotionInfo.prodOfferGroupVO.groupName
								        // + "】存在互斥关系，不能同时订购，是否选择【" +
								        // currentPromotionDetail.promotionName
								        // + "】替换"
								        // + "【" +
								        // checkedPromotionDetail.promotionName
								        // + "】?",
								        busiCode : "08410151",
								        infoList : [currentPromotionDetail.promotionName, groupName,
								                checkedPromotionDetail.promotionName,
								                checkPromotionInfo.prodOfferGroupVO.groupName,
								                currentPromotionDetail.promotionName,
								                checkedPromotionDetail.promotionName],
								        onComplete : function(dataArray) {
									        return function(value) {
										        if (value) {// 替换
											        dojo.forEach(dataArray, function(data) {
												        dojo.query(".promotionNameDetail-" + data.rowIndex)[0].childNodes[0].checked = false;
												        dojo.query(".promotionStatus-" + data.rowIndex)[0].innerHTML = "\u672a\u8ba2\u8d2d";
											        });
											        flag = false;
										        } else {
											        flag = true;
										        }
									        }
								        }(dataArray),
								        isClose : false
							        }, dojo.byId("PromotionCart"));
						        }
					        });
				        }
			        }
			        if (targetProdOfferDetailList && targetProdOfferDetailList.length > 0) {
				        for (var i = 0; i < targetProdOfferDetailList.length; i++) {
					        var targetProdOfferDetailInfo = targetProdOfferDetailList[i];
					        var feeType = targetProdOfferDetailInfo.feeType;// 付费方式
					        var ifOcs = currentPromotionDetail.ifCos;// 促销政策是否ocs
					        if (ifOcs == 1 && feeType != 2100) {// 促销政策为ocs且作用销售品为非预付费类型
						        // alert("【" +
						        // currentPromotionDetail.promotionName
						        // + "】为OCS促销政策,只能作用于预付费类型的销售品");
						        messageBox.alert({
							                busiCode : "08410127",
							                infoList : [currentPromotionDetail.promotionName]
						                });
						        return true;
					        }
					        if (ifOcs == 0 && feeType == 2100) {// 促销政策为非ocs且作用销售品为预付费类型
						        // alert("【" +
						        // currentPromotionDetail.promotionName
						        // + "】为非OCS促销政策,只能作用于非预付费类型的销售品");
						        messageBox.alert({
							                busiCode : "08410128",
							                infoList : [currentPromotionDetail.promotionName]
						                });
						        return true;
					        }
				        }
			        }
			        //促销政策所在分组可选数量限制校验
			        flag = this.doCheckPromotionGroupCount(bindingData,salesPromotionOrderGrid,currentPromotionDetail);
			        return flag;
		        },
		        
		        /**
		         * 校验促销政策分组数量限制
		         */
		        doCheckPromotionGroupCount : function(bindingData,salesPromotionOrderGrid,currentPromotionDetail){
		        	var hasCheckedPromotionGroup = {};
			        var checkedPromotionRowData = dojo.filter(bindingData, function(onePromotionRowData) {
				        var rowIndex = onePromotionRowData.rowIndex;
				        return dojo.query(".promotionNameDetail-" + rowIndex, salesPromotionOrderGrid.domNode)[0].childNodes[0].checked &&
				        	onePromotionRowData.showData.promotionInfo.promotionId != currentPromotionDetail.promotionId;
			        });
			        dojo.forEach(checkedPromotionRowData||[],function(oneBindingData){
			        	var promotionInfo = oneBindingData.showData.promotionInfo;
			        	var promotionGroupVO = promotionInfo.proodOfferInfo.prodOfferGroupVO;
			        	if(promotionGroupVO){
			        		var currentGroupCount = hasCheckedPromotionGroup[promotionGroupVO.prodGroupID] && 
			        			typeof(hasCheckedPromotionGroup[promotionGroupVO.prodGroupID]) != "undefined"?hasCheckedPromotionGroup[promotionGroupVO.prodGroupID] : 0;
			        		hasCheckedPromotionGroup[promotionGroupVO.prodGroupID] = currentGroupCount + 1;
			        	}
			        	
			        });
			        var currentPromotionGroupVO = currentPromotionDetail.proodOfferInfo.prodOfferGroupVO;
			        var groupId = currentPromotionGroupVO.prodGroupID;
			        var groupName = currentPromotionGroupVO.groupName;
			        var maxSelectable = currentPromotionGroupVO.maxSelectable;
			        var promotionName = currentPromotionDetail.promotionName;//当前选中促销政策名称
			        if(hasCheckedPromotionGroup[groupId] && (hasCheckedPromotionGroup[groupId]+1)>maxSelectable){//超出了所在分组的可选最大值
			        	var sameGroupPromotionName = "";
			            dojo.forEach(checkedPromotionRowData||[],function(oneBindingData){
			        		var promotionGroupVO = oneBindingData.showData.promotionInfo.proodOfferInfo.prodOfferGroupVO;
			        		if(promotionGroupVO && promotionGroupVO.prodGroupID == groupId){
			        			sameGroupPromotionName += oneBindingData.showData.promotionInfo.promotionName+",";
			        		}
			        	});
			        	if(sameGroupPromotionName != ""){
			        		sameGroupPromotionName = sameGroupPromotionName.substring(0,sameGroupPromotionName.length-1);
			        	} 
			        	//messageBox.alert({
			        		//title : "\u4fe1\u606f\u786e\u8ba4",
			        		//message : "促销政策【"+promotionName+"】所在分组【"+groupName+"】的最大选择数量为"+maxSelectable+",与同一分组中的【"
			        		//+ sameGroupPromotionName + "】只能同时选择"+maxSelectable+"个"
			        	//},dojo.byId("PromotionCart"));
			        	 messageBox.alert({
					           busiCode : "08410205",
					           infoList : [ promotionName,groupName,maxSelectable,sameGroupPromotionName,maxSelectable ]
						 },dojo.byId("PromotionCart"));
			        	return true;
			        }
			        return false;
		        },
		        
		        /**
				 * 可选包购物车提交前检测
				 */
		        doCheckBeforeCommit : function(data, subProdOfferCartDataProvider) {
			        data.checkedProdOfferGridData = dojo.filter(data.allSubProdOfferCartData || [], function(subData) {
				                return subData.prodOfferPageInfo.checkBoxValue;
			                });
			        if (!this.doCheckProdOfferGroup(data, subProdOfferCartDataProvider)) { return false; }
			        // 销售品关系检测
			        if (!this.doCheckOfferRelation(data, subProdOfferCartDataProvider)) { return false; }
			        // 产品关系的检测
			        // 此处注释，改为在后面，对主销售品下功能类产品与可选包功能产品以其校验
			        // if (!this.doCheckProductRelation(data, subProdOfferCartDataProvider)) { return false; }
			        //根据约定，可选包下必须提交有产品信息，如果没有提交产品信息，则提交不通过
			        if (!this.doCheckIfExistProdOfSubOffer(data)) { return false; }
			        // 销售品属性检测
			        if (!this.doCheckOfferAttrInfo(data)) { return false; }
			        // 产品属性必填的检测
			        if (!this.doCheckProdAttrInfo(data)) { return false; }
			        // 担保信息的检测
			        if (!this.doCheckAssure(data)) { return false; }
			        // 销售品下营销资源的检测(目前没有营销资源)
			        // if (!this.doCheckResRela(data)) { return false;
			        // }
			        // 销售品下亲情号码的检测
			        // 老系统无此检测,因此注释
			        // if (!this.doCheckProdOfferFavourNum(data)) { return false; }
			        // 产品角色的检测
			        if (!this.doCheckProdRole(data)) { return false; }
			        // 检测国际漫游产品
			        if (!this.doCheckRoamProd(data)) { return false; }
			        // 不能重复订购集团产品检测
			        if (!this.doCheckIfCanOrderGrp()){ return false;};
			        return true;
		        },
		        
		        /**
		         * 检测是否含有使用号码(没有使用号码后续会报错)
		         */
		        checkIfHasUseNumber : function(data){

		        	var _noHasUseNumOffer = dojo.filter(data||[],function(_oneOfData_){
		        		return _oneOfData_.showData.chooseNumberObj == null;
		        	});
		        	if(_noHasUseNumOffer&&_noHasUseNumOffer.length>0){
		        		//新加的可选包销售品,没有使用号码说明是产品配置层面的问题
		        		if(_noHasUseNumOffer[0].prodOfferInst == null){
							messageBox.alert({
					                busiCode : "08410237",
					                infoList : [_noHasUseNumOffer[0].subProdOfferInfo.prodOfferName,_noHasUseNumOffer[0].subProdOfferInfo.prodOfferId]
				                });
		        		}else{
		        			messageBox.alert({
					                busiCode : "08410233",
					                infoList : [_noHasUseNumOffer[0].subProdOfferInfo.prodOfferName,_noHasUseNumOffer[0].subProdOfferInfo.prodOfferId,_noHasUseNumOffer[0].prodOfferInst.prodOfferInstId]
				                });
		        		}
		        		return false;
		        	}
		        	return true;
		        },
		        
		        /**
		         * 不能重复订购集团产品检测
		         */
		        doCheckIfCanOrderGrp : function(){		        
				    var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
			        // 获取是不是群组销售品
				    var currentMainProdOfferInfoVO = $ac$.get("currentMainProdOfferInfoVO");
				    if(!currentMainProdOfferInfoVO){return true;}
			        var prodOfferId = currentMainProdOfferInfoVO.prodOfferId;
			        var ifGrp = util.ProdOfferHelper.getProdOfferDetail(prodOfferId).ifGrp;
			        var ifCanOrder = true;
			        if (ifGrp == "1") {
				        // add by liuzhongwei
				        var requestParam = dojo.global.$appContext$.get("requestParam");
				        var cityCode = requestParam.customerData.cityCode;
				        var custId = requestParam.customerData.custId;
				        dojo.forEach(selectedMemberProdOfferList, function(prodInfoVO) {
				        	if(prodInfoVO.action != "new"){return;}
					        var productId = prodInfoVO.productId;
					        // 检测一下是不是组群产品
					        var productInfo = BusCard.$remote('productToServiceDAO').queryById({
						                productId : productId
					                });
					        if (productInfo.productType == "13") {
						        // 检测产品实例表中是否有此数据						        
						        var prodInstList = BusCard.$remote('prodInstCommonBO').queryNotInValidProdInst({
							                productId : productId,
							                cityCode : cityCode,
							                ownerCustId : custId
						                });
						        var PROD_NEW = ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst.PROD_NEW;
						        if(!prodInstList || prodInstList.length == 0){
							        prodInstList = BusCard.$remote('accessProdItemInfoDAO').selectByProperties({
							                productId : productId,
							                cityCode : cityCode,
							                customerId : custId,
							                serviceOfferId : PROD_NEW
						                });
					        	}
						        if (!!prodInstList && prodInstList.length > 0) {
							        messageBox.alert({
								        message : "\u96c6\u56e2\u5ba2\u6237\u4e0d\u5141\u8bb8\u91cd\u590d\u8ba2\u8d2d\u76f8\u540c\u7684\u96c6\u56e2\u4ea7\u54c1"
							        });
							        ifCanOrder = false;
							        
						        }
						        
					        }
				        });
			        }			        
			        return ifCanOrder;
			        
		        },
		        /**
		         * 保存订单分组检测
		         */
		        doCheckProdOfferGroup : function(data, _provider_){
		        	var uniqueId = "";
		        	if (_provider_.contentPane) {
				        uniqueId = _provider_.uniqueId || "";
			        }
			        //为了获取分组数据,将树节点展开
			        var treeNode = unieap.byId("subProdOfferTree"+uniqueId);
			        treeNode.expandNode(treeNode.getRootNode().getChildren()[0]);
			        var treeJsonList = unieap.byId("subProdOfferTree"+uniqueId).getRootNode().getChildren()[0].getChildren();
			        //循环该树节点
			        for(var key in treeJsonList){
						if(!treeJsonList.hasOwnProperty(key)){continue;}
						var treeInfo = treeJsonList[key];
//						/取出分组对象
						var prodOfferGroupVO = treeInfo.item.data.prodOfferGroupVO;
						//分组对象不存在则返回
						if(!prodOfferGroupVO){
							continue;
						}
						//取出分组id
						var prodOfferGroupId = prodOfferGroupVO.prodGroupID;
						//分组内订购的最大值
						var maxSelectable = prodOfferGroupVO.maxSelectable;
						//分组内订购的最小值
						var minSelectable = prodOfferGroupVO.minSelectable;
						//销售品分组名称
						var groupName = prodOfferGroupVO.groupName;
						//查看当前选中的可选包是否有和当前的分组id一样的数量
						var sameGroupIdList = dojo.filter(data.checkedProdOfferGridData||[],function(_checkOffer_){
							return _checkOffer_.subProdOfferInfo.prodOfferGroupId == prodOfferGroupId;
						});
						//拼销售品名称
						var prodOfferNameStr = "";
				        dojo.forEach(sameGroupIdList||[], function(sameInfo) {
					                prodOfferNameStr += "[" + sameInfo.subProdOfferInfo.prodOfferName + "]"
				                });
				        //拼提示信息
				        var tipStr = "销售品分组["+groupName+"]最多订购["+maxSelectable+"]个,最少订购["+minSelectable+"],现在订购了["+sameGroupIdList.length+"]个";
				        if(prodOfferNameStr != ""){
				        	tipStr+="已经订购了"+prodOfferNameStr;
				        }
						//如果当前选择的
						if(sameGroupIdList.length < minSelectable){
							messageBox.alert({ 
								title :"\u63d0\u793a\u4fe1\u606f",
								message : tipStr
							});
							return false;
						}
						if(sameGroupIdList.length > maxSelectable){
							messageBox.alert({ 
								title :"\u63d0\u793a\u4fe1\u606f",
								message : tipStr
							});
							return false;
						}
			        }
		        	return true;
		        },
		        
		        /**
		         * 检测可选包下是否存在提交的产品信息，不存在则直接返回
		         */
		        doCheckIfExistProdOfSubOffer : function(data){
		        	var checkedProdOfferGridData = data.checkedProdOfferGridData;
			        // 获取页面提交过来的产品数据
			        if (checkedProdOfferGridData != null && checkedProdOfferGridData.length > 0) {
				        // 循环页面的选中的销售品对象
				        for (var p = 0; p < checkedProdOfferGridData.length; p++) {
					        // 获取单一的一行的数据
					        var tempData = checkedProdOfferGridData[p];
					        // 获取页面提交的产品数据
					        var relaProdPageInfoList = tempData.relaProdPageInfoList;
					        //有产品信息，判断产品信息是否有选中的
					        var _flag_ = dojo.some(relaProdPageInfoList||[],function(relaProdPageInfo){
					        	return relaProdPageInfo.prodBasicInfo.checkedStatus;
					        })
					 		if(!_flag_){
					 			//alert("请为销售品["+tempData.subProdOfferInfo.prodOfferName+"]选择产品再提交");
					 			var tipStr = "请为销售品["+tempData.subProdOfferInfo.prodOfferName+"]选择产品再提交";
					 			messageBox.alert({ 
									title :"\u63d0\u793a\u4fe1\u606f",
									message : tipStr
								});
					 			return false;
					 		}       
				        }
			        }
			        return true;
		        },
		        /**
				 * 销售品关系，互斥检测
				 */
		        doCheckOfferRelation : function(data, subProdOfferCartDataProvider) {
			        // 销售品互斥提交检测
			        if (!this.doCheckOfferExt(data, subProdOfferCartDataProvider)) { return false; }
			        // 销售品依赖提交检测
			        if (!this.doCheckProdOfferDepend(data, subProdOfferCartDataProvider)) { return false; }
			        
			        return true;
		        },
		        /**
				 * 销售品互斥检测
				 */
		        doCheckOfferExt : function(data,subProdOfferCartDataProvider) {
			        var checkedProdOfferGridData = data.checkedProdOfferGridData;
			        if (checkedProdOfferGridData != null && checkedProdOfferGridData.length > 0) {
				        for (var p = 0; p < checkedProdOfferGridData.length; p++) {
					        var tempData = checkedProdOfferGridData[p];
					        var prodOfferRelaList = util.ProdOfferHelper
					                .getProdOfferRelaList(tempData.subProdOfferInfo);
					        if (prodOfferRelaList.length == 0) {
						        continue;
					        }
					        var chooseNumObj = tempData.showData.chooseNumberObj;
					        for (var q = 0; q < prodOfferRelaList.length; q++) {
						        // 限制检测次数，针对每一个销售品只检测三个关系
						        if (q == util.AcceptCheckCount.checkCount) {
							        break;
						        }
						        var prodOfferRela = prodOfferRelaList[q];
						        // 找出互斥的，并且非主销售品的
						        if (prodOfferRela.relationTypeCD == util.PRODOFFERTYPE.EX_TYPE
						                && prodOfferRela.prodOfferInfoVO.prodOfferType != util.PRODOFFERTYPE.MAIN_OFFER_TYPE) {
							        var exProdOfferId;
							        if (prodOfferRela.offerAId == tempData.subProdOfferInfo.prodOfferId) {
								        exProdOfferId = prodOfferRela.offerZId;
							        } else {
								        exProdOfferId = prodOfferRela.offerAId;
							        }
						        }
						        var exProdOfferList = BusCard.findAll(checkedProdOfferGridData, function(data) {
							                var exProdOfferNumObj = tempData.showData.chooseNumberObj;
							                return data.subProdOfferInfo.prodOfferId == exProdOfferId
							                        && (chooseNumObj != null && exProdOfferNumObj != null
							                                ? chooseNumObj.uniqueId == exProdOfferNumObj.uniqueId
							                                : true);
						                });
						        if (exProdOfferList.length > 0) {
							        /**
									 * alert("销售品【" +
									 * tempData.subProdOfferInfo.prodOfferName +
									 * "】与销售品【" +
									 * exProdOfferList[0].subProdOfferInfo.prodOfferName +
									 * "】互斥，请确认！");
									 */
							        // messageBox.alert({
							        // busiCode : "08410129",
							        // infoList :
									// [tempData.subProdOfferInfo.prodOfferName,
							        // exProdOfferList[0].subProdOfferInfo.prodOfferName]
							        // });
							        messageBox.confirm({
								        title : "\u9009\u62e9\u6846",
								        // message : '【' +
										// currentProdOfferInfo.prodOfferName
										// + '】与' + prodOfferNameStr
								        // + '互斥，不能同时订购，' + '是否订购【' +
										// currentProdOfferInfo.prodOfferName
										// + '】代替'
								        // + prodOfferNameStr + '?',
								        
								        busiCode : "08410149",
								        infoList : [tempData.subProdOfferInfo.prodOfferName,
								                exProdOfferList[0].subProdOfferInfo.prodOfferName,
								                tempData.subProdOfferInfo.prodOfferName,
								                exProdOfferList[0].subProdOfferInfo.prodOfferName],
								        onComplete : function(data, tempData) {
									        return function(value) {
										        var subProdOfferOrderGridDom = subProdOfferCartDataProvider.subProdOfferOrderGrid.domNode;
										        if (value) {
											        dojo.query(".subProdOfferDetail-" + data.rowIndex,
											                subProdOfferOrderGridDom)[0].childNodes[0].checked = false;
//											        dojo.query(".orderStatus_" + data.rowIndex,
//											                subProdOfferOrderGridDom)[0].innerHTML = "\u672a\u8ba2\u8d2d";
//											        if (data.prodOfferInst != null) {
//												        subProdOfferCartDataProvider.updateCurrentProdOfferStyle(data,
//												                "prod-offer-del");
//											        }
											        if (data.prodOfferInst != null) {
												        subProdOfferCartDataProvider.updateCurrentProdOfferStyle(data,
												                "prod-offer-del");
											        } else {
												        
											        	subProdOfferCartDataProvider.updateCurrentProdOfferStyle(data,
												                "prod-offer-unorder");
											        }        
											        checkInstance.doUnCheckedSubProdOffer({
                                                                rowIndex : data.rowIndex,
                                                                subProdOfferCartDataProvider : subProdOfferCartDataProvider
                                                        });
										        } else {
											        dojo.query(".subProdOfferDetail-" + tempData.rowIndex,
											                subProdOfferOrderGridDom)[0].childNodes[0].checked = false;
//											        dojo.query(".orderStatus_" + tempData.rowIndex,
//											                subProdOfferOrderGridDom)[0].innerHTML = "\u672a\u8ba2\u8d2d";
//											        if (tempData.prodOfferInst != null) {
//												        subProdOfferCartDataProvider.updateCurrentProdOfferStyle(
//												                tempData, "prod-offer-del");
//											        }
											        if (tempData.prodOfferInst != null) {
												        subProdOfferCartDataProvider.updateCurrentProdOfferStyle(tempData,
												                "prod-offer-del");
											        } else {
												        
											        	subProdOfferCartDataProvider.updateCurrentProdOfferStyle(tempData,
												                "prod-offer-unorder");
											        }  
											        checkInstance.doUnCheckedSubProdOffer({
                                                                rowIndex : tempData.rowIndex,
                                                                subProdOfferCartDataProvider : subProdOfferCartDataProvider
                                                        });
										        }
									        }
								        }(exProdOfferList[0], tempData),
								        iconCloseComplete : true
							        }, dojo.byId("subProdOfferCart"));
							        return false;
						        }
					        }
				        }
			        }
			        return true;
		        },
		        /**
				 * 销售品依赖检测事件
				 */
		        doCheckProdOfferDepend : function(data, subProdOfferCartDataProvider) {
			        var checkedProdOfferGridData = data.checkedProdOfferGridData;
			        var allSubProdOfferCartData = data.allSubProdOfferCartData;
			        if (checkedProdOfferGridData != null && checkedProdOfferGridData.length > 0) {
				        for (var p = 0; p < checkedProdOfferGridData.length; p++) {
					        var tempData = checkedProdOfferGridData[p];
					        var prodOfferRelaList = util.ProdOfferHelper
					                .getProdOfferRelaList(tempData.subProdOfferInfo);
					        if (prodOfferRelaList.length == 0) {
						        continue;
					        }
					        var chooseNumObj = tempData.showData.chooseNumberObj;
					        for (var q = 0; q < prodOfferRelaList.length; q++) {
						        // 限制检测次数，针对每一个销售品只检测三个关系
						        if (q == util.AcceptCheckCount.checkCount) {
							        break;
						        }
						        var prodOfferRela = prodOfferRelaList[q];
						        // 依赖的销售品id
						        var relaProdOfferId;
						        if (prodOfferRela.relationTypeCD == util.PRODOFFERTYPE.DEPEND_TYPE&&prodOfferRela.selectable == 1) {
							        // 获取Z端销售品标识
							        relaProdOfferId = prodOfferRela.offerZId;
							        // 获取依赖的销售品集合
							        var dependProdOfferList = BusCard.findAll(allSubProdOfferCartData, function(data) {
								                var dependProdOfferNum = tempData.showData.chooseNumberObj;
								                return data.subProdOfferInfo.prodOfferId == relaProdOfferId
								                        && (chooseNumObj != null && dependProdOfferNum != null
								                                ? chooseNumObj.uniqueId == dependProdOfferNum.uniqueId
								                                : true);
							                });
							        if (dependProdOfferList.length == 0) {
								        if (prodOfferRela.offerAId == tempData.subProdOfferInfo.prodOfferId
								                && prodOfferRela.relationTypeCD == util.PRODOFFERTYPE.DEPEND_TYPE
								                && prodOfferRela.prodOfferInfoVO.prodOfferType != util.PRODOFFERTYPE.MAIN_OFFER_TYPE) {
									        var dependProdOfferInfo = util.ProdOfferHelper
									                .getProdOfferDetail(relaProdOfferId);
									        /**
											 * alert("【" +
											 * tempData.subProdOfferInfo.prodOfferName +
											 * "】" + "依赖" + "【" +
											 * dependProdOfferInfo.prodOfferName +
											 * "】" + "，必须选择" + "【" +
											 * dependProdOfferInfo.prodOfferName +
											 * "】");
											 */
									        
									        // messageBox.alert({
									        // busiCode : "08410130",
									        // infoList :
											// [tempData.subProdOfferInfo.prodOfferName,
									        // dependProdOfferInfo.prodOfferName,
									        // dependProdOfferInfo.prodOfferName]
									        // });
									        messageBox.confirm({
										        title : "\u9009\u62e9\u6846",
										        // message : '销售品【' +
												// currentProdOfferInfo.prodOfferName
												// + '】依赖于' +
												// prodOfferNameStr
										        // + '，必须先选择' +
												// prodOfferNameStr +
												// '是否订购【' +
												// currentProdOfferInfo.prodOfferName
										        // + '】?',
										        busiCode : "08410152",
										        infoList : [tempData.subProdOfferInfo.prodOfferName,
										                dependProdOfferInfo.prodOfferName,
										                dependProdOfferInfo.prodOfferName,
										                tempData.subProdOfferInfo.prodOfferName],
										        onComplete : function(currentProdOfferData, dependProdOfferInfo) {
											        return function(value) {
												        var subProdOfferOrderGridDom = subProdOfferCartDataProvider.subProdOfferOrderGrid.domNode;
												        if (value) {
													        subProdOfferCartDataProvider.showOneSubProdOffer(
													                dependProdOfferInfo,
													                currentProdOfferData.showData.chooseNumberObj);
												        } else {
													        dojo.query(".subProdOfferDetail-"
													                        + currentProdOfferData.rowIndex,
													                subProdOfferOrderGridDom)[0].childNodes[0].checked = false;
//													        if (currentProdOfferData.prodOfferInst != null) {
//														        dojo.query(".orderStatus_"
//														                        + currentProdOfferData.rowIndex,
//														                subProdOfferOrderGridDom)[0].innerHTML = "已退订";
//														        subProdOfferCartDataProvider
//														                .updateCurrentProdOfferStyle(
//														                        currentProdOfferData, "prod-offer-del");
//													        } else {
//														        dojo.query(".orderStatus_"
//														                        + currentProdOfferData.rowIndex,
//														                subProdOfferOrderGridDom)[0].innerHTML = "未订购";
//													        }
													        if (currentProdOfferData.prodOfferInst != null) {
														        subProdOfferCartDataProvider.updateCurrentProdOfferStyle(currentProdOfferData,
														                "prod-offer-del");
													        } else {
														        
													        	subProdOfferCartDataProvider.updateCurrentProdOfferStyle(currentProdOfferData,
														                "prod-offer-unorder");
													        }
													        checkInstance.doUnCheckedSubProdOffer({
                                                                rowIndex : currentProdOfferData.rowIndex,
                                                                subProdOfferCartDataProvider : subProdOfferCartDataProvider
                                                       		});
												        }
											        }
										        }(tempData, dependProdOfferInfo)
									        }, dojo.byId("subProdOfferCart"));
									        
									        return false;
								        }
							        } else {
								        // 如果是已经选中了，则不处理
								        if (dependProdOfferList[0].prodOfferPageInfo.checkBoxValue) {
									        continue;
								        }
								        if (tempData.subProdOfferInfo.prodOfferType != util.PRODOFFERTYPE.MAIN_OFFER_TYPE
								                && dependProdOfferList[0].prodOfferType != util.PRODOFFERTYPE.MAIN_OFFER_TYPE) {
									        /**
											 * alert("销售品【" +
											 * tempData.subProdOfferInfo.prodOfferName +
											 * "】依赖于销售品【" +
											 * dependProdOfferList[0].subProdOfferInfo.prodOfferName +
											 * "】，请确认！");
											 */
									        // messageBox.alert({
									        // busiCode : "08410131",
									        // infoList :
											// [tempData.subProdOfferInfo.prodOfferName,
									        // dependProdOfferList[0].subProdOfferInfo.prodOfferName]
									        // });
									        messageBox.confirm({
										        title : "\u9009\u62e9\u6846",
										        // message : '销售品【' +
												// currentProdOfferInfo.prodOfferName
												// + '】依赖于' +
												// prodOfferNameStr
										        // + '，必须先选择' +
												// prodOfferNameStr +
												// '是否订购【' +
												// currentProdOfferInfo.prodOfferName
										        // + '】?',
										        busiCode : "08410152",
										        infoList : [tempData.subProdOfferInfo.prodOfferName,
										                dependProdOfferList[0].subProdOfferInfo.prodOfferName,
										                dependProdOfferList[0].subProdOfferInfo.prodOfferName,
										                tempData.subProdOfferInfo.prodOfferName],
										        onComplete : function(currentProdOfferData, dependProdOfferInfo) {
											        return function(value) {
												        var subProdOfferOrderGridDom = subProdOfferCartDataProvider.subProdOfferOrderGrid.domNode;
												        if (value) {
													        dojo.query(".subProdOfferDetail-"
													                        + dependProdOfferInfo.rowIndex,
													                subProdOfferOrderGridDom)[0].childNodes[0].checked = true;
//													        if (dependProdOfferInfo.prodOfferInst != null) {
//														        dojo.query(".orderStatus_"
//														                        + dependProdOfferInfo.rowIndex,
//														                subProdOfferOrderGridDom)[0].innerHTML = "用户已有";
//													        } else {
//														        dojo.query(".orderStatus_"
//														                        + dependProdOfferInfo.rowIndex,
//														                subProdOfferOrderGridDom)[0].innerHTML = "已订购";
//													        }
													        if (dependProdOfferInfo.prodOfferInst != null) {
											                	subProdOfferCartDataProvider.updateCurrentProdOfferStyle(
											                dependProdOfferInfo, "prod-offer-change");
											                } else {
											                	subProdOfferCartDataProvider.updateCurrentProdOfferStyle(
											                dependProdOfferInfo, "prod-offer-add");
											                }
													        checkInstance.doCheckedSubProdOffer({
                                                                rowIndex : dependProdOfferInfo.rowIndex,
                                                                subProdOfferCartDataProvider : subProdOfferCartDataProvider
                                                        	});
												        } else {
													        dojo.query(".subProdOfferDetail-"
													                        + currentProdOfferData.rowIndex,
													                subProdOfferOrderGridDom)[0].childNodes[0].checked = false;
//													        if (currentProdOfferData.prodOfferInst != null) {
//														        dojo.query(".orderStatus_"
//														                        + currentProdOfferData.rowIndex,
//														                subProdOfferOrderGridDom)[0].innerHTML = "已退订";
//														        subProdOfferCartDataProvider
//														                .updateCurrentProdOfferStyle(
//														                        currentProdOfferData, "prod-offer-del");
//													        } else {
//														        dojo.query(".orderStatus_"
//														                        + currentProdOfferData.rowIndex,
//														                subProdOfferOrderGridDom)[0].innerHTML = "未订购";
//													        }
													        if (currentProdOfferData.prodOfferInst != null) {
														        subProdOfferCartDataProvider.updateCurrentProdOfferStyle(currentProdOfferData,
														                "prod-offer-del");
													        } else {
														        
													        	subProdOfferCartDataProvider.updateCurrentProdOfferStyle(currentProdOfferData,
														                "prod-offer-unorder");
													        }      
													        checkInstance.doUnCheckedSubProdOffer({
                                                                rowIndex : currentProdOfferData.rowIndex,
                                                                subProdOfferCartDataProvider : subProdOfferCartDataProvider
                                                        	});
												        }
											        }
										        }(tempData, dependProdOfferList[0])
									        }, dojo.byId("subProdOfferCart"));
									        return false;
								        }
							        }
						        }
					        }
				        }
			        }
			        return true;
		        },
		        /**
				 * @method
				 * @Title: doCheckRoamProd
				 * @Description: 检测漫游产品信息
				 * @param data 可选包数据
				 * @return
				 */
		        doCheckRoamProd : function(data) {
			        var checkedProdOfferGridData = data.checkedProdOfferGridData,
				        allSubProdOfferCartData = data.allSubProdOfferCartData,
				        checkInstance = this,
				        prodNameStr = "",
				        interRoamProdConst = util.RoamProdConst.InterRoamProdConst,
				        // 国际漫游产品Id集合
				        inlandRoamProdConst = util.RoamProdConst.InlandRoamProdConst,
				        // 国内漫游产品Id集合
				        interRoamProdList = [],
				        // 国际漫游产品集合
				        interRoamProdInstList = [],
				        // 国际漫游产品实例集合
				        inlandRoamProdList = [];// 国内漫游产品集合
			        dojo.forEach(checkedProdOfferGridData, function(tempdata) {
				        // 查询用户当前是否订购国际漫游
				        if (tempdata.showData.checkedOption == "checked") {
					        var productInfoList = dojo.forEach(tempdata.relaProdPageInfoList || [], function(
					                productInfo) {
						        var prodInfo = productInfo.prodBasicInfo;
						        Array.prototype.push.apply(interRoamProdList, dojo.filter(interRoamProdConst, function(
						                                roamProdId) {
							                        return !!prodInfo.checkedStatus && roamProdId == prodInfo.productId;
						                        }))
					        });
				        }
			        });
			        if (!!interRoamProdList && interRoamProdList.length == 0) {
				        dojo.forEach(allSubProdOfferCartData, function(tempdata) {
					                if (!tempdata.prodOfferInst) { return };
					                var productInfoList = dojo.forEach(tempdata.prodOfferInst.prodInstList || [],
					                        function(productInst) {
						                        Array.prototype.push.apply(interRoamProdInstList, dojo.filter(
						                                        interRoamProdConst, function(roamProdId) {
							                                        return roamProdId == productInst.productId;
						                                        }))
					                        });
				                });
				        if (!!interRoamProdInstList && interRoamProdInstList.length > 0) {
					        dojo.forEach(checkedProdOfferGridData, function(tempdata) {
						        // 查询用户当前是否订购国内漫游
						        if (tempdata.showData.checkedOption == "checked") {
							        var productInfoList = dojo.forEach(tempdata.relaProdPageInfoList || [], function(
							                productInfo) {
								        var prodInfo = productInfo.prodBasicInfo;
								        Array.prototype.push.apply(inlandRoamProdList, dojo.filter(inlandRoamProdConst,
								                function(roamProdId) {
									                return !!prodInfo.checkedStatus && roamProdId == prodInfo.productId;
								                }))
							        });
						        }
					        });
					        if (!!inlandRoamProdList && inlandRoamProdList.length == 0) {
						        // alert("\u7528\u6237\u53d6\u6d88\u4e86\u56fd\u9645\u6f2b\u6e38\u6216\u53cc\u6a21\u56fd\u9645\u6f2b\u6e38\uff0c\u8bf7\u8ba2\u8d2d\u56fd\u5185\u6f2b\u6e38");
						        messageBox.alert({
							                busiCode : "08410132"
						                });
						        return false;
					        }
				        }
			        }
			        return true;
		        },
		        /**
				 * 检测销售品下的亲情信息
				 */
		        doCheckProdOfferFavourNum : function(data) {
			        var checkedProdOfferGridData = data.checkedProdOfferGridData,
				        checkInstance = this,
				        resultSubProdOfferData = BusCard.find(checkedProdOfferGridData, function(tempdata) {
					        // 判断是否含有销售品详情,没有则不进行下面的检测
					        if (tempdata.showData.prodOfferDetailFlag == '0') { return; }
					        var prodOfferInfoVO = tempdata.subProdOfferInfo;
					        // 亲情属性的判断
					        if (prodOfferInfoVO.usageTypeList && prodOfferInfoVO.usageTypeList.length > 0) {
						        var usageTypeList = prodOfferInfoVO.usageTypeList;
						        for (var i = 0, len = usageTypeList.length; i < len; i++) {
							        if (usageTypeList[i] == "1" ||usageTypeList[i] == "2" || usageTypeList[i] == "126" ) {
										if(!!tempdata.prodOfferInst && !tempdata.relaBusPageInfoList){
											return false;
										}
								        if (!tempdata.relaBusPageInfoList
								                || (!!tempdata.relaBusPageInfoList && tempdata.relaBusPageInfoList.length == 0)) { return true; }
							        }
						        }
					        }
				        });
			        if (resultSubProdOfferData) {
				        // alert("销售品【" +
				        // resultSubProdOfferData.subProdOfferInfo.prodOfferName
				        // + "】有必填的亲情信息，请点击销售品详情填写；");
				        messageBox.alert({
					                busiCode : "08410133",
					                infoList : [resultSubProdOfferData.subProdOfferInfo.prodOfferName]
				                });
				        return false;
			        }
			        return true;
		        },
		        /**
				 * 检测产品角色信息 1、过滤data中使用号码所对应的接入类有关系的产品集合 2、取产品集合中的角色集合
				 * 3、循环角色集合，查找选中的产品集合是否满足角色要求
				 */
		        doCheckProdRole : function(data) {
			        var controller = this.controller;
			        checkedProdOfferGridData = data.checkedProdOfferGridData, roleInfo = {}, flag = true;
			        BusCard.each(checkedProdOfferGridData, function(itemData) {
				        var offerProdRelaList = controller
				                .route("/prodOfferDetailBuilder/filterRelaProdList", itemData);
				        dojo.forEach(offerProdRelaList, function(relaProdInfo) {
					                if (!!relaProdInfo.roleInfoVO) {
						                if (!!roleInfo[relaProdInfo.roleInfoVO.roleCD]) {
							                roleInfo[relaProdInfo.roleInfoVO.roleCD].push(relaProdInfo);
						                } else {
							                roleInfo[relaProdInfo.roleInfoVO.roleCD] = [];
							                roleInfo[relaProdInfo.roleInfoVO.roleCD].push(relaProdInfo);
						                }
					                }
				                });
				        BusCard.each(roleInfo, function(roleItemList) {
					                // 过滤roleList下面选中的产品
					                var roleList = dojo.filter(roleItemList, function(prodInfo) {
						                        return dojo.some(itemData.relaProdPageInfoList, function(prodInfoData) {
							                                return (prodInfo.productId == prodInfoData.prodBasicInfo.productId)
							                                        && (prodInfoData.prodBasicInfo.checkedStatus == true);
						                                });
					                        });
					                var minNum = roleItemList[0].roleInfoVO.roleNumMin,
						                maxNum = roleItemList[0].roleInfoVO.roleNumMax;
					                if (roleList.length < minNum || roleList.length > maxNum) {
						                var offerNameStr = itemData.subProdOfferInfo.prodOfferName + "\n关联的产品\n"
						                prodNameStr = [];
						                dojo.forEach(roleItemList, function(item) {
							                        prodNameStr.push(item.productInfoVO.productName);
						                        });
						                // alert(offerNameStr +
						                // prodNameStr.toString() +
						                // "\n最少需要选择" + minNum +
						                // "个；最多可以选择"
						                // + maxNum + "个！");
						                messageBox.alert({
							                        busiCode : "08410134",
							                        infoList : [offerNameStr, prodNameStr.toString(), minNum, maxNum]
						                        });
						                flag = false;
						                return flag;
					                }
				                });
				        return flag;
			        });
			        return flag;
		        },
		        /**
				 * 销售品营销资源检测
				 */
		        doCheckResRela : function(data) {
			        // 可选包购物车中选中的销售品的表格绑定数据
			        var checkedProdOfferGridData = data.checkedProdOfferGridData,
				        resultSubProdOfferGridData = BusCard.find(checkedProdOfferGridData, function(tempData) {
					                // 获取营销资源集合
					                var resRelaList = tempData.subProdOfferInfo.resRelaList;
					                return BusCard.exist(resRelaList || [], function(resRelaVO) {
						                        return resRelaVO
						                                && (resRelaVO.mktResCd == 20 || resRelaVO.mktResCd == 42)
						                                && !tempData.resRelaPageInfoList;
					                        });
				                });
			        if (resultSubProdOfferGridData) {
				        // alert("销售品【" +
				        // resultSubProdOfferGridData.subProdOfferInfo.prodOfferName
				        // + "】有营销资源，请填写!");
				        messageBox.alert({
					                busiCode : "08410135",
					                infoList : [resultSubProdOfferGridData.subProdOfferInfo.prodOfferName]
				                });
				        
				        return false;
			        }
			        return true;
		        },
		        /**
				 * 检测担保信息
				 */
		        doCheckAssure : function(data) {
			        var checkedProdOfferGridData = data.checkedProdOfferGridData,
				        resultSubProdOfferGridData = BusCard.find(checkedProdOfferGridData, function(tempData) {
					                return tempData.subProdOfferInfo.prodOfferAssureDemandVO.length > 0
					                		&& (!tempData.prodOfferInst
					                					|| (!tempData.prodOfferInst.prodOfferInstAssureList 
					                								|| tempData.prodOfferInst.prodOfferInstAssureList.length == 0))
					                        && !tempData.prodOfferAssurePageInfoList;
				                });
			        if (resultSubProdOfferGridData) {
				        // alert("销售品【" +
				        // resultSubProdOfferGridData.subProdOfferInfo.prodOfferName
				        // + "】有担保信息，请填写!");
				        messageBox.alert({
					                busiCode : "08410136",
					                infoList : [resultSubProdOfferGridData.subProdOfferInfo.prodOfferName]
				                });
				        return false;
			        }
			        return true;
		        },
		        /**
				 * 检测产品的依赖关系
				 */
		        doCheckProductDepend : function(data, subProdOfferCartDataProvider) {
			        // 供以后的功能类检测用的产品集合
			        //_allSubRegionServiceProdMap_该集合是用来取属性用的功能产品集合
		        	var _allSubRegionServiceProdMap_ = {};
			        if($ac$.get("_allSubRegionServiceProdMap_")){
			        	_allSubRegionServiceProdMap_ = $ac$.get("_allSubRegionServiceProdMap_");
			        }else{
			        	$ac$.set("_allSubRegionServiceProdMap_",_allSubRegionServiceProdMap_);
			        }
			        var uniqueId = subProdOfferCartDataProvider.uniqueId || "";
			        $ac$.set("_serviceProdIdList_" + uniqueId, null);
			        var serviceProdIdList = {};
			        // 选中的销售品对象集合
			        var checkedProdOfferGridData = data.checkedProdOfferGridData;
			        var checkInstance = this;
			        // 获取页面提交过来的产品数据
			        if (checkedProdOfferGridData != null && checkedProdOfferGridData.length > 0) {
				        // 循环页面的选中的销售品对象
				        for (var p = 0; p < checkedProdOfferGridData.length; p++) {
					        // 获取单一的一行的数据
					        var tempData = checkedProdOfferGridData[p];
					        // 获取页面提交的产品数据
					        var relaProdPageInfoList = tempData.relaProdPageInfoList;
					        // 产品信息不存在，则不处理
					        if (!relaProdPageInfoList) {
						        continue;
					        }
					        if (relaProdPageInfoList != null && relaProdPageInfoList.length > 0) {
						        for (var q = 0; q < relaProdPageInfoList.length; q++) {
							        var relaProdPageInfo = relaProdPageInfoList[q];
							        if (!relaProdPageInfo.prodBasicInfo.productId) {
								        continue;
							        }
							        // 不选中的不进行检测
							        if (!relaProdPageInfo.prodBasicInfo.checkedStatus) {
								        continue;
							        }
							        
							        // 获取提交的产品规格数据
							        var offerProdRelaVO = BusCard.find(util.ProdOfferHelper.getProductList(true,
							                        tempData.subProdOfferInfo), function(offerProdRelaVO) {
								                return offerProdRelaVO.productId == relaProdPageInfo.prodBasicInfo.productId;
								                
							                });
							        //拼全局数据,没有使用号码，则不进行处理rowData.showData.chooseNumberObj.uniqueId
							        if(tempData.showData.chooseNumberObj!=null){
							        	//属性不存在不处理
							        	if(!!relaProdPageInfo.prodAttrInfo){
							        		if(_allSubRegionServiceProdMap_[tempData.showData.chooseNumberObj.uniqueId]){
							        			_allSubRegionServiceProdMap_[tempData.showData.chooseNumberObj.uniqueId].push(relaProdPageInfo);
							        		}else{
							        			_allSubRegionServiceProdMap_[tempData.showData.chooseNumberObj.uniqueId] = [];
							        			_allSubRegionServiceProdMap_[tempData.showData.chooseNumberObj.uniqueId].push(relaProdPageInfo);
							        		}
							        	}
							        }
							        //该集合是用来给基础包下的功能产品和可选包中的功能产品检测用的
							        serviceProdIdList[relaProdPageInfo.prodBasicInfo.productId] = {
								        prodOfferName : tempData.subProdOfferInfo.prodOfferName,
								        productName : offerProdRelaVO.productInfoVO.productName
							        };
							        // 获取产品关系集合
							        var productInfoVO = offerProdRelaVO.productInfoVO;
							        var prodRelaList = productInfoVO.prodRelaList;
							        if (prodRelaList.length == 0) {
								        continue;
							        }
							        // 循环产品关系集合，找出和当前产品互斥的进行检测
							        for (var k = 0; k < prodRelaList.length; k++) {
								        // 限制检测次数，针对每一个销售品只检测三个关系
								        if (k == util.AcceptCheckCount.checkCount) {
									        break;
								        }
								        var prodRelaVO = prodRelaList[k];
								        // 只针对依赖的进行检测
								        if (prodRelaVO.relaType == util.PRODOFFERTYPE.DEPEND_TYPE) {
									        var dependProdId = prodRelaVO.prodB;
									        if (!checkInstance.doGetProdDependByProdId(data, dependProdId)) {
										        // 通过产品id获取产品名称，提示产品的依赖
										        var productName = BusCard.$remote("innerInterfaceBO")
										                .getProductName(dependProdId);
										        // alert("产品【" +
										        // productInfoVO.productName
										        // + "】依赖产品【" +
										        // productName
										        // + "】,请先选择产品【" +
										        // productName +
										        // "】!");
										        
										        messageBox.alert({
											                busiCode : "08410137",
											                infoList : [productInfoVO.productName, productName,
											                        productName]
										                });
										        return false;
									        }
								        }
							        }
						        }
					        }
					        
				        }
			        }
			        $ac$.set("_serviceProdIdList_" + uniqueId, serviceProdIdList);
			        $ac$.set("_allSubRegionServiceProdMap_",_allSubRegionServiceProdMap_);
			        return true;
		        },
		        /**
				 * 根据依赖的产品id检测是否存在依赖的产品
				 */
		        doGetProdDependByProdId : function(data, dependProdId) {
			        var checkedProdOfferGridData = data.checkedProdOfferGridData;
			        for (var w = 0; w < checkedProdOfferGridData.length; w++) {
				        // 获取单一的一行的数据
				        var tempData = checkedProdOfferGridData[w];
				        // 获取页面提交的产品数据
				        var relaProdPageList = tempData.relaProdPageInfoList;
				        // 产品信息不存在，则不处理
				        if (!relaProdPageList) {
					        continue;
				        }
				        if (relaProdPageList != null && relaProdPageList.length > 0) {
					        for (var t = 0; t < relaProdPageList.length; t++) {
						        var productPageInfo = relaProdPageList[t];
						        if (parseInt(dependProdId) == productPageInfo.prodBasicInfo.productId) { return true; }
					        }
				        }
			        }
			        return false;
		        },
		        /**
				 * 检测产品的互斥关系
				 */
		        doCheckProductEx : function(data) {
			        // 选中的销售品对象集合
			        var checkedProdOfferGridData = data.checkedProdOfferGridData;
			        endLoopFlag = true;
			        // 获取页面提交过来的产品数据
			        if (checkedProdOfferGridData != null && checkedProdOfferGridData.length > 0) {
				        // 循环页面的选中的销售品对象
				        for (var p = 0; p < checkedProdOfferGridData.length; p++) {
					        // 获取单一的一行的数据
					        var data = checkedProdOfferGridData[p];
					        // 获取页面提交的产品数据
					        var relaProdPageInfoList = data.relaProdPageInfoList;
					        // 产品信息不存在，则不处理
					        if (!relaProdPageInfoList) {
						        continue;
					        }
					        if (relaProdPageInfoList != null && relaProdPageInfoList.length > 0) {
						        for (var q = 0; q < relaProdPageInfoList.length; q++) {
							        var relaProdPageInfo = relaProdPageInfoList[q];
							        if (!relaProdPageInfo.prodBasicInfo.productId) {
								        continue;
							        }
							        // 不选中的不进行检测
							        if (!relaProdPageInfo.prodBasicInfo.checkedStatus) {
								        continue;
							        }
							        // 获取提交的产品规格数据
							        var offerProdRelaVO = BusCard.find(util.ProdOfferHelper.getProductList(true,
							                        data.subProdOfferInfo), function(offerProdRelaVO) {
								                return offerProdRelaVO.productId == relaProdPageInfo.prodBasicInfo.productId;
								                
							                });
							        // 获取产品关系集合
							        var productInfoVO = offerProdRelaVO.productInfoVO;
							        var prodRelaList = productInfoVO.prodRelaList;
							        if (prodRelaList.length == 0) {
								        continue;
							        }
							        // 循环产品关系集合，找出和当前产品互斥的进行检测
							        for (var k = 0; k < prodRelaList.length; k++) {
								        // 限制检测次数，针对每一个销售品只检测三个关系
								        if (k == util.AcceptCheckCount.checkCount) {
									        break;
								        }
								        var prodRelaVO = prodRelaList[k];
								        // 只针对互斥的进行校验
								        if (prodRelaVO.relaType == util.PRODOFFERTYPE.EX_TYPE) {
									        var exProdId = null;
									        if (offerProdRelaVO.productId == prodRelaVO.prodB) {
										        exProdId = prodRelaVO.prodA;
									        } else {
										        exProdId = prodRelaVO.prodB;
									        }
									        // 循环当前提交的产品信息，判断是否有互斥的产品
									        for (var w = 0; w < checkedProdOfferGridData.length; w++) {
										        // 获取单一的一行的数据
										        var tempData = checkedProdOfferGridData[w];
										        // 获取页面提交的产品数据
										        var relaProdPageList = tempData.relaProdPageInfoList;
										        // 产品信息不存在，则不处理
										        if (!relaProdPageList) {
											        continue;
										        }
										        if (relaProdPageList != null && relaProdPageList.length > 0) {
											        for (var t = 0; t < relaProdPageList.length; t++) {
												        var productPageInfo = relaProdPageList[t];
												        // 获取提交的产品规格数据
												        var offerProdVO = BusCard.find(
												                util.ProdOfferHelper.getProductList(true,
												                        tempData.subProdOfferInfo), function(
												                        offerProdRelaVO) {
													                return offerProdRelaVO.productId == productPageInfo.prodBasicInfo.productId;
													                
												                });
												        if (parseInt(exProdId) == productPageInfo.prodBasicInfo.productId) {
													        /**
															 * alert("销售品【" +
															 * data.subProdOfferInfo.prodOfferName +
															 * "】下的产品【" +
															 * productInfoVO.productName +
															 * "】，与销售品【" +
															 * tempData.subProdOfferInfo.prodOfferName +
															 * "】下的产品【" +
															 * offerProdVO.productInfoVO.productName +
															 * "】互斥，不允许同时订购");
															 */
													        messageBox.alert({
														                busiCode : "08410138",
														                infoList : [
														                        data.subProdOfferInfo.prodOfferName,
														                        productInfoVO.productName,
														                        tempData.subProdOfferInfo.prodOfferName,
														                        offerProdVO.productInfoVO.productName]
													                });
													        return false;
												        }
											        }
										        }
									        }
								        }
							        }
						        }
					        }
					        
				        }
			        }
			        return true;
		        },
		        /**
				 * 检测销售品下产品关系(主要是产品间的互斥检测， 保存订单时依赖无法进行检测)
				 */
		        doCheckProductRelation : function(data, subProdOfferCartDataProvider) {
			        // 销售品依赖检测
			        if (!this.doCheckProductDepend(data, subProdOfferCartDataProvider)) { return false; }
			        // 销售品互斥检测
			        if (!this.doCheckProductEx(data)) { return false; }
			        
			        return true;
			        
		        },
		        /**
				 * 检测销售品下的产品属性信息
				 */
		        doCheckProdAttrInfo : function(data) {
			        var checkedProdOfferGridData = data.checkedProdOfferGridData,
				        checkInstance = this,
				        prodNameStr = "",
				        resultSubProdOfferData = BusCard.find(checkedProdOfferGridData, function(tempdata) {
					        if (tempdata.showData.prodOfferDetailFlag == '0') { return; }
					        var productInfoList = dojo.filter(tempdata.subProdOfferInfo.offerProdRelaList || [],
					                function(productInfo) {
						                return dojo.some(tempdata.relaProdPageInfoList || [], function(data) {
							                	if(data.prodBasicInfo.productId == productInfo.productId
							                			&&productInfo.productInfoVO.prodFuncType!="101"
						                        		&& data.prodBasicInfo.checkedStatus == true
						                                && !checkInstance.doCheckIfHasAttr(data.prodAttrInfo)
						                                && util.AttrUtil
						                                        .checkedIfNeedShow(productInfo.productInfoVO.attrList)){
						                            if(checkInstance.doCheckRoamProdForChg(data)){
						                            	return false;
						                            }
							                		return true;
							                	}
						                	});
					                });
					        if (productInfoList.length > 0) {
						        dojo.forEach(productInfoList, function(productInfo) {
							                prodNameStr += "【" + productInfo.productInfoVO.productName + "】"
						                });
						        return true;
					        }
				        });
			        if (resultSubProdOfferData) {
				        // alert("销售品【" +
				        // resultSubProdOfferData.subProdOfferInfo.prodOfferName
				        // + "】下产品" + prodNameStr
				        // + "有必填的产品属性，请点击销售品详情填写；");
				        messageBox.alert({
					                busiCode : "08410139",
					                infoList : [resultSubProdOfferData.subProdOfferInfo.prodOfferName, prodNameStr]
				                });
				        return false;
			        }
			        return true;
		        },
		        
		        /**
		         * 针对国际漫游产品变更时不进行检测
		         */
		        doCheckRoamProdForChg : function(oneProdInfo){
		        	if(!!oneProdInfo.prodBasicInfo){
		        		if(!!oneProdInfo.prodBasicInfo.prodInstInfo){
		        			if(oneProdInfo.prodBasicInfo.productId ==ConstantsPool.load("RoamProdIdConst").RoamProdIdConst.ROAM_PRODUCT_ID_A||
                        	oneProdInfo.prodBasicInfo.productId == ConstantsPool.load("RoamProdIdConst").RoamProdIdConst.ROAM_PRODUCT_ID_B||
                        	oneProdInfo.prodBasicInfo.productId == ConstantsPool.load("RoamProdIdConst").RoamProdIdConst.ROAM_PRODUCT_ID_C||
                        	oneProdInfo.prodBasicInfo.productId == ConstantsPool.load("RoamProdIdConst").RoamProdIdConst.ROAM_PRODUCT_ID_D ){
		        				return true;
		        			}
		        		}
		        	}
		        	return false;
		        },
		        
		        /**
				 * 检测销售品下的属性信息
				 */
		        doCheckOfferAttrInfo : function(data) {
			        var checkedProdOfferGridData = data.checkedProdOfferGridData,
				        checkInstance = this,
				        resultSubProdOfferData = BusCard.find(checkedProdOfferGridData, function(tempdata) {
					                // 判断是否含有销售品详情,没有则不进行下面的检测
					                if (tempdata.showData.prodOfferDetailFlag == '0') { return; }
					                return !checkInstance.doCheckProdOfferAttr(tempdata);
				                });
			        if (resultSubProdOfferData) {
				        // alert("销售品【" +
				        // resultSubProdOfferData.subProdOfferInfo.prodOfferName
				        // + "】有必填的销售品属性，请点击销售品详情填写；");
				        messageBox.alert({
					                busiCode : "08410140",
					                infoList : [resultSubProdOfferData.subProdOfferInfo.prodOfferName]
				                });
				        return false;
			        }
			        return true;
		        },
		        /**
				 * 检测销售品属性
				 */
		        doCheckProdOfferAttr : function(tempdata) {
			        var checkInstance = this;
			        if (util.AttrUtil.checkedIfNeedShow(tempdata.subProdOfferInfo.attrList)
			                && !checkInstance.doCheckIfHasAttr(tempdata.offerAttrPageInfoList)) { return false; }
			        return true;
		        },
		        /**
				 * 因为默认的{}类型的对象，不能判断是否为空，所以暂时用该方法
				 */
		        doCheckIfHasAttr : function(attrInfoData) {
			        for (var p in attrInfoData) {
				        return true;
			        }
			        return false;
		        },
		        
		        /**
				 * 促销政策数据校验
				 */
		        checkPromotionPageInfoBeforeCommit : function(data) {
			        var flag = true;
			        var checkInstance = this;
			        var checkBindingData = data.checkBindingData;
			        var controller = checkInstance.controller;
			        BusCard.each(checkBindingData, function(oneCheckedBindingData) {
		                // 促销政策属性信息
		                if (!checkInstance.checkPromotionAttrInfo(oneCheckedBindingData)) {
			                flag = false;
			                return false;
		                }
		                // 促销政策营销资源信息
		                if (!checkInstance.checkPromotionResRelaInfo(oneCheckedBindingData)) {
			                flag = false;
			                return false;
		                }
		                var promotionInfo = oneCheckedBindingData.showData.promotionInfo;
		                if(promotionInfo.promotionType == ConstantsPool.load("PromotionTypeConst").PromotionTypeConst.TRANS_MONTH_PROMOTION){//营业分月转兑
		                	//调用账务接口，判断输入的值是否满足条件
		                	if(!checkInstance.checkPromotionItemValueByBill(oneCheckedBindingData)){
		                		flag = false;
		                		return false;
		                	}
		                }
	                });
	                
	                if(!flag){
	                	return false;
	                }
	                
			        if(checkBindingData && checkBindingData.length>0){//已选择了促销政策
			        	//判断是否订购了非补贴卷类型的促销政策
			        	var subsidyType = ConstantsPool.load("PromotionTypeConst").PromotionTypeConst.SUBSIDY_PROMOTION;
			        	var checkflag = dojo.some(checkBindingData, function(oneCheckedBindingData){
							return oneCheckedBindingData.showData.promotionInfo.promotionType != subsidyType;
			        	});
			        	//判断是否OCS用户新装
				        if(checkInstance.isOcsPayModeMethod() && checkflag){//ocs新装且订购了非补贴卷类的促销政策
				        	alert("OCS用户不能订购非补贴卷类促销政策");
				        	checkInstance.uncheckedPromotionInfo(controller,"");
				        	flag = false;
				        }
				        
				        //判断同一个作用对象的租机和补贴卷是否超过一个
				        if(checkInstance.isMoreOnSameTarget(checkBindingData)){
				        	flag = false;
				        }
				        
				        //针对租机和话费补贴的预约情况进行特殊处理和校验
				        if(checkInstance.rentContinueCheck(checkBindingData,controller)){
				        	flag = false;
				        }
				        
				        //判断是否兑换了集团礼券
				        if(checkInstance.checkGroupCoupon(checkBindingData,controller)){
							flag = false;					        
				        }
			        }
			        return flag;
		        },
		        
		        /**
		         * 判断是否OCS新装
		         */
		        isOcsPayModeMethod : function(){
		        	var returnFlag = false;
		        	//var productBasicTrList = dojo.query("[uniqueId]");
		        	var productBasicTrList = dojo.query("tr[uniqueId]",this.controller.mainProdOfferWidget.domNode);
	        		if(productBasicTrList && productBasicTrList.length>0){
	        			for(var i=0;i<productBasicTrList.length;i++){
	        				var productBasicTr = productBasicTrList[i];
	        				var uniqueId = dojo.attr(productBasicTr, "uniqueId");
		        			var serviceCardId = "serviceCardWidget_" + uniqueId;
		        			var serviceCardWidget = unieap.byId(serviceCardId);
		        			var paymentModeflag = false;
		        			var prodInstFlag = false;
		        			if(serviceCardWidget.busCardInstance.$("paymentModeCd")){
		        				var paymentMode = serviceCardWidget.busCardInstance.$("paymentModeCd").value;
		        				if(paymentMode == ConstantsPool.load("PaymentModeConst").PaymentModeConst.PREPAID){//预付费
		        					paymentModeflag = true;
		        				}
		        			}
		        			if(serviceCardWidget.getModel().cardParam.userId == 0){//产品实例信息
		        				prodInstFlag = true;
		        			}
		        			if(paymentModeflag && prodInstFlag){//ocs新装
		        				returnFlag = true;
		        				break;
		        			}
	        			}
	        		}
	        		return returnFlag;
		        },
		        
		        /**
		         * 判断同一个作用对象是否订购超过一个的租机和补贴卷
		         */
		        isMoreOnSameTarget : function(checkBindingData){
		        	var uniqueIdList = [];
		        	var promotionInfoList = [];
		        	//促销政策常量
		        	var promotionTypeConst = ConstantsPool.load("PromotionTypeConst").PromotionTypeConst;
		        	//整理数据
		        	dojo.forEach(checkBindingData||[],function(oneBindingData){
		        		var promotionInfo = oneBindingData.showData.promotionInfo;//促销政策详细信息
		        		var targetObjectList = promotionInfo.promotionTargetObjectList;//作用对象集合
		        		//作用对象中是否存在作用类型为产品的数据
		        		var ifProductTarget = dojo.some(targetObjectList||[],function(oneTargetObject){
		        			return oneTargetObject.targetObjectType == 2;
		        		});
		        		var promotionType = promotionInfo.promotionType;
		        		if(ifProductTarget && (promotionType == promotionTypeConst.DEVICE_RENT || promotionType == promotionTypeConst.SUBSIDY_PROMOTION
		        				|| promotionType == promotionTypeConst.TELCHARGE_COUPON)){//作用对象类型为产品且促销类型为租机或补贴卷-->辽宁电信增加话费补贴
		        			var uniqueid = oneBindingData.promotionPageInfo.uniqueid;
		        			var ifExist = dojo.some(uniqueIdList||[],function(oneUniqueId){
		        				return oneUniqueId == uniqueid;
		        			});
		        			if(!ifExist){//不存在
		        				uniqueIdList.push(uniqueid);
		        			}
		        			var data = {
		        				checkData : oneBindingData
		        			};
		        			promotionInfoList.push(data);
		        		}
		        	});
		        	//数据校验
		        	for(var i=0;i<uniqueIdList.length;i++){
		        		var uniqueId = uniqueIdList[i];
		        		//相同作用对象的促销政策集合
		        		var promotionList = dojo.filter(promotionInfoList||[],function(onePromotionInfo){
		        			return onePromotionInfo.checkData.promotionPageInfo.uniqueid == uniqueId;
		        		});
		        		if(promotionList && promotionList.length>1){//作用于同一对象的租机或分月转兑订购数超过一时，需要进行校验
		        			for(var j=0;j<promotionList.length;j++){
		        				var promotionInfo = promotionList[j];
		        				for(var k=0;k<promotionList.length;k++){
		        					if(k!=j){
			        					var anotherPromotion = promotionList[k];
		        						var endDate = util.DateHelper.getDateFromString(promotionInfo.checkData.promotionPageInfo.endDate,1);
			        					var startDate = util.DateHelper.getDateFromString(anotherPromotion.checkData.promotionPageInfo.startDate,1);
			        					if(dojo.date.compare(startDate,endDate) < 0){//开始时间小于结束时间,出校交叉现象
			        						var name1 = promotionInfo.checkData.showData.promotionInfo.promotionName;
			        						var name2 = anotherPromotion.checkData.showData.promotionInfo.promotionName;
			        						var message = "促销【"+name1+"】与促销【"+name2+"】作用对象相同且【"+name1+"】结束时间大于【"+name2+"】开始时间,不能同时订购";
			        						alert(message);
			        						return true;
			        					}
			        				}
		        				}
		        			}
		        		}
		        		/* 同一对象同时只订购一个租机或补贴卷时，不需要校验
		        		else if(promotionList && promotionList.length == 1){//only one
		        			var serviceCardWidget = unieap.byId("serviceCardWidget_"+uniqueId);
		        			var userId = serviceCardWidget.getModel().cardParam.userId;
		        			if(userId){
			        			var param = "userId="+userId;
			        			var result = executeRequest("businessAcceptAction","getAcceptPromotionInfo",param);
			        			if(result){
			        				var acceptPromotionList = eval('('+ result +')');
			        				var promotionInfo = promotionList[0];
			        				var startDate = util.DateHelper.getDateFromString(promotionInfo.checkData.promotionPageInfo.startDate,1);
			        				var name = promotionInfo.checkData.showData.promotionInfo.promotionName;
			        				if(acceptPromotionList && acceptPromotionList.length>0){
			        					for(var p in acceptPromotionList){
			        						var acceptPromotionInfo = acceptPromotionList[p];
			        						if(acceptPromotionInfo && acceptPromotionInfo.expDate){
			        							var endDate = util.DateHelper.getDateFromString(acceptPromotionInfo.expDate,1);
			        							if(dojo.date.compare(startDate,endDate) < 0){
			        								var promotionType = acceptPromotionInfo.promotionType;
			        								var message = "";
			        								if(promotionType == ConstantsPool.load("PromotionTypeConst").DEVICE_RENT){//rent
			        									message = "已存在与促销【"+name+"】作用对象相同的租机类政策,不能同时订购";
			        								}else if(promotionType == ConstantsPool.load("PromotionTypeConst").TRANS_MONTH_PROMOTION){
			        									message = "已存在与促销【"+name+"】作用对象相同的补贴卷类政策,不能同时订购";
			        								}
			        								alert(message);
			        								return true;
			        							}
			        						}
			        					}
			        				}
			        			}
		        			}
		        		}
		        		**/
		        	}
		        	return false;
		        },
		        
		        /**
		         * 针对租机和话费补贴类型政策的预约处理
		         * 1.有效租机或话费补贴还有6个月以下到期，可以预约租机或话费补贴
		         * 2.有效租机或话费补贴必须是按时间失效的，才能预约租机
		         * 3.不能预约多个，只能预约一个
		         */
		        rentContinueCheck : function(checkBindingData,controller){
		        	var checkInstance = this;
		        	//促销政策类型常量
		        	var promotionTypeConst = ConstantsPool.load("PromotionTypeConst").PromotionTypeConst;
		        	//促销政策常量
		        	var promotionCommonConst = ConstantsPool.load("PromotionCommonConst").PromotionCommonConst;
		        	if(checkBindingData && checkBindingData.length>0){
		        		for(var i=0;i<checkBindingData.length;i++){
		        			var oneBindingData = checkBindingData[i];
		        			var promotionInfo = oneBindingData.showData.promotionInfo;
							var promotionType = promotionInfo.promotionType;
							var uniqueid = oneBindingData.promotionPageInfo.uniqueid;
							var serviceCardWidget = unieap.byId("serviceCardWidget_"+uniqueid);
							var userId = serviceCardWidget.getModel().cardParam.userId;
							if(promotionType == promotionTypeConst.DEVICE_RENT || promotionType == promotionTypeConst.TELCHARGE_COUPON){//租机或话费补贴
								if(userId && userId != 'null' && userId!=0){
									var param = "&userId="+userId;
									var resultJson = util.ServiceFactory.getService("url:businessAcceptAction.do?method=getValidPromotionInst" + param);
									if(resultJson){
										//var resultData = dojo.fromJson(resultJson);
										var objectType = resultJson.objectType;
										var objectInstance = resultJson.objectInstance;
										var consumeKindFlag = true;
										var expDate = "2037-1-1 00:00:00";
										var type = "";
										if(objectType == 'inst'){//实例数据
											var itemInstList = objectInstance.salesPromotionItemInstVOList;//促销政策属性实例集合
											consumeKindFlag = dojo.some(itemInstList||[],function(oneItemInst){
												return oneItemInst.itemAttrId == promotionCommonConst.CONSUME_KIND_CD && oneItemInst.attrValue == 2;
											});
											expDate = util.DateHelper.getDateFromString(objectInstance.expDate);
											type = objectInstance.promotionType;
										}else if(objectType == 'temp'){//临时数据
											var itemList = objectInstance.offerInstAttrTemplist;
											consumeKindFlag = dojo.some(itemList||[],function(oneItem){
												return oneItem.attrId == promotionCommonConst.CONSUME_KIND_CD && oneItem.attrValue == 2;
											});
											expDate = util.DateHelper.getDateFromString(objectInstance.expDate);
											type = objectInstance.promotionType;
										}
										if(type == promotionTypeConst.SUBSIDY_PROMOTION){//已存在有效补贴券类政策
											alert("作用对象已存在有效补贴券，不能再次订购租机或话费补贴类政策");
											checkInstance.uncheckedPromotionInfo(controller,"rent");
											return true;
										}else {//已存在有效租机或话费补贴类政策
											//1.检测有效政策的协议消费方式是否为协议消费期
											if(!consumeKindFlag){//协议消费方式为非时间的
												alert("作用对象已存在有效租机或话费补贴类政策且协议消费方式为非协议消费期，不能再次订购租机或话费补贴类政策");
												checkInstance.uncheckedPromotionInfo(controller,"rent");
												return true;
											}
											//2.到期时长是否满足要求
											//取开关表配置有效时间配置数据
											var para = "&ServiceKind=-1&apply_event=-1&infoId=233";
											var result = util.ServiceFactory.getService("url:businessAcceptAction.do?method=getCityBusinessParamValue"+para);
											if(result){
												var sysdate = util.DateHelper.getDateFromString($ac$.requestParam.today);
												sysdate.setMonth(sysdate.getMonth()+parseInt(result));
												if(dojo.date.compare(sysdate,expDate)<0){//距离失效日期大于配置值
													alert("当前时间距有效租机或话费补贴失效时间大于"+result+"个月，不能再次订购租机或话费补贴类政策");
													checkInstance.uncheckedPromotionInfo(controller,"rent");
													return true;
												}
											}
										}
									}
									
									//查询该业务号码的预约租机或话费补贴个数
									var resData = util.ServiceFactory.getService("url:businessAcceptAction.do?method=getReservePromotion" + param);
									if(resData){
										if(parseInt(resData)>=1){//预约状态租机或话费补贴多于一个
											alert("作用对象已存在预约状态租机或话费补贴，不能再订购租机或话费补贴类政策");
											checkInstance.uncheckedPromotionInfo(controller,"rent");
											return true;
										}
									}
								}
							}else if(promotionType == promotionTypeConst.SUBSIDY_PROMOTION){//补贴券
								if(userId && userId != 'null' && userId!=0){
									var param = "&userId="+userId;
									var resultDate = util.ServiceFactory.getService("url:businessAcceptAction.do?method=getPromotionInvalidDate" + param);
									if(resultDate){
										alert("作用对象已存在有效租机、话费补贴或补贴券政策，不能再次订购补贴券");
										checkInstance.uncheckedPromotionInfo(controller,"subsidy");
										return true;
									}
								}
							}
		        		}
		        	}
		        	return false;
		        },
		        
		        /**
		         * 判断是否兑换了集团礼券
		         */
		        checkGroupCoupon : function(checkBindingData,controller){
		        	var checkInstance = this;
		        	if(checkBindingData && checkBindingData.length>0){
		        		for(var i=0;i<checkBindingData.length;i++){
		        			var oneBindingData = checkBindingData[i];
		        			var uniqueid = oneBindingData.promotionPageInfo.uniqueid;
							var serviceCardWidget = unieap.byId("serviceCardWidget_"+uniqueid);
							var serviceId = serviceCardWidget.busCardInstance.$("serviceId").value;//服务号码
							if(serviceId && serviceId != 'null'){
								var para = "&serviceId="+serviceId;
								var result = util.ServiceFactory.getService("url:businessAcceptAction.do?method=doCheckGroupCoupon"+para);
								if(result && result == 1){//已兑换过集团礼券，不能订购促销政策
									alert("业务号码【"+ serviceId +"】已兑换了集团礼券，不能订购促销政策");
									checkInstance.uncheckedPromotionInfo(controller,"all");
									return true;
								}
							}
		        		}
		        	}
		        	return false;
		        },
		        
		        /**
		         * 取消已选择的促销政策
		         */
		        uncheckedPromotionInfo : function(controller,type){
		        	var salesPromotionOrderGrid = controller.salesPromotionOrderGrid;
		        	var bindingData = salesPromotionOrderGrid.ds.getRawData();
		        	var promotionTypeConst = ConstantsPool.load("PromotionTypeConst").PromotionTypeConst;
		        	if(type == 'rent'){//租机预约
		        		dojo.filter(bindingData || [],function(oneBindingData){
			        		var rowIndex = oneBindingData.rowIndex;
			        		//将租机或话费补贴类政策置为非选中状态
			        		var promotionInfo = oneBindingData.showData.promotionInfo;
			        		var promotionInstInfo = oneBindingData.showData.promotionInstInfo;// 实例数据
			        		if(promotionInfo && (promotionInfo.promotionType == promotionTypeConst.DEVICE_RENT || promotionInfo.promotionType == promotionTypeConst.TELCHARGE_COUPON)
			        			&& !promotionInstInfo){//取消新订购租机的选定状态
			        			dojo.query(".promotionNameDetail-" + rowIndex, salesPromotionOrderGrid.domNode)[0].childNodes[0].checked = false;
			        			//将终端串号清空
			        			var promotionDetailBuilder = controller.promotionDetailBuilder;
			        			if(promotionDetailBuilder){
			        				var promotionDetailObj =  promotionDetailBuilder.prodOfferDetailWidgetList["" + rowIndex];
			        				if(promotionDetailObj.resRelaBuilder){
			        					var resourceCardList = promotionDetailObj.resRelaBuilder.resourceCardList;
			        					if(resourceCardList){
			        						var acceptCardObj = resourceCardList[0].busCardInstance;
			        						if(acceptCardObj){
			        							acceptCardObj.$("deviceNo").value = "";
			        							//清空已使用的串号列表
			        							dojo.forEach(dojo.global.$appContext$.deviceNoList||[],function(oneDeviceNo){
													if(oneDeviceNo.rowIndex == rowIndex){
														oneDeviceNo.deviceNo = "";
													}
												});
			        						}
			        					}
			        				}
			        			}
			        			
			        			oneBindingData.resRelaPageDataList = [];
			        		}
			        	});
		        	}else if(type == 'subsidy'){//补贴券验证
			        	dojo.filter(bindingData || [],function(oneBindingData){
			        		var rowIndex = oneBindingData.rowIndex;
			        		//将非补贴卷类型的促销政策置为非选中状态
			        		var promotionInfo = oneBindingData.showData.promotionInfo;
			        		var promotionInstInfo = oneBindingData.showData.promotionInstInfo;// 实例数据
			        		if(promotionInfo && promotionInfo.promotionType == promotionTypeConst.SUBSIDY_PROMOTION && !promotionInstInfo){//类型为补贴券置为非选中状态
			        			dojo.query(".promotionNameDetail-" + rowIndex, salesPromotionOrderGrid.domNode)[0].childNodes[0].checked = false;
			        		}
			        	});
		        	}else if(type == 'all'){//全部
		        		dojo.filter(bindingData || [],function(oneBindingData){
			        		var rowIndex = oneBindingData.rowIndex;
			        		//将非补贴卷类型的促销政策置为非选中状态
			        		var promotionInfo = oneBindingData.showData.promotionInfo;
			        		var promotionInstInfo = oneBindingData.showData.promotionInstInfo;// 实例数据
			        		if(!promotionInstInfo){//除实例数据外取消选中状态
			        			dojo.query(".promotionNameDetail-" + rowIndex, salesPromotionOrderGrid.domNode)[0].childNodes[0].checked = false;
			        		}
			        	});
		        	}else{
		        		dojo.filter(bindingData || [],function(oneBindingData){
			        		var rowIndex = oneBindingData.rowIndex;
			        		//将非补贴卷类型的促销政策置为非选中状态
			        		var promotionInfo = oneBindingData.showData.promotionInfo;
			        		if(promotionInfo && promotionInfo.promotionType != promotionTypeConst.SUBSIDY_PROMOTION){//类型为非补贴卷
			        			dojo.query(".promotionNameDetail-" + rowIndex, salesPromotionOrderGrid.domNode)[0].childNodes[0].checked = false;
			        		}
			        	});
		        	}
		        },
		        
		        /**
				 * 检测促销政策属性必填项是否填写
				 */
		        checkPromotionAttrInfo : function(oneBindingData) {
			        var flag = true;
			        var promotionInfo = oneBindingData.showData.promotionInfo;
			        var requiredPromotionItem = dojo.filter(promotionInfo.salesPromotionItemList || [], function(
			                        onePromotionItem) {
				                return onePromotionItem.ifNecessary == 1;
			                });
			        var promotionItemInfoList = oneBindingData.promotionItemsPageInfoList;
			        for (var i = 0; i < requiredPromotionItem.length; i++) {
				        var oneRequiredPromotionItem = requiredPromotionItem[i];
				        var attrVO = oneRequiredPromotionItem.attrSpec;
				        var isNull = dojo.some(promotionItemInfoList || [], function(onePromotionItemInfo) {
					                return !onePromotionItemInfo[attrVO.attrCd];
				                });
				        if (isNull) {// 存在未填写的必填属性
					        // alert("促销政策【" +
					        // promotionInfo.promotionName +
					        // "】存在未填写的必填属性，请点击促销政策详情填写");
					        messageBox.alert({
						                busiCode : "08410141",
						                infoList : [promotionInfo.promotionName]
					                });
					        flag = false;
					        break;
				        }
			        }
			        return flag;
		        },
		        
		        /**
		         * 通过调用账务接口判断营业分月转兑属性值是否满足要求
		         */
		        checkPromotionItemValueByBill : function(oneBindingData){
		        	var promotionId = oneBindingData.showData.promotionInfo.promotionId;//促销政策标识
		        	var promotionItemInfoList = oneBindingData.promotionItemsPageInfoList;//促销政策属性列表
		        	var PromotionCommonConst = ConstantsPool.load("PromotionCommonConst").PromotionCommonConst;//促销政策常量
		        	var promotionItemObjList = [];
		        	for(var attrCd in promotionItemInfoList){
		        		var promotionItemObj = {};
		        		if(attrCd == PromotionCommonConst.CAPITAL_SUM){//本金总额
		        			promotionItemObj.attrName = "payFee";
		        			promotionItemObj.value = promotionItemInfoList[attrCd];
		        		}else if(attrCd == PromotionCommonConst.PRESENT_FEE_CD){//总赠送金额
		        			promotionItemObj.attrName = "presentFee";
		        			promotionItemObj.value = promotionItemInfoList[attrCd];
		        		}else if(attrCd == PromotionCommonConst.DELAY_MONTHS_CD){//延迟月数
		        			promotionItemObj.attrName = "delayMonths";
		        			promotionItemObj.value = promotionItemInfoList[attrCd];
		        		}else if(attrCd == PromotionCommonConst.ACTIVE_FEE_CD){//消费达到N元后启用
		        			promotionItemObj.attrName = "activeFee";
		        			promotionItemObj.value = promotionItemInfoList[attrCd];
		        		}else if(attrCd == PromotionCommonConst.UNIT_FEE_CD){//月转兑金额
		        			promotionItemObj.attrName = "unitFee";
		        			promotionItemObj.value = promotionItemInfoList[attrCd];
		        		}else if(attrCd == PromotionCommonConst.PRESENT_DELAY_MONTHS_CD){//赠送延迟月数
		        			promotionItemObj.attrName = "presentDelayMomths";
		        			promotionItemObj.value = promotionItemInfoList[attrCd];
		        		}
		        		if(promotionItemObj.attrName){
		        			promotionItemObjList.push(promotionItemObj);
		        		}
		        	}
		        	
		        	var param = "promotionId="+promotionId+"&itemList="+dojo.toJson(promotionItemObjList);
		        	var resu = executeRequest("orderDetailAction","doCheckCrmTransfer",param);
		        	if(resu == 1){//检测通过
		        		return true;	
		        	}else{
		        		alert(resu);
		        		return false;
		        	}
		        },
		        
		        /**
				 * 检测促销政策营销资源必填项是否填写
				 */
		        checkPromotionResRelaInfo : function(oneBindingData) {
			        var promotionInfo = oneBindingData.showData.promotionInfo;
			        var resRelaPageDataList = oneBindingData.resRelaPageDataList;//营销资源数据
			        var resRelaList = promotionInfo.proodOfferInfo.resRelaList||[];
//			        var flag = BusCard.exist(resRelaList || [], function(resRelaVO) {
//				                return resRelaVO
//				                        && (resRelaVO.mktResCd == 20 || resRelaVO.mktResCd == 21 || resRelaVO.mktResCd == 27 || resRelaVO.mktResCd == 36)
//				                        && !oneBindingData.resRelaPageDataList;
//			                });
			                
			        //检测方法
			        var flag = false;
			        for(var p in resRelaList){
//			        	if(!resRelaList.hasOwnProperty[p]){
//			        		continue;
//			        	}
			        	var resRelaVO = resRelaList[p];
			        	if(resRelaVO && (resRelaVO.mktResCd == 20 || resRelaVO.mktResCd == 21)){//营销资源为普通终端、A计划终端
			        		if(resRelaPageDataList.length>0){
			        			flag = dojo.some(resRelaPageDataList||[],function(oneResRela){
				        			return oneResRela.mktResInstId == "-1";
				        		});
			        		}else{
			        			flag = true;
			        		}
			        	}
			        	if(resRelaVO && resRelaVO.mktResCd == 36){//营销资源为话费礼券
			        		flag = dojo.some(resRelaPageDataList||[],function(oneResRela){
			        			return oneResRela.mktGiftResInstId == "-1";
			        		});
			        	}
			        	if(flag){
			        		break;
			        	}
			        }  
			        if (flag) {// 存在未填写的营销资源
				        // alert("促销政策【" + promotionInfo.promotionName
				        // + "】存在未填写的营销资源，请点击促销政策详情填写");
				        messageBox.alert({
					                busiCode : "08410142",
					                infoList : [promotionInfo.promotionName]
				                });
				        return false;
			        }
			        return true;
		        },
		        /**
				 * 针对新的后台订单结构进行支付关系检测
				 * 
				 * @method
				 */
		        doCheckPayRelationValidNew : function(pageInfoVO) {
			        try {
				        
				        var orderInfoVO = pageInfoVO.orderAcceptInfoList[0],
					        controller = this.controller,
					        accountRelaList = orderInfoVO.accountRelaList || [],
					        newUserList = dojo.filter(BusCard.jsonPath(orderInfoVO,
					                        "$.prodOfferAcceptInfoList[*].accessProdAcceptInfoList[*]]")
					                        || [], function(accessProdInfo) {
						                return (accessProdInfo.operKind==1)
						                        && accessProdInfo.ifNeedCreateProdInst != "0";
					                });
				        
				        dojo.forEach(accountRelaList, function(accountRela) {
					                var findNewUser = dojo.some(newUserList, function(accessProdInfo) {
						                        var userVO = accessProdInfo;
						                        return userVO.serviceId == accountRela.serviceId
						                                && userVO.productId == accountRela.productId;
						                        
					                        });
					                if (!findNewUser) {
						                // alert("\u652f\u4ed8\u5173\u7cfb\u9009\u62e9\u9519\u8bef:\u4e0d\u5b58\u5728\u53f7\u7801\u4e3a"
						                // + accountRela.serviceId +
						                // "\u7684\u65b0\u7528\u6237");
						                messageBox.alert({
							                        busiCode : "08410143",
							                        infoList : [accountRela.serviceId]
						                        });
						                throw new Error("");
					                }
					                
				                });
				        dojo.forEach(newUserList, function(accessProdInfo) {
					                var userVO = accessProdInfo;
					                var findAccountRela = dojo.some(accountRelaList, function(accountRela) {
						                        return accountRela.serviceId == userVO.serviceId
						                                && accountRela.productId == userVO.productId;
						                        
					                        });
					                if (!findAccountRela) {
						                // alert("\u6ca1\u6709\u4e3a\u7528\u6237"
						                // + userVO.serviceId
						                // +
						                // "\u9009\u62e9\u652f\u4ed8\u5173\u7cfb");
						                messageBox.alert({
					                        busiCode : "08410144",
					                        infoList : [userVO.serviceId]
				                        });
						                controller.route("/self/openProdOfferAcceptPane", [["payRelationPane"]]);
						                throw new Error("");
					                }
					                
				                });
				        
			        }
			        catch (e) {
				        return false;
			        }
			        
		        },
		        
		        /**
				 * 可选包购物车中的销售品的选中事件
				 */
		        doCheckedSubProdOffer : function(data) {
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
//			        	if(util.ProdOfferHelper.getIfChangeMainFlag(subProdOfferCartDataProvider) == 1){
//			        		subProdOfferCartDataProvider.updateCurrentProdOfferStyle(currentBindData, "prod-offer-reserve");
//			        	}else{
			        		subProdOfferCartDataProvider.updateCurrentProdOfferStyle(currentBindData, "prod-offer-add");
//			        	}
			        	
			        }
			        // .判断预约的
				    if(checkInstance.doCheckProdOfferReserve(currentProdOfferInfo,subProdOfferCartDataProvider,currentBindData,true)) {return false;}
			        // 2.(1)销售品分组最大最小值监测
			        if(!checkInstance.doCheckProdOfferGroupCount(data)) { return false; }
			        // 2.(2)销售品分组检测(暂时先注释掉)
			        if (!checkInstance.doCheckProdOfferGroupExclusion(data)) { return false; }
			        
			        // 3.根据销售品关系来判断(目前销售品关系三种：依赖，互斥，加装)
			        // --1.互斥的关联集合(不考虑主销售品)
			        var exProdOfferRelaList = dojo.filter(prodOfferRelaList || [], function(prodOfferRelaVO) {
				        return prodOfferRelaVO.relationTypeCD == util.PRODOFFERTYPE.EX_TYPE
				                && prodOfferRelaVO.prodOfferInfoVO.prodOfferType != util.PRODOFFERTYPE.MAIN_OFFER_TYPE;;
			        });
			        // 如果有互斥集合则进行操作，否则不进行处理
			        if (exProdOfferRelaList.length > 0) {
				        // 获取前可选包购物车中已经有的互斥的绑定数据集合
				        var relaProdOfferBindDataList = dojo.filter(bindingData, function(oneBindingData) {
					        return dojo.some(exProdOfferRelaList, function(prodOfferRelaVO) {
						        return (oneBindingData.subProdOfferInfo.prodOfferId == prodOfferRelaVO.offerAId && prodOfferRelaVO.offerZId == currentProdOfferInfo.prodOfferId)
						                || (oneBindingData.subProdOfferInfo.prodOfferId == prodOfferRelaVO.offerZId && prodOfferRelaVO.offerAId == currentProdOfferInfo.prodOfferId);
					        });
				        });
				        // 如果集合存在
				        if (relaProdOfferBindDataList.length > 0) {
					        // 过滤出选中的可选包集合
					        var exRelaProdOfferBindDataList = dojo.filter(relaProdOfferBindDataList || [], function(
					                        relaProdOfferBindData) {
						                return dojo.query(".subProdOfferDetail-" + relaProdOfferBindData.rowIndex,
						                        subProdOfferOrderGridDom)[0].childNodes[0].checked;
					                })
					        // 如果有选中的集合
					        if (exRelaProdOfferBindDataList.length > 0) {
					        	dojo.forEach(exRelaProdOfferBindDataList, function(data) {
							        dojo.query(".subProdOfferDetail-" + data.rowIndex,
							                subProdOfferOrderGridDom)[0].childNodes[0].checked = false;
//							        dojo.query(".orderStatus_" + data.rowIndex,
//							                subProdOfferOrderGridDom)[0].innerHTML = "\u672a\u8ba2\u8d2d";
							        if (data.prodOfferInst != null) {
								        subProdOfferCartDataProvider.updateCurrentProdOfferStyle(data,
								                "prod-offer-del");
							        }else{
							        	subProdOfferCartDataProvider.updateCurrentProdOfferStyle(data,
								                "prod-offer-unorder");
							        }
							        //取消可选包销售品进行检测
							        checkInstance.doUnCheckedSubProdOffer({
						                rowIndex : data.rowIndex,
						                subProdOfferCartDataProvider : subProdOfferCartDataProvider
					                });
						        });
					        }
				        }
			        }
			        
			        // --2.根据销售品中的依赖关系进行处理(默认认为只要有依赖关系就进行选中，不计较是否默认选中和是否必选)
					//依赖的销售品集合
			        var dependProdOfferRelaList = [];
			        //关联的销售品集合
			        var relProdOfferList = [];
			        //针对依赖和关联关系只取一层
			        dojo.forEach(prodOfferRelaList||[],function(prodOfferRelaVO){
			        	if(prodOfferRelaVO.relationTypeCD == util.PRODOFFERTYPE.DEPEND_TYPE
				                        && prodOfferRelaVO.offerAId == currentProdOfferInfo.prodOfferId
				                        && prodOfferRelaVO.prodOfferInfoVO.prodOfferType != util.PRODOFFERTYPE.MAIN_OFFER_TYPE){
				        	if(prodOfferRelaVO.selectable == 1){
				        		//依赖的销售品集合
				        		dependProdOfferRelaList.push(prodOfferRelaVO);
				        	}else{
				        		//关联的销售品集合
				        		relProdOfferList.push(prodOfferRelaVO);
				        	}
				        }
			        });
			         //主销售品id
			        var mainProdOfferId = null;
			        //当前主销售品下允许选择的可选包销售品集合
			        var _allowProdOfferIds_ = [];
			        //判断是否是自主版
			        if($ac$.currentMainProdOfferInfoVO.bindType == 2){
			        	//取成员销售品id
			        	mainProdOfferId = subProdOfferCartDataProvider.contentPane.prodOfferInfoVO.prodOfferId;
			        }else{
			        	//取主销售品id
			        	mainProdOfferId = $ac$.currentMainProdOfferInfoVO.prodOfferId;
			        }
			        //如果有则从全局对象中取
			        if($ac$.get("_allowProdOfferIds_"+mainProdOfferId)){
			        	_allowProdOfferIds_ = $ac$.get("_allowProdOfferIds_"+mainProdOfferId);
			        }else{
			        	var _uniqueId_ = subProdOfferCartDataProvider.uniqueId||"";
			        	//没有则获取
			        	var param = "prodOfferId=" + mainProdOfferId+ "&accProdListStr="+(checkInstance.controller.getAccProdIdList(_uniqueId_)||"")
			        	+ "&method=getSubProdOfferInfoByName";
				        _allowProdOfferIds_ = util.ServiceFactory.getService("url:shoppingCartAction.do?"+ param);
			        	$ac$.set("_allowProdOfferIds_"+mainProdOfferId,_allowProdOfferIds_)
			        }
			        
			        //检测依赖的销售品是否都在允许选择的销售品集合中，如果有不在的，则提示不允许继续受理
			        if(!this.doCheckIfExistAllowOffers(_allowProdOfferIds_,dependProdOfferRelaList,currentProdOfferInfo)){
			        	//取消当前销售品
			        	dojo.query(".subProdOfferDetail-" + rowIndex, subProdOfferOrderGridDom)[0].childNodes[0].checked = false;
				        if (bindingData[rowIndex].prodOfferInst != null) {
//					        dojo.query(".orderStatus_" + rowIndex, subProdOfferOrderGridDom)[0].innerHTML = "已退订";
					        subProdOfferCartDataProvider.updateCurrentProdOfferStyle(
					                currentBindData, "prod-offer-del");
				        } else {
//					        dojo.query(".orderStatus_" + rowIndex, subProdOfferOrderGridDom)[0].innerHTML = "未订购";
				        	subProdOfferCartDataProvider.updateCurrentProdOfferStyle(
					                currentBindData, "prod-offer-unorder");
				        }
			        	return false;
			        }
			        //存在当前主套餐下的关联的销售品集合
			        var relaProdOfferInMainList = [];
			        //不存在于当前主套餐下的关联的销售品的集合
			        var relaProdOfferNotInMainList = [];
			        //计算关联销售品集合中哪个可以订购哪个不可以订购
			        dojo.forEach(relProdOfferList||[],function(relProdOffer){
			        	var _f = dojo.some(_allowProdOfferIds_||[],function(allowProdOfferInfo){
		        			return allowProdOfferInfo.prodOfferId == relProdOffer.offerZId;
		        		});
		        		if(_f){
		        			relaProdOfferInMainList.push(relProdOffer);
		        		}else{
		        			relaProdOfferNotInMainList.push(relProdOffer);
		        		}
			        });
			        //拼出不能订购的关联产品信息串(给出提示)
			        // 获取销售品名称，供提示
			        var relaProdOfferNotInMainStr = "";
			        dojo.forEach(relaProdOfferNotInMainList, function(info) {
				                relaProdOfferNotInMainStr += "[" + info.prodOfferInfoVO.prodOfferName + "]"
			                });
			        // 如果有可选择的依赖销售品或者有关联的销售品才进行如下处理
			        if (dependProdOfferRelaList.length > 0 || relaProdOfferInMainList.length > 0) {
				        // 存在于可选包购物车中的依赖销售品的信息
				        var existSubCartData = [];
				        // 不存在于可选包购物车中的依赖销售品的信息
				        var notExistSubCartData = [];
				        // 获取存在于购物车中的依赖销售品和不存在于购物车中的依赖销售品(现在的依赖互斥都是针对于同一个接入类进行检测的)
				        dependProdOfferRelaList = dependProdOfferRelaList.concat(relaProdOfferInMainList);
				        dojo.forEach(dependProdOfferRelaList, function(dependProdOfferRelaVO) {
					        var flag = dojo.some(bindingData, function(oneBindingData) {
						                return dependProdOfferRelaVO.offerZId == oneBindingData.subProdOfferInfo.prodOfferId
						                &&oneBindingData.showData.chooseNumberObj!=null?
						                currentBindData.showData.chooseNumberObj.uniqueId == oneBindingData.showData.chooseNumberObj.uniqueId:
						                oneBindingData.showData.chooseNumberObj == null;
					                });
					        if (flag) {
						        existSubCartData.push(dependProdOfferRelaVO);
					        } else {
						        notExistSubCartData.push(dependProdOfferRelaVO);
					        }
				        });
				        if (existSubCartData.length == 0) {
				        	if(relaProdOfferNotInMainStr!=""){
				        		//alert("当前的选中的销售品的关联销售品"+relaProdOfferNotInMainStr+"不在主销售品下,不订购这些关联销售品");
				        		 messageBox.alert({
			                        busiCode : "08410208",
			                        infoList : [relaProdOfferNotInMainStr]
		                        });
				        		
				        	}
				        	//订购展示销售品
					        dojo.forEach(dependProdOfferRelaList,function(dependProdOfferRelaVO) {
					        	  var subProdOfferInfo = util.ProdOfferHelper.getProdOfferDetail(dependProdOfferRelaVO.offerZId);
					        	  //拼接一行的绑定数据
					        	  var rowData = util.ProdOfferHelper.createProdOfferRowData(subProdOfferInfo);

					        	  if(currentBindData.showData.chooseNumberObj!=null){
					        	  		//默认取第一个号码为使用号码
					        	  		rowData.showData.chooseNumberObj = currentBindData.showData.chooseNumberObj;
					        	  }else{
					        	  		//没有使用号码，则不生成使用号码
					        	  		rowData.showData.chooseNumberObj =null;
					        	  }
					        	  //向表格中添加一行
						          subProdOfferCartDataProvider.addOneRow(rowData);
						          //稍后修改
						          checkInstance.doCheckedSubProdOffer({
						                rowIndex : rowData.rowIndex,
						                subProdOfferCartDataProvider : subProdOfferCartDataProvider
					                });
			                });
					        // 当前销售品依赖的可选包销售品全在可选包购物车中
				        } else if (notExistSubCartData.length == 0) {
				        	if(relaProdOfferNotInMainStr!=""){
				        		//alert("当前的选中的销售品的关联销售品"+relaProdOfferNotInMainStr+"不在主销售品下,不订购这些关联销售品");
				        		 messageBox.alert({
			                        busiCode : "08410208",
			                        infoList : [relaProdOfferNotInMainStr]
		                        });
				        	}
					        var filterUncheckedSubCartData = dojo.filter(bindingData, function(oneBindData) {
						        return dojo.query(".subProdOfferDetail-" + oneBindData.rowIndex,
						                subProdOfferOrderGridDom)[0].childNodes[0].checked == false
						                && dojo.some(existSubCartData || [], function(existProdOfferRela) {
							                return existProdOfferRela.offerZId == oneBindData.subProdOfferInfo.prodOfferId;
						                })&&currentBindData.showData.chooseNumberObj!=null?
						                currentBindData.showData.chooseNumberObj.uniqueId == oneBindData.showData.chooseNumberObj.uniqueId:
						                oneBindData.showData.chooseNumberObj == null;
					        });
					        if (filterUncheckedSubCartData.length > 0) {
						        dojo.forEach(filterUncheckedSubCartData, function(data) {
					                dojo.query(".subProdOfferDetail-" + data.rowIndex,
					                        subProdOfferOrderGridDom)[0].childNodes[0].checked = true;
					                if (data.prodOfferInst != null) {
//						                dojo.query(".orderStatus_" + data.rowIndex,
//						                        subProdOfferOrderGridDom)[0].innerHTML = "用户已有";
					                	subProdOfferCartDataProvider.updateCurrentProdOfferStyle(
					                data, "prod-offer-change");
					                } else {
//						                dojo.query(".orderStatus_" + data.rowIndex,
//						                        subProdOfferOrderGridDom)[0].innerHTML = "已订购";
					                	subProdOfferCartDataProvider.updateCurrentProdOfferStyle(
					                data, "prod-offer-add");
					                }
					                checkInstance.doCheckedSubProdOffer({
						                rowIndex : data.rowIndex,
						                subProdOfferCartDataProvider : subProdOfferCartDataProvider
					                });
				                });
					        }
					    // 当前销售品依赖的可选包销售品一部分在可选包购物车中，还有在可选包树上的部分
				        } else {
				        	if(relaProdOfferNotInMainStr!=""){
				        		//alert("当前的选中的销售品的关联销售品"+relaProdOfferNotInMainStr+"不在主销售品下,不订购这些关联销售品");
				        		 messageBox.alert({
			                        busiCode : "08410208",
			                        infoList : [relaProdOfferNotInMainStr]
		                        });
				        	}
					        var filterUncheckedSubCartData = dojo.filter(bindingData, function(oneBindData) {
						        return dojo.query(".subProdOfferDetail-" + oneBindData.rowIndex,
						                subProdOfferOrderGridDom)[0].childNodes[0].checked == false
						                && dojo.some(existSubCartData || [], function(existProdOfferRela) {
							                return existProdOfferRela.offerZId == oneBindData.subProdOfferInfo.prodOfferId;
						                })&&currentBindData.showData.chooseNumberObj!=null?
						                currentBindData.showData.chooseNumberObj.uniqueId == oneBindData.showData.chooseNumberObj.uniqueId:
						                oneBindData.showData.chooseNumberObj == null;
					        });
					        if (filterUncheckedSubCartData.length > 0) {
						        dojo.forEach(filterUncheckedSubCartData, function(data) {
					                dojo.query(".subProdOfferDetail-" + data.rowIndex,
					                        subProdOfferOrderGridDom)[0].childNodes[0].checked = true;
					                if (data.prodOfferInst != null) {
//						                dojo.query(".orderStatus_" + data.rowIndex,
//						                        subProdOfferOrderGridDom)[0].innerHTML = "用户已有";
						                subProdOfferCartDataProvider.updateCurrentProdOfferStyle(
					                data, "prod-offer-change");
					                } else {
//						                dojo.query(".orderStatus_" + data.rowIndex,
//						                        subProdOfferOrderGridDom)[0].innerHTML = "已订购";
					                	subProdOfferCartDataProvider.updateCurrentProdOfferStyle(
					                data, "prod-offer-add");
					                }
					                checkInstance.doCheckedSubProdOffer({
						                rowIndex : data.rowIndex,
						                subProdOfferCartDataProvider : subProdOfferCartDataProvider
					                });
				                });
					        }
					        dojo.forEach(notExistSubCartData||[],function(dependProdOfferRelaVO) {
					        	  var subProdOfferInfo = util.ProdOfferHelper.getProdOfferDetail(dependProdOfferRelaVO.offerZId);
					        	  //拼接一行的绑定数据
					        	  var rowData = util.ProdOfferHelper.createProdOfferRowData(subProdOfferInfo);

					        	  if(currentBindData.showData.chooseNumberObj!=null){
					        	  		//默认取第一个号码为使用号码
					        	  		rowData.showData.chooseNumberObj = currentBindData.showData.chooseNumberObj;
					        	  }else{
					        	  		//没有使用号码，则不生成使用号码
					        	  		rowData.showData.chooseNumberObj =null;
					        	  }
					        	  //向表格中添加一行
						          subProdOfferCartDataProvider.addOneRow(rowData);
						          checkInstance.doCheckedSubProdOffer({
						                rowIndex : rowData.rowIndex,
						                subProdOfferCartDataProvider : subProdOfferCartDataProvider
					                });
			                });
					        
				        }
			        }
		        },
		        
		        /*
		         * 检测依赖的销售品是否都在允许选择的集合中 
		         */
		        doCheckIfExistAllowOffers : function(allowProdOfferIds,dependProdOfferRelaList,currentProdOfferInfo){
		        	//判断依赖的销售品是否都在主销售品允许选择的范围内
		        	var _NotExistList = dojo.filter(dependProdOfferRelaList||[],function(info){
		        		return !dojo.some(allowProdOfferIds,function(allowProdOfferInfo){
		        			return allowProdOfferInfo.prodOfferId == info.offerZId;
		        		});
		        	});
		        	if(_NotExistList.length>0){
		        		var prodOfferNameStr = "";
				        dojo.forEach(_NotExistList||[], function(dependProdOfferRelaVO) {
					                prodOfferNameStr += "[" + dependProdOfferRelaVO.prodOfferInfoVO.prodOfferName + "]"
				                });
				        //稍后该提示信息进行修改
				       // alert("销售品["+currentProdOfferInfo.prodOfferName+"]依赖的销售品"+prodOfferNameStr+"不在当前的主套餐["+currentProdOfferInfo.prodOfferName+"]下,不允许订购该可选包");
		        		 messageBox.alert({
	                        busiCode : "08410209",
	                        infoList : [currentProdOfferInfo.prodOfferName,prodOfferNameStr,currentProdOfferInfo.prodOfferName]
                        });
		        		return false;	
		        	}
		        	return true;
		        	
		        },
		        /**
				 * 依赖销售品递归查询：dependProdOfferRelaList为从prodOfferRelaList中取出的满足条件的子集
				 * 目前产品提供的接口只查了1层关系，未进行递归查询，所以没有数据 需要产品提供接口在测试
				 */
		        getAllDependOffer : function(dependProdOfferRelaList, prodOfferRelaList, returnRelaList) {
			        var newCheck = this;
			        dojo.forEach(dependProdOfferRelaList, function(dependProdOfferRelaVO) {
				        var dependProdOfferRelaListTmp = dojo.filter(prodOfferRelaList || [],
				                function(prodOfferRelaVO) {
					                return prodOfferRelaVO.relationTypeCD == util.PRODOFFERTYPE.DEPEND_TYPE
					                        && prodOfferRelaVO.offerAId == dependProdOfferRelaVO.offerZId
					                        && prodOfferRelaVO.prodOfferInfoVO.prodOfferType != util.PRODOFFERTYPE.MAIN_OFFER_TYPE
					                        && prodOfferRelaVO.selectable == 1;
				                });
				        if (dependProdOfferRelaListTmp.length > 0) {
					        dojo.forEach(dependProdOfferRelaListTmp, function(dependProdOfferRelaVOTmp) {
						                returnRelaList.push(dependProdOfferRelaVOTmp);
					                });
					        newCheck.getAllDependOffer(dependProdOfferRelaListTmp, prodOfferRelaList, returnRelaList);
				        }
			        });
			        return returnRelaList;
		        },
		        
		        /**
		         * 判断是否是预约生效的可选包
		         */
		        getIfReserveSubProdOffer : function(data){
		        	if(util.ProdOfferHelper.getIfReserveSubProdOffer(data.prodOfferInst)){
		        		return false;
		        	}
		        	return true;
		        },
		        
		        /**
				 * 取消销售品的事件
				 */
		        doUnCheckedSubProdOffer : function(data) {
			        var subProdOfferCartDataProvider = data.subProdOfferCartDataProvider;
			        var bindingData = subProdOfferCartDataProvider.getSubGridBindingData(),
				        rowIndex = data.rowIndex,
				        controller = this.controller,
				        checkInstance = this,
				        dependProdOfferBindData = [],
				        prodOfferNameStr = "",
				        subProdOfferOrderGridDom = subProdOfferCartDataProvider.subProdOfferOrderGrid.domNode,
				        endLoop = true,
				        currentBindData = dojo.filter(bindingData, function(loopData) {
					                return loopData.rowIndex == rowIndex;
				                })[0],
				        currentProdOfferInfo = currentBindData.subProdOfferInfo,
				        currentProdOfferInst = currentBindData.prodOfferInst,
				        prodOfferRelaList = util.ProdOfferHelper.getProdOfferRelaList(currentProdOfferInfo);
			        //预约可选包的取消检测
//				    if(!checkInstance.getIfReserveSubProdOffer(currentBindData)){
//				    	messageBox.alert({
//					                busiCode : "08410236",
//					                infoList : [currentProdOfferInfo.prodOfferName]
//				                });
//				        dojo.query(".subProdOfferDetail-" + rowIndex, subProdOfferOrderGridDom)[0].childNodes[0].checked = true;
//				        if (currentProdOfferInst != null) {
//					        subProdOfferCartDataProvider.updateCurrentProdOfferStyle(
//					                currentBindData, "prod-offer-reserve");
//				        } else {
//				        	subProdOfferCartDataProvider.updateCurrentProdOfferStyle(
//					                currentBindData, "prod-offer-add");
//				        }
//				        return;
//				    }
			        // 0.判断当前销售品和主销售品是否有必选关系，如果有，则不允许取消
			        if (checkInstance.doCheckSelectable(currentProdOfferInfo, subProdOfferCartDataProvider.uniqueId)) {
				        // alert("销售品【" +
				        // currentProdOfferInfo.prodOfferName +
				        // "】与主销售品有必选关系，不可取消");
				        messageBox.alert({
					                busiCode : "08410145",
					                infoList : [currentProdOfferInfo.prodOfferName]
				                });
				        dojo.query(".subProdOfferDetail-" + rowIndex, subProdOfferOrderGridDom)[0].childNodes[0].checked = true;
				        if (currentProdOfferInst != null) {
					        //dojo.query(".orderStatus_" + rowIndex, subProdOfferOrderGridDom)[0].innerHTML = "用户已有";
					        subProdOfferCartDataProvider.updateCurrentProdOfferStyle(
					                currentBindData, "prod-offer-change");
				        } else {
					        //dojo.query(".orderStatus_" + rowIndex, subProdOfferOrderGridDom)[0].innerHTML = "已订购";
				        	subProdOfferCartDataProvider.updateCurrentProdOfferStyle(
					                currentBindData, "prod-offer-add");
				        }
				        return;
			        }
			        // 1.根据销售品实例来决定页面展示
			        if (currentProdOfferInst != null) {
				        subProdOfferCartDataProvider.updateCurrentProdOfferStyle(currentBindData, "prod-offer-del");
//				        dojo.query(".orderStatus_" + rowIndex, subProdOfferOrderGridDom)[0].innerHTML = "\u5df2\u9000\u8ba2";
			        } else {
//				        dojo.query(".orderStatus_" + rowIndex, subProdOfferOrderGridDom)[0].innerHTML = "\u672a\u8ba2\u8d2d";
			        	subProdOfferCartDataProvider.updateCurrentProdOfferStyle(currentBindData, "prod-offer-unorder");
			        }
			        // .判断预约的
				    //if(checkInstance.doCheckProdOfferReserve(currentProdOfferInfo,subProdOfferCartDataProvider,currentBindData,false)) {return false;}
			        var dependProdOfferBindData = [];
			        var cancelTips = "";
			        var param = {
				        "cancelProdOfferBindList" : dependProdOfferBindData,
				        "cancelProdOfferInfo" : currentProdOfferInfo,
				        "subProdOfferCartDataProvider" : subProdOfferCartDataProvider,
				        "cancelTips" : cancelTips
			        };
			        checkInstance.computationDependProdOfferForCancel(param);
			        cancelTips = param.cancelTips;
			        // 如果存在依赖的销售品，则进行提示
			        if (dependProdOfferBindData.length > 0) {
			        	dojo.forEach(dependProdOfferBindData, function(data) {
					        dojo.query(".subProdOfferDetail-" + data.rowIndex,
					                        subProdOfferOrderGridDom)[0].childNodes[0].checked = false;
					        if (data.prodOfferInst != null) {
						        //dojo.query(".orderStatus_" + data.rowIndex, subProdOfferOrderGridDom)[0].innerHTML = "已退订";
						        // 同时设置成退订的颜色
						        subProdOfferCartDataProvider.updateCurrentProdOfferStyle(data,
						                "prod-offer-del");
					        } else {
						        //dojo.query(".orderStatus_" + data.rowIndex, subProdOfferOrderGridDom)[0].innerHTML = "未订购";
					        	subProdOfferCartDataProvider.updateCurrentProdOfferStyle(data,
						                "prod-offer-unorder");
					        }
					        //取消可选包销售品进行检测
					        checkInstance.doUnCheckedSubProdOffer({
				                rowIndex : data.rowIndex,
				                subProdOfferCartDataProvider : subProdOfferCartDataProvider
			                });
				        });
			        }
			        //判断关联的，例如A和B关联，如果取消A，则B也取消
			        checkInstance.doUnCheckedRelation(data);
			        if(!!$ac$.get('currentOperDelView')){
	        			$ac$.set('currentOperDelView',false);
	        		}
		        },
		        
		        /**
		         * 针对关联的销售品，例如A和B关联，如果取消A，则B也取消
		         */
		        doUnCheckedRelation : function(data){
		        	var subProdOfferCartDataProvider = data.subProdOfferCartDataProvider;
			        var bindingData = subProdOfferCartDataProvider.getSubGridBindingData(),
				        rowIndex = data.rowIndex,
				        controller = this.controller,
				        checkInstance = this,
				        dependProdOfferBindData = [],
				        prodOfferNameStr = "",
				        subProdOfferOrderGridDom = subProdOfferCartDataProvider.subProdOfferOrderGrid.domNode,
				        endLoop = true,
				        currentBindData = dojo.filter(bindingData, function(loopData) {
					                return loopData.rowIndex == rowIndex;
				                })[0],
				        currentProdOfferInfo = currentBindData.subProdOfferInfo,
				        currentProdOfferInst = currentBindData.prodOfferInst,
				        prodOfferRelaList = util.ProdOfferHelper.getProdOfferRelaList(currentProdOfferInfo);
				    //关联的销售品id集合
				    var relProdOfferIds = [];
				    dojo.forEach(prodOfferRelaList||[],function(prodOfferRelaVO){
				    	//获取非必选的关联的销售品集合
			        	if(prodOfferRelaVO.selectable != 1&&prodOfferRelaVO.relationTypeCD == util.PRODOFFERTYPE.DEPEND_TYPE
				                        && prodOfferRelaVO.offerAId == currentProdOfferInfo.prodOfferId
				                        && prodOfferRelaVO.prodOfferInfoVO.prodOfferType != util.PRODOFFERTYPE.MAIN_OFFER_TYPE){
				        	//判断关联的销售品是否在可选包购物车中，如果存在，则进行取消
				            relProdOfferIds.push(prodOfferRelaVO.offerZId);     
				        }
			        });
			        //在可选包购物车中过滤出A关联的可选包销售品B
			        var cancelBindData = dojo.filter(bindingData||[],function(_data_){
			        	return dojo.some(relProdOfferIds||[],function(relProdOfferId){
			        		return _data_.subProdOfferInfo.prodOfferId == relProdOfferId
			        	});
			        });
			        if (cancelBindData.length > 0) {
			        	dojo.forEach(cancelBindData, function(data) {
//			        		/只对选中的进行操作
			        		if(dojo.query(".subProdOfferDetail-" + data.rowIndex,
					                        subProdOfferOrderGridDom)[0].childNodes[0].checked){
						        dojo.query(".subProdOfferDetail-" + data.rowIndex,
						                        subProdOfferOrderGridDom)[0].childNodes[0].checked = false;
						        if (data.prodOfferInst != null) {
							        //dojo.query(".orderStatus_" + data.rowIndex, subProdOfferOrderGridDom)[0].innerHTML = "已退订";
							        // 同时设置成退订的颜色
							        subProdOfferCartDataProvider.updateCurrentProdOfferStyle(data,
							                "prod-offer-del");
						        } else {
							        //dojo.query(".orderStatus_" + data.rowIndex, subProdOfferOrderGridDom)[0].innerHTML = "未订购";
						        	subProdOfferCartDataProvider.updateCurrentProdOfferStyle(data,
							                "prod-offer-unorder");
						        }
						        //取消可选包销售品进行检测
						        checkInstance.doUnCheckedSubProdOffer({
					                rowIndex : data.rowIndex,
					                subProdOfferCartDataProvider : subProdOfferCartDataProvider
				                });
	                        }
				        });
			        }
			        
		        },
		        /**
				 * 判断当前取消的销售品是否为必选
				 */
		        doCheckSelectable : function(currentProdOfferInfo, uniqueId) {
			        
			        if (!dojo.global.$appContext$.get("prodOfferList" + uniqueId)) { return false; }
			        var prodOfferRelaList = null;
			        var mainProdOfferId = null;
			        var mainProdOfferVO = $ac$.selectedMainProdOfferInfoVO;
			        if(mainProdOfferVO.bindType == 2){
			        	//如果是自助版则不需要特殊处理
			        	var mainProdOfferAcceptInfoVO = util.ProdOfferHelper.getMainProdOffer(dojo.global.$appContext$.get("prodOfferList" + uniqueId))[0];
			        	prodOfferRelaList = mainProdOfferAcceptInfoVO.prodOfferRelaList;
			        	mainProdOfferId = mainProdOfferAcceptInfoVO.prodOfferId;
			        }else{
			        	//非自主版需要特殊处理,利用主销售品id获取主销售品的销售品关系
			        	mainProdOfferId = mainProdOfferVO.prodOfferId;
			        	var resultData = util.ServiceFactory.getService(
				                "url:orderDetailAction.do?method=getProdOfferRelaListByMainProdOfferId", null, {
					                method : 'post',
					                content : {
						                prodOfferId : mainProdOfferVO.prodOfferId
					                }
					                
				                }
	
				        );
			        	prodOfferRelaList = resultData;
			        }
			        return dojo.some(prodOfferRelaList || [], function(prodOfferRelaVO) {
				                return prodOfferRelaVO.offerAId == mainProdOfferId
				                        && prodOfferRelaVO.offerZId == currentProdOfferInfo.prodOfferId
				                        && prodOfferRelaVO.selectDefault == 1 && prodOfferRelaVO.selectable == 1
			                });
		        },
		        
		        /**
		         * 销售品分组最大最小监测
		         */
		        doCheckProdOfferGroupCount : function(data) {
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
				        currentProdOfferInst = currentBindData.prodOfferInst;
				    //获取当前选中的销售品的分组
				    if (currentProdOfferInfo.prodOfferGroupVO) {
				    	//获取当前销售品的分组对象
				    	var prodOfferGroupVO = currentProdOfferInfo.prodOfferGroupVO;
				    	//最大值
				    	var maxSelectable = prodOfferGroupVO.maxSelectable;
				    	//最小值
				    	var minSelectable = prodOfferGroupVO.minSelectable;
				    	//分组标示
				    	var prodGroupID = prodOfferGroupVO.prodGroupID;
				    	//过滤出当前已经选中的可选包和当前选的可选包在一个分组下的销售品
				    	var sameGroupProdOfferList = dojo.filter(bindingData||[],function(_data){
				    		var subProdOfferInfo = _data.subProdOfferInfo;
				    		if(!!subProdOfferInfo.prodOfferGroupVO){
				    			var tempProdGroupID = subProdOfferInfo.prodOfferGroupVO.prodGroupID;
				    			return tempProdGroupID == prodGroupID && _data.rowIndex != rowIndex && dojo.query(".subProdOfferDetail-" + _data.rowIndex,
					                        subProdOfferOrderGridDom)[0].childNodes[0].checked;
				    		}
				    		return false;
				    	});
				    	//如果同一个分组的小于最大值,则允许继续订购
				    	if(sameGroupProdOfferList.length<maxSelectable){
				    		return true;
				    	}else if(sameGroupProdOfferList.length==maxSelectable){
				    		//弹出提示信息,拼销售品名称串
				    		var prodOfferNameStr = "";
				    		dojo.forEach(sameGroupProdOfferList||[],function(_data_){
				    			prodOfferNameStr += "[" + _data_.subProdOfferInfo.prodOfferName + "]";
				    		});
				    		var tipStr = "销售品分组["+prodOfferGroupVO.groupName+"]中最大可以选择["+maxSelectable+"],最少可以选择["+minSelectable+"],已经选择了"+prodOfferNameStr+",请确认"
				    		messageBox.alert({ 
								title :"\u63d0\u793a\u4fe1\u606f",
								message : tipStr
							});
				    		dojo.query(".subProdOfferDetail-" + currentBindData.rowIndex,
					                        subProdOfferOrderGridDom)[0].childNodes[0].checked = false;
				    		if (currentProdOfferInst != null) {
						        subProdOfferCartDataProvider.updateCurrentProdOfferStyle(currentBindData,
						                "prod-offer-del");
					        }else{
					        	subProdOfferCartDataProvider.updateCurrentProdOfferStyle(currentBindData,
						                "prod-offer-unorder");
					        }
					        //取消可选包销售品进行检测
					        checkInstance.doUnCheckedSubProdOffer({
				                rowIndex : currentBindData.rowIndex,
				                subProdOfferCartDataProvider : subProdOfferCartDataProvider
			                });
				    		return false;
				    	}
				    }
		        }, 
		        
		        
		        /**
				 * 销售品分组互斥检测
				 */
		        doCheckProdOfferGroupExclusion : function(data) {
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
				        groupRelList = [];
				    //如果分组关系没有则不进行检测    
			        if (currentProdOfferInfo.prodOfferGroupVO
			                && currentProdOfferInfo.prodOfferGroupVO.prodOfferGroupRelVO) {
				        groupRelList = currentProdOfferInfo.prodOfferGroupVO.prodOfferGroupRelVO;
				        if(groupRelList.length == 0){
				        	return true;
				        }
			        } else {
				        return true;
			        }
			        // 获取可选包购物车中的销售品信息集合
			        for (var p in bindingData) {
			        	var otherRowIndex = bindingData[p].rowIndex;
				        var tempProdOfferData = bindingData[p].subProdOfferInfo,
					        groupId = "";
				        if (tempProdOfferData && tempProdOfferData.prodOfferGroupId) {
					        groupId = tempProdOfferData.prodOfferGroupId;
				        } else {
					        continue;
				        }
				        for(var q in groupRelList){
				        	var relVO = groupRelList[q];
					        if (relVO.groupZID == groupId && relVO.relationTypeCD == util.PRODOFFERTYPE.EX_TYPE) {
						        if (dojo.query(".subProdOfferDetail-" + otherRowIndex)[0].childNodes[0].checked) {
						        	var tipStr = "销售品["+currentProdOfferInfo.prodOfferName+"]与销售品["+tempProdOfferData.prodOfferName+"]分组互斥,请确认";
						        	messageBox.alert({ 
										title :"\u63d0\u793a\u4fe1\u606f",
										message : tipStr,
										onComplete : function(){
											
										}
									});
									dojo.query(".subProdOfferDetail-" + currentBindData.rowIndex,
							                        subProdOfferOrderGridDom)[0].childNodes[0].checked = false;
						    		if (currentProdOfferInst != null) {
								        subProdOfferCartDataProvider.updateCurrentProdOfferStyle(currentBindData,
								                "prod-offer-del");
							        }else{
							        	subProdOfferCartDataProvider.updateCurrentProdOfferStyle(currentBindData,
								                "prod-offer-unorder");
							        }
							        //取消可选包销售品进行检测
							        checkInstance.doUnCheckedSubProdOffer({
						                rowIndex : currentBindData.rowIndex,
						                subProdOfferCartDataProvider : subProdOfferCartDataProvider
					                });
						    		return false;
						        }
					        }
				        }
			        }
			        return true;
		        },
		        /**
				 * 自助版套餐成员产品受理的最大个数和最小个数检测
				 * 
				 * @param {Event|Null} evt
				 * 
				 * @method
				 */
		        doMemeberProductCountCheck : function(evt) {
			        var trNode = util.DomHelper.findParentNode(evt.currentTarget, function(node) {
				                return node.tagName.toUpperCase() == 'TR';
			                }),
				        productId = dojo.attr(trNode, "productId"),
				        maxCount = dojo.attr(trNode, "maxCount"),
				        productName = dojo.attr(trNode, "productName"),
				        productTrNodeList = dojo.query("TR[productId=" + productId + "]", trNode.parentNode),
				        currentCount = productTrNodeList.length,
				        _list = dojo.filter(productTrNodeList, function(node) {
					                var operNode = dojo.query(".member-oper-div", node)[0],
						                checkNode = dojo.query(".member-product-checkbox", node)[0];
					                if (!checkNode.checked) { return true;

					                }
					                if (operNode) {
						                var splitNode = dojo.query(".member-offer-split", operNode)[0],
							                quitNode = dojo.query(".member-offer-quit", operNode)[0];
						                return (splitNode && dojo.hasClass(splitNode, "action-selected"))
						                        || (quitNode && dojo.hasClass(quitNode, "action-selected"));
						                
					                }
					                
				                });
			        currentCount -= _list.length;
			        if (currentCount >= maxCount) {
				        // alert("\u6700\u591a\u53ea\u80fd\u8ba2\u8d2d"
				        // + maxCount + "\u4e2a[" + productName
				        // + "]\u4ea7\u54c1");
				        messageBox.alert({
					                busiCode : "08410146",
					                infoList : [maxCount, productName]
				                });
				        return false;
			        }
			        
		        },
		        /**
		         * 检测升速可选包是否是预约的，如果是预约的，不允许取消
		         */
		        checkIfPortSpeedReserve : function(rowData){
		        	var prodOfferInst = rowData.prodOfferInst;
		        	if(rowData.prodOfferInst==null){
		        		return false;
		        	}
		        	var effDate = prodOfferInst.effDate;
					var expDate = prodOfferInst.expDate;
					var invalidDate = "2037-01-01 00:00:00";
					var sysDate = $ac$.requestParam.today;
					//首先判断是否预约
		        	if(util.DateHelper.compareDateValue(util.DateHelper.format(effDate),sysDate)||(util.DateHelper.compareDateValue(invalidDate,util.DateHelper.format(expDate))&&!!prodOfferInst.oldExpDate)){
		        		if(util.ProdOfferHelper.getRaiseSpeedObj(rowData.subProdOfferInfo)==null){
		        			return false;
		        		}else{
		        			messageBox.alert({ 
		                            title :"\u63d0\u793a\u4fe1\u606f",
		                            message : "当前["+rowData.subProdOfferInfo.prodOfferName+"]可选包影响预约生效的产品属性[端口速率]变更，不允许取消!"
		                    });
				        	return true;
		        		}
		        	}
		        	return false;
		        },
		        
		        /**
				 * 自主版套餐成员选择检测,主体检测逻辑由PPM实现
				 * 
				 * @method
				 */
		        doCheckMemberProdOfferSelect : function(param) {
			        var widget = param.widget;
			        var selectedMemberProdOfferList = param.selectedMemberProdOfferList;
			        
			        var mainProdOfferInfoVO = $ac$.get("currentMainProdOfferInfoVO");
			        // TODO 有待PPM实现相关检测逻辑
			        var mainProdOfferId = $ac$.get("currentMainProdOfferInfoVO").prodOfferId;
			        var _orderedProdOfferList = dojo.filter(selectedMemberProdOfferList, function(v) {
				                return v.action == 'new' || v.action == 'change' || v.action == 'nochange' || !v.action;
				                
			                });
			        var productIdList = dojo.map(_orderedProdOfferList, function(v) {
				                return parseInt("" + v.productId);
			                });
			        var prodOfferIdList = dojo.map(_orderedProdOfferList, function(v) {
				                return parseInt("" + v.prodOfferId);
				                
			                });
			        if (mainProdOfferInfoVO.bindType != 2) {
				        prodOfferIdList = [];
				        
			        }
			        
			        var belongCode = -1;
			        try {
				        belongCode = parseInt("" + this.controller.getBelongCode());
				        belongCode = belongCode ||-1;
				        
			        }
			        catch (e) {

			        }
			        var promptVO = util.ServiceFactory.getService(
			                "url:orderDetailAction.do?method=checkOrderedOfferProdRelation", null, {
				                method : 'post',
				                content : {
				                	commonRegionId:belongCode,
					                interfaceType : 1,
					                prodOfferId : mainProdOfferId,
					                offerList : prodOfferIdList,
					                productList : productIdList
				                }
				                
			                }

			        );
			        if (promptVO && promptVO.result == '1') {
				        // alert(promptVO.message);
				        messageBox.alert({
					                busiCode : "08410147",
					                infoList : [promptVO.message]
				                });
				        return false;
				        
			        } else {
				        return true;
			        }
			        
		        },
		        
		        /**
				 * 取消可选包销售品时，计算因为取消的可选包,导致依赖的销售品也被取消(递归调用)
				 */
		        computationDependProdOfferForCancel : function(param) {
			        var cancelProdOfferBindList = param.cancelProdOfferBindList;
			        // 当前取消的销售品
			        var cancelProdOfferInfo = param.cancelProdOfferInfo;
			        // 当前取消的销售品所在的可选包表格处理对象
			        var _prodvider = param.subProdOfferCartDataProvider;
			        // 当前取消的销售品所在的可选包表格中所有的可选包数据对象
			        var bindingData = _prodvider.getSubGridBindingData();
			        // 可选包表格dom对象
			        var subProdOfferOrderGridDom = _prodvider.subProdOfferOrderGrid.domNode;
			        var handler = this;
			        var tempCancelProdOfferList = [];
			        dojo.forEach(bindingData, function(oneBindingData) {
				                var prodOfferId = oneBindingData.subProdOfferInfo.prodOfferId,
					                prodOfferRelaList = util.ProdOfferHelper
					                        .getProdOfferRelaList(oneBindingData.subProdOfferInfo);
				                dojo.forEach(prodOfferRelaList, function(prodOfferRelaVO) {
					                        // 如果是依赖，并且必选，页面目前还是选中状态
					                        if (prodOfferRelaVO.relationTypeCD == util.PRODOFFERTYPE.DEPEND_TYPE
					                                && cancelProdOfferInfo.prodOfferId == prodOfferRelaVO.offerZId
					                                && oneBindingData.subProdOfferInfo.prodOfferId == prodOfferRelaVO.offerAId
					                                && prodOfferRelaVO.selectable == 1
					                                && dojo.query(".subProdOfferDetail-" + oneBindingData.rowIndex,
					                                        subProdOfferOrderGridDom)[0].childNodes[0].checked) {
						                        var flag = dojo.some(cancelProdOfferBindList, function(
						                                        cancelProdOfferBindData) {
							                                return oneBindingData.rowIndex == cancelProdOfferBindData.rowIndex;
						                                });
						                        if (!flag) {
							                        tempCancelProdOfferList.push(oneBindingData);
							                        cancelProdOfferBindList.push(oneBindingData);
						                        }
						                        return false;
					                        }
				                        });
			                });
			        // 如果该次循环没有找到要取消的依赖的销售品，则直接退出递归
			        if (tempCancelProdOfferList.length == 0) { return; }
			        // 拼退订的提示信息
			        param.cancelTips += handler.concatProdOfferNameStr(tempCancelProdOfferList, cancelProdOfferInfo);
			        dojo.forEach(tempCancelProdOfferList, function(data) {
				                param.cancelProdOfferInfo = data.subProdOfferInfo;
				                handler.computationDependProdOfferForCancel(param);
			                });
		        },
		        /**
				 * 拼销售品名称
				 */
		        concatProdOfferNameStr : function(cancelProdOfferBindList, cancelProdOfferInfo) {
			        var prodOfferNameStr = "";
			        dojo.forEach(cancelProdOfferBindList, function(data) {
				                prodOfferNameStr += "【" + data.subProdOfferInfo.prodOfferName + "】";
			                });
			        return "销售品" + prodOfferNameStr + "依赖销售品【" + cancelProdOfferInfo.prodOfferName + "】,退订销售品【"
			                + cancelProdOfferInfo.prodOfferName + "】,会导致" + prodOfferNameStr + "退订,";
		        },
		        
		        
		        /**
		         * 选择老号码时，判断老号码是否是预约的
		         */
		        doChekOldUserServiceReserve : function(mainProdOfferInstId,serviceId){
		        	var param = "prodOfferInstId=" + mainProdOfferInstId+ "&method=doCheckIfReserve";
		        	var resultData = util.ServiceFactory.getService("url:orderDetailAction.do?"+ param);
		        	if(resultData == "1"){
		        		var tips = "号码["+serviceId+"]有预约生效的主销售品变更,不允许选择该号码";
	        			messageBox.alert({
			                busiCode : "08410147",
			                infoList : [tips]
		                });
		                return false;
		        	}
		        	return true;
		        },
		        /**
				 * 检测主销售品是否是预约(变更主销售品时判断新的主销售品是否是预约生效)
				 * 有主销售品预约的不允许普通附属销售品，只允许变更公共附属销售品
				 */
		        doCheckMainProdOfferReserve : function(prodOfferInfoVO, _provider) {
			        var checkInstance = this;
			        var currentUniqueId = _provider.uniqueId||"";
			        if(!!$ac$.get("reserveMain"+currentUniqueId)){
			        	var mainProdOfferVO = null;
			        	if(_provider.contentPane){
			        		mainProdOfferVO = _provider.contentPane.prodOfferInfoVO;
			        	}else{
			        		mainProdOfferVO = $ac$.selectedMainProdOfferInfoVO;
			        	}
			        	//if (prodOfferInfoVO.prodOfferType == 3){
		        			//alert("当前销售品["+mainProdOfferVO.prodOfferName+"]有预约生效的主销售品变更,不允许变更普通附属销售品");
		        			var tips = "当前销售品["+mainProdOfferVO.prodOfferName+"]有预约生效的主销售品变更,不允许增加或变更可选包销售品";
		        			messageBox.alert({
				                busiCode : "08410147",
				                infoList : [tips]
			                });
		        			return false;
		        		//}
			        }else{
				       //自主版变更
				       if (_provider.contentPane) {
				       	
				       		var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
				       		var targetSelectMember = dojo.filter(selectedMemberProdOfferList||[],function(selectedMemberProdOffer){
				        			return selectedMemberProdOffer.uniqueId == _provider.uniqueId;
				        		});
				        	if(!!targetSelectMember[0]){
	//			        		/实例存在才进行往下走
				        		if(!!targetSelectMember[0].offerInstVO){
					        		if(targetSelectMember[0].offerInstVO.prodOfferId == targetSelectMember[0].prodOfferId){
					        			//从此处取主销售品实例数据
						       			var mainProdOfferInstId = _provider.contentPane.offerInstVO.prodOfferInstId;
						       			var mainProdOfferVO = _provider.contentPane.prodOfferInfoVO;
						       			var param = "prodOfferInstId=" + mainProdOfferInstId+ "&method=doCheckIfReserve";
							        	var resultData = util.ServiceFactory.getService("url:orderDetailAction.do?"+ param);
							        	//有预约
							        	if(resultData == "1"){
							        		$ac$.set("reserveMain"+provider.uniqueId,true);
							        		//普通附属销售品不允许增加和删除
							        		//if (prodOfferInfoVO.prodOfferType == 3){
							        			//alert("当前销售品["+mainProdOfferVO.prodOfferName+"]有预约生效的主销售品变更,不允许变更普通附属销售品");
							        			var tips = "当前销售品["+mainProdOfferVO.prodOfferName+"]有预约生效的主销售品变更,不允许增加或变更可选包销售品";
							        			messageBox.alert({
									                busiCode : "08410147",
									                infoList : [tips]
								                });
							        			return false;
							        		//}
							        	}
					        		}
				        		}
				        	}
				       	//非自主版变更
				        } else {
				        	//说明是变更可选包
				        	if(!!$ac$.mainProdOfferInstVO){
					        	if($ac$.selectedMainProdOfferInfoVO.prodOfferId ==$ac$.mainProdOfferInstVO.prodOfferId){
					        		var prodOfferInstId = $ac$.mainProdOfferInstVO.prodOfferInstId;
					        		//调用预约查询接口，查询预约的接口
					       			var param = "prodOfferInstId=" + prodOfferInstId+ "&method=doCheckIfReserve";
						        	var resultData = util.ServiceFactory.getService("url:orderDetailAction.do?"+ param);
						        	//有预约
						        	if(resultData == "1"){
						        		$ac$.set("reserveMain",true);
						        		//普通附属可选包不允许增加和删除
						        		//if (prodOfferInfoVO.prodOfferType == 3){
						        			//alert("当前销售品["+$ac$.selectedMainProdOfferInfoVO.prodOfferName+"]有预约生效的主销售品变更,不允许变更普通附属销售品");
						        			var tips = "当前销售品["+$ac$.selectedMainProdOfferInfoVO.prodOfferName+"]有预约生效的主销售品变更,不允许增加或变更可选包销售品";
						        			messageBox.alert({
								                busiCode : "08410147",
								                infoList : [tips]
							                });
						        			return false;
						        		//}
						        	}
					        	}
				        	}
				        }
			        }
			        return true;
		        },
		        
		        /**
		         * 根据主销售品是否有预约生效的主销售品变更来判断
		         * 有预约生效的主销售品变更时，不允许选择新的可选包销售品，但是针对旧的可选包可以取消，也可以重新进行选中
		         */
		        doCheckProdOfferReserve : function(prodOfferInfoVO,_provider,rowData,flag){
		        	if(!!$ac$.get('currentOperDelView')){
		        		return false;
		        	}
		        	//如果有实例信息，则不进行处理
		        	if(rowData.prodOfferInst!=null){
		        		return false;
		        	}
		        	var checkInstance = this;
		        	if(!checkInstance.doCheckMainProdOfferReserve(prodOfferInfoVO,_provider)){
		        		var subProdOfferOrderGridDom = _provider.subProdOfferOrderGrid.domNode;
		        		//针对页面上的销售品设置状态
		        		//to选中
		        		if(flag){
		        			dojo.query(".subProdOfferDetail-" + rowData.rowIndex,
							                        subProdOfferOrderGridDom)[0].childNodes[0].checked = false;
		        			if (rowData.prodOfferInst != null) {
						        _provider.updateCurrentProdOfferStyle(rowData,
						                "prod-offer-del");
					        }else{
					        	_provider.updateCurrentProdOfferStyle(rowData,
						                "prod-offer-unorder");
					        }
					        _provider.dealRaiseXDSLSpeed(rowData.subProdOfferInfo,
			                rowData.showData.chooseNumberObj, false, rowData);
					        //取消可选包销售品进行检测
//					        checkInstance.doUnCheckedSubProdOffer({
//				                rowIndex : rowData.rowIndex,
//				                subProdOfferCartDataProvider : _provider
//			                });
		        		//to取消
		        		}else{
		        			dojo.query(".subProdOfferDetail-" + rowData.rowIndex,
							                        subProdOfferOrderGridDom)[0].childNodes[0].checked = true;
		        			if (rowData.prodOfferInst != null) {
			                	_provider.updateCurrentProdOfferStyle(
			                rowData, "prod-offer-change");
			                } else {
			                	_provider.updateCurrentProdOfferStyle(
			                rowData, "prod-offer-add");
			                }
			                _provider.dealRaiseXDSLSpeed(rowData.subProdOfferInfo,
			                rowData.showData.chooseNumberObj, true, rowData);
//			                checkInstance.doCheckedSubProdOffer({
//				                rowIndex : data.rowIndex,
//				                subProdOfferCartDataProvider : _provider
//			                });
		        		}
		        		return true;
		        	}
		        	return false;
		        },
		        
		        /**
				 * 集团检测：检测是否可以订购子群销售品
				 */
		        doCheckSubGroupProdOffer : function() {
			        var checkInstance = this;
			        var requestParam = dojo.global.$appContext$.get("requestParam")
			        var custId = requestParam.customerData.custId
			        SubGroupProdId = ConstantsPool.load("SubGroupProdIdConst").SubGroupProdIdConst;
			        var prodOfferInfoVO = $ac$.get("currentMainProdOfferInfoVO");
			        var offerProdRelaList = prodOfferInfoVO.offerProdRelaList;
			        var flag = false;
			        dojo.forEach(offerProdRelaList, function(vo) {
				                var productId = vo.productInfoVO.productId;
				                if (productId == SubGroupProdId.IVPN_SUB_GROUP_PRODID
				                        || productId == SubGroupProdId.ECP_SUB_GROUP_PRODID) {
					                flag = true;
					                return true;
				                }
				                
			                });
			        if (flag) {
				        var param = "&custId=" + custId + "&subGrpProdOfferId=" + prodOfferInfoVO.prodOfferId;
				        var chekSubGroupProdInfo = util.ServiceFactory
				                .getService("url:prodOfferSaleAjaxAction.do?method=getProductRelByGRPOfferList" + param);
				        if (chekSubGroupProdInfo != "" && chekSubGroupProdInfo != undefined) {
					        $ac$.set("subGroupProdInfo", chekSubGroupProdInfo);
					        //检测闭合群订购个数。
					         var relProductId;
				             dojo.forEach(chekSubGroupProdInfo.prodRelaList, function(prodRelaVO) {
					                if (prodRelaVO.relaType == '100800') {
						                relProductId = prodRelaVO.prodA;
						                return true;
					                }
				                });
				             if(relProductId!='903')  {  
						         var paramValue="&relProductId="+relProductId+"&custId=" + custId+"&productId="+chekSubGroupProdInfo.productId;
						         var result=util.ServiceFactory.getService("url:orderDetailAction.do?method=checkSubGroupCount" + paramValue);
						         var arr=result.split("~");
						          if(arr[0]==-1){
						             messageBox.alert({
						                 title : "错误信息",
						                 message:arr[1]
					                 });
						             return false;
						           }else{
						           //alert(arr[1]);
							             if(arr[1]>=arr[2]){
								              messageBox.alert({
								                 busiCode : "08410190",
								                 infoList:[arr[2]]
							                 });
							                  return false;
							             }
					              }
					           }
					        return true;
				        }
				        messageBox.alert({
					                busiCode : "08410055"
				                });
				        return false;
			        }
			        return true;
		        },
		        /**
				 * FIXME 10000-bus only allow new operation,when value
				 * of node with id 'acceptWay' is changed to 10000-bus ,
				 * bus process must get all previous order_item info
				 * according to custOrderId to check if exist change
				 * or quit prodoffer
				 * 
				 * @method
				 */
		        doCheck10000NbrAccept : function(custOrderAcceptInfoVO) {
			        var f = BusCard.jsonPath(custOrderAcceptInfoVO,
			                "$.orderAcceptInfoList[*].prodOfferAcceptInfoList[?(@.operKind==2||@.operKind==3)]");
			        // has change or quit operation
			        if (f && f.length > 0) {
				        var acceptElem = prodOfferAcceptLoader.orderInfoCardWidget.busCardInstance.$("acceptWay"),
					        opList = dojo.filter(dojo._toArray(acceptElem.options), function(op) {
						                return (/10000\u53f7\u53d7\u7406/.test(op.text));
					                });
				        if ((opList && opList.length > 0) && (acceptElem.value == opList[0].value)) {
					       // alert("\u53d7\u7406\u65b9\u5f0f[" + opList[0].text
					               // + "]:\u53ea\u5141\u8bb8\u65b0\u88c5\u64cd\u4f5c");
					                
					         messageBox.alert({
		                        busiCode : "08410210",
		                        infoList : [opList[0].text]
	                        });        
					        return false;
				        }
				        
			        }
			        return true;
		        },	
                /**
                 * batch business does not allow to deal device
                 * 
                 * @method
                 */
                doCheckBatchDevice : function(custOrderAcceptInfoVO) {
                    var batchFlag = custOrderAcceptInfoVO.custOrderBasicAcceptInfoVO.batchFlag;
                    if(batchFlag == "1"){
                        return !dojo.some(custOrderAcceptInfoVO.orderAcceptInfoList||[],function(orderAcceptInfo){
	                            return dojo.some(orderAcceptInfo.salesPromotionAcceptInfoList||[],function(salesPromotion){
		                                if(!!salesPromotion && !!salesPromotion.deviceRentBusTempList
		                                            && !!salesPromotion.deviceRentBusTempList.length > 0){
					                        messageBox.alert({ 
					                            title :"\u63d0\u793a\u4fe1\u606f",
					                            message : "\u6279\u91cf\u65b0\u88c5" +
                                                          "\u4e0d\u80fd\u529e\u7406\u79df\u673a" +
                                                          "\u4e0e\u8bdd\u8d39\u8865\u8d34\u4e1a\u52a1"
					                        });
		                                    return true;
		                                }                            
		                            });
	                        })
                    }
                    return true;
                },  
		        /**
				 * 检测页面功能类产品依赖互斥关系
				 * 
				 * @param {serviceProdInfo} 功能类产品信息
				 * @param {serviceProdIdList} 可选包下功能类产品集合
				 */
	        	doCheckProdRelation : function(serviceProdInfo,serviceProdIdList){
	        		var productInfoVO = serviceProdInfo.productInfo.productInfoVO,
			        	prodOfferName = serviceProdInfo.prodOfferName,
			        	serviceId = serviceProdInfo.serviceId,
                		prodWidget = this,
                		warnInfo = "",
                		checkFlag = 1,//1：检测成功 0：检测失败
                		REL_MUTEX = ConstantsPool.load("ProdRelaTypeConst").ProdRelaTypeConst.MUTEX, //互斥
                		REL_DEPEND = ConstantsPool.load("ProdRelaTypeConst").ProdRelaTypeConst.DEPEND; //依赖
                	var tipInfo = (!!serviceId?"业务号码【"+serviceId+"】下的":"");
            		tipInfo += (!!prodOfferName?"可选包【"+prodOfferName+"】中的":"");
            		tipInfo += (!!productInfoVO.productName?"产品【"+productInfoVO.productName+"】":"");
					for(var key in productInfoVO.prodRelaList){
						if(!productInfoVO.prodRelaList.hasOwnProperty(key)){													
							continue;
						}
						var prodRelaVO = productInfoVO.prodRelaList[key];
            			if(prodRelaVO.relaType == REL_DEPEND){//检测依赖关系
            				if((prodRelaVO.prodA == productInfoVO.productId && !serviceProdIdList[""+prodRelaVO.prodB])){										
								var productName = BusCard.$remote("innerInterfaceBO").getProductName(prodRelaVO.prodB);     							
        						warnInfo += tipInfo+"与【"+productName+"】产品存在依赖关系,需订购【"+productName+"】产品.";
        						checkFlag = 0;
        						break;
            				}
            			}else if(prodRelaVO.relaType == REL_MUTEX){//检测互斥关系
            				if((prodRelaVO.prodA == productInfoVO.productId && !!serviceProdIdList[""+prodRelaVO.prodB]) || 
									(prodRelaVO.prodB == productInfoVO.productId && !!serviceProdIdList[""+prodRelaVO.prodA])){										
								var prodIdInfo = serviceProdIdList[""+prodRelaVO.prodB]||serviceProdIdList[""+prodRelaVO.prodA];
								var prodInfo = prodIdInfo.productInfo.productInfoVO;
								if(prodInfo.productId == productInfoVO.productId){									
									prodIdInfo = serviceProdIdList[""+prodRelaVO.prodA]||serviceProdIdList[""+prodRelaVO.prodB];
									prodInfo = prodIdInfo.productInfo.productInfoVO;
								}
								var tempTipInfo = (!!prodIdInfo.serviceId?"业务号码【"+prodIdInfo.serviceId+"】下的":"");
			            		tempTipInfo += (!!prodIdInfo.prodOfferName?"可选包【"+prodIdInfo.prodOfferName+"】中的":"");
			            		tempTipInfo += (!!prodInfo.productName?"产品【"+prodInfo.productName+"】":"");
        						if(prodInfo.ifSelectAble == "1"){
        							warnInfo += tipInfo+"与"+tempTipInfo+"存在互斥关系,且【"+prodInfo.productName+"】为必选产品,需退订"+tipInfo+".";
        						}else{        							
            						warnInfo += tipInfo+"与可选包【"+prodIdInfo.prodOfferName+"】下的【"+prodInfo.productName+"】产品存在互斥关系,需退其中一产品.";
        						}
        						checkFlag = 0;
        						break;
            				}	                				
            			}
            		}
            		if(checkFlag == 0){
						//messageBox.alert({ 
							//title :"\u63d0\u793a\u4fe1\u606f",
							//message : warnInfo.substring(0,warnInfo.length-1)
						//});
						  messageBox.alert({
		                        busiCode : "08410207",
		                        infoList : [warnInfo.substring(0,warnInfo.length-1)]
	                        });  
						
            		}
            		return {"flag":checkFlag,"warnInfo":warnInfo.substring(0,warnInfo.length-1)};
				
	        	},
	        	/**
	        	 * 针对组合销售品的付费方式的检验
	        	 */
	        	doCheckPayModeMethod : function(){
	        		//var productBasicTrList = dojo.query("[uniqueId]");
	        		var productBasicTrList = dojo.query("tr[uniqueId]",this.controller.mainProdOfferWidget.domNode);
//	        		/获取付费方式全部
	        		var payModeMethodList = [];
	        		dojo.forEach(productBasicTrList||[], function(productBasicTr){
	        			var uniqueId = dojo.attr(productBasicTr, "uniqueId");
	        			var serviceCardId = "serviceCardWidget_" + uniqueId;
	        			var serviceCardWidget = unieap.byId(serviceCardId);
	        			if(serviceCardWidget.busCardInstance.$("paymentModeCd")){
	        				payModeMethodList.push(serviceCardWidget.busCardInstance.$("paymentModeCd").value);
	        			}
	        			
	        		});
	        		//如果只有一个，那么直接返回,不区分付费类型
	        		if(payModeMethodList.length<=1){
	        			return false;
	        		}
	        		//先判断付费类型中是否有预付费类型
	        		if(dojo.some(payModeMethodList,function(payModeMethod){return payModeMethod==ConstantsPool.load("PaymentModeConst").PaymentModeConst.PREPAID;})){
//	        			alert("组合不允许有预付费方式，请修改");
	        			//messageBox.alert({ 
							//title :"\u63d0\u793a\u4fe1\u606f",
							//message : "组合不允许有预付费方式，请修改"
						//});
						  messageBox.alert({
		                        busiCode : "08410211"
	                      });  
						
	        			return true;
	        		}
	        		return false;
	        	},
	        	/**
	        	 * 针对密码的检验
	        	 */
	        	doCheckPasswordMethod : function(){
	        		if(!!jsCommon){
		        		//var productBasicTrList = dojo.query("[uniqueId]");
	        			var productBasicTrList = dojo.query("tr[uniqueId]",this.controller.mainProdOfferWidget.domNode);
		        		var mainSerNode = null;
		        		var mainProdOfferPane = null;
		        		var passwordDom = null;
		        		var cardInst = null;
						//获取全部密码
		        		var passwordList = dojo.map(productBasicTrList||[], function(productBasicTr){
		        			var uniqueId = dojo.attr(productBasicTr, "uniqueId");
		        			var serviceCardId = "serviceCardWidget_" + uniqueId;
		        			var serviceCardWidget = unieap.byId(serviceCardId);
		        			if(!mainSerNode){
								mainSerNode = dojo.query(".mainProdServiceInfo-"+productBasicTr.getAttribute("viewId"))[0].parentNode.parentNode;
		        			}
		        			if(!mainProdOfferPane){
			        			mainProdOfferPane = util.DomHelper.getParentWidget(productBasicTr,"unieap.layout.TitlePane");
		        			}
		        			return {
		        				cardInst : serviceCardWidget.busCardInstance,
		        				password : serviceCardWidget.busCardInstance.$("password"),
		        				serviceId : serviceCardWidget.busCardInstance.$("serviceId")
		        				};
		        		});
		        		var easyPwdCheckInfo = "";
		        		var ifConfirm = true;
		        		//先判断付费类型中是否有预付费类型
		        		var index = 1;
		        		dojo.forEach(passwordList,function(passwordObj){
		        			if(!!jsCommon.checkEasyPassword && !!passwordObj.password && !!passwordObj.serviceId){
		        				if(jsCommon.checkEasyPassword(passwordObj.password,true) == false){	
		        					if(!passwordDom){
		        						cardInst = passwordObj.cardInst;
		        						passwordDom = passwordObj.password;
		        					}
		        					easyPwdCheckInfo +="["+passwordObj.serviceId.value+"]"
		        					if(index%3 == 0){
		        						easyPwdCheckInfo +="\n"
		        					}else{
		        						easyPwdCheckInfo +=","
		        					}
		        				}
	        				}
	        				index++;
		        		});
		        		index = passwordList.length;
					    if(easyPwdCheckInfo != ""){    
					    	//messagebox的confirm不能阻塞程序，因此暂用window的confirm
					        if(!!confirm("如下业务号码的密码过于简单,是否修改?\n"+easyPwdCheckInfo.substring(0,easyPwdCheckInfo.length-1))){
					        	if(!!mainProdOfferPane &&mainProdOfferPane.open == false){
					        			mainProdOfferPane.toggle();
				        		}
				        		if(!!mainSerNode){
			       					var isHidden = /hidden\-elem/.test(mainSerNode.className);	
			       					if(!!isHidden){
				        				dojo.toggleClass(mainSerNode, "hidden-elem");
			       					}
				        		}
								var groupId = passwordDom.getAttribute("groupId")||passwordDom.groupId;
								if (!!cardInst && groupId && groupId != "0") {
									if (cardInst.getTabPanel()){
										cardInst.getTabPanel().active(groupId);
									}
								}
				        		if(!!passwordDom){
				        			passwordDom.focus();
				        		}
				        		ifConfirm = false; 
				        	}
					    }
	        		}
	        		return ifConfirm;
	        	},	
	        	/**
	        	 * 检测当前实例数据是否是主副卡套餐销售品
	        	 */
	        	doCheckIfMainAuxiliaryCard : function(){
//	        		//获取当前主销售品实例
	        		var mainProdOfferInstVO = $ac$.mainProdOfferInstVO;
	        		//获取销售品关系
	        		var offerInstRelaList = mainProdOfferInstVO.offerInstRelaList;
	        		if(dojo.some(offerInstRelaList||[],function(offerInstRela){return offerInstRela.roleCd == util.MainAuxiliaryCardRoleCDS.MainCardRoleCd;})
	        		&&dojo.some(offerInstRelaList||[],function(offerInstRela){return offerInstRela.roleCd == util.MainAuxiliaryCardRoleCDS.AuxiliaryCardRoleCd;})){
	        			return true;
	        		}
	        		return false;
	        	},
	        	/**
	        	 * 检测页面上拥有同一个产品id的产品属性填写的是否一致(以接入类为单位进行检测)
	        	 * 营销资源类产品不进行检测
	        	 */
	        	doCheckSameProdOfAttr : function(mainServiceProdList,_allSubRegionServiceProdMap_){
	        		//为了防止重复检测，该对象保存产品id
	        		var prodIdList = [];
	        		//可选包中功能产品集合，按照接入类进行划分
	        		var allSubRegionServiceProdMap = _allSubRegionServiceProdMap_;
	        		//1.先检测基础包下的功能产品的属性与可选包销售品的产品属性是否一致
	        		for(var key in mainServiceProdList){
	        			if(!mainServiceProdList.hasOwnProperty(key)){continue;}
	        			var serviceProdInfo = mainServiceProdList[key];
	        			//没有选中的不处理
	        			if(!serviceProdInfo.prodBasicInfo.checkedStatus){continue;}
	        			//没有产品属性的不处理
	        			if(serviceProdInfo.prodAttrInfo==null){continue;}
	        			//针对于营销资源类销售品以及全球眼不进行检测
	        			if(this.doCheckSubOfferInitMore(serviceProdInfo.prodBasicInfo.productId)){continue;}
	        			//一个接入类只会有一个uniqueId
	        			var uniqueId = serviceProdInfo.uniqueId;
	        			var subRegionSameServiceId=allSubRegionServiceProdMap[uniqueId];
	        			if(!subRegionSameServiceId||subRegionSameServiceId.length==0){
	        				continue;
	        			}
	        			prodIdList.push(serviceProdInfo.prodBasicInfo.productId);
						//查找含有同一个产品id的属性集合(因为基础包下的功能产品不会有重复的，所以拿基础包下的功能产品与可选包进行对比)
						if(!this.doGetServiceProdAttrObjSameProdId(subRegionSameServiceId,serviceProdInfo)){
							return false;
						}
	        		}
	        		
	        		//2.再检测可选包中的功能产品的产品属性是否一致
	        		for(var p in allSubRegionServiceProdMap){
	        			var relaProdOfferList = allSubRegionServiceProdMap[p];
	        			for(var q=0;q<relaProdOfferList.length;q++){
	        				var relaProdOfferInfo = relaProdOfferList[q];
	        				if(dojo.some(prodIdList||[],function(prodId){return prodId == relaProdOfferInfo.prodBasicInfo.productId})){
	        					continue;
	        				}
	        				//针对于营销资源类销售品以及全球眼不进行检测
	        				if(this.doCheckSubOfferInitMore(relaProdOfferInfo.prodBasicInfo.productId)){continue;}
	        				if(!this.doGetServiceProdAttrObjSameProdId(relaProdOfferList,relaProdOfferInfo)){
								return false;
							}
	        			}
	        		}
	        		return true;
	        	},
	        	/**
	        	 * 获取同一个产品id下的产品属性集合值
	        	 */
	        	doGetServiceProdAttrObjSameProdId : function(subRegionServiceProdList,serviceProdInfo){
	        		var relaProdInfoList= [];
	        		dojo.forEach(subRegionServiceProdList||[], function(relaProdPageInfo){
	        			if(relaProdPageInfo.prodBasicInfo.productId == serviceProdInfo.prodBasicInfo.productId){
				        	relaProdInfoList.push(relaProdPageInfo);
				        }
	        		});
	        		if(relaProdInfoList.length == 0){
	        			return true;
	        		}
	        		//该对象中的数据结构是个二维数组。
	        		var attrMap={};
	        		for(var p in serviceProdInfo.prodAttrInfo){
	        			attrMap[p] = [serviceProdInfo.prodAttrInfo[p]];
	        			dojo.forEach(relaProdInfoList||[], function(relaProdInfo){
	        				attrMap[p].push(relaProdInfo.prodAttrInfo[p]);
	        			});
	        			//如果含有两个则代表属性值不相同
	        			if(attrMap[p].uniq().length>1){
	        				var attrInfo = util.ServiceFactory.getService("url:prodOfferSaleAjaxAction.do?method=getProdAttrInfo&attrCd="+ p);
	        				//$ac$.set("_allSubRegionServiceProdMap_",{});
	        				//alert("产品属性["+attrInfo.attrName+"]对应的属性值不一致，请重新填写");
	        				var tempTip = "";
	        				if(!!serviceProdInfo.productInfoVO){
	        					tempTip = "功能产品["+serviceProdInfo.productInfoVO.productName+"]下的";
	        				}
	        				var tipStr = tempTip+"产品属性["+attrInfo.attrName+"]对应的属性值不一致，请重新填写";
	        				//messageBox.alert({ 
								//title :"\u63d0\u793a\u4fe1\u606f",
								//message : tipStr
							//});
							
							 messageBox.alert({
		                        busiCode : "08410207",
		                        infoList : [tipStr]
	                        });  
	        				return false;
	        			}
	        		}
	        		return true;
	        	},
	        	/**
	        	 * 根据可选包下的功能产品判断一个可选包是否可以实例化多份
	        	 */
	        	doCheckSubOfferInitMore : function(productId){
	        		var param = "&productId=" + productId;
			        var ifCanInitMore = util.ServiceFactory
			                .getService("url:prodOfferSaleAjaxAction.do?method=ifCanInitMore" + param);
			        if (ifCanInitMore == 1) { 
			        	return true; 
			       	}
			       	return false;
	        	},
	        	/**
	        	 * 选择已有号码的检测
	        	 * 宽带标准化套餐
	        	 */
	        	doCheckIfCanChange : function(currentMainProdOffer,chooseProdOfferInstId,uniqueId){
	        		var memberProdOfferInfo = null
	        		//根据旧的销售品实例id获取该销售品的协议信息，如果协议为空，则不处理
	        		var offerStandardList = BusCard.$remote('prodInstCommFacadeBO').getValidOfferStandardInstInfo({prodOfferInstId:chooseProdOfferInstId});
	        		if(offerStandardList.length == 0){return true;}
	        		// bindType为2或者是1，说明是组合销售品,获取成员销售品信息
			        if (currentMainProdOffer.bindType == 2 || currentMainProdOffer.bindType == 1) {
						memberProdOfferInfo = BusCard.find($ac$["prodOfferList"+uniqueId]||[],function(prodOfferInfo){
							return prodOfferInfo.prodOfferType == 1;
						});
					}else{
						memberProdOfferInfo = currentMainProdOffer;
					}
			        var offerAgreementVOList = memberProdOfferInfo.offerAgreementVO;
			        if (offerAgreementVOList != null && offerAgreementVOList.length > 0) {
				        for (var p = 0; p < offerAgreementVOList.length; p++) {
					        var offerAgreementVO = offerAgreementVOList[p];
					        //和产品接口约定，如果协议模板id为2，则为协议销售品
					        if(offerAgreementVO.templetId == '2'||offerAgreementVO.templetId == 2){
					        	return true;
					        }
				        }
			        }
			        //alert("不能做此变更");
			        var tips = "不能由宽带标准化套餐变更为普通周价销售品";
			        messageBox.alert({
					                busiCode : "08410147",
					                infoList : [tips]
				                });
			        return false;
	        	},
	        	
	        	
	        	/**
	        	 * 非协议销售品不进行检测
	        	 */
	        	doCheckProductRestFee : function(currentMainProdOffer,chooseProdOfferInstId,uniqueId,userId,serviceId){
	        		//根据旧的销售品实例id获取该销售品的协议信息，如果协议为空，则不处理
	        		var offerStandardInstList = BusCard.$remote('prodInstCommFacadeBO').getValidOfferStandardInstInfo({prodOfferInstId:chooseProdOfferInstId});
	        		if(offerStandardInstList.length == 0){return true;}
	        		//判断是否进行检测
	        		var cityCode = dojo.global.$appContext$.requestParam.customerData.cityCode;
				    var param = "&cityCode=" + cityCode;
	        		var switch8093 = util.ServiceFactory.getService("url:prodOfferSaleAjaxAction.do?method=getSwitch8093" + param);
	        		if(!!switch8093&&(switch8093 == 0||switch8093 =="0")){
	        			return true;
	        		}
					//结束时间
			        var endDate = null;
			        //旧的业务号码对应的余额信息
			        var restFee = null;
			        //新的销售品的包周期费用
			        var newRestFee = null;
			        //成员销售品信息
			        var memberProdOfferInfo = null;
			        //协议销售品实例存在才处理
			        if (offerStandardInstList && offerStandardInstList.length > 0) {
			        	 var endDateList = dojo.map(offerStandardInstList, function(offerStandardInstInfo) {
					                return offerStandardInstInfo.expDate;
				                });
				        endDate = endDateList.max();
				        var targetDateObj = util.ProdOfferHelper.getAgreementOfferDateObj(endDate);
				        var newBeginDate = targetDateObj.beginDate;
				        //针对时间处理
				        var dateArr = newBeginDate.split(" ");
						var dateYMD = dateArr[0].split("-");
						var year = parseInt(dateYMD[0], 10);
						var month = parseInt(dateYMD[1], 10);
						var day = parseInt(dateYMD[2], 10);
						var newBeginDate = year+month+day;
				        var cityCode = dojo.global.$appContext$.requestParam.customerData.cityCode;
				        var param = "&cityCode=" + cityCode+"&userId="+userId+"&newBeginDate="+newBeginDate;
				        restFee = util.ServiceFactory
				                .getService("url:prodOfferSaleAjaxAction.do?method=checkAgreementFee" + param);
			        }else{
			        	return true;
			        }
			        if (currentMainProdOffer.bindType == 2 || currentMainProdOffer.bindType == 1) {
						memberProdOfferInfo = BusCard.find($ac$["prodOfferList"+uniqueId]||[],function(prodOfferInfo){
							return prodOfferInfo.prodOfferType == 1;
						});
						newRestFee = util.ProdOfferHelper.getOfferStandardFee(memberProdOfferInfo);
					}else{
						memberProdOfferInfo = currentMainProdOffer
						newRestFee = util.ProdOfferHelper.getOfferStandardFee(currentMainProdOffer);
					}
					//非协议销售品不作此处理
					if(!util.ProdOfferHelper.ifAgreementpRrodOffer(memberProdOfferInfo,1)){
						return true;
					}
			        if(newRestFee>restFee){
			        	//给出提示，允许继续受理
			        	var tips = "业务号码["+serviceId+"]的账户余额("+restFee+")小于销售品的["+memberProdOfferInfo.prodOfferName+"]包周期费用("+newRestFee+"),请到账务页面缴费后再进行办理！";
				        messageBox.alert({
						                busiCode : "08410147",
						                infoList : [tips]
					                });
			        	return true;
			        }
	        		return true;
	        	},
	        	
	        	/**
	        	 * 点击下一步时进行检测
	        	 */
	        	doCheckOfferStandardForChgNextStep : function(){
        			//提示信息串
	        		var tipstr = null;
	        			checkInstance = this;
	        		//获取到所有的成员信息
	        		var selectedMemberProdOfferList = $ac$.get("selectedMemberProdOfferList");
	        		//过滤出有销售品实例的，说明是变更
	        		var targetMemberOfferList = dojo.filter(selectedMemberProdOfferList||[],function(selectedMemberProdOfferInfo){
	        			return !!selectedMemberProdOfferInfo.offerInstVO
	        			&&selectedMemberProdOfferInfo.offerInstVO.offerStandardInstList
	        			&&selectedMemberProdOfferInfo.offerInstVO.offerStandardInstList.length>0
	        			&&selectedMemberProdOfferInfo.offerInstVO.prodOfferId != selectedMemberProdOfferInfo.prodOfferId;
	        		});
					if(targetMemberOfferList.length>0){
						//判断是否进行检测
		        		var cityCode = dojo.global.$appContext$.requestParam.customerData.cityCode;
					    var param = "&cityCode=" + cityCode;
		        		var switch8093 = util.ServiceFactory.getService("url:prodOfferSaleAjaxAction.do?method=getSwitch8093" + param);
		        		if(!!switch8093&&(switch8093 == 1||switch8093 =="1")){
							var tipstr=dojo.filter(dojo.map(targetMemberOfferList||[],function(info){
								return checkInstance.getOfferStandardTipStr(info);
							})||[],function(data){
								return data!="";
							});
							if(tipstr.length>0){
								messageBox.alert({
								                busiCode : "08410147",
								                infoList : [tipstr.join(",")+",请到账务页面缴费后再进行办理！"]
							                });
							}
				        	return true;
						}
						return true;
					}	
	        		return true;
	        	},
	        	
	        	/**
	        	 * 获取协议销售品的提示信息
	        	 */
	        	getOfferStandardTipStr : function(info){
	        		try{
		        		var oldRestFee = null;
		        		var newAgreementFee = null;
		        		var memberProdOfferInfo = null;
		        		//获取实例中的销售品协议实例信息
		        		var offerStandardInstList = info.offerInstVO.offerStandardInstList;
		        		//获取旧的产品的协议余额信息
		        		if (offerStandardInstList && offerStandardInstList.length > 0) {
				        	 var endDateList = dojo.map(offerStandardInstList, function(offerStandardInstInfo) {
						                return offerStandardInstInfo.expDate;
					                });
					        var targetDateObj = util.ProdOfferHelper.getAgreementOfferDateObj(endDateList.max());
					        var newBeginDate = targetDateObj.beginDate;
					        //针对时间处理
					        var dateArr = newBeginDate.split(" ");
							var dateYMD = dateArr[0].split("-");
							var year = parseInt(dateYMD[0], 10);
							var month = parseInt(dateYMD[1], 10);
							var day = parseInt(dateYMD[2], 10);
							var newBeginDate = year+month+day;
					        var cityCode = dojo.global.$appContext$.requestParam.customerData.cityCode;
					        var param = "&cityCode=" + cityCode+"&userId="+info.prodInstVO.prodInstId+"&newBeginDate="+newBeginDate;
					        oldRestFee = util.ServiceFactory
					                .getService("url:prodOfferSaleAjaxAction.do?method=checkAgreementFee" + param);
				        }
				        if ($ac$.selectedMainProdOfferInfoVO.bindType == 2 || $ac$.selectedMainProdOfferInfoVO.bindType == 1) {
							memberProdOfferInfo = util.ProdOfferHelper.getProdOfferDetail(info.prodOfferId);	
						}else{
							memberProdOfferInfo = $ac$.selectedMainProdOfferInfoVO;
						}
						//非协议销售品不作此处理
						if(!util.ProdOfferHelper.ifAgreementpRrodOffer(memberProdOfferInfo,1)){
							return "";
						}
						newAgreementFee = util.ProdOfferHelper.getOfferStandardFee(memberProdOfferInfo);
						//如果旧的协议销售品余额小于新的包周期费用，则给出提示
						if(oldRestFee<newAgreementFee){
							return "业务号码["+info.prodInstVO.accNbr+"]的账户余额("+oldRestFee+")小于销售品的["+memberProdOfferInfo.prodOfferName+"]包周期费用("+newAgreementFee+")";
						}
					}catch(e){
						
					}
					return "";
	        	},
	        	
	        	/**
	        	 * 检测是否可以订购国际漫游产品
	        	 */
	        	doChekIfCanOrderRoamProd : function(custOrderAcceptInfoVO){
	        		//暂时先注释掉
	        		var roamServiceProdList = [];
	        		dojo.forEach(custOrderAcceptInfoVO.orderAcceptInfoList || [], function(orderInfoVO) {
					                dojo.forEach(orderInfoVO.prodOfferAcceptInfoList || [], function(
					                                prodOfferAcceptInfo) {
						                        dojo.forEach(prodOfferAcceptInfo.serviceProdAcceptInfoList || [],
						                                function(serviceProdAcceptInfo) {
					                                	if(serviceProdAcceptInfo.operKind ==1 &&(serviceProdAcceptInfo.productId == ConstantsPool.load("RoamProdIdConst").RoamProdIdConst.ROAM_PRODUCT_ID_A||
					                                	serviceProdAcceptInfo.productId == ConstantsPool.load("RoamProdIdConst").RoamProdIdConst.ROAM_PRODUCT_ID_B||
					                                	serviceProdAcceptInfo.productId == ConstantsPool.load("RoamProdIdConst").RoamProdIdConst.ROAM_PRODUCT_ID_C||
					                                	serviceProdAcceptInfo.productId == ConstantsPool.load("RoamProdIdConst").RoamProdIdConst.ROAM_PRODUCT_ID_D)){
					                                		roamServiceProdList.push(serviceProdAcceptInfo);
						                                	}
						                                });
					                        });
				                });
				    if(roamServiceProdList.length >0){
				    	//调用检测接口(检测国际漫游)
				    	var submitResult = BusCard.doPost(BusCard.path.contextPath
					                        + "/orderDetailAction.do?method=doChekIfCanOrderRoamProd",
					                custOrderAcceptInfoVO);
	        			if (submitResult && submitResult.flag == -1) {
	        				//alert(submitResult.message);return false;
	        				messageBox.alert({
					                busiCode : "08410147",
					                infoList : [submitResult.message]
				                });
				            return false;
	        			}else{
	        				return true;
	        			}	
				    }
	        		return true;
	        	},
	        	
	        	/**
	        	 * 保存订单提交检测
	        	 */
	        	checkOrderedOfferProdRelationByPPM : function(mainProdOfferCPResult,subProdOfferCPresult){
	        		//主套餐信息
	        		var mainProdOfferAcceptInfoVO = mainProdOfferCPResult.prodOfferAcceptInfoVO;
	        		//成员销售品以及可选包数据
	        		var prodOfferAcceptInfoList = subProdOfferCPresult.prodOfferAcceptInfoList || [];
	        		//销售品集合
	        		var prodOfferIdList = [];
	        		//产品集合
	        		var productIdList = [];
	        		//提供给PPM的集合为了检测用
	        		var subProdOfferMap = {};
	        		//自主板的接入类产品串
	        		var independenceAccessProdIdStr = "";
	        		//重置销售品的选择次数
	        		util.ProdOfferOrderCounter.reset();
	        		//将可选包的销售品id放入集合
	        		dojo.forEach(prodOfferAcceptInfoList,function(prodOfferAcceptInfo){
	        			//产品信息串
	        			var productIdStr = "";
	        			//针对退订的不进行处理
	        			if(prodOfferAcceptInfo.operKind != 3){
	        				//拼销售品id串
	        				prodOfferIdList.push(parseInt("" + prodOfferAcceptInfo.prodOfferId));
	        			}
	        			//取出此份数据的接入类产品信息
	        			dojo.forEach(prodOfferAcceptInfo.accessProdAcceptInfoList||[], function(accessProdAcceptInfoVO){
	        				if(accessProdAcceptInfoVO.operKind != 3){
								productIdList.push(parseInt("" + accessProdAcceptInfoVO.productId));
								if(productIdStr == ""){
									productIdStr += accessProdAcceptInfoVO.productId;
								}else{
									productIdStr += ","+accessProdAcceptInfoVO.productId;
								}
								//针对销售品是成员套餐才进行此操作
								if(prodOfferAcceptInfo.prodOfferType ==1){
									if(independenceAccessProdIdStr == ""){
										independenceAccessProdIdStr += accessProdAcceptInfoVO.productId;
									}else{
										independenceAccessProdIdStr += ","+accessProdAcceptInfoVO.productId;
									}
								}
	        				}
						});
						//取出此份数据的功能类产品信息
						dojo.forEach(prodOfferAcceptInfo.serviceProdAcceptInfoList||[], function(serviceProdAcceptInfoVO){
							if(serviceProdAcceptInfoVO.operKind != 3){
								productIdList.push(parseInt("" + serviceProdAcceptInfoVO.productId));
								if(productIdStr == ""){
									productIdStr += serviceProdAcceptInfoVO.productId;
								}else{
									productIdStr += ","+serviceProdAcceptInfoVO.productId;
								}
							}
						});
						//如果是成员销售品，并且不是退订
//						if(prodOfferAcceptInfo.prodOfferType ==1&&prodOfferAcceptInfo.operKind != 3){
//							subProdOfferMap[prodOfferAcceptInfo.prodOfferId] = productIdStr;
//						}
	        		});
	        		var productIdStr = "";
	        		//将主销售品的销售品id放入集合
	        		prodOfferIdList.push(parseInt("" +mainProdOfferAcceptInfoVO.prodOfferId));
	        		//拼主套餐下的接入类产品信息
	        		dojo.forEach(mainProdOfferAcceptInfoVO.accessProdAcceptInfoList||[], function(accessProdAcceptInfoVO){
	        			if(accessProdAcceptInfoVO.operKind != 3){
							productIdList.push(parseInt("" + accessProdAcceptInfoVO.productId));
							if(productIdStr == ""){
								productIdStr += accessProdAcceptInfoVO.productId;
							}else{
								productIdStr += ","+accessProdAcceptInfoVO.productId;
							}
	        			}
					});
					//拼主套餐下的功能类产品信息
					dojo.forEach(mainProdOfferAcceptInfoVO.serviceProdAcceptInfoList||[], function(serviceProdAcceptInfoVO){
						if(serviceProdAcceptInfoVO.operKind != 3){
							productIdList.push(parseInt("" + serviceProdAcceptInfoVO.productId));
							if(productIdStr == ""){
								productIdStr += serviceProdAcceptInfoVO.productId;
							}else{
								productIdStr += ","+serviceProdAcceptInfoVO.productId;
							}
						}
					});
					if(mainProdOfferAcceptInfoVO.bindType == 2){
			        	subProdOfferMap[mainProdOfferAcceptInfoVO.prodOfferId] = independenceAccessProdIdStr;
					}else{
						subProdOfferMap[mainProdOfferAcceptInfoVO.prodOfferId] = productIdStr;
					}
					//应PPM要求，增加检测参数,为了不改变原来的逻辑，新写循环进行取值
					if(mainProdOfferAcceptInfoVO.bindType == 2){
						dojo.forEach(prodOfferAcceptInfoList,function(prodOfferAcceptInfo){
							//根据关系查找成员销售品
							if(prodOfferAcceptInfo.parentProdOfferInstId == mainProdOfferAcceptInfoVO.prodOfferInstId && prodOfferAcceptInfo.operKind!=3){
								var prodOfferOrderCount = util.ProdOfferOrderCounter.get(prodOfferAcceptInfo.prodOfferId);
								//prodOfferAcceptInfo.prodOfferId+"_"+prodOfferOrderCount+"_"+"product"
								var prodOfferIdStr = "";
								var prodIdStr = "";
//								/成员销售品下的产品集合
								var memberProdIdsStr ="";
								//拼成员销售品下的产品数据
								dojo.forEach(prodOfferAcceptInfo.accessProdAcceptInfoList||[], function(accessProdAcceptInfoVO){
					    			if(accessProdAcceptInfoVO.operKind != 3){
										if(prodIdStr == ""){
											prodIdStr += accessProdAcceptInfoVO.productId;
										}else{
											prodIdStr += ","+accessProdAcceptInfoVO.productId;
										}
										if(memberProdIdsStr == ""){
											memberProdIdsStr += accessProdAcceptInfoVO.productId;
										}else{
											memberProdIdsStr += ","+accessProdAcceptInfoVO.productId;
										}
					    			}
								});
								dojo.forEach(prodOfferAcceptInfo.serviceProdAcceptInfoList||[], function(serviceProdAcceptInfoVO){
									if(serviceProdAcceptInfoVO.operKind != 3){
										if(prodIdStr == ""){
											prodIdStr += serviceProdAcceptInfoVO.productId;
										}else{
											prodIdStr += ","+serviceProdAcceptInfoVO.productId;
										}
										if(memberProdIdsStr == ""){
											memberProdIdsStr += serviceProdAcceptInfoVO.productId;
										}else{
											memberProdIdsStr += ","+serviceProdAcceptInfoVO.productId;
										}
									}
								});
								//拼销售品串
								dojo.forEach(prodOfferAcceptInfoList,function(_temp_){
									if(_temp_.parentProdOfferInstId == prodOfferAcceptInfo.prodOfferInstId && _temp_.operKind!=3){
										if(prodOfferIdStr == ""){
											prodOfferIdStr += _temp_.prodOfferId;
										}else{
											prodOfferIdStr += ","+_temp_.prodOfferId;
										}
										//拼产品串
										dojo.forEach(_temp_.accessProdAcceptInfoList||[], function(accessProdAcceptInfoVO){
							    			if(accessProdAcceptInfoVO.operKind != 3){
												if(prodIdStr == ""){
													prodIdStr += accessProdAcceptInfoVO.productId;
												}else{
													prodIdStr += ","+accessProdAcceptInfoVO.productId;
												}
							    			}
										});
										dojo.forEach(_temp_.serviceProdAcceptInfoList||[], function(serviceProdAcceptInfoVO){
											if(serviceProdAcceptInfoVO.operKind != 3){
												if(prodIdStr == ""){
													prodIdStr += serviceProdAcceptInfoVO.productId;
												}else{
													prodIdStr += ","+serviceProdAcceptInfoVO.productId;
												}
											}
										});
									}
									
								});
								subProdOfferMap[prodOfferAcceptInfo.prodOfferId+"_"+prodOfferOrderCount+"_"+"offer"] = prodOfferIdStr;
								subProdOfferMap[prodOfferAcceptInfo.prodOfferId+"_"+prodOfferOrderCount+"_"+"product"] = prodIdStr;
								subProdOfferMap[prodOfferAcceptInfo.prodOfferId+"_"+prodOfferOrderCount] = memberProdIdsStr;
								if(prodOfferAcceptInfo.uniqueId!=null&&prodOfferAcceptInfo.uniqueId!=""){
									subProdOfferMap[prodOfferAcceptInfo.uniqueId] = prodOfferAcceptInfo.prodOfferId+"_"+prodOfferOrderCount+"_"+"offer";
								}
							}
						});
					}else{
						//针对非e9自主版
						//销售品串
						var noIndependenceOfferStr = "";
						//产品串
						var noIndependenceProdStr = "";
						dojo.forEach(prodOfferAcceptInfoList,function(prodOfferAcceptInfo){
		        			if(prodOfferAcceptInfo.operKind != 3){
		        				if(noIndependenceOfferStr == ""){
									noIndependenceOfferStr += prodOfferAcceptInfo.prodOfferId;
								}else{
									noIndependenceOfferStr += ","+prodOfferAcceptInfo.prodOfferId;
								}
		        			}
		        			dojo.forEach(prodOfferAcceptInfo.accessProdAcceptInfoList||[], function(accessProdAcceptInfoVO){
				    			if(accessProdAcceptInfoVO.operKind != 3){
									if(noIndependenceProdStr == ""){
										noIndependenceProdStr += accessProdAcceptInfoVO.productId;
									}else{
										noIndependenceProdStr += ","+accessProdAcceptInfoVO.productId;
									}
				    			}
							});
							dojo.forEach(prodOfferAcceptInfo.serviceProdAcceptInfoList||[], function(serviceProdAcceptInfoVO){
								if(serviceProdAcceptInfoVO.operKind != 3){
									if(noIndependenceProdStr == ""){
										noIndependenceProdStr += serviceProdAcceptInfoVO.productId;
									}else{
										noIndependenceProdStr += ","+serviceProdAcceptInfoVO.productId;
									}
								}
							});
		        			
						});
						dojo.forEach(mainProdOfferAcceptInfoVO.accessProdAcceptInfoList||[], function(accessProdAcceptInfoVO){
			    			if(accessProdAcceptInfoVO.operKind != 3){
								if(noIndependenceProdStr == ""){
									noIndependenceProdStr += accessProdAcceptInfoVO.productId;
								}else{
									noIndependenceProdStr += ","+accessProdAcceptInfoVO.productId;
								}
			    			}
						});
						dojo.forEach(mainProdOfferAcceptInfoVO.serviceProdAcceptInfoList||[], function(serviceProdAcceptInfoVO){
							if(serviceProdAcceptInfoVO.operKind != 3){
								if(noIndependenceProdStr == ""){
									noIndependenceProdStr += serviceProdAcceptInfoVO.productId;
								}else{
									noIndependenceProdStr += ","+serviceProdAcceptInfoVO.productId;
								}
							}
						});
						subProdOfferMap[mainProdOfferAcceptInfoVO.prodOfferId+"_"+1+"_"+"offer"]=noIndependenceOfferStr;
						subProdOfferMap[mainProdOfferAcceptInfoVO.prodOfferId+"_"+1+"_"+"product"]=noIndependenceProdStr;
					}
			        var belongCode = -1;
			        try {
				        belongCode = parseInt("" + this.controller.getBelongCode());
				        belongCode = belongCode ||-1;
				        
			        }
			        catch (e) {

			        }
			        var checkInstance = this;
			        var promptVO = util.ServiceFactory.getService(
			                "url:orderDetailAction.do?method=checkOrderedOfferProdRelation", null, {
				                method : 'post',
				                content : {
				                	commonRegionId:belongCode,
					                interfaceType : 2,
					                prodOfferId : mainProdOfferAcceptInfoVO.prodOfferId,
					                offerList : prodOfferIdList,
					                productList : productIdList,
					                otherParamMap : subProdOfferMap
				                }
				                
			                }

			        );
			        if (promptVO && promptVO.result == '1') {
			        	if(promptVO.roleDefaultOfferIds==""||promptVO.roleDefaultOfferIds==null){
					        messageBox.alert({
						                busiCode : "08410147",
						                infoList : [promptVO.message]
					                });
					        return false;
			        	}else{
			        		MessageBox.confirm({
								title : "\u9009\u62e9\u6846",
								message : promptVO.message,
								onComplete : function(promptVO) {
									return function(value) {
										checkInstance.orderCheckResult(promptVO);
									}
								}(promptVO),
								iconCloseComplete : true
							}, dojo.byId("subProdOfferCart"));
							return false;
			        	}
			        } else {
				        return true;
			        }
	        	},
	        	
	        	/**
	        	 * 针对预约取消的升速可选包，不允许变更速率
	        	 */
	        	checkIfReserveCancelSpeedOffer : function(mainProdOfferCPResult, subProdOfferCPresult,subProdOfferCartPageData){
	        		//过滤出所有可选包销售品中的退订升速可选包
	        		var speedOfferList = [];
	        		dojo.forEach(subProdOfferCartPageData||[],function(data){
	        			speedOfferList = speedOfferList.concat(dojo.filter(data.subProdOfferPageData||[],function(_data_){
	        				return _data_.prodOfferInst!=null&&util.ProdOfferHelper.getRaiseSpeedObj(_data_.subProdOfferInfo)!=null&&!_data_.prodOfferPageInfo.checkBoxValue;
	        			}));
	        		});
	        		//没有升速可选包，则直接返回
	        		if(speedOfferList.length==0){
	        			return true;
	        		}
	        		//获取所有销售品信息
	        		var prodOfferAcceptInfoList = [];
	        		var _flag_ = true;
	        		var tips = null;
	        		//主销售品信息
	        		prodOfferAcceptInfoList.push(mainProdOfferCPResult.prodOfferAcceptInfoVO);
	        		//可选包区域的销售品信息
	        		prodOfferAcceptInfoList = prodOfferAcceptInfoList.concat(subProdOfferCPresult.prodOfferAcceptInfoList || []);
	        		//针对所有的销售品信息进行循环
	        		if(prodOfferAcceptInfoList.length==0){
	        			return true;
	        		}
	        		for(var p=0;p<prodOfferAcceptInfoList.length;p++){
	        			var prodOfferAcceptInfo = prodOfferAcceptInfoList[p];
	        			//循环主销售品，并且主销售品下有接入类产品的集合
	        			if (prodOfferAcceptInfo.prodOfferType == 1
					                && prodOfferAcceptInfo.accessProdAcceptInfoList != null
					                && prodOfferAcceptInfo.accessProdAcceptInfoList.length > 0) {
					            //循环销售品下的接入类信息
						        BusCard.each(prodOfferAcceptInfo.accessProdAcceptInfoList || [], function(
						                accessProdAcceptInfo) {
						        	// 判断是否有宽带属性，如果没有则不处理
							        var targetProdAttrList = dojo.filter(accessProdAcceptInfo.prodInstAttrList || [],
							                function(prodInstAttrInfo) {
								                //return prodInstAttrInfo.attrId == util.SpecAttrCdConst.portSpeedAttrCd;
							                	return dojo.some(util.SpeedAttrArray||[],function(_attrCd){
											        	return _attrCd == prodInstAttrInfo.attrId+"";
											    });
							                });
							        //如果没有端口速率属性则不处理
							        if (targetProdAttrList.length == 0) { return; }
							        //取出升速可选包的销售品数据s
							        var targetProdOfferList = dojo.filter(prodOfferAcceptInfoList || [], function(
						                        subProdOffer) {
							                return subProdOffer.parentProdOfferInstId == prodOfferAcceptInfo.prodOfferInstId
							                        && dojo.some(speedOfferList||[],function(_temp){
							                        	return _temp.subProdOfferInfo.prodOfferId == subProdOffer.prodOfferId;
							                        })&&subProdOffer.operKind == 3;
					                });
					                //升速可选包退订
					                if(targetProdOfferList&&targetProdOfferList.length>0){
					                	var speedSubOfferInfo = targetProdOfferList[0];
					                	//获取页面当前速率值
					                	var attrValue = targetProdAttrList[0].attrValue;
					                	//获取销售品实例
					                	var prodOfferInstId = speedSubOfferInfo.prodOfferInstId;
					                	//判断销售品是否是预约退订
					                	if(util.DateHelper.compareDateValue(util.DateHelper.format(speedSubOfferInfo.expDate),$ac$.requestParam.today)){
					                		//判断退订升速可选包的旧值和页面值是否一致，不一致则直接返回
					                		var userId= accessProdAcceptInfo.userId;
					                		var uniqueId = null;
					                		//根据userId来获取uniqueId
					                		var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
							        		var targetSelectMem = dojo.filter(selectedMemberProdOfferList||[],function(_data){
												return _data.prodInstId == userId;
											});
											if(targetSelectMem&&targetSelectMem.length>0){
												uniqueId = targetSelectMem[0].uniqueId;
											}
											if(dojo.global.$appContext$.get("dealObjectAttrList" + uniqueId)&&dojo.global.$appContext$.get("dealObjectAttrList" + uniqueId)[0]){
						                		if(dojo.global.$appContext$.get("dealObjectAttrList" + uniqueId)[0].oldAttrValue!=attrValue){
						                			_flag_ = false;
						                			var attrVO = BusCard.$remote('innerInterfaceBO').getAttrValueInfo({
						                				attrId : dojo.global.$appContext$.get("dealObjectAttrList" + uniqueId)[0].attrId,
						                				attrValue :dojo.global.$appContext$.get("dealObjectAttrList" + uniqueId)[0].oldAttrValue
						                			});
						                			//提示信息
						                			tips = "预约退订销售品["+speedSubOfferInfo.prodOfferName+"]不允许再次变更速率,请修改为升速前的值["+attrVO.attrValueName+"],再进行提交！"
						                			return false;
						                		}
					                		}
					                	}
					                	
					                	
					                }
					                
						        });
						        if(!_flag_){
						        	messageBox.alert({
							        	message:tips
							        });
						        	return false;
						        }       
                		}
	        		}
	        		return true;
	        	},
	        	/**
	        	 * 订购上检测结果中所需要的
	        	 * key是uniqueId
	        	 */
	        	orderCheckResult : function(promptVO){
	        		var checkInstance = this;
	        		var orderResultData = promptVO.roleDefaultOfferIds;
	        		orderResultData = dojo.fromJson(orderResultData);
	        		for(var key in orderResultData){
	        			if (!orderResultData.hasOwnProperty(key)) {
					        continue;
				        }
				        var prodOfferIdStr = orderResultData[key];
				        var prodOfferIdArray = prodOfferIdStr.split(",");
				        var _provider = null;
				        var tempMap = prodOfferAcceptLoader.multipleSubProdOfferHandler.subProdOfferOrderProviderMap;
				        if(key == 0 ||key == "0" ){
				        	_provider = tempMap["subProdOfferTreeContainer"];
				        }else{
				        	_provider = tempMap["subProdOfferTreeContainer"+key];
				        }
				        //获取当前可选包表格中的绑定数据
				        var bindingData = _provider.getSubGridBindingData(),
				        	subProdOfferOrderGridDom = _provider.subProdOfferOrderGrid.domNode;
				        var existSubCartProdOfferIds = [];
				        var notExistSUbCartProdOfferIds = [];
				       dojo.forEach(prodOfferIdArray||[], function(prodOfferId) {
				       			if(prodOfferId == ""){
				       				return ;
				       			}
                                var flag = dojo.some(bindingData, function(oneBindingData) {
                                                return prodOfferId == oneBindingData.subProdOfferInfo.prodOfferId;
                                        });
                                if (flag) {
                                      existSubCartProdOfferIds.push(prodOfferId);
                                }else{
                                	  notExistSUbCartProdOfferIds.push(prodOfferId);
                                }
                        });
                        //说明返回的都不在可选包购物车中，需要订购
				        if (existSubCartProdOfferIds.length == 0) {
				        	//订购展示销售品
					        dojo.forEach(existSubCartProdOfferIds,function(prodOfferId) {
					        	  var subProdOfferInfo = util.ProdOfferHelper.getProdOfferDetail(prodOfferId);
					        	  //拼接一行的绑定数据
					        	  var rowData = util.ProdOfferHelper.createProdOfferRowData(subProdOfferInfo);
					        	  var chooseNumberObjList = _provider.doGetChooseNumList(subProdOfferInfo);
					        	  if(chooseNumberObjList.chooseNumberList.length >0){
					        	  		//默认取第一个号码为使用号码
					        	  		rowData.showData.chooseNumberObj = chooseNumberObjList.chooseNumberList[0];
					        	  }else{
					        	  		//没有使用号码，则不生成使用号码
					        	  		rowData.showData.chooseNumberObj =null;
					        	  }
					        	  //向表格中添加一行
						          _provider.addOneRow(rowData);
						          //稍后修改
						          checkInstance.doCheckedSubProdOffer({
						               rowIndex : rowData.rowIndex,
						               subProdOfferCartDataProvider : _provider
					               });
			                });
					        // 当前销售品依赖的可选包销售品全在可选包购物车中
				        } else if (notExistSUbCartProdOfferIds.length == 0) {
					        var filterUncheckedSubCartData = dojo.filter(bindingData, function(oneBindData) {
						        return dojo.query(".subProdOfferDetail-" + oneBindData.rowIndex,
						                subProdOfferOrderGridDom)[0].childNodes[0].checked == false
						                && dojo.some(existSubCartProdOfferIds || [], function(prodOfferId) {
							                return prodOfferId == oneBindData.subProdOfferInfo.prodOfferId;
						                });
					        });
					        if (filterUncheckedSubCartData.length > 0) {
						        dojo.forEach(filterUncheckedSubCartData, function(data) {
					                dojo.query(".subProdOfferDetail-" + data.rowIndex,
					                        subProdOfferOrderGridDom)[0].childNodes[0].checked = true;
					                if (data.prodOfferInst != null) {
					                	_provider.updateCurrentProdOfferStyle(
					                data, "prod-offer-change");
					                } else {
					                	_provider.updateCurrentProdOfferStyle(
					                data, "prod-offer-add");
					                }
					                checkInstance.doCheckedSubProdOffer({
						                rowIndex : data.rowIndex,
						                subProdOfferCartDataProvider : _provider
					                });
				                });
					        }
					    // 当前销售品依赖的可选包销售品一部分在可选包购物车中，还有在可选包树上的部分
				        } else {
					        var filterUncheckedSubCartData = dojo.filter(bindingData, function(oneBindData) {
						        return dojo.query(".subProdOfferDetail-" + oneBindData.rowIndex,
						                subProdOfferOrderGridDom)[0].childNodes[0].checked == false
						                && dojo.some(existSubCartProdOfferIds || [], function(prodOfferId) {
							                return prodOfferId == oneBindData.subProdOfferInfo.prodOfferId;
						                });
					        });
					        if (filterUncheckedSubCartData.length > 0) {
						        dojo.forEach(filterUncheckedSubCartData, function(data) {
					                dojo.query(".subProdOfferDetail-" + data.rowIndex,
					                        subProdOfferOrderGridDom)[0].childNodes[0].checked = true;
					                if (data.prodOfferInst != null) {
						                _provider.updateCurrentProdOfferStyle(
					                data, "prod-offer-change");
					                } else {
					                	_provider.updateCurrentProdOfferStyle(
					                data, "prod-offer-add");
					                }
					                checkInstance.doCheckedSubProdOffer({
						                rowIndex : data.rowIndex,
						                subProdOfferCartDataProvider : _provider
					                });
				                });
					        }
					        dojo.forEach(notExistSubCartData||[],function(prodOfferId) {
					        	  var subProdOfferInfo = util.ProdOfferHelper.getProdOfferDetail(prodOfferId);
					        	  //拼接一行的绑定数据
					        	  var rowData = util.ProdOfferHelper.createProdOfferRowData(subProdOfferInfo);
								  var chooseNumberObjList = _provider.doGetChooseNumList(subProdOfferInfo);
					        	  if(chooseNumberObjList.chooseNumberList.length >0){
					        	  		//默认取第一个号码为使用号码
					        	  		rowData.showData.chooseNumberObj = chooseNumberObjList.chooseNumberList[0];
					        	  }else{
					        	  		//没有使用号码，则不生成使用号码
					        	  		rowData.showData.chooseNumberObj =null;
					        	  }
					        	  //向表格中添加一行
						          _provider.addOneRow(rowData);
						          checkInstance.doCheckedSubProdOffer({
						                rowIndex : rowData.rowIndex,
						                subProdOfferCartDataProvider : _provider
					                });
			                });
					        
				        }
	        		}
	        	},
	        	pilotageCheck : function(param){
	        		var selectedMemberProdOfferList = param.selectedMemberProdOfferList;
	        		var validPromptVO = BusCard.$remote("validOrderActionBO").orderGroupAccProdValidate({
	        			attrCd:"00002",
	        			cityCode:BusCard.$session.cityCode,
	        			custId:$ac$.requestParam.customerData.custId,
	        			infoValue:selectedMemberProdOfferList.length>0
	        						?selectedMemberProdOfferList[0].productId
	        						:-1
	        		})
	        		if(validPromptVO&&validPromptVO.code==-1){
	        			 messageBox.alert({
			                message:validPromptVO.message
		                });
		                return false;
	        		}
	        		return true;
	        	}
	        });
	        
        });