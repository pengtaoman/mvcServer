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
	<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
	<META HTTP-EQUIV="Expires" CONTENT="0">

	<%
		String parentIdStore = request.getParameter("parentIdStore");
	%>

	<uniflow:style />
	<jsp:include
		page="/unieap/pages/workflow/stylesheet/style2009/using3levelMenuCss.jsp"></jsp:include>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
	<script language="javascript">

function refresh(){
  location.href = "<%=request.getContextPath()%>/categoryresource.do?parentIdStore="+"<%=parentIdStore%>"+"&deleteId=all";
}
function reload()
{
  location.href = "<%=request.getContextPath()%>/categoryresource.do?parentIdStore="+"<%=parentIdStore%>"+"&deleteId=all";
}

function create(){
  var selectedID = getSelectedItemID();
  var selectedVersion=getSelectedItemValue("versionName");
  var needCreatorRole = getSelectedItemValue("needCreatorRole");
  var openURL = "<%=request.getContextPath()%>/createProcInst.do?selectedID="+selectedID+"&v="+selectedVersion+"&needCreatRole="+needCreatorRole;                                          
  open_scrollable_window(openURL,'500','250');

  }

function itemChanged()
{ 

  var rb,checkedItem;
  if(document.forms[0].selectedItem){
    if(document.forms[0].selectedItem.length>0){
		for (i = 0; document.forms[0].selectedItem.length>i; i++) {
		  rb = document.forms[0].selectedItem[i];
		  if (rb.checked) {
		    	checkedItem = rb;
		  	}
		}
    }else{
		checkedItem = document.forms[0].selectedItem;
	}
    if (checkedItem&&checkedItem.checked) {
    	enableButton("createInst");
		enableButton("delProcDef");
		enableButton("procmodify");
		enableButton("newProcFromOld");
		enableButton("newProc");
		enableButton("versionManagement");
		enableButton("authorization");
		//enableButton("defmonitor");
    }else {
    	disableButton("createInst");
    	disableButton("delProcDef");
		disableButton("procmodify");
		disableButton("newProcFromOld");
		disableButton("newProc");
		disableButton("versionManagement");
		disableButton("authorization");
		//disableButton("defmonitor");
    }
  }else
  {
  	disableButton("createInst");
	disableButton("delProcDef");
	disableButton("procmodify");
	disableButton("newProcFromOld");
	//disableButton("newProc");
	disableButton("versionManagement");
	disableButton("authorization");
	//disableButton("defmonitor");
  }
  findSelectedItem();
}

function manageVersion(){
var selectedID = getSelectedItemID();
var openUrl = "<%=request.getContextPath()%>/procVerManagement.do?selectedID="+selectedID;
var width = 680;
var height = 175;
open_scrollable_window(openUrl,width , height);
}

function createProcess(){
   var openUrl = "<%=WorkflowManager.getWorkflowPath()%>/webdesign/procmodify/procmodifydetail.jsp?isLoadData=false";
   var width = 1024;
   var height = 768;
   open_scrollable_window(openUrl,width , height);
}

function formauthorization_onclick()
{
  var procDefID = getSelectedItemID();
  var version = getSelectedItemValue("versionName");
  var openURL = "<%=request.getContextPath()%>/processAuthor.do?processid=" + procDefID + "&version=" +version;
  
  if (procDefID!=null && version!=null)
      //location.href = openURL;
      open_scrollable_window(openURL,'1024','768');
  else
      alert("<%=MessageUtil.getString("workflow.monitor.process.checked",request.getSession())%>");

}

function createProcessFromOld(){
  var selectedID = getSelectedItemID();
  var selectedVersion = getSelectedItemValue("versionName");
  var needCreatorRole = getSelectedItemValue("needCreatorRole");
  var openURL = "<%=request.getContextPath()%>/bsdesign.do?selectedID="+selectedID+"&selectedVersion="+selectedVersion+"&isCreateNewProcess=true"+"&needCreatRole="+needCreatorRole;                                          
  open_scrollable_window(openURL,'1024','768');
}

