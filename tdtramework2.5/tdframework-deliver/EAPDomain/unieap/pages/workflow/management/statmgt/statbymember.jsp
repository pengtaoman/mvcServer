<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.neusoft.uniflow.web.management.statmgt.forms.StatisticsForm"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
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
              <select onchange="javascript:changeto('statbyproc.do')" 
                     style="font-family: Verdana, Arial, '宋体';font-size: 12px; color: #000000;">
	  		  <option value="member" selected><bean:message bundle="uniflow" key="workflow.statistics.member"/></option>
	          <option value="procdef"><bean:message bundle="uniflow" key="workflow.statistics.procdef"/></option>
	          </select>
			  </td>
			  <td>
			  <uniflow:commonbutton customization='false'refreshAction='javascript:refresh()' printAction='#'customAction='#' />                
            </td></tr>      
        </table></td>
     </tr>
   </uniflow:m_table>
   <uniflow:m_table style="main_list">
   <uniflow:order_th  value="workflow.statistics.statbymember.memberaccount"/>
   <uniflow:order_th  value="workflow.statistics.statbymember.workload"/>
   <uniflow:order_th  value="workflow.statistics.statbymember.completed"/>   
   <uniflow:order_th  value="workflow.statistics.statbymember.incident"/>
   <uniflow:order_th  value="workflow.statistics.statbymember.active"/>    

<logic:iterate id="stat" name="statisticsForm" property="list" type="com.neusoft.uniflow.web.management.statmgt.beans.StatByMemberBean">
  <tr>
    <td valign="middle" class="main_list_td"><bean:write name="stat"  property="memberInfo" />&nbsp;</td>
    <td valign="middle" class="main_list_td"><bean:write name="stat"  property="taskNum" format="#.##"/>&nbsp;</td>
    <td valign="middle" class="main_list_td"><bean:write name="stat"  property="completeTaskNum" format="#.##"/>&nbsp;</td>
    <td valign="middle" class="main_list_td"><bean:write name="stat"  property="errorTaskNum" format="#.##"/>&nbsp;</td>
    <td valign="middle" class="main_list_td"><bean:write name="stat"  property="activeTaskNum" format="#.##"/>&nbsp;</td>
  </tr>
</logic:iterate>
</uniflow:m_table>
<uniflow:m_table>
<tr>
	<td>
		<uniflow:pageCtr maxPage="<%=((com.neusoft.uniflow.web.management.statmgt.forms.StatisticsForm)request.getAttribute("statisticsForm")).getPagesCount()%>" 
		curPage="<%=((com.neusoft.uniflow.web.management.statmgt.forms.StatisticsForm)request.getAttribute("statisticsForm")).getCurrentPage()%>"
		total="<%=((com.neusoft.uniflow.web.management.statmgt.forms.StatisticsForm)request.getAttribute("statisticsForm")).getTotal()%>"></uniflow:pageCtr>
	</td>
</tr>
</uniflow:m_table>
<html:hidden property="countofPage"/>
<html:hidden property="currentPage"/>
<html:hidden property="pagesCount"/>
<html:hidden property="requestPage"/>
<html:hidden property="total"/>
</uniflow:m_form>
</uniflow:m_body>
</html:html>
