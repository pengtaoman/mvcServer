<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ page import="com.neusoft.tdframework.authorization.*" %>
 
<%
	String webpath=request.getContextPath();
	AuthorizeVO authVO = AuthorizeUtil.getAuthorize(request);
	String userName = authVO.getWorkNo();
	String passWord = (String)request.getSession(true).getAttribute("decodedPass");
	
	String headerUrl=webpath+"/tdframework/admin/cache/cacheHeader.jsp?username="+userName+"&password="+passWord;
	String cacheObjectUrl=webpath+"/tdframework/admin/cache/cacheObjectManage.jsp?username="+userName+"&password="+passWord;
	String cacheMuLoadUrl=webpath+"/cacheObjectManagerAction.do?method=showPerformanceIndex&username="+userName+"&password="+passWord;
%>
<html>
<head>
	<title>缓存管理</title>
	<contextPath value="<%=webpath%>"/>
	<meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>

<body bgcolor="#FFFFFF" text="#000000">
<li><a href="<%=cacheObjectUrl %>">缓存对象管理</a>
<li><a href="<%=webpath%>/cacheObjectManagerAction.do?method=forTest">测试带参数的缓存</a>
</body>
</html>