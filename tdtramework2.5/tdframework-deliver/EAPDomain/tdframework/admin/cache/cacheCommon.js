var APP_PATH = document.getElementsByTagName("contextPath")[0].value;
function dealReload(key) {
	
	jQuery.ajax({
		type : "GET",
		url : APP_PATH + "/cacheObjectManagerAction.do?method=reloadCacheObject&cacheKey="+key,
		async : false,
		success : function(msg) {
			 if (msg != null && msg.indexOf("SUCCESS")!=-1) {
				 alert("重新加载成功！");
				 if(document.getElementById("div"+key)) {
				 	document.getElementById("div"+key).innerHTML = "<div id='div"+key+"'><a href=\"javascript:dealValid ('0','"+key+"');\">无效</a></div>";
				 }
			 } else {
				 alert("重新加载失败，请联系系统管理人员或开发人员。");
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
//	        document.getElementById("div"+key).innerHTML = "<div id='div"+key+"'><a href=\"javascript:dealValid ('0','"+key+"');\">无效</a></div>";
//
//	    alert("重新加载成功！");
//
//	}
//}