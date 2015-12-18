<%@page import="com.neusoft.tdframework.admin.cache.common.CacheConst"%>
<%@ page session="true"  contentType="text/html;charset=GBK"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<html>
<%
	String webpath = request.getContextPath();
String userName=request.getParameter("username");
String password=request.getParameter("password");
String appName = request.getParameter("appName");
String cacheKey = request.getParameter("cacheKey");
%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
<title>Catch Manage</title>
<contextPath value="<%=webpath%>"/>
<!-- 禁止 windows 主题风格ss -->
<meta http-equiv="MSThemeCompatible" content="no" />
<!-- 禁止缓存 headers -->
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="-1" />
<meta http-equiv="Cache-Control" content="no-cache" />
<link href="<%=webpath%>/common/css/td_style_ec.css" rel=stylesheet>

<script  language=javascript src="<%=webpath%>/unieap/js/Globals.js"> </script>
<script  language=javascript src="<%=webpath%>/unieap/js/Common.js"> </script>
<script  language=javascript src="<%=webpath%>/common/js/prototypeajax.js"> </script>
<script  language=javascript src="<%=webpath%>/common/js/eccn.js"> </script>
<script  language=javascript src="<%=webpath%>/tdframework/admin/cache/cacheObjectList.js"> </script>
<script language="javascript" src="<%=webpath%>/common/js/jquery.min.js" type="text/javascript"></script>
<script  language=javascript src="<%=webpath%>/tdframework/admin/cache/cacheCommon.js"> </script>

<script  language=javascript> 

function removeCachedObj(cacheKey) {
	
	var queryWindow = parent.document.getElementById("query").contentWindow;
	var appName = queryWindow.getAppName();
	var queryKey = queryWindow.getQueryKey();
	var urlstr = "/"+appName+"/cacheObjectManagerAction.do?method=removeCachedObject&appName="+appName+"&cacheObjKey="+cacheKey+"&removeAll=0&queryKey="+queryKey;
    //alert(urlstr);
	document.forms[0].action = urlstr;	    	
	document.forms[0].submit();
}
</script>
</head>
<body class="mainBody" onload="init();">
<input type="hidden" id="showstatus" style="display:none;">
<table><tr><td><font color="blue">缓存KEY前缀：<%=request.getParameter("cacheAd")%> </font></td><td> </td></tr></table>
<ec:table items="optrs" var="pre" rowsDisplayed="10"
action="${pageContext.request.contextPath}/cacheObjectManagerAction.do?method=getCacheObjectList">
	<ec:row>
		<ec:column cell="checkbox" headerCell="checkbox" width="15" 
			alias="chkbx_user" 	value="${pre.key}:${pre.type}"/>
		<ec:column property="key" title="缓存对象KEY" />
		<ec:column property="beanClass" title="缓存加载BeanID" />
		<ec:column property="methodName" title="缓存加载方法名" />
		<ec:column property="args" title="缓存加载参数" />
		<ec:column property="type" title="缓存类型" />
		<ec:column property="description" title="缓存加载说明" />
		<ec:column property="editor" title="编辑" />
	</ec:row>
<ec:extend>
    <table><tr><td>
	<button type="button" onclick="validCachedObjectAll(0)">批量删除</button>
	</tr></tr></table>
</ec:extend>
</ec:table>
<% 
/*<!--<ec:column property="get" title="读取次数" />
<ec:column property="hit" title="命中次数" />
<ec:column property="set" title="设置次数" />
<ec:column property="stime" title="加载时间" />
<ec:column property="activetime" title="存活时长" />
<ec:column property="valid" title="状态" />
<ec:column property="server" title="服务器" />-->
*/
%>

</body>
</html>