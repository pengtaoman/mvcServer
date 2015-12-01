defineModule("orderaccept.prodofferaccept.loader.PreAcceptOrderLoader", ["../util",
                "./ProdOfferNewLoader"],
        function(util, ProdOfferNewLoader) {
            /**
			 * 定义换受理整体控制器
			 * 
			 * @class
			 * @extends
			 */    	
            dojo.declare("orderaccept.prodofferaccept.loader.PreAcceptOrderLoader",[ProdOfferNewLoader],{
		        layoutTemplateUrl : dojo.moduleUrl("orderaccept.prodofferaccept", "view/preAcceptOrderLayout.html"),
				constructor : function(param) {
					param.actionCD = util.ACTION_CD_CONST.PRODUCT_INSTALL;
					var parameters = "method=getProAcceptOrderInfo&preRgsNo=" + param.preRgstNo;					
				    this.preAcceptOrderVO = util.ServiceFactory.getService("url:preAcceptAction.do?" + parameters);	
				    var preAcceptOfferList = BusCard.$remote("preAcceptBO").getPreAcceptOfferInfoList({"preRgstNo":param.preRgstNo});
				    this.preAcceptOfferVO = dojo.filter(preAcceptOfferList,function(preInfoVO){
				    							return preInfoVO.offerType == 1;
				  						  })[0];
				    this.preAcceptPromotionVO = dojo.filter(preAcceptOfferList,function(preInfoVO){
				    							return preInfoVO.offerType == 3;
				  						  })[0];
			        this.requestParam = param; 
			        this.mainProdOfferWidget = null;
		        },		                
                postscript : function() {
                	var loader = this;				    				                
	                this.inherited(arguments);
                },
		        /**
				 * 初始化一些实例变量和页面
				 * 
				 * @method
				 */
		        init : function() {
			        
			        this.serviceCardWidgetMap = {};
			        
			        this.captureEventRegistry();
			        
			        this.renderLayout();
			        
			        util.navigatorManager.to("mainProdOfferSelectPane")(function() {
				                dojo.byId("function-navigator-root").style.display = "none";
			                });
			        
		        },
		        /**
				 * 异步加载的模块,这里的模块要尽量保证其所依赖的模块已经加装完毕
				 * 
				 * @method
				 */
		        _asynLoadSriptList : function() {
			        
			        return ["orderaccept.prodofferaccept.behavior.PreAcceptOrderBehavior",
			                "orderaccept.prodofferaccept.data.PreAcceptOrderDataBuilder",
			                "orderaccept.prodofferaccept.data.SpecialDataHandler",
			                "orderaccept.prodofferaccept.check.PreAcceptOrderCheck",
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
			        // do render work below
			        controller.initSpecialDataBuilder();
			        			        
			        // 渲染促销政策查询模板
			        controller.renderPromotionLayout();
			        
			        // 渲染促销政策订购列表
			        controller.renderPromotionOrderGrid();
			        
			        // 初始化支付关系
			        controller.renderPayRelation();
			        
			        // 初始化功能导向
			        controller.initFunctionNavigatorWidget();
			        // 初始化订单信息
			        controller.initOrderInfoWidget();
			        // 初始化经办人信息
			        controller.initViaInfoWidget();
			        // 初始化账号创建信息
			        // controller.initManageAccWidget();
			        // 初始化一些全局处理
			        controller.initGlobalHelper();
			        
			        // 初始化自主版或加装包套餐时可选包受理
			        controller.initMultipleSubProdOfferHandler();
			        
			        // 初始化全局销售品提示框.温馨提示框
			        controller.initTipsWidgets();
			        // 初始化等待条
			        controller.initWaitingBar();
			        
			        // 触发onload 事件
			        controller.fireEvent("onload");			        
		        
				    controller.changeMainProdOffer(controller.preAcceptOfferVO.prodOfferId);
                },                
		        /**
				 * 初始化对应的行为子模块实例
				 * 
				 * @method
				 */
		        initBehavior : function() {
			        this.behaviorInstance = new orderaccept.prodofferaccept.behavior.PreAcceptOrderBehavior(this);
			        
		        },
		        /**
				 * 初始化对应的检测子模块实例
				 * 
				 * @method
				 */
		        initCheck : function() {
			        this.checkInstance = new orderaccept.prodofferaccept.check.PreAcceptOrderCheck(this);
			        
		        },
		        /**
				 * 初始化对应的数据收集子模块实例
				 * 
				 * @method
				 */
		        initDataBuilder : function() {
			        this.dataBuilder = new orderaccept.prodofferaccept.data.PreAcceptOrderDataBuilder(this);
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
				                	unieap.byId("shoppingCartPane").domNode.style.display = 'none';					                
				                });
				        
				        this.removeResourcesBinding();
				        
				        this.selectedProdOfferId = id;
				        
				        var loader = this;
				        
				        // unieap.byId("globalLayoutContainer").selectChild("prodOfferAcceptPane");
				        
				        // 重新渲染基础包视图
				        loader.renderMainProdOffer(id);
				        
				        // 默认打开基础销售品和可选受理面板
				        loader.openProdOfferAcceptPane();
				        
				        var delayCallback = function() {
					        // 渲染可选包信息
					        loader.multipleSubProdOfferHandler.doMultipleSubProdOfferFilter(id);
					        
					        // 渲染促销政策树
					        loader.renderPromotionTree(id);
					        
					        // loader.renderPromotion(id);
					        
					        // 关闭主套餐选择面板
					        loader.closeMainProdOfferAcceptPane();
					        
				        };
				        // 短暂延迟处理耗时比较长的业务逻辑,主要解决IE在并发XMLHTTPRequest过多情况下容易造成页面假死现象
				        setTimeout(function() {
					                // 重新加载所有的服务信息
					                loader.addAllServiceCardWidgets(delayCallback);
					                
				                }, 1);		
				        if(!!loader.preAcceptPromotionVO && !!loader.preAcceptPromotionVO.prodOfferId){
			        		loader.behaviorInstance.showSalesPromotion(loader.preAcceptPromotionVO.prodOfferId);
				        }
				        
			        }
			        catch (e) {
				        BusCard.showErrorStack(e);
				        this.clear();
				        throw e;
			        }
			        
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
				                        interfaceType : 4
			                        }, function(prodOfferInfoVO) {
				                        // set global properties
				                        $ac$.set("currentMainProdOfferInfoVO", prodOfferInfoVO);
				                        // create widget instance
				                        loader.shoppingCartWidgetInstance = new loader.ShoppingCartWidgetClass(loader
				                                .prepareShoppingCartInitData());
				                        // render
				                        dojo.place(loader.shoppingCartWidgetInstance.domNode, unieap
				                                        .byId("shoppingCartPane").containerNode, "first");
				                        var memberProdTRS = dojo.query(".member-product-tr",loader.shoppingCartWidgetInstance.domNode);
				                        dojo.forEach(memberProdTRS,function(memberProdTR){
				                        	var memberProductId = memberProdTR.getAttribute("productid");
				                        	var prodChkBox = dojo.query(".member-product-checkbox",memberProdTR)[0]; 
				                        	var prodSelect = dojo.query(".product-select",memberProdTR)[0]; 
				                        	var prodOfferSelect = dojo.query(".memeber-prodoffer-select",memberProdTR)[0]; 				                        	
				                        	if( loader.preAcceptOrderVO.productId == memberProductId){
				                        		prodChkBox.checked = true;
				                        		prodSelect.value = loader.preAcceptOrderVO.productId ;
				                        		prodOfferSelect.value = loader.preAcceptOfferVO.prodOfferId;
				                        	}else{
				                        		prodChkBox.checked = false;
				                        	}
			                        		prodChkBox.disabled = true;
			                        		prodSelect.disabled = true;
			                        		prodOfferSelect.disabled = true;
				                        });
				                        
			                        }]);
			        
		        },	
		        getBelongCode : function() {
			        return this.preAcceptOrderVO.belongCode;
		        }
            });
	});