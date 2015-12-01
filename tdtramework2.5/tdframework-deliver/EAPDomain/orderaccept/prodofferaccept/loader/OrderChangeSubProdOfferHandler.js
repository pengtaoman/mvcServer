defineModule("orderaccept.prodofferaccept.loader.OrderChangeSubProdOfferHandler", ["orderaccept.base.Controller",
                "../util", "unieap.layout.TabContainer", "unieap.layout.ContentPane",
                "orderaccept.prodofferaccept.widget.mainprodoffer.MultipleMainProdOfferWidget"], function(Controller,
                util, TabContainer, ContentPane, MultipleMainProdOfferWidget) {
	        
	        dojo.declare("orderaccept.prodofferaccept.loader.OrderChangeSubProdOfferHandler", [Controller], {
		        controller : null,
		        subProdOfferTabContainer : null,
		        constructor : function(controller) {
			        this.controller = controller;
		        },
		        
		        doMultipleSubProdOfferFilter : function() {
			        return this[$ac$.get('processId') + "Dispatch"]();
		        },
		        sharedProdOfferInstallDispatch : function() {
			        var selectedMainProdOfferInfoVO = $ac$.get("selectedMainProdOfferInfoVO"),
				        selectedMemberProdOfferList = $ac$.get("selectedMemberProdOfferList");
			        this.controller.renderSingleOrderedSubProdOfferGrid();
			        
		        },
		        
		        buildTabPageTitle : function(action) {
			        return util.actionNameMap[action];
		        },
		        
		        independenceProdOfferInstallDispatch : function() {
			        var handler = this;
			        var selectedMainProdOfferInfoVO = $ac$.get("selectedMainProdOfferInfoVO"),
				        selectedMemberProdOfferList = $ac$.get("selectedMemberProdOfferList");
			        this.subProdOfferTabContainer = new TabContainer({
				                id : 'subProdOfferTabContainer',
				                height : "460px"
			                });
			        this.subProdOfferTabContainer.startup();
			        dojo.place(this.subProdOfferTabContainer.domNode, unieap.byId("subProdOfferPane").containerNode,
			                "first");
			        var contentPaneList = dojo.map(selectedMemberProdOfferList, function(prodOfferInfoVOWrapper) {
				        var prodOfferInfoVO = handler.controller.getProdOfferInfoVO(prodOfferInfoVOWrapper.prodOfferId);
				        if (!prodOfferInfoVOWrapper.prodOfferInfoVO) {
					        prodOfferInfoVOWrapper.prodOfferInfoVO = prodOfferInfoVO;
				        }
				        var contentPane = new ContentPane(dojo.mixin({
					                title : prodOfferInfoVOWrapper.prodOfferInfoVO.prodOfferName + "-"
					                        + handler.buildTabPageTitle(prodOfferInfoVOWrapper.action),
					                prodOfferInfoVO : prodOfferInfoVOWrapper.prodOfferInfoVO,
					                uniqueId : prodOfferInfoVOWrapper.uniqueId,
					                id : "subProdOfferTabPane" + prodOfferInfoVOWrapper.uniqueId
					                
				                }, prodOfferInfoVOWrapper));
				        return contentPane;
				        
			        });
			        dojo.forEach(contentPaneList, function(contentPane) {
				                handler.subProdOfferTabContainer.addChild(contentPane);
				                handler.initMainProdOfferPane(contentPane);
				                
			                });
			        
		        },
		        initMainProdOfferPane : function(contentPane) {
			        var handler = this,
				        offerItemVO = contentPane.offerItemVO,
				        mainProdOfferInfoVO = this.controller.getProdOfferInfoVO(offerItemVO.prodOfferId),
				        offerInstVO = contentPane.offerInstVO;
			        mainProdOfferInfoVO.offerProdRelaList = [];
			        var offerInfoWidget = new MultipleMainProdOfferWidget({
				                mainProdOfferInfoVO : mainProdOfferInfoVO,
				                uniqueId : contentPane.uniqueId,
				                contentPane : contentPane
			                });
			        dojo.place(offerInfoWidget.domNode, contentPane.containerNode, "first");
			        this.updateViewWithOrderItemStatus(offerInfoWidget, mainProdOfferInfoVO, offerItemVO);
			        this.controller.renderOrderedSubProdOfferGrid(contentPane, mainProdOfferInfoVO, offerItemVO);
			        
		        },
		        updateViewWithOrderItemStatus : function(offerInfoWidget, prodOfferInfoVO, offerItemVO) {
			        var effDateNode = dojo.query(".startDate-class", offerInfoWidget.domNode)[0],
				        expDateNode = dojo.query(".endDate-class", offerInfoWidget.domNode)[0];
			        effDateNode && (effDateNode.innerHTML = offerItemVO.effDate);
			        expDateNode && (expDateNode.innerHTML = offerItemVO.expDate);
			        
		        }
		        
	        });
	        
        });
