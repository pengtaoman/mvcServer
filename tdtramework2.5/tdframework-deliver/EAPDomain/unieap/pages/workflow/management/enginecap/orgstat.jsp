<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.EngineChartFactory"%>
<%@ page import="java.io.PrintWriter"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
<uniflow:style />
<script language="JavaScript"
	src="<%=WorkflowManager.getWorkflowPath()%>/js/DatePicker.js"></script>
<script language="JavaScript"
	src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript"
	src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="javascript">

function refresh(){ 
  var type = "<%=request.getParameter("type") %>";
  if(type&&type=="person"){
    location.href = "orgstat.do?type=person";
  }
  else if(type&&type=="role"){
    location.href = "orgstat.do?type=role";
  }
  else{
    location.href = "orgstat.do?type=person";
  }
}
function itemChanged()
{ 
  document.orgStatForm.submit();
}
function getHeight(){
  return document.body.clientHeight;
}

</script>
<%String id = (String) request.getAttribute("id");
  String filename = EngineChartFactory.generateOrgChart("message","Engine Capability", session, new PrintWriter(out), id);
  String graphURL = request.getContextPath() + "/displayChart?filename=" + filename;
%>
</head>

<body style="margin-left:0px;margin-top: 0px;margin-right:0px;margin-bottom: 0px;scrollbar-face-color: #D8E2E7;
scrollbar-shadow-color: #EEEEEE; scrollbar-highlight-color: #EEEEEE;scrollbar-3dlight-color: #EEEEEE;
scrollbar-darkshadow-color: #EEEEEE;scrollbar-track-color: #EEEEEE;scrollbar-arrow-color: #606D79;overflow-y:hidden;overflow-x:hidden; ">
<uniflow:m_form action="orgstat.do">
	 <uniflow:m_table style="main_title_table">
	 <tr><td align="right" valign="middle" class="main_table2_td2">
		<table height="28" border="0" cellpadding="0" cellspacing="0"class="main_label_table">
           <tr>
           <td height="25" valign="middle" nowrap class="main_label_td">
               <uniflow:commonbutton customization="false" />
           </td></tr>      
        </table></td>
     </tr>
   </uniflow:m_table>
   <uniflow:m_table style="main_list">
   <tr>
   <td valign="middle" class="main_list_td"  valign="top" width="200" height="600">
    <table><tr><td>
		<div style="overflow:scroll;height:600;width:200">
		<logic:equal name="orgStatForm" property="type" value="person">
		<uniflow:p_content_table>
			<logic:iterate id="user" name="orgStatForm" property="list" type="com.neusoft.org.NWPerson" indexId="index">
				<uniflow:m_list_tr row="<%=index.intValue()%>">
					<td height="25"><html:radio property="selectedItem" value="<%=user.getID()+String.valueOf('p')%>" onclick="itemChanged()" /></td>
					<td nowrap><%=user.getName() + String.valueOf('(')+ user.getAccount() + String.valueOf(')')%></td>
				</uniflow:m_list_tr>
			</logic:iterate>
		</uniflow:p_content_table>
		</logic:equal> 
		<logic:equal name="orgStatForm" property="type" value="role">
		<uniflow:p_content_table>
			<logic:iterate id="role" name="orgStatForm" property="list"type="com.neusoft.org.NWRole" indexId="index">
				<uniflow:m_list_tr row="<%=index.intValue()%>">
					<td height="25"><html:radio property="selectedItem"value="<%=role.getID()+String.valueOf('r')%>"onclick="itemChanged()" /></td>
					<td nowrap><%=role.getName()%></td>
				</uniflow:m_list_tr>
			</logic:iterate>
		</uniflow:p_content_table>
		</logic:equal>
		</div>    
   </td></tr></table>

   </td>
   <td valign="middle" class="main_list_td">
       <uniflow:printchart src="<%=graphURL%>" usemap="<%=filename%>"  width="800" height="600"/>
   </td>
   </tr> 
   </uniflow:m_table>
		<html:hidden property="currentPage" />
		<html:hidden property="pagesCount" />
		<html:hidden property="countOfPage" />
		<html:hidden property="requestPage" />
		<html:hidden property="type" />
</uniflow:m_form>		
</body>
</html:html>