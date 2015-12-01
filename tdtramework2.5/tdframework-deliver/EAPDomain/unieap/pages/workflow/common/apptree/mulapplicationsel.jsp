<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.common.trees.beans.MulApplicationListTree"%>
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
  
  	 //alert();
     
  	 parent.application.location.href = "<%=request.getContextPath()%>/"+url;
     //parent.page.location.href = "<%=request.getContextPath()%>/"+url;
     //parent.list.location.href = "<%=request.getContextPath()%>/listtree.do";
  }
}
</SCRIPT>
</head>
<BODY>
<script language="JavaScript">

		ListTree = new ListTree('ListTree','<%=request.getContextPath()%>');
		ListTree.add(0,-1,'应用程序');
		
		//设置表单
		<%int num=1;
		MulApplicationListTree listTree=(MulApplicationListTree)request.getAttribute("listtree");
		Vector FormApplication =listTree.getFormApplication();
		int formSize=FormApplication.size();
	 	NWListLeaf applicationLeaf;
	 	if(formSize>0){
		%>
        ListTree.add(1,0,'表单','#','表单','','',''); 
        <%}
        for(int i=0;i<formSize;i++)
        {
        	 applicationLeaf=(NWListLeaf)FormApplication.get(i);
        %>
        ListTree.add(<%=++num%>,1,'<%=applicationLeaf.getName()%>','<%=applicationLeaf.getAction()%>','<%=applicationLeaf.getName()%>','','','');
        <%}%>
        
        //设置URL
        <%
        int urlId=++num;
		Vector urlApplication =listTree.getURLApplication();
		int urlSize=urlApplication.size();
		if(urlSize>0){
		%>
        ListTree.add(<%=urlId%>,0,'URL','#','URL','','',''); 
        <%}
        for(int i=0;i<urlApplication.size();i++)
        {
        	 applicationLeaf=(NWListLeaf)urlApplication.get(i);
        	 
        %>
        ListTree.add(<%=++num%>,<%=urlId%>,'<%=applicationLeaf.getName()%>','<%=applicationLeaf.getAction()%>','<%=applicationLeaf.getName()%>');
        <%}%>

		document.write(ListTree);
		var firstForm=document.getElementById("sListTree2");
		if(!firstForm)
			document.getElementById("sListTree3");
		firstForm.click();
</script>
</body>
</html>
