<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
    <head>
        <title>inner</title>
        <script type="text/javascript">
			dojo.require("unieap.dialog.MessageBox");
			function showMessageBox(){           
                MessageBox.cancelConfirm({},document.getElementById("button"));
		   }
        </script>
        
    </head>
    <body class="unieap">
		对话框显示的内容是一个URL。
		<div id="button" dojoType="unieap.form.Button" label="弹出对话框" onclick="showMessageBox()"></div>
    </body>
</html>

