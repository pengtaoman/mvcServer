<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String message = (String)request.getAttribute("Message");
String titleMessage = "";
String bodyMessage = "";
if("one".equals(message))
{
	titleMessage = "���ܽ�ɫ��Ȩ";
	bodyMessage = "��ѡ�����Ȩ�����ڹ��ţ����ܽ��й��ܸ�Ȩ������"+"����ʡ�ݹ���Ա��ϵ��";
}
else if("two".equals(message))
{
	titleMessage = "������ɫ��Ȩ";
	bodyMessage = "��ѡ�����Ȩ�����ڹ��ţ����ܽ������ݸ�Ȩ������"+"����ʡ�ݹ���Ա��ϵ��";
}
else if("three".equals(message))
{
	titleMessage = "����Ȩ����Ϣ";
	bodyMessage = "��ѡ�����Ȩ�����ڹ��ţ����ܽ��й���Ȩ��΢��������"+"����ʡ�ݹ���Ա��ϵ��";
}
else if("four".equals(message))
{
	titleMessage = "����Ȩ����Ϣ";
	bodyMessage = "��ѡ�����Ȩ�����ڹ��ţ����ܽ�������Ȩ��΢��������"+"����ʡ�ݹ���Ա��ϵ��";
}
else if("five".equals(message))
{
	titleMessage = "ȡ��΢��ҳ��";
	bodyMessage = "��ѡ�����Ȩ�����ڹ��ţ����ܽ���ȡ��΢��������"+"����ʡ�ݹ���Ա��ϵ��";
}
else{
	titleMessage = "error page";
	bodyMessage = "ERROR PAGE";
}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <title><%=titleMessage %></title>
  </head>
  <body>
  	<p><font align = "center"><%=bodyMessage %></font></p>
  </body>
</html>
