// weizj 2006-02-14

//取得指定对象(对参数进行复杂匹配 优先当作对象Id)
var $ = function() {
	var elements = new Array();
	for (var i = 0; i < arguments.length; i++) {
		var element = arguments[i];
		if (typeof element == 'string') {
			element = document.getElementById(element);
			if (element==null) {
				element = document.getElementsByName(element);
			}
		}
		if (arguments.length == 1) {
			return element;
		}
		elements=elements.concat(element);
	}
	return elements;
};

//通过id取得对象
var $byId=function(id){
	return document.getElementById(id);
};

//通过name取得对象数组
var $byName=function(name){
	return document.getElementsByName(name);
};

//动态导入js脚本方法
var $import=function(jsSrc){
			try {
				document.writeln('<script src="', jsSrc, '" type="text/JavaScript"><'+'/script>');
			} catch (e) {
				var script = document.createElement("script");
				script.src = jsSrc;
				document.getElementsByTagName("head")[0].appendChild(script);
			}
}

//使程序暂停运行若干时间
var $pause=function(numberMillis) {
    var dialogScript = 
           'window.setTimeout(' +
           ' function () { window.close(); }, ' + numberMillis + ');';
	var result = 
         window.showModalDialog(
           'javascript:document.writeln(' +
            '"<script>' + dialogScript + '<' + '/script>")'); 
}

 
//对象是否为空
var isNull=function(data){
	return (data == null || typeof data == "undefined")? true : false;
}

//对象是否为数组
var isArray = function(data) {
  return (data && data.join) ? true : false;
};

//对象是否为集合
var isCollection = function(data) {
  return (!(isArray) && data.length) ? true : false;
};



/////////////////////////////////////////////////////////////////////////////////////////////////




//设置指定iframe大小
var resizeIframe=function(iframeObj,dheight) {
		try {
			iframeObj.style.height=dheight;
		} catch (e) {
		}
}

var resizeIframe2=function(iframeObj,dheight,dwidth) {
		try {
			iframeObj.style.height=dheight;
			iframeObj.style.width=dwidth;
		} catch (e) {
		}
}


//自动设置指定iframe大小(自适应)
var autoResizeIframe=function(iframeObj) {
		resizeIframe(iframeObj,iframeObj.contentWindow.document.body.scrollHeight+25);
}

var autoResizeIframe2=function(iframeObj) {
		resizeIframe2(iframeObj,iframeObj.contentWindow.document.body.scrollHeight+40,iframeObj.contentWindow.document.body.scrollWidth+20);
}

var autoResizeIframeById=function(iframeId) {
		var iframeObj=$byId(iframeId);
		if (isNull(iframeId)) return;
		resizeIframe(iframeObj,iframeObj.contentWindow.document.body.scrollHeight+25);
}


//自动设置对象高度为页面可视区域(clientHeight clientWidth)大小
var autoResizeToBody=function(obj){
	try {
		obj.style.height=document.body.clientHeight;
		obj.style.width=document.body.clientWidth;
	} catch (e) {
	}
}

//将json的map转换成 key=value&key=value&... 形式
//注意 key 和 value 中不能含有 & = 等，如果有 请提前进行URL编码
var mapToParameter=function(mapObj){
	var res="";
	for (var key in mapObj ){
		var value=mapObj[key];
		if (isNull(value)){
			value="";
		}
		res+=key+'='+value+'&';
	}
	return res;
}

//map 给map 赋值
var setMapToMap=function(mapObj1,mapObj2){
	for (var key in mapObj1){
		mapObj2[key]=mapObj1[key];
	}
}

//map 从map2取值 赋给map1
var getMapFromMap=function(mapObj1,mapObj2){
	for (var key in mapObj1){
		mapObj1[key]=mapObj2[key];
	}
}

//全中当前行的第一个单元格内的radio
var checkTrRadio=function(trObj){
	if(trObj.firstChild.firstChild.checked)
		trObj.firstChild.firstChild.checked=false;
	else
		trObj.firstChild.firstChild.checked=true;
}

