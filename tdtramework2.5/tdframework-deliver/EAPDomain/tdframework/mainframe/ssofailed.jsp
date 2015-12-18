<%@ page contentType="text/html; charset=GBK" %>
<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<%
String message = NullProcessUtil.nvlToString((String) request.getAttribute("alertMsg"),"");
String path=EAPConfigHelper.getContextPath(request);
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<title>电信BSS系统</title>
<style type="text/css">
<!--
<!--
#image {
	position: absolute;
	width:427px;
	height:118px;
	left:50%;
	top:50%;
	margin-left:-213px;
	margin-top:-100px;
	background-image: url(<%=path%>/tdframework/mainframe/images/alert01.gif);
	background-repeat: no-repeat;
	font-size: 22px;
	font-weight: bold;
	color: #c00c00;
	font-style: italic;
	padding-top: 45px;
	padding-left: 25px;
}
-->
-->
</style>
<script type="text/javascript">
<!--
function init(){
	//alert("<%=message%>");
}
//-->
</script>
</head>

<body >
<div id="image" ><%=message%></div>
</body>
</html>

