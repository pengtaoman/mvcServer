<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.management.worktimemgt.forms.WorktimeForm"%>
<%@ page import="com.neusoft.uniflow.web.management.worktimemgt.beans.WorktimeBean"%>
<html:html locale="true">
<head>

	<uniflow:style />
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
	<script language="JavaScript">
function add_onclick()
{	
	var categoryId=document.forms[0].categoryId.value;
   var openURL = "<%=request.getContextPath()%>/addworktimeperiod.do?action=add&categoryid="+categoryId+"&calendarId="+document.forms[0].calendarId.value;
   var width = 400;
   var height = 230;
   open_modalWindow(openURL,width,height);
    
}
function modify_onclick()
{
  var IDs = getSelectedItemID();
  var dayPartId = IDs.split("#")[0];
  var categoryId = IDs.split("#")[1];
  var calendarId=document.forms[0].calendarId.value;
  var openURL = "<%=request.getContextPath()%>/addworktimeperiod.do?action=modify&dayPartId="+dayPartId+"&categoryId="+categoryId+"&calendarId="+calendarId;
  var width = 400;
  var height = 230;
  open_modalWindow(openURL,width,height);
}

function delete_onclick()
{
  if(delete_confirm("<%=MessageUtil.getString("workflow.confirm.delete",session)%>"))
  {
    document.worktimeForm.action.value="delete";
    document.worktimeForm.submit();
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
  location.href = "worktimeperiodlist.do";
}
function refresh(){
   location.reload();
}
function changeto(to)
{
  location.href=to;
}
</script>
</head>

<uniflow:m_body onload="javascript:itemChanged()">
<center>
<uniflow:m_form action="worktimeperiodlist.do">
   <uniflow:p_title>
 <bean:message bundle="uniflow" key="workflow.schedule.workperiod.list.title"/>
</uniflow:p_title>
   <uniflow:m_table style="main_list">
   <td  class="main_list_th" valign="middle" width="25" align="center" nowrap>&nbsp;</td>
   <uniflow:order_th value="workflow.starttime" />   
   <uniflow:order_th value="workflow.endtime" />    
   <logic:iterate id="worktime" name="worktimeForm" property="list"
					type="com.neusoft.uniflow.web.management.worktimemgt.beans.WorktimeBean"
					indexId="index">
					<uniflow:m_list_tr row="<%=index.intValue()%>">
					<td width="25" align="center" valign="middle" class="main_list_td">
							<html:radio property="selectedItem" value="<%=worktime.getDaypartId()+String.valueOf('#')+worktime.getCategory()%>"
								onclick="javascript:itemChanged()" />
						</td>
					<td valign="middle" class="main_list_td">
							<bean:write name="worktime" property="fromTime"  />
							&nbsp;
						</td>
					<td valign="middle" class="main_list_td">
							<bean:write name="worktime" property="toTime"  />
							&nbsp;
						</td>

					</uniflow:m_list_tr>
				</logic:iterate>
		</uniflow:m_table>
		<uniflow:m_table style="main_button">
		<tr><td>
			<uniflow:pageCtr
				curPage='<%=((com.neusoft.uniflow.web.management.worktimemgt.forms.WorktimeForm) request
												.getAttribute("worktimeForm"))
												.getCurrentPage()%>'
				maxPage='<%=((com.neusoft.uniflow.web.management.worktimemgt.forms.WorktimeForm) request
												.getAttribute("worktimeForm"))
												.getPagesCount()%>'
				total='<%=((com.neusoft.uniflow.web.management.worktimemgt.forms.WorktimeForm) request
												.getAttribute("worktimeForm"))
												.getTotal()%>' />
												
		</td><td align="right" >
		    <uniflow:m_button_table>
		 				<uniflow:button id="add" action="javascript:add_onclick()" name="button.new"/>
						<uniflow:button id="del" action="javascript:delete_onclick();"name="button.delete"/>
						<uniflow:button id="modify" action="javascript:modify_onclick()"name="button.modify"/>
						<uniflow:button id="cancel" action="javascript:window.close()" name="button.close"></uniflow:button>
		</uniflow:m_button_table>
		</td></tr>
        </uniflow:m_table>									
			<html:hidden property="currentPage" />
			<html:hidden property="pagesCount" />
			<html:hidden property="countOfPage" />
			<html:hidden property="requestPage" />
			<html:hidden property="orderBy" />
			<html:hidden property="ascending" />
			<html:hidden property="action" />
			<html:hidden property="dayPartId"/>
			<html:hidden property="calendarId"/>
			<html:hidden property="categoryId" />
		</uniflow:m_form>
	</center>
</uniflow:m_body>
</html:html>