
<%
	/* 
	 **************************************************************
	 * ������		: CustRecognitionHead.jsp
	 * ��������  	: 2011��05��24��
	 * ����		: liurong
	 * ģ��		: �ۺ϶���������ҳ
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
			request.getAttribute("flag"), "1");//ҳ��ִ�б�ʶ��1Ϊ�ۺ�����2Ϊ������װ,3ΪNP����ҳ��
	AuthorizeVO userVO = ((AuthorizeVO) request.getSession(true)
			.getAttribute(GlobalParameters.SESSION_INFO));//Session�е���Ϣ
	String passWordDs = (String) request.getSession(true).getAttribute(
			"decodedPass");
	String userName = userVO.getWorkNo();
	String userPassWord = DESUtil.encrypt(passWordDs);
	String userHomeCity = userVO.getHomeCity();
	String areaCode = userVO.getAreaId();
	String employeeCity = userVO.getCityCode();
	
	boolean pageOrderButton = PageCheck.ifHaveRight(request,"841ABY");//����Ȩ�ް�ť
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<context path="<%=webpath%>" />
<title>��ӭ��¼ �й����� BSSϵͳ</title>
<style type="text/css">
@import
	"<%=webpath%>/unieap/ria3.3/unieap/themes/default/css/unieap.css";
</style>
<link href="<%=webpath%>/common/css/td_style_new.css" rel="stylesheet"
	type="text/css" />
<!-- ����js  -->
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
	function MyGetData()//OCX�����ɹ���Ļص�����
	{
		EAPForm.identityKind.value = "1";
		EAPForm.custName.value = GT2ICROCX.NameL;//<-- ����--!>		
		EAPForm.linkManName.value = GT2ICROCX.NameL;//<-- ����--!>	      
		EAPForm.identityCode.value = GT2ICROCX.CardNo;//<-- ֤������--!>		
		var bir = GT2ICROCX.BornL;//<-- ��������--!>	
		EAPForm.custBirthday.value = bir.substring(0, 4) + "-"
				+ bir.substr(4, 2) + "-" + bir.substr(6, 2);
		EAPForm.certificateAdress.value = GT2ICROCX.Address;//<-- ֤����ַ--!>
		var add = GT2ICROCX.ActivityLTo;//<-- ֤������-->
		EAPForm.certificateMature.value = add.substring(0, 4) + "-"
				+ add.substr(4, 2) + "-" + add.substr(6, 2);
		EAPForm.gender.value = GT2ICROCX.Sex;//<-- �Ա�--!>		
		EAPForm.nation1.value = GT2ICROCX.NationL;//<-- ����--!>	
	}
	function MyClearData()//OCX����ʧ�ܺ�Ļص�����
	{
	}

	function MyGetErrMsg()//OCX������Ϣ�ص�����
	{
		//alert(GT2ICROCX.ErrMsg);
		EAPForm.fileIO.value = GT2ICROCX.GetPhotoBuffer();
	}
	function StartRead()//��ʼ����
	{
		//GT2ICROCX.PhotoPath = "c:"
		if (GT2ICROCX.GetState() == 0 && GT2ICROCX.ReadCard() == 0) {
			MyGetData();

		}

	}
</Script>

<script language="javascript" FOR="GT2ICROCX" EVENT="GetData">
	//���ûص�����

	MyGetData()
</SCRIPT>
<script language="javascript" FOR="GT2ICROCX" EVENT="GetErrMsg">
	//���ûص�����

	MyGetErrMsg()
</SCRIPT>
<script language="javascript" FOR="GT2ICROCX" EVENT="ClearData">
	//���ûص�����
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
				<!-- ��������-->
				<tr class="tableTitleTR2">
					<td colspan="3">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">&#160;</td>
								<td class="tableTitle2">
									<div class="search_title_right tableTitle_span" id="descInfo"
										onmouseover="cust_Recognition_Head.descInfo_onClick(this)">
										<a href="javascript:void(0)">��ܰ��ʾ<img
											src="<%=webpath%>/common/images/icon/information-balloon.png"
											width="16" height="16">
										</a>
									</div>
									<div class="search_title_right tableTitle_span">
										<a href="javascript:void(0)" id="compoundQuery"> �߼���ѯ<img
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
										</a>��
									</div> 
									<div class="search_title_right tableTitle_span" id="cartQuery" style="width:100px">
										<a href="#"
											onclick="cust_Recognition_Head.openShoppingCartQueryPage();return false;"
											id="shoppingCartQuery"><img
											src="<%=webpath%>/common/images/icon/search_title_icon.png"
											width="16" height="16" /><font face="Arial">(<span
												id="cartQueryDetail" style="font-family: Arial;">���ﳵ��ѯ</span>)</font>
										</a>
									</div>
									<img
									src="<%=webpath%>/common/images/icon/search_title_icon.png"
									width="16" height="16" />���ٲ�ѯ
									<button class="titleButtonImg" id="newCust"
										style="margin-left: 20px">�½��ͻ�</button>
									<button class="titleButtonImg" id="lineButton">��Դȷ��</button>
									<button class="titleButtonImg" id="chooseNumButton">
										ѡ�����</button></td>
								<td class="tableTitleRight2">&#160;</td>
							</tr>
						</table></td>
				</tr>
				<tr>
					<td class="formTableL">&#160;</td>
					<td class="formTableC">
						<!-- BEGIN ���������� -->
						<table align="center" border="0" cellpadding="0" cellspacing="2"
							class="formTableCore">
							<tr>
								<td class="formLabel" style="width: 5%">��ѯ��ʽ��</td>
								<td class="formField90"><input name="queryMethod"
									type="radio" value="EASYQUERY" id="easyQuery" checked="checked"><label
									for="easyQuery">�ͻ���ѯ</label> <input name="queryMethod"
									type="radio" value="PREACCEPTQUERY" id="preacceptQuery"><label
									for="preacceptQuery">Ԥ�����ѯ</label></td>
							</tr>
						</table>
						<div id="serviceDiv">
							<table align="center" border="0" cellpadding="0" cellspacing="2"
								class="formTableCore">
								<tr>
									<td class="formField" style="width:35%; text-align:center;">
										<input id="exactQuery" name="exactQuery" type="text"
										tips="ҵ����롢֤�����롢�ͻ����ơ�ICCID����ģ����ѯ" valueCache=""
										onkeyup="enterIn(event);" class="NEUHTCInput"
										style="width: 100%"></td>
									<td class="formField"><span class="selectDiv"> <select
											name="query_type">
												<option value="">��ѡ��</option>
												<option value="SERVICEID">ҵ�����</option>
												<option value="IDENTITYCARD">���֤</option>
												<option value="CUSTNAME">�ͻ�����</option>
												<option value="ICCIDNUM">ICCID����</option>
												<option value="OTHERIDENTITYCARD">����֤������</option>
												<option value="ACCOUNTNUMBERID">�����˺�</option>
										</select>
									</span> <input type="checkbox" id="nicetyQuery" value="1"><img
										src="<%=webpath%>/common/images/icon/jqcx_icon.png"
										width="20" height="20"> <input type="checkbox"
										id="custLevel" value="" checked="checked"><img
										src="<%=webpath%>/common/images/icon/khjb_icon.png"
										width="20" height="20"></td>
									<td class="formField2"><unieap:unieapbutton
											securityid="btnQuery" classname="formButton" name="BQuery"
											onclick="" value="�� ѯ" /> <unieap:unieapbutton
											securityid="btnReadIdentity" classname="formButton"
											name="ReadIdentity" onclick="" value="��ȡ���֤" /> <unieap:unieapbutton
											securityid="btnCheckId" classname="formButton"
											name="checkIdBtn" onclick="" value="��ݺ˲�" /></td>
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
								<td class="formLabel">�ͻ����ƣ�</td>
								<td class="formField"><input type="text" id="custNameShow"
									style="border: none;width: 100px;background-color: #F6FAFF"
									readonly="readonly"></td>
								<td class="formLabel">֤�����ͣ�</td>
								<td class="formField" id="identityKindShow">&#160;</td>
								<td class="formLabel">֤�����룺</td>
								<td class="formField" id="identityCodeShow">&#160;</td>
								<td class="formLabel">���õȼ���</td>
								<td class="formField" id="creditLevelShow">&#160;</td>
								<td class="formField"><a href="#"><img id="orderButton"
										src="/crm1/common/images/dg_button.png"
										onclick="cust_Recognition_Head.initProdOfferOrder();return false;"
										width="99" height="22"> </a></td>
							</tr>
							<tr>
								<td class="formLabel">��ϵ�ˣ�</td>
								<td class="formField" id="contactNameShow">&#160;</td>
								<td class="formLabel">��ϵ�绰��</td>
								<td class="formField" id="contactPhoneShow">&#160;</td>
								<td class="formLabel">֤����ַ��</td>
								<td class="formField"><input type="text"
									id="certAddressShow"
									style="border: none;width: 220px;background-color: #F6FAFF"
									readonly="readonly"></td>
								<td class="formLabel">��Ա����</td>
								<td class="formField" id="hcustLevelShow">&#160;</td>
								<td class="formField"><a href="#"><img id="modifyCust"
										src="<%=webpath%>/common/images/xgkh_button.png" width="99"
										height="22"> </a></td>
							</tr>
							<tr>
								<td class="formLabel">״̬��</td>
								<td class="formField" id="stateShow">&#160;</td>
								<td class="formLabel">ս�Է�Ⱥ��</td>
								<td class="formField" id="custTypeShow">&#160;</td>
								<td class="formLabel">ͨѶ��ַ��</td>
								<td class="formField"><input type="text"
									id="linkAddressShow"
									style="border: none;width: 200px;background-color: #F6FAFF"
									readonly="readonly"></td>
								<td class="formLabel">�ͻ����֣�</td>
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
										��֤�������´���Ƿ���û����뵽���ѹ���-ͳ�Ʋ�ѯ-��ѯ-֤����Ƿ����Ϣ��ѯҳ���ѯ��ϸ��Ϣ </font></td>
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