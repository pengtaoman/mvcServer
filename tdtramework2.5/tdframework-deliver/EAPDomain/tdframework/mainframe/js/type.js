var Type=new function(){
	var Me=this;


	Me.isObject =function(a) {
	  return (a && typeof a == 'object') || Me.isFunction(a);
	}


	Me.isAlien=function(a) {
	  return Me.isObject(a) && typeof a.constructor != 'function';
	}



	Me.isFunction =function(a) {
	  return typeof a == 'function';
	}

	Me.isNumber =function(a) {
	  return typeof a == 'number' && Me.isFinite(a);
	}

	Me.isBoolean =function(a) {
	  return typeof a == 'boolean';
	}

	Me.isString =function(a) {
	  return typeof a == 'string';
	}

	Me.isNull =function(a) {
	  return typeof a == 'object' && !a;
	}

	Me.isUndefined =function(a) {
	  return typeof a == 'undefined';
	}

	Me.isArray =function(a) {
	  return Me.isObject(a) && a.constructor == Array;
	}

	Me.isCollection =function(a) {
	  return Me.isObject(a) && isValid(a.length) && !Me.isArray(a);
	}


	Me.isEmpty=function(o) {
	  var i, v;
	  if (Me.isObject(o)) {
		for (i in o) {
		  v = o[i];
		  if (Me.isUndefined(v) && Me.isFunction(v)) {
			return false;
		  }
		}
	  }
	  return true;
	}

}