<%@ page contentType="text/html; charset=GBK" %>
<%@ page import="java.util.Map" %>
<%@ page import="com.neusoft.tdframework.dao.DataSourceAccessor" %>
<%
String path=request.getContextPath();
%>
<%@page import="java.util.Iterator"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<title>���ݿ����Ӽ��</title>
<style type="text/css">
<!--
td {
	font-size: 12px;
}

.mainList {
width:100%;
border-collapse:collapse;
}

.mainList td{
padding:3px 2px 3px 2px;
border:1px solid #ccccc;

}
-->
</style>


</head>
<body >
δ�رյ����ݿ����� ��Ϣ�б�:<br/>
<table border="0" cellpadding="0" cellspacing="0" class="mainList" >
<tr>

<td>����ʱ��</td>
<td>����DAO</td>
<td>��������</td>
<td>�к�</td>
</tr>
<%
Map cc=DataSourceAccessor.getConnectionHolders();
for (Iterator itor=cc.keySet().iterator();itor.hasNext();){
	String[] info=(String[])cc.get(itor.next());
	if(info!=null){
	out.println("<tr>");
	//out.println("<td>"+info[0]+"</td>");
	out.println("<td>"+info[1]+"</td>");
	out.println("<td>"+info[2]+"</td>");
	out.println("<td>"+info[3]+"</td>");
	out.println("<td>"+info[4]+"</td>");
	out.println("</tr>");
	}
}

if ("true".equals(request.getParameter("clear"))){
cc.clear();
}
%>

</table>
</body>
</html>