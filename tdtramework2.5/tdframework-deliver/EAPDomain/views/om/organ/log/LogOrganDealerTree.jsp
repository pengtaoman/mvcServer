<%/* JSP程序简要描述信息
**************************************************************
* 程序名		: LogOrganDealerTree.jsp
* 建立日期	: 2006-12-25
* 作者		: zhaofan
* 模块		: 日志查询--组织机构
* 描述		: 日志查询主页面
* 备注		: 
* ------------------------------------------------------------
* 修改历史
* 序号		日期		修改人			修改原因
* 1   
* 2
**************************************************************
*/
%>

<%@ page language="java" contentType="text/html;charset=gb2312" %>
<%
	String path = request.getContextPath();  
	String organDisplayLocation = path+"/om/OrganDisplayAction.do?OperType=createTree";
	String dealerDisplayLocation = path+"/om/LogQueryAction.do?OperType=showMarketTree";
	String blank = path+"/views/om/blank.html";
%>
<html>
<head>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="content-type" content="text/html; charset=gb2312">
<title></title>
</head>
<frameset framespacing="1" frameborder="0" rows="300,*" id = "treeFrameset">
		<frame name="organTree" scrolling="yes" src="<%=organDisplayLocation%>" scrolling="yes">
		<frame name="dealerTree" scrolling="yes" src="<%=blank%>"scrolling="yes">  	
  	<body>
   		<p>此网页使用了框架，但您的浏览器不支持框架。</p>
  	</body>
  	</noframes>
</frameset>
</html>