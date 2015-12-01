<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@page
	import="com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.autoNodeForms.AutoNodeForm;"%>
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
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/autoNode.js"></script>
	<script type="text/javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/conditions.js"></script>
	<script type="text/javascript">
    function LoadName(){ 
   		if(document.all){
    		self.resizeTo(660,520); 
    	}else{
    		self.resizeTo(660,520); 
    	} 
          var action = '<%=request.getAttribute("close_flag")%>';
          if(action == "close"){
        
             var xmlStr = document.autoNodeForm.xmlStr.value;
             var id = '<%=request.getAttribute("id")%>';
             var templateNodeType = '<%=request.getAttribute("templateNodeType") == null?"":request.getAttribute("templateNodeType")%>'
             window.close();      
			if(templateNodeType != '')
			{ 
				  //把jsp的编辑信息，回写到flex树上
				  opener.callFlexTree(xmlStr,id ,'',templateNodeType);
			}
			else
			{
					opener.callFlex(xmlStr , id);
			}
          }
          
    }
    
  

    </script>
</head>

<body onLoad="LoadName()">
	<br>

	<html:form action="toAuto.do">
		<div class="main_label_outline" style="width: 570px">

			<table style="width: 550px" class="main_label_table">
			<tr>
					<td align="left" style="width: 90px">
						ID:
					</td>
					<td>
						<html:text property="id" readonly="true" style="width:400px;"
							styleClass="input_underline"
							value='<%=((AutoNodeForm) request
										.getAttribute("AutoNodeForm"))
										.getId()%>'>
						</html:text>
					</td>
				</tr>
				<tr>
					<td align="left" style="width: 90px">
						<bean:message bundle="uniflow" key="workflow.webdesign.name" />
					</td>
					<td>
						<html:textarea property="name" style="width:400px;" rows="2"
							styleClass="input_underline"
							value='<%=((AutoNodeForm) request
										.getAttribute("AutoNodeForm"))
										.getName()%>'>
						</html:textarea>
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
							value='<%=((AutoNodeForm) request
									.getAttribute("AutoNodeForm")).getDesc()%>' />
					</td>
				</tr>
			</table>
			<table style="width: 550px" class="main_label_table">
				<tr>
					<td style="width: 90px">
						<bean:message bundle="uniflow" key="workflow.webdesign.bizcategory" />
					</td>
					<td >
						<html:text property="category" style="width:400px;" value='<%=((AutoNodeForm) request
									.getAttribute("AutoNodeForm")).getCategory()%>'/>
					</td>
				</tr>
				<tr>
					<td style="width: 90px">
						<bean:message bundle="uniflow" key="workflow.webdesign.extendProperty" />
					</td>
					<td >
						<html:text property="extendProperties" style="width:400px;" value='<%=((AutoNodeForm) request
									.getAttribute("AutoNodeForm")).getExtendProperties()%>'/>
					</td>
				</tr>
			</table>
			<table style="width: 550px" class="main_label_table">
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
			</table>
			<table class="main_label_table">
				<tr>
					<td style="height: 30px; width: 90">
						应用程序:
					</td>
					<td>
						<html:text property="applicationName" readonly="true" style="width:320px;"
							styleClass="input_text"
							value='<%=((AutoNodeForm) request
										.getAttribute("AutoNodeForm"))
										.getApplicationName()%>'>&nbsp;</html:text>
						<input type="button" class="button_small"
							name="openAutoNodeApplication" onclick="openApp(event)"
							value="浏览" />
						&nbsp;
						<input type="button" class="button_small" onclick="clearUp()"
							value="清除" />
					</td>
				</tr>
				<tr>
					<td style="height: 30px; width: 90px">
						前置条件:
					</td>
					<td>
						<html:text style="width: 320px;" readonly="true" property="preCondition"
							value='<%=((AutoNodeForm) request
									.getAttribute("AutoNodeForm"))
									.getPreCondition()%>' />
						<a href="#" onclick="displayConditions('preCondition')">设置</a>
					</td>
				</tr>
				<tr>
					<td style="height: 30px; width: 90px">
						后置条件:
					</td>
					<td>
						<html:text style="width: 320px;" readonly="true" property="postCondition"
							value='<%=((AutoNodeForm) request
									.getAttribute("AutoNodeForm"))
									.getPostCondition()%>' />
						<a href="#" onclick="displayConditions('postCondition')">设置</a>
					</td>
				</tr>
			</table>

		</div>
		<table style="width: 570px" class="main_button">
			<tr>
				<td style="width: 570px" align="right">
					<input type="button" value="提交" class="button_normal"
						onclick="submit_onclick()" />
					<input type="button" value="取消" class="button_normal"
						onclick="window.close()" />
				</td>
			</tr>
		</table>
		<input type="hidden" value='<%=request.getContextPath()%>'
			id="projectPath">
		<input type="hidden" id="path" value='<%=path%>'>
		<input type="hidden" id="unit" />
		<html:hidden property="msgReceiver"
			value='<%=((AutoNodeForm) request
									.getAttribute("AutoNodeForm"))
									.getMsgReceiver()%>' />
		<html:hidden property="events"
			value='<%=((AutoNodeForm) request
									.getAttribute("AutoNodeForm")).getEvents()%>' />
		<html:hidden property="application"
			value='<%=((AutoNodeForm) request
									.getAttribute("AutoNodeForm"))
									.getApplication()%>' />
		<!-- 生存期的时间设置 -->
		<html:hidden property="duration"
			value='<%=((AutoNodeForm) request
									.getAttribute("AutoNodeForm"))
									.getDuration()%>' />
		<!-- 预警的时间设置 -->
		<html:hidden property="alertDuration"
			value='<%=((AutoNodeForm) request
									.getAttribute("AutoNodeForm"))
									.getAlertDuration()%>' />
		<!-- 生存期判断变量与简单 -->
		<html:hidden property="varOrDur"
			value='<%=((AutoNodeForm) request
									.getAttribute("AutoNodeForm"))
									.getVarOrDur()%>' />
		<!-- 催办判断变量与简单 -->
		<html:hidden property="alertVarOrDur"
			value='<%=((AutoNodeForm) request
									.getAttribute("AutoNodeForm"))
									.getAlertVarOrDur()%>' />
		<!-- 生存期的处理方式 -->
		<html:hidden property="actionType"
			value='<%=((AutoNodeForm) request
									.getAttribute("AutoNodeForm"))
									.getActionType()%>' />
		<!-- 预警的处理方式 -->
		<html:hidden property="alertActionType"
			value='<%=((AutoNodeForm) request
									.getAttribute("AutoNodeForm"))
									.getAlertActionType()%>' />
		<!-- 预警的间隔时间 -->
		<html:hidden property="alertActionInterval"
			value='<%=((AutoNodeForm) request
									.getAttribute("AutoNodeForm"))
									.getAlertActionInterval()%>' />
		<!--生存期超时的应用程序  -->
		<html:hidden property="actionApplication"
			value='<%=((AutoNodeForm) request
									.getAttribute("AutoNodeForm"))
									.getActionApplication()%>' />
		<!--生存期预警的应用程序  -->
		<html:hidden property="alertActionApplication"
			value='<%=((AutoNodeForm) request
									.getAttribute("AutoNodeForm"))
									.getAlertActionApplication()%>' />
		<!--生存期变量-->
		<html:hidden property="variable"
			value='<%=((AutoNodeForm) request
									.getAttribute("AutoNodeForm"))
									.getVariable()%>' />
		<!--预警变量  -->
		<html:hidden property="alertVariable"
			value='<%=((AutoNodeForm) request
									.getAttribute("AutoNodeForm"))
									.getAlertVariable()%>' />
		<html:hidden property="exActionName"
			value='<%=((AutoNodeForm) request
									.getAttribute("AutoNodeForm"))
									.getExActionName()%>' />
		<html:hidden property="exAlertActionName"
			value='<%=((AutoNodeForm) request
									.getAttribute("AutoNodeForm"))
									.getExAlertActionName()%>' />
		<html:hidden property="id" value='<%=id%>' />
		<html:hidden property="xmlStr" value='<%=xmlStr%>' />
	</html:form>
	<input type="hidden" id="variableSelect"
		value='<%=request.getAttribute("variableSelect")%>' />
	<input type="hidden" id="transitionVariables" value='<%=request.getAttribute("transitionVariables")%>' />
</body>
</html:html>