<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
<title><bean:message bundle="uniflow" key = "workflow.popup"/></title>
	<uniflow:style />
</head>
<body>
	<table width="100%" align="center" height="">
		<tr height="30" bgcolor="#ffffff">
			<td valign="middle" align="center" height="30" style="font-weight:bold;font-size:14px;color:#0000CC">
				&nbsp;<uniflow:button id="viewer" name="button.close" action="javascript:top.window.close();"/>
			</td>
		</tr>
	</table>
</body>
</html:html>