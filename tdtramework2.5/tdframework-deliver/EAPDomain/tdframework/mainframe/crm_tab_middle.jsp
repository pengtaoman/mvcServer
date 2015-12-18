<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="com.neusoft.tdframework.authorization.*" %>
<%@ page import="com.neusoft.tdframework.common.GlobalParameters" %>
<%@ page import="com.neusoft.tdframework.portal.config.TDConfigHelper" %>
<%@ page import="com.neusoft.tdframework.common.util.DESUtil" %>
<%
//left.jsp
    boolean basLog = TDConfigHelper.isBasLogPermitted();
AuthorizeVO authorizeVO = (AuthorizeVO)session.getAttribute(GlobalParameters.SESSION_INFO);
String userName = authorizeVO.getWorkNo();
StringBuffer paramStr = new StringBuffer();
String passWord = (String)request.getSession(true).getAttribute("decodedPass");
String d_flag = (String)session.getAttribute("double_flag");
String endpassword = DESUtil.encrypt(passWord);
paramStr.append("'STAFFNO=").append(userName).append("&PASSWORD=").append(endpassword).append("&double_flag=").append(d_flag).append("'");
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>Tab样例</title>

		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<contextPath value="<%=path%>"/>
		<link href="<%=path%>/common/dx20/css/crm6_tab.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path%>/tdframework/mainframe/js/crm_tab_middle.js"></script>
		<script type="text/javascript" src="<%=path%>/tdframework/mainframe/js/crm_menuNavigation_middle.js"></script>
		<script>
		dojo.require("unieap.tdextend.layout.crm_TabContainer_middle");
		</script>
		
	</head>
	<body class="unieap">
	<input type="hidden" id="warningSearchMenu" value='请输入搜索内容'>
						<div tabPosition="right-h" >
								<div id='getTabButton'>
								</div>
							</div>
						</div>
	</body>
</html>
