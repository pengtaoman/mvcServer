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
	<script language="javascript" type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Calendar/WdatePicker.js"></script>
	<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/DatePicker.js"></script>
	<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
	<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
	<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
	<script language="JavaScript"src="<%=WorkflowManager.getWorkflowPath()%>/js/AjaxUtil.js"></script>

	<script language="javascript">
function button_onclick(action)
{
  if (document.forms[0].startTime.value>document.forms[0].endTime.value){
     warning_info.innerHTML ="<%=MessageUtil.getString("workflow.check.time.checked",request.getSession())%>";
     return;
  }
  if (document.forms[0].startTime.value=="" || document.forms[0].endTime.value==""){
     warning_info.innerHTML ="<%=MessageUtil.getString("workflow.check.time.checked",request.getSession())%>";
     return;
  }    
  document.forms[0].operation.value = action;
  document.forms[0].submit();
}
function setSelected(){
   document.forms[0].agenttype.value = 1;
   var length = document.forms[0].categoryids.length;
   for(var i=0; i<length; i++){
        eval("document.forms[0].categoryids.options[" + i + "]=null");
	    length--;
	    i--;
  	}
    var url= "ajaxutil?method=opAgentCPtree&agentid=System&op=view";
    send_request(url);
}
function removeItem(){
   var length = document.forms[0].categoryids.length;
   var value;
   for(var i=0; i<length; i++){
   		var selected = eval("document.forms[0].categoryids.options[" + i + "].selected");
        if(selected){
        	value = document.forms[0].categoryids.options[i].value;
           	eval("document.forms[0].categoryids.options[" + i + "]=null");
	    	length--;
	    	i--;
    	}
  	}
	var url= "ajaxutil?method=opAgentCPtree&agentid=System&op=delete&item="+value;
    send_request(url);
}
function getResponseText(){
     if(http_request.readyState==4){
         if (http_request.status == 200){
              	var responseText = http_request.responseText;
              	if (responseText=="success"){
              		alert("删除选项成功！");
              	}else{
              		var items = responseText.split(",");
				    for (var i=0;i<items.length;i++){
				    	var lableValue = items[i].split(";");
						var oOption = document.createElement("OPTION");
						oOption.text=lableValue[0];
						oOption.value=lableValue[1];
						document.forms[0].categoryids.add(oOption);
					}
              	}

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
	var width=300;
	var height=243;
	var left=(window.screen.availWidth-width)/2;
	openfalg=tag;
	open_windows(openURL,width,height);
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

function open_tempwind(){
var path=document.getElementById('path').value;
	var left = (window.screen.availWidth - 250) / 2;
    var top = (window.screen.availHeight - 340) /2;
	openUrl =path+"/unieap/pages/workflow/webdesign/attribute/appnewmgt/procTempletsTree.jsp?op=create";
    newWin=window.open(openUrl, 'applicationPages', 'height=340, width=250,  top='+top+', left='+left);  
}
</script>
</head>
<uniflow:p_body onload="javascript:onload()" width="90%">
	<uniflow:m_form action="agentcreate_mine.do">
		<uniflow:p_title><bean:message bundle="uniflow" key="workflow.common.myagentmgt.create.title" /></uniflow:p_title>
		<uniflow:p_content_comm_wrapper width="100%">
			<uniflow:p_warning>
				<html:errors />
			</uniflow:p_warning>
			<uniflow:p_content_table>
				<uniflow:p_content_tr>
					<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow"key="workflow.common.agentinfo.assignee" /></td>
					<td class="main_label_td" valign="middle" nowrap colspan="2">
						<html:text property="assignee" readonly="true" styleClass="input_text200">
						</html:text>
						<a href="javascript:open_orgwin('assignee')">
						   <img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/main_img/Gear.gif" alt='选择' width="16" height="16" border="0">
						</a>
					</td>
				</uniflow:p_content_tr>
				<uniflow:p_content_tr>
					<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.starttime" /></td>
					<td class="main_label_td" valign="middle" nowrap colspan="2">
						<html:text readonly="true" property="startTime" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" styleClass="Wdate" style="width:200px"/>
						<html:hidden property="startTime_show" />
					</td>
				</uniflow:p_content_tr>
				<uniflow:p_content_tr>
					<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.endtime" /></td>
					<td class="main_label_td" valign="middle" nowrap colspan="2">
						<html:text readonly="true" property="endTime" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" styleClass="Wdate" style="width:200px"/>
						<html:hidden property="endTime_show" />
					</td>
				</uniflow:p_content_tr>
				<uniflow:p_content_tr>
					<td class="main_label_td" valign="middle" nowrap>授权方式</td>
					<td>
						<table border='0'>
						   <tr><td class="main_list_td" valign="middle" width="30">
								<html:radio property="agenttype" value="0"></html:radio>
						   		</td>
						   		<td class="main_list_td" valign="middle">缺省模式</td>
						   </tr> 
						   <tr><td class="main_list_td" valign="middle" width="30">
								<html:radio property="agenttype" value="1"></html:radio>
						   		</td>
						   		<td class="main_list_td" valign="middle">流程资源分类模式</td>
						   </tr>
						   <tr>
						   		<td width="30">&nbsp;</td>
							    <td><select id="categoryids" name="categoryname" size="3" style="width:160" nultiple>						     		
						     		</select>						     	
						     	</td>
						     	<td>
						     		<a href="javascript:open_tempwind()">
						   				<img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/main_img/Gear.gif" alt='选择' width="16" height="16" border="0">
									</a><br>
						     		<!--<a href="javascript:removeItem()">
						   				<img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/main_img/delete.gif" alt='删除' width="16" height="16" border="0">
									</a>
								--></td>
						   </tr> 
						</table>
					</td>
				</uniflow:p_content_tr>
			</uniflow:p_content_table>
		</uniflow:p_content_comm_wrapper>

		<uniflow:p_action>
			<uniflow:button id="ok" action="javascript:button_onclick('ok')"name="button.ok"></uniflow:button>
			<uniflow:button id="cancel" action="javascript:window.close()"name="button.cancel"></uniflow:button>
		</uniflow:p_action>

		<html:hidden property="operation" />
		<html:hidden property="assignerType" />
		<html:hidden property="assigneType" />
		<html:hidden property="assigneeId" />
		<html:hidden property="categories" />
	</uniflow:m_form>
	<input type="hidden" value='<%=request.getContextPath()%>' id="path" />
</uniflow:p_body>
</html:html>