//显示div的工具方法(该方法显示指定div同时可以隐藏/不隐藏 divMap中的其他div)
var showDivUtil=function(divId,divMap,hideOther){
	if (!isNull(hideOther) &&  hideOther==false || isNull(divMap) ){
			var divObj=$byId(divId);
			if(divObj)	divObj.style.display="block";
			return;
	}
	for (var dId in divMap){
		if (dId==divId){
			var divObj=divMap[dId];
			if(divObj)	{
				divObj.style.display="block";
			}
		}else{
			var divObj=divMap[dId];
			if(divObj)	divObj.style.display="none";
		}
	}
}

//将id= frameId 的iframe所包含网页指向newurl
var modChangeFrame=function(frameId,newUrl){
	var frameObj=$byId(frameId);
	if(frameObj) {
		frameObj.contentWindow.location=newUrl;
	}
} 

//是否是空的frame
var isBlankFrame=function(frameId){
	var frameObj=$byId(frameId);
	if(frameObj && ( frameObj.contentWindow==null || frameObj.contentWindow.location==null || typeof frameObj.contentWindow.location.href == "undefined"
		|| frameObj.contentWindow.location.href=='null' || frameObj.contentWindow.location.href=='about:blank' || frameObj.contentWindow.location.href.length<2) ) {
		return true;
	}
	return false;
} 

var isNewFrame=function(frameId){
	var frameObj=$byId(frameId);
	if(frameObj &&  frameObj.contentWindow!=null && frameObj.contentWindow.location!=null && typeof frameObj.contentWindow.location != "undefined" ){
		var sid=getParameterValue(frameObj.contentWindow.location.href,"serviceId")
		if (sid==getGlobeMapValue("serviceId"))	{
			return false;
		}
	}
	return true;

} 




//表单定向提交
var submitForm=function(formObj,ifObjName){
	if (isNull(ifObjName) || ifObjName=="")
		ifObjName="_self";
	formObj.target=ifObjName;
	formObj.submit();
}


//Tab页面树结构类
var TabTree=function(tName,tDivId){
	var Me=this;
	Me.Name=tName
	Me.DivId=tDivId;
	Me.childList={};
	Me.addChild=function(cObj){
		Me.childList[cObj.Name]=cObj;
	}
	
	Me.createChild=function(cName,cDivId){
		Me.childList[cObj.Name]=new TabTree(cName,cDivId);
	}
	
	Me.getChildByName=function(cName){
		return Me.childList[cName];
	}
	Me.showMe=function(){
		var coreDiv=$byId(Me.DivId);
		if (isNull(coreDiv)) return;
		coreDiv.style.display="show";
	}
	Me.hideMe=function(){
		var coreDiv=$byId(Me.DivId);
		if (isNull(coreDiv)) return;
		coreDiv.style.display="none";
	}
	
	Me.showChild=function(cName){
		var cc=Me.getChildByName(cName);
		if (isNull(cc)) return;
		cc.showMe();
	}
	Me.hideChild=function(cName){
		var cc=Me.getChildByName(cName);
		if (isNull(cc)) return;
		cc.hideMe();
	}

}

//导航信息相关类

var GlobeNav=function(){
	var Me=this;
	
	Me.CurrentNav=0;
	Me.NavArr=[];
	
	Me.trimNavArr=function(){
		var temp=[];
		for (var i=0;i<Me.NavArr.length;i++){
			if(!isNull(Me.NavArr[i])){
				temp.push(Me.NavArr[i]);
			}
		}
		Me.NavArr=temp;
	}

	Me.addNav=function(navObjT){
		var navObj=new Navigation(navObjT.Name,navObjT.Method,navObjT.Level);
		var lvl=navObj.Level;
		
		if (isNull(lvl) || lvl<0 || Me.NavArr.length<=lvl ){
			Me.NavArr.push(navObj);
			Me.CurrentNav=Me.NavArr.length-1;
			navObj.Level=Me.CurrentNav;
			lvl=Me.CurrentNav;
			return;
		}
		Me.NavArr[lvl]=navObj;
		Me.CurrentNav=lvl;
		for (var i=lvl+1;i<Me.NavArr.length;i++){
			Me.NavArr[i]=null;
		}

	}

	Me.createNav=function(nameT,methodT,levelT){
		var navObj=new Navigation(nameT,methodT,levelT);
		var lvl=navObj.Level;
		
		if (isNull(lvl) || lvl<0 || Me.NavArr.length<=lvl ){
			Me.NavArr.push(navObj);
			Me.CurrentNav=Me.NavArr.length-1;
			navObj.Level=Me.CurrentNav;
			lvl=Me.CurrentNav;
			return;
		}
		Me.NavArr[lvl]=navObj;
		Me.CurrentNav=lvl;
		for (var i=lvl+1;i<Me.NavArr.length;i++){
			Me.NavArr[i]=null;
		}

	}

	Me.toHTML=function(winObj){
		//Me.trimNavArr();
		var res=""
		for (var i=0;i<Me.NavArr.length;i++){
			if (Me.NavArr[i]==null){
				continue;
			}
			if (Me.CurrentNav==Me.NavArr[i].Level){
				res+=Me.NavArr[i].toCHTML();
			}else{
				res+=Me.NavArr[i].toHTML(winObj)+" &gt; ";
			}
		}
		return res;
	
	}

}

