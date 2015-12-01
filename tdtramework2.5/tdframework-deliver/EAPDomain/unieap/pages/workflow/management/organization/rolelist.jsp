<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>

<uniflow:style/>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<script language="javascript">
function add_onclick()
{
  var selectedID=roleTreeForm.selectedRole.value;
  var openURL = "<%=request.getContextPath()%>/editrole.do?_operation=add&selectedID="+selectedID;
  open_windows(openURL,'450','450');
 }
function modify_onclick()
{
  var ID;
  var selectedID=roleTreeForm.selectedRole.value;
  var openURL = "<%=request.getContextPath()%>/editrole.do?_operation=modify&selectedID="+selectedID;
  open_windows(openURL,'450','450');
}

function delete_onclick()
{
  if(delete_confirm("<%=MessageUtil.getString("workflow.confirm.delete",session)%>"))
  {
    roleTreeForm.operation.value = "delete";
    document.roleTreeForm.submit();
  }
}

function itemChanged()
{
  roleTreeForm.operation.value = "";
  document.roleTreeForm.submit();
}

function onload()
{
  var ID;
  var selectedID=roleTreeForm.selectedRole.value;
  if(selectedID&&selectedID!="")
  {
	if(selectedID=="<%=com.neusoft.uniflow.web.common.trees.beans.OrgTree.ORGROLEROOT_ID%>")
	{
	  enableButton("add");
	  disableButton("modify");
	  disableButton("del");
	}
	else{
	enableButton("add");
	enableButton("modify");
	enableButton("del");
     }
  }
}

function reload()
{
  location.href = "rolelist.do";
}
function getUserlist()
{
 location.href = "userlist.do";
}
function getRolelist()
{
 location.href = "rolelist.do";
}
function getOrgunitlist()
{
 location.href = "orgunitlist.do";
}
</script>

</head>

<uniflow:m_body onload="onload()">
<uniflow:m_form action="rolelist">

		<uniflow:tab>
		  <uniflow:tabElement messageKey="workflow.org.lable.user" selected="false" action="javascript:getUserlist()"/>
		  <uniflow:tabElement messageKey="workflow.org.lable.role" selected="true" action="javascript:getRolelist()"/>
		  <uniflow:tabElement messageKey="workflow.org.lable.orgunit" selected="false" action="javascript:getOrgunitlist()"/>
		</uniflow:tab>
<uniflow:p_content_wrapper width="100%">
   <uniflow:p_content_table>
      <uniflow:p_content_tr >
		<td nowrap  valign="top" align="left" width='50%'>
	    	<div style="overflow:scroll;height:330;width:250" >
		        <uniflow:orgtree/>
		 	</div>
		</td>

		<td nowrap valign="top" align="left" width='100%'>
          <table width="100%" border="0" cellpadding="0" cellspacing="0" height="100%">
			
		<uniflow:p_content_tr>
		  <td class="main_label_td" valign="middle" nowrap ><bean:message bundle="uniflow" key="workflow.org.role.lable.name"/></td>
		  <td class="main_label_td" valign="middle" nowrap ><bean:write name="roleTreeForm" property="selectedRoleName"/></td>
		</uniflow:p_content_tr>
		<uniflow:p_content_tr>
		  <td class="main_label_td" valign="middle" nowrap ><bean:message bundle="uniflow" key="workflow.org.role.lable.description"/></td>
		  <td class="main_label_td" valign="middle" nowrap ><bean:write name="roleTreeForm" property="selectedRoleDesc"/></td>
		</uniflow:p_content_tr>
		
		<uniflow:p_content_tr>
		  <td class="main_label_td" valign="middle" nowrap ><bean:message bundle="uniflow" key="workflow.org.role.lable.unit"/></td>
   		　 <td class="main_label_td" valign="middle" nowrap >
   		　  <logic:equal name ="roleTreeForm" property = "ownOneUnit" value = "false">
		      <logic:notEqual name = "roleTreeForm" property = "selectedRoleName" value = "">
   		        <bean:message bundle="uniflow" key="workflow.org.role.lable.nointunit"/>
   		    </logic:notEqual>
	       </logic:equal>
		   <logic:equal name ="roleTreeForm" property = "ownOneUnit" value = "true">
	          <bean:write name="roleTreeForm" property="ownerUnit"/>
		   </logic:equal>
		 </td>
		</uniflow:p_content_tr>
		<uniflow:p_content_tr>
		  <td class="main_label_td" valign="middle" nowrap ><bean:message bundle="uniflow" key="workflow.org.role.lable.person"/></td>
		  <td class="main_label_td" valign="middle" nowrap >		  
 		  <logic:equal name ="roleTreeForm" property = "hasPerson" value = "false">
 		  		  <logic:notEqual name = "roleTreeForm" property = "selectedRoleName" value = "">
		           <bean:message bundle="uniflow" key="workflow.org.role.lable.noperson"/>
		        </logic:notEqual>
		  </logic:equal>
		  <logic:equal name ="roleTreeForm" property = "hasPerson" value = "true">
		    <html:select property="personsInfo" size="16" multiple="true" style="font-family: Verdana, Arial, '宋体';font-size: 12px; color: #000000;width:200px;">
		       <html:options collection="personinfo"  property="value" labelProperty="label"/>
		    </html:select>
		  </logic:equal>
		 </td>
		</uniflow:p_content_tr>		
		   
	 </table></td>
</uniflow:p_content_tr>
</uniflow:p_content_table>
</uniflow:p_content_wrapper>

<uniflow:p_action>
	<uniflow:button id="add" action="javascript:add_onclick()" name="button.new"></uniflow:button>
	<uniflow:button id="del" action="javascript:delete_onclick()" name="button.delete"></uniflow:button>
	<uniflow:button id="modify" action="javascript:modify_onclick()" name="button.modify"></uniflow:button>
</uniflow:p_action>
   		
<html:hidden property="operation"/>
<html:hidden property="selectedRole"/>
</uniflow:m_form>
</uniflow:m_body>
</html:html>
