<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">

<head>
	<title></title>
	<uniflow:style />
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
	<script language="javascript">
	
function button_onclick(action)
{

  if (document.forms[0].ifmail&&document.forms[0].subject.value=="<%=MessageUtil.getString("workflow.common.notify.notifyinfo.checked.mail.subject",request.getSession())%>"){
     warning_info.innerHTML = "";
     return;
  }
  notifyInfoForm.action.value = action;
  document.notifyInfoForm.submit();
  
  
}

 function onload()
{
  var flag = "<%=request.getAttribute("flag")%>";
  if(flag == "success"){ 
    alert("<%=MessageUtil.getString("workflow.save.success",request.getSession())%>");
    window.close();
  }
  if(flag == "nosetting"){ 
    alert("<%=MessageUtil.getString("workflow.save.none",request.getSession())%>");
    window.close();
  }
  
 }

</script>

</head>

<body onload="javascript:onload()">
<uniflow:m_form action="notifyinfo.do">
<uniflow:p_title><bean:message bundle="uniflow"key="workflow.common.notify.notifyinfo.title" />
</uniflow:p_title>
<uniflow:p_content_comm_wrapper width="400">
<uniflow:p_warning><html:errors /></uniflow:p_warning>
<uniflow:p_content_table>
<tr>
<td width="80" align="left" ><bean:message bundle="uniflow"key="workflow.common.notify.notifyinfo.send" /></td>
<td width="300" align="left">
<html:text property="nextact" readonly="true" style="border:0;width:280;font-family: Verdana, Arial, '宋体';font-size: 12px; color: #000000;" />
</td>
</tr>
<tr>
<td width="80" align="left" > </td>
<td width="300" align="left">
<html:text property="nextuser" style="border:0;" readonly="true" style="border:0;width:280;font-family: Verdana, Arial, '宋体';font-size: 12px; color: #000000;"/>
</td>
</tr>
<tr>
<td width="80" align="left" ><bean:message bundle="uniflow"key="workflow.common.notify.notifyinfo.type" /></td>
<td width="300" align="left">
<html:checkbox property="ifmail" /><bean:message bundle="uniflow"key="workflow.notify.mail" />&nbsp;&nbsp;&nbsp;
<html:checkbox property="ifmessage" /><bean:message bundle="uniflow"key="workflow.notify.message" />&nbsp;&nbsp;&nbsp;
<html:checkbox property="ifother" /><bean:message bundle="uniflow"key="workflow.notify.other" />
</td>
</tr>
<tr>
<td width="80" align="left" ><bean:message bundle="uniflow"key="workflow.common.notify.notifyinfo.subject" /></td>
<td width="300" align="left">
<html:text property="subject" style="width:280;font-family: Verdana, Arial, '宋体';font-size: 12px; color: #000000;"/>
</td>
</tr>
<tr>
<td width="80" align="left" ><bean:message bundle="uniflow"key="workflow.common.notify.notifyinfo.content" /></td>
<td width="300" align="left">
<html:textarea property="content" rows="6" style="width:280;font-family: Verdana, Arial, '宋体';font-size: 12px; color: #000000;"/>
</td>
</tr>
</uniflow:p_content_table>
</uniflow:p_content_comm_wrapper>
<uniflow:p_action>
<uniflow:button id="ok" action="javascript:button_onclick('OK')" name="button.ok"></uniflow:button>
<uniflow:button id="back" action="javascript:window.close()" name="button.back"></uniflow:button>
</uniflow:p_action>
<html:hidden property="action" />
<html:hidden property="wid" />
</uniflow:m_form>
</body>
</html:html>
