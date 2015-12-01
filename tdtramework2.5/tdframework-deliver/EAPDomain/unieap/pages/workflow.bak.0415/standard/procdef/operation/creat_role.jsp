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
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="javascript">
function ok_onclick()
{
  document.creatroleForm.action = "<%=request.getContextPath()%>/updatecreatrole.do";
  document.creatroleForm.submit();
//  window.close();
 }
function cancel_onclick()
{
  parent.returnValue = false;
  parent.close();
}
function onload()
{
  var action = "<%=request.getAttribute("close_flag")%>";
  if(action == "close")
  {
    //parent.opener.refresh();
    parent.close();
  }

}
</script>
</head>

<body class="open_body" text="#000000" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0"  onload="javascript:onload()">
<uniflow:m_form action="updatecreatrole.do">
<uniflow:m_table style="main_title_table">
  <tr class="th">
    <td height="24" valign="center">&nbsp;&nbsp;<bean:message bundle="uniflow" key = "workflow.procdef.creatrole.information"/></td>
  </tr>
</uniflow:m_table>
<uniflow:p_content_comm_wrapper width="100%">
  <uniflow:p_content_table>
  <tr class="td1">
    <td height="26" align="center" width="45%">
	<bean:message bundle="uniflow" key="workflow.procinst.rd.select.rolename"/>
    </td>
    <td height="26" align="center" width="55%">
	<html:select property="roleID" style="width:100%;">
	  <html:options collection="roleinfo"  property="value" labelProperty="label"/>
	</html:select>
    </td>
   </tr>
</uniflow:p_content_table>
</uniflow:p_content_comm_wrapper>
<uniflow:p_action>
	<uniflow:button id="ok" action="javascript:ok_onclick()" ><bean:message bundle="uniflow" key="button.ok"/></uniflow:button>
	<uniflow:button id="cancel" action="javascript:cancel_onclick()"><bean:message bundle="uniflow" key="button.cancel"/></uniflow:button>
</uniflow:p_action>
<html:hidden property="selectedID"/>
<html:hidden property="operation"/>
</uniflow:m_form>
</body>
</html:html>
