<%
	 /* 
	 **************************************************************
	 * ������		: CustRecognitionMain.jsp
	 * ��������  	: 2011��05��24��
	 * ����		: liurong@neusoft.com
	 * ģ��		: �ͻ�ʶ��
	 * ����		: 
	 * ��ע		: 
	 * ------------------------------------------------------------
	 * �޸���ʷ
	 * ���		����		�޸���	�޸�ԭ��
	 * 1
	 * 2
	 **************************************************************
	 */
%>
<%@ page language="java" pageEncoding="GBK"%>
<%
String webPath = request.getContextPath();
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<meta http-equiv="MSThemeCompatible" content="no" />
		<title>�ͻ�ʶ��</title>
	</head>
	<frameset name="CustRecognitionMain" framespacing="0" frameborder="no" rows="*,0,0">
		<frame name="CustRecognitionContent" scrolling="auto"
			src="<%=webPath%>/ordermgr/newCustRecognitionAction.do?method=doInit&flag=1"
			noresize="noresize" />
		<frame name="Contentlist" scrolling="auto" src="" />
		<frame name="hidden" scrolling="auto" src="" />
		<noframes>
			<body>
				<p>
					����ҳʹ���˿�ܣ��������������֧�ֿ�ܡ�
				</p>
			</body>
		</noframes>
	</frameset>

</html>
