<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
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
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/DatePicker.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
</head>
<script language="javascript">
function button_onclick(action)
{
  if(freedayForm.startTime.value==""&&action=="OK"){
     warning_info.innerHTML = "<%=MessageUtil.getString(
								"workflow.schedule.startdate.notice", session)%>";
     return ;
  }
  if(freedayForm.endTime.value==""&&action=="OK"){
    warning_info.innerHTML = "<%=MessageUtil.getString(
								"workflow.schedule.enddate.notice", session)%>";
    return ;
  }
  if((action=="OK")&&(freedayForm.startTime.value>freedayForm.endTime.value)){
     warning_info.innerHTML ="<%=MessageUtil.getString("workflow.check.time.checked",
								request.getSession())%>";
     return;
  }
  if((action=="OK")&&(freedayForm.startTime.value==freedayForm.endTime.value)){
     warning_info.innerHTML ="<%=MessageUtil.getString("workflow.check.time.checked",
								request.getSession())%>";
     return;
  }
  freedayForm.action.value = action;
  document.freedayForm.submit();
}
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
	open_windows(openURL,width,height);
	
}
function onload(){
 var action = "<%=request.getAttribute("close_flag")%>";
  if(action == "close")
  {
    parent.returnValue = true;
    window.close();
    opener.reload();
  }
}

</script>
<uniflow:p_body onload="javascript:onload()" width="90%">

	<uniflow:m_form action="monthDay.do">


		<uniflow:tab>
			<uniflow:tabElement messageKey="workflow.schedule.bewteen"
				selected="false" action="javascript:button_onclick('betweenday')" />
			<uniflow:tabElement messageKey="workflow.schedule.monthday"
				selected="true" action="javascript:button_onclick('monthday')" />
			<uniflow:tabElement messageKey="workflow.schedule.weekday"
				selected="false" action="javascript:button_onclick('weekday')" />
		</uniflow:tab>
		<uniflow:p_content_wrapper>

			<uniflow:p_warning>
				<html:errors />
			</uniflow:p_warning>
			<uniflow:p_content_table>
				<uniflow:p_content_tr>
					<td class="main_label_td" valign="middle" nowrap>
						<bean:message bundle="uniflow"
							key="workflow.schedule.setlist.head.state" />
					</td>
					<td class="main_label_td" valign="middle"  colspan="2" nowrap>
						<html:radio property="selectedItem" value="1" />
						<bean:message bundle="uniflow"
							key="workflow.schedule.relax.style.label" />
						&nbsp;
						<html:radio property="selectedItem" value="0" />
						<bean:message bundle="uniflow"
							key="workflow.schedule.work.style.label" />
					</td>
					<td>&nbsp;</td>
				</uniflow:p_content_tr>
				<uniflow:p_content_tr>
					<td class="main_label_td" valign="middle" nowrap>
						<bean:message bundle="uniflow" key="workflow.starttime" />
					</td>
					<td class="main_label_td" valign="middle" colspan="2" nowrap>
						<html:text property="startTime" styleClass="input_text150"
							readonly="true"
							style="behavior:url(<%=WorkflowManager
															.getWorkflowPath()%>/htc/Date.htc)" />
						<a href="javascript:show_cal('startTime')"><img
								src='<%=WorkflowManager
													.getWorkflowStylePath()%>/style1/calender_img/time.gif'
								width='16' height='16' alt='弹出日历下拉菜单' border='0'></a>
						<html:hidden property="startTime_show" />
					</td>
					<td>
						&nbsp;
					</td>
				</uniflow:p_content_tr>
				<uniflow:p_content_tr>
					<td class="main_label_td" valign="middle" nowrap>
						<bean:message bundle="uniflow" key="workflow.endtime" />
					</td>
					<td class="main_label_td" valign="middle" colspan="2" nowrap>
						<html:text property="endTime" styleClass="input_text150"
							readonly="true"
							style="behavior:url(<%=WorkflowManager
															.getWorkflowPath()%>/htc/Date.htc)" />
						<a href="javascript:show_cal('endTime')"><img
								src='<%=WorkflowManager
													.getWorkflowStylePath()%>/style1/calender_img/time.gif'
								width='16' height='16' alt='弹出日历下拉菜单' border='0'></a>
						<html:hidden property="endTime_show" />
					</td>
					<td>
						&nbsp;
					</td>
				</uniflow:p_content_tr>
				<uniflow:p_content_tr>
					<td class="main_label_td" valign="middle" nowrap>
						<bean:message bundle="uniflow"
							key="workflow.schedule.monthday.style.label" />
						&nbsp;
					</td>
					<td class="main_label_td" valign="middle" colspan="2" nowrap>
						<html:select property="selDate" styleClass="input_text150">
							<html:options collection="allDate" property="value"
								labelProperty="label" />
						</html:select>
					</td>
					<td>
						&nbsp;
					</td>
				</uniflow:p_content_tr>
				    	<uniflow:p_content_tr>
					<td class="main_label_td" valign="middle" nowrap>作用域</td>
					<td>
						<table border='0'>
						   <tr><td class="main_list_td" valign="middle" width="30">
								<html:radio property="worktimeType" value="2"/>
						   		</td>
						   		<td class="main_list_td" valign="middle">缺省模式</td>
						   </tr> 
						   <tr><td class="main_list_td" valign="middle" width="30">
								<html:radio property="worktimeType" value="1"/>
						   		</td>
						   		<td class="main_list_td" valign="middle">组织单元</td>
						   </tr>
						   <tr>
						   		<td width="30">&nbsp;</td>
							    <td class="main_label_td" valign="middle" nowrap>
    								<html:text property="orgunit" styleClass="input_text120" readonly="true"/></td>
    								<uniflow:button id="browse" action="open_orgwin()" name="浏览"></uniflow:button>
						   </tr> 
						</table>
					</td>
				</uniflow:p_content_tr>
			</uniflow:p_content_table>
		</uniflow:p_content_wrapper>

		<uniflow:p_action>
			<uniflow:button id="ok" action="javascript:button_onclick('OK')"
				name="button.ok"></uniflow:button>
			<uniflow:button id="cancel" action="javascript:window.close()"
				name="button.cancel"></uniflow:button>
		</uniflow:p_action>

		<html:hidden property="action" />
		<html:hidden property="orgunitId" />
	</uniflow:m_form>
</uniflow:p_body>
</html:html>