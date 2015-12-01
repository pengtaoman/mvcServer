defineModule("orderaccept.prodofferaccept.widget.messagetips.ProdOfferAcceptTipsWidget", [
                "orderaccept.custom.TooltipDialog"], function(TooltipDialog) {
	        
	        /**
			 * 温馨提示的widget
			 * 
			 * @class
			 * @requires ["orderaccept.custom.TooltipDialog"]
			 * @module orderaccept.prodofferaccept.widget.messagetips.WarmTipsWidgett
			 */
	        dojo.declare("orderaccept.prodofferaccept.widget.messagetips.ProdOfferAcceptTipsWidget", [TooltipDialog], {
	        	constructor : function(){
		        	this.inherited(arguments);	        	
	        	},	        	
		        postscript : function(){
		        	this.inherited(arguments);
		        	 var renderHtml = "<div class='buscard-root' style='display:block;width:350px'>\
										 <div class='buscard-legend'>\
											<span class='buscard-legend-img'></span>\
											<span class='buscard-legend-text' id='tips-name'>本次操作</span>\
										 </div>\
										 <div class='buscard-content' style='width:auto'>\
												<div class='buscard-row' style='clear:both'>\
													<div class='buscard-legend-text'>订购<span id='prod-offer-add-count'></span>个可选包</div>\
													<div id='prod-offer-add-detail'>&nbsp;</div>\
												</div>\
												<div class='buscard-row' style='clear:both'>\
													<div class='buscard-legend-text'>变更<span id='prod-offer-change-count'></span>个可选包</div>\
													<div id='prod-offer-change-detail'>&nbsp;</div>\
											 	</div>\
											 	<div class='buscard-row' style='clear:both'>\
													<div class='buscard-legend-text'>退订<span id='prod-offer-del-count'></span>个可选包</div>\
													<div id='prod-offer-del-detail'>&nbsp;</div>\
												</div>&nbsp;\
										</div>\
									  </div>";
			        dojo.place(renderHtml, this.containerNode, "first");
		        }
		        
	        });
	        
        });