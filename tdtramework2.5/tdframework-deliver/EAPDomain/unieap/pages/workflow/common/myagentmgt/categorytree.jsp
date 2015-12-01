<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>

<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
<%String id =request.getParameter("agentid");%>
<uniflow:style />
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/DatePicker.js"></script>
<script language="javascript">
function ok_onclick(){
  opener.setSelected();
  document.forms[0].action.value = "update";
  document.forms[0].submit();
}
function expandNode(nodeID){
  document.forms[0].expand.value = nodeID;
  document.forms[0].submit();
}
function choosebox(nodeID)
{
  document.forms[0].select.value = nodeID;
  document.forms[0].submit();
}
function cancel_onclick(){
  document.forms[0].action.value = "cancel";
  document.forms[0].submit();
}
function onload(){
  var action = document.forms[0].action.value;
  if(action == "ok")
  {
    parent.returnValue = false;
    parent.close();
  }
}
</script>
</head>
<uniflow:p_body onload="javascript:onload()">
<uniflow:m_form action="myagentcptree.do">

<uniflow:p_title>流程分类树</uniflow:p_title>
<uniflow:p_content_comm_wrapper width="100%">
   <uniflow:p_content_table>
    <uniflow:p_content_tr>
	  <td bgcolor="white" nowrap>
	    <div style="width:320;height:250;overflow:auto" id="div">
	    	<uniflow:categorytree agentid="<%=id%>"/>
	    </div>
	  </td>
     </uniflow:p_content_tr>
    </uniflow:p_content_table>
</uniflow:p_content_comm_wrapper>
<uniflow:p_action>
	  <uniflow:button id="ok" action="javascript:ok_onclick()" name="button.ok"></uniflow:button>
	  <uniflow:button id="cancel" action="javascript:cancel_onclick()" name="button.cancel"></uniflow:button>
</uniflow:p_action>

<html:hidden property="action"/>
<html:hidden property="expand"/>
<html:hidden property="select"/>
<html:hidden property="agentid"/>
</uniflow:m_form>
</uniflow:p_body>
</html:html>