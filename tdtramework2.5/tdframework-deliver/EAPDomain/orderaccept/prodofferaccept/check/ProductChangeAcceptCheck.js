/**
 * 此模块放置所有业务检测处理逻辑
 * 
 * @module
 */
defineModule("orderaccept.prodofferaccept.check.ProductChangeAcceptCheck", [
		"./MainProdOfferChgCheck", "../util",
		"orderaccept.common.dialog.MessageBox" ], function(
		MainProdOfferChgCheck, util, messageBox) {
	dojo.declare("orderaccept.prodofferaccept.check.ProductChangeAcceptCheck",
			[ MainProdOfferChgCheck ], {
				postscript : function() {

				},
				 /**
				 * 待实现,需要调用PPM接口检测两个主套餐在规格层面是否允许变更
				 * 
				 * @method
				 */
		        doCommonMainProdOfferChgCheck : function(mainProdOfferId) {
			        return true;
			        
		        }
			});

});
