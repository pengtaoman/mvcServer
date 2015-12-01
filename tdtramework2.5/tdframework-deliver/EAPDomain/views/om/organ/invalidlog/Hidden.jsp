<%@ page contentType="text/html; charset=gb2312" %>
<%
String message = (String)request.getAttribute("message");
String operType = (String)request.getAttribute("operType");
%>

<html>
  <head>
    <title></title>
  </head>
  <script>
	function init(){
		var message = document.getElementById("message").value;
		if(message != null && message != ''){
			alert(message);
		}	
		if( document.myform.OperType.value == 'show'){
			parent.QueryButton.bViewClick();
		}
	}
  </script>
  <body onload="init()">
  <form name="myform">
    <input type="hidden" name="sysId"/>
	<input type="hidden" name="OperType" value="<%=operType%>"/>
	<input type="hidden" name="message" value="<%=message%>"/>
  </form>
  </body>
</html>
