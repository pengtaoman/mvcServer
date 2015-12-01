<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%
  String webpath = request.getContextPath();
  String queryPage = webpath+"/om/invalidLogAction.do?method=initQueryPage";
  String blank = webpath+"/views/om/blank.html";
%>
<html>

	<head>
		<title></title>
		<meta http-equiv="Content-Type" content="text/html; charset=gbk">
	</head>
	<FRAMESET cols="800,*,*" border="0" framespacing="0" id="mainFrame">
		<frameset rows="150,*" framespacing="0" border="0">
			<frame src="<%=queryPage%>" name="QueryButton" scrolling="no" noresize="noresize" frameborder="no"  />
			<frame src="<%=blank%>" name="InvalidLogList"   scrolling="auto" noresize="noresize" frameborder="no"
			style="border-top-width:1;border-left-width:1;border-right-width:1;border-bottom-width:1;border-style:solid;border-color:gray"/>
		</frameset>
	</FRAMESET> 
	<noframes>
		<body>
			<p>
				此网页使用了框架，但您的浏览器不支持框架。
			</p>
		</body>
	</noframes>
</html>	