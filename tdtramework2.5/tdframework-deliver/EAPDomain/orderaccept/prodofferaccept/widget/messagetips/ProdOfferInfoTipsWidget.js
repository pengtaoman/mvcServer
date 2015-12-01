defineModule("orderaccept.prodofferaccept.widget.messagetips.ProdOfferInfoTipsWidget", [
                "orderaccept.custom.TooltipDialog"], function(TooltipDialog) {
	        
	        /**
			 * 基础销售品的widget
			 * 
			 * @class
			 * @requires ["orderaccept.custom.TooltipDialog"]
			 * @module orderaccept.prodofferaccept.widget.messagetips.ProdOfferInfoTipsWidget
			 */
	        dojo.declare("orderaccept.prodofferaccept.widget.messagetips.ProdOfferInfoTipsWidget", [TooltipDialog], {
	        	constructor : function(){
		        	this.inherited(arguments);	        	
	        	},	        	
		        postscript : function(){
		        	this.inherited(arguments);
		        	 var renderHtml = "<div class='buscard-root' style='display:block;width:300px'>\
										 <div class='buscard-legend'>\
											<span class='buscard-legend-img'></span>\
											<span class='buscard-legend-text' id='prodoffer-name'></span>\
										 </div>\
										 <div class='buscard-content'>\
										 	<div class='buscard-row' id='prodoffer-desc'>\
											</div>\
											<div class='buscard-effDate'>生效时间:\
												<span id='prodoffer-effDate'></span>\
											</div>\
											<div class='buscard-expDate'>失效时间:\
												<span id='prodoffer-expDate'></span>\
											</div>\
										</div>";
										 	
			        dojo.place(renderHtml, this.containerNode, "last");
		        }
		        
	        });
	        
        });