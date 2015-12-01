defineModule("orderaccept.prodofferaccept.loader.ProdOfferNewLoader", ["../util", "../../base/Controller",
                "../widget/servicecard/ServiceCardWidget", "../widget/resourcecard/ResourceCardWidget",
                "../widget/serviceproduct/ServiceProductWidget", "../widget/attrcard/ProductOfferAttrCardWidget",
                "../widget/attrcard/ProductAttrCardWidget", "../../custom/TooltipDialog",
                "../formatter/FormatterProvider", "../builder.prodofferdetail.MainProdOfferDetailBuilder",
                "../widget/commcard/CommCardWidget", "../builder/subprodoffergrid/SubProdOfferCartDataProvider",
                "../OrderShowLoader", "../formatter/PromotionFormatterProvider",
                "../builder/promotiondetail/PromotionDetailBuilder",
                "../builder/promotiongrid/PromotionCartDataProvider", "orderaccept.common.dialog.MessageBox",
                "../../custom/BusCardGrid", "../widget/prodofferfavoritelist/personalPromotionCollectListWidget",
                "unieap.layout.AccordionContainer", "unieap.layout.AccordionPane",
                "../widget/commheader/CommHeaderWidget", "../widget/commheader/SubHeaderWidget",
                "unieap.layout.BorderContainer", "dojo.cache", "../widget/commheader/PromotionHeaderWidget"], function(
                util, Controller, ServiceCardWidget, ResourceCardWidget, ServiceProductWidget,
                ProductOfferAttrCardWidget, ProductAttrCardWidget, TooltipDialog, FormatterProvider,
                ProdOfferDetailBuilder, CommCardWidget, SubProdOfferCartDataProvider, OrderShowLoader,
                PromotionFormatterProvider, PromotionDetailBuilder, PromotionCartDataProvider, messageBox, BusCardGrid,
                personalPromotionCollectListWidget) {
	        /**
			 * 定义销售品订购整体控制器,整体流程处理由DataBuilder,Behavior,Widget,Check,Rule子模块
			 * 协作完成,DataBuilder主要完成实体数据的构建;Behaivor完成各种事件处理函数的注册;Widget完成
			 * 页面视图的展现;Check完成业务规则的检测;Rule完成各种规则的调用管理
			 * 
			 * @class
			 * @extends orderaccept.base.Controller
			 */
	        dojo.declare("orderaccept.prodofferaccept.loader.ProdOfferNewLoader", [Controller], {
		        layoutTemplateUrl : dojo.moduleUrl("orderaccept.prodofferaccept", "view/prodOfferNewLayout_new.html"),
		        /**
				 * 主销售品展现Widget类定义
				 * 
				 * @field
				 */
		        mainProdOfferWidgetClass : null,
		        /**
				 * 卡片信息map
				 * 
				 * @fieldr
				 */
		        serviceCardWidgetMap : null,
		        
		        eventListenerRegistry : null,
		        
		        /**
				 * 当前正在受理的主销售品ID
				 * 
				 * @field
				 */
		        mainProdOfferId : null,
		        /**
				 * 新装受理时行为定义类
				 * 
				 * @field
				 */
		        behaviorInstance : null,
		        
		        /**
				 * 新装受理时检测行为定义类
				 * 
				 * @field
				 */
		        checkInstance : null,
		        
		        dataBuilder : null,
		        
		        specDataBuilder : null,
		        
		        newSpecDataBuilder : null,
		        
		        productAttrCardWidgetClass : ProductAttrCardWidget,
		        
		        serviceProductWidgetClass : ServiceProductWidget,
		        
		        ProductOfferAttrCardWidgetClass : ProductOfferAttrCardWidget,
		        
		        serviceCardWidgetClass : ServiceCardWidget,
		        
		        resourceCardWidgetClass : ResourceCardWidget,
		        
		        mainProdOfferWidget : null,
		        
		        mainProdOfferDetailWidget : null,
		        
		        payRelationWidgetClass : null,
		        
		        payRelationWidgetInstance : null,
		        
		        subProdOfferOrderGridClass : null,
		        
		        subProdOfferOrderGrid : null,
		        
		        searchSubListWidgetInstanceMap : {},
		        
		        personalSubCollectListWidgetInstanceMap : {},
		        
		        personalSubCollectMoreListWidgetInstanceMap : {},
		        
		        viaInfoCardWidget : null,
		        
		        orderInfoCardWidget : null,
		        
		        functionNavigatorWidget : null,
		        
		        functionNavigatorWidgetClass : null,
		        
		        prodOfferInfoTipsWidget : null,
		        
		        prodOfferInfoTipsWidgetClass : null,
		        
		        advanceSearchWidget : null,
		        
		        advanceSearchWidgetClass : null,
		        
		        collectTipsWidget : null,
		        
		        collectTipsWidgetClass : null,
		        
		        warmTipesWidget : null,
		        
		        warmTipesWidgetClass : null,
		        
		        prodOfferAcceptTipsWidget : null,
		        
		        prodOfferAcceptTipsWidgetClass : null,
		        
		        subProdOfferTree : null,
		        
		        orderShowLoader : null,
		        
		        batchNewWidget : null,
		        
		        batchNewWidgetClass : null,
		        
		        subProdOfferCartDataProvider : null,
		        
		        peddleProdOfferListWidgetClass : null,
		        
		        hotProdOfferListWidgetClass : null,
		        
		        personalCollectListWidgetClass : null,
		        
		        personalSubCollectListWidgetClass : null,
		        
		        salesPromotionOrderGridClass : null,
		        
		        salesPromotionOrderGrid : null,
		        
		        promotionDetailBuilder : null,
		        
		        promotionCartDataProvider : null,
		        
		        oldUserAddedHandler : null,
		        
		        multipleSubProdOfferHandler : null,
		        
		        ShoppingCartWidgetClass : null,
		        
		        shoppingCartWidgetInstance : null,
		        
		        comboServiceCardRequest : true,
		        
		        jsonpRequest : true,
		        
		        promotionSearchListWidgetInstance : null,
		        
		        subProdOfferContentTemplate : dojo
		                .cache("orderaccept.prodofferaccept.view", "subProdOfferContent.html"),
		        
		        personalCollectPromotionListWidgetClass : personalPromotionCollectListWidget,
		        
		        /**
				 * 促销政策查询模板
				 */
		        promotionContentTemplate : dojo.cache("orderaccept.prodofferaccept.view", "promotionContent.html"),
		        
		        /**
				 * 全局生命周期属性,保证在受理上下文切换时保存在$ac$中的对应的属性不会被清除
				 */
		        globalLifeCycleProperties : ["prodOfferList", "currentMainProdOfferInfoVO",
		                "selectedMainProdOfferInfoVO", "selectedMemberProdOfferList", "requestParam",
		                "userHasProdOfferInfoList", "userHasProdOfferMetaInfoList", "serviceOfferConfig",
		                "listenerRegistry", "mainProdOfferInfoVO", "DataManager", "processId", "currentProcessId",
		                "mainProdOfferInstVO", "subGroupProdInfo", "orderPromotionList"],
		        
		        /**
				 * @constructs
				 */
		        constructor : function(param) {
			        
			        this.requestParam = param;
			        
			        this.mainProdOfferWidget = null;
			        
		        },
		        postscript : function() {
			        this.init();
					BusCard.removeCoverLayer();				        
			        // 异步执行
			        this.asynExecute(this._asynLoadSriptList(), dojo.hitch(this, "_asynCallback"));
			         
			        // alert(this.findCustRecognitionHeadWin());
			        
		        },
		        /**
				 * AMD全部完成回调方法
				 * 
				 * @method
				 */
		        _asynCallback : function() {
			        
			        var controller = this;
			        
			        controller.registerClass();
			        
			        // 添加老用户信息
			        controller.initOldUserAddedHandler();
			        
			        // 监听各种事件
			        controller.initBehavior();
			        
			        // 初始化检测
			        controller.initCheck();
			        
			        // 初始化订单数据构建器
			        controller.initDataBuilder();
			        // do render work below：主要平安处理时间使用
			        controller.initSpecialDataBuilder();
			        
			        // 获取收藏销售品，包括个人收藏、热点、企业热推等
			        controller.renderProdOfferFavorite();
			        
			        // 渲染可选包订购列表
			        // controller.renderSubProdOfferOrderGrid();
			        
			        // controller.initSubProdOfferCartDataProvider();
			        
			        // 渲染促销政策查询模板
			        controller.renderPromotionLayout();
			        
			        // 渲染促销政策订购列表
			        controller.renderPromotionOrderGrid();
			        
			        // 初始化支付关系
			        controller.renderPayRelation();
			        
			        // 初始化功能导向：上一步、下一步的按钮等。
			        controller.initFunctionNavigatorWidget();
			        // 初始化订单信息
			        controller.initOrderInfoWidget();
			        // 初始化经办人信息
			        controller.initViaInfoWidget();
			        // 初始化账号创建信息
			        // controller.initManageAccWidget();
			        // 初始化一些全局处理：页面展现相关的一些处理
			        controller.initGlobalHelper();
			        
			        // 初始化自主版或加装包套餐时可选包受理
			        controller.initMultipleSubProdOfferHandler();
			        
			        // 初始化全局销售品提示框.温馨提示框
			        controller.initTipsWidgets();
			        // 主销售品高级查询
			        controller.initAdvanceSearchWidget();
			        // 初始化等待条
			        controller.initWaitingBar();
			        // 初始化订单预览
			        controller.initOrderPreView();
			        // 触发onload 事件
			        controller.fireEvent("onload");
			        
		        },
		        /**
				 * 异步加载的模块,这里的模块要尽量保证其所依赖的模块已经加装完毕
				 * 
				 * @method
				 */
		        _asynLoadSriptList : function() {
			        
			        return ["orderaccept.prodofferaccept.behavior.ProdOfferNewBehavior",
			                "orderaccept.prodofferaccept.data.ProdOfferNewDataBuilder",
			                "orderaccept.prodofferaccept.data.SpecialDataHandler",
			                "orderaccept.prodofferaccept.check.ProdOfferNewCheck",
			                "orderaccept.prodofferaccept.rule.ProdOfferNewRule",
			                "orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget",
			                "orderaccept.custom.Grid", "orderaccept.custom.BusCardGrid",
			                "orderaccept.prodofferaccept.widget.mainprodoffer.MainProdOfferFlatWidget",
			                "orderaccept.prodofferaccept.widget.prodofferfavoritelist.peddleProdOfferListWidget",
			                "orderaccept.prodofferaccept.widget.prodofferfavoritelist.hotProdOfferListWidget",
			                "orderaccept.prodofferaccept.widget.prodofferfavoritelist.personalCollectListWidget",
			                "orderaccept.prodofferaccept.widget.prodofferfavoritelist.personalSubCollectListWidget",
			                "orderaccept.prodofferaccept.widget.functionnavigator.FunctionNavigatorWidget",
			                "orderaccept.prodofferaccept.loader.OldUserAddedHandler",
			                "orderaccept.prodofferaccept.loader.MultipleSubProdOfferHandler",
			                "orderaccept.prodofferaccept.widget.messagetips.ProdOfferInfoTipsWidget",
			                "orderaccept.prodofferaccept.widget.messagetips.WarmTipsWidget",
			                "orderaccept.prodofferaccept.widget.manageaccnbrwidget.ManageAccNbrWidget",
			                "orderaccept.prodofferaccept.widget.messagetips.CollectTipsWidget",
			                "orderaccept.prodofferaccept.widget.messagetips.ProdOfferAcceptTipsWidget",
			                "orderaccept.prodofferaccept.widget.commheader.AdvanceSearchWidget",
			                "orderaccept.custom.popup", "orderaccept.prodofferaccept.widget.batchnew.BatchNewWidget",
			                "orderaccept.prodofferaccept.widget.shoppingcart.ShoppingCartWidget"];
			        
		        },
		        /**
				 * 初始化一些实例变量和页面:
				 * zhuguojun:主要把树和主要页面布局弄出来
				 * @method
				 */
		        init : function() {
			        
			        this.serviceCardWidgetMap = {};
			        
			        this.captureEventRegistry();
			        
			        this.renderLayout();
			        
			        util.navigatorManager.to("mainProdOfferSelectPane")(function() {
				                dojo.byId("function-navigator-root").style.display = "none";
			                });
			        
			        // 初始化区域
			        this.renderBelongCode();
			        // 渲染主销售品树
			        this.renderMainProdOfferTree();
			        
		        },
		        /**
				 * 初始化等待条
				 */
		        initWaitingBar : function() {
			        this.waitingBarInstance = util.WaitingBar.getInstance();
			        this.waitingBarInstance.initMe();
		        },
		        /**
				 * 渲染整体页面布局
				 * 
				 * @method
				 */
		        renderLayout : function() {
			        var rootNode = dojo.byId("prodoffer-accept-root");
			        
			        rootNode.innerHTML = dojo._getText(this.layoutTemplateUrl);
			        
			        dojo.parser.parse(rootNode);
			        
			        // this.renderSubProdOfferLayout();
			        this._doLayoutMend();
			        
			        this.addIconForQuickAccept();
			        
			        this.appendIntroInfoForMainProdOffer();
			        
			        this.updateCurrentProdOfferName("\u672a\u9009\u62e9\u9500\u552e\u54c1");
			        
		        },
		        /**
				 * 
				 * @method
				 */
		        appendIntroInfoForMainProdOffer : function() {
			        var shoppingCartPane = unieap.byId("shoppingCartPane");
			        if (shoppingCartPane) {
				        var titleNode = shoppingCartPane.titleText || shoppingCartPane.titleNode;
				        var innerTp = "<span id='currcentAcceptMainProdOfferWrapper' class='mainprodoffer-intro-wrapper'>[\u6b63\u5728\u53d7\u7406\u7684\u9500\u552e\u54c1\uff1a"
				                + "<span id = 'currcentAcceptMainProdOfferSpan' class='main-prodoffer-intro'></span>"
				                + "]</span>";
				        var _div = document.createElement("div");
				        var _fragment = document.createDocumentFragment();
				        _div.innerHTML = innerTp;
				        var childNodes = _div.childNodes;
				        dojo.forEach(dojo._toArray(childNodes), function(node) {
					                _fragment.appendChild(node);
				                });
				        _div = null;
				        titleNode.appendChild(_fragment);
			        }
			        
		        },
		        
		        updateCurrentProdOfferName : function(name) {
			        var node = dojo.byId("currcentAcceptMainProdOfferSpan");
			        node && (node.innerHTML = name);
		        },
		        
		        /**
				 * 渲染可选包受理布局,可以重复调用
				 * 
				 * @method
				 */
		        renderSubProdOfferLayout : function() {
			        
			        unieap.byId("subProdOfferPane").destroyDescendants();
			        
			        unieap.byId("subProdOfferPane").containerNode.innerHTML = BusCard.Template
			                .create(this.subProdOfferContentTemplate).apply({});
			        
			        dojo.parser.parse(unieap.byId("subProdOfferPane").containerNode);
			        
			        this.renderSubProdOfferSearch();
			        
		        },
		        
		        /**
				 * 展现可选包的搜索
				 */
		        renderSubProdOfferSearch : function(uniqueId) {
			        var uniqueId = uniqueId || "";
			        var subHeaderWidgetInstance = new orderaccept.prodofferaccept.widget.commheader.SubHeaderWidget({
				                uniqueId : uniqueId
			                });
			        dojo.place(subHeaderWidgetInstance.domNode,
			                unieap.byId("subProdOfferBorderPan" + uniqueId).containerNode, "first");
		        },
		        
		        /**
				 * 捕获在全局定义的针对当前控制器的事件监听,目前很少用到
				 * 
				 * @method
				 */
		        captureEventRegistry : function() {
			        
			        this.eventListenerRegistry = {};
			        
			        dojo.mixin(this.eventListenerRegistry, dojo.global.$appContext$.get(this.declaredClass
			                        + ".eventListenerRegistry"));
			        
			        dojo.global.$appContext$.deleteProperty(this.declaredClass + ".eventListenerRegistry");
			        
		        },
		        
		        /**
				 * 注册受理过程中需要用重复用到的类
				 * 
				 * @method
				 */
		        registerClass : function() {
			        var controller = this;
			        // register class
			        controller.mainProdOfferWidgetClass = orderaccept.prodofferaccept.widget.mainprodoffer.MainProdOfferFlatWidget;
			        controller.payRelationWidgetClass = orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget;
			        controller.subProdOfferOrderGridClass = orderaccept.custom.BusCardGrid;
			        controller.peddleProdOfferListWidgetClass = orderaccept.prodofferaccept.widget.prodofferfavoritelist.peddleProdOfferListWidget;
			        controller.personalCollectListWidgetClass = orderaccept.prodofferaccept.widget.prodofferfavoritelist.personalCollectListWidget;
			        controller.personalSubCollectListWidgetClass = orderaccept.prodofferaccept.widget.prodofferfavoritelist.personalSubCollectListWidget;
			        controller.hotProdOfferListWidgetClass = orderaccept.prodofferaccept.widget.prodofferfavoritelist.hotProdOfferListWidget;
			        controller.functionNavigatorWidgetClass = orderaccept.prodofferaccept.widget.functionnavigator.FunctionNavigatorWidget;
			        controller.salesPromotionOrderGridClass = orderaccept.custom.BusCardGrid;
			        controller.prodOfferInfoTipsWidgetClass = orderaccept.prodofferaccept.widget.messagetips.ProdOfferInfoTipsWidget;
			        controller.warmTipesWidgetClass = orderaccept.prodofferaccept.widget.messagetips.WarmTipsWidget;
			        controller.prodOfferAcceptTipsWidgetClass = orderaccept.prodofferaccept.widget.messagetips.ProdOfferAcceptTipsWidget;
			        controller.collectTipsWidgetClass = orderaccept.prodofferaccept.widget.messagetips.CollectTipsWidget;
			        controller.manageAccNbrWidgetClass = orderaccept.prodofferaccept.widget.manageaccnbrwidget.ManageAccNbrWidget;
			        controller.advanceSearchWidgetClass = orderaccept.prodofferaccept.widget.commheader.AdvanceSearchWidget;
			        controller.batchNewWidgetClass = orderaccept.prodofferaccept.widget.batchnew.BatchNewWidget;
			        controller.ShoppingCartWidgetClass = orderaccept.prodofferaccept.widget.shoppingcart.ShoppingCartWidget;
			        // controller.personalCollectPromotionListWidgetClass
			        // =
			        // orderaccept.prodofferaccept.widget.prodofferfavoritelist.personalPromotionCollectListWidget;
			        
		        },
		        /**
				 * 初始化添加老成员处理类实例,比如成员套餐选择一个老用户时, 需要调用此方法进行相应的后续处理
				 * 
				 * @method
				 */
		        initOldUserAddedHandler : function() {
			        this.oldUserAddedHandler = new orderaccept.prodofferaccept.loader.OldUserAddedHandler(this);
		        },
		        /**
				 * 初始化对应的行为子模块实例
				 * 
				 * @method
				 */
		        initBehavior : function() {
			        this.behaviorInstance = new orderaccept.prodofferaccept.behavior.ProdOfferNewBehavior(this);
			        
		        },
		        /**
				 * 初始化对应的检测子模块实例
				 * 
				 * @method
				 */
		        initCheck : function() {
			        this.checkInstance = new orderaccept.prodofferaccept.check.ProdOfferNewCheck(this);
			        
		        },
		        getBelongCode : function() {
			        return dojo.byId("common-belongcode").value;
		        },
		        buildMainProdOfferTreeURL : function() {
			        var requestParam = dojo.global.$appContext$.get("requestParam"),
				        param = {
					        custType : requestParam.customerData.custType ? requestParam.customerData.custType : -1,
					        custId : requestParam.customerData.custId,
					        cityCode : requestParam.customerData.cityCode,
					        belongCode : this.getBelongCode()
					        
				        };
			        return BusCard.path.contextPath + "/shoppingCartAction.do?method=doSaleworkTreeAllXml&"
			                + BusCard.buildParam(param) + this.appendOfferFilterParameters();
		        },
		        buildSubProdOfferTreeURL : function(id,uniqueId) {
			        return BusCard.path.contextPath
			                + "/orderDetailAction.do?method=getProdOfferTreeForNew&prodOfferId=" + id
			                + "&memOfferList=" + this.getMemberProdOfferIds(uniqueId)
			                + "&commonRegionId="+(this.getBelongCode()||"")
			                + "&accProdListStr="+this.getAccProdIdList(uniqueId);
		        },
		        
		        /**
		         * 获取接入类产品id集合
		         */
		        getAccProdIdList : function(uniqueId){
		        	uniqueId = uniqueId||"";
		        	if(uniqueId == ""){
		        		return dojo.toJson(dojo.map($ac$.selectedMemberProdOfferList||[],function(info){
		        			return info.productId;
		        		}));
		        	}else{
		        		return dojo.toJson(dojo.map(dojo.filter($ac$.selectedMemberProdOfferList||[],function(_info){
		        			return _info.uniqueId == uniqueId;
		        		})||[],function(info){
		        			return info.productId;
		        		}));
		        	}
		        },
		        
		        /**
		         * 获取成员销售品id集合,以供产品获取数据用
		         */
		        getMemberProdOfferIds : function(uniqueId){
		        	//如果是拆分，则传空
		        	var targetSelectMem = dojo.filter($ac$.selectedMemberProdOfferList||[],function(_data){
						return _data.uniqueId == uniqueId;
					});
	        		if((!!targetSelectMem)&&targetSelectMem.length>0){
	        			if(targetSelectMem[0].action=='split'||targetSelectMem[0].action=='quit'){
	        				return dojo.toJson([targetSelectMem[0].offerInstVO.prodOfferId+""]);
	        			}
	        		}
		        	var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
		        	var targetMemberProdOfferList =  dojo.filter(selectedMemberProdOfferList||[],function(selectedMemberProdOfferInfo){
		        		return selectedMemberProdOfferInfo.action!="quit"&&selectedMemberProdOfferInfo.action!="split";
		        	});
		        	return dojo.toJson(dojo.map(targetMemberProdOfferList||[],function(info){
		        		return info.prodOfferId;
		        	}));
		        },
		        
		        // 促销政策目录树请求路径
		        buildPromotionTreeURL : function(prodOfferIdList, productIdList, belongCode, mainProdOfferId) {
			        return BusCard.path.contextPath + "/orderDetailAction.do?method=getSalesPromotion&prodOfferIdList="
			                + dojo.toJson(prodOfferIdList) + "&productIdList=" + dojo.toJson(productIdList)
			                + "&belongCode=" + belongCode + "&mainProdOfferId=" + mainProdOfferId;
		        },
		        /**
				 * 生成主销售品树
				 * 
				 * @method
				 */
		        renderMainProdOfferTree : function() {
			        this.mainProdOfferTree = util.WidgetProvider.getMainProdOfferTree({
				                url : this.buildMainProdOfferTreeURL()
			                });
			        var domNode = unieap.byId("mainProdOfferTreePane").containerNode;
			        dojo.place(this.mainProdOfferTree.domNode, domNode, "last");
			        
		        },
		        /**
				 * 根据新选择的销售品ID重新生成基础包相关视图
				 * 
				 * @param {String} id 主销售品id
				 * @method
				 */
		        renderMainProdOffer : function(id) {
			        var loader = this;
			        
			        var domNode = unieap.byId("mainProdOfferPane").containerNode;
			        // 首先删除此主销售品视图下的所有产品信息
			        this.removeAllServiceCardWidgets();
			        
			        // 删除主销售品视图组件
			        if (this.mainProdOfferWidget) {
				        this.mainProdOfferWidget.destroyRecursive();
				        this.mainProdOfferWidget = null;
			        }
			        // 重新初始主销售品视图组件
			        this.mainProdOfferWidget = new this.mainProdOfferWidgetClass({});
			        dojo.place(this.mainProdOfferWidget.domNode, domNode, "first");
			        loader.renderMainProdOfferAttr(loader.getMainProdOfferInfo());
		        },
		        getMainProdOfferInfo : function() {
			        return {
				        prodOfferInfoVO : $ac$.get("selectedMainProdOfferInfoVO")
				                || util.ProdOfferHelper.getMainProdOffer($ac$.get("prodOfferList"))[0],
				        prodOfferInstVO : null
			        };
		        },
		        /**
				 * 获取销售品数据
				 * 
				 * @method
				 */
		        getProdOfferList : function(mainProdOfferId, uniqueId, prodOfferInstId, cb) {
			        var uniqueId = uniqueId || "";
			        // 根据主销售品id重新请求配置销售品列表 这步需要考虑缓存
			        var prodOfferList = util.ServiceFactory.getService(
			                "url:orderDetailAction.do?method=doGetProdOfferList&prodOfferId=" + mainProdOfferId, cb);
			        // 向全局注册重新请求的销售品列表
			        if (!cb) {
				        dojo.global.$appContext$.set("prodOfferList" + uniqueId, prodOfferList);
			        }
		        },
		        /**
				 * 展示购物车中的数据(外部调用)
				 */
		        showSubProdOfferCart : function(subProdOfferCartDataProvider) {
			        subProdOfferCartDataProvider.showSelectDefaultProdOffer();
		        },
		        /**
				 * 根据新的销售品ID重新生成基础包相关视图
				 * 
				 * @param {String} id 主销售品id
				 */
		        renderMainProdOfferAttr : function(prodOffer) {
			        var loader = this;
			        // 1: 删除视图组件
			        this.mainProdOfferDetailData = null;
			        if (this.mainProdOfferDetailWidget) {
				        this.mainProdOfferDetailWidget.destroyRecursive();
			        }
			        // 2: 重新创建视图组件
			        var prodOfferDetailBuilder = new ProdOfferDetailBuilder(this);
			        prodOfferDetailBuilder.initProdOfferDetail({
				                subProdOfferInfo : prodOffer.prodOfferInfoVO,
				                prodOfferInst : prodOffer.prodOfferInstVO,
				                config : $ac$.mainProdOfferInstVO != null ? $ac$.get("offerStandardStartDate_"
				                        + $ac$.mainProdOfferInstVO.prodOfferInstId) : ""
			                });
			        this.mainProdOfferDetailWidget = prodOfferDetailBuilder.prodOfferDetailWidgetList["main-"
			                + prodOffer.prodOfferInfoVO.prodOfferId];
			        
		        },
		        /**
				 * 根据新的销售品ID重新生成可选包相关视图
				 * 
				 * @param {String} id 主销售品id
				 */
		        renderSubProdOffer : function(param) {
			        var mainProdOfferId = param.mainProdOfferId,
				        uniqueId = param.uniqueId || "",
				        targetNode = unieap.byId('subProdOfferTreeContainer' + uniqueId),
				        loader = this;
			        if (targetNode.subProdOfferTree) {
				        targetNode.subProdOfferTree.destroyRecursive();
			        }
			        targetNode.subProdOfferTree = util.WidgetProvider.getSubProdOfferTree({
				                id : 'subProdOfferTree' + uniqueId,
				                url : loader.buildSubProdOfferTreeURL(mainProdOfferId, uniqueId)
			                });
			        var _node = !!unieap.byId('subProdOfferTreePane' + uniqueId) ? unieap.byId('subProdOfferTreePane'
			                + uniqueId).containerNode : dojo.byId('subProdOfferTreePane' + uniqueId);
			        dojo.place(targetNode.subProdOfferTree.domNode, _node, 'first');
			        loader.personalSubProdOffer(3, mainProdOfferId, uniqueId);
		        },
		        /**
				 * 生成可选包的订购表格
				 * 
				 * @method
				 */
		        renderSubProdOfferOrderGrid : function(param) {
			        
			        var uniqueId = !!param && !!param.uniqueId ? param.uniqueId : "";
			        var targetNode = unieap.byId('subProdOfferTreeContainer' + uniqueId);
			        var loader = this;
			        if (targetNode.subProdOfferOrderGrid) {
				        targetNode.subProdOfferOrderGrid.destroyRecursive();
			        }
			        var cm = new BusCard.widget.grid.ColumnModel({
				                metaData : loader.getSubProdOfferColumns()
			                });
			        var ds = new BusCard.widget.grid.DataSource([], cm);
			        targetNode.subProdOfferOrderGrid = new loader.subProdOfferOrderGridClass({
				                cm : cm,
				                ds : ds
			                }, unieap.byId('subProdOfferCart' + uniqueId).containerNode);
			        unieap.byId('subProdOfferCart' + uniqueId).paneNode.style.overflow = 'auto';
		        },
		        
		        initSubProdOfferCartDataProvider : function() {
			        this.subProdOfferCartDataProvider = new SubProdOfferCartDataProvider(this);
		        },
		        
		        getSubProdOfferColumns : function() {
			        var prodOfferNameFormatter = function(value, inRowIndex) {
				        
				        var bindingData = this.getDataSource().getRawData()[inRowIndex];
				        bindingData.rowIndex = inRowIndex;
				        return FormatterProvider.SubProdOfferHelper.createSubProdOfferDetail(inRowIndex, bindingData);
			        };
			        var prodOfferStartDate = function(value, inRowIndex) {
				        var bindingData = this.getDataSource().getRawData()[inRowIndex];
				        return FormatterProvider.SubProdOfferHelper
				                .createSubProdOfferStartDate(inRowIndex, bindingData);
			        };
			        var prodOfferEndDate = function(value, inRowIndex) {
				        var bindingData = this.getDataSource().getRawData()[inRowIndex];
				        return FormatterProvider.SubProdOfferHelper.createSubProdOfferEndDate(inRowIndex, bindingData);
			        };
			        var prodOfferServiceId = function(value, inRowIndex) {
				        var bindingData = this.getDataSource().getRawData()[inRowIndex];
				        return FormatterProvider.SubProdOfferHelper.createSubProdOfferServiceIdList(inRowIndex,
				                bindingData);
			        };
			        var prodOfferStatus = function(value, inRowIndex) {
				        var bindingData = this.getDataSource().getRawData()[inRowIndex];
				        return FormatterProvider.SubProdOfferHelper.createSubProdOfferStatus(inRowIndex, bindingData);
			        };
			        var prodOfferCollect = function(value, inRowIndex) {
				        var bindingData = this.getDataSource().getRawData()[inRowIndex];
				        return FormatterProvider.SubProdOfferHelper.createSubProdOfferCollect(inRowIndex, bindingData);
			        };
			        var prodOfferDelView = function(value, inRowIndex) {
				        var bindingData = this.getDataSource().getRawData()[inRowIndex];
				        return FormatterProvider.SubProdOfferHelper.createSubProdOfferDelView(inRowIndex, bindingData);
			        }
			        return cm = [{
				                width : '28%',
				                name : 'prodOfferName',
				                text : '可选销售品',
				                render : prodOfferNameFormatter,
				                cssClass : "tableHeader"
			                }, {
				                width : '12%',
				                name : 'startDate',
				                text : '开始时间',
				                render : prodOfferStartDate,
				                cssClass : "tableHeader"
			                }, {
				                width : '12%',
				                name : 'endDate',
				                text : '结束时间',
				                render : prodOfferEndDate,
				                cssClass : "tableHeader"
			                }, {
				                width : '7%',
				                name : 'orderStatus',
				                text : '订购状态',
				                render : prodOfferStatus,
				                cssClass : "tableHeader"
			                }, {
				                width : '20%',
				                name : 'serviceIdList',
				                text : '使用号码',
				                render : prodOfferServiceId,
				                cssClass : "tableHeader"
			                }, {
				                width : '6%',
				                name : 'prodOfferCollect',
				                text : '收藏',
				                render : prodOfferCollect,
				                cssClass : "tableHeader"
			                }, {
				                width : '6%',
				                name : 'prodOfferDelView',
				                text : '删除',
				                render : prodOfferDelView,
				                cssClass : "tableHeader"
			                }

			        ];
			        
		        },
		        /**
				 * 初始化多个可选包受理tab页面,主要用作自主版套餐受理
				 * 
				 * @method
				 */
		        initMultipleSubProdOfferHandler : function() {
			        this.multipleSubProdOfferHandler = new orderaccept.prodofferaccept.loader.MultipleSubProdOfferHandler(this);
		        },
		        
		        /**
				 * 改变当前正在受理的主套餐销售品时触发此方法
				 * 
				 * @method
				 */
		        changeMainProdOffer : function(id) {
			        // add by liuzhongwei
			        
			        var loader = this;
			        var returnResult = true;
			        returnResult = loader.orderGroupProductCheck(id);
			        if (!returnResult) { return; }
			        if (loader.mainProdOfferId == id) {
				        // alert("\u6b63\u5728\u53d7\u7406\u70b9\u51fb\u7684\u5957\u9910,\u8bf7\u786e\u5b9a");
				        messageBox.alert({
					                busiCode : "08410156"
				                });
				        return false;
			        } else {
				        this.mainProdOfferId = id;
				        this.renderShoppingCart();
				        
			        }
			        
		        },
		        
		        prepareShoppingCartInitData : function() {
			        return {
				        prodOfferInfoVO : $ac$.get("currentMainProdOfferInfoVO")
				        
			        };
			        
		        },
		        /**
				 * 初始化套餐选择受理界面
				 * 
				 * @method
				 */
		        renderShoppingCart : function() {
			        var loader = this;
			        if (this.shoppingCartWidgetInstance) {
				        this.shoppingCartWidgetInstance.destroyRecursive();
			        }
			        this.route("spring:innerInterfaceBO/getProdOfferInfo", [{
				                        prodOfferId : loader.mainProdOfferId,
				                        interfaceType : 4,
				                        commonRegionId : loader.getBelongCode()
			                        }, function(prodOfferInfoVO) {
				                        // set global properties
				                        $ac$.set("currentMainProdOfferInfoVO", prodOfferInfoVO);
				                        // create widget instance
				                        loader.shoppingCartWidgetInstance = new loader.ShoppingCartWidgetClass(loader
				                                .prepareShoppingCartInitData());
				                        // render
				                        dojo.place(loader.shoppingCartWidgetInstance.domNode, unieap
				                                        .byId("shoppingCartPane").containerNode, "first");
				                        
			                        }]);
			        
		        },
		        /**
				 * 根据新的销售品ID生成新的销售品受理视图
				 * 
				 * @param {Number} id 受理的主销售品id
				 * @param {HTMLElement} acceptSource 触发主销售品变更的节点
				 * @param {Boolean} independenceConfirm
				 *            是否是自主版选定成员套餐后触发的变更
				 * @method
				 */
		        beginOrder : function(id) {
			        try {
				        util.navigatorManager.to("prodOfferAcceptPane")(function() {
					                dojo.byId("function-navigator-root").style.display = "block";
					                
				                });
				        
				        this.removeResourcesBinding();
				        
				        this.selectedProdOfferId = id;
				        
				        var loader = this;
				        
				        // unieap.byId("globalLayoutContainer").selectChild("prodOfferAcceptPane");
				        
				        // 重新渲染基础包视图
				        loader.renderMainProdOffer(id);
				        
				        // 默认打开基础销售品和可选受理面板
				        loader.openProdOfferAcceptPane();
				        
				        loader.recoveryOrderInfo();
				        
				        var delayCallback = function() {
					        // 渲染可选包信息
					        loader.multipleSubProdOfferHandler.doMultipleSubProdOfferFilter(id);
					        
					        // 渲染促销政策树
					        loader.renderPromotionTree(id);
					        
					        loader.reRenderingPromotionCart();
					        // 关闭主套餐选择面板
					        loader.closeMainProdOfferAcceptPane();
					        
				        };
				        // 短暂延迟处理耗时比较长的业务逻辑,主要解决IE在并发XMLHTTPRequest过多情况下容易造成页面假死现象
				        setTimeout(function() {
					                // 重新加载所有的服务信息
					                loader.addAllServiceCardWidgets(delayCallback);
					                
				                }, 1);
				        
			        }
			        catch (e) {
				        BusCard.showErrorStack(e);
				        this.clear();
				        throw e;
			        }
			        
		        },
		        
		        /**
		         * 恢复订单信息
		         */
		        recoveryOrderInfo : function(){
		        	var accessProdInstList = BusCard.jsonPath(dojo.global.$appContext$.get("userHasProdOfferInfoList")
				                        || [], "$[*].prodInstList[?(@.serviceRelationVO!=null)]");
				    if(accessProdInstList&&accessProdInstList.length>0){
				    	var leaveWord = this.orderInfoCardWidget.busCardInstance.$('leaveWord');
				    	if(leaveWord && !!accessProdInstList[0].serviceRelationVO.note){
				    		leaveWord.value = accessProdInstList[0].serviceRelationVO.note;
				    	}
				    }
                    if(this.declaredClass == "orderaccept.prodofferaccept.loader.ProdOfferNewLoader"){
	                    var trs = dojo.query(".main-product-basic", this.mainProdOfferWidget.domNode);    
	                    var ifNull = "0";
	                    if(!!trs && trs.length > 1){
	                        ifNull = "1";
	                    }else if(!!trs && trs.length == 1){
	                        var serviceKind = dojo.attr(trs[0], "serviceKind");
	                        if(serviceKind=='8' || serviceKind=='70' || serviceKind=='98' || serviceKind=='68' || serviceKind=='12'){                            
	                            ifNull = "1";
	                        }
	                    }
	                    var orderCard = this.orderInfoCardWidget ;
	                    orderCard = orderCard && orderCard.busCardInstance;
					    if(!! orderCard&& !!orderCard.$('developerDealer') && orderCard.$('developerDealer').getAttribute("isnull")){
					        this.orderInfoCardWidget.busCardInstance.$('developerDealer').setAttribute("isnull",ifNull);
                            var label_developerDealer = orderCard.$("label_developerDealer");
                            if(!!label_developerDealer){
                                var formReq = dojo.query(".formRequested",label_developerDealer)[0];
		                        if(ifNull == "0"){
                                    if(!!formReq){
                                        formReq.style.display = "";
                                    }else{
	                                   dojo.place("<span class=\"formRequested\">*</span>",dojo.query(".buscard-label",label_developerDealer)[0],"first");
                                    }
		                        }else{
                                    if(!!formReq){
                                        formReq.style.display = "none";
                                    }
	                            }
                            }
	                    }
                    }
		        },
		        
		        
		        reRenderingPromotionCart : function() {
			        var loader = this;
			        // 展示用户订购促销
			        if (loader.promotionCartDataProvider) {
				        loader.promotionCartDataProvider = null;
			        }
			        loader.promotionCartDataProvider = new PromotionCartDataProvider(loader);
			        loader.promotionCartDataProvider.showOrderedPromotion();
			        
		        },
		        
		        closeMainProdOfferAcceptPane : function() {
			        var pane = unieap.byId("mainProdOfferSelectPane");
			        pane && pane.open && pane.toggle();
			        
		        },
		        
		        /**
				 * 关闭促销政策受理面板
				 */
		        closePromotionAcceptPane : function() {
			        var promotionPane = unieap.byId("promotionPane")
			        if (promotionPane && promotionPane.open) {
				        promotionPane.toggle();
			        }
		        },
		        
		        clear : function(keepMainProdOffer) {
			        if (!keepMainProdOffer) {
				        if (this.mainProdOfferWidget) {
					        this.mainProdOfferWidget.destroyRecursive();
					        this.mainProdOfferWidget = null;
				        }
				        if (this.mainProdOfferDetailWidget) {
					        this.mainProdOfferDetailWidget.destroyRecursive();
					        this.mainProdOfferDetailWidget = null;
				        }
				        this.mainProdOfferId = null;
			        }
			        
			        var subProdOfferPane = unieap.byId("subProdOfferPane");
			        subProdOfferPane.destroyDescendants();
			        this.subProdOfferOrderGrid = null
			        this.subProdOfferTree = null;
			        // 4： 清理促销政策widget
			        
			        // 5: 清理支付关系
			        
		        },
		        /**
				 * 删除在全局中注册的资源
				 * 
				 * @method
				 */
		        removeResourcesBinding : function() {
			        $ac$.empty(this.globalLifeCycleProperties);
			        $wmc$.empty();
			        if (!!dojo.getObject("ordermgr.accept.compnew")) {
				        var compnew = dojo.getObject("ordermgr.accept.compnew");
				        !!compnew._cdma_number_elem_list_ ? compnew._cdma_number_elem_list_ = [] : null;
				        !!compnew._pstn_number_elem_list_ ? compnew._pstn_number_elem_list_ = [] : null;
				        !!compnew._xdsl_number_elem_list_ ? compnew._xdsl_number_elem_list_ = [] : null;
				        !!compnew._other_number_elem_list_ ? compnew._other_number_elem_list_ = [] : null;
				        !!compnew._coupon_no_list_ ? compnew._coupon_no_list_ = [] : null;
			        }
			        
		        },
		        
		        /**
				 * 获取收藏类销售品及热点销售品
				 * 
				 * @method
				 */
		        renderProdOfferFavorite : function() {
			        var loader = this;
			        loader.standardCount = 6;
			        loader.hotProdOffer();// 获取热点销售品
			        loader.renderPeddleProdOffer();// 获取企业热推销售品
			        loader.personalProdOffer();// 获取个人收藏
		        },
		        /**
				 * 获取企业热推销售品
				 * 
				 * @method
				 */
		        renderPeddleProdOffer : function() {
			        var loader = this;
			        var param = "method=getPeddleProdList&belongCode=" + loader.getBelongCode() + "&custType="
			                + loader.requestParam.customerData.custType + loader.appendOfferFilterParameters();
			        util.ServiceFactory.getService("url:prodOfferQueryAction.do?" + param,
			                function(peddleProdOfferList) {
				                if (peddleProdOfferList && (peddleProdOfferList.length > loader.standardCount)) {
					                var prodOfferArray = Array.prototype.slice.apply(peddleProdOfferList);
					                peddleProdOfferList = prodOfferArray.slice(0, loader.standardCount);
					                var morePeddleProdOfferList = prodOfferArray.slice(loader.standardCount);
					                dojo.global.$appContext$.set("_morePeddleProdOfferList", morePeddleProdOfferList);
				                }
				                dojo.global.$appContext$.set("_peddleProdOfferList", peddleProdOfferList);
				                if (loader.peddleProdOfferListWidgetInstance) {
					                loader.peddleProdOfferListWidgetInstance.destroyRecursive();
				                }
				                loader.peddleProdOfferListWidgetInstance = new loader.peddleProdOfferListWidgetClass();
				                dojo.place(loader.peddleProdOfferListWidgetInstance.domNode, unieap
				                                .byId("peddleProdOfferResult").containerNode, "last");
				                if (dojo.global.$appContext$.get("_morePeddleProdOfferList")) {
					                dojo.byId("peddleProdOfferMoreHref").style.display = "block";
				                }
				                
			                });
			        
		        },
		        /**
				 * 获取热点销售品
				 * 
				 * @method
				 */
		        hotProdOffer : function() {
			        var loader = this;
			        var param = "method=getHotProdList&belongCode=" + this.getBelongCode() + "&cityCode="
			                + loader.requestParam.customerData.cityCode + this.appendOfferFilterParameters();
			        util.ServiceFactory.getService("url:prodOfferQueryAction.do?" + param, function(hotProdOfferList) {
				                if (hotProdOfferList && (hotProdOfferList.length > loader.standardCount)) {
					                var prodOfferArray = Array.prototype.slice.apply(hotProdOfferList);
					                hotProdOfferList = prodOfferArray.slice(0, loader.standardCount);
					                var moreHotProdOfferList = prodOfferArray.slice(loader.standardCount);
					                dojo.global.$appContext$.set("_moreHotProdOfferList", moreHotProdOfferList);
				                }
				                dojo.global.$appContext$.set("_hotProdOfferList", hotProdOfferList);
				                if (loader.hotProdOfferListWidgetInstance) {
					                loader.hotProdOfferListWidgetInstance.destroyRecursive();
				                }
				                loader.hotProdOfferListWidgetInstance = new loader.hotProdOfferListWidgetClass();
				                dojo.place(loader.hotProdOfferListWidgetInstance.domNode, unieap
				                                .byId("hotProdOfferResult").containerNode, "last");
				                if (dojo.global.$appContext$.get("_moreHotProdOfferList")) {
					                dojo.byId("hotProdMoreHref").style.display = "block";
				                }
				                
			                });
			        
		        },
		        /**
				 * 获取个人收藏销售品
				 * 
				 * @method
				 */
		        personalProdOffer : function(prodOfferType, mainProdOfferId) {
			        var loader = this;
			        loader.standardCount = ConstantsPool.load("OfferDisPlayCountConst").OfferDisPlayCountConst.MAINPRODOFFERCOUNT;
			        var param = "method=getPersonalCollectProdOffer&prodOfferType=1";
			        param += "&mainProdOfferId=0" + loader.appendOfferFilterParameters();
			        util.ServiceFactory.getService("url:prodOfferSaleAjaxAction.do?" + param, function(
			                        personalProdOfferList) {
				                if (personalProdOfferList && (personalProdOfferList.length > loader.standardCount)) {
					                var prodOfferArray = Array.prototype.slice.apply(personalProdOfferList);
					                personalProdOfferList = prodOfferArray.slice(0, loader.standardCount);
					                var morePersonalProdOfferList = prodOfferArray.slice(loader.standardCount);
					                dojo.global.$appContext$.set("_morePersonalProdOfferList",
					                        morePersonalProdOfferList);
				                }
				                
				                dojo.global.$appContext$.set("_personalProdOfferList", personalProdOfferList);
				                if (loader.personalCollectListWidgetInstance) {
					                loader.personalCollectListWidgetInstance.destroyRecursive();
				                }
				                loader.personalCollectListWidgetInstance = new loader.personalCollectListWidgetClass();
				                dojo.place(loader.personalCollectListWidgetInstance.domNode, unieap
				                                .byId("personalCollectResult").containerNode, "last");
				                if (dojo.global.$appContext$.get("_morePersonalProdOfferList")) {
					                dojo.byId("pcProdMoreHref").style.display = "block";
				                }
				                
			                });
			        
		        },
		        /**
				 * 获取个人收藏可选包
				 * 
				 * @method
				 */
		        personalSubProdOffer : function(prodOfferType, mainProdOfferId, uniqueId) {
			        var loader = this;
			        loader.standardSubCount = ConstantsPool.load("OfferDisPlayCountConst").OfferDisPlayCountConst.SUBPRODOFFERCOUNT;
			        // alert(standardSubCount);
			        // 获取当前主销售品或者成员销售品可以订购的可选包集合
			        var _allowProdOfferIds_ = [];
			        if (!!$ac$.get("_allowProdOfferIds_" + mainProdOfferId)) {
				        _allowProdOfferIds_ = $ac$.get("_allowProdOfferIds_" + mainProdOfferId);
			        } else {
				        var param = "prodOfferId=" + mainProdOfferId + "&accProdListStr="+(loader.getAccProdIdList(uniqueId)||"")
				        + "&method=getSubProdOfferInfoByName";
				        _allowProdOfferIds_ = util.ServiceFactory.getService("url:shoppingCartAction.do?" + param);
				        $ac$.set("_allowProdOfferIds_" + mainProdOfferId, _allowProdOfferIds_);
			        }
			        
			        if (!!$ac$.get("_allSubProdOffers_")) {
				        var personalSubProdOfferList = [];
				        var index = 0;
				        var _flag_ = false;
				        BusCard.each($ac$.get("_allSubProdOffers_") || [], function(personalSubProdOfferInfo) {
					                if (dojo.some(_allowProdOfferIds_ || [], function(info) {
						                        return info.prodOfferId == personalSubProdOfferInfo.prodOfferId;
					                        })) {
						                index++;
						                if (index > loader.standardSubCount) {
							                _flag_ = true;
							                return false;
						                }
						                personalSubProdOfferList.push(personalSubProdOfferInfo);
					                }
				                });
				        // 将不能订购的可选包销售品都过滤掉
				        // var personalSubProdOfferList =
						// dojo.filter($ac$.get("_allSubProdOffers_")||[],function(personalSubProdOfferInfo){
				        // return
						// dojo.some(_allowProdOfferIds_||[],function(info){
				        // return info.prodOfferId ==
						// personalSubProdOfferInfo.prodOfferId;
				        // });
				        // });
				        // if (personalSubProdOfferList
				        // && (personalSubProdOfferList.length >
						// loader.standardCount)) {
				        // var subProdOfferArray =
						// Array.prototype.slice.apply(personalSubProdOfferList);
				        // personalSubProdOfferList =
						// subProdOfferArray.slice(0,
						// loader.standardCount);
				        // var morePersonalSubProdOfferList =
						// subProdOfferArray.slice(loader.standardCount);
				        // dojo.global.$appContext$.set("_morePersonalSubProdOfferList"+uniqueId,
				        // morePersonalSubProdOfferList);
				        // }
				        
				        dojo.global.$appContext$.set("_personalSubProdOfferList" + uniqueId, personalSubProdOfferList);
				        
				        if (loader.personalSubCollectListWidgetInstanceMap[uniqueId]) {
					        loader.personalSubCollectListWidgetInstanceMap[uniqueId].destroyRecursive();
				        }
				        var personalSubCollectListWidgetInstance = new loader.personalSubCollectListWidgetClass({
					                uniqueId : uniqueId
				                });
				        loader.personalSubCollectListWidgetInstanceMap[uniqueId] = personalSubCollectListWidgetInstance;
				        dojo.place(personalSubCollectListWidgetInstance.domNode, unieap
				                        .byId("subProdOfferPersonalCollectResult" + uniqueId).containerNode, "last");
				        // if
						// (dojo.global.$appContext$.get("_morePersonalSubProdOfferList"+uniqueId))
						// {
				        // dojo.byId("pcSubProdMoreHref"+uniqueId).style.display
						// = "block";
				        // }
				        if (_flag_) {
					        dojo.byId("pcSubProdMoreHref" + uniqueId).style.display = "block";
				        }
			        }
			        
		        },
		        
		        /**
				 * 从缓存中读取获取到的数据，进行展示
				 */
		        dodealPersonalSubProdOffer : function() {

		        },
		        
		        /**
				 * 展示更多销售品
				 * 
				 * @method
				 */
		        showMoreProdOffer : function(element) {
			        dojo.byId(element.name).style.display = (dojo.byId(element.name).style.display == "block")
			                ? "none"
			                : "block";
			        dojo.byId(element).innerHTML = (dojo.byId(element).text == "更多>>") ? "隐藏<<" : "更多>>";
		        },
		        /**
				 * 打开销售品受理的所有的面板
				 * 
				 * 
				 */
		        openProdOfferAcceptPane : function(paneIdList) {
			        // 默认改变主销售品后自动打开主销售品和可选包受理面板
			        var panes = paneIdList || ["mainProdOfferPane", "orderInfoPane"];
			        dojo.forEach(panes, function(paneId) {
				                var pane = unieap.byId(paneId);
				                if (pane && !pane.open) {
					                pane.toggle();
				                }
				                
			                });
			        
		        },
		        
		        /**
				 * 初始化区域
				 * 
				 * @method
				 */
		        renderBelongCode : function() {
		        	var loader = this;
			        BusCard.$rs(dojo.byId("common-belongcode"), this.requestParam.regionCodeColl.list);
			        var _flag_ = dojo.some(loader.requestParam.regionCodeColl.list||[],function(_data_){
			        	return _data_.id == BusCard.$session.areaId;
			        });
			        if(_flag_){
			        	 dojo.byId("common-belongcode").value = BusCard.$session.areaId;
			        }
			       
		        },
		        /**
				 * 初始化服务卡片
				 * 
				 * @param {String} uniqueId
				 * @param {Function} cb
				 * @method
				 */
		        addServiceCardWidget : function(uniqueId, cb, cardcb, delayRendering, cardInitData) {
			        var controller = this,
				        prodBasicTr = dojo.query("[uniqueId=" + uniqueId + "]", this.mainProdOfferWidget.domNode)[0],
				        serviceTr = prodBasicTr,
				        _widgetInstance = this,
				        cb = cb || function() {},
				        uniqueId = dojo.attr(prodBasicTr, "uniqueId"),
				        viewId = dojo.attr(prodBasicTr, "viewId"),
				        productNewServiceOfferId = controller
				                .getServiceOfferConfigVO(util.ACTION_CD_CONST.PRODUCT_INSTALL).serviceOfferId;
			        while (true) {
				        serviceTr = serviceTr.nextSibling;
				        if (serviceTr && (serviceTr.tagName || "").toUpperCase() == 'TR') {
					        break;
				        }
			        }
			        var productId = dojo.attr(prodBasicTr, "productId") || dojo.query("SELECT", prodBasicTr)[0].value,
				        belongCode = this.getBelongCode();
			        var cardParam = {
				        productId : productId,
				        uniqueId : uniqueId,
				        serviceOfferId : productNewServiceOfferId,
				        cityCode : this.requestParam.customerData.cityCode,
				        belongCode : belongCode,
				        regionId : belongCode,
				        userId : 0, // 变更传入userId取加入的成员信息
				        regionKind : 4
				        // 初始化时设置为4
				        // 查母局
			        };
			        var extendData = cb(prodBasicTr, cardParam);
			        // 延迟生成卡片 只返回服务信息卡片请求参数
			        if (delayRendering) { return cardParam; }
			        var widgetId = "serviceCardWidget_" + uniqueId,
				        _serviceCardWidget = new this.serviceCardWidgetClass({
					                cardParam : cardParam,
					                metaData : {
						                uniqueId : uniqueId,
						                id : widgetId
					                },
					                extendData : extendData || {}
				                });
			        this.serviceCardWidgetMap[widgetId] = _serviceCardWidget;
			        _serviceCardWidget.addCardCallback(function() {
				                var attrCardWidget = _widgetInstance.addProdAttrCardWidget(_serviceCardWidget);
				                if (attrCardWidget) {
					                this.attrCardWidget = attrCardWidget;
				                }
			                });
			        _serviceCardWidget.addCardCallback(function() {
				                var selectedMemberProdOffer = controller
				                        ._findProperMemProdOfferByUniqueId(cardParam.uniqueId);
				                if (!selectedMemberProdOffer || selectedMemberProdOffer.action != "quit") {
					                var serviceProductWidget = _widgetInstance
					                        .addServiceProdCardWidget(_serviceCardWidget);
					                if (serviceProductWidget) {
						                this.serviceProductWidget = serviceProductWidget;
					                }
				                }
			                });
			        if (cardcb) {
				        _serviceCardWidget.addCardCallback(cardcb);
			        }
			        _serviceCardWidget.addCardCallback(function() {
				                this.completeRequiredState();
			                });
			        _serviceCardWidget.renderCard(dojo.query(".mainProdServiceInfo-" + viewId, serviceTr)[0], "first",
			                cardInitData);
			        // 考虑到产品属性以及可选包的加载快慢，增加此特殊处理
			        var subscriber = new BusCard.messaging.Subscriber();
			        subscriber.subscribe("/message/raiseSpeed" + uniqueId);
			        subscriber.subscribe("/message/raiseSpeedHandleByCancelOld" + uniqueId);
			        subscriber.subscribe("/message/decreaseSpeedHandleByCancelOld" + uniqueId);
			        subscriber.receive = function(message) {
				        var _tempMap = dojo.getObject("_temp.getObjectMap" + uniqueId, true);
				        if (!!_tempMap.rateRelSubProdOfferArray) {
					        _tempMap.rateRelSubProdOfferArray.push(message);
				        } else {
					        var rateRelSubProdOfferArray = [];
					        rateRelSubProdOfferArray.push(message);
					        _tempMap.rateRelSubProdOfferArray = rateRelSubProdOfferArray;
				        }
			        };
		        },
		        
		        _findProperProdOfferByUniqueId : function(uniqueId) {
			        return $ac$.get("selectedMainProdOfferInfoVO");
		        },
		        _findProperMemProdOfferByUniqueId : function(uniqueId) {
			        var memberProdOffer = $ac$.get("selectedMemberProdOfferList");
			        return dojo.filter(memberProdOffer, function(prodOffer) {
				                return prodOffer.uniqueId == uniqueId;
			                })[0];
			        
		        },
		        _findProperProduct4AttrCardWidget : function(prodOfferInfoVO, productId, uniqueId) {
			        return util.ProdOfferHelper.getProductById(prodOfferInfoVO, productId);
		        },
		        /**
				 * 初始化产品属性
				 * 
				 * @method
				 */
		        addProdAttrCardWidget : function(serviceCardWidget, cb) {
			        var prodOfferInfoVO = this._findProperProdOfferByUniqueId(serviceCardWidget.metaData.uniqueId);
			        var productId = serviceCardWidget.getModel().cardParam.productId;
			        var serviceOfferId = serviceCardWidget.getModel().cardParam.serviceOfferId;
			        var productInfoVO = this._findProperProduct4AttrCardWidget(prodOfferInfoVO, productId,
			                serviceCardWidget.metaData.uniqueId);
			        var attrCardWidget = new this.productAttrCardWidgetClass(dojo.mixin({
				                uniqueId : serviceCardWidget.metaData.uniqueId,
				                productId : productId,
				                serviceOfferId : serviceOfferId,
				                productInfoVO : productInfoVO,
				                prodOfferInfoVO : prodOfferInfoVO
			                }, serviceCardWidget.getModel().extendData.attrCardBindingData || {}));
			        if (attrCardWidget.needRendering) {
				        if (cb) {
					        attrCardWidget.addCardCallback(cb);
				        }
				        attrCardWidget.busCardInstance.setParent(serviceCardWidget.busCardInstance);
				        attrCardWidget.renderCard(serviceCardWidget.busCardInstance.dom.parentNode, "last");
				        
				        return attrCardWidget;
			        }
			        
		        },
		        
		        /**
				 * 初始化套餐下的功能类产品
				 * 
				 * @method
				 */
		        addServiceProdCardWidget : function(serviceCardWidget) {
			        var prodOfferInfoVO = this._findProperMemProdOfferByUniqueId(serviceCardWidget.metaData.uniqueId);
			        var productId = serviceCardWidget.getModel().cardParam.productId;
			        var vParameter = "&prodOfferId=" + prodOfferInfoVO.prodOfferId + "&productId=" + productId;
			        var list = util.ServiceFactory.getService("url:orderDetailAction.do?method=doGetServiceProdList"
			                + vParameter);
			        if (!!list && list.length > 0) {
				        var serviceProductWidget = new this.serviceProductWidgetClass({
					                prodOfferInfoVO : prodOfferInfoVO,
					                productId : productId,
					                serviceProdList : list,
					                serviceCardWidget : serviceCardWidget,
					                prodOfferInst : !!prodOfferInfoVO.offerInstVO ? prodOfferInfoVO.offerInstVO : null
				                });
				        serviceCardWidget.serviceProductWidget = serviceProductWidget;
				        dojo.place(serviceProductWidget.domNode, serviceCardWidget.busCardInstance.dom.parentNode,
				                "last");
				        $ac$.set("serviceProdList-" + serviceCardWidget.metaData.uniqueId, list);
			        }
		        },
		        removeServiceCardWidget : function(uniqueId) {
			        var _serviceCardWidget = this.serviceCardWidgetMap["serviceCardWidget_" + uniqueId];
			        if (_serviceCardWidget) {
				        _serviceCardWidget.destroyRecursive();
				        try {
					        delete this.serviceCardWidgetMap["serviceCardWidget_" + uniqueId];
				        }
				        catch (e) {

				        }
				        
			        }
			        
		        },
		        removeAllServiceCardWidgets : function() {
			        
			        for (var index in this.serviceCardWidgetMap) {
				        if (this.serviceCardWidgetMap[index].declaredClass) {
					        this.serviceCardWidgetMap[index].destroyRecursive();
					        try {
						        delete this.serviceCardWidgetMap[index];
					        }
					        catch (e) {

					        }
				        }
			        }
			        
		        },
		        /**
				 * 合并接入类产品服务信息卡片请求
				 * 
				 * @method
				 */
		        generatorComboRequest : function(cb) {
			        var trs = dojo.query(".main-product-basic", this.mainProdOfferWidget.domNode),
				        controller = this,
				        requestMap = {},
				        jsonpRequestList = dojo.map(trs, function(node) {
					                var uniqueId = dojo.attr(node, "uniqueId");
					                var callback = "buscardCallback_" + uniqueId;
					                dojo.global[callback] = function(data) {
						                return controller.addServiceCardWidget(uniqueId, null, null, false, data);
						                
					                };
					                var param = controller.addServiceCardWidget(uniqueId, null, null, true);
					                var jsonData = BusCard.toJson(param);
					                var requestParam = {};
					                requestParam.jsonpCallback = callback;
					                requestParam.method = 'showBusCardPage';
					                requestParam.jsonData = jsonData;
					                return BusCard.path.initPath + "?" + BusCard.buildParam(requestParam);
					                
				                });
			        if (controller.jsonpRequest) {
				        // IE串行请求,减少XMLHTTPRequest并发
				        if (dojo.isIE) {
					        BusCard.ScriptLoader.load(jsonpRequestList, function() {
						                cb = cb || BusCard.util.emptyFunction;
						                cb();
					                }, true);
				        } else {
					        BusCard.ScriptLoader.asynLoad(jsonpRequestList, function() {
						                cb = cb || BusCard.util.emptyFunction;
						                cb();
					                }, true);
					        
				        }
				        
			        } else {
				        dojo.map(trs, function(node) {
					                var uniqueId = dojo.attr(node, "uniqueId");
					                return requestMap["" + uniqueId] = controller.addServiceCardWidget(uniqueId, null,
					                        null, true);
					                
				                });
				        BusCard.doPost(BusCard.path.initPath + "?method=comboRequest", requestMap, true,
				                function(data) {
					                for (var index in data) {
						                var loop = 0;
						                var _callback = function(_uniqueId) {
							                return function() {
								                controller.addServiceCardWidget(_uniqueId, null, null, false,
								                        data[_uniqueId]);
							                }
							                
						                }(index);
						                if (dojo.isIE) {
							                setTimeout(_callback, 1000 * (loop++));
						                } else {
							                _callback();
						                }
						                
					                }
					                cb = cb || BusCard.util.emptyFunction;
					                cb();
					                
				                });
				        
			        }
			        
		        },
		        addAllServiceCardWidgets : function(cb) {
			        if (this.comboServiceCardRequest) { return this.generatorComboRequest(cb); }
			        var trs = dojo.query(".main-product-basic", this.mainProdOfferWidget.domNode),
				        controller = this;
			        dojo.forEach(trs, function(node) {
				                controller.addServiceCardWidget(dojo.attr(node, "uniqueId"));
			                });
			        cb = cb || BusCard.util.emptyFunction;
			        cb();
			        
		        },
		        /**
				 * 选择所有新用户,为了生成支付关系
				 * 
				 * @method
				 */
		        getNewServiceInfoList : function(ignoreCheck) {
			        var controller = this,
				        resultList = [],
				        controller = this,
				        productNewServiceOfferId = controller
				                .getServiceOfferConfigVO(util.ACTION_CD_CONST.PRODUCT_INSTALL).serviceOfferId,
				        productChgServiceOfferId = controller
				                .getServiceOfferConfigVO(util.ACTION_CD_CONST.PRODUCT_CHANGE).serviceOfferId;
			        for (var key in this.serviceCardWidgetMap) {
				        var serviceCardWidget = this.serviceCardWidgetMap[key],
					        card = serviceCardWidget.busCardInstance,
					        serviceNode = card.$("serviceId"),
					        cardParam = card.getCardRelationInfo();
				        if (!serviceNode) {
					        continue;
				        }
				        if (cardParam.serviceOfferId == productChgServiceOfferId) {
					        // continue;
				        }
				        if (function() {
					        return !dojo.query("[uniqueId=" + /_(.*?)$/.exec(key)[1] + "] .main-product-check",
					                controller.mainProdOfferWidget.domNode)[0].checked;
					        
				        }()) {
					        continue;
				        }
				        
				        if (!ignoreCheck && serviceNode) {
					        var checkFlag = card.checkNotNull(serviceNode.parentNode);
					        // 暂时写死新装的服务提供 ,以后改造
					        if (checkFlag === false) { return false; }
				        }
				        // if (cardParam.serviceOfferId ==
				        // productNewServiceOfferId) {
				        var productInfoVO = util.ProdOfferHelper.getProductById(dojo.global.$appContext$
				                        .get("prodOfferList"), cardParam.productId);
				        if (!productInfoVO) {
					        var uniqueId = cardParam.uniqueId;
					        if (uniqueId) {
						        var _memeberProdOfferList = $ac$.get("prodOfferList" + uniqueId) || [];
						        productInfoVO = util.ProdOfferHelper.getProductById(_memeberProdOfferList,
						                cardParam.productId);
					        }
					        if (!productInfoVO) {
						        productInfoVO = util.ServiceFactory
						                .getService("url:orderDetailAction.do?method=getProductDetail&productId="
						                        + cardParam.productId);
					        }
				        }
				        resultList.push(dojo.mixin(card.getData(null, null, true), {
					                productName : productInfoVO.productName,
					                productId : cardParam.productId,
					                serviceId : serviceNode.value,
					                // add by liuzhongwei start
					                // 20120421
					                netType : productInfoVO.netType
					                
				                }));
				        
				        // }
				        
			        }
			        return resultList;
			        
		        },
		        /**
		         * FIXME
		         * 推迟支付关系初始化到beginOrder方法后
		         */
		        renderPayRelationHandle:function(){
		        	var controller = this;
		        	controller.beginOrder&&(function(){
		        		var _beginOrderMethodRef = controller.beginOrder;
		        		controller.beginOrder = function(){
							try{
								!this.payRelationWidgetInstance&&this.renderPayRelationHandle();		
							}catch(e){
							   messageBox.alert({message:'\u521d\u59cb\u5316\u652f\u4ed8\u5173\u7cfb\u5931\u8d25'});
							}
							return _beginOrderMethodRef.apply(this,arguments);
		        		};
		        	}());
		        },
		        renderPayRelation : function() {
			        var payRelationPane = unieap.byId("payRelationPane"),
				        loader = this;
			        this.payRelationWidgetInstance = new this.payRelationWidgetClass({
				                custInfo : dojo.global.$appContext$.get("requestParam").customerData,
				                serviceInfoList : [],
				                loader : loader,
				                widgetPane : payRelationPane
			                });
			        dojo.place(this.payRelationWidgetInstance.domNode, payRelationPane.containerNode, "first");
			        this.enableRefreshableForPayRelation();
			        payRelationPane.onExpand = function() {
				        loader.refreshPayRelationOnExpandPane();
			        };
			        
		        },
		        /**
				 * 支持支付关系可刷新
				 * 
				 * @method
				 */
		        enableRefreshableForPayRelation : function() {
			        var titleButton = unieap.byId("payRelationPane").buttonContainerNode,
				        refresh_icon = BusCard.path.contextPath + "/common/images/icon/refresh_icon.png",
				        controller = this;
			        titleButton.style.display = "";
			        titleButton.innerHTML = "<a style='vertical-align:top;color:#00577F' id='refresh-payRelation-href'>"
			                + "<span>\u5237\u65b0</span><img src='"
			                + refresh_icon
			                + "' style='width:16px;height:16px'/></a>"
			        titleButton.style.width = "50px";
			        titleButton.style.paddingTop = '5px';
			        dojo.connect(dojo.query("[id=refresh-payRelation-href]", titleButton)[0], "onclick", function(e) {
				                e.preventDefault();
				                return controller.refreshPayRelation(false);
				                
			                });
			        
		        },
		        refreshPayRelation : function(ignoreCheck) {
			        var controller = this,
				        serviceInfoList = controller.getNewServiceInfoList(ignoreCheck);
			        if (serviceInfoList === false || !serviceInfoList || serviceInfoList.length == 0) {
				        return false;
			        } else {
				        controller.payRelationWidgetInstance.refreshServiceInfo(serviceInfoList,
				                controller.getNewServiceInfoList);
			        }
			        
		        },
		        
		        refreshPayRelationOnExpandPane : function() {
			        var needInit = this.payRelationWidgetInstance.isNeedInit();
			        if (needInit) {
				        this.refreshPayRelation(true);
			        }
			        
		        },
		        /**
				 * 订单信息回调处理
				 * 
				 * @override
				 * @param {controller} 当前受理环境的总体控制器
				 * @method
				 */
		        _orderInfoCallback : function(controller) {
			        var custOrderId = controller.getCustOrderId();
			        if (!(custOrderId == "" || custOrderId == null)) {
				        this.busCardInstance.renderDefaultValue(BusCard.$remote("custOrderBasicInfoDAO").queryNormalTB(
				                {
					                custOrderId : custOrderId
				                })[0]);
			        }
			        
		        },
		        /**
				 * 经办人信息回调处理
				 * 
				 * @method
				 */
		        _viaInfoCallback : function(controller) {
			        var custOrderId = controller.getCustOrderId();
			        if (!(custOrderId == "" || custOrderId == null)) {
				        this.busCardInstance.renderDefaultValue(BusCard.$remote("custOrderBasicInfoDAO").queryNormalTB(
				                {
					                custOrderId : custOrderId
				                })[0]);
			        }
		        },
		        /*
				 * 初始化订单信息
				 */
		        initOrderInfoWidget : function() {
			        this.orderInfoCardWidget = new CommCardWidget({
				                cardParam : {
					                productId : "-999",
					                serviceOfferId : '-999'
				                },
				                metaData : {
					                id : 'orderInfoCardWidget'
				                }
			                });
			        var controller = this;
			        this.orderInfoCardWidget.addCardCallback(function() {
				                this.busCardInstance.hiddenTitle();
				                // 非新装隐藏批量的展示
				                if ($ac$.requestParam.actionCD != util.ACTION_CD_CONST.PRODUCT_INSTALL) {
					                this.busCardInstance.$('batchFlag').style.display = 'none';
					                this.busCardInstance.$('label_batchFlag').style.display = 'none';
				                }
				                dojo.query(".buscard-root", this.busCardInstance.dom)[0].style.border = 'none';
				                return controller._orderInfoCallback.apply(this, [controller]);
			                });
			        this.orderInfoCardWidget.renderCard(unieap.byId("orderInfoPane").containerNode, "first");
		        },
		        initViaInfoWidget : function() {
			        this.viaInfoCardWidget = new CommCardWidget({
				                cardParam : {
					                productId : "-111",
					                serviceOfferId : '-100'
				                },
				                metaData : {
					                id : 'viaInfoCardWidget'
				                }
			                });
			        var controller = this;
			        
			        this.viaInfoCardWidget.addCardCallback(function() {
				                this.busCardInstance.hiddenTitle();
				                dojo.query(".buscard-root", this.busCardInstance.dom)[0].style.border = 'none';
				                return controller._viaInfoCallback.apply(this, [controller]);
			                });
			        
			        this.viaInfoCardWidget.renderCard(unieap.byId("viaInfoPane").containerNode, "first");
		        },
		        
		        // initManageAccWidget : function() {
		        // this.manageInfoCardWidget = new CommCardWidget({
		        // cardParam : {
		        // productId : "-10000",
		        // serviceOfferId : '-10000'
		        // },
		        // metaData : {
		        // id : 'acctNbrInfoCardWidget'
		        // }
		        // });
		        // this.manageInfoCardWidget.renderCard(unieap.byId("manageNbrInfoPane").containerNode,
		        // "first");
		        // },
		        initDataBuilder : function() {
			        this.dataBuilder = new orderaccept.prodofferaccept.data.ProdOfferNewDataBuilder(this);
		        },
		        initSpecialDataBuilder : function() {
			        this.specDataBuilder = new orderaccept.prodofferaccept.data.SpecialDataHandler(this);
		        },
		        
		        initFunctionNavigatorWidget : function() {
			        this.functionNavigatorWidget = new this.functionNavigatorWidgetClass();
			        dojo.place(this.functionNavigatorWidget.domNode, dojo.byId('function-navigator-root'), "last");
			        
		        },
		        initTipsWidgets : function() {
			        this.prodOfferInfoWidget = new this.prodOfferInfoTipsWidgetClass({
				                id : 'prodOfferInfoTips',
				                noCloseBtn : true
			                });
			        this.warmTipesWidget = new this.warmTipesWidgetClass({
				                id : 'warmTips',
				                noCloseBtn : true
			                });
			        this.collectTipsWidget = new this.collectTipsWidgetClass({
				                id : 'collectTips',
				                noCloseBtn : true
			                });
			        this.prodOfferAcceptTipsWidget = new this.prodOfferAcceptTipsWidgetClass({
				                id : 'acceptTips'
			                })
		        },
		        initAdvanceSearchWidget : function() {
			        this.renderAdvancedSearch();
			        this.advanceSearchWidget = new this.advanceSearchWidgetClass({
				                id : 'advanceSearchTip',
				                noCloseBtn : false
			                });
		        },
		        /**
				 * 渲染整高级搜索
				 * 
				 * @method
				 */
		        renderAdvancedSearch : function() {
			        
			        var titleText = unieap.byId("BorderPane").titleText;
			        var advancedSearch = "<a href='javascript:void(0);' id='prodOfferAdvancedSearch' style='float:right;font-weight:normal' \
												dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/prodOfferOpenAdvanceSearch'>高级查询</a>\
										 <img id='prodOfferAdvancedSearchImg' name='prodOfferAdvancedSearchImg'\
	                						dojoAttachEvent = 'onclick:elementclick'\
	                						dojoAttachTopic = '/prodOfferOpenAdvanceSearch'\
											src='"
			                + BusCard.path.contextPath
			                + "/common/images/icon/search_button.png'\
											style='float:right;cursor: pointer; width: 15px; height: 15px;' />\ ";
			        dojo.place(advancedSearch, titleText, "last");
			        var prodOfferAdvancedSearch = dojo.byId("prodOfferAdvancedSearch");
			        var prodOfferAdvancedSearchImg = dojo.byId("prodOfferAdvancedSearchImg");
			        dojo.connect(prodOfferAdvancedSearch, "onclick", function() {
				                return dojo.publish("/prodOfferOpenAdvanceSearch/click", arguments);
			                });
			        dojo.connect(prodOfferAdvancedSearchImg, "onclick", function() {
				                return dojo.publish("/prodOfferOpenAdvanceSearch/click", arguments);
			                });
		        },
		        initBatchNewWidget : function() {
			        this.batchNewWidget = new this.batchNewWidgetClass();
		        },
		        
		        /**
				 * fix some problem when resize layout
				 * 
				 * @method
				 */
		        _doLayoutMend : function() {
			        var layout = this;
			        var mainProdOfferBorderPane = unieap.byId("BorderPane");
			        if (mainProdOfferBorderPane) {
				        mainProdOfferBorderPane.containerNode.style.height = 'auto';
				        dojo.connect(mainProdOfferBorderPane, "resize", function() {
					                this.containerNode.style.height = 'auto';
				                });
			        }
			        // 促销政策titlePane点击时自动刷新一次
			        var promotionAcceptPane = unieap.byId("promotionPane");
			        if (promotionAcceptPane) {
				        promotionAcceptPane.promotionFirstRefresh = false;
				        dojo.connect(promotionAcceptPane, "onExpand", function() {
					                if (!promotionAcceptPane.promotionFirstRefresh) {
						                layout.renderPromotion(layout.mainProdOfferId);
						                promotionAcceptPane.promotionFirstRefresh = true;
					                }
				                });
			        }
			        
		        },
		        addIconForQuickAccept : function() {
			        var hotProdOfferResultWidget = unieap.byId("hotProdOfferResult"),
				        peddleProdOfferResultWidget = unieap.byId("peddleProdOfferResult"),
				        personalCollectResult = unieap.byId("personalCollectResult"),
				        path = BusCard.path.contextPath,
				        imgMap = {
					        personalCollectResult : path + "/common/images/icon/favorites_icon.png",
					        hotProdOfferResult : path + "/common/images/icon/hot_icon.png",
					        peddleProdOfferResult : path + "/common/images/icon/recommend_icon.png"
					        
				        };
			        dojo.forEach(["hotProdOfferResult", "peddleProdOfferResult", "personalCollectResult"], function(
			                        widgetId) {
				                var widget = unieap.byId(widgetId + "_button");
				                if (widget) {
					                widget.titleNode.style.cursor = "pointer";
					                widget.iconNode.style.verticalAlign = "top";
					                widget.iconNode.src = imgMap[widgetId];
				                }
				                
			                });
			        
		        },
		        
		        initGlobalHelper : function() {
			        var controller = this;
			        (function() {
				        var _container_ = document.createElement("span");
				        _container_.style.styleFloat = _container_.style.cssFloat = "right";
				        _container_.innerHTML = "<input type='button' class='userAccountButton'  style='margin-left:10px;cursor:pointer;' id='accNbr-Link' value='客户管理账号'>"
				                + " <span style='cursor:pointer;color:#2B2B2B' id='manageNbrInfo' style='margin-left:3px;'>[未选择管理账号]"
				                + "</span>&nbsp;";
				        unieap.byId('orderInfoPane').titleNode.appendChild(_container_);
				        // 只有新装才绑定事件，才允许选择管理账号
				        if ($ac$.requestParam.actionCD == util.ACTION_CD_CONST.PRODUCT_INSTALL) {
					        var manageAccNbrInfo = util.ProdOfferHelper.getManageAccNbrInfo();
					        if (manageAccNbrInfo == null) {
						        // 管理账号选择
						        dojo.connect(dojo.byId("accNbr-Link"), "onclick", function(event) {
							                var manageAccNbrWidget = new controller.manageAccNbrWidgetClass();
							                orderaccept.custom.popup.open({
								                        widget : {
									                        popup : manageAccNbrWidget,
									                        around : event.srcElement
								                        }
							                        });
						                });
						        // 从临时表中取数据
						        var manageAccNbrTemp = util.ProdOfferHelper.getManageAccNbrTemp(controller
						                .getCustOrderId());
						        if (manageAccNbrTemp != null) {
							        var itemTp = BusCard.Template
							                .create("[<span name='accNbrResult' "
							                        + "targetUniqueId='#{uniqueId}' value='#{serviceId}' serviceId='#{serviceId}' prodInstId ='#{prodInstId}' serviceKind='#{serviceKind}' serviceKindIndex='#{serviceKindIndex}'>#{serviceId}</span>]");
							        dojo.byId('manageNbrInfo').innerHTML = itemTp.apply(manageAccNbrTemp);
						        }
					        } else {
						        var itemTp = BusCard.Template
						                .create("[<span name='accNbrResult' "
						                        + "value='#{serviceId}' ifCreateAcc=1 serviceId='#{serviceId}' userId ='#{userId}'>#{serviceId}</span>]");
						        dojo.byId('manageNbrInfo').innerHTML = itemTp.apply(manageAccNbrInfo);
					        }
				        } else {
					        dojo.query(".userAccountButton")[0].style.display = "none";
					        dojo.byId('manageNbrInfo').style.display = "none";
				        }
				        // 基础包温馨提示
				        var mainProdButton = unieap.byId("mainProdOfferPane").buttonContainerNode;
				        mainProdButton.style.display = "";
				        mainProdButton.style.width = "80px";
				        mainProdButton.style.paddingTop = '5px';
				        mainProdButton.style.paddingRight = '10px';
				        mainProdButton.innerHTML = "<span style='cursor:pointer;' id='mainprodoffer-title'>温馨提示"
				                + "<img src='" + BusCard.path.contextPath
				                + "/common/images/icon/information-balloon.png'/></span>";
				        dojo.connect(dojo.byId("mainprodoffer-title"), "onmouseover", function(event) {
					        var warmTipsWidget = unieap.byId("warmTips");
					        var renderHtml = "<div class='buscard-row' >\
												单击【放大镜图标】选择已有号码，单击【销售品详情】设置销售品信息\
											</div>";
					        dojo.query(".buscard-content", warmTipsWidget.containerNode)[0].innerHTML = renderHtml;
					        orderaccept.custom.popup.open({
						                widget : {
							                popup : warmTipsWidget,
							                around : event.currentTarget
						                }
					                });
				        });
				        dojo.connect(dojo.byId("mainprodoffer-title"), "onmouseout", function(event) {
					                var warmTipsWidget = unieap.byId("warmTips");
					                orderaccept.custom.popup.close({
						                        widget : warmTipsWidget
					                        });
				                });
				        
				        // 可选包温馨提示
				        var subProdButton = unieap.byId("subProdOfferPane").buttonContainerNode;
				        subProdButton.style.display = "";
				        subProdButton.style.width = "135px";
				        subProdButton.style.paddingTop = '5px';
				        subProdButton.style.paddingRight = '10px';
				        subProdButton.innerHTML = "<span>"
				                + "<span style='cursor:pointer;' id='subprodoffer-detail'>操作详情|</span>"
				                + "<span style='cursor:pointer;' id='subprodoffer-title'>温馨提示" + "<img src='"
				                + BusCard.path.contextPath + "/common/images/icon/information-balloon.png'/>"
				                + "</span><span>";
				        dojo.connect(dojo.byId("subprodoffer-detail"), "onclick", function(event) {
					        var addSubProdOfferNameList = [];
					        var delSubProdOfferNameList = [];
					        var chgSubProdOfferNameList = [];
					        
					        var subProdOfferOrderProviderMap = controller.multipleSubProdOfferHandler.subProdOfferOrderProviderMap;
					        for (var p in subProdOfferOrderProviderMap) {
						        var subProdOfferOrderProvider = subProdOfferOrderProviderMap[p];
						        var subProdOfferList = subProdOfferOrderProvider.getSubGridBindingData();
						        var subProdOfferOrderGrid = subProdOfferOrderProvider.subProdOfferOrderGrid;
						        dojo.forEach(subProdOfferList, function(data) {
							                var rowIndex = data.rowIndex;
							                if ((data.showData.prodOfferStyle == "prod-offer-add")
							                        && dojo.query(".subProdOfferDetail-" + rowIndex,
							                                subProdOfferOrderGrid.domNode)[0].childNodes[0].checked) {
								                addSubProdOfferNameList.push({
									                        prodOfferName : data.subProdOfferInfo.prodOfferName,
									                        prodOfferStyle : data.showData.prodOfferStyle
								                        });
							                } else if (data.prodOfferInst != null
							                        && dojo.query(".subProdOfferDetail-" + rowIndex,
							                                subProdOfferOrderGrid.domNode)[0].childNodes[0].checked) {
								                chgSubProdOfferNameList.push({
									                        prodOfferName : data.subProdOfferInfo.prodOfferName,
									                        prodOfferStyle : data.showData.prodOfferStyle
								                        });
							                } else if (data.prodOfferInst != null
							                        && !(dojo.query(".subProdOfferDetail-" + rowIndex,
							                                subProdOfferOrderGrid.domNode)[0].childNodes[0].checked)) {
								                delSubProdOfferNameList.push({
									                        prodOfferName : data.subProdOfferInfo.prodOfferName,
									                        prodOfferStyle : data.showData.prodOfferStyle
								                        });
							                }
						                });
					        }
					        var acceptTipsWidget = unieap.byId("acceptTips");
					        var addName = "",
						        chgName = "",
						        delName = "";
					        dojo.forEach(addSubProdOfferNameList, function(data, idx) {
						                addName += "<span class='prod-offer-add' style='float:left'>【"
						                        + data.prodOfferName + "】</span>";
						                
					                });
					        dojo.forEach(chgSubProdOfferNameList, function(data, idx) {
						                if (data.prodOfferStyle == "prod-offer-change") {
							                chgName += "<div class='prod-offer-change' style='float:left'>【"
							                        + data.prodOfferName + "】</div>";
						                } else if (data.prodOfferStyle == "prod-offer-reserve") {
							                chgName += "<div class='prod-offer-reserve' style='float:left'>【"
							                        + data.prodOfferName + "】</div>";
						                }
					                });
					        dojo.forEach(delSubProdOfferNameList, function(data, idx) {
						                
						                if (data.prodOfferStyle == "prod-offer-del") {
							                delName += "<div class='prod-offer-del' style='float:left'>【"
							                        + data.prodOfferName + "】</div>";
						                } else if (data.prodOfferStyle == "prod-offer-reserve") {
							                delName += "<div class='prod-offer-reserve' style='float:left'>【"
							                        + data.prodOfferName + "】</div>";
						                }
					                });
					        dojo.query("[id='prod-offer-add-count']", acceptTipsWidget.containerNode)[0].innerHTML = addSubProdOfferNameList
					                .size();
					        dojo.query("[id='prod-offer-change-count']", acceptTipsWidget.containerNode)[0].innerHTML = chgSubProdOfferNameList
					                .size();
					        dojo.query("[id='prod-offer-del-count']", acceptTipsWidget.containerNode)[0].innerHTML = delSubProdOfferNameList
					                .size();
					        var addDetail = dojo.query("[id='prod-offer-add-detail']", acceptTipsWidget.containerNode)[0];
					        dojo.query("[id='prod-offer-add-detail']", acceptTipsWidget.containerNode)[0].innerHTML = addName;
					        dojo.query("[id='prod-offer-change-detail']", acceptTipsWidget.containerNode)[0].innerHTML = chgName;
					        dojo.query("[id='prod-offer-del-detail']", acceptTipsWidget.containerNode)[0].innerHTML = delName;
					        orderaccept.custom.popup.open({
						                widget : {
							                popup : acceptTipsWidget,
							                around : event.currentTarget
						                }
					                });
					        
				        });
				        dojo.connect(dojo.byId("subprodoffer-title"), "onmouseover", function(event) {
					        var warmTipsWidget = unieap.byId("warmTips");
					        var renderHtml = "<div class='buscard-row' >\
												<span class='prod-offer-change'>&nbsp;&nbsp;&nbsp;</span>\
												<span>已有:用户已有的可选包</span>\
											</div>\
											<div class='buscard-row'>\
												<span class='prod-offer-del' >&nbsp;&nbsp;&nbsp;</span>\
												<span>退订:用户要退订的可选包</span>\
											</div>\
											<div class='buscard-row'>\
												<span class='prod-offer-reserve' >&nbsp;&nbsp;&nbsp;</span>\
												<span>预约:预约的可选包</span>\
											</div>\
											<div class='buscard-row'>\
												<span class='prod-offer-invalid' >&nbsp;&nbsp;&nbsp;</span>\
												<span>无效:无效的可选包</span>\
											</div>\
											<div class='buscard-row' >\
												<span class='prod-offer-add' >&nbsp;&nbsp;&nbsp;</span>\
												<span>订购:用户要订购的可选包</span>\
											</div>";
					        dojo.query(".buscard-content", warmTipsWidget.containerNode)[0].innerHTML = renderHtml;
					        orderaccept.custom.popup.open({
						                widget : {
							                popup : warmTipsWidget,
							                around : event.currentTarget
						                }
					                });
				        });
				        dojo.connect(dojo.byId("subprodoffer-title"), "onmouseout", function(event) {
					                var warmTipsWidget = unieap.byId("warmTips");
					                orderaccept.custom.popup.close({
						                        widget : warmTipsWidget
					                        });
				                });
				        // 促销政策温馨提示
				        // var promotionButton =
				        // unieap.byId("promotionPane").buttonContainerNode;
				        // promotionButton.style.display = "";
				        // promotionButton.style.width = "80px";
				        // promotionButton.style.paddingTop = '5px';
				        // promotionButton.style.paddingRight =
				        // '10px';
				        // promotionButton.innerHTML = "<span
				        // style='cursor:pointer;'
				        // id='promotion-title'>"
				        // + "<img
				        // src='/crm1/common/dx20/images/cue_icon.gif'/>温馨提示</span>";
				        
			        }());
			        
			        dojo.connect(dojo.byId("display-all-href"), "onclick", function(event) {
				                event.preventDefault();
				                controller.expandAllPanes();
				                
			                });
			        dojo.connect(dojo.byId("hidden-all-href"), "onclick", function(event) {
				                event.preventDefault();
				                controller.hiddenAllPanes();
				                
			                });
			        (function() {
				        var prodOfferAcceptPane = unieap.byId("prodOfferAcceptPane");
				        prodOfferAcceptPane && dojo.style(prodOfferAcceptPane.titleNode, {
					                color : 'Orange',
					                fontSize : "13px"
				                });
				        
			        }());
			        
			        dojo.addOnUnload(function(event) {
				                // FIXME IE无缘无故会响应此事件,待核查,暂时不处理IE
				                if (!dojo.isIE) {
					                controller.destroy();
				                }
				                
			                });
			        
		        },
		        expandAllPanes : function() {
			        // 此处一定不能将payRelationPane自动展开
			        var panes = ["mainProdOfferPane", "subProdOfferPane", "promotionPane", "viaInfoPane",
			                "orderInfoPane"],
				        doToggle = function(open) {
					        dojo.forEach(panes, function(paneId) {
						                var widget = unieap.byId(paneId);
						                if (widget) {
							                if ((open && !widget.open) || (!open && widget.open)) {
								                widget.toggle();
							                }
						                }
						                
					                });
					        
				        };
			        
			        doToggle(true);
			        
		        },
		        hiddenAllPanes : function() {
			        var panes = ["mainProdOfferPane", "subProdOfferPane", "promotionPane", "payRelationPane",
			                "viaInfoPane", "orderInfoPane"],
				        doToggle = function(open) {
					        dojo.forEach(panes, function(paneId) {
						                var widget = unieap.byId(paneId);
						                if (widget) {
							                if ((open && !widget.open) || (!open && widget.open)) {
								                widget.toggle();
							                }
						                }
						                
					                });
					        
				        };
			        
			        doToggle(false);
			        
		        },
		        /**
				 * 获取页面配置和服务提供直接的关系
				 * 
				 * @method
				 */
		        getServiceOfferConfigVO : function(varValue) {
			        var cachedKey = "$serviceOfferConfig$";
			        var serviceOfferConfig = $ac$.get(cachedKey);
			        if (!serviceOfferConfig) {
				        serviceOfferConfig = BusCard.$remote("varServiceOfferConfigDAO").query({
					                productId : -1
				                });
				        $ac$.set(cachedKey, serviceOfferConfig);
			        }
			        var queryResult = $ac$.query("$." + cachedKey + "[?(@.varValue==" + varValue + ")]");
			        return queryResult ? queryResult[0] : null;
		        },
		        
		        showOrderList : function(custOrderId) {
			        dojo.byId("prodoffer-accept-root").style.display = "none"
			        dojo.byId("order-show-root").style.display = ""
			        if (this.orderShowLoader) {
				        this.orderShowLoader.destroy();
			        }
			        this.orderShowLoader = new OrderShowLoader({
				                custOrderId : custOrderId
			                });
			        this.functionNavigatorWidget.switchGroup(1);
			        this.setFunctionNavigatorWidgetButton();
		        },
		        showBatchNewAccept : function() {
			        var loader = this;
			        dojo.byId("prodoffer-accept-root").style.display = "none";
			        dojo.byId("order-show-root").style.display = "";
			        try {
				        if (this.orderShowLoader) {
					        
					        this.orderShowLoader._clearDirtyEnv();
					        var budgetContainer = dojo.byId("budgetContainer");
					        if (budgetContainer) {
						        if (budgetContainer.destroyRecursive) {
							        budgetContainer.destroyRecursive();
						        }
						        if (budgetContainer.destroy) {
							        budgetContainer.destroy();
						        }
					        }
				        }
			        }
			        catch (e) {

			        }
			        
			        if (!this.batchNewWidget) {
				        this.initBatchNewWidget();
				        dojo.place(loader.batchNewWidget.domNode, dojo.byId("order-show-root"), "first");
			        }
			        this.functionNavigatorWidget.switchGroup(2);
			        this.setFunctionNavigatorWidgetButton();
		        },
		        
		        setFunctionNavigatorWidgetButton : function() {
			        // 设置提交按钮是否可点击
			        if (!!dojo.global.$appContext$._budgetcomputeAmountFlag_
			                && dojo.global.$appContext$._budgetcomputeAmountFlag_) {
				        dojo.query(".commitOrderClass", this.functionNavigatorWidget.domNode)[0].disabled = false;
				        var cmtBtns = dojo.query(".commitOrderClass", this.functionNavigatorWidget.domNode);
				        if(!!cmtBtns && !!cmtBtns[3]){
				        	var batchCmtBtn = cmtBtns[3];
				        	batchCmtBtn.disabled = false;
				        }
			        }
		        },
		        /**
				 * 进行销毁工作,销毁所有和控制器关联的所有widget,只有当当前受理发生变化[如从订购流程跳转到变更流程]或者
				 * 开始下一次受理[如继续受理流程]时才有必要调用此方法
				 * 
				 * @method
				 */
		        destroy : function() {
			        for (var index in this) {
				        if (this[index] && (this[index].destroyRecursive || this[index].destroy)) {
					        (this[index].destroyRecursive || this[index].destroy).apply(this[index], arguments);
					        
				        }
				        
				        try {
					        if (this.hasOwnProperty(index)) {
						        delete this[index];
					        }
				        }
				        catch (e) {

				        }
				        
			        }
			        try {
				        delete dojo.global.prodOfferAcceptLoader;
			        }
			        catch (e) {

			        }
			        dijit.registry.every(function(widget, index) {
				                try {
					                widget.destroyRecursive();
					                dijit.registry.remove(index);
				                }
				                catch (e) {

				                }
				                
			                });
			        
			        dojo.global.$appContext$.empty();
			        dojo.global.$widgetModelContext$.empty();
		        },
		        findCustRecognitionHeadWin : function() {
			        try {
				        var list = window.opener.top.document.getElementById("subframe").contentWindow.unieap
				                .byId("createTab").getChildren();
				        
				        var menuNoDom = dojo.filter(list, function(node) {
					                return node.menuId == '841AB'
				                });
				        
				        if (menuNoDom.length == 0) { return null; }
				        var custRecContentWin = menuNoDom[0]._if.contentWindow.document.frames['CustRecognitionContent'];
				        return custRecContentWin;
			        }
			        catch (e) {
				        return null;
			        }
			        // var _f = function(_parent) {
			        // var frames =
					// _parent.document.getElementsByTagName("FRAME");
			        // var len = frames.length;
			        // for (var index = 0; index < len; index++) {
			        // if (frames[index].name ==
					// 'CustRecognitionContent') { return
					// frames[index]; }
			        // };
			        //				        
			        // };
			        // //新装的查询方式
			        // if ($ac$.requestParam.actionCD ==
					// util.ACTION_CD_CONST.PRODUCT_INSTALL) {
			        // if (window.opener) {
			        // var _parent = window.opener.parent;
			        // var pResult = _f(_parent);
			        // if (!pResult) {
			        // while (_parent && pResult != pResult.parent) {
			        // if (_parent.name == 'CustRecognitionContent') {
			        // return _parent;
			        // } else {
			        // _parent = _parent.parent;
			        // }
			        //							        
			        // }
			        // }
			        //					        
			        // return pResult && pResult.contentWindow;
			        //					        
			        // } else {
			        // var _top = window.parent;
			        // if (_top && _top != window) {
			        // var _wrapper =
					// _top.document.getElementById("custRecongitionFrame");
			        // var pResult = _f(_wrapper.contentWindow);
			        // return pResult && pResult.contentWindow;
			        // } else {
			        // return null;
			        // }
			        //					        
			        // }
			        // //非新装进行特殊查找
			        // }else{
			        // //稍后如果有更好的方式，则进行修改
			        // if(parent.window.opener){
			        // return
					// parent.window.opener.parent.parent.parent.parent;
			        // }else{
			        // return null;
			        // }
			        //			        	
			        // }
			        
		        },
		        setCustOrderId2CustRecognitionPage : function(custOrderId) {
			        try {
				        
				        var custRecognitionWin = this.findCustRecognitionHeadWin();
				        if (custRecognitionWin) {
					        custRecognitionWin.document.getElementById("custOrderId").value = "" + custOrderId;
				        }
			        }
			        catch (e) {
				        if (window.console && window.console.warn) {
					        window.console
					                .warn("Error when invoke ProdOfferNewLoader#setCustOrderId2CustRecognitionPage,"
					                        + e.message);
				        }
			        }
			        
		        },
		        
		        /**
				 * 保存订单受理完成时重置客户识别的购物车的数量
				 */
		        resetShoppingCartCount : function() {
			        var custRecognitionWin = this.findCustRecognitionHeadWin();
			        if (!!custRecognitionWin) {
				        custRecognitionWin.cust_Recognition_Head.showShoppingCartOrderCount();
			        }
		        },
		        getCustOrderId : function() {
			        var requestParam = dojo.global.$appContext$.get("requestParam");
			        if (requestParam.custOrderId) { return requestParam.custOrderId; }
			        
		        },
		        
		        /**
				 * 栓新促销包目录树
				 */
		        renderPromotionTree : function(mainProdOfferId) {
			        var titleButton = unieap.byId("promotionPane").buttonContainerNode,
				        refresh_icon = BusCard.path.contextPath + "/common/images/icon/refresh_icon.png",
				        controller = this;
			        titleButton.style.display = "";
			        titleButton.innerHTML = "<a style='vertical-align:top;color:#00577F' id='refresh-promotion-href'>"
			                + "<span>\u5237\u65b0</span><img src='" + refresh_icon
			                + "' style='width:16px;height:16px'/></a>"
			        titleButton.style.width = "50px";
			        titleButton.style.paddingTop = '5px';
			        dojo.connect(dojo.query("[id=refresh-promotion-href]", titleButton)[0], "onclick", function(e) {
				                e.preventDefault();
				                controller.renderPromotion(mainProdOfferId);
				                // var behaviorInstance =
				                // controller.behaviorInstance;
				                var refreshWidget = $ac$.get("refreshPromotionWidget");
				                if (refreshWidget && refreshWidget.domNode.style.display == "") {// 展开状态
					                orderaccept.custom.popup.close({
						                        widget : refreshWidget,
						                        notHandleData : true
					                        });
				                }
			                });
		        },
		        
		        /**
				 * 重新渲染促销政策视图
				 */
		        renderPromotion : function(mainProdOfferId) {
			        var loader = this;
			        var productIdList = [];// 接入类产品id集合
			        var subProdOfferIdList = [];// 可选包销售品id
			        var retObj = loader.getProductIdsAndSubProdOfferIds();
			        productIdList = retObj.productIdList;
			        subProdOfferIdList = retObj.subProdOfferIdList;
			        var belongCode = this.getBelongCode();
			        if (this.promotionTree) {
				        this.promotionTree.destroyRecursive();
			        }
			        this.promotionTree = util.WidgetProvider.getPromotionTree({
				                id : 'promotionTree',
				                url : this.buildPromotionTreeURL(subProdOfferIdList, productIdList, belongCode,
				                        mainProdOfferId)
			                });
			        var _node = !!unieap.byId('PromotionTreePane')
			                ? unieap.byId('PromotionTreePane').containerNode
			                : dojo.byId("PromotionTreePane");
			        dojo.place(this.promotionTree.domNode, _node, 'first');
			        
			        // 渲染个人收藏促销政策列表
			        loader.renderPersonalCollectPromotionList(13, subProdOfferIdList, productIdList, mainProdOfferId);
			        this.promotionDetailBuilder = new PromotionDetailBuilder(this);
			        var promotionPane = unieap.byId("promotionPane");
			        if (promotionPane && !promotionPane.open) {
				        promotionPane.promotionFirstRefresh = true;
				        promotionPane.toggle();
			        }
			        // 清空促销政策列表中数据
			        var grid = this.salesPromotionOrderGrid;
			        var indexArray = [];
			        var binDingData = grid.ds.getRawData();
			        var filteBindingData = dojo.filter(binDingData || [], function(oneBindingData) {
				                var flag = false;
				                var targetObjectArray = [];
				                var promotionInfo = oneBindingData.showData.promotionInfo;
				                var targetObjectList = promotionInfo.promotionTargetObjectList;
				                targetObjectArray = targetObjectList.toArray();
				                for (var i = 0; i < targetObjectArray.length; i++) {
					                var oneTargetObject = targetObjectArray[i];
					                if (oneTargetObject.targetObjectType == 1) {// 作用对象为销售品
						                flag = dojo.some(subProdOfferIdList || [], function(oneSubProdOffer) {
							                        return oneTargetObject.targetObjectId == oneSubProdOffer.prodOfferId;
						                        });
						                if (flag) {
							                break;
						                }
					                } else {// 作用对象为产品
						                flag = dojo.some(productIdList || [], function(oneProductId) {
							                        return oneTargetObject.targetObjectId == oneProductId;
						                        });
						                if (flag) {
							                break;
						                }
					                }
				                }
				                if (!flag) { return oneBindingData; }
			                });
			        dojo.forEach(filteBindingData || [], function(oneBindingData) {
				                // indexArray.push(oneBindingData.rowIndex);
				                // 删除指定行
				                grid.remove(oneBindingData.rowIndex);
			                });
			        // grid.getManager("EditManager").deleteRows(indexArray);
			        
			        var data = dojo.filter(binDingData || [], function(oneData) {
				                return !dojo.some(filteBindingData || [], function(anotherData) {
					                        return oneData.rowIndex == anotherData.rowIndex;
				                        });
			                });
			        // 重新生成作用对象
			        dojo.forEach(data || [], function(oneData) {
				                loader.createTargetObjectNum(oneData, mainProdOfferId);
				                if (oneData.showData.promotionInstInfo) {// 存在实例数据
					                var rowIndex = oneData.rowIndex;
					                var finishPage = dojo.query("[id=finishPage-" + rowIndex + "]", grid.domNode)[0];
					                if (finishPage) {
						                finishPage.style.display = "";
					                }
				                }
			                });
		        },
		        
		        /**
				 * 获取接入类产品id和可选包销售品id集合
				 */
		        getProductIdsAndSubProdOfferIds : function() {
			        var mainProdOfferId = this.mainProdOfferId;// 主销售品id
			        var productIdList = util.ProdOfferHelper.getSelectProductIdList(this.mainProdOfferWidget.domNode);// 接入类产品id集合
			        var subProdOfferIdList = [];
			        var subProdOfferOrderProviderMap = this.multipleSubProdOfferHandler.subProdOfferOrderProviderMap;
			        for (var p in subProdOfferOrderProviderMap) {
				        var subProdOfferOrderProvider = subProdOfferOrderProviderMap[p];
				        var subProdOfferList = subProdOfferOrderProvider.getSubGridBindingData();
				        var subProdOfferOrderGrid = subProdOfferOrderProvider.subProdOfferOrderGrid;
				        var subProdOfferInfoList = dojo.filter(subProdOfferList, function(subProdOfferInfo) {
					        var rowIndex = subProdOfferInfo.rowIndex;
					        return dojo.query(".subProdOfferDetail-" + rowIndex, subProdOfferOrderGrid.domNode)[0].childNodes[0].checked;
				        });
				        var oneSubProdOfferIdList = dojo.map(subProdOfferInfoList, function(subProdOfferInfo) {
					                return subProdOfferInfo.subProdOfferInfo.prodOfferId;
				                });
				        
				        Array.prototype.push.apply(subProdOfferIdList, oneSubProdOfferIdList || []);
			        }
			        subProdOfferIdList.push(parseInt(mainProdOfferId));
			        return {
				        productIdList : productIdList,
				        subProdOfferIdList : subProdOfferIdList
			        };
		        },
		        
		        /**
				 * 渲染促销政策订购列表
				 */
		        renderPromotionOrderGrid : function() {
			        var loader = this;
			        if (loader.salesPromotionOrderGrid) {
				        loader.salesPromotionOrderGrid.destroyRecursive();
			        }
			        var cm = new BusCard.widget.grid.ColumnModel({
				                metaData : loader.getPromotionColumns()
			                });
			        var ds = new BusCard.widget.grid.DataSource([], cm);
			        var _node = !!unieap.byId('PromotionCart') ? unieap.byId('PromotionCart').containerNode : dojo
			                .byId("PromotionCart");
			        var promotionGrid = loader.salesPromotionOrderGrid = new loader.salesPromotionOrderGridClass({
				                cm : cm,
				                ds : ds
			                }, _node);
			        // var promotionGrid =
			        // this.salesPromotionOrderGrid = new
			        // this.salesPromotionOrderGridClass({
			        // cm : this.getPromotionColumns()
			        // });
			        // dojo.place(this.salesPromotionOrderGrid.domNode,
			        // _node, "first");
			        loader.promotionCartDataProvider = new PromotionCartDataProvider(loader);
		        },
		        
		        /**
				 * 渲染促销政策查询模板
				 */
		        renderPromotionLayout : function() {
			        var render = this;
			        unieap.byId("promotionPane").destroyDescendants();
			        
			        unieap.byId("promotionPane").containerNode.innerHTML = BusCard.Template
			                .create(this.promotionContentTemplate).apply({});
			        
			        dojo.parser.parse(unieap.byId("promotionPane").containerNode);
			        
			        render.renderPromotionSearch();
		        },
		        
		        /**
				 * 渲染促销政策查询
				 */
		        renderPromotionSearch : function() {
			        // var uniqueId = uniqueId || "";
			        var promotionHeaderWidgetInstance = new orderaccept.prodofferaccept.widget.commheader.PromotionHeaderWidget();
			        dojo.place(promotionHeaderWidgetInstance.domNode, unieap.byId("promotionBorderPan").containerNode,
			                "first");
		        },
		        
		        /**
				 * 渲染个人收藏促销政策列表
				 */
		        renderPersonalCollectPromotionList : function(prodOfferType, subProdOfferIdList, productIdList,
		                mainProdOfferId) {
			        var loader = this;
			        var standardCount = ConstantsPool.load("OfferDisPlayCountConst").OfferDisPlayCountConst.MAINPRODOFFERCOUNT;
			        var param = "method=getPersonalCollectPromotion&prodOfferType=" + prodOfferType;
			        var personalPromotionList = util.ServiceFactory.getService("url:prodOfferSaleAjaxAction.do?"
			                + param);// 收藏促销集合
			        
			        var promotionParam = "method=getSalesPromotionList&prodOfferIdList="
			                + dojo.toJson(subProdOfferIdList) + "&productIdList=" + dojo.toJson(productIdList)
			                + "&mainProdOfferId=" + mainProdOfferId;
			        var promotionList = util.ServiceFactory.getService("url:orderDetailAction.do?" + promotionParam);
			        var mainProdOfferDetailInfo = util.ProdOfferHelper.getProdOfferDetail(mainProdOfferId);// 获取主套餐的详细信息
			        
			        personalPromotionList = dojo.filter(personalPromotionList || [], function(onePersonalPromotion) {
				                // var flag = false;
				                // var promotionId =
								// onePersonalPromotion.prodOfferId;
				                // var promotionDetailInfo =
								// util.ProdOfferHelper.getSalesPromotionDetail(promotionId);//
								// 获取促销政策的相信信息
				                // var targetObjectList =
								// promotionDetailInfo.promotionTargetObjectList;//
								// 作用对象集合
				                // if (targetObjectList &&
								// targetObjectList.length > 0) {
				                // for (var i = 0; i <
								// targetObjectList.length; i++) {
				                // var targetId =
								// targetObjectList[i].targetObjectId;
				                // if (targetId == mainProdOfferId
				                // || dojo.some(subProdOfferIdList ||
								// [], function(oneSubProdOfferId) {
				                // return targetId ==
								// oneSubProdOfferId;
				                // }) || dojo.some(productIdList ||
								// [], function(oneProductId) {
				                // return targetId == oneProductId;
				                // })) {
				                // flag = true;
				                // break;
				                // }
				                // }
				                // }
				                // if(flag){//根据主套餐的付费类型确定是否需要展示该促销政策
				                // var feeType =
								// mainProdOfferDetailInfo.feeType;//主套餐付费方式
				                // var ifOcs =
								// promotionDetailInfo.ifCos;//促销ocs类型
				                // if((ifOcs == 1 &&
								// feeType!=2100)||(ifOcs == 0 &&
								// feeType == 2100)){
				                // flag = false;
				                // }
				                // }
				                // return flag;
				                var promotionId = onePersonalPromotion.prodOfferId;// 收藏的促销政策id
				                return dojo.some(promotionList || [], function(onePromotion) {
					                        return onePromotion.nodeId > 0 && onePromotion.nodeId == promotionId;
				                        });
			                });
			        
			        if (personalPromotionList && (personalPromotionList.length > standardCount)) {
				        var subProdOfferArray = Array.prototype.slice.apply(personalPromotionList);
				        personalPromotionList = subProdOfferArray.slice(0, standardCount);
				        var morePersonalPromotionList = subProdOfferArray.slice(standardCount);
				        dojo.global.$appContext$.set("_morePersonalPromotionList", morePersonalPromotionList);
			        }
			        dojo.global.$appContext$.set("_personalPromotionList", personalPromotionList);
			        if (loader.personalCollectPromotionListWidgetInstance) {
				        loader.personalCollectPromotionListWidgetInstance.destroyRecursive();
			        }
			        loader.personalCollectPromotionListWidgetInstance = new loader.personalCollectPromotionListWidgetClass();
			        dojo.place(loader.personalCollectPromotionListWidgetInstance.domNode, unieap
			                        .byId("promotionPersonalCollectResult").containerNode, "last");
			        if (dojo.global.$appContext$.get("_morePersonalPromotionList")) {
				        dojo.byId("pcPromotionMoreHref").style.display = "block";
			        }
		        },
		        
		        getPromotionColumns : function() {
			        // 促销政策名称格式化
			        var promotionNameFormatter = function(value, rowIndex) {
				        // var bindingData =
				        // this.grid.getBinding().getRow(rowIndex);
				        var bindingData = this.getDataSource().getRawData()[rowIndex];
				        bindingData.rowIndex = rowIndex;
				        return PromotionFormatterProvider.promotionFormatter.createPromotionNameDetail(rowIndex,
				                bindingData);
			        };
			        // 促销政策开始时间格式化
			        var promotionStartDateFormatter = function(value, rowIndex) {
				        // var bindingData =
				        // this.grid.getBinding().getRow(rowIndex);
				        var bindingData = this.getDataSource().getRawData()[rowIndex];
				        return PromotionFormatterProvider.promotionFormatter.createPromotionStartDate(rowIndex,
				                bindingData);
			        };
			        // 促销政策失效时间格式化
			        var promotionEndDateFormatter = function(value, rowIndex) {
				        // var bindingData =
				        // this.grid.getBinding().getRow(rowIndex);
				        var bindingData = this.getDataSource().getRawData()[rowIndex];
				        return PromotionFormatterProvider.promotionFormatter.createPromotionEndDate(rowIndex,
				                bindingData);
			        };
			        // 促销政策作用类型格式化
			        var promotionTargetTypeFormatter = function(value, rowIndex) {
				        // var bindingData =
				        // this.grid.getBinding().getRow(rowIndex);
				        var bindingData = this.getDataSource().getRawData()[rowIndex];
				        return PromotionFormatterProvider.promotionFormatter.createPromotionTargetObject(rowIndex,
				                bindingData);
			        };
			        // 促销政策状态格式化
			        var promotionStatusFormatter = function(value, rowIndex) {
				        // var bindingData =
				        // this.grid.getBinding().getRow(rowIndex);
				        var bindingData = this.getDataSource().getRawData()[rowIndex];
				        bindingData.rowIndex = rowIndex;
				        return PromotionFormatterProvider.promotionFormatter.createPromotionStatus(rowIndex,
				                bindingData);
			        };
			        
			        // 促销政策作用对象格式化
			        var promotionTargetNumFormatter = function(value, rowIndex) {
				        // var bindingData =
				        // this.grid.getBinding().getRow(rowIndex);
				        var bindingData = this.getDataSource().getRawData()[rowIndex];
				        return PromotionFormatterProvider.promotionFormatter.createPromotionTargetNum(rowIndex,
				                bindingData);
			        };
			        
			        // 促销收藏格式化
			        var promotionCollectFormatter = function(value, rowIndex) {
				        var bindingData = this.getDataSource().getRawData()[rowIndex];
				        return PromotionFormatterProvider.promotionFormatter.createPromotonCollect(rowIndex,
				                bindingData);
			        };
			        
			        return cm = [{
				                width : '25%',
				                name : 'prodOfferName',
				                text : '已选促销政策',
				                render : promotionNameFormatter
			                }, {
				                width : '18%',
				                name : 'startDate',
				                text : '开始时间',
				                render : promotionStartDateFormatter
			                }, {
				                width : '18%',
				                name : 'endDate',
				                text : '结束时间',
				                render : promotionEndDateFormatter
			                }, {
				                width : '11%',
				                name : 'orderStatus',
				                text : '订购状态',
				                render : promotionStatusFormatter
			                }, {
				                width : '10%',
				                name : 'effectType',
				                text : '作用类型',
				                render : promotionTargetTypeFormatter
			                }, {
				                width : '25%',
				                name : 'effectTarget',
				                text : '作用对象',
				                render : promotionTargetNumFormatter
			                }, {
				                width : '6%',
				                name : 'promotionCollect',
				                text : '促销收藏',
				                render : promotionCollectFormatter
			                }];
		        },
		        
		        /**
				 * 展示已选中促销政策信息
				 */
		        showSalesPromotionDetail : function(salesPromotionInfo) {
			        var loader = this;
			        var rowData = util.ProdOfferHelper.createSalesPromotionRowData(salesPromotionInfo);
			        // binding =
			        // this.salesPromotionOrderGrid.getBinding();
			        // binding.insertRow(rowData,
			        // binding.getRowCount());
			        this.salesPromotionOrderGrid.add(rowData);
			        
			        // 宽带标准化套餐特殊处理 beg
			        var mainProdOfferId = loader.mainProdOfferId;// 主销售品id
			        var salesTargetObjectList = salesPromotionInfo.promotionTargetObjectList;
			        // 当前主销售品是否为选中促销政策作用对象
			        var isTargetMainProdOffer = dojo.some(salesTargetObjectList || [], function(oneTargetObject) {
				                return oneTargetObject.targetObjectType == "1"
				                        && oneTargetObject.targetObjectId == mainProdOfferId;
			                });
			        // 判断当前主销售品是否为宽带标准化套餐
			        var isStandardProdOffer = util.ProdOfferHelper.isStandardProdOffer(mainProdOfferId);
			        if (isTargetMainProdOffer && isStandardProdOffer) {
				        // 设置促销政策开始时间为主销售品结束时间加1天
				        var mainProdOfferNode = dojo.query(".mainprodoffer-class", loader.mainProdOfferWidget.domNode)[0];
				        var mainProdOfferStartDate = dojo
				                .trim(dojo.query(".startDate-class", mainProdOfferNode)[0].innerHTML);
				        var rowIndex = rowData.rowIndex;
				        var promotionStartDateDiv = dojo.query(".promotionStartDate-" + rowIndex,
				                loader.salesPromotionOrderGrid.domNode)[0];
				        var date = util.DateHelper.getDateFromString(mainProdOfferStartDate);
				        date.setDay(date.getDay() + 1);
				        var startDate = util.DateHelper.formatDate(date);
				        dojo.query(".start_date_class", promotionStartDateDiv)[0].innerHTML = startDate;
			        }
			        // 宽带标准化套餐特殊处理 end
			        
			        // 为促销政策列表生成作用号码
			        loader.createTargetObjectNum(rowData, loader.mainProdOfferId);
			        
			        // 处理升速
			        loader.dealPromotionRaiseSpeedInfo(salesPromotionInfo, rowData, true);
			        
			        // 根据规格数据计算促销结束时间
			        loader.dealPromotionEndDate(salesPromotionInfo, rowData);
		        },
		        
		        /**
				 * 处理升速
				 */
		        dealPromotionRaiseSpeedInfo : function(salesPromotionInfo, rowData, flag) {
			        var rowIndex = rowData.rowIndex;
			        var raiseSpeedObj = util.ProdOfferHelper.getPromotionRaiseSpeedObj(salesPromotionInfo);
			        // 如果升速对象为空或促销对象为非接入类产品时不处理
			        if (raiseSpeedObj == null || !rowData.showData.accessProductList
			                || rowData.showData.accessProductList == null) { return; }
			        // 获取选中的业务号码
			        var salesPromotionOrderGridDom = this.salesPromotionOrderGrid.domNode;
			        var showServiceIdDiv = dojo.query(".promotionTargetNum-" + rowIndex, salesPromotionOrderGridDom)[0];
			        var checkServiceIdList = dojo.filter(showServiceIdDiv.childNodes || [], function(oneNode) {
				                return oneNode.checked == true;
			                });
			        var uniqueid = checkServiceIdList.length > 0
			                ? checkServiceIdList[0].getAttribute("targetUniqueid")
			                : null;
			        if (uniqueid) {
				        raiseSpeedObj.uniqueId = uniqueid;
				        raiseSpeedObj.prodOfferId = salesPromotionInfo.proodOfferInfo.prodOfferId;
				        raiseSpeedObj.rowData = rowData;
				        var publisher = new BusCard.messaging.Publisher();
				        if (flag) {
					        rowData.rateFlag = uniqueid;
					        publisher.publish("/message/raiseSpeed" + uniqueid, raiseSpeedObj);
				        } else {
					        publisher.publish("/message/decreaseSpeed" + uniqueid, raiseSpeedObj);
				        }
			        }
		        },
		        
		        /**
				 * 根据规格数据计算促销政策结束时间
				 */
		        dealPromotionEndDate : function(salesPromotionInfo, rowData) {
			        var loader = this;
			        var rowIndex = rowData.rowIndex;
			        var months = 0;
			        var agreementAttrCd = ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.AGREEMENT_ATTR_CD;
			        var promotionTypeConst = ConstantsPool.load("PromotionTypeConst").PromotionTypeConst;
			        //判断当前处理促销类型，如果是租机或者补贴卷则要特殊处理
			        var promotionType = salesPromotionInfo.promotionType;//促销政策类型
			        if(promotionType == promotionTypeConst.DEVICE_RENT || promotionType == promotionTypeConst.SUBSIDY_PROMOTION || promotionType == promotionTypeConst.TELCHARGE_COUPON){//租机或补贴卷-->辽宁电信增加话费补贴类型
			        	var promotionItemList = salesPromotionInfo.salesPromotionItemList;//促销政策明细项
			        	//获取租机消费方式属性
						var consumeKindItem = BusCard.find(promotionItemList||[],function(oneItemObj){
							return oneItemObj.itemAttrId == ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.CONSUME_KIND_CD;
						});
						if(consumeKindItem){
							var consumekindValue = consumeKindItem.attrValue;
							if(consumekindValue == 2){//消费方式为协议消费期
								//获取划拨低消方案属性
								var transferKindItem = BusCard.find(promotionItemList||[],function(oneItem){
									return oneItem.itemAttrId == ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.TRANSFER_KIND_CD;
								});
								if(transferKindItem){
									var transferKindValue = transferKindItem.attrValue;
									if(transferKindValue == 3 || transferKindValue == 4){//当下月划拨时生效时间为下月1号-->不判断是否预约，不修改开始时间
										//loader.changePromotionStartDate(rowIndex);
										//dojo.mixin(rowData,{changedStartDate:"1"});//如果已修改了开始时间，需要做个表识
									}
								}
								
								//根据协议消费期(月)属性计算促销政策的失效时间 -->客户没有点开详情页面此属性选择默认值进行计算
								var agreementAttrItem = BusCard.find(promotionItemList||[],function(oneItem){
									return oneItem.itemAttrId == agreementAttrCd;
								});
								
								if(agreementAttrItem){
									months = agreementAttrItem.attrValue;
									loader.changePromotionEndDate(months, rowIndex);
								}
							}else{//非按时间到期的租机或补贴卷，生效时间为当前时间，失效时间为2037-1-1
								loader.changePromotionEndDate(0, rowIndex);
							}
						}else{//不存在租机消费方式属性时，结束时间按默认2037-1-1算
							loader.changePromotionEndDate(0, rowIndex);
						}
						
						//根据作用号码是否存在有效的政策生成促销状态此处不做处理
						
			        }else{//分月转兑生效时间为当前时间，失效时间为2037-1-1
			        	loader.changePromotionEndDate(0, rowIndex);
			        	//分月转兑不区分是否已订购了促销政策，状态都是有效
						dojo.mixin(rowData,{promotionStatusCd:"1000"});
			        }
			        /*
			        // 协议月数
			        var agreementMonths = ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.AGREEMENT_MONTH_CD;
			        // 赠送月数(预存)
			        var giftMonths = ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.GIFT_MONTH_CD;
			        // 赠送月数(话费)
			        var anotherGiftMonths = ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.ANOTHER_GIFT_MONTH_CD;
			        // var transferMonthAttrCd =
					// ConstantsPool.load("PromotionCommonConst").PromotionCommonConst.TRANSFER_MONTH_ATTR_CD;
			        // 判断是否存在划拨月数
			        // var isTransferMonth =
					// dojo.some(salesPromotionInfo.salesPromotionItemList||[],function(onePromotionItem){
			        // return onePromotionItem.attrSpec.attrCd ==
					// transferMonthAttrCd;
			        // });
			        // 判断是否存在协议消费期
			        var isAgreement = dojo.some(salesPromotionInfo.salesPromotionItemList || [], function(
			                        onePromotionItem) {
				                return onePromotionItem.attrSpec.attrCd == agreementAttrCd;
			                });
			        var isAgreementMonths = dojo.some(salesPromotionInfo.salesPromotionItemList || [], function(
			                        onePromotionItem) {
				                return onePromotionItem.attrSpec.attrCd == agreementMonths;
			                });
			        var isGiftMonths = dojo.some(salesPromotionInfo.salesPromotionItemList || [], function(
			                        onePromotionItem) {
				                return onePromotionItem.attrSpec.attrCd == giftMonths;
			                });
			        var isAnotherGiftMonths = dojo.some(salesPromotionInfo.salesPromotionItemList || [], function(
			                        onePromotionItem) {
				                return onePromotionItem.attrSpec.attrCd == anotherGiftMonths;
			                });
			        if (isAgreement) {// 存在协议消费期
				        var item = dojo.filter(salesPromotionInfo.salesPromotionItemList || [], function(
				                        onePromotionItem) {
					                return onePromotionItem.attrSpec.attrCd == agreementAttrCd;
				                })[0];
				        if (item.attrValue) {
					        months += parseInt(item.attrValue);
				        }
			        }
			        if (isAgreementMonths) {// 存在协议月数
				        var item = dojo.filter(salesPromotionInfo.salesPromotionItemList || [], function(
				                        onePromotionItem) {
					                return onePromotionItem.attrSpec.attrCd == agreementMonths;
				                })[0];
				        if (item.attrValue) {
					        months += parseInt(item.attrValue);
				        }
			        }
			        if (isGiftMonths) {// 存在赠送月数（预存）
				        var item = dojo.filter(salesPromotionInfo.salesPromotionItemList || [], function(
				                        onePromotionItem) {
					                return onePromotionItem.attrSpec.attrCd == giftMonths;
				                })[0];
				        if (item.attrValue) {
					        months += parseInt(item.attrValue);
				        }
			        }
			        if (isAnotherGiftMonths) {// 存在赠送月数（话费）
				        var item = dojo.filter(salesPromotionInfo.salesPromotionItemList || [], function(
				                        onePromotionItem) {
					                return onePromotionItem.attrSpec.attrCd == anotherGiftMonths;
				                })[0];
				        if (item.attrValue) {
					        months += parseInt(item.attrValue);
				        }
			        }
			        */
			        //loader.changePromotionEndDate(months, rowIndex);
			        // if(isTransferMonth && !isAgreement){
			        // var item =
					// dojo.filter(salesPromotionInfo.salesPromotionItemList||[],function(onePromotionItem){
			        // return onePromotionItem.attrSpec.attrCd ==
					// transferMonthAttrCd;
			        // })[0];
			        // if(item.attrValue){
			        // loader.changePromotionEndDate(item.attrValue,rowIndex);
			        // }
			        // }
		        },
		        
		        /**
				 * 根据划拨月数修改促销政策结束时间
				 */
		        changePromotionEndDate : function(months, rowIndex) {
			        var promotionStartDateDiv = dojo.query(".promotionStartDate-" + rowIndex,
			                this.salesPromotionOrderGrid.domNode)[0];
			        var promotionEndDateDiv = dojo.query(".promotionEndDate-" + rowIndex,
			                this.salesPromotionOrderGrid.domNode)[0];
			        //结束时间默认为空
			        var endDate = "";
			        if(months>0){
			        	var promotionStartDate = dojo
			                .trim(dojo.query(".start_date_class", promotionStartDateDiv)[0].innerHTML);
				        var date = util.DateHelper.getDateFromString(promotionStartDate);
				        date.setMonth(date.getMonth() + parseInt(months));
				        endDate = util.DateHelper.formatDate(date);
			        }
			        dojo.query(".end_date_class", promotionEndDateDiv)[0].innerHTML = endDate;
		        },
		        
		        /**
				 * 修改促销政策开始时间
				 */
				changePromotionStartDate : function(rowIndex){
					var promotionStartDateDiv = dojo.query(".promotionStartDate-"+rowIndex,this.salesPromotionOrderGrid.domNode)[0];
					var promotionStartDate = dojo.trim(dojo.query(".start_date_class",promotionStartDateDiv)[0].innerHTML);
					var startDate = util.DateHelper.getDateFromString(promotionStartDate);
					startDate.setMonth(startDate.getMonth()+1);
					startDate.setDate(1);
					startDate.setHours(0);
					startDate.setMinutes(0);
					startDate.setSeconds(0);
					dojo.query(".start_date_class",promotionStartDateDiv)[0].innerHTML = util.DateHelper.formatDate(startDate);
				},
		        
		        /**
				 * 获取已选中的促销政策
				 */
		        getCheckedPromotionList : function() {
			        var salesPromotionOrderGrid = this.salesPromotionOrderGrid;
			        var promotionRowData = salesPromotionOrderGrid.ds.getRawData();
			        var checkedPromotionRowData = dojo.filter(promotionRowData, function(onePromotionRowData) {
				        var rowIndex = onePromotionRowData.rowIndex;
				        return dojo.query(".promotionNameDetail-" + rowIndex, salesPromotionOrderGrid.domNode)[0].childNodes[0].checked;
			        });
			        var checkedPromotionIdList = dojo.map(checkedPromotionRowData,
			                function(onecheckedPromotionRowData) {
				                return onecheckedPromotionRowData.showData.promotionInfo.promotionId;
			                });
			        return checkedPromotionIdList;
		        },
		        
		        /**
				 * 点击促销政策列表前复选框，更新促销政策状态
				 */
		        changePromotionCheckedStatus : function(data) {
			        var rowIndex = data.rowIndex,
				        promotionGrid = this.salesPromotionOrderGrid,
				        checkStatus = dojo.query(".promotionNameDetail-" + rowIndex, promotionGrid.domNode)[0].childNodes[0].checked,
				        statusName = "",
				        statusCd = true;
			        if (!checkStatus) {// 未选中状态
				        statusName = "\u672a\u8ba2\u8d2d";
				        statusCd = false;
			        } else {// 已选中状态
				        statusName = "\u8ba2\u8d2d";
				        statusCd = true;
			        }
			        dojo.query(".promotionNameDetail-" + rowIndex, promotionGrid.domNode)[0].childNodes[0].checked = statusCd;
			        dojo.query(".promotionStatus-" + rowIndex, promotionGrid.domNode)[0].innerHTML = statusName;
		        },
		        
		        /**
				 * 生成促销政策作用对象
				 */
		        createTargetObjectNum : function(rowData, mainProdOfferId) {
			        var promotionId = rowData.showData.promotionInfo.promotionId,
				        promotionTargetList = rowData.showData.promotionInfo.promotionTargetObjectList,
				        rowIndex = rowData.rowIndex;
			        // 作用对象为产品
			        var productTargetList = dojo.filter(promotionTargetList, function(promotionTargetObj) {
				                return promotionTargetObj.targetObjectType == 2;
			                });
			        // 作用对象为销售品
			        var prodOfferTargetList = dojo.filter(promotionTargetList, function(promotionTargetObj) {
				                return promotionTargetObj.targetObjectType == 1;
			                });
			        if (productTargetList && productTargetList.length > 0) {
				        var count = 0;
				        var trs = dojo.query(".main-product-basic", this.mainProdOfferWidget.domNode);
				        var productBasicList = dojo.filter(trs, function(prodBasicTr) {
					                var accessProductId = dojo.attr(prodBasicTr, "productId")
					                        || dojo.query("SELECT", prodBasicTr)[0].value;
					                return dojo.some(productTargetList, function(productTargetObj) {
						                        return productTargetObj.targetObjectId == accessProductId
						                                && dojo.query(".main-product-check", prodBasicTr)[0].checked;
					                        });
				                });
				        rowData.showData.accessProductList = productBasicList;
				        var selectNumberElem = dojo.query(".promotionTargetNum-" + rowIndex)[0];
				        var handledIdList = dojo.map(productBasicList, function(prodBasicTr) {
					                count++;
					                var accessProductId = dojo.attr(prodBasicTr, "productId")
					                        || dojo.query("SELECT", prodBasicTr)[0].value;
					                var serviceKindIndex = dojo.attr(prodBasicTr, "serviceKindIndex") || "-1";
					                var uniqueid = dojo.attr(prodBasicTr, "uniqueid");
					                serviceKind = dojo.attr(prodBasicTr, "serviceKind") || "-1", viewId = dojo.attr(
					                        prodBasicTr, "viewId"), defaultNumber = dojo.query(".serviceId-" + viewId,
					                        prodBasicTr)[0].value, radioId = 'selected_targetNumber_' + serviceKind
					                        + "_" + serviceKindIndex, labelId = 'selected_targetNumber_label_'
					                        + serviceKind + "_" + serviceKindIndex, radioName = 'radio_' + rowIndex, radioboxElem = BusCard
					                        .$(radioId, selectNumberElem), labelElem = BusCard.$(labelId,
					                        selectNumberElem);
					                if (radioboxElem) {
						                labelElem.innerHTML = defaultNumber;
					                } else {
						                radioboxElem = document.createElement("INPUT");
						                radioboxElem.type = "radio";
						                radioboxElem.value = defaultNumber;
						                radioboxElem.id = radioId;
						                radioboxElem.name = radioName;
						                labelElem = document.createElement("LABEL");
						                labelElem.id = labelId;
						                labelElem.innerHTML = defaultNumber;
						                selectNumberElem.appendChild(radioboxElem);
						                selectNumberElem.appendChild(labelElem);
						                if (count <= 1) {
							                radioboxElem.checked = true;
						                }
						                radioboxElem.serviceKindIndex = serviceKindIndex;
						                radioboxElem.serviceKind = serviceKind;
						                radioboxElem.rowIndex = rowIndex;
						                radioboxElem.setAttribute("serviceKindIndex", serviceKindIndex);
						                radioboxElem.setAttribute("serviceKind", serviceKind);
						                radioboxElem.setAttribute("rowIndex", rowIndex);
						                radioboxElem.setAttribute("productId", accessProductId);
						                radioboxElem.setAttribute("targetUniqueid", uniqueid);
						                radioboxElem.setAttribute("dojoAttachEvent", "onclick:elementclick");
						                radioboxElem.setAttribute("dojoAttachTopic", "/radioBoxTargetNumberChg");
					                }
					                return {
						                radioId : radioId,
						                labelId : labelId
					                };
				                });
				        dojo.forEach(selectNumberElem.getElementsByTagName("INPUT"), function(inputElem) {
					                var handledFlag = dojo.some(handledIdList || [], function(idPair) {
						                        return idPair.radioId == inputElem.id;
					                        });
					                if (!handledFlag) {
						                var sibling = inputElem.nextSibling;
						                selectNumberElem.removeChild(inputElem);
						                selectNumberElem.removeChild(sibling);
					                }
				                });
				        return;
			        }
			        
			        var subProdOfferIdList = [];
			        var subProdOfferOrderProviderMap = this.multipleSubProdOfferHandler.subProdOfferOrderProviderMap;
			        for (var p in subProdOfferOrderProviderMap) {
				        var subProdOfferOrderProvider = subProdOfferOrderProviderMap[p];
				        var uniqueid = subProdOfferOrderProvider.uniqueid ? subProdOfferOrderProvider.uniqueid : "-1";
				        var subProdOfferList = subProdOfferOrderProvider.getSubGridBindingData();
				        var subProdOfferOrderGrid = subProdOfferOrderProvider.subProdOfferOrderGrid;
				        var subProdOfferInfoList = dojo.filter(subProdOfferList, function(subProdOfferInfo) {
					        var rowIndex = subProdOfferInfo.rowIndex;
					        return dojo.query(".subProdOfferDetail-" + rowIndex, subProdOfferOrderGrid.domNode)[0].childNodes[0].checked;
				        });
				        var oneSubProdOfferIdList = dojo.map(subProdOfferInfoList, function(subProdOfferInfo) {
					                var rowIndex = subProdOfferInfo.rowIndex;
					                var retStr = uniqueid + "_" + rowIndex + "_"
					                        + subProdOfferInfo.subProdOfferInfo.prodOfferId;// uniqueid_rowIndex_prodOfferId
					                return retStr;
				                });
				        Array.prototype.push.apply(subProdOfferIdList, oneSubProdOfferIdList || []);
			        }
			        subProdOfferIdList.push("-1_-1_" + mainProdOfferId);// 添加主销售品id
			        // -->-1_-1_mainProdOfferId
			        // var subProdOfferOrderGrid =
			        // this.subProdOfferOrderGrid;
			        // var subProdOfferList =
			        // this.subProdOfferOrderGrid.ds.getRawData();
			        // var subProdOfferInfoList =
			        // dojo.filter(subProdOfferList, function(
			        // subProdOfferInfo) {
			        // var rowIndex = subProdOfferInfo.rowIndex;
			        // return dojo.query(".subProdOfferDetail-" +
			        // rowIndex,
			        // subProdOfferOrderGrid.domNode)[0].childNodes[0].checked;
			        // });
			        if (prodOfferTargetList && prodOfferTargetList.length > 0) {
				        var count = 0;
				        var prodOfferList = dojo.filter(subProdOfferIdList || [], function(oneSubProdOffer) {
					                var prodOfferId = oneSubProdOffer.split("_")[2];// 销售品id
					                return dojo.some(prodOfferTargetList || [], function(oneTarget) {
						                        return prodOfferId == oneTarget.targetObjectId;
					                        });
				                });
				        /*
						 * var prodOfferList =
						 * dojo.filter(prodOfferTargetList,
						 * function(oneTarget) { var targetProdOfferId =
						 * oneTarget.targetObjectId; return
						 * dojo.some(subProdOfferIdList || [],
						 * function(oneSubProdOfferId) { return
						 * oneSubProdOfferId == targetProdOfferId ||
						 * mainProdOfferId == targetProdOfferId; });
						 * });
						 */
				        var selectNumberElem = dojo.query(".promotionTargetNum-" + rowIndex)[0];
				        var handleProdOfferList = dojo.map(prodOfferList || [], function(oneProdOfferTarget) {
					                count++;
					                var uniqueid = oneProdOfferTarget.split("_")[0];
					                var rowIndex1 = oneProdOfferTarget.split("_")[1];
					                var prodOfferId = oneProdOfferTarget.split("_")[2];// 销售品id
					                var prodOfferName = dojo.filer(prodOfferTargetList || [], function(oneTarget) {
						                        return prodOfferId == oneTarget.targetObjectId;
					                        })[0].targetObjectName;// 销售品名称
					                
					                var radioId = "selected_targetNumber_radio_" + prodOfferId,
						                // oneProdOfferTarget.targetObjectId,
						                labelId = "selected_targetNumber_label_" + prodOfferId,
						                // oneProdOfferTarget.targetObjectId,
						                radioName = "radio_" + rowIndex,
						                radioboxElem = BusCard.$(radioId, selectNumberElem),
						                labelElem = BusCard.$(labelId, selectNumberElem);
					                if (radioboxElem) {
						                labelElem = prodOfferName;// oneProdOfferTarget.targetObjectName;
					                } else {
						                radioboxElem = document.createElement("INPUT");
						                radioboxElem.type = "radio";
						                radioboxElem.value = prodOfferId;// oneProdOfferTarget.targetObjectId;
						                radioboxElem.id = radioId;
						                radioboxElem.name = radioName;
						                labelElem = document.createElement("LABEL");
						                labelElem.id = labelId;
						                labelElem.innerHTML = prodOfferName;// oneProdOfferTarget.targetObjectName;
						                selectNumberElem.appendChild(radioboxElem);
						                selectNumberElem.appendChild(labelElem);
						                if (count <= 1) {
							                radioboxElem.checked = true;
						                }
						                radioboxElem.rowIndex = rowIndex;
						                radioboxElem.setAttribute("rowIndex", rowIndex);
						                radioboxElem.setAttribute("prodOfferId", oneProdOfferTarget.targetObjectId);
						                radioboxElem.setAttribute("targetUniqueid", uniqueid);
						                radioboxElem.setAttribute("targetRowIndex", rowIndex1);
					                }
					                return {
						                radioId : radioId,
						                labelId : labelId
					                };
				                });
				        dojo.forEach(selectNumberElem.getElementsByTagName("INPUT"), function(inputElem) {
					                var handledFlag = dojo.some(handleProdOfferList || [], function(prodOfferPair) {
						                        return prodOfferPair.radioId == inputElem.id;
					                        });
					                if (!handledFlag) {
						                var sibling = inputElem.nextSibling;
						                selectNumberElem.removeChild(inputElem);
						                selectNumberElem.removeChild(sibling);
					                }
				                });
				        // dojo.query(".promotionTargetNum-" +
				        // rowIndex,
				        // this.salesPromotionOrderGrid.domNode)[0].innerHTML
				        // = prodOfferTargetList[0].targetObjectName;
				        // dojo.query(".promotionTargetNum-" +
				        // rowIndex,
				        // this.salesPromotionOrderGrid.domNode)[0].id
				        // = prodOfferTargetList[0].targetObjectId;
			        }
		        },
		        
		        /**
				 * 初始化促销政策详细信息页面
				 */
		        initPromotionDetail : function(rowIndex) {
			        this.promotionDetailBuilder.initPromotionDetail(rowIndex);
		        },
		        
		        /**
				 * 获取促销政策页面数据
				 */
		        getSubProdOfferPageData : function() {
		        	var builder = this;
			        // 促销政策列表数据集合，一个促销政策对应一条记录
			        var salesPromotionPageDataList = {};
			        // 获取促销政策表格绑定数据
			        var bindingData = this.salesPromotionOrderGrid.ds.getRawData();
			        var salesPromotionOrderGridDom = this.salesPromotionOrderGrid.domNode;
			        var checkBindingData = dojo.filter(bindingData, function(oneBindingData) {
				        var rowIndex = oneBindingData.rowIndex;
				        var promotionInstInfo = oneBindingData.showData.promotionInstInfo;// 实例数据
				        return dojo.query(".promotionNameDetail-" + rowIndex, salesPromotionOrderGridDom)[0].childNodes[0].checked
				                && !promotionInstInfo;
			        });
			        var failureFlag = false;
			        // 循环遍历绑定数据，获取提交所需数据
			        BusCard.each(checkBindingData, function(oneBindingData) {
				        var rowIndex = oneBindingData.rowIndex,
					        viewId = oneBindingData.showData.viewId,
					        delayTime = null,
					        delayUnit = null,
					        validPeriod = null,
					        validType = null;
					        
					        //不点开详情页面特殊处理 beg
					        var promotionDetailWidget = builder.promotionDetailBuilder.prodOfferDetailWidgetList["" + rowIndex];
					        if(!promotionDetailWidget){//没有进行初始化
					        	//builder.initPromotionDetail(rowIndex);
					        	//builder.salesPromotionOrderGrid
					        	var orderDetailLinkTrNode = dojo.query("[rindex=" +rowIndex + "]",builder.salesPromotionOrderGrid.domNode)[0];
					        	var detailLink = dojo.query("[dojoAttachTopic=/promotionDetailLink]",orderDetailLinkTrNode)[0];
								builder.dispatchEvent(detailLink,'click');				        	
					        	promotionDetailWidget = builder.promotionDetailBuilder.prodOfferDetailWidgetList["" + rowIndex];
					        	var commitButtion = dojo.query("[dojoAttachTopic=/promotionDetailBtn]",promotionDetailWidget.domNode)[0];
					        	builder.dispatchEvent(commitButtion,"click");
//					        	var promotionDetailWidget = builder.promotionDetailBuilder.prodOfferDetailWidgetList["" + rowIndex];
//					        	promotionDetailWidget
					        	if(!oneBindingData.resRelaPageDataList){
					        		failureFlag = true;
					        		return false;
					        	}
					        }
					        //不点开详情页面特殊处理 end
					        
					        var promotionDetailDiv = dojo.query(".promotionNameDetail-" + rowIndex,
					                salesPromotionOrderGridDom)[0];
					        var promotionStartDateDiv = dojo.query(".promotionStartDate-" + rowIndex,
					                salesPromotionOrderGridDom)[0];
					        var startDateParentNode = dojo.query(".promotionStartDateStyle", promotionStartDateDiv)[0];
					        var promotionEndDateDiv = dojo.query(".promotionEndDate-" + rowIndex,
					                salesPromotionOrderGridDom)[0];
					        var endDateParentNode = dojo.query(".promotionEndDateStyle", promotionEndDateDiv)[0];
					        var showServiceIdDiv = dojo
					                .query(".promotionTargetNum-" + rowIndex, salesPromotionOrderGridDom)[0];
				        if (startDateParentNode && startDateParentNode.style.display != 'none') {
					        if (dojo.query("[id='delayTime-" + viewId + "']", promotionStartDateDiv)[0]) {
						        delayTime = dojo.query("[id='delayTime-" + viewId + "']", promotionStartDateDiv)[0].value;
					        }
					        if (dojo.query("[id='delayUnit-" + viewId + "']", promotionStartDateDiv)[0]) {
						        delayUnit = dojo.query("[id='delayUnit-" + viewId + "']", promotionStartDateDiv)[0].value;
					        }
				        }
				        
				        if (endDateParentNode && endDateParentNode.style.display != 'none') {
					        if (dojo.query("[id='validPeriod-" + viewId + "']", promotionEndDateDiv)[0]) {
						        validPeriod = dojo.query("[id='validPeriod-" + viewId + "']", promotionEndDateDiv)[0].value;
					        }
					        if (dojo.query("[id='validType-" + viewId + "']", promotionEndDateDiv)[0]) {
						        validType = dojo.query("[id='validType-" + viewId + "']", promotionEndDateDiv)[0].value;
					        }
				        }
				        // 被选中服务信息集合
				        var checkServiceIdList = dojo.filter(showServiceIdDiv.childNodes || [], function(oneNode) {
					                return oneNode.checked == true;
				                });
				        
				        var promotionPageInfoObj = {
					        "delayTime" : delayTime,
					        "delayUnit" : delayUnit,
					        "validPeriod" : validPeriod,
					        "validType" : validType,
					        "promotionStatus" : dojo.query(".promotionStatus-" + rowIndex, salesPromotionOrderGridDom)[0].innerHTML,
					        "serviceIdChecked" : checkServiceIdList.length > 0 ? checkServiceIdList[0].value : null,
					        "serviceKindIndex" : checkServiceIdList.length > 0 ? checkServiceIdList[0]
					                .getAttribute("serviceKindIndex") : null,
					        "serviceKind" : checkServiceIdList.length > 0 ? checkServiceIdList[0]
					                .getAttribute("serviceKind") : null,
					        "productId" : checkServiceIdList.length > 0 ? checkServiceIdList[0]
					                .getAttribute("productId") : null,
					        "startDate" : dojo
					                .trim(dojo.query(".start_date_class", promotionStartDateDiv)[0].innerHTML),
					        "endDate" : dojo.trim(dojo.query(".end_date_class", promotionEndDateDiv)[0].innerHTML),
					        "prodOfferId" : checkServiceIdList.length > 0 ? checkServiceIdList[0]
					                .getAttribute("prodOfferId") : null,
					        "uniqueid" : checkServiceIdList.length > 0 ? checkServiceIdList[0]
					                .getAttribute("targetUniqueid") : "-1"
				        };
				        dojo.mixin(oneBindingData, {
					                promotionPageInfo : promotionPageInfoObj
				                });
			        });
			        if(failureFlag){
			        	return false;
			        }
			        
			        var data = {
				        checkBindingData : checkBindingData
			        };
			        
			        if (!this.checkInstance.checkPromotionPageInfoBeforeCommit(data)) { 
			        	return false; 
			        }
			        return checkBindingData;
		        },
		        
		        dispatchEvent:function(elem,name){
					if(elem&&name){
						if(BusCard.Browser.IE){
							var eventObj = document.createEventObject();
							elem.fireEvent("on"+name,eventObj);
						}else{
							var eventObj = document.createEvent("Event");
							eventObj.initEvent(name,true,true);
							elem.dispatchEvent(eventObj);
						}		
					
					};
				},
		        
		        showOrderPreView : function() {
			        var loader = this;
			        if (loader.orderPreViewWidgetInstance) {
				        loader.orderPreViewWidgetInstance.destroyRecursive();
			        }
			        loader.orderPreViewWidgetInstance = new orderaccept.prodofferaccept.widget.mainprodoffer.orderPreViewWidget();
			        var protoPush = Array.prototype.push;
			        var cm = new BusCard.widget.grid.ColumnModel({
				                metaData : this.getOrderShowColumns()
			                });
			        var ds = null;
			        // 1、取主销售品
			        var mainOfferViewData = loader.mainProdOfferWidget.viewInitData.prodOfferViewData;
			        // 客户需求，增加宽带端口速率和周价 begin
			        var offerNameStr = "";
			        if (mainOfferViewData.prodOfferInfoVO.bindType != 2) {
				        // 速率
				        var str = "";
				        for (var key in loader.serviceCardWidgetMap) {
					        if (!loader.serviceCardWidgetMap.hasOwnProperty(key)) {
						        continue;
					        };
					        var container = loader.serviceCardWidgetMap[key];
					        if (container.attrCardWidget){
					        	var attrCd = dojo.filter(util.SpeedAttrArray||[],function(_attrCd){
					        		return !!container.attrCardWidget.busCardInstance.$(_attrCd+"");
					        	})[0];
					        	if(!!attrCd){
					        		str = container.attrCardWidget.busCardInstance.$(attrCd+"").value;
						        	offerNameStr += str != "" ? "端口速率：" + str : "";
					        	}
					        } 
				        }
				        // 周价
				        var price = "";
				        if (loader.mainProdOfferDetailWidget && loader.mainProdOfferDetailWidget.prodOfferAttrCard
				                && loader.mainProdOfferDetailWidget.prodOfferAttrCard.busCardInstance) {
					        price = loader.mainProdOfferDetailWidget.prodOfferAttrCard.busCardInstance.$("300003").value;
					        if (price) {
						        offerNameStr += " 周价：" + price;
					        }
				        }
				        if (offerNameStr != "") {
					        offerNameStr = " 【" + offerNameStr + "】";
				        }
				        
			        }
			        
			        // 客户需求，增加宽带端口速率和周价 end
			        var mainOfferViewObj = {
				        prodOfferType : "主销售品",
				        prodOfferName : mainOfferViewData.prodOfferInfoVO.prodOfferName + offerNameStr,
				        startDate : util.ProdOfferHelper.getProdOfferStartDateStr(mainOfferViewData,dojo.query(".startDate-class", prodOfferAcceptLoader.mainProdOfferWidget.domNode)),
				        endDate : util.ProdOfferHelper.getProdOfferEndDateStr(mainOfferViewData,dojo.query(".endDate-class", prodOfferAcceptLoader.mainProdOfferWidget.domNode)),
				        actionName : mainOfferViewData.actionName
			        }
			        // 退订主销售品
			        var quitViewList = dojo.query(".mainprodoffer-class-quit", loader.mainProdOfferWidget.domNode);
			        var quitMainOfferViewObjList = dojo.map(quitViewList, function(dom) {
				                var expDate = dojo.trim(dojo.query(".endDate-class", dom)[0].innerHTML);
				                return {
					                prodOfferType : "主销售品",
					                prodOfferName : dojo.trim(dojo.query(".prodOfferName-class", dom)[0].innerHTML),
					                startDate : dojo.trim(dojo.query(".startDate-class", dom)[0].innerHTML),
					                endDate : dojo.trim(dojo.query(".endDate-class", dom)[0].innerHTML),
					                actionName : dojo.trim(dojo.query(".actionName-class", dom)[0].innerHTML)
				                }
			                }) || [];
			        // 2、取成员销售品及可选包（自主）
			        if (mainOfferViewData.prodOfferInfoVO.bindType == 2) {
				        var mainOfferViewList = [];
				        mainOfferViewList.push(mainOfferViewObj);
				        protoPush.apply(mainOfferViewList, quitMainOfferViewObjList);
				        ds = new BusCard.widget.grid.DataSource(mainOfferViewList, cm);
				        var grid = new BusCardGrid({
					                cm : cm,
					                ds : ds
				                });
				        dojo.place(grid.domNode, loader.orderPreViewWidgetInstance.domNode, "last");
				        // 成员销售品
				        for (var key in loader.multipleSubProdOfferHandler.subProdOfferOrderProviderMap) {
					        if (!loader.multipleSubProdOfferHandler.subProdOfferOrderProviderMap.hasOwnProperty(key)) {
						        continue;
					        };
					        var offerViewList = [];
					        var container = loader.multipleSubProdOfferHandler.subProdOfferOrderProviderMap[key];
					        // 客户需求 取周价和速率 begin
					        var offerNameStr = "";
					        var str = "";
					        var subKey = "serviceCardWidget_" + container.uniqueId;
					        var serviceCardWidet = loader.serviceCardWidgetMap[subKey];
					        if (serviceCardWidet.attrCardWidget){
						        var attrCd = dojo.filter(util.SpeedAttrArray||[],function(_attrCd){
					        		return !!serviceCardWidet.attrCardWidget.busCardInstance.$(_attrCd+"");
					        	})[0];
					        	if(!!attrCd){
					        		str = serviceCardWidet.attrCardWidget.busCardInstance.$(attrCd+"").value;
						        	offerNameStr += str != "" ? "端口速率：" + str : "";
					        	}
						        
					        }
					        
					        var price = "";
					        if (container.prodOfferInfoWidget
					                && container.prodOfferInfoWidget.mainProdOfferDetailWidget
					                && container.prodOfferInfoWidget.mainProdOfferDetailWidget.prodOfferAttrCard
					                && container.prodOfferInfoWidget.mainProdOfferDetailWidget.prodOfferAttrCard.busCardInstance) {
						        price = container.prodOfferInfoWidget.mainProdOfferDetailWidget.prodOfferAttrCard.busCardInstance
						                .$("300003").value;
						        offerNameStr += price != "" ? " 周价：" + price : "";
					        }
					        if (offerNameStr != "") {
						        offerNameStr = " 【" + offerNameStr + "】";
					        }
					        // 客户需求 取周价和速率 end
					        var prodOfferViewData = container.prodOfferInfoWidget.viewInitData.prodOfferViewData;
					        var memberOfferViewObj = {
						        prodOfferType : "成员主销售品",
						        prodOfferName : prodOfferViewData.prodOfferInfoVO.prodOfferName + offerNameStr,
						        startDate : util.ProdOfferHelper.getProdOfferStartDateStr(prodOfferViewData,dojo.query(".startDate-class", container.prodOfferInfoWidget.domNode)),
						        endDate : util.ProdOfferHelper.getProdOfferEndDateStr(prodOfferViewData,dojo.query(".endDate-class", container.prodOfferInfoWidget.domNode)),
						        actionName : prodOfferViewData.actionName
					        }
					        offerViewList.push(memberOfferViewObj);
					        // 成员可选包
					        protoPush.apply(offerViewList, loader.createSubOfferViewObj(container));
					        ds = new BusCard.widget.grid.DataSource(offerViewList, cm);
					        var grid = new BusCardGrid({
						                cm : cm,
						                ds : ds
					                });
					        dojo.place(grid.domNode, loader.orderPreViewWidgetInstance.domNode, "last");
				        }
			        } else {
				        // 3、取可选包（非自主）
				        var offerViewList = [];
				        offerViewList.push(mainOfferViewObj);
				        protoPush.apply(offerViewList, quitMainOfferViewObjList);
				        var container = loader.multipleSubProdOfferHandler.subProdOfferOrderProviderMap.subProdOfferTreeContainer;
				        protoPush.apply(offerViewList, loader.createSubOfferViewObj(container));
				        ds = new BusCard.widget.grid.DataSource(offerViewList, cm);
				        var grid = new BusCardGrid({
					                cm : cm,
					                ds : ds
				                });
				        dojo.place(grid.domNode, loader.orderPreViewWidgetInstance.domNode, "last");
			        }
			        // 增加促销政策展示
			        var salePromotionObjList = [];
			        var bindingData = loader.salesPromotionOrderGrid.ds.getRawData();
			        var salesPromotionOrderGridDom = loader.salesPromotionOrderGrid.domNode;
			        var saleDataList = dojo.filter(bindingData, function(oneBindingData) {
				        var rowIndex = oneBindingData.rowIndex;
				        return dojo.query(".promotionNameDetail-" + rowIndex, salesPromotionOrderGridDom)[0].childNodes[0].checked;
			        });
			        dojo.forEach(saleDataList, function(data) {
				                var salePromotionObj = {
					                prodOfferType : "促销包",
					                prodOfferName : data.showData.promotionName,
					                startDate : data.showData.startDate,
					                endDate : data.showData.endDate,
					                actionName : data.showData.promotionStatus
				                }
				                salePromotionObjList.push(salePromotionObj);
			                })
			        if (salePromotionObjList.length > 0) {
				        ds = new BusCard.widget.grid.DataSource(salePromotionObjList, cm);
				        var grid = new BusCardGrid({
					                cm : cm,
					                ds : ds
				                });
				        dojo.place(grid.domNode, loader.orderPreViewWidgetInstance.domNode, "last");
			        }
			        
			        var dialog = util.WidgetHelper.createDialog({
				                inner : loader.orderPreViewWidgetInstance.domNode,
				                title : "订单预览",
				                height : "600",
				                width : "800"
			                });
			        dialog.show();
		        },
		        
		        /**
		         * 非集团成员不能订购集团产品的检测
		         * 简化查询客户的接口
		         * 简化查看是否是集团产品的接口
		         */
		        orderGroupProductCheck : function(id) {
		        	var loader = this;
			        var requestParam = dojo.global.$appContext$.get("requestParam");
			        var custIdVO = BusCard.$remote("custBO").queryById({
				                custId : requestParam.customerData.custId
			                });
			        var groupFlags = custIdVO.groupFlag;
			        if (!!groupFlags) {
				        if (groupFlags != "2") {
					        var offerProdRelaList = loader.route("spring:innerInterfaceBO/getOfferProdRelaList101", [{prodOfferId : id}]);
					        if ((!!offerProdRelaList)&&offerProdRelaList.length>0) {
						        var netType = offerProdRelaList[0].productInfoVO.netType;
						        if (netType == "12") {
							        alert("\u975e\u96c6\u56e2\u5ba2\u6237\u4e0d\u5141\u8bb8\u8ba2\u8d2d\u96c6\u56e2\u9500\u552e\u54c1");
							        return false;
						        }
					        }
				        }
				        
			        }
			        return true;
		        },
		        createSubOfferViewObj : function(container) {
			        var SYSDATE = dojo.global.$appContext$.requestParam.today
			        var offerViewList = [],
				        addViewList = [],
				        chgViewList = [],
				        delViewList = [],
				        protoPush = Array.prototype.push;
			        container.pageData = [];// 需要清空数据
			        container.saveSubProdOfferViewData();
			        for (var key in container.pageData) {
				        if (!container.pageData.hasOwnProperty(key)) {
					        continue;
				        };
				        var subOfferShowData = container.pageData[key];
				        // 先从表格数据中过滤一下无效的数据，及未选中，但是选择老号码的失效数据
				        var dataList = dojo.filter(container.subProdOfferOrderGrid.getData(), function(data) {
					                return data.showData.prodOfferStyle != "prod-offer-invalid";
				                })
				        if (!dojo.some(dataList, function(data) {
					                return key == data.showData.rowIndex;
				                })) {
					        continue;
				        }
				        // 计算changeKind
				        var ifHasOfferInst = dojo.some(container.subProdOfferOrderGrid.getData(), function(data) {
					        return data.prodOfferInst && data.prodOfferInst.prodOfferId == subOfferShowData.prodOfferId;
				        });
				        // 1、新增 2、变更 3、退订 4、页面未选中
				        if (subOfferShowData.checkBoxValue) {
					        var changeKind = ifHasOfferInst == true ? 2 : 1;
				        } else {
					        var changeKind = ifHasOfferInst == true ? 3 : 4;
				        }
				        // 计算时间
				        if (changeKind != 4) {
					        var dateObj = new orderaccept.prodofferaccept.ProductDateBuilder.NewMainProductDateBuilder(
					                {
						                "changeKind" : changeKind,
						                "delayUnit" : subOfferShowData.delayUnit,
						                "delayTime" : subOfferShowData.delayTime,
						                "validType" : subOfferShowData.validType,
						                "validPeriod" : subOfferShowData.validPeriod,
						                "today" : SYSDATE,
						                "beginDate" : subOfferShowData.beginDate,
						                "endDate" : subOfferShowData.endDate,
						                "delayUnorderUnit" : subOfferShowData.delayUnorderUnit,
						                "delayUnorderTime" : subOfferShowData.delayUnorderTime,
						                "ifChangeMainFlag" : subOfferShowData.ifChangeMainFlag
						                
					                });
					        var subOfferViewObj = {
						        prodOfferType : "可选包",
						        prodOfferName : subOfferShowData.prodOfferName,
						        startDate : dateObj.getBeginDate(),
						        endDate : dateObj.getEndDate(),
						        actionName : subOfferShowData.orderSatus
					        }
					        if (changeKind == 1) {
						        addViewList.push(subOfferViewObj);
					        } else if (changeKind == 2) {
						        chgViewList.push(subOfferViewObj);
					        } else {
						        delViewList.push(subOfferViewObj);
					        }
				        }
				        
			        }
			        protoPush.apply(offerViewList, addViewList);
			        protoPush.apply(offerViewList, chgViewList);
			        protoPush.apply(offerViewList, delViewList);
			        return offerViewList;
		        },
		        getOrderShowColumns : function() {
			        return cm = [{
				                cssStyle : "width:10%",
				                name : 'prodOfferType',
				                text : '销售品类型',
				                value : 'prodOfferType'
			                }, {
				                cssStyle : "width:30%",
				                name : 'prodOfferName',
				                text : '销售品名称',
				                value : "prodOfferName"
			                }, {
				                cssStyle : "width:25%",
				                name : 'startDate',
				                text : '生效时间',
				                value : 'startDate'
			                }, {
				                cssStyle : "width:25%",
				                name : 'endDate',
				                text : '失效时间',
				                value : 'endDate'
			                }, {
				                cssStyle : "width:10%",
				                name : 'actionName',
				                text : '操作类型',
				                value : 'actionName'
			                }

			        ];
		        },
		        
		        /**
		         * 生成调试用的时间(保存订单用)
		         */
		        getDebugDate : function(){
		        	var preTime = new Date().getTime();
		        	prodOfferAcceptLoader.specDataBuilder.process(prodOfferAcceptLoader.dataBuilder.process());
		        	var lastTime = new Date().getTime();
		        	if (lastTime - preTime > 100) {
		                var message = "\u4fdd\u5b58\u8ba2\u5355\u524d\u53f0\u6570\u636e\u6536\u96c6" + " cost time:"+ (lastTime - preTime);
		                if (console.log) {
			                console.log(/(\d+\:\d+\:\d+)/.exec(new Date().toString())[1]+">>"+message);
		                }
	                }
		        },
		        
		        /**
		         * 获取调试用的保存订单信息
		         */
		        getDebugData : function(){
		        	unieap.debug(prodOfferAcceptLoader.specDataBuilder.process(prodOfferAcceptLoader.dataBuilder.process()));
		        },
		        
		        /**
		         * 获取调试的帮助
		         */
		        getDebugHelp : function(){
		        	unieap.debug({
		        		easyDebug : '&servicecardcc=0&dojomodulecc=0&attrcardcc=0'+"--->>\u8c03\u7528\u975e\u538b\u7f29\u7684js",
		        		dateDebug : '&debugModule=1&servicecardcc=0&dojomodulecc=0&attrcardcc=0'+"--->>\u8c03\u8bd5\u9875\u9762\u52a0\u8f7d\u65f6\u95f4",
		        		getDebugDate : 'getDebugDate'+"--->>\u4fdd\u5b58\u8ba2\u5355\u524d\u53f0\u6570\u636e\u6536\u96c6\u8017\u65f6",
		        		getDebugData : 'getDebugData'+"--->>\u4fdd\u5b58\u8ba2\u5355\u524d\u53f0\u6570\u636e\u6536\u96c6",
		        		getAllHref : window.location.href+'&servicecardcc=0&dojomodulecc=0&attrcardcc=0'
		        	});
		        },
		        
		        initOrderPreView : function() {
			        this.orderPreViewWidgetInstance = new orderaccept.prodofferaccept.widget.mainprodoffer.orderPreViewWidget();
		        },
		        appendOfferFilterParameters : function() {
			        return "";
		        }
		        
	        }

	        );
        });