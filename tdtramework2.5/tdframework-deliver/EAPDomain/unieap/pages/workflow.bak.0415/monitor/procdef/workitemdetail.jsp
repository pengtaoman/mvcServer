<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.neusoft.uniflow.api.handler.NWWorkItem"%>
<%@ page import="com.neusoft.uniflow.web.util.CommonInfoManager"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>

<% 
  NWWorkItem workItemInfo = (NWWorkItem)request.getAttribute("workItemInfo");
%>   

<html:html locale="true">
<head>
<title><bean:message bundle="uniflow" key = "workflow.popup"/></title>
<uniflow:style/>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-right: 0px;
	margin-top: 0px;
	margin-bottom: 0px;
}
-->
</style>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<script language="javascript">
function cancel_onclick()
{
  parent.returnValue = false;
  parent.close();
  
}
</script>
</head>     
<uniflow:p_body width="92%">

  
<uniflow:p_title>
      <bean:message bundle="uniflow" key="workflow.monitor.process.workitemdetail.title"/>
</uniflow:p_title>

<uniflow:p_content_comm_wrapper width="100%">

<uniflow:p_content_table>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.workitem.actID"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=workItemInfo.getActInstID()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.workitem.name"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=workItemInfo.getName()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.workitem.workitemID"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=workItemInfo.getWorkItemID()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.workitem.state"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=CommonInfoManager.getStateStr(workItemInfo.getCurState(),session)%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.workitem.appname"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=workItemInfo.getAppName()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.workitem.procinstID"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=workItemInfo.getProcInstID()%></td>
 </uniflow:p_content_tr>
 
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.workitem.apptype"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=workItemInfo.getAppType()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.workitem.description"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=workItemInfo.getDescription()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.workitem.category"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=workItemInfo.getCategory()%></td>
 </uniflow:p_content_tr>

 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.monitor.process.workitem.user"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=workItemInfo.getUserName()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.workitem.appURL"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=workItemInfo.getAppURL()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.workitem.type"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=CommonInfoManager.getWorkItemType(workItemInfo.getActionType(),session)%></td>
 </uniflow:p_content_tr>
</uniflow:p_content_table>
</uniflow:p_content_comm_wrapper>
  <uniflow:p_action>
	<uniflow:button id="cancel" action="javascript:cancel_onclick()" name="button.back"></uniflow:button>
  </uniflow:p_action>

</uniflow:p_body>
</html:html>
