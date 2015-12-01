<%@ page contentType="text/html; charset=UTF-8" %>
<%
 String actionBase = request.getContextPath() + "/";
 String picBase = request.getContextPath() + "/unieap/pages/workflow/stylesheet/style2009/";
 String menuBase = request.getContextPath() + "/unieap/pages/workflow/menu/";
 %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style type="text/css">td img {display: block;}</style>
<script language="JavaScript1.2" type="text/javascript">
<!--
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function _onMainMenuClick(operation)
{
	if(operation=="taskCenter")
	{
		//alert(operation);
		parent.FW_goToURL("<%=actionBase%>listtree2009.do?location=taskCenter");
	}
	
	else if(operation=="manageCenter")
	{
		//alert(operation);
		parent.FW_goToURL("<%=actionBase%>listtree2009.do?location=managementCenter");
	}
	else if(operation=="experienceCenter")
	{
		//alert(operation);
		parent.FW_goToURL("<%=actionBase%>listtree2009.do?location=experienceCenter");
	}
}
//-->

function _toggleSize()
{
	if(window.parent!=null)
	{
		parent.FW_toggleMainMenu();
	}
}
var timer;

function _showIcon()
{
	_clearTimeOut();
	var obj = document.getElementById('hideMenuIcon');
	if(obj!=null)
	{
		if(obj.style.display=="none") obj.style.display = "block";
	}
}

function _hideIcon()
{
	_clearTimeOut();
	timer = setTimeout("_doHide()",2000);
}
function _clearTimeOut()
{
	try{
		if(timer!=null) window.clearTimeout(timer);
	}catch(e)
	{}
}
function _doHide()
{
	var obj = document.getElementById('hideMenuIcon');
	if(obj!=null)
	{
		if(obj.style.display=="block") obj.style.display = "none";
	}
}
</script>
</head>

<body bgcolor="#ffffff" style="padding:0px; margin:0px;" onload="MM_preloadImages('<%=picBase%>mainMenu_img/mainFrame_r5_c2_f2.png','<%=picBase%>mainMenu_img/mainFrame_r8_c2_f2.png','<%=picBase%>mainMenu_img/mainFrame_r10_c2_f2.png');">
<table cellpadding="0" cellspacing="0" border="0" width="162" align="left" onmouseover="_showIcon()" onmouseout="_hideIcon()">
<tr>
	<td style="height:17px;text-align:right">
	<div id="hideMenuIcon" style="display:none;z-index:5;"><a href="javascript:_toggleSize()"><img src="<%=picBase%>common_img/icon_toggle_left.gif" width="15" height="17" border="0" alt="隐藏菜单" style="margin-left:auto;margin-right:0;" /></a></div>
	</td>
</tr>
<tr>
	<td style="height:2px"></td>
</tr>
<tr>
	<td><a href="javascript:_onMainMenuClick('taskCenter')" onmouseout="MM_swapImgRestore();" onmouseover="MM_swapImage('mainFrame_r5_c2','','<%=picBase%>mainMenu_img/mainFrame_r5_c2_f2.png',1);"><img name="mainFrame_r5_c2" src="<%=picBase%>mainMenu_img/mainFrame_r5_c2.png" width="162" height="55" border="0" id="mainFrame_r5_c2" alt="" /></a></td>
</tr>
<tr>
	<td style="height:11px;"></td>
</tr>
<tr>
	<td><a href="javascript:_onMainMenuClick('manageCenter')" onmouseout="MM_swapImgRestore();" onmouseover="MM_swapImage('mainFrame_r8_c2','','<%=picBase%>mainMenu_img/mainFrame_r8_c2_f2.png',1);"><img name="mainFrame_r8_c2" src="<%=picBase%>mainMenu_img/mainFrame_r8_c2.png" width="162" height="55" border="0" id="mainFrame_r8_c2" alt="" /></a></td>
</tr>
<tr>
	<td style="height:11px;"></td>
</tr>
<tr>
	<td><a href="javascript:_onMainMenuClick('experienceCenter')" onmouseout="MM_swapImgRestore();" onmouseover="MM_swapImage('mainFrame_r10_c2','','<%=picBase%>mainMenu_img/mainFrame_r10_c2_f2.png',1);"><img name="mainFrame_r10_c2" src="<%=picBase%>mainMenu_img/mainFrame_r10_c2.png" width="162" height="54" border="0" id="mainFrame_r10_c2" alt="" /></a></td>
</tr>
</table>
<script language="javascript">
	parent.continueLoading();
</script>
</body>
</html>
