<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html>
<head>
<script language="JavaScript">

</script>
</head>
<frameset rows="445,*" frameborder="NO" framespacing="0" border="0">
  <frame id="monitor" name="monitor" src="<%=request.getContextPath()%>/procmonitor.do?procInstID=<%=request.getParameter("procInstID")%>" noresize scrolling="NO" marginwidth=0 marginheight=0>
  <frame id="info" name="info" src="" noresize scrolling="NO" marginwidth=0 marginheight=0> 
</frameset>
<body>
</body>
</html>