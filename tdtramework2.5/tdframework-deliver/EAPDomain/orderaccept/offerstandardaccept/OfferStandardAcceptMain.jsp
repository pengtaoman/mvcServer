<%/* JSP�����Ҫ������Ϣ
			 **************************************************************
			 * ������	: OfferStandardAcceptMain.jsp
			 * ��������: 2012-02-18
			 * ����		:Shaochy
			 * ģ��		: ������������
			 * ����		: �����׼���ײ�
			 * ��ע		: 
			 * ------------------------------------------------------------
			 * �޸���ʷ
			 * ���		����		�޸���			�޸�ԭ��
			 * 1
			 * 2
			 **************************************************************
			 */

			%>
<%@ page contentType="text/html; charset=GBK"%>
<%String webpath = request.getContextPath();
%>
<html>
	<head>
		<title>
			�����׼���ײ�����
		</title>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<meta http-equiv="MSThemeCompatible" content="no" />
		<!-- ��ֹ���� headers -->
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="Expires" content="-1" />
		<meta http-equiv="Cache-Control" content="no-cache" />
		<!-- end ��ֹ���� headers -->
		<link rel="stylesheet" href="<%=webpath%>/common/css/td_style.css" type="text/css" />
	</head>
	<frameset framespacing="0" frameborder="no" rows="130,*,0">
		<frame name="Head" scrolling="auto" src="<%=webpath%>/OfferStandardAcceptAction.do?method=doInitQuery" noresize="noresize"/>
		<frame name="Content" scrolling="auto" src="" />
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