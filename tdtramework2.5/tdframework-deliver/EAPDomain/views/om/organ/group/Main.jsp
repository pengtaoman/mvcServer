<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%
  String webpath = request.getContextPath();
  String queryButtons = webpath+"/views/om/organ/group/QueryButton.jsp";
  String groupListURL = webpath+"/om/groupAction.do?method=getGroup";
  String blank = webpath+"/views/om/blank.html";
%>
<html>

	<head>
		<title></title>
		<meta http-equiv="Content-Type" content="text/html; charset=gbk">
	</head>
	<FRAMESET cols="35%,8,*" border="0" framespacing="0" id="mainFrame">
		<frameset rows="20%,*" framespacing="0" border="0">
			<frame src="<%=queryButtons%>" name="QueryButton" scrolling="no" noresize="noresize" frameborder="no"  />
			<frame src="<%=groupListURL%>" name="GroupList"   scrolling="auto" noresize="noresize" frameborder="no"
			style="border-top-width:1;border-left-width:1;border-right-width:1;border-bottom-width:1;border-style:solid;border-color:gray"/>
		</frameset>
		<frame src="to_left.jsp" name="left-rightborder" id="toLeft" scrolling="NO" frameborder="no">
		<FRAMESET rows="15%,80%,0" frameborder="no" border="0" framespacing="0"  >
			<frame name="queryEmp" src="" scrolling="auto" noresize/>			
			<frame name="empList" src="" scrolling="auto" noresize/>
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