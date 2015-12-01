<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
<title><bean:message bundle="uniflow" key = "workflow.popup"/></title>
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
</style>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/DatePicker.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<script language="javascript">
function open_win(time_name)
{
  var openURL = '<%=request.getContextPath()%>/bcalender.do?time_name='+time_name;
  var width = 220;
  var height = 190;
  var left = (window.screen.availWidth - width) / 2;
  var top = (window.screen.availHeight - height) /2;
  var features ="status:no;resizable:no;center:yes;help:no;dialogLeft:" + left + "px;" + "dialogTop:" + top + "px;" + "dialogWidth:" + width + "px;" + "dialogHeight:" + height+"px";

  window.showModalDialog(openURL , window,features);

//  open_windows(openURL,'180','180');
}
function button_onclick(action)
{
 if(freedayForm.startTime.value==""){
     warning_info.innerHTML = "<%=MessageUtil.getString("workflow.check.time.checked1",request.getSession())%>";
     return ;
  }
  if(freedayForm.endTime.value==""){
     warning_info.innerHTML ="<%=MessageUtil.getString("workflow.check.time.checked1",request.getSession())%>";
    return ;
  }
  if(freedayForm.startTime.value>freedayForm.endTime.value){
     warning_info.innerHTML = "<%=MessageUtil.getString("workflow.check.time.checked",request.getSession())%>";
     return;
  }
  freedayForm.action.value = action;
  document.freedayForm.submit();
}
var unitorg;
var unitorgId;
function set_textvalue(){
	document.forms[0].orgunit.value=unitorg;
	document.forms[0].orgunitId.value=unitorgId;
}
function open_orgwin(){
	var openURL='<%=WorkflowManager.getWorkflowPath()%>/management/workdaymgt/workdayorg.jsp'
	var width=300;
	var height=243;
	var left=(window.screen.availWidth-width)/2;
	//var top=(window.screen.availHeight-height)/2;
	//var features="status:no;resizable:no;center:yes;scrollbars=no;help:no;dialogLeft:" + left + "px;" + "dialogTop:" + top + "px;" + "dialogWidth:" + width + "px;" + "dialogHeight:" + height+"px";
	//window.showModalDialog(openURL,window,features);
	open_windows(openURL,width,height);
	
}
function onload()
{
//disableButton("browse");
 var action = "<%=request.getAttribute("close_flag")%>";
  if(action == "close")
  {
    parent.returnValue = true;
    window.close();
    opener.reload();
  }
}
</script>
</head>
<uniflow:p_body onload="javascript:onload()" width="90%">

<uniflow:m_form action="editSchedule.do">
 <uniflow:tab >
    <uniflow:tabElement messageKey="workflow.schedule.bewteen" selected="true" action="javascript:button_onclick('betweenday')"/>
    
  </uniflow:tab>
<uniflow:p_content_wrapper>

  <uniflow:p_warning>
    <html:errors/>
  </uniflow:p_warning>
 <uniflow:p_content_table>
<uniflow:p_content_tr>
  <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.schedule.setlist.head.state"/></td>
  <td class="main_label_td" valign="middle" nowrap>
    <html:radio property="selectedItem" value="1"/><bean:message bundle="uniflow" key="workflow.schedule.relax.style.label"/>
    &nbsp;
    <html:radio property="selectedItem" value="0"/><bean:message bundle="uniflow" key="workflow.schedule.work.style.label"/>
  </td>
</uniflow:p_content_tr>
<uniflow:p_content_tr>
	<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.starttime"/>
	</td><td class="main_label_td" valign="middle" nowrap>
     <html:text property="startTime" readonly="true" styleClass="input_text150" style="behavior:url(<%=WorkflowManager.getWorkflowPath()%>/htc/Date.htc)"/>
     <a href="javascript:show_cal('startTime')"><img src='<%=WorkflowManager.getWorkflowStylePath()%>/style1/calender_img/time.gif' width='16' height='16' alt='弹出日历下拉菜单' border='0'></a>
    <html:hidden property="startTime_show"/>
	</td>
</uniflow:p_content_tr>
<uniflow:p_content_tr>
	<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.endtime"/>
	</td>
	<td class="main_label_td" valign="middle" nowrap>
	  <html:text property="endTime" readonly="true" styleClass="input_text150" style="behavior:url(<%=WorkflowManager.getWorkflowPath()%>/htc/Date.htc)"/>
     <a href="javascript:show_cal('endTime')"><img src='<%=WorkflowManager.getWorkflowStylePath()%>/style1/calender_img/time.gif' width='16' height='16' alt='弹出日历下拉菜单' border='0'></a>
     <html:hidden property="endTime_show"/>
	</td>
</uniflow:p_content_tr>
<!-- <uniflow:p_content_tr>
    <td class="main_label_td" valign="middle" nowrap>作用域</td>
    <td class="main_label_td" valign="middle" nowrap><html:text property="orgunit" styleClass="input_text150" readonly="true" disabled="true"/></td>
    <uniflow:button id="browse" action="javascript:open_orgwin()" name="浏览"></uniflow:button>
    </uniflow:p_content_tr>-->
<uniflow:p_content_tr>
	<td class="main_label_td" valign="middle" nowrap></td>
</uniflow:p_content_tr>
</uniflow:p_content_table>
</uniflow:p_content_wrapper>

<uniflow:p_action>
  <uniflow:button id="ok" action="javascript:button_onclick('BETWEENOK')" name="button.ok"></uniflow:button>
  <uniflow:button id="cancel" action="javascript:window.close()" name="button.cancel"></uniflow:button>
</uniflow:p_action>

<html:hidden property="action"/>
<html:hidden property="selectedId"/>
<html:hidden property="orgunitId"/>
<html:hidden property="category"/>
</uniflow:m_form>
</uniflow:p_body>

</html:html>