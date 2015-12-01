<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>

<html:html locale="true">
<head>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0">
<uniflow:style/>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<script language="javascript">
//function createProcess(){
  //var openURL = "<%=request.getContextPath()%>/toNewProcess.do";                                          
  //window.open(openURL);
//}
function createProcess(){
   var openUrl = "<%=WorkflowManager.getWorkflowPath()%>/webdesign/procmodify/procmodifydetail.jsp?isLoadData=false";
   var width = 640;
   var height = 512;
   open_scrollable_window(openUrl,width , height);
}
 function reload()
{
  location.href = "<%=request.getContextPath()%>/procmodify.do";
}
function itemChanged()
{ 
  var rb,checkedItem;
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
	enableButton("procmodify");
    }
  }else
  {
    disableButton("procmodify");
  }
  findSelectedItem();
}

function modify(){
  var selectedID = getSelectedItemID();
  var selectedVersion = getSelectedItemValue("versionName");
  var needCreatorRole = getSelectedItemValue("needCreatorRole");
  var openURL = "<%=request.getContextPath()%>/bsdesign.do?selectedID="+selectedID+"&selectedVersion="+selectedVersion+"&needCreatRole="+needCreatorRole;                                          
  open_scrollable_window(openURL,'1024','768');
}
  

function custom_window(){
  open_windows("<%=request.getContextPath()%>/custom.do?elements_name=procdef","400","250");
  
}

</script>

</head>
<uniflow:m_body onload="javascript:itemChanged()">
<uniflow:m_form action="procmodify.do">
  <uniflow:m_table style="main_title_table">
	 <tr><td align="right" valign="middle" class="main_table2_td2">
		<table height="28" border="0" cellpadding="0" cellspacing="0"class="main_label_table">
           <tr><td height="25" valign="middle" nowrap class="main_label_td">
			  <uniflow:commonbutton customAction='javascript:custom_window();' />                
            </td></tr>      
        </table></td>
     </tr>
   </uniflow:m_table>
   <uniflow:m_table style="main_list">
	 <td  class="main_list_th" valign="middle" width="25" align="center" nowrap>&nbsp;</td>
	 <uniflow:m_order_th name="procname"     value="workflow.procdef.procname"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_NAME%>" collection="procdef" 
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="procTemID"     value="workflow.procdef.procTemID"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_ID%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="procTemVersion"     value="workflow.procdef.procTemVersion"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_VERSION_NAME%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).isAscending()%>'/>	    					
	 <uniflow:m_order_th name="builder"     value="workflow.procdef.builder"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_BUILDER%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="buildtime"     value="workflow.procdef.buildtime"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_BUILDTIME%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="category"     value="workflow.procdef.category"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_CAT%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).isAscending()%>'/>						
	 <uniflow:m_order_th name="limitTime"     value="workflow.procdef.limitTime"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_DEADLINE%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="overtimeaction"     value="workflow.procdef.overtimeaction"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_OVERDUEACTION%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="overtimeapp"     value="workflow.procdef.overtimeapp"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_OVERDUEAPP%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="description"     value="workflow.procdef.description"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_DESC%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).isAscending()%>'/>	    

	<logic:iterate id="procdef" name="procModifyForm" property="list"type="com.neusoft.uniflow.api.def.NWProcDef" indexId="index">
	<uniflow:m_list_tr row="<%=index.intValue()%>">
		<td width="25" align="center" valign="middle" class="main_list_td"><html:radio property="selectedItem"value="<%=procdef.getID()+ String.valueOf('&')
						+ String.valueOf('v')+ String.valueOf('=')+ procdef.getVersionName()%>"onclick="javascript:itemChanged()" /></td>
	    <uniflow:element collection="procdef" name="procname"><bean:write bundle="uniflow" name="procdef" property="name" />&nbsp;</uniflow:element>
		<uniflow:element collection="procdef" name="procTemID"><bean:write bundle="uniflow" name="procdef" property="ID" />&nbsp;</uniflow:element>
						<uniflow:element collection="procdef" name="procTemVersion">
							<bean:write bundle="uniflow" name="procdef" property="versionName" />&nbsp;
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
							<bean:write bundle="uniflow" name="procdef"
								property="description" />&nbsp;</uniflow:element>
						<html:hidden name="procdef" property="needCreatorRole" />
						<html:hidden name="procdef" property="versionName" />
					</uniflow:m_list_tr>
				</logic:iterate>
 </uniflow:m_table>
 <uniflow:m_table style="main_button">
	<tr><td>
		<uniflow:pageCtr
				curPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).getCurrentPage()%>'
				maxPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).getPagesCount()%>'
				total='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procModifyForm")).getTotal()%>' />
        </td><td align="right" >
		<uniflow:m_button_table>
		 	<uniflow:button id="procmodify" action="javascript:modify()"name="button.modify"/>
		 	<uniflow:button id="new" action="javascript:createProcess()"name="button.create"/>
		</uniflow:m_button_table>
		</td></tr>
        </uniflow:m_table>
<html:hidden property="currentPage"/>
<html:hidden property="pagesCount"/>
<html:hidden property="countOfPage"/>
<html:hidden property="requestPage"/>
<html:hidden property="orderBy"/>
<html:hidden property="ascending"/>
<html:hidden property="operation"/>
</uniflow:m_form>
</uniflow:m_body>
</html:html>