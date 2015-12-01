<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@page import="com.neusoft.uniflow.web.webdesign.AttributeOperation.util.GetNameUtil"%>
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
  location.href = "<%=request.getContextPath()%>/acttmpresource.do?parentIdStore="+"<%=parentIdStore%>"+"&deleteId=all";
}


</script>

</head>
<uniflow:m_body>
<uniflow:m_form action="acttmpresource.do">
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
						 <uniflow:m_order_th name="name"    value="workflow.activity.defination.name"
						    orderby="act_name" 
						    collection="acttmp" 
						    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("actTmpResourceForm")).getOrderBy()%>' 
						    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("actTmpResourceForm")).isAscending()%>'
						  />
					
						  <uniflow:m_order_th name="type"    value="workflow.activity.defination.type"
						    orderby="act_type" 
						    collection="acttmp" 
						    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("actTmpResourceForm")).getOrderBy()%>' 
						    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("actTmpResourceForm")).isAscending()%>'
						  />
						  <uniflow:m_order_th name="operationLevel"    value="workflow.activity.defination.operation.level"
						    orderby="operation_level" 
						    collection="acttmp" 
						    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("actTmpResourceForm")).getOrderBy()%>' 
						    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("actTmpResourceForm")).isAscending()%>'
						  />
						  <uniflow:m_order_th name="businessCategory"    value="workflow.activity.defination.category"
						    orderby="act_category" 
						    collection="acttmp" 
						    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("actTmpResourceForm")).getOrderBy()%>' 
						    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("actTmpResourceForm")).isAscending()%>'
						  />
						  	 <uniflow:m_order_th name="appID"    value="workflow.activity.defination.application.id"
						    orderby="app_id" 
						    collection="acttmp" 
						    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("actTmpResourceForm")).getOrderBy()%>' 
						    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("actTmpResourceForm")).isAscending()%>'
						  />
						 	<uniflow:m_order_th name="description"    value="workflow.activity.defination.description"
						    orderby="act_desc" 
						    collection="acttmp" 
						    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("actTmpResourceForm")).getOrderBy()%>' 
						    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("actTmpResourceForm")).isAscending()%>'
						  />
						
	<logic:iterate id="actTemplet" name="actTmpResourceForm" property="list" type="com.neusoft.uniflow.api.def.NWActTemplet" indexId="index">
	<uniflow:m_list_tr row="<%=index.intValue()%>">
						
						<td  align="center" class="main_list_td"><html:radio property="selectedItem" value="<%=actTemplet.getID()%>"
						onclick="" /></td>
					   <td class="main_list_td">
					    	<bean:write bundle="uniflow" name="actTemplet" property="name" />&nbsp;
					   </td>
						<td class="main_list_td">
							<logic:equal name="actTemplet" property="type" value="0">
								<bean:message bundle="uniflow" key="workflow.acttemp.acttype.autoact"/>
							</logic:equal>
							<logic:equal name="actTemplet" property="type" value="1">
								<bean:message bundle="uniflow" key="workflow.acttemp.acttype.manualact"/>
							</logic:equal>
							<logic:equal name="actTemplet" property="type" value="2">
								<bean:message bundle="uniflow" key="workflow.acttemp.acttype.syssubact"/>
							</logic:equal>
							<logic:equal name="actTemplet" property="type" value="3">
								<bean:message bundle="uniflow" key="workflow.acttemp.acttype.asysubact"/>
							</logic:equal>
							<logic:equal name="actTemplet" property="type" value="4">
								<bean:message bundle="uniflow" key="workflow.acttemp.acttype.eventact"/>
							</logic:equal>
							<logic:equal name="actTemplet" property="type" value="5">
								<bean:message bundle="uniflow" key="workflow.acttemp.acttype.choiceact"/>
							</logic:equal>
							&nbsp;
						</td>
						<td class="main_list_td">
							<logic:equal name="actTemplet" property="operationLevel"  value="0">
								<bean:message bundle="uniflow" key="workflow.acttemp.operationLevel.actLevel"/>
							</logic:equal>
							<logic:equal name="actTemplet" property="operationLevel" value="1">
								<bean:message bundle="uniflow" key="workflow.acttemp.operationLevel.workitemLevel"/>
							</logic:equal>
							<logic:equal name="actTemplet" property="operationLevel" value="-1">
								&nbsp;
							</logic:equal>
						</td>
					 	<td class="main_list_td">
					 		<bean:write name="actTemplet" property="businessCategory" />&nbsp;
					 	</td>
					 	<td class="main_list_td">
							<logic:notEqual name="actTemplet" property="appID" value="">
							<%=GetNameUtil.getAppName(actTemplet.getAppID() ,request)%>
							</logic:notEqual>
							<logic:equal name="actTemplet" property="appID" value="">
							&nbsp;
							</logic:equal>
						</td>
					 	  <td class="main_list_td">
							<bean:write  name="actTemplet" property="description" />&nbsp;
						</td>
	</uniflow:m_list_tr>
				</logic:iterate>
 </uniflow:m_table>
         <uniflow:m_table style="main_button">
	     <tr><td>
		<uniflow:pageCtr
				curPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("actTmpResourceForm")).getCurrentPage()%>'
				maxPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("actTmpResourceForm")).getPagesCount()%>'
				total='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("actTmpResourceForm")).getTotal()%>' />
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
