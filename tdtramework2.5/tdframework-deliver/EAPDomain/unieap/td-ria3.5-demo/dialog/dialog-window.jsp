<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<contextPath value="<%=path%>"/>
		<script type="text/javascript">
		
			function showDialog() {
				//var dialog = new unieap.dialog.Dialog({url:"按钮和文本输入框.html"});
				//dialog.show();
				var dialog = DialogUtil.showDialog({url:"<%=path%>/unieap/td-ria3.5-demo/dialog/dialog01.jsp",title:"业务窗口I",height:"600",width:"1024",onComplete:diaLogComplete,dialogData:{name:"param001",value:"param002"},iconCloseComplete: true});
		   }
			
			function diaLogComplete(retrunv) {
			    
				alert("弹出窗口传回的值:" + retrunv);
				//alert(this.getValue());
			}

		</script>
		
	</head>
<body class="unieap">
<div dojoType="unieap.layout.TitlePane" title="弹出窗口" style="width:420;margin-bottom:3px;'">
<BR><BR><div dojoType="unieap.form.Button" id="showDia" label=" 弹出窗口 " onclick="showDialog();"></div><BR><BR><BR>
</div>
</body>
</html>	
	