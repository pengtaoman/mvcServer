<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
<title><bean:message bundle="uniflow" key = "workflow.popup"/></title>
<uniflow:style />
<script language="JavaScript"
	src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript"
	src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript"
	src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<script language="javascript">
function refresh(){
  document.forms[0].submit();
}
</script>
</head>
<uniflow:m_body>
<uniflow:m_form action="curactdetail.do">		
<uniflow:m_table style="main_title_table">
	 <tr><td nowrap class="text_title" ><bean:message bundle="uniflow" key="workflow.monitor.process.curactdetail.title"/></td>
	     <td align="right" valign="middle" class="main_table2_td2">
		<table height="28" border="0" cellpadding="0" cellspacing="0"class="main_label_table">
           <tr><td>
			  <uniflow:commonbutton customization="false" />                
            </td></tr>      
        </table></td>
     </tr>
</uniflow:m_table> 
<uniflow:m_table style="main_list">
<td  class="main_list_th" valign="middle" width="25" align="center" nowrap>&nbsp;</td>
  	<uniflow:order_th value="workflow.monitor.process.curact.name"/>  
  	<uniflow:order_th value="workflow.monitor.process.curact.nametem"/>
	<uniflow:order_th value="workflow.monitor.process.curact.limit"/> 
	<uniflow:order_th value="workflow.monitor.process.curact.starttime"/> 
	<uniflow:order_th value="workflow.monitor.process.curact.overtimeact"/> 
	<uniflow:order_th value="workflow.monitor.process.curact.app"/> 
	<logic:iterate id="act" name="curActDetailForm" property="list"type="com.neusoft.uniflow.web.monitor.procdef.beans.ActBean"indexId="index">
	<uniflow:m_list_tr row="<%=index.intValue()%>">
	<td width="25" align="center" valign="middle" class="main_list_td"><html:radio property="selectedItem"
						value="<%=act.getActInstID()%>" /></td>
					<td valign="middle" class="main_list_td"><bean:write name="act" property="name" />&nbsp;</td>
					<td valign="middle" class="main_list_td"><bean:write name="act" property="actDefID" />&nbsp;</td>
					<td valign="middle" class="main_list_td"><bean:write name="act" property="limitTime" format="#.##"/>&nbsp;</td>
					<td valign="middle" class="main_list_td"><bean:write name="act" property="startTime" />&nbsp;</td>
					<td valign="middle" class="main_list_td"><bean:write name="act" property="overtimeAction" format="#.##"/>&nbsp;</td>
					<td valign="middle" class="main_list_td"><bean:write name="act" property="appDefID" />&nbsp;</td>
				</uniflow:m_list_tr>
			</logic:iterate>
		</uniflow:m_table>
		<uniflow:m_table style="main_button">
		<tr><td>
		<uniflow:pageCtr
			curPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm)request.getAttribute("curActDetailForm")).getCurrentPage()%>'
			maxPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm)request.getAttribute("curActDetailForm")).getPagesCount()%>'
			total='<%=((com.neusoft.uniflow.web.common.list.OpenListForm)request.getAttribute("curActDetailForm")).getTotal()%>' />
     			</td></tr>
        </uniflow:m_table>

		<html:hidden property="currentPage" />
		<html:hidden property="pagesCount" />
		<html:hidden property="countOfPage" />
		<html:hidden property="requestPage" />
		<html:hidden property="orderBy" />
		<html:hidden property="ascending" />
		<html:hidden property="procID" />
	</uniflow:m_form>
</uniflow:m_body>
</html:html>
