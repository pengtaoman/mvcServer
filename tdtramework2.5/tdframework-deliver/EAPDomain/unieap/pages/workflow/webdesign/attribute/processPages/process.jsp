<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page
	import="com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.procForms.ProcForm"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String xmlStr = ((String) request.getAttribute("xmlStr"));
	String id = ((String) request.getAttribute("id"));
%>
<html:html locale="true">
<head>
	<title>属性页</title>
	<script type="text/javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
	<LINK
		href="<%=WorkflowManager.getWorkflowPath()%>/stylesheet/Style.css"
		rel=stylesheet>
	<script type="text/javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/process.js"></script>
	<script type="text/javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/conditions.js"></script>
	<script type="text/javascript">
    function LoadName(){ 
    	  initPage();
          var action = '<%=request.getAttribute("close_flag")%>';
          if(action == "close"){
            var xmlStr = document.procForm.xmlStr.value;
             var id = '<%=request.getAttribute("id")%>';
             window.close();
             opener.callFlex(xmlStr , id);
          }
          document.getElementById('path').value = '<%=path%>';
    }
    </script>
</head>
<body onLoad="LoadName()">
	<br>
	<html:form action="toProc.do">
		<div class="main_label_outline" style="width: 540px">

			<table style="width: 520px" class="main_label_table">
				<tr>
					<td align="left" style="width: 90px">
						ID:
					</td>
					<td>
						<html:text property="id" readonly="true" style="width:400px;"
							styleClass="input_underline"
							value='<%=((ProcForm) request.getAttribute("ProcForm"))
										.getId()%>'>
						</html:text>
					</td>
				</tr>
				<tr>
					<td align="left" style="width: 90px">
						<bean:message bundle="uniflow" key="workflow.webdesign.name" />
					</td>
					<td>
						<html:text property="name" style="width:400px;"
							styleClass="input_underline"
							value='<%=((ProcForm) request.getAttribute("ProcForm"))
										.getName()%>'>
						</html:text>
						*
					</td>
				</tr>
				<tr>
					<td valign="top" style="width: 90px">
						<bean:message bundle="uniflow" key="workflow.webdesign.describe" />
					</td>
					<td>
						<html:textarea property="desc" style="width:400px;" rows="5"
							styleClass="input_text"
							value='<%=((ProcForm) request.getAttribute("ProcForm"))
										.getDesc()%>'>
						</html:textarea>
					</td>
				</tr>
			</table>
			<table style="width: 510px" class="main_label_table">
				<tr>
					<td style="width:90px">
						创建者:
					</td>
					<td>
						<html:text property="builder" style="width:145px;" disabled="false"
							styleClass="input_text"
							value='<%=((ProcForm) request.getAttribute("ProcForm"))
										.getBuilder()%>'>
						</html:text>
					</td>
					<td style="width:90px"> 
						版本:
					</td>
					<td>
						<html:text property="versionName" style="width:145px;"
							disabled="true" styleClass="input_text"
							value='<%=((ProcForm) request.getAttribute("ProcForm"))
										.getVersionName()%>'>
						</html:text>
					</td>
				</tr>
				<tr>
					<td style="width:90px">
						创建时间:
					</td>
					<td>
						<html:text property="buildTime" style="width:145px;"
							disabled="true" styleClass="input_text"
							value='<%=((ProcForm) request.getAttribute("ProcForm"))
										.getBuildTime()%>'>
						</html:text>
					</td>
					<td style="width:90px">
						修改时间:
					</td>
					<td>
						<html:text property="modifiedTime" style="width:145px;"
							disabled="true" styleClass="input_text"
							value='<%=((ProcForm) request.getAttribute("ProcForm"))
										.getModifiedTime()%>'>
						</html:text>
					</td>
				</tr>
			</table>
			<table style="width: 550px" class="main_label_table">
				<tr>
					<td style="width: 90px">
						<bean:message bundle="uniflow"
							key="workflow.webdesign.bizcategory" />
					</td>
					<td>
						<html:text property="category" style="width:400px;"
							value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getCategory()%>' />
					</td>
				</tr>
				<tr>
					<td style="width: 90px">
						<bean:message bundle="uniflow"
							key="workflow.webdesign.extendProperty" />
					</td>
					<td>
						<html:text property="extendProperties" style="width:400px;"
							value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getExtendProperties()%>' />
					</td>
				</tr>
			</table>
			<table style="width: 510px" class="main_label_table">
				<tr>
					<td style="height: 30px; width: 90px">
						生存期:
					</td>
					<td style="">
						<a href="#" onclick="displaySurvival()">详细设置</a>
					</td>
				</tr>
				<tr>
					<td style="height: 30px; width: 90px">
						事件:
					</td>
					<td style="">
						<a href="#" onclick="displayEvents()">详细设置</a>
					</td>
				</tr>
				<tr>
					<td style="height: 30px; width: 90px">
						流程变量:
					</td>
					<td style="">
						<a href="#" onclick="displayVariableGrid()">详细设置</a>
					</td>
				</tr>
			</table>
			<table class="main_label_table">
				<tr>
					<td style="width: 90px" align="left">
						可创建者:
					</td>
					<td>
						<input type="text" id="validCreator" readonly="true"
							style="width: 375px;" class="input_underline"
							value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getValidCreatorsName()%>' />
					</td>
					<td valign="bottom">
						<a href="#" id="choice" onclick="displayPerson(1)"><bean:message
								bundle="uniflow" key="workflow.webdesign.choice" /> </a>
					</td>
				</tr>
			</table>
			<table class="main_label_table">
				<tr>
					<td style="width: 90px" align="left">
						可监控者:
					</td>
					<td>
						<input type="text" id="monitor" readonly="true"
							style="width: 375px;" class="input_underline"
							value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getMonitorsName()%>' />
					</td>
					<td valign="bottom">
						<a href="#" id="choice" onclick="displayPerson(0)"><bean:message
								bundle="uniflow" key="workflow.webdesign.choice" /> </a>
					</td>
				</tr>
			</table>
			<table class="main_label_table">
				<tr>
					<td style="height: 30px; width: 90px">
						前置条件:
					</td>
					<td>
						<html:text style="width: 375px;" readonly="true" property="preCondition"
							value='<%=((ProcForm) request
									.getAttribute("ProcForm"))
									.getPreCondition()%>' />
					</td>
					<td style="">
						<a href="#" onclick="displayConditions('preCondition')">设置</a>
					</td>
				</tr>
				<tr>
					<td style="height: 30px; width: 90px">
						后置条件:
					</td>
					<td>
						<html:text style="width: 375px;" readonly="true" property="postCondition"
							value='<%=((ProcForm) request
									.getAttribute("ProcForm"))
									.getPostCondition()%>' />
					</td>
					<td style="">
						<a href="#" onclick="displayConditions('postCondition')">设置</a>
					</td>
				</tr>
				
			</table>
			<table style="width: 510px" class="main_button">
				<tr>
					<td align="right">
						<input type="button" id="sub"
							value='<bean:message bundle="uniflow" key="workflow.webdesign.submit"/>'
							class="button_normal" onclick="submit_onclick()" />
						<input type="button"
							value='<bean:message bundle="uniflow" key="workflow.webdesign.cancel"/>'
							class="button_normal" onclick="window.close()" />
					</td>
				</tr>
			</table>

			<input type="hidden" id="path" value='<%=path%>' />
			<html:hidden property="msgReceiver"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getMsgReceiver()%>' />
			<html:hidden property="events"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getEvents()%>' />
			<input type="hidden" id="punit"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getPunit()%>' />
			<input type="hidden" id="munit"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getMunit()%>' />
			<input type="hidden" id="isNewVersion"
				value='<%=request.getAttribute("isNewVersion")%>' />
			<input type="hidden" id="operatable"
				value='<%=request.getAttribute("operatable")%>' />
			<input type="hidden" id="cType">
			<!-- 扩展属性 -->
			<html:hidden property="extendProperties"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getExtendProperties()%>' />
			<input type="hidden" id="punit"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getPunit()%>' />
			<input type="hidden" id="munit"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getMunit()%>' />
			<!-- 生存期的时间设置 -->
			<html:hidden property="duration"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getDuration()%>' />
			<!-- 预警的时间设置 -->
			<html:hidden property="alertDuration"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getAlertDuration()%>' />
			<!-- 生存期判断变量与简单 -->
			<html:hidden property="varOrDur"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getVarOrDur()%>' />
			<!-- 催办判断变量与简单 -->
			<html:hidden property="alertVarOrDur"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getAlertVarOrDur()%>' />
			<!-- 生存期的处理方式 -->
			<html:hidden property="actionType"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getActionType()%>' />
			<!-- 预警的处理方式 -->
			<html:hidden property="alertActionType"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getAlertActionType()%>' />
			<!-- 预警的间隔时间 -->
			<html:hidden property="alertActionInterval"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getAlertActionInterval()%>' />
			<!--生存期超时的应用程序  -->
			<html:hidden property="actionApplication"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getActionApplication()%>' />
			<!--生存期预警的应用程序  -->
			<html:hidden property="alertActionApplication"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getAlertActionApplication()%>' />
			<!--生存期变量-->
			<html:hidden property="variable"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getVariable()%>' />
			<!--预警变量  -->
			<html:hidden property="alertVariable"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getAlertVariable()%>' />
			<!--可创建者 -->
			<html:hidden property="validCreators"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getValidCreators()%>' />
			<!--可监控者 -->
			<html:hidden property="monitors"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getMonitors()%>' />
			<!--流程变量-->
			<html:hidden property="variableJson"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getVariableJson()%>' />
			<!-- 起草人修改流程 -->
			<html:hidden property="canModifyFlow"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getCanModifyFlow()%>' />
			<html:hidden property="exActionName"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getExActionName()%>' />
			<html:hidden property="exAlertActionName"
				value='<%=((ProcForm) request.getAttribute("ProcForm"))
									.getExAlertActionName()%>' />
			<html:hidden property="id" value='<%=id%>' />
			<html:hidden property="xmlStr" value='<%=xmlStr%>' />
	</html:form>
	<input type="hidden" id="variableSelect"
		value='<%=request.getAttribute("variableSelect")%>' />
	<input type="hidden" id="transitionVariables"
		value='<%=request.getAttribute("transitionVariables")%>' />
</body>
</html:html>