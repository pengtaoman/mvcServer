var APP_PATH = document.getElementsByTagName("contextPath")[0].value;
function dealReload(key) {
	
	jQuery.ajax({
		type : "GET",
		url : APP_PATH + "/cacheObjectManagerAction.do?method=reloadCacheObject&cacheKey="+key,
		async : false,
		success : function(msg) {
			 if (msg != null && msg.indexOf("SUCCESS")!=-1) {
				 alert("���¼��سɹ���");
				 if(document.getElementById("div"+key)) {
				 	document.getElementById("div"+key).innerHTML = "<div id='div"+key+"'><a href=\"javascript:dealValid ('0','"+key+"');\">��Ч</a></div>";
				 }
			 } else {
				 alert("���¼���ʧ�ܣ�����ϵϵͳ������Ա�򿪷���Ա��");
				 isDBOperSuccess = false;
			 }
		}
	});	
}

function dealValid (valid, key) {

		var queryurl = "cacheObjectManagerAction.do?method=validCacheObject&valid="+valid+"&cacheKey="+key;
		document.forms[0].action = queryurl;
		document.forms[0].submit();
		document.forms[0].action = "cacheObjectManagerAction.do?method=getCacheObjectList";
}


//function dealReload(key) {
//	//alert(111);
//	if (xmlhttp)
//	{
//	    
//		var queryurl = "cacheObjectManagerAction.do?method=reloadCacheObject&nav="+(Math.random()*100000)+"&cacheKey="+key;
//		//alert(queryurl);
//		xmlhttp.open("GET", queryurl, true);
//	    xmlhttp.onreadystatechange = OnReadyStateChng;
//
//	    xmlhttp.send(null);
//
//	        document.getElementById("div"+key).innerHTML = "<div id='div"+key+"'><a href=\"javascript:dealValid ('0','"+key+"');\">��Ч</a></div>";
//
//	    alert("���¼��سɹ���");
//
//	}
//}