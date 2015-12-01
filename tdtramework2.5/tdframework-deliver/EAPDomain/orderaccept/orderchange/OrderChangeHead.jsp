<%
  /* 
   **************************************************************
   * 程序名	: OrderChangeHead.jsp
   * 建立日期 : 2012-06-26
   * 作者		: shanpa@neusoft.com
   * 模块		: 订单变更
   * 描述		: 订单变更
   * 备注		: 
   * ------------------------------------------------------------
   * 修改历史
   * 序号		日期		修改人			修改原因
   * 1
   * 2
   **************************************************************
   */
%>
<%@ page language="java" pageEncoding="GBK"%>
<%@ page isELIgnored="false"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%
	String webpath=request.getContextPath();
	String custOrderId = NullProcessUtil.nvlToString((String)request.getAttribute("custOrderId"),"");
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>订单变更</title>
		<regNum value="<%=custOrderId%>" />
		<link href="<%=webpath%>/common/css/td_style_new.css" rel="stylesheet" type="text/css">
		<link rel="stylesheet" type="text/css" href="<%=webpath%>/unieap/ria3.3/unieap/themes/base/css/unieap.css"/>
		<link rel="stylesheet" type="text/css" href="<%=webpath%>/unieap/ria3.3/unieap/themes/blue/css/unieap.css"/>
		
		<script language="javascript" src="<%=webpath%>/common/js/td_common.js" ></script>
		<script language="javascript" src="<%=webpath%>/common/js/titlebar.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/BaseObj.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/SelectObj.js"> </script>
		<script language="javascript" src="<%=webpath%>/custcontact/common/businessmodule/jscu/Jscu.js"></script>			
		<script language="javascript" src="<%=webpath%>/custcontact/common/businessmodule/base/Common.js"></script>
		<script language="javascript" src="<%=webpath%>/orderaccept/orderchange/js/OrderChangeHead.js"></script>
		<link rel="stylesheet" type="text/css" href="<%=webpath%>/unieap/ria3.3/unieap/themes/base/css/unieap.css"/>
		<link rel="stylesheet" type="text/css" href="<%=webpath%>/unieap/ria3.3/unieap/themes/blue/css/unieap.css"/>	
		<script language="javascript" src="<%=webpath%>/unieap/ria3.3/dojo/dojo.js"></script>
		<script language="javascript" src="<%=webpath%>/orderaccept/riaconfig/crm1GlobalConfig.js"></script>
		<script language="javascript" src="<%=webpath%>/orderaccept/common/dialog/MessageBox.js"></script>
		<script language="javascript" src="<%=webpath%>/orderaccept/common/dialog/openWinDialog.js"></script>
		<script type="text/javascript" src="<%=webpath%>/buscard/common/js/buscard_2.0.js"></script>
	</head>
	<body>
		<form action="" method="post" id="myForm" name="myForm">	
			<input type="hidden" name="webpath" id="webpath" value="<%=webpath %>">
			<table align="center" border="0" cellpadding="0" cellspacing="0" class="formTableCore">
				<!-- 表格标题行-->
				<tr class="tableTitleTR2">
					<td colspan="3"><table width="100%" border="0" cellpadding="0"
						cellspacing="0">
						<tr>
							<td class="tableTitleLeft2">&#160;</td>
							<td class="tableTitle2">
								<img src="common/images/icon/search_title_icon.png" width="16" height="16">快速查询
							</td>
							<td class="tableTitleRight2">&#160;</td>
						</tr>
					</table></td>
				</tr>
				<tr>
					<td class="formTableL">
						&#160;
					</td>
					<td class="formTableC">
						<table align="center" border="0" cellpadding="0" cellspacing="2" class="formTableCore">
							<tr>
								<td class="formLabel"><span class="formRequested">*</span>客户订单号:</td>
								<td class="formField">
									<input type="text" name="custOrderId" id="custOrderId" class="NEUHTCInput" value="<%=custOrderId%>"/>
								</td>
								<td class="formButton2">
									<button name="query" id="query" type="submit" class="formButton" menuId='841BBA'>查 询</button>
									<button  name= "reset" id="reset" class="formButton"  menuId='841BBB'>重 置</button>
								</td>
								<td class="formLabel">&#160;</td>
								<td class="formLabel">&#160;</td>
								<td class="formLabel">&#160;</td>
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
		</form>
	</body>
</html>