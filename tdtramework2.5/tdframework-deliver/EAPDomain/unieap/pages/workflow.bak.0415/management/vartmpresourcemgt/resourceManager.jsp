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
  location.href = "<%=request.getContextPath()%>/vartmpresource.do?parentIdStore="+"<%=parentIdStore%>"+"&deleteId=all";
}


</script>

</head>
<uniflow:m_body>
<uniflow:m_form action="vartmpresource.do">
   <uniflow:m_table style="main_title_table">
	 <tr><td align="right" valign="middle" class="main_table2_td2">
		<table height="28" border="0" cellpadding="0" cellspacing="0"class="main_label_table">
           <tr><td>          
            </td></tr>      
        </table></td>
     </tr>
   </uniflow:m_table>
   
   <uniflow:m_table style="main_list">
	 <td  class="main_list_th" valign="middle" width="25" align="center" nowrap>&nbsp;</td>
						 <uniflow:m_order_th name="name"    value="workflow.variable.rdata.name"
						    orderby="rdata_id" 
						    collection="variable" 
						    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("varTmpResourceForm")).getOrderBy()%>' 
						    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("varTmpResourceForm")).isAscending()%>'
						  />
						  <uniflow:m_order_th name="description"    value="workflow.variable.rdata.desc"
						    orderby="rdata_name" 
						    collection="variable" 
						    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("varTmpResourceForm")).getOrderBy()%>' 
						    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("varTmpResourceForm")).isAscending()%>'
						  />
						  <uniflow:m_order_th name="type"    value="workflow.variable.rdata.type"
						    orderby="rdata_type" 
						    collection="variable" 
						    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("varTmpResourceForm")).getOrderBy()%>' 
						    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("varTmpResourceForm")).isAscending()%>'
						  />
						  <uniflow:m_order_th name="mergetype"    value="workflow.variable.merge.type"
						    orderby="merge_type" 
						    collection="variable" 
						    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("varTmpResourceForm")).getOrderBy()%>' 
						    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("varTmpResourceForm")).isAscending()%>'
						  />
						  <uniflow:m_order_th name="defaultvalue"    value="workflow.variable.defaultvalue"
						    orderby="default_value" 
						    collection="variable" 
						    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("varTmpResourceForm")).getOrderBy()%>' 
						    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("varTmpResourceForm")).isAscending()%>'
						  />
						 
						
	<logic:iterate id="varTemplet" name="varTmpResourceForm" property="list" type="com.neusoft.uniflow.api.def.NWRelData" indexId="index">
	<uniflow:m_list_tr row="<%=index.intValue()%>">
						
						<td width="25" align="center" valign="middle" class="main_list_td"><html:radio property="selectedItem" value="<%=varTemplet.getID()%>"
						onclick="" /></td>
					   <td class="main_list_td">
					    	<bean:write bundle="uniflow" name="varTemplet" property="name" />&nbsp;
					   </td>
					   <td class="main_list_td">
							<bean:write bundle="uniflow" name="varTemplet" property="description" />&nbsp;
						</td>
						<td class="main_list_td">
							<logic:equal name="varTemplet" property="type"  value="0">
								<bean:message bundle="uniflow" key="workflow.var.type.numberic"/>
							</logic:equal>
							<logic:equal name="varTemplet" property="type"  value="1">
								<bean:message bundle="uniflow" key="workflow.var.type.string"/>
							</logic:equal>
							<logic:equal name="varTemplet" property="type"  value="2">
								<bean:message bundle="uniflow" key="workflow.var.type.object"/>
							</logic:equal>
							<logic:equal name="varTemplet" property="type"  value="10">
								<bean:message bundle="uniflow" key="workflow.var.type.xml"/>
							</logic:equal>
							&nbsp;
						</td>
						<td class="main_list_td">
							<bean:write bundle="uniflow" name="varTemplet" property="mergeType" />&nbsp;
						</td>
						<td class="main_list_td">
							<bean:write bundle="uniflow" name="varTemplet" property="defaultValue" />&nbsp;
						</td>
					 	
	</uniflow:m_list_tr>
				</logic:iterate>
 </uniflow:m_table>
         <uniflow:m_table style="main_button">
	     <tr><td>
		<uniflow:pageCtr
				curPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("varTmpResourceForm")).getCurrentPage()%>'
				maxPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("varTmpResourceForm")).getPagesCount()%>'
				total='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("varTmpResourceForm")).getTotal()%>' />
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
