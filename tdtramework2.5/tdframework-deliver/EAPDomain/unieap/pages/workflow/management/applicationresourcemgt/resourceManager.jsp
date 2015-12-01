<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
	<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
	<META HTTP-EQUIV="Expires" CONTENT="0">
	
<%

String  parentIdStore = request.getParameter("parentIdStore");

 %>
 
	<uniflow:style />
	<jsp:include page="/unieap/pages/workflow/stylesheet/style2009/using3levelMenuCss.jsp"></jsp:include>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
	<script language="JavaScript"
		src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
	<script language="javascript">

function reload()
{
  location.href = "<%=request.getContextPath()%>/applicationresource.do?parentIdStore="+"<%=parentIdStore%>"+"&deleteId=all";
}


</script>

</head>
<uniflow:m_body>
<uniflow:m_form action="applicationresource.do">
   <uniflow:m_table style="main_title_table">
	 <tr><td align="right" valign="middle" class="main_table2_td2">
		<table height="28" border="0" cellpadding="0" cellspacing="0" class="main_label_table">
           <tr><td>          
            </td></tr>      
        </table></td>
     </tr>
   </uniflow:m_table>
   
   <uniflow:m_table style="main_list">
	 <td  class="main_list_th" valign="middle" width="25" align="center" nowrap>&nbsp;</td>
						 <uniflow:m_order_th name="name"    value="workflow.system.application.name"
						    orderby="app_name" 
						    collection="application" 
						    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("applicationResourceForm")).getOrderBy()%>' 
						    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("applicationResourceForm")).isAscending()%>'
						  />
						  <uniflow:m_order_th name="builder"    value="workflow.system.appliaction.appBuilder"
						    orderby="builder" 
						    collection="application" 
						    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("applicationResourceForm")).getOrderBy()%>' 
						    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("applicationResourceForm")).isAscending()%>'
						  />
						  <uniflow:m_order_th name="buildtime"    value="workflow.system.appliaction.appTime"
						    orderby="build_time" 
						    collection="application" 
						    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("applicationResourceForm")).getOrderBy()%>' 
						    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("applicationResourceForm")).isAscending()%>'
						  />
						  <uniflow:m_order_th name="desc"    value="workflow.system.appliaction.appdesc"
						    orderby="app_desc" 
						    collection="application" 
						    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("applicationResourceForm")).getOrderBy()%>' 
						    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("applicationResourceForm")).isAscending()%>'
						  />
						  <uniflow:m_order_th name="type"    value="workflow.system.appliaction.appType"
						    orderby="app_type" 
						    collection="application" 
						    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("applicationResourceForm")).getOrderBy()%>' 
						    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("applicationResourceForm")).isAscending()%>'
						  />
						 
						
	<logic:iterate id="app" name="applicationResourceForm" property="list" type="com.neusoft.uniflow.api.res.NWApplication" indexId="index">
	<uniflow:m_list_tr row="<%=index.intValue()%>">
						
						<td width="25" align="center" valign="middle" class="main_list_td"><html:radio property="selectedItem" value="<%=app.getID()%>"
						onclick="" /></td>
					   <td class="main_list_td">
					    	<bean:write bundle="uniflow" name="app" property="name" />&nbsp;
					   </td>
					   <td class="main_list_td">
							<bean:write bundle="uniflow" name="app" property="builder" />&nbsp;
						</td>
						<td class="main_list_td">
							<bean:write bundle="uniflow" name="app" property="buildTime" format="yyyy-MM-dd HH:mm:ss"/>&nbsp;
						</td>
						<td class="main_list_td">
							<bean:write bundle="uniflow" name="app" property="description" />&nbsp;
						</td>
						<td class="main_list_td">
							<bean:write bundle="uniflow" name="app" property="type" />&nbsp;
						</td>
					 	
	</uniflow:m_list_tr>
				</logic:iterate>
 </uniflow:m_table>
         <uniflow:m_table style="main_button">
	     <tr><td>
		<uniflow:pageCtr
				curPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("applicationResourceForm")).getCurrentPage()%>'
				maxPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("applicationResourceForm")).getPagesCount()%>'
				total='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("applicationResourceForm")).getTotal()%>' />
        </td><td align="right" >
		
		</td></tr>
        </uniflow:m_table>
			<html:hidden property="currentPage" />
			<html:hidden property="pagesCount" />
			<html:hidden property="countOfPage" />
			<html:hidden property="requestPage" />
			<html:hidden property="orderBy" />
			<html:hidden property="ascending" />
			<html:hidden property="parentIdStore" />
			<html:hidden property="deleteId" />
	</uniflow:m_form>
</uniflow:m_body>
</html:html>
