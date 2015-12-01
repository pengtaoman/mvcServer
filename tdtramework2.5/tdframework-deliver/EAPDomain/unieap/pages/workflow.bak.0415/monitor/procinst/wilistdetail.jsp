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
			   <uniflow:m_table style="main_list">  
                    <uniflow:order_th value="workflow.monitor.process.workitem.user"/>   
                    <uniflow:order_th value="workflow.workitem.state"/>    
                    <uniflow:order_th value="workflow.workitem.completetime"/> 
			<logic:iterate id="wi" name="wis" indexId="index"
				type="com.neusoft.uniflow.web.monitor.procinst.beans.WorkItemBean">
				<tr>
					<td valign="middle" class="main_list_td">
						<bean:write name="wi" property="username" />
					</td>
					<td valign="middle" class="main_list_td">
						<bean:write name="wi" property="curstate" />
					</td>
					<td valign="middle" class="main_list_td">
						<bean:write name="wi" property="completetime" />
					</td>
				</tr>				
			</logic:iterate>
			</uniflow:m_table>
</body>
</html:html>