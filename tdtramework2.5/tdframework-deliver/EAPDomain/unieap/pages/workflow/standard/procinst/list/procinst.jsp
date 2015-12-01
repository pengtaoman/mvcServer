
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.DateConversation"%>
<html:html locale="true">
<head>
	<%
		String operation = request.getParameter("op");
	%>
	<%
		String state = request.getParameter("state");
		if(state.equals("15")){
			out.print("<title>未完成实例</title>");
			}else if(state.equals("48")){
				out.print("<title>已完成实例</title>");
			}
	%>

	<uniflow:style />
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
	<script language="javascript">

function refresh(){
  location.href = "<%=request.getContextPath()%>/procinst.do?state="+"<%=state%>&op=<%=operation%>";
}
function reload()
{
  location.href = "<%=request.getContextPath()%>/procinst.do?state="+"<%=state%>&op=<%=operation%>";
}
function onload()
{
	changeTitle()
	itemChanged();
}
function changeTitle()
{
	var state = '<%=state%>';
	if(state=="15"){
	document.title='未完成实例';
	}else if(state=="48"){
	document.title='已完成实例';
	}
}
function button_onclick(action)
{
  if (action=="delete"){
     if ((window.confirm("<%=MessageUtil.getString("workflow.confirm.delete",
								request.getSession())%>"))==true){
         document.procinstForm.operation.value = action;
         document.procinstForm.submit();
     }else{
         return;
     }
  }else{
         document.procinstForm.operation.value = action;
         document.procinstForm.submit();
  }
}
function RD_onclick()
{
  var selectedID=getSelectedItemID();
  var openURL = "<%=request.getContextPath()%>/rd.do?operation=procinst&selectedID="+selectedID;
  open_scrollable_window(openURL,'360','270');
}

function svgm_onclick()
{
  var selectedID = getSelectedItemID()
  var openURL = "<%=request.getContextPath()%>/procmonitor.do?procInstID="+selectedID+"&oplevel=''";
  location.href = openURL;
}
function svgv_onclick(){
var selectedID = getSelectedItemID()
  var openURL = "<%=request.getContextPath()%>/procmonitor.do?procInstID="+selectedID+"&oplevel=view";
  location.href = openURL;
}
function cnv_onclick(){
  var selectedID = getSelectedItemID()
  var openURL = "<%=request.getContextPath()%>/createversion.do?operation=createnewversion&procInstID="+selectedID;
  open_scrollable_window(openURL,'500','250');
}

function itemChanged()
{
    var state,type;
    var rb;
    if(procinstForm.selectedItem){
    state=getSelectedItemValue("curstate");
<% if (operation.equals("all")){%>
	if(state&&state==0)
	{
	  //enableButton("start");
	  //enableButton("rd");
	  disableButton("suspend");
	  disableButton("resume");
	  disableButton("restart");
	  enableButton("abort");
	  enableButton("svgm");
	}
	else if(state&&state==1)
	{
	  //disableButton("start");
	  //disableButton("rd");
	  enableButton("suspend");
	  disableButton("resume");
	  enableButton("restart");
	  enableButton("abort");
	  enableButton("svgm");
	}
	else if(state&&state==2)
	{
	  //disableButton("start");
	  //disableButton("rd");
	  disableButton("suspend");
	  disableButton("resume");
	  disableButton("restart");
	  disableButton("abort");
	  enableButton("svgm");
	}
	else if(state&&state==3)
	{
	  //disableButton("start");
	  //disableButton("rd");
	  disableButton("suspend");
	  enableButton("resume");
	  disableButton("restart");
	  enableButton("abort");
	  enableButton("svgm");
	}
	else if(state&&state==4)
	{
	  //disableButton("start");
	  //disableButton("rd");
	  disableButton("suspend");
	  disableButton("resume");
	  disableButton("restart");
	  disableButton("abort");
	  enableButton("svgm");
	}
	else if(state&&state==5)
	{
	  //disableButton("start");
	  //disableButton("rd");
	  disableButton("suspend");
	  disableButton("resume");
	  disableButton("restart");
	  disableButton("abort");
	  enableButton("svgm");
	}
	<%}else if (operation.equals("monitor")){%>
		  enableButton("del");
	      //enableButton("svgm");
	<%}%>	
    }else
    {
    <% if (operation.equals("all")){%>
	//disableButton("start");
	//disableButton("rd");
	disableButton("suspend");
	disableButton("resume");
	disableButton("restart");
	disableButton("abort");
	disableButton("svgm");
	<%}else if (operation.equals("monitor")){%>
	disableButton("del");
	//disableButton("svgm");
	disableButton("svgview");
	<%}else if(operation.equals("createversion")){%>
	disableButton("del");
	disableButton("createversion");
	<%}%>
    }
    findSelectedItem();
}
function custom_window(){
  open_windows("<%=request.getContextPath()%>/custom.do?elements_name=procinst","400","350");
  
}
function search_onclick(){
  document.forms[0].operation.value = "search";
  document.forms[0].submit();
}
</script>
	<jsp:include
		page="/unieap/pages/workflow/stylesheet/style2009/3levelMenuShared.jsp"></jsp:include>
</head>
<uniflow:m_body onload="javascript:onload()">
	<uniflow:m_form action="procinst.do">
		<div id="Layer1"
			style="position: absolute; left: 208px; top: 93px; width: 340px; height: 155px; z-index: 1; visibility: hidden">
			<table border="1" bordercolordark="#00eeFF"
				bordercolorlight="#0000cc" cellpadding="2" cellspacing="0"
				class="T_song12bk2" width="100%" bgcolor="#FFFFFF">
				<tr valign="bottom" class="main_list_th">
					<td class="th" nowrap width="37%">
						<table width="98%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td width="40">
									&nbsp;
								</td>
								<td align="center" class="T_song12_wt">
									<b>&#27969;&#31243;&#23454;&#20363;&#26597;&#35810;</b>
								</td>
								<td width="40" align="right">
									<a href="#" onclick="MM_showHideLayers('Layer1','','hide')"><img
											src="<%=request.getContextPath()%>/unieap/pages/workflow/stylesheet/images/button/icon_close.gif"
											width="17" height="17" border="0">
									</a>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td align="center" height="80">
						&#21517;&#31216;&#65306;
						<input type="text" name="procInstName" size="20" maxlength="40" />
						<input type="button" name="search" class="button_normal"
							value="查询" onclick="search_onclick()" />
					</td>
				</tr>
			</table>
		</div>
		<uniflow:m_table style="main_title_table">
			<tr>
				<td align="right" valign="middle" class="main_table2_td2">
					<table height="28" border="0" cellpadding="0" cellspacing="0"
						class="main_label_table">
						<tr>
							<td class="T_song14_bk" align="right" nowrap>
								<a href="#" onclick="MM_showHideLayers('Layer1','','show')"><img
										src="<%=request.getContextPath()%>/unieap/pages/workflow/stylesheet/images/button/icon_search.gif"
										width="15" height="16" border="0">
								</a>
							<td height="25" valign="middle" nowrap class="main_label_td">
								<uniflow:commonbutton customAction='javascript:custom_window();' />
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</uniflow:m_table>
		<uniflow:m_table style="main_list">
			<td class="main_list_th" valign="middle" width="25" align="center"
				nowrap>
				&nbsp;
			</td>
			<uniflow:m_order_th collection="procinst" name="name"
				value="workflow.procinst.name" orderby="name"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.isAscending()%>' />
			<uniflow:m_order_th name="procinstID"
				value="workflow.procinst.procinstID" orderby="proc_instance_id"
				collection="procinst"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.isAscending()%>' />
			<uniflow:m_order_th name="priority"
				value="workflow.procinst.priority" orderby="priority"
				collection="procinst"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.isAscending()%>' />
			<uniflow:m_order_th name="type" value="workflow.procinst.type"
				orderby="type" collection="procinst"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.isAscending()%>' />
			<uniflow:m_order_th name="state" value="workflow.procinst.state"
				orderby="current_state" collection="procinst"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.isAscending()%>' />
			<uniflow:m_order_th name="templetName"
				value="workflow.procinst.templetName" orderby="templet_name"
				collection="procinst"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.isAscending()%>' />
			<uniflow:m_order_th name="templetID"
				value="workflow.procinst.templetID" orderby="templet_id"
				collection="procinst"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.isAscending()%>' />
			<uniflow:m_order_th name="builder" value="workflow.procinst.author"
				orderby="builder" collection="procinst"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.isAscending()%>' />
			<uniflow:m_order_th name="starttime"
				value="workflow.procinst.starttime" orderby="start_time"
				collection="procinst"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.isAscending()%>' />

			<uniflow:m_order_th name="category"
				value="workflow.procinst.category" orderby="category"
				collection="procinst"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.isAscending()%>' />
			<uniflow:m_order_th name="completetime"
				value="workflow.procinst.completetime" orderby="complete_time"
				collection="procinst"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.isAscending()%>' />
			<uniflow:m_order_th name="limittime"
				value="workflow.procinst.limittime" orderby="limit_time"
				collection="procinst"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.isAscending()%>' />
			<uniflow:m_order_th name="overtimeaction"
				value="workflow.procinst.overtimeaction" orderby="whenovertime"
				collection="procinst"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.isAscending()%>' />
			<uniflow:m_order_th name="overtimeApp"
				value="workflow.procinst.overtimeApp" orderby="overtime_app_id"
				collection="procinst"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.isAscending()%>' />
			<uniflow:m_order_th name="description"
				value="workflow.procinst.description" orderby="description"
				collection="procinst"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.isAscending()%>' />

			<logic:iterate id="procinst" name="procinstForm" property="list"
				type="com.neusoft.uniflow.api.handler.NWProcInst" indexId="index">
				<uniflow:m_list_tr row="<%=index.intValue()%>">
					<td width="25" align="center" valign="middle" class="main_list_td">
						<html:radio property="selectedItem"
							value="<%=procinst.getProcInstID()%>"
							onclick="javascript:itemChanged()" />
					</td>
					<uniflow:element collection="procinst" name="name">
						<bean:write bundle="uniflow" name="procinst" property="name" />&nbsp;
	</uniflow:element>
					<uniflow:element collection="procinst" name="procinstID">
						<bean:write bundle="uniflow" name="procinst" property="procInstID" />&nbsp;
	</uniflow:element>
					<uniflow:element collection="procinst" name="priority">
						<bean:write bundle="uniflow" name="procinst" property="priority" />&nbsp;</uniflow:element>
					<uniflow:element collection="procinst" name="type">
						<logic:equal name="procinst" property="type" value="0">
							<bean:message bundle="uniflow"
								key="workflow.procinst.type.normal" />
						</logic:equal>
						<logic:equal name="procinst" property="type" value="1">
							<bean:message bundle="uniflow"
								key="workflow.procinst.type.local.synchsub" />
						</logic:equal>
						<logic:equal name="procinst" property="type" value="2">
							<bean:message bundle="uniflow"
								key="workflow.procinst.type.local.asynchsub" />
						</logic:equal>
						<logic:equal name="procinst" property="type" value="3">
							<bean:message bundle="uniflow"
								key="workflow.procinst.type.remote.synchsub" />
						</logic:equal>
						<logic:equal name="procinst" property="type" value="4">
							<bean:message bundle="uniflow"
								key="workflow.procinst.type.remote.asynchsub" />
						</logic:equal>&nbsp;
  						 </uniflow:element>
					<uniflow:element collection="procinst" name="state">
						<logic:equal name="procinst" property="curState" value="0">
							<bean:message bundle="uniflow"
								key="workflow.procinst.state.initial" />
						</logic:equal>
						<logic:equal name="procinst" property="curState" value="1">
							<bean:message bundle="uniflow"
								key="workflow.procinst.state.running" />
						</logic:equal>
						<logic:equal name="procinst" property="curState" value="2">
							<bean:message bundle="uniflow"
								key="workflow.procinst.state.active" />
						</logic:equal>
						<logic:equal name="procinst" property="curState" value="3">
							<bean:message bundle="uniflow"
								key="workflow.procinst.state.suspend" />
						</logic:equal>
						<logic:equal name="procinst" property="curState" value="4">
							<bean:message bundle="uniflow"
								key="workflow.procinst.state.complete" />
						</logic:equal>
						<logic:equal name="procinst" property="curState" value="5">
							<bean:message bundle="uniflow"
								key="workflow.procinst.state.stopped" />
						</logic:equal>&nbsp;
						</uniflow:element>
					<uniflow:element collection="procinst" name="templetName">
						<bean:write bundle="uniflow" name="procinst"
							property="procDefName" />&nbsp;(<bean:write bundle="uniflow"
							name="procinst" property="procTempVersionName" />)
						</uniflow:element>
					<uniflow:element collection="procinst" name="templetID">
						<bean:write bundle="uniflow" name="procinst" property="procDefID" />&nbsp;</uniflow:element>
					<uniflow:element collection="procinst" name="builder">
						<bean:write bundle="uniflow" name="procinst" property="builder" />&nbsp;</uniflow:element>
					<uniflow:element collection="procinst" name="starttime">
						<bean:write bundle="uniflow" name="procinst" property="startTime"
							format="yyyy-MM-dd HH:mm:ss" />&nbsp;</uniflow:element>
					<uniflow:element collection="procinst" name="category">
						<bean:write bundle="uniflow" name="procinst" property="category" />&nbsp;</uniflow:element>
					<uniflow:element collection="procinst" name="completetime">
						<bean:write bundle="uniflow" name="procinst"
							property="completeTime" format="yyyy-MM-dd HH:mm:ss" />&nbsp;</uniflow:element>
					<uniflow:element collection="procinst" name="limittime">
						<%=DateConversation.parseMinToDHMS(procinst.getLimitTime())%>&nbsp;</uniflow:element>
					<uniflow:element collection="procinst" name="overtimeaction">
						<logic:equal name="procinst" property="overtimeAction" value="0">
							<bean:message bundle="uniflow"
								key="workflow.procinst.overtime.continue" />
						</logic:equal>
						<logic:equal name="procinst" property="overtimeAction" value="1">
							<bean:message bundle="uniflow"
								key="workflow.procinst.overtime.about" />
						</logic:equal>
						<logic:equal name="procinst" property="overtimeAction" value="2">
							<bean:message bundle="uniflow"
								key="workflow.procinst.overtime.waiting" />
						</logic:equal>
						<logic:equal name="procinst" property="overtimeAction" value="3">
							<bean:message bundle="uniflow"
								key="workflow.procinst.overtime.suspend" />
						</logic:equal>
						<logic:equal name="procinst" property="overtimeAction" value="4">
							<bean:message bundle="uniflow"
								key="workflow.procinst.overtime.return" />
						</logic:equal>
						<logic:equal name="procinst" property="overtimeAction" value="5">
							<bean:message bundle="uniflow"
								key="workflow.procinst.overtime.application" />
						</logic:equal>
    &nbsp;
   </uniflow:element>
					<uniflow:element collection="procinst" name="overtimeApp">
						<bean:write bundle="uniflow" name="procinst"
							property="overtimeAppDefID" />&nbsp;</uniflow:element>
					<uniflow:element collection="procinst" name="description">
						<bean:write bundle="uniflow" name="procinst"
							property="description" />&nbsp;</uniflow:element>
					<html:hidden property="curstate" name="curState"
						value="<%=String.valueOf(procinst
															.getCurState())%>" />
				</uniflow:m_list_tr>
			</logic:iterate>
		</uniflow:m_table>
		<uniflow:m_table style="main_button">
			<tr>
				<td>
					<uniflow:pageCtr
						curPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.getCurrentPage()%>'
						maxPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.getPagesCount()%>'
						total='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("procinstForm"))
													.getTotal()%>' />
				</td>

				<td align="right">
					<uniflow:m_button_table>
						<%
							if (operation.equals("all")) {
						%>
						<!-- uniflow:button id="rd" action="javascript:RD_onclick()"
							name="button.setting" / -->
						<!--  uniflow:button id="start"
							action="javascript:button_onclick('start')" name="button.start" / -->
						<uniflow:button id="suspend"
							action="javascript:button_onclick('suspend')"
							name="button.suspend" />
						<uniflow:button id="resume"
							action="javascript:button_onclick('resume')" name="button.resume" />
						<uniflow:button id="restart"
							action="javascript:button_onclick('restart')"
							name="button.restart" />
						<uniflow:button id="abort"
							action="javascript:button_onclick('abort')" name="button.abort" />
						<uniflow:button id="svgm" action="javascript:svgm_onclick()"
							name="button.monitor" />
						<%
							} else if (operation.equals("monitor")) {
						%>
						<uniflow:button id="del"
							action="javascript:button_onclick('delete')" name="button.delete" />
						<!-- uniflow:button id="svgm" action="javascript:svgm_onclick()"
							name="button.monitor" / -->
						<uniflow:button id="svgview" action="javascript:svgv_onclick()"
							name="查看"></uniflow:button>
						<%
							} else if (operation.equals("createversion")) {
						%>
						<uniflow:button id="createversion"
							action="javascript:cnv_onclick()" name="button.createnewversion" />
						<%
							}
						%>
					</uniflow:m_button_table>
				</td>
			</tr>
		</uniflow:m_table>
		<html:hidden property="currentPage" />
		<html:hidden property="pagesCount" />
		<html:hidden property="countOfPage" />
		<html:hidden property="requestPage" />
		<html:hidden property="orderBy" />
		<html:hidden property="ascending" />
		<html:hidden property="operation" />
		<html:hidden property="op" value="<%=operation%>" />
		<html:hidden property="state" value="<%=state%>" />
	</uniflow:m_form>
</uniflow:m_body>
</html:html>