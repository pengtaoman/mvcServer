defineModule("orderaccept.prodofferaccept.loader.MultipleSubProdOfferHandler", ["orderaccept.base.Controller",
                "../util", "unieap.layout.TabContainer", "unieap.layout.ContentPane",
                "../builder/subprodoffergrid/SubProdOfferCartDataProvider",
                "orderaccept.prodofferaccept.widget.mainprodoffer.MultipleMainProdOfferWidget",
                "../builder/prodofferdetail/MainProdOfferDetailBuilder"], function(Controller, util, TabContainer,
                ContentPane, SubProdOfferCartDataProvider, MultipleMainProdOfferWidget, MainProdOfferDetailBuilder) {
	        
	        dojo.declare("orderaccept.prodofferaccept.loader.MultipleSubProdOfferHandler", [Controller], {
		        /**
				 * 销售品受理主控制器
				 * 
				 * @field
				 */
		        controller : null,
		        subProdOfferTabContainer : null,
		        subProdOfferOrderProviderMap : {},
		        multipleSubProdOfferContentTemplate : dojo.cache("orderaccept.prodofferaccept.view",
		                "multipleSubProdOfferLayout.html"),
		        constructor : function(controller) {
			        this.controller = controller;
		        },
		        _getMainProdOfferList : function() {
			        // var prodOfferInfoVO =
			        // util.ProdOfferHelper.getMainProdOffer($ac$
			        // .get("prodOfferList"))[0],
			        var getParentWithTagName = function(tagName, node) {
				        var parent = node.parentNode;
				        while (parent && parent != parent.parent) {
					        if (parent.tagName.toUpperCase() == tagName.toUpperCase()) {
						        return parent;
					        } else {
						        parent = parent.parentNode;
					        }
				        }
			        },
				        memberProdOfferList = dojo.map(dojo.query(".member-main-prodoffer",
				                        this.controller.mainProdOfferWidget.domNode), function(dom) {
					                var uniqueId = dojo.attr(getParentWithTagName("TR", dom), "uniqueId"),
						                selectedProdOffer = $ac$.query("$.selectedMemberProdOfferList[?(@.uniqueId=="
						                        + uniqueId + ")]");
					                
					                var result = {
						                uniqueId : uniqueId,
						                prodOfferInfoVO : {
							                prodOfferId : dom.value,
							                prodOfferName : dom.options[dom.selectedIndex].text
						                }
						                
					                };
					                if (selectedProdOffer) {
						                dojo.mixin(result, selectedProdOffer[0]);
						                
					                }
					                return result;
					                
				                });
			        // memberProdOfferList.unshift({
			        // prodOfferInfoVO : prodOfferInfoVO,
			        // uniqueId : -1
			        // });
			        return dojo.filter(memberProdOfferList, function(vo) {
				                return vo.action != 'quit';
				                
			                });
			        
		        },
		        doMultipleSubProdOfferFilter : function(id) {
			        var membMainProdOfferNodeList = dojo.query(".member-main-prodoffer",
			                this.controller.mainProdOfferWidget.domNode),
				        handler = this;
				    //由于数据量比较大，所以先进行初始化收藏的可选包数据
				    this.initPersonalSubProdOfferData();
			        if (membMainProdOfferNodeList.length > 0) {
				        try {
					        handler.clearDirtyContext();
					        this.initSubProdOfferAcceptList(this._getMainProdOfferList());
				        }
				        catch (e) {
					        BusCard.showErrorStack(e);
					        handler.clearErrorContext();
				        }
				        
			        } else {
				        if (this.subProdOfferTabContainer) {
					        this.subProdOfferTabContainer.destroyRecursive();
					        this.subProdOfferTabContainer = null;
				        }
				        var _widget = unieap.byId("subProdOfferTreeContainer");
				        if (!_widget) {
					        this.controller.renderSubProdOfferLayout();
				        } else {
					        _widget.destroyRecursive();
					        this.controller.renderSubProdOfferLayout();
					        
				        }
				        // FIXME
				        // unieap自身组件问题,这里必须掉resizeContainer,否则BorderContainer不能正常布局
				        unieap.byId("subProdOfferTreeContainer").resizeContainer();
				        for (var key in handler.subProdOfferOrderProviderMap) {
					        if (!handler.subProdOfferOrderProviderMap.hasOwnProperty(key)) {
						        continue;
					        }
					        var provider = handler.subProdOfferOrderProviderMap[key]
					        provider.prodOfferDetailBuilder.destroy();
					        if (!!provider.prodOfferInfoWidget) {
						        if (!!provider.prodOfferInfoWidget.mainProdOfferDetailWidget) {
							        provider.prodOfferInfoWidget.mainProdOfferDetailWidget.destroyRecursive();
						        }
						        provider.prodOfferInfoWidget.destroyRecursive();
					        }
				        };
				        this.subProdOfferOrderProviderMap = {};
				        // 分场景调度
				        return this[$ac$.get("processId") + "Dispatch"]();
				        
			        }
		        },
		        
		        /**
		         * 个人收藏的可选包销售品数据
		         */
		        initPersonalSubProdOfferData : function(){
		        	if(!!$ac$.get("_allSubProdOffers_")){
		        		return ;
		        	}
		        	var param = "method=getPersonalCollectSubProdOffer";
			        var personalSubProdOfferList = util.ServiceFactory.getService("url:prodOfferSaleAjaxAction.do?"+param);
			        $ac$.set("_allSubProdOffers_",personalSubProdOfferList);
		        },
		        /**
				 * 单销售品可选包变更调度,在此之前可选包规格数据已经取到,不在需要请求数据
				 * 
				 * @method
				 */
		        subProdOfferChangeDispatch : function() {
			        var handler = this;
			        handler.initSubProdOfferPane(handler.controller.mainProdOfferId, "", null);
			        
		        },
		        /**
				 * 共享版组合套餐可选包变更调度,在此之前可选包规格数据已经取到,不在需要请求数据
				 * 
				 * @method
				 */
		        sharedMemberChangeDispatch : function() {
			        var handler = this;
			        handler.initSubProdOfferPane(handler.controller.mainProdOfferId, "", null);
			        
		        },
		        /**
				 * 单-单套餐变更调度,需要取以下数据 1：默认选择的可选包 2：原有可选包规格层面数据
				 * 
				 * @method
				 */
		        single2singleDispatch : function() {
			        return this.single2combDispatch.apply(this, arguments);
			        
		        },
		        single2combDispatch : function() {
			        var handler = this,
				        selectedMainProdOfferInfoVO = $ac$.get("selectedMainProdOfferInfoVO"),
				        mainProdOfferInstVO = $ac$.get("mainProdOfferInstVO"),
				        selectedMem = BusCard.find($ac$.selectedMemberProdOfferList||[],function(info){
				        	return (!!info.offerInstVO)&&mainProdOfferInstVO.prodOfferInstId == info.offerInstVO.prodOfferInstId;
				        }),
				        uniqueId = !!selectedMem ? selectedMem.uniqueId : "",
				        userHasProdOfferIdList = BusCard.jsonPath($ac$.get("userHasProdOfferInfoList"),
				                "$[?(@.prodOfferId!=" + mainProdOfferInstVO.prodOfferId + ")].prodOfferId")
				                || [];
			        util.ServiceFactory.getService(
			                "url:orderDetailAction.do?method=doGetMemberProdOfferListForChgMem&oldProdOfferId="
			                        + mainProdOfferInstVO.prodOfferId + "&newProdOfferId="
			                        + selectedMainProdOfferInfoVO.prodOfferId + "&userHasProdOfferIdList="
			                        + dojo.toJson(userHasProdOfferIdList)+"&commonRegionId="+(handler.controller.getBelongCode()||"")
			                        + "&accProdListStr="+(handler.controller.getAccProdIdList(uniqueId)||""), function(_prodOfferData) {
				                var prodOfferList = _prodOfferData.prodOfferList,
					                userHasProdOfferMetaInfoList = _prodOfferData.userHasProdOfferMetaInfoList,
					                _list = dojo.filter(prodOfferList, function(v) {
						                        return dojo.filter(userHasProdOfferIdList, function(id) {
							                                return id == v.prodOfferId;
						                                }).length > 0;
						                        
					                        });
				                Array.prototype.push.apply(userHasProdOfferMetaInfoList, _list);
				                $ac$.set("userHasProdOfferMetaInfoList", userHasProdOfferMetaInfoList);
				                Array.prototype.push.apply($ac$.get("prodOfferList"), prodOfferList);
				                util.ProdOfferInstProvider.getProdOfferDataForChgMain();
				                handler.initSubProdOfferPane(handler.controller.mainProdOfferId, "", null);
			                });
		        },
		        /**
				 * 共享版套餐新装调度 包括组合和单套餐
				 * 
				 * @method
				 */
		        sharedProdOfferInstallDispatch : function() {
			        var handler = this;
			        this.controller.route("url:orderDetailAction.do?method=doGetProdOfferList&prodOfferId="
			                        + $ac$.get("selectedMainProdOfferInfoVO").prodOfferId+"&commonRegionId="+(handler.controller.getBelongCode()||"")
			                        + "&accProdListStr="+(handler.controller.getAccProdIdList("")||""), [true,
			                        function(prodOfferList) {
				                        // 往prodOfferList中放入可选包信息
				                        Array.prototype.push.apply($ac$.get("prodOfferList"), prodOfferList || []);
				                        handler.initSubProdOfferPane(handler.controller.mainProdOfferId, "", null);
				                        
			                        }]);
			        
		        },
		        buildTabPageTitle : function(action) {
			        return util.actionNameMap[action];
		        },
		        /**
				 * 处理可选包列表信息
				 * 
				 * @method
				 */
		        initSubProdOfferAcceptList : function(mainProdOfferList) {
			        var handler = this,
				        controller = this.controller,
				        mainProdOfferWidget = controller.mainProdOfferWidget;
			        if (this.subProdOfferTabContainer) {
				        this.subProdOfferTabContainer.destroyRecursive();
				        this.subProdOfferTabContainer = null;
			        }
			        this.subProdOfferTabContainer = new TabContainer({
				                id : 'subProdOfferTabContainer',
				                height : "460px"
			                });
			        this.subProdOfferTabContainer.startup();
			        dojo.place(this.subProdOfferTabContainer.domNode, unieap.byId("subProdOfferPane").containerNode,
			                "first");
			        for (var key in handler.subProdOfferOrderProviderMap) {
				        if (!handler.subProdOfferOrderProviderMap.hasOwnProperty(key)) {
					        continue;
				        }
				        var provider = handler.subProdOfferOrderProviderMap[key]
				        provider.prodOfferDetailBuilder.destroy();
				        if (!!provider.prodOfferInfoWidget) {
					        if (!!provider.prodOfferInfoWidget.mainProdOfferDetailWidget) {
						        provider.prodOfferInfoWidget.mainProdOfferDetailWidget.destroyRecursive();
					        }
					        provider.prodOfferInfoWidget.destroyRecursive();
				        }
			        };
			        handler.subProdOfferOrderProviderMap = {};
			        
			        dojo.forEach(mainProdOfferList, function(prodOfferInfoVOWrapper) {
				                var contentPane = new ContentPane(dojo.mixin({
					                        title : prodOfferInfoVOWrapper.prodOfferInfoVO.prodOfferName + "-"
					                                + handler.buildTabPageTitle(prodOfferInfoVOWrapper.action),
					                        prodOfferInfoVO : prodOfferInfoVOWrapper.prodOfferInfoVO,
					                        uniqueId : prodOfferInfoVOWrapper.uniqueId,
					                        onShow : function(){
					                        	return function(){
					                        		try{
						                        		//展开页面的时候将可选包部分的所有的销售品详情全部关闭，加上异常容错机制
						                        		var subProdOfferOrderProviderMap = handler.subProdOfferOrderProviderMap;
						                        		for(var key in subProdOfferOrderProviderMap){
						                        			if (!subProdOfferOrderProviderMap.hasOwnProperty(key)) {
														        continue;
													        }
						                        			if(subProdOfferOrderProviderMap[key].prodOfferInfoWidget.mainProdOfferDetailWidget){
						                        				//关闭事件
						                        				orderaccept.custom.popup.close({
											                        widget : subProdOfferOrderProviderMap[key].prodOfferInfoWidget.mainProdOfferDetailWidget,
											                        notHandleData : true
										                        });
						                        			}
						                        		}
					                        		}catch(e){
					                        			if (window.console && window.console.warn) {
															window.console.warn("warn in MultipleSubProdOfferHandler.js:" + e.message);
														}
					                        		}
					                        	}
					                        }(handler)
					                        
				                        }, prodOfferInfoVOWrapper));
				                handler.subProdOfferTabContainer.addChild(contentPane);
				                handler.initEachSubProdOfferTab(contentPane, prodOfferInfoVOWrapper);
			                });
			        
		        },
		        /**
				 * 初始化每一个tab页
				 */
		        initEachSubProdOfferTab : function(contentPane, memberAcceptData) {
			        var uniqueId = contentPane.uniqueId,
				        prodOfferInfoVO = contentPane.prodOfferInfoVO,
				        prodOfferInstVO = contentPane.offerInstVO,
				        action = contentPane.action,
				        handler = this;
			        // 渲染生成每个tab页中的可选包视图模板
			        contentPane.containerNode.innerHTML = BusCard.Template
			                .create(handler.multipleSubProdOfferContentTemplate).apply({
				                        uniqueId : uniqueId
			                        });
			        dojo.parser.parse(contentPane.containerNode);
			        handler.controller.renderSubProdOfferSearch(uniqueId);
			        // FIXME
			        var bdc = unieap.byId("subProdOfferTreeContainer" + uniqueId);
			        bdc && bdc.resizeContainer();
			        handler.computationChgProdOffer(prodOfferInstVO, uniqueId);
			        // 因为产品接口获取数据比较慢，实行异步加载
			        handler.getProdOfferList(contentPane, function(prodOfferData) {
				                handler.setProdOfferList(uniqueId, prodOfferData, action, memberAcceptData);
				                handler.rendSubProdOffer(uniqueId, prodOfferInfoVO, contentPane);
			                });
		        },
		        /**
				 * 设置销售品数据
				 */
		        setProdOfferList : function(uniqueId, prodOfferData, action, memberAcceptData) {
			        if (prodOfferData.prodOfferList) {
				        dojo.global.$appContext$.set("prodOfferList" + uniqueId, prodOfferData.prodOfferList);
				        dojo.global.$appContext$.set("userHasProdOfferMetaInfoList" + uniqueId,
				                prodOfferData.userHasProdOfferMetaInfoList);
			        } else {
				        dojo.global.$appContext$.set("prodOfferList" + uniqueId, prodOfferData);
			        }
			        if (!action) { return; }
			        if (action == "change" || action == "split") {
				        util.ProdOfferInstProvider.getProdOfferDataForChgMain(uniqueId, memberAcceptData);
			        } else if (action == "nochange") {
				        util.ProdOfferInstProvider.getProdOfferDataForChg(uniqueId, memberAcceptData);
			        }
		        },
		        /**
				 * 获取销售品集合
				 */
		        getProdOfferList : function(contentPane, cb) {
			        var uniqueId = contentPane.uniqueId,
				        prodOfferInfoVO = contentPane.prodOfferInfoVO,
				        prodOfferInstVO = contentPane.offerInstVO,
				        prodOfferId = prodOfferInfoVO.prodOfferId,
				        action = contentPane.action,
				        handler = this;
			        var userHasProdOfferInfoList = dojo.global.$appContext$.get("userHasProdOfferInfoList" + uniqueId);
			        var uniqueId = uniqueId || "";
			        var prodOfferData = null;
			        if (action == "change" || action == "split") {
				        var userHasProdOfferIdList = [];
				        dojo.forEach(userHasProdOfferInfoList || [], function(userHasProdOfferInfo) {
					                return userHasProdOfferIdList.push(userHasProdOfferInfo.prodOfferId);
				                });
				        prodOfferData = util.ServiceFactory.getService(
				                "url:orderDetailAction.do?method=doGetMemberProdOfferListForChgMem&oldProdOfferId="
				                        + prodOfferInstVO.prodOfferId + "&newProdOfferId=" + prodOfferId
				                        + "&userHasProdOfferIdList=" + dojo.toJson(userHasProdOfferIdList)+"&commonRegionId="+(handler.controller.getBelongCode()||"")
				                        + "&accProdListStr="+(handler.controller.getAccProdIdList(uniqueId)||""), function(
				                        _prodOfferData) {
					                var prodOfferList = _prodOfferData.prodOfferList,
						                userHasProdOfferMetaInfoList = _prodOfferData.userHasProdOfferMetaInfoList,
						                _list = dojo.filter(prodOfferList, function(v) {
							                        return dojo.filter(userHasProdOfferIdList, function(id) {
								                                return id == v.prodOfferId
							                                }).length > 0;
							                        
						                        });
					                Array.prototype.push.apply(userHasProdOfferMetaInfoList, _list);
					                cb(_prodOfferData);
				                });
			        } else if (action == "nochange") {
				        var userHasProdOfferIdList = [];
				        dojo.forEach(userHasProdOfferInfoList || [], function(userHasProdOfferInfo) {
					                return userHasProdOfferIdList.push(userHasProdOfferInfo.prodOfferId);
				                });
				        prodOfferData = util.ServiceFactory.getService(
				                "url:orderDetailAction.do?method=doGetMemberProdOfferListForChg&prodOfferId="
				                        + prodOfferId + "&userHasProdOfferIdList="
				                        + dojo.toJson(userHasProdOfferIdList)+"&commonRegionId="+(handler.controller.getBelongCode()||""), function(_prodOfferData) {
					                _prodOfferData.prodOfferList = _prodOfferData.userHasProdOfferMetaInfoList;
					                cb(_prodOfferData);
				                });
				        
			        } else {
				        prodOfferData = util.ServiceFactory.getService(
				                "url:orderDetailAction.do?method=doGetProdOfferList&prodOfferId=" + prodOfferId+"&commonRegionId="+(handler.controller.getBelongCode()||"")
				                +"&accProdListStr="+(handler.controller.getAccProdIdList(uniqueId)||""), cb);
			        }
		        },
		        /**
				 * 计算变更的销售品
				 */
		        computationChgProdOffer : function(prodOfferInstVO, uniqueId) {
			        if (!prodOfferInstVO) { return; }
			        util.ProdOfferInstProvider.queryMemberProdOfferAndSub(prodOfferInstVO.prodOfferInstId, uniqueId);
		        },
		        /**
				 * 走异步进行加载
				 */
		        rendSubProdOffer : function(uniqueId, prodOfferInfoVO, contentPane) {
			        var handler = this;
			        // 获取e9自主版对应的成员销售品集合（包含默认选中的可选包销售品和默认选中的可选包销售品）
			        var prodOfferList = dojo.global.$appContext$.get("prodOfferList" + uniqueId);
			        // 生成可选包区域
			        handler.initSubProdOfferPane(prodOfferInfoVO.prodOfferId, uniqueId, contentPane);
			        // 生成每个tab页中的主套餐视图
			        handler.initMainProdOfferPane(contentPane, prodOfferList);
		        },
		        /**
				 * 初始化每一个套餐信息widget add by duxin 2012-04-07
				 */
		        initMainProdOfferPane : function(contentPane, prodOfferList) {
			        var handler = this,
				        providerMap = handler.subProdOfferOrderProviderMap,
				        provider = providerMap['subProdOfferTreeContainer' + contentPane.uniqueId],
				        mainProdOfferInfoVO = util.ProdOfferHelper.getMainProdOffer(prodOfferList)[0],
				        offerInstVO = contentPane.offerInstVO;
			        if (contentPane.prodOfferInfoVO.bindType != 2) {
				        var offerInfoWidget = new MultipleMainProdOfferWidget({
					        prodOfferInstVO : (offerInstVO && (offerInstVO.prodOfferId == mainProdOfferInfoVO.prodOfferId
					                ? offerInstVO
					                : null)),
					        mainProdOfferInfoVO : mainProdOfferInfoVO,
					        uniqueId : contentPane.uniqueId,
					        contentPane : contentPane
				        });
				        // 初始化主销售品详情
				        handler.initMainProdOfferDetail(offerInfoWidget);
				        !!provider ? provider.prodOfferInfoWidget = offerInfoWidget : null;
				        dojo.place(offerInfoWidget.domNode, contentPane.domNode, "first");
				        // 初始化每个成员销售品的开始时间(为协议销售品提供)
				        handler.initOldAndNewDate(offerInfoWidget,offerInstVO,contentPane);
			        }
		        },
		        
		        /**
		         * 初始化成员销售品的开始时间和结束时间
		         */
		        initOldAndNewDate : function(offerInfoWidget,offerInstVO,contentPane){
		        	if((!!offerInstVO)&&$ac$.get("offerStandardStartDate_"+offerInstVO.prodOfferInstId)){
		        		var agreementDateObj = $ac$.get("offerStandardStartDate_"+offerInstVO.prodOfferInstId);
		        		//更新销售品的开始时间
		        		dojo.query(".startDate-class", contentPane.domNode)[0].innerText = agreementDateObj.beginDate;
		        		//更新协议时间
		        		offerInfoWidget.mainProdOfferDetailWidget.agreementAttrCardWidget.resetOfferStandardTime(agreementDateObj.beginDate);
		        	}
		        },
		        
		        /**
				 * 初始化主销售品详情 add by duxin 2012-04-10
				 */
		        initMainProdOfferDetail : function(prodOfferInfoWidget) {
			        var prodOfferInfoVO = prodOfferInfoWidget.prodOfferInfoVO;
			        var prodOfferInstVO = prodOfferInfoWidget.prodOfferInstVO;
			        var prodOfferDetailFlag = util.ProdOfferHelper.IfShowMainOfferDetail(prodOfferInfoVO) ? '1' : '0';
			        if (prodOfferDetailFlag == 1) {
				        // 重新创建视图组件
				        var mainProdOfferDetailBuilder = new MainProdOfferDetailBuilder(this);
				        var showData = {};
				        // 基础包区域表格中的接入类产品所属的dom节点集合
				        var trs = dojo.query(".main-product-basic", this.controller.mainProdOfferWidget.domNode);
				        var prodBasicTr = dojo.filter(trs, function(tr) {
					                return dojo.attr(tr, "uniqueId") == prodOfferInfoWidget.uniqueId;
				                })[0];
				        var viewId = dojo.attr(prodBasicTr, "viewId");
				        var chooseNumberObj = {
					        serviceKind : dojo.attr(prodBasicTr, "serviceKind") || "-1",
					        serviceKindIndex : dojo.attr(prodBasicTr, "serviceKindIndex") || "-1",
					        serviceId : dojo.query(".serviceId-" + viewId, prodBasicTr)[0].value,
					        productId : dojo.attr(prodBasicTr, "productId") || "-1",
					        uniqueId : dojo.attr(prodBasicTr, "uniqueId")
				        };
				        showData.chooseNumberObj = chooseNumberObj;
				        
				        // 初始化销售品详情
				        mainProdOfferDetailBuilder.initProdOfferDetail({
					                subProdOfferInfo : prodOfferInfoVO,
					                prodOfferInst : prodOfferInstVO,
					                ifMultiplSub : true,
					                prodOfferInfoWidget : prodOfferInfoWidget,
					                showData : showData
				                });
				        prodOfferInfoWidget.mainProdOfferDetailWidget = mainProdOfferDetailBuilder.prodOfferDetailWidgetList["main-"
				                + prodOfferInfoVO.prodOfferId + "-" + prodOfferInfoWidget.uniqueId];
			        }
		        },
		        /**
				 * 初始化可选包区域
				 */
		        initSubProdOfferPane : function(mainProdOfferId, uniqueId, contentPane) {
			        var handler = this;
			        // 1.加载可选包左侧区域
			        handler.controller.renderSubProdOffer({
				                mainProdOfferId : mainProdOfferId,
				                uniqueId : uniqueId
			                });
			        // 2.加载可选包右侧表格区域
			        handler.controller.renderSubProdOfferOrderGrid({
				                uniqueId : uniqueId
			                });
			        // 3.生成可选包表格对应的数据处理类
			        var subProdOfferCartDataProvider = this.getSubProdOfferCartDataProvider(this.controller, uniqueId, contentPane);
			        handler.subProdOfferOrderProviderMap['subProdOfferTreeContainer' + uniqueId] = subProdOfferCartDataProvider;
			        // 4.展示可选包右侧选中的销售品数据
			        handler.controller.showSubProdOfferCart(subProdOfferCartDataProvider);
			        // 5.为可选包增加重置按钮，以及添加事件
			        handler.showResetButton(uniqueId);
		        },
		        
		        showResetButton : function(uniqueId,subProdOfferCartDataProvider){
		        	var handler = this;
		        	var subProdOfferCartPane = unieap.byId('subProdOfferCart'+uniqueId);
		        	if (subProdOfferCartPane) {
				        var titleNode = subProdOfferCartPane.titleText || subProdOfferCartPane.titleNode;
				        var innerTp = "<img title='点此可重置可选包购物车数据' id='resetSubProdOfferBtn_"+uniqueId+"' style='cursor:pointer;float:right' src='"+BusCard.path.contextPath+"/common/images/icon/refresh_icon.png' />";
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
			        //为按钮绑定事件
			        dojo.connect(dojo.byId("resetSubProdOfferBtn_"+uniqueId), "onclick", function(event) {
		                handler.subProdOfferOrderProviderMap['subProdOfferTreeContainer' + uniqueId].resetSubProdOfferCart();
	                });
		        },
		        getSubProdOfferCartDataProvider : function(controller,uniqueId,contentPane){
		        	return new SubProdOfferCartDataProvider(controller,uniqueId,contentPane);
		        },
		        /**
				 * 获取可选包数据
				 */
		        getSubProdOfferPageData : function() {
			        var subProdOfferPageData = [];
			        for (var p in this.subProdOfferOrderProviderMap) {
				        var subProdOfferOrderProvider = this.subProdOfferOrderProviderMap[p];
				        var data = subProdOfferOrderProvider.getSubProdOfferPageData();
				        if (!data) {
					        // 判断是否有contentPane存在，如果有，则展示相应的面板
					        if (subProdOfferOrderProvider.contentPane != null) {
						        this.subProdOfferTabContainer.showTab(subProdOfferOrderProvider.contentPane.id, true);
					        }
					        return false;
				        }
				        subProdOfferPageData.push(data);
			        }
			        return subProdOfferPageData;
		        },
		        
		        /**
				 * 受理自主版套餐之前,清除陈旧的上下文资源
				 * 
				 * @method
				 */
		        clearDirtyContext : function() {
			        this.controller.clear(true);
			        if (this.subProdOfferTabContainer) {
				        Try.these([function() {
					                return handler.subProdOfferTabContainer.destroyRecursive();
					                
				                }, function() {
					                handler.subProdOfferTabContainer.destroy();
					                
				                }]);
				        this.subProdOfferTabContainer = null;
			        }
		        },
		        /**
				 * 当受理自主版套餐过程中如果有错误出现,清除当前不同步的上下文资源,包括widget和在$appContext$中注册的数据
				 * 
				 * @method
				 */
		        clearErrorContext : function() {
			        var handler = this;
			        this.controller.clear();
			        if (this.subProdOfferTabContainer) {
				        Try.these([function() {
					                return handler.subProdOfferTabContainer.destroyRecursive();
					                
				                }, function() {
					                handler.subProdOfferTabContainer.destroy();
					                
				                }]);
				        this.subProdOfferTabContainer = null;
			        }
		        }
		        
	        });
	        
        });
