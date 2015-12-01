<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<html:html locale="true">
 
<head>
<title>表单授权</title>
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
  location.href = "<%=request.getContextPath()%>/procmonitorlist.do";
}
 function refresh()
{
  location.href = "<%=request.getContextPath()%>/procmonitorlist.do";
}
function svgmonitor_onclick()
{
  var selected = getSelectedItemID();
  var temp = selected.indexOf("#");
  var procDefID = selected.substring(0,temp);
  var version = selected.substring(temp+1);
  var openURL = "<%=request.getContextPath()%>/svgmonitor.do?processid="+procDefID+"&version="+version;
 
  if (procDefID!=null && version!=null)
      location.href = openURL;
  else
      alert("<%=MessageUtil.getString("workflow.monitor.process.checked",request.getSession())%>");;

}
function formauthorization_onclick()
{
  var selected = getSelectedItemID();
  var temp = selected.indexOf("#");
  var procDefID = selected.substring(0,temp);
  var version = selected.substring(temp+1);
  var openURL = "<%=request.getContextPath()%>/processAuthor.do?processid=" + procDefID + "&version=" +version;
 
  if (procDefID!=null && version!=null)
      location.href = openURL;
  else
      alert("<%=MessageUtil.getString("workflow.monitor.process.checked",request.getSession())%>");

}
function participant_onclick(){
  var selectedID = getSelectedItemID()
  if (selectedID==null) alert("<%=MessageUtil.getString("workflow.monitor.process.checked",request.getSession())%>");
  var indexVer =selectedID.indexOf("#");
  var procDefID = selectedID.substring(0,indexVer);
  var version = selectedID.substring(indexVer+1);
  var openURL = "<%=request.getContextPath()%>/unieap/pages/workflow/participant/partiApplet.jsp?procDefID="+procDefID+"&version="+version;
  location.href=openURL;
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
	enableButton("defmonitor");
	enableButton("authorization");
	//enableButton("participant");
    }
  }else
  {
    disableButton("defmonitor");
    disableButton("authorization");
    //disableButton("participant");
  }
  findSelectedItem();
}

function custom_window(){
  open_windows("<%=request.getContextPath()%>/custom.do?elements_name=procdef","400","265");
  
}
function search_onclick(){
  document.forms[0].operation.value = "search";
  document.forms[0].submit();
}
</script>
<jsp:include
		page="/unieap/pages/workflow/stylesheet/style2009/3levelMenuShared.jsp"></jsp:include> 
</head>
<uniflow:m_body onload="javascript:itemChanged()">
<uniflow:m_form action="procmonitorlist.do">
<div id="Layer1" style="position:absolute; left:208px; top:93px; width:340px; height:155px; z-index:1; visibility: hidden"> 
  <table border="1"   bordercolordark="#00eeFF" bordercolorlight="#0000cc" cellpadding="2" cellspacing="0" class="T_song12bk2" width="100%" bgcolor="#FFFFFF">
    <tr valign="bottom" class="main_list_th"> 
      <td class="th" nowrap width="37%">
        <table width="98%" border="0" cellpadding="0" cellspacing="0">
          <tr> 
            <td width="40">&nbsp;</td>
            <td align="center" class="T_song12_wt"><b>&#27969;&#31243;&#26597;&#35810;</b></td>
            <td width="40" align="right"><a href="#" onclick="MM_showHideLayers('Layer1','','hide')"><img src="<%=request.getContextPath()%>/unieap/pages/workflow/stylesheet/images/button/icon_close.gif" width="17" height="17" border="0"></a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr> 
      <td align="center" height="80">&#21517;&#31216;&#65306; 
        <input type="text" name="procName" size="20" maxlength="40"/>
        <input type="button" name="search" class="button_normal" value="查询" onclick="search_onclick()"/>
      </td>
    </tr>
  </table>
</div>
   <uniflow:m_table style="main_title_table">
	 <tr><td align="right" valign="middle" class="main_table2_td2">
		<table height="28" border="0" cellpadding="0" cellspacing="0" class="main_label_table">
           <tr>
           <td class="T_song14_bk" align="right" nowrap><a href="#" onclick="MM_showHideLayers('Layer1','','show')"><img src="<%=request.getContextPath()%>/unieap/pages/workflow/stylesheet/images/button/icon_search.gif" width="15" height="16" border="0"></a>
		   <td height="25" valign="middle" nowrap class="main_label_td"><uniflow:commonbutton customAction='javascript:custom_window();' />                
            </td></tr>      
        </table></td>
     </tr>
   </uniflow:m_table>
   <uniflow:m_table style="main_list">
	 <td  class="main_list_th" valign="middle" width="25" align="center" nowrap>&nbsp;</td>
	 <uniflow:m_order_th name="procname"    value="workflow.procdef.procname"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_NAME%>" collection="procdef" 
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="procTemID"    value="workflow.procdef.procTemID"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_ID%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="procTemVersion"    value="workflow.procdef.procTemVersion"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_VERSION_NAME%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).isAscending()%>'/>	    					
	 <uniflow:m_order_th name="builder"    value="workflow.procdef.builder"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_BUILDER%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="buildtime"    value="workflow.procdef.buildtime"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_BUILDTIME%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="category"    value="workflow.procdef.category"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_CAT%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).isAscending()%>'/>						
	 <uniflow:m_order_th name="limitTime"    value="workflow.procdef.limitTime"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_DEADLINE%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="overtimeaction"    value="workflow.procdef.overtimeaction"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_OVERDUEACTION%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="overtimeapp"    value="workflow.procdef.overtimeapp"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_OVERDUEAPP%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="description"    value="workflow.procdef.description"
	    orderby="<%=com.neusoft.uniflow.api.def.NWProcDef.PROC_DESC%>" collection="procdef"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).isAscending()%>'/>	    

	<logic:iterate id="procdef" name="procmonitorlistForm" property="list" type="com.neusoft.uniflow.api.def.NWProcDef" indexId="index">
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
				curPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).getCurrentPage()%>'
				maxPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).getPagesCount()%>'
				total='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("procmonitorlistForm")).getTotal()%>' />
        </td><td align="right" >
		<uniflow:m_button_table>
		       <uniflow:button id="authorization" action="javascript:formauthorization_onclick()" name="button.authorize"/>
               <uniflow:button id="defmonitor" action="javascript:svgmonitor_onclick()" name="button.monitor"/>
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