function svgmonitor_onclick()
{
  var procDefID = getSelectedItemID();
  var version = getSelectedItemValue("versionName");
  var openURL = "<%=request.getContextPath()%>/svgmonitor.do?processid="+procDefID+"&version="+version;

  if (procDefID!=null && version!=null)
      //location.href = openURL;
      open_scrollable_window(openURL,'1024','768');
  else
      alert("<%=MessageUtil.getString("workflow.monitor.process.checked",request.getSession())%>");;

}

function modify(){
  var selectedID = getSelectedItemID();
  var selectedVersion = getSelectedItemValue("versionName");
  var needCreatorRole = getSelectedItemValue("needCreatorRole");
  var openURL = "<%=request.getContextPath()%>/bsdesign.do?selectedID="+selectedID+"&selectedVersion="+selectedVersion+"&needCreatRole="+needCreatorRole;                                          
  open_scrollable_window(openURL,'1024','768');
}

  
function del_procedef(){
	var selectedId=getSelectedItemID();
	if ((window.confirm("您确定要删除该选项?"))==true){
		location.href="<%=request.getContextPath()%>/categoryresource.do?parentIdStore="+"<%=parentIdStore%>"+"&deleteId="+selectedId;
	}else {
		return;
	}
}
function custom_window(){
  open_windows("<%=request.getContextPath()%>/custom.do?elements_name=procdef","400","300");
  
}

</script>

