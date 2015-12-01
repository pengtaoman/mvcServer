<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>

<html:html locale="true">
<head>
<uniflow:style />
</head>
<body  style="background-color:#EEEEEE;margin-left:0px;margin-top: 0px;margin-right:0px;margin-bottom: 0px;scrollbar-face-color: #D8E2E7;
scrollbar-shadow-color: #EEEEEE; scrollbar-highlight-color: #EEEEEE;scrollbar-3dlight-color: #EEEEEE;
scrollbar-darkshadow-color: #EEEEEE;scrollbar-track-color: #EEEEEE;scrollbar-arrow-color: #606D79;">
			<table width="300">
			<tr bgcolor="#EFEFEF" valign="middle" style="font-weight:bold;">
				<td class="main_label_td" align="left"valign="middle" width="75"><bean:message bundle="uniflow" key = "workflow.monitor.procinst.event.var"/></td>
				<td class="main_label_td" align="left"valign="middle" >&nbsp;</td>
			</tr>
			<tr>			
				<td class="main_label_td" align="left"valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.monitor.procinst.event.key"/></td>
				<td class="main_label_td" align="left" valign="middle" nowrap><bean:write name="key" />&nbsp;</td>
			</tr>			
			<tr>
				<td class="main_label_td" align="left"valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.monitor.procinst.event.type"/></td>
				<td class="main_label_td" align="left"valign="middle" nowrap><bean:write name="etype" />&nbsp;</td>				
			</tr>			
			<tr>			
				<td class="main_label_td" align="left"valign="middle" nowrap><bean:message bundle="uniflow" key = "workflow.monitor.procinst.event.value"/></td>				
				<td class="main_label_td" align="left"valign="middle" nowrap><bean:write name="evalue" />&nbsp;</td>
			</tr>		
		</table>
		<table width="300"><tr><td>
		<uniflow:m_table style="main_list">  
                    <uniflow:order_th value="workflow.monitor.procinst.reldate"/>   
                    <uniflow:order_th value="workflow.monitor.procinst.event.direct"/>    
                    <uniflow:order_th value="workflow.monitor.procinst.event.var"/> 
			<logic:iterate id="event" name="events" indexId="index"
				type="com.neusoft.uniflow.web.monitor.procinst.beans.EventVarBean">
				<tr>
					<td valign="middle" class="main_list_td"><bean:write name="event"
						property="inVar" /></td>
					<td valign="middle" class="main_list_td"><bean:write name="event"
						property="direct" /></td>
					<td valign="middle" class="main_list_td"><bean:write name="event"
						property="outVar" />&nbsp;</td>
				</tr>
			</logic:iterate>
		</uniflow:m_table></td></tr>
		</table>
</body>
</html:html>