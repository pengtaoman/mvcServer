<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String requestParam = (String) request.getAttribute("requestParam");
	String webPath = request.getContextPath();
	String delayInitPage = request.getParameter("delayInitPage") == null ? "0" : request
			.getParameter("delayInitPage").toString();
	String actionName = "促销政策变更";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<style type="text/css">
.hidden-elem {
	display: none;
}
</style>
		<link rel="stylesheet" href="common/css/td_style_new.css" type="text/css" />	
		<link rel="stylesheet"	href="/crm1/custcontact/orderaccept/common/css/style.css" type="text/css" />
		<link href="/crm1/custcontact/orderaccept/budget/css/budget.css" rel="stylesheet" type="text/css"/>
		<link href="/crm1/orderaccept/base/resources/css/workarea_style.css" rel="stylesheet" type="text/css"/>
		<link rel="stylesheet" type="text/css" href="/crm1/unieap/ria3.3/unieap/themes/base/css/unieap.css"/>
        <link rel="stylesheet" type="text/css" href="/crm1/unieap/ria3.3/unieap/themes/blue/css/unieap.css"/> 
		<link rel="stylesheet" type="text/css" href="/crm1/unieap/ria3.3/unieap/themes/base/css/unieap.css" charset="utf-8"></link>
		<link rel="stylesheet" type="text/css" href="/crm1/unieap/ria3.3/unieap/themes/blue/css/unieap.css" charset="utf-8"></link>

		<script type="text/javascript"
			src="<%=webPath%>/orderaccept/riaconfig/crm1GlobalConfig.js"></script>
		<script type="text/javascript"
			src="<%=webPath%>/buscard/common/js/buscard_2.0.js"></script>
		<!-- Jscu.js 和 GroupProdBuilder.js 纯粹为了卡片受理集团业务 目前开发节点先引入,后续一定改造掉 /begin-->
		<script type="text/javascript"
			src="<%=webPath%>/custcontact/orderaccept/base/jscu/Jscu.js"></script>
		<script type="text/javascript"
			src="<%=webPath%>/custcontact/businessaccept/js/GroupProdBuilder.js"></script>
		<!-- Jscu.js 和 GroupProdBuilder.js 纯粹为了卡片受理集团业务 目前开发节点先引入,后续一定改造掉 /end-->

		<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
		<script type="text/javascript"
			src="<%=webPath%>/orderaccept/riaconfig/crm1InitConfig.js"></script>
		<script type="text/javascript"
			src="<%=webPath%>/custcontact/common/js/td_operation.js"></script>	
		<script type="text/javascript" src="<%=webPath%>/custcontact/orderaccept/budget/js/BudgetComponent.js"></script>
		<script type="text/javascript">
			dojo.global.initPromotionChangePage = function(requestParam){
				 if(dojo.global.prodOfferAcceptLoader){
				 	dojo.global.prodOfferAcceptLoader.destroy();
				 	dojo.global.prodOfferAcceptLoader = null;
				 }
				 if(dojo.isString(requestParam)){
				 	requestParam  = dojo.fromJson(requestParam);
				 }
				  (function(){{
					for(var index in requestParam){
						try{
						
							if(requestParam[index]==null||dojo.trim(requestParam[index].toString())==''){
								delete requestParam[index];
							}		
						
						}catch(e){
						
						}
					
					}
				
				}}());
				dojo.global.$appContext$.set("requestParam",requestParam); 
			  	dojo.require("orderaccept.prodofferaccept.main").dispatch(requestParam);	
			};
			if("<%=delayInitPage%>"=='0'){
				   dojo.global.initPromotionChangePage(<%=requestParam%>);
				}
		</script>
	</head>
	<body class="unieap" onload="loadGuide('Promotion',3,'<%=actionName%>');">
		<input type="hidden" value="<%=webPath%>" id='webPath'>
		<%@ include file="/orderaccept/common/guide/LoadGuide.jsp"%>
		<div id="promotion-change-root" style="height: 100%"></div>
		<%-- 
		<div id="order-show-root" style="display: none"></div>
		--%>
	</body>
</html>
