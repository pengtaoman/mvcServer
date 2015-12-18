<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>欢迎登录 中国电信 BSS系统</title>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<contextPath value="<%=path%>"/>

<script type="text/javascript">

var APP_PATH = document.getElementsByTagName("contextPath")[0].value;

var MenuBar=new function(){
	var Me=this;
	
	Me.activeTopMenuById=function(id1,id2,id3,para){
        
        var menuInfo = getMenuInfo(id2, id3);
        mData = menuInfo;
        if (menuInfo != null) {
        	 var pageLink = menuInfo["pageLink"];
        	 if (pageLink.indexOf("?") != -1) {
        		 menuInfo["pageLink"] = pageLink + "&" + para;
        	 } else {
        		 menuInfo["pageLink"] = pageLink + "?" + para;
        	 }
        	 
        	 var dummyNode=new Object();
        	 dummyNode.getLabel = function() {
        	     return menuInfo["menuName"];
        	 }
        	 dummyNode.getData = function() {
        			return mData;
        	 }
        	 
        	 var tabFrame = parent.frames("subframe");
        	 
        	 // true is reflesh tab flag
        	 tabFrame.menuClick(dummyNode, true);
        }
	}
}

function getMenuInfo(sysId, menuId) {
	
	
	var newRowSet;
	
    dojo.rawXhrPost({
		url : APP_PATH + "/menuNavigation.do?method=getMenuNavigation&systemId=" + sysId,
		sync : true,
		load : function(text, args) {
			try {
				//alert(text);
				newRowSet = eval("(" + text + ")");

			} catch (e) {
				alert("查找系统菜单失败。");
			}
		}
	});

    for (var i = 0; i < newRowSet.length; i++) {
    	if (newRowSet[i]["menuId"] == menuId) {
    		return newRowSet[i];
    	}
    }
    return null;
}


</script>
</head>
<body class="unieap">
</body>
</html>