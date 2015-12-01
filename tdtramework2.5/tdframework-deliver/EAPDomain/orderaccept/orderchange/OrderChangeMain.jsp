<%
  /* 
   **************************************************************
   * 程序名	: OrderChangeMain.jsp
   * 建立日期 : 2012-06-26
   * 作者		: shanpa@neusoft.com
   * 模块		: 订单变更
   * 描述		: 订单变更页面主跳转页面
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
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%
	String webPath = request.getContextPath();
	String custOrderId = NullProcessUtil.nvlToString((String)request.getParameter("custOrderId"),"");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<meta http-equiv="MSThemeCompatible" content="no" />
<title>订单变更</title>
</head>
<frameset rows="*,0,0" frameborder="NO" border="0" framespacing="0">
	<frame name="F_HeadFra" scrolling="No" noresize src="<%=webPath%>/orderChangeAction.do?method=init&custOrderId=<%=custOrderId%>" />
	<frame name="F_BodyFra" noresize src="" />
	<frame name="F_BottomFra" noresize src="" />
</frameset>
<noframes>
<body>
</body>
</noframes>
</html>