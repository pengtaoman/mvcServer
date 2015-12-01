<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
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
<script language="JavaScript">

function ok_onclick()
{
  if (document.forms[0].rollBackAct.value==""){
    warning_info.innerHTML = "<%=MessageUtil.getString("workflow.workitem.operation.rollback.checked",request.getSession())%>";
    return;
  }
  document.forms[0].action.value="ok";
  document.forms[0].submit();
}
function cancel_onclick()
{
  parent.returnValue = false;
  parent.close();
}
function onload()
{
  var action = "<%=request.getAttribute("close")%>";
  var successful = "<%=request.getAttribute("sucessful")%>";
  if(action == "close")
  { 
    if(successful&&successful=="true"){
       alert("<%=MessageUtil.getString("workflow.workitem.operation.rollback.checked.success",request.getSession())%>");
     }
     else{
       alert("<%=MessageUtil.getString("workflow.workitem.operation.rollback.checked.failure",request.getSession())%>");
     }
    parent.returnValue = true;
    parent.close();
  }
}
</script>
</head>

<uniflow:p_body onload="javascript:onload()" width="87%">
<uniflow:m_form action="monitorrollback.do">
<uniflow:p_title>
  <bean:message bundle="uniflow" key="workflow.workitem.operation.rollback.title"/>
</uniflow:p_title>

<uniflow:p_content_comm_wrapper width="100%">
  <uniflow:p_warning>
    <html:errors/>
  </uniflow:p_warning>
  <uniflow:p_content_table>
    <uniflow:p_content_tr>

        <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.workitem.rollback.current"/></td>
        <td class="main_label_td" valign="middle" nowrap><bean:write name ="monitorrollBackForm" property="rollBackActName"/><html:hidden property="runningAct"/></td>
        
   </uniflow:p_content_tr>
     <uniflow:p_content_tr>
        <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.workitem.rollback.rollback"/></td>
        <td class="main_label_td" valign="middle" nowrap>		   
         <html:select property="rollBackAct" styleClass="input_text120" >
		       <html:options collection="actsinfo"  property="value" labelProperty="label"/>
		 </html:select>
        </td>
    </uniflow:p_content_tr>
  </uniflow:p_content_table>
</uniflow:p_content_comm_wrapper>

<uniflow:p_action>
  <uniflow:button id="ok" action="javascript:ok_onclick()" name = "button.ok"></uniflow:button>
  <uniflow:button id="cancel" action="javascript:cancel_onclick()" name = "button.cancel"></uniflow:button>
</uniflow:p_action>


<html:hidden property="action"/>
</uniflow:m_form>
</uniflow:p_body>

</html:html>
