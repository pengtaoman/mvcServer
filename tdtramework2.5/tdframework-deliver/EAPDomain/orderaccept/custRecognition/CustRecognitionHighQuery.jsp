<%
	 /* 
	 **************************************************************
	 * ������		: CustRecognitionHighQuery.jsp
	 * ��������  	: 2011��05��24��
	 * ����		: liurong
	 * ģ��		: �ۺ϶�������߼���ѯ
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
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="cc"%>
<%
	String webpath = request.getContextPath();
	ParamObjectCollection cityCodeColl = (ParamObjectCollection) request
			.getAttribute("cityCodeColl");
	ParamObjectCollection mainIdentityKindColl = (ParamObjectCollection) request
			.getAttribute("mainIdentityKindColl");
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<context path="<%=webpath%>" />
		<title>�ۺ�����-�߼���ѯ</title>
		<link href="<%=webpath%>/common/css/td_style_new.css" rel="stylesheet" type="text/css" />
		<!-- ����js  -->
		<script language="javascript"
			src="<%=webpath%>/common/js/td_common.js"></script>
		<script language=javascript src="<%=webpath%>/unieap/js/Globals.js"></script>
		<script language=javascript src="<%=webpath%>/unieap/js/Common.js"></script>
		<script language=javascript src="<%=webpath%>/common/js/eccn.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/BaseObj.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/TextObj.js"></script>
		<script language="javascript" src="<%=webpath%>/orderaccept/common/js/CommonUtils.js"></script>
		<script language="javascript"
			src="<%=webpath%>/custcontact/common/js/td_operation.js"></script>
		<script language="javascript"
			src="<%=webpath%>/unieap/js/EAPObjsMgr.js"></script>
		<script language="javascript"
			src="<%=webpath%>/orderaccept/custRecognition/js/CustRecognitionHighQuery.js"></script>
		<link rel="stylesheet" type="text/css" href="<%=webpath%>/unieap/ria3.3/unieap/themes/base/css/unieap.css"/>
		<link rel="stylesheet" type="text/css" href="<%=webpath%>/unieap/ria3.3/unieap/themes/blue/css/unieap.css"/> 
		<script language="javascript" src="<%=webpath%>/unieap/ria3.3/dojo/dojo.js"></script>
		<script language="javascript" src="<%=webpath%>/orderaccept/riaconfig/crm1GlobalConfig.js"></script>
		<script language="javascript" src="<%=webpath%>/orderaccept/common/dialog/MessageBox.js"></script>
	</head>
	<body onload="" class="mainBody">
		<unieap:form method="post" action="" >
			<table border="0" cellpadding="0" cellspacing="0" class="formTable">
				<!-- ��������-->
				<tr class="tableTitleTR2">
					<td colspan="3">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">
									&#160;
								</td>
								<td class="tableTitle2">
									<img src="<%=webpath%>/common/images/icon/search_title_icon.png" width="16" height="16" />�߼���ѯ
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
						<!-- BEGIN ���������� -->
						<table align="center" border="0" cellpadding="0" cellspacing="4" class="formTableCore">
							<tr>
								<td class="formLabel">
									�ͻ����ƣ�
								</td>
								<td class="formField">
									<unieap:input tcname="Text" id="custNameCondition" name="custNameCondition" prompt="�ͻ�����" tooltip="�ͻ�����" value="" maxlength="128" onblur="trimField(this);"/>
								</td>
								<td class="formLabel">
									���У�
								</td>
								<td class="formField">
									<div>
										<cc:SelectTag selectFlag="" selectColl="<%=cityCodeColl%>" selectvalue="" tagName="cityCodeCondition" />
									</div>
								</td>
								<td class="formLabel">
									ҵ����룺
								</td>
								<td class="formField">
									<unieap:input tcname="Text" id="serviceIdCondition" name="serviceIdCondition"
															prompt="ҵ�����" tooltip="ҵ�����" onblur="trimField(this);getProductIdList();" maxlength="128" />
								</td>
								<td class="formLabel">
									ҵ�����ͣ�
								</td>
								<td class="formField">
									<div>
										<span class="selectDiv">
											<select name="productId" id="productId">
												<option value="">
													��ѡ��
												</option>
											</select>
										</span>
									</div>
								</td>
							</tr>
							<tr>
								<td class="formLabel">
									֤�����룺
								</td>
								<td class="formField">
									<unieap:input tcname="Text" id="identityCodeCondition" name="identityCodeCondition" maxlength="30" prompt="֤������" onblur="trimField(this);identityCodeCheck()" />
								</td>
								<td class="formLabel">
									֤�����ͣ�
								</td>
								<td class="formField">
									<div>
										<cc:SelectTag selectFlag="" selectColl="<%=mainIdentityKindColl%>" selectvalue="" tagName="identityKindCondition"/>
									</div>
								</td>
								<td class="formLabel">
									�ͻ���ַ��
								</td>
								<td class="formField">
									<unieap:input tcname="Text" id="custAddressCondition" name="custAddressCondition" prompt="�ͻ���ַ" tooltip="�ͻ���ַ"	maxlength="128" onblur="trimField(this);"/>
								</td>
								<td class="formLabel">
									�ͻ���ţ�
								</td>
								<td class="formField">
									<unieap:input tcname="Text" id="custIdCondition" name="custIdCondition" prompt="�ͻ����" tooltip="�ͻ����" maxlength="128" onblur="trimField(this);"/>
								</td>
							</tr>
							<tr>
								<td class="formLabel">
									&nbsp;
								</td>
								<td class="formField">
									&nbsp;
								</td>
								<td class="formLabel">
									&nbsp;
								</td>
								<td class="formField">
									&nbsp;
								</td>
								<td colspan="4" class="formLabel3" style="text-align: right;padding-right: 8px;">
									<input type="checkbox" id="chkNicetyQuery" value="1"><img style="vertical-align: middle;" src="<%=webpath %>/common/images/icon/jqcx_icon.png" width="20" height="20">&nbsp;
									<button name="BQuery" class="formButton" onclick="doQuery()">�� ѯ</button>
									<button name="btnReset" class="formButton" onclick="doReset()">�� ��</button>
									<button name="btnClose" class="formButton" onclick="doClose()">�� ��</button>
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
		</unieap:form>
		<iframe style="padding-top: 5px;" name="ifrCustList" width="100%" height="380px" frameborder="0" scrolling="auto"></iframe>
	</body>
</html>
