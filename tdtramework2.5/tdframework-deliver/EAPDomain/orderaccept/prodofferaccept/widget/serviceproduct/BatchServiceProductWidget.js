defineModule("orderaccept.prodofferaccept.widget.serviceproduct.BatchServiceProductWidget", 
				["./ServiceProductWidget","orderaccept.custom.TooltipDialog",
				"../attrcard/ProductAttrCardWidget"],
        function(ServiceProductWidget,TooltipDialog,ProductAttrCardWidget) {
	        /**
			 * 创建主销售品订购时对应的widget
			 * 
			 * @class
			 * @requires ["dijit._Widget",
			 *           "orderaccept.custom._BusCardTemplated",
			 *           "orderaccept.prodofferaccept.util"]
			 * @module orderaccept.prodofferaccept.widget.serviceproduct.ServiceProductWidget
			 * @runtimeDependences $appContext$.prodOfferList
			 */
	        dojo.declare("orderaccept.prodofferaccept.widget.serviceproduct.BatchServiceProductWidget", [ServiceProductWidget], {
		                templatePath : dojo.moduleUrl("orderaccept.prodofferaccept.widget.serviceproduct",
		                        "template/batchServiceProductTpl.html"),
                    	constructor : function(){
				            this.rowSize = 3;  
                    	},
                    	initServiceProdAttr : function(prodWidget,productInfo,prodInstVO){
					        var serviceProdAttrWidget = new TooltipDialog({
						                id : 'serviceProdAttrWidget-'+prodWidget.serviceCardWidget.metaData.uniqueId+'-'+productInfo.rowIndex
					                });  
				            prodWidget.serviceProdAttrList[productInfo.rowIndex] = serviceProdAttrWidget;			        
			       			serviceProdAttrWidget.startup();					            
					        var commitButton = "<div style='text-align:center;vertical-align:middle'><a href='javascript:void(0);' dojoAttachEvent='onclick:elementclick' \
					        		dojoAttachTopic='/prodOfferDetailBtn'\ style='text-align:center;vertical-align:middle;'>关闭</a></div>";	
					        dojo.place(commitButton, serviceProdAttrWidget.containerNode, "last");					        
					        var tabContainer = new unieap.layout.TabContainer({
					        	height : 'auto' ,
					        	width : "400px"
				        	});					        
					        serviceProdAttrWidget.tabContainer = tabContainer;					        
					        tabContainer.startup();      				            
					        var attrCardWidget = new ProductAttrCardWidget({
						                productInfoVO : productInfo.productInfoVO,
						                prodOfferInfoVO : prodWidget.prodOfferInfoVO
					                });
					        if (attrCardWidget.needRendering) {
					        	var contentPane = new unieap.layout.ContentPane({
						                title : "产品属性"
					                });
						        attrCardWidget.busCardInstance.setParent(serviceProdAttrWidget);
				        		attrCardWidget.renderCard(contentPane.domNode, "first");
						        tabContainer.addChild(contentPane);
					        }
				        	if(!!prodInstVO&& !!prodInstVO.prodInstAttrList && prodInstVO.prodInstAttrList.length > 0){
				        		util.SetAttrInst(prodInstVO.prodInstAttrList,attrCardWidget.busCardInstance);
				        	}					                        
			       		    serviceProdAttrWidget.enableEvtMsgPropagation(serviceProdAttrWidget.domNode);  
			        		dojo.place(tabContainer.domNode, serviceProdAttrWidget.containerNode, "first"); 
			        		serviceProdAttrWidget.attrCardWidget = attrCardWidget;
			        		return attrCardWidget;
		                }
	                });
	        
        });