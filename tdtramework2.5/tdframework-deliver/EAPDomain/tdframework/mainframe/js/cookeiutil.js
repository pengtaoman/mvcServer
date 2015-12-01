// ========================================================================================
//	Cookie 相关类
// ========================================================================================
var CookieUtil=new function(){

	var Me=this;
	Me.defaultExpires=365*(24*60*60*1000);

	Me.defaultSecure=true;

	Me.isEncoded=true;

	var testKey="_CookieUtil_TestingCookieSupport_";
	var testValue="_CookieUtil_CookiesAllowed_";

	Me.isSupported = function() {
		//alert(Me.f);
		if(typeof navigator.cookieEnabled != "boolean") {
			Me.setCookie(testKey,testValue, 100, null);
			var cookieVal = Me.getCookie(testKey);
			navigator.cookieEnabled = (cookieVal == testValue);
			if(navigator.cookieEnabled) {
				Me.delCookie(testKey);
			}
		}
		return navigator.cookieEnabled;
	}

	//设定Cookie值
	Me.setCookie = function(name, value, days, domain, path, secure) {
		var expires = -1;
		if(typeof days == "number" && days >= 0) {
			var d = new Date();
			d.setTime(d.getTime()+(days*24*60*60*1000));
			expires = d.toGMTString();
		}else{
			var d = new Date();
			d.setTime(d.getTime()+Me.defaultExpires);
			expires = d.toGMTString();
		}
		if (Me.isEncoded){
			value = encodeURIComponent (value);
		}
		
		document.cookie = name + "=" + value + ";"
			+ (expires != -1 ? " expires=" + expires + ";" : "")
			+ (domain ? "; domain=" + domain : "")
			+ (path ? "path=" + path : "")
			+ (secure ? "; secure" : "");
	}

	//获得Cookie的值(解码后的值)
	Me.getCookie = function(name){
		var idx = document.cookie.indexOf(name+'=');
		if(idx == -1) { 
			return null; 
		}
		var value = document.cookie.substring(idx+name.length+1);
		var end = value.indexOf(';');
		if(end == -1) { end = value.length; }
		value = value.substring(0, end);
		if (Me.isEncoded){
			value = decodeURIComponent(value);
		}
		return value;
	}

	//删除Cookie
	Me.delCookie = function(name){
		Me.setCookie(name, "-", 0);
	}

}



// ========================================================================================
//	Json 相关类
// ========================================================================================

var unicodeChar = function(c){
    if(c == "\"" || c == "\\") return "\\" + c;
    else if (c == "\b") return "\\b";
    else if (c == "\f") return "\\f";
    else if (c == "\n") return "\\n";
    else if (c == "\r") return "\\r";
    else if (c == "\t") return "\\t";
    var hex = c.charCodeAt(0).toString(16);
    if(hex.length == 1) return "\\u000" + hex;
    else if(hex.length == 2) return "\\u00" + hex;
    else if(hex.length == 3) return "\\u0" + hex;
    else return "\\u" + hex;
};

var unicodeString = function(s){
    var parts = s.split("");
    for(var i=0; i < parts.length; i++) {
		var c =parts[i];
		if(c == '"' ||  c == '\\' || c.charCodeAt(0) < 32 || c.charCodeAt(0) >= 128)
			parts[i] = unicodeChar(parts[i]);
    }
    return "\"" + parts.join("") + "\"";
};

var toJSON = function(o){
    if(o == null) {
		return "null";
    } else if(o.constructor == String) {
		return stringToJSON(o);
	} else if(o.constructor == Number) {
		return o.toString();
    } else if(o.constructor == Boolean) {
		return o.toString();
    } else if(o.constructor == Date) {
		return '{javaClass: "java.util.Date", time: ' + o.valueOf() +'}';
    } else if(o.constructor == Array) {
		var v = [];
		for(var i = 0; i < o.length; i++) 
			v.push(toJSON(o[i]));
		return "[" + v.join(", ") + "]";
    } else {
		var v = [];
		for(attr in o) {
			if(o[attr] == null) {
				v.push("\"" + attr + "\": null");
			} else if(typeof o[attr] == "function"){
				;	/* skip */
			} else {
				v.push(stringToJSON(attr) + ": " + toJSON(o[attr]));
			}
		}
		return "{" + v.join(", ") + "}";
    }
};

var stringToJSON=function(str){
	//return unicodeString(str);
	var s=str.replace(/(["\\])/g,'\\$1');
	s=s.replace(/(\n)/g,"\\n");
	s=encodeURIComponent(s);
//	s=s.replace(/(%)/g,"@");
	s='"'+s+'"';
	return s;
};

var buildJSONMap=function(jstr){
	var tempMap={};
	eval("tempMap= " + jstr);
	for(var key in tempMap){
		var val=tempMap[key];
		if(val.constructor == String ){
			tempMap[key]=decodeURIComponent(val);
		}
	}
	return tempMap;
}

