<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.neusoft.uniflow.api.calendar.NWCalendar"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
<title>工作日历</title>
	<uniflow:style />
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/DatePicker.js"></script>
	<script language="JavaScript"src="<%=WorkflowManager.getWorkflowPath()%>/js/AjaxUtil.js"></script>
	<script language="JavaScript">
function add_onclick()
{
    var openURL = "<%=request.getContextPath()%>/between.do?action=add&workCategoryId="+document.forms[0].workdaycategoryId.value;
   // window.open(openURL);
    var width = 400;
    var height = 240;
    open_windows(openURL,width,height);
    
}
function modify_onclick()
{
  var rb;
  var ids;
  var scheduleId = getSelectedItemID().split("#")[0];
  var categoryId=getSelectedItemID().split("#")[1];
  var openURL = "<%=request.getContextPath()%>/editSchedule.do?action=modify&id="+scheduleId+"&categoryid="+categoryId;
  var width = 400;
  var height = 280;
  open_windows(openURL,width,height);
}

function delete_onclick()
{
  if(delete_confirm("<%=MessageUtil.getString("workflow.confirm.delete",session)%>"))
  {
    document.scheduleForm.action.value="delete";
    document.scheduleForm.submit();
  }
}
function refrshMemory_onclick(){
	var url="ajaxutil?method=refreshMemory";
	send_request(url);
}
function getResponseText(){
     if(http_request.readyState==4){
         if (http_request.status == 200){
              	var responseText = http_request.responseText;
              	if (responseText=="success"){
              		alert("更新成功！");
              	}else{
              		alert("更新失败");
              	}

         }
     }
}
function itemChanged()
{
  findSelectedItem();
  if(!document.forms[0].selectedItem)
  {
    disableButton("modify");
    disableButton("del");
  }
}

function reload()
{
  location.reload();
}
function refresh()
{
	//parent.document.getElementById("actsel").url="<%=request.getContextPath() %>/workdayCategory.do";
    //location.reload();
    parent.refreshWorkdayInfo();
}
function changeto(to)
{
  location.href=to;
}
function perioddetail_onclick(){  
      var selectID = getSelectedItemID();
      var temp = selectID.split("#");
      var id = temp[0];
      var category=temp[1];
	  var openURL = "<%=request.getContextPath()%>/worktimeperiodlist.do?calendarId="+id+"&categoryId="+category; 
	  var width = 550;
	  var height = 360;
	  open_windows(openURL,width,height);
}
</script>
</head>

<body onload="javascript:itemChanged()"  style="margin-right:0px;">
<uniflow:m_form action="schedule.do">
   <uniflow:m_table style="main_title_table">
	 <tr><td align="right" valign="middle" class="main_table2_td2">
		<table height="28" border="0" cellpadding="0" cellspacing="0"class="main_label_table">
           <tr>
			  <td>
                 <uniflow:commonbutton customization="false" />
              </td></tr>      
        </table></td>
     </tr>
   </uniflow:m_table>
   <uniflow:m_table style="main_list">
   <td  class="main_list_th" valign="middle" width="25" align="center" nowrap>&nbsp;</td>
   <uniflow:order_th value="workflow.schedule.setlist.head.type" orderby="type" 
   orderKey='<%=((com.neusoft.uniflow.web.management.workdaymgt.forms.ScheduleForm) request.getAttribute("scheduleForm")).getOrderBy()%>'
   ascending='<%=((com.neusoft.uniflow.web.management.workdaymgt.forms.ScheduleForm) request.getAttribute("scheduleForm")).isAscending()%>'/>   
   <uniflow:order_th value="workflow.starttime" orderby="starttime"
   orderKey='<%=((com.neusoft.uniflow.web.management.workdaymgt.forms.ScheduleForm) request.getAttribute("scheduleForm")).getOrderBy()%>'
   ascending='<%=((com.neusoft.uniflow.web.management.workdaymgt.forms.ScheduleForm) request.getAttribute("scheduleForm")).isAscending()%>'/>       
   <uniflow:order_th value="workflow.endtime" orderby="endtime"
   orderKey='<%=((com.neusoft.uniflow.web.management.workdaymgt.forms.ScheduleForm) request.getAttribute("scheduleForm")).getOrderBy()%>'
   ascending='<%=((com.neusoft.uniflow.web.management.workdaymgt.forms.ScheduleForm) request.getAttribute("scheduleForm")).isAscending()%>'/>    
   <uniflow:order_th value="workflow.schedule.setlist.head.state"/> 
   <uniflow:order_th value="workflow.schedule.setlist.head.monthday"/>    
   <uniflow:order_th value="workflow.schedule.setlist.head.weekday"/> 
   <uniflow:order_th value="详细"/>
   <logic:iterate id="schedules" name="scheduleForm" property="list" type="com.neusoft.uniflow.web.management.workdaymgt.beans.NWCalendarBean" indexId="index">
	 <uniflow:m_list_tr row="<%=index.intValue()%>">
		<td width="25" align="center" valign="middle" class="main_list_td">
			<html:radio property="selectedItem" value="<%=schedules.getId()+String.valueOf('#')+schedules.getCategory()%>" onclick="javascript:itemChanged()" />
		</td>
		<td valign="middle" class="main_list_td">
			<logic:equal name="schedules" property="type" value="1">
				<bean:message bundle="uniflow" key="workflow.schedule.bewteen" />&nbsp;
	        </logic:equal>
			<logic:equal name="schedules" property="type" value="2">
			    <bean:message bundle="uniflow" key="workflow.schedule.monthday" />&nbsp;
	        </logic:equal>
		    <logic:equal name="schedules" property="type" value="3">
			    <bean:message bundle="uniflow" key="workflow.schedule.weekday" />&nbsp;
	        </logic:equal>
		</td>
	    <td valign="middle" class="main_list_td">
			<bean:write name="schedules" property="fromDate" bundle="uniflow" formatKey="date.key" />&nbsp;
		</td>
	    <td valign="middle" class="main_list_td">
			<bean:write name="schedules" property="toDate" bundle="uniflow" formatKey="date.key" />&nbsp;
		</td>
		<td valign="middle" class="main_list_td">
			&nbsp;
			<logic:equal name="schedules" property="isHoliday" value="true">
				<bean:message bundle="uniflow" key="workflow.schedule.relax.style.label"/>
			</logic:equal>
			<logic:equal name="schedules" property="isHoliday" value="false">
				<bean:message bundle="uniflow" key="workflow.schedule.work.style.label"/>
			</logic:equal>
		</td>
	    <td valign="middle" class="main_list_td">
			<logic:equal name="schedules" property="monthDay" value="0">&nbsp;
	        </logic:equal>
			<logic:notEqual name="schedules" property="monthDay" value="0">
				<bean:write name="schedules" property="monthDay" format="#.##" />&nbsp;
	        </logic:notEqual>
	    </td>
	    <td valign="middle" class="main_list_td">
		<logic:equal name="schedules" property="weekDay" value="">
