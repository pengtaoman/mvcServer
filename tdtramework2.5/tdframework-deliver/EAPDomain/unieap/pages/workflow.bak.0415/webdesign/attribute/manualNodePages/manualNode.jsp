<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page
	import="com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.manualNodeForms.ManualNodeForm"%>
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
	<script type="text/javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/manualNode.js"></script>
	<LINK
		href="<%=WorkflowManager.getWorkflowPath()%>/stylesheet/Style.css"
		rel=stylesheet>
	<script type="text/javascript">
	    function LoadName()
	    {	
			var action = '<%=request.getAttribute("close_flag")%>';
			if('<%=request.getAttribute("flag")%>'=='no'&&$('editable').value=='true') $('sub').disabled=true;
			if(action == "close"){
				var xmlStr = document.manualNodeForm.xmlStr.value;
				var id = '<%=request.getAttribute("id")%>';
				var name = '<%=request.getAttribute("name")%>'
				var templateNodeType = '<%=request.getAttribute("templateNodeType") == null?"":request.getAttribute("templateNodeType")%>'
				window.close();
				
				if(templateNodeType != '')
				{ 
				  //把jsp的编辑信息，回写到flex树上
				  opener.callFlexTree(xmlStr,id ,name,templateNodeType);
				}
				else
				{
					opener.callFlex(xmlStr , id , name);
				}
			}
          initPage();

          document.getElementById('path').value = '<%=path%>';
		};
		
    </script>
