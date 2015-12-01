<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="com.neusoft.uniflow.web.authorization.purview.beans.VersionTree" %>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<html>
<head>
<title></title>
<link rel="stylesheet" type="text/css" href="<%=WorkflowManager.getWorkflowStylePath()%>/style1/actiontree_img/ListTree.css">
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/ProcessTree.js"></script>
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/OpenWin.js"></script>
<SCRIPT language="JavaScript">
function openUrl(url){
  if (url=="#")
     return;
  else    
     open_scrollable_window(url,660,460); 
}

</SCRIPT>
</head>
<BODY>
<script language="JavaScript">

		ProcessTree = new ProcessTree('ProcessTree');
		<% VersionTree ltree; %>
		<% try{%>
		<% ltree = (VersionTree) request.getAttribute("verTree"); %>
		ProcessTree.add(0,-1,'<%=MessageUtil.getString("workflow.authorization.purview.version.tree",request.getSession())%>');
		<% int r=1;%>
		<% for (int i=0;i<ltree.getStubNum();i++){ %>
           	 ProcessTree.add(<%=r%>,0,'<%=ltree.getStubName(i)%>','#','<%=ltree.getStubName(i)%>','','','');
		    <% int t=r;%>
		    <% r++;%>
            <% for (int j=0;j<ltree.getLeafNumFormStub(i);j++){ %>
                 ProcessTree.add(<%=r%>,<%=t%>,'<%=ltree.getLeafNameByStub(i,j)%>','<%=ltree.getLeafIDByStub(i,j)%>','<%=ltree.getLeafNameByStub(i,j)%>','','','');
                 <%r++;%>
            <%}%>
        <%}%> 
              <%}catch (Exception e){%>
              <%session.setAttribute(com.neusoft.uniflow.web.util.SessionManager.ERROR, new com.neusoft.uniflow.web.util.UniException(e)); %>
                   document.location.href = "<%=WorkflowManager.getWorkflowPath()%>/common/error.jsp";
              <%} %>   
		document.write(ProcessTree);
</script>
</body>
</html>