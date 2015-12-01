<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>

<html:html locale="true">

<head>
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
function branch_onclick(action)
{
  document.forms[0].action.value = action;
  document.forms[0].submit();
}
function cancel_onclick()
{
  window.close();
}
function onload()
{
  var close_flag = "<%=(String)request.getAttribute("closeflag")%>";
  if(close_flag=="successful"){
    alert("<%=MessageUtil.getString("workflow.monitor.procinst.parallel.branch.alert.success",request.getSession())%>");
    opener.refresh();
    window.close();
  }

}

</script>
</head>
<uniflow:p_body onload="javascript:onload()" width="90%">
<uniflow:m_form action="oldparallel.do">

<uniflow:p_title><bean:message bundle="uniflow" key="workflow.monitor.procinst.parallel.branch.title"/></uniflow:p_title>
<uniflow:p_content_comm_wrapper width="100%">
   <uniflow:p_content_table>
	<uniflow:p_content_tr>
	  <td class="main_label_td" valign="middle" nowrap>
	    <bean:message bundle="uniflow" key="workflow.monitor.procinst.parallel.branch.choice"/>
	  </td>
    </uniflow:p_content_tr>
    <uniflow:p_content_tr>
	  <td class="main_label_td" valign="middle" nowrap>
	     <uniflow:p_content_table>
           <logic:iterate id="actpara" name="oldParallelBranchForm" property="list" type="com.neusoft.uniflow.web.monitor.procinst.beans.ActParaBean" indexId="index">
	       <uniflow:p_content_tr>
	         <td class="main_label_td" valign="middle" nowrap>
	           <html:multibox name="oldParallelBranchForm" property="checked">
	              <bean:write name="actpara" property="actID"/>
	           </html:multibox>  
	         </td>
             <td class="main_label_td" valign="middle" nowrap>
               <bean:write name="actpara" property="actName"/>  
           </uniflow:p_content_tr>  
           </logic:iterate>
	     </uniflow:p_content_table>	
	  </td>
     </uniflow:p_content_tr>
    </uniflow:p_content_table>
</uniflow:p_content_comm_wrapper>
<uniflow:p_action>
	  <uniflow:button id="start" action="javascript:branch_onclick('start')" name="button.start"></uniflow:button>
	  <uniflow:button id="delete" action="javascript:branch_onclick('delete')" name="button.delete"></uniflow:button>
	  <uniflow:button id="cancel" action="javascript:cancel_onclick()" name="button.cancel"></uniflow:button>
</uniflow:p_action>
<table>
<td height="20"></td>
</table>
<html:hidden property="action"/>
<html:hidden property="parallelid"/>
</uniflow:m_form>
</uniflow:p_body>
</html:html>