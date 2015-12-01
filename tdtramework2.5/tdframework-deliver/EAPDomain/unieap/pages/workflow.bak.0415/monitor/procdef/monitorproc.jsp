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
function detail_onclick()
{
   findSelectedItem;
   var selectedID = getSelectedItemID();
   var openURL = "<%=request.getContextPath()%>/procinstdetail.do?procinstID="+selectedID;
   open_scrollable_window(openURL,"500","500");
}
function curact_onclick()
{
   findSelectedItem;
   var selectedID = getSelectedItemID();
   var openURL = "<%=request.getContextPath()%>/curactdetail.do?procID="+selectedID;
   var height=500;
   var width =800;
   open_scrollable_window(openURL,width,height);
}
function itemChanged()
{
  findSelectedItem();
}
function refresh(){
  document.forms[0].submit();
}
</script>
</head>
<uniflow:m_body>
<uniflow:m_form action="monitorproc.do">
<uniflow:m_table style="main_title_table">
	 <tr><td nowrap class="text_title" ><bean:message bundle="uniflow" key="workflow.monitor.process.procinstlist.title"/></td>
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
  	<uniflow:order_th value="workflow.procinst.name"/>  
	<uniflow:order_th value="workflow.procinst.state"/> 
	<uniflow:order_th value="workflow.procinst.starttime"/> 
	<uniflow:order_th value="workflow.procinst.completetime"/> 
	<uniflow:order_th value="workflow.detail"/>
	<uniflow:order_th value="workflow.monitor.process.current.activity"/>
<logic:iterate id="procinst" name="procInstListForm" property="list" type="com.neusoft.uniflow.api.handler.NWProcInst" indexId="index">
    <uniflow:m_list_tr row="<%=index.intValue()%>">
	<td width="25" align="center" valign="middle" class="main_list_td">
	<html:radio property="selectedItem" value="<%=procinst.getProcInstID()%>" onclick="javascript:itemChanged()"/></td>
	<uniflow:element collection="procinst" name="name"><bean:write name="procinst" property="name"/>&nbsp;</uniflow:element>
	<uniflow:element collection="procinst" name="state">
	  <logic:equal name="procinst" property="curState" value="0">
	    <bean:message bundle="uniflow" key="workflow.procinst.state.initial"/>
	  </logic:equal>
	  <logic:equal name="procinst" property="curState" value="1">
	    <bean:message bundle="uniflow" key="workflow.procinst.state.running"/>
	  </logic:equal>
	  <logic:equal name="procinst" property="curState" value="2">
	    <bean:message bundle="uniflow" key="workflow.procinst.state.active"/>
	  </logic:equal>
	  <logic:equal name="procinst" property="curState" value="3">
	    <bean:message bundle="uniflow" key="workflow.procinst.state.suspend"/>
	  </logic:equal>
	  <logic:equal name="procinst" property="curState" value="4">
	    <bean:message bundle="uniflow" key="workflow.procinst.state.complete"/>
	  </logic:equal>
	  <logic:equal name="procinst" property="curState" value="5">
	    <bean:message bundle="uniflow" key="workflow.procinst.state.stopped"/>
	  </logic:equal>&nbsp;
	</uniflow:element>
	<td  valign="middle" class="main_list_td"><bean:write name="procinst" property="startTime" bundle="uniflow" formatKey="date.key"/>&nbsp;</td>
	<td  valign="middle" class="main_list_td"><bean:write name="procinst" property="completeTime" bundle="uniflow" formatKey="date.key"/>&nbsp;</td>
	<html:hidden property="state" value="<%=String.valueOf(procinst.getCurState())%>"/>
	<td  valign="middle" class="main_list_td"><a href="javascript:detail_onclick()" ><bean:message bundle="uniflow" key="workflow.view"/></a> </td>
	<td  valign="middle" class="main_list_td"><a href="javascript:curact_onclick()" ><bean:message bundle="uniflow" key="workflow.view"/></a> </td>
    </uniflow:m_list_tr>
  </logic:iterate>
		</uniflow:m_table>
		<uniflow:m_table style="main_button">
		<tr><td>
<uniflow:pageCtr 
      curPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm)request.getAttribute("procInstListForm")).getCurrentPage()%>' 
      maxPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm)request.getAttribute("procInstListForm")).getPagesCount()%>' 
      total ='<%=((com.neusoft.uniflow.web.common.list.OpenListForm)request.getAttribute("procInstListForm")).getTotal()%>'
  />
  			</td></tr>
        </uniflow:m_table>
<html:hidden property="currentPage"/>
<html:hidden property="pagesCount"/>
<html:hidden property="countOfPage"/>
<html:hidden property="requestPage"/>
<html:hidden property="orderBy"/>
<html:hidden property="ascending"/>
<html:hidden property="procdefID"/>
<html:hidden property="procState"/>
<html:hidden property="verName"/>
</uniflow:m_form>

</uniflow:m_body>
</html:html>