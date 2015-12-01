<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<html:html locale="true">

<head>
	<%
		String id = request.getParameter("agentid");
	%>
	<title><bean:message bundle="uniflow" key="workflow.popup" />
	</title>
	<uniflow:style />
	<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-right: 0px;
	margin-top: 0px;
	margin-bottom: 0px;
}
-->
</style>
	<script language="javascript" type="text/javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Calendar/WdatePicker.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/common.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/DatePicker.js"></script>
	<script language="javascript">
function button_onclick(action){ 
  if (modifyAgntForm.startTime.value>modifyAgntForm.endTime.value){
     warning_info.innerHTML ="<%=MessageUtil.getString("workflow.check.time.checked",
								request.getSession())%>";
     return;
  }  
  if (modifyAgntForm.assignee.value==""){
     warning_info.innerHTML ="<%=MessageUtil.getString(
								"workflow.check.assignee.checked", request
										.getSession())%>";
     return;  
  }  
  modifyAgntForm.operation.value = action;
  document.modifyAgntForm.submit();
}
function onload(){ 
  var action = "<%=request.getAttribute("close_flag")%>";
  if(action == "close"){
    opener.refresh();
    try{
        opener.parent.title.delrefresh();
    }catch(e){}
    window.close();
  }
}
var assigneeName="";
var assigneeType="";
var assigneeId="";
var openfalg="";
function set_textvalue(tname){
if(tname=="assignee"){
	document.forms[0].assignee.value=assigneeName;
	document.forms[0].assigneType.value=assigneeType;
	document.forms[0].assigneeId.value=assigneeId;
}else if(tname="assigner"){
	document.forms[0].assigner.value=assigneeName;
	document.forms[0].assignerType.value=assigneeType;
	document.forms[0].assignerId.value=assigneeId;
}
}
function open_orgwin(tag){

	var openURL='<%=WorkflowManager.getWorkflowPath()%>/common/myagentmgt/orgtree.jsp'
	var width=320;
	var height=243;
	openfalg=tag;
	open_windows(openURL,width,height);
}

function initSelect(str){
		if(str!=""&&str!=null){
		var items = str.split(",");
		    for (var i=0;i<items.length;i++){
		    	var lableValue = items[i].split(";");
				document.forms[0].cateResName.value=lableValue[0];
				var temp =  lableValue[1].split("#");
				document.forms[0].cateResID.value=temp[0];
				document.forms[0].agentType.value=temp[1];
			}
		}
}

function open_tempwind(){
var path=document.getElementById('path').value;
	var left = (window.screen.availWidth - 250) / 2;
    var top = (window.screen.availHeight - 340) /2;
	openUrl =path+"/unieap/pages/workflow/webdesign/attribute/appnewmgt/procTempletsTree.jsp?op=modify";
    newWin=window.open(openUrl, 'applicationPages', 'height=340, width=250,  top='+top+', left='+left);  
}
</script>

</head>

<uniflow:p_body onload="javascript:onload()" width="90%">
	<uniflow:m_form action="agentmodify_mine.do">
		<uniflow:p_title>
			<bean:message bundle="uniflow"
				key="workflow.common.myagentmgt.create.title" />
		</uniflow:p_title>

		<uniflow:p_content_comm_wrapper width="100%">
			<uniflow:p_warning>
				<html:errors />
			</uniflow:p_warning>
			<uniflow:p_content_table>
				<uniflow:p_content_tr>
					<td class="main_label_td" valign="middle" nowrap>
						<bean:message bundle="uniflow"
							key="workflow.common.agentinfo.assignee" />
					</td>
					<td class="main_label_td" valign="middle" nowrap colspan="2">
						<html:text property="assignee" readonly="true"
							styleClass="input_text200">>
						</html:text>
						<a href="javascript:open_orgwin('assignee')"> <img
								src="<%=WorkflowManager
													.getWorkflowStylePath()%>/style1/main_img/Gear.gif"
								alt='选择' width="16" height="16" border="0"> </a>
					</td>
				</uniflow:p_content_tr>

				<uniflow:p_content_tr>
					<td class="main_label_td" valign="middle" nowrap>
						<bean:message bundle="uniflow" key="workflow.starttime" />
					</td>
					<td class="main_label_td" valign="middle" nowrap colspan="2">
						<html:text readonly="true" property="startTime"
							onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',position:{left:118,top:70}})"
							styleClass="Wdate" style="width:200px" />
						<html:hidden property="startTime_show" />
					</td>
				</uniflow:p_content_tr>
				<uniflow:p_content_tr>
					<td class="main_label_td" valign="middle" nowrap>
						<bean:message bundle="uniflow" key="workflow.endtime" />
					</td>
					<td class="main_label_td" valign="middle" nowrap colspan="2">
						<html:text readonly="true" property="endTime"
							onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',position:{left:118,top:70}})"
							styleClass="Wdate" style="width:200px" />
						<html:hidden property="endTime_show" />
					</td>
				</uniflow:p_content_tr>
				<uniflow:p_content_tr>
					<td class="main_label_td" valign="middle" nowrap>
						授权方式
					</td>
					<td class="main_label_td" valign="middle" nowrap>
						<html:text property="cateResName" readonly="true" disabled="false"
							styleClass="input_text200"></html:text>
					</td>
					<td>
						<a href="javascript:open_tempwind()"> <img
								src="<%=WorkflowManager
													.getWorkflowStylePath()%>/style1/main_img/Gear.gif"
								alt='选择' width="16" height="16" border="0"> </a>
						<br>
					</td>
				</uniflow:p_content_tr>
			</uniflow:p_content_table>

		</uniflow:p_content_comm_wrapper>

		<uniflow:p_action>
			<uniflow:button id="ok" action="javascript:button_onclick('ok')"
				name="button.ok"></uniflow:button>
			<uniflow:button id="cancel" action="javascript:window.close()"
				name="button.cancel"></uniflow:button>
		</uniflow:p_action>

		<html:hidden property="operation" />
		<html:hidden property="id" value="<%=id%>" />
		<html:hidden property="assigneType" />
		<html:hidden property="assigneeId" />
		<html:hidden property="cateResID" />
		<html:hidden property="agentType" />
	</uniflow:m_form>
	<input type="hidden" value='<%=request.getContextPath()%>' id="path" />
</uniflow:p_body>
</html:html>