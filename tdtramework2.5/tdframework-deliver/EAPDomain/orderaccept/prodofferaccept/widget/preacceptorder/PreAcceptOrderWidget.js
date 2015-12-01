defineModule("orderaccept.prodofferaccept.widget.preacceptorder.PreAcceptOrderWidget", [
                "../mainprodoffer/MainProdOfferFlatWidget", "../../util"], function(
                MainProdOfferFlatWidget, util) {
	        var mm = "orderaccept.prodofferaccept.widget.preacceptorder.PreAcceptOrderWidget";
	        /**
			 * 定义主销售品变更控件类PreAcceptOrderWidget
			 * 
			 * @method
			 */
	        dojo.declare(orderaccept.prodofferaccept.widget.preacceptorder.PreAcceptOrderWidget, [MainProdOfferFlatWidget], {
		        
		        delayCreateBeforeBindModel : true,
		        templatePath : dojo.moduleUrl(
		                "orderaccept.prodofferaccept.widget.preacceptorder",
		                "template/preAcceptOrderTpl.html"),
                postMixInProperties : function() {     
                	var widget = this;
	                widget.inherited(arguments);
	                
                }
	        });
	        
        });