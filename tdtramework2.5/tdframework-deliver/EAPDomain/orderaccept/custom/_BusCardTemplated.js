defineModule("orderaccept.custom._BusCardTemplated", ["dijit._Widget", "dojo.string",
                "dojo.parser", "dojo.cache"], function() {
	        dojo.declare("orderaccept.custom._BusCardTemplated", null, {
		                // summary:
		                // Mixin for widgets that are instantiated from a template
		                //
		                
		                // templateString: [protected] String
		                // A string that represents the widget template. Pre-empts the
		                // templatePath. In builds that have their strings "interned", the
		                // templatePath is converted to an inline templateString, thereby
		                // preventing a synchronous network call.
		                //
		                // Use in conjunction with dojo.cache() to load from a file.
		                templateString : null,
		                
		                // templatePath: [protected deprecated] String
		                // Path to template (HTML file) for this widget relative to dojo.baseUrl.
		                // Deprecated: use templateString with dojo.cache() instead.
		                templatePath : null,
		                
		                // widgetsInTemplate: [protected] Boolean
		                // Should we parse the template to find widgets that might be
		                // declared in markup inside it? False by default.
		                widgetsInTemplate : false,
		                
		                // skipNodeCache: [protected] Boolean
		                // If using a cached widget template node poses issues for a
		                // particular widget class, it can set this property to ensure
		                // that its template is always re-built from a string
		                _skipNodeCache : false,
		                
		                // _earlyTemplatedStartup: Boolean
		                // A fallback to preserve the 1.0 - 1.3 behavior of children in
		                // templates having their startup called before the parent widget
		                // fires postCreate. Defaults to 'false', causing child widgets to
		                // have their .startup() called immediately before a parent widget
		                // .startup(), but always after the parent .postCreate(). Set to
		                // 'true' to re-enable to previous, arguably broken, behavior.
		                _earlyTemplatedStartup : false,
		                
		                _stringRepl : function(tmpl) {
			                // summary:
			                // Does substitution of ${foo} type properties in template string
			                // tags:
			                // private
			                var className = this.declaredClass,
				                _this = this;
			                // Cache contains a string because we need to do property replacement
			                // do the property replacement
			                // modify by yusong/2012-02-09 use buscard template for using loop
							// ,condiftion template
			                // first try to fecth data from getModelData method,if null then try to
							// 'this' object
			                return BusCard.Template.create(tmpl).apply(this.templateInput || this);
		                },
		                
		                // method over-ride
		                buildRendering : function() {
			                // summary:
			                // Construct the UI for this widget from a template, setting
							// this.domNode.
			                // tags:
			                // protected
			                
			                this._attachPoints = [];
			                
			                // Lookup cached version of template, and download to cache if it
			                // isn't there already. Returns either a DomNode or a string, depending
							// on
			                // whether or not the template contains ${foo} replacement parameters.
			                var cached = orderaccept.custom._BusCardTemplated.getCachedTemplate(
			                        this.templatePath, this.templateString, this._skipNodeCache);
			                
			                var node;
			                if (dojo.isString(cached)) {
			                	var interpretedTemplateInstance = this._stringRepl(cached);
			                	
				                // check if card instance
				                if (/<card(.*?)<\/card>$/i.test(interpretedTemplateInstance)) {
				                	node = dojo.create("div");
					                this.busCardInstance = BusCard.createInstance(this.cardParam||{},
					                        node, {
						                        gType : 3,
						                        xmlData : cached
					                        });

				                }else if(/^buscard\:\/\/www\.crm1\.com$/i.test(interpretedTemplateInstance)){
				                	node = dojo.create("div");
				                	this.busCardInstance = BusCard.createInstance(this.cardParam||{},
					                        node,(this.cardParam||{}).cardMetaData);

				                	
				                }else {
					                node = dojo._toDom(interpretedTemplateInstance);
				                }
				                if (node.nodeType != 1) {
					                // Flag common problems such as templates with multiple top
									// level nodes (nodeType == 11)
					                throw new Error("Invalid template: " + cached);
				                }
			                } else {
				                // if it's a node, all we have to do is clone it
				                node = cached.cloneNode(true);
			                }
			                
			                this.domNode = node;
			                
			                // recurse through the node, looking for, and attaching to, our
			                // attachment points and events, which should be defined on the template
							// node.
			                this._attachTemplateNodes(node);
			                
			                if (this.widgetsInTemplate) {
				                // Make sure dojoType is used for parsing widgets in template.
				                // The dojo.parser.query could be changed from multiversion support.
				                var parser = dojo.parser, qry, attr;
				                if (parser._query != "[dojoType]") {
					                qry = parser._query;
					                attr = parser._attrName;
					                parser._query = "[dojoType]";
					                parser._attrName = "dojoType";
				                }
				                
				                // Store widgets that we need to start at a later point in time
				                var cw = (this._startupWidgets = dojo.parser.parse(node, {
					                        noStart : !this._earlyTemplatedStartup
				                        }));
				                
				                // Restore the query.
				                if (qry) {
					                parser._query = qry;
					                parser._attrName = attr;
				                }
				                
				                this._supportingWidgets = dijit.findWidgets(node);
				                
				                this._attachTemplateNodes(cw, function(n, p) {
					                        return n[p];
				                        });
			                }
			                
			                this._fillContent(this.srcNodeRef);
		                },
		                
		                _fillContent : function(/* DomNode */source) {
			                // summary:
			                // Relocate source contents to templated container node.
			                // this.containerNode must be able to receive children, or exceptions
							// will be thrown.
			                // tags:
			                // protected
			                var dest = this.containerNode;
			                if (source && dest) {
				                while (source.hasChildNodes()) {
					                dest.appendChild(source.firstChild);
				                }
			                }
		                },
		                
		                _attachTemplateNodes : function(rootNode, getAttrFunc) {
			                // summary:
			                // Iterate through the template and attach functions and nodes
							// accordingly.
			                // description:
			                // Map widget properties and functions to the handlers specified in
			                // the dom node and it's descendants. This function iterates over all
			                // nodes and looks for these properties:
			                // * dojoAttachPoint
			                // * dojoAttachEvent
			                // * waiRole
			                // * waiState
			                // rootNode: DomNode|Array[Widgets]
			                // the node to search for properties. All children will be searched.
			                // getAttrFunc: Function?
			                // a function which will be used to obtain property for a given
			                // DomNode/Widget
			                // tags:
			                // private
			                
			                getAttrFunc = getAttrFunc || function(n, p) {
				                return n.getAttribute(p);
			                };
			                
			                var nodes = dojo.isArray(rootNode)
			                        ? rootNode
			                        : (rootNode.all || rootNode.getElementsByTagName("*"));
			                var x = dojo.isArray(rootNode) ? 0 : -1;
			                for (; x < nodes.length; x++) {
				                var baseNode = (x == -1) ? rootNode : nodes[x];
				                if (this.widgetsInTemplate && getAttrFunc(baseNode, "dojoType")) {
					                continue;
				                }
				                // Process dojoAttachPoint
				                var attachPoint = getAttrFunc(baseNode, "dojoAttachPoint");
				                if (attachPoint) {
					                var point,
						                points = attachPoint.split(/\s*,\s*/);
					                while ((point = points.shift())) {
						                if (dojo.isArray(this[point])) {
							                this[point].push(baseNode);
						                } else {
							                this[point] = baseNode;
						                }
						                this._attachPoints.push(point);
					                }
				                }
				                
				                // Process dojoAttachEvent
				                var attachEvent = getAttrFunc(baseNode, "dojoAttachEvent");
				                if (attachEvent) {
					                // NOTE: we want to support attributes that have the form
					                // "domEvent: nativeEvent; ..."
					                var event,
						                events = attachEvent.split(/\s*,\s*/);
					                var trim = dojo.trim;
					                while ((event = events.shift())) {
						                if (event) {
							                var thisFunc = null;
							                if (event.indexOf(":") != -1) {
								                // oh, if only JS had tuple assignment
								                var funcNameArr = event.split(":");
								                event = trim(funcNameArr[0]);
								                thisFunc = trim(funcNameArr[1]);
							                } else {
								                event = trim(event);
							                }
							                if (!thisFunc) {
								                thisFunc = event;
							                }
							                this.connect(baseNode, event, thisFunc);
						                }
					                }
				                }
				                
				                // waiRole, waiState
				                var role = getAttrFunc(baseNode, "waiRole");
				                if (role) {
					                dijit.setWaiRole(baseNode, role);
				                }
				                var values = getAttrFunc(baseNode, "waiState");
				                if (values) {
					                dojo.forEach(values.split(/\s*,\s*/), function(stateValue) {
						                        if (stateValue.indexOf('-') != -1) {
							                        var pair = stateValue.split('-');
							                        dijit.setWaiState(baseNode, pair[0], pair[1]);
						                        }
					                        });
				                }
			                }
		                },
		                
		                startup : function() {
			                dojo.forEach(this._startupWidgets, function(w) {
				                        if (w && !w._started && w.startup) {
					                        w.startup();
				                        }
			                        });
			                this.inherited(arguments);
		                },
		                
		                destroyRendering : function() {
			                // Delete all attach points to prevent IE6 memory leaks.
			                dojo.forEach(this._attachPoints, function(point) {
				                        delete this[point];
			                        }, this);
			                this._attachPoints = [];
			                
			                this.inherited(arguments);
		                }
	                });
	        
	        // key is either templatePath or templateString; object is either string or DOM tree
	        orderaccept.custom._BusCardTemplated._templateCache = {};
	        
	        orderaccept.custom._BusCardTemplated.getCachedTemplate = function(templatePath,
	                templateString, alwaysUseString) {
		        // summary:
		        // Static method to get a template based on the templatePath or
		        // templateString key
		        // templatePath: String||dojo.uri.Uri
		        // The URL to get the template from.
		        // templateString: String?
		        // a string to use in lieu of fetching the template from a URL. Takes precedence
		        // over templatePath
		        // returns: Mixed
		        // Either string (if there are ${} variables that need to be replaced) or just
		        // a DOM tree (if the node can be cloned directly)
		        
		        // is it already cached?
		        var tmplts = orderaccept.custom._BusCardTemplated._templateCache;
		        var key = templateString || templatePath;
		        var cached = tmplts[key];
		        if (cached) {
			        try {
				        // if the cached value is an innerHTML string (no ownerDocument) or a DOM
						// tree created within the current document, then use the current cached
						// value
				        if (!cached.ownerDocument || cached.ownerDocument == dojo.doc) {
					        // string or node of the same document
					        return cached;
				        }
			        }
			        catch (e) { /* squelch */} // IE can throw an exception if cached.ownerDocument
												// was reloaded
			        dojo.destroy(cached);
		        }
		        
		        // If necessary, load template string from template path
		        if (!templateString) {
			        templateString = dojo.cache(templatePath, {
				                sanitize : true
			                });
		        }
		        templateString = dojo.string.trim(templateString);
		        
		        var checkBusCardAndSet = function() {
			        
			        // add by yusong @ 2012-02-23 check if buscard protocol template
			        var oneLine = dojo.string.trim(templateString.replace(/\r|\n/g, ""));
			        var busCardFlag = /<card(.*?)<\/card>$/i.test(oneLine)||/^buscard\:\/\/www\.crm1\.com$/i.test(oneLine);
			        if (busCardFlag) {
				        templateString = oneLine;
			        }
			        return busCardFlag;
			        
		        };
		        //if buscard,don't cache templateString because templateString is dynamic generated
		        if(checkBusCardAndSet() ){
		        	return templateString;
		        }
		        
		        if ( alwaysUseString
		                || templateString.match(/[#\$]?\{([^\}]+)\}/g)) {
			        // there are variables in the template so all we can do is cache the string
			        return (tmplts[key] = templateString); // String
		        } else {
			        // there are no variables in the template so we can cache the DOM tree
			        var node = dojo._toDom(templateString);
			        if (node.nodeType != 1) { throw new Error("Invalid template: " + templateString); }
			        return (tmplts[key] = node); // Node
		        }
	        };
	        
	        if (dojo.isIE) {
		        dojo.addOnWindowUnload(function() {
			                var cache = dijit._Templated._templateCache;
			                for (var key in cache) {
				                var value = cache[key];
				                if (typeof value == "object") { // value is either a string or a DOM
																// node template
					                dojo.destroy(value);
				                }
				                delete cache[key];
			                }
		                });
	        }
	        
	        // These arguments can be specified for widgets which are used in templates.
	        // Since any widget can be specified as sub widgets in template, mix it
	        // into the base widget class. (This is a hack, but it's effective.)
	        dojo.extend(dijit._Widget, {
		                dojoAttachEvent : "",
		                dojoAttachPoint : "",
		                waiRole : "",
		                waiState : ""
	                });
	        
        }); 
