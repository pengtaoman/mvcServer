<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.neusoft.uniflow.api.NWFilter" %>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
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
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/DatePicker.js"></script>
<uniflow:style/>
<script language="JavaScript">
function detail_onclick()
{
    findSelectedItem();
    var selectedID=getSelectedItemID();
    var openURL = "<%=request.getContextPath()%>/auditdetail.do?selectedID="+selectedID;
    open_modalWindow(openURL,'450','440');
}
function audit_onclick()
{     
     if (document.forms[0].startTime.value!="" ){
       document.forms[0].sflag.value=true;
     }
     else
     {
       document.forms[0].sflag.value=false;
     }
     if (document.forms[0].endTime.value != "" ){
       document.forms[0].eflag.value=true;
     }
     else
     {
       document.forms[0].eflag.value=false;
     }
     if((document.forms[0].endTime.value!="" )&&(document.forms[0].startTime.value!="" )&&(document.forms[0].startTime.value>document.forms[0].endTime.value)){
         alert("<%=MessageUtil.getString("workflow.check.time.checked",request.getSession())%>");
     return;
     }        
     document.forms[0].submit();    
}
function refresh()
{
  location.href = "audit.do";
}
function itemChanged()
{
  findSelectedItem();
}
</script>
</head>
<uniflow:m_body onload="javascript:itemChanged()">
<uniflow:m_form action = "audit.do">
   <uniflow:m_table style="main_title_table">
	 <tr><td align="right" valign="middle" class="main_table2_td2">
		<table height="28" border="0" cellpadding="0" cellspacing="0"class="main_label_table">
           <tr>
           <td height="25" valign="middle" nowrap class="main_label_td">
              <bean:message bundle="uniflow" key="workflow.system.audit.person"/>：
           </td>
           <td height="25" valign="middle" nowrap class="main_label_td">
              <html:select property="personID" styleClass="input_text150">
                <html:option value=""/>
          		<html:option value="All"/>
          		<html:options collection="orglist" property="account" labelProperty="name"/>          
       			</html:select>
       	   </td>           
           <td height="25" valign="middle" nowrap class="main_label_td"><bean:message bundle="uniflow" key="workflow.starttime"/>:</td>
           <td height="25" valign="middle" nowrap class="main_label_td">
               <html:text property="startTime" styleClass="input_text150"readonly="true" style="behavior:url(<%=WorkflowManager.getWorkflowPath()%>/htc/Date.htc)" /> 
               <a href="javascript:show_cal('startTime')">
                 <img src='<%=WorkflowManager.getWorkflowStylePath()%>/style1/calender_img/time.gif'width='16' height='16' alt='뎐놔휑저苟윗꽉데' border='0'>
               </a>
           </td>
           <td height="25" valign="middle" nowrap class="main_label_td"><bean:message bundle="uniflow" key="workflow.endtime"/>:</td>
           <td height="25" valign="middle" nowrap class="main_label_td">
               <html:text property="endTime" styleClass="input_text150"readonly="true" style="behavior:url(<%=WorkflowManager.getWorkflowPath()%>/htc/Date.htc)" /> 
               <a href="javascript:show_cal('endTime')">
                 <img src='<%=WorkflowManager.getWorkflowStylePath()%>/style1/calender_img/time.gif'width='16' height='16' alt='뎐놔휑저苟윗꽉데' border='0'>
               </a>
           </td>
           <uniflow:button id="audit" action="javascript:audit_onclick()" name="button.audit"/>
           <td height="25" valign="middle" nowrap class="main_label_td">
               <uniflow:commonbutton customization="false" />
           </td></tr>      
        </table></td>
     </tr>
   </uniflow:m_table>


<uniflow:m_table style="main_list">
	 <td  class="main_list_th" valign="middle" width="25" align="center" nowrap>&nbsp;</td>
	 <uniflow:order_th  value="workflow.system.audit.message.id" orderby="<%=NWFilter.Log_MessageID%>" 
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("auditForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("auditForm")).isAscending()%>'/>	
	 <uniflow:order_th  value="worklfow.system.audit.message.time" orderby="<%=NWFilter.Log_eventTime%>" 
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("auditForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("auditForm")).isAscending()%>'/>	
     <uniflow:order_th  value="workflow.system.audit.message.des"/>
     <uniflow:order_th  value="workflow.system.audit.message.result"/>
     <td  class="main_list_th" valign="middle" width="80" align="center" nowrap><bean:message bundle="uniflow" key="workflow.system.audit.message.detail"/></td>
  <logic:iterate id="auditmsg"  name="auditForm" property="list" type="com.neusoft.uniflow.api.stat.NWAuditMessage" indexId="index"> 
	<uniflow:m_list_tr row="<%=index.intValue()%>">
	<td width="25" align="center" valign="middle" class="main_list_td"><html:radio property="selectedItem" value="<%=auditmsg.getMessageID()%>"/></td>	
	<td valign="middle" class="main_list_td"><bean:write name="auditmsg" property="messageID"/>&nbsp;</td>
	<td valign="middle" class="main_list_td"><bean:write name="auditmsg" property="eveTime"/>&nbsp;</td>
	<td valign="middle" class="main_list_td"><bean:write name="auditmsg" property="eventID"/>&nbsp;</td>
	<td valign="middle" class="main_list_td"><bean:write name="auditmsg" property="reValue"/>&nbsp;</td> 
	<td valign="middle" class="main_list_td" align="center"><a href="javascript:detail_onclick()"><bean:message bundle="uniflow" key="workflow.view"/></a></td> 
	</uniflow:m_list_tr>
  </logic:iterate>
</uniflow:m_table>  

 <uniflow:m_table style="main_button">
<tr><td><uniflow:pageCtr 
      curPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm)request.getAttribute("auditForm")).getCurrentPage()%>' 
      maxPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm)request.getAttribute("auditForm")).getPagesCount()%>' 
      total ='<%=((com.neusoft.uniflow.web.common.list.OpenListForm)request.getAttribute("auditForm")).getTotal()%>'
  />
  </td></tr>
  </uniflow:m_table>  
<html:hidden property="currentPage"/>
<html:hidden property="pagesCount"/>
<html:hidden property="countOfPage"/>
<html:hidden property="requestPage"/>
<html:hidden property="orderBy"/>
<html:hidden property="ascending"/>
<html:hidden property="sflag"/>
<html:hidden property="eflag"/>
   
</uniflow:m_form>
</uniflow:m_body>
</html:html>