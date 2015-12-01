defineModule("orderaccept.prodofferaccept.widget.attrcard.ProductOfferAttrCardWidget",
        ["orderaccept.prodofferaccept.widget.attrcard.ProductAttrCardWidget", "orderaccept.prodofferaccept.util"],
        function(ProductAttrCardWidget, util) {
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
	        dojo.declare("orderaccept.prodofferaccept.widget.attrcard.ProductOfferAttrCardWidget",
	                [ProductAttrCardWidget], {
		                delayCreateBeforeBindModel : true,
		                needRendering : true,
		                NOOP : function() {},
		                productServiceRelVO : null,
		                attrUseConfigList : null,
		                attrControlSpecialList : null,
		                postMixInProperties : function() {
			                var modelData = this.getModel(),
				                prodOfferInfoVO = modelData.prodOfferInfoVO,
				                protocolInstanceXml = "<?xml version='1.0' encoding='UTF-8'?>\
								<card id='${cardId}' cardType='0' name='属性信息' pageColumn='2' xmlns='http://www.crm1.com/buscard'><metaData>\
				             	 ${productAttrList}\
				             	 </metaData>${resource}</card>",
				                cardId = "prodAttr_" + prodOfferInfoVO.prodOfferId,
				                productAttrLink = "<subGroup id='productAttr' name='销售品基本属性'>",
				                prodcutAttrMoreLink = "<subGroup id='productAttrMore' name='销售品扩展属性'>",
				                productOfferAttrLink = "<subGroup id='productAttr' name='销售品基本属性'>",
				                prodcutOfferAttrMoreLink = "<subGroup id='productAttrMore' name='销售品扩展属性'>",
				                finalXml = "",
				                cardWidget = this;
			                this.prodOfferInfoVO = prodOfferInfoVO;
			                if (this.checkIfNeedRendering(prodOfferInfoVO.attrList || [])) {
				                this.loadAndSetAttrConfigData();
				                var filterResult = this.filterResult = this
				                        .filterPricingParamAttr(prodOfferInfoVO.attrList);
				                var _string = this.prodAttrList2xml(filterResult.exclusiveList, productOfferAttrLink,
				                        prodcutOfferAttrMoreLink);
				                
				                finalXml = BusCard.Template.create(protocolInstanceXml).apply({
					                        cardId : cardId,
					                        productAttrList : _string,
					                        resource : this.buildBusCardResource()
				                        });
				                // 生成widget的templateString
				                this.templateString = finalXml;
			                } else {
				                this.buildRendering = this.NOOP;
				                this.postCreate = this.NOOP;
				                
			                }
			                
		                },
		                postRenderingHandle : function() {
			                var cardWidget = this;
			                cardWidget.renderPricingParamTabPage();
			                cardWidget.initProductAttr(this.busCardInstance);
			                cardWidget.initProdSelect(this.busCardInstance);
			                cardWidget.initLength();
			                cardWidget.initDisplayElement();
			                cardWidget.initSpecialValueByAttrCode();
			                cardWidget.renderDefaultValue();
			                cardWidget.initAttrDisabled();
			                cardWidget.initProdOfferAttrInst();
			                cardWidget.bindUpdateEventForExprAttr();
			                // cardWidget.dealAttrIsInstance();
			                
		                },
		                _pricingParamCardCallback : function() {
			                var card = this;
			                var addIconUrl = "/common/images/icon/plus_icon.png";
			                var widget = dijit.byId(this.getCardRelationInfo().targetWidgetId);
			                var attrList = widget.filterResult.includeList;
			                dojo.forEach(dojo.query(".buscard-row", card.dom), function(dom) {
				                        return dom.style.clear = "both";
			                        });
			                dojo.forEach(attrList, function(attrVO) {
				                var id = "" + (attrVO.attrId || attrVO.attrCd);
				                var dom = card.$(id),
					                labelDom = card.$("label_" + id);
				                if (dom) {
					                var elemParam = dojo.map(attrVO.attrValueList, function(valueVO) {
						                        return {
							                        id : valueVO.attrValue,
							                        name : valueVO.attrValueName
							                        
						                        }
					                        });
					                // combobox implement
					                if (dom.tagName.toUpperCase() == 'INPUT') {
						                dom.onquery = function(_card, _buscard, param) {
							                return elemParam;
						                };
					                } else if (dom.tagName.toUpperCase() == 'SELECT') {
						                BusCard.$rs(dom, elemParam);
						                
					                }
					                dom.parentNode.style.width = 'auto';
					                dojo.style(labelDom, {
						                        width : 'auto',
						                        textAlign : 'left'
					                        });
					                // 多选
					                if (!attrVO.unique) {
						                var addNode = document.createElement("img");
						                dojo.style(addNode, {
							                        width : '16px',
							                        height : '16px',
							                        cursor : 'pointer',
							                        marginLeft : '5px'
						                        });
						                dojo.attr(addNode, {
							                        attrCd : id
						                        });
						                addNode.src = BusCard.path.contextPath + addIconUrl;
						                dom.parentNode.parentNode.appendChild(addNode);
						                labelDom.parentNode.style.borderBottom = "1px silver dashed";
						                var innerHTML = "<div class='pricingParam-"
						                        + id
						                        + "' style='clear:both'><div style='width:30%;float:left' column='0'></div><div style='width:30%;float:left' column='1'></div><div style='width:30%;float:left' column='2'></div></div>";
						                dojo.place(innerHTML, labelDom.parentNode, "after");
						                dojo.connect(addNode, "onclick", function() {
							                        return widget.onPricingParamAdd(widget, card, this);
							                        
						                        });
					                }
					                
				                }
				                
			                });
		                },
		                
		                selectColumn : function(container) {
			                var column1 = dojo.query("[column=0]", container)[0];
			                var column2 = dojo.query("[column=1]", container)[0];
			                var column3 = dojo.query("[column=2]", container)[0];
			                var columnList = [column1, column2, column3];
			                columnList.sort(function(node1, nodes) {
				                        var c1 = node1.getElementsByTagName("input").length;
				                        var c2 = nodes.getElementsByTagName("input").length;
				                        if (c1 > c2) {
					                        return 1;
				                        } else if (c1 < c2) {
					                        return -1;
				                        } else {
					                        return 0;
				                        }
			                        });
			                return columnList[0];
			                
		                },
		                onPricingParamAdd : function(widget, card, dom) {
			                var attrCd = dojo.attr(dom, "attrCd");
			                var elem = card.$(attrCd);
			                var cityValue = elem.value;
			                var cityText = elem.options[elem.selectedIndex].text;
			                var tp = "<input type='checkbox'  style='margin-left:5px;margin-right:5px;vertical-align:baseline;' CHECKED class='pricing-city' value='${value}'><span name='text-${value}'>${text}</span>";
			                var container = dojo.query(".pricingParam-" + attrCd, card.dom)[0];
			                var columnNode = this.selectColumn(container);
			                var existNode = dojo.query("input[value=" + cityValue + "]", container)[0];
			                if (existNode) {
				                alert("选择已存在");
				                try {
					                existNode.focus();
				                }
				                catch (e) {}
				                
			                } else {
				                dojo.place(BusCard.Template.create(tp).apply({
					                                value : cityValue,
					                                text : cityText
				                                }), columnNode, "last");
			                }
			                
		                },
		                renderPricingParamTabPage : function(cb) {
			                var cardWidget = this;
			                var includeList = cardWidget.filterResult.includeList;
			                if (includeList && includeList.length > 0) {
				                var tabContainer = orderaccept.prodofferaccept.util.DomHelper.getParentWidget(
				                        cardWidget.domNode, "unieap.layout.TabContainer"),
					                offsetHeight = tabContainer.domNode.clientHeight,
					                offsetWidth = tabContainer.domNode.clientWidth,
					                contentPane = new unieap.layout.ContentPane({
						                        title : '定价参数'
					                        }),
					                attrBuscard = BusCard.Template.create(this.convertTemplate),
					                prodAttrXMLPath = "<attrList>" + attrBuscard.apply({
						                        list : includeList
					                        }) + "</attrList>",
					                protocolInstanceXml = "<?xml version='1.0' encoding='UTF-8'?>\
										<card id='${cardId}'  cardType='0' name='定价参数' pageColumn='1' xmlns='http://www.crm1.com/buscard'><metaData>\
				             	 		${productAttrList}\
				             		 </metaData></card>",
					                xmlData = BusCard.Template.create(protocolInstanceXml).apply({
						                        productAttrList : prodAttrXMLPath,
						                        cardId : 'pricingParam'
						                        
					                        });
				                tabContainer.addChild(contentPane);
				                // tabContainer.domNode.style.width =
				                // offsetWidth + "px";
				                // tabContainer.domNode.style.height =
				                // offsetHeight + "px";
				                cardWidget.pricingParamCard = BusCard.createInstance({
					                        targetWidgetId : this.id
				                        }, contentPane.containerNode, {
					                        gType : 3,
					                        xmlData : xmlData
					                        
				                        });
				                cardWidget.pricingParamCard.dom.style.width = '400px';
				                cardWidget.pricingParamCard.init(cardWidget._pricingParamCardCallback);
			                }
			                
		                },
		                /**
						 * 初始化属性实例值
						 */
		                initProdOfferAttrInst : function() {
			                var card = this.getCard(),
				                cardWidget = this,
				                offerInstVO = this.getModel().offerInstVO,
				                attrInstList = null,
				                attrObj = {};
			                if (offerInstVO && (attrInstList = offerInstVO.offerInstAttrList)) {
				                dojo.forEach(attrInstList, function(attrVO) {
					                        attrObj[attrVO.attrCd] = cardWidget.validateValue(attrVO.attrValue)
					                                ? attrVO.attrValue
					                                : "";
				                        });
				                dojo.forEach(cardWidget.prodOfferInfoVO.attrList, function(attrVO) {
					                        if (!!attrObj[attrVO.attrCd]) {
						                        cardWidget.convertFeeAttrInst(attrVO, attrObj[attrVO.attrCd]);
					                        }
				                        });
				                cardWidget.busCardInstance.renderDefaultValue(attrObj);
				                
			                }
			                
		                },
		                /**
						 * 根据属性配置是否生成实例来处理页面
						 */
		                dealAttrIsInstance : function() {
			                var card = this.getCard(),
				                prodAttrList = this.getModel().prodOfferInfoVO.attrList || [];
			                BusCard.each(prodAttrList || [], function(attrVO) {
				                        var elem = card.$(attrVO.attrCd + "");
				                        // 不实例化
				                        if (attrVO.isTemp == "0" || attrVO.isTemp == 0) {
					                        elem.removeAttribute("controlfieldname");
				                        }
			                        });
		                },
		                
		                /**
		                 * 根据属性表达式来配置属性的值
		                 * 
		                 * @method
		                 */
		                bindUpdateEventForExprAttr : function(){
		                	var attrList = this.getModel().prodOfferInfoVO.attrList || [],
		                		buscardWidget = this,
				                card = this.getCard();
				           	BusCard.each(attrList, function(attrVO) {
								var targetAttrElem = card.$(attrVO.attrCd + "");
								if (!targetAttrElem) return;
								var attrValueExpressionsVO = attrVO.attrValueExpressionsVO;
								if (attrValueExpressionsVO) {
									var attrCdList = buscardWidget.extractRelaAttrIdList(attrValueExpressionsVO.valueExpressions);
									BusCard.each(attrCdList, function(attrCd) {
										var attrElem = card.$(attrCd);
										if (attrElem && attrElem.tagName == "INPUT") {
											card.addElemEventListener(attrCd, "blur", function() {
														targetAttrElem.value = buscardWidget.computeExpr(card, attrValueExpressionsVO.valueExpressions);
													});
										}
										else if (attrElem && attrElem.tagName == "SELECT") {
											card.addElemEventListener(attrCd, "change", function() {
														targetAttrElem.value = buscardWidget.computeExpr(card, attrValueExpressionsVO.valueExpressions);
													});
										}
	
									});
			
								}
			
							});
		                },
		                
		                
		                /**
						 * 初始化选择框
						 * 
						 * @method
						 */
		                initProdSelect : function() {
			                var card = this.getCard(),
				                attrList = this.getModel().prodOfferInfoVO.attrList || [];
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
				                        var selectNode = card.$(attrVO.attrCd);
				                        // PPM不配置的话不处理
				                        if (selectParamList && selectParamList.length > 0) {
					                        BusCard.$rs(selectNode, selectParamList, true);
				                        }
				                        util.DomHelper.enableTitle(selectNode);
				                        
			                        });
			                
		                },
		                /**
						 * 设置文本的最大长度
						 * 
						 * @method
						 */
		                initLength : function() {
			                var card = this.getCard(),
				                prodAttrList = this.getModel().prodOfferInfoVO.attrList || [];
			                BusCard.each(prodAttrList || [], function(attrVO) {
				                        var elem = card.$(attrVO.attrCd + "");
				                        if (elem && attrVO.attrLeng) {
					                        elem.maxLength = attrVO.attrLeng;
				                        }
			                        });
			                
		                },
		                
		                /**
						 * 根据产品属性配置初始化特殊的属性值
						 * 
						 * @method
						 */
		                initSpecialValueByAttrCode : function(card) {
			                var card = this.busCardInstance,
				                attrList = this.getModel().prodOfferInfoVO.attrList || [];
			                if (attrList != null && attrList.length > 0) {
				                for (var i = 0, len = attrList.length; i < len; i++) {
					                var attrVO = attrList[i];
					                if (attrVO.attrValueCode == "L8" && attrVO.valueShowType == "text") {
						                card.$(attrVO.attrCd).value = util.AttrUtil.getRandomPassword();
					                }
					                if (attrVO.attrValueCode == "E0" && attrVO.valueShowType == "text") {
					                	card.$(attrVO.attrCd).onblur = function() {
											if(!util.AttrUtil.nas_email_check_sirp('【Email地址】',this,'')){
												this.value='';
												this.focus();
											}
										};
					                }
					                if (attrVO.attrValueCode == "L1" && attrVO.valueShowType == "text") {
					                	card.$(attrVO.attrCd).onblur = function() {
											util.AttrUtil.checkNumberValue(this,attrVO);
										};
					                }
				                }
			                }
		                },
		                /**
						 * 初始化不展现的元素
						 * 
						 * @method
						 */
		                initDisplayElement : function(card) {
			                var card = this.busCardInstance,
				                attrList = this.getModel().prodOfferInfoVO.attrList || [];
			                if (attrList != null && attrList.length > 0) {
				                for (var i = 0, len = attrList.length; i < len; i++) {
					                var attrVO = attrList[i];
					                if (attrVO.ifDisplay == "0") {
						                card.hidden(attrVO.attrCd + "");
					                }
				                }
			                }
		                },
		                /**
						 * 获取属性默认值 这一步当做变更时需要用属性实例值覆盖规格层面上的 默认值
						 * 
						 * @method
						 */
		                getDefaultValue : function() {
			                var attrList = this.getModel().prodOfferInfoVO.attrList || [],
				                attrDefaultList = {};
			                if (attrList != null && attrList.length > 0) {
				                for (var i = 0, len = attrList.length; i < len; i++) {
					                var attrVO = attrList[i];
					                // 为可选择保留空字符串作为默认值
					                if (attrVO.defaultValue != null) {
						                attrDefaultList[attrVO.attrCd] = this.convertFeeAttrDefault(attrVO);
					                }
				                }
			                }
			                return attrDefaultList;
		                },
		                /**
						 * 根据配置 disable 相关属性
						 * 
						 * @method
						 */
		                initAttrDisabled : function() {
			                var attrList = this.getModel().prodOfferInfoVO.attrList || [],
				                card = this.getCard();
			                BusCard.each(attrList, function(attrVO) {
				                        if (attrVO.ifDisabled && attrVO.attrCd && card.$(attrVO.attrCd)) {
					                        card.$(attrVO.attrCd).disabled = true;
				                        }
				                        
			                        });
		                },
		                getPageData : function() {
			                var data = this.inherited(arguments);
			                if (this.pricingParamCard) {
				                var pricingParamCard = this.pricingParamCard,
					                widget = dijit.byId(pricingParamCard.getCardRelationInfo().targetWidgetId);
				                var attrList = widget.filterResult.includeList;
				                var obj = {};
				                dojo.forEach(attrList, function(attrVO) {
					                        var id = attrVO.attrCd || attrVO.attrId;
					                        if (attrVO.unique) {
						                        obj[id] = pricingParamCard.$(id).value;
					                        } else {
						                        var selectedNodeContainer = dojo.query(".pricingParam-" + id,
						                                pricingParamCard.dom)[0];
						                        var checkedBoxList = dojo.query(":checked", selectedNodeContainer);
						                        obj[id] = dojo.map(checkedBoxList, function(node) {
							                                return node.value;
						                                });
						                        
					                        }
					                        
				                        });
				                dojo.mixin(data, obj);
			                }
			                return data;
		                }
		                
	                });
	        
        });