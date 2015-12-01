<%
	 /* 
	 **************************************************************
	 * 程序名		: CustRecognitionHighQuery.jsp
	 * 建立日期  	: 2011年05月24日
	 * 作者		: liurong
	 * 模块		: 综合订单受理高级查询
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
		<title>综合受理-高级查询</title>
		<link href="<%=webpath%>/common/css/td_style_new.css" rel="stylesheet" type="text/css" />
		<!-- 公共js  -->
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
				<!-- 表格标题行-->
				<tr class="tableTitleTR2">
					<td colspan="3">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">
									&#160;
								</td>
								<td class="tableTitle2">
									<img src="<%=webpath%>/common/images/icon/search_title_icon.png" width="16" height="16" />高级查询
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
						<!-- BEGIN 表单核心区域 -->
						<table align="center" border="0" cellpadding="0" cellspacing="4" class="formTableCore">
							<tr>
								<td class="formLabel">
									客户名称：
								</td>
								<td class="formField">
									<unieap:input tcname="Text" id="custNameCondition" name="custNameCondition" prompt="客户名称" tooltip="客户名称" value="" maxlength="128" onblur="trimField(this);"/>
								</td>
								<td class="formLabel">
									地市：
								</td>
								<td class="formField">
									<div>
										<cc:SelectTag selectFlag="" selectColl="<%=cityCodeColl%>" selectvalue="" tagName="cityCodeCondition" />
									</div>
								</td>
								<td class="formLabel">
									业务号码：
								</td>
								<td class="formField">
									<unieap:input tcname="Text" id="serviceIdCondition" name="serviceIdCondition"
															prompt="业务号码" tooltip="业务号码" onblur="trimField(this);getProductIdList();" maxlength="128" />
								</td>
								<td class="formLabel">
									业务类型：
								</td>
								<td class="formField">
									<div>
										<span class="selectDiv">
											<select name="productId" id="productId">
												<option value="">
													请选择
												</option>
											</select>
										</span>
									</div>
								</td>
							</tr>
							<tr>
								<td class="formLabel">
									证件号码：
								</td>
								<td class="formField">
									<unieap:input tcname="Text" id="identityCodeCondition" name="identityCodeCondition" maxlength="30" prompt="证件号码" onblur="trimField(this);identityCodeCheck()" />
								</td>
								<td class="formLabel">
									证件类型：
								</td>
								<td class="formField">
									<div>
										<cc:SelectTag selectFlag="" selectColl="<%=mainIdentityKindColl%>" selectvalue="" tagName="identityKindCondition"/>
									</div>
								</td>
								<td class="formLabel">
									客户地址：
								</td>
								<td class="formField">
									<unieap:input tcname="Text" id="custAddressCondition" name="custAddressCondition" prompt="客户地址" tooltip="客户地址"	maxlength="128" onblur="trimField(this);"/>
								</td>
								<td class="formLabel">
									客户编号：
								</td>
								<td class="formField">
									<unieap:input tcname="Text" id="custIdCondition" name="custIdCondition" prompt="客户编号" tooltip="客户编号" maxlength="128" onblur="trimField(this);"/>
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
									<button name="BQuery" class="formButton" onclick="doQuery()">查 询</button>
									<button name="btnReset" class="formButton" onclick="doReset()">重 置</button>
									<button name="btnClose" class="formButton" onclick="doClose()">关 闭</button>
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
