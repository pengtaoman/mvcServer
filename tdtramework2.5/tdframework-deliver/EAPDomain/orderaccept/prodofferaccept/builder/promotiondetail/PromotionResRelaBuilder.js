defineModule("orderaccept.prodofferaccept.builder.promotiondetail.PromotionResRelaBuilder",["../../util",
	"../../widget/resourcecard/ResourceCardWidget","orderaccept.common.js.ConstantsPool"],function(util,ResourceCardWidget,ConstantsPool){
	
	dojo.declare("orderaccept.prodofferaccept.builder.promotiondetail.PromotionResRelaBuilder",[],{
		
		resourceCardWidgetClass : ResourceCardWidget,
		
		constructor : function(args){
			this.loader = args.loader,
			this.promotionDetailWidget = args.promotionDetailWidget,
			this.promotionInfo = args.promotionInfo,
			this.tabContainer = args.tabContainer,
			this.contentPane = args.contentPane,
			this.resourceCardList = [],
			this.resRelaItemList = [],
			this.uniqueid = args.uniqueid,
			this.rowIndex = args.rowIndex;
		},
		
		initPromotionResRela : function(){
			var builder = this,
				loader = builder.loader,
				resourceCardWidgetClass = builder.resourceCardWidgetClass,
				promotionDetailWidget = builder.promotionDetailWidget,
				promotionInfo = builder.promotionInfo,
				tabContainer = builder.tabContainer,
				contentPane = builder.contentPane,
				resourceKindList = builder.getPromotionResKind(promotionInfo),
				ifNewInstall = builder.checkIfNewInstall();
				
			var promotionResList = [];
			var promotionRentResTypeList = [];
			if(promotionInfo.proodOfferInfo.resRelaList && promotionInfo.proodOfferInfo.resRelaList.length>0){
				tabContainer.addChild(contentPane);
			}
			var targetProductFlag = dojo.some(promotionInfo.promotionTargetObjectList||[],function(oneTargetObject){
				return oneTargetObject.targetObjectType == 2;
			});
			
			//是否所有租机类营销资源都配置了具体终端类型
			var ifNotAllResKind = dojo.some(promotionInfo.proodOfferInfo.resRelaList||[],function(oneResRelaInfo){
				return (oneResRelaInfo.mktResCd == util.RES_RELA_CONST.RENT_ACCEPT || oneResRelaInfo.mktResCd == util.RES_RELA_CONST.OTHER_RENT_ACCEPT)
							&& oneResRelaInfo.resourceKind == "-1";
			});
			
			//是否配置了普通终端
			var ifHasOrdinaryRent = dojo.some(promotionInfo.proodOfferInfo.resRelaList||[],function(oneResRelaInfo){
				return oneResRelaInfo.mktResCd == util.RES_RELA_CONST.RENT_ACCEPT;
			});
			if(ifHasOrdinaryRent){
				promotionRentResTypeList.push(util.RES_RELA_CONST.RENT_ACCEPT);
			}
			
			//是否配置了A计划终端
			var ifHasARent = dojo.some(promotionInfo.proodOfferInfo.resRelaList||[],function(oneResRelaInfo){
				return oneResRelaInfo.mktResCd == util.RES_RELA_CONST.OTHER_RENT_ACCEPT;
			});
			if(ifHasARent){
				promotionRentResTypeList.push(util.RES_RELA_CONST.OTHER_RENT_ACCEPT);
			}
			
			//促销配置的所有租机类营销资源(普通终端和A计划终端)
			var promotionRentResList = dojo.filter(promotionInfo.proodOfferInfo.resRelaList||[],function(oneResRelaInfo){
				return oneResRelaInfo.mktResCd == util.RES_RELA_CONST.RENT_ACCEPT || oneResRelaInfo.mktResCd == util.RES_RELA_CONST.OTHER_RENT_ACCEPT;
			});
			
			//促销政策配置的所有补贴卷类营销资源
			var promotionSubsidyResList = dojo.filter(promotionInfo.proodOfferInfo.resRelaList||[],function(oneResRelaInfo){
				return oneResRelaInfo.mktResCd == util.RES_RELA_CONST.SUBSIDY_ACCEPT;
			});
			
			//促销政策配置的所有话费礼券类营销资源
			var promotionGiftResList = dojo.filter(promotionInfo.proodOfferInfo.resRelaList||[],function(oneResRelaInfo){
				return oneResRelaInfo.mktResCd == util.RES_RELA_CONST.GIFT_ACCEPT;
			});
			
			//判断是否存在租机类营销资源
			if(promotionRentResList && promotionRentResList.length>0){//存在则取一个元素进行初始化营销资源卡片
				promotionResList.push(promotionRentResList[0]);
			}
			
			//判断是否存在补贴卷类营销资源
			if(promotionSubsidyResList && promotionSubsidyResList.length>0){//存在则取一个元素进行初始化营销资源卡片
				promotionResList.push(promotionSubsidyResList[0]);
			}
			
			//判断是否存在话费礼券类营销资源
			if(promotionGiftResList && promotionGiftResList.length>0){
				promotionResList.push(promotionGiftResList[0]);
			}
			
			//同类型营销资源只展示一张卡片，不同类型间展示不同的卡片
			dojo.forEach(promotionResList||[],function(oneResRelaInfo){
				if(!oneResRelaInfo || !oneResRelaInfo.mktResCd){
					return;
				}
				var validMonths = "";
//				if(oneResRelaInfo.mktResCd == util.RES_RELA_CONST.OTHER_RENT_ACCEPT){
//					oneResRelaInfo.mktResCd = util.RES_RELA_CONST.RENT_ACCEPT;
//				}
				if(oneResRelaInfo.mktResCd == util.RES_RELA_CONST.GIFT_ACCEPT){//营销资源为话费礼券
					//查询开关表获取礼券有效时长
					var param = "&ServiceKind=-1&apply_event=-1&infoId=225";
					var result = util.ServiceFactory
				                .getService("url:businessAcceptAction.do?method=getCityBusinessParamValue" + param);
				    validMonths = result;
				}
				
				var sysdate = "";
				var months = "";
				var subsidyFee = "";
				//辽宁电信实收价处理
				var realPrice = "";
				var subsidyAmount = "";
				//针对补贴卷促销特殊处理
				if(oneResRelaInfo.mktResCd == util.RES_RELA_CONST.SUBSIDY_ACCEPT){
					sysdate = dojo.global.$appContext$.requestParam.today;
					var param = "&ServiceKind=-1&apply_event=-1&infoId=225";
					var result = util.ServiceFactory.getService("url:businessAcceptAction.do?method=getCityBusinessParamValue" + param);
					months = result?result:"0";
					var promotionItemsPageInfo = promotionDetailWidget.promotionItemsCard.getCardData();
					if(promotionItemsPageInfo){
						for(var p in promotionItemsPageInfo){
							if(p == ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.SUBSIDY_FEE_CD){//补贴金额属性
								subsidyFee = promotionItemsPageInfo[p];
								break;
							}
						}
					}
				}
				
				//获取实收价属性值
				var promotionItemsInfo = promotionDetailWidget.promotionItemsCard.getCardData();//页面属性值集合
//				if(promotionItemsInfo){
//					for(var p in promotionItemsInfo){
//						if(p == ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.REAL_PRICE_CD){//实收价
//							realPrice = promotionItemsInfo[p]?promotionItemsInfo[p]:0;
//							break;
//						}
//					}
//				}
				
				//获取补贴额度属性值
				if(promotionItemsInfo){
					for(var p in promotionItemsInfo){
						if(p == ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.SUBSIDY_AMOUNT_CD){//补贴额度
							subsidyAmount = promotionItemsInfo[p]?promotionItemsInfo[p]:0;
							break;
						}
					}
				}
				
				var initObj = {
					productId : util.RES_RELA_CONST.DEFAULT_PRODUCT,// 产品id
					serviceOfferId : oneResRelaInfo.mktResCd / -1,
					cityCode : loader.requestParam.customerData.cityCode,
					resKindList : resourceKindList,
					//uniqueid : builder.uniqueid,
					//targetProductFlag : targetProductFlag,
					validMonths : validMonths,
					//ifNewInstall : ifNewInstall,
					sysdate : sysdate,
					months : months,
					subsidyFee : subsidyFee,
					promotionRentResTypeList : promotionRentResTypeList,
					ifNotAllResKind : ifNotAllResKind,
					rowIndex : builder.rowIndex,
					subsidyAmount : subsidyAmount,
					realPriceCd : ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.REAL_PRICE_CD,
					promotionType : builder.promotionInfo.promotionType
				};
				var resourceCardWidget = new resourceCardWidgetClass(initObj);
				resourceCardWidget.busCardInstance.addEventListener("onprerequest",function(param){param.$syncCardRequest = true;});
				resourceCardWidget.renderCard(contentPane.domNode, "last");
				builder.resourceCardList.push(resourceCardWidget);
				
				//营销资源信息集合
				var resRelaItemInfo = {
					"promotionInfoVO" : promotionInfo,
					"resRelaInfo" : oneResRelaInfo,
					"itemIndex" : oneResRelaInfo.mktResCd,
					"acceptCardObj" : resourceCardWidget.busCardInstance
				};
				builder.resRelaItemList.push(resRelaItemInfo);
			});
		},
		
		/**
		 * 获取营销资源数据
		 */
		getPageData : function(){
			var builder = this,
				promotionDetailWidget = builder.promotionDetailWidget;
			builder.resRelaDataList = [];
			for(var p in builder.resRelaItemList){
				if(!builder.resRelaItemList.hasOwnProperty(p)){
					continue;
				}
				var resRelaItemVO = builder.resRelaItemList[p];
				var resRelaData = {};
				var resRelaCardData = resRelaItemVO.acceptCardObj.getData();
				if(resRelaCardData == false){
					if(resRelaItemVO && resRelaItemVO.resRelaInfo && (resRelaItemVO.resRelaInfo.mktResCd == util.RES_RELA_CONST.RENT_ACCEPT || resRelaItemVO.resRelaInfo.mktResCd == util.RES_RELA_CONST.OTHER_RENT_ACCEPT)){
						resRelaItemVO.acceptCardObj.$("deviceNo").focus();
					}
					builder.resRelaDataList = [];
					return false;
				}
				resRelaItemVO.resRelaCardData = resRelaCardData;
				resRelaData.mktResCd = resRelaItemVO.resRelaInfo.mktResCd;
				resRelaData.mktResTypeCd = resRelaItemVO.resRelaInfo.mktResTypeCd;
				if(resRelaItemVO.resRelaInfo.mktResCd == util.RES_RELA_CONST.GIFT_ACCEPT){//话费礼券
					resRelaData.mktGiftResInstId = resRelaCardData.mktGiftResInstId && typeof(resRelaCardData.mktGiftResInstId) != "undefined"?resRelaCardData.mktGiftResInstId:"-1";
					resRelaData.giftNo = resRelaCardData.giftNo && typeof(resRelaCardData.giftNo) != "undefined"?resRelaCardData.giftNo:"";
					resRelaData.advancedPayment = resRelaCardData.advancedPayment && typeof(resRelaCardData.advancedPayment) != "undefined"?resRelaCardData.advancedPayment*100:"0";
					resRelaData.advancedEffDate = resRelaCardData.advancedEffDate && typeof(resRelaCardData.advancedEffDate) != "undefined"?resRelaCardData.advancedEffDate:"";
					resRelaData.advancedDays = resRelaCardData.advancedDays && typeof(resRelaCardData.advancedDays) != "undefined"?resRelaCardData.advancedDays:"0";
					var modifyGiftObj = {
						"updateStatus" : "0"
					};
					resRelaData.modifyGiftContent = dojo.toJson(modifyGiftObj);
					
					//构建礼券租机信息
					builder.buildRentInfo(resRelaData,resRelaCardData);
					var modifyObj = {
						"updateStatus" : "0",
						"saleMobilePrice" : resRelaCardData.realFee && typeof(resRelaCardData.realFee) != "undefined" ? (resRelaCardData.realFee/1)*100+"" : "0"
					}
					resRelaData.modifyContent = dojo.toJson(modifyObj);
				}
				if(resRelaItemVO.resRelaInfo.mktResCd == util.RES_RELA_CONST.SUBSIDY_ACCEPT){//补贴卷
					//resRelaData.subsidyNo = resRelaCardData.subsidyNo && typeof(resRelaCardData.subsidyNo) != "undefined"?resRelaCardData.subsidyNo:"-1";
					//resRelaData.verifyNo = resRelaCardData.verifyNo && typeof(resRelaCardData.verifyNo) != "undefined"?resRelaCardData.verifyNo:"";
					resRelaData.subFee = resRelaCardData.subFee && typeof(resRelaCardData.subFee) != "undefined"?resRelaCardData.subFee:"0";
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
				if(resRelaItemVO.resRelaInfo.mktResCd == util.RES_RELA_CONST.RENT_ACCEPT || resRelaItemVO.resRelaInfo.mktResCd == util.RES_RELA_CONST.OTHER_RENT_ACCEPT){//租机
					builder.buildRentInfo(resRelaData,resRelaCardData);
					var modifyObj = {
						"updateStatus" : "0",
						"saleMobilePrice" : resRelaCardData.realFee && typeof(resRelaCardData.realFee) != "undefined" ? (resRelaCardData.realFee/1)*100+"" : "0"
					}
					resRelaData.modifyContent = dojo.toJson(modifyObj);
				}
				builder.resRelaDataList.push(resRelaData);
			}
			return builder.resRelaDataList;
		},
		
		/**
		 * 构建租机信息
		 */
		buildRentInfo : function(resRelaData,resRelaCardData){
			var build = this;
			resRelaData.mktResId = resRelaCardData.mktResId && typeof(resRelaCardData.mktResId) != "undefined"?resRelaCardData.mktResId:"-1";
			resRelaData.mktResInstId = resRelaCardData.mktResInstId && typeof(resRelaCardData.mktResInstId) != "undefined"?resRelaCardData.mktResInstId:"-1";
			resRelaData.deviceNo = resRelaCardData.deviceNo && typeof(resRelaCardData.deviceNo) != "undefined"?build.doTrim(resRelaCardData.deviceNo):"-1";
			resRelaData.moblieSourse = resRelaCardData.moblieSourse && typeof(resRelaCardData.moblieSourse) != "undefined"?resRelaCardData.moblieSourse:"-1";
			resRelaData.resourceKind = resRelaCardData.resourceKind && typeof(resRelaCardData.resourceKind) != "undefined"?resRelaCardData.resourceKind:"-1";
			resRelaData.resourceColour = resRelaCardData.resourceColour && typeof(resRelaCardData.resourceColour) != "undefined"?resRelaCardData.resourceColour:"";
			resRelaData.newoldStatus = resRelaCardData.newoldStatus && typeof(resRelaCardData.newoldStatus) != "undefined"?resRelaCardData.newoldStatus:"";
			resRelaData.rentType = resRelaCardData.rentType && typeof(resRelaCardData.rentType) != "undefined"?resRelaCardData.rentType:"-1";
			resRelaData.mobileAgent = resRelaCardData.mobileAgent && typeof(resRelaCardData.mobileAgent) != "undefined"?resRelaCardData.mobileAgent:"-1";
			resRelaData.costFee = resRelaCardData.costFee && typeof(resRelaCardData.costFee) != "undefined"?resRelaCardData.costFee:"0";
			resRelaData.shouldFee = resRelaCardData.shouldFee && typeof(resRelaCardData.shouldFee) != "undefined"?resRelaCardData.shouldFee*100:"0";
			resRelaData.realFee = resRelaCardData.realFee && typeof(resRelaCardData.realFee) != "undefined"?resRelaCardData.realFee*100:"0";
			resRelaData.custType =  resRelaCardData.custType && typeof(resRelaCardData.custType) != "undefined"?resRelaCardData.custType:"-1";
			resRelaData.rentPrestoreFee = resRelaCardData.rentPrestoreFee && typeof(resRelaCardData.rentPrestoreFee) != "undefined"?resRelaCardData.rentPrestoreFee:"";
			resRelaData.rentDeposit = resRelaCardData.rentDeposit && typeof(resRelaCardData.rentDeposit) != "undefined"?resRelaCardData.rentDeposit:"";
			resRelaData.consumeKind = resRelaCardData.consumeKind && typeof(resRelaCardData.consumeKind) != "undefined"?resRelaCardData.consumeKind:"-1";
			resRelaData.consumeScore = resRelaCardData.consumeScore && typeof(resRelaCardData.consumeScore) != "undefined"?resRelaCardData.consumeScore:"";
			resRelaData.note = resRelaCardData.note && typeof(resRelaCardData.note) != "undefined"?resRelaCardData.note:"";
			//辽宁电信增加客户群
			resRelaData.customerGroup = resRelaCardData.custType && typeof(resRelaCardData.custType) != "undefined"?resRelaCardData.custType:"";
			//增加设备类型
			resRelaData.mobileType = resRelaCardData.moblieType && typeof(resRelaCardData.moblieType) != "undefined"?resRelaCardData.moblieType:"";
			
			//应收价
			resRelaData.suggestFee = resRelaCardData.shouldFee && typeof(resRelaCardData.shouldFee) != "undefined"?resRelaCardData.shouldFee*100:"0";
		},
		
		/**
		 * 获取促销政策租机具体终端型号
		 */
		getPromotionResKind : function(promotionInfo){
			var resRelaList = promotionInfo.proodOfferInfo.resRelaList;
			return dojo.filter(resRelaList||[],function(oneResRela){
				return oneResRela.resourceKind && oneResRela.resourceKind != "-1";
			});
		},
		
		/**
		 * 去处终端串号两端空格
		 */
		doTrim : function(str){
			return /^\s*(.*?)\s*$/.exec(str)[1];
		},
		
		checkIfNewInstall : function(){
			var uniqueid = this.uniqueid;
			var serviceCardId = "serviceCardWidget_" + uniqueid;
			var serviceCardWidget = unieap.byId(serviceCardId);
			if(serviceCardWidget.getModel().cardParam.userId == 0){
				return true;
			}
			return false;
		}
		
	});
});