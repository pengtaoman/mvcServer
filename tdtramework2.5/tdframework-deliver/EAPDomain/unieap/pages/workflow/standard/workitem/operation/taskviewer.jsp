<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
<title>
<bean:message bundle="uniflow" key = "workflow.taskcontainer" />
</title>
<uniflow:style/>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
</head>
<frameset rows="80%,40,0" frameborder="0" framespacing="0" border="0" >
  <frame name="appurl" src="<%=request.getContextPath()%><%=request.getAttribute("appURL")%>" marginwidth="0" marginheight="0" frameborder="0" noresize framespacing="0">
  <frame name="handler" src="<%=request.getContextPath()%>/unieap/pages/workflow/standard/workitem/operation/view.jsp" marginwidth="0" marginheight="0" frameborder="0" noresize framespacing="0">
  <frame name="hide" src="" marginwidth="0" marginheight="0" frameborder="0" noresize framespacing="0">
</frameset>
</html:html>