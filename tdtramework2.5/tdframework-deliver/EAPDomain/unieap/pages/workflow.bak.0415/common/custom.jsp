<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%
	
	String extendNo =(String) request.getAttribute("extendNo");
	String elementNo =(String) request.getAttribute("elementNo");
	
	int extNO = extendNo.equals("")?0:Integer.parseInt(extendNo);
	int eleNO = Integer.parseInt(elementNo);
%>

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
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript">
function button_onclick(actName)
{
  document.customForm.action = actName;
  document.customForm.submit();
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
</script>
</head>

<uniflow:p_body onload="javascript:onload()" width="90%">
  <uniflow:m_form action="custom.do">
   <uniflow:p_title><bean:write name="window_header"/></uniflow:p_title>
 <uniflow:p_content_comm_wrapper width="100%">
  <uniflow:p_warning>
    <html:errors/>
  </uniflow:p_warning>
  <uniflow:p_content_table>
    
      <%int i=0,j=0,k=0,m=0,n=0;%>
	   <logic:iterate id="element" property="elements" name="customForm">
	    <%if(k<eleNO-extNO){
	    if (i%2 == 0)
	    {%>
		<tr>
	   <%}i=i+1;%>
		  <td class="main_label_td" valign="top" nowrap><html:multibox property="selectedItems">
			<bean:write name="element"  property="elementValue" />
		    </html:multibox>
		    &nbsp;&nbsp;&nbsp;<bean:write name="element" property="elementLabel" />
		  </td>
	    <% if (j%2 != 0){%>
		</tr>
	   <%}j=j+1;
	   k++;}
	   else {
	    if (m%2 == 0)
	    {%>
		<tr>
	   <%}m=m+1;%>
		  <td class="main_label_td" valign="top" nowrap><html:multibox property="selectedItems">
			<bean:write name="element"  property="elementValue" />
		    </html:multibox>
		    &nbsp;&nbsp;&nbsp;<bean:write name="element" property="elementLabel" />
		  </td>
	    <% if (n%2 != 0){%>
		</tr>
	   <%}n=n+1;
	   }
	   %>
	   
	    </logic:iterate>
	  
	 </uniflow:p_content_table>
</uniflow:p_content_comm_wrapper>
	 
	<uniflow:p_action>
  <uniflow:button id="default" action="javascript:button_onclick('defaultcust.do')" name="button.default"></uniflow:button>
    <uniflow:button id="ok" action="javascript:button_onclick('modifycust.do')" name="button.ok"></uniflow:button>
    <uniflow:button id="cancel" action="javascript:window.close()" name="button.cancel"></uniflow:button>
  </uniflow:p_action>
	
<table>
<td height="20">
</td>
</table>	
	
  <html:hidden property="elementsName"/>
  <html:hidden property="extendWINo"/>
  <html:hidden property="extendPINo"/>
  <html:hidden property="elementLabel"/>
  <html:hidden property="extendType"/>
  <html:hidden property="category"/>
  </uniflow:m_form>

</uniflow:p_body >
</html:html>