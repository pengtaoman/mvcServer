/**
 * 此模块放置订单列表
 * 
 * @module
 */
defineModule("orderaccept.prodofferaccept.OrderShowLoader", ["orderaccept.prodofferaccept.util",
                "orderaccept.prodofferaccept.widget.budget.BudgetWidget"], function(util, BudgetWidget) {
	        
	        dojo.declare("orderaccept.prodofferaccept.OrderShowLoader", [], {
		        
		        layoutTemplateUrl : dojo.moduleUrl("orderaccept.prodofferaccept", "view/orderShowPage.html"),
		        
		        /**
				 * 客户订单号
				 */
		        custOrderId : null,
		        
		        /**
				 * 订单列表集合对象
				 */
		        orderDetailListObj : null,
		        
		        /**
				 * 客户订单列表表格对象
				 */
		        custOrderListGrid : null,
		        
		        budgetComponent : null,
		        
		        constructor : function(data) {
			        this.custOrderId = data.custOrderId;
		        },
		        
		        _clearDirtyEnv : function() {
			        try {
				        var custOrderListPane = unieap.byId("custOrderListPane"),
					        budgetHeadPane = unieap.byId("budgetHeadPane");
				        if (custOrderListPane) {
					        custOrderListPane.destroyRecursive();
				        }
				        if (budgetHeadPane) {
					        budgetHeadPane.destroyRecursive();
				        }
				        
			        }
			        catch (e) {

			        }
			        
		        },
		        postscript : function() {
			        var orderShowBuilder = this;
			        var rootNode = dojo.byId("order-show-root");
			        this._clearDirtyEnv();
			        rootNode.innerHTML = dojo._getText(this.layoutTemplateUrl);
			        // 1.首先渲染布局
			        dojo.parser.parse(rootNode);
			        // 2.获取订单列表数据
			        orderShowBuilder.initOrderDetailData();
			        // 3.渲染页面订单列表表格
			        orderShowBuilder.renderCustOrderListGrid();
			        // 4.将订单列表数据渲染到订单列表页面上
			        // orderShowBuilder.showOrderListData();
			        // 5.展示预算列表
			        if (orderShowBuilder.budgetComponent) {
				        orderShowBuilder.budgetComponent.destroyRecursive();
			        }
			        
			        var _budgetGridContainer = "<div  id='_budgetGridContainer'></div>";
			        dojo.place(_budgetGridContainer, unieap.byId("budgetHeadPane").containerNode, "last");
			        orderShowBuilder.budgetComponent = new BudgetWidget({
				                custOrderId : orderShowBuilder.custOrderId
			                }, dojo.byId("_budgetGridContainer"));
			        // 6.打开订单列表面板以及预算面板
			        orderShowBuilder.openShowDataPane();
			        // 7.查询并展现代理商费用
			        this.getAccountAll4Dealer();
			        
		        },
		        /**
				 * 获取代理商费用
				 * 
				 * @method
				 */
		        getAccountAll4Dealer : function() {
			        var paneWidget = unieap.byId("budgetHeadPane");
			        var serviceInfoNewList = prodOfferAcceptLoader.getNewServiceInfoList(true) || [];
			        var param = dojo.map(dojo.filter(serviceInfoNewList, function(item) {
				                        return true || !!(item.uimResInstId || item.resInstId);
			                        }), function(item) {
				                var data = {
					                serviceId : item.serviceId,
					                cityCode : BusCard.$session.cityCode + "" || "",
					                serviceKind : item.netType + "",
					                dealerId : BusCard.$session.acceptDealer + "" || BusCard.$session.dealerId + ""
				                };
				                if (item.resInstId) {
					                data["resInstId"] = item.resInstId + "";
					                
				                }
				                if (item.uimResInstId) {
					                data["corResInstId"] = item.uimResInstId + "";
				                }
				                return data;
			                });
			        var requestAndRenderingDealerAccount = function(param, buttonContainerNode) {
				        // 兼容二次业务
				        dojo.require("unieap.util.util");
				        var buttonContainerNode = paneWidget.buttonContainerNode;
				        var buttonTemplate = "<span style='color:red;margin-right:100px' id='dealerAccountQuerySpan'>\u4ee3\u7406\u8d26\u6237\u4f59\u989d</span>";
				        var innerTemplate = BusCard.Template
				                .create("<div style='margin-left:10px;margin-right:10px;'><tp:for ds=list><p>${toString()}</p></tp:for><div style='text-align:center;color:red'>"
				                        + "<span style='cursor:pointer' onclick='return unieap.hideTooltip(dojo.byId(\"dealerAccountQuerySpan\"));'>关闭</span></div></div>");
				        if (param && param.length) {
					        try {
						        var responeList = BusCard.$remote("feeToBussInterBO").getAccountAll(param);
						        if (true || responeList.length > 0) {
							        var htmlCode = innerTemplate.apply({
								                list : responeList
							                });
							        dojo.place(buttonTemplate, buttonContainerNode, "last");
							        dojo.connect(BusCard.query("span", buttonContainerNode)[0], "onclick", function() {
								                if (!unieap._masterTT) {
									                unieap._masterTT = new unieap._MasterTooltip();
								                }
								                unieap._masterTT.domNode.style.width = "240px";
								                if (unieap._masterTT.isShowingNow) {
									                unieap.hideTooltip(this);
								                } else {
									                unieap.showTooltip(htmlCode, this, ["after", 'below']);
									                
								                }
								                
							                });
							        
						        }
						        
					        }
					        catch (e) {
						        // throw e;
						        return false;
					        }
					        
				        }
			        };
			        requestAndRenderingDealerAccount(param, paneWidget.buttonContainerNode);
		        },
		        
		        /**
				 * 获取订单的详细信息
				 */
		        initOrderDetailData : function() {
			        var custOrderListBuilder = this;
			        if (!custOrderListBuilder.custOrderId) { return; }
			        var parameter = "custOrderId=" + custOrderListBuilder.custOrderId;
			        var resultJsonStr = util.ServiceFactory.getService("url:orderQueryAction.do?method=orderListInit&"
			                + parameter);
			        try {
				        custOrderListBuilder.orderDetailListObj = (typeof resultJsonStr == "string") ? dojo
				                .fromJson(resultJsonStr) : resultJsonStr;
			        }
			        catch (e) {
				        return;
			        }
		        },
		        /**
				 * 渲染表格
				 */
		        renderCustOrderListGrid : function() {
			        var custOrderListBuilder = this;
			        var dataList = custOrderListBuilder.sortOrderDetail(custOrderListBuilder.orderDetailListObj);
			        var cm = new BusCard.widget.grid.ColumnModel({
				                metaData : this.getCustOrderColumns()
			                });
			        this.custOrderListGrid = new BusCard.widget.grid.Grid({
				                cm : cm,
				                paging : true,
				                ds : new BusCard.widget.grid.JsonDataSource({
					                        loadData : function(param) {
						                        var start = param.start,
							                        end = param.end;
						                        return {
							                        root : dataList.slice(start, end),
							                        totalProperty : dataList.length
						                        };
					                        }
				                        }, cm),
				                pageSize : 10
			                });
			        this.custOrderListGrid.render(unieap.byId("custOrderListPane").containerNode);
			        
		        },
		        
		        getCustOrderColumns : function() {
			        return cm = [{
				                width : '10%',
				                name : 'custOrderId',
				                text : '客户订单号',
				                canSort : false
			                }, {
				                width : '10%',
				                name : 'orderItemId',
				                text : '订单项编号',
				                canSort : false
			                }, {
				                width : '10%',
				                name : 'orderItemCdDesc',
				                text : '订单项类型',
				                canSort : false
			                }, {
				                width : '20%',
				                name : 'orderName',
				                text : '销售品/产品名称',
				                canSort : false
			                }, {
				                width : '10%',
				                name : 'serviceOfferDesc',
				                text : '服务提供',
				                canSort : false
			                }, {
				                width : '10%',
				                name : 'serviceId',
				                text : '接入号码',
				                canSort : false
			                }, {
				                width : '20%',
				                name : 'handleTime',
				                text : '受理时间',
				                canSort : false
			                }, {
				                width : '10%',
				                name : 'orderStatus',
				                text : '订单状态',
				                canSort : false
			                }

			        ];
		        },
		        /**
				 * 渲染订单数据到表格中
				 */
		        showOrderListData : function() {
			        var custOrderListBuilder = this;
			        var orderData = dojo.map(custOrderListBuilder
			                        .sortOrderDetail(custOrderListBuilder.orderDetailListObj),
			                function(orderDetailInfo) {
				                return {
					                custOrderId : orderDetailInfo.custOrderId,
					                orderItemId : orderDetailInfo.orderItemId,
					                orderItemCdDesc : orderDetailInfo.orderItemCdDesc,
					                orderName : orderDetailInfo.orderName,
					                serviceOfferDesc : orderDetailInfo.serviceOfferDesc,
					                serviceId : orderDetailInfo.serviceId ? orderDetailInfo.serviceId : "",
					                handleTime : orderDetailInfo.handleTime,
					                orderStatus : orderDetailInfo.orderStatus
				                }
			                })
			        var gridStore = new unieap.ds.DataStore('order_data', orderData);
			        dataCenter.addDataStore(gridStore);
			        this.custOrderListGrid.getBinding().setDataStore(gridStore);
		        },
		        
		        /**
				 * 排序，先展示销售品订单项，然后展示产品订单项，再展示账户订单项
				 */
		        sortOrderDetail : function(orderDetailListObj) {
			        var index = 0,
				        newOrderDetailListObj = [];
			        for (var i = 0; i < orderDetailListObj.length; i++) {
				        if (util.orderTypeObj.OFFER == orderDetailListObj[i].orderItemCd) {
					        newOrderDetailListObj[index] = orderDetailListObj[i];
					        index++;
				        }
			        }
			        for (var j = 0; j < orderDetailListObj.length; j++) {
				        if (util.orderTypeObj.PRODUCT == orderDetailListObj[j].orderItemCd) {
					        newOrderDetailListObj[index] = orderDetailListObj[j];
					        index++;
				        }
			        }
			        for (var k = 0; k < orderDetailListObj.length; k++) {
				        if (util.orderTypeObj.ACCOUNT == orderDetailListObj[k].orderItemCd) {
					        newOrderDetailListObj[index] = orderDetailListObj[k]
					        index++;
				        }
			        }
			        return newOrderDetailListObj;
		        },
		        openShowDataPane : function() {
			        var panes = ["custOrderListPane", "budgetHeadPane"];
			        dojo.forEach(panes, function(paneId) {
				                var pane = unieap.byId(paneId);
				                if (pane && !pane.open) {
					                pane.toggle();
				                }
				                
			                });
		        },
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
			        
		        }
		        
	        });
	        
        });