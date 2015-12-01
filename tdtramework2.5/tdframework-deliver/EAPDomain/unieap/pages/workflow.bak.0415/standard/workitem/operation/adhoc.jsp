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
  var action = adhocForm.action.value;

  if(action == "ok")
  {
    parent.returnValue = true;    
    parent.opener.refresh();
    parent.close();
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
function moveUp()
{
  var select = document.forms[0].steps;
  var selectedIndex = select.selectedIndex;
  if(selectedIndex<0)return;
  var length = select.length;
  var s = selectedIndex-1;
  if(selectedIndex>0)
  {
    var selectedOption = eval("select.options["+selectedIndex+"]");
    var preOption = eval("select.options["+(selectedIndex-1)+"]");
    var text = selectedOption.text;
    var value = selectedOption.value;
    var preText = preOption.text;
    var preValue = preOption.value;
    eval("select.options[" + s + "].value = value");
    eval("select.options[" + s + "].text = text");
    eval("select.options[" + selectedIndex + "].text = preText");
    eval("select.options[" + selectedIndex + "].value = preValue");
    eval("select.options[" + s + "].selected = true");
    eval("select.options[" + selectedIndex + "].selected = false");
  }
}
function moveDown()
{
  var select = document.forms[0].steps;
  var selectedIndex = select.selectedIndex;
  if(selectedIndex<0)return;
  var length = select.length;
  var next = selectedIndex+1;
  if(selectedIndex<length-1)
  {
    var selectedOption = eval("select.options["+selectedIndex+"]");
    var nextOption = eval("select.options["+next+"]");
    var text = selectedOption.text;
    var value = selectedOption.value;
    var nextText = nextOption.text;
    var nextValue = nextOption.value;
    eval("select.options[" + next + "].value = value");
    eval("select.options[" + next + "].text = text");
    eval("select.options[" + selectedIndex + "].text = nextText");
    eval("select.options[" + selectedIndex + "].value = nextValue");
    eval("select.options[" + selectedIndex + "].selected = false");
    eval("select.options[" + next + "].selected = true");
  }
}

</script>
</head>

<uniflow:p_body onload="javascript:onload()" width="93%">
<uniflow:m_form action="adhoc.do">

<uniflow:p_title>
<bean:message bundle="uniflow" key="workflow.workitem.operation.adhoc.title"/>
</uniflow:p_title>

<uniflow:p_content_comm_wrapper width="100%">
  <uniflow:p_warning>
    <html:errors/>
  </uniflow:p_warning>
  <uniflow:p_content_table>
    <uniflow:p_content_tr>
	<td class="main_label_td" valign="top" nowrap>
	  <iframe scrolling="yes" id="actorsel" width="250" height="100%" frameborder="1" src="oneactorsel.do?selType=1&treeType=1"></iframe>
	</td>
	<td class="main_label_td" valign="top" width="250" align="center" >
	  
	  <table width="100%" border="0" cellpadding="0" cellspacing="0" >
	    <tr>
		<td align="right">
		    <html:select name="adhocForm" property="steps" styleClass="input_text" size="25" multiple="true" style="width:250">
			<html:options collection="steplist"  property="value" labelProperty="label"/>
		    </html:select>
		</td>
	    </tr>
	    <tr>
		<td align="right"  >
		  <table width="100%" border="0" cellpadding="0" cellspacing="0" height="24" align="right">
		    <tr>
			<td>&nbsp;</td>
			<logic:equal name="adhocForm" property="editable" value="true">
			  <td width="10%" align="center" valign="center" ><a href="javascript:addAdhoc()"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/main_img/add.gif" alt='增加'width="16" height="16" border="0"></a></td>
			  <td width="10%" align="center" valign="center" ><a href="javascript:removeAdhoc()"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/main_img/delete.gif" alt='删除'width="16" height="16" border="0"></a></td>
			  <td width="10%" align="center" valign="center" ><a href="javascript:moveUp()"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/main_img/previous.gif" alt='上移'width="16" height="16" border="0"></a></td>
			  <td width="10%" align="center" valign="center"  ><a href="javascript:moveDown()"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/main_img/next.gif" alt='下移'width="16" height="16" border="0"></a></td>
			</logic:equal>
			<logic:equal name="adhocForm" property="editable" value="false">
			  <td width="10%" align="center" valign="center"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/main_img/add.gif" alt='增加' width="16" height="16" border="0"></td>
			  <td width="10%" align="center" valign="center"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/main_img/delete.gif" alt='删除' width="16" height="16" border="0"></td>
			  <td width="10%" align="center" valign="center"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/main_img/previous.gif"  alt='上移' width="16" height="16" border="0"></td>
			  <td width="10%" align="center" valign="center"><img src="<%=WorkflowManager.getWorkflowStylePath()%>/style1/main_img/next.gif" alt='下移' width="16" height="16" border="0"></td>
		    </logic:equal>
		   </tr>
		  </table>
		</td>
	    </tr>
	 </table>
	</td>
    </uniflow:p_content_tr>
  </uniflow:p_content_table>
</uniflow:p_content_comm_wrapper>

<uniflow:p_action>
  <uniflow:button id="ok" action="javascript:ok_onclick()" name="button.ok"></uniflow:button>
  <uniflow:button id="cancel" action="javascript:cancel_onclick()" name="button.cancel"></uniflow:button>
</uniflow:p_action>

<html:hidden property="action"/>
<html:hidden property="workItemID"/>
</uniflow:m_form>
</uniflow:p_body>

</html:html>