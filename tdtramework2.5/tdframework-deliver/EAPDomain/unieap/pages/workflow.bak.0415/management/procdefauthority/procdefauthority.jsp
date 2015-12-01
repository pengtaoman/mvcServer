<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
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
.title{
	font-size:12px;
}
.maintable{
 	width:50%;
 	border-width:1px;
 	border-style:solid;
 	border-color:#9999CC;
}
.left-line{
	border-width:0px 1px 0px 0px;
	border-style:solid;
	border-color:#9999CC;
}
</style>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>

<script language="JavaScript">
//var focusWin
function ok_onclick()
{
  var length = document.forms[0].steps.length;
  for(var i=0; i<length; i++)
  {
    eval("document.forms[0].steps.options[" + i + "].selected = true");
  }
  if (length>0){
	  document.forms[0].action.value = "update";
	  document.forms[0].submit();
  }else{
      warning_info.innerHTML ="<%=MessageUtil.getString("workflow.workitem.operation.adhoc.choice.checked",request.getSession())%>";
      return;
  }
}
function cancel_onclick()
{
  parent.returnValue = false;
  parent.close();
}
function onload()
{
  var action = authorityform.action.value;

  if(action == "ok")
  {
  alert("添加成功");
  }
}

function addAdhoc()
{
  addSelect(document.forms[0].steps);
}
function removeAdhoc()
{
  removeSelect(document.forms[0].steps);
}

function addSelect(select)
{
  var length = select.length;
  var partID = window.frames["actorsel"].getSelectedID();
  var flag = true;
  if(partID=="")
  {
    warning_info.innerHTML ="<%=MessageUtil.getString("workflow.workitem.operation.adhoc.choice.checked",request.getSession())%>";
    return;
  }else {
    warning_info.innerHTML ="";
  }
  var partName = window.frames["actorsel"].getSelectedName();
  var partType = window.frames["actorsel"].getSelectedType();
  var optionValue = partType+partID; 
    
  for (var i=0; i<length; i++){
      var selected = eval("select.options[" + i + "].value");
      if (optionValue==selected){
         flag = false;
      }
  }
  if (flag){
      var option = new Option(partName, optionValue);
      flag = true;
      eval("select.options[" + length + "] = option");
      warning_info.innerHTML ="";
  }
  else {
      warning_info.innerHTML ="<%=MessageUtil.getString("workflow.workitem.operation.adhoc.choice.checked1",request.getSession())%>";
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

</script>
</head>

<uniflow:p_body onload="javascript:onload()" width="93%">
<uniflow:m_form action="authorityAction.do">
<table class="title">
	<tr>
	<td>
		<bean:message bundle="uniflow" key="workflow.procdef.authority.title"/>
	</td>
	<td>&nbsp;</td>
	</tr>
</table>
<uniflow:p_content_table width="100%">
<tr>
<td>
  <uniflow:p_warning>
    <html:errors/>
  </uniflow:p_warning>
  <table class="maintable" >
    <uniflow:p_content_tr>
	<td class="main_label_td" width="250" valign="top" nowrap>
	  <iframe scrolling="yes" id="actorsel" width="250" height="100%" frameborder="no" src="procauthtree.do?selType=1&treeType=1"></iframe>
	</td>
	<td style="padding:0px;width:20px">
		  <table width="100%" border="0" cellpadding="0" cellspacing="0" height="24" align="right">
		    <tr>
			  <td width="10%" align="center" valign="center" ><a href="javascript:addAdhoc()"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/main_img/add.gif" alt='增加'width="16" height="16" border="0"></a></td>
		   </tr>
		   <tr>
		   		<td width="10%" align="center" valign="center" ><a href="javascript:removeAdhoc()">
		   		<img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/main_img/delete.gif" alt='删除'width="16" height="16" border="0"></a>
		   		</td>
		   </tr>
		  </table>
	</td>
	<td class="main_label_td" valign="top"align="center" >
	  <table width="100%" border="0" cellpadding="0" cellspacing="0" >
	    <tr>
		<td align="left">
		    <html:select name="authorityform" property="steps" size="25" multiple="true" style="width:250px;border-style:none;border-width:0px">
			<html:options collection="steplist"  property="value" labelProperty="label"/>
		    </html:select>
		</td>
	    </tr>
	 </table>
	</td>
  </uniflow:p_content_tr>
  <tr>
  	<td>&nbsp;</td>
  	<td>&nbsp;</td>
  	<td>
  	<uniflow:p_action>
  		<uniflow:button id="ok" action="javascript:ok_onclick()" name="button.ok"></uniflow:button>
  		<uniflow:button id="cancel" action="javascript:cancel_onclick()" name="button.cancel"></uniflow:button>
  	</uniflow:p_action>
  	</td>
  </tr>
 </table>
 </td>
 </tr>
 </uniflow:p_content_table>

<html:hidden property="action"/>
</uniflow:m_form>
</uniflow:p_body>

</html:html>