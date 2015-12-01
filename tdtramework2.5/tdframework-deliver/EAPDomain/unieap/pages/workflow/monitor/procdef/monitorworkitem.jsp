<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
<title><bean:message bundle="uniflow" key = "workflow.popup"/></title>
<uniflow:style/>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<script language="javascript">
function detail_onclick(){
      var id =getSelectedItemID();;  
	  var openURL = "<%=request.getContextPath()%>/workitemdetail.do?workItemID="+id;  
	  var width = 450;
	  var height = 435;
	  open_scrollable_window(openURL,width,height);
}
function itemChanged(){
  findSelectedItem();
}
function changeto(){
  document.forms[0].submit();
}
function refresh(){
  document.forms[0].submit();
}
</script>

</head>
<uniflow:m_body>
<uniflow:m_form action="monitorworkitem.do">
<uniflow:m_table style="main_title_table">
	 <tr><td nowrap class="text_title" ><bean:message bundle="uniflow" key="workflow.monitor.process.monitorworkitem.title"/></td>
	     <td align="right" valign="middle" class="main_table2_td2">
		<table height="28" border="0" cellpadding="0" cellspacing="0" class="main_label_table">
           <tr><td height="25" valign="middle" nowrap class="main_label_td">
              <html:select name="workItemListForm" property="state" onchange="javascript:changeto()" 
                     style="font-family: Verdana, Arial, '宋体';font-size: 12px; color: #000000;">
					<html:options collection="selectinfo"  property="value" labelProperty="label"/>
			  </html:select>
			  </td>
			  <td>
			  <uniflow:commonbutton customization="false" />                
            </td></tr>      
        </table></td>
     </tr>
</uniflow:m_table>
<uniflow:m_table style="main_list">
<td  class="main_list_th" valign="middle" width="25" align="center" nowrap>&nbsp;</td>
  	<uniflow:order_th value="workflow.workitem.name"/> 
  	<uniflow:order_th value="workflow.monitor.process.workitem.user"/> 
  	<uniflow:order_th value="workflow.workitem.state"/>
	<uniflow:order_th value="workflow.workitem.createtime"/> 
	<uniflow:order_th value="workflow.workitem.completetime"/> 
	<uniflow:order_th value="workflow.workitem.actname"/>
	<uniflow:order_th value="workflow.detail"/>
<logic:iterate id="workitem" name="workItemListForm" property="list" type="com.neusoft.uniflow.web.monitor.procdef.beans.WorkItemBean" indexId="index">
	<uniflow:m_list_tr row="<%=index.intValue()%>">
	<td width="25" align="center" valign="middle" class="main_list_td"><html:radio property="selectedItem" value="<%=workitem.getId()%>" onclick="javascript:itemChanged()"/></td>
	<td valign="middle" class="main_list_td"><bean:write name="workitem" property="name"/>&nbsp;</td>	
	<td valign="middle" class="main_list_td"><bean:write name="workitem" property="username"/>&nbsp;</td>
	<td valign="middle" class="main_list_td"><bean:write name="workitem" property="curstate" />&nbsp;</td>
	<td valign="middle" class="main_list_td"><bean:write name="workitem" property="createtime" />&nbsp;</td>
	<td valign="middle" class="main_list_td"><bean:write name="workitem" property="completetime" />&nbsp;</td>
	<td valign="middle" class="main_list_td"><bean:write name="workitem" property="actname"/>&nbsp;</td>
	<td valign="middle" class="main_list_td"><a href="javascript:detail_onclick()" ><bean:message bundle="uniflow" key="workflow.view"/>&nbsp;</a> </td>
    </uniflow:m_list_tr>
    </logic:iterate>
		</uniflow:m_table>
		<uniflow:m_table style="main_button">
		<tr><td>

  <uniflow:pageCtr 
      curPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm)request.getAttribute("workItemListForm")).getCurrentPage()%>' 
      maxPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm)request.getAttribute("workItemListForm")).getPagesCount()%>' 
      total ='<%=((com.neusoft.uniflow.web.common.list.OpenListForm)request.getAttribute("workItemListForm")).getTotal()%>'
  />
     			</td></tr>
        </uniflow:m_table>
<html:hidden property="currentPage"/>
<html:hidden property="pagesCount"/>
<html:hidden property="countOfPage"/>
<html:hidden property="requestPage"/>
<html:hidden property="orderBy"/>
<html:hidden property="actDefID"/>
<html:hidden property="ascending"/>
<html:hidden property="state"/>
</uniflow:m_form>
</uniflow:m_body>
</html:html>
