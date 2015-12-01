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
-->
</style>
<script language="JavaScript"src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="javascript">
var flag = true;

function createandinitiate_onclick(){
  document.createProcInstForm.action = "<%=request.getContextPath()%>/updateProcInst.do?operation=initiate";
  document.createProcInstForm.submit();
 }
function createandstart_onclick(){
	if(flag){
		document.createProcInstForm.action = "<%=request.getContextPath()%>/updateProcInst.do?operation=start";
		document.createProcInstForm.submit();
	}else{
		alert('变量值错误！');
	  }
 }
function cancel_onclick(){
  parent.returnValue = false;
  parent.close();
}
function onload(){
  var fail = "<%=request.getAttribute("fail")%>";
  var action = "<%=request.getAttribute("close_flag")%>";
  if(action == "close"){
    parent.returnValue = true;    
    if(fail=="false"){
     window.alert("<%=MessageUtil.getString("workflow.procdef.create.successful",request.getSession())%>");
     parent.close();
    }else{
      if((window.confirm("<%=MessageUtil.getString("workflow.procdef.create.unsuccessful",request.getSession())%>"))==true){
        var e = "<%=request.getAttribute("errorinfo")%>";
        window.alert(e);
        parent.close();
      }else{
        parent.close();
      }
     }
  }
}
function validate(num_value){
	if(num_value!=null && num_value !=""){
		var float_num = parseFloat(num_value);
		if(("" + float_num)==num_value){
			flag=true;
		}else{
			flag=false;
			alert('请输入浮点数！');
		}
	}else{
		flag=true;
	}
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

<uniflow:p_body  onload="javascript:onload()" width="92%">
<uniflow:m_form action="updateProcInst.do">
<uniflow:p_title><bean:message bundle="uniflow"key="workflow.procdef.create.title" /></uniflow:p_title>
 
 <uniflow:p_content_comm_wrapper width="100%">
 <uniflow:p_warning><html:errors /></uniflow:p_warning>
	<uniflow:p_content_table>
	 <uniflow:p_content_tr>
     <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow"key="workflow.extend.procinst.procname" /></td>
	 <td class="main_label_td" valign="middle" nowrap>
		<html:text name="createProcInstForm" property="procInstName" styleClass="input_text200" />
	 </td>
	 </uniflow:p_content_tr>
	 <logic:equal name="createProcInstForm" property="hasRD"value="true">
	  <logic:iterate id="rdIndexed" name="createProcInstForm" property="rdlist">
	    <uniflow:p_content_tr>
	    <td class="main_label_td" valign="middle" nowrap>
	       <bean:write name="rdIndexed" property="name" />
		   <html:hidden name="rdIndexed" property="name" indexed="true" />
	    </td>
	    <td class="main_label_td" valign="middle" nowrap>
	    <logic:equal name="rdIndexed" property="type" value="0">
	    	<html:text name="rdIndexed" property="rd_value"  indexed="true" styleClass="input_text200" onblur="validate(this.value)" onkeypress="OnlyNumber()"/>
	       <html:hidden name="rdIndexed" property="type" indexed="true" />
           <span style='font-family: "Verdana", "Arial", "Helvetica", "sans-serif"; font-size: 11px; color: #FF0000'>
		   <bean:message bundle="uniflow" key="workflow.procinst.rd.type.numeric" /></span>
	    </logic:equal>
	    <logic:equal name="rdIndexed" property="type" value="1">
	       <html:text name="rdIndexed" property="rd_value"  indexed="true" styleClass="input_text200" />
	       <html:hidden name="rdIndexed" property="type" indexed="true" />
           <span style='font-family: "Verdana", "Arial", "Helvetica", "sans-serif"; font-size: 11px; color: #FF0000'>
		   <bean:message bundle="uniflow"key="workflow.procinst.rd.type.string" /></span>
	    </logic:equal>
	    </td>
	    </uniflow:p_content_tr>
	  </logic:iterate>
	</logic:equal>	
	<logic:equal name="createProcInstForm" property="needCreatorRole"value="true">
		<uniflow:p_content_tr>
        <td class="main_label_td" valign="middle" nowrap>
			<bean:message bundle="uniflow"key="workflow.procinst.rd.select.rolename" />
		</td>
		<td class="main_label_td" valign="middle" nowrap>
			<html:select property="roleID" style='font-family: Verdana, Arial, "宋体";font-size: 12px;color: #000000;'>
				<html:options collection="roleinfo" property="value"labelProperty="label" />
			</html:select>
		</td>
		</uniflow:p_content_tr>
     </logic:equal>    
	 </uniflow:p_content_table>
 </uniflow:p_content_comm_wrapper>
<uniflow:p_action>
		<!-- uniflow:button id="createinitiate"action="javascript:createandinitiate_onclick()"name="button.create" / -->
		<uniflow:button id="createstart"action="javascript:createandstart_onclick()"name="button.create_start" />
		<uniflow:button id="cancel" action="javascript:cancel_onclick()"name="button.cancel" />
</uniflow:p_action>
 <html:hidden property="procDefID" />
 <html:hidden property="hasRD" />
 <html:hidden property="operation" />
 <html:hidden property="needCreatorRole" />
 </uniflow:m_form>

</uniflow:p_body>
</html:html>
