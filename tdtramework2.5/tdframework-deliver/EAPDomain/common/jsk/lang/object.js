JSKit.object={
	ClassName : 'jsk.util.object',


	clone : function(source){
			if ( !JSKit.object.isValid(source) ){
				return null;
			}else if ( JSKit.object.isArray(source) || JSKit.object.isCollection(source) ){
				var rs=[];
				for (var i=0;i<source.length;i++ ){
					var val=JSKit.object.clone(source[i]);
					rs[i]=val;
				}
				return rs;
			}else if( JSKit.object.isFunction(source)){
				return source;
			}else if( JSKit.object.isObject(source)){
				var rs=new Object();
				for (var property in source) {
					rs[property] = JSKit.object.clone(source[property]);
				}
				return rs;
			}else{
				return source;
			}
		},

	isObject : function(a) {
		  return (a && typeof(a) == 'object') || JSKit.object.isFunction(a);
		},


	isAlien	: function(a) {
		  return JSKit.object.isObject(a) && typeof(a.constructor) != 'function';
		},



	isFunction  : function(a) {
			  return typeof(a) == 'function';
			},

	isNumber  : function(a) {
			  return typeof(a) == 'number' && isFinite(a);
			},

	isBoolean  : function(a) {
			  return typeof(a) == 'boolean';
			},

	isString  : function(a) {
			  return typeof(a) == 'string';
			},

	isNull  : function(a) {
			  return typeof(a) == 'object' && !a;
			},

	isUndefined : function(a) {
			  return typeof(a) == 'undefined';
			},

	isArray  : function(a) {
			  return JSKit.object.isObject(a) && a.constructor == Array;
			},

	isCollection  : function(a) {
			  return JSKit.object.isObject(a) && JSKit.object.isValid(a.length) && !JSKit.object.isArray(a);
			},


	isEmpty	: function(o) {
		  var i, v;
		  if (JSKit.object.isObject(o)) {
			for (i in o) {
			  v = o[i];
			  if (JSKit.object.isUndefined(v) && JSKit.object.isFunction(v)) {
				return false;
			  }
			}
		  }
		  return true;
		},

	isValid		: function(obj){
			if (obj==null || typeof(obj) =="undefined" ){
				return false;
			}else{
				return true;
			}
		}


};


(function(){

if (!JSKit.initClass(JSKit.object)) return;

JSKit.completeClass(JSKit.object);

})();