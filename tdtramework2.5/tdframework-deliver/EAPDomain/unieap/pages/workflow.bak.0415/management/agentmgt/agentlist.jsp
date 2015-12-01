<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<html:html locale="true">
<head>
	<title>业务代理</title>
	<uniflow:style />
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
	<script language="javascript">
function itemChanged(){  
  if(agentListForm.selectedItem){
	enableButton("modify");
	enableButton("del");
  }else{
    disableButton("modify"); 
    disableButton("del"); 
  }	
  findSelectedItem();      
}
function button_onclick(action){
  if ((window.confirm("<%=MessageUtil.getString("workflow.confirm.delete",request.getSession())%>"))==true){
  agentListForm.operation.value = action;
  document.agentListForm.submit();
  try{
      parent.title.delrefresh();
  }catch(e){}
  }
}
function createAgent(){
  var url = "<%=request.getContextPath()%>/agentcreate.do";
  open_windows(url,400,335);
  //window.open(url);
}
function modifyAgent(){
  var agentID = getSelectedItemID();
  var url = "<%=request.getContextPath()%>/agentmodify.do?agentid="+ agentID;
  open_windows(url,400,300);
}

function refresh(){
  location.href = "agentlist.do";
}
</script>
<jsp:include page="/unieap/pages/workflow/stylesheet/style2009/3levelMenuShared.jsp"></jsp:include>
</head>
<uniflow:m_body onload="javascript:itemChanged()">
<uniflow:m_form action="agentlist.do">
   <uniflow:m_table style="main_title_table">
	 <tr><td align="right" valign="middle" class="main_table2_td2">
		<table height="28" border="0" cellpadding="0" cellspacing="0"class="main_label_table">
           <tr><td height="25" valign="middle" nowrap class="main_label_td">
				<uniflow:commonbutton customization='false'refreshAction='javascript:refresh()' printAction='#'customAction='#' />
            </td></tr>      
        </table></td>
     </tr>
   </uniflow:m_table>
   <uniflow:m_table style="main_list">
   <td  class="main_list_th" valign="middle" width="25" align="center" nowrap>&nbsp;</td>   
   <uniflow:order_th  value="workflow.common.agentinfo.assigner"/>   
   <uniflow:order_th  value="workflow.common.agentinfo.assignee"/>    
   <uniflow:order_th  value="workflow.starttime"/>   
   <uniflow:order_th  value="workflow.endtime"/>  
   <uniflow:order_th value="代理创建者"/>
   <uniflow:order_th value="流程分类"/>
   <uniflow:order_th value="模板流程"></uniflow:order_th>
   <logic:iterate id="agent" name="agentListForm" property="list"
					type="com.neusoft.uniflow.web.management.agentmgt.agentlist.beans.AgentBean"
					indexId="index">
					<uniflow:m_list_tr row="<%=index.intValue()%>">
						<td width="25" align="center" valign="middle" class="main_list_td">
							<html:radio property="selectedItem" value="<%=agent.getId()%>"
								onclick="itemChanged()" />
						</td>
						<td valign="middle" class="main_list_td">
							<bean:write name="agent" property="assigner" />
							&nbsp;
						</td>
						<td valign="middle" class="main_list_td">
							<bean:write name="agent" property="assignee" />
							&nbsp;
						</td>
						<td valign="middle" class="main_list_td">
							<bean:write name="agent" property="stime" />
							&nbsp;
						</td>
						<td valign="middle" class="main_list_td">
							<bean:write name="agent" property="etime" />
							&nbsp;
						</td>
						<td valign="middle" class="main_list_td">
							<bean:write name="agent" property="createName"/>
						</td>
						<td valign="middle" class="main_list_td">
							<bean:write name="agent" property="categoryName"/>&nbsp;
						</td>
						<td valign="middle" class="main_list_td">
						<bean:write name="agent" property="processName"/>&nbsp;
						</td>
					</uniflow:m_list_tr>
				</logic:iterate>
		</uniflow:m_table>
		<uniflow:m_table style="main_button">
		<tr><td>
			<uniflow:pageCtr
				curPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("agentListForm"))
												.getCurrentPage()%>'
				maxPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("agentListForm"))
												.getPagesCount()%>'
				total='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("agentListForm"))
												.getTotal()%>' />
			</td><td align="right" >
		    <uniflow:m_button_table>
		    	<uniflow:button id="create" action="javascript:createAgent()" name="button.new"/>
				<uniflow:button id="del"action="javascript:button_onclick('delete')"name="button.delete"/>
		   		<uniflow:button id="modify" action="javascript:modifyAgent()" name="button.modify"/>
			</uniflow:m_button_table>
		    </td></tr>
            </uniflow:m_table>
			<html:hidden property="currentPage" />
			<html:hidden property="pagesCount" />
			<html:hidden property="countOfPage" />
			<html:hidden property="requestPage" />
			<html:hidden property="orderBy" />
			<html:hidden property="ascending" />
			<html:hidden property="operation" />
	</uniflow:m_form>
</uniflow:m_body>
</html:html>