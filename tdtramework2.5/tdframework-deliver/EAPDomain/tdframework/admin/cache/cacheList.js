var eccn=new ECCN("ec");

function init(){
	//��ʹ��Ԥ��ȡ������ʹ�ô�ͳ��ʽ�ύform
	eccn.doPrep=false;
	// ��Ԥ��ȡ��ǰһҳ��
	eccn.doPrepPrev=false;
	eccn.init();
	//var queryWindow = parent.document.getElementById("query").contentWindow;
	//alert(queryWindow);
	//alert(queryWindow.getAppName());
	}

function showTable(obj){
   if(document.all("helloworld").style.display=="none"){
       document.all("helloworld").style.display = "";
       obj.innerHTML = "hide";
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
		alert("��ѡ����Ҫˢ�µĻ������");
	}
	return ifHaveChoose;
}

/**
 *
 */
function freshCatchObject(){
	//if(checkValues()){
	    //alert("catchManager()");
	//    document.forms[0].action = "cacheObjectManagerAction.do?method=getCacheObjectSumList";	    	
	//	document.forms[0].submit();
	//}
	if(checkValues()){
		var queryWindow = parent.document.getElementById("query").contentWindow;
		var appName = queryWindow.getAppName();
		var queryKey = queryWindow.getQueryKey();
	    //alert("catchManager()" + document.getElementById("chkbx_user").SelectedItem.length);
		var urlstr = "/"+appName+"/cacheObjectManagerAction.do?method=removeCachedObject&appName="+appName+"&removeAll=0&queryKey="+queryKey;
	    document.forms[0].action = urlstr;   	
		document.forms[0].submit();
		document.forms[0].action = "cacheObjectManagerAction.do?method=getCacheObjectList";
		
	}
}

function showCacheDetail(cacheAd){
	
	
}


function diffCacheObjectToDB(cacheKey) {
    document.forms[0].action = "cacheObjectManagerAction.do?method=diffCacheObjectToDB&cacheKey="+cacheKey;	    	
	document.forms[0].submit();
}

