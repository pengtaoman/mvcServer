<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.neusoft.uniflow.api.def.NWActDef"%>
<%@ page import="com.neusoft.uniflow.web.util.CommonInfoManager"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>

<%NWActDef actdefInfo = (NWActDef) request.getAttribute("actdefInfo");
%>

<html:html locale="true">
<head>
<uniflow:style />
</head>
<body  style="background-color:#EEEEEE;margin-left:0px;margin-top: 0px;margin-right:0px;margin-bottom: 0px;scrollbar-face-color: #D8E2E7;
scrollbar-shadow-color: #EEEEEE; scrollbar-highlight-color: #EEEEEE;scrollbar-3dlight-color: #EEEEEE;
scrollbar-darkshadow-color: #EEEEEE;scrollbar-track-color: #EEEEEE;scrollbar-arrow-color: #606D79;">
<table width="300" valign="left" bgcolor="#EEEEEE">
			<tr bgcolor="#EFEFEF" valign="middle" style="font-weight:bold;">
				<td class="main_label_td" valign="middle" nowrap ><bean:message bundle="uniflow" key = "workflow.monitor.procinst.common"/></td>
				<td class="main_label_td" valign="middle" nowrap >&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.templete.id"/></td>
				<td class="main_label_td" valign="middle"  nowrap><%=actdefInfo.getID()%>&nbsp;</td>
			</tr>
			<tr>				
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.name"/></td>
				<td class="main_label_td" valign="middle"  nowrap><%=actdefInfo.getName()%>&nbsp;</td>
			</tr>
			<tr>				
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.description"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getDescription()%>&nbsp;</td>
			</tr>
			<tr>				
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.type"/></td>
				<td class="main_label_td" valign="middle" nowrap>自动节点</td>
			</tr>
			<tr>				
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.application.id"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getAppID()%>&nbsp;</td>
			</tr>
			<tr bgcolor="#EFEFEF" valign="middle" style="font-weight:bold;">
				<td class="main_label_td" valign="middle" nowrap ><bean:message bundle="uniflow" key = "workflow.monitor.procinst.advance"/></td>
				<td class="main_label_td" valign="middle" nowrap >&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.category"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getCategory()%>&nbsp;</td>
			</tr>
			<tr>				
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.message.receive"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getMsgReceiver()%>&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.overtime.action"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=CommonInfoManager.getOverTimeAction(actdefInfo.getOvertimeAction(),session)%>&nbsp;</td>
			</tr>
			<tr>				
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.overtime.application"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getOvertimeAppID()%>&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.previous.condition"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getPreCondition()%>&nbsp;</td>
			</tr>
			<tr>				
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.back.condition"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getPostCondition()%>&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.limit.time"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getLimitTime()%>&nbsp;</td>
			</tr>			
			<tr bgcolor="#EFEFEF" valign="middle" style="font-weight:bold;">
				<td class="main_label_td" valign="middle" nowrap ><bean:message bundle="uniflow" key = "workflow.monitor.procinst.extend"/></td>
				<td class="main_label_td" valign="middle" nowrap >&nbsp;</td>

			</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.extend.attribute"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getExtProp()%>&nbsp;</td>
			</tr>
</table>
</body>
</html:html>