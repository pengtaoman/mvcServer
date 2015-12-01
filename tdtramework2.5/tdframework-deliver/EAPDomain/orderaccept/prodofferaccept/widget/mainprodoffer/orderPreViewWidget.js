defineModule("orderaccept.prodofferaccept.widget.mainprodoffer.orderPreViewWidget", [
                "orderaccept.custom._BaseWidget", "orderaccept.custom._BusCardTemplated",
                "unieap.dialog.Dialog","../../../custom/BusCardGrid","../../util",
                "orderaccept.prodofferaccept.ProductDateBuilder"],
        function(_Widget, _Templated,Dialog,BusCardGrid,util,dateBuilder) {
	        
	        dojo.declare("orderaccept.prodofferaccept.widget.mainprodoffer.orderPreViewWidget", [_Widget,
	                        _Templated], {
		                templateString : "<div class='orderPreView' id='orderPreView'>\
										</div>"
				        
	                })
	        
        });