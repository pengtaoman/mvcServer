
<%
	 /* 
	 **************************************************************
	 * ������		: AccountList.jsp
	 * ��������  	: 2011��2��19��
	 * ����		: liurong@neusoft.com
	 * ģ��		: �ͻ��µ��ʻ��б�
	 * ����		: 
	 * ��ע		: 
	 * ------------------------------------------------------------
	 * �޸���ʷ
	 * ���		����		�޸���	�޸�ԭ��
	 * 1    2012-5-15   ף����   UI����������td_style_new.css�������ecTableչʾ
	 * 2
	 **************************************************************
	 */
%>
<%@ page language="java" pageEncoding="GBK"%>
<%@ page import="java.util.List"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%@ page import="com.neusoft.crm.custmgr.common.acctmgr.data.AccountInfoVO"%>
<%@ page import="com.neusoft.tdframework.common.util.PageCheck"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="cc"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%
	String webPath = request.getContextPath();
	boolean accountChange = PageCheck.ifHaveRight(request,"841ACX");
	boolean payment = PageCheck.ifHaveRight(request,"841ACY");
	boolean plan = PageCheck.ifHaveRight(request,"841ACZ");
	//List<AccountInfoVO> accountInfoVOList = (List<AccountInfoVO>) request.getAttribute("accountInfoVOList");
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<meta http-equiv="MSThemeCompatible" content="no" />
		<title>�˻���Ϣ</title>
		<link rel="stylesheet" href="common/css/td_style_new.css" type="text/css" />
		<link href="common/css/td_style_ec.css" rel="stylesheet" type="text/css" />
		<script language=javascript src="<%=webPath%>/common/js/prototypeajax.js"> </script>
		<script language=javascript src="<%=webPath%>/common/js/eccn.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/Globals.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/Common.js"> </script>		
		<%@ include file="/unieap/ria3.3/pages/config_MsgDia.jsp" %>
		<!-- �ֲ�ˢ�º�ec:table�õ���JS -->
	<script language=javascript
		src="<%=webPath%>/common/js/prototypeajax.js"> </script>
	<script language="javascript" src="<%=webPath%>/unieap/ria3.3/dojo/dojo.js"></script>
	<script language="javascript" src="<%=webPath%>/orderaccept/riaconfig/crm1GlobalConfig.js"></script>
	<script language="javascript" src="<%=webPath%>/orderaccept/common/dialog/MessageBox.js"></script>
	<script language="javascript"
			src="<%=webPath%>/orderaccept/common/dialog/openWinDialog.js"></script>	
		<script language="javascript" src="<%=webPath%>/orderaccept/custRecognition/js/AccountList.js"></script>
	</head>
	<body class="mainBody" onload="init()">
		<input type="hidden" id="webPath" name="webPath" value="<%=webPath%>" />
		
		<input type = "hidden" name = "ifAccountChange" id = "ifAccountChange" value="<%=accountChange %>" />
		<input type = "hidden" name = "ifPayment" id = "ifPayment" value="<%=payment %>" />
		<input type = "hidden" name = "ifPlan" id = "ifPlan" value="<%=plan %>" />
		
		<ec:table items="accountInfoVOList"  style="table-layout:fixed;" var="vo" action="${pageContext.request.contextPath}/ordermgr/newCustRecognitionAction.do?method=getAccountInfoDetail" rowsDisplayed="-1" paginationLocation="false" resizeColWidth="false" >
			<ec:row>
				<ec:column width="10%" ellipsis="true" styleClass="eccolomntext" property="custId" title="�ͻ����" />
				<ec:column width="10%" ellipsis="true" styleClass="eccolomntext" property="accountId" title="�˻����" >
					<a href="#" onclick="return showAccountInfo('${vo.accountId}')" >${vo.accountId}</a>
				</ec:column>
				<ec:column width="15%" ellipsis="true" styleClass="eccolomntext" property="accountName" title="�˻�����" />
				<ec:column width="30%" ellipsis="true" styleClass="eccolomntext" property="serviceId" title="ҵ�����" />
				<ec:column width="35%" title="����" property="����" styleClass="eccolomntext operating_area"> 
					<button name="btnChange" class="titleButton" onclick="showAccountInfo('${pageScope.vo.accountId}')">��ϸ��Ϣ</button><span style="vertical-align: bottom;">|</span>
					<button name="btnChange" id ="accountChange" class="titleButton" onclick="changeAccountInfo('${pageScope.vo.accountId}')">�˻����</button><span style="vertical-align: bottom;">|</span>
					<button name="btnChange" id ="payment" class="titleButton" onclick="changeAccountPayMent('${pageScope.vo.accountId}','${pageScope.vo.custId}')">֧������ά��</button><span style="vertical-align: bottom;">|</span>
					<button name="btnModify" id = "plan" class="titleButton" onclick="displayFavourPlan('${pageScope.vo.accountId}','${pageScope.vo.custId}','${pageScope.vo.productId}','${pageScope.vo.serviceKind}','${pageScope.vo.accountTel}')">�Żݼƻ�����</button>
				</ec:column>
			</ec:row>
		</ec:table>
	</body>
</html>
