<%@ page contentType="text/html; charset=GBK" language="java"
	isELIgnored="false"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%
	String webpath = request.getContextPath();
	String custOrderId = NullProcessUtil.nvlToString(request.getAttribute("custOrderId"),"");
%>

<html>
	<head>
		<title>�ĵ��������ҳ��</title>
		<link href="<%=webpath%>/common/css/td_style_ec.css" rel=stylesheet>
		<link rel="stylesheet" href="<%=webpath%>/common/css/td_style_new.css"
			type="text/css" />
		<link rel="stylesheet"
			href="<%=webpath%>/custcontact/orderaccept/budget/css/budget.css"
			type="text/css" />
		<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"></script>
		<script language=javascript src="<%=webpath%>/unieap/js/Common.js"></script>
		<script language="javascript"
			src="<%=webpath%>/common/js/td_common.js"></script>
		<script language="javascript"
			src="<%=webpath%>/custcontact/common/js/td_operation.js"></script>
		<script language="javascript"
			src="<%=webpath%>/custcontact/common/businessmodule/base/Common.js"></script>
		<script language="javascript"
			src="<%=webpath%>/custcontact/orderaccept/base/jscu/Jscu.js"></script> 
		<!--  ��Ƭjs  -->
		<script type="text/javascript"
			src="<%=webpath%>/buscard/common/js/buscard_2.0.js"></script>	
		<script language="javascript"
			src="<%=webpath%>/custcontact/orderaccept/orderquery/js/CustOrderList.js"></script>
		<script language="javascript"
			src="<%=webpath%>/orderaccept/orderchange/js/ToCompleteOrder.js"></script>
		<script language="javascript"
			src="<%=webpath%>/custcontact/orderaccept/budget/js/BudgetComponent.js"></script>
	</head>
	<body class="mainBody">
		<center>
			<div id="custOrderListDiv">
				<%@ include	file="/custcontact/orderaccept/orderquery/CustOrderList.jsp"%>
			</div>
			<div id="budgetPage"></div>
			<br>
			<div id="buttonDiv">
				<input type="hidden" name="custOrderId" id="custOrderId" value="<%=custOrderId%>">
				<input type="button" id="printBtn" class="formButton"  value = "�����ӡ"/>
				<input type="button" id="submitBtn" class="formButton" value = "�������"/>
				<input type="button" id="chargeBtn" class="formButton" value = "�ɷ�"/>	
				<input type="button" class="formButton" id="closePageBtn" name="closePageBtn" value="�ر�" />
			</div>
		</center>
	</body>
</html>
