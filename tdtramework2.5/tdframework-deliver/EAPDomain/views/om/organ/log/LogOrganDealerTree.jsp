<%/* JSP�����Ҫ������Ϣ
**************************************************************
* ������		: LogOrganDealerTree.jsp
* ��������	: 2006-12-25
* ����		: zhaofan
* ģ��		: ��־��ѯ--��֯����
* ����		: ��־��ѯ��ҳ��
* ��ע		: 
* ------------------------------------------------------------
* �޸���ʷ
* ���		����		�޸���			�޸�ԭ��
* 1   
* 2
**************************************************************
*/
%>

<%@ page language="java" contentType="text/html;charset=gb2312" %>
<%
	String path = request.getContextPath();  
	String organDisplayLocation = path+"/om/OrganDisplayAction.do?OperType=createTree";
	String dealerDisplayLocation = path+"/om/LogQueryAction.do?OperType=showMarketTree";
	String blank = path+"/views/om/blank.html";
%>
<html>
<head>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="content-type" content="text/html; charset=gb2312">
<title></title>
</head>
<frameset framespacing="1" frameborder="0" rows="300,*" id = "treeFrameset">
		<frame name="organTree" scrolling="yes" src="<%=organDisplayLocation%>" scrolling="yes">
		<frame name="dealerTree" scrolling="yes" src="<%=blank%>"scrolling="yes">  	
  	<body>
   		<p>����ҳʹ���˿�ܣ��������������֧�ֿ�ܡ�</p>
  	</body>
  	</noframes>
</frameset>
</html>