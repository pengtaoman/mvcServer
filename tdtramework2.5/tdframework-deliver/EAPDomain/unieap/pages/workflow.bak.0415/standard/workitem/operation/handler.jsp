<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">

<head>
<%String wid = request.getParameter("workitemID");%>
<title><bean:message bundle="uniflow" key = "workflow.taskcontainer" /></title>
<uniflow:style/>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript">
function onload()
{
  var action = "<%=request.getAttribute("close_flag")%>";
  if(action == "close")
  {
    top.returnValue = true;
    parent.opener.refresh();  
    top.close();
   }
 }
function complete_onclick()
{
 var app_type = openworkitemForm.appType.value;
 if(app_type=="wform"){
 	//alert(parent.appurl.document.forms[0].action);
 	var params="";
 	if(params==null||params.length==0){
 		params="workItemId=<%=wid%>";
 	}else{
 		params+="&workItemId=<%=wid%>";
 	}
 	params+="&operation="+ "complete";
 	var action="<%=request.getContextPath()%>"+"/formreceiver4workflow";
 	parent.appurl.document.forms[0].action=action;
 	
 	//parent.appurl.document.forms[0].submit();
 	if(parent.appurl.formComplete4Workflow(params)){
 	   window.setTimeout("workItem_completeByForm()",1000);
 	}
 	
  }else{
 	try{
    	//parent.appurl.operation_complete(openworkitemForm.workItemID.value);///?????????????liwei
    	workitem_complete();
    }catch(e){
     	alert("<%=MessageUtil.getString("workflow.workitem.operation.handler.checked",request.getSession())%>");     
    }    
 }
}
function set_notify(){
    var openURL = "<%=request.getContextPath()%>/notifyinfo.do?workitemID=<%=wid%>";
    var width = 432;
    var height = 350;
    var left = (window.screen.availWidth - width) / 2;    
    var top = 0;    
    var features = "status=no,resizable=no,scrollbars=no,left=" + left + "," + "top=" + top + "," + "width=" + width + "," + "height=" + height;
    window.open(openURL, "", features);
}
function workItem_completeByForm(){
	 openworkitemForm.operation.value ="completebyform";
	  openworkitemForm.submit();
}
function workitem_complete()
{
 openworkitemForm.operation.value = "complete";
 openworkitemForm.submit();
}
function cancel_onclick()
{
 openworkitemForm.operation.value = "cancel";
 openworkitemForm.submit();
}
</script>
</head>

<body class="open_body" text="#000000" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onload="javascript:onload()">
<uniflow:m_form action="taskhandler.do">
<uniflow:m_table style="main_button">
  <tr><td align="right" >
    <uniflow:m_button_table>
    <uniflow:button id="notify" name="button.setting" action="javascript:set_notify()" />
	  <uniflow:button id="complete" action="javascript:complete_onclick()" name="button.ok"></uniflow:button>
	  <uniflow:button id="cancel" action="javascript:cancel_onclick()" name="button.cancel"></uniflow:button>
    </uniflow:m_button_table>
	</td></tr>
</uniflow:m_table>
<html:hidden property="workItemID"/>
<html:hidden property="operation"/>
<html:hidden property="appType"/>
</uniflow:m_form>
 </body>
</html:html>