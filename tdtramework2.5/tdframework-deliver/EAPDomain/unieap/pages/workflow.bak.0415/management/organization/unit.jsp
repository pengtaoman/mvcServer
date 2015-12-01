<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
<title><bean:message bundle="uniflow" key = "workflow.popup"/></title>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
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
<script language="javascript">
function ok_onclick()
{
  if(validateRequired())
  {
   document.unitForm.submit();
  }
}
function cancel_onclick()
{
  parent.returnValue = false;
  parent.close();
}
function validateRequired()
{
if (getTrimText(unitForm.name) == "") {
  <%
  String arg = MessageUtil.getString("workflow.org.unit.lable.name",session);
  String[] args={arg};
  %>
 warning_info.innerHTML = "<%=MessageUtil.getString("workflow.required",session)%>";
  return false;
   }
  return true;
}
function onload()
{
  var action = "<%=request.getAttribute("close_flag")%>";
  if(action == "close")
  {
    parent.returnValue = true;
    window.close();
    opener.reload();
    
  }

}
</script>
</head>

<uniflow:p_body onload="javascript:onload()" width="93%">
<uniflow:m_form action="updateunit.do">
<uniflow:p_title><bean:message bundle="uniflow" key = "workflow.org.orguint.information"/></uniflow:p_title>

<uniflow:p_content_comm_wrapper width="100%">
  <uniflow:p_warning>
    <html:errors/>
  </uniflow:p_warning>
  <uniflow:p_content_table>
	<uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.unit.lable.name"/></td>
		<td class="main_label_td" valign="middle" nowrap>
		  <html:text property="name" styleClass="input_text150"/>
		</td>
</uniflow:p_content_tr>
<uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.unit.lable.description"/></td>
		<td class="main_label_td" valign="middle" nowrap>
		   <html:textarea property="description" styleClass="input_text150" rows="4" />
		</td>
</uniflow:p_content_tr>
<uniflow:p_content_tr>
	  <logic:equal name="unitForm" property="action" value="modify">
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.unit.lable.leaderrole.name"/></td>
		<td class="main_label_td" valign="middle" nowrap><bean:write name="unitForm" property="leadername"/>
		</td>
	  </logic:equal>
</uniflow:p_content_tr>
<uniflow:p_content_tr>
	  <logic:equal name="unitForm" property="action" value="add">
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.unit.lable.leaderrole"/></td>
		<td class="main_label_td" valign="middle" nowrap>
		  <html:select property="leaderID" styleClass="input_text150">
		    <html:options collection="roleinfo"  property="value" labelProperty="label"/>
		  </html:select>
		</td>
	  </logic:equal>
</uniflow:p_content_tr>
  </uniflow:p_content_table>
</uniflow:p_content_comm_wrapper>

<uniflow:p_action>
	<uniflow:button id="ok" action="javascript:ok_onclick()" name="button.ok"></uniflow:button>
	<uniflow:button id="cancel" action="javascript:cancel_onclick()" name="button.cancel"></uniflow:button>
</uniflow:p_action>


<html:hidden property="action"/>
<html:hidden property="selectedItem"/>
</uniflow:m_form>
</uniflow:p_body>
</html:html>