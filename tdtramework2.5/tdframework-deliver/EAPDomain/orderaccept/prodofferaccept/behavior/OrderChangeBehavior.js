defineModule("orderaccept.prodofferaccept.behavior.OrderChangeBehavior", ["./ProdOfferNewBehavior", "../util"],
        function(ProdOfferNewBehavior, util) {
	        dojo.declare("orderaccept.prodofferaccept.behavior.OrderChangeBehavior", [ProdOfferNewBehavior], {
		                _buildCompleteOrderParam : function() {
			                var custOrderId = dojo.global.$appContext$.get("_currentCustOrderId");
			                return {
				                orderChangeFlag : 1,
				                custOrderId : custOrderId
			                };
		                },
		                subscribe : function() {
			                this.inherited(arguments);
			                // 点击返回处理程序
			                this.handleRegistry.push(dojo.subscribe("/back2OrderChangePage/click", function(event) {
				                        var custOrderId = $ac$.requestParam.custOrderId;
				                        window.frameElement.src = BusCard.path.contextPath
				                                + "/orderChangeAction.do?method=init";
				                        
			                        }));
			                
		                },
		                
		                onSaveOrder : function(event) {
			                var controller = this.controller;
			                event.preventDefault();
			                // for focus purpose ,expand all panes
			                this.controller.expandAllPanes();
			                var _f = function() {
				                var orderData = this.controller.route("/dataBuilder/process");
				                if (!orderData) {
					                return false;
				                } else {
					                this.controller.waitingBarInstance.showMe();
					                var submitResult = BusCard.doPost(BusCard.path.contextPath
					                                + "/orderChangeAction.do?method=doSaveOrder", orderData, true,
					                        function(submitResult) {
						                        controller.waitingBarInstance.hideMe();
						                        if (submitResult && submitResult.flag == -1) {
							                        alert("\u4fdd\u5b58\u8ba2\u5355\u5931\u8d25:"
							                                + submitResult.message);
							                        return false;
						                        } else {
							                        // alert("\u8ba2\u5355\u4fdd\u5b58\u6210\u529f,\u8ba2\u5355\u7f16\u53f7\u4e3a:\n"
							                        // +
							                        // submitResult.message);
							                        var extendMessage = BusCard.parse(submitResult.extendMessage);
							                        var custOrderId = submitResult.message
							                                || $ac$.get("custOrderVO").custOrderBasicInfo.custOrderId;
							                        dojo.global.$appContext$.set("orderAlterId",
							                                extendMessage.orderAlterId ? parseInt(""
							                                        + extendMessage.orderAlterId) : 0);
							                        dojo.global.$appContext$.set("_currentCustOrderId", custOrderId);
							                        dojo.global.$appContext$.set("_hasSaveOrder", true);
							                        controller.showOrderList(submitResult.message
							                                || $ac$.get("custOrderVO").custOrderBasicInfo.custOrderId);
							                        // temp solution
							                        // ,avoid back to
							                        BusCard.query("[dojoAttachTopic='/toOrderDetailPage']",
							                                controller.functionNavigatorWidget.domNode).each(
							                                function(node) {
								                                node.style.display = "none";
							                                });
							                        BusCard.query("[dojoAttachTopic='/coutinueorder']",
							                                controller.functionNavigatorWidget.domNode).each(
							                                function(node) {
								                                node.style.display = "none";
							                                });
						                        }
						                        // changeStep(4);
					                    });
				                }
			                };
			                setTimeout(function(self) {
				                        return function() {
					                        return _f.apply(self, arguments);
				                        };
			                        }(this), 100);
			                
		                }
		                
	                });
	        
        });