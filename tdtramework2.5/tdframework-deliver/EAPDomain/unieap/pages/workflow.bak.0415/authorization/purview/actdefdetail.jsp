<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.neusoft.uniflow.api.def.NWActDef"%>
<%@ page import="com.neusoft.uniflow.web.util.CommonInfoManager"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>

<%NWActDef actdefInfo = (NWActDef) request.getAttribute("actdefInfo");%>

<html:html locale="true">
<head>
<uniflow:style />
<script/>
</head>
<uniflow:p_body width="610">
   <uniflow:m_table style="main_title_table">
     <td nowrap class="text_title" >&nbsp;</td>
   </uniflow:m_table>
	<uniflow:p_content_comm_wrapper width="100%">
		<uniflow:p_content_table>
			<tr bgcolor="#EFEFEF" valign="middle" style="font-weight:bold;">
				<td class="main_label_td" valign="middle" nowrap width="75"><bean:message bundle="uniflow" key = "workflow.monitor.procinst.common"/></td>
				<td class="main_label_td" valign="middle" nowrap width="200">&nbsp;</td>
				<td class="main_label_td" valign="middle" nowrap width="75">&nbsp;</td>
				<td class="main_label_td" valign="middle" nowrap width="200">&nbsp;</td>
			</tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" width="75" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.templete.id"/></td>
				<td class="main_label_td" valign="middle" width="200" nowrap><%=actdefInfo.getID()%>&nbsp;</td>
				<td class="main_label_td" valign="middle" width="75" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.name"/></td>
				<td class="main_label_td" valign="middle" width="200" nowrap><%=actdefInfo.getName()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>				
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.description"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getDescription()%>&nbsp;</td>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.application.id"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getAppID()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<tr bgcolor="#EFEFEF" valign="middle" style="font-weight:bold;">
				<td class="main_label_td" valign="middle" nowrap width="75"><bean:message bundle="uniflow" key = "workflow.monitor.procinst.advance"/></td>
				<td class="main_label_td" valign="middle" nowrap width="200">&nbsp;</td>
				<td class="main_label_td" valign="middle" nowrap width="75">&nbsp;</td>
				<td class="main_label_td" valign="middle" nowrap width="200">&nbsp;</td>
			</tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.category"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getCategory()%>&nbsp;</td>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.message.receive"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getMsgReceiver()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.operation.level"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=CommonInfoManager.getOperInfo(actdefInfo.getOperationLevel(),session)%>&nbsp;</td>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.rule"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=CommonInfoManager.getRuleInfo(actdefInfo.getParallelRule(),session)%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.overtime.action"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=CommonInfoManager.getOverTimeAction(actdefInfo.getOvertimeAction(),session)%>&nbsp;</td>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.overtime.application"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getOvertimeAppID()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.previous.condition"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getPreCondition()%>&nbsp;</td>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.back.condition"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getPostCondition()%>&nbsp;</td>
			</uniflow:p_content_tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.limit.time"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getLimitTime()%>&nbsp;</td>
				<td class="main_label_td" valign="middle" nowrap>&nbsp;</td>
				<td class="main_label_td" valign="middle" nowrap>&nbsp;</td>
			</uniflow:p_content_tr>			
						<tr bgcolor="#EFEFEF" valign="middle" style="font-weight:bold;">
				<td class="main_label_td" valign="middle" nowrap width="75"><bean:message bundle="uniflow" key = "workflow.monitor.procinst.extend"/></td>
				<td class="main_label_td" valign="middle" nowrap width="195">&nbsp;</td>
				<td class="main_label_td" valign="middle" nowrap width="75">&nbsp;</td>
				<td class="main_label_td" valign="middle" nowrap width="195">&nbsp;</td>
			</tr>
			<uniflow:p_content_tr>
				<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.activity.defination.extend.attribute"/></td>
				<td class="main_label_td" valign="middle" nowrap><%=actdefInfo.getExtProp()%>&nbsp;</td>
				<td class="main_label_td" valign="middle" nowrap>&nbsp;</td>
				<td class="main_label_td" valign="middle" nowrap>&nbsp;</td>
			</uniflow:p_content_tr>
		</uniflow:p_content_table>
	</uniflow:p_content_comm_wrapper>
	<uniflow:p_action>
        <uniflow:button id="cancel" action="javascript:window.close()" name="button.close"></uniflow:button>
    </uniflow:p_action>
    <table>
       <td height="20"></td>
    </table>
</uniflow:p_body>
</html:html>