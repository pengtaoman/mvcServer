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
<script language="JavaScript">

function ok_onclick()
{
  if(!check_select())
  {
    warning_info.innerHTML = '<%=MessageUtil.getString("workflow.workitem.operation.reassign.choice.checked",request.getSession())%>';
    return;
  }
  document.forms[0].operation.value = "update";
  document.forms[0].submit();
}
function cancel_onclick()
{
  parent.returnValue = false;
  parent.close();
}
function on_load()
{
  var operation = document.forms[0].operation.value;
  if(operation == "ok")
  {
    parent.returnValue = true;
    parent.close();
  }
}
function check_select()
{
  var selectIndex = document.forms[0].assignTo.selectedIndex;
  return selectIndex!=-1;
}
function change(){
   warning_info.innerHTML ="";
}
</script>
</head>

<uniflow:p_body onload="javascript:on_load()" width="87%">
<uniflow:m_form action="reassign.do">

<uniflow:p_title><bean:message bundle="uniflow" key="workflow.workitem.operation.reassign.title"/></uniflow:p_title>
<uniflow:p_content_comm_wrapper width="100%">
  <uniflow:p_warning>
    <html:errors/>
  </uniflow:p_warning>
<uniflow:p_content_table>
   <uniflow:p_content_tr>
	<td class="main_label_td" valign="middle" nowrap>
	<html:radio property="submitAuthor" value="true"/>
	<bean:message bundle="uniflow" key="workflow.workitem.reassign.submittoauthor"/>
	<html:radio property="submitAuthor" value="false"/>
	<bean:message bundle="uniflow" key="workflow.workitem.reassign.unsubmittoauthor"/>
	</td>
  </uniflow:p_content_tr>
  <uniflow:p_content_tr>
	<td class="main_label_td" valign="middle" nowrap>
	<html:select property="assignTo" styleClass="input_text" multiple="true" size="10" style="width:280" onchange="javascript:change()">
	  <html:options collection="reassigntoList" property="value" labelProperty="label"/>
	</html:select>
	</td>
   </uniflow:p_content_tr>
</uniflow:p_content_table>
</uniflow:p_content_comm_wrapper>
<uniflow:p_action>
	  <uniflow:button id="ok" action="javascript:ok_onclick()" name="button.ok"></uniflow:button>
	  <uniflow:button id="cancel" action="javascript:cancel_onclick()" name="button.cancel"></uniflow:button>
</uniflow:p_action>
<html:hidden property="operation"/>
<html:hidden property="workitemID"/>

</uniflow:m_form>
</uniflow:p_body>
</html:html>

