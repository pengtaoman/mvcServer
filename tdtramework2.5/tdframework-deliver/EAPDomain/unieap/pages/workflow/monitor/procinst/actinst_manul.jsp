<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.neusoft.uniflow.api.handler.NWActInst"%>
<%@ page import="com.neusoft.uniflow.web.util.CommonInfoManager"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>

<%NWActInst actinstInfo = (NWActInst) request
					.getAttribute("actinstInfo");
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
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.instance.id"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getActInstID()%>&nbsp;</td>
			</tr>
			<tr>				
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.instance.name"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getName()%>&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.instance.category"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getCategory()%>&nbsp;</td>
			</tr>
			<tr>				
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.instance.des"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getDescription()%>&nbsp;</td>
			</tr>
			<tr bgcolor="#EFEFEF" valign="middle" style="font-weight:bold;">
				<td class="main_label_td" valign="middle" nowrap ><bean:message bundle="uniflow" key = "workflow.monitor.procinst.advance"/></td>
				<td class="main_label_td" valign="middle" nowrap >&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.rule"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=CommonInfoManager.getRuleInfo(actinstInfo.getParallelType(),session)%>&nbsp;</td>
			</tr>
			<tr>				
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.instance.state"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=CommonInfoManager.getStateStr(actinstInfo.getCurState(),session)%>&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.instance.starttime"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getStartTimeString()%>&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.instance.plancompletetime"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=CommonInfoManager.calculatePlanTime(actinstInfo.getStartTime(),actinstInfo.getLimitTime())%>&nbsp;</td>
			</tr>
			<tr>				
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.instance.endtime"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getCompleteTimeString()%>&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.limit.time"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getLimitTime()%>&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.workitem.overtimeday"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=CommonInfoManager.changeMinuteToDay(actinstInfo.getProlongTime()) %>&nbsp;</td>
			</tr>
			
			<tr>				
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.instance.pri"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getPriority()%>&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.application.id"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getAppDefID()%>&nbsp;</td>
			</tr>
			<tr>				
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.overtime.action"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=CommonInfoManager.getOverTimeAction(actinstInfo.getOvertimeAction(),session)%>&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.overtime.application"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getOvertimeAppDefID()%>&nbsp;</td>
			</tr>
			<tr>				
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.instance.overdue.count"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getOvertimeCount()%>&nbsp;</td>
			</tr>
			<tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.previous.condition"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getPreCondition()%>&nbsp;</td>
			</tr>
			<tr>				
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.back.condition"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getPostCondition()%>&nbsp;</td>
			</tr>
			<!--  <tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.instance.previous.activity"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actinstInfo.getPreActInstID()%>&nbsp;</td>
			</tr>
			-->
</table>
</body>
</html:html>