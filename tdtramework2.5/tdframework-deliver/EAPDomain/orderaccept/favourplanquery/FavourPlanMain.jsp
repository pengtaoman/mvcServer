<%@ page contentType="text/html; charset=GBK" %>

<%/* 
   **************************************************************
   * ������ : ChangeUserMain.jsp
   * ��������: 2006-8-8
   * ���� :  zhangzhenzhong@neusoft.com
   * ģ�� : �ͻ��Ӵ���ҵ����������
   * ���� : ��һ����ܣ������ϣ��У���������
   * ��ע : �ڿ����ʾʱ��ChangeUserHead.jspҳ�潫����ʾ��F_HeadFra��
   * ------------------------------------------------------------
   * �޸���ʷ
   * ��� ���� �޸��� �޸�ԭ��
   * 1
   * 2
   **************************************************************
   */%>
<%
	String webPath=request.getContextPath();
%>
<html>
<head>
	<title>�Żݼƻ������</title>
	<meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>
<frameset rows="120,*,0" frameborder="NO" border="0" framespacing="0">
  <frame name="F_HeadFra" scrolling="NO" noresize src="<%=webPath%>/favourPlanQueryAction.do?method=favourPlanQueryInit" />
  <frame name="F_BodyFra"  noresize src=""/>
  <frame name="F_BottomFra"  noresize src=""/>
</frameset>
<noframes>
<body bgcolor="#FFFFFF" text="#000000">
</body>
</noframes>
</html>