</head>
<body onLoad="LoadName();">
	<br>
	<html:form action="toManual.do">
		<div class="main_label_outline" style="width: 570px">
			<table style="width: 550px" class="main_label_table">
				<tr>
					<td align="left" style="width: 90px">
						<bean:message bundle="uniflow" key="workflow.webdesign.name" />
					</td>
					<td>
						<html:text property="name" style="width:400px;"
							styleClass="input_underline"
							value='<%=((ManualNodeForm) request
										.getAttribute("ManualNodeForm"))
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
							value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm")).getDesc()%>' />
					</td>
				</tr>
			</table>
			<table class="main_label_table">
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
						事件消息:
					</td>
					<td style="">
						<a href="#" onclick="displayEvents()">详细设置</a>
					</td>
				</tr>
			</table>
			<table class="main_label_table">
				<tr>
					<td style="width: 86px">
						操作级别:
					</td>
					<td style="width: 150px" align="left">
						<input type="radio" onclick="checkOpertion()"
							<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getOpertionLevel().equals("0") ? "checked"
							: "checked"%>
							id="OpertionLevel1" value="0" name="OpertionLevel">
						节点
						</input>
						<input type="radio" onclick="checkOpertion()"
							<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getOpertionLevel().equals("1") ? "checked"
							: ""%>
							name="OpertionLevel" value="1">
						工作项
						</input>
					</td>
					<td style="width: 200px" align="right"></td>
				</tr>
			</table>
			<table class="main_label_table">
				<tr>
					<td style="width: 86px">
						办理方式:
					</td>
					<td>
						<input type="radio" id="Level0" name="AssignRule"
							<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getAssignRule().equals("0") ? "checked"
							: ""%>
							value="0">
						单人
						</input>
					</td>
					<td>
						<input type="radio" id="Level1" name="AssignRule"
							<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getAssignRule().equals("1") ? "checked"
							: ""%>
							value="1">
						所有人
						</input>
					</td>
					<td>
						<input type="radio" id="Level2" name="AssignRule"
							<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getAssignRule().equals("2") ? "checked"
							: ""%>
							value="2">
						条件
						</input>
					</td>
					<td>
						<input type="radio" id="Level3" name="AssignRule"
							<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getAssignRule().equals("3") ? "checked"
							: ""%>
							value="3">
						角色
						</input>
					</td>
				</tr>
			</table>
			<table style="width: 550px" class="main_label_table">
				<tr>
					<td style="width: 90px">
						应用程序:
					</td>
					<td>
						<html:text property="applicationName" style="width:320px;"
							styleClass="input_text"
							value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getApplicationName()%>' />
						&nbsp;
						<input type="button" class="button_small"
							name="openManualNodeApplication" onclick="openApp(event)"
							value="浏览" />
						&nbsp;
						<input type="button" class="button_small" onclick="clearUp()"
							value="清除" />
					</td>
				</tr>
			</table>
			<table class="main_label_table">
				<tr>
					<td style="width: 90px" align="left">
						主送:
					</td>
					<td>
						<input type="text" id="primaryPerson" readonly="true"
							style="width: 375px;" class="input_underline"
							value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getPrimaryPeopleName()%>' />
					</td>
					<td valign="bottom">
						<a href="#" onclick="displayPerson(1)"><bean:message
								bundle="uniflow" key="workflow.webdesign.choice" /> </a>
					</td>
				</tr>
				<tr>
					<td style="width: 90px" align="left">
						抄送:
					</td>
					<td>
						<input type="text" id="minorPerson" readonly="true"
							style="width: 375px;" class="input_underline"
							value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getMinorPeopleName()%>' />
					</td>
					<td valign="bottom">
						<a href="#" onclick="displayPerson(0)"><bean:message
								bundle="uniflow" key="workflow.webdesign.choice" /> </a>
					</td>
				</tr>
			</table>

		</div>
		<table style="width: 570px" class="main_button">
			<tr>
				<td style="width: 570px" align="right">
					<input type="button" id="sub"
						value='<bean:message bundle="uniflow" key="workflow.webdesign.submit"/>'
						class="button_normal" onclick="submit_onclick()" />
					<input type="button"
						value='<bean:message bundle="uniflow" key="workflow.webdesign.cancel"/>'
						class="button_normal" onclick="window.close()" />
				</td>
			</tr>
		</table>
		<input type="hidden" id="editable"
			value='<%=request.getAttribute("editable")%>'>
		<input type="hidden" id="operatable"
			value='<%=request.getAttribute("operatable")%>'>
		<input type="hidden" id="tempId" value="#">
		<input type="hidden" id="unit">
		<input type="hidden" id="cType">
		<input type="hidden" id="path" value='<%=path%>'>
		<input type="hidden" id="punit"
			value='<%=((ManualNodeForm) request
											.getAttribute("ManualNodeForm"))
											.getPunit()%>' />
		<input type="hidden" id="munit"
			value='<%=((ManualNodeForm) request
											.getAttribute("ManualNodeForm"))
											.getMunit()%>' />
		<input type="hidden" id="isNewVersion"
			value='<%=request.getAttribute("isNewVersion")%>' />
		<html:hidden property="application"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getApplication()%>' />

		<html:hidden property="msgReceiver"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getMsgReceiver()%>' />
		<html:hidden property="events"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getEvents()%>' />
		<html:hidden property="duration"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getDuration()%>' />
		<!-- 预警的时间设置 -->
		<html:hidden property="alertDuration"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getAlertDuration()%>' />
		<!-- 生存期判断变量与简单 -->
		<html:hidden property="varOrDur"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getVarOrDur()%>' />
		<!-- 催办判断变量与简单 -->
		<html:hidden property="alertVarOrDur"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getAlertVarOrDur()%>' />
		<!-- 生存期的处理方式 -->
		<html:hidden property="actionType"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getActionType()%>' />
		<!-- 预警的处理方式 -->
		<html:hidden property="alertActionType"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getAlertActionType()%>' />
		<!-- 预警的间隔时间 -->
		<html:hidden property="alertActionInterval"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getAlertActionInterval()%>' />
		<!--生存期超时的应用程序  -->
		<html:hidden property="actionApplication"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getActionApplication()%>' />
		<!--生存期预警的应用程序  -->
		<html:hidden property="alertActionApplication"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getAlertActionApplication()%>' />
		<!--生存期变量-->
		<html:hidden property="variable"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getVariable()%>' />
		<!--预警变量  -->
		<html:hidden property="alertVariable"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getAlertVariable()%>' />
		<!--处理方式  -->
		<html:hidden property="assignRule"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getAssignRule()%>' />
		<!-- 扩展属性 -->
		<html:hidden property="extendProperties"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getExtendProperties()%>' />
		<!--主送预定义  -->
		<html:hidden property="primaryPreDefine"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getPrimaryPreDefine()%>' />
		<!-- 抄送预定义 -->
		<html:hidden property="minorPreDefine"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getMinorPreDefine()%>' />
		<!--主送参与人  -->
		<html:hidden property="primaryPeople"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getPrimaryPeople()%>' />
		<!-- 抄送参与人 -->
		<html:hidden property="minorPeople"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getMinorPeople()%>' />
		<html:hidden property="opertionLevel"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getOpertionLevel()%>' />
		<html:hidden property="exActionName"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getExActionName()%>' />
		<html:hidden property="exAlertActionName"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getExAlertActionName()%>' />
		<html:hidden property="nodeArraryString"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getNodeArraryString()%>' />
		<html:hidden property="variablesString"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getVariablesString()%>' />
		<html:hidden property="minorNodeArraryString"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getMinorNodeArraryString()%>' />
		<html:hidden property="minorVariablesString"
			value='<%=((ManualNodeForm) request
									.getAttribute("ManualNodeForm"))
									.getMinorVariablesString()%>' />
		<!-- 参与人名称 -->
		<html:hidden property="participantsName" />
		<html:hidden property="action" />
		<html:hidden property="id" value='<%=id%>' />
		<html:hidden property="xmlStr" value='<%=xmlStr%>' />
		<!--处理方式  -->
	</html:form>
	<input type="hidden" id="manualNode"
		value='<%=request.getAttribute("manualNode")%>' />
	<input type="hidden" id="variablesManualNode"
		value='<%=request.getAttribute("variablesManualNode")%>' />
	<input type="hidden" id="nodeVariables"
		value='<%=request.getAttribute("manualNodeVariables")%>' />
</body>
</html:html>