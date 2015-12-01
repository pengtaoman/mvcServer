<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
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
<script language="JavaScript" src="<%=request.getContextPath()%>js/common.js"></script>
<script language="javascript">
var flag = true;
function ok_onclick()
{
  if(flag==true){
  var doSubmit = document.rdForm.hasRD.value;
  if(doSubmit){
     document.rdForm.action = "<%=request.getContextPath()%>/updateRD.do";
     document.rdForm.submit();
    }
  parent.returnValue = false;
  parent.close();
  }
  else{
   flag = true;
  }
 }
function cancel_onclick()
{
  parent.returnValue = false;
  parent.close();
}
function check_num(num_value)
{
 if(num_value.value!=""){
   if(isNaN(num_value.value))
    {
    
    flag = false;
    num_value.focus();
   }
 }
}
 </script>
</head>

<uniflow:p_body width="89%">
<uniflow:m_form action="rd.do">
<uniflow:p_title><bean:message bundle="uniflow" key = "workflow.procinst.rd.information"/></uniflow:p_title>
<uniflow:p_content_comm_wrapper width="100%">
  <uniflow:p_warning>
    <html:errors/>
  </uniflow:p_warning>
<uniflow:p_content_table>
 <logic:equal name="rdForm" property="hasRD" value="false">
<uniflow:p_content_tr>
	<td class="main_label_td" valign="middle" nowrap>
	  <bean:message bundle="uniflow" key="workflow.procinst.rd.hasRD"/>
	</td>
</uniflow:p_content_tr>
  </logic:equal>
  <logic:equal name="rdForm" property="hasRD" value="true">
<uniflow:p_content_tr>
	<td class="main_label_td" valign="middle" nowrap>
	  <bean:message bundle="uniflow" key="workflow.procinst.rd.name"/>
	</td>
	<td class="main_label_td" valign="middle" nowrap>
	  <bean:message bundle="uniflow" key="workflow.procinst.rd.type"/>
	</td>
	<td class="main_label_td" valign="middle" nowrap>
	  <bean:message bundle="uniflow" key="workflow.procinst.rd.value"/>
	</td>
</uniflow:p_content_tr>

    <logic:iterate id="rdIndexed" name="rdForm" property="rdlist">
<uniflow:p_content_tr>
	 <td class="main_label_td" valign="middle" nowrap>
	   <bean:write name="rdIndexed" property="name"/>
	   <html:hidden name="rdIndexed" property="name" indexed="true"/>
	 </td>
	 <logic:equal name="rdIndexed" property="type" value="0">
	 <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.procinst.rd.type.numeric"/>
	 </td>
	 <td class="main_label_td" valign="middle" nowrap><html:text name="rdIndexed" property="rd_value" styleClass="input_text150"  indexed="true" onblur="check_num(this)"/>
	  <html:hidden name="rdIndexed" property="type" indexed="true"/>
	</td>
	 </logic:equal>
	 <logic:equal name="rdIndexed" property="type" value="1">
	 <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.procinst.rd.type.string"/>
	 </td>
	 <td class="main_label_td" valign="middle" nowrap><html:text name="rdIndexed" property="rd_value" styleClass="input_text150"  indexed="true"/>
	  <html:hidden name="rdIndexed" property="type" indexed="true"/>
	</td>
	 </logic:equal>
</uniflow:p_content_tr>
    </logic:iterate>
  </logic:equal>
<uniflow:p_content_tr>
   <logic:equal name="rdForm" property="needCreatorRole" value="true">
    <td class="main_label_td" valign="middle" nowrap>
	<bean:message bundle="uniflow" key="workflow.procinst.rd.select.rolename"/>
    </td>
   <td class="main_label_td" valign="middle" nowrap>
	<html:select property="roleID" style="font-family: Verdana, Arial, '宋体';font-size: 12px; color: #000000;">
	  <html:options collection="roleinfo"  property="value" labelProperty="label"/>
	</html:select>
    </td>
   </logic:equal>
</uniflow:p_content_tr>
</uniflow:p_content_table>
</uniflow:p_content_comm_wrapper>
<uniflow:p_action>
	<uniflow:button id="ok" action="javascript:ok_onclick()" name="button.ok"></uniflow:button>
	<uniflow:button id="cancel" action="javascript:cancel_onclick()" name="button.cancel"></uniflow:button>
</uniflow:p_action>

<html:hidden property="selectedID"/>
<html:hidden property="hasRD"/>
<html:hidden property="operation"/>
<html:hidden property="needCreatorRole"/>
</uniflow:m_form>
</uniflow:p_body>
</html:html>