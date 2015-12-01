defineModule("orderaccept.prodofferaccept.widget.attrcard.PromotionItemsCardWidget",
		["orderaccept.prodofferaccept.widget.attrcard.ProductAttrCardWidget","../../util", "orderaccept.common.dialog.MessageBox"],function(ProductAttrCardWidget,util,messageBox){
	
	var groupKind = {
		RENT : "50",
		TERMINAL : "51",
		TRANSFER_INFO : "52",
		AGREEMENT_INFO : "53",
		SUBSIDY : "54",
		MONTH_CONVERT : "55",
		WORDS_FEE_AS_PRESENT : "56",
		YUCUN_PRESENT : "57",
		ZIFEI_PRESENT : "58",
		GIFT_PRESENT : "59",
		COST : "60"
	};
	
	var showTypeConst = {
		SELECT_TYPE : "select"
	};
	
	var attrRelTypeConst = {
		RELEVANCE : "3",
		EXCLUDE : "200000",
		RELY_ON : "100000"
	};
	/**
	 * 促销政策明细项widget
	 */
	dojo.declare("orderaccept.prodofferaccept.widget.attrcard.PromotionItemsCardWidget",[ProductAttrCardWidget],{
		firstClickAttrList : [],
		attrExprRelaCdList : {},
		attrExprList : {},
		needRendering : true,
		NOOP : function() {},
		postMixInProperties : function(){
			var modelData = this.getModel();
			var	promotionInfoVO = modelData.promotionInfoVO;
			var promotionInstInfo = modelData.promotionInstInfo;
			var	protocolInstanceXml = "<?xml version='1.0' encoding='UTF-8'?>\
					<card id='${cardId}' cardType='0' name='促销政策明细' pageColumn='2' xmlns='http://www.crm1.com/buscard'><metaData>\
	             	 ${promotionItemList}\
	             	 </metaData></card>";
	        if(promotionInfoVO.flag){
				protocolInstanceXml = "<?xml version='1.0' encoding='UTF-8'?>\
					<card id='${cardId}' cardType='0' name='促销政策明细' pageColumn='4' xmlns='http://www.crm1.com/buscard'><metaData>\
	             	 ${promotionItemList}\
	             	 </metaData></card>";
			} 	 		
	        var cardId = "promotion_" + promotionInfoVO.promotionId;
	            //promotionItemLink = "<subGroup id='promotionItem' name='促销政策基本信息'>",
	            //promotionMoreItemLink = "<subGroup id='promotionMoreItem' name='促销政策扩展信息'>",
	        var finalXml = "";
			var	cardWidget = this;
			if(this.checkIfNeedRendering(promotionInfoVO.salesPromotionItemList || [])){
				//var _string = this.prodAttrList2xml(attrList,promotionItemLink, promotionMoreItemLink);
				var _string = this.promotionAttrList(promotionInfoVO.salesPromotionItemList);
				finalXml = BusCard.Template.create(protocolInstanceXml).apply({
		                        cardId : cardId,
		                        promotionItemList : _string
	                        });
	            this.templateString = finalXml;
			}else{
				this.buildRendering = this.NOOP;
            	this.postCreate = this.NOOP;
			}
			this.addCardCallback(function(){
				cardWidget.initProdSelect(this.busCardInstance);
				cardWidget.initLength();
				cardWidget.initDisplayElement();
				cardWidget.renderDefaultValue();
				cardWidget.initAttrDisabled();
				//cardWidget.initProdAttrInst();
				//属性取值关系处理
				cardWidget.dealAttrValueRel();
				//属性公式配置处理
				cardWidget.dealAttrExpr();
//				cardWidget.dealAttrIsInstance();
				cardWidget.dealSpecialItem();
			});
		},
		
		dealAttrIsInstance : function(){
			
		},
		
		initSpecialValueByAttrCode : function(){
			
		},
		
		bindUpdateEventForExprAttr : function(){
		
		},
		
		/**
		 * 特殊属性处理
		 */
		dealSpecialItem : function(){
			//选择的主套餐信息
			var mainProdOfferInfo = $ac$.selectedMainProdOfferInfoVO;
			var card = this.getCard();
			if(mainProdOfferInfo){
				if(mainProdOfferInfo.prodOfferBrandId == 54 && mainProdOfferInfo.bindType == 2){//主副卡套餐,消费类型默认账户级
					var promotionItemList = this.getModel().promotionInfoVO.salesPromotionItemList || [];
					BusCard.each(promotionItemList, function(oneItem){
						if(oneItem.itemAttrId == '10610'){//消费类型属性
							if(card.$(oneItem.attrSpec.attrCd)){
								card.$(oneItem.attrSpec.attrCd).value = 1;
							}
						}
					});
				}
			}
		},
		
		/**
		 * 初始化下拉框
		 */
		initProdSelect : function(){
			var card = this.getCard(),
                promotionItemList = this.getModel().promotionInfoVO.salesPromotionItemList || [];
            	selectAttrList = BusCard.findAll(promotionItemList, function(promotionItemVO) {
                        return (/select/i.test(promotionItemVO.attrSpec.valueShowType));
                    });
            	BusCard.each(selectAttrList, function(promotionItemVO) {
            		var attrVO = promotionItemVO.attrSpec,
                    	attrValueList = attrVO.attrValueList || [],
                        selectParamList = BusCard.map(attrValueList, function(
                                        valueVO) {
	                                return {
		                                id : valueVO.attrValue,
		                                name : valueVO.attrValueName
	                                };
                                });
                    BusCard.$rs(card.$(attrVO.attrCd), selectParamList);
                });
		},
		
		/**
		 * 属性取值关系处理
		 */
		dealAttrValueRel : function(){
			var widget = this;
			var card = this.getCard();
			var promotionItemList = this.getModel().promotionInfoVO.salesPromotionItemList || [];
			//获取下拉框形式数据
			var selectAttrList = dojo.filter(promotionItemList||[],function(onePromotionItem){
				return onePromotionItem.attrSpec.valueShowType == showTypeConst.SELECT_TYPE;
			});
			//为每个下拉框添加处理事件
			dojo.forEach(selectAttrList||[],function(oneSelectAttrObj){
				var attrVO = oneSelectAttrObj.attrSpec;
				var elem = card.$(attrVO.attrCd);//页面元素
				if(elem){
					elem.onchange = function(){
						widget.changeAttrValue(card,attrVO,selectAttrList);
					}
				}
			});
		},
		
		/**
		 * 通过属性取值关系处理作用属性的取值
		 */
		changeAttrValue : function(card,attrVO,selectAttrList){
			var cardWidget = this;
			//当前属性值
			var attrValue = card.$(attrVO.attrCd).value;
			//属性可选取值
			var attrValueList = attrVO.attrValueList;
			var attrValueVO = dojo.filter(attrValueList||[],function(oneAttrValue){
				return oneAttrValue.attrValue == attrValue;
			})[0];
			//属性对应取值关系
			var attrValueRelaList = attrValueVO.attrValueRelaList;
			if(attrValueRelaList && attrValueRelaList.length>0){
				dojo.forEach(attrValueRelaList||[],function(oneAttrValueRelaInfo){
					//关联的属性CD
					var relAttrCd = oneAttrValueRelaInfo.attrCd;
					var relAttrElem = card.$(relAttrCd);
					if(relAttrElem){//属性所关联的元素存在
						var relAttrValueList = oneAttrValueRelaInfo.attrValueRelaValueList;
						//关联关系属性取值
						var releAttrValueList = dojo.filter(relAttrValueList||[],function(oneRelAttrValue){
							return oneRelAttrValue.attrRelaType == attrRelTypeConst.RELEVANCE;
						});
						var valueStr = "";
						dojo.forEach(releAttrValueList||[],function(oneReleAttrValue){
							valueStr += "<option value='"+ oneReleAttrValue.attrValue +"'>"+ oneReleAttrValue.attrValueName +"</option>";
						});
						relAttrElem.innerHTML = valueStr;
						var attrInfo = {
							attrCd : relAttrCd
						};
						var flag = dojo.some(cardWidget.firstClickAttrList||[],function(oneClickAttr){
							return oneClickAttr.attrCd == relAttrCd;
						});
						if(!flag){
							cardWidget.firstClickAttrList.push(attrInfo);
						}
					}
				});
				
				//上次点击有关联本次没有关联属性集合
				var noRelAttrList = dojo.filter(cardWidget.firstClickAttrList||[],function(oneAttr){
					return !dojo.some(attrValueRelaList||[],function(oneValue){
						return oneAttr.attrCd == oneValue.attrCd;
					});
				});
				cardWidget.createSelectValue(card,noRelAttrList);
			}else{
				cardWidget.createSelectValue(card,cardWidget.firstClickAttrList);
			}
		},
		
		createSelectValue : function(card,attrList){
			var promotionItemList = this.getModel().promotionInfoVO.salesPromotionItemList || [];
			//获取下拉框形式数据
			var selectAttrList = dojo.filter(promotionItemList||[],function(onePromotionItem){
				return onePromotionItem.attrSpec.valueShowType == showTypeConst.SELECT_TYPE;
			});
			dojo.forEach(attrList||[],function(oneAttr){
				var attrCd = oneAttr.attrCd;
				var oldAttr = dojo.filter(selectAttrList||[],function(oneSelectAttr){
					return attrCd == oneSelectAttr.attrSpec.attrCd;
				})[0];
				var oldAttrValueList = oldAttr.attrSpec.attrValueList;
				var elem = card.$(attrCd);
				if(elem){
					var valueStr = "";
					dojo.forEach(oldAttrValueList||[],function(oneValue){
						valueStr += "<option value='"+ oneValue.attrValue +"'>"+ oneValue.attrValueName +"</option>";
					});
					elem.innerHTML = valueStr;
				}
			});
		},
		
		/**
		 * 属性公式配置解析处理
		 */
		dealAttrExpr : function(){
			var deal = this;
			var promotionItemList = this.getModel().promotionInfoVO.salesPromotionItemList || [];
			dojo.forEach(promotionItemList||[],function(onePromotionItem){
				//属性公式配置
				var promAttrValueExprList = onePromotionItem.attrSpec.attrValueExpressionsList;
				var attrCd = onePromotionItem.attrSpec.attrCd;
				var releAttrCd = [];//当前属性公式关联其他属性
				var attrExprArray = [];//当前属性配置公式
				if(promAttrValueExprList && promAttrValueExprList.length>0){
					dojo.forEach(promAttrValueExprList||[],function(onePromoAttrExpr){
						onePromoAttrExpr.valueExpressions.replace(/\[(\d+?)\]/g,function($0,$1){
						    releAttrCd.push($1);
						});
						attrExprArray.push(onePromoAttrExpr);
					});
					deal.attrExprRelaCdList[attrCd] = releAttrCd;
					deal.attrExprList[attrCd] = attrExprArray;
				}
			});
			
			if(deal.attrExprRelaCdList){
				for(var p in deal.attrExprRelaCdList){
					var relaAttrCdList = deal.attrExprRelaCdList[p];
					var attrExprArray = deal.attrExprList[p];
					if(relaAttrCdList && relaAttrCdList.length>0){
						for(var i=0;i<relaAttrCdList.length;i++){
							deal.attrValueCount(relaAttrCdList[i],p,attrExprArray);
						}
					}
				}
			}
		},
		
		/**
		 * 属性值计算
		 * @param relaAttrCd 关联属性Cd
		 * @param sourceAttrCd 源属性Cd
		 * @param attrExpr 计算公式
		 */
		attrValueCount : function(relaAttrCd,sourceAttrCd,attrExprArray){
			//过滤出跟当前关联属性相关的属性公式
			var filteAttrExprArry = dojo.filter(attrExprArray||[],function(oneAttrExpr){
				return oneAttrExpr.valueExpressions.indexOf(relaAttrCd)>0;
			});
			var card = this.getCard();//获取卡片对象
			var elem = card.$(relaAttrCd);
			var sourceElem = card.$(sourceAttrCd);
			try{
				if(elem){
					elem.onblur = function(){
						if(filteAttrExprArry.length>0){
							for(var i=0;i<filteAttrExprArry.length;i++){
								var attrExpr = filteAttrExprArry[i];
								var valueExpr = attrExpr.valueExpressions;
								valueExpr = valueExpr.replace(/\[(\d+?)\]/g,function($0,$1){
								    return card.$($1).value;
								});
								if(sourceElem){
									sourceElem.value = eval("("+ valueExpr +")");
									var index = sourceElem.value.indexOf(".");
									if(index>0){
										sourceElem.value = sourceElem.value.substring(0,index+3);
									}
								}
							}
						}
					}
				}
			}catch(e){
				//alert(e);
				 messageBox.alert({
					busiCode : "08410159",
					infoList : [ e ]
 				});
			}
		},
		
		/**
		 * 长度限制
		 */
		initLength : function(){
			var card = this.getCard(),
				promotionItemList = this.getModel().promotionInfoVO.salesPromotionItemList || [];
			BusCard.each(promotionItemList || [], function(promotionItemVO) {
				var attrVO = promotionItemVO.attrSpec;
                var elem = card.$(attrVO.attrCd + "");
                if (elem && attrVO.attrLeng) {
                    elem.maxLength = attrVO.attrLeng;
                }
            });
		},
		
		/**
		 * 是否展示
		 */
		initDisplayElement : function(){
			var card = this.getCard(),
				promotionItemList = this.getModel().promotionInfoVO.salesPromotionItemList || [];
			for(var i=0;i<promotionItemList.length;i++){
				var attrVO = promotionItemList[i];
				if(attrVO.ifVisible == "0"){
					card.hidden(attrVO.attrSpec.attrCd + "");
				}
			}
		},
		
		/**
		 * 默认值渲染ֵ
		 */
		renderDefaultValue : function(){
			var card = this.getCard();
			card.renderDefaultValue(this.getDefaultValue());
		},
		
		/**
		 * 获取默认值ֵ
		 */
		getDefaultValue : function(){
			var promotionItemList = null;
			var promotionItemInstList = null;
			var promotionItemDefaultList = {};
			if(this.getModel().promotionInstInfo){//存在实例数据(变更可选包/主套餐展示已订购的促销政策)
				promotionItemInstList = this.getModel().promotionInstInfo.salesPromotionItemInstVOList || [];
				if(promotionItemInstList && promotionItemInstList.length>0){
					var attrList = util.ProdOfferHelper.getPromotionItemsAttr(this.getModel().promotionInstInfo.promotionId);
					for(var i=0;i<promotionItemInstList.length;i++){
						var promotionItemInstVO = promotionItemInstList[i];
						if(promotionItemInstVO.itemAttrId != "" && promotionItemInstVO.itemAttrId != null){
							var attrVO = dojo.filter(attrList||[],function(oneAttr){
								return oneAttr.attrCd == promotionItemInstVO.itemAttrId;
							})[0];
							if(attrVO && (attrVO.valueUnit == "D12" || attrVO.valueUnit == "D8")){//实例数据都是以分为单位，都需要转换为元
								promotionItemDefaultList[promotionItemInstVO.itemAttrId] = promotionItemInstVO.attrValue/100;
							}else{//非金钱相关属性
								promotionItemDefaultList[promotionItemInstVO.itemAttrId] = promotionItemInstVO.attrValue;
							}
						}
					}
				}
			}else{
				if(this.getModel().promotionInfoVO.salesPromotionChangeItemList){
					promotionItemList =this.getModel().promotionInfoVO.salesPromotionChangeItemList || [];
					var attrList = util.ProdOfferHelper.getPromotionItemsAttr(this.getModel().promotionInfoVO.promotionId);
					if(promotionItemList && promotionItemList.length>0){
						for(var i=0;i<promotionItemList.length;i++){
							var promotionItemVO = promotionItemList[i];
							if (promotionItemVO.itemAttrId != "" && promotionItemVO.itemAttrId != null) {
								var attrVO = dojo.filter(attrList||[],function(oneAttr){
									return oneAttr.attrCd == promotionItemVO.itemAttrId;
								})[0];
								if(attrVO && (attrVO.valueUnit == "D12" || attrVO.valueUnit == "D8")){//以分为单位
									promotionItemDefaultList[promotionItemVO.itemAttrId] = promotionItemVO.attrValue/100;
								}else{//单位为元或非金钱相关属性
				                	promotionItemDefaultList[promotionItemVO.itemAttrId] = promotionItemVO.attrValue;
								}
			                }
						}
					}
				}else{
					promotionItemList = this.getModel().promotionInfoVO.salesPromotionItemList || [];
					if(promotionItemList && promotionItemList.length>0){
						for(var i=0;i<promotionItemList.length;i++){
							var promotionItemVO = promotionItemList[i];
							var attrVO = promotionItemVO.attrSpec;
							if (promotionItemVO.attrValue != "" && promotionItemVO.attrValue != null) {
								if(attrVO.isFeeAttr == 1){//费用相关属性
									if(attrVO.valueUnit == "D12"){//分为单位
										promotionItemDefaultList[attrVO.attrCd] = promotionItemVO.attrValue/100;
									}else if(attrVO.valueUnit == "D8"){//元为单位
										promotionItemDefaultList[attrVO.attrCd] = promotionItemVO.attrValue;
									}
								}else{//非费用相关属性
									promotionItemDefaultList[attrVO.attrCd] = promotionItemVO.attrValue;
								}
			                }else{
			                	//没有默认值,添加【请选择】选项
			                	(attrVO.attrValueList||[]).unshift({
					                attrValueName : '\u8bf7\u9009\u62e9',
					                attrValue : ''
				                });
			                	//设置默认值为【请选择】
			                	promotionItemDefaultList[attrVO.attrCd] = "";
			                }
						}
					}
				}
			}
			return promotionItemDefaultList;
		},
		
		/**
		 * 是否可改
		 */
		initAttrDisabled : function(){
			var card = this.getCard(),
				promotionItemList = this.getModel().promotionInfoVO.salesPromotionItemList || [];
			if(this.getModel().promotionInstInfo){//存在实例数据-->用户已订购促销详情展示
				var promotionItemInstList = this.getModel().promotionInstInfo.salesPromotionItemInstVOList || [];
				BusCard.each(promotionItemInstList,function(promotionItemInst){
					if(card.$(promotionItemInst.itemAttrId)){
						card.$(promotionItemInst.itemAttrId).disabled = true;
					}
				});
			}else{//促销新装或变更/修改
				if(this.getModel().promotionInfoVO.flag && (this.getModel().promotionInfoVO.flag == "change" || this.getModel().promotionInfoVO.flag == "delete")){//变更/退订-->所有促销属性均不可修改
					BusCard.each(promotionItemList, function(promotionItemVO) {
						var attrVO = promotionItemVO.attrSpec;
						if(card.$(attrVO.attrCd)){
							card.$(attrVO.attrCd).disabled = true;
						}
			        });
				}else{//新装或修改-->根据配置时属性是否可改来限制页面属性是否可改
					BusCard.each(promotionItemList, function(promotionItemVO) {
						var attrVO = promotionItemVO.attrSpec;
						if (promotionItemVO.ifReadonly == 1 && attrVO.attrCd
								&& card.$(attrVO.attrCd)) {
							card.$(attrVO.attrCd).disabled = true;
						}else if(promotionItemVO.ifReadonly == 0 && attrVO.attrCd
								&& card.$(attrVO.attrCd)){
							card.$(attrVO.attrCd).disabled = false;
						}
			        });
				}
			}
		},
		
		/**
		 * 促销政策属性分组
		 */
		promotionAttrList : function(salesPromotionItemList){
			var itemCard = this,
				rentAttrList = [],//租机属性集合
				terminalList = [],//终端属性集合
				transferInfoList = [],//划拨属性信息集合
				agreementInfoList = [],//协议信息集合
				subsidyList = [],//补贴卷集合
				monthConvertList = [],//分月转兑信息集合
				wordsFeePresentList = [],//赠送话费信息集合
				yucunList = [],//赠送预存信息集合
				zifeiPresentList = [],//赠送资费信息集合
				giftList = [],//赠送礼品信息集合
				costList = [],//费用信息集合
				propertyXMLPath = "<attrList>";
			dojo.forEach(salesPromotionItemList || [],function(oneSalePromotionItem){
				if(oneSalePromotionItem.itemKind == groupKind.RENT){//租机
					rentAttrList.push(itemCard.changeAttrSpecNullable(oneSalePromotionItem));
				}else if(oneSalePromotionItem.itemKind == groupKind.TERMINAL){//终端
					terminalList.push(itemCard.changeAttrSpecNullable(oneSalePromotionItem));
				}else if(oneSalePromotionItem.itemKind == groupKind.TRANSFER_INFO){//划拨
					transferInfoList.push(itemCard.changeAttrSpecNullable(oneSalePromotionItem));
				}else if(oneSalePromotionItem.itemKind == groupKind.AGREEMENT_INFO){//协议
					agreementInfoList.push(itemCard.changeAttrSpecNullable(oneSalePromotionItem));
				}else if(oneSalePromotionItem.itemKind == groupKind.SUBSIDY){//补贴卷
					subsidyList.push(itemCard.changeAttrSpecNullable(oneSalePromotionItem));
				}else if(oneSalePromotionItem.itemKind == groupKind.MONTH_CONVERT){//分月转兑
					monthConvertList.push(itemCard.changeAttrSpecNullable(oneSalePromotionItem));
				}else if(oneSalePromotionItem.itemKind == groupKind.WORDS_FEE_AS_PRESENT){//赠送话费
					wordsFeePresentList.push(itemCard.changeAttrSpecNullable(oneSalePromotionItem));
				}else if(oneSalePromotionItem.itemKind == groupKind.YUCUN_PRESENT){//赠送预存
					yucunList.push(itemCard.changeAttrSpecNullable(oneSalePromotionItem));
				}else if(oneSalePromotionItem.itemKind == groupKind.ZIFEI_PRESENT){//赠送资费
					zifeiPresentList.push(itemCard.changeAttrSpecNullable(oneSalePromotionItem));
				}else if(oneSalePromotionItem.itemKind == groupKind.GIFT_PRESENT){//赠送礼品
					giftList.push(itemCard.changeAttrSpecNullable(oneSalePromotionItem));
				}else if(oneSalePromotionItem.itemKind == groupKind.COST){//费用
					costList.push(itemCard.changeAttrSpecNullable(oneSalePromotionItem));
				}
			});
			if(rentAttrList != null && rentAttrList.length>0){
				var rentLink = "<subGroup id='rendGroup' name='租机'>";
				propertyXMLPath += this.promotionAttrList2xml(rentLink,rentAttrList);
			}
			if(terminalList != null && terminalList.length>0){
				var terminalLink = "<subGroup id='terminalGroup' name='终端'>";
				propertyXMLPath += this.promotionAttrList2xml(terminalLink,terminalList);
			}
			if(transferInfoList != null && transferInfoList.length>0){
				var transferLink = "<subGroup id='transferGroup' name='划拨信息'>";
				propertyXMLPath += this.promotionAttrList2xml(transferLink,transferInfoList);
			}
			if(agreementInfoList != null && agreementInfoList.length>0){
				var agreementLink = "<subGroup id='agreementGroup' name='协议信息'>";
				propertyXMLPath += this.promotionAttrList2xml(agreementLink,agreementInfoList);
			}
			if(subsidyList != null && subsidyList.length>0){
				var subSidyLink = "<subGroup id='subsidyGroup' name='补贴卷'>";
				propertyXMLPath += this.promotionAttrList2xml(subSidyLink,subsidyList);
			}
			if(monthConvertList != null && monthConvertList.length>0){
				var monthConvertLink = "<subGroup id='monthConvertGroup' name='分月转兑配置'>";
				propertyXMLPath += this.promotionAttrList2xml(monthConvertLink,monthConvertList);
			}
			if(wordsFeePresentList != null && wordsFeePresentList.length>0){
				var wordsFeeLink = "<subGroup id='wordsFeeGroup' name='赠送话费设置'>";
				propertyXMLPath += this.promotionAttrList2xml(wordsFeeLink,wordsFeePresentList);
			}
			if(yucunList != null && yucunList.length>0){
				var yucunLink = "<subGroup id='yucunGroup' name='赠送预存设置'>";
				propertyXMLPath += this.promotionAttrList2xml(yucunLink,yucunList);
			}
			if(zifeiPresentList != null && zifeiPresentList.length>0){
				var zifeiLink = "<subGroup id='zifeiGroup' name='赠送资费设置'>";
				propertyXMLPath += this.promotionAttrList2xml(zifeiLink,zifeiPresentList);
			}
			if(giftList != null && giftList.length>0){
				var giftLink = "<subGroup id='giftGroup' name='赠送礼品设置'>";
				propertyXMLPath += this.promotionAttrList2xml(giftLink,giftList);
			}
			if(costList != null && costList.length>0){
				var costLink = "<subGroup id='costGroup' name='费用'>";
				propertyXMLPath += this.promotionAttrList2xml(costLink,costList);
			}
			propertyXMLPath += "</attrList>";
			return propertyXMLPath;
		},
		
		/**
		 * 更改属性是否展示属性值
		 */
		changeAttrSpecNullable : function(promotionItemVO){
			var attrVO = promotionItemVO.attrSpec;
			if(promotionItemVO.ifNecessary == 1){//必填项
				attrVO.nullable = false;
			}else if(promotionItemVO.ifNecessary == 0){//非必填项
				attrVO.nullable = true;
			}
			return attrVO;
		},
		
		/**
		 * 转化为卡片协议
		 */
		promotionAttrList2xml : function(propertyLink,propertyList){
			var propertyXMLPath = "";
			var propertyListXML = "<tp:for ds=list>"
				+ "<tp:if $$.valueShowType=='text'&&$$.nullable==true><attr colspan='1' id='#{$$.attrCd}' cType='1' label='#{$$.attrName}' isNull = '1' title='#{$$.attrDesc}' disabled=\"#{$$.isReadOnly =='0'?0:1}\"/></tp:if>"
				+ "<tp:if $$.valueShowType=='text'&&$$.nullable==false><attr colspan='1' id='#{$$.attrCd}' cType='1' label='#{$$.attrName}' isNull = '0' title='#{$$.attrDesc}' disabled=\"#{$$.isReadOnly =='0'?0:1}\"/></tp:if>"
				+ "<tp:if $$.valueShowType=='select'&&$$.nullable==true><attr colspan='1' id='#{$$.attrCd}' cType='2' label='#{$$.attrName}' isNull = '1' title='#{$$.attrDesc}' disabled=\"#{$$.isReadOnly =='0'?0:1}\"/></tp:if>"
		        + "<tp:if $$.valueShowType=='select'&&$$.nullable==false><attr colspan='1' id='#{$$.attrCd}' cType='2' label='#{$$.attrName}' isNull = '0' title='#{$$.attrDesc}' disabled=\"#{$$.isReadOnly =='0'?0:1}\"/></tp:if>"
		        + "<tp:if $$.valueShowType=='checkbox'&&$$.nullable==true><attr colspan='1' id='#{$$.attrCd}' cType='3' label='#{$$.attrName}' isNull = '1' title='#{$$.attrDesc}' disabled=\"#{$$.isReadOnly =='0'?0:1}\"/></tp:if>"
		        + "<tp:if $$.valueShowType=='checkbox'&&$$.nullable==false><attr colspan='1' id='#{$$.attrCd}' cType='3' label='#{$$.attrName}' isNull = '0' title='#{$$.attrDesc}' disabled=\"#{$$.isReadOnly =='0'?0:1}\"/></tp:if>"
		        + "<tp:if $$.valueShowType=='radiobox'&&$$.nullable==true><attr colspan='1' id='#{$$.attrCd}' cType='13' label='#{$$.attrName}' isNull = '1' title='#{$$.attrDesc}' disabled=\"#{$$.isReadOnly =='0'?0:1}\"/></tp:if>"
		        + "<tp:if $$.valueShowType=='radiobox'&&$$.nullable==false><attr colspan='1' id='#{$$.attrCd}' cType='13' label='#{$$.attrName}' isNull = '0' title='#{$$.attrDesc}' disabled=\"#{$$.isReadOnly =='0'?0:1}\"/></tp:if>"
		        + "<tp:if $$.valueShowType=='date'&&$$.nullable==true><attr colspan='1' id='#{$$.attrCd}' cType='4' label='#{$$.attrName}' isNull = '1' title='#{$$.attrDesc}' disabled=\"#{$$.isReadOnly =='0'?0:1}\"/></tp:if>"
		        + "<tp:if $$.valueShowType=='date'&&$$.nullable==false><attr colspan='1' id='#{$$.attrCd}' cType='4' label='#{$$.attrName}' isNull = '0' title='#{$$.attrDesc}' disabled=\"#{$$.isReadOnly =='0'?0:1}\"/></tp:if>"
		        + "<tp:if $$.valueShowType=='pwd'&&$$.nullable==true><attr colspan='1' id='#{$$.attrCd}' cType='8' label='#{$$.attrName}' isNull = '1' title='#{$$.attrDesc}' disabled=\"#{$$.isReadOnly =='0'?0:1}\"/></tp:if>"
		        + "<tp:if $$.valueShowType=='pwd'&&$$.nullable==false><attr colspan='1' id='#{$$.attrCd}' cType='8' label='#{$$.attrName}' isNull = '0' title='#{$$.attrDesc}' disabled=\"#{$$.isReadOnly =='0'?0:1}\"/></tp:if>"
	        	+ "</tp:for>";
	        var propertyCard = BusCard.Template.create(propertyListXML);
	        propertyXMLPath = propertyLink + propertyCard.apply({
	        	list : propertyList
	        })+ "</subGroup>";
	        return propertyXMLPath;
		}
	});
});