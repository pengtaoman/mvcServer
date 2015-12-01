<%@ page contentType="text/html; charset=UTF-8" import="com.neusoft.uniflow.web.util.DateConversation"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.CommonInfoManager"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<html:html locale="true">
<head>
<%String category = request.getParameter("categoryview");%>
<%String state = request.getParameter("state");%>
<%String agentid = request.getParameter("agentid");%>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0">
<title></title>
<uniflow:style/>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Common.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/Button.js"></script>
<script language="javascript">


function custom_window(){
  open_scrollable_window("<%=request.getContextPath()%>/custom.do?elements_name=workitem&extendType=wi&category=<%=category%>","400","365");  
}
function find_window(){
  open_windows("<%=request.getContextPath()%>/query.do?queryItem=pending","400","300");  
}

function itemChanged()
{
  //var rb,checkedItem,isADHoc,isReasign,curState;
  //if(assigneeBizWorkListForm.selectedItem){
  
 // }else{
   // disableButton("open");

  //}
  findSelectedItem();
}


function refresh(){
  location.href = "assigneebizwork.do?categoryview=<%=category%>&agentid=<%=agentid%>&state="+"<%=state%>";
}
function query(){
   document.all.query.style.visibility="visible";
   document.all.main.style.visibility="hidden";
}
function ok_onclick(){
   
   var length = assigneeBizWorkListForm.querys.length;
   var filter = "";
   for (var i=0;i<length; i++){
     var qu = eval("assigneeBizWorkListForm.querys.options[" + i + "].value");
     filter = filter + qu;       
   }
   assigneeBizWorkListForm.filter.value = filter; 
  // alert("TEST: "+assigneeBizWorkListForm.filter.value);
  // return;
   document.forms[0].submit();
}
function cancel_onclick(){
   document.all.query.style.visibility="hidden";
   document.all.main.style.visibility="visible";
}
function add_cond(){
  var con = assigneeBizWorkListForm.cond.value;
  var op  = assigneeBizWorkListForm.oper.value;
  var val = assigneeBizWorkListForm.condvalue.value;
  var conOp = assigneeBizWorkListForm.conOper.value;  
  var qu;
  var quValue;

  if (conOp!=""){
     qu = '#' + conOp + ' ' + con + op + val;
     quValue = conOp + ' ' + con + op + val;
  }else{
     qu = '#' + con + op + val;
     quValue = con + op + val;
  }  
  var length = assigneeBizWorkListForm.querys.length; 
  var quLable = "<%=MessageUtil.getString("workflow.extend.workitem.list.condition",request.getSession())%>"+length+':'+quValue;          
  var option = new Option(quLable,qu);
  eval("assigneeBizWorkListForm.querys.options[" + length + "] = option"); 
    
}
function delete_cond(){
   var length = assigneeBizWorkListForm.querys.length;
   for(var i=0; i<length; i++)
   {
    var selected = eval("assigneeBizWorkListForm.querys.options[" + i + "].selected");
    if(selected){
	eval("assigneeBizWorkListForm.querys.options[" + i + "]=null");
	length--;
	i--;
    }
  }
}

</script>
</head>
<uniflow:m_body onload="javascript:itemChanged()">
<uniflow:m_form action="assigneebizwork.do">

