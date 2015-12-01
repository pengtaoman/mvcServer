<%@ page contentType="text/html; charset=UTF-8" %>
<%
 String picBase = request.getContextPath() + "/unieap/pages/workflow/stylesheet/style2009/";
 String menuBase = request.getContextPath() + "/unieap/pages/workflow/menu/";
 %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style type="text/css">
td img {display: block;}
A.navigator:link{text-decoration:none; color:#000000}
A.navigator:visited{TEXT-DECORATION:none;COLOR:#000000} 
A.navigator:active{text-decoration:underline; color:#000000}
A.navigator:hover{TEXT-DECORATION:underline; color:#000000} 
</style>
<script language="javascript1.2">
var navigatorList = [];

var root = {text:"UniEAP WorkFlow",link:"<%=picBase%>body_img/welcomePage.html"};

function _init()
{
	navigatorList.push(root);
	_display();
}

function _display()
{
	var result = "";
	for(var i=0;i<navigatorList.length;i++)
	{
		if(i<navigatorList.length-1) result += "<A class=\"navigator\" href='javascript:_navigateToURL(\"" + navigatorList[i].link + "\")'>" + navigatorList[i].text + "</A>&nbsp;&nbsp;->&nbsp;&nbsp;"
		else result+=  navigatorList[i].text;
	}
	_setNavigatorText(result);
}

function _navigateToURL(url)
{
	if(window.parent!=null)
	{
		parent.FW_goToURL(url);
	}
	//alert(url);
}

function _setNavigatorText(text)
{
	document.getElementById('navigator').innerHTML = text;
}

//window.attachEvent("onload", _init);
window.onload=_init;
///////////////////////////////////////////////////////////////////////////

//	Public Methods here

///////////////////////////////////////////////////////////////////////////

function setNavigatorToRoot()
{
	if(navigatorList.length>1) navigatorList = navigatorList.slice(0, 1);
}

function addNavigatorLocation(text,url)
{
	var temp = {text:text,link:url};
	navigatorList.push(temp);
}

function refreshDisplay()
{
	_display();
}
</script>
</head>

<body bgcolor="#ffffff" style="padding:0px; margin:0px;">
<!-- Total Height: 38px -->
<table cellpadding="0" cellspacing="0" border="0" width="100%">
<tr>
	<td style="height:22px;width:3%"></td>
	<td style=" width:94%; padding-top:8px">
	<table cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td style="width:24px;"></td>
		<td style="font-size:14px; font-family:'宋体'"><span id="navigator"></span></td>
	</tr>
	</table>
	</td>
	<td style="width:3%"></td>
</tr>
<tr>
	<td style="text-align:center; height:10px" colspan="3"><hr style="width:94%; color:#666666;height:2px"/></td>
</tr>
<tr>
	<td style="height:11px" colspan="3"></td>
</tr>
</table>
<script language="javascript">
	parent.continueLoading();
</script>
</body>
</html>
