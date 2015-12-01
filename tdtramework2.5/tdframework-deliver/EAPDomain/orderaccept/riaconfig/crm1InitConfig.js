if (typeof dojo.global.$appData$ === 'undefined') {
	var _globalObject = this;
	dojo.declare("$AppDataModel$", [], {
		        cacheRegistryKey : '$cacheRegistryKey$',
		        constructor : function(initData) {
			        this.init(initData);
			        this.initCacheRegistry();
		        },
		        initCacheRegistry : function() {
			        if (!this[this.cacheRegistryKey]) {
				        this[this.cacheRegistryKey] = {};
			        }
		        },
		        /**
				 * FIXME 有待改进缓存算法,当缓存数据量过大是按时间还是按大小移除缓存内容?
				 * 
				 * @param {Boolean} config.permitCache 是否允许被缓存
				 * @param {Boolean} config.permitFromCach 是否可以从缓存中取
				 * @param {Function} config.callback 查询策略
				 * @param {Function} config.assertCacheResult
				 *            断言从缓存中查询的结果
				 * @method
				 */
		        cache : function(key, config) {
			        var len = arguments.length,
				        self = this;
			        if (key == null) { return; }
			        if (len == 0) {
				        return self[self.cacheRegistryKey];
			        } else if (len == 1) {
				        return self[self.cacheRegistryKey][key];
			        } else {
				        key = key.toString();
				        config = config || {};
				        var permitCache = config.permitCache || false,
					        permitFromCache = config.permitFromCache || false,
					        assertCacheResult = config.assertCacheResult || function() {
						        return true;
					        },
					        cb = config.callback || function() {};
				        if (permitFromCache && self[self.cacheRegistryKey][key]) {
					        var cacheResult = self[self.cacheRegistryKey][key];
					        if (assertCacheResult(cacheResult)) { return cacheResult; }
				        }
				        var result = cb();
				        if (permitCache && result) {
					        self[self.cacheRegistryKey][key] = result;
				        }
				        return result;
				        
			        }
			        
		        },
		        
		        init : function(data) {
			        if (dojo.isObject(data)) {
				        this.empty();
				        for (var key in data) {
					        if (data.hasOwnProperty(key)) {
						        this.set(key, data[key]);
					        }
				        }
			        }
			        
		        },
		        copy : function(data) {
			        if (dojo.isObject(data)) {
				        for (var key in data) {
					        if (data.hasOwnProperty(key)) {
						        this.set(key, data[key]);
					        }
					        
				        }
				        
			        }
			        
		        },
		        isGlobalProperty : function(key) {
			        var result = /^\$(.*?)\$$/.test(key);
			        return result;
		        },
		        empty : function(keepPropertiesList) {
			        var context = this;
			        keepPropertiesList = keepPropertiesList || [];
			        for (var key in this) {
				        if (dojo.some(keepPropertiesList, function(k) {
					                return k == key;
				                }) || context.isGlobalProperty(key)) {
					        continue;
				        }
				        if (this.hasOwnProperty(key)) {
					        try {
						        this[key] = null;
						        delete this[key];
					        }
					        catch (e) {

					        }
					        
				        }
			        }
			        
		        },
		        deleteProperty : function(propertyName) {
			        if (this.hasOwnProperty(propertyName) && !this.isGlobalProperty(propertyName)) {
				        try {
					        delete this[propertyName];
				        }
				        catch (e) {

				        }
			        }
		        },
		        get : function(key, defaultValue) {
			        return !!this[key] ? this[key] : defaultValue;
		        },
		        set : function(key, value, notoverride) {
			        if (!notoverride || !this[key]) {
				        this[key] = value;
			        }
			        
		        },
		        each : function(cb) {
			        for (var key in this) {
				        if (this.hasOwnProperty(key)) {
					        if (cb.apply(this, [this[key], key]) === false) {
						        break;
					        }
				        }
			        }
			        
		        },
		        exist : function(cb) {
			        for (var key in this) {
				        if (this.hasOwnProperty(key)) {
					        if (cb.apply(this, [this[key], key]) === true) { return true; }
				        }
			        }
			        
		        },
		        find : function(cb) {
			        for (var key in this) {
				        if (this.hasOwnProperty(key)) {
					        if (cb.apply(this, [this[key], key]) === true) { return {
						        key : key,
						        value : this[key]
					        }; }
				        }
			        }
			        
		        },
		        findAll : function(cb) {
			        var _data = [];
			        for (var key in this) {
				        if (this.hasOwnProperty(key)) {
					        if (cb.apply(this, [this[key], key]) === true) {
						        _data.push({
							                key : key,
							                value : this[key]
						                });
					        }
				        }
			        }
			        return _data;
			        
		        },
		        some : function(cb) {
			        for (var key in this) {
				        if (this.hasOwnProperty(key)) {
					        if (cb.apply(this, [this[key], key]) === true) { return true; }
				        }
			        }
			        
		        },
		        all : function(cb) {
			        
			        for (var key in this) {
				        if (this.hasOwnProperty(key)) {
					        if (cb.apply(this, [this[key], key]) !== true) { return false; }
				        }
			        }
			        
		        },
		        toJson : function(handle) {
			        return dojo.toJson(handle ? handle(this) : this);
		        },
		        fromJson : function(json) {
			        this.init(dojo.fromJson(json));
		        },
		        copyFromJson : function(json) {
			        this.copy(dojo.fromJson(json));
		        },
		        loadData : function(url) {
			        this.copyFromJson(d._getText(url));
		        },
		        postData : function(url) {
			        return dojo.xhr("POST", {
				                url : url,
				                sync : true,
				                postData : this.toJson()
			                });
			        
		        },
		        jsonPath : function(expr) {
			        return BusCard.jsonPath(this, expr);
		        },
		        query : function(expr) {
			        return this.jsonPath(expr);
		        }
	        });
	dojo.global.$appContext$ = new $AppDataModel$();
	dojo.global.$widgetModelContext$ = new $AppDataModel$();
	_globalObject.$ac$ = dojo.global.$appContext$;
	_globalObject.$wmc$ = dojo.global.$widgetModelContext$;
	
}

