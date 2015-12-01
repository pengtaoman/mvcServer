<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
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
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<script language="JavaScript">
function onload()
{
 var action = "<%=request.getAttribute("close_flag")%>";
  if(action == "close")
  {
    parent.returnValue = true;
    window.close();
  }
}
</script>
</head>

<uniflow:p_body onload="javascript:onload()" width='91%'>

<uniflow:m_form action = "auditdetail.do">
<uniflow:p_title><bean:message bundle="uniflow" key="workflow.system.audit.message.title"/></uniflow:p_title>
<uniflow:p_content_comm_wrapper width="100%">
 <uniflow:p_content_table>
     <logic:iterate id="auditmsg"  name="auditForm" property="list" type="com.neusoft.uniflow.api.stat.NWAuditMessage" indexId="index"> 
      <uniflow:p_content_tr>
        <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.system.audit.message.id"/></td>
        <td class="main_label_td" valign="middle" nowrap><bean:write name="auditmsg" property="messageID"/></td>
      </uniflow:p_content_tr>
      <uniflow:p_content_tr>
        <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.system.audit.server"/></td>
        <td class="main_label_td" valign="middle" nowrap><bean:write name="auditmsg" property="serverID"/></td>
      </uniflow:p_content_tr>
      <uniflow:p_content_tr>
        <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.system.audit.person"/></td>
        <td class="main_label_td" valign="middle" nowrap><bean:write name="auditmsg" property="personID"/></td>
      </uniflow:p_content_tr>
      <uniflow:p_content_tr>
        <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.system.audit.evtid"/></td>
        <td class="main_label_td" valign="middle" nowrap><bean:write name="auditmsg" property="eventID"/></td>
      </uniflow:p_content_tr>
      <uniflow:p_content_tr>
        <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.system.audit.messagetype"/></td>
        <td class="main_label_td" valign="middle" nowrap><bean:write name="auditmsg" property="messageType" format="#.##" /></td>
      </uniflow:p_content_tr>
      <uniflow:p_content_tr>
        <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.system.audit.evttime"/></td>
        <td class="main_label_td" valign="middle" nowrap><bean:write name="auditmsg" property="eveTime"/></td>
      </uniflow:p_content_tr>
      <uniflow:p_content_tr>
        <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.system.audit.delaytime"/></td>
        <td class="main_label_td" valign="middle" nowrap><bean:write name="auditmsg" property="delayTime" format="#.##" /></td>
      </uniflow:p_content_tr>
      <uniflow:p_content_tr>
        <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.system.audit.receiveaccount"/></td>
        <td class="main_label_td" valign="middle" nowrap><bean:write name="auditmsg" property="receiveAccount"/></td>
      </uniflow:p_content_tr>
      <uniflow:p_content_tr>
        <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow"  key="workflow.system.audit.parameter"/></td>
        <td class="main_label_td" valign="middle" nowrap><bean:write name="auditmsg" property="parameter"/></td>
      </uniflow:p_content_tr>
      <uniflow:p_content_tr>
        <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.system.audit.revalue"/></td>
        <td class="main_label_td" valign="middle" nowrap><bean:write name="auditmsg" property="reValue"/></td>
      </uniflow:p_content_tr>
     </logic:iterate> 
 </uniflow:p_content_table>    
</uniflow:p_content_comm_wrapper>   
 <uniflow:p_action>
	  <uniflow:button id="cancel" action="javascript:window.close()"><bean:message bundle="uniflow" key="button.close"/></uniflow:button>
 </uniflow:p_action>
</uniflow:m_form>  

</uniflow:p_body>
</html:html>