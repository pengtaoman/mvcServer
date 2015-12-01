<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>

<html:html locale="true">

<head>
<%String id =request.getParameter("workitemID");%>
<title><bean:message bundle="uniflow" key = "workflow.popup"/></title>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0">
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
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<script language="javascript">
function ok_onclick()
{
  document.forms[0].action.value = "update";
  document.forms[0].submit();
}
function expandNode(nodeID){

  document.forms[0].expand.value = nodeID;
  document.forms[0].submit();
}
function cancel_onclick()
{
  parent.returnValue = false;
  parent.close();
}
function onload()
{
  var action = document.forms[0].action.value;
  if(action == "ok")
  {
    parent.returnValue = false;
    parent.close();
  }
}
function choosebox(nodeID)
{
  document.forms[0].select.value = nodeID;
  document.forms[0].submit();
}
function par_onclick(nodeID){
    var openURL = "<%=request.getContextPath()%>/updateParti.do?workitemid=<%=request.getParameter("workitemID")%>&activityid="+nodeID;
    var width = 500;
    var height = 480;
    open_scrollable_window(openURL,width,height);
}

</script>
</head>
<uniflow:p_body onload="javascript:onload()" width="90%">
<uniflow:m_form action="nextAct.do">

<uniflow:p_title><bean:message bundle="uniflow" key = "workflow.workitem.operation.nextact.title" /></uniflow:p_title>
<uniflow:p_content_comm_wrapper width="100%">
   <uniflow:p_content_table>
    <uniflow:p_content_tr>
	  <td bgcolor="white" nowrap>
	    <div style="width:320;height:250;overflow:auto" id="div">
	    	<uniflow:processtree id="<%=id%>"/>
	    </div>
	  </td>
     </uniflow:p_content_tr>
    </uniflow:p_content_table>
</uniflow:p_content_comm_wrapper>
<uniflow:p_action>
	  <uniflow:button id="ok" action="javascript:ok_onclick()" name="button.ok"></uniflow:button>
	  <uniflow:button id="cancel" action="javascript:cancel_onclick()" name="button.cancel"></uniflow:button>
</uniflow:p_action>
<table>
<td height="20"></td>
</table>
<html:hidden property="action"/>
<html:hidden property="expand"/>
<html:hidden property="select"/>
<html:hidden property="workitemID"/>
</uniflow:m_form>
</uniflow:p_body>
</html:html>