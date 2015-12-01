/**
 * @fileOverview
 */

defineModule(
        "orderaccept.prodofferaccept.loader.OrderChangeLoader",
        ["../util", "./ProdOfferNewLoader", "../widget/servicecard/ServiceCardWidget",
                "../widget/resourcecard/ResourceCardWidget", "../widget/attrcard/ProductAttrCardWidget",
                "../widget/attrcard/ProductOfferAttrCardWidget", "../../custom/TooltipDialog",
                "../formatter/FormatterProvider", "../builder.prodofferdetail.ProdOfferDetailBuilder",
                "../widget/commcard/CommCardWidget", "../builder/subprodoffergrid/SubProdOfferCartDataProvider",
                "../OrderShowLoader", "../formatter/PromotionFormatterProvider",
                "../builder/promotiondetail/PromotionDetailBuilder",
                "../builder/promotiongrid/PromotionCartDataProvider", "unieap.layout.AccordionContainer",
                "unieap.layout.AccordionPane", "../widget/commheader/CommHeaderWidget", "unieap.layout.BorderContainer"],
        function(util, ProdOfferNewLoader, ServiceCardWidget, ResourceCardWidget, ProductAttrCardWidget,
                ProductOfferAttrCardWidget, TooltipDialog, FormatterProvider, ProdOfferDetailBuilder, CommCardWidget,
                SubProdOfferCartDataProvider, OrderShowLoader, PromotionFormatterProvider, PromotionDetailBuilder,
                PromotionCartDataProvider) {
	        
	        dojo.declare("orderaccept.prodofferaccept.loader.OrderChangeLoader", [ProdOfferNewLoader],
	                /**
					 * @lends orderaccept.prodofferaccept.loader.OrderChangeLoader.prototype
					 */
	                {
		        layoutTemplateUrl : dojo.moduleUrl("orderaccept.prodofferaccept", "view/orderChangeLayout.html"),
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
		        
		        promotionCartDataProvider : null,
		        
		        ShoppingCartWidgetClass : null,
		        
		        shoppingCartWidgetInstance : null,
		        
		        custOrderVOHelper : null,
		        
		        globalLifeCycleProperties : ["prodOfferList", "currentMainProdOfferInfoVO",
		                "selectedMainProdOfferInfoVO", "selectedMemberProdOfferList", "requestParam",
		                "userHasProdOfferInfoList", "userHasProdOfferMetaInfoList", "serviceOfferConfig",
		                "listenerRegistry", "mainProdOfferInfoVO", "DataManager", "processId", "currentProcessId",
		                "mainProdOfferInstVO", "subGroupProdInfo", "custOrderVO", "mainOfferItemVO", "orderChangeFlag"],
		        
		        /**
				 * @constructs
				 */
		        constructor : function(param) {
			        
			        this.requestParam = param;
			        
			        this.mainProdOfferWidget = null;
			        
		        },
		        postscript : function() {
			        this.hiddenStep();
			        var rp = $ac$.requestParam;
			        if (rp.failureFlag == 1) {
				        alert("order change failure>>" + rp.message);
				        return false;
			        } else {
				        var custOrderId = rp.custOrderId;
				        var jsonpRequestUrl = BusCard.path.contextPath
				                + "/orderDetailAction.do?method=getOrderChangeInfo&callback=prodOfferAcceptLoader.onDataReady&custOrderId="
				                + custOrderId;
				        BusCard.ScriptLoader.asynLoad([jsonpRequestUrl], function() {

				                });
				        
			        }
			        
		        },
		        hiddenStep : function() {
			        document.body.style.height = "100%";
			        var dom = dojo.byId("divGuide");
			        dom && dojo.style(dom, {
				                display : 'none'
			                });
		        },
		        /**
				 * 当查询客户订单数据请求返回时回调
				 * 
				 * @param {Object} custOrderVO 客户订单信息
				 * @method
				 */
		        onDataReady : function(custOrderVO) {
			        if (custOrderVO.failureFlag == 1) {
				        alert("error when fetch order data >>" + custOrderVO.message);
				        return false;
			        } else {
				        this.custOrderVO = custOrderVO;
				        $ac$.set("custOrderVO", custOrderVO);
				        this.custOrderVOHelper = util.CustOrderVOHelper.getInstance(custOrderVO);
				        var snapshot = this.custOrderVOHelper.custOrder2pageSnapshot();
				        $ac$.set("orderChangeFlag", 1);
				        $ac$.set("processId", snapshot.processId);
				        $ac$.set("mainOfferItemVO", snapshot.mainOfferItemVO);
				        $ac$.set("selectedMemberProdOfferList", snapshot.selectedMemberProdOfferList);
				        var _mainProdfferInfoVO = util.ProdOfferHelper.getProdOfferDetail(
				                snapshot.mainOfferItemVO.prodOfferId, {
					                permitCache : true,
					                interfaceType : 4
				                }

				        );
				        _mainProdfferInfoVO.offerProdRelaList = this.reComputeOfferProdRelaList(_mainProdfferInfoVO);
				        $ac$.set("currentMainProdOfferInfoVO", _mainProdfferInfoVO);
				        $ac$.set("selectedMainProdOfferInfoVO", _mainProdfferInfoVO);
				        $ac$.set("prodOfferList", [_mainProdfferInfoVO]);
				        this.loadAndSetSubProdOfferBaseInfo();
				        this.asynExecute(this._asynLoadSriptList(), dojo.hitch(this, "_asynCallback"));
				        
			        }
			        
			        // alert("改单进行中....请等候...." +
			        // custOrderVO.custOrderBasicInfo.custOrderId);
		        },
		        /**
				 * 如果是组合产品受理,重新组织销售品产品关系列表
				 * 
				 * @borrows orderaccept.prodofferaccept.widget.shoppingcart.ShoppingCartWidget#reComputeOfferProdRelaList
				 * @method
				 */
		        reComputeOfferProdRelaList : function(prodOfferInfoVO) {
			        var offerProdRelaList = prodOfferInfoVO.offerProdRelaList,
				        protoConcat = Array.prototype.concat;
			        return protoConcat.apply([], dojo.map(offerProdRelaList, function(offerProdRelaVO) {
				                        var productInfoVO = offerProdRelaVO.productInfoVO,
					                        prodCompDetailList = productInfoVO.prodCompDetailList || [],
					                        list = [];
				                        list.push(offerProdRelaVO);
				                        dojo.forEach(prodCompDetailList, function(prodCompDetailVO) {
					                                prodCompDetailVO.combProductId = offerProdRelaVO.productId;
					                                if (false && prodCompDetailVO.maxCount == prodCompDetailVO.minCount) {
						                                var constructedOfferProdRela = {
							                                productId : prodCompDetailVO.productId,
							                                minCount : 1,
							                                maxCount : 1,
							                                ifDefault : 1,
							                                combProductId : offerProdRelaVO.productId,
							                                productInfoVO : prodCompDetailVO
						                                };
						                                for (var index = 0; index < prodCompDetailVO.minCount; index++) {
							                                list.push(constructedOfferProdRela);
						                                }
						                                
					                                } else {
						                                var constructedOfferProdRela = {
							                                productId : prodCompDetailVO.productId,
							                                minCount : prodCompDetailVO.minCount,
							                                maxCount : prodCompDetailVO.maxCount,
							                                // 和ppm协商
							                                // 成员产品都默认选中
							                                ifDefault : "1",
							                                combProductId : offerProdRelaVO.productId,
							                                productInfoVO : prodCompDetailVO
						                                };
						                                list.push(constructedOfferProdRela);
						                                
					                                }
					                                
				                                });
				                        
				                        return list;
				                        
			                        }));
			        
		        },
		        loadAndSetSubProdOfferBaseInfo : function() {
			        var prodOfferIdList = dojo.map(this.custOrderVOHelper.filterOrderItemList(function(item) {
				                var prodOfferId = item.prodOfferId;
				                return prodOfferId != null
				                        && (prodOfferId != $ac$.get("selectedMainProdOfferInfoVO").prodOfferId);
				                
			                }), function(t) {
				        return t.prodOfferId +"";
			        }).uniq(),
				        prodOfferList = util.ServiceFactory
				                .getService("url:orderDetailAction.do?method=getProdOfferByAccProductId&prodOfferIdList="
				                        + BusCard.toJson(prodOfferIdList))
				                || [];
			        Array.prototype.push.apply($ac$.get("prodOfferList"), prodOfferList);
			        
		        },
		        
		        getProdOfferInfoVO : function(prodOfferId) {
			        return dojo.filter($ac$.get('prodOfferList'), function(prodOfferInfoVO) {
				                return prodOfferInfoVO.prodOfferId == prodOfferId;
				                
			                })[0];
			        
		        },
		        /**
				 * FIXME 如果考虑脚本加载效率 这里应该按照改单的实际引用的模块进行加载
				 * 
				 * @method
				 */
		        _asynLoadSriptList : function() {
			        return [].concat(this.inherited(arguments))
			                .concat("orderaccept.prodofferaccept.loader.OrderChangeSubProdOfferHandler")
			                .concat("orderaccept.prodofferaccept.data.OrderChangeDataBuilder")
			                .concat("orderaccept.prodofferaccept.behavior.OrderChangeBehavior")
			                .concat("orderaccept.prodofferaccept.widget.payrelation.OrderChangePayRelationWidget");
		        },
		        initMultipleSubProdOfferHandler : function() {
			        this.multipleSubProdOfferHandler = new orderaccept.prodofferaccept.loader.OrderChangeSubProdOfferHandler(this);
			        
		        },
		        init : function() {
			        
			        this.serviceCardWidgetMap = {};
			        
			        this.captureEventRegistry();
			        
			        this.renderLayout();
			        
		        },
		        
		        _asynCallback : function() {
			        
			        var controller = this;
			        
			        controller.init();
			        
			        controller.registerClass();
			        
			        // 监听各种事件
			        controller.initBehavior();
			        
			        // 初始化检测
			        controller.initCheck();
			        
			        // 初始化订单数据构建器
			        controller.initDataBuilder();
			        
			        // do render work below
			        controller.initSpecialDataBuilder();
			        
			        // 渲染促销政策订购列表
			        // controller.renderPromotionOrderGrid();
			        
			        // 初始化支付关系
			        controller.renderPayRelation();
			        // 加载支付关系数据
			        controller.initPayRelation();
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
			        
			        controller.beginOrder($ac$.get("selectedMainProdOfferInfoVO").prodOfferId);
			        
			        controller.displayBackButton();
			        
			        BusCard.removeCoverLayer();
		        },
		        
		        displayBackButton : function() {
			        var nodeList = BusCard.query("[dojoAttachTopic='/back2OrderChangePage']",
			                this.functionNavigatorWidget.domNode);
			        if (nodeList && nodeList.length) {
				        dojo.style(nodeList[0], {
					                display : ""
				                });
			        }
			        
		        },
		        
		        registerClass : function() {
			        this.inherited(arguments);
			        this.payRelationWidgetClass = orderaccept.prodofferaccept.widget.payrelation.OrderChangePayRelationWidget;
			        
		        },
		        initDataBuilder : function() {
			        this.dataBuilder = new orderaccept.prodofferaccept.data.OrderChangeDataBuilder(this);
		        },
		        initBehavior : function() {
			        this.behaviorInstance = new orderaccept.prodofferaccept.behavior.OrderChangeBehavior(this);
			        
		        },
		        renderPayRelation : function() {
			        var payRelationPane = unieap.byId("payRelationPane"),
				        loader = this;
			        this.payRelationWidgetInstance = new this.payRelationWidgetClass({
				                custInfo : dojo.global.$appContext$.get("requestParam").customerData
			                });
			        dojo.place(this.payRelationWidgetInstance.domNode, payRelationPane.containerNode, "first");
			        
		        },
		        initPayRelation : function() {
			        return this.payRelationWidgetInstance.initItemInfoList(
			                $ac$.get("custOrderVO").accessProdItemInfoList, $ac$.get("custOrderVO").accoutItemInfoList);
		        },
		        renderOrderChangeReasonView : function(orderInfoCard) {
			        var labelNodeList = dojo.query(".buscard-item-label", orderInfoCard.dom);
			        var style = dojo.attr(labelNodeList[0], "style");
			        var tp = "<div class='buscard-row'><div style='#{style}' class ='buscard-item-label'><span class='buscard-label'>\u6539\u5355\u539f\u56e0\uff1a</span></div>\
							 	<div style='width:#{widthNumber}%;' class='buscard-item-el'><input \
							 	fieldId= '-100' controltype='31' groupId='0' isnull='1' maxlength='1000' \
							 	controlFieldName='changeOrderReason' type='text' name='changeOrderReason' \
							  	class='buscard-el buscard-input-line' id='changeOrderReason' > \
							 </div>	</div>";
			        var widthNumber = (89 - parseInt(/(\d+)%/.exec(style)[1]) || 11);
			        var htmlCode = BusCard.Template.create(tp).apply({
				                style : style,
				                widthNumber : widthNumber
			                });
			        var fragment = dojo._toDom(htmlCode);
			        var groups = dojo.query(".buscard-subgroup", orderInfoCard.dom);
			        groups[groups.length - 1].appendChild(fragment);
		        },
		        
		        getChangeOrderReason : function() {
			        var dom = dojo.byId("changeOrderReason");
			        return (dom ? dom.value : "");
		        },
		        
		        renderPromotionTree : function() {
			        return true;
			        
		        },
		        renderOrderedSubProdOfferGrid : function(contentPane, mainProdOfferInfoVO, offerItemVO) {
			        var loader = this,
				        cm = new BusCard.widget.grid.ColumnModel({
					                metaData : loader.getSubProdOfferColumns()
				                }),
				        ds = new BusCard.widget.grid.DataSource(dojo.map(loader.custOrderVOHelper
				                                .getSubProdOfferItemList(offerItemVO.orderItemId), function(
				                                subOfferItemVO) {
					                        var subOfferInfoVO = loader.getProdOfferInfoVO(subOfferItemVO.prodOfferId);
					                        var relaAccessItemInfo = loader.custOrderVOHelper
					                                .getAcessProdItem(subOfferItemVO);
					                        loader.dealRaiseXDSLSpeed(subOfferInfoVO, relaAccessItemInfo);
					                        return {
						                        prodOfferName : subOfferInfoVO.prodOfferName,
						                        startDate : subOfferItemVO.effDate,
						                        endDate : subOfferItemVO.expDate,
						                        orderStatus : '订购',
						                        serviceIdList : relaAccessItemInfo ? relaAccessItemInfo.serviceId : ''
					                        }
					                        
				                        }), cm),
				        
				        grid = new loader.subProdOfferOrderGridClass({
					                cm : cm,
					                ds : ds
				                });
			        dojo.place(grid.domNode, contentPane.containerNode, "last");
			        this.styleOrderedSubProdOfferGrid(grid);
			        
		        },
		        /**
				 * 渲染共享版套餐
				 * 
				 * @method
				 */
		        renderSingleOrderedSubProdOfferGrid : function() {
			        var loader = this,
				        mainOfferItemVO = $ac$.get("mainOfferItemVO"),
				        cm = new BusCard.widget.grid.ColumnModel({
					                metaData : loader.getSubProdOfferColumns()
				                }),
				        ds = new BusCard.widget.grid.DataSource(dojo.map(loader.custOrderVOHelper
				                                .getSubProdOfferItemList(mainOfferItemVO.orderItemId), function(
				                                subOfferItemVO) {
					                        var subOfferInfoVO = loader.getProdOfferInfoVO(subOfferItemVO.prodOfferId);
					                        var relaAccessItemInfo = loader.custOrderVOHelper
					                                .getAcessProdItem(subOfferItemVO);
					                        loader.dealRaiseXDSLSpeed(subOfferInfoVO, relaAccessItemInfo);
					                        return {
						                        prodOfferName : subOfferInfoVO.prodOfferName,
						                        startDate : subOfferItemVO.effDate,
						                        endDate : subOfferItemVO.expDate,
						                        orderStatus : '订购',
						                        serviceIdList : relaAccessItemInfo ? relaAccessItemInfo.serviceId : ''
					                        }
					                        
				                        }), cm),
				        
				        grid = new loader.subProdOfferOrderGridClass({
					                cm : cm,
					                ds : ds
				                });
			        dojo.place(grid.domNode, unieap.byId('subProdOfferPane').containerNode, "last");
			        this.styleOrderedSubProdOfferGrid(grid);
		        },
		        styleOrderedSubProdOfferGrid : function(grid) {
			        var domNode = grid.domNode;
			        var trNodeList = dojo.query("tr[rindex]", domNode);
			        dojo.forEach(trNodeList, function(node) {
				                var startDateNode = dojo.query("[name=startDate]", node)[0];
				                if (startDateNode) {
					                var dateString = dojo.trim(startDateNode.innerHTML);
					                try {
						                var orderedDate = util.DateHelper.getDateFromString(dateString).getTime();
						                var todayDate = util.DateHelper
						                        .getDateFromString($ac$.get("requestParam").today).getTime();
						                if (orderedDate > todayDate) {
							                dojo.addClass(node, "prod-offer-add");
						                } else {
							                dojo.addClass(node, "prod-offer-add");
						                }
						                
					                }
					                catch (e) {

					                }
				                }
				                
			                });
			        
		        },
		        
		        /**
				 * 处理升速属性
				 * 
				 * @param {Object} subOfferInfoVO PPM规格数据
				 * @param {Object} relaAccessItemInfo 接入类产品订单项对象
				 * @method
				 */
		        dealRaiseXDSLSpeed : function(subOfferInfoVO, relaAccessItemInfo) {
			        // 如果关联的接入类不存在，则不处理
			        if (!relaAccessItemInfo) { return; }
			        subOfferInfoVO = util.ProdOfferHelper.getProdOfferDetail(subOfferInfoVO.prodOfferId);
			        // 获取升速对象
			        var raiseSpeedObj = util.ProdOfferHelper.getRaiseSpeedObj(subOfferInfoVO);
			        // 升速对象如果是空，则不处理
			        if (raiseSpeedObj == null) { return; }
			        // 获取使用号码对象
			        var trs = dojo.query(".main-product-basic", this.mainProdOfferWidget.domNode);
			        // 获取接入类产品实例id
			        var userId = relaAccessItemInfo.userId;
			        var prodBasicTr = dojo.filter(trs, function(tr) {
				                return dojo.attr(tr, "userId") == userId
				                        && dojo.query(".main-product-check", tr)[0].checked;
			                })[0];
			        var uniqueId = dojo.attr(prodBasicTr, "uniqueId");
			        raiseSpeedObj.uniqueId = uniqueId;
			        raiseSpeedObj.prodOfferId = subOfferInfoVO.prodOfferId;
			        // 为防止报错，拼一下结构
			        var rowData = {
				        showData : {}
			        };
			        raiseSpeedObj.rowData = rowData;
			        var publisher = new BusCard.messaging.Publisher();
			        publisher.publish("/message/raiseSpeed" + uniqueId, raiseSpeedObj);
		        },
		        
		        getBelongCode : function() {
			        var belongCodeList = $ac$.query("$.selectedMemberProdOfferList[*].prodItemVO.belongCode");
			        return dojo.filter(belongCodeList, function(v) {
				                return !!v;
			                })[0];
			        
		        },
		        
		        getPromotionColumns : function() {
			        var columnList = this.inherited(arguments);
			        dojo.forEach(columnList, function(column) {
				                column.render = null;
			                });
			        
			        return columnList;
			        
		        },
		        
		        getSubProdOfferColumns : function() {
			        var columnList = this.inherited(arguments);
			        dojo.forEach(columnList, function(column) {
				                column.render = null;
			                });
			        return columnList.slice(0, 5);
		        },
		        /**
				 * 恢复标准地址名称
				 * 
				 * @param {BusCard.Card} serviceCard
				 * @param {Object} orderItemVO
				 * @method
				 */
		        recoveryStandardAddr : function(serviceCard, orderItemVO) {
			        var addrDetail = orderItemVO.addrDetail,
				        addressId = orderItemVO.addrId,
				        addressIdElem = serviceCard.$("addrId");
			        if (addrDetail && serviceCard.$('addrDetail')) {
				        serviceCard.$('addrDetail').value = addrDetail;
			        }
			        if (addressId && /^(\d+)$/.test(addressId.toString())) {
				        try {
					        addressIdElem.value = "";
					        addressIdElem.rvalue = addressId;
					        var addressIdText = BusCard.$remote("mktGetAddressNameDAO").getAddressNameById(
					                orderItemVO.cityCode, addressId);
					        if (addressIdText) {
						        addressIdText = addressIdText.replace(/"/g, "");
					        }
					        if (addressIdText && addressIdText != "null") {
						        addressIdElem.value = addressIdText;
					        }
					        
				        }
				        catch (e) {

				        }
				        
			        }
			        
		        },
		        /**
				 * 恢复业务群名称
				 * 
				 * @param {BusCard.Card} serviceCard
				 * @param {Object} orderItemVO
				 * @method
				 */
		        recoveryServiceGrouop : function(serviceCard, orderItemVO) {
			        if (orderItemVO.serviceGroupId) {
				        var offerProdRelaList = $ac$.get("selectedMainProdOfferInfoVO").offerProdRelaList;
				        var netType = dojo.filter(offerProdRelaList, function(rela) {
					                return rela.productId == orderItemVO.productId;
				                })[0].productInfoVO.netType;
				        try {
					        var serviceGroupName = BusCard.$remote("serviceParamBO").getServiceGroupName(
					                orderItemVO.cityCode, orderItemVO.serviceGroupId, netType);
					        if (dojo.isString(serviceGroupName)) {
						        var domNode = serviceCard.$('serviceGroupId');
						        domNode && (domNode.value = serviceGroupName.replace(/"/g, "").replace(/'/g, ""));
					        }
				        }
				        catch (e) {

				        }
				        
			        }
			        
		        },
				_dispatchEvent:function(elem,name){
					if(elem&&name){
						if(dojo.isIE){
							var eventObj = document.createEventObject();
							elem.fireEvent("on"+name,eventObj);
						}else{
							var eventObj = document.createEvent("Event");
							eventObj.initEvent(name,true,true);
							elem.dispatchEvent(eventObj);
						}		
					
					};
					
				},		        
		        recoveryBranchNo:function(serviceCard, orderItemVO){
		        	var bureauIdNode = serviceCard.$("bureauId");
		        	var branchNoNode = serviceCard.$("branchNo");
		        	if(bureauIdNode&&branchNoNode){
		        		var branchNo = orderItemVO.branchNo;
		        		if(branchNo){
		        			var param = "&ServiceKind=0"+"&apply_event=-1"+"&infoId=66";
							var result = util.ServiceFactory.getService("url:businessAcceptAction.do?method=getCityBusinessParamValue" + param);
							if(!!result && result == "1"){
								bureauIdNode.value = branchNo;
							}else{
								var value = BusCard.$remote("mktResInterfaceBO").getUpIdByBureauId(orderItemVO.cityCode,branchNo);
		        				bureauIdNode.value = (value||"").replace(/"/g,"");
							}
		        			this._dispatchEvent(bureauIdNode,"change");
		        			//bureauIdNode.onchange&&bureauIdNode.onchange();
		        			branchNoNode.value = branchNo;
		        			serviceCard.$("serviceId").value = orderItemVO.serviceId;
		        			serviceCard.$("resInstId")&&(serviceCard.$("resInstId").value=orderItemVO.resInstId||"");
		        		}
		        	}
		        	
		        },
		        reRenderingPromotionCart : function() {
			        return false;
		        },
		        
		        hiddenAssureInfo : function(card) {
			        if (card) {
				        var headerNode = dojo.query("[id=header-1002]", card.dom)[0];
				        if (headerNode) {
					        headerNode.style.display = "none";
				        }
				        
			        }
			        
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
				        selectMemberInfo = BusCard.jsonPath($ac$.get("selectedMemberProdOfferList"), "$[?(@.uniqueId=="
				                        + uniqueId + ")]")[0],
				        prodItemVO = selectMemberInfo.prodItemVO,
				        productNewServiceOfferId = controller
				                .getServiceOfferConfigVO(util.ACTION_CD_CONST.PRODUCT_INSTALL).serviceOfferId,
				        cb = function(dom, cardParam) {
					        serviceIdNode = dojo.query("[name=serviceId]", dom)[0];
					        serviceIdNode.value = prodItemVO.serviceId;
					        cardParam.serviceOfferId = productNewServiceOfferId;
					        cardParam.serviceId = prodItemVO.serviceId;
					        cardParam.userId = prodItemVO.userId;
					        cardParam.orderItemId = prodItemVO.orderItemId;
					        cardParam.cityCode = prodItemVO.cityCode;
					        cardParam.belongCode = prodItemVO.belongCode;
					        dojo.attr(dom, {
						                serviceId : prodItemVO.serviceId + "",
						                userId : "" + prodItemVO.userId,
						                prodInstId : "" + prodItemVO.userId
					                });
					        _cb && _cb.apply(null, arguments);
				        },
				        param = dojo._toArray(arguments);
			        param[1] = cb;
			        param[2] = function() {
			        	if(!!prodItemVO.bookDate && prodItemVO.bookDate.length > 10){
			        		prodItemVO.bookDate = prodItemVO.bookDate.substring(0,10);
			        	}
			        	prodItemVO.passwordConfirm = prodItemVO.password;
				        this.busCardInstance.renderDefaultValue(prodItemVO);
				        controller.recoveryStandardAddr(this.busCardInstance, prodItemVO);
				        controller.recoveryServiceGrouop(this.busCardInstance, prodItemVO);
				        controller.recoveryBranchNo(this.busCardInstance, prodItemVO);
				        controller.hiddenAssureInfo(this.busCardInstance);
			        };
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
		        addProdAttrCardWidget : function(serviceCardWidget, cb, serviceCardCallback) {
			        var _param = dojo._toArray(arguments),
				        controller = this,
				        querySpecAttrVO = function(attrId) {
					        return BusCard.jsonPath($ac$.selectedMainProdOfferInfoVO.offerProdRelaList,
					                "$[*].productInfoVO.attrList[?(@.attrId==" + attrId + ")]")[0];
					        
				        },
				        // 还原订单项中的数据
				        cb = function() {
					        var card = this.busCardInstance,
						        orderItemId = card.getParent().getCardRelationInfo().orderItemId,
						        _qr = controller.custOrderVOHelper.filterOrderItemList(function(item) {
							                return item.orderItemId == orderItemId;
						                })[0].prodInstAttrList || [],
						        
						        attrValueObj = {};
					        dojo.forEach(_qr, function(attrVO) {
						                var specAttrVO = querySpecAttrVO(attrVO.attrId);
						                //防止改单的时候combobox类型的无法进行还原
						                if(specAttrVO.valueShowType == "comboBox"){
						                	return ;
						                }
						                attrValueObj[specAttrVO.attrCd] = attrVO.attrValue;
						                
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
					        
				        };
			        _param[1] = cb;
			        return this.inherited(arguments, _param);
			        
		        },
		        
		        addServiceProdCardWidget : function() {
			        
			        return false;
			        
		        },
		        /**
				 * 改单此方法不再处理促销政策的内容
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
		        },
		        /**
				 * @override
				 * @method
				 */
		        initFunctionNavigatorWidget : function() {
			        this.inherited(arguments);
			        this.functionNavigatorWidget.switchGroup(3);
		        },
		        /**
				 * 订单信息回调处理
				 * 
				 * @override
				 * @param {controller} 当前受理环境的总体控制器
				 * @method
				 */
		        _orderInfoCallback : function(controller) {
			        var widget = this,
				        busCardInstance = widget.busCardInstance,
				        custOrderBasicInfo = $ac$.get("custOrderVO").custOrderBasicInfo;
			        busCardInstance.renderDefaultValue(custOrderBasicInfo);
			        dojo.forEach([].concat(dojo.query("INPUT", busCardInstance.dom)).concat(dojo.query("select",
			                        busCardInstance.dom)).concat(dojo.query("textarea", busCardInstance.dom)),
			                function(node) {
				                node.disabled = true;
				                if(dojo.query("[id=search_"+node.id+"]",busCardInstance.dom)[0]){
				                	dojo.query("[id=search_"+node.id+"]",busCardInstance.dom)[0].disabled = true;
				                }
			                });
			        controller.renderOrderChangeReasonView(busCardInstance);
		        },
		        /**
				 * 经办人信息回调处理
				 * 
				 * @method
				 */
		        _viaInfoCallback : function(controller) {
			        var widget = this,
				        busCardInstance = widget.busCardInstance,
				        custOrderBasicInfo = $ac$.get("custOrderVO").custOrderBasicInfo;
			        busCardInstance.renderDefaultValue(custOrderBasicInfo);
			        dojo.forEach([].concat(dojo.query("INPUT", busCardInstance.dom)).concat(dojo.query("select",
			                        busCardInstance.dom)).concat(dojo.query("textarea", busCardInstance.dom)),
			                function(node) {
				                node.disabled = true;
			                });
			        
		        },
		        /**
				 * 处理主销售品属性信息
				 * 
				 * @method
				 */
		        renderMainProdOfferAttr : function() {
			        // 以下是隐藏处理
			        var mainProdOfferWidget = this.mainProdOfferWidget;
			        var domNode = mainProdOfferWidget.domNode;
			        dojo.query(".main-prodoffer-detail", domNode).each(function(node) {
				                node.style.display = "none";
				                
			                });
			        return null;
			        // 以下主销售品属性展现但不能修改处理
			        this.inherited(arguments);
			        var widget = this.mainProdOfferDetailWidget;
			        if (widget && widget.prodOfferAttrCard) {
				        widget.prodOfferAttrCard.addCardCallback(function() {
					                var card = this.busCardInstance;
					                if (card) {
						                BusCard.query("input,select,textarea", card.dom).each(function(node) {
							                        node.disabled = true;
						                        });
					                }
					                
				                });
				        var busCardInstance = widget.prodOfferAttrCard.busCardInstance;
				        busCardInstance
				                && BusCard.query("input,select,textarea", busCardInstance.dom).each(function(node) {
					                        node.disabled = true;
				                        });
				        
			        }
			        
		        }
		        
	        });
        });