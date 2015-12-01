<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
<title>流程模板</title>
<jsp:include
		page="/unieap/pages/workflow/stylesheet/style2009/3levelMenuShared.jsp"></jsp:include>
</head>

<body>
<table width="100%" height="100%">
 <tr>
 <td width="180">
 <jsp:include page="categoryManager.jsp"/>
 </td>
<td>
<iframe  width=100% height=100% id="right" scrolling="auto" frameBorder="no" style="border:0px;"  src="<%=request.getContextPath()%>/unieap/pages/workflow/stylesheet/style2009/BlankPage.jsp" name="categoryResource"></iframe>
</td>
</tr>
</table>
</body>
</html>