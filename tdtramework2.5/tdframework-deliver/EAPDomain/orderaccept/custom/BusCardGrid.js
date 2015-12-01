defineModule("orderaccept.custom.BusCardGrid", ["./_BaseWidget", "./_BusCardTemplated"], function(_Widget, _Templated) {
	        
	        dojo.declare("orderaccept.custom.BusCardGrid", [_Widget, _Templated], {
		                templateString : '<div></div>',
		                _attachTemplateNodes : function(rootNode, getAttrFunc) {
			                if (rootNode) {
				                this._renderBusCardGrid(rootNode);
			                }
			                this.inherited(arguments);
			                
		                },
		                _renderBusCardGrid : function(rootNode) {
			                this.ds = this.ds || (new BusCard.widget.grid.DataSource([], this.cm));
			                this.cssClass = this.cssClass || 'grid-global';
			                this.listeners = dojo.mixin({} || this.listeners, {
				                        rowmouseover : function() {
					                        // this.style.backgroundColor
					                        // = "#E6E6FA";
				                        },
				                        rowmouseout : function() {
					                        // this.style.backgroundColor
					                        // = "";
				                        }
				                        
			                        });
			                this._grid = new BusCard.widget.grid.Grid(dojo.mixin(dojo.mixin({}, this.params), {
				                        ds : this.ds,
				                        cssClass : this.cssClass,
				                        listeners : this.listeners
			                        }

			                ));
			                this._grid.render(rootNode);
			                this.bindMessagePropagation(this._grid);
			                
		                },
		                bindMessagePropagation : function(grid) {
			                var widget = this;
			                var map = grid.getFooterElemMap();
			                if (map) {
				                var cb = function() {
					                widget.enableEvtMsgPropagation(grid.getDomElement());
				                };
				                BusCard.each([map.first, map.prev, map.next,
				                                map.last, map.jump], function(dom) {
					                        BusCard.addEventListener(dom, "click", cb);
				                        });
			                }
			                
		                },
		                remove : function(rindex) {
			                if (rindex == null) {
				                var ds = this._grid.getDataSource();
				                while (ds.getCount()) {
					                ds.deleteRecord(0);
				                }
				                this._grid.freshPage();
				                
			                } else {
				                this._grid.getDataSource().deleteRecord(rindex);
				                this._grid.freshPage();
			                }
		                },
		                getData : function() {
			                return this._grid.getDataSource().getRawData();
		                },
		                add : function(rawData) {
			                this.enableEvtMsgPropagation(this._grid.addRecord(rawData));
		                },
		                query : function(selector) {
			                return dojo.query(selector, this.domNode);
		                },
		                setDataSource : function() {
			                
			                this._grid.setDataSource(arguments[0]);
			                this.enableEvtMsgPropagation(this.domNode);
			                
		                }
		                
	                });
	        
        });