dojo.require("unieap.global");
dojo.require("unieap.util.util");
dojo.provide("unieap.cache.localStorage");

(function(){
	unieap.cache.localStorage.DB_NAME = "com_neusoft_unieap_clientCache_";
	var topWin = window;
	
	/**
	 * @summary:
	 * 		判断当前浏览器是否支持HTML5本地缓存
	 * @description:
	 * 		如果支持返回true，否则返回false
	 */
	unieap.cache.isAvailable = function(){
		return unieap.global.isUseClientCache && ('localStorage' in topWin) && topWin['localStorage'] !== null && topWin['localStorage'] !== undefined;
	}
	
	/**
	 * @summary:
	 * 		清除缓存中所有记录
	 * @example:
	 * |<script>
	 * |	unieap.cache.clear();
	 * |</script> 	
	 * 通过unieap的debug工具查看缓存数据是否被清空	
	 */
	unieap.cache.clear = function() {
		if(!unieap.cache.isAvailable()){
			return;
		}
		var keys =  unieap.cache.getKeys();
		for(var i = 0; i < keys.length; i++){
			key = keys[i];
			topWin.localStorage.removeItem(key);
		}
	}
	
	/**
	 * @summary:
	 * 		往缓存中插入数据
	 * @param：
	 * 		{string} key  
	 * @param：
	 * 		{string} value 
	 * @param：
	 * 		{string} timestamp 
	 * @example:
	 * |<script>
	 * |	var value = "[
	 * |		{CODEVALUE:1,CODENAME:'汉族'},
	 * |		{CODEVALUE:2,CODENAME:'回族'},
	 * |		{CODEVALUE:3,CODENAME:'白族'}
	 * |	]";
	 * |	unieap.cache.put("dept",value,String(new Date().getTime()));
	 * |</script> 	
	 * 通过unieap的debug工具查看缓存数据是否被清空
	 */
	unieap.cache.put = function(key,value,timestamp) {
		if(!unieap.cache.isAvailable()){
			return;
		}
		var cacheKey,cacheValue = {};
		cacheValue.value = value;
		cacheValue.timestamp = timestamp || 1;
		cacheKey = unieap.cache.localStorage.DB_NAME+key;
		var value = dojo.toJson(cacheValue);//obj2Str(cacheValue);
		topWin.localStorage.setItem(cacheKey,value);
	}
	
	/**
	 * @summary:
	 * 		往缓存中插入数据
	 * @param：
	 * 		{string} key  
	 * @example:
	 * |<script>
	 * |	unieap.cache.remove("key");
	 * |</script> 	
	 * 通过unieap的debug工具查看缓存数据是否被清空
	 */
	unieap.cache.remove = function(key){
		var cacheKey = unieap.cache.localStorage.DB_NAME+key;
		topWin.localStorage.removeItem(cacheKey);
	}
	
	/**
	 * @summary:
	 * 		往缓存中插入数据
	 * @param：
	 * 		{string} keys  
	 * @param：
	 * 		{string} values 
	 * @param：
	 * 		{string} timestamps 
	 */
	unieap.cache.putMultiple = function(keys,values,timestamps) {
		if(!unieap.cache.isAvailable()){
			return;
		}
		var key,value,timestamp;
		for(var i=j=k=0;i < keys.length; i++){
			key=keys[i];
			value=values[j];
			timestamp=timestamps&&timestamps[k]||1;
			unieap.cache.put(key,value,timestamp);
			j++;
			k++;
		}
	}
	
	/**
	 * @summary:
	 * 		从缓存中获得数据
	 * @param：
	 * 		{string} key  
	 * @return：
	 * 		{string} value 
	 */
	unieap.cache.get = function(key) {
		if(!unieap.cache.isAvailable() || key == null){
			return;
		}
		var json,obj,cacheKey;
		cacheKey = unieap.cache.localStorage.DB_NAME+key;
		json = topWin.localStorage.getItem(cacheKey);
		obj = dojo.fromJson(json)//str2Obj(value);
		return (obj == null ? null : obj.value);
	}
	
	/**
	 * @summary:
	 * 		从缓存中获得所有key值
	 * @return：
	 * 		{string[]} keys 
	 */
	unieap.cache.getKeys = function(){
		if(!unieap.cache.isAvailable()){
			return;
		}
		var key,keys = [];
		for(var i = 0; i < topWin.localStorage.length; i++){
			key = topWin.localStorage.key(i);
			if(key.indexOf(unieap.cache.localStorage.DB_NAME) > -1){
				keys.push(key);
			}
		}
		return keys;
	}
	
	/**
	 * @summary:
	 * 		获取缓存中记录总数
	 * @return：
	 * 		{string} count 
	 */
	unieap.cache.getCount = function() {
		if(!unieap.cache.isAvailable()){
			return;
		}
		var key,count = 0;
		for(var i = 0; i < topWin.localStorage.length; i++){
			key = topWin.localStorage.key(i);
			if(key.indexOf(unieap.cache.localStorage.DB_NAME) > -1){
				count++;
			}
		}
		return count;
	}
	
	/**
	 * @summary:
	 * 		获取缓存中所有记录的timestamp
	 * @return：
	 * 		{string[]} timestamps 
	 */
	unieap.cache.getAllTimeStamps = function(){
		if(!unieap.cache.isAvailable()){
			return;
		}
		var key,json,obj,timestamp,timestamps = {};
		var keys = unieap.cache.getKeys();
		for(var i = 0; i < keys.length; i++){
			key = keys[i];
			json = topWin.localStorage.getItem(key);
			obj = dojo.fromJson(json);
			timestamp = parseInt(obj.timestamp);
			if(timestamp > 2649600000){
				timestamps[key] = timestamp;
			}
		}
		return timestamps;
	}
})();