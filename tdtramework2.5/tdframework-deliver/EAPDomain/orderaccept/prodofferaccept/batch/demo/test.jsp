
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%
	String webPath=request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<title>test</title>
		<link rel="stylesheet"
			href="<%=webPath%>/custcontact/common/businessmodule/product/css/ProdOffer.css"
			type="text/css" />
		<link rel="stylesheet"
			href="<%=webPath%>/custcontact/orderaccept/budget/css/budget.css"
			type="text/css" />

		<link rel="stylesheet" href="<%=webPath%>/common/css/td_style_new.css"
			type="text/css" />

		<link rel="stylesheet"
			href="<%=webPath%>/orderaccept/base/resources/css/workarea_style.css"
			type="text/css" />

		<script type="text/javascript"
			src="<%=webPath%>/orderaccept/riaconfig/crm1GlobalConfig.js"></script>
		<script type="text/javascript"
			src="<%=webPath%>/buscard/common/js/buscard_2.0.js"></script>
		<%@ include file="/orderaccept/custom/unieapconfig/config.jsp"%>
		<script type="text/javascript"
			src="<%=webPath%>/orderaccept/riaconfig/crm1InitConfig.js"></script>
		<script type="text/javascript"
			src="<%=webPath%>/orderaccept/prodofferaccept/batch/demo/test.js"></script>
		<script type="text/javascript"
			src="<%=webPath%>/orderaccept/prodofferaccept/util.js"></script>
		<script type="text/javascript"
			src="<%=webPath%>/orderaccept/prodofferaccept/behavior/ProdOfferNewBehavior.js"></script>
		<script type="text/javascript"
			src="<%=webPath%>/orderaccept/prodofferaccept/batch/prodofferdetail/BatchProdOfferDetailBuilder.js"></script>	
		
			
	</head>
	<body class="unieap">
	<input type="hidden" value="<%=webPath%>" id="webPath" />s
		<span>1<a id='prodOfferLink-51326'>销售品详情</a></span>
	</body>
</html>