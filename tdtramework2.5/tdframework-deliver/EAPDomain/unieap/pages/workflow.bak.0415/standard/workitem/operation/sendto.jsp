<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true"> 
<head>
<title><bean:message bundle="uniflow" key = "workflow.popup"/></title>
<uniflow:style/>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-right: 0px;
	margin-top: 0px;
	margin-bottom: 0px;
}
-->
</style>
<script language="javascript"
	src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/adapter/ext/Ext.js"></script>
<script language="javascript"
	src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/adapter/ext/ext-base.js"></script>
<link rel="stylesheet"
	href="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/resources/css/ext-all.css"
	type="text/css"></link>
<script language="javascript"
	src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/ext-all-debug.js"></script>
	
<link rel="stylesheet"
	href="<%=WorkflowManager.getWorkflowPath()%>/webdesign/ext-1.1.1/resources/css/dependency.css"
	type="text/css"></link>
<link rel="stylesheet" 
	href="<%=WorkflowManager.getWorkflowPath()%>/webdesign/css/org_dependency.css" 
	type="text/css"></link>
<LINK href="<%=WorkflowManager.getWorkflowPath()%>/stylesheet/Style.css" rel=stylesheet>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/DatePicker.js"></script>
<script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/sendToOrgTree.js"></script>
<script type="text/javascript" src="<%=WorkflowManager.getWorkflowPath()%>/webdesign/js/AsyncTreeNode.js"></script>
<script language="JavaScript">
function ok_onclick()
{
  var length = document.forms[0].sendToParts.length;
  for(var i=0; i<length; i++)
  {
    eval("document.forms[0].sendToParts.options[" + i + "].selected = true");
  }
  length = document.forms[0].copyToParts.length;
  for(var i=0; i<length; i++)
  {
    eval("document.forms[0].copyToParts.options[" + i + "].selected = true");
  }
  document.forms[0].action.value = "update";
  document.forms[0].submit();
}
function cancel_onclick()
{
  parent.returnValue = false;
  parent.close();
}
function addMainto()
{
  addSelect(document.forms[0].sendToParts);
}
function removeMainto()
{
  removeSelect(document.forms[0].sendToParts);
}
function addCopyto()
{
  addSelect(document.forms[0].copyToParts);
}
function removeCopyto()
{
  removeSelect(document.forms[0].copyToParts);
}
function addSelect(select)
{
  var length = select.length;
  var partID = document.getElementById("selectedId").value;
  var flag = true;

  if(partID==""){
     warning_info.innerHTML ="<%=MessageUtil.getString("workflow.workitem.operation.adhoc.choice.checked",request.getSession())%>"; 
     return;
  }
  var partName = document.getElementById("selectedName").value;
  var partType = document.getElementById("selectedType").value;
  if(partType==0||partType==1){
  }else{
    alert("请选择人员或角色");
  	return false;
  }
  var optionValue = partType+partID;

  for(var i=0; i<length; i++)
  {
    var value = eval("select.options[" + i + "].value");
    if(value==optionValue){
        warning_info.innerHTML ="<%=MessageUtil.getString("workflow.workitem.operation.adhoc.choice.checked1",request.getSession())%>";
	    flag = false;
    }
  }
  if (flag){
  
     var option = new Option(partName, optionValue);
     eval("select.options[" + length + "] = option");
  }
}
function removeSelect(select)
{
  var length = select.length;
  for(var i=0; i<length; i++)
  {
    var selected = eval("select.options[" + i + "].selected");
    if(selected)
    {
	eval("select.options[" + i + "]=null");
	length--;
	i--;
    }
  }
}
function onload()
{
  var action = sendtoForm.action.value;
  if(action == "ok")
  {
    //opener.reload();
    parent.returnValue = false;
    parent.close();
  }
}
</script>
</head>

