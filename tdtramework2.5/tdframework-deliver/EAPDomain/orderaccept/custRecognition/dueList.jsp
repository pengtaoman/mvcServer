<%
	/* JSP程序简要描述信息
	 **************************************************************
	 * 程序名	: dueList.jsp
	 * 建立日期    : 2011-06-10
	 * 作者		: liuyong.neu@neusoft.com
	 * 模块		: 到期预警信息
	 * 描述		: 到期预警信息的查询结果页面
	 * 备注		: 
	 * ------------------------------------------------------------
	 * 修改历史
	 * 序号		日期		修改人			修改原因
	 * 1
	 * 2
	 **************************************************************
	 */
%>
<%@ page contentType="text/html; charset=GBK" language="java" isELIgnored="false"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>

<%
	String webpath = request.getContextPath();
	String cityCode = NullProcessUtil.nvlToString((String) request.getAttribute("cityCode"),""); //受理城市     
	String custId = NullProcessUtil.nvlToString(request.getParameter("custId"),"");//客户ID
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>到期预警信息</title>
		<contextPath value="<%=webpath%>" />
		<!-- 公共css  -->
		<link href="<%=webpath%>/common/css/td_style_ec.css" rel=stylesheet>
		<link href="<%=webpath%>/custcontact/orderaccept/common/css/style.css"
			rel="stylesheet" type="text/css">
		<!-- 公共js  -->
		<script language="javascript"
			src="<%=webpath%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=webpath%>/common/js/eccn.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"></script>
		<script type="text/javascript">
			var eccn;
			function init(){
				eccn = new ECCN("ec");
				eccn.init();
			}
		</script>
	</head>
	<body class="mainBody" onload="init();">
		<table width="100%" cellpadding="0" cellspacing="0" border="0" class="form_table">
			<tr>
				<td>
				</td>
			</tr>
			<tr>
				<td>
					<ec:table items="optrs" var="pre"
					action="${pageContext.request.contextPath}/newCustRecognitionAction.do?method=getDueQuery" >
						<ec:row highlightRow="true">
							<ec:column property="prodOfferInstId" title="销售品实例"></ec:column>
							<ec:column property="prodOfferId" title="销售品"></ec:column>
							<ec:column property="custId" title="客户名称"></ec:column>
							<ec:column property="effDate" title="记录生效时间 "></ec:column>
							<ec:column property="expDate" title="记录生效时间 "></ec:column>
							<ec:column property="prodOfferType" title="销售品类型"></ec:column>
							<ec:column property="cityCode" title="城市"></ec:column>	
							<ec:column property="effOrderItemId" title="生效订单项标识"></ec:column>
							<ec:column property="expOrderItemId" title="失效订单项标识"></ec:column>
						</ec:row>
					</ec:table>
				</td>
			</tr>
		</table>
		<input type="hidden" name="cityCode" id="cityCode"value="<%=cityCode%>" />
		<input type="hidden" name="custId" id="custId" value="<%=custId%>" />
	</body>
</html>