&nbsp;
	  </logic:equal>
		<logic:equal name="schedules" property="weekDay" value="0">
	&nbsp;
	  </logic:equal>
							<logic:equal name="schedules" property="weekDay" value="1">
								<bean:message bundle="uniflow"
									key="workflow.schedule.display.week.sunday" />
							</logic:equal>
							<logic:equal name="schedules" property="weekDay" value="2">
								<bean:message bundle="uniflow"
									key="workflow.schedule.display.week.monday" />
							</logic:equal>
							<logic:equal name="schedules" property="weekDay" value="3">
								<bean:message bundle="uniflow"
									key="workflow.schedule.display.week.tuesday" />
							</logic:equal>
							<logic:equal name="schedules" property="weekDay" value="4">
								<bean:message bundle="uniflow"
									key="workflow.schedule.display.week.wednesday" />
							</logic:equal>
							<logic:equal name="schedules" property="weekDay" value="5">
								<bean:message bundle="uniflow"
									key="workflow.schedule.display.week.thursday" />
							</logic:equal>
							<logic:equal name="schedules" property="weekDay" value="6">
								<bean:message bundle="uniflow"
									key="workflow.schedule.display.week.friday" />
							</logic:equal>
							<logic:equal name="schedules" property="weekDay" value="7">
								<bean:message bundle="uniflow"
									key="workflow.schedule.display.week.saturday" />
							</logic:equal>
						</td>
						<logic:equal name="schedules" property="isHoliday" value="true">
							<td valign="middle" class="main_list_td"><bean:message bundle="uniflow" key="workflow.view" /></td>
						</logic:equal>
						<logic:equal name="schedules" property="isHoliday" value="false">
							<td valign="middle" class="main_list_td"><a href="javascript:perioddetail_onclick()" ><bean:message bundle="uniflow" key="workflow.view" /></a> </td>
						</logic:equal>
					</uniflow:m_list_tr>
				</logic:iterate>
		</uniflow:m_table>
		<uniflow:m_table style="main_button">
		<tr><td>
			<uniflow:pageCtr
				curPage='<%=((com.neusoft.uniflow.web.management.workdaymgt.forms.ScheduleForm) request
												.getAttribute("scheduleForm"))
												.getCurrentPage()%>'
				maxPage='<%=((com.neusoft.uniflow.web.management.workdaymgt.forms.ScheduleForm) request
												.getAttribute("scheduleForm"))
												.getPagesCount()%>'
				total='<%=((com.neusoft.uniflow.web.management.workdaymgt.forms.ScheduleForm) request
												.getAttribute("scheduleForm"))
												.getTotal()%>' 	/>	
			</td><td align="right" >
		    <uniflow:m_button_table>
		 				<uniflow:button id="add" action="javascript:add_onclick()" name="button.new"/>
						<uniflow:button id="del" action="javascript:delete_onclick();" name="button.delete"/>
		　　　　			<uniflow:button id="modify" action="javascript:modify_onclick()" name="button.modify"/>
						<uniflow:button id="refreshMemory" action="javascript:refrshMemory_onclick()" name="更新缓存"/>
			</uniflow:m_button_table>
		</td></tr>
        </uniflow:m_table>
        	<html:hidden property="workdaycategoryId"/>
			<html:hidden property="currentPage" />
			<html:hidden property="pagesCount" />
			<html:hidden property="countOfPage" />
			<html:hidden property="requestPage" />
			<html:hidden property="orderBy" />
			<html:hidden property="ascending" />
			<html:hidden property="action" />
		</uniflow:m_form>
</body>
</html:html>