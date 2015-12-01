defineModule("orderaccept.custom._BaseWidget", ["dijit._Widget"], function(_Widget) {
	/**
	 * 
	 * 定义Widget基类
	 * 
	 * @class
	 * 
	 */
	dojo.declare("orderaccept.custom._BaseWidget", [_Widget],

	{
		delayRendering : false,
		/**
		 * callback list for buscard instance
		 * 
		 * @field
		 */
		cardCallbackList : null,
		/**
		 * 视图模板输入
		 * 
		 * @field
		 */
		templateInput : null,
		/**
		 * widget是以卡片呈现时,卡片实例的初始化参数
		 * 
		 * @field
		 */
		cardParam : null,
		/**
		 * 当没有绑定模型数据时,是否推迟创建widget
		 * 
		 * @field
		 */
		delayCreateBeforeBindModel : false,
		/**
		 * 视图所attach的模型数据
		 * 
		 * @field
		 */
		modelData : null,
		/**
		 * 当widget以卡片形式曾现时,对应的卡片实例
		 * 
		 * @field
		 */
		busCardInstance : null,
		
		cardListenerRegistry : null,
		/**
		 * attach
		 * 
		 * @method
		 */
		postscript : function() {
			this.cardListenerRegistry = [];
			if (this.delayCreateBeforeBindModel) {
				this.generateModelId();
				this.delayRendering = (arguments[1] == null);
				this.bindModel(arguments[0]);
				this.generateView(arguments[1]);
			} else {
				this.inherited(arguments);
			}
			
		},
		generateModelId : function() {
			var $modelIdSuffix$ = this.constructor.$modelIdSuffix$;
			if ($modelIdSuffix$ == null) {
				this.constructor.$modelIdSuffix$ = 0;
			}
			this.$modelId$ = this.declaredClass + "_" + (this.constructor.$modelIdSuffix$++);
		},
		/**
		 * bind model data
		 * 
		 * @method
		 * 
		 */
		bindModel : function(modelData) {
			// clone modelData parameter to prevent
			// strong refrence to outer object
			// var pre = new Date().getTime();
			dojo.global.$widgetModelContext$.set(this.$modelId$, modelData);
			// alert(new Date().getTime()- pre);
			return this;
		},
		getModel : function() {
			return dojo.global.$widgetModelContext$.get(this.$modelId$);
		},
		/**
		 * generate dom and render dom to window if srcNodeRef is
		 * provided
		 * 
		 * @method
		 * 
		 */
		generateView : function(srcNodeRef) {
			this.create({}, srcNodeRef);
		},
		
		query : function() {
			return dojo.query(arguments[0], this.domNode);
		},
		getPageData : function() {
			if (this.busCardInstance) {
				return this.busCardInstance.getData.apply(this.busCardInstance, arguments);
				
			} else {
				var result = {},
					allInputElem = dojo._toArray(dojo.query("INPUT", this.domNode)),
					allSelectInputElem = dojo._toArray(dojo.query("SELECT", this.domNode)),
					allTextAreaElem = dojo._toArray(dojo.query("TEXTAREA", this.domNode));
				var allElem = [].concat(allInputElem, allSelectInputElem, allTextAreaElem);
				dojo.forEach(allElem, function(node) {
					        var id = dojo.attr("id") || dojo.attr("name");
					        if (id) {
						        var tagName = node.tagName.toUpperCase();
						        switch (tagName) {
							        case "SELECT" :
							        case "TEXTARE" :
								        result[id] = node.value;
								        break;
							        case INPUT :
								        var type = dojo.attr("type");
								        if (type.toUpperCase() == 'TEXT' || type.toUpperCase() == 'PASSWORD') {
									        result[id] = node.value;
									        
								        } else if (type.toUpperCase() == 'CHECKBOX' || type.toUpperCase() == 'RADIO') {
									        if (node.checked) {
										        result[id] = "1";
									        } else {
										        result[id] = "0";
									        }
									        
								        }
								        
						        }
						        
					        }
					        
				        });
				return result;
				
			}
			
		},
		buildViewInitData : function() {

		},
		elementclick : function() {
			// attch om func
			if (!BusCard.checkHaveOMRight(arguments[0].currentTarget)) {
				dojo.require("orderaccept.common.dialog.MessageBox");
				orderaccept.common.dialog.MessageBox.alert({
					        message : BusCard.NO_OM_RIGHT_MSG
				        });
				return false;
			}
			var args = Array.prototype.slice.apply(arguments);
			args.push("click");
			this._publishEventTopic.apply(this, args);
			// alert("click");
			
		},
		_publishEventTopic : function() {
			var event = arguments[0],
				eventName = arguments[arguments.length - 1],
				node = event.currentTarget;
			if (!node || node === window) { return; }
			var dojoAttachTopic = (node.getAttribute("dojoAttachTopic") || (!!node.getAttribute("controlFieldName")
			        ? ("/buscard/" + node.getAttribute("controlFieldName"))
			        : null))
			        || "/" + node.tagName.toLowerCase(),
				topic = dojoAttachTopic.lastIndexOf("/") == dojoAttachTopic.length - 1
				        ? dojoAttachTopic + eventName
				        : dojoAttachTopic + "/" + eventName;
			// alert(topic);
			dojo.publish(topic, [event]);
			
		},
		elementfocus : function() {
			var args = Array.prototype.slice.apply(arguments);
			args.push("focus");
			this._publishEventTopic.apply(this, args);
		},
		elementblur : function() {
			var args = Array.prototype.slice.apply(arguments);
			args.push("blur");
			this._publishEventTopic.apply(this, args);
		},
		elementmouseover : function() {
			var args = Array.prototype.slice.apply(arguments);
			args.push("mouseover");
			this._publishEventTopic.apply(this, args);
			
		},
		elementmouseout : function() {
			var args = Array.prototype.slice.apply(arguments);
			args.push("mouseout");
			this._publishEventTopic.apply(this, args);
		},
		elementchange : function() {
			var args = Array.prototype.slice.apply(arguments);
			args.push("change");
			this._publishEventTopic.apply(this, args);
		},
		elementpropertychange : function() {
			var args = Array.prototype.slice.apply(arguments);
			args.push("propertychange");
			var eventObj = args[0];
			//for efficiency ,only handle 'value' propertyName
			if(eventObj&&eventObj.propertyName!='value'){
				return false;
			}
			this._publishEventTopic.apply(this, args);
		},
		elementkeyup : function() {
			var args = Array.prototype.slice.apply(arguments);
			args.push("keyup");
			this._publishEventTopic.apply(this, args);
		},
		elementdblclick : function() {
			var args = Array.prototype.slice.apply(arguments);
			args.push("dblclick");
			this._publishEventTopic.apply(this, args);
		},
		elementkeydown : function() {
			var args = Array.prototype.slice.apply(arguments);
			args.push("keydown");
			this._publishEventTopic.apply(this, args);
		},
		/**
		 * enable event message propagation
		 * 
		 * @method
		 */
		enableEvtMsgPropagation : function(dom) {
			var _self = this;
			if (dom && dom.nodeType == 1) {
				var nodeList = BusCard.query("[dojoAttachEvent]", dom);
				dojo.forEach(nodeList, function(node) {
					        var dojoAttachEvent = node.getAttribute("dojoAttachEvent");
					        if (dojoAttachEvent) {
						        var eventDecList = dojoAttachEvent.split(",");
						        dojo.forEach(eventDecList, function(part) {
							                var _parts = part.split(":"),
								                event = _parts[0],
								                handler = _parts[1];
							                _self.connect(node, event, handler);
						                });
					        }
				        });
				
			}
			
		},
		/**
		 * 针对IE,select类型增加title属性
		 */
		enableTitle : function(selectNode) {
			if (selectNode && selectNode.tagName && selectNode.tagName.toUpperCase() == 'SELECT') {
				var optionList = selectNode.options || [];
				dojo.forEach(optionList, function(optionNode) {
					        optionNode.title = optionNode.text;
				        });
				
			}
			
		},
		postRenderingHandle:function(){
		
		
		},
		postCreate : function() {
			var _widgetInstance = this;
			this.inherited(arguments);
			if(this.busCardInstance){
				this.busCardInstance.addEventListener("onrender",function(){
					_widgetInstance.postRenderingHandle.apply(_widgetInstance,arguments);
				});
			}
			if (this.domNode && !this.delayRendering) {
				if (this.busCardInstance) {
					this.busCardInstance.init(function() {
						        var args = arguments,
							        thisObject = _widgetInstance;
						        _widgetInstance._attachEventForCardElem(this.dom);
						        _widgetInstance.execCQ(thisObject, args);
					        });
				}
			}
			dojo.forEach(dojo.query("select", this.domNode), function(selectNode) {
				        _widgetInstance.enableTitle(selectNode);
			        });
			
		},
		/**
		 * 执行卡片回调队列
		 * 
		 * @method
		 */
		execCQ : function(thisObject, args) {
			
			dojo.forEach(this.cardCallbackList, function(cb) {
				        cb.apply(thisObject, args);
				        
			        });
			
		},
		/**
		 * 延迟渲染卡片并执行卡片相关回调
		 * 
		 * @param {HTMLElement} refNode 卡片渲染容器
		 * @param {String} position 相对容器的位置
		 * @param {Object||null} cardInitData
		 *            当设置这个属性时,直接用这个数据初始化卡片,不再重新请求数据
		 * 
		 * @method
		 */
		renderCard : function(refNode, position, cardInitData) {
			var _widgetInstance = this;
			if (this.busCardInstance && !this.busCardInstance.isLoaded()) dojo.place(this.domNode, refNode, position);
			this.busCardInstance.init(function() {
				        var args = arguments,
					        thisObject = _widgetInstance;
				        _widgetInstance._attachEventForCardElem(this.dom);
				        _widgetInstance.execCQ(thisObject, args);
			        }, null, cardInitData);
			
		},
		/**
		 * 为卡片上相关控件增加消息机制
		 * 
		 * @method
		 */
		_attachEventForCardElem : function(dom) {
			var _widgetInstance = this;
			var targetNodeList = [].concat(dojo._toArray(dom.getElementsByTagName("SELECT"))).concat(dojo._toArray(dom
			        .getElementsByTagName("INPUT")));
			dojo.forEach(targetNodeList, function(node) {
				var attrValue = dojo.attr(node, "controlFieldName");
				if (!attrValue) { return; }
				var tagName = node.tagName.toUpperCase();
				var type = (node.type || "").toUpperCase();
				if (tagName == "INPUT") {
					_widgetInstance.cardListenerRegistry.push(_widgetInstance.connect(node, "onclick", "elementclick"));
				}
				// _widgetInstance.connect(node,
				// "ondblclick", "elementdblclick");
				if (tagName == "INPUT" && (type == 'TEXT' || type == 'PASSWORD')) {
					_widgetInstance.cardListenerRegistry.push(_widgetInstance.connect(node, "onblur", "elementblur"));
					_widgetInstance.cardListenerRegistry.push(_widgetInstance
					        .connect(node, "onchange", "elementchange"));
					_widgetInstance.cardListenerRegistry.push(_widgetInstance.connect(node, "onpropertychange",
					        "elementpropertychange"));
				}
				// _widgetInstance.connect(node,
				// "onmouseover", "elementmouseover");
				if (tagName == 'SELECT') {
					_widgetInstance.cardListenerRegistry.push(_widgetInstance
					        .connect(node, "onchange", "elementchange"));
				}
				
				    // _widgetInstance.connect(node,
				    // "onmouseout",
				    // "elementmouseout");
				    // _widgetInstance.connect(node,
				    // "onkeyup", "elementkeyup");
				    // _widgetInstance.connect(node,
				    // "onkeydown", "elementkeydown");
			});
			
		},
		connect : function() {
			var arr = dojo._toArray(arguments);
			arr[2] = dojo.hitch(this, arr[2]);
			var result = dojo.connect.apply(dojo, arr);
			return result;
		},
		/**
		 * 增加一个卡片初始化回调
		 * 
		 * @method
		 */
		addCardCallback : function() {
			if (this.cardCallbackList == null) {
				this.cardCallbackList = [];
			}
			var arrayProto = Array.prototype,
				args = arrayProto.slice.apply(arguments),
				realList = [];
			
			dojo.forEach(args, function(cb) {
				        if (dojo.isFunction(cb)) {
					        realList.push(cb);
				        } else if (dojo.isArray(cb)) {
					        arrayProto.push.apply(realList, dojo.filter(cb, function(item) {
						                        return !!dojo.isFunction(item);
					                        }));
				        }
				        
			        });
			arrayProto.push.apply(this.cardCallbackList, realList);
			
		},
		destroy : function() {
			// detach buscard event binding
			if (this.busCardInstance && this.busCardInstance.isLoaded()) {
				try {
					this.busCardInstance.destroy();
					delete this.busCardInstance();
				}
				catch (e) {}
				
			}
			// detach model binding
			if (this.$modelId$) {
				try {
					dojo.global.$widgetModelContext$.set(this.$modelId$, null);
				}
				catch (e) {

				}
				
			}
			try {
				dojo.forEach(this.cardListenerRegistry, function(handle) {
					        dojo.disconnect(handle);
				        });
				
			}
			catch (e) {}
			this.inherited(arguments);
			
		},
		toString : function() {
			return this.declaredClass;
		}
		
	}

	);
	
}

);