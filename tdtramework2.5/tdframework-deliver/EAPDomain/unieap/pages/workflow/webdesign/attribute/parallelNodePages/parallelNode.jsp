<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page
	import="com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.parallelForms.ParallelForm"%>
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
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/parallelNode.js"></script>
	<script type="text/javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/conditions.js"></script>
	<LINK
		href="<%=WorkflowManager.getWorkflowPath()%>/stylesheet/Style.css"
		rel=stylesheet>
	<script type="text/javascript">
	    function LoadName(){
	    	if(document.all){
    		self.resizeTo(660,410); 
    	}else{
    		self.resizeTo(660,410); 
    	}  
			var action = '<%=request.getAttribute("close_flag")%>';
			if('<%=request.getAttribute("flag")%>'=='no'&&$('editable').value=='true') $('sub').disabled=true;
			if(action == "close"){
				var xmlStr = document.parallelForm.xmlStr.value;
				var id = '<%=request.getAttribute("id")%>';
				var name = '<%=request.getAttribute("name")%>'
				window.close();
				opener.callFlex(xmlStr , id , name);
			}
          document.getElementById('path').value = '<%=path%>';
           
		};
		
    </script>
</head>
<body onLoad="LoadName();">
	<br>
	<html:form action="toParallel.do">
		<div class="main_label_outline" style="width: 570px">
			<table style="width: 550px" class="main_label_table">
				<tr>
					<td align="left" style="width: 90px">
						ID:
					</td>
					<td>
						<html:text property="id" readonly="true" style="width:400px;"
							styleClass="input_underline"
							value='<%=((ParallelForm) request
										.getAttribute("ParallelForm")).getId()%>'>
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
							value='<%=((ParallelForm) request
										.getAttribute("ParallelForm"))
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
							value='<%=((ParallelForm) request
									.getAttribute("ParallelForm")).getDesc()%>' />
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
							value='<%=((ParallelForm) request
									.getAttribute("ParallelForm"))
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
							value='<%=((ParallelForm) request
									.getAttribute("ParallelForm"))
									.getExtendProperties()%>' />
					</td>
				</tr>
			</table>
			<!-- 			<table class="main_label_table">
			   <tr>
					<td style="height:30px;width:90px">生存期:</td>
					<td style=""><a href="#" onclick="displaySurvival()" >详细设置</a></td>
				</tr>
			</table>	 -->
			<table style="width: 550px" class="main_label_table">
				<tr>
					<td style="height: 30px; width: 90px">
						前置条件:
					</td>
					<td>
						<html:text style="width: 375px;" readonly="true" property="preCondition"
							value='<%=((ParallelForm) request
									.getAttribute("ParallelForm"))
									.getPreCondition()%>' />
						<a href="#" onclick="displayConditions('preCondition')">设置</a>
					</td>
				</tr>
				<tr>
					<td style="height: 30px; width: 90px">
						后置条件:
					</td>
					<td>
						<html:text style="width: 375px;" readonly="true" property="postCondition"
							value='<%=((ParallelForm) request
									.getAttribute("ParallelForm"))
									.getPostCondition()%>' />
						<a href="#" onclick="displayConditions('postCondition')">设置</a>
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
		<input type="hidden" id="path" value='<%=path%>'>
		<!-- 生存期的时间设置 -->
		<html:hidden property="duration"
			value='<%=((ParallelForm) request
									.getAttribute("ParallelForm"))
									.getDuration()%>' />
		<!-- 预警的时间设置 -->
		<html:hidden property="alertDuration"
			value='<%=((ParallelForm) request
									.getAttribute("ParallelForm"))
									.getAlertDuration()%>' />
		<!-- 生存期判断变量与简单 -->
		<html:hidden property="varOrDur"
			value='<%=((ParallelForm) request
									.getAttribute("ParallelForm"))
									.getVarOrDur()%>' />
		<!-- 催办判断变量与简单 -->
		<html:hidden property="alertVarOrDur"
			value='<%=((ParallelForm) request
									.getAttribute("ParallelForm"))
									.getAlertVarOrDur()%>' />
		<!-- 生存期的处理方式 -->
		<html:hidden property="actionType"
			value='<%=((ParallelForm) request
									.getAttribute("ParallelForm"))
									.getActionType()%>' />
		<!-- 预警的处理方式 -->
		<html:hidden property="alertActionType"
			value='<%=((ParallelForm) request
									.getAttribute("ParallelForm"))
									.getAlertActionType()%>' />
		<!-- 预警的间隔时间 -->
		<html:hidden property="alertActionInterval"
			value='<%=((ParallelForm) request
									.getAttribute("ParallelForm"))
									.getAlertActionInterval()%>' />
		<!--生存期超时的应用程序  -->
		<html:hidden property="actionApplication"
			value='<%=((ParallelForm) request
									.getAttribute("ParallelForm"))
									.getActionApplication()%>' />
		<!--生存期预警的应用程序  -->
		<html:hidden property="alertActionApplication"
			value='<%=((ParallelForm) request
									.getAttribute("ParallelForm"))
									.getAlertActionApplication()%>' />
		<!--生存期变量-->
		<html:hidden property="variable"
			value='<%=((ParallelForm) request
									.getAttribute("ParallelForm"))
									.getVariable()%>' />
		<!--预警变量  -->
		<html:hidden property="alertVariable"
			value='<%=((ParallelForm) request
									.getAttribute("ParallelForm"))
									.getAlertVariable()%>' />
		<html:hidden property="exActionName"
			value='<%=((ParallelForm) request
									.getAttribute("ParallelForm"))
									.getExActionName()%>' />
		<html:hidden property="exAlertActionName"
			value='<%=((ParallelForm) request
									.getAttribute("ParallelForm"))
									.getExAlertActionName()%>' />
		<html:hidden property="id" value='<%=id%>' />
		<html:hidden property="xmlStr" value='<%=xmlStr%>' />
	</html:form>
	<input type="hidden" id="transitionVariables"
		value='<%=request.getAttribute("transitionVariables")%>' />
</body>
</html:html>