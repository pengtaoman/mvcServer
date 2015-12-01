<%@ page contentType="text/html; charset=UTF-8" import="java.util.*"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%
 String picBase = request.getContextPath() + "/unieap/pages/workflow/stylesheet/style2009/";
 %>
<html:html locale="true">
<head>
<title>配置</title>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="Thu,  01 Jan   1970 00:00:01 GMT">
<uniflow:style />
<link href="<%=picBase%>style09.css" rel="stylesheet" type="text/css" />
<script language="javascript" src="<%=picBase%>2levelMenuShared.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="javascript">
function button_onclick(action)
{
 if (action =="OK") {
  	var password = "<%=request.getAttribute("password")%>";
  	if(password!=prefForm.oldpass.value){
     	warning_info.innerHTML = "<%=MessageUtil.getString("workflow.common.preference.changepwd.oldpass.checked",request.getSession())%>";
  	}else if (prefForm.newpass.value!=prefForm.confpass.value){
     	warning_info.innerHTML ="<%=MessageUtil.getString("workflow.common.preference.changepwd.confpass.checked",request.getSession())%>";
  	}else{
     	prefForm.action.value = action;
     	document.prefForm.submit();
  	}
  }
  else 
  {  prefForm.action.value = action;
     document.prefForm.submit();
    
  }
}

function onload()
{
  var action = "<%=request.getAttribute("close_flag")%>";
  //alert("onload "+action);
  if(action == "close")
  {
    opener.refresh();
    window.close();
  }

}
</script>

</head>

<uniflow:p_body onload="javascript:onload()">
	<html:form action="pwdpref.do">
      <uniflow:tab width="85%">
			<uniflow:tabElement messageKey="workflow.common.preference.general"
				selected="false" action="javascript:button_onclick('general')" />
			<uniflow:tabElement messageKey="workflow.common.preference.password"
				selected="true" action="javascript:button_onclick('password')" />
			<td></td>
		</uniflow:tab> <uniflow:p_content_wrapper>

			<uniflow:p_warning>
				<html:errors />
			</uniflow:p_warning>

			<uniflow:p_content_table>
				<uniflow:p_content_tr>
					<td width="45%" height="25">&nbsp;&nbsp;<bean:message
						bundle="uniflow" key="workflow.common.preference.changepwd.oldpass" /></td>
					<td width="55%">&nbsp;&nbsp;<html:password property="oldpass" />&nbsp;
					</td>
				</uniflow:p_content_tr>
				<uniflow:p_content_tr>
					<td height="25">&nbsp;&nbsp;<bean:message bundle="uniflow"
						key="workflow.common.preference.changepwd.newpass" /></td>
					<td>&nbsp;&nbsp;<html:password property="newpass" />&nbsp;</td>
				</uniflow:p_content_tr>
				<uniflow:p_content_tr>
					<td height="25">&nbsp;&nbsp;<bean:message bundle="uniflow"
						key="workflow.common.preference.changepwd.confpass" /></td>
					<td>&nbsp;&nbsp;<html:password property="confpass" /></td>
				</uniflow:p_content_tr>
			</uniflow:p_content_table>
		</uniflow:p_content_wrapper> <uniflow:p_action>
			<uniflow:button id="ok" action="javascript:button_onclick('OK')" > <bean:message bundle="uniflow" key="button.ok"/></uniflow:button>
			<uniflow:button id="cancel" action="javascript:window.close()" > <bean:message bundle="uniflow" key="button.cancel"/></uniflow:button>
		</uniflow:p_action>

		<html:hidden property="action" />
	</html:form>
</uniflow:p_body>
</html:html>