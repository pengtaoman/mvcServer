<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
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
<script language="javascript">
function set_onclick(page)
{
  personForm.page.value = page;
  personForm.action = "setuser.do";
  document.personForm.submit();
}
function cancel_onclick()
{
  parent.returnValue = false;
  parent.close();
}
function ok_onclick()
{
  document.personForm.submit();
}
</script>
</head>
<uniflow:p_body width="90%">
<uniflow:m_form action="updateuser.do" focus="reserved01">
	  	  <uniflow:tab>
		    <uniflow:tabElement messageKey="workflow.org.user.page.basattrib" selected="false" action="javascript:set_onclick('basattrib')"/>
		    <uniflow:tabElement messageKey="workflow.org.user.page.othattrib" selected="false" action="javascript:set_onclick('othattrib')"/>
		    <uniflow:tabElement messageKey="workflow.org.user.page.resvattrib" selected="true" action="javascript:set_onclick('resvattrib')"/>
		  </uniflow:tab>
	
<uniflow:p_content_wrapper>
  <uniflow:p_warning>
    <html:errors/>
  </uniflow:p_warning>
<uniflow:p_content_table>
<uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.reserve" arg0="1"/></td>
		<td class="main_label_td" valign="middle" nowrap><html:text property="reserved01" styleClass="input_text150"/></td>
</uniflow:p_content_tr>
<uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.reserve" arg0="2"/></td>
		<td class="main_label_td" valign="middle" nowrap><html:text property="reserved02" styleClass="input_text150"/></td>
</uniflow:p_content_tr>
<uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.reserve" arg0="3"/></td>
		<td class="main_label_td" valign="middle" nowrap><html:text property="reserved03" styleClass="input_text150" /></td>
</uniflow:p_content_tr>
<uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.reserve" arg0="4"/></td>
		<td class="main_label_td" valign="middle" nowrap><html:text property="reserved04" styleClass="input_text150" /></td>
</uniflow:p_content_tr>
<uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.reserve" arg0="5"/></td>
		<td class="main_label_td" valign="middle" nowrap><html:text property="reserved05" styleClass="input_text150" /></td>
</uniflow:p_content_tr>
<uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.reserve" arg0="6"/></td>
		<td class="main_label_td" valign="middle" nowrap><html:text property="reserved06" styleClass="input_text150" /></td>
</uniflow:p_content_tr>
<uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.reserve" arg0="7"/></td>
		<td class="main_label_td" valign="middle" nowrap><html:text property="reserved07" styleClass="input_text150" /></td>
</uniflow:p_content_tr>
<uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.reserve" arg0="8"/></td>
		<td class="main_label_td" valign="middle" nowrap><html:text property="reserved08" styleClass="input_text150" /></td>
</uniflow:p_content_tr>
<uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.reserve" arg0="9"/></td>
		<td class="main_label_td" valign="middle" nowrap><html:text property="reserved09" styleClass="input_text150" /></td>
</uniflow:p_content_tr>
<uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.reserve" arg0="10"/></td>
		<td class="main_label_td" valign="middle" nowrap><html:text property="reserved10" styleClass="input_text150" /></td>
</uniflow:p_content_tr>
</uniflow:p_content_table>



</uniflow:p_content_wrapper>
<uniflow:p_action>
		<uniflow:button id="ok" action="javascript:ok_onclick()" name="button.ok"></uniflow:button>
		<uniflow:button id="cancel" action="javascript:cancel_onclick()" name="button.cancel"></uniflow:button>
</uniflow:p_action>

  <html:hidden property="selectedItem"/>
  <html:hidden property="operation"/>
  <html:hidden property="page"/>
  <html:hidden property="name"/>
  <html:hidden property="account"/>
  <html:hidden property="password"/>
  <html:hidden property="confpass"/>
  <html:hidden property="department"/>
  <html:hidden property="email"/>
  <html:hidden property="fax"/>
  <html:hidden property="homeAddress"/>
  <html:hidden property="homeTel"/>
  <html:hidden property="mobilePhone"/>
  <html:hidden property="officeAddress"/>
  <html:hidden property="officeTel"/>
  <html:hidden property="pager"/>
  <html:hidden property="postalCode"/>
  <html:hidden property="sex"/>
</uniflow:m_form>
</uniflow:p_body>
</html:html>