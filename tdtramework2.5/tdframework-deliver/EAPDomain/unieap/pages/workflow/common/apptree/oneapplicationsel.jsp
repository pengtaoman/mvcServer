<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.common.trees.beans.ApplicationListTree"%>
<%@ page import="java.util.Vector"%>
<%@ page import="com.neusoft.uniflow.web.common.trees.beans.NWListLeaf"%>
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
  	 parent.location.href = "<%=request.getContextPath()%>/"+url;
     //parent.page.location.href = "<%=request.getContextPath()%>/"+url;
     //parent.list.location.href = "<%=request.getContextPath()%>/listtree.do";
  }
}
</SCRIPT>
</head>
<BODY>
<script language="JavaScript">

		ListTree = new ListTree('ListTree','<%=request.getContextPath()%>');
		ListTree.add(0,-1,'应用程序授权树');
		<%int num=1;
		ApplicationListTree listTree=(ApplicationListTree)request.getAttribute("listtree");
		Vector FormApplication =listTree.getFormApplication();
	 	Vector URLApplication = listTree.getURLApplication();
	 	Vector PageFlowApplication =listTree.getPageFlowApplication();
	 	NWListLeaf applicationLeaf;
		%>
        ListTree.add(1,0,'表单','#','表单','','',''); 
        <%for(int i=0;i<FormApplication.size();i++)
        {
        	 applicationLeaf=(NWListLeaf)FormApplication.get(i);
        	 applicationLeaf.getAction();
        	 
        %>
        ListTree.add(<%=++num%>,1,'<%=applicationLeaf.getName()%>','<%=applicationLeaf.getAction()%>','<%=applicationLeaf.getName()%>','','','');
        <%}%>
        
        ListTree.add(<%=++num%>,0,'页面流','#','页面流','','',''); 
        <% int pageNum=num;
        for(int i=0;i<PageFlowApplication.size();i++)
        {
        	 applicationLeaf=(NWListLeaf)PageFlowApplication.get(i);
        	 applicationLeaf.getAction();
        	 
        	 
        %>
        ListTree.add(<%=++num%>,<%=pageNum%>,'<%=applicationLeaf.getName()%>','<%=applicationLeaf.getAction()%>','<%=applicationLeaf.getName()%>','','','');
        <%}%>
        
        ListTree.add(<%=++num%>,0,'URL','#','URL','','',''); 
        <%	int urlNum=num;
        for(int i=0;i<URLApplication.size();i++)
        {
        	 applicationLeaf=(NWListLeaf)URLApplication.get(i);
        	 applicationLeaf.getAction();
        	 
        %>
        ListTree.add(<%=++num%>,<%=urlNum%>,'<%=applicationLeaf.getName()%>','<%=applicationLeaf.getAction()%>','<%=applicationLeaf.getName()%>','','','');
        <%}%>
		document.write(ListTree);
</script>
</body>
</html>
