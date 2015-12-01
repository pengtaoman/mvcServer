<%
/* 
JSP程序简要描述信息
 **************************************************************
 * 程序名	: CustInfoMgtHead.jsp
 * 建立日期: 2012-02-18
 * 作者		: Shaochy
 * 模块		: 基本订单受理
 * 描述		: 宽带标准化套餐
 * 备注		: 
 * ------------------------------------------------------------
 * 修改历史
 * 序号		日期		修改人	修改原因
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
		<title>业务号码列表</title>
		<!-- 公共css  -->
		<link href="<%=webpath%>/common/css/td_style_ec.css" rel=stylesheet>
		<link href="<%=webpath%>/common/css/td_style.css" rel="stylesheet" type="text/css">
		<!-- 公共js  -->
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
				<ec:column property="custId" title="客户编号" >
				<span class="eccolomntext">
				<a href="#" onclick="doCustInfoQuery('${pageScope.pre.custId}');return false;">${pageScope.pre.custId}</a>
				</span>
				</ec:column>
				<ec:column property="custName" title="客户名称" />
				<ec:column property="custNumber" title="客户统一编码" />
				<ec:column property="identityKindDesc" title="证件类型" />
				<ec:column property="identityCodeDesc" title="证件号码" />
				<ec:column property="customerKindDesc" title="客户类别" />
				<ec:column property="customerGradeDesc" title="客户级别" />
				<ec:column property="custAddress" title="客户地址" />
			</ec:row>
		</ec:table>
	</body>
</html>