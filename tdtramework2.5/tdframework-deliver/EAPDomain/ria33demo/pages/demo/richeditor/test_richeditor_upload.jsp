<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <title>RIA样例</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
        <SCRIPT type="text/javascript">
		dojo.require("unieap.form.RichTextEditor");
		function setvalue(){
			test.setValue("新设置内容");
		}
		function getvalue(){
			alert(test.getValue())
		}
	</script>
        </SCRIPT>
    </head>
    <body class="unieap">
        <div  jsId="test" dojoType="unieap.form.RichTextEditor">富文本框初始值</div>
        <input type="button"  onclick="setvalue()"  value="setValue">
	    <input type="button"  onclick="getvalue()"  value="getValue">
    </body>
</html>
