<%@ page contentType="text/html; charset=gb2312"%>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ page import="java.util.*"%>
<%@ page import="com.neusoft.om.dao.loginFail.LoginFailLogQueryVO" %>

<%
	String path = request.getContextPath();
	List list = (ArrayList)request.getAttribute("LogList");
	String str=(String)request.getAttribute("Message")==null?"":(String)request.getAttribute("Message");
%>

<html>
	<head>
		<TITLE>��־��ѯ�����ʾ</TITLE>
		<!-- ��ֹ windows ������ss -->
		<meta http-equiv="MSThemeCompatible" content="no" />
		<!-- ��ֹ���� headers -->
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="Expires" content="-1" />
		<meta http-equiv="Cache-Control" content="no-cache" />
		<link href="<%=path%>/common/css/td_style.css" rel=stylesheet>
		<link href="<%=path%>/common/css/td_style_ec.css" rel=stylesheet>
		<script language=javascript src="<%=path%>/common/js/eccn.js"> </script>
		<script language="javascript">
	var eccn=new ECCN("ec");
	    function load() {
	       eccn.doPrep=false;
		   eccn.doPrepPrev=false;
		   eccn.init();
		   var msg = document.getElementById('message').value;
		   if(msg !=''){
		   		alert(msg);
		   }
		}
	</script>

	</head>

	<body onload="load();">
		<input type="hidden" name="message" id="message" value="<%=str %>"/>
		<%
		if (!list.isEmpty()) {
		%>
		<ec:table var="log" items="LogList"
			pageSizeList="max:100,1,10,20,50,100,1000,all"
			action="loginFailLogQueryAction.do?method=query">
			<ec:row>
				<ec:column property="loginId" title="��¼�˺�"/>
				<ec:column property="ipAddr" title="��¼IP"/>
				<ec:column property="loginDate" title="��¼ʱ��" />
				<ec:column property="delFlag" title="״̬" />
			</ec:row>
		</ec:table>

		<%
		}
		%>
	</body>

</html>