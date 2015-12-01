<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<script type="text/javascript" src="test.js"></script>
</head>

<body class="unieap">
	<script type="text/javascript">
		var title = '<%=request.getParameter("title")%>';
		alert(title);
	</script>
	<div dojoType="unieap.form.Button" label="test" id="test" onClick="click"></div>
</body>
</html>