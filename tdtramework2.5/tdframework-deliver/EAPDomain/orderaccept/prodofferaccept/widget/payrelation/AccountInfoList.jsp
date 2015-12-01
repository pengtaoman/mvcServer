<%
	 /* 
	 **************************************************************
	 * ������		: AccountInfoList.jsp
	 * ��������  	: 2010��11��15��
	 * ����		: maomq
	 * ģ��		: �˻���Ϣ����
	 * ����		: 
	 * ��ע		: 
	 * ------------------------------------------------------------
	 * �޸���ʷ
	 * ���		����		�޸���	�޸�ԭ��
	 * 1		
	 **************************************************************
	 */
%>

<%@ page contentType="text/html; charset=GBK" language="java" isELIgnored="false"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>

<%
	String webpath = request.getContextPath();
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <contextPath value="<%=webpath%>"/>
    <title>�˻���Ϣ�б�</title>
    <meta http-equiv="Content-Type" content="text/html; charset=GBK" />
	<!-- ����css  -->
	<link href="<%=webpath%>/common/css/td_style_ec.css" rel=stylesheet>
	<link rel="stylesheet" href="<%=webpath%>/custcontact/orderaccept/common/css/style.css" type="text/css" />
	<link href="<%=webpath%>/common/css/td_style_new.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" href="<%=webpath%>/custcontact/businessaccept/css/comm.css" type="text/css" />
	<!-- ����js  -->
	<script language="javascript" src="<%=webpath%>/common/js/td_common.js"></script>
	<script language="javascript"
		src="<%=webpath%>/custcontact/common/js/td_operation.js"></script>
	<script language=javascript src="<%=webpath%>/unieap/js/BaseObj.js"> </script>
	<script language=javascript src="<%=webpath%>/unieap/js/EAPObjsMgr.js"> </script>
	<script language=javascript src="<%=webpath%>/unieap/js/TextObj.js"> </script>
	<script language=javascript src="<%=webpath%>/unieap/js/PasswordObj.js"> </script>
	<script language=javascript src="<%=webpath%>/unieap/js/PasswordConfirmObj.js"> </script>
	<script language=javascript src="<%=webpath%>/custcontact/common/businessmodule/base/Common.js"></script>
	<script language=javascript src="<%=webpath%>/custcontact/common/js/commonPattern.js"></script>
	<!-- �ֲ�ˢ�º�ec:table�õ���JS -->
	<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"></script>
	<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"></script>
	<script language=javascript
		src="<%=webpath%>/common/js/prototypeajax.js"> </script>
	<script language=javascript src="<%=webpath%>/common/js/eccn.js"> </script>
	<!-- �ȴ���js-->
	<script language="javascript"
		src="<%=webpath%>/common/js/waitingbar.js"></script>
	<!-- title��js -->
	<script language="javascript" src="<%=webpath%>/common/js/titlebar.js"></script>
	<script language="javascript" src="<%=webpath%>/orderaccept/prodofferaccept/widget/payrelation/AccountInfoList.js"></script>
	<!-- ��ʾ��Ϣ���  -->
	<%@ include file="/unieap/ria3.3/pages/config_MsgDia.jsp" %>
  </head>
  
  <body class="mainBody">
	<ec:table items="accountInfoList" var="accountList" rowsDisplayed="5" action="${pageContext.request.contextPath}/payRelationAction.do?method=getAccountInfoList" >
		<ec:row>
			<ec:column property="accountId" title="�˻�ʵ�����" />
			<ec:column property="custId" title="�ͻ�ʵ�����"/>
			<ec:column property="accountName" title="�˻�����"/>
			<ec:column property="stateDesc" title="�˻�״̬" />
			<ec:column property="ifDefaultDesc" title="�Ƿ�Ĭ���ʻ�"/>
			<ec:column property="activeDate" title="�˻���Чʱ��"/>
			<ec:column property="accountTel" title="���ѵ绰"/>
			<ec:column title="����" styleClass="eccolomntext" property="checkBx">
				<button class="titleButton" onclick="postValue('${accountList.accountId}','${accountList.accountName}','${accountList.cityCode}');">ȷ ��</button>
			</ec:column>
		</ec:row>
	</ec:table>
	<div id="ifBatchOper" align="center" style="display:none;">
		<input type="hidden" name="flag" id="flag" value="${flag}">
		<input type="hidden" name="message" id="message" value="${message}">
	</div>
 </body>
</html>
