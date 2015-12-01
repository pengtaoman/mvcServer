<%@page language="java" contentType="text/html;charset=utf-8"%>
<% 
	String style2009Base = request.getContextPath() + "/" + "unieap/pages/workflow/stylesheet/style2009/";
	String Flag = request.getSession(false) == null ? "CommonStyle" : (request.getSession(false).getAttribute("Style")==null ? "CommonStyle" : (String)request.getSession(false).getAttribute("Style"));

	if("Style2009".equals(Flag))
	{
 %>
<link href="<%=style2009Base%>style09_menuLV3.css" rel="stylesheet" type="text/css" />
<%  }
	else
	{
 %>
<link href="<%=style2009Base%>common_menuLV3.css" rel="stylesheet" type="text/css" />
<%	}
 %>