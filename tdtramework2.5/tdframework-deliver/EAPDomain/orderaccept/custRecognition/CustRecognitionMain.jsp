<%
	 /* 
	 **************************************************************
	 * 程序名		: CustRecognitionMain.jsp
	 * 建立日期  	: 2011年05月24日
	 * 作者		: liurong@neusoft.com
	 * 模块		: 客户识别
	 * 描述		: 
	 * 备注		: 
	 * ------------------------------------------------------------
	 * 修改历史
	 * 序号		日期		修改人	修改原因
	 * 1
	 * 2
	 **************************************************************
	 */
%>
<%@ page language="java" pageEncoding="GBK"%>
<%
String webPath = request.getContextPath();
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<meta http-equiv="MSThemeCompatible" content="no" />
		<title>客户识别</title>
	</head>
	<frameset name="CustRecognitionMain" framespacing="0" frameborder="no" rows="*,0,0">
		<frame name="CustRecognitionContent" scrolling="auto"
			src="<%=webPath%>/ordermgr/newCustRecognitionAction.do?method=doInit&flag=1"
			noresize="noresize" />
		<frame name="Contentlist" scrolling="auto" src="" />
		<frame name="hidden" scrolling="auto" src="" />
		<noframes>
			<body>
				<p>
					此网页使用了框架，但您的浏览器不支持框架。
				</p>
			</body>
		</noframes>
	</frameset>

</html>
