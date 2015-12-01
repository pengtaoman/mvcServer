defineModule("orderaccept.prodofferaccept.loader.ProdOfferChangeLoader", ["../util", "./ProdOfferNewLoader",
                "../widget/servicecard/ServiceCardWidget", "../widget/attrcard/ProductAttrCardWidget",
                "../widget/attrcard/ProductOfferAttrCardWidget", "../../custom/TooltipDialog",
                "../formatter.FormatterProvider", "../builder/prodofferdetail/ProdOfferDetailBuilder",
                "../widget/commcard/CommCardWidget", "../builder/subprodoffergrid/SubProdOfferCartDataProvider",
                "../OrderShowLoader", "unieap.layout.AccordionContainer", "unieap.layout.AccordionPane"], function(
                util, ProdOfferNewLoader, ServiceCardWidget, ProductAttrCardWidget, ProductOfferAttrCardWidget,
                TooltipDialog, FormatterProvider, ProdOfferDetailBuilder, CommCardWidget, SubProdOfferCartDataProvider,
                OrderShowLoader) {
	        /**
			 * 定义销售品订购整体控制器
			 * 
			 * @class
			 * @extends
			 */
	        dojo.declare("orderaccept.prodofferaccept.loader.ProdOfferChangeLoader", [ProdOfferNewLoader], {
		        layoutTemplateUrl : dojo.moduleUrl("orderaccept.prodofferaccept", "view/prodOfferChgLayout_new.html"),
		        
		        /**
				 * 当前正在受理的主销售品实例ID
				 * 
				 * @field
				 */
		        prodOfferInstId : null,
		        
		        /**
				 * 当前正在受理的销售品数据信息
				 * 
				 * @field
				 */
		        prodOfferData : null,
		        
		        ShoppingCartWidgetClass : null,
		        
		        shoppingCartWidgetInstance : null,
		        
		        /**
				 * 可选包变更不需要渲染区域dom节点
				 * 
				 * @override
				 * @method
				 */
		        renderBelongCode : function() {
			        return false;
			        
		        },
		        /**
				 * 可选包变更不需要渲染主销售品树
				 * 
				 * @override
				 * @method
				 */
		        renderMainProdOfferTree : function() {
			        return false;
		        },
		        
		        _asynCallback : function() {
			        var controller = this;
			        // register class
			        controller.mainProdOfferWidgetClass = orderaccept.prodofferaccept.widget.mainprodofferchange.MainProdOfferChangeWidget;
			        controller.payRelationWidgetClass = orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget;
			        controller.subProdOfferOrderGridClass = orderaccept.custom.BusCardGrid;
			        controller.personalSubCollectListWidgetClass = orderaccept.prodofferaccept.widget.prodofferfavoritelist.personalSubCollectListWidget;
			        controller.functionNavigatorWidgetClass = orderaccept.prodofferaccept.widget.functionnavigator.FunctionNavigatorWidget;
			        controller.salesPromotionOrderGridClass = orderaccept.custom.BusCardGrid;
			        controller.prodOfferInfoTipsWidgetClass = orderaccept.prodofferaccept.widget.messagetips.ProdOfferInfoTipsWidget;
			        controller.warmTipesWidgetClass = orderaccept.prodofferaccept.widget.messagetips.WarmTipsWidget;
			        controller.prodOfferAcceptTipsWidgetClass = orderaccept.prodofferaccept.widget.messagetips.ProdOfferAcceptTipsWidget;
			        controller.manageAccNbrWidgetClass = orderaccept.prodofferaccept.widget.manageaccnbrwidget.ManageAccNbrWidget;
			        controller.collectTipsWidgetClass = orderaccept.prodofferaccept.widget.messagetips.CollectTipsWidget;
			        controller.ShoppingCartWidgetClass = orderaccept.prodofferaccept.widget.shoppingcart.ShoppingCartWidget;
			        
			        controller.initOldUserAddedHandler();
			        
			        // 监听各种事件
			        controller.initBehavior();
			        
			        // 初始化检测
			        controller.initCheck();
			        
			        // 初始化订单数据构建器
			        controller.initDataBuilder();
			        
			        controller.initSpecialDataBuilder();
			        
			        controller.renderPayRelation();
			        
			        // 初始化功能导向
			        controller.initFunctionNavigatorWidget();
			        // 初始化订单信息
			        controller.initOrderInfoWidget();
			        // 初始化经办人信息
			        controller.initViaInfoWidget();
			        // 初始化一些全局处理
			        controller.initGlobalHelper();
			        // 初始化全局销售品提示框.温馨提示框
			        controller.initTipsWidgets();
			        
			        // 初始化自主版或加装包套餐时可选包受理
			        controller.initMultipleSubProdOfferHandler();
			        
			        // 渲染促销政策查询模板
			        controller.renderPromotionLayout();
			        // 初始化数据
			        controller.initProdOfferData();
			        
			        // 初始化等待条
			        controller.initWaitingBar();
			        // 初始化订单预览
			        controller.initOrderPreView();
			        // 触发onload 事件
			        controller.fireEvent("onload");
		        },
		        
		        _asynLoadSriptList : function() {
			        return ["orderaccept.prodofferaccept.behavior.ProdOfferChgBehavior",
			                "orderaccept.prodofferaccept.data.ProdOfferChgDataBuilder",
			                "orderaccept.prodofferaccept.data.SpecialDataHandler",
			                "orderaccept.prodofferaccept.check.ProdOfferChgCheck",
			                "orderaccept.prodofferaccept.rule.ProdOfferChgRule",
			                "orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget",
			                "orderaccept.custom.Grid", "orderaccept.custom.BusCardGrid",
			                "orderaccept.prodofferaccept.widget.mainprodofferchange.MainProdOfferChangeWidget",
			                "orderaccept.prodofferaccept.widget.prodofferfavoritelist.personalSubCollectListWidget",
			                "orderaccept.prodofferaccept.widget.functionnavigator.FunctionNavigatorWidget",
			                "orderaccept.prodofferaccept.loader.OldUserAddedHandler",
			                "orderaccept.prodofferaccept.widget.messagetips.ProdOfferInfoTipsWidget",
			                "orderaccept.prodofferaccept.widget.messagetips.WarmTipsWidget",
			                "orderaccept.prodofferaccept.widget.messagetips.CollectTipsWidget",
			                "orderaccept.prodofferaccept.widget.manageaccnbrwidget.ManageAccNbrWidget",
			                "orderaccept.prodofferaccept.widget.messagetips.ProdOfferAcceptTipsWidget",
			                "orderaccept.prodofferaccept.loader.MultipleSubProdOfferHandler",
			                "orderaccept.prodofferaccept.widget.shoppingcart.ShoppingCartWidget"];
		        },
		        getBelongCode : function() {
			        return $ac$.query("$.userHasProdOfferInfoList[*].prodInstList[*].serviceRelationVO.belongCode")[0];
			        
		        },
		        initBehavior : function() {
			        this.behaviorInstance = new orderaccept.prodofferaccept.behavior.ProdOfferChgBehavior(this);
		        },
		        initCheck : function() {
			        this.checkInstance = new orderaccept.prodofferaccept.check.ProdOfferChgCheck(this);
			        
		        },
		        
		        postscript : function() {
			        this.init();			        
			        // 异步执行
			        this.asynExecute(this._asynLoadSriptList(), dojo.hitch(this, "_asynCallback"));
		        },
		        
		        /**
				 * 处理可选包
				 * 
				 * @override
				 * @method
				 */
		        renderOrderedSubProdOffer : function() {
			        var controller = this;
			        controller.multipleSubProdOfferHandler.doMultipleSubProdOfferFilter(controller.mainProdOfferId);
			        
		        },
		        /**
				 * 渲染促销政策视图
				 * 
				 * @method
				 */
		        renderSalesPromotion : function() {
			        var titleButton = unieap.byId("promotionPane").buttonContainerNode,
				        refresh_icon = BusCard.path.contextPath + "/common/images/icon/refresh_icon.png",
				        controller = this;
			        titleButton.style.display = "";
			        titleButton.innerHTML = "<a style='vertical-align:top;color:#00577F' id='refresh-promotion-href'>"
			                + "<span>\u5237\u65b0</span><img src='" + refresh_icon
			                + "' style='width:16px;height:16px'/></a>"
			        titleButton.style.width = "50px";
			        titleButton.style.paddingTop = '5px';
			        dojo.connect(dojo.query("span", titleButton)[0], "onclick", function() {
				                controller.renderPromotion(controller.mainProdOfferId);
			                });
		        },
		        /**
				 * 初始化客户已订购的销售品、可选包、促销政策信息
				 * 
				 * @method
				 */
		        initCustomerOrderData : function() {
			        var custId = this.requestParam.customerData.custId;
			        var customerOrderData = util.ServiceFactory
			                .getService("url:prodOfferSaleAjaxAction.do?method=getCustomerOrderInfo&custId=" + custId);
			        dojo.global.$appContext$.set("reserveProdOfferList", customerOrderData.reserveProdOfferList || []);
			        dojo.global.$appContext$.set("orderPromotionList", customerOrderData.orderPromotionList || []);
		        },
		        /**
				 * 生成可选包树的URL
				 * 
				 * @method
				 */
		        buildSubProdOfferTreeURL : function(mainProdOfferId, uniqueId) {
			        var mainProdOfferId = mainProdOfferId || this.mainProdOfferId;
			        var userHasProdOfferIdList = [];
			        dojo.forEach(dojo.global.$appContext$.get("userHasProdOfferInfoList" + uniqueId) || [], function(
			                        userHasProdOfferInfo) {
				                return userHasProdOfferIdList.push(userHasProdOfferInfo.prodOfferId);
			                });
			        return BusCard.path.contextPath
			                + "/orderDetailAction.do?method=getProdOfferTreeForChg&prodOfferId=" + mainProdOfferId
			                + "&userHasProdOfferIdList=" + dojo.toJson(userHasProdOfferIdList)
			                + "&memOfferList=" + this.getMemberProdOfferIds(uniqueId)
			                + "&commonRegionId="+(this.getBelongCode()||"")
			                + "&accProdListStr="+this.getAccProdIdList(uniqueId);
		        },
		        
		        /**
				 * 构建主销售品视图区域
				 * 
				 * @method
				 */
		        buildMainProdOfferView : function() {
			        var controller = this;
			        if (this.mainProdOfferWidget) {
				        this.mainProdOfferWidget.destroyRecursive();
			        }
			        this.removeAllServiceCardWidgets();
			        var domNode = unieap.byId("mainProdOfferPane").containerNode;
			        this.mainProdOfferWidget = new this.mainProdOfferWidgetClass({});
			        dojo.place(this.mainProdOfferWidget.domNode, domNode, "first");
			        var offerInfoVO = util.ProdOfferHelper.getMainProdOffer(dojo.global.$appContext$
			                .get("prodOfferList"))[0];
			        var offerInstVO = dojo.filter(dojo.global.$appContext$.get("userHasProdOfferInfoList"), function(
			                        userHasOffer) {
				                return userHasOffer.prodOfferId == offerInfoVO.prodOfferId;
			                })[0];
			        controller.renderMainProdOfferAttr({
				                prodOfferInfoVO : offerInfoVO,
				                prodOfferInstVO : offerInstVO
			                });
		        },
		        
		        /**
				 * 初始化销售品数据信息
				 * 
				 * @method
				 */
		        initProdOfferData : function() {
			        var loader = this;
			        this.mainProdOfferId = this.requestParam.prodOfferId;
			        this.prodOfferInstId = this.requestParam.prodOfferInstId;
			        this.getProdOfferListData(this.mainProdOfferId, "", this.prodOfferInstId, function(prodOfferData) {
			        	if(prodOfferData.flag&&prodOfferData.flag == "-1"){
			        		orderaccept.common.dialog.MessageBox.alert({
					        	message:prodOfferData.message
					        });
					        BusCard.removeCoverLayer();
					        return;
			        	}
				        dojo.global.$appContext$.set("prodOfferList", prodOfferData.prodOfferList);
				        dojo.global.$appContext$
				                .set("userHasProdOfferInfoList", prodOfferData.userHasProdOfferInfoList);
				        dojo.global.$appContext$.set("userHasProdOfferMetaInfoList", prodOfferData.prodOfferList);
				        var _mainProdOfferInfoVO = util.ProdOfferHelper.getMainProdOffer(prodOfferData.prodOfferList)[0];
				        $ac$.set("selectedMainProdOfferInfoVO", _mainProdOfferInfoVO);
				        $ac$.set("currentMainProdOfferInfoVO", _mainProdOfferInfoVO);
				        util.ProdOfferInstProvider.getProdOfferDataForChg();
				        loader.renderShoppingCart();
				        BusCard.removeCoverLayer();
			        });
		        },
		        
		        renderShoppingCart : function() {
			        this.shoppingCartWidgetInstance = new this.ShoppingCartWidgetClass();
			        dojo.place(this.shoppingCartWidgetInstance.domNode, unieap.byId("shoppingCartPane").containerNode,
			                "first");
		        },
		        removeResourcesBinding : function() {

		        },
		        
		        /**
				 * 开始订购流程
				 * 
				 * @method
				 */
		        beginOrder : function() {
			        
			        util.navigatorManager.to("prodOfferAcceptPane")(function() {
				                dojo.byId("function-navigator-root").style.display = "block";
				                unieap.byId("shoppingCartPane").domNode.style.display = 'none';
			                });
			        
			        var controller = this;
			        
			        controller.closeMainProdOfferAcceptPane();
			        // 打开页面的面板
			        controller.openProdOfferAcceptPane();
			        
			        // 生成主销售品视图
			        controller.buildMainProdOfferView();
			        
			        // 恢复客户留言
			        controller.recoveryOrderInfo();
			        
			        var delayCallback = function() {
				        // 初始化可选包
				        controller.renderOrderedSubProdOffer();
				        
				        // 初始化客户已订购的销售品、可选包、促销政策信息
				        controller.initCustomerOrderData();
				        
				        // 渲染促销政策订购列表
				        controller.renderPromotionOrderGrid();
				        
				        // 渲染促销政策视图
				        controller.renderSalesPromotion();
				        
				        // 初始化已订购的促销政策
				        controller.promotionCartDataProvider.showOrderedPromotion();
				        
			        };
			        
			        // 初始化服务信息卡片以及产品属性卡片
			        controller.addAllServiceCardWidgets(delayCallback);
			        
			        
		        },
		        
		        
		        
		        /**
				 * 获取销售品信息
				 */
		        getProdOfferListData : function(prodOfferId, uniqueId, prodOfferInstId, cb) {
			        var uniqueId = uniqueId || "";
			        var prodOfferData = util.ServiceFactory.getService(
			                "url:orderDetailAction.do?method=doGetProdOfferListForChg&prodOfferId="
			                        + this.mainProdOfferId + "&prodOfferInstId=" + this.prodOfferInstId, cb);
			        if (!cb) {
				        dojo.global.$appContext$.set("prodOfferList" + uniqueId, prodOfferData.prodOfferList);
				        dojo.global.$appContext$.set("userHasProdOfferInfoList" + uniqueId,
				                prodOfferData.userHasProdOfferInfoList);
				        dojo.global.$appContext$.set("userHasProdOfferMetaInfoList" + uniqueId,
				                prodOfferData.prodOfferList);
				        util.ProdOfferInstProvider.getProdOfferDataForChg(uniqueId);
			        }
		        },
		        
		        /**
				 * 获取销售品信息
				 */
		        
		        /**
				 * 展示购物车中的数据(外部调用)
				 */
		        showSubProdOfferCart : function(subProdOfferCartDataProvider) {
		        	var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
		        	var memberList = dojo.filter(selectedMemberProdOfferList||[],function(selectedMemberProdOffer){
		        		return selectedMemberProdOffer.uniqueId == subProdOfferCartDataProvider.uniqueId;
		        	});
		        	if(memberList&&memberList.length>0){
		        		if(memberList[0].action == "new"){
		        			subProdOfferCartDataProvider.showSelectDefaultProdOffer();
		        			return ;
		        		}
		        	}
			        subProdOfferCartDataProvider.showOrderedProdOffer();
		        },
		        /**
				 * 生成可选包销售品树视图
				 * 
				 * @method
				 */
		        buildSubProdOfferTreeView : function() {
			        if (this.subProdOfferTree) {
				        this.subProdOfferTree.destroyRecursive();
			        }
			        this.subProdOfferTree = util.WidgetProvider.getSubProdOfferTree({
				                id : 'subProdOfferTree',
				                url : this.buildSubProdOfferTreeURL()
			                });
			        var _node = !!unieap.byId('subProdOfferTreePane')
			                ? unieap.byId('subProdOfferTreePane').containerNode
			                : dojo.byId("subProdOfferTreePane");
			        dojo.place(this.subProdOfferTree.domNode, _node, 'first');
		        },
		        /**
				 * @param {Function} cb
				 */
		        addServiceCardWidget : function(uniqueId, cb) {
			        var _cb = cb,
				        controller = this,
				        productNewServiceOfferId = controller
				                .getServiceOfferConfigVO(util.ACTION_CD_CONST.PRODUCT_INSTALL).serviceOfferId,
				        productChgServiceOfferId = controller
				                .getServiceOfferConfigVO(util.ACTION_CD_CONST.PRODUCT_CHANGE).serviceOfferId,
				        quitServiceOfferId = controller
				                .getServiceOfferConfigVO(util.ACTION_CD_CONST.PRODOFFER_CANCEL_ACTION).serviceOfferId,
				        cb = function(dom, cardParam) {
					        dojo.require("orderaccept.common.js.ConstantsPool");
					        var cp = orderaccept.common.js.ConstantsPool;
					        cardParam.userId = dojo.attr(dom, "userId") || null;
					        if (cardParam.userId && dojo.attr(dom, "serviceId")) {
						        cardParam.serviceId = dojo.attr(dom, "serviceId");
					        }
					        cardParam.pageAction = dojo.attr(dom, "action") || null;
					        if (cardParam.pageAction == 'quit') {
						        cardParam.serviceOfferId = quitServiceOfferId;
					        } else if (cardParam.userId && cardParam.serviceId) {
						        cardParam.serviceOfferId = productChgServiceOfferId;
					        } else {
						        cardParam.serviceOfferId = productNewServiceOfferId;
					        }
					        // attach serviceRelationVO deprecated
							// 不能把大对象直接传递给卡片参数
					        if (cardParam.userId) {

						        // var prodInstList =
								// BusCard.jsonPath($ac$.get("userHasProdOfferInfoList"),"$[*].prodInstList[?(@.prodInstId=="+cardParam.userId+")]");
						        
						        // if(prodInstList){
						        // cardParam.serviceRelation =
								// prodInstList[0].serviceRelationVO;
						        // }
					        }
					        
					        if (_cb) {
						        _cb.apply(null, arguments);
					        }
				        },
				        param = dojo._toArray(arguments);
			        param[1] = cb;
			        return this.inherited(arguments, param);
			        
		        },
		        addProdAttrCardWidget : function(serviceCardWidget, cb) {
			        var _param = dojo._toArray(arguments),
				        quitServiceOfferId = this.getServiceOfferConfigVO(util.ACTION_CD_CONST.PRODOFFER_CANCEL_ACTION).serviceOfferId,
				        targetServiceOfferId = serviceCardWidget.busCardInstance.getCardRelationInfo().serviceOfferId;
			        if (targetServiceOfferId == quitServiceOfferId) { return false; }
			        // 是老的用户信息时,需要增加渲染老的用户信息逻辑
			        var cb = function() {
				        var card = this.busCardInstance,
					        userId = card.getParent().getCardRelationInfo().userId;
				        if (userId) {
					        var _qr = dojo.global.$appContext$
					                .jsonPath("$.userHasProdOfferInfoList[*].prodInstList[?(@.prodInstId==" + userId
					                        + ")]");
					        if (_qr) {
						        var attrValueObj = {};
						        dojo.forEach(_qr[0].prodInstAttrList || [], function(attrVO) {
							                attrValueObj[attrVO.attrCd] = attrVO.attrValue;
							                
						                });
				             	dojo.forEach(this.productInfoVO.attrList,function(attrVO){
				             		if(!!attrValueObj[attrVO.attrCd]){
										var convertValue = attrValueObj[attrVO.attrCd];
										if(!!attrVO && !isNaN(convertValue)){
											if(attrVO.valueUnit == util.AttrUnitConst.unitConst 
													|| attrVO.valueUnit == util.AttrUnitConst.minuteConst){	
												attrValueObj[attrVO.attrCd] = parseFloat(attrValueObj[attrVO.attrCd]+"")/100;
											}
										}
				             		}
				             	});
						        card.renderDefaultValue(attrValueObj);
					        }
					        
				        }
				        
			        };
			        _param[1] = cb;
			        return this.inherited(arguments, _param);
			        
		        },
		        initDataBuilder : function() {
			        this.dataBuilder = new orderaccept.prodofferaccept.data.ProdOfferChgDataBuilder(this);
		        }
	        });
        });