<DIV id="query" style="height:100%;width:630;overflow:auto;position:absolute;left=8px;right=8px;top:0px;visibility:hidden;z-index: 0;background-color:#ffffff">
<uniflow:p_title><bean:message bundle="uniflow" key="workflow.extend.workitem.list.condition.setting" /></uniflow:p_title>
<uniflow:p_content_comm_wrapper width="620">
  <uniflow:p_warning>
    <html:errors/>
  </uniflow:p_warning>
 <uniflow:p_content_table>
  <uniflow:p_content_tr>
   <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.extend.workitem.list.condition.setting.string" />&nbsp;'<bean:message bundle="uniflow" key="workflow.extend.workitem.list.condition.setting.value" />' &nbsp;<bean:message bundle="uniflow" key="workflow.extend.workitem.list.condition.setting.example" />&nbsp;'biz01value'</td>
  </uniflow:p_content_tr> 
  <uniflow:p_content_tr>
   <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.extend.workitem.list.condition.setting.int" />&nbsp;<bean:message bundle="uniflow" key="workflow.extend.workitem.list.condition.setting.value" />&nbsp;<bean:message bundle="uniflow" key="workflow.extend.workitem.list.condition.setting.example" />&nbsp;100</td>
  </uniflow:p_content_tr> 
  <uniflow:p_content_tr>
   <td class="main_label_td" valign="middle" nowrap><bean:message bundle="uniflow" key="workflow.extend.workitem.list.condition.setting.date" />&nbsp;'yyyy-mm-dd&nbsp;hh:mm:ss'&nbsp;<bean:message bundle="uniflow" key="workflow.extend.workitem.list.condition.setting.example" />&nbsp;'2006-09-08&nbsp;22:25:12'</td>
  </uniflow:p_content_tr>
  <uniflow:p_content_tr>
   <td class="main_label_td" valign="middle" nowrap>
  <html:select name="assigneeBizWorkListForm" property="cond" style="font-family: Verdana, Arial, '宋体';font-size: 12px; color: #000000;width:120">
    <html:options collection="cond"  property="columnName" labelProperty="name"/>
  </html:select>
  <html:select name="assigneeBizWorkListForm" property="oper" style="font-family: Verdana, Arial, '宋体';font-size: 12px; color: #000000;width:120">
    <html:options collection="oper"  property="value" labelProperty="label"/>
  </html:select>
  <html:text name="assigneeBizWorkListForm" property="condvalue" styleClass="input_text200" />
  <html:select name="assigneeBizWorkListForm" property="conOper" style="font-family: Verdana, Arial, '宋体';font-size: 12px; color: #000000;width:60">
    <html:options collection="conOper"  property="value" labelProperty="label"/>
  </html:select>
   </td>
  <uniflow:button id="add" action="javascript:add_cond()"><bean:message bundle="uniflow" key="button.add"/></uniflow:button>  
  </uniflow:p_content_tr> 
  <uniflow:p_content_tr>
   <td class="main_label_td" valign="middle" nowrap>
		<html:select name="assigneeBizWorkListForm" property="querys" style="font-family: Verdana, Arial, '宋体';font-size: 12px; color: #000000;width:500" size="5" multiple="true">
		<html:options collection="querys"  property="value" labelProperty="label"/>
		</html:select>
   </td>
   <uniflow:button id="delete" action="javascript:delete_cond()"><bean:message bundle="uniflow" key="button.delete"/></uniflow:button>
  </uniflow:p_content_tr>
  <uniflow:p_action>
      <uniflow:button id="ok" action="javascript:ok_onclick()" ><bean:message bundle="uniflow" key="button.commit"/></uniflow:button>
      <uniflow:button id="cancel" action="javascript:cancel_onclick()"><bean:message bundle="uniflow" key="button.back"/></uniflow:button>
  </uniflow:p_action>  
 </uniflow:p_content_table>
</uniflow:p_content_comm_wrapper>
</DIV>


