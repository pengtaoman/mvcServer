<%@ page language="java" pageEncoding="GBK"%>
<%
            String path = request.getContextPath();
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<!-- ��ֹ windows ������ -->
		<meta http-equiv="MSThemeCompatible" content="no" />
		<!-- ��ֹ���� headers -->
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="Expires" content="-1" />
		<meta http-equiv="Cache-Control" content="no-cache" />
		<!-- end ��ֹ���� headers -->
		<!-- ����CSS -->
        <link rel="stylesheet" href="<%=request.getContextPath()%>/common/css/td_style.css" type="text/css" />
        <!-- ����js  -->
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
