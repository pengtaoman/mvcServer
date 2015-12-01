<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
<title><bean:message bundle="uniflow" key = "workflow.popup"/></title>
	<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
	<uniflow:style />
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
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
	<script language="javascript">
function set_onclick(page)
{
  if(validateRequired()&&validatePass())
  {
  
  personForm.page.value = page;
  personForm.action = "setuser.do";
  document.personForm.submit();
  }
}
function cancel_onclick()
{
  parent.returnValue = false;
  parent.close();
}
function ok_onclick()
{
  if(validateRequired()&&validatePass())
  {
  document.personForm.submit();
  }
}
function validatePass()
{
  if(document.personForm.password.value!=document.personForm.confpass.value)
  {
    warning_info.innerHTML = "<%=MessageUtil.getString("workflow.common.preference.changepwd.confpass.checked",request.getSession())%>";
    return false;
   }
   return true;
}
function validateRequired()
{
  if(getTrimText(document.personForm.name)=="")
  {
    warning_info.innerHTML = "<%=MessageUtil.getString("workflow.org.user.lable.name",session)%>"+"<%=MessageUtil.getString("workflow.required",session)%>";
    return false;
   }
  if(getTrimText(document.personForm.account)=="")
  {
    warning_info.innerHTML = "<%=MessageUtil.getString("workflow.org.user.lable.account",session)%>"+"<%=MessageUtil.getString("workflow.required",session)%>";
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
    parent.close();
  }

}
</script>
</head>
<uniflow:p_body onload="javascript:onload()" width = "90%">
	<uniflow:m_form action="updateuser.do" focus="name">
		
	<uniflow:tab>
		<uniflow:tabElement
								messageKey="workflow.org.user.page.basattrib"
								selected="true" action="javascript:set_onclick('basattrib')" />
		<uniflow:tabElement
								messageKey="workflow.org.user.page.othattrib"
								selected="false" action="javascript:set_onclick('othattrib')" />
		<uniflow:tabElement
								messageKey="workflow.org.user.page.resvattrib"
								selected="false" action="javascript:set_onclick('resvattrib')" />
	</uniflow:tab>
	<uniflow:p_content_wrapper>

				<uniflow:p_warning>
					<html:errors />
				</uniflow:p_warning>

				<uniflow:p_content_table>
					<uniflow:p_content_tr>
						<td class="main_label_td" valign="middle" nowrap>
							<bean:message bundle="uniflow"
								key="workflow.org.user.lable.account" />
						</td>
						<td class="main_label_td" valign="middle" nowrap>
							<html:text property="account" styleClass="input_text150" />
						</td>
					</uniflow:p_content_tr>
					<uniflow:p_content_tr>
						<td class="main_label_td" valign="middle" nowrap>
							<bean:message bundle="uniflow"
								key="workflow.org.user.lable.name" />
						</td>
						<td class="main_label_td" valign="middle" nowrap>
							<html:text property="name" styleClass="input_text150" />
						</td>
					</uniflow:p_content_tr>
					<uniflow:p_content_tr>
						<td class="main_label_td" valign="middle" nowrap>
							<bean:message bundle="uniflow"
								key="workflow.org.user.lable.password" />
						</td>
						<td class="main_label_td" valign="middle" nowrap>
							<html:password property="password" styleClass="input_text150" />
						</td>
					</uniflow:p_content_tr>
					<uniflow:p_content_tr>
						<td class="main_label_td" valign="middle" nowrap>
							<bean:message bundle="uniflow"
								key="workflow.org.user.lable.confpass" />
						</td>
						<td class="main_label_td" valign="middle" nowrap>
							<html:password property="confpass" styleClass="input_text150" />
						</td>
					</uniflow:p_content_tr>

				</uniflow:p_content_table>
		</uniflow:p_content_wrapper>
		<uniflow:p_action>
			<uniflow:button id="ok" action="javascript:ok_onclick()" name="button.ok"></uniflow:button>
			<uniflow:button id="cancel" action="javascript:cancel_onclick()" name="button.cancel"></uniflow:button>
		</uniflow:p_action>
		<html:hidden property="selectedItem" />
		<html:hidden property="operation" />
		<html:hidden property="page" />
		<html:hidden property="department" />
		<html:hidden property="email" />
		<html:hidden property="fax" />
		<html:hidden property="homeAddress" />
		<html:hidden property="homeTel" />
		<html:hidden property="mobilePhone" />
		<html:hidden property="officeAddress" />
		<html:hidden property="officeTel" />
		<html:hidden property="pager" />
		<html:hidden property="postalCode" />
		<html:hidden property="sex" />
		<html:hidden property="reserved01" />
		<html:hidden property="reserved02" />
		<html:hidden property="reserved03" />
		<html:hidden property="reserved04" />
		<html:hidden property="reserved05" />
		<html:hidden property="reserved06" />
		<html:hidden property="reserved07" />
		<html:hidden property="reserved08" />
		<html:hidden property="reserved09" />
		<html:hidden property="reserved10" />
	</uniflow:m_form>
</uniflow:p_body>
</html:html>