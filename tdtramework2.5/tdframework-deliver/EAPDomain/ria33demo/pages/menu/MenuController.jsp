<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>

<%
  String location=request.getParameter("location");
  //如果是相对路径
  if (!location.startsWith("/") || !(location.trim().indexOf("http")==0) ){
  	 location = EAPConfigHelper.getContextPath(request).concat(location);
  }
%>

<html>
<head>
<title>
ChildMenu
</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body onload="init()">
<script language="javascript">
  function init(){
     document.getElementById("menu_controller_frm").submit();
  }
</script>
<form id="menu_controller_frm" method="POST" action="<%= location%>">
</form>
</body>
</html>