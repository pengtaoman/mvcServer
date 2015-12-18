<%@ page session="true"  contentType="text/html;charset=GBK"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%@ page import="com.neusoft.tdframework.admin.cache.common.CacheConst" %>
<html>
<%
	String webpath = request.getContextPath();

    String cacheKey = (String)request.getAttribute("cacheKey");
    
    String isReloadable = (String)request.getAttribute("isReloadable");
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
<script  language=javascript src="<%=webpath%>/tdframework/admin/cache/cacheListForMap.js"> </script>
<script language="javascript" src="<%=webpath%>/common/js/jquery.min.js" type="text/javascript"></script>
<script  language=javascript src="<%=webpath%>/tdframework/admin/cache/cacheCommon.js"> </script>
</head>
<body class="mainBody" onload="init();">
<table><tr><td><font color="blue">缓存KEY：<%=request.getParameter("cacheKey").split(":")[0] %> </font></td><td> <font color="blue">缓存类型：<%=request.getParameter("cacheKey").split(":")[1] %>  </font></td></tr></table>
<% if("1".equals(isReloadable))  {%>
<ec:table items="optrs" var="pre" paginationLocation="false" rowsDisplayed="-1"
action="${pageContext.request.contextPath}/cacheManagerAction.do">
	<ec:row>
		<ec:column cell="checkbox"  headerCell="checkbox" width="15" 
			alias="chkbx_map" 	value="${pre.cacheKeys}"/>
		<ec:column property="cacheObject" title="缓存Map对象的KEY" />
		<ec:column property="showDetail" title="查看详细" />
	</ec:row>
<ec:extend>
	<button type="button" onclick="freshCatchObject('<%=cacheKey%>')">刷新缓存</button>
</ec:extend>
</ec:table>
<% } else { %>
<ec:table items="optrs" var="pre" paginationLocation="false" rowsDisplayed="-1"
action="${pageContext.request.contextPath}/cacheManagerAction.do">
	<ec:row>
		<ec:column property="cacheObject" title="缓存Map对象的KEY" />
		<ec:column property="showDetail" title="查看详细" />
	</ec:row>
<ec:extend>
	<button type="button" onclick="freshCatchObjectMap('<%=cacheKey+CacheConst.CACHE_KEY_TYPE_SEP+"MAP"%>')">刷新缓存</button>
</ec:extend>
</ec:table>
<% }%>
</body>
</html>