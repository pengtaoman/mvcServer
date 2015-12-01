window.undefined ;

function disableSomeEvent(){ 
		//8 退格键 
		//78 Ctrl+N 
		//37 Alt+ 方向键 ← 
		//39 Alt+ 方向键 → 
		//116 F5 刷新键 
		//82 Ctrl + R 
		//121 shift+F10 
		//115 屏蔽Alt+F4 
		//屏蔽 shift 加鼠标左键新开一网页 
		var ev=window.event;
		var evsTagName=ev.srcElement.tagName;
		if ((ev.keyCode==78 && ev.ctrlKey )
		||(evsTagName && evsTagName.toLowerCase() == "a" && ev.shiftKey)){ 
			ev.returnValue=false; 
			ev.cancelBubble = true;
		} 
} 
window.document.attachEvent("onkeydown",disableSomeEvent);
function keydown(){
	if ((event.ctrlKey)&&(event.keyCode==78))
	{ 
		event.returnValue=false;
	}
}
function stopContextMenu(){
	return false;
}
//document.oncontextmenu=stopContextMenu;
function $_IEGC(){
	CollectGarbage();
}

if (navigator.appVersion.match(/MSIE/)) {
  window.attachEvent('onunload', $_IEGC);
   //window.attachEvent('onload', $_IEGC);
}

window.APP_PATH=(function(){
	var contextPath;
	var contextPathTagName='contextPath'.toLowerCase();
	var cp=document.getElementsByTagName(contextPathTagName)[0];
	if (cp!=null && cp!=undefined){
		contextPath=cp.value;
	}else{
		cp=$_HOST().document.getElementsByTagName(contextPathTagName)[0];	
		if (cp!=null && cp!=undefined){
			contextPath=cp.value;
		}else{
			contextPath=null;
		}
	}
	return contextPath; 
	
})();

window.WEBAPP_PATH=window.APP_PATH;

function $_HOST(){
	var env=null;
	try{
		env=window.top;
		while (env.opener){
			env=env.opener.top;
		}
		env=env.top;
		if (env==null||env==undefined || env.document.domain!=window.document.domain){
			env=window;
		}
	}catch(ex){
		env=window;	
	}

	return env;
}

function $() {
  var results = [];
  var element;
  for (var i = 0; i < arguments.length; i++) {
    element = arguments[i];
    if (typeof(element) == 'string'){
		var temp=document.getElementById(element);
		element = temp?temp:document.getElementsByName(element)[0];
	}
    results.push(element);
  }
  return results.length < 2 ? results[0] : results;
}

function $byId(element,doc){
	if (typeof(element) != 'string') {return element;}
	if(!doc){ doc = document; }
	var result=doc.getElementById(element);
	return result;
}

function $byName(element,doc){
	if (typeof(element) != 'string') {return element;}
	if(!doc){ doc = document; }
	var results=doc.getElementsByName(element);
	if (!results || results.length<1){
		results=[];
		var t=$byId(element);
		if (t){
			results[0]=t;
		}
		
	}
	return results;
}


