defineModule("orderaccept.prodofferaccept.widget.attrcard.ProductAttrCardWidget", ["../../../custom/_BaseWidget",
                "../../../custom/_BusCardTemplated", "dijit._Contained", "orderaccept.prodofferaccept.util",
                "orderaccept.common.js.ConstantsPool"], function(_Widget, _Templated, _Contained, util, ConstantsPool) {
	        /**
			 * 产品属性卡片widget,使用此类之前需先绑定model数据,model中需要包括销售品,产品规格层面的
			 * 数据,如果做变更业务,同时需要包括产品实例数据
			 * 
			 * @param {Object} model.productInfoVO
			 * @param {Object} model.prodOfferInfoVO
			 * @param {Object} model.prodInstVO
			 * 
			 * @class
			 * @module
			 */
	        dojo.declare("orderaccept.prodofferaccept.widget.attrcard.ProductAttrCardWidget", [_Widget, _Templated,
	                        _Contained], {
		                delayCreateBeforeBindModel : true,
		                needRendering : true,
		                convertTemplate : "<tp:for ds=list>"
		                        + "<tp:if $$.valueShowType=='text'><attr colspan='1' id='#{$$.attrCd}' cType='1' label='#{$$.attrName}' isNull = '${$$.nullable?1:0}' title='#{$$.attrDesc}' disabled=\"#{$$.isReadOnly =='0'?0:1}\"/></tp:if>"
		                        + "<tp:if $$.valueShowType=='select'><attr colspan='1' id='#{$$.attrCd}' cType='2' label='#{$$.attrName}' isNull = '${$$.nullable?1:0}' title='#{$$.attrDesc}' disabled=\"#{$$.isReadOnly =='0'?0:1}\"/></tp:if>"
		                        + "<tp:if $$.valueShowType=='checkbox'><attr colspan='1' id='#{$$.attrCd}' cType='3' label='#{$$.attrName}' isNull = '${$$.nullable?1:0}' title='#{$$.attrDesc}' disabled=\"#{$$.isReadOnly =='0'?0:1}\"/></tp:if>"
		                        + "<tp:if $$.valueShowType=='radiobox'><attr colspan='1' id='#{$$.attrCd}' cType='13' label='#{$$.attrName}' isNull = '${$$.nullable?1:0}' title='#{$$.attrDesc}' disabled=\"#{$$.isReadOnly =='0'?0:1}\"/></tp:if>"
		                        + "<tp:if $$.valueShowType=='date'><attr colspan='1' id='#{$$.attrCd}' cType='4' label='#{$$.attrName}' isNull = '${$$.nullable?1:0}' title='#{$$.attrDesc}' disabled=\"#{$$.isReadOnly =='0'?0:1}\"/></tp:if>"
		                        + "<tp:if $$.valueShowType=='pwd'><attr colspan='1' id='#{$$.attrCd}' cType='8' label='#{$$.attrName}' isNull = '${$$.nullable?1:0}' title='#{$$.attrDesc}' disabled=\"#{$$.isReadOnly =='0'?0:1}\"/></tp:if>"
		                        + "<tp:if $$.valueShowType=='textarea'><attr colspan='4' id='#{$$.attrCd}' cType='14' label='#{$$.attrName}' isNull = '${$$.nullable?1:0}' title='#{$$.attrDesc}' disabled=\"#{$$.isReadOnly =='0'?0:1}\"/></tp:if>"
		                        + "<tp:if $$.valueShowType=='page'><attr colspan='1' id='#{$$.attrCd}' cType='10' label='#{$$.attrName}' isNull = '${$$.nullable?1:0}' title='#{$$.attrDesc}' disabled=\"#{$$.isReadOnly =='0'?0:1}\"/></tp:if>"
		                        + "<tp:if $$.valueShowType=='comboBox'><attr colspan='1' id='#{$$.attrCd}' cType='11' label='#{$$.attrName}' isNull = '${$$.nullable?1:0}' title='#{$$.attrDesc}' disabled=\"#{$$.isReadOnly =='0'?0:1}\"/></tp:if>"
		                        + "</tp:for>",
		                NOOP : function() {},
		                isAccessProduct : null,
		                busCardInstance : null,
		                productAttrLink : "<subGroup id='productAttr' name='产品基本属性'>",
		                prodcutAttrMoreLink : "<subGroup id='productAttrMore' name='产品扩展属性'>",
		                productServiceRelVO : null,
		                attrUseConfigList : null,
		                attrControlSpecialList : null,
		                postMixInProperties : function() {
			                var modelData = this.getModel(),
				                cardWidget = this,
				                pageColumn = 2,
				                accessProdFuncType = ConstantsPool.load(["ProductFuncTypeConst"]).ProductFuncTypeConst.ACCESS;
			                cardWidget.productInfoVO = modelData.productInfoVO; // 产品
			                cardWidget.prodOfferInfoVO = modelData.prodOfferInfoVO;// 销售品
			                cardWidget.prodInstVO = modelData.prodInstVO;
			                if (cardWidget.productInfoVO.prodFuncType == accessProdFuncType) {
				                this.isAccessProduct = true;
				                pageColumn = 4;
				                this.findAndSetProdInstVO(modelData.uniqueId);
				                
			                }
			                var protocolInstanceXml = "<?xml version='1.0' encoding='UTF-8'?>\
								<card id='${cardId}'  cardType='0' name='属性信息' pageColumn='${$$.pageColumn?$$.pageColumn:2}' xmlns='http://www.crm1.com/buscard'><metaData>\
				             	 ${productAttrList}\
				             	 </metaData>${resource}</card>",
				                cardId = "prodAttr_" + cardWidget.productInfoVO.productId,
				                finalXml = "";
			                
			                if (this.checkIfNeedRendering(cardWidget.productInfoVO.attrList)) {
				                // 读取订单端的属性信息,包括回调和其他特殊配置
				                this.loadAndSetAttrConfigData();
				                var _string = this.prodAttrList2xml(cardWidget.productInfoVO.attrList,
				                        this.productAttrLink, this.prodcutAttrMoreLink);
				                
				                finalXml = BusCard.Template.create(protocolInstanceXml).apply({
					                        cardId : cardId,
					                        pageColumn : pageColumn,
					                        productAttrList : _string,
					                        resource : this.buildBusCardResource()
				                        });
				                // 生成widget的templateString
				                this.templateString = finalXml;
				                
			                } else {
				                this.buildRendering = this.NOOP;
				                this.postCreate = this.NOOP;
				                
			                }
			                // this.addCardCallback(function() {
			                
			                // });
			                
		                },
		                postRenderingHandle : function() {
		                	var cardWidget = this;
			                cardWidget.initProductAttr(this.busCardInstance);
			                cardWidget.initProdSelect(this.busCardInstance);
			                cardWidget.initLength();
			                cardWidget.initDisplayElement();
			                cardWidget.initSpecialValueByAttrCode();
			                cardWidget.renderDefaultValue();
			                cardWidget.initAttrDisabled();
			                cardWidget.initProdAttrInst();
			                cardWidget.bindUpdateEventForExprAttr();
			                //cardWidget.dealAttrIsInstance();
			                this.busCardInstance.addEventListener("oncomplete",function(){
			                	  cardWidget.completeRequiredState();
			                });
			                // 如果是接入类产品,合并所有属性配置请求
			                if (cardWidget.isAccessProduct) {
				                cardWidget.executeSpecConfig(cardWidget.productServiceRelVO,
				                        cardWidget.attrControlSpecialList);
			                }
			                
		                },
		                
		                findAndSetProdInstVO : function(uniqueId) {
			                var selectedMemb = dojo.filter($ac$.get("selectedMemberProdOfferList"), function(memb) {
				                        return memb.uniqueId == uniqueId;
			                        })[0];
			                var prodInstVO = selectedMemb ? selectedMemb.prodInstVO : null;
			                if (!this.prodInstVO) {
				                this.prodInstVO = prodInstVO;
			                }
			                
		                },
		                /**
						 * 获取卡片
						 * 
						 * @method
						 */
		                getCard : function() {
			                return this.busCardInstance;
		                },
		                initProductAttr : function(obj) {
			                var widget = this;
			                // 调用卡片对象本身方法,重新定义$
			                var $ = function(id) {
				                return obj.$(id);
			                };
			                // append 更多信息 到头部
			                var moreGroupElem = $("subgroup_productAttrMore");
			                if (moreGroupElem) {
				                obj.hiddenSubGroup(moreGroupElem);
				                var busCardHeader = obj.getHeader(),
					                downIcon = BusCard.path.contextPath + "/common/images/icon/arrow_title_up.png",
					                upIcon = BusCard.path.contextPath + "/common/images/icon/arrow_title_down.png",
					                _html = "<img class='more-info-icon' src='#{src}' style='float:right'></img><a class='more-info-href' style='float:right' href = '#'  style='float:right'>更多信息</a>";
				                dojo.place(BusCard.Template.create(_html).apply({
					                                src : upIcon
				                                }), busCardHeader, "last");
				                dojo.connect(BusCard.query(".more-info-href", busCardHeader)[0], "onclick",
				                        function(e) {
					                        e.preventDefault();
					                        var imgElem = BusCard.query(".more-info-icon", busCardHeader)[0];
					                        if (/title_dow/.test(imgElem.src)) {
						                        imgElem.src = downIcon;
						                        obj.displaySubGroup(moreGroupElem);
						                        
					                        } else {
						                        imgElem.src = upIcon;
						                        obj.hiddenSubGroup(moreGroupElem);
						                        
					                        }
					                        
				                        });
				                
			                }
			                
		                },
		                completeRequiredState : function() {
			                var serviceCard = this.busCardInstance.getParent();
			                attrCard = this.busCardInstance;
			                if (this.isAccessProduct && serviceCard) {
				                var serviceRequireElemList = dojo.query("[isnull=0]", serviceCard.dom) || [];
				                var attrRequireElemList = dojo.query("[isnull=0]", attrCard.dom) || [];
				                var hasNullElem = dojo.some([].concat(serviceRequireElemList)
				                                .concat(attrRequireElemList), function(dom) {
					                        var type = (dom.type || "").toUpperCase();
					                        return !dom.value && !(type == 'RADIO' || type == 'CHECKBOX');
				                        });
				                
				                var uniqueId = serviceCard.getCardRelationInfo().uniqueId;
				                if (uniqueId) {
					                var productTrNode = dojo.query("TR[uniqueId=" + uniqueId + "]")[0];
					                var requireElemCtn = dojo.query(".complete-flag-div", productTrNode)[0];
					                if (requireElemCtn) {
						                var initElem = dojo.query(".complete-init-flag", requireElemCtn)[0];
						                var spanElem = dojo.query(".complete-flag-span", requireElemCtn)[0];
						                var imgElem = dojo.query(".complete-flag-img", requireElemCtn)[0];
						                initElem && (initElem.style.display = "none");
						                if (hasNullElem) {
							                spanElem.style.display = "";
							                imgElem.style.display = "none";
						                } else {
							                spanElem.style.display = "none";
							                imgElem.style.display = "";
						                }
					                }
					                
				                }
				                
			                }
			                
		                },
		                postCreate : function() {
			                var _widgetInstance = this;
			                this.inherited(arguments);
			                
		                },
		                /**
						 * 如果产品属性为空,不处理
						 * 
						 * @method
						 */
		                checkIfNeedRendering : function(attrList) {
			                return this.needRendering = !!(attrList != null && attrList.length > 0);
			                
		                },
		                _sortAttrList : function(attrList) {
			                attrList = attrList || [];
			                attrList.sort(function(a1, a2) {
				                        var c1 = parseInt("" + (a1.ifDisplay || 0));
				                        var c2 = parseInt("" + (a2.ifDisplay || 0));
				                        if (c1 > c2) {
					                        return -1;
				                        } else if (c1 < c2) {
					                        return 1;
				                        } else {
					                        if (a1.nullable > a2.nullable) {
						                        return 1;
						                        
					                        } else if (a1.nullable < a2.nullable) {
						                        return -1;
					                        } else {
						                        return 0;
					                        }
				                        }
				                        
			                        });
			                
		                },
		                /**
						 * 过滤定价参数
						 * 
						 * @method
						 */
		                filterPricingParamAttr : function(attrList) {
			                var exclusiveList = [],
				                includeList = dojo.filter(attrList || [], function(attr) {
					                        var f = (attr.pricingParamAttr && attr.pricingParamAttr != '0')
					                                || (attr.isPricingParamAttr && attr.isPricingParamAttr != '0');
					                        if (!f) {
						                        exclusiveList.push(attr);
					                        }
					                        return f;
					                        
				                        });
			                
			                return {
				                exclusiveList : exclusiveList,
				                includeList : includeList
				                
			                };
			                
		                },
		                /**
						 * 产品属性转换为卡片协议的处理程序
						 * 
						 * @param {Array} attrList
						 * @param {String} prodAttrLink
						 * @param {String} prodAttrMoreLink
						 */
		                prodAttrList2xml : function(attrList, prodAttrLink, prodAttrMoreLink) {
			                var prodAttrXMLPath = "",
				                // 必填属性列表
				                prodAttrList = [],
				                // 非必填属性列表
				                prodAttrMoreList = [],
				                prodAttrIndex = 0,
				                prodAttrMoreIndex = 0;
			                this._sortAttrList(attrList);
			                if (attrList) {
				                // 判断属性列表长度,大于8时进行分组
				                if (attrList.length > 8) {
					                for (var p in attrList) {
						                var attrvo = attrList[p];
						                if (!attrvo.nullable || !!attrvo.ifDirectlyDisplay) {
							                prodAttrList[prodAttrIndex] = attrvo;
							                prodAttrIndex++;
						                } else {
							                prodAttrMoreList[prodAttrMoreIndex] = attrvo;
							                prodAttrMoreIndex++;
						                }
					                }
					                this._sortAttrList(prodAttrList);
					                this._sortAttrList(prodAttrMoreList);
					                // 临时处理 当属性为接入类账号时 生成类型为40的卡片元素
					                var prodAttrTp = this.convertTemplate,
						                attrBusCard = BusCard.Template.create(prodAttrTp),
						                // 更多信息上移到头部
						                // moreHref = ""||"<subGroup
						                // id='productAttrHref'
						                // name='更多>>'>\
						                // <attr
						                // id='blank_placeholder'
						                // label='' value='' cType='9'
						                // colspan='3'/>\
						                // <attr id='productAttrHead'
						                // label='' value='显示>>>'
						                // cType='9' colspan='3'/>\
						                // </subGroup>",
						                moreHref = "",
						                // 临时处理,当属性为接入类账号时,生成类型为40的卡片元素,以后产品和订单卡片间最好能约定好一套页面元素配置
						                prodAttrMoreTp = this.convertTemplate,
						                attrBusCardMore = BusCard.Template.create(prodAttrMoreTp);
					                
					                if (prodAttrIndex > 0) {// 判断是否存在必填属性
						                prodAttrXMLPath = "<attrList>" + prodAttrLink + attrBusCard.apply({
							                        list : prodAttrList
						                        }) + "</subGroup>" + moreHref + prodAttrMoreLink
						                        + attrBusCardMore.apply({
							                                list : prodAttrMoreList
						                                }) + "</subGroup>" + "</attrList>";
					                } else {
						                prodAttrXMLPath = "<attrList>" + prodAttrMoreLink + attrBusCardMore.apply({
							                        list : prodAttrMoreList
						                        }) + "</subGroup>" + "</attrList>";
					                }
				                } else {// 小于8时不分组
					                var prodAttrListXML = this.convertTemplate;
					                var attrBuscard = BusCard.Template.create(prodAttrListXML);
					                prodAttrXMLPath = "<attrList>" + attrBuscard.apply({
						                        list : attrList
					                        }) + "</attrList>";
				                }
			                }
			                return prodAttrXMLPath;
		                },
		                /**
						 * 初始化选择框
						 * 
						 * @method
						 */
		                initProdSelect : function() {
			                var card = this.getCard(),
				                attrList = this.getModel().productInfoVO.attrList || [];
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
				                prodAttrList = this.getModel().productInfoVO.attrList || [];
			                BusCard.each(prodAttrList || [], function(attrVO) {
				                        var elem = card.$(attrVO.attrCd + "");
				                        if (elem && attrVO.attrLeng) {
					                        elem.maxLength = attrVO.attrLeng;
				                        }
			                        });
			                
		                },
		                /**
						 * 初始化不展现的元素
						 * 
						 * @method
						 */
		                initDisplayElement : function(card) {
			                var card = this.busCardInstance,
				                attrList = this.getModel().productInfoVO.attrList || [];
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
						 * 根据产品属性配置初始化特殊的属性值
						 * 
						 * @method
						 */
		                initSpecialValueByAttrCode : function(card) {
			                var card = this.busCardInstance,
				                attrList = this.getModel().productInfoVO.attrList || [];
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
						 * 渲染属性默认值
						 * 
						 * @method
						 */
		                renderDefaultValue : function() {
			                var card = this.getCard();
			                card.renderDefaultValue(this.getDefaultValue());
			                
		                },
		                /**
						 * 获取属性默认值 这一步当做变更时需要用属性实例值覆盖规格层面上的 默认值
						 * 
						 * @method
						 */
		                getDefaultValue : function() {
			                var attrList = this.getModel().productInfoVO.attrList || [],
				                attrDefaultList = {};
			                if (attrList != null && attrList.length > 0) {
				                for (var i = 0, len = attrList.length; i < len; i++) {
					                var attrVO = attrList[i];
					                //为可选择保留空字符串作为默认值
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
			                var attrList = this.getModel().productInfoVO.attrList || [],
				                card = this.getCard();
			                var productId = this.getModel().productInfoVO.productId;
			                var ifSecondChange = !!this.prodInstVO;
			                BusCard.each(attrList, function(attrVO) {
				                        if (attrVO.isReadOnly == 1 && attrVO.attrCd && card.$(attrVO.attrCd)) {
					                        card.$(attrVO.attrCd).disabled = true;
				                        }
				                        if (ifSecondChange) {
					                        if ("100098" == attrVO.attrCd || "100101" == attrVO.attrCd) {
						                        var param = "&productId=" + productId + "&attrCd=" + attrVO.attrCd;
						                        var attrReadOnly = util.ServiceFactory
						                                .getService("url:prodOfferSaleAjaxAction.do?method=attrReadOnly"
						                                        + param);
						                        if (attrReadOnly == 1) {
							                        card.$(attrVO.attrCd).disabled = true;
						                        }
					                        }
				                        }
			                        });
		                },
		                
		                /**
						 * 抽取出关联的attrCd
						 * 
						 * @function
						 * @param {String} expr 产品配置的表达式
						 */
		                extractRelaAttrIdList : function(expr){
		                	var attrCdList = [];
							var expPattern = /\[(.*?)\]/g;
							var matcher = expPattern.exec(expr || "");
							while (matcher) {
								attrCdList.push(matcher[1]);
								matcher = expPattern.exec(expr || "");
							}
							return attrCdList;
		                },
		                
		                /**
						 * 在属性卡片范围内计算表单式值
						 * 
						 * @function
						 * @param {Object} card 关联的卡片实例
						 * @param {String} expr 表达式
						 */
		                computeExpr : function(card, expr){
		                	var expPattern = /\[(.*?)\]/g;
							var no_match = "NO_MATCH";
							if (!expr)
								return "";
							else {
								var localExpr = expr.toString();
								var exprValue = localExpr.replace(expPattern, function($0, $1) {
											var attrId = $1;
											var attrElem = card.$(attrId);
											if (attrElem && attrElem.value) {
												return attrElem.value;
											}
											else {
												return no_match;
					
											}
										});
								// 只要表达式中有一个关联的属性值为空 那么表达式的值就返回空
								if (exprValue.indexOf(no_match) >= 0) {
									return "";
								}
								else {
									var _result = BusCard.parse(exprValue);
									if (_result) {
										var m = /^(\d+)\.(\d+)$/.exec(_result.toString());
										if (m) {
											if (m[2].length > 2) _result = _result.toFixed(2);
										}
									}
									return _result;
								}

							}
		                },
		                
		                /**
		                 * 根据属性表达式来配置属性的值
		                 * 
		                 * @method
		                 */
		                bindUpdateEventForExprAttr : function(){
		                	var attrList = this.getModel().productInfoVO.attrList || [],
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
											BusCard.addEventListener(attrElem, "blur", function() {
														targetAttrElem.value = buscardWidget.computeExpr(card, attrValueExpressionsVO.valueExpressions);
													});
										}
										else if (attrElem && attrElem.tagName == "SELECT") {
											BusCard.addEventListener(attrElem, "change", function() {
														targetAttrElem.value = buscardWidget.computeExpr(card, attrValueExpressionsVO.valueExpressions);
													});
										}
	
									});
			
								}
								//针对属性下拉框做级联事件绑定
								if(targetAttrElem.tagName == "SELECT"){
									BusCard.addEventListener(targetAttrElem, "change", function() {
										buscardWidget.dealRelaAttrSet(attrVO,card);
										var attrValueVO = BusCard.find(attrVO.attrValueList||[],function(attrValueVO){
											return attrValueVO.attrValue == targetAttrElem.value;
										});
										if(!!attrValueVO){
											if(attrValueVO != null && attrValueVO.attrValueRelaList != null && attrValueVO.attrValueRelaList.length > 0){
												dojo.forEach(attrValueVO.attrValueRelaList||[],function(attrValueRela){
													if(card.$(attrValueRela.attrCd+"")){
														var selectNode = card.$(attrValueRela.attrCd+"");
														var attrValueRelaValueList = buscardWidget.getAttrValueRelaValueList(attrValueRela);
														var selectParamList = BusCard.map(attrValueRelaValueList||[], function(valueVO) {
							                                return {
								                                id : valueVO.attrValue,
								                                name : valueVO.attrValueName
							                                };
						                                });
														BusCard.$rs(selectNode, selectParamList, true);
														BusCard.dispatchEvent(selectNode,'change');
														util.DomHelper.enableTitle(selectNode);
													}
												});
											}
										}
									});
									if(!buscardWidget.prodInstVO){
										BusCard.dispatchEvent(targetAttrElem,'change');
									}
									
								}
							});
		                },
		                
		                /**
		                 * 清空关联的下拉框
		                 */
		                dealRelaAttrSet : function(attrVO,card){
		                	var relaAttrIdArray = [];
		                	dojo.forEach(attrVO.attrValueList||[],function(attrValueVO){
		                		dojo.forEach(attrValueVO.attrValueRelaList||[],function(attrValueRela){
		                			if(!(dojo.some(relaAttrIdArray||[],function(relaAttrId){
		                				return relaAttrId == attrValueRela.attrCd;
		                			}))){
		                				relaAttrIdArray.push(attrValueRela.attrCd+"");
		                			}
		                		});
		                	});
		                	dojo.forEach(relaAttrIdArray||[],function(relaAttrId){
		                		if(card.$(relaAttrId+"")){
		                			var selectNode = card.$(relaAttrId+"");
		                			BusCard.$rs(selectNode, [], true);
		                		}
		                	});
		                },
		                
		                /**
		                 * 判断是关联还是互斥
		                 */
		                getAttrValueRelaValueList : function(attrValueRela){
		                	var attrValueRelaValueList = attrValueRela.attrValueRelaValueList||[];
		                	var attrCd = attrValueRela.attrCd;
		                	//TODO 暂时先默认成关联的直接返回
		                	return attrValueRelaValueList;
		                },
		                
		                /**
						 * 验证属性值是否合法
						 * 
						 * @method
						 */
		                validateValue : function(value) {
			                return value && value != 'undefined' && value != 'null';
			                
		                },
		                /**
						 * 初始化属性实例值
						 */
		                initProdAttrInst : function() {
			                var card = this.getCard(),
				                cardWidget = this,
				                prodInstVO = this.prodInstVO,
				                attrInstList = null,
				                attrObj = {};
			                
			                if (prodInstVO && (attrInstList = prodInstVO.prodInstAttrList)) {
				                dojo.forEach(attrInstList, function(attrVO) {
					                        attrObj[attrVO.attrCd] = cardWidget.validateValue(attrVO.attrValue)
					                                ? attrVO.attrValue
					                                : "";
				                        });
				                dojo.forEach(cardWidget.productInfoVO.attrList, function(attrVO) {
					                        if (!!attrObj[attrVO.attrCd]) {
						                        cardWidget.convertFeeAttrInst(attrVO, attrObj[attrVO.attrCd]);
					                        }
				                        });
				                cardWidget.busCardInstance.renderDefaultValue(attrObj);
			                }
			                
		                },
		                /**
						 * 获取属性数据
						 */
		                getCardData : function() {
			                return this.getCard().getData.apply(this.getCard(), arguments);
		                },
		                /**
						 * 异步读取配置数据并且异步加载脚本并在卡片上下文执行
						 * 
						 * @deprecated
						 * @method
						 */
		                asyncLoadConfigScript : function(attrList, isPathList) {
			                var _attrIdList = dojo.map(attrList || [], function(attrVO) {
				                        return "" + (attrVO.attrCd || attrVO.attrId);
			                        }),
				                buscardWidget = this,
				                execModule = function(path) {
					                var cardParam = buscardWidget.busCardInstance.getCardRelationInfo(),
						                callbackId = BusCard.computeCardCallbackId(path),
						                cb = BusCard.cache.callbackFactory[callbackId];
					                if (cb) {
						                try {
							                cb.apply(buscardWidget.busCardInstance, [BusCard, cardParam]);
						                }
						                catch (e) {
							                BusCard.showErrorStack(e);
						                }
						                
					                }
					                
				                },
				                sf = util.ServiceFactory,
				                loadAndExecute = function(pages) {
					                var notLoadedList = dojo.filter(pages, function(pageLink) {
						                        var callbackId = BusCard.computeCardCallbackId(pageLink),
							                        cb = BusCard.cache.callbackFactory[callbackId];
						                        if (cb) {
							                        execModule(pageLink);
						                        } else {
							                        return true;
						                        }
						                        
					                        });
					                // because the
					                // asynchronization,the third
					                // parameter must be true
					                BusCard.ScriptLoader.asynLoad(notLoadedList, function() {
						                        dojo.forEach(notLoadedList, function(pageLink) {
							                                execModule(pageLink);
						                                });
						                        buscardWidget.completeRequiredState();
					                        }, true);
					                
				                };
			                if (isPathList) {
				                return loadAndExecute(attrList);
			                } else {
				                return sf.getService("spring:attrUseConfigBO").getUseDataByAttrCds(_attrIdList,
				                        function(pages) {
					                        loadAndExecute(pages);
				                        });
				                
			                }
			                
		                },
		                hiddenAllAttrElem : function() {
			                var widget = this;
			                dojo.forEach(widget.productInfoVO.attrList || [], function(attrVO) {
				                        widget.busCardInstance.hidden(attrVO.attrCd + "");
			                        });
			                
		                },
		                /**
						 * 根据属性配置是否生成实例来处理页面
						 */
		                dealAttrIsInstance : function() {
			                var card = this.getCard(),
				                prodAttrList = this.getModel().productInfoVO.attrList || [];
			                BusCard.each(prodAttrList || [], function(attrVO) {
				                        var elem = card.$(attrVO.attrCd + "");
				                        // 不实例化
				                        if (attrVO.isTemp == "0" || attrVO.isTemp == 0) {
					                        elem.removeAttribute("controlfieldname");
				                        }
			                        });
		                },
		                /**
						 * 根据特殊的配置隐藏或者展现页面元素,让页面元素只读等,目前只处理接入类产品
						 * 
						 * @method
						 */
		                executeSpecConfig : function() {
			                var widget = this;
			                var productInfoVO = widget.productInfoVO;
			                var serviceCard = widget.busCardInstance.getParent();
			                var globalHandling = function(productServiceRelVO) {
				                if (productServiceRelVO && productServiceRelVO.ifDisplay == 0) {
					                widget.hiddenAllAttrElem();
				                }
			                };
			                var attrSpecHandling = function(specVOList) {
				                dojo.forEach(specVOList || [], function(specVO) {
					                        var node = widget.busCardInstance.$(specVO.attrCd + "");
					                        specVO.ifDisplay == 0
					                                ? widget.busCardInstance.hidden(specVO.attrCd + "")
					                                : widget.busCardInstance.display(specVO.attrCd + "");
					                        if (node) {
						                        specVO.isModify == 0
						                                ? (node.disabled = true)
						                                : ((node.disabled = false) || (node.readOnly = false));
					                        }
					                        
				                        });
				                
			                };
			                if (this.isAccessProduct && serviceCard) {
				                if (arguments.length > 1) {
					                globalHandling(arguments[0]);
					                attrSpecHandling(arguments[1]);
					                return true;
				                }
				                var serviceCardParam = serviceCard.getCardRelationInfo(),
					                serviceOfferId = serviceCardParam.serviceOfferId,
					                productId = serviceCardParam.productId;
				                BusCard.$remote("productServiceRelDAO").query({
					                        serviceOfferId : serviceOfferId,
					                        productId : productId
					                        
				                        }, function(list) {
					                        if (list && list.length) {
						                        var productServiceRelVO = list[0];
						                        globalHandling(productServiceRelVO);
						                        BusCard.$remote("attrControlSpecialDAO").query({
							                                attrObjType : 1,
							                                serviceOfferId : serviceOfferId,
							                                attrObjId : productId
						                                }, function(specVOList) {
							                                attrSpecHandling(specVOList);
							                                
						                                });
						                        
					                        }
					                        
				                        });
				                
			                }
			                
		                },
		                _buildAsyncRequestParam : function() {
			                var widget = this,
				                productInfoVO = widget.productInfoVO;
			                return {
				                productId : "" + productInfoVO.productId,
				                serviceOfferId : "" + widget.getModel().serviceOfferId,
				                attrList : dojo.map(productInfoVO.attrList || [], function(vo) {
					                        return "" + vo.attrCd;
				                        })
				                
			                };
			                
		                },
		                /**
						 * 异步加载crm端关于属性的配置数据
						 * 
						 * @deprecated
						 * @method
						 */
		                asyncLoadAttrConfigData : function(param, cb) {
			                var url = BusCard.path.contextPath + "/orderDetailAction.do?method=requestAttConfigData";
			                BusCard.doPost(url, param, true, cb);
		                },
		                /**
						 * 费用属性页面展现处理
						 */
		                convertFeeAttrDefault : function(attrVO) {
			                var convertValue = attrVO.defaultValue;
			                if (!!attrVO && !!convertValue && !isNaN(convertValue)) {
				                if (attrVO.valueUnit == util.AttrUnitConst.minuteConst) {
					                convertValue = parseFloat(convertValue + "") / 100;
				                }
			                }
			                return convertValue;
		                },
		                /**
						 * 费用实例属性页面展现处理
						 */
		                convertFeeAttrInst : function(attrVO, instValue) {
			                var convertValue = instValue;
			                if (!!attrVO && !!convertValue && !isNaN(convertValue)) {
				                if (attrVO.valueUnit == util.AttrUnitConst.unitConst
				                        || attrVO.valueUnit == util.AttrUnitConst.minuteConst) {
					                convertValue = parseFloat(convertValue + "") / 100;
				                }
			                }
			                return convertValue;
		                },
		                /**
						 * 同步获取crm端特殊的配置数据,主要包括回调和特殊配置
						 * 
						 * @method
						 */
		                
		                loadAndSetAttrConfigData : function() {
			                if (this.isAccessProduct) {
				                var url = BusCard.path.contextPath
				                        + "/orderDetailAction.do?method=requestAttConfigData";
				                var configData = BusCard.doPost(url, this._buildAsyncRequestParam());
				                this.productServiceRelVO = configData.productServiceRelVO;
				                this.attrUseConfigList = configData.attrUseConfigList || [];
				                this.attrControlSpecialList = configData.attrControlSpecialList || [];
				                // cardWidget.executeSpecConfig(productServiceRelVO,
				                // attrControlSpecialList);
				                // cardWidget.asyncLoadConfigScript(attrUseConfigList,
				                // true);
			                } else {
				                var sf = util.ServiceFactory;
				                var _attrIdList = dojo.map((this.productInfoVO || this.prodOfferInfoVO).attrList || [],
				                        function(attrVO) {
					                        return "" + (attrVO.attrCd || attrVO.attrId);
				                        });
				                this.attrUseConfigList = sf.getService("spring:attrUseConfigBO")
				                        .getUseDataByAttrCds(_attrIdList)
				                        || [];
				                
			                }
			                
		                },
		                /**
						 * 构建属性卡片初始化时回调
						 * 
						 * @method
						 */
		                buildBusCardResource : function() {
			                if (this.attrUseConfigList && this.attrUseConfigList.length) {
				                return (this.attrUseConfigList || []).inject("<resource>", function(seed, path) {
					                        return seed + '<import type="1" uri="' + path + '"/>';
					                        
				                        }) + "</resource>";
			                } else {
				                return "";
			                }
		                }
		                
	                });
	        
        });