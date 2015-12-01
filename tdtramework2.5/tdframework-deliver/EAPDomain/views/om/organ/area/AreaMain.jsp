<%@ page language="java" contentType="text/html;charset=gb2312" %>
<%
	String path = request.getContextPath();  
	String params = path+"/om/areaaction.do?OperType=init";
	String blank = path+"/views/common/jsp/WaittingPage.jsp";
%>
<html>
<head>
<title></title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="content-type" content="text/html; charset=gb2312">
</head>
<frameset id="workPlace" rows="180,0,*" frameborder="NO" border="0" framespacing="0">
    <frame name="params" src="<%=params%>"  id="paramCondition"  scrolling="no" noresize>
	<frame name="query" src=""  id="searchCondition"  scrolling="no" noresize>
	<frame name="areaList" src="<%=blank%>" id="areaList"  scrolling="auto" noresize>
</frameset>
<noframes>
  	<body>
   		<p>此网页使用了框架，但您的浏览器不支持框架。</p>
  	</body>
</noframes>
</html>