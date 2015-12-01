<%
	/* JSP程序简要描述信息
	 **************************************************************
	 * 程序名	: CustInfoList.jsp
	 * 建立日期: 2011-1-09
	 * 作者		:liurong@neusoft.com
	 * 模块		: 客户识别
	 * 描述		: 客户识别显示页面
	 * 备注		: 
	 * ------------------------------------------------------------
	 * 修改历史
	 * 序号		日期		修改人			修改原因
	 * 1
	 * 2
	 **************************************************************
	 */
%>
<%@ page contentType="text/html; charset=GBK" language="java"
	isELIgnored="false"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%
	String webpath = request.getContextPath();
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<contextPath value="<%=webpath%>" />
		<applyEvent value="${param.applyEvent}" />
		<title>客户信息列表</title>
		<!-- 公共css  -->
		<link href="<%=webpath%>/common/css/td_style_ec.css" rel=stylesheet>
		<link href="<%=webpath%>/common/css/td_style_new.css" rel="stylesheet" type="text/css" />
		<!-- 公共js  -->
		<script language="javascript"
			src="<%=webpath%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=webpath%>/common/js/eccn.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"></script>
		<script language="javascript"
			src="<%=webpath%>/orderaccept/custRecognition/js/CustInfoList.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/ria3.3/dojo/dojo.js"></script>
		<script language="javascript" src="<%=webpath%>/orderaccept/riaconfig/crm1GlobalConfig.js"></script>
		<script language="javascript" src="<%=webpath%>/orderaccept/common/dialog/MessageBox.js"></script>
	</head>
	<body class="mainBody" onload="init();" style="padding: 0px;">
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
								<img src="<%=webpath%>/common/images/icon/information_icon.png" width="16" height="16" />查询结果
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
				<td class="formTableC" style="vertical-align: top;">
					<!-- BEGIN 表单核心区域 -->
					<table align="center" border="0" cellpadding="0" cellspacing="2" class="formTableCore" height="100%">
						<tr>
							<td>
								<ec:table items="optrs" var="pre" style="table-layout:fixed;" 
									action="${pageContext.request.contextPath}/ordermgr/newCustRecognitionAction.do?method=doQuery">
									<ec:row>
										<ec:column property="checkBx" title="选择" width="40px"
											filterable="false" sortable="false" style="text-align:center">
											<input type="radio" name="Cust" id="Cust"
												value="${pageScope.pre.custId}" onclick="onRadio('${pageScope.pre.custId}','${pageScope.pre.identityKind}','${pageScope.pre.identityCode}','${pageScope.pre.groupFlag}','${pageScope.pre.cityCode}','${pageScope.pre.serviceId}','${pageScope.pre.productId}')"
												style="width: 40">							
										</ec:column>
										<ec:column property="cityCodeDesc" title="地市" 
											style="text-align:center" />
										<ec:column property="custId" title="客户编号" 
											style="text-align:center" />
										<ec:column property="custName" title="客户名称" 
											style="text-align:center" />
										<ec:column property="identityKindDesc" title="证件类型" 
											style="text-align:center" />
										<ec:column property="identityCode" title="证件号码" 
											style="text-align:center" />
										<ec:column property="productName" title="销售品名称" ellipsis="true" styleClass="eccolomntext"
											style="text-align:center" />
										<ec:column property="productIdDesc" title="产品名称"  ellipsis="true" styleClass="eccolomntext"
											style="text-align:center" />
										<ec:column property="serviceId" title="业务号码" 
											style="text-align:center" />
										<ec:column property="custAddress" title="客户地址" ellipsis="true" styleClass="eccolomntext"
											style="text-align:left" />
										<ec:column property="stateDesc" title="客户状态" 
											style="text-align:center" />
										<ec:column property="groupId" title="客户集团编号" 
											style="text-align:center" />
										<ec:column property="ifExistShopingCart" title="是否有购物车记录" width="100"
											style="text-align:center" />
									</ec:row>
								</ec:table>
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
		<div align="center" style="padding-top: 3px;">
			<button name="btnClose" class="formButton" onclick="parent.unieap.getDialog().close();" style="text-align: center;line-height: 18px;">关 闭</button>
		</div>
	</body>
</html>