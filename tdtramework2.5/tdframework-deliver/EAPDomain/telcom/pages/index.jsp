<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>

<%
String apppath=EAPConfigHelper.getApplicationContextPath(request);
%>
<html>
<head>
<title>样例</title>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<% 
String[] prefixes = EAPConfigHelper.getAvailableApplicationNames();
if(prefixes!=null && prefixes.length==1){
	%>
<script type="text/javascript">
	dojo.addOnLoad(function(){
		if(unieap.cache.isAvailable()){
			unieap.Action.loadCacheData("check"); //加载所有的codelist
		}
	});
</script>
<% }%>
</head>
<body class="unieap" style="border-width:0px;margin:0px;padding:0px;overflow:hidden">
<iframe id="mianFrame" width=100% height="100%" marginheight="0"  marginwidth="0px" scrolling="no" frameborder="0" src="<%=apppath%>/pages/mianFrame.jsp"></iframe>
</body>

</html>