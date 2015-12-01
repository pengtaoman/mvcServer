<%
/* 
JSP�����Ҫ������Ϣ
 **************************************************************
 * ������	: CustInfoMgtHead.jsp
 * ��������: 2012-02-18
 * ����		: Shaochy
 * ģ��		: ������������
 * ����		: �����׼���ײ�
 * ��ע		: 
 * ------------------------------------------------------------
 * �޸���ʷ
 * ���		����		�޸���	�޸�ԭ��
 * 1
 * 2
 */
%>
<%@ page contentType="text/html; charset=GBK" language="java" isELIgnored="false"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%
	String webpath = request.getContextPath();
	String strServingStatus = (String) request.getAttribute("strServingStatus");
	String strQueryMethod = (String) request.getAttribute("strQueryMethod");
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<contextPath value="<%=webpath%>" />
		<applyEvent value="${param.applyEvent}" />
		<title>ҵ������б�</title>
		<!-- ����css  -->
		<link href="<%=webpath%>/common/css/td_style_ec.css" rel=stylesheet>
		<link href="<%=webpath%>/common/css/td_style.css" rel="stylesheet" type="text/css">
		<!-- ����js  -->
		<script language="javascript" src="<%=webpath%>/common/js/td_common.js"></script>
		<script language=javascript src="<%=webpath%>/common/js/eccn.js"></script>
		<script language=javascript src="<%=webpath%>/unieap/js/Globals.js"></script>
		<script language=javascript src="<%=webpath%>/unieap/js/Common.js"></script>
		<script language="javascript"
			src="<%=webpath%>/common/js/waitingbar.js"></script>
		<script language="javascript"
			src="<%=webpath%>/custcontact/common/js/prototype_mini.js"></script>
		<script language="javascript"
			src="<%=webpath%>/custcontact/common/js/commonPattern.js"></script>
		<script language="javascript"
			src="<%=webpath%>/custcontact/common/js/common_import_script.js"></script>
		<script language="javascript"
			src="<%=webpath%>/orderaccept/offerstandardaccept/js/OfferStandardAcceptMiddle.js"></script>

	</head>
	<body class="mainBody" onload="init();">
		<input type="hidden" name="strServingStatus" id="strServingStatus"
			value="<%=strServingStatus%>">
		<input type="hidden" name="strQueryMethod" id="strQueryMethod"
			value="<%=strQueryMethod%>">

		<ec:table items="optrs" var="pre" 
			action="${pageContext.request.contextPath}/OfferStandardAcceptAction.do?method=getCustomerInfoList">
			<ec:row>
				<ec:column property="custId" title="�ͻ����" >
				<span class="eccolomntext">
				<a href="#" onclick="doCustInfoQuery('${pageScope.pre.custId}');return false;">${pageScope.pre.custId}</a>
				</span>
				</ec:column>
				<ec:column property="custName" title="�ͻ�����" />
				<ec:column property="custNumber" title="�ͻ�ͳһ����" />
				<ec:column property="identityKindDesc" title="֤������" />
				<ec:column property="identityCodeDesc" title="֤������" />
				<ec:column property="customerKindDesc" title="�ͻ����" />
				<ec:column property="customerGradeDesc" title="�ͻ�����" />
				<ec:column property="custAddress" title="�ͻ���ַ" />
			</ec:row>
		</ec:table>
	</body>
</html>