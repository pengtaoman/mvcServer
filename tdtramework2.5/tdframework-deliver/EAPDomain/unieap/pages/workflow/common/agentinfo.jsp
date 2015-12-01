 <%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">

<head>
<uniflow:style/>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
</head>

<uniflow:p_body>
<uniflow:m_form action="agentinfo.do">
<center>
<uniflow:p_title><bean:message bundle="uniflow" key = "workflow.common.agentinfo.title"/></uniflow:p_title>
<uniflow:p_content_wrapper>
  <uniflow:p_content_table>
    <uniflow:p_content_tr>
	<td width="30%" height="25">
	   <bean:message bundle="uniflow" key="workflow.common.agentinfo.assigner" />
	</td>	 
	<td width="70%">&nbsp;
       <html:text property="assigner" readonly="true"/>
	</td>
	</uniflow:p_content_tr>
	    <uniflow:p_content_tr>
	<td width="30%" height="25">
	   <bean:message bundle="uniflow" key="workflow.common.agentinfo.assignee" />
	</td>	 
	<td width="70%">&nbsp;
       <html:text property="assignee" readonly="true"/>
	</td>
	</uniflow:p_content_tr>
	    <uniflow:p_content_tr>
	<td width="30%" height="25">
	   <bean:message bundle="uniflow" key="workflow.starttime" />
	</td>	 
	<td width="70%">&nbsp;
       <html:text property="startDate" readonly="true"/>
	</td>
	</uniflow:p_content_tr>
	    <uniflow:p_content_tr>
	<td width="30%" height="25">
	   <bean:message bundle="uniflow" key="workflow.endtime" />
	</td>	 
	<td width="70%">&nbsp;
       <html:text property="endDate" readonly="true"/>
	</td>
	</uniflow:p_content_tr>
  </uniflow:p_content_table>
</uniflow:p_content_wrapper>
<uniflow:p_action>
  <uniflow:button id="cancel" action="javascript:window.close()"><bean:message bundle="uniflow" key="button.close"/></uniflow:button>
</uniflow:p_action>
</center>
</uniflow:m_form>
</uniflow:p_body>
</html:html>