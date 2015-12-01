<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.EngineChartFactory"%>
<%@ page import="java.io.PrintWriter"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<html:html locale="true">
<head>

<uniflow:style />
<%Date begin = (Date) request.getAttribute("begin");
  Date end = (Date) request.getAttribute("end");
  String filename = EngineChartFactory.generateEngineChart("message","Engine Capability", session, new PrintWriter(out), begin,end);
  //System.out.println(out);		
  String graphURL = request.getContextPath()+ "/displayChart?filename=" + filename;
%>
<script language="JavaScript"
	src="<%=WorkflowManager.getWorkflowPath()%>/js/DatePicker.js"></script>
<script language="JavaScript"
	src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript"
	src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="javascript">
function reload(){
  location.href = "enginestat.do";
}
function refresh(){
  location.href = "enginestat.do";
}

function ok_onclick(){
     if(engineStatForm.startTime.value>engineStatForm.endTime.value || engineStatForm.startTime.value==engineStatForm.endTime.value){
	     alert("<%=MessageUtil.getString("workflow.check.time.checked",request.getSession())%>");
	     return;
     }  
     document.engineStatForm.submit();
}
</script>

</head>
<uniflow:m_body>
<uniflow:m_form action="enginestat.do">
   <uniflow:m_table style="main_title_table">
	 <tr><td align="right" valign="middle" class="main_table2_td2">
		<table height="28" border="0" cellpadding="0" cellspacing="0"class="main_label_table">
           <tr>
           <td height="25" valign="middle" nowrap class="main_label_td"><bean:message bundle="uniflow" key="workflow.starttime"/>:</td>
           <td height="25" valign="middle" nowrap class="main_label_td">
               <html:text property="startTime" styleClass="input_text150"readonly="true" style="behavior:url(<%=WorkflowManager.getWorkflowPath()%>htc/Date.htc)" /> 
               <a href="javascript:show_cal('startTime')">
                 <img src='<%=WorkflowManager.getWorkflowStylePath()%>/style1/calender_img/time.gif'width='16' height='16' alt='뎐놔휑저苟윗꽉데' border='0'>
               </a>
           </td>
           <td height="25" valign="middle" nowrap class="main_label_td"><bean:message bundle="uniflow" key="workflow.endtime"/>:</td>
           <td height="25" valign="middle" nowrap class="main_label_td">
               <html:text property="endTime" styleClass="input_text150"readonly="true" style="behavior:url(<%=WorkflowManager.getWorkflowPath()%>htc/Date.htc)" /> 
               <a href="javascript:show_cal('endTime')">
                 <img src='<%=WorkflowManager.getWorkflowStylePath()%>/style1/calender_img/time.gif'width='16' height='16' alt='뎐놔휑저苟윗꽉데' border='0'>
               </a>
           </td>
           <uniflow:button id="chart"	action="javascript:ok_onclick()" name="button.draw"/>
           <td height="25" valign="middle" nowrap class="main_label_td">
               <uniflow:commonbutton customization="false" />
           </td></tr>      
        </table></td>
     </tr>
   </uniflow:m_table>
   <uniflow:m_table style="main_list">
     <td valign="middle" class="main_list_td">
       <uniflow:printchart src="<%=graphURL%>" usemap="<%=filename%>" width="800" height="600"/>
	</td>
   </uniflow:m_table>
</uniflow:m_form>
</uniflow:m_body>

</html:html>