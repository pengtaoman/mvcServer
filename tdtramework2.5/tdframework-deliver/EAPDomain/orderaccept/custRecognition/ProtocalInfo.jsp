
<%
	/* JSP�����Ҫ������Ϣ
	 **************************************************************
	 * ������	: ProtocalInfo.jsp
	 * ��������: 2011-02-16
	 * ����		:menww
	 * ģ��		: �ͻ�ʶ��
	 * ����		: ��������ʾЭ����Ϣ
	 * ��ע		: 
	 * ------------------------------------------------------------
	 * �޸���ʷ
	 * ���		����		�޸���	�޸�ԭ��
	 * 1     2012-5-15  ף����    UI����
	 * 2
	 **************************************************************
	 */
%>
<%@ page contentType="text/html; charset=GBK" language="java"
	isELIgnored="false"%>
<%@ page import="com.neusoft.tdframework.authorization.AuthorizeVO"%>
<%@ page import="com.neusoft.tdframework.common.GlobalParameters"%>
<%@ page import="com.neusoft.tdframework.common.util.PassWord"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%
	String webpath = request.getContextPath();
	String custId = NullProcessUtil.nvlToString(request.getAttribute("custId"), "0");
	String cityCode = NullProcessUtil.nvlToString(request.getAttribute("cityCode"), "0");
	String protocalInfoCount = NullProcessUtil.nvlToString(request
		.getAttribute("protocalInfoCount"), "0");
	AuthorizeVO userVO = ((AuthorizeVO) request.getSession(true).getAttribute(
		GlobalParameters.SESSION_INFO));//Session�е���Ϣ
	String userName = userVO.getWorkNo();
	String userPassWord = PassWord.decode(userVO.getWorkPwd());
	String contractInfoColl = (String) request.getAttribute("contractInfoColl");
	String regionCodeColl = (String) request.getAttribute("regionCodeColl");
	//System.out.println(contractInfoColl);
	if (contractInfoColl == null) {
		contractInfoColl = "{list:[]}";
	}
	if(regionCodeColl==null){
		regionCodeColl  = "{list:[]}";
		
	}
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>Э����Ϣ</title>
		<!-- ����css  -->
		<style type="text/css">
			@import "<%=webpath%>/unieap/ria3.3/unieap/themes/default/css/unieap.css";
		</style>
		<link href="<%=webpath%>/common/dx20/css/workarea_style.css"
			rel="stylesheet" type="text/css" />
		<link href="<%=webpath%>/common/css/td_style_new.css" rel="stylesheet"
			type="text/css" />
		<link
			href="<%=webpath%>/custcontact/orderaccept/base/tip/css/JTip.css"
			rel="stylesheet" type="text/css">
		<style type="text/css">
			 a:HOVER {
				color: green;
			}
			a{
				color: blue;
			}
		</style>
		<script type="text/javascript" src="<%=webpath %>/unieap/ria3.3/dojo/dojo.js" djConfig="isDebug: false, parseOnLoad: true"></script>
		<script language="javascript"
			src="<%=webpath%>/custcontact/orderaccept/base/Common.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"></script>
		<script language="javascript"
			src="<%=webpath%>/common/js/td_common.js"></script>
		<script language="javascript"
			src="<%=webpath%>/custcontact/common/js/commonPattern.js"></script>
		<script language="javascript"
			src="<%=webpath%>/custcontact/orderaccept/base/jscu/Jscu.js"></script>
		<script language="javascript"
			src="<%=webpath%>/orderaccept/custRecognition/js/ProtocalInfo.js"></script>
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
		<script type="text/javascript">
			dojo.require("unieap.layout.TitlePane");
		    dojo.require("unieap.form.Button");
			dojo.require("unieap.Tooltip");
		</script>
		<script type="text/javascript">
			window.onload = function(){
				init(<%=contractInfoColl%>,<%=regionCodeColl%>);
			};
		</script>
	</head>

	<body  class="unieap mainBody">
		<table width="100%" border="1" cellpadding="0" cellspacing="0"
			bordercolor="#d9d9d9" style="border-collapse: collapse;">
			<form method="post" id = 'submitForm'>
			<input type="hidden" id="webpath" value="<%=webpath %>" />
			<input type="hidden" id="custId" name="custId" value="<%=custId%>" />
			<input type="hidden" id="cityCode" name="cityCode"
				value="<%=cityCode%>" />
			<input type="hidden" id="userName" name="userName"
				value="<%=userName%>" />
			<input type="hidden" id="userPassWord" name="userPassWord"
				value="<%=userPassWord%>" />
			<input type="hidden" id="protocalInfoCount" name="protocalInfoCount"
				value="<%=protocalInfoCount%>" />
			<input type="hidden" value="" name =contractId id = 'contractId'/>
			<input type="hidden" value="" name =belongCode id = 'belongCode'/>
			<input type="hidden" value="" name ='protocolAcceptInfoVO' id = 'protocolAcceptInfoVO'/>
			
			</form>	
			<thead>
				<tr id="protocalFlag" style="display: none;">
					<td colspan="6" align="center">
						<input type="button" value="Э����Ϣ" class="button_img"
							name="showProtocalInfo" id="showProtocalInfo"
							onclick="showProtocalInfo()" />
					</td>
				</tr>
				<tr id="custQueryFlag" style="display: none;">
					<td colspan="6" align="center" style="border: 0px;">
						<table align="center" border="0" cellpadding="0" cellspacing="2"
							class="formTableCore">
							<tr>
								<td class="formLabel" style="width: 5%">
									�ͻ�ͳһ���룺
								</td>
								<td class="formField1">
									<span> <input id="custNumber" name="custNumber"
											type="text" class="NEUHTCInput" maxlength="30" prompt="ҵ�����" />
									</span>
									<input type="button" class="searchBtnButton"
										onclick="showPrococalByCustNumber()" />
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<!--����ѡ�� -->
				<tr id="belongCodeTD">
					<td colspan="6" align="center" style="border: 0px;">
						<table align="center" border="0" cellpadding="0" cellspacing="2"
							class="formTableCore">
							<tr>
								<td class="formLabel" style="width: 5%">
									����
								</td>
								<td class="formField1">
									<select id='belongCodeSelect'></select>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr class="table_title">
					<td width="1%">
						&nbsp;
					</td>
					<td width="15%">
						��ͬ����
					</td>
					<td width="15%">
						��ͬ����
					</td>
					<td width="15%">
						�ͻ�����
					</td>
					<td width="15%">
						�ͻ�����
					</td>
					<td width="15%">
						��ͬ��ʼʱ��
					</td>
					<td width="15%">
						��ͬ��ֹʱ��
					</td>
					<td width="5%">
						����
					</td>
				</tr>
			</thead>
			<tbody id="protocolInfoListID">
			</tbody>
		</table>
		<div id="hiddenForJson"></div>
	</body>
</html>
