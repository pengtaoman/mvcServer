defineModule("orderaccept.custom.Grid", ["unieap.grid.Grid", "./_BaseWidget"], function(unieapGrid,
                _baseWidget) {
	        
	        dojo.declare("orderaccept.custom.Grid", [unieapGrid, _baseWidget], {
		                
		                postMixInProperties : function() {
			                var grid = this;
			                // config style 
			                if(!this.height){
			                	this.height= '100%';
			                }
			                // configure rowManager
			                this.rows = {
				                onAfterRenderRow : function(index) {
					                grid.managers.get("ViewManager").forEach(function(view) {
						                        grid
						                                .enableEvtMsgPropagation(view
						                                        .getRowNode(index));
						                        
					                        });
					                
				                }
				                
			                };
			                // config layout
			                this.layout = {
				                structure : [{
					                        rows : [this.cm]
				                        }]
			                };
			                this.inherited(arguments);
			                
		                },
		                getScroller : function() {
			                return this.managers.get("ViewManager").scroller;
		                }
		                
	                });
	        
        }

);