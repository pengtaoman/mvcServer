<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<contextPath value="<%=path%>"/>
		<script type="text/javascript">
		
			try {
				var param = unieap.getDialog().getObject();
				if (param) {
					alert("得到父窗口的参数：name："+param["name"]+ "    value:" + param["value"]);
				}
					
			} catch (err) {
			    //alert("XXXXXXXXX");
			}
			
			function closeDia() {
				try {
				        unieap.getDialog().setReturn(unieap.byId("text01").getText());
			            unieap.getDialog().close();

				} catch (err) {
					//alert("XXXXXXXXX");
				}
			}
		</script>
		
	</head>
<body class="unieap">
返回给父窗口的值：<div dojoType="unieap.form.TextBox" id="text01"></div>
<div dojoType="unieap.form.Button" label=" 关闭对话框 " onclick="closeDia()"></div>
</body>
</html>	
	