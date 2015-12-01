<%@ page language="java" pageEncoding="GBK"%>
<%
            String path = request.getContextPath();
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<!-- 禁止 windows 主题风格 -->
		<meta http-equiv="MSThemeCompatible" content="no" />
		<!-- 禁止缓存 headers -->
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="Expires" content="-1" />
		<meta http-equiv="Cache-Control" content="no-cache" />
		<!-- end 禁止缓存 headers -->
		<!-- 公用CSS -->
        <link rel="stylesheet" href="<%=request.getContextPath()%>/common/css/td_style.css" type="text/css" />
        <!-- 公共js  -->
        <script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
        <script language="javascript" src="<%=path%>/common/js/waitingbar.js"></script>
        <script language="javascript" src="<%=path%>/common/js/titlebar.js"></script>
	</head>

	<frameset frameborder="no" framespacing="0" rows="130,*,0">
	   <frame name="query" src="<%=path%>/loginUserListAction.do?method=init" scrolling="no" noresize="noresize">
       <frame name="list" src="" scrolling="auto" noresize="noresize">
       <frame name="hidden" src="" scrolling="no" noresize="noresize">
	</frameset>
</html>
