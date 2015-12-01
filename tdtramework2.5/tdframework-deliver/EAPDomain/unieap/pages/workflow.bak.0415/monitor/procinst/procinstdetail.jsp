<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.neusoft.uniflow.api.handler.NWProcInst"%>
<%@ page import="com.neusoft.uniflow.web.util.CommonInfoManager"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>

<%NWProcInst procInfo = (NWProcInst) request.getAttribute("procInfo");%>

<html:html locale="true">
<head>
<uniflow:style />
</head>
<body  style="background-color:#EEEEEE;margin-left:0px;margin-top: 0px;margin-right:0px;margin-bottom: 0px;scrollbar-face-color: #D8E2E7;
scrollbar-shadow-color: #EEEEEE; scrollbar-highlight-color: #EEEEEE;scrollbar-3dlight-color: #EEEEEE;
scrollbar-darkshadow-color: #EEEEEE;scrollbar-track-color: #EEEEEE;scrollbar-arrow-color: #606D79;">
<table width="300" valign="left" bgcolor="#EEEEEE">
			<tr bgcolor="#EFEFEF" valign="left" style="font-weight:bold;" >
				<td class="main_label_td" valign="left"><bean:message bundle="uniflow" key = "workflow.monitor.procinst.common"/></td>
				<td class="main_label_td" valign="left">&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="left"><bean:message bundle="uniflow" key = "workflow.monitor.procinst.instance.name"/></td>
				<td class="main_label_td" valign="left" ><%=procInfo.getName()%>&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="left" ><bean:message bundle="uniflow" key = "workflow.monitor.procinst.instance.id"/></td>
				<td class="main_label_td" valign="left" ><%=procInfo.getProcInstID()%></td>
			</tr>
			<tr>
				<td class="main_label_td" valign="left"  ><bean:message bundle="uniflow" key = "workflow.monitor.procinst.templete.id"/></td>
				<td class="main_label_td" valign="left" ><%=procInfo.getProcDefID()%>&nbsp;</td>
							</tr>
			<tr>
				<td class="main_label_td" valign="left" ><bean:message bundle="uniflow" key = "workflow.monitor.procinst.templete.name"/></td>
				<td class="main_label_td" valign="left"  ><%=procInfo.getProcDefName()%>&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="left" ><bean:message bundle="uniflow" key = "workflow.monitor.procinst.templete.version"/></td>
				<td class="main_label_td" valign="left" ><%=procInfo.getProcTempVersionName()%>&nbsp;</td>
							</tr>
			<tr>
				<td class="main_label_td" valign="left" ><bean:message bundle="uniflow" key = "workflow.monitor.procinst.templete.creator"/></td>
				<td class="main_label_td" valign="left" ><%=procInfo.getBuilder()%>&nbsp;</td>				
			</tr>
			<tr>
				<td class="main_label_td" valign="left" ><bean:message bundle="uniflow" key = "workflow.activity.defination.description"/></td>
				<td class="main_label_td" valign="left" ><%=procInfo.getDescription()%>&nbsp;</td>
							</tr>

			<tr bgcolor="#EFEFEF" valign="left" style="font-weight:bold;">
				<td class="main_label_td" valign="left"  ><bean:message bundle="uniflow" key = "workflow.monitor.procinst.advance"/></td>
				<td class="main_label_td" valign="left"  >&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="left" ><bean:message bundle="uniflow" key = "workflow.monitor.procinst.instance.creator"/></td>
				<td class="main_label_td" valign="left" ><%=CommonInfoManager.getMemberInfo(procInfo.getCreater())%>&nbsp;</td>
							</tr>
			<tr>
				<td class="main_label_td" valign="left" ><bean:message bundle="uniflow" key = "workflow.monitor.procinst.instance.createtime"/></td>
				<td class="main_label_td" valign="left" ><%=procInfo.getStartTimeString()%>&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="left" ><bean:message bundle="uniflow" key = "workflow.activity.instance.endtime"/></td>
				<td class="main_label_td" valign="left" ><%=procInfo.getCompleteTimeString()%>&nbsp;</td>
							</tr>
			<tr>
				<td class="main_label_td" valign="left" ><bean:message bundle="uniflow" key = "workflow.monitor.procinst.instance.state"/></td>
				<td class="main_label_td" valign="left" ><%=CommonInfoManager.getStateStr(procInfo.getCurState(),session)%>&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="left" ><bean:message bundle="uniflow" key = "workflow.activity.defination.type"/></td>
				<td class="main_label_td" valign="left" ><%=CommonInfoManager.getSubTypeStr(procInfo.getType(),session)%>&nbsp;</td>
							</tr>
			<tr>
				<td class="main_label_td" valign="left" ><bean:message bundle="uniflow" key = "workflow.activity.instance.pri"/></td>
				<td class="main_label_td" valign="left" ><%=procInfo.getPriority()%>&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="left" ><bean:message bundle="uniflow" key = "workflow.activity.defination.limit.time"/></td>
				<td class="main_label_td" valign="left" ><%=procInfo.getLimitTime()%>&nbsp;</td>
							</tr>
			<tr>
				<td class="main_label_td" valign="left" ><bean:message bundle="uniflow" key = "workflow.activity.defination.overtime.action"/></td>
				<td class="main_label_td" valign="left" ><%=CommonInfoManager.getOverTimeAction(procInfo.getOvertimeAction(),session)%>&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="left" ><bean:message bundle="uniflow" key = "workflow.activity.defination.overtime.application"/></td>
				<td class="main_label_td" valign="left" ><%=procInfo.getOvertimeAppDefID()%>&nbsp;</td>
							</tr>
			<tr>
				<td class="main_label_td" valign="left" ><bean:message bundle="uniflow" key = "workflow.activity.defination.previous.condition"/></td>
				<td class="main_label_td" valign="left" ><%=procInfo.getPreCondition()%>&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="left" ><bean:message bundle="uniflow" key = "workflow.activity.defination.back.condition"/></td>
				<td class="main_label_td" valign="left" ><%=procInfo.getPostCondition()%>&nbsp;</td>
							</tr>
			<tr>
				<td class="main_label_td" valign="left" ><bean:message bundle="uniflow" key = "workflow.activity.defination.category"/></td>
				<td class="main_label_td" valign="left" ><%=procInfo.getCategory()%>&nbsp;</td>
			</tr>
</table>

</body>
</html:html>