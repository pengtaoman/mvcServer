defineModule("orderaccept.prodofferaccept.widget.promotionchange.PromotionSearchCardWidget", [
                "../../../custom/_BaseWidget", "../../../custom/_BusCardTemplated"], function(
                _Widget, _Templated) {
	        dojo.declare("orderaccept.prodofferaccept.widget.promotionchange.PromotionSearchCardWidget", [_Widget,
	                        _Templated], {
		                delayCreateBeforeBindModel : true,
		                templateString : 'buscard://www.crm1.com',
		                attrCardWidget : null,
		                postMixInProperties : function() {
			                var modelData = this.getModel();
			                this.cardParam = modelData;
		                },
		                destroy : function() {
		                	if (this.attrCardWidget) {
				                this.attrCardWidget.destroy();
			                }
			                this.inherited(arguments);
		                }
		                
	                });
        });