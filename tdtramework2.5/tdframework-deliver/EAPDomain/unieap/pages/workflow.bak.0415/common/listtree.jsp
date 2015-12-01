<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="com.neusoft.uniflow.web.util.CommonInfoManager" %>
<%@ page import="com.neusoft.uniflow.web.common.trees.beans.NWListTree" %>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>

<html>
<head>
<title></title>
<link rel="stylesheet" type="text/css" href="<%=WorkflowManager.getWorkflowStylePath()%>/style1/actiontree_img/ListTree.css">
<script language="JavaScript" src="<%=WorkflowManager.getWorkflowPath()%>/js/ListTree.js"></script>
<SCRIPT language="JavaScript">
function openUrl(url){
  if (url=="#")
     return;
  else{    
     parent.page.location.href = "<%=request.getContextPath()%>/"+url;
     parent.list.location.href = "<%=request.getContextPath()%>/listtree.do";
  }
}
</SCRIPT>
</head>
<BODY>
<script language="JavaScript">

		ListTree = new ListTree('ListTree','<%=request.getContextPath()%>');
		<% NWListTree ltree; %>
		<% try{%>
		<% ltree = (NWListTree)request.getAttribute("listtree"); %>
		<% int r=0;%>
		<% for (int i=0;i<ltree.getStubNum();i++){ %>
           	 ListTree.add(<%=r%>,-1,'<%=ltree.getStubName(i)%>');
		    <% int t=r;%>
		    <% r++;%>
                    <% for (int j=0;j<ltree.getNodeNumFromStub(i);j++){ %>
                      <% if (ltree.getNodeFlagFromStub(i,j).equals("true")){ %>
                           ListTree.add(<%=r%>,<%=t%>,'<%=ltree.getNodeNameFromStub(i,j)%>','#','<%=ltree.getNodeNameFromStub(i,j)%>','','','');
                           <%int m=r;%>
                           <%r++;%>
                           <% for (int k=0;k<ltree.getLeafNumFromStubAndNode(i,j);k++) {%>
                             ListTree.add(<%=r%>,<%=m%>,'<%=ltree.getLeafNameFromStubAndNode(i,j,k)%>','<%=ltree.getLeafActionFromStubAndNode(i,j,k)%>','<%=ltree.getLeafNameFromStubAndNode(i,j,k)%>','','','');
                             <%r++;%>
                           <%}%>  
                      <%}else{%>
                           <% for (int k=0;k<ltree.getLeafNumFromStubAndNode(i,j);k++) {%>
                             ListTree.add(<%=r%>,<%=t%>,'<%=ltree.getLeafNameFromStubAndNode(i,j,k)%>','<%=ltree.getLeafActionFromStubAndNode(i,j,k)%>','<%=ltree.getLeafNameFromStubAndNode(i,j,k)%>','','','');
                             <%r++;%>
                           <%}%>                                              
                      <%}%>
                  <%}%>
              <%}%> 
              <%}catch (Exception e){%>
              <%session.setAttribute(com.neusoft.uniflow.web.util.SessionManager.ERROR, new com.neusoft.uniflow.web.util.UniException(e)); %>
              document.location.href = "<%=WorkflowManager.getWorkflowPath()%>/common/error.jsp";
              <%} %>   
		document.write(ListTree);
</script>
</body>
</html>