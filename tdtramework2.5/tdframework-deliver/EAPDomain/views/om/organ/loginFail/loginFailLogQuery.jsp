
<%
	 /* JSP�����Ҫ������Ϣ
	 **************************************************************
	 * ������		: loginFailLogQuery.jsp
	 * ��������	: 2010-08-14
	 * ����		: jianglinhao
	 * ģ��		: ��½ʧ����־��ѯ
	 * ����		: ��½ʧ����־��ѯ��ҳ��
	 * ��ע		: 
	 * ------------------------------------------------------------
	 * �޸���ʷ
	 * ���		����		�޸���	�޸�ԭ��
	 * 1   
	 * 2
	 **************************************************************
	 */
%>

<%@ page language="java" contentType="text/html;charset=gb2312"%>
<%
String path = request.getContextPath();
%>
<%
	String logLocation = path + "/views/om/organ/loginFail/loginFailLogQueryTop.jsp";
	String blank = path + "/views/om/blank.html";
%>
<html>
	<head>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="content-type" content="text/html; charset=gb2312">
		<title></title>
	</head>
	<frameset framespacing="1" frameborder="0" rows="20%,*"
		id="mainFrameset" noresize>
		<frame name="logquerybanner" scrolling="no" src="<%=logLocation%>"
			noresize>
		<frame name="logquerybottom" src="<%=blank%>" noresize="noresize">
	</frameset>
	<noframes>
		<body>
			<p>
				����ҳʹ���˿�ܣ��������������֧�ֿ�ܡ�
			</p>
		</body>
	</noframes>
</html>