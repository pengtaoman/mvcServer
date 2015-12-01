<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ page import="com.neusoft.tdframework.authorization.*" %>
 
<%
	String webpath=request.getContextPath();
	AuthorizeVO authVO = AuthorizeUtil.getAuthorize(request);
	String userName = authVO.getWorkNo();
	String passWord = (String)request.getSession(true).getAttribute("decodedPass");
	//CRM2.0缓存机制改造 modified by pengtao BEGIN
	//String headerUrl=webpath+"/tdframework/admin/cache/cacheHeader.jsp?username="+userName+"&password="+passWord;
	String headerUrl=webpath+"/cacheObjectManagerAction.do?method=showCacheManagerHead";
	//END
%>
<html>
<head>
	<title>缓存对象管理</title>
	<meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>
<frameset id="myFrame" rows="105,*" frameborder="NO" border="0" framespacing="0">
  <frame name="query" id="query" scrolling="NO" noresize src="<%=headerUrl%>" />
  <frame name="grid" scrolling="auto" noresize />
</frameset>
<noframes>
<body bgcolor="#FFFFFF" text="#000000">
</body>
</noframes>
</html>