<uniflow:p_body onload="javascript:onload()" width="550">
<uniflow:m_form action="sendto.do">

   <uniflow:m_table style="main_title_table">
	 <tr> <td nowrap class="text_title" > <bean:message bundle="uniflow" key = "workflow.workitem.operation.directto.title"/></td>
	 
	 <td align="right" valign="middle" class="main_table2_td2">
		<table height="28" border="0" cellpadding="0" cellspacing="0"class="main_label_table">
           <tr><td height="25" valign="middle" nowrap class="main_label_td">
                <html:select name="sendtoForm" property="sendto" >
                <html:options collection="sendtoList"  property="value" labelProperty="label"/>
  				</html:select>
  		   </td></tr>      
        </table></td>
     </tr>
   </uniflow:m_table>

<uniflow:p_content_comm_wrapper width="550">
  <uniflow:p_warning>
    <html:errors/>
  </uniflow:p_warning>
  <uniflow:p_content_table>
    <uniflow:p_content_tr>
	<td class="main_label_td" valign="top" nowrap>
	<div style="height:400px; width:280px; overflow:auto;border-style:groove;solid;">
		<div id="leftTreePanel" style="align:top" />
	</div>
	</td>
	<td nowrap valign="top" align="right" class="main_label_td" >
	  <table width="100%" border="0" cellpadding="0" cellspacing="0" >
	    <tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.workitem.sendto.zhusong"/></td>
	    </tr>
	   <tr>
		 <tr>
		  <td class="main_label_td" valign="middle" nowrap>
		    <html:select name="sendtoForm" property="sendToParts" multiple="true" style="width:240" size="9">
			<html:options collection="sendToPartList"  property="value" labelProperty="label"/>
		    </html:select>
		  </td>
		 </tr>
		 <tr>
		 <td align="right"  >
		  <table width="100%" border="0" cellpadding="0" cellspacing="0" height="24" align="right">
		 <tr>
		  <td>&nbsp;</td>
		  <td width="10%" align="center" height="24" valign="top" ><a href="javascript:addMainto()"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/main_img/add.gif" alt='增加' width="16" height="16" border="0"></a></td>
		  <td width="10%" align="center" height="24" valign="top" ><a href="javascript:removeMainto()"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/main_img/delete.gif"  alt='删除' width="16" height="16" border="0"></a></td>
	     </tr>
	     
	     </table>
	     </td>
		 <tr>
		  
	   </tr>
	  </table>
	  <table width="100%" border="0" cellpadding="0" cellspacing="0" >
	    <tr>
		<td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.workitem.sendto.chaosong"/></td>
	    </tr>
	    <tr>
		<td class="main_label_td" valign="middle" nowrap >
		    <html:select name="sendtoForm" property="copyToParts" multiple="true" style="width:240" size="9">
			<html:options collection="copyToPartList"  property="value" labelProperty="label"/>
		    </html:select>
		</td>
	    </tr>
	   <tr>
		 <td align="right"  >
		  <table width="100%" border="0" cellpadding="0" cellspacing="0" height="24" align="right">
		
	    <tr>
	    <td>&nbsp;</td>
	    <td width="10%" align="center" height="26" valign="top" ><a href="javascript:addCopyto()"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/main_img/add.gif" alt='增加' width="16" height="16" border="0"></a></td>
		<td width="10%" align="center" height="26" valign="top" ><a href="javascript:removeCopyto()"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/main_img/delete.gif" alt='删除' width="16" height="16" border="0"></a></td>
	    
	    </tr>
	     </table>
	     </td>
		 <tr>
		
	  </table>
	  <br>
	</td>
    </uniflow:p_content_tr>
  </uniflow:p_content_table>
</uniflow:p_content_comm_wrapper>

<uniflow:p_action>
  <uniflow:button id="ok" action="javascript:ok_onclick()" name ="button.ok"></uniflow:button>
  <uniflow:button id="cancel" action="javascript:cancel_onclick()" name="button.cancel"></uniflow:button>
</uniflow:p_action>


<html:hidden property="action"/>
<html:hidden property="workItemID"/>
</uniflow:m_form>
<input type="hidden" value='<%=request.getContextPath()%>' id="path" />
<input type="hidden"  id="selectedName" value=""/>
<input type="hidden"  id="selectedType" value=""/>
<input type="hidden"  id="selectedId" value=""/>
</uniflow:p_body>
</html:html>