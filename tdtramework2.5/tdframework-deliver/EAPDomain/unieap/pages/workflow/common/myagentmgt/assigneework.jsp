<%@ page contentType="text/html; charset=UTF-8"
	import="com.neusoft.uniflow.web.util.DateConversation"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.CommonInfoManager"%>
<html:html locale="true">
<head>
<%String state = request.getParameter("state");%>
<%String agentid = request.getParameter("agentid");%>
	<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
	<META HTTP-EQUIV="Expires" CONTENT="0">
	<title><bean:message bundle="uniflow" key = "workflow.popup"/></title>
	<uniflow:style />
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
	<script language="javascript">



function itemChanged()
{
  findSelectedItem();
}
function refresh()
{
  location.href = "<%=request.getContextPath()%>/assigneework.do?state=<%=state%>&agentid=<%=agentid%>";
}
function custom_window(){
  open_windows("<%=request.getContextPath()%>/custom.do?elements_name=workitem","400","365");  

}


</script>

</head>
<uniflow:m_body onload="javascript:itemChanged()">
<uniflow:m_form action="assigneework.do">
   <uniflow:m_table style="main_title_table">
	 <tr><td align="right" valign="middle" class="main_table2_td2">
		<table height="28" border="0" cellpadding="0" cellspacing="0"class="main_label_table">
           <tr>
			  <td>
			  <uniflow:commonbutton customAction='javascript:custom_window()' />                
            </td></tr>      
        </table></td>
     </tr>
   </uniflow:m_table>
   <uniflow:m_table style="main_list">
	 <td  class="main_list_th" valign="middle" width="25" align="center" nowrap>&nbsp;</td>
	 <uniflow:m_order_th name="name"   value="workflow.workitem.name"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.NAME%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).isAscending()%>'/>	
	 <uniflow:m_order_th name="workitemID"   value="workflow.workitem.workitemID"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.WORKITEM_INS_ID%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="actID"   value="workflow.workitem.actID"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.ACTIVITY_INS_ID%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="actname"   value="workflow.workitem.actname"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.NAME%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="state"   value="workflow.workitem.state"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.CURRENT_STATE%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="type"   value="workflow.workitem.type"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.TYPE%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="limittime"   value="workflow.workitem.limittime"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.LIMIT_TIME%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="priority"   value="workflow.workitem.priority"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.PRIORITY%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).isAscending()%>'/>	    

	 <uniflow:m_order_th name="createtime"   value="workflow.workitem.createtime"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.CREATE_TIME%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="completetime"   value="workflow.workitem.completetime"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.COMPLETE_TIME%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="category"   value="workflow.workitem.category"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.CATEGORY%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="sendtype"   value="workflow.workitem.sendtype"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.NAME%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="appname"   value="workflow.workitem.appname"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.APP_NAME%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="appURL"   value="workflow.workitem.appURL"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.APP_URL%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="apptype"   value="workflow.workitem.apptype"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.APP_TYPE%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="description"   value="workflow.workitem.description"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.DESCRIPTION%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).isAscending()%>'/>	
	 <uniflow:m_order_th name="procinstID"   value="workflow.workitem.procinstID"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.PROC_INSTANCE_ID%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).isAscending()%>'/>		
	 <logic:iterate id="workitem" name="assigneeWorkListForm" property="list" type="com.neusoft.uniflow.api.handler.NWWorkItem" indexId="index">
		<uniflow:m_list_tr row="<%=index.intValue()%>">
			<td width="25" align="center" valign="middle" class="main_list_td"><html:radio property="selectedItem" value="<%=workitem.getWorkItemID()%>" onclick="itemChanged()" />
				<html:hidden name="workitem" property="needCommitRole" />
				<html:hidden name="workitem" property="userType" />
				<html:hidden name="workitem" property="ADHoc" />
				<html:hidden name="workitem" property="reassignedWI" />
				<html:hidden name="workitem" property="curState" />
			</td>
			<uniflow:element collection="workitem" name="name"><bean:write bundle="uniflow" name="workitem" property="name" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="workitemID"><bean:write bundle="uniflow" name="workitem" property="workItemID" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="actID"><bean:write bundle="uniflow" name="workitem" property="actInstID" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="actname"><bean:write bundle="uniflow" name="workitem" property="name" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="state">
				<logic:equal name="workitem" property="curState" value="0">
					<bean:message bundle="uniflow" key="workflow.state.initial" />
				</logic:equal>
				<logic:equal name="workitem" property="curState" value="1">
					<bean:message bundle="uniflow" key="workflow.state.running" />
				</logic:equal>
				<logic:equal name="workitem" property="curState" value="2">
					<bean:message bundle="uniflow" key="workflow.state.active" />
				</logic:equal>
				<logic:equal name="workitem" property="curState" value="3">
					<bean:message bundle="uniflow" key="workflow.state.suspend" />
				</logic:equal>
				<logic:equal name="workitem" property="curState" value="4">
					<bean:message bundle="uniflow" key="workflow.state.complete" />
				</logic:equal>
				<logic:equal name="workitem" property="curState" value="5">
					<bean:message bundle="uniflow" key="workflow.state.abort" />
				</logic:equal>&nbsp;
	        </uniflow:element>
			<uniflow:element collection="workitem" name="type">
				<logic:equal name="workitem" property="ADHoc" value="true">
					<bean:message bundle="uniflow" key="workflow.workitem.transact.paculiar" />&nbsp;
	            </logic:equal>
			    <logic:equal name="workitem" property="ADHoc" value="false">
					<bean:message bundle="uniflow" key="workflow.workitem.transact.common" />&nbsp;</logic:equal>
			</uniflow:element>
			<uniflow:element collection="workitem" name="limittime"><%=DateConversation.parseMinToDHMS(workitem.getLimitTime())%>&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="priority"><bean:write bundle="uniflow" name="workitem" property="priority" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="createtime"><bean:write bundle="uniflow" name="workitem" property="startTime" formatKey="date.key" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="completetime"><bean:write bundle="uniflow" name="workitem" property="completeTime" formatKey="date.key" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="category"><bean:write bundle="uniflow" name="workitem" property="category" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="sendtype">
				<logic:equal name="workitem" property="actionType" value="0">
					<bean:message bundle="uniflow" key="workflow.workitem.sendtype.copy" />
				</logic:equal>
				<logic:equal name="workitem" property="actionType" value="1">
					<bean:message bundle="uniflow" key="workflow.workitem.sendtype.motive" />
				</logic:equal>
			</uniflow:element>
			<uniflow:element collection="workitem" name="appname"><bean:write bundle="uniflow" name="workitem" property="appName" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="appURL"><bean:write bundle="uniflow" name="workitem" property="appURL" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="apptype"><bean:write bundle="uniflow" name="workitem" property="appType" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="description"><bean:write bundle="uniflow" name="workitem" property="description" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="procinstID"><bean:write bundle="uniflow" name="workitem" property="procInstID" />&nbsp;</uniflow:element>

		</uniflow:m_list_tr>
		</logic:iterate>
		</uniflow:m_table>
		<uniflow:m_table style="main_button">
		<tr><td>
			<uniflow:pageCtr
				curPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).getCurrentPage()%>'
				maxPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).getPagesCount()%>'
				total='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeWorkListForm")).getTotal()%>' />
		</td><td align="right" >
		<uniflow:m_button_table>
		 	   <uniflow:button id="back" name="button.back" action="javascript:window.close()" />
            
		</uniflow:m_button_table>
		</td></tr>
        </uniflow:m_table>
			<html:hidden property="currentPage" />
			<html:hidden property="pagesCount" />
			<html:hidden property="countOfPage" />
			<html:hidden property="requestPage" />
			<html:hidden property="orderBy" />
			<html:hidden property="operation" />
			<html:hidden property="ascending" />
<html:hidden property="state" value="<%=state%>"/>
<html:hidden property="agentid" value="<%=agentid%>"/>
			
</uniflow:m_form>
</uniflow:m_body>
</html:html>