</head>
<uniflow:m_body onload="javascript:itemChanged()">
	<uniflow:m_form action="categoryresource.do">
		<uniflow:m_table style="main_title_table">
			<tr>
				<td align="right" valign="middle" class="main_table2_td2">
					<table height="28" border="0" cellpadding="0" cellspacing="0"
						class="main_label_table">
						<tr>
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
			<uniflow:m_order_th name="procname" value="workflow.procdef.procname"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_NAME%>"
				collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.isAscending()%>' />
			<uniflow:m_order_th name="procTemID"
				value="workflow.procdef.procTemID"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_ID%>"
				collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.isAscending()%>' />
			<uniflow:m_order_th name="procTemVersion"
				value="workflow.procdef.procTemVersion"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_VERSION_NAME%>"
				collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.isAscending()%>' />
			 <uniflow:m_order_th name="isActiveVersion"   value="workflow.procdef.isActiveVersion"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_VERSION_STATE%>" collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("categoryResourceForm")).getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("categoryResourceForm")).isAscending()%>' />
					
			<uniflow:m_order_th name="builder" value="workflow.procdef.builder"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_BUILDER%>"
				collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.isAscending()%>' />
			<uniflow:m_order_th name="buildtime"
				value="workflow.procdef.buildtime"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_BUILDTIME%>"
				collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.isAscending()%>' />
			<uniflow:m_order_th name="category" value="workflow.procdef.category"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_CAT%>"
				collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.isAscending()%>' />
			<uniflow:m_order_th name="limitTime"
				value="workflow.procdef.limitTime"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_DEADLINE%>"
				collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.isAscending()%>' />
			<uniflow:m_order_th name="overtimeaction"
				value="workflow.procdef.overtimeaction"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_OVERDUEACTION%>"
				collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.isAscending()%>' />
			<uniflow:m_order_th name="overtimeapp"
				value="workflow.procdef.overtimeapp"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_OVERDUEAPP%>"
				collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.isAscending()%>' />
			<uniflow:m_order_th name="description"
				value="workflow.procdef.description"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_DESC%>"
				collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.isAscending()%>' />


			<logic:iterate id="procdef" name="categoryResourceForm"
				property="list" type="com.neusoft.uniflow.api.def.NWProcDef"
				indexId="index">
				<uniflow:m_list_tr row="<%=index.intValue()%>">
					<td width="25" align="center" valign="middle" class="main_list_td">
						<html:radio property="selectedItem" value="<%=procdef.getID()%>"
							onclick="javascript:itemChanged()" />
					</td>
					<uniflow:element collection="procdef" name="procname">
						<bean:write bundle="uniflow" name="procdef" property="name" />&nbsp;</uniflow:element>
					<uniflow:element collection="procdef" name="procTemID">
						<bean:write bundle="uniflow" name="procdef" property="ID" />&nbsp;</uniflow:element>
					<uniflow:element collection="procdef" name="procTemVersion">
						<bean:write bundle="uniflow" name="procdef" property="versionName" />&nbsp;</uniflow:element>
					<uniflow:element collection="procdef" name="isActiveVersion">
						<logic:equal name="procdef" property="isActiveVersion" value="1">
							<bean:message bundle="uniflow"
								key="workflow.procdef.version.state.active" />
						</logic:equal>
						<logic:equal name="procdef" property="isActiveVersion" value="0">
							<bean:message bundle="uniflow"
								key="workflow.procdef.version.state.noactive" />
						</logic:equal>
					</uniflow:element>
					<uniflow:element collection="procdef" name="builder">
						<bean:write bundle="uniflow" name="procdef" property="builder" />&nbsp;</uniflow:element>
					<uniflow:element collection="procdef" name="buildtime">
						<bean:write bundle="uniflow" name="procdef" property="buildTime"
							formatKey="date.key.key" />&nbsp;</uniflow:element>
					<uniflow:element collection="procdef" name="category">
						<bean:write bundle="uniflow" name="procdef" property="category" />&nbsp;</uniflow:element>
					<uniflow:element collection="procdef" name="limitTime">
						<%=DateConversation.parseMinToDHMS(procdef.getLimitTime())%>&nbsp;</uniflow:element>
					<uniflow:element collection="procdef" name="overtimeaction">
					<logic:equal name="procdef" property="overtimeAction" value="0">
							&nbsp;
						</logic:equal>
						<logic:equal name="procdef" property="overtimeAction" value="1">
							<bean:message bundle="uniflow"
								key="workflow.procinst.overtime.waiting" />
						</logic:equal>
						<logic:equal name="procdef" property="overtimeAction" value="2">
							<bean:message bundle="uniflow"
								key="workflow.procinst.overtime.about" />
						</logic:equal>
						<logic:equal name="procdef" property="overtimeAction" value="3">
							<bean:message bundle="uniflow"
								key="workflow.procinst.overtime.suspend" />
						</logic:equal>
						<logic:equal name="procdef" property="overtimeAction" value="5">
							<bean:message bundle="uniflow"
								key="workflow.procinst.overtime.application" />
						</logic:equal>
					</uniflow:element>
					<uniflow:element collection="procdef" name="overtimeapp">
						<bean:write bundle="uniflow" name="procdef"
							property="overtimeAppID" />&nbsp;</uniflow:element>
					<uniflow:element collection="procdef" name="description">
						<bean:write bundle="uniflow" name="procdef" property="description" />&nbsp;</uniflow:element>
					<html:hidden name="procdef" property="needCreatorRole" />
					<html:hidden name="procdef" property="versionName" />
				</uniflow:m_list_tr>
			</logic:iterate>
		</uniflow:m_table>
		<uniflow:m_table style="main_button">
			<tr>
				<td>
					<uniflow:pageCtr
						curPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.getCurrentPage()%>'
						maxPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.getPagesCount()%>'
						total='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
													.getAttribute("categoryResourceForm"))
													.getTotal()%>' />
				</td>
				<td align="right">
					<uniflow:m_button_table>
						<uniflow:button id="newProc" action="javascript:createProcess()"
							name="button.create" />
						<uniflow:largebutton id="newProcFromOld" action="javascript:createProcessFromOld()"
							name="button.createFromOld" />
						<uniflow:button id="delProcDef" action="javascript:del_procedef()"
							name="button.delete" />
						<uniflow:button id="procmodify" action="javascript:modify()"
							name="button.modify" />
						<uniflow:button id="versionManagement"
							action="javascript:manageVersion()" name="button.version" />
						<uniflow:button id="createInst" action="javascript:create()"
							name="button.createInst" />
						<uniflow:button id="authorization" action="javascript:formauthorization_onclick()" name="button.authorize"/>
               			<!-- uniflow:button id="defmonitor" action="javascript:svgmonitor_onclick()"name="button.monitor"/ -->
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
		<html:hidden property="parentIdStore" />
	</uniflow:m_form>
</uniflow:m_body>
</html:html>
