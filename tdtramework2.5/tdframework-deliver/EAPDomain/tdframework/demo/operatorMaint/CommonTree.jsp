<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>

<%
	String webpath = request.getContextPath();
%>

<html>
<head>

<title>权限信息</title>

<script  language=javascript src="<%=webpath%>/unieap/js/Globals.js"> </script>
<script  language=javascript src="<%=webpath%>/unieap/js/treehandle.js"> </script>
<script  language=javascript src="<%=webpath%>/unieap/js/Common.js"> </script>
<script  language=javascript src="<%=webpath%>/unieap/js/treeAPI.js"> </script>   
<script  language=javascript src="<%=webpath%>/common/js/tree/fw_menu.js"></script>
<script  language=javascript src="<%=webpath%>/common/js/tree/fw_menuEvent.js"> </script>

<script language="javascript">
</script>
   
<style>
.TreeNode {
	padding:0px;
	margin:0px;
}
.TreeNode img { 
	border:0px
}
.TreeNode a:link {COLOR: Black; TEXT-DECORATION: none}
.TreeNode a:hover {COLOR: Yellow!important; TEXT-DECORATION: underline}
.TreeNode a:visited {COLOR: Black; TEXT-DECORATION: none}
.TreeNode a:active {COLOR: Green; TEXT-DECORATION: none}
</style>

</head>
<body onunload="removetreefromsession()">
	<form>
		<unieap:tree tree='eap' includeRootNode="true" readOnly="true" needCheckBox="true" textClass="TreeNode" checkboxLogical="1"/>
	</form>
</body>
</html>