defineModule("orderaccept.prodofferaccept.builder.promotiondetail.PromotionDetailBuilder",[
				"../../util",
				"../../../base/Controller",
				"../../../custom/TooltipDialog","../../widget/attrcard/PromotionItemsCardWidget",
				"./PromotionResRelaBuilder","../prodofferdetail/ProdOfferAssureBuilder","./PromotionAssureBuilder","orderaccept.common.js.ConstantsPool"],
				function(util,controller,TooltipDialog,promotionItemsCardWidget,PromotionResRelaBuilder,ProdOfferAssureBuilder,PromotionAssureBuilder,ConstantsPool){
	/**
	 * 促销政策详细信息页面构造器
	 */
	dojo.declare("orderaccept.prodofferaccept.builder.promotiondetail.PromotionDetailBuilder",[],{
		
		promotionItemsWidgetClass : promotionItemsCardWidget,
		/**
		 * 促销政策详细信息页面widget集合
		 */
		prodOfferDetailWidgetList : [],
		
//		transferMonthAttrCd : ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.TRANSFER_MONTH_ATTR_CD,
		
		agreementAttrCd : ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.AGREEMENT_ATTR_CD,
		
		//协议月数
		//agreementMonths : ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.AGREEMENT_MONTH_CD,
		
		//赠送月数(预存)
		//giftMonths : ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.GIFT_MONTH_CD,
		
		//赠送月数(话费)
		//anotherGiftMonths : ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.ANOTHER_GIFT_MONTH_CD,
		
		//补贴金额属性cd
		subsidyFee : ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.SUBSIDY_FEE_CD,
		
		//补贴额度
		subsidyAmontCD : ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.SUBSIDY_AMOUNT_CD,
		
		//手机实收价
		realPriceCD : ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.REAL_PRICE_CD,
		
		//是否含有划拨月数属性
		//isTransferMonth : false,
		
		//是否含有协议消费期属性
		isAgreement : false,
		//是否含有协议月数
		isAgreementMonths : false,
		//是否包含赠送月数（预存）
		isGiftMonths : false,
		//是否包含赠送月数（话费）
		isAnotherGiftMonths : false,
		rowIndex : null,
		
		/**
		 * 构造函数
		 */
		constructor : function(loader){
			this.loader = loader;
		},
		
		/**
		 * 初始化促销政策详细信息页面
		 */
		initPromotionDetail : function(rowIndex){
			var builder = this,
				loader = this.loader,
//				binding = loader.salesPromotionOrderGrid.getBinding(),
//				rowData = binding.getRow(rowIndex),
				rowData = loader.salesPromotionOrderGrid.ds.getRawData()[rowIndex],
				promotionInfo = rowData.showData.promotionInfo,
				promotionStyle = rowData.showData.promotionStyle,
				promotionInstInfo = rowData.showData.promotionInstInfo,
				promotionDetailWidget = new TooltipDialog({
					id : "promotionDetail-" + rowIndex
				});
			//this.rowIndex = rowIndex;
			//判断是否存在划拨月数
//			builder.isTransferMonth = dojo.some(promotionInfo.salesPromotionItemList||[],function(onePromotionItem){
//				return onePromotionItem.attrSpec.attrCd == builder.transferMonthAttrCd;
//			});
			//判断是否存在协议消费期
			/*
			builder.isAgreement = dojo.some(promotionInfo.salesPromotionItemList||[],function(onePromotionItem){
				return onePromotionItem.attrSpec.attrCd == builder.agreementAttrCd;
			});
			builder.isAgreementMonths = dojo.some(promotionInfo.salesPromotionItemList||[],function(onePromotionItem){
				return onePromotionItem.attrSpec.attrCd == builder.agreementMonths;
			});
			builder.isGiftMonths = dojo.some(promotionInfo.salesPromotionItemList||[],function(onePromotionItem){
				return onePromotionItem.attrSpec.attrCd == builder.giftMonths;
			});
			builder.isAnotherGiftMonths = dojo.some(promotionInfo.salesPromotionItemList||[],function(onePromotionItem){
				return onePromotionItem.attrSpec.attrCd == builder.anotherGiftMonths;
			});
			*/
			builder.prodOfferDetailWidgetList[""+rowIndex] = promotionDetailWidget;
			
			promotionDetailWidget.rowIndex = rowIndex;
			
			//促销政策营销资源信息
			promotionDetailWidget.resRelaBuilder = null;
			//促销政策担保信息
			promotionDetailWidget.prodOfferAssureBuilder = null;
			
			promotionDetailWidget.startup();	
			        
	        promotionDetailWidget.setAttribute("rowIndex",rowIndex);
	        
	        promotionDetailWidget.domNode.setAttribute("dojoAttachEvent",
	                "onmouseout:elementmouseout");
	                
	        promotionDetailWidget.domNode.setAttribute("dojoAttachTopic",
	                "/promotionDetailDialog");
	        var commitButton = "<div style='text-align:center;vertical-align:middle'><a href='javascript:void(0);' dojoAttachEvent='onclick:elementclick' \ rowIndex='"+rowIndex+"'\
			    dojoAttachTopic='/promotionDetailBtn'\ style='text-align:center;vertical-align:middle;'>确定</a></div>";
			dojo.place(commitButton, promotionDetailWidget.containerNode, "last");
			promotionDetailWidget.enableEvtMsgPropagation(promotionDetailWidget.domNode);
			
			var tabContainer = new unieap.layout.TabContainer({
			        	height : 'auto' 
		        	});
		     
		    promotionDetailWidget.tabContainer = tabContainer;
		    tabContainer.startup();
			
			//初始化促销政策明细项信息
			builder.initPromotionItems(promotionDetailWidget,promotionInfo,promotionInstInfo,tabContainer,rowIndex);
			if(!promotionInstInfo){
				//初始化促销政策营销资源信息
				builder.initPromotionResItems(promotionDetailWidget,promotionInfo,tabContainer);
				//初始化促销政策担保信息
				builder.initPromotionAssureInfo(promotionDetailWidget,promotionInfo,tabContainer);
			}
			promotionDetailWidget.handlePageData = function(){
				//var rowData = loader.salesPromotionOrderGrid.getBinding().getRow(rowIndex);
				var rowData = loader.salesPromotionOrderGrid.ds.getRawData()[rowIndex];
				if(!!promotionDetailWidget.promotionItemsCard){
					var promotionItemsPageInfo = promotionDetailWidget.promotionItemsCard.getCardData();
					if(!promotionItemsPageInfo){
						return false;
					}
					dojo.mixin(rowData,{promotionItemsPageInfoList:promotionItemsPageInfo});
				}
				
				//校验作用对象是否订购了分月转兑，如订购则新订购的促销政策开始时间已分月转兑的结束时间我开始
				//1.根据开关表配置确定是否需要计算开始时间
				if(!promotionInstInfo){//非已订购促销详情展示时处理
					/* 领导确认-->开始时间的计算不再以已订购的促销政策做接续处理
					var param = "&ServiceKind=-1&apply_event=-1&infoId=226";
					var result = util.ServiceFactory.getService("url:businessAcceptAction.do?method=getCityBusinessParamValue" + param);
					if(result && result == "1"){//开关打开
						//2.取已订购的分月转兑、租机、礼券三种促销的结束时间
						builder.getPromotionInvalidDate();
					}
					*/
					
					//判断当前处理促销类型，如果是租机或者补贴卷则要特殊处理
					var promotionInfo = rowData.showData.promotionInfo;
					var promotionType = promotionInfo.promotionType;//促销政策类型
					var promotionTypeConst = ConstantsPool.load("PromotionTypeConst").PromotionTypeConst;
					if(promotionType == promotionTypeConst.DEVICE_RENT || promotionType == promotionTypeConst.SUBSIDY_PROMOTION || promotionType == promotionTypeConst.TELCHARGE_COUPON){//租机或补贴卷--->辽宁电信添加话费补贴类型
						//根据当前促销政策作用对象是否已有在用促销，生成促销政策的状态是预约还是有效
						var ifHasValidPromotion = builder.getPromotionInvalidDate(promotionDetailWidget);
						if(ifHasValidPromotion){//同一作用对象已经存在有效的促销政策则状态为预约
							//预约的生效时间为当前时间，失效时间为空
							builder.changePromotionEndDate(0,rowIndex);
							dojo.mixin(rowData,{promotionStatusCd:"1299"});
						}else{//不存在有效的促销政策则状态为有效
							//var promotionItemList = promotionInfo.salesPromotionItemList;//促销政策明细项
							//获取租机消费方式属性
							//var consumeKindItem = BusCard.find(promotionItemList||[],function(oneItemObj){
								//return oneItemObj.itemAttrId == ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.CONSUME_KIND_CD;
							//});
							var consumekindValue = promotionItemsPageInfo[ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.CONSUME_KIND_CD]?promotionItemsPageInfo[ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.CONSUME_KIND_CD]:"-1";
							if(consumekindValue != "-1"){//如果存在消费方式属性
								//var consumekindValue = consumeKindItem.attrValue;
								if(consumekindValue == 2){//消费方式为协议消费期
									//获取划拨低消方案属性
									//var transferKindItem = BusCard.find(promotionItemList||[],function(oneItem){
										//return oneItem.itemAttrId == ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.TRANSFER_KIND_CD;
									//});
									
									//领导确认-->不区分划拨方式，生效时间都是当前时间
									/*
									var transferKindValue = promotionItemsPageInfo[ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.TRANSFER_KIND_CD]?promotionItemsPageInfo[ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.TRANSFER_KIND_CD]:"-1";
									if(transferKindValue != "-1"){//存在划拨低消方案属性
										//var transferKindValue = transferKindItem.attrValue;
										if(transferKindValue == 3 || transferKindValue == 4){//当下月划拨时生效时间为下月1号
											builder.changePromotionStartDate(rowIndex);
										}
									}
									*/
									//根据协议消费期(月)属性计算促销政策的失效时间
									var months = promotionItemsPageInfo[builder.agreementAttrCd]?promotionItemsPageInfo[builder.agreementAttrCd]:0;
									builder.changePromotionEndDate(months,rowIndex);
								}else{//非按时间到期的租机或补贴卷，生效时间为当前时间，失效时间为空
									builder.changePromotionEndDate(0,rowIndex);
								}
							}else{//不存在租机消费方式属性时，结束时间按默认2037-1-1算
								builder.changePromotionEndDate(0,rowIndex);
							}
							dojo.mixin(rowData,{promotionStatusCd:"1000"});
						}
					}else{//分月转兑生效时间为当前时间，失效时间为2037-1-1
						builder.changePromotionEndDate(0,rowIndex);
						//分月转兑不区分是否已订购了促销政策，状态都是有效
						dojo.mixin(rowData,{promotionStatusCd:"1000"});
					}
				}
				/*
				var months = 0;
				if(builder.isAgreement){//存在协议消费期属性
					var months1 = promotionItemsPageInfo[builder.agreementAttrCd]?promotionItemsPageInfo[builder.agreementAttrCd]:0;
					months += parseInt(months1); 
				}
				if(builder.isAgreementMonths){//存在协议月数
					var months1 = promotionItemsPageInfo[builder.agreementMonths]?promotionItemsPageInfo[builder.agreementMonths]:0;
					months += parseInt(months1);
				}
				if(builder.isGiftMonths){//存在赠送月数（预存）
					var months1 = promotionItemsPageInfo[builder.giftMonths]?promotionItemsPageInfo[builder.giftMonths]:0;
					months += parseInt(months1);
				}
				if(builder.isAnotherGiftMonths){//存在赠送月数（话费）
					var months1 = promotionItemsPageInfo[builder.anotherGiftMonths]?promotionItemsPageInfo[builder.anotherGiftMonths]:0;
					months += parseInt(months1);
				}
				builder.changePromotionEndDate(months,rowIndex);
				*/
//				if(builder.isTransferMonth && !builder.isAgreement){//存在划拨月数属性且不存在协议消费期属性
//					var months = promotionItemsPageInfo[builder.transferMonthAttrCd]? promotionItemsPageInfo[builder.transferMonthAttrCd]:0;
//					builder.changePromotionEndDate(months,rowIndex);
//				}
				
				//设置营销资源信息
				var resPageData = builder.getResPageData(rowIndex);
				if(resPageData){
					dojo.mixin(rowData,{resRelaPageDataList:resPageData});
				}else{
					return false;
				}
				
				builder.dealSubsidyFee(promotionItemsPageInfo,resPageData);
				
				//手机实收价计算
				builder.dealRealPrice(promotionDetailWidget,resPageData);
				
				//设置促销政策担保信息
				if(!!promotionDetailWidget.assurePageData){
					var assureAttrList = [];
			        var assureAttr = promotionDetailWidget.assureAttrCard.busCardInstance.getData();
			        if(!assureAttr){
           	    		return false;
           	    	}
           	    	for(var key in assureAttr){
						if (!assureAttr.hasOwnProperty(key)){
							continue;
						}
	       	    		assureAttrList.push({
	       	    			"attrId" : key,
	       	    			"attrValue" : assureAttr[key]
	       	    		});
	       	    	}
	       	    	promotionDetailWidget.assurePageData.assureAttrList = assureAttrList;
	       	    	dojo.mixin(rowData,{promotionAssurePageInfoList : promotionDetailWidget.assurePageData});
				}
				//促销结束时间与作用对象结束时间校验  --->  领导确认此规则校验去掉
				//if(builder.checkExpDateBetweenPromotionAndTarget(promotionInfo)){
					//alert("\u4fc3\u9500\u534f\u8bae\u671f\u5df2\u8d85\u51fa\u4f5c\u7528\u53f7\u7801\u6216\u5957\u9910\u7684\u7ed3\u675f\u65f6\u95f4,\u4e0d\u80fd\u8ba2\u8d2d");
					//return false;
				//}			
				//校验成功后展示提示图片
				builder.addFinishPage(rowIndex);
			}
			dojo.place(tabContainer.domNode,promotionDetailWidget.containerNode,"first");
		},
		
		/**
		 * 根据划拨月数修改促销政策结束时间
		 */
		changePromotionEndDate : function(months,rowIndex){
			var promotionStartDateDiv = dojo.query(".promotionStartDate-"+rowIndex,this.loader.salesPromotionOrderGrid.domNode)[0];
			var promotionEndDateDiv = dojo.query(".promotionEndDate-"+rowIndex,this.loader.salesPromotionOrderGrid.domNode)[0];
			//领导确认结束时间为空
			var endDate = "";
			if(months>0){
				var promotionStartDate = dojo.trim(dojo.query(".start_date_class",promotionStartDateDiv)[0].innerHTML);
				var date = util.DateHelper.getDateFromString(promotionStartDate);
				date.setMonth(date.getMonth()+parseInt(months));
				endDate = util.DateHelper.formatDate(date);
			}
			dojo.query(".end_date_class",promotionEndDateDiv)[0].innerHTML = endDate;
		},
		
		/**
		 * 修改促销政策开始时间
		 */
		changePromotionStartDate : function(rowIndex){
			var promotionStartDateDiv = dojo.query(".promotionStartDate-"+rowIndex,this.loader.salesPromotionOrderGrid.domNode)[0];
			//var promotionStartDate = dojo.trim(dojo.query(".start_date_class",promotionStartDateDiv)[0].innerHTML);
			var promotionStartDate = dojo.global.$appContext$.requestParam.today;//获取当前时间
			var startDate = util.DateHelper.getDateFromString(promotionStartDate);
			startDate.setMonth(startDate.getMonth()+1);
			startDate.setDate(1);
			startDate.setHours(0);
			startDate.setMinutes(0);
			startDate.setSeconds(0);
			dojo.query(".start_date_class",promotionStartDateDiv)[0].innerHTML = util.DateHelper.formatDate(startDate);
		},
		
		/**
		 * 取已订购的促销政策的失效时间
		 * 1.取营业订购的分月转兑、租机、礼券--->辽宁电信添加话费补贴类型
		 * 2.营业没有订购相关促销后调用账务接口，查询账务是否订购了分月转兑
		 * 3.方法改造：如果该号码营业或账务已订购了促销政策则返回true,否则返回false
		 */
		getPromotionInvalidDate : function(promotionDetailWidget){
			var loader = this.loader;
			var rowIndex = promotionDetailWidget.rowIndex;
			var salesPromotionOrderGridDom = loader.salesPromotionOrderGrid.domNode;
			var showServiceIdDiv = dojo.query(".promotionTargetNum-" + rowIndex, salesPromotionOrderGridDom)[0];
			var checkServiceIdList = dojo.filter(showServiceIdDiv.childNodes || [], function(oneNode) {
	                return oneNode.checked == true;
                });
            var uniqueid = checkServiceIdList.length>0?checkServiceIdList[0].getAttribute("targetUniqueid"):0;
            var serviceCardWidget = unieap.byId("serviceCardWidget_"+uniqueid);
            var serviceId = serviceCardWidget.busCardInstance.$("serviceId").value;//服务号码
            var userId = serviceCardWidget.getModel().cardParam.userId;//接入类产品实例
            if(userId && userId != 'null' && userId!=0){//变更
            	//获取促销政策的开始时间（规格数据）
            	var promotionStartDateDiv = dojo.query(".promotionStartDate-"+rowIndex,loader.salesPromotionOrderGrid.domNode)[0];
            	var promotionStartDate = dojo.trim(dojo.query(".start_date_class",promotionStartDateDiv)[0].innerHTML);
            	var startDate = util.DateHelper.getDateFromString(promotionStartDate);
            	//var resDate = "";
            	//查询营业已订购促销信息
            	var param = "&userId="+userId;
            	var resultDate = util.ServiceFactory.getService("url:businessAcceptAction.do?method=getPromotionInvalidDate" + param);
            	if(resultDate){//营业存在已订购的促销政策
            		return true;
            		//resDate = util.DateHelper.getDateFromString(resultDate);
            	}
            	/* 领导确认-->只查营业不查账务是否订购了分月转兑
            	else{//营业不存在已订购的促销政策则查询账务是否订购了分月转兑
            		var param = "&serviceId="+serviceId+"&userId="+userId;
					var result = util.ServiceFactory.getService("url:businessAcceptAction.do?method=getPromotionInvalidDateFromBilling" + param); 
					if(result){//账务订购了分月转兑
						return true;
						//resDate = util.DateHelper.getDateFromString(result);
					}        		
            	}
            	*/
            	/*
            	if(resDate && resDate>startDate){
        			dojo.query(".start_date_class",promotionStartDateDiv)[0].innerHTML = util.DateHelper.formatDate(resDate);
        		}
        		*/
            }
            return false;
		},
		
		/**
		 * 比较订购的促销政策失效时间和作用对象失效时间的关系
		 * 当促销失效时间大于作用对象失效时间时，不允许订购，给出提示信息
		 */
		checkExpDateBetweenPromotionAndTarget : function(promotionInfo){
			var build = this;
			var loader = this.loader;
			var salesPromotionOrderGridDom = loader.salesPromotionOrderGrid.domNode;
			var rowIndex = this.rowIndex;
			var showServiceIdDiv = dojo.query(".promotionTargetNum-" + rowIndex, salesPromotionOrderGridDom)[0];
			var promotionEndDateDiv = dojo.query(".promotionEndDate-" + rowIndex,salesPromotionOrderGridDom)[0];
			var checkServiceIdList = dojo.filter(showServiceIdDiv.childNodes || [], function(oneNode) {
	                return oneNode.checked == true;
                });
            var promotionEndDate = util.DateHelper.getDateFromString(dojo.trim(dojo.query(".end_date_class", promotionEndDateDiv)[0].innerHTML),1);
			var targetProductId = checkServiceIdList.length>0?checkServiceIdList[0].getAttribute("productId"):"";//作用产品id,作用对象为产品时存在
			var targetProdOfferId = checkServiceIdList.length>0?checkServiceIdList[0].getAttribute("prodOfferId"):"";//作用销售品id,作用对象为销售品时存在
			var uniqueId = checkServiceIdList.length>0?checkServiceIdList[0].getAttribute("targetUniqueid"):"";
			var mainProdOfferInstVO = $ac$.mainProdOfferInstVO;//主套餐实例数据
			var mainProdOfferVO = $ac$.selectedMainProdOfferInfoVO;//主套餐规格数据
			
			//获取当前处理主套餐的规格数据
            var MainProdOfferInfoVO = $ac$.selectedMainProdOfferInfoVO;
            var pageInfo = prodOfferAcceptLoader.mainProdOfferWidget.getPageStartEndDate();
            var mainProdDate = util.ProdOfferHelper.getProductDateBuilder(MainProdOfferInfoVO,pageInfo);
            var mainProdOfferEndDate = mainProdDate.getEndDate();
			if(mainProdOfferInstVO){//实例数据存在--->变更
				if(targetProductId){//作用对象为产品
					var serviceCardId = "serviceCardWidget_" + uniqueId;
					var serviceCardWidget = unieap.byId(serviceCardId);
					if(serviceCardWidget && serviceCardWidget.getModel().cardParam.userId != 0){//作用对象存在实例数据
						//获取接入类产品实例数据
						var productIdList = [];
						if(mainProdOfferInstVO.ifBundle == 1&&mainProdOfferInstVO.prodInstList.length == 0){
	                        //获取自主板的组合
	                        dojo.forEach($ac$.userHasProdOfferInfoList||[],function(userHasProdOfferInfo){
	                            if(userHasProdOfferInfo.prodOfferType == 11&&userHasProdOfferInfo.prodOfferType == "11"){
	                                dojo.forEach(userHasProdOfferInfo.prodInstList||[],function(prodInstInfo){
	                                    productIdList.push(prodInstInfo.productId+"_"+prodInstInfo.stopRentTime);
	                                });
	                            }
	                        });
	                    }else{
	                        productIdList = dojo.map(mainProdOfferInstVO.prodInstList||[],function(prodInstInfo){
	                            return prodInstInfo.productId+"_"+prodInstInfo.stopRentTime;
	                        });
	                    }
	                    //从所有的接入类产品实例数据中获取作用对象相关的实例数据
	                    var targetProductIdList = dojo.filter(productIdList || [],function(oneProductId){
	                    	var productId = oneProductId.split("_")[0];
	                    	return targetProductId == productId;
	                    });
	                    //加入主销售品实例数据
	                    targetProductIdList.push(mainProdOfferInstVO.prodOfferId+"_"+mainProdOfferInstVO.expDate);
	                    //加入主销售品规格数据
	                    targetProductIdList.push(MainProdOfferInfoVO.prodOfferId+"_"+mainProdOfferEndDate);
	                    //调用排序方法对实例数据根据日期进行升序排序
	                    build.dateSort(targetProductIdList);
	                    //获取最小的结束时间并转为date类型
	                    var smallestDate = util.DateHelper.getDateFromString(targetProductIdList[0].split("_")[1],1);
	                    //与当前处理的促销政策的结束时间进行比较，如果小于促销的结束时间则不允许订购
	                    if(dojo.date.compare(smallestDate,promotionEndDate)<0){
	                    	return true;
	                    }
					}else if(serviceCardWidget && serviceCardWidget.getModel().cardParam.userId == 0){//作用对象不存在实例数据
						var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
						//判断变更类型
						var changeFlag = dojo.some(selectedMemberProdOfferList||[],function(oneSelectedMember){
							var offerInstId = oneSelectedMember.offerInstVO.prodOfferId;
							var offerId = oneSelectedMember.prodOfferId;
							return offerInstId != offerId;
						});
						if(changeFlag){//销售品变更,以变更后主销售品结束时间与当前促销时间比较
							var mainProdOfferEndDate1 = util.DateHelper.getDateFromString(mainProdOfferEndDate,1);
							if(dojo.date.compare(mainProdOfferEndDate1,promotionEndDate)<0){
								return true;
							}
						}else{//变更可选包,用主销售品实例数据与当前促销结束时间做比较
							var endDate = util.DateHelper.getDateFromString(mainProdOfferInstVO.expDate,1);
							if(dojo.date.compare(endDate,promotionEndDate)<0){
								return true;
							}
						}
					}
				}else if(targetProdOfferId){//作用对象为销售品
					//作用于当前主销售品,以规格数据结束时间与当前促销结束时间比较
					if(targetProdOfferId == MainProdOfferInfoVO.prodOfferId){
						var mainProdOfferEndDate1 = util.DateHelper.getDateFromString(mainProdOfferEndDate,1);
						if(dojo.date.compare(mainProdOfferEndDate1,promotionEndDate)<0){
							return true;
						}
					}else{//作用于可选包
						var mainProdOfferBundleType = mainProdOfferInstVO.bundleType;
						var subProdOfferInstList = [];
						if(mainProdOfferBundleType == 2){//主销售品为自主版
							subProdOfferInstList = prodOfferAcceptLoader.multipleSubProdOfferHandler.
									subProdOfferOrderProviderMap.subProdOfferTreeContainer[uniqueId].getSubGridBindingData();
						}else{//非自主版主销售品
							subProdOfferInstList = prodOfferAcceptLoader.multipleSubProdOfferHandler.
									subProdOfferOrderProviderMap.subProdOfferTreeContainer.getSubGridBindingData();
						}
						//从可选包实例数据中过滤出作用对象
						var targetSubProdOfferList = dojo.filter(subProdOfferInstList||[],function(oneSubProdOfferInst){
							return targetProdOfferId == oneSubProdOfferInst.prodOfferInst.prodOfferId;
						});
						if(targetSubProdOfferList && targetSubProdOfferList.length>0){//作用对象存在于可选包实例数据中,以实例数据与当前促销结束时间比较
							var targetSubProdOffer = targetSubProdOfferList[0];
							var targetSubProdOfferEndDate = util.DateHelper.getDateFromString(targetSubProdOffer.expDate,1);
							if(dojo.date.compare(targetSubProdOfferEndDate,promotionEndDate)<0){
								return true;
							}
						}else{//作用可选包不在可选包实例中-->本次新订购可选包,以可选包规格数据进行比较
							var targetSubOfferList = dojo.filter(subProdOfferInstList||[],function(oneSubProdOfferInst){
								if(!oneSubProdOfferInst.prodOfferInst){
									return oneSubProdOfferInst.subProdOfferInfo.prodOfferId == targetProdOfferId;
								}
							});
							if(targetSubOfferList && targetSubOfferList.length>0){
								var targetSubOffer = targetSubOfferList[0];
								var subProdOfferCartDataProvider = prodOfferAcceptLoader.multipleSubProdOfferHandler.subProdOfferOrderProviderMap.subProdOfferTreeContainer;
								var subPageInfo = subProdOfferCartDataProvider.saveSubProdOfferViewData;
								var subProdOfferInfoVO = targetSubOffer.subProdOfferInfo;
								var subProdOfferEndDateStr = util.ProdOfferHelper.getProductDateBuilder(subProdOfferInfoVO,subPageInfo).getEndDate();
								var subProdOfferEndDate = util.DateHelper.getDateFromString(subProdOfferEndDateStr,1);
								if(dojo.date.compare(subProdOfferEndDate,promotionEndDate)<0){
									return true;
								}
							}
						}
					}
				}
			}else{//实例数据不存在--->新装,以规格数据进行比较
				if(targetProductId){//作用对象为产品,以主销售品结束时间做比较
					var mainProdOfferEndDate1 = util.DateHelper.getDateFromString(mainProdOfferEndDate,1);
					if(dojo.date.compare(mainProdOfferEndDate1,promotionEndDate)<0){
						return true;
					}
				}else if(targetProdOfferId){//作用对象为销售品
					if(targetProdOfferId == MainProdOfferInfoVO.prodOfferId){//作用于当前主销售品
						var mainProdOfferEndDate1 = util.DateHelper.getDateFromString(mainProdOfferEndDate,1);
						if(dojo.date.compare(mainProdOfferEndDate1,promotionEndDate)<0){
							return true;
						}
					}else{//作用于可选包
						var mainProdOfferBundleType = mainProdOfferInstVO.bundleType;
						var subProdOfferInstList = [];
						if(mainProdOfferBundleType == 2){//主销售品为自主版
							subProdOfferInstList = prodOfferAcceptLoader.multipleSubProdOfferHandler.
									subProdOfferOrderProviderMap.subProdOfferTreeContainer[uniqueId].getSubGridBindingData();
						}else{//非自主版主销售品
							subProdOfferInstList = prodOfferAcceptLoader.multipleSubProdOfferHandler.
									subProdOfferOrderProviderMap.subProdOfferTreeContainer.getSubGridBindingData();
						}
						var targetSubOfferList = dojo.filter(subProdOfferInstList||[],function(oneSubProdOfferInst){
							if(!oneSubProdOfferInst.prodOfferInst){
								return oneSubProdOfferInst.subProdOfferInfo.prodOfferId == targetProdOfferId;
							}
						});
						if(targetSubOfferList && targetSubOfferList.length>0){
							var targetSubOffer = targetSubOfferList[0];
							var subProdOfferCartDataProvider = prodOfferAcceptLoader.multipleSubProdOfferHandler.subProdOfferOrderProviderMap.subProdOfferTreeContainer;
							var subPageInfo = subProdOfferCartDataProvider.saveSubProdOfferViewData;
							var subProdOfferInfoVO = targetSubOffer.subProdOfferInfo;
							var subProdOfferEndDateStr = util.ProdOfferHelper.getProductDateBuilder(subProdOfferInfoVO,subPageInfo).getEndDate();
							var subProdOfferEndDate = util.DateHelper.getDateFromString(subProdOfferEndDateStr,1);
							if(dojo.date.compare(subProdOfferEndDate,promotionEndDate)<0){
								return true;
							}
						}
					}
				}
			}
			return false;
		},
		
		/**
		 * 日期排序(升序)
		 */
		dateSort : function(productInstList){
			for(var i=0;i<productInstList.length;i++){
				for(var j=i+1;j<productInstList.length;j++){
					var date1 = util.DateHelper.getDateFromString(productInstList[i].split("_")[1],1);
					var date2 = util.DateHelper.getDateFromString(productInstList[j].split("_")[1],1);
					if(dojo.date.compare(date1,date2)>0){
						var temp = date2;
						date2 = date1;
						date1 = temp;
					}
				}
			}
		},
		
		/**
		 * 补贴金额处理
		 * @param promotionItemsPageInfo (促销政策明细项信息)
		 * @param resPageData (营销资源信息)
		 */
		dealSubsidyFee : function(promotionItemsPageInfo,resPageData){
			if(promotionItemsPageInfo){
				for(var p in promotionItemsPageInfo){
					if(p == this.subsidyFee){
						var subsidyValue = promotionItemsPageInfo[p];
						dojo.forEach(resPageData||[],function(oneResPageData){
							if(oneResPageData.subFee){
								oneResPageData.subFee = subsidyValue*100;//将页面单位为元的数值转为分为单位数值
							}
						});
					}
				}
			}
		},
		
		/**
		 * 手机实收价计算
		 */
		dealRealPrice : function(promotionDetailWidget,resPageData){
			var builder = this;
			/**
			var subsidyAmount = "0";//补贴额度
			var realPrice = "0";//手机实收价
			var suggestFee = "0";//应收价
			var promotionItemsPageInfo = promotionDetailWidget.promotionItemsCard.getCardData();
			if(promotionItemsPageInfo){
				for(var p in promotionItemsPageInfo){
					if(p == this.subsidyAmontCD){//补贴额度属性
						subsidyAmount = promotionItemsPageInfo[p];
					}
					if(p == this.realPriceCD){//手机实收价
						realPrice = promotionItemsPageInfo[p];
					}
				}
			}
			
			dojo.forEach(resPageData||[],function(oneResPageData){
				if(oneResPageData.suggestFee){
					suggestFee = oneResPageData.suggestFee;//取资源的应收价
				}
			});
			
			if(suggestFee <= 0){//应收价为零,补贴额度和手机实收价都写零
				subsidyAmount = 0;
				realPrice = 0;
			}else{
				realPrice = eval(suggestFee-subsidyAmount);//实收价=应收价-补贴额度
				if(realPrice<0){//小于零时取零
					realPrice = 0;
				}
			}
			
			//重新设置值
			dojo.forEach(resPageData||[],function(oneResPageData){
				if(realPrice > 0){
					oneResPageData.realFee = builder.moneyConvert(realPrice,2);
				}else{
					oneResPageData.realFee = realPrice;
				}
			});
			
			//重置属性值
			for(var p in promotionItemsPageInfo){
				if(p == this.realPriceCD){
					if(realPrice > 0){
						promotionItemsPageInfo[p] = builder.moneyConvert(realPrice,2);
					}else{
						promotionItemsPageInfo[p] = realPrice;
					}
				}
			}
			
			//实收价页面展示值重写
			var promotionItemCard = promotionDetailWidget.promotionItemsCard;
			if(promotionItemCard){
				if(promotionItemCard.busCardInstance.$(this.realPriceCD)){
					promotionItemCard.busCardInstance.$(this.realPriceCD).value = realPrice;
				}
			}
			*/
			var realPrice = "0";
			var promotionItemsPageInfo = promotionDetailWidget.promotionItemsCard.getCardData();
			if(promotionItemsPageInfo){
				for(var p in promotionItemsPageInfo){
					if(p == this.realPriceCD){//手机实收价
						realPrice = promotionItemsPageInfo[p];
					}
				}
			}
			//将属性页面获取的实收价值重写到资源信息中
			dojo.forEach(resPageData||[],function(oneResPageData){
				if(realPrice > 0){
					oneResPageData.realFee = builder.moneyConvert(realPrice,2);
				}else{
					oneResPageData.realFee = realPrice;
				}
			});
		},
		
		moneyConvert : function(value,index){
        	value = value.toString();
			var exp = /^\s*(\d+)\.(\d+)\s*$/g; 
			var matchResult = exp.exec(value); 
			if(matchResult){
		 	  var lastPart = matchResult[2];
		 	  if(lastPart.length<index){
		 	 	 var appendCount = index - lastPart.length;
		 	 	 while(appendCount--){
					lastPart = lastPart + "0"; 	 		
		 	 	 }
		 	  }    
		 	  return parseInt(matchResult[1] + lastPart.substring(0,index));  
			}else{
			 	var returnValue = parseInt(value);
			 	while(index--){
			 		returnValue  = returnValue*10;
			 	}
				return returnValue
			 }
        },
		
		/**
		 * 点击确定校验成功后，添加提示图片
		 */
		addFinishPage : function(rowIndex){
			var finishPage = dojo.query("[id=finishPage-"+rowIndex+"]",this.loader.salesPromotionOrderGrid.domNode)[0];
			if(finishPage){
				finishPage.style.display = "";
			}
		},
		
		/**
		 * 初始化促销政策明细项信息
		 */
		initPromotionItems : function(promotionDetailWidget,promotionInfo,promotionInstInfo,tabContainer,rowIndex){
			var loader = this.loader,
				promotionItemsCard = new this.promotionItemsWidgetClass({
					promotionInfoVO : promotionInfo,
					promotionInstInfo : promotionInstInfo,
					rowIndex : rowIndex
				});	
			if(promotionItemsCard.needRendering){
				var contentPane = new unieap.layout.ContentPane({
				    title : "促销政策属性",
				    width : "650px"
			    });
				promotionItemsCard.renderCard(contentPane.domNode,"first");
				promotionItemsCard.busCardInstance.setParent(contentPane);
				promotionDetailWidget.promotionItemsCard = promotionItemsCard;
				tabContainer.addChild(contentPane);
			}			
		},
		
		/**
		 * 初始化促销政策营销资源信息
		 */
		initPromotionResItems : function(promotionDetailWidget,promotionInfo,tabContainer){
			var loader = this.loader,
				contentPane = new unieap.layout.ContentPane({
				    title : "营销资源",
				    width : "580px"
			    });
			var rowIndex = promotionDetailWidget.rowIndex;
			var salesPromotionOrderGridDom = loader.salesPromotionOrderGrid.domNode;
			var showServiceIdDiv = dojo.query(".promotionTargetNum-" + rowIndex, salesPromotionOrderGridDom)[0];
			var checkServiceIdList = dojo.filter(showServiceIdDiv.childNodes || [], function(oneNode) {
	                return oneNode.checked == true;
                });
            var uniqueid = checkServiceIdList.length>0?checkServiceIdList[0].getAttribute("targetUniqueid"):0;
			promotionDetailWidget.resRelaBuilder = new PromotionResRelaBuilder({
				"loader" : loader,
				"promotionDetailWidget" : promotionDetailWidget,
				"promotionInfo" : promotionInfo,
				"tabContainer" : tabContainer,
				"contentPane" : contentPane,
				"uniqueid" : uniqueid,
				"rowIndex" : rowIndex
			});
			promotionDetailWidget.resRelaBuilder.initPromotionResRela();
		},
		
		/**
		 * 初始化促销政策担保信息
		 */
		initPromotionAssureInfo : function(promotionDetailWidget,promotionInfo,tabContainer){
			var detailBuilder = this;
			var prodOfferInfo = promotionInfo.proodOfferInfo;
			promotionDetailWidget.prodOfferAssureBuilder = new PromotionAssureBuilder({
				"detailBuilder" : detailBuilder,
	       		"prodOfferDetailWidget" : promotionDetailWidget,
                "prodOfferInfo" : prodOfferInfo,
                "tabContainer" : tabContainer,
                "promotionInfo" : promotionInfo
			});
			promotionDetailWidget.prodOfferAssureBuilder.initProdOfferAssure();
		},
		
		/**
		 * 获取营销资源数据
		 */
		getResPageData : function(rowIndex){
			var builder = this,
				promotionDetailWidget = builder.prodOfferDetailWidgetList[rowIndex],
				resRelaBuilder = promotionDetailWidget.resRelaBuilder;
			return !!resRelaBuilder?resRelaBuilder.getPageData():[];
		}
	});
});