defineModule("orderaccept.prodofferaccept.widget.messagetips.WarmTipsWidget", [
                "orderaccept.custom.TooltipDialog"], function(TooltipDialog) {
	        
	        /**
			 * 温馨提示的widget
			 * 
			 * @class
			 * @requires ["orderaccept.custom.TooltipDialog"]
			 * @module orderaccept.prodofferaccept.widget.messagetips.WarmTipsWidgett
			 */
	        dojo.declare("orderaccept.prodofferaccept.widget.messagetips.WarmTipsWidget", [TooltipDialog], {
	        	constructor : function(){
		        	this.inherited(arguments);	        	
	        	},	        	
		        postscript : function(){
		        	this.inherited(arguments);
		        	 var renderHtml = "<div class='buscard-root' style='display:block;width:220px'>\
										 <div class='buscard-legend'>\
											<span class='buscard-legend-img'></span>\
											<span class='buscard-legend-text' id='prodoffer-name'>温馨提示</span>\
										 </div>\
										 <div class='buscard-content'>\
										</div>\
									  </div>";
			        dojo.place(renderHtml, this.containerNode, "first");
		        }
		        
	        });
	        
        });