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
  var openURL = "<%=request.getContextPath()%>/editunit.do?action=add";
  open_windows(openURL,'450','310');
 }
function modify_onclick()
{
  var selectedID=getSelectedItemID();

  var openURL = "<%=request.getContextPath()%>/editunit.do?action=modify&selectedItem="+selectedID;
  open_windows(openURL,'450','310');

 }

function delete_onclick()
{
  if(delete_confirm("<%=MessageUtil.getString("workflow.confirm.delete",session)%>"))
  {
    unitForm.action.value = "delete";
    document.unitForm.submit();
  }
}

function itemChanged()
{
  unitForm.action.value = "";
  document.unitForm.submit();
}
function onload()
{
  if(!unitForm.selectedItem)
  {
	disableButton("modify");
	disableButton("del");
  }
  findSelectedItem();
}

function reload()
{
  location.href = "orgunitlist.do";
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
<uniflow:m_form action="orgunitlist">

  	<uniflow:tab>
		  <uniflow:tabElement messageKey="workflow.org.lable.user" selected="false" action="javascript:getUserlist()"/>
		  <uniflow:tabElement messageKey="workflow.org.lable.role" selected="false" action="javascript:getRolelist()"/>
		  <uniflow:tabElement messageKey="workflow.org.lable.orgunit" selected="true" action="javascript:getOrgunitlist()"/>
	</uniflow:tab>
	<uniflow:p_content_wrapper width="100%">
    <uniflow:p_content_table>
  	<uniflow:p_content_tr >
  	    <td nowrap  valign="top" align="left" width='50%'>
		    <div style="overflow:scroll;height:330;width:250" >
	          <table width="100%" border="0" cellpadding="0" cellspacing="0">
	           <logic:iterate id="unit" name="unitForm"  property="list"  type="com.neusoft.org.NWUnit" indexId="index">
		        <uniflow:m_list_tr  row="<%=index.intValue()%>">
		          <td width="8%" height="25" class="main_label_td" valign="middle"><html:radio property="selectedItem" value="<%=unit.getID()%>" onclick="itemChanged()"/></td>
		          <td width="90%" class="main_label_td" valign="middle"><img src = "<%=WorkflowManager.getWorkflowStylePath()%>/style1/orgtree_img/openfolder.gif"/>&nbsp;&nbsp;<bean:write name="unit" property="name"/></td>
		       </uniflow:m_list_tr>
		      </logic:iterate>
		     </table>
	       </div>
	    </td>
		<td nowrap valign="top" align="left" width='100%'>
          <table width="100%" border="0" cellpadding="0" cellspacing="0">
            <uniflow:p_content_tr>
		    <td class="main_label_td" valign="middle" nowrap ><bean:message bundle="uniflow" key="workflow.org.unit.lable.name"/></td>
		    <td class="main_label_td" valign="middle" nowrap ><bean:write name="unitForm" property="name"/></td>
		  </uniflow:p_content_tr>
		  <uniflow:p_content_tr>
		    <td class="main_label_td" valign="middle" nowrap ><bean:message bundle="uniflow" key="workflow.org.unit.lable.description"/></td>
		    <td class="main_label_td" valign="middle" nowrap ><bean:write name="unitForm" property="description"/></td>
		  </uniflow:p_content_tr>
		  <uniflow:p_content_tr>
		    <td class="main_label_td" valign="middle" nowrap ><bean:message bundle="uniflow" key="workflow.org.unit.lable.leaderrole_name"/></td>
		    <td class="main_label_td" valign="middle" nowrap ><bean:write name="unitForm" property="leadername"/></td>
		  </uniflow:p_content_tr>
		  <uniflow:p_content_tr>
		    <td class="main_label_td" valign="middle" nowrap ><bean:message bundle="uniflow" key="workflow.org.unit.lable.roles"/></td>
            <td class="main_label_td" valign="middle" nowrap >
		   <logic:equal name ="unitForm" property = "hasrole" value = "false">         
		       <bean:message bundle="uniflow" key="workflow.org.unit.lable.norole"/>
		  </logic:equal>
		  <logic:equal name ="unitForm" property = "hasrole" value = "true">
		    <html:select property="roleinfo" size="16" multiple="true" style="font-family: Verdana, Arial, '宋体';font-size: 12px; color: #000000;width:200px;">
		       <html:options collection="roleinfo"  property="value" labelProperty="label"/>
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
   
<html:hidden property="action"/>
<html:hidden property="currentPage"/>
<html:hidden property="pagesCount"/>
<html:hidden property="countOfPage"/>
<html:hidden property="requestPage"/>
<html:hidden property="orderBy"/>
</uniflow:m_form>
</uniflow:m_body>

</html:html>