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
<table><tr><td><font color="blue">����KEYǰ׺��<%=request.getParameter("cacheAd")%> </font></td><td> </td></tr></table>
<ec:table items="optrs" var="pre" rowsDisplayed="10"
action="${pageContext.request.contextPath}/cacheObjectManagerAction.do?method=getCacheObjectList">
	<ec:row>
		<ec:column cell="checkbox" headerCell="checkbox" width="15" 
			alias="chkbx_user" 	value="${pre.key}:${pre.type}"/>
		<ec:column property="key" title="�������KEY" />
		<ec:column property="beanClass" title="�������BeanID" />
		<ec:column property="methodName" title="������ط�����" />
		<ec:column property="args" title="������ز���" />
		<ec:column property="type" title="��������" />
		<ec:column property="description" title="�������˵��" />
		<ec:column property="editor" title="�༭" />
	</ec:row>
<ec:extend>
    <table><tr><td>
	<button type="button" onclick="validCachedObjectAll(0)">����ɾ��</button>
	</tr></tr></table>
</ec:extend>
</ec:table>
<% 
/*<!--<ec:column property="get" title="��ȡ����" />
<ec:column property="hit" title="���д���" />
<ec:column property="set" title="���ô���" />
<ec:column property="stime" title="����ʱ��" />
<ec:column property="activetime" title="���ʱ��" />
<ec:column property="valid" title="״̬" />
<ec:column property="server" title="������" />-->
*/
%>

</body>
</html>