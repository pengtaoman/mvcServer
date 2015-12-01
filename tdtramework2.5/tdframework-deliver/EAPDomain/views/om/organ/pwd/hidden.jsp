<%@ page contentType="text/html; charset=gb2312" %>
<%@ page language="java" import="java.lang.*,java.util.*" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%
String path = request.getContextPath();
String message = (String) request.getAttribute("message");
String oper = (String) request.getAttribute("oper");
if(oper != null){
	oper = "";
}
%>

<html>
  <head>
    <title></title>
  </head>
  <script>
function init(){
	var message = document.getElementById("message").value;
	if(message != null && message != "" && message != 'null'){
		alert(message);
	}
	window.opener.location.reload();
	window.close();
	
}
</script>
  <body onload="init()">
  <form name="myform">
		<input type="hidden" name="message" value="<%=message%>"/>
  </form>
  </body>
</html>
