<%@ page language="java" contentType="text/html;charset=GBK" %>
<%@ page import="java.util.HashMap" %>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>

<%
	String webapp=request.getContextPath();
	System.out.println(pageContext.getPage().getClass().getName());
	pageContext.setAttribute("ecid","list1");

	//TestVO vo=new TestVO();
	//vo.setName("����");
	//vo.setNo(123);

	HashMap map1=new HashMap();
	map1.put("t1","����1111����");
	map1.put("t2","����2222����");


	HashMap map2=new HashMap();
	map2.put("t3","���Թ���3333");
	map2.put("t4","����4444����");
	map2.put("t5","����5555����");

	request.setAttribute("testMAP1",map1);
	request.setAttribute("testMAP2",map2);
%>
<html>

<head>
<title>Ԥ��ѯeXtremeTest</title>

<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<meta http-equiv="MSThemeCompatible" content="no" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="-1" />
<meta http-equiv="Cache-Control" content="no-cache" />

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/common/css/td_style_ec.css" />

<style type="text/css">
body {
	font-size:12px;
}
</style>

<script language="JavaScript">
function init(){
}
</script>

</head>

<body style="margin:25px;" onload="init();">
	<form>
		<ec:form beans="testMAP2,testMAP1" scopes="request">
			���: <input type="text" name="no" /><br />
			����: <input type="text" name="name" /><br />
			t1: <input type="text" name="t1" /><br />
			t2: <input type="text" name="t2" /><br />
			<select name="t3">
				<option value="3333���Թ���">3333���Թ��� #1</option>
				<option value="���Թ���3333">���Թ���3333 #2</option>
				<option value="����3333����">����3333���� #3</option>
			</select>

		</ec:form>
	</form>
</body>
</html>