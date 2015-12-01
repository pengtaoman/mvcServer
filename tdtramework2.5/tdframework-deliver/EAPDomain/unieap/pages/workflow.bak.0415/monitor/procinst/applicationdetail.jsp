<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.neusoft.uniflow.api.mgmt.NWRunTimeApplication"%>
<%@ page import="com.neusoft.uniflow.web.util.CommonInfoManager"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%NWRunTimeApplication appInfo = (NWRunTimeApplication) request
					.getAttribute("appInfo");
%>
<html:html locale="true">
<head>
<uniflow:style />
</head>
<body style="background-color:#EEEEEE;margin-left:0px;margin-top: 0px;margin-right:0px;margin-bottom: 0px;scrollbar-face-color: #D8E2E7;
scrollbar-shadow-color: #EEEEEE; scrollbar-highlight-color: #EEEEEE;scrollbar-3dlight-color: #EEEEEE;
scrollbar-darkshadow-color: #EEEEEE;scrollbar-track-color: #EEEEEE;scrollbar-arrow-color: #606D79;">
<table width="300" valign="left" bgcolor="#EEEEEE">
			<tr bgcolor="#EFEFEF" valign="middle" style="font-weight:bold;">
				<td class="main_label_td" valign="middle" nowrap ><bean:message bundle="uniflow" key = "workflow.monitor.procinst.common"/></td>
				<td class="main_label_td" valign="middle" nowrap >&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.procinst.procinstID"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=appInfo.getProcInstID()%></td>
							</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.instance.id"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=appInfo.getActInstID()%></td>
			</tr>
			<tr bgcolor="#EFEFEF" valign="middle" style="font-weight:bold;">
				<td class="main_label_td" valign="middle" nowrap ><bean:message bundle="uniflow" key = "workflow.monitor.procinst.advance"/></td>
				<td class="main_label_td" valign="middle" nowrap ">&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message
					bundle="uniflow" key="workflow.system.appliaction.actname" />£º</td>
				<td class="main_label_td" valign="middle" nowrap><%=appInfo.getActName()%></td>
							</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message
					bundle="uniflow" key="workflow.system.appliaction.actState" />£º</td>
				<td class="main_label_td" valign="middle" nowrap><%=CommonInfoManager.getStateStr(appInfo
									.getActState(),session)%></td>
			</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message
					bundle="uniflow" key="workflow.system.appliaction.appname" />£º</td>
				<td class="main_label_td" valign="middle" nowrap><%=appInfo.getAppName()%></td>
							</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message
					bundle="uniflow" key="workflow.system.appliaction.appBuilder" />£º</td>
				<td class="main_label_td" valign="middle" nowrap><%=appInfo.getAppBuilder()%>&nbsp;</td>
			</tr>

			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message
					bundle="uniflow" key="workflow.system.appliaction.appSynchMode" />£º</td>
				<td class="main_label_td" valign="middle" nowrap><%=CommonInfoManager.getSynchModeStr(appInfo
							.getAppSynchMode(),session)%></td>
										</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message
					bundle="uniflow" key="workflow.system.appliaction.appLoc" />£º</td>
				<td class="main_label_td" valign="middle" nowrap><%=CommonInfoManager.getAppLocStr(appInfo.getAppLoc(),session)%></td>
			</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message
					bundle="uniflow" key="workflow.system.appliaction.msgAppType" />£º</td>
				<td class="main_label_td" valign="middle" nowrap><%=appInfo.getMsgAppType()%>&nbsp;</td>
							</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message
					bundle="uniflow" key="workflow.system.appliaction.appType" />£º</td>
				<td class="main_label_td" valign="middle" nowrap><%=appInfo.getAppType()%>&nbsp;</td>
			</tr>

			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message
					bundle="uniflow" key="workflow.system.appliaction.appHost" />£º</td>
				<td class="main_label_td" valign="middle" nowrap><%=appInfo.getAppHost()%>&nbsp;</td>
							</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message
					bundle="uniflow" key="workflow.system.appliaction.appURL" />£º</td>
				<td class="main_label_td" valign="middle" nowrap><%=appInfo.getAppURL()%>&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message
					bundle="uniflow" key="workflow.system.appliaction.appdesc" />£º</td>
				<td class="main_label_td" valign="middle" nowrap><%=appInfo.getAppDesc()%>&nbsp;</td>
			</tr>
</table>
</body>
</html:html>