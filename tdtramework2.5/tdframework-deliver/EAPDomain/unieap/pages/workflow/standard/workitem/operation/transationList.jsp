<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>

<html:html locale="true">

<head>
<%String id =request.getParameter("workitemID");%>
<title><bean:message bundle="uniflow" key = "workflow.popup"/></title>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0">
<uniflow:style/>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-right: 0px;
	margin-top: 0px;
	margin-bottom: 0px;
}
-->
.divstyle{
	position:absolute;
	visibility:hidden;
	width:300px;
	color: #000000;
	background-color:#EEEEEE;
	border:thin;
	border-color: #EEE0E0;
}
</style>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<script language="javascript">
function ok_onclick()
{
  document.forms[0].action.value = "update";
  document.forms[0].submit();
}
function expandNode(nodeID){

  document.forms[0].expand.value = nodeID;
  document.forms[0].submit();
}
function cancel_onclick()
{
  parent.returnValue = false;
  parent.close();
}
function divshow(divId){
	divhidden();
	/*var divId=transitionForm.transitionId.value;*/
	var odiv=document.all(divId);
	var rightedge=document.body.clientWidth-event.clientX;
	var bottomedge=document.body.clientHeight-event.clientY;
	
	if(rightedge<odiv.offsetWidth){
		odiv.style.left=document.body.scrollLeft+event.clientX-odiv.offsetWidth;
	}
	else{
		odiv.style.left=document.body.scrollLeft+event.clientX;	
	}
		
	if(bottomedge<odiv.offsetHeight)
		odiv.style.top=document.body.scrollTop+event.clientY-odiv.offsetHeight;
	else
		odiv.style.top=document.body.scrollTop+event.clientY;
	with(odiv.style){
		visibility='visible';
	}
}
function divhidden(){
 var divs=document.getElementsByTagName('div');
 var length=divs.length;
 for(var i=0;i<length;i++)
 var odiv=divs[i];
 with(odiv.style){
 	visibility='hidden';
 }
}
function onload()
{
  var action = document.forms[0].action.value;
  if(action == "ok")
  {
    parent.returnValue = false;
    parent.close();
  }
}

</script>
</head>
<uniflow:p_body onload="javascript:onload()" width="90%">
<uniflow:m_form action="tranList.do">

<uniflow:p_title><bean:message bundle="uniflow" key = "workflow.workitem.nextact.condition" /></uniflow:p_title>
<uniflow:p_content_comm_wrapper width="100%">
<uniflow:p_content_table width="100%">
<tr>
<td class="main_list_td" valign="middle" align="center" nowrap>传输线条件</td>
<td class="main_list_td" valign="middle" align="center" nowrap>传输线名</td>
<td class="main_list_td" valign="middle" align="center" nowrap>后续节点名</td>
</tr>
<logic:iterate id="transition" name="sttransitionForm" property="transitionList" type="com.neusoft.uniflow.web.standard.workitemmgt.operation.beans.TransitionBean" indexId="index">
<logic:equal name="transition" property="type" value="1">
<uniflow:p_content_tr>
<td class="main_list_td" valign="middle" align="center" nowrap>&nbsp;
<logic:equal name="transition" property="conditionValue" value="true">
<font color="#FF00EE">
<bean:write bundle="uniflow" name="transition" property="condition"/>
</font>
</logic:equal>
<logic:equal name="transition" property="conditionValue" value="false">
<bean:write bundle="uniflow" name="transition" property="condition"/>
</logic:equal>
</td>
<td class="main_list_td" valign="middle" align="center" nowrap>
<logic:equal name="transition" property="conditionValue" value="true">
<font color="#FF00EE">
<bean:write bundle="uniflow" name="transition" property="transitionName"/>
</font>
</logic:equal>
<logic:equal name="transition" property="conditionValue" value="false">
<bean:write bundle="uniflow" name="transition" property="transitionName"/>
</logic:equal>
</td>
<td class="main_list_td" valign="middle" align="center" nowrap>
<logic:equal name="transition" property="conditionValue" value="true">
<font color="#FF00EE">
<bean:write bundle="uniflow" name="transition" property="actdefName"/>
</font>
</logic:equal>
<logic:equal name="transition" property="conditionValue" value="false">
<%String onclickurl="javascript:divshow('"+transition.getTransitionId()+"')"; %>
<html:link href="#" onclick= "<%=onclickurl %>" onmouseout="javascript:divhidden()">
<bean:write bundle="uniflow" name="transition" property="actdefName"/>
</html:link>
</logic:equal>
</td>
</uniflow:p_content_tr>
</logic:equal>
<!-- 
<uniflow:p_content_tr>
<td>
<logic:equal name="transition" property="type" value="1">
<logic:present name="transition" property="nwactdef">
	<div id="<%=transition.getTransitionId()%>" name="partInfo" class="divstyle">
		<uniflow:p_content_table width="100%">
			<uniflow:p_content_tr>
				<td class="main_list_td">参与者类型</td>
				<td class="main_list_td">参与者名称</td>
			</uniflow:p_content_tr>
			<logic:iterate id="participantInfo" name="transition" property="ptList" type="com.neusoft.uniflow.web.standard.workitemmgt.operation.beans.ParticipantBean">
				<uniflow:p_content_tr>
					<td class="main_list_td"><bean:write bundle="uniflow" name="participantInfo" property="participantInfomation" /></td>
					<td class="main_list_td"><bean:write bundle="uniflow" name="participantInfo" property="participantName" /></td>
				</uniflow:p_content_tr>
			</logic:iterate>
		</uniflow:p_content_table>
	</div>
</logic:present>
</logic:equal>
</td>
</uniflow:p_content_tr>
 -->
</logic:iterate>
</uniflow:p_content_table>
</uniflow:p_content_comm_wrapper>
<uniflow:p_action>
	  <uniflow:button id="cancel" action="javascript:cancel_onclick()" name="关闭"></uniflow:button>
</uniflow:p_action>
<table>
<td height="20">&nbsp;</td>
</table>
<html:hidden property="action"/>
<html:hidden property="workItemId"/>
</uniflow:m_form>
</uniflow:p_body>
</html:html>