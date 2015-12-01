function $() {
  var results = [];
  var element;
  for (var i = 0; i < arguments.length; i++) {
    element = arguments[i];
    if (typeof element == 'string')
      element = document.getElementById(element);
    results.push(element);
  }
  return results.length < 2 ? results[0] : results;
}

function $byId(id){
	var result=document.getElementById(id);
	return result;
}

function $byName(name){

	var results=document.getElementsByName(name);
	if (!isValid(results) || results.length<1){
		results=[];
		results=results.concat($byId(name));
	}
	return results;
}

function $1byName(name){
	var rs=$byName(name);
	if (rs!=null){
		return rs[0];
	}
	return null;
}

function isValid(obj){
	if (obj==null || typeof(obj)=="undefined" ){
		return false;
	}else{
		return true;
	}
}

function delArray(arr,n){
	var newArr=[];
	if ( n<0 || n>arr.length) { 
		n = arr.length; 
	}
	for (var i=0;i<n ;i++ ){
		newArr[i]=arr[i];
	}

	for (var i=n+1;i<arr.length ;i++ ){
		newArr[i-1]=arr[i];
	}
	return newArr;
}

function cloneObject(source){
	if ( !isValid(source) ){
		return null;
	}else if ( Type.isArray(source) || Type.isCollection(source) ){
		var rs=[];
		for (var i=0;i<source.length;i++ ){
			var val=cloneObject(source[i]);
			rs[i]=val;
		}
		return rs;
	}else if( Type.isFunction(source)){
		return source;
	}else if( Type.isObject(source)){
		var rs=new Object();
		for (var property in source) {
			rs[property] = cloneObject(source[property]);
		}
		return rs;
	}else{
		return source;
	}
}


function replaceAll(exstr,ov,value){
	var gc=escapeRegExp(ov);
	if (gc==null || gc==""){
		return exstr;
	}
	var reReplaceGene="/"+gc+"/gm";
	var r=null;
	var cmd="r=exstr.replace("+reReplaceGene+",\""+value+"\")";
	eval(cmd);
	return r;
}

function escapeRegExp (str) {
	return str.replace(/\\/gm, "\\\\").replace(/([\f\b\n\t\r[\^$|?*+(){}])/gm, "\\$1");
}

function trim(str, wh){
	if(!str.replace){ return str; }
	if(!str.length){ return str; }
	var re = (wh > 0) ? (/^\s+/) : (wh < 0) ? (/\s+$/) : (/^\s+|\s+$/g);
	return str.replace(re, "");
}


function showElement(obj){
	obj.style.display="block";
}
function hideElement(obj){
	obj.style.display="none";
}
function showOrHideElement(obj){
	if (obj.style.display=="none"){
		obj.style.display="block";
	}else{
		obj.style.display="none";
	}
}

function showOrHideElementById(eid){
	showOrHideElement(document.getElementById(eid));
}

function ignore(){
	event.srcElement.blur();
	event.returnValue=false;
	return false;
}
