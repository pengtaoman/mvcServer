<%@ page language="java" contentType="text/html;charset=gb2312" %>



<%
	String path = request.getContextPath();
	String operateAction = (String)request.getAttribute("operateAction");
	String operateForward = (String)request.getAttribute("operateForward");
	String workItemID = (String)request.getAttribute("workItemID");
	String workItemKind = (String)request.getAttribute("workItemKind");
	String workItemName = (String)request.getAttribute("workItemName");
	String oprType = (String)request.getAttribute("oprType");
	String aiid = (String)request.getAttribute("aiid");
	String strThemeId = (String)request.getAttribute("themeId");//liuying
//	System.out.println("jsp:aiid:" + aiid);
%>

<html>
	<head>
		<title>待办件处理</title>
		<meta http-equiv="Content-Type" content="text/html;charset=gb2312" />
	</head>
	<frameset framespacing="0" border="false" frameborder="0" rows="100%,*"> 
		<frame name="banner" scrolling="auto" noresize target="hiddenFrame" 
		src="<%=path%>/retain/<%=operateAction%>.do?operType=<%=oprType%>&workItemID=<%=workItemID%>&workItemKind=<%=workItemKind%>&operateForward=<%=operateForward%>&workItemName=<%=workItemName%>&themeId=<%=strThemeId%>&aiid=<%=aiid%>"
		  marginwidth="0" marginheight="0">
		<frame name="hiddenFrame" marginheight="0" target="" scrolling="auto" src="<%=path%>/blank.html">
	  <noframes>
	  	<body>
	  	</body>
	  </noframes>
	</frameset>
</html>