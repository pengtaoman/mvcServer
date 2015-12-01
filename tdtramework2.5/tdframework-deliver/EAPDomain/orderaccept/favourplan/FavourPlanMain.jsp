
<%
	/* 
	JSP程序简要描述信息
	 **************************************************************
	 * 程序名  	: FavourPlanMain.jsp
	 * 建立日期   : 2012-03-01
	 * 作者		: lianxu
	 * 模块		: 账户优惠受理主页面
	 * 描述		: 显示帐户信息、优惠信息、经办人信息
	 * 备注		: 
	 * ------------------------------------------------------------
	 * 修改历史
	 * 序号		日期		修改人	修改原因
	 * 1
	 * 2
	 **************************************************************
	 */
%>
<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%@ page import="com.neusoft.crm.custmgr.common.acctmgr.data.AccountInfoVO"%>
<%@ page import="com.neusoft.crm.ordermgr.business.favourplan.data.CmFavourAccountVO"%>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<!-- unieap-->
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%
	request.setCharacterEncoding("GBK");
	String webpath = request.getContextPath();

	//客户ID
	String custId = (String)request.getAttribute("custId");
	String productId = (String)request.getAttribute("productId");
	String serviceKind = (String)request.getAttribute("serviceKind");
	String serviceId = (String)request.getAttribute("serviceId");
	
	//帐户信息
	AccountInfoVO accountInfoVO = (AccountInfoVO) request.getAttribute("accountinfo");
	String strAccountName = "";
	String strAccountTel = "";
	String strAccountId = "";
	//String strCityCode = "";
	String ifDefault = "";
	String creditControl = "";
	String accAreaGrade = "";
	String groupPayMethod = "";
	String payCycle = "";
	if (accountInfoVO != null) {
		strAccountName = NullProcessUtil.nvlToString(accountInfoVO.getAccountName(), "");
		strAccountId = NullProcessUtil.nvlToString(String.valueOf(accountInfoVO.getAccountId()), "");
		strAccountTel = NullProcessUtil.nvlToString(accountInfoVO.getAccountTel(), "");
		//strCityCode = NullProcessUtil.nvlToString(accountInfoVO.getCityCode(), "");
		ifDefault = NullProcessUtil.nvlToString(accountInfoVO.getIfDefault(), "");
		creditControl = NullProcessUtil.nvlToString(accountInfoVO.getCreditControl(), "");
		accAreaGrade = NullProcessUtil.nvlToString(accountInfoVO.getAccountAreaGrade(), "");
		groupPayMethod = NullProcessUtil.nvlToString(accountInfoVO.getGroupPayMethod(), "");
		payCycle = NullProcessUtil.nvlToString(accountInfoVO.getPayCycle(), "");
	}
	
	
	//触发事件
	String flag = NullProcessUtil.nvlToString(request.getAttribute("flag"), "0");
	String prompt = NullProcessUtil.nvlToString(request.getAttribute("prompt"), "");

	//是否客户的默认帐户
	ParamObjectCollection ifDefaultColl = (ParamObjectCollection) request.getAttribute("ifDefaultColl");
	//是否进行信用控制
	ParamObjectCollection creditControlColl = (ParamObjectCollection) request.getAttribute("creditControlColl");
	//帐户归属区域级别
	ParamObjectCollection accAreaGradeColl = (ParamObjectCollection) request.getAttribute("accAreaGradeColl");
	//集团收费方式
	ParamObjectCollection groupPayMethodColl = (ParamObjectCollection) request.getAttribute("groupPayMethodColl");
	//付费周期
	ParamObjectCollection payCycleColl = (ParamObjectCollection) request.getAttribute("payCycleColl");
			
			
	CmFavourAccountVO cmfavouraccountinfo = (CmFavourAccountVO) request.getAttribute("cmfavouraccountinfo");
	
	String ffavourId = "";
	String ffavourName = "";
	String fbegDate = "";
	String fendDate = "";
	String fchargeId = "";
	String fbegReg = "";
	String fendReg = "";
	String fproductCity = "";
	
	if (null != cmfavouraccountinfo){ 	
	ffavourId = NullProcessUtil.nvlToString(cmfavouraccountinfo.getFfavourId(), "");
	ffavourName = NullProcessUtil.nvlToString(String.valueOf(cmfavouraccountinfo.getFfavourName()), "");
	fbegDate = NullProcessUtil.nvlToString(cmfavouraccountinfo.getStrfbegDate(), "");
	fendDate = NullProcessUtil.nvlToString(cmfavouraccountinfo.getStrfendDate(), "");
	fchargeId = NullProcessUtil.nvlToString(cmfavouraccountinfo.getFchargeId(), "");
	fbegReg = NullProcessUtil.nvlToString(cmfavouraccountinfo.getFbegReg(), "");
	fendReg = NullProcessUtil.nvlToString(cmfavouraccountinfo.getFendReg(), "");
	fproductCity = NullProcessUtil.nvlToString(cmfavouraccountinfo.getFproductCity(), "");
	}		
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>帐户信息</title>
		<contextPath value="<%=webpath%>" />
		<!--与框架相关的JS-->
		<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/NumberObj.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/DoubleObj.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/BaseObj.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/EmailObj.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/EAPObjsMgr.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/PasswordConfirmObj.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/PasswordObj.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/ReadOnlyObj.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/TextObj.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/DateUtilObj.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/DoubleObj.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/CursorDispose.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/IntegerObj.js"></script>
		<script language="javascript" src="<%=webpath%>/common/js/td_date.js"></script>
		<!-- 公共css  -->
		<link rel="stylesheet" href="/crm1/common/css/td_style_new.css" type="text/css" />
		<link rel="stylesheet" href="<%=webpath%>/buscard/css/buscard_2.0.css" type="text/css" />
		<!-- 公共js  -->
		<script language="javascript" src="<%=webpath%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=webpath%>/common/js/prototypeajax.js"></script>
		<script language="javascript" src="<%=webpath%>/common/js/eccn.js"></script>
		<script language="javascript" src="<%=webpath%>/common/js/waitingbar.js"></script>
		<script language="javascript" src="<%=webpath%>/common/js/titlebar.js"></script>
		<!-- cust公用js -->
		<script language="javascript" src="<%=webpath%>/custcontact/common/js/crm_common.js"></script>
		<script language="javascript" src="<%=webpath%>/custcontact/common/js/td_operation.js"></script>
	    <script type="text/javascript" src="<%=webpath%>/buscard/common/js/buscard_2.0.js"></script>
	    <script type="text/javascript" src="<%=webpath%>/orderaccept/favourplan/js/FavourPlanMain.js"></script>
	</head>
	<body onload="favourplanpageInit();" class="mainBody">
		<unieap:form method="post" action="">
		<div>
			<table border="0" cellpadding="0" cellspacing="0" class="formTable">
				<input type="hidden" name="prompt" value="<%=prompt%>" />
				<input type="hidden" name="iFlag" value="<%=flag%>" />
				<input type="hidden" name="webpath" value="<%=webpath%>" />
				<input type="hidden" name="newFavourPlanValue" value="" />
				<input type="hidden" name="newBegDate" value="" />
				<input type="hidden" name="newEndDate" value="" />
				<input type="hidden" name="accountId" value="<%=strAccountId%>" />
				<input type="hidden" name="custId" value="<%=custId%>" />
				<input type="hidden" name="serviceOfferId" value="39" />
				<input type="hidden" name="oldfchargeId" value="<%=fchargeId%>">
				<input type="hidden" name="oldffavourId" value="<%=ffavourId%>"> 
				<input type="hidden" name="oldfbegReg" value="<%=fbegReg%>"> 
				<input type="hidden" name="oldfbegDate" value="<%=fbegDate%>">
				<input type="hidden" name="oldfproductCity" value="<%=fproductCity%>">
				<input type="hidden" name="productId" value="<%=productId%>">
				<input type="hidden" name="serviceKind" value="<%=serviceKind%>">
				<input type="hidden" name="serviceId" value="<%=serviceId%>">
				<tr class="tableTitleTR2">
					<td colspan="3">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">
									&#160;
								</td>
								<td class="tableTitle2">
									帐户信息
								</td>
								<td class="tableTitleRight2">
									&#160;
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
						<td class="formTableL">
							&#160;
						</td>
					<td class="formTableC">
						<table align="center" border="0" cellpadding="0" cellspacing="2"
							class="formTableCore">
							<tr>
								<td class="formLabel">帐户名称:</td>
								<td class="formField">
									<unieap:input tcname="Text" id="accountNameAdd"
										name="accountNameAdd" prompt="帐户名称" tooltip="帐户名称"
										value="<%=strAccountName%>" maxlength="80" readonly="true"/>
								</td>
								<td class="formLabel">帐户付费电话:</td>
								<td>
									<unieap:input tcname="Text" id="accountTel" name="accountTel"
										value="<%=strAccountTel%>" prompt="帐户付费电话" maxlength="30"
										tooltip="帐户付费电话" readonly="true"/>
								</td>
								<td class="formLabel" id="ifDefaultTD">是否默认帐户:</td>
								<td class="formField">
								    <span class="selectDiv">
									<td:SelectTag4W3C selectFlag="false"
										selectColl="<%=ifDefaultColl%>" tagName="ifDefault"
										selectvalue="<%=ifDefault%>" disabled="true" />
								     </span>
								</td>
								<td class="formLabel">是否信用控制:</td>
								<td class="formField">
								    <span class="selectDiv">
									<td:SelectTag4W3C selectFlag="false"
										selectColl="<%=creditControlColl%>" tagName="creditControl"
										selectvalue="<%=creditControl%>" disabled="true" />
									</span>
								</td>
							</tr>
							<tr>
								<td class="formLabel">帐户归属区域级别:</td>
								<td class="formField">
								   <span class="selectDiv">
									<td:SelectTag4W3C selectFlag="false"
										selectColl="<%=accAreaGradeColl%>" tagName="accAreaGrade"
										selectvalue="<%=accAreaGrade%>" onchange="ifGroupPayMethod()"
										disabled="true" />
									<input type="hidden" name="accountAreaGrade"
										id="accountAreaGrade" value="<%=accAreaGrade%>" />
								   </span>
								</td>
								<td class="formLabel" width="13%" id="payMethodName"style="display: none">集团收费方式:</td>
								<td id="payMethodValue" style="display: none">
									<td:SelectTag4W3C selectFlag="false"
										selectColl="<%=groupPayMethodColl%>" tagName="groupPayMethod"
										selectvalue="<%=groupPayMethod%>" disabled="true" />
								</td>
								<td class="formLabel" width="13%">
									付费周期
								</td>
								<td class="formField">
								    <span class="selectDiv">
									<td:SelectTag4W3C selectFlag="false" selectColl="<%=payCycleColl%>"
										tagName="payCycle" selectvalue="<%=payCycle%>"
										disabled="true" />
									</span>
								</td>
							</tr>
						</table>
					</td>
					<td class="formTableR">
						&#160;
					</td>
				</tr>
				<tr>
					<td class="formTableLB">
						&#160;
					</td>
					<td class="formTableB">
						&#160;
					</td>
					<td class="formTableRB">
						&#160;
					</td>
				</tr>
			</table>
			
            <table border="0" cellpadding="0" cellspacing="0" class="formTable">
			<tr class="tableTitleTR2">
				<td colspan="3">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td class="tableTitleLeft2">
								&#160;
							</td>
							<td class="tableTitle2">
								优惠计划信息
							</td>
							<td class="tableTitleRight2">
								&#160;
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr class="tableTitleTR2">
				<td colspan="3">
					<table id="favourplaninfotable" border="0" align="center" cellpadding="0" cellspacing="1"
						class="listTable">
						<tr class="listTableHeadSimple">
							<td style="width: 12.5%" class="formLabel">
								优惠计划编号
							</td>
							<td style="width: 12.5%" class="formLabel">
								优惠计划名称
							</td>
							<td style="width: 12.5%" class="formLabel">
								优惠计划开始时间
							</td>
							<td style="width: 12.5%" class="formLabel">
								优惠计划终止时间
							</td>
						</tr>
						<%
							if (null != cmfavouraccountinfo) {
						%>
						<tr id="favourplaninforow" class="listTableRow" onmouseover="TableRow.lightMe(this);" onmouseout="TableRow.resetMe(this);">
							<td><%=ffavourId%></td>
							<td><%=ffavourName%></td>
							<td><%=fbegDate%></td>
							<td><%=fendDate%></td>				
						</tr>
						<%
							}
						%>	
					</table>
				</td>
			</tr>
		</table>
		</div>
		<div id="viaInfoCardContainer"></div>
		<table border="0" cellpadding="0" cellspacing="0" class="formTable">
		<tr>
		<td colspan="4" class="formButtonTD">
		<unieap:unieapbutton classname="formButton"
					styleClass="formButton" id="saveBtn" name="saveBtn" value="新  增"
					onclick="doNew();" />
		<unieap:unieapbutton classname="formButton"
					styleClass="formButton" id="budgetBtn" name="delBtn" value="删  除"
					onclick="doDel();" />
		<%--<unieap:unieapbutton classname="formButton"
					styleClass="button_s" id="printBtn" name="printBtn" value="免填单打印"
					onclick="doPrint();" />--%>
	    <unieap:unieapbutton classname="formButton"
					styleClass="formButton" id="commitBtn" name="commitBtn" value="提  交" 
					onclick="doSubmit();" />
		</td>
		</tr>
		</table>
		<iframe name=ifa_result width=0 height=0 frameborder=0></iframe>
		</unieap:form>
	</body>
</html>
