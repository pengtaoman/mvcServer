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
function redispach_onclick(){
       appMgrForm.operation.value = "redispachmsg";  
       appMgrForm.submit(); 
}
function ignore_onclick(){
       appMgrForm.operation.value = "ignorepass";  
       appMgrForm.submit();
}
function select_onclick(){ 
   itemChanged(); 
   appMgrForm.submit();  
}
function itemChanged()
{
  var rb,checkedItem;
  if(document.forms[0].selectedItem){
    if(document.forms[0].selectedItem.length)
	for (i = 0; document.forms[0].selectedItem.length>i; i++) {
	  rb = document.forms[0].selectedItem[i];
	  if (rb.checked) {
	    checkedItem = rb;
	  }
	}
    else
	  checkedItem = document.forms[0].selectedItem;
      if (checkedItem&&checkedItem.checked) {
          if(appMgrForm.selecttype.value=="error"){
	         enableButton("redispach");
	         enableButton("ignore");
	      }else{
	         disableButton("redispach");
             disableButton("ignore");
	      }
      }
  }else{
    disableButton("redispach");
    disableButton("ignore");
  }
  findSelectedItem();
}

function ifoperate(){   
      var select = getSelectedItemID();
      var temp = select.indexOf("#");
      var state = select.substring(temp+1,temp+2);
      if (state!="1")
         return false;
      return true;
}
function reload()
{
  location.href = "appmgr.do";
}
function refresh()
{
  location.href = "appmgr.do";
}

function detail_onclick(){  
      var select = getSelectedItemID();
	  var flag = select.indexOf("#");
	  var id = select.substring(0,flag);  
	  var openURL = "<%=request.getContextPath()%>/detail.do?autoActID="+id;  
	  var width = 520;
	  var height = 480;
	  open_scrollable_window(openURL,width,height);
}
</script>
</head>
<uniflow:m_body onload="javascript:itemChanged()">
<uniflow:m_form action="appmgr.do">
   <uniflow:m_table style="main_title_table">
	 <tr><td align="right" valign="middle" class="main_table2_td2">
		<table height="28" border="0" cellpadding="0" cellspacing="0"class="main_label_table">
           <tr><td height="25" valign="middle" nowrap class="main_label_td">
              <html:select name="appMgrForm" property="selecttype" onchange="javascript:select_onclick()" 
                     style="font-family: Verdana, Arial, '宋体';font-size: 12px; color: #000000;">
                  <html:option value=""/>
	              <html:options collection="selectinfo"  property="value" labelProperty="label"/>
			  </html:select>
			  </td>
			  <td>
                  <uniflow:commonbutton customization="false"/>
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
  <logic:iterate id="applist"  name="appMgrForm" property="list" type="com.neusoft.uniflow.api.mgmt.NWRunTimeApplication" indexId="index">
    <uniflow:m_list_tr row="<%=index.intValue()%>">
	<td width="25" align="center" valign="middle" class="main_list_td">
	<html:radio property="selectedItem" value="<%=applist.getActInstID()+String.valueOf('#')+String.valueOf(applist.getActState())+String.valueOf('#')+applist.getAppHost()%>" onclick="javascript:itemChanged()"/></td>
	<td valign="middle" class="main_list_td"><bean:write name="applist" property="actName"/>&nbsp;</td>
	<td valign="middle" class="main_list_td"><bean:write name="applist" property="appName"/>&nbsp;</td>
	<td valign="middle" class="main_list_td"><bean:write name="applist" property="appDesc"/>&nbsp;</td>
	<td valign="middle" class="main_list_td"><a href="javascript:detail_onclick()" ><bean:message bundle="uniflow" key="workflow.view"/></a> </td>
    </uniflow:m_list_tr>
  </logic:iterate>
	</uniflow:m_table>
	<uniflow:m_table style="main_button">
	<tr><td>
 <uniflow:pageCtr 
      curPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm)request.getAttribute("appMgrForm")).getCurrentPage()%>' 
      maxPage='<%=((com.neusoft.uniflow.web.common.list.OpenListForm)request.getAttribute("appMgrForm")).getPagesCount()%>' 
      total ='<%=((com.neusoft.uniflow.web.common.list.OpenListForm)request.getAttribute("appMgrForm")).getTotal()%>'
   />
		</td><td align="right" >
		 <uniflow:m_button_table>
				 <uniflow:button id="redispach" action="javascript:redispach_onclick()" name="button.dispatch"/>
	             <uniflow:button id="ignore" action="javascript:ignore_onclick()"name="button.ignore"/>
		    </uniflow:m_button_table>
		    </td></tr>
            </uniflow:m_table>
<html:hidden property="currentPage"/>
<html:hidden property="pagesCount"/>
<html:hidden property="countOfPage"/>
<html:hidden property="requestPage"/>
<html:hidden property="orderBy"/>
<html:hidden property="ascending"/>
<html:hidden property="operation"/>
</uniflow:m_form>

</uniflow:m_body>

</html:html>