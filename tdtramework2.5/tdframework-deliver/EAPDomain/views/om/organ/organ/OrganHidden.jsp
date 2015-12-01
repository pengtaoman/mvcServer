<%@ page contentType="text/html; charset=gb2312" %>
<%@ page language="java" import="java.lang.*,java.util.*" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%
String path = request.getContextPath();
String message = (String)request.getAttribute("Message");
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
		if(document.myform.errorInfo.value != ""){
			alert(document.myform.errorInfo.value);
		}
	}
</script>
  <body onload="init()">
  <form name="myform">
    <input type="hidden" name="errorInfo" value="<%=message%>">
    <input type="text" name="OperType" value="">
    <input type="text" name="OrganId" value="">
    <input type="text" name="OrganName" value="">
    <input type="text" name="OrganKind" value="">
    <input type="text" name="OrganStatus" value="">
    <input type="text" name="ParentOrganId" value="">
    <input type="text" name="AreaId" value="">
    <input type="text" name="InnerDuty" value="">
    <input type="text" name="Principal" value="">
    <input type="text" name="ActiveDate" value="">
    <input type="text" name="InactiveDate" value="">
    <input type="text" name="OrganDesc" value="">
  </form>
  </body>
</html>
