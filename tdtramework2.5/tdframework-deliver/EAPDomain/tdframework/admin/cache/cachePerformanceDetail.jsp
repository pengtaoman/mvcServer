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
<!-- ��ֹ windows ������ss -->
<meta http-equiv="MSThemeCompatible" content="no" />
<!-- ��ֹ���� headers -->
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="-1" />
<meta http-equiv="Cache-Control" content="no-cache" />
<link href="<%=webpath%>/common/css/td_style_ec.css" rel=stylesheet>

<script  language=javascript src="<%=webpath%>/unieap/js/Globals.js"> </script>
<script  language=javascript src="<%=webpath%>/unieap/js/Common.js"> </script>
<script  language=javascript src="<%=webpath%>/common/js/prototypeajax.js"> </script>
<script  language=javascript src="<%=webpath%>/common/js/eccn.js"> </script>
<script  language=javascript src="<%=webpath%>/tdframework/admin/cache/cachePerformanceDetail.js"> </script>
<script language="javascript" src="<%=webpath%>/common/js/jquery.min.js" type="text/javascript"></script>
<script  language=javascript src="<%=webpath%>/tdframework/admin/cache/cacheCommon.js"> </script>
</head>
<body class="mainBody" onload="init();">
<%// out.println("#########" + sa.get(0).getClass().getMethod("getTableName").invoke(sa.get(0),null));%>
<div><table><tr><td>������ <%=((Integer)request.getAttribute("totalRows")).toString()%> ����</td>
<td>��ʹ�� <%=((Long)request.getAttribute("allSpendTime")).toString()%> ����</td></tr></table></div>
<ec:table items="optrs" var="pre" paginationLocation="false" rowsDisplayed="-1"
action="${pageContext.request.contextPath}/cacheObjectManagerAction.do?method=showCachePerformance">
	<ec:row>
		<ec:column property="tableName" title="������" />
		<ec:column property="tableRecNum" title="��¼����" />
		<ec:column property="tableSpeTime" title="��������ʱ��" />
	</ec:row>
</ec:table>

</body>
</html>