<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>

<html:html locale="true">
<head>
<title><bean:message bundle="uniflow" key = "workflow.popup"/></title>
<%String aid = request.getParameter("actDefID"); %>
<%String state = request.getParameter("state"); %>
<uniflow:style/>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<script language="javascript">
function itemChanged(){
  findSelectedItem();
}

function refresh(){
  location.href = "applicationlist.do?actDefID=<%=aid%>&state=<%=state%>";
}

function detail_onclick(){  
      var select = getSelectedItemID(); 
	  var openURL = "<%=request.getContextPath()%>/applicationdetail.do?autoActID="+select;  
	  var width = 520;
	  var height = 480;
	  open_scrollable_window(openURL,width,height);
}
function changeto(){
  document.forms[0].submit();
}
</script>
</head>
<uniflow:m_body onload="javascript:itemChanged()">
<uniflow:m_form action="applicationlist.do">
<uniflow:m_table style="main_title_table">
	 <tr><td nowrap class="text_title" ><bean:message bundle="uniflow" key="workflow.monitor.process.application.current.title"/></td>
	     <td align="right" valign="middle" class="main_table2_td2">
		<table height="28" border="0" cellpadding="0" cellspacing="0"class="main_label_table">
           <tr><td height="25" valign="middle" nowrap class="main_label_td">
              <html:select name="applicationlistForm" property="state"onchange="javascript:changeto()" 
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
   <uniflow:order_th value="workflow.system.application.activity.name"/>   
   <uniflow:order_th  value="workflow.system.application.name"/>    
   <uniflow:order_th  value="workflow.system.application.des"/>   
   <uniflow:order_th  value="workflow.system.application.detail"/> 
  <logic:iterate id="applist"  name="applicationlistForm" property="list" type="com.neusoft.uniflow.api.mgmt.NWRunTimeApplication" indexId="index">
    <uniflow:m_list_tr row="<%=index.intValue()%>">
	<td width="25" align="center" valign="middle" class="main_list_td">
	<html:radio property="selectedItem" value="<%=applist.getActInstID()%>" onclick="javascript:itemChanged()"/></td>
	<td valign="middle" class="main_list_td"><bean:write name="applist" property="actName"/>&nbsp;</td>
	<td valign="middle" class="main_list_td"><bean:write name="applist" property="appName"/>&nbsp;</td>
	<td valign="middle" class="main_list_td"><bean:write name="applist" property="appDesc"/>&nbsp;</td>
	<td valign="middle" class="main_list_td"><a href="javascript:detail_onclick()" ><bean:message bundle="uniflow" key="workflow.view"/> </a> </td>
    </uniflow:m_list_tr>
  </logic:iterate>
		</uniflow:m_table>
		<uniflow:m_table style="main_button">
		<tr><td>
 <uniflow:pageCtr 
      curPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm)request.getAttribute("applicationlistForm")).getCurrentPage()%>' 
      maxPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm)request.getAttribute("applicationlistForm")).getPagesCount()%>' 
      total ='<%=((com.neusoft.uniflow.web.common.list.OpenListForm)request.getAttribute("applicationlistForm")).getTotal()%>'
   />
     			</td></tr>
        </uniflow:m_table>
<html:hidden property="currentPage"/>
<html:hidden property="pagesCount"/>
<html:hidden property="countOfPage"/>
<html:hidden property="requestPage"/>
<html:hidden property="orderBy"/>
<html:hidden property="ascending"/>
<html:hidden property="state" value="<%=state%>"/>
<html:hidden property="actDefID" value="<%=aid%>"/>
</uniflow:m_form>

</uniflow:m_body>

</html:html>