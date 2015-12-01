<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>dialog测试</title>
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
	</head>
    <body class="unieap">
    	<script>
    		function st_dialog(){
				MessageBox.alert()
			}
    	</script>
		<div dojoType="unieap.form.Button" label="MessageBox" onClick="st_dialog" id="st_btn"></div>
	
    </body>
</html>