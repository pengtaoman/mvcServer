<%
	 /* 
	 **************************************************************
	 * ������		: SalesPromotionList.jsp
	 * ��������  	: 2012��03��22��
	 * ����		: RKzhangchuny
	 * ģ��		: �ۺ϶�������-�ͻ�ʶ��-���������б�
	 * ����		: 
	 * ��ע		: 
	 * ------------------------------------------------------------
	 * �޸���ʷ
	 * ���		����		�޸���	�޸�ԭ��
	 * 1     2012-5-15  ף����    UI����
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
		<title>����������Ϣ</title>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<contextPath value="<%=webpath%>" />
		<link rel="stylesheet" href="<%=webpath%>/common/css/td_style_new.css" type="text/css" />
		<!-- cust����css -->
		<link rel=stylesheet href="<%=webpath%>/common/css/td_style_ec.css"/>
		<!-- ����js  -->
		<script language="javascript" src="<%=webpath%>/common/js/td_common.js"></script>
		<script language=javascript src="<%=webpath%>/common/js/prototypeajax.js"> </script>
		<script language=javascript src="<%=webpath%>/common/js/eccn.js"> </script>
		<script language=javascript src="<%=webpath%>/unieap/js/Globals.js"> </script>
		<script language=javascript src="<%=webpath%>/unieap/js/Common.js"> </script>
		<script language=javascript src="<%=webpath%>/unieap/js/EAPObjsMgr.js"> </script>
		<script language=javascript src="<%=webpath%>/unieap/js/TextObj.js"> </script>
		<script language=javascript src="<%=webpath%>/unieap/js/BaseObj.js"> </script>
		<!-- �ȴ���js-->
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
				<ec:column ellipsis="true" styleClass="eccolomntext" property="promotionInstId" title="��������ʵ��ID" />
				<ec:column ellipsis="true" styleClass="eccolomntext" property="salesPromotionVO.promotionName" title="������������" />
				<ec:column ellipsis="true" styleClass="eccolomntext" property="promotionTypeName" title="�������߷���" />
				<ec:column ellipsis="true" styleClass="eccolomntext" property="effDate" title="������Чʱ��" cell="date" format="yyyy-MM-dd" />
				<ec:column ellipsis="true" styleClass="eccolomntext" property="expDate" title="����ʧЧʱ��" cell="date" format="yyyy-MM-dd"/>
				<ec:column ellipsis="true" styleClass="eccolomntext" property="promotionTargetTypeName" title="���ö������� " />
				<ec:column ellipsis="true" styleClass="eccolomntext" property="promotionTargetId" title="���ö���ID " />
				<ec:column ellipsis="true" styleClass="eccolomntext" property="number" title="���ú��� " />
				<ec:column ellipsis="true" styleClass="eccolomntext" property="statusCdDesc" title="״̬"/>
				<ec:column title="����" property="����" styleClass="eccolomntext operating_area" > 
					<%-- �������Ų�֧�ֻ��������߲��� 
					<button name="btnChange" menuId="841ABP" class="titleButton" onclick="SalesPromotion.showPromotion('change','${pageScope.vo.promotionId}','${pageScope.vo.promotionInstId}','${pageScope.vo.promotionType}','${pageScope.vo.effDate}','${pageScope.vo.createDate}')">����������</button><span style="vertical-align: bottom;">|</span>
					--%>
					<button name="btnModify" menuId="841ABQ" promotionStatus="${pageScope.vo.statusCd}" class="titleButton" onclick="SalesPromotion.showPromotion('modify','${pageScope.vo.promotionId}','${pageScope.vo.promotionInstId}','${pageScope.vo.promotionType}','${pageScope.vo.effDate}','${pageScope.vo.createDateDesc}')">�Ĵ�����Ϣ</button>
					<span style="vertical-align: bottom;display:none">|<button name="btnDelete" promotionType="${pageScope.vo.promotionType}" class="titleButton" onclick="SalesPromotion.showPromotion('delete','${pageScope.vo.promotionId}','${pageScope.vo.promotionInstId}','${pageScope.vo.promotionType}','${pageScope.vo.effDate}','${pageScope.vo.createDateDesc}')">�˴�������</button></span>
					<span style="vertical-align: bottom;">|<button name="btnAssureModify" class="titleButton" onclick="SalesPromotion.changeSecurityInfo('${pageScope.vo.promotionInstId}')">������Ϣ�޸�</button></span>
				</ec:column>
			</ec:row>
		</ec:table>
	</body>
</html>