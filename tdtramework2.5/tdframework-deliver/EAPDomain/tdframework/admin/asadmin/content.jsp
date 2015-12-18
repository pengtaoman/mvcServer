<%@ page session="true"  contentType="text/html;charset=GBK"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<html>
<%
	String webpath = request.getContextPath();
%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
<title>服务器管理</title>
<!-- 禁止 windows 主题风格ss -->
<meta http-equiv="MSThemeCompatible" content="no" />
<!-- 禁止缓存 headers -->
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="-1" />
<meta http-equiv="Cache-Control" content="no-cache" />
<link href="<%=webpath%>/common/css/td_style_ec.css" rel=stylesheet>

<script  language=javascript src="<%=webpath%>/common/js/prototypeajax.js"> </script>
<script  language=javascript src="<%=webpath%>/common/js/eccn.js"> </script>
<script  language=javascript src="<%=webpath%>/tdframework/admin/asadmin/content.js"> </script>

</head>
<body class="mainBody" onload="init();">

<ec:table items="records" width="300px" var="pre" paginationLocation="false" rowsDisplayed="-1"
action="${pageContext.request.contextPath}/serverControlAction.do">
	<ec:row>
		<ec:column cell="checkbox"  headerCell="checkbox" width="15" 
			alias="chkbx_user" 	value="${pre.item}"/>
		<ec:column property="item" title="对象" />
	</ec:row>
<ec:extend>
	<button type="button" onclick="freshCatchObject()">刷新</button>
</ec:extend>
</ec:table>

</body>
</html>