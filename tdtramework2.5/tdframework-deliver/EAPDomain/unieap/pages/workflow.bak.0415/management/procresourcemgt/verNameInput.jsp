<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
<uniflow:style></uniflow:style>
	<%
		String selectedID = request.getParameter("selectedID");
	%>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
	<script language="javascript">
function createNewVersion_onclick(){
var selectedID = "<%=selectedID%>";
var v = document.forms[0].procTemVersion.value;
window.opener.formSubmit("createNewVersion",v);
self.close();
}

function cancel_onclick(){
  self.close();
}
function setFocus(){
document.forms[0].procTemVersion.focus();
}
</script>
<jsp:include
		page="/unieap/pages/workflow/stylesheet/style2009/using3levelMenuCss.jsp"></jsp:include>
</head>

<body onload="setFocus()">
	<html:form action="procVerManagement.do">
		<table>
			<tr>
				<td class="main_label_td" valign="middle" nowrap>
					<bean:message bundle="uniflow"
						key="workflow.procdef.procTemVersion" />
					：
				</td>
				<td class="main_label_td" valign="middle" nowrap>
					<html:text property="procTemVersion" styleClass="input_text300" />
				</td>
			</tr>
		</table>
		<table align="right">
			<tr>
				<td>
					<uniflow:button id="createinitiate"
						action="javascript:createNewVersion_onclick()"
						name="button.ok" />
					<uniflow:button id="cancel" action="javascript:cancel_onclick()"
						name="button.cancel" />
				</td>
			</tr>
		</table>
		<html:hidden property="operation" />
	</html:form>

</body>
</html:html>