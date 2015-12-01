<%/* JSP程序简要描述信息
			 **************************************************************
			 * 程序名	: OfferStandardAcceptMain.jsp
			 * 建立日期: 2012-02-18
			 * 作者		:Shaochy
			 * 模块		: 基本订单受理
			 * 描述		: 宽带标准化套餐
			 * 备注		: 
			 * ------------------------------------------------------------
			 * 修改历史
			 * 序号		日期		修改人			修改原因
			 * 1
			 * 2
			 **************************************************************
			 */

			%>
<%@ page contentType="text/html; charset=GBK"%>
<%String webpath = request.getContextPath();
%>
<html>
	<head>
		<title>
			宽带标准化套餐受理
		</title>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<meta http-equiv="MSThemeCompatible" content="no" />
		<!-- 禁止缓存 headers -->
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="Expires" content="-1" />
		<meta http-equiv="Cache-Control" content="no-cache" />
		<!-- end 禁止缓存 headers -->
		<link rel="stylesheet" href="<%=webpath%>/common/css/td_style.css" type="text/css" />
	</head>
	<frameset framespacing="0" frameborder="no" rows="130,*,0">
		<frame name="Head" scrolling="auto" src="<%=webpath%>/OfferStandardAcceptAction.do?method=doInitQuery" noresize="noresize"/>
		<frame name="Content" scrolling="auto" src="" />
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