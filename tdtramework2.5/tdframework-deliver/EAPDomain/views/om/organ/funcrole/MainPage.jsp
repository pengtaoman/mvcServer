<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%
  String webpath = request.getContextPath();
  String roleButtons = webpath+"/views/om/organ/funcrole/RoleManageButton.jsp";
  String roleListURL = webpath+"/om/roleManage.do?method=getInitInfo";
  String roleTreeTab = webpath+"/views/om/organ/funcrole/RoleTreeTab.jsp";
  String childTreeTab = webpath+"/views/om/organ/funcrole/RoleTreeTab.jsp?operType=openChildPage";
  String blank = webpath+"/views/om/blank.html";
  //String menuTree = webpath+"/om/menutree.do";
%>
<html>

	<head>
		<title></title>
		<meta http-equiv="Content-Type" content="text/html; charset=gbk">
	</head>
	<FRAMESET cols="400,8,*" border="0" framespacing="0" id="mainFrame">
		<frameset rows="170,*" framespacing="0" border="0">
			<frame src="<%=roleButtons%>" name="RoleListButton" scrolling="no" noresize="noresize" frameborder="no"  />
			<frame src="<%=roleListURL%>" name="RoleList"   scrolling="auto" noresize="noresize" frameborder="no"
			style="border-top-width:1;border-left-width:1;border-right-width:1;border-bottom-width:1;border-style:solid;border-color:gray"/>
		</frameset>
		<frame src="to_left.jsp" name="left-rightborder" id="toLeft" scrolling="NO" frameborder="no">
		<FRAMESET rows="*,0,0" frameborder="no" border="0" framespacing="0"  >
			<frame name="RoleManage" src="<%=roleTreeTab%>" scrolling="no" noresize/>			
			<frame name="RoleButton" src="" scrolling="no" noresize/>
			<frame name="hidden" src="<%=blank%>" />
		</FRAMESET>
	</FRAMESET> 
	<noframes>
		<body>
			<p>
				此网页使用了框架，但您的浏览器不支持框架。
			</p>
		</body>
	</noframes>
</html>	