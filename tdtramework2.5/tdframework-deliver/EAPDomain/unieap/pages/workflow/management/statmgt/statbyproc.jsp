<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.management.statmgt.forms.StatisticsForm" %>

<html:html locale="true">
<head>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<uniflow:style/>
<script language="javascript">
function changeto(to)
{
  location.href=to;
}
</script>
</head>

<uniflow:m_body>
<uniflow:m_form action = "statistics.do">
   <uniflow:m_table style="main_title_table">
	 <tr><td align="right" valign="middle" class="main_table2_td2">
		<table height="28" border="0" cellpadding="0" cellspacing="0"class="main_label_table">
           <tr><td height="25" valign="middle" nowrap class="main_label_td">
              <select onchange="javascript:changeto('statistics.do')" 
                     style="font-family: Verdana, Arial, '宋体';font-size: 12px; color: #000000;">
	  		  <option value="member"><bean:message bundle="uniflow" key="workflow.statistics.member"/></option>
	          <option value="procdef" selected><bean:message bundle="uniflow" key="workflow.statistics.procdef"/></option>
	          </select>
			  </td>
			  <td>
			  <uniflow:commonbutton customization='false'refreshAction='javascript:refresh()' printAction='#'customAction='#' />                
            </td></tr>      
        </table></td>
     </tr>
   </uniflow:m_table>
   <uniflow:m_table style="main_list">
   <uniflow:order_th  value="workflow.statistics.statbyproc.procDefName"/>
   <uniflow:order_th  value="workflow.statistics.statbyproc.instNumber"/>
   <uniflow:order_th  value="workflow.statistics.statbyproc.completeNumber"/>
   <uniflow:order_th  value="workflow.statistics.statbyproc.incidentNumber"/>
    <uniflow:order_th  value="workflow.statistics.statbyproc.activeNumber"/>
   <uniflow:order_th  value="workflow.statistics.statbyproc.averageTime"/>

<logic:iterate id="statistics" name="statisticsForm" property="list" type="com.neusoft.uniflow.api.stat.NWStatbyProc">
  <tr>
     <td valign="middle" class="main_list_td"><bean:write name="statistics" property="procDefName"/>&nbsp;</td>
     <td valign="middle" class="main_list_td"><bean:write name="statistics" property="instNumber" format="#.##"/>&nbsp;</td>
     <td valign="middle" class="main_list_td"><bean:write name="statistics" property="completedNumber" format="#.##"/>&nbsp;</td>
     <td valign="middle" class="main_list_td"><bean:write name="statistics" property="incidentNumber" format="#.##"/>&nbsp;</td>
     <td valign="middle" class="main_list_td"><bean:write name="statistics" property="activeNumber" format="#.##"/>&nbsp;</td>
     <td valign="middle" class="main_list_td"><bean:write name="statistics" property="averageTime" format="#.##"/>&nbsp;</td>
   </tr>
</logic:iterate>
</uniflow:m_table>
<uniflow:m_table>
<tr>
	<td>
		<uniflow:pageCtr maxPage='<%=((StatisticsForm)request.getAttribute("statisticsForm")).getPagesCount()%>' 
		curPage='<%=((StatisticsForm)request.getAttribute("statisticsForm")).getCurrentPage()%>' 
		total='<%=((StatisticsForm)request.getAttribute("statisticsForm")).getTotal()%>'></uniflow:pageCtr>
	</td>
</tr>
</uniflow:m_table>
</uniflow:m_form>
</uniflow:m_body>
</html:html>
