<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%
  String webpath = request.getContextPath();
  String roleId = request.getParameter("roleId");
  String roleTreeTab = webpath+"/views/om/organ/funcrole/RoleTreeTab.jsp?operType=viewRole&roleId="+roleId;
  String childTreeTab = webpath+"/views/om/organ/funcrole/RoleTreeTab.jsp?operType=openChildPage";
%>
<html>
	<head>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<title>功能角色权限信息</title>
		<meta http-equiv="Content-Type" content="text/html; charset=gbk">
	</head>
	<FRAMESET  frameborder="NO" border="0" framespacing="0">
		<frame name="RoleManage" src="<%=roleTreeTab%>" scrolling="no" noresize/>
	</FRAMESET>
	<noframes>
		<body>
			<p>
				此网页使用了框架，但您的浏览器不支持框架。
			</p>
		</body>
	</noframes>
</html>	