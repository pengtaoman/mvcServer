<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
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
<script language="JavaScript">
	function ok_onclick()
	{
	  var length = document.forms[0].parti_new.length;
	 if(length>0){
	  for(var i=0; length>i; i++)
	  {
	    eval("document.forms[0].parti_new.options[" + i + "].selected = true");
	  }
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
	  var source = document.forms[0].parti;
	  var target = document.forms[0].parti_new;
	  if(!source)  return ;
	/*
	  var selectedIndex = source.selectedIndex;
	  if(selectedIndex<0)
    return;

  var optionText = source.options[selectedIndex].text;
  var optionValue =source.options[selectedIndex].value;
  for(var i=0; i<target.length; i++)
  {
    var value = eval("target.options[" + i + "].value");
    if(value==optionValue)
    {
	    return;
    }
  }
  var option = new Option(optionText, optionValue);
  eval("target.options[" + target.length + "] = option");
*/
var find = false;
for(var i=0;i<source.length;i++)
{
  var each = source.options[i];
  if(each.selected)
  {
    var optionText = each.text;
    var optionValue =each.value;
    for(var j=0; j<target.length; j++)
    {
	var value = eval("target.options[" + j + "].value");
	if(value==optionValue)
	{
	  find=true;
	  break;
	}
    }
    if(find)
	break;
    var option = new Option(optionText, optionValue);
    eval("target.options[" + target.length + "] = option");
  }
}
}
function removeMainto()
{
  var target = document.forms[0].parti_new;
  var length = target.length;
  for(var i=0; i<length; i++)
  {
    var selected = eval("target.options[" + i + "].selected");
    if(selected)
    {
	eval("target.options[" + i + "]=null");
	length--;
	i--;
    }
  }

}
function onload()
{
  var action = document.forms[0].action.value;
  if(action == "ok")
  {
    window.close();
    parent.returnValue = true;
    opener.reload();
  }
}
</script>
</head>

<uniflow:p_body onload="javascript:onload()" width="91%">
<uniflow:m_form action="updateParti.do">
<uniflow:p_title><bean:message bundle="uniflow" key="workflow.workitem.operation.updaeparti.title"/></uniflow:p_title>
<uniflow:p_content_comm_wrapper width="460">
<uniflow:p_content_table>
<uniflow:p_content_tr>
	<td class="main_label_td" valign="middle" width="210" nowrap>
        <%if(((java.util.ArrayList)request.getAttribute("partiInfo")).size()==0){%>
          <font size=2 color="red"><bean:message bundle="uniflow" key="workflow.workitem.operation.updaeparti.noparti"/></font>
        <%}else{%>
		    <html:select name="updatePartiActionForm" property="parti" styleClass="input_text200" size="20" multiple="true" style="width:100%">
			      <html:options collection="partiInfo"  property="value" labelProperty="label"/>
		    </html:select>
		    <%}%>
    </td>
	<td class="main_label_td" valign="middle" width="210" nowrap>
		    <html:select name="updatePartiActionForm" property="parti_new" styleClass="input_text" size="20" multiple="true" style="width:100%">
			      <html:options collection="partiInfo_new"  property="value" labelProperty="label"/>
		    </html:select>
    </td>
</uniflow:p_content_tr>
</uniflow:p_content_table>
</uniflow:p_content_comm_wrapper>
<uniflow:p_action>
  <uniflow:button id="delto" action="javascript:removeMainto()" name="button.remove"></uniflow:button>
  <uniflow:button id="addto" action="javascript:addMainto()" name="button.add"></uniflow:button>
  <uniflow:button id="ok" action="javascript:ok_onclick()" name="button.ok"></uniflow:button>
  <uniflow:button id="cancel" action="javascript:cancel_onclick()" name="button.cancel"></uniflow:button>
</uniflow:p_action>
<html:hidden property="action"/>
<html:hidden property="activityid"/>
</uniflow:m_form>
</uniflow:p_body>
</html:html>