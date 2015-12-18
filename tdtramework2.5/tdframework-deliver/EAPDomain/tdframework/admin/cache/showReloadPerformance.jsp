<%@ page session="true"  contentType="text/html;charset=GBK"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<html>
<%
	String webpath = request.getContextPath();
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
<script  language=javascript> 
var eccn=new ECCN("ec");
function init(){
	//不使用预读取技术，使用传统方式提交form
	eccn.doPrep=false;
	// 不预读取“前一页”
	eccn.doPrepPrev=false;
	eccn.init();
	}
</script>
</head>
<body class="mainBody" onload="init();">

<ec:table items="optrs" var="pre" paginationLocation="false" rowsDisplayed="-1"
action="${pageContext.request.contextPath}/cacheManagerAction.do">
	<ec:row>
		<ec:column property="objKey" title="缓存对象KEY" />
		<ec:column property="recNum" title="缓存对象包含记录数" />
		<ec:column property="conSumTime" title="重载耗时(毫秒)" />
	</ec:row>
</ec:table>
<table><tr><td>总计耗时 ：<%=(String)request.getAttribute("sumConsumeTime") %> 毫秒</td></tr></table>
</body>
</html>