<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.SessionManager"%>
<%@ page import="com.neusoft.uniflow.web.webdesign.AttributeOperation.forms.procForms.ProcForm"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String xmlStr = ((String)request.getAttribute("xmlStr"));
String id = ((String)request.getAttribute("id"));
%>


<html:html locale="true">
<head>
   
    <title>Process Attribute</title>	
    <script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
    <LINK href="<%=WorkflowManager.getWorkflowPath()%>/stylesheet/Style.css" rel=stylesheet>
     <script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/process.js"></script>
	
    <script type="text/javascript">
    function LoadName(){ 
          var action = '<%=request.getAttribute("close_flag")%>';
          if(action == "close"){
            var xmlStr = document.procForm.xmlStr.value;
             var id = '<%=request.getAttribute("id")%>';
             window.close();
             opener.callFlex(xmlStr , id);
          }
          initPage();
          if('<%= request.getAttribute("flag")%>'=="no") document.getElementById('sub').disabled=true;
          document.getElementById('path').value = '<%=path%>';
    }
    </script>
</head>
<body  onLoad="LoadName()"><br>
  <html:form action="toNewProcess.do">
  <div class="main_label_outline" style="width:570px">
 
		  	<table style="width:550px" class="main_label_table">
				<tr>
					<td align="left" style="width:90px"><bean:message bundle="uniflow" key="workflow.webdesign.process.name"/></td>
					<td>
					<html:text property="name" style="width:400px;" styleClass="input_underline"  value='<%=((ProcForm)request.getAttribute("ProcForm")).getName()%>'>
					</html:text>*
					</td>
				</tr>
				<tr>
					<td valign="top"  style="width:90px"><bean:message bundle="uniflow" key="workflow.webdesign.process.describe"/></td>
					<td><html:textarea property="desc" style="width:400px;" rows="5" styleClass="input_text"  value='<%=((ProcForm)request.getAttribute("ProcForm")).getDesc()%>'>
						</html:textarea> 
					</td>
				</tr>
			</table>
			<table class="main_label_table">
				<tr>
					<td style="width:87px"><bean:message bundle="uniflow" key="workflow.webdesign.process.popedom"/></td>		   
					<td style="width:240px"><input type="checkbox" name="modifyFlow" style="checkbox" <%= (((ProcForm)request.getAttribute("ProcForm")).getCanModifyFlow().equals("true"))?"checked":""%>><bean:message bundle="uniflow" key="workflow.webdesign.procModify.permit"/></input></td>
					<td><input type="text" name="" id="alertDurationDay" class="input_underline" style="width:20px;ime-mode:disabled" value="5"onkeypress="return ieNum(event);"  onkeyup="ffNum(this.id)">
						<bean:message bundle="uniflow" key="workflow.webdesign.unsettled.hasten.privPerson"/></input></td>
				</tr>
			</table>
			<table class="main_label_table">
				<tr>
					<td style="width:87px"><bean:message bundle="uniflow" key="workflow.webdesign.process.type"/></td>		   
					<td style="width:237px"><input type="checkbox" name="extendProperty" style="checkbox" value="sendTodo" ><bean:message bundle="uniflow" key="workflow.webdesign.waittransaction"/></input>
					<input type="checkbox" name="extendProperty" style="checkbox" value="sendEmail"><bean:message bundle="uniflow" key="workflow.webdesign.mail"/></input>
					
					</td>
					<td><input type="checkbox" name="extendProperty" style="checkbox" value="notifyAllAuditor" ><bean:message bundle="uniflow" key="workflow.webdesign.notice.procEnd.settPerson"/></input></td>
				</tr>
			</table>
			
			<table class="main_label_table">
				<tr>
					<td style="width:90px" align="left" ><bean:message bundle="uniflow" key="workflow.webdesign.franchiseperson"/></td>
					<td><input type="text" id="monitor" readonly="true" style="width:375px;" class="input_underline" 
						 value='<%=((ProcForm)request.getAttribute("ProcForm")).getMonitorsName()%>'/></td>
					<td valign="bottom"><a href="#" onclick="displayPerson()"><bean:message bundle="uniflow" key="workflow.webdesign.choice"/></a></td>
				</tr>
			</table>	
	
	</div>	
		<table style="width:570px" class="main_button">
			<tr>
				<td style="width:570px" align="right"><input type="button" id="sub" value='<bean:message bundle="uniflow" key="workflow.webdesign.submit"/>' class="button_normal" onclick="submit_onclick()"/>
				<input type="button" value='<bean:message bundle="uniflow" key="workflow.webdesign.cancel"/>' class="button_normal" onclick="window.close()"/></td>
			</tr>
		</table>

<input type="hidden" id="path"  value='<%=path%>'/>
<input type = "hidden" id="punit" value='<%=((ProcForm)request.getAttribute("ProcForm")).getPunit()%>'/>
<input type = "hidden" id="munit" value='<%=((ProcForm)request.getAttribute("ProcForm")).getMunit()%>'/>
<input type = "hidden" id="isNewVersion" value='<%=request.getAttribute("isNewVersion")%>'/>
<input type = "hidden" id="operatable" value='<%=request.getAttribute("operatable")%>'/>
<!-- 扩展属性 -->
<html:hidden  property="extendProperties"  value='<%=((ProcForm)request.getAttribute("ProcForm")).getExtendProperties()%>'/>	
<!-- 预警的时间设置 -->
<html:hidden  property="alertDuration" value='<%=((ProcForm)request.getAttribute("ProcForm")).getAlertDuration()%>'/>
<!-- 催办间隔时间 -->
<html:hidden property="alertActionInterval" value='<%=((ProcForm)request.getAttribute("ProcForm")).getAlertActionInterval()%>' /> 	 	 	 	
<!--可创建者 -->
<html:hidden  property="validCreators"/> 	
<!--可监控者 -->
<html:hidden  property="monitors" value='<%=((ProcForm)request.getAttribute("ProcForm")).getMonitors()%>' />
<!-- 起草人修改流程 -->
<html:hidden  property="canModifyFlow" value='<%=((ProcForm)request.getAttribute("ProcForm")).getCanModifyFlow()%>' />

 <html:hidden property="id" value='<%=id %>'/>
<html:hidden property="xmlStr"  value='<%=xmlStr %>'/>
<html:hidden property="action" value="CreatInstance"/>
  </html:form>
  </body>
</html:html>