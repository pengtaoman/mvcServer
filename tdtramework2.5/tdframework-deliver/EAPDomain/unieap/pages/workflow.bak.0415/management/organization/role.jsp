<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
<title><bean:message bundle="uniflow" key = "workflow.popup"/></title>
	
	<script language="JavaScript"src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
	<script language="JavaScript"src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
    <script language="JavaScript"src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>  
	<uniflow:style />
	<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-right: 0px;
	margin-top: 0px;
	margin-bottom: 0px;
}
-->
</style>
	<script language="JavaScript">
function button_onclick(action)
{
  roleForm.page_operation.value = action;
  document.roleForm.submit();
}
function move_onclick(){
var sel_source = roleForm.personinfo;
var sel_dest = roleForm.selectmember;
  MoveAllItems(sel_source,sel_dest);
 
}
function remove_onclick(){
var sel_dest = roleForm.selectmember;
var length =sel_dest.length; 
for(var i=0;length>i;i++){
    if(sel_dest.options[i].selected){
        sel_dest.options[i]=null;
        length--;
        i--
    }
 }
}
 function MoveAllItems(sel_source, sel_dest)
 {
  for(var i= 0; sel_source.length>i;i++){
     if(sel_source.options[i].selected) {
      var SelectedText = sel_source.options[i].text;
      var SelectedValue = sel_source.options[i].value;
      var exit = false;
      for(var j=0;sel_dest.length>j;j++){
         var each = sel_dest.options[j];
         if(each.value == SelectedValue){
             exit = true;
             break;
          }
      }
      if(exit){
          continue;
      }
      else{
         sel_dest.options.add(new Option(SelectedText,SelectedValue));
      }
     }
   }
 }
function ok_onclick()
{ 
  var sel_dest = document.forms[0].selectmember;
  for(var i=0;sel_dest.length>i;i++){
     eval("sel_dest.options[" + i + "].selected=true");
   }
  if(validateRequired())
  {
   document.roleForm.action = "updaterole.do";
   document.roleForm.submit();
  }
}
function cancel_onclick()
{
  parent.returnValue = false;
  parent.close();
}
function validateRequired()
{
  var name = getTrimText(document.roleForm.name);
  if(name=="")
  {
    warning_info.innerHTML = "<%=MessageUtil.getString("workflow.required",session)%>";
    return false;
   }
   return true;
}
function onload()
{
  var action = "<%=request.getAttribute("close_flag")%>";
  if(action == "close")
  {
    parent.returnValue = true;
    window.close();
    opener.refresh();
  }
}

</script>
</head>

<uniflow:p_body onload="javascript:onload()" width="99%" >
	<uniflow:m_form action="editrole.do" focus="name">
		
			<uniflow:p_title>
				<bean:message bundle="uniflow" key="workflow.org.role.information" />
			</uniflow:p_title>

			<uniflow:p_content_comm_wrapper width="100%">
				<uniflow:p_warning>
					<html:errors />
				</uniflow:p_warning>

				<uniflow:p_content_table>

					<uniflow:p_content_tr>
						<td class="main_label_td" valign="middle" nowrap>
							<bean:message bundle="uniflow" key="workflow.org.role.lable.parentrolename" />
						</td>
						<td class="main_label_td" valign="middle" nowrap>
							<logic:equal name="roleForm" property="parent" value="">
								<bean:message bundle="uniflow" key="workflow.org.role.lable.noparentrole" />
							</logic:equal>
							<bean:write name="roleForm" property="parent" />
						</td>
					</uniflow:p_content_tr>

					<uniflow:p_content_tr>
						<td class="main_label_td" valign="middle" nowrap>
							<bean:message bundle="uniflow"
								key="workflow.org.role.lable.name" />
						</td>
						<td class="main_label_td" valign="middle" nowrap>
							<html:text property="name" styleClass="input_text200" />
						</td>
					</uniflow:p_content_tr>
					<uniflow:p_content_tr>
						<td class="main_label_td" valign="middle" nowrap>
							<bean:message bundle="uniflow"
								key="workflow.org.role.lable.description" />
						</td>
						<td class="main_label_td" valign="middle" nowrap>
							<html:textarea property="description" styleClass="input_text200"
								rows="4" />
						</td>
					</uniflow:p_content_tr>

					<uniflow:p_content_tr>
						<td class="main_label_td" valign="middle" nowrap>
							<bean:message bundle="uniflow"
								key="workflow.org.role.lable.ownunit" />
						</td>
						<td class="main_label_td" valign="middle" nowrap>
							<logic:equal name="roleForm" property="needSelUnit" value="true">
								<html:select property="ownerUnit" styleClass="input_text200" >
									<html:options collection="unitinfo" property="value"
										labelProperty="label" />
								</html:select>
							</logic:equal>
							<logic:equal name="roleForm" property="needSelUnit" value="false">
								<bean:message bundle="uniflow"
									key="workflow.org.role.lable.nounit" />
							</logic:equal>
						</td>
					</uniflow:p_content_tr>

					<uniflow:p_content_tr>
						<td class="main_label_td" valign="middle" nowrap>
							<bean:message bundle="uniflow"
								key="workflow.org.role.lable.member" />
						</td>
						<td class="main_label_td" valign="middle" ></td>
						<td class="main_label_td" valign="middle" nowrap>
							<bean:message bundle="uniflow"
								key="workflow.org.role.lable.person" />
						</td>
					</uniflow:p_content_tr>
					<uniflow:p_content_tr>
						<table>
						<tr>
						<td class="main_label_td" valign="middle" nowrap width="40%">
							<html:select property="personinfo" size="8" multiple="true" style="font-family: Verdana, Arial, '宋体';font-size: 12px; color: #000000;width:150">
								<html:options collection="personinfo" property="value"
									labelProperty="label" />
							</html:select>
						</td>
						<td><table>
							<tr><input type='button' property="move" value="&gt;&gt;<%=MessageUtil.getString("button.add",session)%>" onclick="move_onclick()" class='button_normal'/></tr>
							<tr><input type='button' property="remove" value="<%=MessageUtil.getString("button.remove",session)%>&lt;&lt;" onclick="remove_onclick()" class='button_normal'/></tr>
							</table></td>
						<td class="main_label_td" valign="middle" nowrap width="40%">
							<html:select property="selectmember" size="8" multiple="true" style="font-family: Verdana, Arial, '宋体';font-size: 12px; color: #000000;width:150">
								<html:options collection="roleinfo" property="value" labelProperty="label" />
							</html:select>
						</td>
						</tr>
						</table>
					</uniflow:p_content_tr>

				</uniflow:p_content_table>
			</uniflow:p_content_comm_wrapper >
			<uniflow:p_action>
				<uniflow:button id="ok" action="javascript:ok_onclick()" name="button.ok" ></uniflow:button>
				<uniflow:button id="cancel" action="javascript:cancel_onclick()" name="button.cancel"></uniflow:button>
			</uniflow:p_action>
			<html:hidden property="operation" />
			<html:hidden property="page_operation" />
			<html:hidden property="ID" />
			<html:hidden property="rolemember" />

		
	</uniflow:m_form>
</uniflow:p_body>
</html:html>