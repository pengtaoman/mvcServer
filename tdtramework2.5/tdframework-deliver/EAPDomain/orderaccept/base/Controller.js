defineModule("orderaccept.base.Controller", [], function() {
	/**
	 * 定义通用的控制器类
	 * 
	 * @class
	 */
	dojo.declare("orderaccept.base.Controller", null, {
		        /**
				 * 根据地址路由请求
				 * 
				 * @param {String} url
				 * @method
				 */
		        route : function(url) {
			        var arrs = Array.prototype.slice.apply(arguments);
			        if (arrs.length == 0) {
				        return;
			        } else {
				        var path = this.getRoutePath(url),
					        resultList = [],
					        protoPush = Array.prototype.push,
					        protoSlice = Array.prototype.slice;
				        arrs.shift();
				        if (arrs.length == 1 && dojo.isArray(arrs[0])) {
					        resultList = arrs[0];
				        } else {
					        dojo.forEach(arrs, function(item) {
						                resultList.push(item);
					                });
				        }
				        
				        var _analysisPath = this._extractRoutePath(url);
				        var firstSegment = _analysisPath[0];
				        // 路由到控制器自身方法 
				        if (firstSegment == 'self') {
					        var methodName = _analysisPath[_analysisPath.length - 1],
						        args = _analysisPath.splice(2),
						        finalObj = dojo.getObject(_analysisPath.slice(1,
						                        _analysisPath.length - 1).join("."), false, this);
					        if (finalObj) {
						        return finalObj[methodName].apply(finalObj, resultList);
					        } else {
						        return this[methodName].apply(this, resultList);
					        }
					        
					        // 路由到控制器属性方法
				        } else if (this[firstSegment]) {
					        var recevier = dojo.getObject(_analysisPath.slice(0,
					                        _analysisPath.length - 1).join("."), false, this),
						        method = _analysisPath[_analysisPath.length - 1];
					        return recevier[method].apply(recevier, resultList);
					        
				        } else if (this._isSpringBeanInvokeRequest(url)) {
					        var matcher = /^spring:(.*?)\/?$/i.exec(url),
						        parts = matcher[1].split("/");
					        // has appName
					        if (parts.length == 3) {
						        return BusCard.$remote(parts[1], parts[0])[parts[2]].apply(null,
						                resultList);
						        
					        } else {
						        return BusCard.$remote(parts[0])[parts[1]].apply(null, resultList);
						        
					        }
					        
				        } else if (this._isClassMethodInvokeRequest(url)) {
					        var matcher = /^class:(.*?)\/?$/i.exec(url),
						        parts = matcher[1].split("/");
					        return BusCard.$load(parts[0])[parts[1]].apply(null, resultList);
					        
				        } else if (this.isUrlRequest(url)) {
					        var matcher = /^url:(.*?)$/i.exec(url),
						        requestUrl = matcher[1],
						        contextPath = BusCard.path.contextPath;
					        if (requestUrl.indexOf("/") != 0) {
						        requestUrl = "/" + requestUrl;
					        }
					        if (requestUrl.indexOf(contextPath) != 0) {
						        requestUrl = contextPath + requestUrl;
					        }
					        return BusCard.doGet(requestUrl, {}, resultList[0], resultList[1]
					                        || function() {});
					        
				        }
				        // 全局路由
				        else {
					        dojo.publish(path, resultList);
				        }
				        
			        }
			        
		        },
		        _isSpringBeanInvokeRequest : function(path) {
			        var f = /^spring:/i.test(path);
			        return f;
			        
		        },
		        _isClassMethodInvokeRequest : function(path) {
			        var f = /^class:/i.test(path);
			        return f;
		        },
		        isUrlRequest : function(path) {
			        var f = /^url:/i.test(path);
			        return f;
			        
		        },
		        _extractRoutePath : function(path) {
			        var _path = /^(?:\/)*(.*?)(?:\/)*$/.exec(path)[1];
			        return dojo.filter(path.split("/"), function(part) {
				                return dojo.trim(part) != ''
			                });
			        
		        },
		        /**
				 * 生成路由路径,protocol为route
				 * 
				 * @param {String} url
				 * @method
				 * 
				 */
		        getRoutePath : function(url) {
			        var route = /^route\:/.test(url) ? url : ("route:" + (/^\//.test(url)
			                ? url
			                : ("/" + url)));
			        return route;
		        },
		        
		        addEventListener : function(type, cb, first) {
			        this.eventListenerRegistry = this.eventListenerRegistry || {};
			        if (type && dojo.trim(type)) {
				        this.eventListenerRegistry[type] = this.eventListenerRegistry[type] || [];
				        if (first) {
					        this.eventListenerRegistry[type].unshift(cb);
				        } else {
					        this.eventListenerRegistry[type].unshift(cb);
				        }
				        
			        }
			        
		        },
		        fireEvent : function(type) {
			        if (this.eventListenerRegistry && this.eventListenerRegistry[type]) {
				        var controller = this;
				        dojo.forEach(this.eventListenerRegistry[type], function(cb) {
					                cb.call(controller);
				                });
				        
			        }
			        
		        },
		        _filterLoadedModule : function(deps) {
			        var deps = deps || [];
			        return dojo.filter(deps, function(moduleName) {
				                if (!dojo.getObject(moduleName)) { return true; }
				                
			                });
			        
		        },
		        asynExecute : function(deps, cb) {
			        var declaredClass = this.declaredClass;
			        DependenceAnalyser.addDepModules(declaredClass, dojo.filter(deps,
			                        function(dep) {
				                        var modulePattern = /^[^\/]*$/;
				                        return modulePattern.test(dep);
			                        }));
			        var pathList = dojo.map(this._filterLoadedModule(deps) || [], function(
			                        moduleName) {
				                var matcher = /^([^\/]*)\.([^\.\/]*)$/.exec(moduleName),
					                path = matcher ? dojo.moduleUrl(matcher[1], matcher[2] + ".js")
					                        .toString() : (moduleName
					                        .indexOf(BusCard.path.contextPath) == 0
					                        ? moduleName
					                        : (function() {
						                        if (moduleName.indexOf("/") == 0) {
							                        return BusCard.path.contextPath + moduleName;
							                        
						                        } else {
							                        return BusCard.path.contextPath + "/"
							                                + moduleName;
						                        }
					                        }()));
				                return path;
				                
			                });
			        return BusCard.ScriptLoader.asynLoad(pathList, cb);
			        
		        },
		        beginRenderingLifeCycle : function(context) {
			        var pid = context.pid || ("pid_") + (new Date().getTime());
			        context.pid = pid;
			        dojo.global.$appContext$.get("viewContextRegistry")[pid] = {
				        context : context
			        };
			        return this;
		        },
		        prepareViewTemplate : function(context, url) {
			        var viewContext = dojo.global.$appContext$.get("viewContextRegistry")[context.pid];
			        if (url.indexOf("<") >= 0 || url.indexOf(">") >= 0) {
				        viewContext.interpretedTemplate = BusCard.Template.create(url)
				                .apply(context);
				        
			        } else {
				        viewContext.interpretedTemplate = BusCard.Template.create(dojo
				                ._getText(url)).apply(context);
				        
			        }
			        return this;
		        },
		        renderView : function(context, dom) {
			        var viewContext = dojo.global.$appContext$.get("viewContextRegistry")[context.pid];
			        dom.innerHTML = viewContext.interpretedTemplate;
			        viewContext.domNode = dom;
			        return this;
			        
		        },
		        bindViewListener : function(context, modules) {
			        var viewContext = dojo.global.$appContext$.get("viewContextRegistry")[context.pid],
				        listenerIdList = dojo.map(modules || [], function(moduleName) {
					                var contextPath = BusCard.path.contextPath;
					                if (moduleName.indexOf(contextPath) == 0) {
						                moduleName = moduleName.substring(context.length);
					                }
					                if (moduleName.indexOf("/") >= 0) {
						                var dotIndex = moduleName.indexOf(".");
						                if (dotIndex != -1) {
							                moduleName = moduleName.substring(0, dotIndex);
						                }
						                moduleName = moduleName.replace(/\//g, ".");
						                moduleName = /^\.?(.*?)\.?$/.exec(moduleName)[1];
					                }
					                
					                return moduleName;
					                
				                });
			        viewContext.controller = this;
			        this.asynExecute(modules, function() {
				                var listenerRegistry = dojo.global.$appContext$
				                        .get("listenerRegistry"),
					                NOOP = function() {};
				                dojo.forEach(listenerIdList, function(listenerId) {
					                        (listenerRegistry[listenerId] || NOOP).apply(null,
					                                [viewContext]);
					                        
				                        });
				                
			                });
			        
			        return this;
			        
		        },
		        endRenderingLifeCycle : function(context) {
			        try {
				        delete dojo.global.$appContext$.get("viewContextRegistry")[context.pid];
				        
			        }
			        catch (e) {

			        }
			        return this;
		        }
		        
	        });
	
});