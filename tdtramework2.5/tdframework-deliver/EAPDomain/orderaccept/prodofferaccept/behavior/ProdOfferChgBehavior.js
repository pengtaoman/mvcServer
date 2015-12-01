defineModule("orderaccept.prodofferaccept.behavior.ProdOfferChgBehavior",
        ["../util", "../widget/prodoffersearchlist/ProdOfferSearchListWidget",
                "../widget/attrcard/ProductAttrCardWidget", "../widget/subprodoffernum/SubProdOfferNumWidget",
                "./ProdOfferNewBehavior", "orderaccept.custom.popup"], function(util, searchListWidget,
                ProductAttrCardWidget, SubProdOfferNumWidget, ProdOfferNewBehavior) {
	        
	        dojo.declare("orderaccept.prodofferaccept.behavior.ProdOfferChgBehavior", [ProdOfferNewBehavior], {
		                postscript : function() {
			                this.subscribe();
		                },
		                /**
						 * 订阅各种消息
						 * 
						 * @method
						 */
		                subscribe : function() {
			                this.inherited(arguments);
		                },
		                onSubProdOfferCheckBoxClick : function(event) {
			                this.inherited(arguments);
			                this.confirmKeepProd(event);
		                },
		                onMainProdOfferConfirm : function(event) {
			                var selectedMemberProdOfferList = this._getSelectedMemberInfoList(event),
				                self = this;
			                this.assertSeletedChanged(selectedMemberProdOfferList, function() {
				                        var prodOfferList = $ac$.get("prodOfferList");
				                        $ac$.set("selectedMainProdOfferInfoVO", util.ProdOfferHelper
				                                        .getMainProdOffer(prodOfferList)[0]);
				                        $ac$.set("selectedMemberProdOfferList", selectedMemberProdOfferList);
				                        self.controller.beginOrder();
			                        }, function() {
				                        util.navigatorManager.to("prodOfferAcceptPane")(function() {
					                                dojo.byId("function-navigator-root").style.display = "block";
				                                	unieap.byId("shoppingCartPane").domNode.style.display = 'none';
				                                
				                        });
				                        
			                        });
			                
		                },
		                
		                /**
						 * 确认是否保留产品
						 */
		                confirmKeepProd : function(event) {
			                // var target = event.currentTarget,
			                // rowIndex =
			                // target.getAttribute("rowIndex");
			                // bindingData = this.controller
			                // .route("/subProdOfferCartDataProvider/getSubGridBindingData");
			                // if (target.checked === false) {
			                // var currentBindData =
			                // dojo.filter(bindingData, function(data)
			                // {
			                // return data.rowIndex == rowIndex;
			                // })[0],
			                // currentProdOffer =
			                // currentBindData.subProdOfferInfo,
			                // currentProdOfferInst =
			                // currentBindData.prodOfferInst;
			                // if (currentProdOfferInst) {
			                // // 关联的产品信息
			                // var relaProdInfoList =
			                // currentProdOfferInst.relaProdInfoList
			                // || [];
			                // // 目前只提示第一个产品
			                // if (relaProdInfoList.length > 0) {
			                // // 获取产品信息
			                // var productInfoVO =
			                // util.ProdOfferHelper
			                // .getProductInfoByProdId(currentProdOffer,
			                // relaProdInfoList[0].prodId);
			                // if (productInfoVO) {
			                // productInfoVO =
			                // productInfoVO.productInfoVO;
			                // var innerInterfaceBOStub = BusCard
			                // .$remote("innerInterfaceBO");
			                // // 根据产品ID取基础销售品
			                // var baseProdOfferId =
			                // innerInterfaceBOStub
			                // .getProdBaseProdOfferRel({
			                // productId : productInfoVO.productId
			                // });
			                // if (true || (baseProdOfferId != null &&
			                // "0" != baseProdOfferId)) {
			                // var tp =
			                // "销售品【#{prodOfferName}】下包含产品【#{productName}】,是否保留产品?";
			                // MessageBox.confirm({
			                // title : "是否保留产品?",
			                // message :
			                // BusCard.Template.create(tp).apply({
			                // prodOfferName :
			                // currentProdOffer.prodOfferName,
			                // productName : productInfoVO.productName
			                // }),
			                // onComplete : function(currentBindData)
			                // {
			                // return function(value) {
			                // if (value) {
			                // currentBindData.keepedProdInfoList =
			                // {};
			                // currentBindData.keepedProdInfoList.prodOfferId
			                // = currentProdOffer.prodOfferId;
			                // currentBindData.keepedProdInfoList[productInfoVO.productId]
			                // = baseProdOfferId;
			                // } else {
			                // currentBindData.keepedProdInfoList =
			                // null;
			                // }
			                // }
			                // }(currentBindData),
			                // iconCloseComplete : true
			                // }, dojo.byId("subProdOfferCart"));
			                // }
			                // }
			                // }
			                // }
			                // }
		                },
		                
		                onPromotionChangeDetailClick : function(evt){
		        			var controller = this.controller,
						        rowIndex = evt.currentTarget.getAttribute("rowIndex"),
						        tooltipId = evt.currentTarget.getAttribute("id") + "_dropdown",
						        tooltip = dojo.query("DIV[id='" + tooltipId + "']")[0],
						        promotionId = evt.currentTarget.getAttribute("value");
					        var promotionDetailWidget = controller.promotionDetailBuilder.prodOfferDetailWidgetList[""
					                + rowIndex];
					        if (!promotionDetailWidget) {
						        controller.initPromotionDetail(rowIndex);
						        promotionDetailWidget = controller.promotionDetailBuilder.prodOfferDetailWidgetList[""
						                + rowIndex];
					        }
					        if (tooltip && tooltip.style.display != "none") {
						        orderaccept.custom.popup.close({
							                widget : promotionDetailWidget
						                });
					        } else {
						        orderaccept.custom.popup.open({
							                widget : {
								                popup : promotionDetailWidget,
								                around : evt.currentTarget,
								                onCancel : function() {
									                orderaccept.custom.popup.close({
										                        widget : promotionDetailWidget
									                        });
								                }
							                }
						                });
					        }
		        		}
	                });
        });