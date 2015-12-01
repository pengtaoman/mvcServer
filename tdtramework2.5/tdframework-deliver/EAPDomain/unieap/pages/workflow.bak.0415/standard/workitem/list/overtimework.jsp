<%@ page contentType="text/html; charset=UTF-8"import="com.neusoft.uniflow.web.util.DateConversation"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.CommonInfoManager"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>

<html:html locale="true">
<head>
<%String operation = request.getParameter("op"); %>
<%String state = request.getParameter("state"); %>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0">
<uniflow:style/>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<script language="javascript">
function adhoc_onclick()
{
    var workItemID = getSelectedItemID();
    var adhoc = getSelectedItemValue("ADHoc");    //alert(adhoc);
    var openURL = "<%=request.getContextPath()%>/adhoc.do?workItemID="+workItemID;
    var width = 590;
    var height = 550;
    open_windows(openURL,width,height);
}

function complete_onclick()
{
  var selectedID=getSelectedItemID();
  var needCommitRole = getSelectedItemValue("needCommitRole");
  if(needCommitRole=="true"){
    var openURL = "<%=request.getContextPath()%>/creatrole.do?operation=workitem&selectedID="+selectedID;
    open_modalWindow(openURL,'360','290');
  }else{
    document.overtimeWorkListForm.operation.value = "complete";
    document.overtimeWorkListForm.action = "overtimework.do";
    document.overtimeWorkListForm.submit();
  }
}
function reassign_onclick()
{
    var workItemID = getSelectedItemID();
    var openURL = "<%=request.getContextPath()%>/reassign.do?workitemID="+workItemID;
    var width = 400;
    var height = 376;
    open_modalWindow(openURL,width,height);
}
function open_onclick()
{
    var rb;
    var workItemID = getSelectedItemID();
    var openURL = "<%=request.getContextPath()%>/openworkitem.do?workitemID="+workItemID;
    var width = window.screen.availWidth-80;
    var height = window.screen.availHeight-50;
    var left = (window.screen.availWidth - width) / 2;    
    var top = (window.screen.availHeight - height) / 2;      
    var features = "status=no,resizable=no,scrollbars=no,left=" + left + "," + "top=" + top + "," + "width=" + width + "," + "height=" + height;
    window.open(openURL, "", features);

}
function rollback_onclick()
{
    var rb;
    var workItemID = getSelectedItemID();
    var openURL = "<%=request.getContextPath()%>/rollback.do?workItemID="+workItemID;
    var width = 400;
    var height =240;
    open_modalWindow(openURL,width,height);
}
function directto_onclick()
{
    var rb;
    var workItemID = getSelectedItemID();
    var openURL = "<%=request.getContextPath()%>/sendto.do?workItemID="+workItemID;
    var width = 590;
    var height = 604;
    open_modalWindow(openURL,width,height);
}
function nextto_onclick()
{
    var rb;
    var workItemID = getSelectedItemID();
    //var openURL = "<%=request.getContextPath()%>/nextto.do?workitemID="+workItemID;
    var openURL = "<%=request.getContextPath()%>/nextAct.do?workitemID="+workItemID; //add liwei
    var width = 400;
    var height = 400;
    open_scrollable_window(openURL,width,height);
}
function withdraw_onclick(){
    document.forms[0].operation.value = "withdraw";
    document.forms[0].submit();
}
var returnFlag = true;
function itemChanged()
{
  var returnValue = "<%=request.getAttribute("withdraw")%>";
  if (returnValue=="withdraw" && returnFlag){
     alert("<%=MessageUtil.getString("workflow.alt.workitem.withdraw",request.getSession())%>");
     returnFlag = false;
  }
  var rb,checkedItem,isADHoc,isReasign,curState;
  if(overtimeWorkListForm.selectedItem){
    if(overtimeWorkListForm.selectedItem.length)
    {
	for (i = 0; i < overtimeWorkListForm.selectedItem.length; i++) {
	  rb = overtimeWorkListForm.selectedItem[i];
	  if (rb.checked) {
	    checkedItem = rb;
	    isADHoc = overtimeWorkListForm.ADHoc[i].value;
	    isReasign = overtimeWorkListForm.reassignedWI[i].value;
	    curState = overtimeWorkListForm.curState[i].value;
	    break;
	  }
	}
    }
    else
    {
	checkedItem = overtimeWorkListForm.selectedItem;
	isADHoc = overtimeWorkListForm.ADHoc.value;
	isReasign = overtimeWorkListForm.reassignedWI.value;
	curState = overtimeWorkListForm.curState.value;
    }
    <% if (operation.equals("all")) {%>
    if(curState==1&&checkedItem&&checkedItem.checked) {
	   enableButton("complete");
	   enableButton("reassign");
	   if(isADHoc=="true"||isReasign=="true"){
	     disableButton("rollback");
	     disableButton("ad_hoc");
	   }else{
	     enableButton("ad_hoc");
	     enableButton("rollback");
	   }
	   enableButton("directto");
	   enableButton("nextto");
	   //enableButton("take");   
    }else{
	   disableButton("ad_hoc");
	   disableButton("complete");
	   disableButton("reassign");
	   disableButton("rollback");
	   disableButton("directto");
	   disableButton("nextto");
	   //disableButton("take");
    }
    <%}%>  
  }else
  { <% if (operation.equals("all")) {%>
    disableButton("ad_hoc");
    disableButton("complete");
    disableButton("reassign");
    disableButton("open");
    disableButton("rollback");
    disableButton("directto");
    disableButton("nextto");
    //disableButton("take");
    <%}else{%>
     disableButton("open");
     disableButton("withdraw");
    <%}%>
  }
  findSelectedItem();
}


