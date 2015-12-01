
<%
	/* 
	 **************************************************************
	 * 程序名		: CustRecognitionHead.jsp
	 * 建立日期  	: 2011年05月24日
	 * 作者		: liurong
	 * 模块		: 综合订单受理首页
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
<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page
	import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%@ page import="com.neusoft.tdframework.authorization.AuthorizeVO"%>
<%@ page import="com.neusoft.tdframework.common.GlobalParameters"%>
<%@ page import="com.neusoft.tdframework.common.util.DESUtil"%>
<%@ page import="java.util.Map"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="cc"%>

<%@ page import="com.neusoft.tdframework.common.util.PageCheck"%>
<%
	String webpath = request.getContextPath();
	ParamObjectCollection mainIdentityKindColl = (ParamObjectCollection) request
			.getAttribute("mainIdentityKindColl");
	String flag = NullProcessUtil.nvlToString(
			request.getAttribute("flag"), "1");//页面执行标识。1为综合受理，2为批量新装,3为NP申请页面
	AuthorizeVO userVO = ((AuthorizeVO) request.getSession(true)
			.getAttribute(GlobalParameters.SESSION_INFO));//Session中的信息
	String passWordDs = (String) request.getSession(true).getAttribute(
			"decodedPass");
	String userName = userVO.getWorkNo();
	String userPassWord = DESUtil.encrypt(passWordDs);
	String userHomeCity = userVO.getHomeCity();
	String areaCode = userVO.getAreaId();
	String employeeCity = userVO.getCityCode();
	
	boolean pageOrderButton = PageCheck.ifHaveRight(request,"841ABY");//订购权限按钮
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<context path="<%=webpath%>" />
<title>欢迎登录 中国电信 BSS系统</title>
<style type="text/css">
@import
	"<%=webpath%>/unieap/ria3.3/unieap/themes/default/css/unieap.css";
</style>
<link href="<%=webpath%>/common/css/td_style_new.css" rel="stylesheet"
	type="text/css" />
<!-- 公共js  -->
<script language="javascript" src="<%=webpath%>/common/js/td_common.js"></script>
<script language="javascript" src="<%=webpath%>/common/js/waitingbar.js"></script>
<script language=javascript src="<%=webpath%>/unieap/js/Globals.js"></script>
<script language=javascript src="<%=webpath%>/unieap/js/Common.js"></script>
<script language="javascript"
	src="<%=webpath%>/orderaccept/custRecognition/js/CustRecognitionHead.js"></script>
<script language="javascript"
	src="<%=webpath%>/custcontact/orderaccept/base/jutil/JUtil.js"></script>
<script language="javascript"
	src="<%=webpath%>/custcontact/common/businessmodule/jscu/Jscu.js"></script>
<script language="javascript"
	src="<%=webpath%>/custcontact/businessaccept/js/CheckIdHandler.js"></script>
<script language="javascript"
	src="<%=webpath%>/custcontact/orderaccept/base/Common.js"></script>
<script language="javascript"
	src="<%=webpath%>/orderaccept/common/js/CommonUtils.js"></script>
<link rel="stylesheet" type="text/css"
	href="<%=webpath%>/unieap/ria3.3/unieap/themes/base/css/unieap.css" />
<link rel="stylesheet" type="text/css"
	href="<%=webpath%>/unieap/ria3.3/unieap/themes/blue/css/unieap.css" />
<script language="javascript"
	src="<%=webpath%>/unieap/ria3.3/dojo/dojo.js"></script>
<script language="javascript"
	src="<%=webpath%>/orderaccept/riaconfig/crm1GlobalConfig.js"></script>
<script language="javascript"
	src="<%=webpath%>/orderaccept/common/dialog/MessageBox.js"></script>
<script language="javascript"
	src="<%=webpath%>/orderaccept/common/dialog/openWinDialog.js"></script>
<script type="text/javascript">
	dojo.require("unieap.Tooltip");
</script>
<script language="javascript">
	function MyGetData()//OCX读卡成功后的回调函数
	{
		EAPForm.identityKind.value = "1";
		EAPForm.custName.value = GT2ICROCX.NameL;//<-- 姓名--!>		
		EAPForm.linkManName.value = GT2ICROCX.NameL;//<-- 姓名--!>	      
		EAPForm.identityCode.value = GT2ICROCX.CardNo;//<-- 证件号码--!>		
		var bir = GT2ICROCX.BornL;//<-- 出生日期--!>	
		EAPForm.custBirthday.value = bir.substring(0, 4) + "-"
				+ bir.substr(4, 2) + "-" + bir.substr(6, 2);
		EAPForm.certificateAdress.value = GT2ICROCX.Address;//<-- 证件地址--!>
		var add = GT2ICROCX.ActivityLTo;//<-- 证件到期-->
		EAPForm.certificateMature.value = add.substring(0, 4) + "-"
				+ add.substr(4, 2) + "-" + add.substr(6, 2);
		EAPForm.gender.value = GT2ICROCX.Sex;//<-- 性别--!>		
		EAPForm.nation1.value = GT2ICROCX.NationL;//<-- 民族--!>	
	}
	function MyClearData()//OCX读卡失败后的回调函数
	{
	}

	function MyGetErrMsg()//OCX读卡消息回调函数
	{
		//alert(GT2ICROCX.ErrMsg);
		EAPForm.fileIO.value = GT2ICROCX.GetPhotoBuffer();
	}
	function StartRead()//开始读卡
	{
		//GT2ICROCX.PhotoPath = "c:"
		if (GT2ICROCX.GetState() == 0 && GT2ICROCX.ReadCard() == 0) {
			MyGetData();

		}

	}
</Script>

<script language="javascript" FOR="GT2ICROCX" EVENT="GetData">
	//设置回调函数

	MyGetData()
</SCRIPT>
<script language="javascript" FOR="GT2ICROCX" EVENT="GetErrMsg">
	//设置回调函数

	MyGetErrMsg()
</SCRIPT>
<script language="javascript" FOR="GT2ICROCX" EVENT="ClearData">
	//设置回调函数
	MyClearData()
</SCRIPT>

</head>
<body onload="cust_Recognition_Head.init();" class="unieap mainBody">
	<unieap:form method="post" action="">
		<input type="hidden" name="custIdHidden" id="custIdHidden" value="">
		<input type="hidden" name="identityKindHidden" id="identityKindHidden"
			value="">
		<input type="hidden" name="identityCodeHidden" id="identityCodeHidden"
			value="">
		<input type="hidden" name="statusCd" id="statusCd" value="">
		<input type="hidden" name="groupFlag" id="groupFlag" value="">
		<input type="hidden" name="accountXml" id="accountXml" value="">
		<input type="hidden" name="accountId" id="accountId" value="">
		<input type="hidden" id="userName" name="userName"
			value="<%=userName%>" />
		<input type="hidden" id="userPassWord" name="userPassWord"
			value="<%=userPassWord%>" />
		<input type="hidden" name="npInfo" id="npInfo" value="" />
		<input type="hidden" name="custXml" id="custXml" value="">
		<input type="hidden" name="operFlag" id="operFlag" value="" />
		<input type="hidden" name="batchFlag" id="batchFlag"
			value="<%=flag%>" />
		<input type="hidden" name="custOrderId" id="custOrderId" value="">
		<input type="hidden" name="preRgsNo" id="preRgsNo" value="">
		<input type="hidden" name="preFlag" id="preFlag" value="">
		<input type="hidden" name="acceptId" id="acceptId" value="">
		<input type="hidden" name="tempSaveOrderXML" id="tempSaveOrderXML"
			value="">
		<input type="hidden" name="preAcceptQueryFlag" id="preAcceptQueryFlag"
			value="" />
		<input type="hidden" name="queryCityCode" id="queryCityCode"
			value="<%=userHomeCity%>" />
		<input type="hidden" name="areaCode" id="areaCode"
			value="<%=areaCode%>" />
		<input type="hidden" name="employeeCity" id="employeeCity"
			value="<%=employeeCity%>" />
		<input type = "hidden" name = "pageOrderButton" id = "pageOrderButton" value="<%=pageOrderButton%>" />
		<input type="hidden" name="importantLevel" id="importantLevel" value="" />
		<input type="hidden" name="serviceIdHidden" id="serviceIdHidden"
			value="">
			<input type="hidden" name="prodcutIdHidden" id="prodcutIdHidden"
			value="">
		<div>
			<table border="0" cellpadding="0" cellspacing="0" class="formTable">
				<!-- 表格标题行-->
				<tr class="tableTitleTR2">
					<td colspan="3">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">&#160;</td>
								<td class="tableTitle2">
									<div class="search_title_right tableTitle_span" id="descInfo"
										onmouseover="cust_Recognition_Head.descInfo_onClick(this)">
										<a href="javascript:void(0)">温馨提示<img
											src="<%=webpath%>/common/images/icon/information-balloon.png"
											width="16" height="16">
										</a>
									</div>
									<div class="search_title_right tableTitle_span">
										<a href="javascript:void(0)" id="compoundQuery"> 高级查询<img
											src="<%=webpath%>/common/images/icon/gjcx_down.png"
											width="16" height="16"> </a>
									</div>
									
									<div class="search_title_right tableTitle_span" id="cartButton">
										<a href="#"
											onclick="cust_Recognition_Head.openShoppingCart();return false;"
											id="shoppingCartLink"><img
											src="<%=webpath%>/common/images/icon/cart_icon.png"
											width="16" height="16" /><font face="Arial">(<span
												id="orderCount" style="font-family: Arial;">0</span>)</font>
										</a>件
									</div> 
									<div class="search_title_right tableTitle_span" id="cartQuery" style="width:100px">
										<a href="#"
											onclick="cust_Recognition_Head.openShoppingCartQueryPage();return false;"
											id="shoppingCartQuery"><img
											src="<%=webpath%>/common/images/icon/search_title_icon.png"
											width="16" height="16" /><font face="Arial">(<span
												id="cartQueryDetail" style="font-family: Arial;">购物车查询</span>)</font>
										</a>
									</div>
									<img
									src="<%=webpath%>/common/images/icon/search_title_icon.png"
									width="16" height="16" />快速查询
									<button class="titleButtonImg" id="newCust"
										style="margin-left: 20px">新建客户</button>
									<button class="titleButtonImg" id="lineButton">资源确认</button>
									<button class="titleButtonImg" id="chooseNumButton">
										选择号码</button></td>
								<td class="tableTitleRight2">&#160;</td>
							</tr>
						</table></td>
				</tr>
				<tr>
					<td class="formTableL">&#160;</td>
					<td class="formTableC">
						<!-- BEGIN 表单核心区域 -->
						<table align="center" border="0" cellpadding="0" cellspacing="2"
							class="formTableCore">
							<tr>
								<td class="formLabel" style="width: 5%">查询方式：</td>
								<td class="formField90"><input name="queryMethod"
									type="radio" value="EASYQUERY" id="easyQuery" checked="checked"><label
									for="easyQuery">客户查询</label> <input name="queryMethod"
									type="radio" value="PREACCEPTQUERY" id="preacceptQuery"><label
									for="preacceptQuery">预受理查询</label></td>
							</tr>
						</table>
						<div id="serviceDiv">
							<table align="center" border="0" cellpadding="0" cellspacing="2"
								class="formTableCore">
								<tr>
									<td class="formField" style="width:35%; text-align:center;">
										<input id="exactQuery" name="exactQuery" type="text"
										tips="业务号码、证件号码、客户名称、ICCID进行模糊查询" valueCache=""
										onkeyup="enterIn(event);" class="NEUHTCInput"
										style="width: 100%"></td>
									<td class="formField"><span class="selectDiv"> <select
											name="query_type">
												<option value="">请选择</option>
												<option value="SERVICEID">业务号码</option>
												<option value="IDENTITYCARD">身份证</option>
												<option value="CUSTNAME">客户名称</option>
												<option value="ICCIDNUM">ICCID号码</option>
												<option value="OTHERIDENTITYCARD">其它证件号码</option>
												<option value="ACCOUNTNUMBERID">管理账号</option>
										</select>
									</span> <input type="checkbox" id="nicetyQuery" value="1"><img
										src="<%=webpath%>/common/images/icon/jqcx_icon.png"
										width="20" height="20"> <input type="checkbox"
										id="custLevel" value="" checked="checked"><img
										src="<%=webpath%>/common/images/icon/khjb_icon.png"
										width="20" height="20"></td>
									<td class="formField2"><unieap:unieapbutton
											securityid="btnQuery" classname="formButton" name="BQuery"
											onclick="" value="查 询" /> <unieap:unieapbutton
											securityid="btnReadIdentity" classname="formButton"
											name="ReadIdentity" onclick="" value="读取身份证" /> <unieap:unieapbutton
											securityid="btnCheckId" classname="formButton"
											name="checkIdBtn" onclick="" value="身份核查" /></td>
								</tr>
							</table>
						</div>
						<div id="passValidWindow"
							style="position: absolute; z-index: 99;width: 40%;display: none;text-align: center;">
							<%@include file="/orderaccept/custRecognition/PasswordValid.jsp"%>
						</div>
						<hr />
						<table align="center" border="0" cellpadding="0" cellspacing="2"
							class="formTableCore">
							<tr>
								<td rowspan="3">
										<div style="width:10%;float:left;display:none">
											<object classid="clsid:4B3CB088-9A00-4D24-87AA-F65C58531039"
												id="SynCardOcx" codeBase="SynCardOcx.CAB#version=1,0,0,1"
												width="89" height="106"> </object>
										</div>
										<img src="<%=webpath%>/common/dx20/images/photo.gif"
												id="identityPhotoLink" name="identityPhotoLink" />
								</td>
								<td class="formLabel">客户名称：</td>
								<td class="formField"><input type="text" id="custNameShow"
									style="border: none;width: 100px;background-color: #F6FAFF"
									readonly="readonly"></td>
								<td class="formLabel">证件类型：</td>
								<td class="formField" id="identityKindShow">&#160;</td>
								<td class="formLabel">证件号码：</td>
								<td class="formField" id="identityCodeShow">&#160;</td>
								<td class="formLabel">信用等级：</td>
								<td class="formField" id="creditLevelShow">&#160;</td>
								<td class="formField"><a href="#"><img id="orderButton"
										src="/crm1/common/images/dg_button.png"
										onclick="cust_Recognition_Head.initProdOfferOrder();return false;"
										width="99" height="22"> </a></td>
							</tr>
							<tr>
								<td class="formLabel">联系人：</td>
								<td class="formField" id="contactNameShow">&#160;</td>
								<td class="formLabel">联系电话：</td>
								<td class="formField" id="contactPhoneShow">&#160;</td>
								<td class="formLabel">证件地址：</td>
								<td class="formField"><input type="text"
									id="certAddressShow"
									style="border: none;width: 220px;background-color: #F6FAFF"
									readonly="readonly"></td>
								<td class="formLabel">会员级别：</td>
								<td class="formField" id="hcustLevelShow">&#160;</td>
								<td class="formField"><a href="#"><img id="modifyCust"
										src="<%=webpath%>/common/images/xgkh_button.png" width="99"
										height="22"> </a></td>
							</tr>
							<tr>
								<td class="formLabel">状态：</td>
								<td class="formField" id="stateShow">&#160;</td>
								<td class="formLabel">战略分群：</td>
								<td class="formField" id="custTypeShow">&#160;</td>
								<td class="formLabel">通讯地址：</td>
								<td class="formField"><input type="text"
									id="linkAddressShow"
									style="border: none;width: 200px;background-color: #F6FAFF"
									readonly="readonly"></td>
								<td class="formLabel">客户积分：</td>
								<td class="formField" id="pointValueShow">&#160;</td>
								<td class="formField"><a href="#"><img
										id="custAllView"
										src="<%=webpath%>/common/images/khqst_button.png" width="99"
										height="22"> </a></td>
							</tr>
							<tr id="ifShow" style="display: none">
								<td>&#160;</td>
								<td colspan="8"><font color="red"
									style="float: left;padding-left: 40px">
										该证件号码下存在欠费用户，请到话费管理-统计查询-查询-证件号欠费信息查询页面查询详细信息 </font></td>
							</tr>
						</table></td>
					<td class="formTableR">&#160;</td>
				</tr>
				<tr>
					<td class="formTableLB">&#160;</td>
					<td class="formTableB">&#160;</td>
					<td class="formTableRB">&#160;</td>
				</tr>
			</table>
		</div>
		<div id="showPicDiv" style="display: none">
			<OBJECT Name="GT2ICROCX" width="102" height="126"
				CLASSID="IdrOcx.cab" CODEBASE="/"></OBJECT>
		</div>
		<div id="custDetailIframe" style="padding-top: 5px;">
			<iframe width="100%" frameborder="0" id="myIframe" scrolling="no"
				height="470px"
				src="<%=webpath%>/newCustRecognitionAction.do?method=doQueryCustDetail"></iframe>
		</div>
	</unieap:form>
</body>
</html>