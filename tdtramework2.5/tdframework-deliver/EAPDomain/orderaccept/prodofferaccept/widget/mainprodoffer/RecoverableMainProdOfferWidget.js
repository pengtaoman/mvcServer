defineModule("orderaccept.prodofferaccept.widget.mainprodoffer.RecoverableMainProdOfferWidget",

        ["./MainProdOfferFlatWidget", "orderaccept.prodofferaccept.util"], function(
                MainProdOfferFlatWidget, util) {
	        
	        var moduleName = "orderaccept.prodofferaccept.widget.mainprodoffer.RecoverableMainProdOfferWidget";
	        
	        /**
			 * 
			 * 带有恢复页面状态功能的主销售品widget
			 * 
			 * @class
			 */
	        dojo.declare(moduleName, [MainProdOfferFlatWidget], {
		                custOrderVOHelper : null,
		                postMixInProperties : function() {
			                this.custOrderVOHelper = util.CustOrderVOHelper.getInstance($ac$
			                        .get("_custOrderVO_"));
			                this.inherited(arguments);
			                
		                },
		                buildProductViewInitData : function(mainProdOfferInfoVO, config) {
			                var offerProdRelaList = mainProdOfferInfoVO.offerProdRelaList || [],
				                // 暂时不考虑加装包
				                accessProdItemList = this.custOrderVOHelper.getAccessProdItemList(),
				                widget = this;
			                return dojo.map(accessProdItemList || [], function(item) {
				                        var prodRela = dojo.filter(offerProdRelaList, function(
				                                        offerProdRela) {
					                                return offerProdRela.productId == item.productId;
				                                })[0];
				                        return widget._buildEachProductViewData(
				                                mainProdOfferInfoVO, prodRela, prodRela.roleInfoVO,
				                                item);
				                        
			                        });
			                
		                },
		                _buildEachProductViewData : function(mainProdOfferInfoVO, prodRela,
		                        roleInfoVO, orderItemVO) {
			                var result = this.inherited(arguments);
			                var attrTemplate = BusCard.Template.create(" ${name}='${value}' ");
			                dojo.mixin(result, {
				                        serviceId : orderItemVO.serviceId,
				                        extendedAttribute : attrTemplate.apply({
					                                name : 'orderItemId',
					                                value : orderItemVO['orderItemId']
				                                })
			                        });
			                return result;
			                
		                }
		                
	                });
	        
        });