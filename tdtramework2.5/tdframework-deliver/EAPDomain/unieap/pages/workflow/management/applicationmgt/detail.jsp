<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.neusoft.uniflow.api.mgmt.NWRunTimeApplication"%>
<%@ page import="com.neusoft.uniflow.web.util.CommonInfoManager"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>

<% 
  NWRunTimeApplication appInfo = (NWRunTimeApplication)request.getAttribute("appInfo");
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
<uniflow:p_body>

  
<uniflow:p_title><bean:message bundle="uniflow" key = "workflow.system.appliaction.detail.title"/></uniflow:p_title>

<uniflow:p_content_comm_wrapper width="480">

<uniflow:p_content_table>
 <uniflow:p_content_tr>
		<td width="100" class="main_label_td" valign="top" nowrap><bean:message bundle="uniflow" key = "workflow.system.appliaction.procInstID"/></td>
		<td width="300" class="main_label_td" valign="top" nowrap><%=appInfo.getProcInstID()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td width="100" class="main_label_td" valign="top" nowrap><bean:message bundle="uniflow" key = "workflow.system.appliaction.actInstID"/></td>
		<td width="300" class="main_label_td" valign="top" nowrap><%=appInfo.getActInstID()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td width="100" class="main_label_td" valign="top" nowrap><bean:message bundle="uniflow" key = "workflow.system.appliaction.actname"/></td>
		<td width="300" class="main_label_td" valign="top" nowrap><%=appInfo.getActName()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td width="100" class="main_label_td" valign="top" nowrap><bean:message bundle="uniflow" key = "workflow.system.appliaction.actState"/></td>
		<td width="300" class="main_label_td" valign="top" nowrap><%=CommonInfoManager.getStateStr(appInfo.getActState(),request.getSession())%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td width="100" class="main_label_td" valign="top" nowrap><bean:message bundle="uniflow" key = "workflow.system.appliaction.appname"/></td>
		<td width="300" class="main_label_td" valign="top" nowrap><%=appInfo.getAppName()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td width="100" class="main_label_td" valign="top" nowrap><bean:message bundle="uniflow" key = "workflow.system.appliaction.appBuilder"/></td>
		<td width="300" class="main_label_td" valign="top" nowrap><%=appInfo.getAppBuilder()%></td>
 </uniflow:p_content_tr>

 <uniflow:p_content_tr>
		<td width="100" class="main_label_td" valign="top" nowrap><bean:message bundle="uniflow" key = "workflow.system.appliaction.appSynchMode"/></td>
		<td width="300" class="main_label_td" valign="top" nowrap><%=CommonInfoManager.getSynchModeStr(appInfo.getAppSynchMode(),request.getSession())%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td width="100" class="main_label_td" valign="top" nowrap><bean:message bundle="uniflow" key = "workflow.system.appliaction.appLoc"/></td>
		<td width="300" class="main_label_td" valign="top" nowrap><%=CommonInfoManager.getAppLocStr(appInfo.getAppLoc(),request.getSession())%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td width="100" class="main_label_td" valign="top" nowrap><bean:message bundle="uniflow" key = "workflow.system.appliaction.msgAppType"/></td>
		<td width="300" class="main_label_td" valign="top" nowrap><%=appInfo.getMsgAppType()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td width="100" class="main_label_td" valign="top" nowrap><bean:message bundle="uniflow" key = "workflow.system.appliaction.appType"/></td>
		<td width="300" class="main_label_td" valign="top" nowrap><%=appInfo.getAppType()%></td>
 </uniflow:p_content_tr>

 <uniflow:p_content_tr>
		<td width="100" class="main_label_td" valign="top" nowrap><bean:message bundle="uniflow" key = "workflow.system.appliaction.appHost"/></td>
		<td width="300" class="main_label_td" valign="top" nowrap><%=appInfo.getAppHost()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td width="100" class="main_label_td" valign="top" nowrap><bean:message bundle="uniflow" key = "workflow.system.appliaction.appURL"/></td>
		<td width="300" class="main_label_td" valign="top" nowrap><%=appInfo.getAppURL()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td width="100" class="main_label_td" valign="top" nowrap><bean:message bundle="uniflow" key = "workflow.system.appliaction.appdesc"/></td>
		<td width="300" class="main_label_td" valign="top" nowrap><%=appInfo.getAppDesc()%></td>
 </uniflow:p_content_tr>
</uniflow:p_content_table>
</uniflow:p_content_comm_wrapper >
  <uniflow:p_action>
	<uniflow:button id="cancel" action="javascript:cancel_onclick()"><bean:message bundle="uniflow" key="button.back"/></uniflow:button>
  </uniflow:p_action>
<table>
<td height="20"></td>
</table>
</uniflow:p_body>
</html:html>