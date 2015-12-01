<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
<title><bean:message bundle="uniflow" key = "workflow.popup"/></title>
<uniflow:style />
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-right: 0px;
	margin-top: 0px;
	margin-bottom: 0px;
}

.input_text300 {
	width:300px;
	font-family: Verdana, Arial, "宋体";
	font-size: 12px;
	color: #000000;
}
-->
</style>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="javascript">
function createnewversion_onclick(){
  var procInstID = document.createNewVersionForm.proinstId.value;
  document.createNewVersionForm.action = "<%=request.getContextPath()%>/createversion.do?operation=subnewversion&procInstID="+procInstID;
  document.createNewVersionForm.submit();
}
function checkname_onclick(){
    var procInstID = document.createNewVersionForm.proinstId.value;
	document.createNewVersionForm.action = "<%=request.getContextPath()%>/createversion.do?operation=checkname&procInstID="+procInstID;
	document.createNewVersionForm.submit();
}

function checkname_onload(){
 var isExist="<%=request.getAttribute("isExist")%>";
 var isclose="<%=request.getAttribute("close_falg")%>";
 var isSuccess="<%=request.getAttribute("success")%>";
 if(isclose=="notclose"){
 	if(isExist=="exist"){
	alert("版本名称已经存在");
	}else if(isExist=="notexist"){
	alert("版本名称可以使用");
	}
	}else if(isclose=="close"){
		if(isSuccess=="success"){
     		window.alert("<%=MessageUtil.getString("workflow.procdef.create.successful",request.getSession())%>");
     		opener.reload();
     		parent.close();
    	}else{
      		if((window.confirm("<%=MessageUtil.getString("workflow.procdef.create.unsuccessful",
      		request.getSession())%>"))==true){
        	var e = "<%=request.getAttribute("errorinfo")%>";
        	window.alert(e);
       	 	parent.close();
      		}else{
        	parent.close();
      		}
     }
	}
}

function cancel_onclick(){
  parent.returnValue = false;
  parent.close();
}

function check_num(num_value){
 if(num_value.value!=""){    
   if(isNaN(num_value.value)){
      alert("<%=MessageUtil.getString("workflow.check.numeric",request.getSession())%>");
      num_value.focus();
   }
 }
}
</script>
</head>

<uniflow:p_body width="92%" onload="javascript:checkname_onload()" >
<uniflow:m_form action="createversion.do">
<uniflow:p_title><bean:message bundle="uniflow" key="workflow.procinst.changeversion" /></uniflow:p_title>
 
 <uniflow:p_content_comm_wrapper width="100%">
 <uniflow:p_warning><html:errors /></uniflow:p_warning>
	<uniflow:p_content_table>
	 <uniflow:p_content_tr>
     <td class="main_label_td" valign="middle" nowrap>
     <bean:message bundle="uniflow" key="workflow.procinst.dynamversionname" />
     </td>
	 <td class="main_label_td" valign="middle" nowrap>
		<html:text name="createNewVersionForm" property="proinstName" styleClass="input_text300" />
	 </td>
	 </uniflow:p_content_tr>    
	 </uniflow:p_content_table>
 </uniflow:p_content_comm_wrapper>
<uniflow:p_action>
		<uniflow:button id="checkisExist" action="javascript:checkname_onclick()" name="检查名称"/>
		<uniflow:button id="createinitiate" action="javascript:createnewversion_onclick()" name="button.create" />
		<uniflow:button id="cancel" action="javascript:cancel_onclick()" name="button.cancel" />
</uniflow:p_action>
 <html:hidden property="proinstId" />
 <html:hidden property="operation"/>
 </uniflow:m_form>

</uniflow:p_body>
</html:html>