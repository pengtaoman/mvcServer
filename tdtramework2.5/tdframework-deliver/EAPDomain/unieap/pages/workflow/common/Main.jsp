<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<html>
<head>
<script language="JavaScript">
function closeWindow(){
  top.opener=null;
  top.close();
}
function logout(){
   location.href = "<%=request.getContextPath()%>/logout.do";
}
</script>
</head>
<frameset rows="68,2,*" frameborder="NO" framespacing="0" border="0">
  <frame id="title" name="title" src="<%=request.getContextPath()%>/title.do" noresize scrolling="NO" marginwidth=0 marginheight=0>
  <frame id="horizontal_seprator" name="horizontal_seprator" noresize scrolling="no" src="<%=request.getContextPath()%>/unieap/pages/workflow/common/horizontal_seprator.jsp">
  <frameset cols="195,5,*"frameborder="NO" framespacing="0" border="0">
     <frame id="list" name="list" src="<%=request.getContextPath()%>/unieap/pages/workflow/common/MainMenuTree.jsp" noresize scrolling="no" marginwidth=5 marginheight=10>
	 <frame id="vertical_seprator" name="vertical_seprator" noresize scrolling="no" src="<%=request.getContextPath()%>/unieap/pages/workflow/common/vertical_seprator.jsp">
     <frame id="page" name="page" src="<%=WorkflowManager.getWorkflowPath()%>/common/page.jsp" noresize scrolling="YES" marginwidth=0 marginheight=0>
  </frameset>  
</frameset>
</html>