<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ page import="com.neusoft.tdframework.authorization.*" %>
 
<%
	String webpath=request.getContextPath();
	AuthorizeVO authVO = AuthorizeUtil.getAuthorize(request);
	String userName = authVO.getWorkNo();
	String passWord = (String)request.getSession(true).getAttribute("decodedPass");
	
	String headerUrl=webpath+"/cacheObjectManagerAction.do?method=showCacheManagerHead";
%>
<html>
<head>
	<title>缓存对象管理</title>
	<contextPath value="<%=webpath%>"/>
	<meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>
<frameset id="myFrame" rows="120,*" frameborder="NO" border="0" framespacing="0">
  <frame name="query" scrolling="NO" noresize src="<%=headerUrl%>" />
  <frame name="grid" scrolling="auto" noresize />
</frameset>
<noframes>
<body bgcolor="#FFFFFF" text="#000000">
</body>
</noframes>
</html>