dojo.global.$appContext$.set("viewContextRegistry", {});
dojo.global.$appContext$.set("listenerRegistry", {});
dojo.global.defineViewListener = function(listenerId, cb) {
	dojo.global.$appContext$.listenerRegistry[listenerId] = cb;
};

/**
 * for compatibility purpose
 * 
 * @param {} result
 * @return {Boolean}
 */
dojo.global.executeAjaxResult = function(result) {
	var messageBox = dojo.require("orderaccept.common.dialog.MessageBox");
	if (!result || typeof(result) == "undefined") {
		alert("\u53d7\u7406\u68c0\u6d4b\u6216\u83b7\u53d6\u6570\u636e\u5931\u8d25\uff0c\u539f\u56e0\u4e3a\uff1a\u8fd4\u56de\u6570\u636e\u89e3\u6790\u5931\u8d25\uff01");
		return false;
	}
	var jsonResultObj = null;
	try {
		jsonResultObj = (typeof result == 'string') ? eval("(" + result + ")") : result;
	}
	catch (e) {
		alert("\u53d7\u7406\u68c0\u6d4b\u6216\u83b7\u53d6\u6570\u636e\u5931\u8d25\uff0c\u539f\u56e0\u4e3a\uff1a\u8fd4\u56de\u6570\u636e\u89e3\u6790\u5931\u8d25\uff01");
		return false;
	}
	if (jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "-1") {
		//alert("\u53d7\u7406\u68c0\u6d4b\u6216\u83b7\u53d6\u6570\u636e\u5931\u8d25\uff0c\u539f\u56e0\u4e3a\uff1a" + jsonResultObj.message);
        messageBox.alert({
            message : jsonResultObj.message
        });
		return false;
	}
	if (jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1") { return jsonResultObj.message; }
	if (jsonResultObj && (jsonResultObj.flag == "undefined" || jsonResultObj.flag == undefined)) { return jsonResultObj; }
};

dojo.global.executeRequest = BusCard.executeRequest;

// FIXME 处理一些unieap的bug 这些代码都是临时性处理 等待unieap修复
void function() {
	var borderContainer = dojo.getObject("unieap.layout.BorderContainer");
	if(!borderContainer){
		return ;
	}
	resizeContainerMethod = borderContainer.prototype.resizeContainer;
	borderContainer.prototype.resizeContainer = function() {
		var container = this;
		var domNode = container.domNode;
		var isHidden = false;
		if (domNode) {
			while (true && domNode !== document.body) {
				if (domNode.style.display == 'none') {
					isHidden = true;
					break;
				} else {
					domNode = domNode.parentNode;
				}
			}
		}
		if (isHidden) {
			return false;
		} else {
			return resizeContainerMethod.apply(container, arguments);
		}
	};
	
}();
