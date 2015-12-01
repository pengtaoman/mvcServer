<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.neusoft.uniflow.api.handler.NWProcInst"%>
<%@ page import="com.neusoft.uniflow.web.util.CommonInfoManager"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>

<% 
  NWProcInst procinst = (NWProcInst)request.getAttribute("procinst");
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
<script language="javascript">
function cancel_onclick()
{
  //parent.returnValue = false;
 // parent.close();
 window.close();
  
}
</script>
</head>     
<uniflow:p_body width="92%">

  
<uniflow:p_title>
      <bean:message bundle="uniflow" key="workflow.monitor.process.procinstdetail.title"/>
</uniflow:p_title>

<uniflow:p_content_comm_wrapper width="100%">

<uniflow:p_content_table>

 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.procinst.procinstID"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=procinst.getProcInstID()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.procinst.name"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=procinst.getName()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.procinst.builder"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=procinst.getBuilder()%></td>
 </uniflow:p_content_tr>
  <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.procinst.templetID"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=procinst.getProcDefID()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.procinst.templetName"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=procinst.getProcDefName()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.procinst.priority"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=procinst.getPriority()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.procinst.type"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=procinst.getType()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.procinst.state"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=CommonInfoManager.getStateStr(procinst.getCurState(),session)%></td>
 </uniflow:p_content_tr>

 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.procinst.starttime"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=procinst.getStartTimeString()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.procinst.completetime"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=procinst.getCompleteTimeString()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.procinst.category"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=procinst.getCategory()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.procinst.limittime"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=procinst.getLimitTime()%></td>
 </uniflow:p_content_tr>

 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.procinst.overtimeaction"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=procinst.getOvertimeAction()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.procinst.overtimeApp"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=procinst.getOvertimeAppDefID()%></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.procinst.description"/></td>
		<td class="main_label_td" valign="middle" nowrap><%=procinst.getDescription()%></td>
 </uniflow:p_content_tr>
</uniflow:p_content_table>
</uniflow:p_content_comm_wrapper>
  <uniflow:p_action>
	<uniflow:button id="cancel" action="javascript:cancel_onclick()" name="button.back"></uniflow:button>
  </uniflow:p_action>

<table>
<td height="20">
</td>
</table>
</uniflow:p_body>
</html:html>
