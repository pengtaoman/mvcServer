<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		
		<%@ include file="/unieap/ria3.3/pages/config_MsgDia.jsp" %>
		<contextPath value="<%=path%>"/>

		<script type="text/javascript">
		function testCancelConfirm(){
		orderaccept.common.dialog.MessageBox.alert({busiCode:"08410035"});
		}
		
		function opdia(){
			openWinDialog("http://www.baidu.com","assaaaaaaaa",600,800,["sssss"],false);
	   }
			
		
		</script>
		
	</head>
<body class="unieap">
<a href="javascript:testCancelConfirm();">aaaaaaaaaaaaaaaaa</a>
<br>
<br>
<br>
<br>
<a href="javascript:opdia();">open Dialog</a>
</body>
</html>	