<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>

<html:html locale="true">
<head>
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
	<script language="javascript">
</script>
</head>
<uniflow:p_body width="92%">
	<uniflow:p_title>
     相关数据列表
</uniflow:p_title>
	<uniflow:p_content_comm_wrapper width="100%">
		<uniflow:p_content_table>
			<tr bgcolor="#EFEFEF" valign="middle" style="font-weight:bold;">
				<td width="50%" align="center" valign="middle" bgcolor="#EFEFEF">
					变量名称
				</td>
				<td width="50%" align="center" valign="middle" bgcolor="#EFEFEF">
					变量值
				</td>
			</tr>
			<logic:iterate id="rd" name="rds" indexId="index"
				type="com.neusoft.uniflow.api.handler.NWRelDataInst">
				<tr>
					<td class="main_label_td" valign="middle" nowrap>
						<bean:write name="rd" property="name" />
					</td>
					<td class="main_label_td" valign="middle" nowrap>
						<bean:write name="rd" property="value" />
					</td>
				</tr>
			</logic:iterate>
		</uniflow:p_content_table>
	</uniflow:p_content_comm_wrapper>
	<uniflow:p_action>
		<uniflow:button id="cancel" action="javascript:window.close()"
			name="关闭"></uniflow:button>
	</uniflow:p_action>
	<table>
		<td height="20"></td>
	</table>
</uniflow:p_body>
</html:html>