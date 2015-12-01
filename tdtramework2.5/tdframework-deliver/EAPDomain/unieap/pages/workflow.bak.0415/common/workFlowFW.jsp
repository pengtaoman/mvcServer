<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%
 String actionBase = request.getContextPath() + "/";
 String picBase = request.getContextPath() + "/unieap/pages/workflow/stylesheet/style2009/";
 String menuBase = request.getContextPath() + "/unieap/pages/workflow/menu/";
 %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><bean:message bundle="uniflow" key="workflow.title.window.main"/></title>
<style type="text/css">
<!--
.frameDiv {
	border-top-style: none;
	border-right-style: none;
	border-bottom-style: none;
	border-left-style: none;
}
-->
</style>
<script language="javascript">
var fullRefresh = true;
var headLoaded = false;
var navigatorLoaded = false;
var mainMenuLoaded = false;
var initBodyLoaded = false;

var headHeight = 88;
var navigatorHeight = 42;

var leftSpaceWidth = 9;
var mainMenuWidth = 162;
//解决多次Resize
var lastWidth = -1;
var lastHeight = -1;

var mainMenuState = "show";
var mainMenuObj = null;
var mainContentObj = null;

function autoSetMainContent(divWidth,divHeight)
{
	var top = 15;
	var bottom = 15;
	var left = 55;
	var right = 44;
	var contentWidth = divWidth - left - right;
	if(contentWidth<0) contentWidth = 0
	var contentHeight = divHeight - top - bottom;
	if(contentHeight<0) contentHeight = 0;
	document.getElementById('mainContent').style.height = "" + contentHeight + "px";
	document.getElementById('mainContent').style.width = "" + contentWidth + "px";
}

function confirmObj()
{
	if(mainMenuState=="show")
	{
		mainMenuObj = document.getElementById('mainMenu');
	 	mainContentObj = document.getElementById('mainBody');
	}
	else
	{
		mainMenuObj = document.getElementById('smallMainMenu');
		mainContentObj = document.getElementById('mainBody');
	}
}

function autoSetPage(who)
{
	var width = document.documentElement.clientWidth;
	var height = document.documentElement.clientHeight;

	if(who!=="FW_toggleMainmenu()")
	{
		if(lastWidth == width && lastHeight == height) return;
	}
	
	var extendHeight = (height - headHeight - navigatorHeight);
	extendHeight = extendHeight <0 ? 0 : extendHeight;
	var extendWidth  = (width - mainMenuWidth - leftSpaceWidth -20);
	extendWidth = extendWidth <0 ? 0 : extendWidth;
	
	confirmObj();
	
	mainMenuObj.style.height = "" + extendHeight + "px";
	mainContentObj.style.height = "" + extendHeight + "px";
	mainContentObj.style.width = "" + extendWidth + "px";
	
	var mainMenuFrameObj = document.getElementById('f_mainMenu');
	if(mainMenuFrameObj!=null) mainMenuFrameObj.style.height = "" + extendHeight + "px";
	
	autoSetMainContent(extendWidth,extendHeight);
	
	lastWidth = width;
	lastHeight = height;
}

function _showFullScreenPreLoader()
{
	
	var obj = document.getElementById("preLoader");
	if(obj!=null)
	{
		obj.style.display = "block";
		_resizePreLoader();
		var ht = "";
		ht += "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\" height=\"100%\">";
		ht += "<tr><td height=\"100%\" valign=\"middle\" align=\"center\"><img src=\"<%=picBase%>common_img/preLoader.gif\" width=\"200\" height=\"150\" border=\"0\"\/><\/td><\/tr>";
		ht += "<\/table>";
		obj.innerHTML = ht;
	}
}

function _resizePreLoader()
{
	var obj = document.getElementById("preLoader");
	if(obj!=null)
	{
		if(obj.style.display=="none") return;
		obj.style.width = document.documentElement.clientWidth;
		obj.style.height = document.documentElement.clientHeight;
	}
}

function _hideFullScreenPreLoader()
{
	var obj = document.getElementById("preLoader");
	if(obj!=null)
	{
		obj.style.display = "none";
	}
}

function FW_getMainMenuState()
{
	return mainMenuState;
}

function FW_toggleMainMenu()
{
	var _mainMenuObj;
	var _mainContentObj;
	var _smallMenuObj;
	_smallMenuObj = document.getElementById('smallMainMenu');
	_mainMenuObj = document.getElementById('mainMenu');
	 _mainContentObj = document.getElementById('mainBody');
	 
	if(mainMenuState=="show")
	{   //goto hide
		_mainMenuObj.style.display = "none";
		_smallMenuObj.style.display = "block";
		
		_mainContentObj.style.left = "15px";
		leftSpaceWidth = 0;
		mainMenuWidth = 15;
		mainMenuState = "hide";
	}
	else
	{	//goto show
		_smallMenuObj.style.display = "none";
		_mainMenuObj.style.display = "block";
		
		_mainContentObj.style.left = "172px";
		leftSpaceWidth = 9;
		mainMenuWidth = 162;
		mainMenuState = "show";
	}
	autoSetPage("FW_toggleMainmenu()");
}

