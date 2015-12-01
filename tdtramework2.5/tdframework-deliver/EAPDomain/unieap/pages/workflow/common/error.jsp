<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<html>
	<body bgcolor="#ffffff">
		<table>
			<tr height="20" valign="middle">
				<td style="font-weight: bold;font-size:15px;color:#000000">
					<bean:message bundle="uniflow" key="workflow.common.error.title" />
				</td>
			</tr>
			<tr height="25" valign="top">
				<td style="font-size:13px;color:#000000">
					<bean:message bundle="uniflow" key="workflow.common.error.detail" />
				</td>
			</tr>
			<tr height="35" valign="top">
				<td style="font-size:13px;">&nbsp;&nbsp;
					<uniflow:error />
				</td>
			</tr>
		</table>	
		
	</body>
</html>