var eccn=new ECCN("ec");

function init(){
//��ʹ��Ԥ��ȡ������ʹ�ô�ͳ��ʽ�ύform
eccn.doPrep=false;
// ��Ԥ��ȡ��ǰһҳ��
eccn.doPrepPrev=false;
eccn.init();
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
		alert("��ѡ����Ҫ��������Ļ������");
	}
	return ifHaveChoose;
}

/**
 *
 */
function freshCatchObject(allReload){
	if(checkValues()){
	    //alert("catchManager()");
		var queryWindow = parent.document.getElementById("query").contentWindow;
		var appName = queryWindow.getAppName();
		var queryKey = queryWindow.getQueryKey();
	    document.forms[0].action = "cacheObjectManagerAction.do?method=showReloadPerformance&appName="+appName;	    	
		document.forms[0].submit();
	}
}

function showCacheDetail(cacheAd){
	
	
}

