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
<script  language=javascript> 
var eccn=new ECCN("ec");
function init(){
	//��ʹ��Ԥ��ȡ������ʹ�ô�ͳ��ʽ�ύform
	eccn.doPrep=false;
	// ��Ԥ��ȡ��ǰһҳ��
	eccn.doPrepPrev=false;
	eccn.init();
	}
</script>
</head>
<body class="mainBody" onload="init();">

<ec:table items="optrs" var="pre" paginationLocation="false" rowsDisplayed="-1"
action="${pageContext.request.contextPath}/cacheManagerAction.do">
	<ec:row>
		<ec:column property="objKey" title="�������KEY" />
		<ec:column property="recNum" title="������������¼��" />
		<ec:column property="conSumTime" title="���غ�ʱ(����)" />
	</ec:row>
</ec:table>
<table><tr><td>�ܼƺ�ʱ ��<%=(String)request.getAttribute("sumConsumeTime") %> ����</td></tr></table>
</body>
</html>