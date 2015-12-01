defineModule("orderaccept.prodofferaccept.widget.attrcard.OfferAgreementCardWidget", ["./ProductOfferAttrCardWidget"],
        function(ProductAttrCardWidget) {
	        /**
			 * 产品属性卡片widget,使用此类之前需先绑定model数据,model中需要包括销售品,产品规格层面的
			 * 数据,如果做变更业务,同时需要包括产品实例数据
			 * 
			 * @param {Object} model.prodOfferInfoVO
			 * @param {Object} model.prodInstVO
			 * 
			 * @class
			 * @module
			 */
	        dojo.declare("orderaccept.prodofferaccept.widget.attrcard.OfferAgreementCardWidget",
	                [ProductAttrCardWidget], {
		                delayCreateBeforeBindModel : true,
		                needRendering : true,
		                NOOP : function() {},
		                computedAttrList : [],
		                attrCdList : {
			                effUnitAttrCd : 300010,
			                effValueAttrCd : 300012
		                },
		                postMixInProperties : function() {
			                var modelData = this.getModel(),
				                prodOfferInfoVO = modelData.prodOfferInfoVO,
				                protocolInstanceXml = "<?xml version='1.0' encoding='UTF-8'?>\
								<card id='${cardId}' cardType='0' name='销售品协议信息' pageColumn='2' xmlns='http://www.crm1.com/buscard'><metaData>\
				             	 ${productAttrList}\
				             	 </metaData></card>",
				                cardId = "offerAgreementAttr_" + prodOfferInfoVO.productId,
				                agreementAttrLink = "<subGroup id='productAttr' name='基本属性'>",
				                agreementAttrMoreLink = "<subGroup id='productAttrMore' name='更多属性'>",
				                finalXml = "",
				                cardWidget = this;
			                
			                this.computedAttrList = this.convertAttrList(this.getSpecAttrList(prodOfferInfoVO), this
			                                .getModel().config);
			                
			                if (this.checkIfNeedRendering(this.computedAttrList || [])) {
				                var _string = this.prodAttrList2xml(this.computedAttrList, agreementAttrLink,
				                        agreementAttrMoreLink);
				                
				                finalXml = BusCard.Template.create(protocolInstanceXml).apply({
					                        cardId : cardId,
					                        productAttrList : _string
				                        });
				                // 生成widget的templateString
				                this.templateString = finalXml;
			                } else {
				                this.buildRendering = this.NOOP;
				                this.postCreate = this.NOOP;
				                
			                }
			                this.addCardCallback(function() {

			                        });
			                
		                },
		                postRenderingHandle : function() {
			                var cardWidget = this;
			                cardWidget.initProductAttr(this.busCardInstance);
			                cardWidget.initProdSelect(this.busCardInstance);
			                cardWidget.renderDefaultValue();
			                cardWidget.initAttrDisabled();
			                cardWidget.initProdOfferAttrInst();
			                cardWidget.asyncLoadConfigScript();
			                
		                },
		                initProdSelect : function() {
			                var card = this.getCard(),
				                attrList = this.computedAttrList || [];
			                selectAttrList = BusCard.findAll(attrList, function(attrVO) {
				                        return (/select/i.test(attrVO.valueShowType));
			                        });
			                BusCard.each(selectAttrList, function(attrVO) {
				                        var attrValueList = attrVO.attrValueList || [],
					                        selectParamList = BusCard.map(attrValueList, function(valueVO) {
						                                return {
							                                id : valueVO.attrValue,
							                                name : valueVO.attrValueName
						                                };
					                                });
				                        BusCard.$rs(card.$(attrVO.attrCd), selectParamList);
				                        
			                        });
			                
		                },
		                /**
						 * @override
						 * @method
						 */
		                getDefaultValue : function() {
			                var attrList = this.computedAttrList || [],
				                attrDefaultList = {};
			                if (attrList != null && attrList.length > 0) {
				                for (var i = 0, len = attrList.length; i < len; i++) {
					                var attrVO = attrList[i];
					                if (attrVO.defaultValue != "" && attrVO.defaultValue != null) {
						                attrDefaultList[attrVO.attrCd] = this.convertFeeAttrDefault(attrVO);
					                }
				                }
			                }
			                return attrDefaultList;
		                },
		                /**
						 * @method
						 * @override
						 */
		                asyncLoadConfigScript : function() {
			                return false;
		                },
		                /**
						 * 费用分转换成元
						 */
		                feeConfigScript : function(busCardInstance) {
			                var feeNode = busCardInstance.$('300008');
			                if (feeNode != null) {
				                var _value = feeNode.value;
				                dojo.attr(feeNode, {
					                        rvalue : _value
				                        });
				                feeNode.value = parseInt(_value + "") / 100;
			                }
		                },
		                /**
						 * 转换包年属性
						 * 
						 * @method
						 */
		                convertAttrList : function(attrList, config) {
			                
			                var unitAttrVO = BusCard.jsonPath(attrList, "$[?(@.attrCd=="
			                                + this.attrCdList.effUnitAttrCd + ")]"),
				                valueAttrVO = BusCard.jsonPath(attrList, "$[?(@.attrCd=="
				                                + this.attrCdList.effValueAttrCd + ")]"),
				                config = config || {},
				                
				                resultList = [];
			                
			                if (unitAttrVO && valueAttrVO) {
				                var beginDate = config.beginDate;
				                if (dojo.isString(beginDate)) {
					                beginDate = orderaccept.prodofferaccept.util.DateHelper
					                        .getDateFromString(beginDate).getTime();
					                
				                } else if (!beginDate) {
					                beginDate = $ac$.get("requestParam").today ? $ac$.get("requestParam").today : orderaccept.prodofferaccept.util.DateHelper.format(new Date());
				                }
				                unitAttrVO = unitAttrVO[0];
				                valueAttrVO = valueAttrVO[0];
				                //var dateUtils = BusCard
				                        //.$load("com.neusoft.crm.ordermgr.common.util.dateutil.DateUtils"),
					                //computedDateMap = dateUtils.add(beginDate, parseInt(""
					                                //+ (unitAttrVO.attrValue || 1)), parseInt(""
					                                //+ (valueAttrVO.attrValue || 1)));
				                computedDateMap = orderaccept.prodofferaccept.util.DateHelper.computationOfferStandardTime(beginDate,parseInt(""+(unitAttrVO.attrValue || 1)),parseInt(""+(valueAttrVO.attrValue || 1)));
				                dojo.forEach(attrList, function(vo) {
					                        if (vo === unitAttrVO || vo === valueAttrVO) {
						                        return;
					                        } else {
						                        resultList.push(vo);
					                        }
					                        
				                        });
				                resultList.unshift({
					                        "nullable" : true,
					                        "attrCd" : "expDate",
					                        "attrValue" : computedDateMap.timeString,
					                        "valueShowType" : "text",
					                        "attrName" : "协议结束时间",
					                        "defaultValue" : computedDateMap.timeString
					                        
				                        });
				                resultList.unshift({
					                        "nullable" : true,
					                        "attrCd" : "effDate",
					                        "attrValue" : computedDateMap.currentTimeString,
					                        "valueShowType" : "text",
					                        "attrName" : "协议开始时间",
					                        "defaultValue" : computedDateMap.currentTimeString
					                        
				                        });
				                
				                return resultList;
				                
			                }
			                return resultList;
			                
		                },
		                getSpecAttrList : function(prodOfferInfoVO) {
			                var agreementList = prodOfferInfoVO.offerAgreementVO || [],
				                attrList = [];
			                if (agreementList[0]) {
				                var itemList = agreementList[0].itemList || [];
				                dojo.forEach(itemList, function(item) {
					                        var _agreetmentInfo = {},
						                        attrVO = item.attrVO;
					                        for (var index in item) {
						                        if (!(dojo.isObject(item[index]) || dojo.isArray(item[index]))) {
							                        _agreetmentInfo[index] = item[index];
						                        }
						                        
					                        }
					                        dojo.mixin(attrVO, _agreetmentInfo);
					                        dojo.mixin(attrVO, {
						                                defaultValue : item.attrValue
					                                });
					                        attrList.push(attrVO);
					                        
				                        });
			                }
			                return attrList;
			                
		                },
		                /**
						 * 初始化属性实例值
						 */
		                initProdOfferAttrInst : function() {
			                return false;
		                },
		                
		                /**
						 * 根据配置 disable 相关属性
						 * 
						 * @override
						 * @method
						 */
		                initAttrDisabled : function() {
			                var attrList = this.computedAttrList || [],
				                card = this.getCard();
			                BusCard.each(attrList, function(attrVO) {
				                        if (attrVO.attrCd && card.$(attrVO.attrCd)) {
					                        card.$(attrVO.attrCd).disabled = true;
				                        }
				                        
			                        });
		                },
		                /**
						 * 重新设置宽带标准化套餐的开始时间和结束时间
						 */
		                resetOfferStandardTime : function(startTime) {
			                var unitAttrVO = BusCard.jsonPath(this.getSpecAttrList(this.getModel().prodOfferInfoVO),
			                        "$[?(@.attrCd==" + this.attrCdList.effUnitAttrCd + ")]"),
				                valueAttrVO = BusCard.jsonPath(this.getSpecAttrList(this.getModel().prodOfferInfoVO),
				                        "$[?(@.attrCd==" + this.attrCdList.effValueAttrCd + ")]");
			                if (unitAttrVO && valueAttrVO) {
				                unitAttrVO = unitAttrVO[0];
				                valueAttrVO = valueAttrVO[0];
				                //var dateUtils = BusCard
				                        //.$load("com.neusoft.crm.ordermgr.common.util.dateutil.DateUtils"),
					                //computedDateMap = dateUtils.add(startTime, parseInt(""
					                                //+ (unitAttrVO.attrValue || 1)), parseInt(""
					                                //+ (valueAttrVO.attrValue || 1)));
					            computedDateMap = orderaccept.prodofferaccept.util.DateHelper.computationOfferStandardTime(startTime,parseInt(""+(unitAttrVO.attrValue || 1)),parseInt(""+(valueAttrVO.attrValue || 1)));
			                }
			                var card = this.getCard();
			                card.$('expDate').value = computedDateMap.timeString;
			                card.$('effDate').value = computedDateMap.currentTimeString;
		                }
		                
	                });
	        
        });