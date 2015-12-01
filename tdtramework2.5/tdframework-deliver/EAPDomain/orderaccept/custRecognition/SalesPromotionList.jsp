<%
	 /* 
	 **************************************************************
	 * 程序名		: SalesPromotionList.jsp
	 * 建立日期  	: 2012年03月22日
	 * 作者		: RKzhangchuny
	 * 模块		: 综合订单受理-客户识别-促销政策列表
	 * 描述		: 
	 * 备注		: 
	 * ------------------------------------------------------------
	 * 修改历史
	 * 序号		日期		修改人	修改原因
	 * 1     2012-5-15  祝国军    UI调整
	 * 2
	 **************************************************************
	 */
%>
<%@ page pageEncoding="GBK" isELIgnored="false"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%
	String webpath = request.getContextPath();
%>
<html>
	<head>
		<html:base />
		<title>促销政策信息</title>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<contextPath value="<%=webpath%>" />
		<link rel="stylesheet" href="<%=webpath%>/common/css/td_style_new.css" type="text/css" />
		<!-- cust公共css -->
		<link rel=stylesheet href="<%=webpath%>/common/css/td_style_ec.css"/>
		<!-- 公共js  -->
		<script language="javascript" src="<%=webpath%>/common/js/td_common.js"></script>
		<script language=javascript src="<%=webpath%>/common/js/prototypeajax.js"> </script>
		<script language=javascript src="<%=webpath%>/common/js/eccn.js"> </script>
		<script language=javascript src="<%=webpath%>/unieap/js/Globals.js"> </script>
		<script language=javascript src="<%=webpath%>/unieap/js/Common.js"> </script>
		<script language=javascript src="<%=webpath%>/unieap/js/EAPObjsMgr.js"> </script>
		<script language=javascript src="<%=webpath%>/unieap/js/TextObj.js"> </script>
		<script language=javascript src="<%=webpath%>/unieap/js/BaseObj.js"> </script>
		<!-- 等待条js-->
		<script language="javascript" src="<%=webpath%>/common/js/waitingbar.js"></script>
		<script language="javascript" src="<%=webpath%>/orderaccept/custRecognition/js/SalesPromotionList.js"></script>
		<link rel="stylesheet" type="text/css" href="<%=webpath%>/unieap/ria3.3/unieap/themes/base/css/unieap.css"/>
		<link rel="stylesheet" type="text/css" href="<%=webpath%>/unieap/ria3.3/unieap/themes/blue/css/unieap.css"/> 
		<script language="javascript" src="<%=webpath%>/unieap/ria3.3/dojo/dojo.js"></script>
		<script language="javascript" src="<%=webpath%>/orderaccept/riaconfig/crm1GlobalConfig.js"></script>
		<script language="javascript" src="<%=webpath%>/orderaccept/common/dialog/MessageBox.js"></script>
		
	</head>

	<body onload="SalesPromotion.init();" class="mainBody" >
		<ec:table items="salesPromotionInstList" var="vo" action="${pageContext.request.contextPath}/ordermgr/newCustRecognitionAction.do?method=getSalesPromotionInfo"
			rowsDisplayed="5" resizeColWidth="false" style="table-layout:auto;" >
			<ec:row>
				<ec:column ellipsis="true" styleClass="eccolomntext" property="promotionInstId" title="促销政策实例ID" />
				<ec:column ellipsis="true" styleClass="eccolomntext" property="salesPromotionVO.promotionName" title="促销政策名称" />
				<ec:column ellipsis="true" styleClass="eccolomntext" property="promotionTypeName" title="促销政策分类" />
				<ec:column ellipsis="true" styleClass="eccolomntext" property="effDate" title="政策生效时间" cell="date" format="yyyy-MM-dd" />
				<ec:column ellipsis="true" styleClass="eccolomntext" property="expDate" title="政策失效时间" cell="date" format="yyyy-MM-dd"/>
				<ec:column ellipsis="true" styleClass="eccolomntext" property="promotionTargetTypeName" title="作用对象类型 " />
				<ec:column ellipsis="true" styleClass="eccolomntext" property="promotionTargetId" title="作用对象ID " />
				<ec:column ellipsis="true" styleClass="eccolomntext" property="number" title="作用号码 " />
				<ec:column ellipsis="true" styleClass="eccolomntext" property="statusCdDesc" title="状态"/>
				<ec:column title="操作" property="操作" styleClass="eccolomntext operating_area" > 
					<%-- 辽宁电信不支持换促销政策操作 
					<button name="btnChange" menuId="841ABP" class="titleButton" onclick="SalesPromotion.showPromotion('change','${pageScope.vo.promotionId}','${pageScope.vo.promotionInstId}','${pageScope.vo.promotionType}','${pageScope.vo.effDate}','${pageScope.vo.createDate}')">换促销政策</button><span style="vertical-align: bottom;">|</span>
					--%>
					<button name="btnModify" menuId="841ABQ" promotionStatus="${pageScope.vo.statusCd}" class="titleButton" onclick="SalesPromotion.showPromotion('modify','${pageScope.vo.promotionId}','${pageScope.vo.promotionInstId}','${pageScope.vo.promotionType}','${pageScope.vo.effDate}','${pageScope.vo.createDateDesc}')">改促销信息</button>
					<span style="vertical-align: bottom;display:none">|<button name="btnDelete" promotionType="${pageScope.vo.promotionType}" class="titleButton" onclick="SalesPromotion.showPromotion('delete','${pageScope.vo.promotionId}','${pageScope.vo.promotionInstId}','${pageScope.vo.promotionType}','${pageScope.vo.effDate}','${pageScope.vo.createDateDesc}')">退促销政策</button></span>
					<span style="vertical-align: bottom;">|<button name="btnAssureModify" class="titleButton" onclick="SalesPromotion.changeSecurityInfo('${pageScope.vo.promotionInstId}')">担保信息修改</button></span>
				</ec:column>
			</ec:row>
		</ec:table>
	</body>
</html>