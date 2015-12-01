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
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="javascript">
function OK_onclick(){
	document.forms[0].operation.value="OK";
	document.forms[0].submit();

}

function cancel_onclick()
{
  parent.returnValue = false;
  parent.close();
}
function onload(){
  var fail = "<%=request.getAttribute("fail")%>";
  var action = "<%=request.getAttribute("close_flag")%>";
  if(action == "close"){
    parent.returnValue = true;   
    opener.refresh();
    parent.close();
  }
}

</script>
</head>

<uniflow:p_body  onload="javascript:onload()" >
<uniflow:m_form action="workhandler.do">
<table align="center" border="0">
<tr><td height="80" align="center" valign="middle" style="font-weight:bold;font-size:16px;">自动脚本测试-工作项提交</td></tr>
</table>
<table border-color="#FFFFFF" border="0" cellpadding="0"cellspacing="0">
<tr>
<td  width="400" height="30" align="center" valign="middle" bgcolor="#EEEEEE"style="font-weight:bold;font-size:13px;">流程流转测试方式
</td>
</tr>
<tr>
<td  width="400" height="30" align="center" valign="middle" bgcolor="#EEEEEE"style="font-weight:bold;font-size:12px;">
    <html:radio property="isRollback" value="complete" />完成工作项
</td>
</tr>
<tr>
<td  width="400" height="30" align="center" valign="middle" bgcolor="#EEEEEE"style="font-weight:bold;font-size:12px;">
    <html:radio property="isRollback" value="rollback"/>回退工作项
</td>
</tr>
</table>
<br>
<uniflow:m_button_table>
		<uniflow:button id="OK"action="javascript:OK_onclick()"name="button.ok" />
		<uniflow:button id="cancel" action="javascript:cancel_onclick()"name="button.cancel" />
</uniflow:m_button_table>

 <html:hidden property="operation" />
 <html:hidden property="wid"/>
 </uniflow:m_form>
 <table>
 <td height="20">
 </td>
 </table>
</uniflow:p_body> 
</html:html>