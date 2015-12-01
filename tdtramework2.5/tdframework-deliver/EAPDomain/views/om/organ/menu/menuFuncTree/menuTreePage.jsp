<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%
  String webpath = request.getContextPath();
  String needCheckBox = (String)request.getAttribute("needCheckBox");
  String employeeId = (String) request.getAttribute("employeeId");
  String operType = (String)request.getAttribute("operType");
  String roleId = (String) request.getAttribute("roleId");
  String condType = "roleId";
  if(employeeId!=null && roleId==null){
  	  condType = "employeeId";
  }
  //String showParamPower = "/om/dataRoleManage.do?oprType=showEmpPower&employeeId="+employeeId;
  //String message = (String)request.getAttribute("message");
  String title = (String)request.getAttribute("title");
  //String employeeId   = request.getParameter("employeeId");
  //String needCheckBox = request.getParameter("needCheckBox");
  String roleTreeTab  = webpath+"/views/om/organ/menu/menuFuncTree/menuTreeTab.jsp?operType="+operType+"&employeeId="+employeeId+"&ifUseBox="+needCheckBox+"&title="+title;
  String childTreeTab = webpath+"/views/om/organ/menu/menuFuncTree/menuTreeTab.jsp?operType=openChildPage"+"&employeeId="+employeeId;
  String roleMenuPage = "";
  if(needCheckBox.equals("false")){
  	  roleMenuPage = webpath+"/views/om/organ/funcrole/ExportRoleButton.jsp?condType=employeeId&employeeId="+employeeId;
  }else if(needCheckBox.equals("true")){
  	  roleMenuPage = webpath+"/views/om/organ/funcrole/RoleButton.jsp?condType=employeeId";
  }
  String blank = webpath+"/views/om/blank.html";
%>
<html>

	<head>
		<title>权限信息</title>
		<meta http-equiv="Content-Type" content="text/html; charset=gbk">
	</head>
	<FRAMESET rows="*,0,0" frameborder="NO" border="0" framespacing="0">
			<FRAMESET cols="35%,65%" frameborder="NO" border="0" framespacing="0">
				<frame name="RoleManage" src="<%=roleTreeTab%>" scrolling="no" noresize/>
				<frame name="ChildMenuTree" src="<%=childTreeTab%>" scrolling="no" noresize/>
			</FRAMESET>
			<frame name="RoleButton" src="<%=roleMenuPage%>" scrolling="no" noresize/>
			<frame name="hidden" src="<%=blank%>" />
		</FRAMESET>
	<noframes>
		<body>
			<p>
				此网页使用了框架，但您的浏览器不支持框架。
			</p>
		</body>
	</noframes>
</html>	