<%
  /* 
   **************************************************************
   * ������	: OrderChangeMain.jsp
   * �������� : 2012-06-26
   * ����		: shanpa@neusoft.com
   * ģ��		: �������
   * ����		: �������ҳ������תҳ��
   * ��ע		: 
   * ------------------------------------------------------------
   * �޸���ʷ
   * ���		����		�޸���			�޸�ԭ��
   * 1
   * 2
   **************************************************************
   */
%>
<%@ page language="java" pageEncoding="GBK"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%
	String webPath = request.getContextPath();
	String custOrderId = NullProcessUtil.nvlToString((String)request.getParameter("custOrderId"),"");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<meta http-equiv="MSThemeCompatible" content="no" />
<title>�������</title>
</head>
<frameset rows="*,0,0" frameborder="NO" border="0" framespacing="0">
	<frame name="F_HeadFra" scrolling="No" noresize src="<%=webPath%>/orderChangeAction.do?method=init&custOrderId=<%=custOrderId%>" />
	<frame name="F_BodyFra" noresize src="" />
	<frame name="F_BottomFra" noresize src="" />
</frameset>
<noframes>
<body>
</body>
</noframes>
</html>