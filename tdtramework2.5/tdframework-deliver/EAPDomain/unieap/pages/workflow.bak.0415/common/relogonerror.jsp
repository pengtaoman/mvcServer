<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html" %>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<% response.setStatus(403); %>
<html>
<head>
<title>Access Forbidden</title>
<script language="JavaScript">
var rootPage = null;
var reloginURL = "<%=request.getContextPath()%>/unieap/pages/workflow/welcome.jsp";

function onload()
{
  alert("<bean:message bundle="uniflow" key="workflow.relogon"/>");
  relogon();
}

function getRootOpener()
{
	var result = null;
	var test = window;
	while(test!=null)
	{
		result = test;
		test = test.opener;
	}
	if(result == window) result = null;
	else if(result.top!=null) result = result.top;
	return result;
}

function relogon(){

 	 rootPage = getRootOpener();
 	 if(rootPage==null) rootPage = window.top;
	
	if(rootPage != null) rootPage.location.href = reloginURL;
	else
	{
		window.open(reloginURL);
	}
	if(window.opener!=null)
	{
		window.opener = null;
		window.close();
	}
}
</script>
</head>
<body bgcolor="#ffffff" onload="javascript:onload()">
</body>
</html>
