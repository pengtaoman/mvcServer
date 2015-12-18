<%@ page contentType="text/html; charset=gb2312" %>

<%
    String url=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+ request.getContextPath()+"/";
%>

<html>
<body>

<script>
alert("连接超时, 请重新登陆!");
top.location="<%=url%>";
</script>

</BODY>

</html>