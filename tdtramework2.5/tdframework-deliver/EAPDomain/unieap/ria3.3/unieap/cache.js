dojo.require("unieap.global");
dojo.require("unieap.util.util");
dojo.provide("unieap.cache");
(function(){
	var isHTML5Available = ('localStorage' in window) && window['localStorage'] !== null && window['localStorage'] !== undefined;
	if(isHTML5Available){
		dojo.require("unieap.clientCache.localStorage");
	}else{
		dojo.require("unieap.clientCache.googlegear");
	}
	unieap.cache = new unieap.clientCache();
})();