<div id="main">
   <uniflow:m_table style="main_title_table">
	 <tr><td align="right" valign="middle" class="main_table2_td2">
		<table height="28" border="0" cellpadding="0" cellspacing="0"class="main_label_table">
           <tr>
			  <td>
    <uniflow:commonbutton find='true'findAction='javascript:query()' refreshAction='javascript:refresh()' printAction='#' customAction='javascript:custom_window()'/>
            </td></tr>      
        </table></td>
     </tr>
   </uniflow:m_table>
   <uniflow:m_table style="main_list">
	 <td  class="main_list_th" valign="middle" width="25" align="center" nowrap>&nbsp;</td>
	 <uniflow:m_order_th name="name"   value="workflow.workitem.name"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.NAME%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).isAscending()%>'/>	
	 <uniflow:m_order_th name="workitemID"   value="workflow.workitem.workitemID"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.WORKITEM_INS_ID%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="actID"   value="workflow.workitem.actID"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.ACTIVITY_INS_ID%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="actname"   value="workflow.workitem.actname"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.NAME%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="state"   value="workflow.workitem.state"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.CURRENT_STATE%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="type"   value="workflow.workitem.type"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.TYPE%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="limittime"   value="workflow.workitem.limittime"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.LIMIT_TIME%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="priority"   value="workflow.workitem.priority"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.PRIORITY%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).isAscending()%>'/>	    

	 <uniflow:m_order_th name="createtime"   value="workflow.workitem.createtime"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.CREATE_TIME%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="completetime"   value="workflow.workitem.completetime"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.COMPLETE_TIME%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="category"   value="workflow.workitem.category"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.CATEGORY%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="sendtype"   value="workflow.workitem.sendtype"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.NAME%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="appname"   value="workflow.workitem.appname"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.APP_NAME%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="appURL"   value="workflow.workitem.appURL"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.APP_URL%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="apptype"   value="workflow.workitem.apptype"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.APP_TYPE%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).isAscending()%>'/>
	 <uniflow:m_order_th name="description"   value="workflow.workitem.description"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.DESCRIPTION%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).isAscending()%>'/>	
	 <uniflow:m_order_th name="procinstID"   value="workflow.workitem.procinstID"
	    orderby="<%=com.neusoft.uniflow.api.handler.NWWorkItem.PROC_INSTANCE_ID%>" collection="workitem"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).isAscending()%>'/>		
	<uniflow:bizth name="assigneeBizWorkListForm" category="<%=category%>"
	    orderKey='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).getOrderBy()%>' 
	    ascending='<%=((com.neusoft.uniflow.web.common.list.OpenListForm) request.getAttribute("assigneeBizWorkListForm")).isAscending()%>'/> 
    
    
    <logic:iterate id="bizworkitem" name="assigneeBizWorkListForm" property="list" type="com.neusoft.uniflow.api.bizhandler.NWBizWorkItem" indexId="index">
	<uniflow:m_list_tr row="<%=index.intValue()%>">
	<td width="25" align="center" valign="middle" class="main_list_td">
	  <html:radio property="selectedItem" value="<%=bizworkitem.getWorkItemID()%>" onclick="itemChanged()"/>
	  <html:hidden name="bizworkitem" property="needCommitRole"/>
	  <html:hidden name="bizworkitem" property="ADHoc"/>
	  <html:hidden name="bizworkitem" property="reassignedWI"/>
	  <html:hidden name="bizworkitem" property="curState"/>
	</td>
	<uniflow:element collection="workitem" name="name"><bean:write name="bizworkitem" property="name"/>&nbsp;</uniflow:element>
	<uniflow:element collection="workitem" name="workitemID"><bean:write name="bizworkitem" property="workItemID"/>&nbsp;</uniflow:element>
	<uniflow:element collection="workitem" name="actID"><bean:write bundle="uniflow"  name="bizworkitem" property="actInstID"/>&nbsp;</uniflow:element>
	<uniflow:element collection="workitem" name="actname"><bean:write bundle="uniflow"  name="bizworkitem" property="name"/>&nbsp;</uniflow:element>
	<uniflow:element collection="workitem" name="state">
	  <logic:equal name="bizworkitem" property="curState" value="0">
	    <bean:message bundle="uniflow" key="common.procinst.state.initial" />
	  </logic:equal>
	  <logic:equal name="bizworkitem" property="curState" value="1">
	    <bean:message bundle="uniflow" key="common.procinst.state.running" />
	  </logic:equal>
	  <logic:equal name="bizworkitem" property="curState" value="2">
	    <bean:message bundle="uniflow" key="common.procinst.state.active" />
	  </logic:equal>
	  <logic:equal name="bizworkitem" property="curState" value="3">
	    <bean:message bundle="uniflow" key="common.procinst.state.suspend" />
	  </logic:equal>
	  <logic:equal name="bizworkitem" property="curState" value="4">
	    <bean:message bundle="uniflow" key="common.procinst.state.complete" />
	  </logic:equal>
	  <logic:equal name="bizworkitem" property="curState" value="5">
	    <bean:message bundle="uniflow" key="common.procinst.state.stopped" />
	  </logic:equal>
	  &nbsp;
	</uniflow:element>
	
	<uniflow:element collection="workitem" name="type">
  <logic:equal name="bizworkitem" property="ADHoc" value="true">
	      <bean:message bundle="uniflow" key="workflow.workitem.transact.paculiar"/>&nbsp;
	</logic:equal>
  <logic:equal name="bizworkitem" property="ADHoc" value="false">
	      <bean:message bundle="uniflow" key="workflow.workitem.transact.common"/>&nbsp;
  </logic:equal>
	</uniflow:element>

	<uniflow:element collection="workitem" name="limittime">
	   <%=DateConversation.parseMinToDHMS(bizworkitem.getLimitTime())%>&nbsp;
	</uniflow:element>
	<uniflow:element collection="workitem" name="priority"><bean:write bundle="uniflow" name="bizworkitem" property="priority"/>&nbsp;</uniflow:element>
	<uniflow:element collection="workitem" name="createtime"><bean:write bundle="uniflow"  name="bizworkitem" property="startTime" formatKey="date.key"/>&nbsp;</uniflow:element>
	<uniflow:element collection="workitem" name="completetime"><bean:write bundle="uniflow"  name="bizworkitem" property="completeTime" formatKey="date.key"/>&nbsp;</uniflow:element>
	<uniflow:element collection="workitem" name="category"><bean:write name="bizworkitem" property="category"/>&nbsp;</uniflow:element>
	<uniflow:element collection="workitem" name="sendtype">
	  <logic:equal name="bizworkitem" property = "actionType" value = "0">
	     <bean:message bundle="uniflow" key="workflow.workitem.sendtype.copy"/>
	  </logic:equal>
	  <logic:equal name="bizworkitem" property="actionType" value ="1">
	     <bean:message bundle="uniflow" key ="workflow.workitem.sendtype.motive"/>
	  </logic:equal>
	</uniflow:element>
	
	<uniflow:element collection="workitem" name="appname"><bean:write name="bizworkitem" property="appName"/>&nbsp;</uniflow:element>
	<uniflow:element collection="workitem" name="appURL"><bean:write name="bizworkitem" property="appURL"/>&nbsp;</uniflow:element>
	<uniflow:element collection="workitem" name="apptype"><bean:write name="bizworkitem" property="appType"/>&nbsp;</uniflow:element>
	<uniflow:element collection="workitem" name="description"><bean:write name="bizworkitem" property="description"/>&nbsp;</uniflow:element>
	<uniflow:element collection="workitem" name="procinstID"><bean:write name="bizworkitem" property="procInstID"/>&nbsp;</uniflow:element>


  	<uniflow:bizcontent name="bizworkitem" category="<%=category%>"/>

  
    </uniflow:m_list_tr>
    </logic:iterate>
