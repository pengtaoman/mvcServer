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
  var openURL = "<%=request.getContextPath()%>/edituser.do?operation=add";
  open_modalWindow(openURL,'450','486');
}
function modify_onclick()
{
  var ID;
  var selectedID=getSelectedItemID();

  var openURL = "<%=request.getContextPath()%>/edituser.do?operation=modify&selectedID="+selectedID;
  open_modalWindow(openURL,'450','486');
}

function delete_onclick()
{
  if(delete_confirm("<%=MessageUtil.getString("workflow.confirm.delete",session)%>"))
  {
    personForm.operation.value = "delete";
    document.personForm.submit();
  }
}

function itemChanged()
{
  personForm.operation.value = "";
  document.personForm.submit();
}

function onload()
{
  if(!personForm.selectedItem){
	disableButton("modify");
	disableButton("del");
  }
  findSelectedItem();
}
function reload()
{
  location.href = "userlist.do";
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

<uniflow:m_body onload="onload()" >
<uniflow:m_form action="userlist.do">
  <uniflow:tab >
		<uniflow:tabElement messageKey="workflow.org.lable.user" selected="true" action="javascript:getUserlist()"/>
		<uniflow:tabElement messageKey="workflow.org.lable.role" selected="false" action="javascript:getRolelist()"/>
		<uniflow:tabElement messageKey="workflow.org.lable.orgunit" selected="false" action="javascript:getOrgunitlist()"/>
  </uniflow:tab>
  <uniflow:p_content_wrapper width="100%">
   <uniflow:p_content_table>
      <uniflow:p_content_tr >
       <td nowrap  valign="top" align="left" width='50%'>
		  <div style="overflow:scroll;height:330;width:250" >
		   <table border="0" cellpadding="0" cellspacing="0">
		   <logic:iterate id="user" name="personForm"  property="list" type="com.neusoft.org.NWPerson" indexId="index">
		   <uniflow:m_list_tr row="<%=index.intValue()%>">
		     <td width="8%" height="25" class="main_label_td" valign="middle"><html:radio property="selectedItem" value="<%=user.getID()%>" onclick="itemChanged()"/></td>
		     <td nowrap width="90%" class="main_label_td" valign="middle"><%=user.getName()%></td>
		   </uniflow:m_list_tr>
		   </logic:iterate>
           <uniflow:pageCtr
           curPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("personForm")).getCurrentPage()%>'
		   maxPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("personForm")).getPagesCount()%>'/>
		   </table>
		  </div>
       </td>
       
       <td nowrap valign="top" align="left" width='200'>
          <table width="200" border="0" cellpadding="0" cellspacing="0">
             <uniflow:p_content_tr>
                <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.name"/></td>
		        <td class="main_label_td" valign="middle" nowrap><bean:write name="personForm" property="name"/></td>
		     </uniflow:p_content_tr>
             <uniflow:p_content_tr>
		        <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.account"/></td>
		        <td class="main_label_td" valign="middle" nowrap><bean:write name="personForm" property="account"/></td>
		     </uniflow:p_content_tr>
		  <uniflow:p_content_tr>
		    <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.sex"/></td>
		    <td class="main_label_td" valign="middle" nowrap>
		    <logic:equal name="personForm" property="sex" value="0">
			<bean:message bundle="uniflow" key="workflow.org.user.sex.male"/>
		    </logic:equal>
		    <logic:equal name="personForm" property="sex" value="1">
			<bean:message bundle="uniflow" key="workflow.org.user.sex.female"/>
		    </logic:equal>
		    </td>
		  </uniflow:p_content_tr>
		  <uniflow:p_content_tr>
		    <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.email"/></td>
		    <td class="main_label_td" valign="middle" nowrap><bean:write name="personForm" property="email"/></td>
		  </uniflow:p_content_tr>
		  <uniflow:p_content_tr>
		    <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.department"/></td>
		    <td class="main_label_td" valign="middle" nowrap><bean:write name="personForm" property="department"/></td>
		  </uniflow:p_content_tr>
		  <uniflow:p_content_tr>
		    <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.office.address"/></td>
		    <td class="main_label_td" valign="middle" nowrap><bean:write name="personForm" property="officeAddress"/></td>
		  </uniflow:p_content_tr>
		  <uniflow:p_content_tr>
		    <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.office.phone"/></td>
		    <td class="main_label_td" valign="middle" nowrap><bean:write name="personForm" property="officeTel"/></td>
		  </uniflow:p_content_tr>
		  <uniflow:p_content_tr>
		    <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.post.code"/></td>
		    <td class="main_label_td" valign="middle" nowrap><bean:write name="personForm" property="postalCode"/></td>
		  </uniflow:p_content_tr>
		  <uniflow:p_content_tr>
		    <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.fax"/></td>
		    <td class="main_label_td" valign="middle" nowrap><bean:write name="personForm" property="fax"/></td>
		  </uniflow:p_content_tr>
		  <uniflow:p_content_tr>
		    <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.mobile"/></td>
		    <td class="main_label_td" valign="middle" nowrap><bean:write name="personForm" property="mobilePhone"/></td>
		  </uniflow:p_content_tr>
		  <uniflow:p_content_tr>
		    <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.pager"/></td>
		    <td class="main_label_td" valign="middle" nowrap><bean:write name="personForm" property="pager"/></td>
		  </uniflow:p_content_tr>
		  <uniflow:p_content_tr>
		    <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.home.address"/></td>
		    <td class="main_label_td" valign="middle" nowrap><bean:write name="personForm" property="homeAddress"/></td>
		  </uniflow:p_content_tr>
		  <uniflow:p_content_tr>
		    <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.org.user.lable.home.phone"/></td>
		    <td class="main_label_td" valign="middle" nowrap><bean:write name="personForm" property="homeTel"/></td>
		  </uniflow:p_content_tr>
          
          </table></td>
          <td width="100%"></td>
       
</uniflow:p_content_tr>
</uniflow:p_content_table>
</uniflow:p_content_wrapper>
<uniflow:p_action>
		 <uniflow:button id="add" action="javascript:add_onclick()" name="button.new"></uniflow:button>
		 <uniflow:button id="del" action="javascript:delete_onclick()" name="button.delete"></uniflow:button>
		 <uniflow:button id="modify" action="javascript:modify_onclick()" name="button.modify"></uniflow:button>
</uniflow:p_action>

<html:hidden property="operation"/>
<html:hidden property="currentPage"/>
<html:hidden property="pagesCount"/>
<html:hidden property="countOfPage"/>
<html:hidden property="requestPage"/>

</uniflow:m_form>
</uniflow:m_body>
</html:html>