function reload()
{
  location.href = "overtimework.do?state="+"<%=state%>";
}
function refresh()
{
  location.href = "<%=request.getContextPath()%>/overtimework.do?state="+"<%=state%>&op=<%=operation%>";
}
function custom_window(){
  open_windows("<%=request.getContextPath()%>/custom.do?elements_name=workitem","400","365");
  
}
function changeto(action){
   location.href = "<%=request.getContextPath()%>/"+action+"?state="+"<%=state%>&op=<%=operation%>";
}
</script>

</head>
<uniflow:m_body onload="javascript:itemChanged()">
<uniflow:m_form action="overtimework.do">
   <uniflow:m_table style="main_title_table">
	 <tr><td align="right" valign="middle" class="main_table2_td2">
		<table height="28" border="0" cellpadding="0" cellspacing="0"class="main_label_table">
           <tr><td height="25" valign="middle" nowrap class="main_label_td">
              <select onchange="javascript:changeto('allwork.do')" 
                     style="font-family: Verdana, Arial, '宋体';font-size: 12px; color: #000000;">
					<option value="defer" selected><bean:message bundle="uniflow" key="workflow.workitem.list.overtime" /></option>
			        <option value="all"><bean:message bundle="uniflow" key="workflow.workitem.list" /></option>
			  </select>
			  </td>
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
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="workitemID"   value="workflow.workitem.workitemID"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.WORKITEM_INS_ID%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="actID"   value="workflow.workitem.actID"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.ACTIVITY_INS_ID%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="actname"   value="workflow.workitem.actname"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.NAME%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="state"   value="workflow.workitem.state"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.CURRENT_STATE%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="type"   value="workflow.workitem.type"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.TYPE%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="limittime"   value="workflow.workitem.limittime"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.LIMIT_TIME%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="priority"   value="workflow.workitem.priority"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.PRIORITY%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).isAscending()%>'/>	    

	 <uniflow:m_order_th name="createtime"   value="workflow.workitem.createtime"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.CREATE_TIME%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="completetime"   value="workflow.workitem.completetime"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.COMPLETE_TIME%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="category"   value="workflow.workitem.category"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.CATEGORY%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="sendtype"   value="workflow.workitem.sendtype"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.NAME%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="appname"   value="workflow.workitem.appname"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.APP_NAME%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="appURL"   value="workflow.workitem.appURL"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.APP_URL%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="apptype"   value="workflow.workitem.apptype"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.APP_TYPE%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="description"   value="workflow.workitem.description"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.DESCRIPTION%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).isAscending()%>'/>	
	 <uniflow:m_order_th name="procinstID"   value="workflow.workitem.procinstID"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.PROC_INSTANCE_ID%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).isAscending()%>'/>		
	<uniflow:order_th value="workflow.workitem.preactname" />   
   <uniflow:order_th value="workflow.workitem.preactpart" /> 
   <uniflow:order_th value="workflow.workitem.procinstname" />  
	 <logic:iterate id="workitem" name="overtimeWorkListForm" property="list" type="com.neusoft.uniflow.api.handler.NWWorkItem" indexId="index">
		<uniflow:m_list_tr row="<%=index.intValue()%>">
			<td width="25" align="center" valign="middle" class="main_list_td"><html:radio property="selectedItem"value="<%=workitem.getWorkItemID()%>" onclick="itemChanged()" />
				<html:hidden name="workitem" property="needCommitRole" />
				<html:hidden name="workitem" property="userType" />
				<html:hidden name="workitem" property="ADHoc" />
				<html:hidden name="workitem" property="reassignedWI" />
				<html:hidden name="workitem" property="curState" />
			</td>
			<uniflow:element collection="workitem" name="name"><bean:write bundle="uniflow" name="workitem" property="name" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="workitemID"><bean:write bundle="uniflow" name="workitem"property="workItemID" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="actID"><bean:write bundle="uniflow" name="workitem" property="actInstID" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="actname"><bean:write bundle="uniflow" name="workitem" property="name" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="state">
				<logic:equal name="workitem" property="curState" value="0">
					<bean:message bundle="uniflow"key="workflow.state.initial" />
				</logic:equal>
				<logic:equal name="workitem" property="curState" value="1">
					<bean:message bundle="uniflow"key="workflow.state.running" />
				</logic:equal>
				<logic:equal name="workitem" property="curState" value="2">
					<bean:message bundle="uniflow"key="workflow.state.active" />
				</logic:equal>
				<logic:equal name="workitem" property="curState" value="3">
					<bean:message bundle="uniflow"key="workflow.state.suspend" />
				</logic:equal>
				<logic:equal name="workitem" property="curState" value="4">
					<bean:message bundle="uniflow"key="workflow.state.complete" />
				</logic:equal>
				<logic:equal name="workitem" property="curState" value="5">
					<bean:message bundle="uniflow"key="workflow.state.abort" />
				</logic:equal>&nbsp;
	        </uniflow:element>
			<uniflow:element collection="workitem" name="type">
				<logic:equal name="workitem" property="ADHoc" value="true">
					<bean:message bundle="uniflow"key="workflow.workitem.transact.paculiar" />&nbsp;
	            </logic:equal>
			    <logic:equal name="workitem" property="ADHoc" value="false">
					<bean:message bundle="uniflow"key="workflow.workitem.transact.common" />&nbsp;</logic:equal>
			</uniflow:element>
			<uniflow:element collection="workitem" name="limittime"><%=DateConversation.parseMinToDHMS(workitem.getLimitTime())%>&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="priority"><bean:write bundle="uniflow" name="workitem" property="priority" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="createtime"><bean:write bundle="uniflow" name="workitem" property="startTime"formatKey="date.key" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="completetime"><bean:write bundle="uniflow" name="workitem"property="completeTime" formatKey="date.key" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="category"><bean:write bundle="uniflow" name="workitem" property="category" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="sendtype">
				<logic:equal name="workitem" property="actionType" value="0">
					<bean:message bundle="uniflow"key="workflow.workitem.sendtype.copy" />
				</logic:equal>
				<logic:equal name="workitem" property="actionType" value="1">
					<bean:message bundle="uniflow"key="workflow.workitem.sendtype.motive" />
				</logic:equal>
			</uniflow:element>
			<uniflow:element collection="workitem" name="appname"><bean:write bundle="uniflow" name="workitem" property="appName" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="appURL"><bean:write bundle="uniflow" name="workitem" property="appURL" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="apptype"><bean:write bundle="uniflow" name="workitem" property="appType" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="description"><bean:write bundle="uniflow" name="workitem"property="description" />&nbsp;</uniflow:element>
			<uniflow:element collection="workitem" name="procinstID"><bean:write bundle="uniflow" name="workitem"property="procInstID" />&nbsp;</uniflow:element>
		      <td valign="middle" class="main_list_td"><%=CommonInfoManager.getPreActName(workitem.getWorkItemID())%>&nbsp;</td>
	<td valign="middle" class="main_list_td"><%=CommonInfoManager.getPreActUser(workitem.getWorkItemID())%>&nbsp;</td>
	<td valign="middle" class="main_list_td"><%=CommonInfoManager.getProcInstName(workitem.getWorkItemID())%>&nbsp;</td>

		</uniflow:m_list_tr>
		</logic:iterate>
		</uniflow:m_table>
		<uniflow:m_table style="main_button">
		<tr><td>
			<uniflow:pageCtr
				curPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).getCurrentPage()%>'
				maxPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).getPagesCount()%>'
				total='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("overtimeWorkListForm")).getTotal()%>' />
		</td><td align="right" >
		<uniflow:m_button_table>
		<%if (operation.equals("open")){ %>
		 	<uniflow:button id="open" name="button.open" action="javascript:open_onclick()" />
		 	<uniflow:button id="withdraw" name="button.withdraw" action="javascript:withdraw_onclick()" />
		<%}else if(operation.equals("all")){ %> 
		    <uniflow:button id="open" name="button.open" action="javascript:open_onclick()" />	
			<uniflow:button id="ad_hoc" name="button.ad-hoc" action="javascript:adhoc_onclick()" />
			<uniflow:button id="reassign" name="button.reassign" action="javascript:reassign_onclick()"  />
            <uniflow:button id="directto" name="button.directto" action="javascript:directto_onclick()"  />
			<uniflow:button id="nextto" name="button.nextto" action="javascript:nextto_onclick()" />
            <uniflow:button id="complete" name="button.complete" action="javascript:complete_onclick()"  />
            <uniflow:button id="rollback" name="button.rollback" action="javascript:rollback_onclick()" />
        <%} %>
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
			<html:hidden property="state" value="<%=state %>"/><html:hidden property="op" value="<%=operation %>"/>
</uniflow:m_form>
</uniflow:m_body>
</html:html>
