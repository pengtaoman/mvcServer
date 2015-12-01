defineModule(
		"orderaccept.prodofferaccept.behavior.ProductChangeAcceptBehavior",
		[ "./MainProdOfferChgBehavior","./ProdOfferChgBehavior", "../util",
          "../widget/prodoffersearchlist/ProdOfferSearchListWidget",
				"orderaccept.common.dialog.MessageBox" ,"orderaccept.prodofferaccept.widget.mainprodofferchange.MainProdOfferChangeWidget"],
		function(MainProdOfferChgBehavior,ProdOfferChgBehavior, util, searchListWidget,messageBox) {
			dojo
					.declare(
							"orderaccept.prodofferaccept.behavior.ProductChangeAcceptBehavior",
							[ MainProdOfferChgBehavior ],
							{
								postscript : function() {
									this.subscribe();
								},
								subscribe : function() {
									var behavior = this;
									this.inherited(arguments);

									// 点击保持触发的动作
									dojo.connect( dojo.byId("changeParamList"),"onchange",
															function() {
																behavior.changeParamListChange(arguments);
															});
								},
								changeParamListChange : function() {

									var controller = this.controller;
									// 清空搜索列表
									if (controller.searchListWidgetInstance) {
										controller.searchListWidgetInstance
												.destroy();
										dojo.byId("prodOfferSearch").value = "";
									}
									

									if (controller.shoppingCartWidgetInstance) {
										controller.shoppingCartWidgetInstance
												.destroyRecursive();
										controller.shoppingCartWidgetInstance = null;
									}

									// 清空详情区域
									controller.clear();
									controller.mainProdOfferId = "";
									
								},
								onMainProdOfferSearchKeyup : function(event) {

							        var requestParam = dojo.global.$appContext$.get("requestParam");
						        	var parentNode = event.currentTarget.parentNode;
						        	var prodNameNode= dojo.query("[id=prodOfferSearch]",parentNode)[0];
						        	var tips = dojo.attr(prodNameNode,"tips");
						        	var prodName = prodNameNode.value;
							        if ((event.keyCode == 13||prodNameNode!==event.currentTarget)) {
								        if ((prodName==tips)||!prodName) {
								        	prodName="_";
								        }
									        var belongCode = dojo.byId("common-belongcode").value;
									        // 这里需要根据实际业务修改
									        if (belongCode == "") {
										        // alert("请选择查询区域！");
										        messageBox.alert({
											                busiCode : "08410098"
										                });
										        dojo.byId("belongCodeColl").focus();
										        return false;
									        }
									       var changeParamList= dojo.byId("changeParamList");
									        var productId = changeParamList.value;
									        if (productId == "null"||!productId) {
										        messageBox.alert({
											                busiCode : "08410219"
										                });
										        changeParamList.focus();
										        return false;
									        }
									        var mainProdOfferInstVO = $ac$.mainProdOfferInstVO;
									        if(mainProdOfferInstVO.bundleType==1){
										        messageBox.alert({
											                busiCode : "08410220"
										                });
										        return false;
									        }
									        var parentProdOfferInst=this.controller.requestParam.parentProdOfferInst||{};
									        var parentBundleType =parentProdOfferInst.bundleType;
									        var parentProdOfferId =parentProdOfferInst.prodOfferId;
									        var param = "belongCode=" + belongCode
									        +"&prodOfferInstId="+mainProdOfferInstVO.prodOfferInstId
									        +"&cityCode="+mainProdOfferInstVO.cityCode
									        +"&prodOfferId="+mainProdOfferInstVO.prodOfferId 
									        +"&productId="+productId
									        +"&usingProductId="+(requestParam.productId||"")
									        +"&prodName=" + prodName 
									        +"&method=getProdOfferInfoByNameAndProduct";
									        if(parentBundleType&&(parentBundleType==2)&&parentProdOfferId){
									        	param+="&parentProdOfferId=" + parentProdOfferId ;
									        	param+="&parentBundleType=" + parentBundleType ;
									        }
									        var prodOfferListVOList = util.ServiceFactory.getService("url:shoppingCartAction.do?"
									                + param);
									        
									        if(!prodOfferListVOList||prodOfferListVOList.length<=0){
									        	 messageBox.alert({
										                busiCode : "08410230"
									                });
									        	 return false;
									        }
									        //if ProductId is unchanged then set sameProductId  1 
									        
											if(requestParam){
												if(requestParam.productId&&requestParam.productId==productId){
													requestParam.sameProductId=1;
												}else{
													requestParam.sameProductId=0;
												}
											}
									        dojo.global.$appContext$.set("_searchProdOfferList", prodOfferListVOList);
									        if (this.controller.searchListWidgetInstance) {
										        this.controller.searchListWidgetInstance.destroy();
									        }
									        this.controller.searchListWidgetInstance = new searchListWidget();
									        dojo.place(this.controller.searchListWidgetInstance.domNode, unieap
									                        .byId("mainProdOfferSearchResult").containerNode, "last");
									        unieap.byId("TabContainer").selectChild(unieap.byId("mainProdOfferSearchResult"));
								        
							        }
							        
						        },
						        onMainProdOfferConfirm : function(event) {
						        	if( $ac$.mainProdOfferInstVO.prodOfferId==this.controller.mainProdOfferId ){
						        		this.controller.mainProdOfferWidgetClass =orderaccept.prodofferaccept.widget.mainprodofferchange.MainProdOfferChangeWidget;	
						        		this.controller.dataBuilder = new orderaccept.prodofferaccept.data.ProductChangeAcceptDataBuilder(this.controller);
						        	}else{
						        		this.controller.mainProdOfferWidgetClass =orderaccept.prodofferaccept.widget.mainprodofferchangemain.ProductChangeAcceptChangeMainProdOfferWidget;
						        		
						        		this.controller.dataBuilder = new orderaccept.prodofferaccept.data.ProductChangeAcceptMainChangeDataBuilder(this.controller);
						        	}
									this.inherited(arguments);
				                }
							});

		});