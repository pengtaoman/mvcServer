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
    	
		<% 
			String str=request.getParameter("name"); 
			str=new String(str.getBytes("iso-8859-1"),"utf-8");
			out.println("页面传过来的数据为:"+str);
		%>
    	<script>
    		dojo.addOnLoad(function(){
				unieap.getDialog().setReturn("hello");
				

			})
			function close(){
				
				unieap.getDialog().close();
			}
			
			function close1(){
				unieap.byId('x').show();
			}
    	
    	</script>
		

		<div dojoType="unieap.form.Button" label="关闭窗口" onClick="close"></div>
		<div dojoType="unieap.form.Button" label="打开新窗口" onClick="close1"></div>
		<div dojoType="unieap.dialog.Dialog" url="demo1.jsp" id="x">
			
		</div>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </body>
</html>