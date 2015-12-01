defineModule("orderaccept.prodofferaccept.widget.commcard.CommCardWidget", [
                "../../../custom/_BaseWidget", "../../../custom/_BusCardTemplated",
                "dijit._Contained"], function(_Widget, _Templated, _Contained) {
	        dojo.declare("orderaccept.prodofferaccept.widget.commcard.CommCardWidget", [_Widget,
	                        _Templated, _Contained], {
		                delayCreateBeforeBindModel : true,
		                templateString : 'buscard://www.crm1.com',
		                postMixInProperties : function() {
			                var modelData = this.getModel();
			                this.cardParam = modelData.cardParam;
			                this.metaData = modelData.metaData || {};
			                this.id = !!this.metaData.id ? this.metaData.id : null;
		                },
		                destroy : function() {
			                this.inherited(arguments);
		                },
		                getPageData : function() {
			                var serviceInfoPageData = this.inherited(arguments),
				                prodAttrPageData = null;
			                if (serviceInfoPageData === false) { return false; }
			                return serviceInfoPageData;
			                
		                }
		                
	                });
        });