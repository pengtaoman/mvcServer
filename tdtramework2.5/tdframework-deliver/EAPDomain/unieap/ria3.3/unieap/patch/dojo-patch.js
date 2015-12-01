(function(){
	
	//解决在dojo1.3在frame里，刷新IE出现内存泄漏的问题
	//window的事件列表
	if(/^1\.3\./.test(dojo.version)){ //dojo 1.3
		var winEvtList = [
			"onactivate",
			"onafterprint",
			"onbeforedeactivate",
			"onbeforeprint",
			"onbeforeunload",
			"onblur",
			"oncontrolselect",
			"ondeactivate",
			"onerror",
			"onfocus",
			"onhelp",
			"onload",
			"onmove",
			"onmoveend",
			"onmovestart",
			"onresize",
			"onresizeend",
			"onresizestart",
			"onscroll", 
			"onunload" 
		];	
		var _orginUnLoad = window.onunload;
		window.onunload = function(){
			_orginUnLoad && _orginUnLoad();
			for(var i=0,l=winEvtList.length;i<l;i++){
				var name = winEvtList[i];
				window[name] = null;
			}		
		}
	}
	
	/**
	 * @summary:
	 * 		dojo.mixin(target,source)方法处理两个在不同window空间的对象时,source的
	 * 		constructor会覆盖target的constructor。dojo 2.0会修正这个问题。
	 * 默认的原型方法如下(见bootrap.js中dojo._extraNames)
	 *	dojo._extraNames = extraNames = extraNames ||
	 *	    ["hasOwnProperty", "valueOf", "isPrototypeOf",
	 *		"propertyIsEnumerable", "toLocaleString", "toString", "constructor"];
	*/
	if(/^1\.[4-9]\./.test(dojo.version)){ //dojo 1.4
		dojo._extraNames.length>0&&dojo._extraNames.pop()&&dojo._extraNames.push("propertyIsEnumerable");
	}
	
})();