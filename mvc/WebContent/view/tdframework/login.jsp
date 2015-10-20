<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html>

<head>

<%
    String contextPath = request.getContextPath();
%>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>metisMenu</title>

<link rel="stylesheet" type="stylesheet" media="screen"
	href="<%=contextPath%>/resources/bootstrap3.3.5/css/bootstrap.css">

<link rel="stylesheet" type="stylesheet" media="screen"
	href="<%=contextPath%>/resources/tdframework/signin.css">
<script src="<%=contextPath%>/resources/jquery/jquery-1.11.3.min.js"></script>
<script
	src="<%=contextPath%>/resources/bootstrap3.3.5/js/bootstrap.min.js"></script>
</head>

<body>
	<div class="navbar-wrapper">
		<div class="container-fluid">
			<tiles:insertAttribute name="header" />
			<tiles:insertAtdtribute name="body" />

		</div>

		<tiles:insertAttribute name="footer" />
</body>

</html>