<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html>
<head>
</head>
<!--  
<frameset rows="0,*" frameborder="NO" framespacing="0" border="0">
  <frame name="hidden" noresize scrolling="NO" src="">
  <frame name="welcome" src="unieap/pages/workflow/welcome.jsp" noresize scrolling="YES">
</frameset>
  -->
<script language="javascript">
function onload()
{  
	document.forms[0].msg.value="logonerrorkey";
	document.forms[0].submit();
}
</script>
<body onload="onload()">
<form name="form1" action="unieap/pages/workflow/welcome.jsp" method="post">
<input type="hidden" name="msg" value="" />
</form>
<body>
</body>
</html>