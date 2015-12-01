<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
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
    document.location.href = "purview.do";
}
function itemChanged(){ 
    version_info.innerHTML ="<%=MessageUtil.getString("workflow.purview.version.tree",request.getSession())%>";
    var obj = document.getElementById("purviewtree");
    obj.setAttribute("src","<%=request.getContextPath()%>/purviewtree.do?id=null&type=3"); 
    return;
}
function versionTree(){ 

   var type = window.frames["actorsel"].getSelectedType();
   var objid = window.frames["actorsel"].getSelectedID();
   var objname = window.frames["actorsel"].getSelectedName();
   
   if(objid==""){
        version_info.innerHTML ="";
    	warning_info.innerHTML ="<%=MessageUtil.getString("workflow.workitem.operation.adhoc.choice.checked",request.getSession())%>";
    	return;
   }else {
        warning_info.innerHTML="";
    	version_info.innerHTML ="<%=MessageUtil.getString("workflow.purview.version.tree",request.getSession())%>"+"--["+objname+"]";
   }
   if (type=="0"){
       var obj = document.getElementById("purviewtree");
       obj.setAttribute("src","<%=request.getContextPath()%>/purviewtree.do?id="+objid+"&type=0");
   }else if (type=="1"){
       var obj = document.getElementById("purviewtree");
       obj.setAttribute("src","<%=request.getContextPath()%>/purviewtree.do?id="+objid+"&type=1"); 
   }

}

</script>
</head>

<uniflow:m_body onload="javascript:itemChanged()">
<uniflow:m_form action="purview.do">
 <uniflow:m_table style="main_title_table">
  <tr><td align="left" valign="middle" class="text_title">
  <span id="version_info" class="text_title">&nbsp;</span>
  <uniflow:p_warning>
    <html:errors/>
  </uniflow:p_warning></td>
    <td align="right" valign="middle" class="main_table2_td2"><table height="28" border="0" cellpadding="0"cellspacing="0"class="main_label_table">
      <tr>
      <uniflow:monitor_action id="procdef" src="procinst.gif" action="javascript:versionTree()" alt='<%=MessageUtil.getString("workflow.alt.purview.see.tree",session)%>'/>
      <uniflow:monitor_action id="refresh" src="refresh.gif" action="javascript:refresh()" alt='<%=MessageUtil.getString("workflow.alt.purview.refresh.tree",session)%>'/>
      </tr>
    </table></td>
  </tr>
</uniflow:m_table>
   <uniflow:m_table style="main_list">
   <tr>
   <td valign="middle" class="main_list_td" width="200" height="600">
	  <iframe scrolling="yes" id="actorsel" width="250" height="580" frameborder="0" src="oneactorsel.do?selType=1"></iframe>
   </td>
	<td class="main_label_td" valign="top" nowrap>
	  <iframe scrolling="yes" id="purviewtree" width="100%" height="100%" frameborder="0" src="#"></iframe>
	</td>
   </tr> 
   </uniflow:m_table>
</uniflow:m_form>	
</uniflow:m_body>
</html:html>