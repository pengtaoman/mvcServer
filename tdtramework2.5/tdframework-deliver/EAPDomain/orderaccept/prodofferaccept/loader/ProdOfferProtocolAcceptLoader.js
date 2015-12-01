/**
 * @fileOverview 此文件定义政企协议转订单处理类
 */
defineModule(
        "orderaccept.prodofferaccept.loader.ProdOfferProtocolAcceptLoader",
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
	        
	        dojo.declare("orderaccept.prodofferaccept.loader.ProdOfferProtocolAcceptLoader", [ProdOfferNewLoader], {
		        layoutTemplateUrl : dojo.moduleUrl("orderaccept.prodofferaccept", "view/protocolProdOfferLayout.html"),
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
		        
		        init : function() {
			        
			        this.serviceCardWidgetMap = {};
			        
			        this.captureEventRegistry();
			        
			        this.renderLayout();
			        
		        },
		        _asynLoadSriptList : function() {
			        
			        return [].concat(this.inherited(arguments))
			                .concat("orderaccept.prodofferaccept.data.ProdOfferProtocolDataBuilder");
			        
		        },
		        initDataBuilder : function() {
			        this.dataBuilder = new orderaccept.prodofferaccept.data.ProdOfferProtocolDataBuilder(this);
		        },
		        
		        _asynCallback : function() {
			        this.prepareOrderData();
			        this.inherited(arguments);
			        this.beginOrder($ac$.get("selectedMainProdOfferInfoVO").prodOfferId);
			        
		        },
		        
		        prepareOrderData : function() {
			        var protocolAcceptInfoVO = $ac$.get("requestParam").protocolAcceptInfoVO;
			        var prodOfferInfoVO = protocolAcceptInfoVO.prodOfferInfoVO;
			        var protocolProdOfferInfoVO = protocolAcceptInfoVO.protocolProdOfferInfoVO;
			        var protocolProductInfoList = protocolAcceptInfoVO.protocolProductInfoList;
			        prodOfferInfoVO.offerProdRelaList = this.reComputeOfferProdRelaList(prodOfferInfoVO);
			        $ac$.set("protocolProdOfferInfoVO", protocolAcceptInfoVO.prodOfferInfoVO);
			        $ac$.set("selectedMainProdOfferInfoVO", protocolAcceptInfoVO.prodOfferInfoVO);
			        this.mainProdOfferId = $ac$.get("selectedMainProdOfferInfoVO").prodOfferId;
			        $ac$.set("currentMainProdOfferInfoVO", protocolAcceptInfoVO.prodOfferInfoVO);
			        $ac$.set("processId", prodOfferInfoVO.bindType == 2
			                        ? "independenceProdOfferInstall"
			                        : "sharedProdOfferInstall");
			        $ac$.set("prodOfferList", [prodOfferInfoVO]);
			        // attach protocol prodoffer attr info
			        dojo.forEach(prodOfferInfoVO.attrList || [], function(attrVO) {
				                var targetAttrInfo = dojo.filter(protocolProdOfferInfoVO.attrList || [], function(
				                                protocolAttrInfo) {
					                        return protocolAttrInfo.attrCd == attrVO.attrCd;
				                        })[0];
				                if (targetAttrInfo) {
					                attrVO.isReadOnly = "1";
					                attrVO.defaultValue = targetAttrInfo.defaultValue;
				                }
				                
			                });
			        // constructor ordered member list ,also attach
			        // protocol infomation
			        var selectedMemberProdOfferList = dojo.map(protocolProductInfoList, function(protocolProductInfo) {
				                var productId = protocolProductInfo.productId;
				                var offerProdRelaVO = dojo.filter(prodOfferInfoVO.offerProdRelaList, function(rela) {
					                        return rela.productId == productId;
				                        })[0];
				                var clonedProductInfoVO = dojo.clone(offerProdRelaVO.productInfoVO);
				                dojo.forEach(protocolProductInfo.attrList, function(protocolAttrInfo) {
					                        var specAttrVO = dojo.filter(clonedProductInfoVO.attrList || [], function(
					                                        attr) {
						                                return attr.attrCd == protocolAttrInfo.attrCd;
						                                
					                                })[0];
					                        // reset spec attr data
					                        if (specAttrVO) {
						                        specAttrVO.defaultValue = protocolAttrInfo.defaultValue;
						                        specAttrVO.isReadOnly = "1";
					                        }
					                        
				                        });
				                
				                return {
					                action : 'new',
					                productId : productId + "",
					                prodOfferId : prodOfferInfoVO.prodOfferId + "",
					                productInfoVO : clonedProductInfoVO,
					                protocolMember : 1
				                }
				                
			                });
			        $ac$.set("selectedMemberProdOfferList", selectedMemberProdOfferList);
			        
		        },
		        renderAdvancedSearch : function() {
			        
			        return false;
			        
		        },
		        renderProdOfferFavorite : function() {
			        
			        return false;
			        
		        },
		        getBelongCode : function() {
			        return $ac$.get("requestParam").belongCode;
		        },
		        /**
				 * 如果是组合产品受理,重新组织销售品产品关系列表
				 * 
				 * @borrows ShoppingCartWidget.reComputeOfferProdRelaList
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
		        _findProperProduct4AttrCardWidget : function(prodOfferInfoVO, productId, uniqueId) {
			        var memeberInfo = dojo.filter($ac$.get("selectedMemberProdOfferList"), function(member) {
				                return member.uniqueId == uniqueId && member.productId == productId;
			                })[0];
			        return memeberInfo.productInfoVO;
		        }
		        
	        });
	        
        });