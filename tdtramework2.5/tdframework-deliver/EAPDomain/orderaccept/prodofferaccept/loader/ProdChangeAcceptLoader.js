defineModule("orderaccept.prodofferaccept.loader.ProdChangeAcceptLoader", ["../util",
                "./ProdOfferChangeLoader", "../widget/servicecard/ServiceCardWidget",
                "../widget/resourcecard/ResourceCardWidget",
                "../widget/attrcard/ProductAttrCardWidget",
                "../widget/attrcard/ProductOfferAttrCardWidget", "../../custom/TooltipDialog",
                "../formatter/FormatterProvider",
                "../builder.prodofferdetail.ProdOfferDetailBuilder",
                "../widget/commcard/CommCardWidget",
                "../builder/subprodoffergrid/SubProdOfferCartDataProvider", "../OrderShowLoader",
                "orderaccept.prodofferaccept.behavior.ProdChangeAcceptBehavior",
                "orderaccept.prodofferaccept.check.ProdChangeAcceptCheck",
                "orderaccept.prodofferaccept.data.ProdChangeAcceptDataBuilder",
                "unieap.layout.AccordionContainer", "unieap.layout.AccordionPane",
                "../widget/commheader/CommHeaderWidget", "unieap.layout.BorderContainer"],
        function(util, ProdOfferChangeLoader, ServiceCardWidget, ResourceCardWidget,
                ProductAttrCardWidget, ProductOfferAttrCardWidget, TooltipDialog,
                FormatterProvider, ProdOfferDetailBuilder, CommCardWidget,
                SubProdOfferCartDataProvider, OrderShowLoader) {
            /**
			 * 定义换受理整体控制器
			 * 
			 * @class
			 * @extends
			 */    	
            dojo.declare("orderaccept.prodofferaccept.loader.ProdChangeAcceptLoader",[ProdOfferChangeLoader],{
            	layoutTemplateUrl : dojo.moduleUrl("orderaccept.prodofferaccept","view/prodOfferNewLayout.html"),
				constructor : function(param) {
			        this.requestParam = param;  
		        },		                
                postscript : function() {
	                
	                this.serviceCardWidgetMap = {};
	                
	                this.eventListenerRegistry = {};
	                var rootNode = dojo.byId("prodoffer-accept-root");
	                rootNode.innerHTML = dojo._getText(this.layoutTemplateUrl);
	                dojo.parser.parse(rootNode);
	                this.asynExecute(this._asynLoadSriptList(), dojo.hitch(this,
	                                "_asynCallback"));
	                
                },
                _asynLoadSriptList : function() {
	                return [
	                        "orderaccept.prodofferaccept.behavior.ProdOfferChgBehavior",
	                        "orderaccept.prodofferaccept.data.ProdOfferChgDataBuilder",
	                        "orderaccept.prodofferaccept.data.SpecialDataHandler",
	                        "orderaccept.prodofferaccept.check.ProdOfferChgCheck",
	                        "orderaccept.prodofferaccept.rule.ProdOfferChgRule",
	                        "orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget",
	                        "orderaccept.custom.Grid",
	                        "orderaccept.custom.BusCardGrid",
	                        "orderaccept.prodofferaccept.widget.prodchangeaccept.ProdChangeAcceptWidget",
	                        "orderaccept.prodofferaccept.widget.prodofferfavoritelist.personalSubCollectListWidget",
	                        "orderaccept.prodofferaccept.widget.functionnavigator.FunctionNavigatorWidget",
	                        "orderaccept.prodofferaccept.loader.OldUserAddedHandler",
	                        "orderaccept.prodofferaccept.widget.messagetips.ProdOfferInfoTipsWidget",
	                        "orderaccept.prodofferaccept.widget.messagetips.WarmTipsWidget",
	                        "orderaccept.prodofferaccept.widget.messagetips.CollectTipsWidget",
	                        "orderaccept.prodofferaccept.widget.messagetips.ProdOfferAcceptTipsWidget",
	                        "orderaccept.prodofferaccept.loader.MultipleSubProdOfferHandler"];
                },
                _asynCallback : function() {
	                var controller = this;
	                // register class			        
			        controller.registerClass();
	                // 初始化数据
			        controller.serviceCardWidgetMap = {};			        
			        controller.captureEventRegistry();	
			        controller.initUserHasProdOfferData();  
	                // 初始化数据
	                controller.initProdOfferData();   
			        // 初始化区域
			        controller.renderBelongCode();	
	                
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
	                // 初始化经办人信息
	                controller.initViaInfoWidget();
	                
	                // 初始化一些全局处理
	                controller.initGlobalHelper();
	                // 初始化全局销售品提示框.温馨提示框
	                controller.initTipsWidgets();
	                
	                // 初始化自主版或加装包套餐时可选包受理
	                controller.initMultipleSubProdOfferHandler();
			        // 渲染主销售品树
			        controller.renderMainProdOfferTree();
	                
	                // 打开页面的面板
	                controller.openProdOfferAcceptPane();
	                
	                // 生成主销售品视图
	                controller.buildMainProdOfferView();
	                
	                // 初始化服务信息卡片以及产品属性卡片
	                controller.addAllServiceCardWidgets();
	                
	                // 初始化可选包
	                controller.renderOrderedSubProdOffer();
	                
	                // 初始化客户已订购的销售品、可选包、促销政策信息
	                controller.initCustomerOrderData();
	                // 渲染促销政策订购列表
	                controller.renderPromotionOrderGrid();
	                // 渲染促销政策视图
	                controller.renderSalesPromotion();
	                // 初始化已订购的促销政策
	                // controller.promotionCartDataProvider.showOrderedPromotion();
			        // 主销售品高级查询
			        controller.initAdvanceSearchWidget();
			        // 初始化等待条
			        controller.initWaitingBar();
	                // 触发onload 事件
	                controller.fireEvent("onload");
	                
                },   
		        /**
				 * 注册受理过程中需要用到的类
				 * 
				 * @method
				 */
		        registerClass : function() {
			        var controller = this;
			        // register class
	                controller.mainProdOfferWidgetClass = orderaccept.prodofferaccept.widget.prodchangeaccept.ProdChangeAcceptWidget;
	                controller.payRelationWidgetClass = orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget;
	                controller.subProdOfferOrderGridClass = orderaccept.custom.BusCardGrid;
	                controller.personalSubCollectListWidgetClass = orderaccept.prodofferaccept.widget.prodofferfavoritelist.personalSubCollectListWidget;
	                controller.functionNavigatorWidgetClass = orderaccept.prodofferaccept.widget.functionnavigator.FunctionNavigatorWidget;
	                controller.salesPromotionOrderGridClass = orderaccept.custom.Grid;
	                
	                controller.prodOfferInfoTipsWidgetClass = orderaccept.prodofferaccept.widget.messagetips.ProdOfferInfoTipsWidget;
	                controller.warmTipesWidgetClass = orderaccept.prodofferaccept.widget.messagetips.WarmTipsWidget;
	                controller.prodOfferAcceptTipsWidgetClass = orderaccept.prodofferaccept.widget.messagetips.ProdOfferAcceptTipsWidget;
	                controller.collectTipsWidgetClass = orderaccept.prodofferaccept.widget.messagetips.CollectTipsWidget;
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
	                var domNode = unieap.byId("mainProdOfferPane").containerNode;
	                this.mainProdOfferWidget = new this.mainProdOfferWidgetClass({	                	
		        		notChgMain : true
	                });
	                dojo.place(this.mainProdOfferWidget.domNode, domNode, "first");
	                var offerInfoVO = util.ProdOfferHelper
	                        .getMainProdOffer(dojo.global.$appContext$.get("prodOfferList"))[0];
	                var offerInstVO = dojo.filter(dojo.global.$appContext$
	                                .get("userHasProdOfferInfoList"),
	                        function(userHasOffer) {
		                        return userHasOffer.prodOfferId == offerInfoVO.prodOfferId;
	                        })[0];
	                controller.renderMainProdOfferAttr({
		                        prodOfferInfoVO : offerInfoVO,
		                        prodOfferInstVO : offerInstVO
	                        });
                },        
                /**
				 * 根据新的销售品ID生成新的销售品受理视图
				 * 
				 * @method
				 */
                changeMainProdOffer : function(id) {
	                try {
		                var loader = this;
		                if (loader.mainProdOfferId == id) { return false; }
		                // 1: 首先设置当前主销售品id
		                loader.mainProdOfferId = id;
		                // 2: 重新渲染基础包视图
		                loader.renderMainProdOffer(id);
		                // 3: 关闭左侧选择主销售品的区域
		                unieap.byId('BorderPane').close();
		                // 4.打开主销售品区域和可选包区域
		                loader.openProdOfferAcceptPane();
		                // 5.生成接入类产品服务信息以及产品属性
		                loader.addAllServiceCardWidgets();
		                // 6.渲染可选包区域右侧受理的销售品视图
		                loader.multipleSubProdOfferHandler.doMultipleSubProdOfferFilter(id);
		                // 7.重新渲染促销政策视图(先注释掉)
		                // loader.renderPromotion(id);
		                
	                }
	                catch (e) {
		                this.clear();
		                BusCard.showErrorStack(e);
		                throw e;
	                }
	                
                },
                /**
				 * 根据新的销售品ID重新生成基础包相关视图
				 * 
				 * @param {String} id 主销售品id
				 */
                renderMainProdOffer : function(id) {
	                var loader = this;
	                
	                var domNode = unieap.byId("mainProdOfferPane").containerNode;
	                // 1: 首先删除此主销售品视图下的所有产品信息
	                this.removeAllServiceCardWidgets();
	                
	                // 2: 删除主销售品视图组件
	                if (this.mainProdOfferWidget) {
		                this.mainProdOfferWidget.destroyRecursive();
	                }
	                // 3: 根据主销售品id重新请求配置销售品列表 这步需要考虑缓存
	                var prodOfferList = util.ServiceFactory
	                        .getService("url:orderDetailAction.do?method=doGetProdOfferList&prodOfferId="
	                                + id);
	                var offerInfoVO = util.ProdOfferHelper.getMainProdOffer(prodOfferList)[0];
	                // 4: 向全局注册重新请求的销售品列表
	                dojo.global.$appContext$.set("prodOfferList", prodOfferList);
	                util.ProdOfferInstProvider.getProdOfferDataForChgMain();
	                // 5: 重新初始主销售品视图组件
	                var offerInstVO = dojo.filter(dojo.global.$appContext$
	                                .get("userHasProdOfferInfoList"),
	                        function(userHasOffer) {
		                        return userHasOffer.prodOfferId == offerInfoVO.prodOfferId;
	                        })[0];
			        this.mainProdOfferWidget = new this.mainProdOfferWidgetClass({});
			        dojo.place(this.mainProdOfferWidget.domNode, domNode, "first");
			        loader.renderMainProdOfferAttr({
				                prodOfferInfoVO : util.ProdOfferHelper.getMainProdOffer($ac$
				                        .get("prodOfferList"))[0],
				                prodOfferInstVO : offerInstVO
			                });
	                
                },
                addAllServiceCardWidgets : function() {
	                var trs = dojo.query(".main-product-basic",
	                        this.mainProdOfferWidget.domNode),
		                controller = this;
	                dojo.forEach(trs, function(node) {
		                        controller
		                                .addServiceCardWidget(dojo.attr(node, "uniqueId"));
	                        });
	                
                },
                /**
				 * 初始化变更主销售品的数据,异步处理
				 * 
				 * @method
				 */
                initUserHasProdOfferData : function() {
	                var loader = this,
		                oldMainprodOfferInstId = loader.requestParam.prodOfferInstId;
	                BusCard.doGet(BusCard.path.contextPath + "/orderDetailAction.do", {
		                        method : "doGetProdOfferListForChgMainProvider",
		                        prodOfferInstId : oldMainprodOfferInstId
	                        }, true, function(prodOfferData) {
		                        dojo.global.$appContext$.set("userHasProdOfferInfoList",
		                                prodOfferData.userHasProdOfferInfoList);
		                        dojo.global.$appContext$.set(
		                                "userHasProdOfferMetaInfoList",
		                                prodOfferData.userHasProdOfferMetaInfoList || []);
		                        loader.disableBelongCode();
		                        
	                        });
	                
                },
                buildSubProdOfferTreeURL : function(id) {
	                var userHasProdOfferIdList = [];
	                dojo.forEach(dojo.global.$appContext$.get("userHasProdOfferInfoList")
	                                || [], function(userHasProdOfferInfo) {
		                        return userHasProdOfferIdList
		                                .push(userHasProdOfferInfo.prodOfferId);
	                        });
	                return BusCard.path.contextPath+"/orderDetailAction.do?method=getProdOfferTreeForChg&prodOfferId="
	                        + id
	                        + "&userHasProdOfferIdList="
	                        + dojo.toJson(userHasProdOfferIdList);
                },
                /**
				 * 设置区域值，并将其置灰，不可选择的状态
				 */
                disableBelongCode : function() {
	                // 1.获取区域
	                var loader = this,
		                belongcode = null,
		                userHasMainProdOfferData = dojo.filter(dojo.global.$appContext$
		                                .get("userHasProdOfferInfoList")
		                                || [], function(userHasProdOfferInfo) {
			                        return loader.requestParam.prodOfferInstId == userHasProdOfferInfo.prodOfferInstId;
		                        });
	                dojo.forEach(userHasMainProdOfferData || [], function(
	                                userHasProdOfferInfoVO) {
		                        if (belongcode != null) { return false; }
		                        dojo.forEach(userHasProdOfferInfoVO.prodInstList || [],
		                                function(relaProdInfoVO) {
			                                belongcode = relaProdInfoVO.belongCode;
			                                if (belongcode != null) { return false; }
		                                });
	                        });
	                // 2.给区域赋值，并且将区域置为不可以操作
	                if (belongcode != null) {
		                dojo.byId("common-belongcode").value = belongcode;
		                dojo.byId("common-belongcode").disabled = "disabled";
	                }
                },
	            initBehavior : function(){
	            	this.behaviorInstance = new orderaccept.prodofferaccept.behavior.ProdChangeAcceptBehavior(this);
	            },
	            initCheck : function() {
	                this.checkInstance = new orderaccept.prodofferaccept.check.ProdChangeAcceptCheck(this);           
                },
                initDataBuilder : function() {
	                this.dataBuilder = new orderaccept.prodofferaccept.data.ProdChangeAcceptDataBuilder(this);
                },
                renderPromotionOrderGrid : function(){
                	dojo.byId("promotionPane").style.display = "none";
                },
                renderPayRelation : function(){
                	dojo.byId("payRelationPane").style.display = "none";
                },
		        getBelongCode : function() {
			        return !!dojo.global.$appContext$.get("keepMainProdInstList")
			        		?dojo.global.$appContext$.get("keepMainProdInstList")[0].belongCode
			        		:dojo.byId("common-belongcode").value;
		        }
            });
	});