var Navigation=function(nameT,methodT,levelT){
	var Me=this;
	Me.Name=nameT;
	Me.Method=methodT;
	Me.Level=levelT;
	
	Me.parentH="";

	Me.StyleClass="";
	Me.toHTML=function(winObj){
		if(!isNull(winObj.parent.GlobeMap)){
			Me.parentH="parent.";
		}
		var res="<a href=\"#\" onclick=\""+Me.parentH+Me.Method+";return false;\" >"+Me.Name+"</a>";
		return res;
	}

	Me.toCHTML=function(){
		var res=Me.Name;
		return res;
	}

};

// PageNav
var updateNav=function(divId,lvl){
	if(!isNull(lvl) && lvl>=0 ) PageNav.Level=lvl;
	if (isNull(top.$GlobeNav) || isNull(top.$GlobeNav.addNav) )
		top.$GlobeNav=new GlobeNav();
	top.$GlobeNav.createNav(PageNav.Name,PageNav.Method,PageNav.Level);
	//alert(top.$GlobeNav.toHTML());
	$byId(divId).innerHTML=top.$GlobeNav.toHTML(window);
}





//取得全局（整个客户360度视图模块）变量集合
var getGlobeMap=function(){
	if (!isNull(window.GlobeMap)){
		return window.GlobeMap;
	}
	if (!isNull(parent.GlobeMap)){
		return parent.GlobeMap;
	}
	if (!isNull(parent.parent.GlobeMap)){
		return parent.parent.GlobeMap;
	}
	if (!isNull(parent.parent.parent.GlobeMap)){
		return parent.parent.parent.GlobeMap;
	}
	if (!isNull(parent.parent.parent.parent.GlobeMap)){
		return parent.parent.parent.parent.GlobeMap;
	}
	return null;
}

var getGlobeMapValue=function(key){
	var map=getGlobeMap();
	if(!isNull(map)){
		return map[key];
	}
}

var setGlobeMapValue=function(key,value){
	var map=getGlobeMap();
	if(!isNull(map)){
		map[key]=value;
	}
}

var setGlobeMap=function(mapObj){
	setMapToMap(mapObj,getGlobeMap());
}

function getURLParameterMap(){
	return parameterToMap(getParameterStr());
}

function getParameterValue(url,key){
	var idx=url.indexOf("?");
	if (idx<0){
		url="";
	}else {
		url=url.substr(idx+1);
	}
	var tmap=parameterToMap(url);
	return tmap[key];

}

function getParameterStr(){
	var url=window.location.href;
	var idx=url.indexOf("?");
	if (idx<0){
		url="";
	}else {
		url=url.substr(idx+1);
	}
	return url;
}



function parameterToMap(str){
	var rsMap={};
	if (str.length<1){
		return rsMap;
	}
	if (str.indexOf("&")==0){
		str=str.substr(1);
	}
	
	if (str.indexOf("&")==str.length-1){
		str=str.substring(0,str.length-1);
	}

	var strA=str.split("&");

	for (var i=0;i<strA.length ;i++ ){
		var stri=strA[i].split("=");
		if (stri.length>1){
			rsMap[stri[0]]=stri[1]+"";
		}
	}
	return rsMap;

}



