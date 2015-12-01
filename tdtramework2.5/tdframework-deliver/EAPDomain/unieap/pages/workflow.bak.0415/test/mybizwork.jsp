<%@ page contentType="text/html; charset=UTF-8"import="com.neusoft.uniflow.web.util.DateConversation"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html:html locale="true">
<head>
<%String category = request.getParameter("categoryview");%>
	<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
	<META HTTP-EQUIV="Expires" CONTENT="0">
	<uniflow:style />
	<script language="JavaScript"src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
	<script language="JavaScript"src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
	<script language="JavaScript"src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
	<script language="javascript">

function open_onclick()
{
    var workItemID = getSelectedItemID();
    var openURL = "<%=request.getContextPath()%>/workhandler.do?wid="+workItemID;
    var width = 450;
    var height = 350;
    open_windows(openURL,width,height);
}
function start_onclick(){
    var openURL = "<%=request.getContextPath()%>/startproc.do";
    var width = 450;
    var height = 350;
    open_windows(openURL,width,height);
}

function itemChanged(){
  if(psWorkListForm.selectedItem){
  	enableButton("open");
  }else{ 
     disableButton("open");
  }
  findSelectedItem();
}
function refresh(){
  location.href="<%=request.getContextPath()%>/pswork.do?categoryview=bizworkitem";
}
function logout(){
   location.href = "<%=request.getContextPath()%>/logout.do";;
}

</script>
</head>
<uniflow:m_body onload="javascript:itemChanged()">
	<uniflow:m_form action="pswork.do">
	<table><tr><td height="20">&nbsp;</td></tr></table>
			<uniflow:m_table style="main_list">
			<td class="main_list_th" valign="middle" width="25" align="center" nowrap >&nbsp;</td>
				<uniflow:order_th value="{特殊标识}workid={工作项ID}" />
				<logic:iterate id="bizworkitem" name="psWorkListForm"
					property="list"
					type="com.neusoft.uniflow.api.bizhandler.NWBizWorkItem"
					indexId="index">
					<uniflow:m_list_tr row="<%=index.intValue()%>">
						<td>
							<html:radio property="selectedItem"
								value="<%=bizworkitem.getWorkItemID()%>" onclick="javascript:itemChanged()"/>
						</td>
						<td><%=(String)bizworkitem.getBizProperty("biz01")%>workid=<%=bizworkitem.getWorkItemID()%></td>
					</uniflow:m_list_tr>
				</logic:iterate>
			</uniflow:m_table>
			<uniflow:m_table style="main_button">
				<tr>
					<td align="right">
						<uniflow:m_button_table>
							<uniflow:button id="start" name="发起" action="javascript:start_onclick()" />
							<uniflow:button id="open" name="button.open" action="javascript:open_onclick()" />
							<uniflow:button id="exit" name="退出" action="javascript:logout()" />
						</uniflow:m_button_table>
					</td>
				</tr>
			</uniflow:m_table>
			<html:hidden property="currentPage" />
			<html:hidden property="pagesCount" />
			<html:hidden property="countOfPage" />
			<html:hidden property="requestPage" />
			<html:hidden property="orderBy" />
			<html:hidden property="ascending" />
			<html:hidden property="categoryview" value="<%=category%>" />

	</uniflow:m_form>
</uniflow:m_body>
</html:html>