<%@ page session="true"  contentType="text/html;charset=GBK"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<html>
<%
	String webpath = request.getContextPath();
    String reflashAllOver = (String)request.getAttribute("reflashAllOver");
    String totalRows = ((Integer)request.getAttribute("totalRows")).toString();
    String removeAllOver = (String)request.getAttribute("removeAllOver");
    //System.out.println("???????????  " + request.getParameter("appName")); 
    //System.out.println("???????????  " + request.getParameter("cacheObjKey"));
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
<script  language=javascript src="<%=webpath%>/tdframework/admin/cache/cacheList.js"> </script>
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
<%if (reflashAllOver != null && "1".equals(reflashAllOver)) { %>
<div class="formButtonDIV" align=center>全部刷新操作完成，共 <%=totalRows %> 个缓存标识被刷新。</div>
<% } else if (removeAllOver != null && "1".equals(removeAllOver))  { %>
<div class="formButtonDIV" align=center>全部清除操作完成，共 <%=totalRows %> 个缓存标识被清除。</div>
<% } else { %>
<ec:table items="optrs" var="pre" paginationLocation="false" rowsDisplayed="-1"
action="${pageContext.request.contextPath}/cacheObjectManagerAction.do?method=getCacheObjectSumList">
	<ec:row>
		<ec:column cell="checkbox"  headerCell="checkbox" width="15" 
			alias="chkbx_user" 	value="${pre.cacheKeys}"/>
		<ec:column property="cacheObjName" title="缓存名称" />
		<ec:column property="cacheObject" title="缓存标识" />
		<ec:column property="showDetail" title="编辑" />
		<ec:column property="cacheDescript" title="描述" />
	</ec:row>
<ec:extend>
	<button type="button" onclick="freshCatchObject()">批量删除</button>
</ec:extend>
</ec:table>
<%} %>
</body>
</html>