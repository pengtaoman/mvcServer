<%@ page contentType="text/html; charset=gb2312" %>

<%
    String url=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+ request.getContextPath()+"/";
%>

<html>
<body>

<script>
alert("���ӳ�ʱ, �����µ�½!");
top.location="<%=url%>";
</script>

</BODY>

</html>