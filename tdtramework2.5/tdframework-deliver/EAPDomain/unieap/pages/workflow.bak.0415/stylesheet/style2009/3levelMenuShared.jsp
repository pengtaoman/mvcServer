<%@page language="java" contentType="text/html;charset=utf-8"%>
<%
	String style2009Base = request.getContextPath() + "/" + "unieap/pages/workflow/stylesheet/style2009/";
	String style2009MenuBase = request.getContextPath() + "/";
	String _2levelPageId = request.getParameter("parentPageId");
	
	String _2levelMenuText="";
	String _2levelMenuLink="";
	if("taskCenter".equals(_2levelPageId))
	{
		_2levelMenuText = "任务中心";
		_2levelMenuLink = style2009MenuBase + "listtree2009.do?location=" + _2levelPageId;
	}else if("managementCenter".equals(_2levelPageId))
	{
		_2levelMenuText = "管理中心";
		_2levelMenuLink = style2009MenuBase + "listtree2009.do?location=" + _2levelPageId;
	}else if("experienceCenter".equals(_2levelPageId))
	{
		_2levelMenuText = "体验中心";
		_2levelMenuLink = style2009MenuBase + "listtree2009.do?location=" + _2levelPageId;
	}
	
	String Flag = request.getSession(false) == null ? "CommonStyle" : (request.getSession(false).getAttribute("Style")==null ? "CommonStyle" : (String)request.getSession(false).getAttribute("Style"));
	
	if("Style2009".equals(Flag))
	{
 %>
<link href="<%=style2009Base%>style09_menuLV3.css" rel="stylesheet" type="text/css" />
<script language="javascript">
function setNavigateLocation(locArray)
{
	if(window.parent!=null)
	{
		parent.FW_setNavigateLocation(locArray)
	}
	else
	{
	}
}
	
	//For navigator
	var currentLocation = [{text:"<%=_2levelMenuText%>",link:"<%=_2levelMenuLink%>"},
	                   	   {text:window.document.title,link:window.location.href}
	                      ];
	setNavigateLocation(currentLocation);
</script>
<%	}
	else
	{
 %>
<link href="<%=style2009Base%>common_menuLV3.css" rel="stylesheet" type="text/css" />
<%	}
 %>