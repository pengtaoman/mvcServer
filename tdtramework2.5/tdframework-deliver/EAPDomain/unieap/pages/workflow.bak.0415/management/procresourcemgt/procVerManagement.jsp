<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html locale="true">
<head>
	<%
		String selectedID = request.getParameter("selectedID");
	%>

	<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
	<META HTTP-EQUIV="Expires" CONTENT="0">
	<uniflow:style />
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/DatePicker.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
	<script>	
		function itemChanged()
		{ 
	 		var rb,checkedItem;
	 		var isActiveVersion = getSelectedItemValue("isActiveVersion");
	  		if(document.forms[0].selectedItem){
	   		 if(document.forms[0].selectedItem.length)
				for (i = 0; document.forms[0].selectedItem.length>i; i++) {
					rb = document.forms[0].selectedItem[i];
					if (rb.checked) {
						checkedItem = rb;
			  }
			}
		    else
				checkedItem = document.forms[0].selectedItem;
		    if (checkedItem&&checkedItem.checked) {
				enableButton("create_New_Version");
				if(isActiveVersion==1){
					disableButton("active_Version");
					disableButton("del_Version");
				}
				else{
					disableButton("create_New_Version");
					enableButton("active_Version");
					enableButton("del_Version");
				}
		    }
		  }else
		  {
		  	 disableButton("create_New_Version");
		  	 disableButton("del_Version");
		  	 disableButton("active_Version");
		  }
		  findSelectedItem();
	}
	function formSubmit(op,v){
		document.forms[0].procTemVersion.value=v;
		document.forms[0].operation.value=op;
		document.forms[0].submit();
	}
	
	function createNewVersion(){
		var selectedID = document.getElementById('selectedItem').value;
	//var selectedID = getSelectedItemID();
	open_windows("<%=WorkflowManager.getWorkflowPath()%>/management/procresourcemgt/verNameInput.jsp?selectedID="+selectedID,240,50);
	
	}
	function delVersion(){
		if ((window.confirm("您确定要删除该版本?"))==true){
			document.forms[0].procTemVersion.value=getSelectedItemValue("versionName")
			document.forms[0].operation.value="delVersion";
			document.forms[0].submit();
		}
	}
	function activeVersion(){
		document.forms[0].procTemVersion.value=getSelectedItemValue("versionName")
		document.forms[0].operation.value="activeVersion";
		document.forms[0].submit();
	}
	
</script>
	<jsp:include
		page="/unieap/pages/workflow/stylesheet/style2009/using3levelMenuCss.jsp"></jsp:include>
</head>
<body>
<body onload="javascript:itemChanged()">
	<form action="procVerManagement.do">
		<uniflow:m_table style="main_list">
			<td class="main_list_th" valign="middle" width="25" align="center"
				nowrap>
				&nbsp;
			</td>
			<uniflow:m_order_th name="procname" value="workflow.procdef.procname"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_NAME%>"
				collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.isAscending()%>' />
			<uniflow:m_order_th name="procTemID"
				value="workflow.procdef.procTemID"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_ID%>"
				collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.isAscending()%>' />
			<uniflow:m_order_th name="procTemVersion"
				value="workflow.procdef.procTemVersion"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_VERSION_NAME%>"
				collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.isAscending()%>' />
			<uniflow:m_order_th name="isActiveVersion"
				value="workflow.procdef.isActiveVersion"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_VERSION_STATE%>"
				collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.isAscending()%>' />
			<uniflow:m_order_th name="builder" value="workflow.procdef.builder"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_BUILDER%>"
				collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.isAscending()%>' />
			<uniflow:m_order_th name="buildtime"
				value="workflow.procdef.buildtime"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_BUILDTIME%>"
				collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.isAscending()%>' />
			<uniflow:m_order_th name="category" value="workflow.procdef.category"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_CAT%>"
				collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.isAscending()%>' />
			<uniflow:m_order_th name="limitTime"
				value="workflow.procdef.limitTime"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_DEADLINE%>"
				collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.isAscending()%>' />
			<uniflow:m_order_th name="overtimeaction"
				value="workflow.procdef.overtimeaction"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_OVERDUEACTION%>"
				collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.isAscending()%>' />
			<uniflow:m_order_th name="overtimeapp"
				value="workflow.procdef.overtimeapp"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_OVERDUEAPP%>"
				collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.isAscending()%>' />
			<uniflow:m_order_th name="description"
				value="workflow.procdef.description"
				orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_DESC%>"
				collection="procdef"
				orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.getOrderBy()%>'
				ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request
												.getAttribute("procVerManagementForm"))
												.isAscending()%>' />


			<logic:iterate id="procdef" name="procVerManagementForm"
				property="list" type="com.neusoft.uniflow.api.def.NWProcDef"
				indexId="index">
				<uniflow:m_list_tr row="<%=index.intValue()%>">
					<td width="25" align="center" valign="middle" class="main_list_td">
						<input type='radio' id='selectedItem'
							value="<%=procdef.getID()
												+ String.valueOf('&')
												+ String.valueOf('v')
												+ String.valueOf('=')
												+ procdef.getVersionName()%>"
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
							formatKey="date.key" />&nbsp;</uniflow:element>
					<uniflow:element collection="procdef" name="category">
						<bean:write bundle="uniflow" name="procdef" property="category" />&nbsp;</uniflow:element>
					<uniflow:element collection="procdef" name="limitTime">
						<bean:write bundle="uniflow" name="procdef" property="limitTime" />&nbsp;</uniflow:element>
					<uniflow:element collection="procdef" name="overtimeaction">
						<bean:write bundle="uniflow" name="procdef"
							property="overtimeAction" />&nbsp;</uniflow:element>
					<uniflow:element collection="procdef" name="overtimeapp">
						<bean:write bundle="uniflow" name="procdef"
							property="overtimeAppID" />&nbsp;</uniflow:element>
					<uniflow:element collection="procdef" name="description">
						<bean:write bundle="uniflow" name="procdef" property="description" />&nbsp;</uniflow:element>
					<input type='hidden' name="procdef" property="isActiveVersion" />
					<input type='hidden' name="procdef" property="versionName" />
				</uniflow:m_list_tr>
			</logic:iterate>
		</uniflow:m_table>
		<uniflow:m_table style="main_button">
			<tr>
				<td align="right">
					<uniflow:m_button_table>
						<uniflow:button id="create_New_Version"
							action="javascript:createNewVersion()" name="button.create" />
						<uniflow:button id="del_Version" action="javascript:delVersion()"
							name="button.delete" />
						<uniflow:button id="active_Version"
							action="javascript:activeVersion()" name="button.active" />
					</uniflow:m_button_table>
				</td>
			</tr>
		</uniflow:m_table>
		<input type='hidden' property="procdefID" value="<%=selectedID%>" />
		<input type='hidden' property="operation" />
		<input type='hidden' property="procTemVersion" />
	</form>
</body>
</html>