</uniflow:m_table>
<uniflow:m_table style="main_button">
<tr><td>
  <uniflow:pageCtr 
      curPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm)request.getAttribute("assigneeBizWorkListForm")).getCurrentPage()%>' 
      maxPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm)request.getAttribute("assigneeBizWorkListForm")).getPagesCount()%>' 
      total ='<%=((com.neusoft.uniflow.web.common.list.OpenListForm)request.getAttribute("assigneeBizWorkListForm")).getTotal()%>'
  />
		</td><td align="right" >
		<uniflow:m_button_table>
		 	   <uniflow:button id="back" name="button.cancel" action="javascript:window.close()" />
		</uniflow:m_button_table>
		</td></tr>
        </uniflow:m_table>
<html:hidden property="currentPage"/>
<html:hidden property="pagesCount"/>
<html:hidden property="countOfPage"/>
<html:hidden property="requestPage"/>
<html:hidden property="orderBy"/>
<html:hidden property="operation"/>
<html:hidden property="ascending"/>
<html:hidden property="categoryview" value="<%=category%>"/>
<html:hidden property="state" value="<%=state%>"/>
<html:hidden property="agentid" value="<%=agentid%>"/>
<html:hidden property="filter"/>
</div>
</uniflow:m_form>
</uniflow:m_body>
</html:html>