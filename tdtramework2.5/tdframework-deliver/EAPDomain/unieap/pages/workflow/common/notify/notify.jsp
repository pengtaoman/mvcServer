<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">

<head>
	<title>任务通知</title>
	<uniflow:style />
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
	<script language="javascript">
	
function button_onclick(action)
{
  if(notifyForm.ifemail.checked&&notifyForm.email.value=="")
  {
  warning_info.innerHTML = "<%=MessageUtil.getString("workflow.common.notify.notify.checked.mail.null",request.getSession())%>";
  return ;
  }
  if(notifyForm.ifphone.checked&&notifyForm.phone.value=="")
  {
  warning_info.innerHTML = "<%=MessageUtil.getString("workflow.common.notify.notify.checked.phone.null",request.getSession())%>";
  return ;
  }
  notifyForm.action.value = action;
  document.notifyForm.submit();    
}

 function onload()
{
  var flag = "<%=request.getAttribute("flag")%>";
  if(flag == "success")
  { 
    alert("<%=MessageUtil.getString("workflow.save.success",request.getSession())%>");
    refresh();
  }
  
 }

</script>
<jsp:include
		page="/unieap/pages/workflow/stylesheet/style2009/3levelMenuShared.jsp"></jsp:include>
</head>

<body onload="javascript:onload()">
	<uniflow:m_form action="notifypref.do">
		
		<table border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td>
					<uniflow:tab >
						<uniflow:tabElement messageKey="workflow.common.notify.notify.title"
							selected="true" action="javascript:button_onclick('notify')" />
						<td></td>
					</uniflow:tab>

					<uniflow:p_content_wrapper>
						<uniflow:p_warning>
							<html:errors />
						</uniflow:p_warning>

						<uniflow:p_content_table>
							<uniflow:p_content_tr>
								<td class="main_label_td" valign="middle" nowrap>
									<html:checkbox property="ifemail" />
									<bean:message bundle="uniflow"
										key="workflow.notify.mail" />
								</td>
								<td class="main_label_td" valign="middle" nowrap>
									<html:text property="email" styleClass="input_text200"/>
								</td>
							</uniflow:p_content_tr>
							<uniflow:p_content_tr>
								<td class="main_label_td" valign="middle" nowrap>
									<html:checkbox property="ifphone" />
									<bean:message bundle="uniflow" key="workflow.notify.phone" />
								</td>
								<td class="main_label_td" valign="middle" nowrap>
									<html:text property="phone" styleClass="input_text200" />
								</td>
							</uniflow:p_content_tr>
							<uniflow:p_content_tr>
								<td class="main_label_td" valign="middle" nowrap>
									<html:checkbox property="ifalert" />
									<bean:message bundle="uniflow"
										key="workflow.notify.alert" />
								</td>
								<td class="main_label_td" valign="middle" nowrap>
								</td>
							</uniflow:p_content_tr>
						</uniflow:p_content_table>
					</uniflow:p_content_wrapper>

					<uniflow:p_action>
						<uniflow:button id="ok" action="javascript:button_onclick('OK')"
							name="button.ok"></uniflow:button>
					</uniflow:p_action>

					<html:hidden property="action" />

				</td>
			</tr>
		</table>
	</uniflow:m_form>
</body>
</html:html>