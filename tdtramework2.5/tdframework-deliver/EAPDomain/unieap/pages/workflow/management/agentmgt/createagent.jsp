<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">

<head>
	<title><bean:message bundle="uniflow" key="workflow.popup" />
	</title>
	<uniflow:style />
	<script language="javascript" type="text/javascript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Calendar/WdatePicker.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/DatePicker.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/AjaxUtil.js"></script>

	<script language="javascript">
function button_onclick(action)
{
  if(createAgentForm.assigner.value==""||createAgentForm.assignee.value=="")
  {
  	warning_info.innerHTML ="<%=MessageUtil.getString(
								"workflow.system.sysagent.psn.checked",
								request.getSession())%>";
     return;
  }
  if (createAgentForm.assignee.value==createAgentForm.assigner.value){
     warning_info.innerHTML ="<%=MessageUtil.getString(
								"workflow.system.sysagent.check.checked",
								request.getSession())%>";
     return;
  }
  if (createAgentForm.startTime.value>createAgentForm.endTime.value){
     warning_info.innerHTML ="<%=MessageUtil.getString("workflow.check.time.checked",
								request.getSession())%>";
     return;
  }
  if (createAgentForm.startTime.value=="" || createAgentForm.endTime.value==""){
     warning_info.innerHTML ="<%=MessageUtil.getString("workflow.check.time.checked",
								request.getSession())%>";
     return;
  }    
  createAgentForm.operation.value = action;
  setAgenttype();
  document.createAgentForm.submit();
}


function removeItem(){
   var obj=document.getElementById('categoryids');
   for(i=obj.length-1;i>=0;i--){
		if(obj[i].selected==true){
		    obj.removeChild(obj[i])
		}
	}
}

function removeAllItem(){
   var obj=document.getElementById('categoryids');
   for(i=obj.length-1;i>=0;i--){
		    obj.removeChild(obj[i])
	}
}

function initSelect(str){
	removeAllItem();
	document.forms[0].categories.value="";
	if(str!=""){
		var items = str.split(",");
				    for (var i=0;i<items.length;i++){
				    	var lableValue = items[i].split(";");
						var oOption = document.createElement("OPTION");
						oOption.text=lableValue[0];
						oOption.value=lableValue[1];
						document.forms[0].categories.value=document.forms[0].categories.value+oOption.text+","+oOption.value+";";
						document.forms[0].categoryids.add(oOption);
					}
		}
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
   else
  {
     setAgenttype();
  }
}

var assigneeName="";
var assigneeType="";
var assigneeId="";
var openfalg="";
function set_textvalue(tname){
	if(tname=="assignee"){
		document.forms[0].assignee.value=assigneeName;
		document.forms[0].assigneType.value=assigneeType == "role"? 1 : 0;
		document.forms[0].assigneeId.value=assigneeId;
	}else if(tname="assigner"){
		document.forms[0].assigner.value=assigneeName;
		document.forms[0].assignerType.value=assigneeType == "role"? 1 : 0;
		document.forms[0].assignerId.value=assigneeId;
	}
}
function open_orgwin(tag){
	var openURL='<%=WorkflowManager.getWorkflowPath()%>/management/agentmgt/orgtree.jsp'
	var width=300;
	var height=243;
	var left=(window.screen.availWidth-width)/2;
	openfalg=tag;
	open_windows(openURL,width,height);
		
}

function open_tempwind(){
var path=document.getElementById('path').value;
	var left = (window.screen.availWidth - 250) / 2;
    var top = (window.screen.availHeight - 340) /2;
	openUrl =path+"/unieap/pages/workflow/webdesign/attribute/appnewmgt/procTempletsTree.jsp?op=create";
    newWin=window.open(openUrl, 'applicationPages', 'height=340, width=250,  top='+top+', left='+left);  

}

/**
 *设置授权范围隐含域的值
 */
function setAgenttype()
{
   var array = document.getElementById("categoryids").options;
   if(array.length > 0)
   {
     document.getElementById("agenttype").value= 1;    
   }
   else
   {
   	 document.getElementById("agenttype").value= 0;
   }
    
}
</script>
</head>
<uniflow:p_body onload="javascript:onload()" width="90%">
	<uniflow:m_form action="agentcreate.do">
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
							key="workflow.common.agentinfo.assigner" />
					</td>
					<td class="main_label_td" valign="middle" nowrap colspan="2">
						<html:text property="assigner" readonly="true"
							styleClass="input_text200">
						</html:text>
						<a href="javascript:open_orgwin('assigner')"> <img
								src="<%=WorkflowManager
													.getWorkflowStylePath()%>/style1/main_img/Gear.gif"
								alt='选择' width="16" height="16" border="0"> </a>
					</td>
				</uniflow:p_content_tr>
				<uniflow:p_content_tr>
					<td class="main_label_td" valign="middle" nowrap>
						<bean:message bundle="uniflow"
							key="workflow.common.agentinfo.assignee" />
					</td>
					<td class="main_label_td" valign="middle" nowrap colspan="2">
						<html:text property="assignee" readonly="true"
							styleClass="input_text200">
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
							onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',position:{left:118,top:100}})"
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
							onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',position:{left:118,top:100}})"
							styleClass="Wdate" style="width:200px" />
						<html:hidden property="endTime_show" />
					</td>
				</uniflow:p_content_tr>
				<uniflow:p_content_tr>
					<td class="main_label_td" valign="middle" nowrap>
						授权方式
					</td>
					<td>
						<table border='0'>
							<tr>
								<td>
									<select id="categoryids" name="categoryname" size="3"
										style="width: 200" multiple="true">
									</select>
								</td>
								<td>
									<a href="javascript:open_tempwind()"> <img
											src="<%=WorkflowManager
													.getWorkflowStylePath()%>/style1/main_img/Gear.gif"
											alt='选择' width="16" height="16" border="0"> </a>
									<br>
								</td>
							</tr>
						</table>
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
		<html:hidden property="assignerType" />
		<html:hidden property="assignerId" />
		<html:hidden property="assigneType" />
		<html:hidden property="assigneeId" />
		<html:hidden property="categories" />
		<html:hidden property="agenttype" />
	</uniflow:m_form>
	<input type="hidden" value='<%=request.getContextPath()%>' id="path" />
</uniflow:p_body>
</html:html>