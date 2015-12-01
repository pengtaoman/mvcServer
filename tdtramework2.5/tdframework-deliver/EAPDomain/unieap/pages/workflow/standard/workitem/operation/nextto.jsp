<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
<title><bean:message bundle="uniflow" key = "workflow.popup"/></title><uniflow:style/>
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
function ok_onclick()
{
  document.forms[0].action.value = "update";
  document.forms[0].submit();
}
function cancel_onclick()
{
  parent.returnValue = false;
  parent.close();
}
function onload()
{
  var action = document.forms[0].action.value;
  if(action == "ok")
  {
    parent.returnValue = false;
    parent.close();
  }
}
function check_select()
{
  var selectIndex = document.forms[0].nextto.selectedIndex;
  return selectIndex!=-1;
}
</script>
</head>
<uniflow:p_body onload="javascript:onload()" width="76%">
<uniflow:m_form action="nextto.do">

<uniflow:p_title><bean:message bundle="uniflow" key = "workflow.workitem.operation.nextto.title" /></uniflow:p_title>
<uniflow:p_content_comm_wrapper>
   <uniflow:p_content_table>
	<uniflow:p_content_tr>
	  <td class="main_label_td" valign="middle" nowrap>
	    <bean:message bundle="uniflow" key="workflow.workitem.sendto.nextto" />
	  </td>
     </uniflow:p_content_tr>
     <uniflow:p_content_tr>
	 <td class="main_label_td" valign="middle" nowrap>
	    <html:select property="nextto" multiple="true">
		    <html:options collection="nexttoList"  property="value" labelProperty="label"/>
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
<html:hidden property="workitemID"/>
</uniflow:m_form>
</uniflow:p_body>
</html:html>
