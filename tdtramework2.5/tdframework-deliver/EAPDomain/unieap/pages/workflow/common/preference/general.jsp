<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%
 String picBase = request.getContextPath() + "/unieap/pages/workflow/stylesheet/style2009/";
 %>
<html:html locale="true"> 

<head>
<title>配置</title>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<uniflow:style/>
<link href="<%=picBase%>style09.css" rel="stylesheet" type="text/css" />
<script language="javascript" src="<%=picBase%>2levelMenuShared.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="javascript">
function button_onclick(action)
{
  //alert("bu_click "+action);
  prefForm.action.value = action;
  if(validatorNumber())
  {
  document.prefForm.submit();
  }
}

 function onload()
{
  var action = "<%=request.getAttribute("close_flag")%>";
  if(action == "close")
  {
    opener.refresh();
    window.close();
  }

}
 function validatorNumber(){
  var value = prefForm.number.value;
  var sStr,i,iStart = "";
  var number;

  sStr = value.split("");
  iStart = -1 ;
  for (i = 0 ; i < sStr.length ; i++){
    if (sStr[i] != " "){
     iStart = i;
     break;
    }
  }
if (iStart == -1) {
 warning_info.innerHTML ="<%=MessageUtil.getString("workflow.common.preference.general.mumber",request.getSession())%>"+"<%=MessageUtil.getString("workflow.required",request.getSession())%>";
 return false;
}else {
   if (!isNaN(value.substring(iStart))) {

	number=parseInt(value.substring(iStart)) ;
	if (!(number >= 3 && number <= 100)) {
	  warning_info.innerHTML = "<%=MessageUtil.getString("workflow.common.preference.general.mumber.checked1",request.getSession())%>";
	  return false;
	}
	} else {

      warning_info.innerHTML = "<%=MessageUtil.getString("workflow.common.preference.general.mumber.checked1",request.getSession())%>";
    return false;
    }
   }
 return true;
}

</script>

</head>

<uniflow:p_body onload="javascript:onload()">
<html:form action="generalpref.do">
 <uniflow:tab width="85%">
    <uniflow:tabElement messageKey="workflow.common.preference.general" selected="true" action="javascript:button_onclick('general')"/>
    <uniflow:tabElement messageKey="workflow.common.preference.password" selected="false" action="javascript:button_onclick('password')"/>
    <td></td>
  </uniflow:tab>

<uniflow:p_content_wrapper>

  <uniflow:p_warning>
    <html:errors/>
  </uniflow:p_warning>

  <uniflow:p_content_table>
    <uniflow:p_content_tr>
	<td width="60%" height="25" class="lable">&nbsp;&nbsp;&nbsp;<bean:message bundle="uniflow" key="workflow.common.preference.general.style"/>&nbsp;</td>
	<td width="40%">
	  <html:select property="style">
	    <html:options collection="styleinfo"  property="value" labelProperty="label"/>
	  </html:select>
	</td>
    </uniflow:p_content_tr>

    <uniflow:p_content_tr>
	<td width="40%" height="25" class="lable">&nbsp;&nbsp;&nbsp;<bean:message bundle="uniflow" key="workflow.common.preference.general.mumber"/>&nbsp;</td>
	<td width="60%">
	  <html:text property="number" onkeypress="OnlyNumber()" />
	</td>
    </uniflow:p_content_tr>
  </uniflow:p_content_table>
</uniflow:p_content_wrapper>

<uniflow:p_action>
  <uniflow:button id="ok" action="javascript:button_onclick('OK')"><bean:message bundle="uniflow" key="button.ok"/></uniflow:button>
  <uniflow:button id="cancel" action="javascript:window.close()"><bean:message bundle="uniflow" key="button.cancel"/></uniflow:button>
</uniflow:p_action>
<html:hidden property="action"/>
</html:form>
</uniflow:p_body>
</html:html>