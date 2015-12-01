var eccn=new ECCN("ec");

function init(){
//不使用预读取技术，使用传统方式提交form
eccn.doPrep=false;
// 不预读取“前一页”
eccn.doPrepPrev=false;
eccn.init();
}

function showTable(obj){
   if(document.all("helloworld").style.display=="none"){
       document.all("helloworld").style.display = "";
       obj.innerHTML = "hide"
   }
   else{
       document.all("helloworld").style.display = "none";
       obj.innerHTML = "show";
   }
}

function checkValues(){
    var ifHaveChoose = false;
	var allElements = document.body.getElementsByTagName("INPUT");
	for (var i = 0; i < allElements.length; i++) {
		var e = allElements[i];
		if (e.type == 'checkbox') {
			if (e.checked == true) {
			    i = allElements.length;
				ifHaveChoose = true;
			} 
		}
	}
	if (ifHaveChoose == false){
		alert("请选择你要刷新的缓存对象！");
	}
	return ifHaveChoose;
}

/**
 *
 */
function freshCatchObject(cacheKey){
	if(checkValues()){
	    //alert("catchManager()");
	    document.forms[0].action = "cacheObjectManagerAction.do?method=invalidateMapKey&cacheKey="+cacheKey;	    	
		document.forms[0].submit();
	}
}

function freshCatchObjectMap(cacheKey){
	//if(checkValues()){
	    //alert("catchManager()");
	    document.forms[0].action = "cacheObjectManagerAction.do?method=invalidateMapKey&cacheKey="+cacheKey;	    	
		document.forms[0].submit();
	//}
}

function showCacheDetail(cacheAd){
	
	
}

function diffCacheObjectToDB(cacheKey, mapKey) {
    document.forms[0].action = "cacheObjectManagerAction.do?method=diffCacheObjectToDB&cacheKey="+cacheKey + "&mapKey=" + mapKey;	    	
	document.forms[0].submit();
}
