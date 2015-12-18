<%@ page session="true"  contentType="text/html;charset=GBK"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%@ page import="java.util.ArrayList" %>
<html>
<%
	String webpath = request.getContextPath();
String userName=request.getParameter("username");
String password=request.getParameter("password");

//ArrayList sa = (ArrayList)request.getAttribute("optrs");

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
<script  language=javascript src="<%=webpath%>/tdframework/admin/cache/cachePerformance.js"> </script>
<script language="javascript" src="<%=webpath%>/common/js/jquery.min.js" type="text/javascript"></script>
<script  language=javascript src="<%=webpath%>/tdframework/admin/cache/cacheCommon.js"> </script>
</head>
<body class="mainBody" onload="init();">
<%// out.println("#########" + sa.get(0).getClass().getMethod("getTableName").invoke(sa.get(0),null));%>
<ec:table items="optrs" var="pre" paginationLocation="false" rowsDisplayed="-1"
action="${pageContext.request.contextPath}/cacheObjectManagerAction.do?method=showCachePerformance">
	<ec:row>
		<ec:column cell="checkbox"  headerCell="checkbox" width="15" 
			alias="chkbx_tableName" 	value="${pre.tableName}"/>
		<ec:column property="tableName" title="表名称" />
	</ec:row>
<ec:extend>
    <table><tr><td>
	<button type="button" onclick="validCachedObjectAll(1)">载入缓存</button>
	</tr></tr></table>
</ec:extend>
</ec:table>

</body>
</html>