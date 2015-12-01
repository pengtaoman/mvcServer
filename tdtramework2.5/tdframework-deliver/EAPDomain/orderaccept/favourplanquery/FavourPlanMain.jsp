<%@ page contentType="text/html; charset=GBK" %>

<%/* 
   **************************************************************
   * 程序名 : ChangeUserMain.jsp
   * 建立日期: 2006-8-8
   * 作者 :  zhangzhenzhong@neusoft.com
   * 模块 : 客户接触－业务受理－过户
   * 描述 : 是一个框架，它分上，中，下三部份
   * 备注 : 在框架显示时，ChangeUserHead.jsp页面将被显示在F_HeadFra中
   * ------------------------------------------------------------
   * 修改历史
   * 序号 日期 修改人 修改原因
   * 1
   * 2
   **************************************************************
   */%>
<%
	String webPath=request.getContextPath();
%>
<html>
<head>
	<title>优惠计划主框架</title>
	<meta http-equiv="Content-Type" content="text/html; charset=gbk">
</head>
<frameset rows="120,*,0" frameborder="NO" border="0" framespacing="0">
  <frame name="F_HeadFra" scrolling="NO" noresize src="<%=webPath%>/favourPlanQueryAction.do?method=favourPlanQueryInit" />
  <frame name="F_BodyFra"  noresize src=""/>
  <frame name="F_BottomFra"  noresize src=""/>
</frameset>
<noframes>
<body bgcolor="#FFFFFF" text="#000000">
</body>
</noframes>
</html>
