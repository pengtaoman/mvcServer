<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
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
 function reload()
{
  location.href = "<%=request.getContextPath()%>/procpartilist.do";
}
 function refresh()
{
  location.href = "<%=request.getContextPath()%>/procpartilist.do";
}

function participant_onclick()
{
  var selectedID = getSelectedItemID()
  var temp =selectedID.indexOf("#");
  var procDefID = selectedID.substring(0,temp);
  var version = selectedID.substring(temp+1);
  var openURL = "<%=request.getContextPath()%>/svgparti.do?processid="+procDefID+"&version="+version;
   
  if (procDefID!=null && version!=null)
      location.href = openURL;
  else
      alert("<%=MessageUtil.getString("workflow.monitor.process.checked",request.getSession())%>");;
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
	enableButton("participant");
    }
  }else
  {
    disableButton("participant");
  }
  findSelectedItem();
}

function custom_window(){
  open_windows("<%=request.getContextPath()%>/custom.do?elements_name=procdef","400","265");
  
}

</script>

</head>
<uniflow:m_body onload="javascript:itemChanged()">
<uniflow:m_form action="procpartilist.do">
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
	 <uniflow:m_order_th name="procname"    value="workflow.procdef.procname"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_NAME%>" collection="procdef" 
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="procTemID"    value="workflow.procdef.procTemID"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_ID%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="procTemVersion"    value="workflow.procdef.procTemVersion"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_VERSION_NAME%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).isAscending()%>'/>	    					
	 <uniflow:m_order_th name="builder"    value="workflow.procdef.builder"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_BUILDER%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="buildtime"    value="workflow.procdef.buildtime"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_BUILDTIME%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="category"    value="workflow.procdef.category"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_CAT%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).isAscending()%>'/>						
	 <uniflow:m_order_th name="limitTime"    value="workflow.procdef.limitTime"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_DEADLINE%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="overtimeaction"    value="workflow.procdef.overtimeaction"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_OVERDUEACTION%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="overtimeapp"    value="workflow.procdef.overtimeapp"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_OVERDUEAPP%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="description"    value="workflow.procdef.description"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_DESC%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).isAscending()%>'/>	    

	<logic:iterate id="procdef" name="procpartilistForm" property="list"type="com.neusoft.uniflow.api.def.NWProcDef" indexId="index">
	<uniflow:m_list_tr row="<%=index.intValue()%>">
		<td width="25" align="center" valign="middle" class="main_list_td"><html:radio property="selectedItem" value="<%=procdef.getID()+String.valueOf('#')+procdef.getVersionName()%>" onclick="javascript:itemChanged()" /></td>
	    <uniflow:element collection="procdef" name="procname"><bean:write bundle="uniflow" name="procdef" property="name" />&nbsp;</uniflow:element>
		<uniflow:element collection="procdef" name="procTemID"><bean:write bundle="uniflow" name="procdef" property="ID" />&nbsp;</uniflow:element>
						<uniflow:element collection="procdef" name="procTemVersion">
							<bean:write bundle="uniflow" name="procdef"
								property="versionName" />&nbsp;</uniflow:element>
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
					</uniflow:m_list_tr>
				</logic:iterate>
 </uniflow:m_table>
 <uniflow:m_table style="main_button">
	<tr><td>
		<uniflow:pageCtr
				curPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).getCurrentPage()%>'
				maxPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).getPagesCount()%>'
				total='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procpartilistForm")).getTotal()%>' />
        </td><td align="right" >
		<uniflow:m_button_table>
		    <uniflow:button id="participant" name="button.participant" action="javascript:participant_onclick()"></uniflow:button>
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