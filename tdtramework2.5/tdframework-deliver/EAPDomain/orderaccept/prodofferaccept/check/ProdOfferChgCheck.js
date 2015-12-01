/**
 * 此模块放置所有业务检测处理逻辑
 * 
 * @module
 */
defineModule("orderaccept.prodofferaccept.check.ProdOfferChgCheck", ["../util",
                "./ProdOfferNewCheck"], function(util, ProdOfferNewCheck) {
	        
	        dojo.declare("orderaccept.prodofferaccept.check.ProdOfferChgCheck",
	                [ProdOfferNewCheck], {
		                postscript : function() {

		                }
	                });
	        
        });