defineModule("orderaccept.prodofferaccept.widget.messagetips.CollectTipsWidget", [
                "orderaccept.custom.TooltipDialog"], function(TooltipDialog) {
	        
	        /**
			 * 收藏功能的提示框widget
			 * 
			 * @class
			 * @requires ["orderaccept.custom.TooltipDialog"]
			 * @module orderaccept.prodofferaccept.widget.messagetips.CollectTipsWidget
			 */
	        dojo.declare("orderaccept.prodofferaccept.widget.messagetips.CollectTipsWidget", [TooltipDialog], {
	        	constructor : function(){
		        	this.inherited(arguments);	        	
	        	},	        	
		        postscript : function(){
		        	this.inherited(arguments);
					  var　renderHtml = "<div class='buscard-root' style='display:block; height:15px'>\
											<div style='padding:2px;width:175px'id='tip-info' > </div>\
									  	</div>";
			        dojo.place(renderHtml, this.containerNode, "first");
		        }
		        
	        });
	        
        });