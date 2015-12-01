<%
	 /* 
	 **************************************************************
	 * 程序名		: AccountInfoList.jsp
	 * 建立日期  	: 2010年11月15日
	 * 作者		: maomq
	 * 模块		: 账户信息处理
	 * 描述		: 
	 * 备注		: 
	 * ------------------------------------------------------------
	 * 修改历史
	 * 序号		日期		修改人	修改原因
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
    <title>账户信息列表</title>
    <meta http-equiv="Content-Type" content="text/html; charset=GBK" />
	<!-- 公共css  -->
	<link href="<%=webpath%>/common/css/td_style_ec.css" rel=stylesheet>
	<link rel="stylesheet" href="<%=webpath%>/custcontact/orderaccept/common/css/style.css" type="text/css" />
	<link href="<%=webpath%>/common/css/td_style_new.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" href="<%=webpath%>/custcontact/businessaccept/css/comm.css" type="text/css" />
	<!-- 公共js  -->
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
	<!-- 局部刷新和ec:table用到的JS -->
	<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"></script>
	<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"></script>
	<script language=javascript
		src="<%=webpath%>/common/js/prototypeajax.js"> </script>
	<script language=javascript src="<%=webpath%>/common/js/eccn.js"> </script>
	<!-- 等待条js-->
	<script language="javascript"
		src="<%=webpath%>/common/js/waitingbar.js"></script>
	<!-- title条js -->
	<script language="javascript" src="<%=webpath%>/common/js/titlebar.js"></script>
	<script language="javascript" src="<%=webpath%>/orderaccept/prodofferaccept/widget/payrelation/AccountInfoList.js"></script>
	<!-- 提示信息组件  -->
	<%@ include file="/unieap/ria3.3/pages/config_MsgDia.jsp" %>
  </head>
  
  <body class="mainBody">
	<ec:table items="accountInfoList" var="accountList" rowsDisplayed="5" action="${pageContext.request.contextPath}/payRelationAction.do?method=getAccountInfoList" >
		<ec:row>
			<ec:column property="accountId" title="账户实例编号" />
			<ec:column property="custId" title="客户实例编号"/>
			<ec:column property="accountName" title="账户名称"/>
			<ec:column property="stateDesc" title="账户状态" />
			<ec:column property="ifDefaultDesc" title="是否默认帐户"/>
			<ec:column property="activeDate" title="账户生效时间"/>
			<ec:column property="accountTel" title="付费电话"/>
			<ec:column title="操作" styleClass="eccolomntext" property="checkBx">
				<button class="titleButton" onclick="postValue('${accountList.accountId}','${accountList.accountName}','${accountList.cityCode}');">确 定</button>
			</ec:column>
		</ec:row>
	</ec:table>
	<div id="ifBatchOper" align="center" style="display:none;">
		<input type="hidden" name="flag" id="flag" value="${flag}">
		<input type="hidden" name="message" id="message" value="${message}">
	</div>
 </body>
</html>
