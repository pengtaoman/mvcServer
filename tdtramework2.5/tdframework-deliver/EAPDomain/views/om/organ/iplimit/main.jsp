<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%
  String webpath = request.getContextPath();
  String query = webpath+"/views/om/organ/iplimit/Query.jsp";
  String blank = webpath+"/om/ipLimitAction.do?method=query";
%>
<html>

	<head>
		<title>��¼ipά��</title>
		<meta http-equiv="Content-Type" content="text/html; charset=gbk">
	</head>
	<FRAMESET rows="70,*,0" frameborder="NO" border="0" framespacing="0">
			<frame src="<%=query%>" name="query" scrolling="no" noresize="noresize" />
			<frame src="<%=blank%>" name="list"   scrolling="auto" noresize="noresize" />
	</FRAMESET> 
	<noframes>
		<body>
			<p>
				����ҳʹ���˿�ܣ��������������֧�ֿ�ܡ�
			</p>
		</body>
	</noframes>
</html>	