<%@ page contentType="text/html; charset=gb2312" %>
<%@ page language="java" import="java.lang.*,java.util.*" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%
String path = request.getContextPath();
String message = (String)request.getAttribute("Message");
String operFlag =(String)request.getAttribute("OperFlag");
String operType = (String)request.getAttribute("OperType");
message = NullProcessUtil.nvlToString(message,"");
if("".intern() != message.intern()){
	message = message.replaceAll(" ","");
	message = message.replaceAll("\"","'");
}
%>

<html>
  <head>
    <title></title>
  </head>
  <script>
function init(){
	if (document.myform.errorInfo.value != ''){
		alert(document.myform.errorInfo.value);
	}
}
</script>
  <body onload="init()">
  <form name="myform">
    <input type="hidden" name="EmployeeId" value=""/>
		<!--Ò³Ãæ²Ù×÷-->
		<input type="text" name="errorInfo" value="<%=message%>"/>
		<input type="text" name="OperType" value="<%=operType%>"/>
		<input type="text" name="OperFlag" value="<%=operFlag%>"/>
  </form>
  </body>
</html>
