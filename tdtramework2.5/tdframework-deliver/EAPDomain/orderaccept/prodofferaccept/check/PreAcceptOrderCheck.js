/**
 * 此模块放置所有业务检测处理逻辑
 * 
 * @module
 */
defineModule("orderaccept.prodofferaccept.check.PreAcceptOrderCheck", ["./ProdOfferNewCheck",
                "../util","orderaccept.common.js.ConstantsPool","orderaccept.common.dialog.MessageBox"], function(ProdOfferNewCheck, util,ConstantsPool, messageBox) {
    dojo.declare("orderaccept.prodofferaccept.check.PreAcceptOrderCheck",
        [ProdOfferNewCheck], {
        	controller : null,
			constructor : function(controller) {
				this.controller = controller;
			}
        });
	        
	});