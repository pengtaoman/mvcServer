<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
<title>
<%String opstring = request.getParameter("opstring"); %>
<%String aid = request.getParameter("activityid"); %>
<bean:message bundle="uniflow" key = "workflow.taskcontainer" />
</title>
<uniflow:style/>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
</head>
<frameset cols="220,*,0" frameborder="0" framespacing="0" border="0" >
  <frame name="apptree" src="<%=request.getContextPath()%>/oneappsel.do?activityid=<%=aid%>&actiontype=wi&opstring=<%=opstring%>" marginwidth="0" marginheight="0" frameborder="0" noresize framespacing="0">
  <frame name="application" src="<%=request.getContextPath()%>/unieap/pages/workflow/common/display.jsp" marginwidth="0" marginheight="0" frameborder="0" noresize framespacing="0">
  <frame name="hide" src="" marginwidth="0" marginheight="0" frameborder="0" noresize framespacing="0">
</frameset>
</html:html>