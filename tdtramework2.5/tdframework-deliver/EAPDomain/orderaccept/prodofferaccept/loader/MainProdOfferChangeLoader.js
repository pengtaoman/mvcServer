defineModule(
        "orderaccept.prodofferaccept.loader.MainProdOfferChangeLoader",
        ["orderaccept.common.js.ConstantsPool", "../util", "./ProdOfferNewLoader",
                "../widget/servicecard/ServiceCardWidget", "../widget/resourcecard/ResourceCardWidget",
                "../widget/attrcard/ProductAttrCardWidget", "../widget/attrcard/ProductOfferAttrCardWidget",
                "../../custom/TooltipDialog", "../formatter/FormatterProvider",
                "../builder.prodofferdetail.ProdOfferDetailBuilder", "../widget/commcard/CommCardWidget",
                "../builder/subprodoffergrid/SubProdOfferCartDataProvider", "../OrderShowLoader",
                "../formatter/PromotionFormatterProvider", "../builder/promotiondetail/PromotionDetailBuilder",
                "../builder/promotiongrid/PromotionCartDataProvider", "unieap.layout.AccordionContainer",
                "unieap.layout.AccordionPane", "../widget/commheader/CommHeaderWidget", "unieap.layout.BorderContainer"],
        function(ConstantsPool, util, ProdOfferNewLoader, ServiceCardWidget, ResourceCardWidget, ProductAttrCardWidget,
                ProductOfferAttrCardWidget, TooltipDialog, FormatterProvider, ProdOfferDetailBuilder, CommCardWidget,
                SubProdOfferCartDataProvider, OrderShowLoader, PromotionFormatterProvider, PromotionDetailBuilder,
                PromotionCartDataProvider) {
	        /**
			 * 定义变更主销售品整体控制器
			 * 
			 * @class
			 * @extends
			 */
	        dojo.declare("orderaccept.prodofferaccept.loader.MainProdOfferChangeLoader", [ProdOfferNewLoader], {
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
		        
		        beanBuildFactory : null,
		        
		        dataBuilder : null,
		        
		        productAttrCardWidgetClass : ProductAttrCardWidget,
		        
		        ProductOfferAttrCardWidgetClass : ProductOfferAttrCardWidget,
		        
		        serviceCardWidgetClass : ServiceCardWidget,
		        
		        resourceCardWidgetClass : ResourceCardWidget,
		        
		        mainProdOfferWidget : null,
		        
		        mainProdOfferDetailWidget : null,
		        
		        payRelationWidgetClass : null,
		        
		        payRelationWidgetInstance : null,
		        
		        subProdOfferOrderGridClass : null,
		        
		        subProdOfferOrderGrid : null,
		        
		        viaInfoCardWidget : null,
		        
		        orderInfoCardWidget : null,
		        
		        functionNavigatorWidget : null,
		        
		        functionNavigatorWidgetClass : null,
		        
		        subProdOfferTree : null,
		        
		        orderShowLoader : null,
		        
		        subProdOfferCartDataProvider : null,
		        
		        peddleProdOfferListWidgetClass : null,
		        
		        hotProdOfferListWidgetClass : null,
		        
		        personalCollectListWidgetClass : null,
		        
		        personalSubCollectListWidgetClass : null,
		        
		        salesPromotionOrderGridClass : null,
		        
		        salesPromotionOrderGrid : null,
		        
		        promotionDetailBuilder : null,
		        
//		        promotionCartDataProvider : null,
		        
		        ShoppingCartWidgetClass : null,
		        
		        shoppingCartWidgetInstance : null,
		        
		        constructor : function(param) {
			        
			        this.requestParam = param;
			        
			        this.mainProdOfferWidget = null;
			        
		        },
		        postscript : function() {
			        return this.inherited(arguments);
		        },
		        _asynCallback : function() {
			      //  this.inherited(arguments);
			        var controller = this,
				        args = arguments,
				        cb = function() {
					        return controller.inherited(args);
				        };
			        controller.initUserHasProdOfferData(cb);
			        
			        controller.initCustomerOrderPromotionData();
		        },
		        registerClass : function() {
			        this.inherited(arguments);
			        this.mainProdOfferWidgetClass = orderaccept.prodofferaccept.widget.mainprodofferchangemain.ChgMainProdOfferWidget;
		        },
		        getBelongCode : function() {
		        	//区域初始化过并且是cdma单套餐,从选择框中获取
		        	if(this.belongCodeHasInit){
						return dojo.byId("common-belongcode").value;        	
		        	}
			        // 1.获取区域
			        var loader = this,
				        belongcode = null,
				        accessProdInstList = BusCard.jsonPath(dojo.global.$appContext$.get("userHasProdOfferInfoList")
				                        || [], "$[*].prodInstList[?(@.serviceRelationVO!=null)]");
			        if (accessProdInstList && accessProdInstList.length > 0) {
				        belongcode = accessProdInstList[0].serviceRelationVO.belongCode;
			        }
			        if (!belongcode) {
				        var prodInstList = BusCard.jsonPath(dojo.global.$appContext$.get("userHasProdOfferInfoList")
				                        || [], "$[*].prodInstList[?(@.commonRegionId!=null)]");
				        belongcode = prodInstList && prodInstList[0] && prodInstList[0].commonRegionId;
				        
			        }
			        return belongcode;
			        
		        },
		        /**
		         * 判断原有的套餐是否C网单套餐
		         */
		        isSingleAndCdmaFlag:function(){
		        		var mainProdOfferInstVO  = $ac$.get("mainProdOfferInstVO");
		        		var oldProdOfferBasicInfo = util.ProdOfferHelper.getProdOfferDetail(mainProdOfferInstVO.prodOfferId,{
		        			permitFromCache:true,
		        			interfaceType:1
		        		});
		        		return oldProdOfferBasicInfo.bindType==0&&(function(){
		        			var prodInstList =mainProdOfferInstVO&&mainProdOfferInstVO.prodInstList;	
		        			var serviceRelation = BusCard.jsonPath(prodInstList||[],"$[*].serviceRelationVO");
		        			serviceRelation = serviceRelation&&serviceRelation[0];
		        			return (serviceRelation&&serviceRelation.serviceKind==8);
		        		}());
		        } ,
		        /**
				 * 设置区域值，并将其置灰，不可选择的状态
				 */
		        disableBelongCode : function() {
			        // 1.获取区域
			        var belongcode = this.getBelongCode();
			        // 2.给区域赋值，并且将区域置为不可以操作
			        if (belongcode != null) {
				        dojo.byId("common-belongcode").value = belongcode;
				        if(!this.isSingleAndCdmaFlag()){
				        	  dojo.byId("common-belongcode").disabled = "disabled";
				        }
				        // 由于区域可能取的是乡镇的编码,这里取乡镇上一级的区域
				        try {
					        var commonRegionDAOStub = BusCard.$remote("commonRegionDAO", "om");
					        var commonRegionVO = commonRegionDAOStub.getCommonRegionVO(parseInt(belongcode + ""));
					        if (commonRegionVO.regionLevel == 5) {
						        dojo.byId("common-belongcode").value = commonRegionVO.upRegionId;
					        }
				        }
				        catch (e) {

				        }
				        
			        }
			        this.belongCodeHasInit = true;
		        },
		        /**
				 * 初始化变更主销售品的数据,异步处理
				 * 
				 * @method
				 */
		        initUserHasProdOfferData : function(cb) {
			        var loader = this,
				        oldMainprodOfferInstId = loader.requestParam.prodOfferInstId;
			        this.route("spring:prodOfferSaleDataBO/getUserProdOfferListByProdOfferInstId", [oldMainprodOfferInstId,null,
			                        function(prodOfferData) {
			                        	
				                        dojo.global.$appContext$.set("userHasProdOfferInfoList", prodOfferData);
				                        var prodOfferInstId = $ac$.get("requestParam").prodOfferInstId;
				                        $ac$.set("mainProdOfferInstVO", BusCard.jsonPath(prodOfferData,
				                                        "$[?(@.prodOfferInstId==" + prodOfferInstId + ")]")[0]);
				                        loader.disableBelongCode();
				                        //当实例加载完后开始渲染主销售品,主要为了实现销售品过滤功能
				                        loader.renderMainProdOfferTree();
				                        if (cb) { return cb.apply(loader, arguments); }
			                        }]);
			        
			        // BusCard.doGet(BusCard.path.contextPath +
			        // "/orderDetailAction.do", {
			        // method :
			        // "doGetProdOfferListForChgMainProvider",
			        // prodOfferInstId : oldMainprodOfferInstId
			        // }, true, function(prodOfferData) {
			        // dojo.global.$appContext$.set("userHasProdOfferInfoList",
			        // prodOfferData.userHasProdOfferInfoList);
			        // dojo.global.$appContext$.set("userHasProdOfferMetaInfoList",
			        // prodOfferData.userHasProdOfferMetaInfoList ||
			        // []);
			        // loader.disableBelongCode();
			        
			        // });
			        
		        },
		        /**
				 * 异步加装的模块,这里的模块要尽量保证其所依赖的模块已经加装完毕
				 * 
				 * @method
				 */
		        _asynLoadSriptList : function() {
			        
			        return ["orderaccept.prodofferaccept.behavior.MainProdOfferChgBehavior",
			                "orderaccept.prodofferaccept.data.MainProdOfferChgDataBuilder",
			                "orderaccept.prodofferaccept.data.SpecialDataHandler",
			                "orderaccept.prodofferaccept.check.MainProdOfferChgCheck",
			                "orderaccept.prodofferaccept.rule.MainProdOfferChgRule",
			                "orderaccept.prodofferaccept.widget.payrelation.PayRelationWidget",
			                "orderaccept.custom.Grid", "orderaccept.custom.BusCardGrid",
			                "orderaccept.prodofferaccept.widget.mainprodofferchangemain.ChgMainProdOfferWidget",
			                "orderaccept.prodofferaccept.widget.prodofferfavoritelist.peddleProdOfferListWidget",
			                "orderaccept.prodofferaccept.widget.prodofferfavoritelist.hotProdOfferListWidget",
			                "orderaccept.prodofferaccept.widget.prodofferfavoritelist.personalCollectListWidget",
			                "orderaccept.prodofferaccept.widget.prodofferfavoritelist.personalSubCollectListWidget",
			                "orderaccept.prodofferaccept.widget.functionnavigator.FunctionNavigatorWidget",
			                "orderaccept.prodofferaccept.loader.OldUserAddedHandler",
			                "orderaccept.prodofferaccept.loader.MultipleSubProdOfferHandler",
			                "orderaccept.prodofferaccept.widget.messagetips.ProdOfferInfoTipsWidget",
			                "orderaccept.prodofferaccept.widget.messagetips.WarmTipsWidget",
			                "orderaccept.prodofferaccept.widget.messagetips.CollectTipsWidget",
			                "orderaccept.prodofferaccept.widget.manageaccnbrwidget.ManageAccNbrWidget",
			                "orderaccept.prodofferaccept.widget.messagetips.ProdOfferAcceptTipsWidget",
			                "orderaccept.prodofferaccept.widget.memberprodoffer.MemberProdOfferPickWidget",
			                "orderaccept.prodofferaccept.widget.commheader.AdvanceSearchWidget",
			                "orderaccept.custom.popup", "orderaccept.prodofferaccept.widget.batchnew.BatchNewWidget",
			                "orderaccept.prodofferaccept.widget.shoppingcart.ShoppingCartWidget"];
			        
		        },
		        renderMainProdOfferTree:function(){
		        	if(!$ac$.get("mainProdOfferInstVO")){
		        		return false;
		        	}else{
		        		return this.inherited(arguments);
		        	}
		        
		        },
		        initBehavior : function() {
			        this.behaviorInstance = new orderaccept.prodofferaccept.behavior.MainProdOfferChgBehavior(this);
			        
		        },
		        initCheck : function() {
			        this.checkInstance = new orderaccept.prodofferaccept.check.MainProdOfferChgCheck(this);
			        
		        },
		        buildSubProdOfferTreeURL : function(id,uniqueId) {
			        var userHasProdOfferIdList = [];
			        dojo.forEach(dojo.global.$appContext$.get("userHasProdOfferInfoList") || [], function(
			                        userHasProdOfferInfo) {
				                return userHasProdOfferIdList.push(userHasProdOfferInfo.prodOfferId);
			                });
			        return BusCard.path.contextPath
			                + "/orderDetailAction.do?method=getProdOfferTreeForChg&prodOfferId=" + id
			                + "&userHasProdOfferIdList=" + dojo.toJson(userHasProdOfferIdList)
			                + "&memOfferList=" + this.getMemberProdOfferIds(uniqueId)
			                + "&commonRegionId="+(this.getBelongCode()||"")
			                + "&accProdListStr="+this.getAccProdIdList(uniqueId);
		        },
		        
		        // 促销政策目录树请求路径
		        // buildPromotionTreeURL : function(prodOfferIdList,
		        // productIdList, belongCode) {
		        //
		        // },
		        /**
				 * 根据新的销售品ID重新生成基础包相关视图
				 * 
				 * @param {String} id 主销售品id
				 */
		        renderMainProdOffer : function(id) {
			        return this.inherited(arguments);
		        },
		        /**
				 * 根据新的销售品ID生成新的销售品受理视图
				 * 
				 * @method
				 */
		        changeMainProdOffer : function(id, acceptSource, independenceConfirm) {
			        if (!this.checkInstance.doCheckBeforeClickMainProdOffer(id)) { return; }
			        return this.inherited(arguments);
		        },
		        
		        renderShoppingCart : function() {
			        var loader = this;
			        if (this.shoppingCartWidgetInstance) {
				        this.shoppingCartWidgetInstance.destroyRecursive();
			        }
			        util.MainProdOfferChangeHelper.getInstance({
				        prodOfferId : this.mainProdOfferId,
				        callback : function(processId, currentMainProdOfferInfoVO) {
					        loader.shoppingCartWidgetInstance = new loader.ShoppingCartWidgetClass();
					        // render
					        dojo.place(loader.shoppingCartWidgetInstance.domNode,
					                unieap.byId("shoppingCartPane").containerNode, "first");
				        }
			        }).dispatch();
			        
		        },
		        
		        /**
				 * 展示购物车中的数据(外部调用)
				 */
		        showSubProdOfferCart : function(subProdOfferCartDataProvider) {
		        	//区分成员销售品还是单的，处理特殊场景
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
				 * 初始化区域
				 * 
				 * @method
				 */
		        renderBelongCode : function() {
			        BusCard.$rs(dojo.byId("common-belongcode"), this.requestParam.regionCodeColl.list);
			        
		        },
		        /**
				 * 初始化服务卡片
				 * 
				 * @param {String} uniqueId
				 * @param {Function} cb
				 * @method
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
					        if (_cb) {
						        _cb.apply(null, arguments);
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
					        
				        },
				        param = dojo._toArray(arguments);
			        param[1] = cb;
			        return this.inherited(arguments, param);
			        
		        },
		        _findProperProdOfferByUniqueId : function(uniqueId) {
			        var selectedMemberProdOfferList = $ac$.get("selectedMemberProdOfferList");
			        var selectedMemberInfo = BusCard.jsonPath(selectedMemberProdOfferList, "$[?(@.uniqueId=="
			                        + uniqueId + ")]")[0];
			        if (!selectedMemberInfo.permitEnterComb
			                && (selectedMemberInfo.prodInstId || selectedMemberInfo.prodOfferInstId)) {
				        return util.ProdOfferHelper.loadAndSetProdOffer(selectedMemberInfo.prodOfferId);
			        } else {
				        return this.inherited(arguments);
			        }
			        
		        },
		        /**
				 * 初始化产品属性
				 * 
				 * @method
				 */
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
						        dojo.forEach(this.productInfoVO.attrList, function(attrVO) {
							                if (!!attrValueObj[attrVO.attrCd]) {
								                var convertValue = attrValueObj[attrVO.attrCd];
								                if (!!attrVO && !isNaN(convertValue)) {
									                if (attrVO.valueUnit == util.AttrUnitConst.unitConst
									                        || attrVO.valueUnit == util.AttrUnitConst.minuteConst) {
										                attrValueObj[attrVO.attrCd] = parseFloat(attrValueObj[attrVO.attrCd]
										                        + "")
										                        / 100;
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
		        initDataBuilder : function() {
			        this.dataBuilder = new orderaccept.prodofferaccept.data.MainProdOfferChgDataBuilder(this);
			        
		        },
		        
		        initCustomerOrderPromotionData : function(){
		        	var custId = this.requestParam.customerData.custId;
		        	var customerOrderData = util.ServiceFactory
			                .getService("url:prodOfferSaleAjaxAction.do?method=getCustomerOrderInfo&custId=" + custId);
			        dojo.global.$appContext$.set("orderPromotionList", customerOrderData.orderPromotionList || []);
		        },
		        
		        /**
				 * 抽取原有的订购信息,主要包括主套餐,产品信息
				 * 
				 * @method
				 */
		        extractOldOrderedInfo : function() {
			        var userHasProdOfferInfoList = $ac$.get("userHasProdOfferInfoList"),
				        mainProdOfferInstVO = $ac$.get("mainProdOfferInstVO"),
				        resultObj = {},
				        relationType = ConstantsPool.load("OfferInstRelaTypeConst").OfferInstRelaTypeConst.OFFER_COMB_MEMBER,
				        offerInstRelaList = mainProdOfferInstVO.offerInstRelaList || [],
				        mainMemberRelaList = dojo.filter(offerInstRelaList, function(rela) {
					                return rela.relationTypeCd == relationType;
				                }) || [],
				        getMemberOfferInstVO = function(prodOfferInstId) {
					        return dojo.filter(userHasProdOfferInfoList, function(instVO) {
						                return instVO.prodOfferInstId == prodOfferInstId;
						                
					                })[0];
					        
				        };
			        // main prodoffer id
			        resultObj["prodOfferId"] = mainProdOfferInstVO.prodOfferId+"";
			        // memeber info List
			        resultObj.memberInfoList = mainMemberRelaList.length ? dojo.map(mainMemberRelaList, function(rela) {
				                var memberOfferInstVO = getMemberOfferInstVO(rela.relatedProdOfferInstId);
				                return {
					                productId : memberOfferInstVO.prodInstList[0].productId+"",
					                prodOfferId : memberOfferInstVO.prodOfferId+""
				                };
				                
			                }) : dojo.map(mainProdOfferInstVO.prodInstList, function(prodInstVO) {
				                return {
					                productId : prodInstVO.productId+""
				                };
			                });;
			        
			        return resultObj;
			        
		        },
		        appendOfferFilterParameters : function() {
			        var orderedInfo = this.extractOldOrderedInfo();
			        return "&orderedInfoJsonData=" + dojo.toJson(orderedInfo);
		        }
	        });
        });