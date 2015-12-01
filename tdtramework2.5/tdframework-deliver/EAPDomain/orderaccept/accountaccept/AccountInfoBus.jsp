<%
	/* 
	 **************************************************************
	 * 程序名		: CustomerInfoBus.jsp
	 * 建立日期  	: 2010年11月05日
	 * 作者		: maomq
	 * 模块		: 帐户信息新增
	 * 描述		: 
	 * 备注		: 
	 * ------------------------------------------------------------
	 * 修改历史
	 * 序号		日期		修改人	修改原因
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
		<title>帐户信息新增</title>
		<context path="<%=webPath%>" />
		<contextPath value="<%=webPath%>" />
		<path value="<%=webPath%>" />
		<parameter webPath="<%=webPath%>" page="AccountInfoContent" />
		<!-- 公共css -->
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
						<span class="css_leftImage"></span> 新增账户信息
					</legend>
					<%@include file="AccountInfoContent.jsp" %>
					<div style="text-align: center;">
						<input type="button" name="addAccount" id="addAccount"
							class="button_l" value="保存账户信息" />
						<input type="button" name="cancelAdd" id="cancelAdd"
							class="button_s" value="取消" />
					</div>
				</fieldset>
				<input type="hidden" id="customerXml" name="customerXml" value="<%=customerXml %>" />
			</div>
		</div>
	</body>
</html>