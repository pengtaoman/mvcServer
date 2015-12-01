/**
 * 收集数据后续处理
 * 
 * @module
 */
defineModule("orderaccept.prodofferaccept.data.SpecialDataHandler", ["../util", "../../common/js/ConstantsPool"],
        function(util, ConstantsPool) {
	        
	        dojo.declare("orderaccept.prodofferaccept.data.SpecialDataHandler", [], {
		        controller : null,
		        /**
				 * 数据处理方法集合,数组中的数据处理有先后顺序
				 */
		        dataHandleMethodMap : [],
		        constructor : function(controller) {
			        this.controller = controller;
			        this.beanBuildFactory = new util.BeanBuildFactoryProvider().getInstance();
		        },
		        
		        process : function(data) {
			        var handler = this;
			        var r;
			        ConstantsPool.load(["ActionCDConst"]);
			        this.preProcess();
			        try {
				        r = handler.handleData(data);
			        }
			        catch (e) {
				        BusCard.showErrorStack(e);
				        this.postProcess();
				        throw e;
			        }
			        
			        this.postProcess();
			        return r;
		        },
		        /**
				 * 清空处理数据的方法
				 */
		        postProcess : function() {
			        this.dataHandleMethodMap = [];
			        dojo.global.$appContext$.deleteProperty(this.controller.dataBuilder.USER_ID_KEY);
		        },
		        /**
				 * 循环调用处理数据的方法，处理销售品数据
				 */
		        handleData : function(data) {
			        var handler = this;
			        for (var p = 0; p < this.dataHandleMethodMap.length; p++) {
				        var func = this.dataHandleMethodMap[p];
				        if (dojo.isFunction(func)) {
					        dojo.hitch(handler, func, data)();
				        }
			        }
			        return data;
		        },
		        /**
				 * 根据不同的ACTIONCD装配不同的数据处理方法
				 */
		        preProcess : function() {
			        var handler = this;
			        this.dataHandleMethodMap.push(handler.rateAttrHandle);
			        this.dataHandleMethodMap.push(handler.groupUserHandle);
			        this.dataHandleMethodMap.push(handler.setUserTypeDate);
			        this.dataHandleMethodMap.push(handler.setPortSpeedDate);
			        this.dataHandleMethodMap.push(handler.getGrpAccessProdListForSubGrp);
			        this.dataHandleMethodMap.push(handler.dealOfferStandardEffDate);
			        this.dataHandleMethodMap.push(handler.dealVirtualNumRes);
			        //设置速率的生效时间
			        this.dataHandleMethodMap.push(handler.setRateEffectDate);
			        //设置接入方式的生效时间 100704属性废弃
			        //this.dataHandleMethodMap.push(handler.setAccessTypeDate);
			        //设置周价的生效时间
			        this.dataHandleMethodMap.push(handler.setCyclePriceAttrCdDate);
			        // 创建购物车数据
			        this.dataHandleMethodMap.push(handler.createShoppingCartData);
			        //过滤掉不写临时表的属性
			        this.dataHandleMethodMap.push(handler.filterAttrIfTemp);
		        },
		        
		        /**
				 * 构建服务器端对应的DealObjectVO
				 * 
				 * @method
				 */
		        buildDealObjectVO : function(dealObjectVO) {
			        // return
			        // this.controller.route("/beanBuildFactory/getDealObjectVO",
			        // dealObjectVO);
			        return this.beanBuildFactory.getDealObjectVO(dealObjectVO);
		        },
		        
		        /**
				 * 构建服务器端对应的DealObjectAttrVO
				 * 
				 * @method
				 */
		        buildDealObjectAttrVO : function(dealObjectAttrVO) {
			        // return
			        // this.controller.route("/beanBuildFactory/getDealObjectAttrVO",
			        // dealObjectAttrVO);
			        return this.beanBuildFactory.getDealObjectAttrVO(dealObjectAttrVO);
		        },
		        /**
				 * 构建资源产品关系s对象
				 */
		        buildProdResInstRelaVO : function(prodResInstRelaVO) {
			        // return
			        // this.controller.route("/beanBuildFactory/getDealObjectAttrVO",
			        // dealObjectAttrVO);
			        return this.beanBuildFactory.getProdResInstRelaVO(prodResInstRelaVO);
		        },
		        buildGroupUserInfoTmpVO : function(groupUserInfoTmpVO) {
			        return this.beanBuildFactory.getGroupUserInfoTmpVO(groupUserInfoTmpVO);
		        },
		        /**
				 * 创建购物车数据
				 */
		        buildShoppingCartAcceptVO : function(shoppingCartAcceptVO) {
			        return this.beanBuildFactory.getShoppingCartAcceptVO(shoppingCartAcceptVO);
		        },
		        
		        /**
		         * 过滤掉不写临时表的属性
		         */
		        filterAttrIfTemp : function(data){
		        	dojo.forEach(data.orderAcceptInfoList || [], function(orderAcceptInfoVO) {
				        dojo.forEach(orderAcceptInfoVO.prodOfferAcceptInfoList || [], function(prodOfferAcceptInfoVO) {
				        	//过滤销售品属性
				        	var offerInstAttrList = dojo.filter(prodOfferAcceptInfoVO.offerInstAttrList||[], function(offerInstAttrTempVO){
								return offerInstAttrTempVO.isTemp == 1;
							});
							prodOfferAcceptInfoVO.offerInstAttrList = offerInstAttrList;
							//过滤销售品下的接入类产品属性
							dojo.forEach(prodOfferAcceptInfoVO.accessProdAcceptInfoList||[], function(accessProdAcceptInfoVO){
								var prodInstAttrList = dojo.filter(accessProdAcceptInfoVO.prodInstAttrList||[], function(prodInstAttrTempVO){
									return prodInstAttrTempVO.isTemp == 1;
								});
								accessProdAcceptInfoVO.prodInstAttrList = prodInstAttrList;
							});
							//过滤销售品下的功能类产品属性
							dojo.forEach(prodOfferAcceptInfoVO.serviceProdAcceptInfoList||[], function(serviceProdAcceptInfoVO){
								var prodInstAttrList = dojo.filter(serviceProdAcceptInfoVO.prodInstAttrList||[], function(prodInstAttrTempVO){
										return prodInstAttrTempVO.isTemp == 1;
								});
								serviceProdAcceptInfoVO.prodInstAttrList = prodInstAttrList;
							});
				        });
			        });
		        },
		        
		        /**
				 * 针对升速的特殊处理
				 */
		        rateAttrHandle : function(data) {
			        var handler = this;
			        var rateMap = prodOfferAcceptLoader.rateAttrMap;
			        // 如果不存在则不处理
			        if (rateMap == "undefined" || rateMap == undefined) { return; }
			       
			        for (var p in rateMap) {
				        var uniqueId = p;
				        var rateAttrInfoList = rateMap[p];
				         // 过滤掉非新装的销售品
				        var tempRateAttrInfoList = dojo.filter(rateAttrInfoList || [], function(rateAttrInfo) {
					                return rateAttrInfo.operKind == 1;
				                });
				        // 拼升速相关对象
				        var dealObjectList = dojo.map(tempRateAttrInfoList || [], function(rateAttrInfo) {
					                var dealObjectVO = {};
					                var dealObjectAttrVO = {};
					                var dealObjectAttrList = [];
					                dojo.mixin(dealObjectVO, rateAttrInfo);
					                var acceptDealObjectVO = handler.buildDealObjectVO(dealObjectVO);
					                dojo.mixin(dealObjectAttrVO, rateAttrInfo);
					                var acceptDealObjectAttrVO = handler.buildDealObjectAttrVO(dealObjectAttrVO);
					                dealObjectAttrList.push(dealObjectAttrVO);
					                acceptDealObjectVO.dealObjectAttrList = dealObjectAttrList;
					                return acceptDealObjectVO;
				                });
				        var user_id_key = this.controller.dataBuilder.USER_ID_KEY;
				        var userId = dojo.global.$appContext$.get(user_id_key)["userId@uniqueId_" + uniqueId];
				        // 通过userId找到相应的接入类产品
				        var mainProdOfferVO = util.ProdOfferHelper.getMainProdOffer(dojo.global.$appContext$
				                .get("prodOfferList"))[0];
				        var prodOfferAcceptVO = dojo.filter(data.orderAcceptInfoList[0].prodOfferAcceptInfoList || [],
				                function(prodOfferAcceptInfo) {
					                
					                if (mainProdOfferVO.bindType == 2) {
						                var memberMainProdOfferVO = util.ProdOfferHelper
						                        .getMainProdOffer(dojo.global.$appContext$.get("prodOfferList" + p))[0];
						                return prodOfferAcceptInfo.prodOfferId == memberMainProdOfferVO.prodOfferId;
					                } else {
						                return prodOfferAcceptInfo.prodOfferId == mainProdOfferVO.prodOfferId;
					                }
				                })[0];
				        var accessProdInfo = BusCard.jsonPath(prodOfferAcceptVO.accessProdAcceptInfoList || [],
				                "$[?(@.userId==" + userId + ")]")[0];
				        accessProdInfo.dealObjectList = dealObjectList;
			        }
		        },
		        
		        /**
				 * 针对成员加入集团的处理
				 */
		        groupUserHandle : function(data) {
			        var handler = this;
			        var accessProdList = handler.getAccessProdList(data);
			        dojo.forEach(accessProdList, function(accessProdVO) {
				                var userId = accessProdVO.userId;
				                var groupUserInfoTmpVO = {};
				                if (!!accessProdVO && !!accessProdVO.groupId && accessProdVO.groupId != ""
				                        && accessProdVO.operKind == "1") {
					                groupUserInfoTmpVO.groupId = accessProdVO.groupId;
					                groupUserInfoTmpVO.ifValid = "1";
					                groupUserInfoTmpVO.serviceId = accessProdVO.serviceId;
					                groupUserInfoTmpVO.serviceKind = accessProdVO.serviceKind;
					                accessProdVO.groupUserInfoTmpVO = handler.buildGroupUserInfoTmpVO(groupUserInfoTmpVO);
				                }
				                
			                });
		        },
		        
		        /**
				 * 获取接入类产品集合
				 */
		        getAccessProdList : function(data) {
			        var accessProdList = [];
			        dojo.forEach(data.orderAcceptInfoList, function(orderInfoVO) {
				        dojo.forEach(orderInfoVO.prodOfferAcceptInfoList, function(prodOfferAcceptInfo) {
					                if (prodOfferAcceptInfo.prodOfferType == util.PRODOFFERTYPE.MAIN_OFFER_TYPE) {
						                Array.prototype.push.apply(accessProdList, dojo.filter(
						                                prodOfferAcceptInfo.accessProdAcceptInfoList||[], function(relaProdInfo) {
							                                return relaProdInfo.prodFuncType == ConstantsPool
							                                        .load("ProductFuncTypeConst").ProductFuncTypeConst.ACCESS;
						                                }));
					                }
				                })
			        });
			        return accessProdList;
		        },
		        /**
				 * 用户类型的开始时间和结束时间 速率attrCd为300000，写死该值 用户类型的时间规则
				 * 1.主销售品变更导致用户类型变更：用户类型的生效时间和主销售品的生效时间一致
				 * 2.非主销售品变更导致的用户类型变更：用户类型的生效时间和销售品一致
				 */
		        setUserTypeDate : function(data) {
			        var specDataHandler = this;
			        dojo.forEach(data.orderAcceptInfoList || [], function(orderAcceptInfoVO) {
				        // 循环里面的主销售品
				        dojo.forEach(orderAcceptInfoVO.prodOfferAcceptInfoList || [], function(prodOfferAcceptInfo) {
					        // 如果有是主销售品，并且该销售品下有接入类产品时
					        if (prodOfferAcceptInfo.prodOfferType == 1
					                && prodOfferAcceptInfo.accessProdAcceptInfoList != null
					                && prodOfferAcceptInfo.accessProdAcceptInfoList.length > 0) {
						        dojo.forEach(prodOfferAcceptInfo.accessProdAcceptInfoList || [], function(
						                accessProdAcceptInfo) {
							        // 判断是否有宽带属性，如果没有则不处理
							        var targetProdAttrList = dojo.filter(accessProdAcceptInfo.prodInstAttrList || [],
							                function(prodInstAttrInfo) {
								                return prodInstAttrInfo.attrId == util.SpecAttrCdConst.userTypeAttrCd;
							                });
							        if (targetProdAttrList.length == 0) { return; }
							        // 变更阶段
							        if (accessProdAcceptInfo.operKind == 2) {
								        var targetSelectedMemProdOfferList = dojo.filter(
								                $ac$.selectedMemberProdOfferList || [], function(
								                        selectedMemberProdOfferInfo) {
									                return selectedMemberProdOfferInfo.prodInstId == accessProdAcceptInfo.prodInstId;
								                });
								        if (targetSelectedMemProdOfferList.length == 0) { return; }
								        
								        // 满足以下条件说明是变更主销售品
								        if (targetProdAttrList[0].operKind != 1 && ($ac$.processId == "single2single"
								                || targetSelectedMemProdOfferList[0].action == "change"
								                || (targetSelectedMemProdOfferList[0].action == "split" && targetSelectedMemProdOfferList[0].offerInstVO.prodOfferId != targetSelectedMemProdOfferList[0].prodOfferId))) {
									        // 1.将主销售品的生效时间给其设置上
									        targetProdAttrList[0].effDate = prodOfferAcceptInfo.effDate;
									        // 非变更主销售品
								        } else {
									        // 1.将用户类型设置为立即生效
									        targetProdAttrList[0].effDate = dojo.global.$appContext$.requestParam.today;
								        }
							        }
						        });
					        }
				        });
			        });
		        },
		        
		        /**
		         * 判断是否是主销售品变更
		         */
		        doCheckIfMainChg : function(userId){
		        	var user_id_key = this.controller.dataBuilder.USER_ID_KEY;
		        	var mainChgFlag = false;
		        	var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
			        var targetSelectMember = dojo.filter(selectedMemberProdOfferList || [], function(
	                        selectedMemberProdOffer) {
		                return dojo.global.$appContext$.get(user_id_key)["userId@uniqueId_" + selectedMemberProdOffer.uniqueId] == userId;
	                });
	                if(targetSelectMember.length>0){
	                	if (!!targetSelectMember[0]) {
						        // /实例存在才进行往下走
						        if (!!targetSelectMember[0].offerInstVO) {
							        if (targetSelectMember[0].offerInstVO.prodOfferId != targetSelectMember[0].prodOfferId) {
								        mainChgFlag = true;
							        }
						        }
					        }
	                }
	                return mainChgFlag;
		        },
		        /**
		         * 设置销售品的周价的生效时间
		         */
		        setCyclePriceAttrCdDate : function(data){
		        	var specDataHandler = this;
		        	dojo.forEach(data.orderAcceptInfoList || [], function(orderAcceptInfoVO) {
				        // 循环里面的主销售品
				        dojo.forEach(orderAcceptInfoVO.prodOfferAcceptInfoList || [], function(prodOfferAcceptInfo) {
					        // 如果有是主销售品，并且该销售品下有接入类产品时
					        if (prodOfferAcceptInfo.prodOfferType == 1
					                && prodOfferAcceptInfo.offerInstAttrList != null
					                && prodOfferAcceptInfo.offerInstAttrList.length > 0) {
						       dojo.forEach(prodOfferAcceptInfo.offerInstAttrList, function(
						                                offerInstAttrInfo) {
		                            //判断如果有周价
			                        if(offerInstAttrInfo.attrCd == util.SpecAttrCdConst.cyclePriceAttrCd
			                        ||offerInstAttrInfo.attrId == util.SpecAttrCdConst.cyclePriceAttrCd){
			                        	var cycleDateAttr = dojo.filter(prodOfferAcceptInfo.offerInstAttrList||[],function(_offerAttr_){
			                        		return _offerAttr_.attrCd == util.SpecAttrCdConst.cyclePriceDateAttrCd
			                        			||_offerAttr_.attrId == util.SpecAttrCdConst.cyclePriceDateAttrCd;
			                        	});
			                        	if(cycleDateAttr&&cycleDateAttr.length>0){
			                        		if(cycleDateAttr[0].attrValue == 1){
			                        			offerInstAttrInfo.effDate = dojo.global.$appContext$.requestParam.today;
			                        		}else if(cycleDateAttr[0].attrValue == 2){
			                        			offerInstAttrInfo.effDate = util.DateHelper.formatDate(util.DateHelper.getFirstDayAfterPeriod());
			                        		}
			                        		
			                        	}
			                        }
		                        })
					        }
				        });
			        });
		        },
		        /**
		         * 设置接入方式的生效时间
		         */
		        setAccessTypeDate : function(data){
		        	var specDataHandler = this;
		        	dojo.forEach(data.orderAcceptInfoList || [], function(orderAcceptInfoVO) {
				        // 循环里面的主销售品
				        dojo.forEach(orderAcceptInfoVO.prodOfferAcceptInfoList || [], function(prodOfferAcceptInfo) {
					        // 如果有是主销售品，并且该销售品下有接入类产品时
					        if (prodOfferAcceptInfo.prodOfferType == 1
					                && prodOfferAcceptInfo.accessProdAcceptInfoList != null
					                && prodOfferAcceptInfo.accessProdAcceptInfoList.length > 0) {
						        dojo.forEach(prodOfferAcceptInfo.accessProdAcceptInfoList || [], function(
						                accessProdAcceptInfo) {
							        // 判断是否有宽带属性，如果没有则不处理
							        var targetProdAttrList = dojo.filter(accessProdAcceptInfo.prodInstAttrList || [],
							                function(prodInstAttrInfo) {
								                return prodInstAttrInfo.attrId == util.SpecAttrCdConst.accessTypeAttrCd;
							                });
							        //变更才处理，不变更不处理//换业务也不处理
							        if (accessProdAcceptInfo.operKind == 2&&(accessProdAcceptInfo.serviceOfferId!=util.ACTION_CD_CONST.PRODUCT_CHANGE_ACCEPT)) {
							        	if (targetProdAttrList.length == 0) { return; }
							        	var accessTypeAttr = targetProdAttrList[0];
							        	var userId = accessProdAcceptInfo.userId;
							        	if(specDataHandler.doCheckIfMainChg(userId)){
							        		accessTypeAttr.effDate = util.DateHelper.formatDate(util.DateHelper.getFirstDayAfterPeriod());
							        		accessTypeAttr.expDate = "2037-01-01 00:00:00";
							        	}
							        	
							        }else{
							        	if(targetProdAttrList.length>0){
								        	targetProdAttrList[0].effDate = dojo.global.$appContext$.requestParam.today;
								        	targetProdAttrList[0].expDate = "2037-01-01 00:00:00";
							        	}
							        }
						        });
					        }
				        });
			        });
		        },
		        
		        /**
		         * 设置速率的生效时间
		         */
		        setRateEffectDate : function(data){
		        	var specDataHandler = this;
			        dojo.forEach(data.orderAcceptInfoList || [], function(orderAcceptInfoVO) {
				        // 循环里面的主销售品
				        dojo.forEach(orderAcceptInfoVO.prodOfferAcceptInfoList || [], function(prodOfferAcceptInfo) {
					        // 如果有是主销售品，并且该销售品下有接入类产品时
					        if (prodOfferAcceptInfo.prodOfferType == 1
					                && prodOfferAcceptInfo.accessProdAcceptInfoList != null
					                && prodOfferAcceptInfo.accessProdAcceptInfoList.length > 0) {
						        dojo.forEach(prodOfferAcceptInfo.accessProdAcceptInfoList || [], function(
						                accessProdAcceptInfo) {
							        // 判断是否有宽带属性，如果没有则不处理
							        var targetProdAttrList = dojo.filter(accessProdAcceptInfo.prodInstAttrList || [],
							                function(prodInstAttrInfo) {
								                //return prodInstAttrInfo.attrId == util.SpecAttrCdConst.portSpeedAttrCd;;
							                	return dojo.some(util.SpeedAttrArray||[],function(_attrCd){
											        	return _attrCd == prodInstAttrInfo.attrId+"";
											    });
							                });
							        if (targetProdAttrList.length == 0) { return; }
							        if (accessProdAcceptInfo.operKind == 2) {
							        	 var targetRateTimeAttrList = dojo.filter(accessProdAcceptInfo.prodInstAttrList || [],
							                	function(prodInstAttrInfo) {
								                	return prodInstAttrInfo.attrId == util.SpecAttrCdConst.rateEffectDate;
							             });
							             if(targetRateTimeAttrList.length == 0){ return; }
							             if(!!targetRateTimeAttrList[0].attrValue){
							             	//判断当前的系统时间和选择的生效时间的年月日是否一致，一致则取系统时间
							             	var SYSDATE = dojo.global.$appContext$.requestParam.today;
											var dateArr = SYSDATE.split(" ");
											var dateYMD = dateArr[0].split("-");
											var year = parseInt(dateYMD[0], 10);
											var month = parseInt(dateYMD[1], 10)-1;
											var date = parseInt(dateYMD[2], 10);
											
											var dateTargetYMD = targetRateTimeAttrList[0].attrValue.split("-");
											var yearTarget = parseInt(dateTargetYMD[0], 10);
											var monthTarget = parseInt(dateTargetYMD[1], 10) - 1;
											var dateTarget = parseInt(dateTargetYMD[2], 10);
											
											if(yearTarget==year&&monthTarget==month&&dateTarget==date){
												targetProdAttrList[0].effDate = SYSDATE;
											}else{
												targetProdAttrList[0].effDate = targetRateTimeAttrList[0].attrValue+" "+"00:00:00";
											}
							             	
							             }
							        }
						        });
					        }
				        });
			        });
		        },
		        
		        /**
				 * 设置速率的开始时间和结束时间 速率attrCd为100081，写死该值 速率写的时间的规则
				 * 1.主销售品变更导致速率变更：速率的生效时间和主销售品的生效时间一致
				 * 2.可选包，促销包，体验导致的速率变更：速率的生效时间和销售品一致，销售品立即则速率立即，销售品预约则速率预约
				 * 3.如果单独变更速率，则为立即生效
				 */
		        setPortSpeedDate : function(data) {
			        var specDataHandler = this;
			        dojo.forEach(data.orderAcceptInfoList || [], function(orderAcceptInfoVO) {
				        // 循环里面的主销售品
				        dojo.forEach(orderAcceptInfoVO.prodOfferAcceptInfoList || [], function(prodOfferAcceptInfo) {
					        // 如果有是主销售品，并且该销售品下有接入类产品时
					        if (prodOfferAcceptInfo.prodOfferType == 1
					                && prodOfferAcceptInfo.accessProdAcceptInfoList != null
					                && prodOfferAcceptInfo.accessProdAcceptInfoList.length > 0) {
						        dojo.forEach(prodOfferAcceptInfo.accessProdAcceptInfoList || [], function(
						                accessProdAcceptInfo) {
							        // 判断是否有宽带属性，如果没有则不处理
							        var targetProdAttrList = dojo.filter(accessProdAcceptInfo.prodInstAttrList || [],
							                function(prodInstAttrInfo) {
								                //return prodInstAttrInfo.attrId == util.SpecAttrCdConst.portSpeedAttrCd;
							                	return dojo.some(util.SpeedAttrArray||[],function(_attrCd){
											        	return _attrCd == prodInstAttrInfo.attrId+"";
											    });
							                });
							        if (targetProdAttrList.length == 0) { return; }
							        // 变更阶段
							        if (accessProdAcceptInfo.operKind == 2) {
								        var targetSelectedMemProdOfferList = dojo.filter(
								                $ac$.selectedMemberProdOfferList || [], function(
								                        selectedMemberProdOfferInfo) {
									                return selectedMemberProdOfferInfo.prodInstId == accessProdAcceptInfo.prodInstId;
								                });
								        if (targetSelectedMemProdOfferList.length == 0) { return; }
								        
								        // 满足以下条件说明是变更主销售品
								        if ((!!targetSelectedMemProdOfferList[0].offerInstVO)&&targetSelectedMemProdOfferList[0].offerInstVO.prodOfferId != targetSelectedMemProdOfferList[0].prodOfferId) {
									        // 1.先将主销售品的生效时间给其设置上
									        targetProdAttrList[0].effDate = prodOfferAcceptInfo.effDate;
									        // 2.再判断是否有升速可选包
									        specDataHandler.setPortSpeedEffDateBySubOfferForChg(prodOfferAcceptInfo,
									                orderAcceptInfoVO.prodOfferAcceptInfoList, targetProdAttrList[0],
									                accessProdAcceptInfo, accessProdAcceptInfo.prodInstAttrList);
									        // 非变更主销售品
								        } else {
									        // 1.先将速率设置为立即生效
									        targetProdAttrList[0].effDate = dojo.global.$appContext$.requestParam.today;
									        // 2.判断是否有升速的可选包
									        specDataHandler.setPortSpeedEffDateBySubOfferForChg(prodOfferAcceptInfo,
									                orderAcceptInfoVO.prodOfferAcceptInfoList, targetProdAttrList[0],
									                accessProdAcceptInfo, accessProdAcceptInfo.prodInstAttrList);
								        }
								        // 新装阶段
							        } else if (accessProdAcceptInfo.operKind == 1) {
								        // 和主销售品的生效时间一致
								        targetProdAttrList[0].effDate = prodOfferAcceptInfo.effDate;
								        // 如果有升速可选包，则和升速可选包的生效时间一致
								        specDataHandler.setPortSpeedEffDateBySubOffer(prodOfferAcceptInfo,
								                orderAcceptInfoVO.prodOfferAcceptInfoList, targetProdAttrList[0],
								                accessProdAcceptInfo, orderAcceptInfoVO.salesPromotionAcceptInfoList);
							        }
						        });
					        }
				        });
			        });
		        },
		        /**
				 * 产品新装判断是否有升速的可选包根据升速的可选包来设置速率的生效时间
				 */
		        setPortSpeedEffDateBySubOffer : function(mainProdOffer, prodOfferAcceptInfoList, portSpeedAttrInfo,
		                accessProdAcceptInfo, salesPromotionAcceptInfoList) {
			        var rateMap = prodOfferAcceptLoader.rateAttrMap;
			        // 如果不存在则不处理
			        if (rateMap == "undefined" || rateMap == undefined) { return; }
			        for (var p in rateMap) {
				        var uniqueId = p;
				        var user_id_key = this.controller.dataBuilder.USER_ID_KEY;
				        if (dojo.global.$appContext$.get(user_id_key)["userId@uniqueId_" + uniqueId] == accessProdAcceptInfo.prodInstId) {
					        var rateAttrInfoList = rateMap[p];
					        // 找出和当前速率值相同的对象
					        var targetRateAttrList = dojo.filter(rateAttrInfoList || [], function(rateAttrInfo) {
						                return portSpeedAttrInfo.attrValue == rateAttrInfo.attrValue;
					                });
					        if (targetRateAttrList.length > 0) {
						        var targetProdOfferList = dojo.filter(prodOfferAcceptInfoList || [], function(
						                        subProdOffer) {
							                return subProdOffer.parentProdOfferInstId == mainProdOffer.prodOfferInstId
							                        && subProdOffer.prodOfferId == targetRateAttrList[0].prodOfferId;
						                });
						        if (targetProdOfferList.length > 0) {
							        portSpeedAttrInfo.effDate = targetProdOfferList[0].effDate;
							        return;
						        } else {
							        // 查询促销政策对象，取促销政策的时间
							        var targetSalePromotionList = dojo.filter(salesPromotionAcceptInfoList || [],
							                function(salesPromotionTempVO) {
								                return salesPromotionTempVO.promotionId == targetRateAttrList[0].prodOfferId;
							                });
							        if (targetSalePromotionList.length > 0) {
								        portSpeedAttrInfo.effDate = targetSalePromotionList[0].effDate;
								        return;
							        }
						        }
					        }
				        }
			        }
		        },
		        /**
				 * 产品变更计算开始
				 */
		        setPortSpeedEffDateBySubOfferForChg : function(mainProdOffer, prodOfferAcceptInfoList,
		                portSpeedAttrInfo, accessProdAcceptInfo, prodInstAttrList) {
			        var rateMap = prodOfferAcceptLoader.rateAttrMap;
			        // 如果不存在则不处理
			        if (rateMap == "undefined" || rateMap == undefined) { return; }
			        for (var p in rateMap) {
				        var uniqueId = p;
				        var user_id_key = this.controller.dataBuilder.USER_ID_KEY;
				        if (dojo.global.$appContext$.get(user_id_key)["userId@uniqueId_" + uniqueId] == accessProdAcceptInfo.prodInstId) {
					        
					        var rateAttrInfoList = rateMap[p];
					        // 说明是新增加的升速可选包
					        if (rateAttrInfoList.length == 1 && rateAttrInfoList[0].operKind == 1) {
						        // 找出和当前速率值相同的对象
						        var targetRateAttrList = dojo.filter(rateAttrInfoList || [], function(rateAttrInfo) {
							                return portSpeedAttrInfo.attrValue == rateAttrInfo.attrValue;
						                });
						        if (targetRateAttrList.length > 0) {
							        var targetProdOfferList = dojo.filter(prodOfferAcceptInfoList || [], function(
							                        subProdOffer) {
								                return subProdOffer.parentProdOfferInstId == mainProdOffer.prodOfferInstId
								                        && subProdOffer.prodOfferId == targetRateAttrList[0].prodOfferId;
							                });
							        if (targetProdOfferList.length > 0) {
								        portSpeedAttrInfo.effDate = targetProdOfferList[0].effDate;
								        return;
							        } else {
								        // 查询促销政策对象，取促销政策的时间
								        var targetSalePromotionList = dojo.filter(salesPromotionAcceptInfoList || [],
								                function(salesPromotionTempVO) {
									                return salesPromotionTempVO.promotionId == targetRateAttrList[0].prodOfferId;
								                });
								        if (targetSalePromotionList.length > 0) {
									        portSpeedAttrInfo.effDate = targetSalePromotionList[0].effDate;
								        }
							        }
						        }
						        // 说明是删除升速可选包
					        } else if (rateAttrInfoList.length == 1 && rateAttrInfoList[0].operKind == 3) {
						        // 找出和当前速率值相同的对象
						        var targetRateAttrList = dojo.filter(rateAttrInfoList || [], function(rateAttrInfo) {
							                return portSpeedAttrInfo.attrValue == rateAttrInfo.oldAttrValue;
						                });
						        if (targetRateAttrList.length > 0) {
							        var targetProdOfferList = dojo.filter(prodOfferAcceptInfoList || [], function(
							                        subProdOffer) {
								                return subProdOffer.parentProdOfferInstId == mainProdOffer.prodOfferInstId
								                        && subProdOffer.prodOfferId == targetRateAttrList[0].prodOfferId;
							                });
							        if (targetProdOfferList.length > 0) {
								        portSpeedAttrInfo.expDate = targetProdOfferList[0].expDate;
								        return;
							        } else {
								        // 查询促销政策对象，取促销政策的时间
								        var targetSalePromotionList = dojo.filter(salesPromotionAcceptInfoList || [],
								                function(salesPromotionTempVO) {
									                return salesPromotionTempVO.promotionId == targetRateAttrList[0].prodOfferId;
								                });
								        if (targetSalePromotionList.length > 0) {
									        portSpeedAttrInfo.effDate = targetSalePromotionList[0].expDate;
								        }
							        }
						        }
						        // 说明增加了一个升速可选包，删除了一个升速可选包,此时需要重新拼属性开始时间数据
					        } else if (rateAttrInfoList.length > 1) {
						        // 先删除集合中的portSpeedAttrInfo中对应的对象
						        for (var p = 0; p < prodInstAttrList.length; p++) {
							        var relaAttr = prodInstAttrList[p];
							        if (relaAttr.attrId == portSpeedAttrInfo.attrId) {
								        prodInstAttrList.splice(p, 1);
								        break;
							        }
						        }
						        
						        var resultRateAttrList = dojo.map(rateAttrInfoList | [], function(rateAttrInfo) {
							        var cloneProdAttrInfo = dojo.clone(portSpeedAttrInfo);
							        if (rateAttrInfo.operKind == 3) {
								        var targetProdOfferList = dojo.filter(prodOfferAcceptInfoList || [], function(
								                        subProdOffer) {
									                return subProdOffer.parentProdOfferInstId == mainProdOffer.prodOfferInstId
									                        && subProdOffer.prodOfferId == rateAttrInfo.prodOfferId;
								                });
								        if (targetProdOfferList.length > 0) {
									        cloneProdAttrInfo.oldAttrValue = rateAttrInfo.attrValue;
									        cloneProdAttrInfo.attrValue = rateAttrInfo.oldAttrValue;
									        cloneProdAttrInfo.effDate = targetProdOfferList[0].expDate;
								        } else {
									        // 查询促销政策对象，取促销政策的时间
									        var targetSalePromotionList = dojo.filter(salesPromotionAcceptInfoList
									                        || [], function(salesPromotionTempVO) {
										                return salesPromotionTempVO.promotionId == rateAttrInfo.prodOfferId;
									                });
									        if (targetSalePromotionList.length > 0) {
										        cloneProdAttrInfo.effDate = targetSalePromotionList[0].expDate;
										        cloneProdAttrInfo.oldAttrValue = rateAttrInfo.attrValue;
										        cloneProdAttrInfo.attrValue = rateAttrInfo.oldAttrValue;
									        }
								        }
								        
							        } else if (rateAttrInfo.operKind == 1) {
								        var targetProdOfferList = dojo.filter(prodOfferAcceptInfoList || [], function(
								                        subProdOffer) {
									                return subProdOffer.parentProdOfferInstId == mainProdOffer.prodOfferInstId
									                        && subProdOffer.prodOfferId == rateAttrInfo.prodOfferId;
								                });
								        if (targetProdOfferList.length > 0) {
									        cloneProdAttrInfo.effDate = targetProdOfferList[0].effDate;
									        cloneProdAttrInfo.oldAttrValue = rateAttrInfo.oldAttrValue;
									        cloneProdAttrInfo.attrValue = rateAttrInfo.attrValue;
								        } else {
									        // 查询促销政策对象，取促销政策的时间
									        var targetSalePromotionList = dojo.filter(salesPromotionAcceptInfoList
									                        || [], function(salesPromotionTempVO) {
										                return salesPromotionTempVO.promotionId == rateAttrInfo.prodOfferId;
									                });
									        if (targetSalePromotionList.length > 0) {
										        cloneProdAttrInfo.effDate = targetSalePromotionList[0].effDate;
										        cloneProdAttrInfo.oldAttrValue = rateAttrInfo.oldAttrValue;
										        cloneProdAttrInfo.attrValue = rateAttrInfo.attrValue;
									        }
								        }
								        
							        }
							        return cloneProdAttrInfo;
						        });
						        prodInstAttrList = prodInstAttrList.concat(resultRateAttrList);
					        }
				        }
			        }
		        },
		        /**
				 * 集团子群新增写集团接入类订单项，需要特殊处理记录到。
				 * 
				 * 
				 */
		        getGrpAccessProdListForSubGrp : function(data) {
			        var handler = this;
			        var subGroupProdInfo = $ac$.get("subGroupProdInfo");
			        if (subGroupProdInfo) {
				        var requestParam = dojo.global.$appContext$.get("requestParam");
				        var custId = requestParam.customerData.custId;
				        var productId;
				        dojo.forEach(subGroupProdInfo.prodRelaList, function(prodRelaVO) {
					                if (prodRelaVO.relaType == '100800') {
						                productId = prodRelaVO.prodA;
						                return true;
					                }
				                });
				        
				        var accessProdAcceptInfoVO = handler.doGroupProductInfoComputation(productId, custId,
				                subGroupProdInfo);
				        var accessProdList = [];
				        accessProdList.push(accessProdAcceptInfoVO);
				        // dojo.mixin(data.orderAcceptInfoList[0],accessProdList);
				        data.orderAcceptInfoList[0].accessProdAcceptInfoList = accessProdList;
			        }
		        },
		        /**
				 * 变更主销售品时设置新的主销售品的开始时间
				 */
		        dealOfferStandardEffDate : function(data) {
			        // 单边单
			        // if($ac$.currentProcessId ==
			        // "single2single"&&$ac$.get("offerStandardStartDate")){
			        // dojo.forEach(data.orderAcceptInfoList||[],function(orderAcceptInfo){
			        // dojo.forEach(orderAcceptInfo.prodOfferAcceptInfoList,function(prodOfferAcceptInfo){
			        // if(prodOfferAcceptInfo.operKind == 1){
			        // prodOfferAcceptInfo.effDate =
			        // $ac$.get("offerStandardStartDate").beginDate;
			        // }
			        // })
			        // });
			        // }
			        var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
			        // 循环该集合，判断是否有宽带标准化套餐，如果有则进行处理
			        dojo.forEach(selectedMemberProdOfferList || [], function(selectedMemberProdOfferInfo) {
				        var offerInstVO = selectedMemberProdOfferInfo.offerInstVO;
				        if (offerInstVO && selectedMemberProdOfferInfo.prodOfferId == offerInstVO.prodOfferId) { return false; }
				        // 如果实例信息存在，并且存在协议信息时
				        if (offerInstVO && offerInstVO.offerStandardInstList
				                && offerInstVO.offerStandardInstList.length > 0) {
					        // 更新退订的销售品的时间
					        var queryResult = BusCard.jsonPath(data.orderAcceptInfoList,
					                "$[*].prodOfferAcceptInfoList[?(@.prodOfferInstId==" + offerInstVO.prodOfferInstId
					                        + ")]");
					        if (queryResult) {
						        queryResult[0].expDate = !!$ac$.get("offerStandardStartDate_"
						                + offerInstVO.prodOfferInstId) ? $ac$.get("offerStandardStartDate_"
						                + offerInstVO.prodOfferInstId).beginDate : util.DateHelper
						                .getStringFirstDayOFNextMonth();
					        }
					        var newProdOfferResult = BusCard.jsonPath(data.orderAcceptInfoList,
					                "$[*].prodOfferAcceptInfoList[?(@.prodOfferId=="
					                        + selectedMemberProdOfferInfo.prodOfferId + ")]");
					        if (newProdOfferResult) {
						        newProdOfferResult[0].effDate = !!$ac$.get("offerStandardStartDate_"
						                + offerInstVO.prodOfferInstId) ? $ac$.get("offerStandardStartDate_"
						                + offerInstVO.prodOfferInstId).beginDate : util.DateHelper
						                .getStringFirstDayOFNextMonth();
						        // 设置销售品属性的时间
						        dojo.forEach(newProdOfferResult[0].offerInstAttrList || [], function(
						                        offerInstAttrTempVO) {
							                offerInstAttrTempVO.effDate = newProdOfferResult[0].effDate;
						                })
						        // 设置销售品下的产品的生效时间(接入类)
						        dojo.forEach(newProdOfferResult[0].accessProdAcceptInfoList || [], function(
						                        accessProdAcceptInfoVO) {
							                accessProdAcceptInfoVO.effDate = newProdOfferResult[0].effDate;
							                dojo.forEach(accessProdAcceptInfoVO.prodInstAttrList || [], function(
							                                prodInstAttrTempVO) {
								                        prodInstAttrTempVO.effDate = accessProdAcceptInfoVO.effDate;
							                        });
						                })
						        // 设置销售品下的产品的生效时间(功能类)
						        dojo.forEach(newProdOfferResult[0].serviceProdAcceptInfoList || [], function(
						                        serviceProdAcceptInfoVO) {
							                serviceProdAcceptInfoVO.effDate = newProdOfferResult[0].effDate;
							                dojo.forEach(serviceProdAcceptInfoVO.prodInstAttrList || [], function(
							                                prodInstAttrTempVO) {
								                        prodInstAttrTempVO.effDate = serviceProdAcceptInfoVO.effDate;
							                        });
						                })
					        }
				        }
			        });
			        
		        },
		        
		        /**
				 * 创建购物车数据
				 */
		        createShoppingCartData : function(data) {
			        var dataBuilder = this;
			        var shoppingCartAcceptVO = {};
			        // 拼操作相关信息串
			        dojo.mixin(shoppingCartAcceptVO, {
				                cityCode : dojo.global.$appContext$.get("requestParam").customerData.cityCode,
				                custId : dojo.global.$appContext$.get("requestParam").customerData.custId,
				                acceptDesc : dataBuilder.getAcceptDesc(),
				                orderData : dojo.toJson(dataBuilder.getCustOrderAcceptSnapshot())
			                });
			        data.shoppingCartAcceptVO = dataBuilder.buildShoppingCartAcceptVO(shoppingCartAcceptVO);
		        },
		        /**
				 * 获取销售品受理快照信息
				 * 
				 * @method
				 */
		        getCustOrderAcceptSnapshot : function() {
			        var selectedMainProdOfferInfoVO = $ac$.get("selectedMainProdOfferInfoVO"),
				        mainProdOfferInstVO = $ac$.get("mainProdOfferInstVO"),
				        selectedMemberProdOfferList = $ac$.get("selectedMemberProdOfferList") || [],
				        newProdOfferId = selectedMainProdOfferInfoVO.prodOfferId,
				        oldProdOfferId = (mainProdOfferInstVO || {}).prodOfferId,
				        prodOfferInstId = (mainProdOfferInstVO || {}).prodOfferInstId,
				        processId = $ac$.get("processId"),
				        protoToString = Object.prototype.toString,
				        simpleMemberInfoList = dojo.map(selectedMemberProdOfferList, function(member) {
					        var obj = {};
					        for (var index in member) {
						        if (member.hasOwnProperty(index)) {
							        var typeInfo = protoToString.call(member[index]);
							        if (/Number/.test(typeInfo) || /Boolean/.test(typeInfo) || /String/.test(typeInfo)) {
								        obj[index] = member[index];
							        }
							        
						        }
						        
					        }
					        return obj;
					        
				        });
			        return {
				        newProdOfferId : newProdOfferId,
				        oldProdOfferId : oldProdOfferId,
				        prodOfferInstId : prodOfferInstId,
				        processId : processId,
				        selectedMemberProdOfferList : simpleMemberInfoList
				        
			        };
			        
		        },
		        
		        /**
				 * 购物车数据，生成受理描述信息
				 */
		        getAcceptDesc : function() {
			        var acceptDesc = "";
			        var prodOfferName = "";
			        var ACTION_CD_CONST = util.ACTION_CD_CONST;
			        if (!!$ac$.requestParam.prodOfferInstId) {
				        var queryResult = BusCard.jsonPath($ac$.userHasProdOfferMetaInfoList || [],
				                "$[?(@.prodOfferId==" + $ac$.mainProdOfferInstVO.prodOfferId + ")]");
				        if (queryResult) {
					        prodOfferName = queryResult[0].prodOfferName;
				        }
			        } else {
				        prodOfferName = $ac$.selectedMainProdOfferInfoVO.prodOfferName;
			        }
			        var actionCD = $ac$.requestParam.actionCD;
			        switch (actionCD) {
				        case ACTION_CD_CONST.PRODUCT_INSTALL :
					        acceptDesc = "销售品订购-" + prodOfferName;
					        break;
				        case ACTION_CD_CONST.PRODUCT_CHANGE :
					        acceptDesc = "销售品变更-" + prodOfferName;
					        break;
				        case ACTION_CD_CONST.PRODUCT_CHANGE_MAIN :
					        acceptDesc = "变更主销售品-" + prodOfferName;
					        break;
				        case ACTION_CD_CONST.PRE_ACCEPT :
					        acceptDesc = "预受理-" + prodOfferName;
					        break;
				        
				        case ACTION_CD_CONST.PRODOFFER_CANCEL_ACTION :
					        acceptDesc = "销售品退订-" + prodOfferName;
					        break;
				        case ACTION_CD_CONST.PROTOCOL_ACCEPT :
					        acceptDesc = "协议转订单-" + prodOfferName;
					        break;
				        case ACTION_CD_CONST.SHOPPING_CART_ACCEPT :
					        acceptDesc = "购物车订购-" + prodOfferName;
					        break;
				        case ACTION_CD_CONST.PROD_ADD :
					        acceptDesc = "加装-" + prodOfferName;
					        break;
				        
				        case ACTION_CD_CONST.PRE_ORDER_BACK :
					        acceptDesc = "预登录返单-" + prodOfferName;
					        break;
				        case ACTION_CD_CONST.PROD_INTERCHANGE :
					        acceptDesc = "互换-" + prodOfferName;
					        break;
				        case ACTION_CD_CONST.PROMOTION_CHANGE :
					        acceptDesc = "促销政策变更-" + prodOfferName;
					        break;
				        case ACTION_CD_CONST.MEMBER_OFFER_CHANGE :
					        acceptDesc = "成员销售品变更-" + prodOfferName;
					        break;
				        
				        case ACTION_CD_CONST.CHANGE_ACCEPT :
					        acceptDesc = "换受理-" + prodOfferName;
					        break;
				        case ACTION_CD_CONST.MEMBER_ORDER_GROUP_PRODUCT :
					        acceptDesc = "成员订购集团产品-" + prodOfferName;
					        break;
				        default :
					        acceptDesc = "未知的订单类型";
					        break;
			        }
			        return acceptDesc;
		        },
		        /**
				 * 一机双号构建产品和营销资源实例关系
				 */
		        dealVirtualNumRes : function(data) {
			        var prodResRelaMap = prodOfferAcceptLoader.prodResRelaMap;
			        var dataBuilder = this;
			        for (var p in prodResRelaMap) {
				        var prodResRelaInfo = prodResRelaMap[p];
				        if (!prodResRelaInfo.serviceId) {
					        continue;
				        }
				        dojo.forEach(data.orderAcceptInfoList || [], function(orderInfoVO) {
					                dojo.forEach(orderInfoVO.prodOfferAcceptInfoList || [], function(
					                                prodOfferAcceptInfo) {
						                        dojo.forEach(prodOfferAcceptInfo.serviceProdAcceptInfoList || [],
						                                function(serviceProdAcceptInfo) {
						                                	//取一机双号
							                                var attrInfoList = BusCard.jsonPath(
							                                        serviceProdAcceptInfo.prodInstAttrList || [],
							                                        "$[?(@.attrCd=="
							                                                + util.SpecAttrCdConst.serviceIdAttrCd
							                                                + ")]");
							                                if(!attrInfoList){
							                                	//取一卡双号
							                                	attrInfoList = BusCard.jsonPath(
							                                        serviceProdAcceptInfo.prodInstAttrList || [],
							                                        "$[?(@.attrCd=="
							                                                + util.SpecAttrCdConst.oneCard2NumAttrCd
							                                                + ")]");
							                                }
							                                if (attrInfoList.length > 0) {
								                                var attrValue = attrInfoList[0].attrValue;
								                                if (prodResRelaInfo.serviceId == attrValue) {
									                                var prodResInstRelaVO = {};
									                                dojo.mixin(prodResInstRelaVO, prodResRelaInfo);
									                                serviceProdAcceptInfo.prodResInstRelaList = [dataBuilder
									                                        .buildProdResInstRelaVO(prodResInstRelaVO)];
								                                }
							                                }
						                                });
					                        });
				                });
			        }
		        },
		        /**
				 * 计算集团接入类订单项产品数据
				 */
		        doGroupProductInfoComputation : function(productId, custId, subGroupProdInfo) {
			        var handler = this;
			        var param = "&ownerCustId=" + custId + "&productId=" + productId;
			        var prodInstList = util.ServiceFactory
			                .getService("url:prodOfferSaleAjaxAction.do?method=getProdInstByPropertiesExceptSubService"
			                        + param);
			        var prodInstVOTemp;
			        dojo.forEach(prodInstList, function(prodInstVO) {
				                if (prodInstVO.prodFuncType == 101) {
					                prodInstVOTemp = prodInstVO;
					                return true;
				                }
			                })
			        var date = new Date(prodInstVOTemp.beginRentTime);
			        
			        dojo.mixin(prodInstVOTemp, {
				                serviceKind : 12,
				                operKind : 2,
				                ActionCD : ConstantsPool.ActionCDConst.PRODUCT_CHANGE,
				                beginRentTime : prodInstVOTemp.beginRentTime
			                });
			        var itemRel = {
				        zorderItemId : -util.CommUtils.generateUniqueId(),
				        orderRelType : 14
			        };
			        var itemRelationInfoList = [];
			        itemRelationInfoList.push(handler.buildItemRelationVO(itemRel));
			        var accessProdAcceptInfoVO = handler.buildAccessProdAcceptInfoVO(prodInstVOTemp);
			        dojo.mixin(accessProdAcceptInfoVO, {
				                itemRelationInfoList : itemRelationInfoList
			                });
			        return accessProdAcceptInfoVO;
			        
			        return null;
		        },
		        /**
				 * 构建服务器端对应的itemRelationVO
				 * 
				 * @method
				 */
		        buildItemRelationVO : function(itemRelationVO) {
			        var handler = this;
			        return handler.controller.route("/dataBuilder/beanBuildFactory/getItemRelationVO", itemRelationVO);
		        },
		        buildAccessProdAcceptInfoVO : function(prodAcceptInfo) {
			        var handler = this;
			        return handler.controller.route("/dataBuilder/beanBuildFactory/getAccessProdAcceptInfoVO",
			                prodAcceptInfo);
		        }
	        });
	        
        });