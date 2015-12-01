defineModule("orderaccept.prodofferaccept.loader.MemberProdOfferAcceptLoader", ["./ProdOfferChangeLoader", "../util",
                "orderaccept.common.js.ConstantsPool"], function(ProdOfferChangeLoader, util, ConstantsPool) {
	        var className = "orderaccept.prodofferaccept.loader.MemberProdOfferAcceptLoader";
	        /**
			 * 定义自助版套餐成员受理处理类
			 * 
			 * @class
			 */
	        dojo.declare(className, [ProdOfferChangeLoader], {
		        shoppingCardWidgetClass : null,
		        shoppingCartWidgetInstance : null,
		        mainProdOfferId : null,
		        _asynLoadSriptList : function() {
			        var _list = this.inherited(arguments),
				        // maw =
				        // "orderaccept.prodofferaccept.widget.memberprodoffer.MemberProdOfferPickWidget",
				        shoppingCartWidgetClass = "orderaccept.prodofferaccept.widget.shoppingcart.ShoppingCartWidget",
				        behaviorClass = "orderaccept.prodofferaccept.behavior.MemberProdOfferAcceptBehavior",
				        checkClass = "orderaccept.prodofferaccept.check.MemberProdOfferAcceptCheck",
				        mainProdOfferWidgetClass = "orderaccept.prodofferaccept.widget.mainprodofferchange.MemberProdOfferChangeWidget",
				        mainProdOfferChangeWidgetClass = "orderaccept.prodofferaccept.widget.mainprodofferchange.MainProdOfferChangeWidget";
			        _list.unshift(mainProdOfferChangeWidgetClass);
			        _list.push(shoppingCartWidgetClass);
			        _list.push(behaviorClass);
			        _list.push(checkClass);
			        _list.push(mainProdOfferWidgetClass);
			        return _list;
			        
		        },
		        
		        
		        /**
				 * @override
				 * @method
				 */
		        initBehavior : function() {
			        this.behaviorInstance = new orderaccept.prodofferaccept.behavior.MemberProdOfferAcceptBehavior(this);
		        },
		        /**
				 * @override
				 * @method
				 */
		        initCheck : function() {
			        this.checkInstance = new orderaccept.prodofferaccept.check.MemberProdOfferAcceptCheck(this);
		        },
		        /**
				 * @override
				 * @method
				 */
		        _asynCallback : function() {
			        this.inherited(arguments);
			        this.registerShoppingCardWidgetClass();
			        this.registerMainProdOfferWidgetClass();
			        this.asyncLoadData();
			        
		        },
		        registerShoppingCardWidgetClass : function() {
			        this.shoppingCardWidgetClass = orderaccept.prodofferaccept.widget.shoppingcart.ShoppingCartWidget;
			        
		        },
		        registerMainProdOfferWidgetClass : function() {
			        this.mainProdOfferWidgetClass = orderaccept.prodofferaccept.widget.mainprodofferchange.MemberProdOfferChangeWidget;
			        
		        },
		        /**
				 * 异步请求数据
				 * 
				 * @method
				 */
		        asyncLoadData : function() {
			        var rp = $ac$.get("requestParam"),
				        loader = this,
				        relationType = ConstantsPool.load("ItemRelationTypeConst").ItemRelationTypeConst.OFFER_COMB_MEMBER;
			        // async get inst data
			        this.route("spring:prodOfferSaleDataBO/getUserProdOfferListByProdOfferInstId", [rp.prodOfferInstId,null,
			                        function(offerInstList) {
				                        $ac$.set("userHasProdOfferInfoList", offerInstList);
				                        var mainProdOfferInstVO = BusCard.jsonPath(offerInstList,
				                                "$[?(@.prodOfferInstId==" + rp.prodOfferInstId + ")]")[0];
				                        loader.setAcceptMainProdOfferId(mainProdOfferInstVO.prodOfferId);
				                        $ac$.set("mainProdOfferInstVO", mainProdOfferInstVO);
				                        // async get spec data
				                        loader.route("spring:innerInterfaceBO/getProdOfferInfo", [{
					                                        prodOfferId : mainProdOfferInstVO.prodOfferId,
					                                        interfaceType : 4,
					                                        commonRegionId : mainProdOfferInstVO.commonRegionId||loader.getBelongCode()
				                                        }, function(mainProdOfferInfoVO) {
					                                        $ac$.set("currentMainProdOfferInfoVO", mainProdOfferInfoVO);
					                                        $ac$
					                                                .set("selectedMainProdOfferInfoVO",
					                                                        mainProdOfferInfoVO);
					                                        $ac$.set("prodOfferList", [mainProdOfferInfoVO]);
					                                        loader.onDataReady();
					                                        BusCard.removeCoverLayer();
				                                        }]);
				                        
			                        }

			                ])
			        
		        },
		        
		        setAcceptMainProdOfferId : function(id) {
			        this.mainProdOfferId = id;
		        },
		        
		        onDataReady : function() {
			        this.shoppingCartWidgetInstance = new this.shoppingCardWidgetClass();
			        dojo.place(this.shoppingCartWidgetInstance.domNode, unieap.byId("shoppingCartPane").containerNode,
			                "first");
			        
		        },
		        /**
				 * 填写订单详情信息
				 * 
				 * @method
				 */
		        beginOrder : function() {
			        util.navigatorManager.to("prodOfferAcceptPane")(function() {
				                dojo.byId("function-navigator-root").style.display = "block";
				                unieap.byId("shoppingCartPane").domNode.style.display = 'none';
				                
			                });
			        return this[$ac$.get("processId")].apply(this, arguments);
		        },
		        sharedMemberChange : function() {
			        
			        this.mainProdOfferWidgetClass = orderaccept.prodofferaccept.widget.mainprodofferchange.MainProdOfferChangeWidget;
			        
			        var mainProdOfferInstVO = $ac$.get("mainProdOfferInstVO"),
				        prodOfferId = mainProdOfferInstVO.prodOfferId,
				        controller = this,
				        userHasProdOfferInfoList = $ac$.get("userHasProdOfferInfoList");
			        userHasProdOfferIdList = dojo.filter(dojo.map(userHasProdOfferInfoList, function(v) {
				                        return v.prodOfferId
			                        }), function(id) {
				                return id != prodOfferId
			                });
			        controller.closeMainProdOfferAcceptPane();
			        // 打开页面的面板
			        controller.openProdOfferAcceptPane();
			        // 生成主销售品视图
			        controller.buildMainProdOfferView();
			        
			        controller.recoveryOrderInfo();
			        // 短暂延迟处理耗时比较长的业务逻辑,主要解决IE在并发XMLHTTPRequest过多情况下容易造成页面假死现象
			        setTimeout(function() {
				                util.ServiceFactory.getService(
				                        "url:orderDetailAction.do?method=doGetUserHasSpecSubProdOfferList&prodOfferId="
				                                + prodOfferId+"&commonRegionId="+(controller.getBelongCode()||""), function(prodOfferList) {
					                        Array.prototype.push.apply($ac$.get("prodOfferList"), prodOfferList || []);
					                        dojo.global.$appContext$.set("userHasProdOfferMetaInfoList", $ac$
					                                        .get("prodOfferList"));
					                        util.ProdOfferInstProvider.getProdOfferDataForChg();
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
					                        
				                        }, {
					                        content : userHasProdOfferIdList,
					                        method : "post"
				                        });
			                }, 1)
		        },
		        independenceMemberChange : function() {
			        var controller = this;
			        controller.closeMainProdOfferAcceptPane();
			        // 打开页面的面板
			        controller.openProdOfferAcceptPane();
			        
			        // 生成主销售品视图
			        controller.buildMainProdOfferView();
			        
			        controller.recoveryOrderInfo();
			        // 短暂延迟处理耗时比较长的业务逻辑,主要解决IE在并发XMLHTTPRequest过多情况下容易造成页面假死现象
			        setTimeout(function() {
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
				                
			                }, 1);
			        
		        },
		        initProdOfferData : function() {
			        return false;
			        
		        },
		        /**
				 * 生成主销售品视图
				 * 
				 * @override
				 * @method
				 */
		        buildMainProdOfferView : function() {
			        
			        return this.inherited(arguments);
		        },
		        getBelongCode : function() {
			        return $ac$.query("$.userHasProdOfferInfoList[*].prodInstList[*].serviceRelationVO.belongCode")[0];
			        
		        }
		        
	        });
	        
        });