function FW_setNavigateLocation(locationArray)
{
	if(!locationArray instanceof Array) {alert('Array Error')}
	else
	{
		f_navigatorBar.setNavigatorToRoot();
		for(var i=0;i<locationArray.length;i++)
		{
			f_navigatorBar.addNavigatorLocation(locationArray[i].text,locationArray[i].link);
		}
		f_navigatorBar.refreshDisplay();
	}
}

function FW_goToURL(url)
{
	if(f_mainContent.location.href!=url) f_mainContent.location.href = url;
}

function FW_relogin()
{
	alert("您的连接已经超时，请重新登录。");
	window.location.href = '';
}

function FW_logout(){
   location.href = "<%=actionBase%>logout.do";;
}

function FW_openAnotherSite(url)
{
	window.open(url);
}

window.onload=function(){autoSetPage("onload");}
window.onresize=function(){_resizePreLoader();autoSetPage("onresize");}
//window.attachEvent("onload", function(){autoSetPage("onload")});
//window.attachEvent("onresize", function(){autoSetPage("onresize")});
</script>
</head>

<body bgcolor="#ffffff" style="padding:0px; margin:0px; overflow-x: hidden; overflow-y: auto;">

<div id="preLoader" style="background-color:#E1EDFC;FILTER: alpha(opacity=95);position:absolute;left:0px;top:0px;z-index:9;"></div>
<script language="javascript">
	_showFullScreenPreLoader();
</script>

<!-- 头部开始 -->
<div id="pageHead" style="position:absolute; left:0px; top:0px; width:100%; height:88px" class="frameDiv">
<iframe name="f_pageHead" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" src="about:blank"></iframe>
</div>
<!-- 头部结束 -->
<!-- 导航栏开始 -->
<div id="navigatorBar" style="position:absolute; left:0px; top:88px; width:100%; height:38px" class="frameDiv">
<iframe name="f_navigatorBar" id="f_navigatorBar" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" src="about:blank"></iframe>
</div>
<!-- 导航栏结束 -->
<!-- 主菜单开始 -->
<div id="smallMainMenu" style="position:absolute; left:0px; width:15px; top:130px;background-color:#E2EDFB;display:none; cursor:pointer" onclick="FW_toggleMainMenu()" title="显示菜单">
<img src="<%=picBase%>/common_img/icon_toggle_right.gif" width="15" height="17" border="0" alt="显示菜单"/>
</div>
<div id="mainMenu" style="position:absolute; left:9px; width:162px;top:130px; background-color:#CCCCCC" class="frameDiv">
<iframe id="f_mainMenu" name="f_mainMenu" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" src="about:blank"></iframe>
</div>
<!-- 主菜单结束 -->
<!-- 主体开始 -->
<div id="mainBody" style="position:absolute; left:172px; top:130px; overflow:auto; background-color:#CCCCCC" class="frameDiv">
<table cellpadding="0" cellspacing="0" border="0" width="100%">
<tr>
	<td style="width:55px; height:15px;background-image:url(<%=picBase%>body_img/left_top.png)"></td>
	<td style="background-image:url(<%=picBase%>body_img/top.png);height:15px;"></td>
	<td style="width:44px; height:15px;background-image:url(<%=picBase%>body_img/right_top.png)"></td>
</tr>
<tr>
	<td style="width:55px; background-image:url(<%=picBase%>body_img/left.png)"></td>
	<td style="background-color:#E3EEFC" id="mainContent">
	<!-- *******  主体内容开始 ******* -->
	<iframe name="f_mainContent" id="f_mainContent" scrolling="auto" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" src="about:blank"></iframe>
	<!-- *******  主体内容结束 ******* -->
	</td>
	<td style="width:44px; background-image:url(<%=picBase%>body_img/right.png)"></td>
</tr>
<tr>
	<td style="width:55px; height:15px; background-image:url(<%=picBase%>body_img/left_bottom.png);"></td>
	<td style="background-image:url(<%=picBase%>body_img/bottom.png); height:15px;"></td>
	<td style="width:44px; height:15px; background-image:url(<%=picBase%>body_img/right_bottom.png);"></td>
</tr>
</table>
</div>
<!-- 主体结束 -->
<script language="javascript">
function continueLoading()
{
	if(fullRefresh)
	{
		if(!headLoaded)
		{
			f_pageHead.location.href = "<%=menuBase%>pageHead.jsp";
			headLoaded = true;
		}
		else if(!navigatorLoaded)
		{
			f_navigatorBar.location.href = "<%=menuBase%>navigatorBar.jsp";
			navigatorLoaded = true;
		}
		else if(!mainMenuLoaded)
		{
			f_mainMenu.location.href = "<%=menuBase%>mainMenu.jsp";
			mainMenuLoaded = true;
		}
		else if(!initBodyLoaded)
		{
			f_mainContent.location.href = "<%=picBase%>body_img/welcomePage.html";
			initBodyLoaded = true;
		}
	}
	if(headLoaded && navigatorLoaded && mainMenuLoaded && initBodyLoaded) fullRefresh = false;
	if(!fullRefresh)
	{
		_hideFullScreenPreLoader();
		var usrInfo = "<%=request.getAttribute("current_user")%><%=request.getAttribute("agent_info")%>";
		usrInfo = usrInfo.replace(/当前用户：/,"");
		f_pageHead.setCurrentUser(usrInfo);
	}
}
continueLoading();
</script>
</body>
</html>