defineModule("orderaccept.prodofferaccept.builder.prodofferdetail.MainProdOfferDetailBuilder", [
                "./ProdOfferDetailBuilder", "../../util", "../../widget/attrcard/ProductOfferAttrCardWidget",
                "../../widget/attrcard/ProductAttrCardWidget", "../../../custom/TooltipDialog",
                "../../widget/attrcard/OfferAgreementCardWidget", "unieap.layout.TabContainer",
                "unieap.layout.ContentPane"], function(ProdOfferDetailBuilder, util, ProductOfferAttrCardWidget,
                ProductAttrCardWidget, TooltipDialog, OfferAgreementCardWidget) {
	        /**
			 * 定义销售品详情整体构造器
			 * 
			 * @class
			 * @extends
			 */
	        dojo.declare("orderaccept.prodofferaccept.builder.prodofferdetail.MainProdOfferDetailBuilder",
	                [ProdOfferDetailBuilder], {
		                
		                /**
						 * 销售品属性卡片widget
						 */
		                ProductOfferAttrCardWidgetClass : ProductOfferAttrCardWidget,
		                
		                /**
						 * 产品属性卡片widget
						 */
		                ProductAttrCardWidgetClass : ProductAttrCardWidget,
		                
		                agreementAttrCardWidget : null,
		                /**
						 * 构造器
						 * 
						 * @param {loader}
						 */
		                constructor : function(loader) {
			                this.loader = loader;
			                // 销售品详情widget集合，每个可选包对应集合中一个对象
			                this.prodOfferDetailWidgetList = [];
		                },
		                
		                /**
						 * 根据可选包表格行号，初始化销售品详情
						 * 
						 * @param {rowIndex} 可选包表格行号
						 */
		                initProdOfferDetail : function(rowData) {
			                var builder = this,
				                loader = this.loader,
				                prodOfferInfo = rowData.subProdOfferInfo,
				                rowIndex = "main-" + prodOfferInfo.prodOfferId,
				                prodOfferInst = rowData.prodOfferInst,
				                prodOfferInfoWidget = rowData.prodOfferInfoWidget,
				                uniqueId = !!prodOfferInfoWidget?prodOfferInfoWidget.uniqueId:"",
				                ifMultiplSub = rowData.ifMultiplSub;
			                var prodOfferDetailWidget = new TooltipDialog({
				                        id : (!!ifMultiplSub
				                                ? 'multipleProdOfferDetailDialog-'
				                                : 'mainProdOfferDetailDialog-')
				                                + prodOfferInfo.prodOfferId+(uniqueId==""?"":("-"+uniqueId))
			                        });
			                if(uniqueId!=""){
			                	rowIndex += "-"+uniqueId;
			                }
			                rowData.rowIndex = rowIndex;
			                this.prodOfferDetailWidgetList["" + rowIndex] = prodOfferDetailWidget;
			                
			                /**
							 * **************可选包上的销售品详情信息初始化
							 * start***********
							 */
			                prodOfferDetailWidget.rowData = rowData;
			                prodOfferDetailWidget.rowIndex = rowIndex;
			                prodOfferDetailWidget.builder = this;
			                prodOfferDetailWidget.prodOfferAttrCard = null;// 销售品属性卡片
			                prodOfferDetailWidget.favourBuilder = null;// 亲情信息卡片
			                prodOfferDetailWidget.prodOfferAssureBuilder = null;
			                /**
							 * **************可选包上的销售品详情信息初始化
							 * end************
							 */
			                
			                prodOfferDetailWidget.startup();
			                
			                prodOfferDetailWidget.setAttribute("rowIndex", rowIndex);
			                
			                prodOfferDetailWidget.domNode.setAttribute("dojoAttachEvent", "onmouseout:elementmouseout");
			                
			                prodOfferDetailWidget.domNode.setAttribute("dojoAttachTopic", "/prodOfferDetailDialog");
			                
			                var commitButton = "<div style='text-align:center;vertical-align:middle'><a href='javascript:void(0);' dojoAttachEvent='onclick:elementclick' \ rowIndex="
			                        + rowIndex
			                        + "\
			        		dojoAttachTopic='/mainProdOfferDetailBtn'\ style='text-align:center;vertical-align:middle;'>关闭</a></div>";
			                dojo.place(commitButton, prodOfferDetailWidget.containerNode, "last");
			                
			                prodOfferDetailWidget.enableEvtMsgPropagation(prodOfferDetailWidget.domNode);
			                
			                var tabContainer = new unieap.layout.TabContainer({
				                        height : 'auto',
			        					uniqueId : uniqueId
			                        });
			                
			                prodOfferDetailWidget.tabContainer = tabContainer;
			                
			                tabContainer.startup();
			                
			                this.initAgreementInfo(prodOfferDetailWidget, rowData, tabContainer);
			                
			                this.initProdOfferAttr(prodOfferDetailWidget, rowData, tabContainer);
			                
			                //this.initProductAttr(prodOfferDetailWidget, rowData, tabContainer);
			                
			                this.initFamilyInfo(prodOfferDetailWidget, rowData, tabContainer);
			                
			                if (!!prodOfferInst
			                        && (!prodOfferInst.prodOfferInstAssureList || prodOfferInst.prodOfferInstAssureList.length == 0)) {
				                this.initProdOfferAssure(prodOfferDetailWidget, rowData, tabContainer);
			                }
			                //针对属性的展现特殊处理
			                this.specialDealAttr(prodOfferDetailWidget,prodOfferInfo,prodOfferInst);
			                
			                prodOfferDetailWidget.handlePageData = dojo.hitch(prodOfferDetailWidget, function() {
				                        var row = {};
				                        // 设置销售品属性信息
				                        if (!!prodOfferDetailWidget.prodOfferAttrCard) {
					                        if (!builder.checkNotNull(prodOfferDetailWidget.prodOfferAttrCard.domNode,
					                                prodOfferDetailWidget.prodOfferAttrCard.domNode)) { return false; }
					                        var prodOfferAttr = prodOfferDetailWidget.prodOfferAttrCard.getCardData(
					                                null, null, true);
					                        if (prodOfferAttr) {
						                        dojo.mixin(row, {
							                                offerAttrPageInfoList : prodOfferAttr
						                                });
					                        } else {
						                        return false;
					                        }
				                        }
				                        // 设置亲情信息
				                        if (!!prodOfferDetailWidget.favourBuilder) {
					                        dojo.mixin(row, {
						                                relaBusPageInfoList : prodOfferDetailWidget.favourBuilder
						                                        .getAllFavourData()
					                                });
				                        }
				                        // 设置产品信息
//				                        var relaProdPageInfoList = builder.getProductData(rowIndex);
//				                        if (relaProdPageInfoList) {
//					                        dojo.mixin(row, {
//						                                relaProdPageInfoList : relaProdPageInfoList
//					                                });
//				                        } else {
//					                        return false;
//				                        }
				                        // 设置担保信息
						           	    if(!!prodOfferDetailWidget.assurePageData){
			           	    				var assureAttrList = [];
						           	    	var assureAttr = prodOfferDetailWidget.assureAttrCard.busCardInstance.getData();
						           	    	if(!assureAttr){
						           	    		return false;
						           	    	}
						           	    	for(var key in assureAttr){
												if (!assureAttr.hasOwnProperty(key)){
													continue;
												}
						           	    		assureAttrList.push({
						           	    			"attrId" : key,
						           	    			"attrValue" : assureAttr[key]
						           	    		});
						           	    	}
						           	    	prodOfferDetailWidget.assurePageData.assureAttrList = assureAttrList;
						           	    }
				                        dojo.mixin(row, {
					                                prodOfferAssurePageInfoList : prodOfferDetailWidget.assurePageData
				                                });
				                        if (!ifMultiplSub) {
					                        loader.mainProdOfferDetailWidget.mainProdOfferDetailData = row;
				                        } else {
					                        return row;
				                        }
			                        });
			                dojo.mixin(rowData, {
				                        handlePageData : prodOfferDetailWidget.handlePageData
			                        });
			                dojo.place(tabContainer.domNode, prodOfferDetailWidget.containerNode, "first");
		                },
		                /**
						 * 展现协议信息
						 * 
						 * @method
						 */
		                initAgreementInfo : function(prodOfferDetailWidget, rowData, tabContainer) {
			                
			                if (rowData.prodOfferInst) { return; }
			                var agreementAttrCardWidget = new OfferAgreementCardWidget({
				                        prodOfferInfoVO : rowData.subProdOfferInfo,
				                        config : rowData.config
			                        });
			                if (agreementAttrCardWidget.needRendering === false) {
				                return;
				                
			                } else {
				                this.agreementAttrCardWidget = agreementAttrCardWidget;
			                }
			                var contentPane = new unieap.layout.ContentPane({
				                        title : "销售品协议",
			        					uniqueId : tabContainer.uniqueId
			                });
			                agreementAttrCardWidget.renderCard(contentPane.domNode, "first");
			                prodOfferDetailWidget.agreementAttrCardWidget = agreementAttrCardWidget;
			                tabContainer.addChild(contentPane);
			                
		                }
		                
	                });
        });