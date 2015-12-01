<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
	<title><bean:message bundle="uniflow" key="workflow.popup" />
	</title>
	<uniflow:style />
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
</head>

<body
	background="<%=WorkflowManager.getWorkflowStylePath()%>/style1/main_img/tcbg2.gif"
	leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
	<table width="100%" border="0" cellspacing="0" cellpadding="0"
		class="lable" height="75">
		<tr align="left" valign="middle" height="50">
			<td style="font-size:14px;font-weight:bold;color:#0000cc">&nbsp;&nbsp;
				<bean:message bundle="uniflow" key="workflow.common.display.noexit" />
			</td>
		</tr>
		<tr align="left" valign="middle" height="25">
			<td style="font-size:13px;color:#0000cc">&nbsp;&nbsp;&nbsp;&nbsp;
                <bean:message bundle="uniflow" key="workflow.common.display.reason" /><br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<bean:message bundle="uniflow" key="workflow.common.display.reason1" /><br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<bean:message bundle="uniflow" key="workflow.common.display.reason2" /><br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<bean:message bundle="uniflow" key="workflow.common.display.reason3" /><br>
			</td>
		</tr>
	</table>
</body>
</html:html>