function isValid(obj){
	if (obj==null || typeof obj=="undefined" ){
		return false;
	}else{
		return true;
	}
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
		var rs={};
		for (var property in source) {
			rs[property] = cloneObject(source[property]);
		}
		return rs;
	}else{
		return source;
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

function $$(name){
	var obj=document.getElementsByName(name);
	return obj;
}


function $importjs(jspath){

	var scripts = document.getElementsByTagName("script");
	for(var i = 0; i < scripts.length; i++) {
		if( jspath== scripts[i].getAttribute("src")) {
			return;
		}
	}
	var script = document.createElement("script");
	script.setAttribute("type","text/javascript");
	script.src = jspath;
	document.getElementsByTagName("head")[0].appendChild(script);
	//document.write("<script type=\"text/javascript\" src=../common/js/common/js//""+jspath+"/"></script>");

}

function $importcss(csspath){

	var scripts = document.getElementsByTagName("link");
	for(var i = 0; i < scripts.length; i++) {
		if( csspath== scripts[i].getAttribute("href")) {
			return;
		}
	}
	var ttt=document.createStyleSheet(csspath);



}


function addEvent(el, evname, func) {
	if (el.attachEvent) { 
		el.attachEvent(evname, func);
	} else {
		el[evname] = func;
	}
}

function removeEvent(el, evname, func) {
	if (el.detachEvent) { 
		el.detachEvent( evname, func);
	} else {
		el[evname] = null;
	}
}

function stopEvent() {
	event.cancelBubble=true;
	event.returnValue=false;
	return false;
}

function ignoreEvent(){
	event.srcElement.blur();
	event.returnValue=false;
	return false;
}

function hasClass(object, className) {
	if (!object.className) { return false; }
	return (object.className.search('(^|\\s)' + className + '(\\s|$)') != -1);
}

function hasValue(object, value) {
	if (!object) { return false; }
	return (object.search('(^|\\s)' + value + '(\\s|$)') != -1);
}

function removeClass(object,className) {
	if (!object) { return; }
	object.className = object.className.replace(new RegExp('(^|\\s)'+className+'(\\s|$)'), ' ');
}

function addClass(object,className) {
	if (!object || hasClass(object, className)) { return; }
	if (object.className) {
		object.className += ' '+className;
	} else {
		object.className = className;
	}
}

function insertClass(object,className) {
	if (object.className) {
		object.className = className+' '+object.className;
	} else {
		object.className = className;
	}
}

function GetElementsWithClassName(elementName,className) {
	var allElements = document.getElementsByTagName(elementName);
	var elemColl = [];
	for (var i = 0; i< allElements.length; i++) {
		if (hasClass(allElements[i], className)) {
			elemColl[elemColl.length] = allElements[i];
		}
	}
	return elemColl;
}




function getPosLeft(elm) {
	var left = elm.offsetLeft;
	while((elm = elm.offsetParent) != null)	{
		left += elm.offsetLeft;
	}
	return left;
}
function getPosRight(elm){
	return getPosLeft(elm)+elm.offsetWidth;
}

function getPosTop(elm) {
	var top = elm.offsetTop;
	while((elm = elm.offsetParent) != null)	{
		top += elm.offsetTop;
	}
	return top;
}
function getPosBottom(elm){
	return getPosTop(elm)+elm.offsetHeight;
}



function resizeParentFrame(winObj){
	if (!isValid(winObj)){
		winObj=window;
	}
	var docObj=null;
	if (isValid(winObj.frameElement) && winObj.frameElement.tagName.toLowerCase()=="iframe"){
		docObj=winObj.document;
		winObj.frameElement.style.height=docObj.body.scrollHeight+"px";
	};
}

function resizeAllParentFrame(winObj){
	if (!isValid(winObj)){
		winObj=window;
	}
	var docObj=null;
	while (isValid(winObj) && isValid(winObj.frameElement) && winObj.frameElement.tagName.toLowerCase()=="iframe"){
		docObj=winObj.document;
		winObj.frameElement.style.height=docObj.body.scrollHeight+"px";
		winObj=winObj.parent;
	};
}


/* ********************************** */


var getFocus=function(obj){
	if (obj.style.display!="none"){
		obj.focus();
	}
};


function getCheckedRadio(name){
	var rl=$$(name);
	for (var i=0;i<rl.length-1 ;i++ ){
		if (rl[i].checked){
			return rl[i];
		}
	}
	return null;
}



function getCheckedRadioIndex(name){
	var rl=$$(name);
	for (var i=0;i<rl.length-1 ;i++ ){
		if (rl[i].checked){
			return i;
		}
	}
	return -1;
}



function jumpToElement(id){
	var obj=$(id);
	if (isValid(obj)){
		obj.focus();
	}else{
		obj=$$(id);
		if (isValid(obj) && obj.length>0){
				obj[0].focus();
		}
	}
}

function enterJump(){
	var kcode=event.keyCode;
	
	if(kcode == 13){
		event.keyCode = 9;
	}
	return true;
}

function enterJumpSpaceEnter(){
	var kcode=event.keyCode;
	if(kcode == 13){
		event.keyCode = 9;
	}else if(kcode == 32){
		event.keyCode = 13;
	}
	return true;
}

function enterJumpTo(id){
	var kcode=event.keyCode;
	if(kcode == 13){
		jumpToElement(id);
	}
	return false;
}



/* ********************************** */


function replaceAll(exstr,ov,value){
	var gc=ECSideUtil.escapeRegExp(ov);
	if (gc==null || gc==''){
		return exstr;
	}
	var reReplaceGene="/"+gc+"/gm";
	var r=null;
	var cmd="r=exstr.replace("+reReplaceGene+","+escapeString(value)+")";
	eval(cmd);
	return r;
}

function escapeRegExp(str) {
	return !str?''+str:(''+str).replace(/\\/gm, "\\\\").replace(/([\f\b\n\t\r[\^$|?*+(){}])/gm, "\\$1");
}

function escapeString(str){ 

	return !str?''+str:('"' + (''+str).replace(/(["\\])/g, '\\$1') + '"'
		).replace(/[\f]/g, "\\f"
		).replace(/[\b]/g, "\\b"
		).replace(/[\n]/g, "\\n"
		).replace(/[\t]/g, "\\t"
		).replace(/[\r]/g, "\\r");
}


function trim(str, wh){
	if(typeof(str)!="string"){ return str; }
	if(!str.length){ return str; }
	var re = (wh > 0) ? (/^\s+/) : (wh < 0) ? (/\s+$/) : (/^\s+|\s+$/g);
	return str.replace(re, "");
}


/* ********************************** */

var TableRow=new function(){
	var Me=this;

	var lightLineClassName="listTableRowLight";
	var selectedLineClassName="listTableRowSelected";
	
	var currentLine=null;
	
	var isSelected=function(rowObj){
		return rowObj.className.indexOf(selectedLineClassName)>=0 && currentLine==rowObj;
	};
	var isLight=function(rowObj){
		return rowObj.className.indexOf(lightLineClassName)>=0;
	};
	
	Me.selectMe=function(rowObj){
		if (currentLine!=null){
			removeClass(currentLine,selectedLineClassName);
			removeClass(currentLine,lightLineClassName);
		}
		//if (!isSelected(rowObj)){
			addClass(rowObj,selectedLineClassName);
			currentLine=rowObj;
		//}
	};

	Me.lightMe=function(rowObj){
		if (!isSelected(rowObj)){
			addClass(rowObj,lightLineClassName);
		}
	};

	Me.resetMe=function(rowObj){
		if (!isSelected(rowObj) ){
			
			removeClass(rowObj,selectedLineClassName);
			removeClass(rowObj,lightLineClassName);
		}
	};
	
}();



//通过133,134,130,131,132,153设置业务类型
//参数1 ： 业务号码所在域 或它的id 
//参数2 ： 业务类型所在域 或它的id 
var setServiceKind=function(oServiceId,oServiceKind){
	oServiceId=$(oServiceId);
	oServiceKind=$(oServiceKind);
	var strNumber = oServiceId.value;
	
	var ifGsmValid  = false;
	var ifCdmaValid = false;
	
	try{
		if(strNumber.length>3 && strNumber.length==11){
			subStr = strNumber.substring(0,3);
			
			for(var i=0; i<oServiceKind.length; i++) {
                if(oServiceKind.options[i].value == 8){
                	ifCdmaValid = true;
                }else if(oServiceKind.options[i].value == 9){
                	ifGsmValid = true;
                }else{
                	if(ifCdmaValid && ifGsmValid)
                		break;
                }
            }
			
  		if(subStr=="130"||subStr=="131"||subStr=="132"||subStr=="156"||subStr=="155"||subStr=="186"||subStr=="145"){
				if(ifGsmValid){
					oServiceKind.value = "9";
				}else{
					oServiceKind.value = "0";
				}
				
				oServiceKind.fireEvent("onchange");
			}

		}
	}catch(e){}
};
