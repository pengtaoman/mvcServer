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
<uniflow:p_body width = "90%">
<uniflow:m_form action="updateuser.do" focus="sex">
	 	  <uniflow:tab>
		    <uniflow:tabElement messageKey="workflow.org.user.page.basattrib" selected="false" action="javascript:set_onclick('basattrib')"/>
		    <uniflow:tabElement messageKey="workflow.org.user.page.othattrib" selected="true" action="javascript:set_onclick('othattrib')"/>
		    <uniflow:tabElement messageKey="workflow.org.user.page.resvattrib" selected="false" action="javascript:set_onclick('resvattrib')"/>
		  </uniflow:tab>
<uniflow:p_content_wrapper>

  <uniflow:p_warning>
    <html:errors/>
  </uniflow:p_warning>
<uniflow:p_content_table>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.sex"/></td>
		<td class="main_label_td" valign="middle" nowrap>
		  <html:select property="sex" styleClass="input_text150">
		   <html:options collection="sexinfo"  property="value" labelProperty="label"/>
		  </html:select>
		</td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.email"/></td>
		<td class="main_label_td" valign="middle" nowrap><html:text property="email" styleClass="input_text150"/></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.department"/></td>
		<td class="main_label_td" valign="middle" nowrap><html:text property="department" styleClass="input_text150"/></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.office.address"/></td>
		<td class="main_label_td" valign="middle" nowrap><html:text property="officeAddress" styleClass="input_text150"/></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.office.phone"/></td>
		<td class="main_label_td" valign="middle" nowrap><html:text property="officeTel" styleClass="input_text150"/></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.post.code"/></td>
		<td class="main_label_td" valign="middle" nowrap><html:text property="postalCode" styleClass="input_text150"/></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.fax"/></td>
		<td class="main_label_td" valign="middle" nowrap><html:text property="fax" styleClass="input_text150"/></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.mobile"/></td>
		<td class="main_label_td" valign="middle" nowrap><html:text property="mobilePhone" styleClass="input_text150"/></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.pager"/></td>
		<td class="main_label_td" valign="middle" nowrap><html:text property="pager" styleClass="input_text150"/></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.home.address"/></td>
		<td class="main_label_td" valign="middle" nowrap><html:text property="homeAddress" styleClass="input_text150"/></td>
 </uniflow:p_content_tr>
 <uniflow:p_content_tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.home.phone"/></td>
		<td class="main_label_td" valign="middle" nowrap><html:text property="homeTel" styleClass="input_text150"/></td>
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
  <html:hidden property="reserved01"/>
  <html:hidden property="reserved02"/>
  <html:hidden property="reserved03"/>
  <html:hidden property="reserved04"/>
  <html:hidden property="reserved05"/>
  <html:hidden property="reserved06"/>
  <html:hidden property="reserved07"/>
  <html:hidden property="reserved08"/>
  <html:hidden property="reserved09"/>
  <html:hidden property="reserved10"/>
</uniflow:m_form>
</uniflow:p_body>
</html:html>