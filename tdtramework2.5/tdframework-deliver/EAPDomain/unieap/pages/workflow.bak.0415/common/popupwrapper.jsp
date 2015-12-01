<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<html>
<head>
<title><bean:message bundle="uniflow" key="workflow.popup"/></title>
<script language="Javascript">
//var param = window.dialogArguments;
//document.title = param[1];
function onload()
{
  document.write("<html>");
  document.write("<head>");
  document.write("<title>");
  document.write("UniEAP Workflow");
  document.write("</title>");
  document.write("</head>");
  document.write("<frameset rows='0,*' frameborder='NO' framespacing='0' border='0'>");
  document.write("  <frame name='hidden' noresize scrolling='NO' src=''>");
  document.write("  <frame name='content' noresize scrolling='NO' src='"+window.dialogArguments+"'>");
  document.write("</frameset>");
  document.write("</html>");
}
</script>
</head>
<body onload="onload()">
</body>
</html>