<%
	/* 
	 **************************************************************
	 * ������		: CustomerInfoBus.jsp
	 * ��������  	: 2010��11��05��
	 * ����		: maomq
	 * ģ��		: �ʻ���Ϣ����
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
<%@ page contentType="text/html; charset=GBK" language="java"
	pageEncoding="GBK"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="cc"%>
<%
	String webPath = request.getContextPath();
	String customerXml = NullProcessUtil.nvlToString(request.getAttribute("customerXml"),"");
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<meta http-equiv="pragma" content="no-cache" />
		<meta http-equiv="cache-control" content="no-cache" />
		<meta http-equiv="expires" content="0" />
		<title>�ʻ���Ϣ����</title>
		<context path="<%=webPath%>" />
		<contextPath value="<%=webPath%>" />
		<path value="<%=webPath%>" />
		<parameter webPath="<%=webPath%>" page="AccountInfoContent" />
		<!-- ����css -->
		<link rel="stylesheet" href="<%=webPath%>/common/css/td_style.css"
			type="text/css" />
		<link rel="stylesheet" type="text/css"
			href="<%=webPath%>/custcontact/orderaccept/common/css/style.css" />

		<script language="javascript"
			src="<%=webPath%>/custcontact/common/businessmodule/scriptmanager/ScriptImportManager.js"></script>
		<script language="javascript"
			src="<%=webPath%>/custcontact/orderaccept/js/ScriptManager.js"></script>
	</head>
	<body style="margin-left: 5px;" class="css_mainBody">
		<div id="accountInfo">
			<div id="accouInfoVO" class="fieldset_form">
				<fieldset>
					<legend>
						<span class="css_leftImage"></span> �����˻���Ϣ
					</legend>
					<%@include file="AccountInfoContent.jsp" %>
					<div style="text-align: center;">
						<input type="button" name="addAccount" id="addAccount"
							class="button_l" value="�����˻���Ϣ" />
						<input type="button" name="cancelAdd" id="cancelAdd"
							class="button_s" value="ȡ��" />
					</div>
				</fieldset>
				<input type="hidden" id="customerXml" name="customerXml" value="<%=customerXml %>" />
			</div>
		</div>
	</body>
</html>