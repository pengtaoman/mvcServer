/**
 * 此模块放置所有模型数据构建处理逻辑
 * 
 * @module
 */
defineModule("orderaccept.prodofferaccept.data.PromotionChangeDataBuilder", ["../ProductDateBuilder",
                "../util", "../../common/js/ConstantsPool", "orderaccept.common.dialog.MessageBox"], function(ProductDateBuilder, util,
                ConstantsPool,messageBox) {
	        
	        /**
			 * 
			 * @class
			 */
	        dojo.declare("orderaccept.prodofferaccept.data.PromotionChangeDataBuilder", [], {
		        controller : null,
		        promotionInfo : null,
                promotionDetailWidget : null,
                promotionItemsCard : null,
                promotionOperatorCardWidget : null,
		        beanBuildFactory : null,
		        resCardInfo : null,
		        //是否含有协议消费期属性
				isAgreement : false,
				//是否含有划拨月数属性
				isTransferMonth : false,
                constructor : function(controller) {
			        this.controller = controller;
			        this.promotionInfo = controller.promotionInfo;
			        this.promotionDetailWidget = controller.promotionDetailWidget;
			        this.promotionItemsCard = controller.promotionItemsCard;
			        this.promotionOperatorCardWidget = controller.promotionOperatorCardWidget;
			        this.beanBuildFactory = new util.BeanBuildFactoryProvider().getInstance();
			        this.resCardInfo = controller.resCardInfo;
		        },
		        
		        /**
				 * 开始促销政策修改提交数据计算,提交数据的入口方法
				 * @method
				 */
		        process : function() {
			        var r;
			        ConstantsPool.load(["ActionCDConst"]);
			        //this.preProcess();
			        try {
				        r = this.doSalesPromotionInfoComputation();
			        }
			        catch (e) {
				       // alert(e.message);
				        messageBox.alert({
							busiCode : "08410154",
							infoList : [ e.message ]
 	 	 				});
				        throw e;
			        }
			        
			        return r;
			        
		        },
		        /**
				 * 构建服务器端对应的PromotionInfoVO
				 * 
				 * @method
				 */
		        buildPromotionInfoVOBean : function(promotionInfoVO) {
//			        return this.controller.route("/beanBuildFactory/getSalesPromotionVO",
//			                promotionInfoVO);
					return this.beanBuildFactory.getSalesPromotionVO(promotionInfoVO);
		        },
		        
		        /**
				 * 构建服务器端对应的SalesPromotionAcceptInfoVO
				 */
		        buildSalesPromotionAcceptInfo : function(promotionInfoVO) {
			        return this.beanBuildFactory.getSalesPromotionAcceptInfoVO(promotionInfoVO);
		        },
		        
		        /**
				 * 构建服务器端对应的SalesPromotioItemVO
				 * 
				 * @method
				 */
		        buildPromotionItemVOBean : function(salesPromotioItemVO) {
			        return this.beanBuildFactory.getSalesPromotionItemVO(salesPromotioItemVO);
		        },
		        /**
				 * 构建服务器端对应的AttrInfoVO
				 * 
				 * @method
				 */
		        buildAttrInfoVOBean : function(attrInfoVO) {
//			        return this.controller.route("/beanBuildFactory/getAttrInfoVO", attrInfoVO);
					return this.beanBuildFactory.getAttrInfoVO(attrInfoVO);
		        },
		        /**
				 * 构建服务器端对应的PromotionOperatorInfoVO
				 * 
				 * @method
				 */
		        buildPromotionOperatorInfoVOBean : function(promotionOperatorInfoVO) {
//			        return this.controller.route("/beanBuildFactory/getPromotionOperatorInfoVO",
//			        		promotionOperatorInfoVO);
					return this.beanBuildFactory.getPromotionOperatorInfoVO(promotionOperatorInfoVO);
		        },
		        
		        /**
				 * 构建租机临时表vo
				 */
		        buildDeviceRentBusTempVO : function(deviceRentBusTempDataVO) {
			        return this.beanBuildFactory.getDeviceRentBusTempVO(deviceRentBusTempDataVO);
		        },
		        
		        /**
		         * 构建销售品营销资源实例关系OfferResInstRelaVO
		         */
		        buildOfferResInstRelaVO : function(offerResInstRelaDataVO) {
			        return this.beanBuildFactory.getOfferResInstRelaVO(offerResInstRelaDataVO);
		        },
		        
		        /**
				 * 构建补贴卷/礼券临时表vo
				 */
		        buildRentSubsidyTempVO : function(rentSubsidyTempDataVO) {
			        return this.beanBuildFactory.getRentSubsidyTempVO(rentSubsidyTempDataVO);
		        },
		        
		        getAttrInfoVOTemplate : function(operKind, attrCd, attrValue) {
			        return {
				        operKind : operKind,
				        attrCd : attrCd,
				        attrValue : attrValue
			        }
		        },
		        
		        
		        /**
				 * 促销政策提交数据处理
				 */
		        doSalesPromotionInfoComputation : function() {
			        var dataBuilder = this;
			        var flag = dataBuilder.controller.requestParam.flag;
			        var salesPromotionInstVO = dataBuilder.controller.requestParam.salesPromotionInstVO;//变更促销政策实例信息
			        //var salesPromotionVO = null;
			        var salesPromotionAcceptInfoVO = null;
			        var promotionItemList = null;
			        if(flag == "change"){//促销政策实例变更
			        	//salesPromotionVO = dataBuilder.buildPromotionInfoVOBean(dataBuilder.controller.promotionChangeInfo);
//			        	var promotionId = dataBuilder.controller.promotionChangeInfo.promotionId;
//			        	var promotionType = dataBuilder.controller.promotionChangeInfo.promotionType;
//			        	var param = "&promotionId="+promotionId+"&promotionInstId="+salesPromotionInstVO.promotionInstId;
//			        	if(promotionType == "5"){//分月转兑促销
//			        	    var level = "";
//			        		var transferMonthLevel = ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.TRANSFER_MONTH_LEVEL;
//				        	var itemCardData = dataBuilder.controller.promotionChangeItemsCard.getCardData();
//				        	if(itemCardData){
//				        		level = itemCardData[transferMonthLevel]?itemCardData[transferMonthLevel]:0;
//				        	}
//				        	param += "&level="+level;
//			        	}
//			        	var result = util.ServiceFactory.getService("url:promotionChangeAction.do?method=checkPromotionChange" 
//			        		+ param);
//			        	if(result && result.flag == "-1"){
//			        		alert(result.message);
//			        		return false;
//			        	}
			        	salesPromotionAcceptInfoVO = dataBuilder.buildSalesPromotionAcceptInfo(dataBuilder.controller.promotionChangeInfo);
			        	// 处理促销政策明细项信息
			        	promotionItemList = dataBuilder.doSalesPromotionItemsComputation(dataBuilder.controller.promotionChangeInfo,
				        		dataBuilder.controller.promotionChangeItemsCard.getCardData());
			        	//原促销政策信息
			        	var oldSalesPromotionVO = dataBuilder.buildSalesPromotionAcceptInfo(dataBuilder.promotionInfo);
			        	// 原促销政策明细项信息
			        	var oldPromotionItemList = dataBuilder.doSalesPromotionItemsComputation(dataBuilder.promotionInfo,
				        		dataBuilder.promotionItemsCard.getCardData());
			        	oldSalesPromotionVO.promotionItemList = oldPromotionItemList || [];
			        	oldSalesPromotionVO.operKind = 3;//删除
			        	oldSalesPromotionVO.prodOfferInstId = salesPromotionInstVO.promotionInstId;
			        	oldSalesPromotionVO.effDate = salesPromotionInstVO.effDate;//生效时间
			        	salesPromotionAcceptInfoVO.cancelPromotionVO = oldSalesPromotionVO;
			        	salesPromotionAcceptInfoVO.operKind = 1;//新增
			        	salesPromotionAcceptInfoVO.ifOcs = dataBuilder.controller.promotionChangeInfo.ifCos;
			        	
			        	//添加营销资源保存
			        	//补贴卷信息
			        	var resRelaDataList = dataBuilder.getPromotionResRelaData(dataBuilder.controller.promotionResInfoList);
			        	var rentSubsidyTempList = dataBuilder.doPromotionResRelaComputation(resRelaDataList);
			        	salesPromotionAcceptInfoVO.rentSubsidyTempList = rentSubsidyTempList;
			        	
			        	//租机信息
			        	var deviceInfo = dataBuilder.doPromotionDeviceResRelaComputation(salesPromotionInstVO,dataBuilder.controller.promotionChangeInfo);
			        	salesPromotionAcceptInfoVO.deviceRentBusTempList = deviceInfo.deviceRentTempList;
			        	salesPromotionAcceptInfoVO.offerResInstRelaList = deviceInfo.offerResInstRelaList;
			        	
			        	var dateBuilder = util.ProdOfferHelper.getProductDateBuilder(dataBuilder.controller.promotionChangeInfo.proodOfferInfo);
			        	var startDate = dateBuilder.getBeginDate();//开始时间
			        	var endDate = dateBuilder.getEndDate();//结束时间
			        	var agreementAttrCd = ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.AGREEMENT_ATTR_CD;
			        	var transferMonthAttrCd = ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.TRANSFER_MONTH_ATTR_CD;
			        	var cosumeKindCd = ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.CONSUME_KIND_CD;
			        	var transferKindCd = ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.TRANSFER_KIND_CD;
			        	/*			        	//是否存在协议期属性
			        	dataBuilder.isAgreement = dojo.some(dataBuilder.controller.promotionChangeInfo.salesPromotionItemList||[],function(oneItemInfo){
			        		return oneItemInfo.attrSpec.attrCd == agreementAttrCd;
			        	});
			        	//是否存在划拨月数属性
			        	dataBuilder.isTransferMonth = dojo.some(dataBuilder.controller.promotionChangeInfo.salesPromotionItemList||[],function(oneItemInfo){
			        		return oneItemInfo.attrSpec.attrCd == transferMonthAttrCd;
			        	});
			        	var promotionChangeItems = dataBuilder.controller.promotionChangeItemsCard.getCardData();
			        	if(dataBuilder.isAgreement){//存在协议期属性
			        		var months = promotionChangeItems[agreementAttrCd]?promotionChangeItems[agreementAttrCd]:0;
			        		endDate = dataBuilder.changePromotionEndDate(months,startDate);
			        	}
			        	if(dataBuilder.isTransferMonth && !dataBuilder.isAgreement){
			        		var months = promotionChangeItems[transferMonthAttrCd]?promotionChangeItems[transferMonthAttrCd]:0;
			        		endDate = dataBuilder.changePromotionEndDate(months,startDate);
			        	}
			        	*/
			        	
			        	//生效时间和失效时间按照新订的计算规则重新计算
			        	
			        	//促销政策变更时，对于新订购的促销政策，如果是分月转兑且带有补贴卷做一标识
			        	var promotionType = dataBuilder.controller.promotionChangeInfo.promotionType;
			        	if(promotionType == 5){//类型为分月转兑
			        		//分月转兑政策挂的营销资源
				            var resRelaList = dataBuilder.controller.promotionChangeInfo.proodOfferInfo.resRelaList;
				            //判断营销资源中是否存在补贴卷
		                	var ifHasSubsidy = dojo.some(resRelaList||[],function(oneResRela){
		                		return oneResRela.mktResCd == 27;
		                	});
		                	if(ifHasSubsidy){//带有补贴卷营销资源
		                		salesPromotionAcceptInfoVO.ifHasSubsidy = "1";
		                	}
		                	
		                	//分月转兑生效时间为当前时间，失效时间为空
		                	endDate = "";
		                	//状态置为有效
		                	salesPromotionAcceptInfoVO.promotionStatusCd = "1000";
			        	}else if(promotionType == 1|| promotionType == 4 || promotionType == 6){//换租机或者补贴卷-->辽宁电信增加话费补贴类型
			        	
			        		//领导确认-->换政策不计算接续
			        		/*
			        		var ifHasValidPromotion = dataBuilder.getValidPromotion(salesPromotionInstVO.targetObjectInstId,salesPromotionInstVO.promotionId);
			        		if(ifHasValidPromotion){//接续
			        			//失效时间为2037-1-1	
								endDate = "2037-01-01 00:00:00";
								//状态置为预约
								salesPromotionAcceptInfoVO.promotionStatusCd = "1299";
			        		}else{//不存在有效的租机或补贴卷
			        		*/
			        			
		        			var promotionChangeItems = dataBuilder.controller.promotionChangeItemsCard.getCardData();
		        			var consumekindValue = promotionChangeItems[cosumeKindCd]?promotionChangeItems[cosumeKindCd]:"-1";
		        			if(consumekindValue != "-1"){//如果存在消费方式属性
			        			if(consumekindValue == 2){//消费方式为协议消费期
			        			
			        				/* 不区分划拨方式，生效时间都是当前时间
			        				var transferKindValue = promotionChangeItems[transferKindCd]?promotionChangeItems[transferKindCd]:"-1";
			        				if(transferKindValue == 3 || transferKindValue == 4){//当下月划拨时生效时间为下月1号
			        					var beginDate = util.DateHelper.getDateFromString(startDate);
			        					beginDate.setMonth(beginDate.getMonth()+1);
										beginDate.setDate(1);
										beginDate.setHours(0);
										beginDate.setMinutes(0);
										beginDate.setSeconds(0);
										startDate = util.DateHelper.formatDate(beginDate);
			        				}
			        				*/
			        				
			        				//计算失效时间
			        				var months = promotionChangeItems[agreementAttrCd]?promotionChangeItems[agreementAttrCd]:0;
			        				endDate = dataBuilder.changePromotionEndDate(months,startDate);
			        			}else{//非按时间到期的,失效时间为2037-1-1
			        				endDate = "";
			        			}
		        			}else{//不存在租机消费方式属性时，结束时间按默认2037-1-1算
		        				endDate = "";
		        			}
		        			//不存在有效的租机或补贴卷-->状态置为有效
		        			salesPromotionAcceptInfoVO.promotionStatusCd = "1000";
			        		//}
			        	}
			        	salesPromotionAcceptInfoVO.effDate = startDate;
			        	salesPromotionAcceptInfoVO.expDate = endDate;
			        	
			        	//修改租机资源生效时间和失效时间以及销售品实例和营销资源关系生效时间和失效时间，都与新订购政策的生效时间和失效时间保存一致
			        	dojo.forEach(salesPromotionAcceptInfoVO.deviceRentBusTempList||[],function(oneDeviceInfo){
			        		if(oneDeviceInfo.beginDate){
			        			oneDeviceInfo.beginDate = startDate;
			        		}
			        		if(oneDeviceInfo.endDate){
			        			oneDeviceInfo.endDate = endDate;
			        		}
			        	});
			        	
			        	dojo.forEach(salesPromotionAcceptInfoVO.offerResInstRelaList||[],function(oneOfferRes){
			        		if(oneOfferRes.effDate){
			        			oneOfferRes.effDate = startDate;
			        		}
			        		if(oneOfferRes.expDate){
			        			oneOfferRes.expDate = endDate;
			        		}
			        	});
			        }else if(flag == "modify"){//促销政策实例修改
			        	salesPromotionAcceptInfoVO = dataBuilder.buildSalesPromotionAcceptInfo(dataBuilder.promotionInfo);
			        	salesPromotionAcceptInfoVO.operKind = 2;//改属性
			        	salesPromotionAcceptInfoVO.prodOfferInstId = salesPromotionInstVO.promotionInstId;
			        	salesPromotionAcceptInfoVO.effDate = salesPromotionInstVO.effDate;//生效时间
			        	//salesPromotionAcceptInfoVO.expDate = salesPromotionInstVO.expDate;//失效时间
			        	salesPromotionAcceptInfoVO.ifOcs = salesPromotionInstVO.ifOcs;//是否OCS标识
						
						//生效时间及失效时间根据新规则重新计算
						var promotionType = salesPromotionInstVO.promotionType;//促销政策类型
						//var dateBuilder = util.ProdOfferHelper.getProductDateBuilder(dataBuilder.promotionInfo.proodOfferInfo);
						var startDate = dataBuilder.controller.requestParam.today;//dateBuilder.getBeginDate();
						var endDate = "";//dateBuilder.getEndDate();
						if(promotionType == 5){//分月转兑,生效时间为当前时间,失效时间为2037-1-1
							//salesPromotionAcceptInfoVO.effDate = startDate;
							endDate = "";
						}else if(promotionType == 1 || promotionType == 4 || promotionType == 6){//租机或者补贴卷 根据新规则进行计算
							var promotionItems = dataBuilder.promotionItemsCard.getCardData();
							var cosumeKindCd = ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.CONSUME_KIND_CD;
							var transferKindCd = ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.TRANSFER_KIND_CD;
							var agreementAttrCd = ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.AGREEMENT_ATTR_CD;
							var consumekindValue = promotionItems[cosumeKindCd]?promotionItems[cosumeKindCd]:"-1";
							if(consumekindValue != "-1"){//如果存在消费方式属性
								if(consumekindValue == 2){//消费方式为协议消费期
								
									/* 不区分划拨方式，生效时间都是当前时间
									var transferKindValue = promotionItems[transferKindCd]?promotionItems[transferKindCd]:"-1";
									if(transferKindValue == 3 || transferKindValue == 4){//当下月划拨时生效时间为下月1号
										var beginDate = util.DateHelper.getDateFromString(startDate);
										beginDate.setMonth(beginDate.getMonth()+1);
										beginDate.setDate(1);
										beginDate.setHours(0);
										beginDate.setMinutes(0);
										beginDate.setSeconds(0);
										startDate = util.DateHelper.formatDate(beginDate);
										//salesPromotionAcceptInfoVO.effDate = startDate;
									}
									*/
									
									//计算失效时间
									var months = promotionItems[agreementAttrCd]?promotionItems[agreementAttrCd]:0;
									endDate = dataBuilder.changePromotionEndDate(months,salesPromotionInstVO.effDate);
								}else{//非按时间到期的,失效时间为2037-1-1
									endDate = "";
								}
							}else{//不存在租机消费方式属性时，结束时间按默认2037-1-1算
								endDate = "";
							}
						}
			        	//辽宁电信开始时间不变s
			        	//salesPromotionAcceptInfoVO.effDate = startDate;
			        	salesPromotionAcceptInfoVO.expDate = endDate;
			        	
			        	//标识修改后政策的状态为有效
			        	salesPromotionAcceptInfoVO.promotionStatusCd = "1000";
			        	
			        	//协议有效期及促销结束时间处理
			        	//var retData = dataBuilder.dealValidAgreements();
			        	///if(retData){//存在差值
			        		//var expDate = dataBuilder.changePromotionEndDate(retData,salesPromotionInstVO.expDate);
			        		//salesPromotionAcceptInfoVO.expDate = expDate;
			        	//}
			        	
			        	// 处理促销政策明细项信息
			        	promotionItemList = dataBuilder.doSalesPromotionItemsComputation(dataBuilder.promotionInfo,
				        		dataBuilder.promotionItemsCard.getCardData());
				        		
				        //判断促销政策属性是否进行了修改，如果修改则需要判断是否跨月
				        if(promotionItemList.length>0){//促销政策属性产生了变化
				        	var sysdate = dataBuilder.controller.requestParam.today;//当前时间
				        	var creDate = salesPromotionInstVO.createDate;//创建时间
				        	if(!dataBuilder.doCheckIfCanChg(sysdate,util.DateHelper.getDateFromString(creDate))){
				        		alert("促销政策属性跨月不能修改");
				        		return false;
				        	}
				        }
				        		
				        /*修改后实收价
				        var realPriceObj = dataBuilder.resCardInfo?dataBuilder.resCardInfo.$("realPrice"):null;
				        var spreadPrice = "";
				        if(realPriceObj){
				        	var tagName = realPriceObj.tagName.toUpperCase();
				        	
				        	var realPrice = tagName=='INPUT'? (realPriceObj.value?realPriceObj.value:0):(realPriceObj.innerText?realPriceObj.innerText:0);
				        	var oldRealPrice = salesPromotionInstVO.deviceRentInfoVO.realPrice?salesPromotionInstVO.deviceRentInfoVO.realPrice/100:0;
				        	spreadPrice = eval(realPrice-oldRealPrice);
				        }
				        **/
				        
				        //辽宁电信修改租机实收价从属性获取
				        var realPriceCd = ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.REAL_PRICE_CD;
				        var spreadPrice = "";
				        var realPriceItemOjb = dojo.filter(promotionItemList||[],function(oneItem){
				        	return oneItem.attrSpec.attrCd == realPriceCd;
				        })[0];
				        if(realPriceItemOjb){
				        	var realPrice = realPriceItemOjb.attrSpec.attrValue/100;
				        	var oldRealPrice = salesPromotionInstVO.deviceRentInfoVO.realPrice?salesPromotionInstVO.deviceRentInfoVO.realPrice/100:0;
				        	spreadPrice = eval(realPrice-oldRealPrice);
				        }
				        
				        //修改后备注信息
				        var nodeObj = dataBuilder.resCardInfo?dataBuilder.resCardInfo.$("note"):null;
				        var nodeValue = "";
				        if(nodeObj){
				        	var tagName = nodeObj.tagName.toUpperCase();
				        	var nodeValue = tagName=='INPUT'? (nodeObj.value?nodeObj.value:""):(nodeObj.innerText?nodeObj.innerText:"");
				        }
				        var instNodeValue = salesPromotionInstVO.deviceRentInfoVO?salesPromotionInstVO.deviceRentInfoVO.note:"";
				        //实收价、备注信息、有效期发生变化时，处理营销资源信息
				        //if(spreadPrice != "" || nodeValue != instNodeValue){
			        	var promotionResInfo = dataBuilder.doPromotionResComputation(salesPromotionInstVO,spreadPrice,realPriceItemOjb,nodeValue);
			        	//修改营销资源开始时间和结束时间
			        	dojo.forEach(promotionResInfo.deviceRentBusTempList||[],function(oneDeviceInfo){
			        		if(oneDeviceInfo.beginDate){
			        			oneDeviceInfo.beginDate = salesPromotionAcceptInfoVO.effDate;
			        		}
			        		
			        		if(oneDeviceInfo.endDate){
			        			oneDeviceInfo.endDate = salesPromotionAcceptInfoVO.expDate;
			        		}
			        		
			        		oneDeviceInfo.rentKind = dataBuilder.resCardInfo?dataBuilder.resCardInfo.$("rentKind").value:"-1";//租用方式
			        		oneDeviceInfo.userSource = dataBuilder.resCardInfo.value?dataBuilder.resCardInfo.$("userSource").value:"-1";//终端类型
			        	});
			       	 	salesPromotionAcceptInfoVO.deviceRentBusTempList = promotionResInfo.deviceRentBusTempList;
				        //}
				        
				        //补贴券结束时间修改处理 beg
				        dojo.forEach(promotionResInfo.rentSubsidyTempList||[],function(oneRentInfo){
					        if(oneRentInfo.endDate){
					        	oneRentInfo.endDate = dataBuilder.resCardInfo?dataBuilder.resCardInfo.$("endDateDesc").value:"";
					        }
				        	
				        });
				        salesPromotionAcceptInfoVO.rentSubsidyTempList = promotionResInfo.rentSubsidyTempList;
				        //补贴券结束时间修改处理 end
				        
				        //修改后租机预交款
				        var rentFeeAttrCd = ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.RENT_FEE_ATTR_CD;
				        var rentFeeFlag = dojo.some(promotionItemList||[],function(oneItem){
				        	return oneItem.attrSpec.attrCd == rentFeeAttrCd;
				        });
				        var spreadRentFee = "";
				        if(rentFeeFlag){
				        	var realFee = "0";
				        	var oldFee = "0";
				        	var promotionItemPageInfo = dataBuilder.promotionItemsCard.getCardData();
				        	for(var attrCd in promotionItemPageInfo){
				        		if(attrCd && attrCd == rentFeeAttrCd){
				        			realFee = promotionItemPageInfo[attrCd]?promotionItemPageInfo[attrCd]:0;
				        			break;
				        		}
				        	}
				        	var salesPromotionChangeItemList = dataBuilder.promotionInfo.salesPromotionChangeItemList;
				        	var rentFeeItemObj = dojo.filter(salesPromotionChangeItemList||[],function(oneItem){
				        		return oneItem.itemAttrId == rentFeeAttrCd;
				        	})[0];
				        	var oldFee = rentFeeItemObj && rentFeeItemObj.attrValue?rentFeeItemObj.attrValue/100:0;
				        	spreadRentFee = eval(realFee-oldFee);
				        }
				        dojo.mixin(salesPromotionAcceptInfoVO,{spreadRentFee:spreadRentFee});
				        //礼券和补贴卷不写临时表
				        //salesPromotionAcceptInfoVO.rentSubsidyTempList = promotionResInfo.rentSubsidyTempList;
				        
			        }else{//退订
			        	salesPromotionAcceptInfoVO = dataBuilder.buildSalesPromotionAcceptInfo(dataBuilder.promotionInfo);
			        	salesPromotionAcceptInfoVO.operKind = 3;//删除
			        	salesPromotionAcceptInfoVO.prodOfferInstId = salesPromotionInstVO.promotionInstId;
			        	salesPromotionAcceptInfoVO.effDate = salesPromotionInstVO.effDate;//生效时间
			        	
			        	var capitalSumCD = ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.CAPITAL_SUM;
			        	// 处理促销政策明细项信息
			        	promotionItemList = dataBuilder.doSalesPromotionItemsComputation(dataBuilder.promotionInfo,
				        		dataBuilder.promotionItemsCard.getCardData());
				       	var capitalFlag = dojo.some(promotionItemList||[],function(oneItem){
				       		return oneItem.attrSpec.attrCd == capitalSumCD;
				       	});
				       	var capitalCount = "0";
				       	var rentFee = "0";//手机费
				       	/** 本金总额余额调用账务接口获取
				       	if(capitalFlag){//存在本金总额属性
				       		var capitalSum = "";
				       		var promotionItemPageInfo = dataBuilder.promotionItemsCard.getCardData();
				       		for(var attrCd in promotionItemPageInfo){
				       			if(attrCd && attrCd == capitalSumCD){
				       				capitalSum = promotionItemPageInfo[attrCd]?promotionItemPageInfo[attrCd]:0;
				       				break;
				       			}
				       		}
				       		capitalCount = eval(0-capitalSum);
				       	}
				       	*/
				       	var para = "&promotionInstId="+salesPromotionInstVO.promotionInstId+"&cityCode="+salesPromotionInstVO.cityCode;
				       	var promotionType = salesPromotionInstVO.promotionType;//促销政策类型
				       	var typeConst = ConstantsPool.load("PromotionTypeConst").PromotionTypeConst;//促销类型常量类
				       	if(promotionType == typeConst.DEVICE_RENT || promotionType == typeConst.TELCHARGE_COUPON){//租机或话费补贴
				       		var deviceInfo = salesPromotionInstVO.deviceRentInfoVO;//租机信息
							para += "&deviceNo="+(deviceInfo?deviceInfo.deviceNo:"")+"&beginDate="+(deviceInfo?deviceInfo.beginDate:"");
							var realPrice = "0";
							if(deviceInfo.realPrice){
								realPrice = deviceInfo.realPrice/100;
							}
							rentFee = eval(0-realPrice);
							dojo.mixin(salesPromotionAcceptInfoVO,{rentFee:rentFee});
				       	}else if(promotionType == typeConst.SUBSIDY_PROMOTION){//补贴卷
				       		var rentSubsidyInfo = salesPromotionInstVO.bbRentSubsidyInfoVO;//补贴卷信息
				       		para += "&deviceNo="+salesPromotionInstVO.promotionInstId+"&beginDate="+salesPromotionInstVO.effDate;//(rentSubsidyInfo?rentSubsidyInfo.beginDate:"");
				       	}
				       	var retValue = util.ServiceFactory.getService("url:promotionChangeAction.do?method=getLeftFeeFromBill" + para);
				       	if(retValue){
				       		capitalCount = eval(0-retValue);
				       	}else{
				       		capitalCount = "0";
				       	}
				       	dojo.mixin(salesPromotionAcceptInfoVO,{capitalCount:capitalCount});
			        }
			        salesPromotionAcceptInfoVO.promotionItemList = promotionItemList || [];
			        //处理经办人信息
//			        var promotionOperatorInfoVO = dataBuilder.buildPromotionOperatorInfoVOBean(dataBuilder.
//			        		promotionOperatorCardWidget.getPageData());
			        //salesPromotionVO.promotionOperatorInfoVO = promotionOperatorInfoVO;
			        if(salesPromotionInstVO){
			        	salesPromotionAcceptInfoVO.targetObjectType = salesPromotionInstVO.targetObjectType
			        	salesPromotionAcceptInfoVO.targetObjectInstId = salesPromotionInstVO.targetObjectInstId;
			        }
			        return salesPromotionAcceptInfoVO;
		        },
		        
		        /**
		         * 判断是否跨月
		         */
		        doCheckIfCanChg : function(sysdate,effDate){
		        	var dateArr = sysdate.split(" ");
					var dateYMD = dateArr[0].split("-");
					var year = parseInt(dateYMD[0], 10);
					var month = parseInt(dateYMD[1], 10);
					if(effDate.getFullYear()<year){
						return false;
					}else{
						var effMonth = effDate.getMonth() + 1;
						if(effMonth<month){
							return false;
						}
					}
					return true;
		        },
		        
		        /**
		         * 根据促销政策属性计算结束时间
		         * @param months(促销政策属性值)
		         * @param startDate(促销政策开始时间)
		         */
		        changePromotionEndDate : function(months,startDate){
		        	var date = util.DateHelper.getDateFromString(startDate);
		        	date.setMonth(date.getMonth()+parseInt(months));
		        	var endDate = util.DateHelper.formatDate(date);
		        	return endDate;
		        },
		        
				getValidPromotion : function(userId,promotionId){
					var param = "&userId="+userId+"&operType=change"+"&promotionId="+promotionId;
					var result = util.ServiceFactory.getService("url:businessAcceptAction.do?method=getPromotionInvalidDate" + param);
					if(result && result == 1){//存在与原促销不同的其他租机或补贴卷政策-->接续
						return true;
					}
					return false;
				},		        
		        
		        /**
		         * 获取变更后促销政策营销资源数据
		         */
		        getPromotionResRelaData : function(promotionResInfoList){
		        	var resRelaDataList = [];
		        	if(promotionResInfoList && promotionResInfoList.length>0){
		        		for(var p in promotionResInfoList){
		        			if(!promotionResInfoList.hasOwnProperty(p)){
								continue;
							}
							var resRelaItemVO = promotionResInfoList[p];
							var resRelaData = {};
							var resRelaCardData = resRelaItemVO.acceptCardObj.getData();
							if(resRelaCardData == false){
								resRelaDataList = [];
								return false;
							}
							resRelaData.mktResCd = resRelaItemVO.resRelaInfo.mktResCd;
							resRelaData.mktResTypeCd = resRelaItemVO.resRelaInfo.mktResTypeCd;
							if(resRelaItemVO.resRelaInfo.mktResCd == util.RES_RELA_CONST.SUBSIDY_ACCEPT){//补贴卷
								resRelaData.subFee = resRelaCardData.subFee && typeof(resRelaCardData.subFee) != "undefined"?(resRelaCardData.subFee/1)*100:"0";
								resRelaData.mktResId = resRelaCardData.mktResId && typeof(resRelaCardData.mktResId) != "undefined"?resRelaCardData.mktResId:"-1";
								resRelaData.mktResInstId = resRelaCardData.mktResInstId && typeof(resRelaCardData.mktResInstId) != "undefined"?resRelaCardData.mktResInstId:"-1";
								resRelaData.advancedEffDate = resRelaCardData.advancedEffDate && typeof(resRelaCardData.advancedEffDate) != "undefined"?resRelaCardData.advancedEffDate:"";
								resRelaData.advancedDays = resRelaCardData.advancedDays && typeof(resRelaCardData.advancedDays) != "undefined"?resRelaCardData.advancedDays:"0";
								var modifyObj = {
									"operKind" : 0,
									"cardKind" : 1,
									"cardValue" : resRelaCardData.subFee && typeof(resRelaCardData.subFee) != "undefined" ? (resRelaCardData.subFee/1)*100+"" : "0"
								};				
								resRelaData.modifyContent = dojo.toJson(modifyObj);
							}
							resRelaDataList.push(resRelaData);
		        		}
		        	}
		        	return resRelaDataList;
		        },
		        
		        /**
		         * 构建促销营销资源
		         */
		        doPromotionResRelaComputation : function(resRelaDataList){
		        	var dataBuilder = this;
					var rentSubsidyTempList = [];
					var rentSubsidyTempDataVO = {};
					var rentSubsidyTempVO = null;
					dojo.forEach(resRelaDataList||[],function(oneResRelaInfo){
						if(oneResRelaInfo.mktResCd && oneResRelaInfo.mktResCd == util.RES_RELA_CONST.SUBSIDY_ACCEPT) {// 营销资源类型为补贴卷
							rentSubsidyTempDataVO.buildDate = oneResRelaInfo.advancedEffDate;
					        rentSubsidyTempDataVO.beginDate = oneResRelaInfo.advancedEffDate;
					        var startDate = util.DateHelper.getDateFromString(oneResRelaInfo.advancedEffDate);
					        var advancedDays = oneResRelaInfo.advancedDays
					                && typeof(oneResRelaInfo.advancedDays) != "undefined"
					                ? parseInt(oneResRelaInfo.advancedDays)
					                : 0;
					        startDate.setMonth(startDate.getMonth() + advancedDays);
					        var endDate = util.DateHelper.formatDate(startDate);
					        rentSubsidyTempDataVO.endDate = endDate;
					        rentSubsidyTempDataVO.subsidyFee = oneResRelaInfo.subFee
					                && typeof(oneResRelaInfo.subFee) != "undefined" ? oneResRelaInfo.subFee : 0;
					        rentSubsidyTempVO = dataBuilder.buildRentSubsidyTempVO(rentSubsidyTempDataVO);
					        rentSubsidyTempList.push(rentSubsidyTempVO);
						}
					});		
					return rentSubsidyTempList;     	
		        },
		        
		        /**
		         * 构建租机资源数据
		         */
		        doPromotionDeviceResRelaComputation : function(salesPromotionInstVO,promotionInfo){
		        	var dataBuilder = this;
		        	var resRelaList = promotionInfo.proodOfferInfo.resRelaList;//规格数据营销资源
		        	var offerResInstRelaList1 = salesPromotionInstVO.offerResInstRelaList;//销售品实例与营销资源关系
		        	var deviceRentInfoVO = salesPromotionInstVO.deviceRentInfoVO;//原促销政策租机实例数据
		        	var deviceRentTempList = [];
		        	var deviceRentBusTempDataVO = {};
		        	var deviceRentBusTempVO = null;
		        	
		        	var offerResInstRelaDataVO = {};
		        	var offerResInstRelaList = [];
		        	var offerResInstRelaVO = null;
		        	if(deviceRentInfoVO){
//		        		deviceRentBusTempDataVO.userId = deviceRentInfoVO.userId;
		        		deviceRentBusTempDataVO.serviceFavourId = deviceRentInfoVO.serviceFavourId;
//		        		deviceRentBusTempDataVO.sourceId = deviceRentInfoVO.sourceId;
		        		deviceRentBusTempDataVO.mobileAgent = deviceRentInfoVO.mobileAgent;
		        		deviceRentBusTempDataVO.feeDivide = deviceRentInfoVO.feeDivide;
		        		deviceRentBusTempDataVO.manufacturer = deviceRentInfoVO.manufacturer;
		        		deviceRentBusTempDataVO.deviceType = deviceRentInfoVO.deviceType;
		        		deviceRentBusTempDataVO.deviceNo = deviceRentInfoVO.deviceNo;
		        		deviceRentBusTempDataVO.realPrice = deviceRentInfoVO.realPrice;
		        		deviceRentBusTempDataVO.costPrice = deviceRentInfoVO.costPrice;
		        		deviceRentBusTempDataVO.saleCostPrice = deviceRentInfoVO.saleCostPrice;
		        		deviceRentBusTempDataVO.retailPrice = deviceRentInfoVO.retailPrice;
		        		deviceRentBusTempDataVO.rentKind = deviceRentInfoVO.rentKind;
		        		deviceRentBusTempDataVO.attachKind = deviceRentInfoVO.attachKind;
		        		deviceRentBusTempDataVO.ifValid = deviceRentInfoVO.ifValid;
		        		deviceRentBusTempDataVO.ifUse = deviceRentInfoVO.ifUse;
		        		deviceRentBusTempDataVO.beginDate = deviceRentInfoVO.beginDate;
		        		deviceRentBusTempDataVO.endDate = deviceRentInfoVO.endDate;
		        		deviceRentBusTempDataVO.devColor = deviceRentInfoVO.devColor;
		        		deviceRentBusTempDataVO.note = deviceRentInfoVO.note;
		        		//辽宁电信增加客户群
		        		deviceRentBusTempDataVO.customerGroup = deviceRentInfoVO.custComunity;
		        		deviceRentBusTempVO = dataBuilder.buildDeviceRentBusTempVO(deviceRentBusTempDataVO);
		        		deviceRentTempList.push(deviceRentBusTempVO);
		        	}
		        	
		        	if((promotionInfo.promotionType == '1' || promotionInfo.promotionType == '6') && resRelaList && resRelaList.length>0){//租机-->辽宁电信增加话费补贴类型
		        		var oneRelaVO = resRelaList[0];
		        		offerResInstRelaDataVO.mktResCd = oneRelaVO.mktResCd;
		        		offerResInstRelaDataVO.mktResTypeCd = offerResInstRelaList1 && offerResInstRelaList1.length>0?offerResInstRelaList1[0].mktResTypeCd:0;
		        		offerResInstRelaDataVO.mktResInstId = offerResInstRelaList1 && offerResInstRelaList1.length>0?offerResInstRelaList1[0].mktResInstId:0;
		        		offerResInstRelaDataVO.effDate = offerResInstRelaList1 && offerResInstRelaList1.length>0?offerResInstRelaList1[0].effDate:"";
		        		offerResInstRelaDataVO.expDate = offerResInstRelaList1 && offerResInstRelaList1.length>0?offerResInstRelaList1[0].expDate:"";
		        		offerResInstRelaVO = dataBuilder.buildOfferResInstRelaVO(offerResInstRelaDataVO);
		        		offerResInstRelaList.push(offerResInstRelaVO);
		        	}
		        	return {
		        		deviceRentTempList : deviceRentTempList,
		        		offerResInstRelaList : offerResInstRelaList
		        	};
		        },
		        
		        /**
		         * 协议有效期变化及促销结束时间处理
		         */
		        dealValidAgreements : function(){
		        	var builder = this;
		        	var returnData = "";
		        	var validAgreementAttrCd = ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.AGREEMENT_ATTR_CD;//协议有效期属性cd
		        	var salesPromotionItemInstList = builder.promotionInfo.salesPromotionChangeItemList;//原促销属性实例数据
		        	var validMonthAttr = dojo.filter(salesPromotionItemInstList||[],function(oneItemInst){
		        		return oneItemInst.itemAttrId == validAgreementAttrCd;
		        	});
		        	var validMonths = validMonthAttr.length>0?validMonthAttr[0].attrValue:"";//原促销协议有效期实例数据
		        	
		        	var itemPageInfo = builder.promotionItemsCard.getCardData();//获取修改后促销属性页面数据
		        	var newValidMonths = itemPageInfo[validAgreementAttrCd]?itemPageInfo[validAgreementAttrCd]:"";
		        	
		        	if(validMonths && newValidMonths){
		        		try{
		        			returnData = eval(newValidMonths-validMonths);
		        		}catch(e){
		        			returnData = "";
		        		}
		        	}
		        	return returnData;
		        },
		        
		        /**
				 * 构建促销政策明细项属性
				 */
		        doSalesPromotionItemsComputation : function(promotionInfo, promotionPageInfo) {
		        	var salesPromotionChangeItemList = promotionInfo.salesPromotionChangeItemList;
			        var attrList = dojo.map(promotionInfo.salesPromotionItemList || [], function(
			                        promotionItemVO) {
				                return promotionItemVO.attrSpec;
			                });
			        var promotionItemVOList = [];
			        var getAttrVO = function(attrCd) {
				        return BusCard.find(attrList, function(attrVO) {
					                return attrVO.attrCd == attrCd;
				                })
			        };
			        if (promotionPageInfo) {
				        for (var attrCd in promotionPageInfo) {
				        	var flag = false;
					        var value = promotionPageInfo[attrCd];
					        var attrVO = getAttrVO(attrCd);
					        if(attrVO.isFeeAttr == 1){//费用属性
					        	if((attrVO.valueUnit == "D12" || attrVO.valueUnit == "D8") && value != 0){//以分为单位
					        		value = value?value*100:0;//元转分
					        	}
					        }
					        if(this.controller.requestParam.flag == "modify"){
					        	flag = dojo.some(salesPromotionChangeItemList||[],function(oneItemInst){
					        		return oneItemInst.itemAttrId == attrCd && oneItemInst.attrValue == value;
					        	});
					        }
					        if(!flag){
					        	//判断属性是否展示
					        	var ifVisible = dojo.some(promotionInfo.salesPromotionItemList||[],function(oneItem){
					        		return oneItem.itemAttrId == attrCd && oneItem.ifVisible == 1;
					        	});
						        if (attrVO && value && ifVisible) {
							        var attrInfoVO = this.buildAttrInfoVOBean(dojo.mixin(this
							                        .getAttrInfoVOTemplate(2, attrCd, value)));
							        var item = dojo.filter(promotionInfo.salesPromotionItemList||[],function(oneItem){
							        	return oneItem.attrSpec.attrCd == attrCd;
							        })[0];
							        
							        var itemInst = dojo.filter(salesPromotionChangeItemList||[],function(oneItemInst){
							        	return oneItemInst.itemAttrId == attrCd;
							        })[0];
							        
									var promotionItemVO = this.buildPromotionItemVOBean(item);
							        promotionItemVO.attrSpec = attrInfoVO;
							        promotionItemVO.itemInstId = itemInst && itemInst.itemInstId?itemInst.itemInstId:"";
							        promotionItemVO.operKind = itemInst && itemInst.itemInstId?2:1;//存在实例数据则operKind=2,不存在则设置operKind=1
							        promotionItemVOList.push(promotionItemVO);
						        }
					        }
				        }
			        }
			        return promotionItemVOList;
		        },
		        
		        /**
		         * 营销资源处理
		         */
		        doPromotionResComputation : function(salesPromotionInstVO,spreadPrice,realPriceItemOjb,nodeValue){
		        	var dataBuilder = this;
		        	//租机信息
		        	var deviceRentInfoVO = salesPromotionInstVO.deviceRentInfoVO;
		        	//补贴卷/礼券信息
		        	var bbRentSubsidyInfoVO = salesPromotionInstVO.bbRentSubsidyInfoVO;
		        	//租机信息临时表vo
		        	var deviceRentBusTempVO = null;
		        	var deviceRentBusTempDataVO = {};
		        	//补贴卷/礼券临时表vo
		        	var rentSubsidyTempVO = null;
		        	var rentSubsidyTempDataVO = {};
		        	//租机信息集合
		        	var deviceRentBusTempList = [];
		        	//补贴卷/礼券信息集合
		        	var rentSubsidyTempList = [];
		        	
		        	//修改后的手机实收价
		        	var realPrice = "";
		        	if(spreadPrice!=""){
		        		//var tagName = realPriceObj.tagName.toUpperCase();
		        		//realPrice = tagName=='INPUT'? (realPriceObj.value?realPriceObj.value:""):(realPriceObj.innerText?realPriceObj.innerText:"");
		        		if(realPriceItemOjb){
							realPrice = realPriceItemOjb.attrSpec.attrValue;		        		
		        		}
		        	}
		        	
		        	//有效期修改时间计算
		        	var deviceExpDate = "";
		        	//if(deviceRentInfoVO && retData){
		        		//deviceExpDate = dataBuilder.changePromotionEndDate(retData,deviceRentInfoVO.endDate);
		        	//}
		        	if(deviceRentInfoVO){//变更促销政策实例存在租机信息
		        		deviceRentBusTempDataVO.userId = deviceRentInfoVO.userId;
		        		deviceRentBusTempDataVO.serviceFavourId = deviceRentInfoVO.serviceFavourId;
		        		deviceRentBusTempDataVO.promotionInstId = deviceRentInfoVO.promotionInstId;
		        		deviceRentBusTempDataVO.sourceId = deviceRentInfoVO.sourceId;
		        		deviceRentBusTempDataVO.promotionId = deviceRentInfoVO.promotionId;
		        		deviceRentBusTempDataVO.mobileAgent = deviceRentInfoVO.mobileAgent;
		        		deviceRentBusTempDataVO.feeDivide = deviceRentInfoVO.feeDivide;
		        		deviceRentBusTempDataVO.manufacturer = deviceRentInfoVO.manufacturer;
		        		deviceRentBusTempDataVO.deviceType = deviceRentInfoVO.deviceType;
		        		deviceRentBusTempDataVO.deviceNo = deviceRentInfoVO.deviceNo;
		        		deviceRentBusTempDataVO.realPrice = realPrice != ""?realPrice*100:deviceRentInfoVO.realPrice;
		        		deviceRentBusTempDataVO.costPrice = deviceRentInfoVO.costPrice;
		        		deviceRentBusTempDataVO.saleCostPrice = deviceRentInfoVO.saleCostPrice;
		        		deviceRentBusTempDataVO.retailPrice = deviceRentInfoVO.retailPrice;
		        		deviceRentBusTempDataVO.rentKind = deviceRentInfoVO.rentKind;
		        		deviceRentBusTempDataVO.attachKind = deviceRentInfoVO.attachKind;
		        		deviceRentBusTempDataVO.ifValid = deviceRentInfoVO.ifValid;
		        		deviceRentBusTempDataVO.ifUse = deviceRentInfoVO.ifUse;
		        		deviceRentBusTempDataVO.beginDate = deviceRentInfoVO.beginDate;
		        		deviceRentBusTempDataVO.endDate = deviceExpDate?deviceExpDate:deviceRentInfoVO.endDate;
		        		deviceRentBusTempDataVO.devColor = deviceRentInfoVO.devColor;
		        		deviceRentBusTempDataVO.note = nodeValue;
		        		deviceRentBusTempDataVO.spreadPrice = spreadPrice;
		        		//辽宁电信增加客户群
		        		deviceRentBusTempDataVO.customerGroup = deviceRentInfoVO.custComunity;
		        		deviceRentBusTempVO = dataBuilder.buildDeviceRentBusTempVO(deviceRentBusTempDataVO);
		        		deviceRentBusTempList.push(deviceRentBusTempVO);
		        	}
		        	if(bbRentSubsidyInfoVO){//变更促销政策实例存在补贴卷/礼券信息
		        		rentSubsidyTempDataVO.listNo = bbRentSubsidyInfoVO.listNo;
		        		rentSubsidyTempDataVO.flowNo = bbRentSubsidyInfoVO.flowNo;
		        		rentSubsidyTempDataVO.promotionInstId = bbRentSubsidyInfoVO.promotionInstId;
		        		rentSubsidyTempDataVO.userId = bbRentSubsidyInfoVO.userId;
		        		rentSubsidyTempDataVO.endDate = bbRentSubsidyInfoVO.endDate;
		        		rentSubsidyTempDataVO.serviceId = bbRentSubsidyInfoVO.serviceId;
		        		rentSubsidyTempDataVO.promotionId = bbRentSubsidyInfoVO.promotionId;
		        		rentSubsidyTempVO = dataBuilder.buildRentSubsidyTempVO(rentSubsidyTempDataVO);
		        		rentSubsidyTempList.push(rentSubsidyTempVO);
		        	}
		        	return {
		        		deviceRentBusTempList : deviceRentBusTempList,
		        		rentSubsidyTempList : rentSubsidyTempList
		        	};
		        }
	        });
        });