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
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style type="text/css">td img {display: block;}</style>
<script language="JavaScript1.2" type="text/javascript">
<!--

function showDate()
{
	var D=new Date();
	var yy=D.getFullYear();
	var mm=D.getMonth()+1;
	var dd=D.getDate();
	document.getElementById('currentdate').innerHTML = yy+ "年" + mm + "月" + dd + "日";
}

var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var s;
        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
        (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
        (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

function correctPNG() 
   {
   for(var i=0; i<document.images.length; i++)
      {
      var img = document.images[i]
      var imgName = img.src.toUpperCase()
      if (imgName.substring(imgName.length-3, imgName.length) == "PNG")
         {
         var imgID = (img.id) ? "id='" + img.id + "' " : ""
         var imgClass = (img.className) ? "class='" + img.className + "' " : ""
         var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
         var imgStyle = "display:inline-block;" + img.style.cssText 
         if (img.align == "left") imgStyle = "float:left;" + imgStyle
         if (img.align == "right") imgStyle = "float:right;" + imgStyle
         if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle        
         var strNewHTML = "<span "+ imgID + imgClass + imgTitle + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";" + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" + "(src='" + img.src + "', sizingMethod='scale');\"></span>" 
   img.outerHTML = strNewHTML
         i = i-1
         }
      }
   }

if(Sys.ie=="6.0") window.attachEvent("onload", correctPNG);
window.onload=showDate;
//window.attachEvent("onload",showDate);

function setCurrentUser(username)
{
	document.getElementById("username").innerHTML = username;
}

function _ToolBar(operation)
{
	if(operation == "config")
	{
		parent.FW_goToURL("<%=actionBase%>pref.do");
		//alert(operation);
	}
	else if(operation == "logout")
	{
		parent.FW_logout();
		//alert(operation);
	}
	else if(operation == "help")
	{
		parent.FW_openAnotherSite("http://developer.neusoft.com");
		//alert(operation);
	}
}
//-->
</script>
</head>
<body bgcolor="#ffffff" style="padding:0px; margin:0px;">
<!-- Total Height:88px -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
	<td height="68" style="background-image:url(<%=picBase%>head_img/HeadBg.png)" align="right" valign="middle">
	<!--  工具栏开始  -->
	<table border="0" cellpadding="0" cellspacing="0" width="329">
	  <tr>
	   <td><img src="<%=picBase%>head_img/spacer.gif" width="40" height="1" border="0" alt="" /></td>
	   <td><img src="<%=picBase%>head_img/spacer.gif" width="36" height="1" border="0" alt="" /></td>
	   <td><img src="<%=picBase%>head_img/spacer.gif" width="41" height="1" border="0" alt="" /></td>
	   <td><img src="<%=picBase%>head_img/spacer.gif" width="36" height="1" border="0" alt="" /></td>
	   <td><img src="<%=picBase%>head_img/spacer.gif" width="176" height="1" border="0" alt="" /></td>
	   <td><img src="<%=picBase%>head_img/spacer.gif" width="1" height="1" border="0" alt="" /></td>
	   <td rowspan="4" width="35"><img src="<%=picBase%>head_img/spacer.gif" width="35" height="58" border="0" alt="" /></td>
	  </tr>
	
	  <tr>
	   <td colspan="4"><img src="<%=picBase%>head_img/spacer.gif" width="153" height="21" border="0" alt="" /></td>
	   <td rowspan="2"><img name="ToolBarAndLogo_r1_c5" src="<%=picBase%>head_img/ToolBarAndLogo_r1_c5.png" width="176" height="47" border="0" id="ToolBarAndLogo_r1_c5" alt="" /></td>
	   <td><img src="<%=picBase%>head_img/spacer.gif" width="1" height="21" border="0" alt="" /></td>
	  </tr>
	  <tr>
	   <td rowspan="2"><a href="javascript:_ToolBar('config')"><img name="ToolBarAndLogo_r2_c1" src="<%=picBase%>head_img/ToolBarAndLogo_r2_c1.png" width="40" height="37" border="0" id="ToolBarAndLogo_r2_c1" alt="配置" /></a></td>
	   <td rowspan="2"><a href="javascript:_ToolBar('logout')"><img name="ToolBarAndLogo_r2_c2" src="<%=picBase%>head_img/ToolBarAndLogo_r2_c2.png" width="36" height="37" border="0" id="ToolBarAndLogo_r2_c2" alt="注销" /></a></td>
	   <td rowspan="2"><a href="javascript:_ToolBar('help')"><img name="ToolBarAndLogo_r2_c3" src="<%=picBase%>head_img/ToolBarAndLogo_r2_c3.png" width="41" height="37" border="0" id="ToolBarAndLogo_r2_c3" alt="帮助" /></a></td>
	   <td rowspan="2"><img src="<%=picBase%>head_img/spacer.gif" width="36" height="37" border="0" alt="" /></td>
	   <td><img src="<%=picBase%>head_img/spacer.gif" width="1" height="26" border="0" alt="" /></td>
	  </tr>
	  <tr>
	   <td><img src="<%=picBase%>head_img/spacer.gif" width="176" height="11" border="0" alt="" /></td>
	   <td><img src="<%=picBase%>head_img/spacer.gif" width="1" height="11" border="0" alt="" /></td>
	  </tr>
	</table>
	<!--  工具栏结束 -->
	</td>
</tr>
<tr>
	<td style="height:20px; background-color:#333333;text-align:left;">
	<table cellpadding="0" cellspacing="0" border="0" width="100%">
	<tr>
		<td width="50%" style="text-align:left;">
		<table cellpadding="0" cellspacing="0" border="0" width="100%">
		<tr>
			<td style="width:45%"></td>
			<td style="width:55%;font-size:14px;color:#FFFFFF;padding-top:1px;">当前用户：<span id="username"></span></td>
		</tr>
		</table>
		</td>
		<td width="50%" style="text-align:right">
		<table cellpadding="0" cellspacing="0" border="0">
		<tr>
			<td style="font-size:14px; color:#FFFFFF;padding-top:1px"><span id="currentdate"></span></td>
			<td style="width:76px"></td>
		</tr>
		</table>
		</td>
	</tr>
	</table>
	</td>
</tr>
</table>
<script language="javascript">
	parent.continueLoading();
</script>
</body>
</html>
