<%@ page language="java" contentType="text/html;charset=gb2312" %>
<%
	String path = request.getContextPath();  
	String roleId=(String)request.getParameter("roleId");
	String tableId=(String)request.getParameter("tableId");
	String employeeId=(String)request.getParameter("employeeId");
	String operType=(String)request.getParameter("operType");
	String query=path+"/om/dataparammanage.do?method=init&roleId="+roleId+"&employeeId="+employeeId+"&tableId="+tableId+"&operType="+operType;
%>
<html>
<head>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="content-type" content="text/html; charset=gb2312">
<title>数据权限信息</title>
<SCRIPT language="JavaScript">
<!--
	/*
	 *动态调整iframe的框架大小
	 */
	function adujstIframeSize(){
		var upSize = document.getElementById('queryPage').style.height;
		var pageSize = window.dialogHeight;
		var a = pageSize.substring(0, pageSize.indexOf('px')) * 1;
		var b = upSize.substring(0, upSize.indexOf('px')) * 1;
		var h = a - b - 30;
		h += 'px';
		document.getElementById('resultPage').style.height = h;
	}
-->
</SCRIPT>
</head>
<body class="mainBody">
	<form method="post" action="">
	<table cellspacing="0" border="0" width="100%" cellpadding="0">
		<tr>
			<td id="iframeSpace1" align="center" style="width:100%;">
				<iframe name="queryPage" id="queryPage" style="width:100%;height:100%;" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" src="<%=query%>" scrolling="auto"></iframe>
			</td>
		</tr> 
		<tr>
			<td id="iframeSpace2" align="center" style="height:0;width:100%;">
				<iframe name="resultPage" id="resultPage" style="width:100%;height:100%" frameborder="0" marginwidth="0" marginheight="0"></iframe>
			</td>
		</tr>      
	</table>
	<input type="hidden" id="closeFlag" name="closeFlag" value=""/>			 	
	</form>
</body>
</html>




