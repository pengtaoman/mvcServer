<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>
<%@ page import="com.neusoft.unieap.config.SystemConfig" %>
<%
	String webPath = request.getContextPath();
    String appPath = EAPConfigHelper.getApplicationContextPath(request);
	String show = "";
	if (EAPConfigHelper.getStartedApplicationPrefixes(pageContext).length == 1) {
		show = "style=\"display:none\"";
	}
    
%>

<html>
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<META HTTP-EQUIV="MSThemeCompatible" CONTENT="No"/>
<title>UniEAP 演示系统</title>

<LINK	href="<%=webPath%>/unieap/common/Style.css" rel="stylesheet"></LINK>

<script language=javascript	src="<%=appPath%>/pages/menu/RootMenu.js"></script>
<script type="text/javascript">		
			var appPath = "<%= appPath %>";
</script>	
<style>

body {
	background: #FFFFFF;
	margin: 0px;
}

.head_tab_checked_bk {
	color: #000;
	text-decoration: none;
}

.head_bg_blue2 {
	background-image: url(<%=appPath%>/pages/menu/images/head_bg_blue.png);
	background-repeat: no-repeat;
}

.head_bg_black2 {
	background-image: url(<%=appPath%>/pages/menu/images/head_bg_black.gif);
	background-repeat: repeat-x;
}
</style>
<script>

</script>
</head>

<body class="body" >
<!-- 
<input type="button" onclick="refreshMessage();" value="查看我的信息">
<span id="spannews"><font color='black' id='fontitem'></font></span>
 -->

<table width="100%" height="68" border="0" cellpadding="0"
	cellspacing="0">
	<tr>
		<td width="182"><img
			src="<%=appPath%>/pages/menu/images/head_logo_UniEAP.png" width="177"
			height="68" /></td>
		<td class="head_bg_black2" width="100%">
		<table  width="100%"  height="68" border="0" cellpadding="0"
			cellspacing="0">
			
				 
					 <tr>
						<td  width="230"><img
							src="<%=appPath%>/pages/menu/images/head_bg_blue.png" 
							 border="0" align="absmiddle"  />
						</td>
						<td  width="230"><span id="userName"></span><span  onmouseover="showToolTip(this)" id="org"></span>
						</td >
						<td  width="400">&nbsp;
						</td>
						
						<td width="30"><div id="exceptionImg" onClick="showException()"></div></td>
						<!-- 
						<td width="45" align="right" >
							 <img
							src="<%=appPath%>/pages/menu/images/lock.gif" alt="锁定系统" style="cursor:pointer"
							width="30" height="30" border="0" align="absmiddle" onclick="lockSystem()" />
						</td>
						 -->
						
						<td  width="45" align="right"><img style="display:none;"
							src="<%=appPath%>/pages/menu/images/password.gif" alt="修改密码" style="cursor:pointer"
							width="30" height="30" border="0" align="absmiddle" onclick="changePersonProps()" />
						</td>
						
						<td width="45" align="right" nowrap="nowrap" <%=show%>><a
							href="<%=request.getContextPath()%>/index.jsp" target="_top"><img  alt="多应用"
							src="<%=appPath%>/pages/menu/images/apps.gif"
							width="30" height="30" border="0" align="absmiddle" /></a></td>
			
						<td width="45" align="right"><a
							href="<%=request.getContextPath()%>/login.do?method=begin"
							target="_top"><img
							src="<%=appPath%>/pages/menu/images/logout.gif" alt="注销"
							width="30" height="30" border="0" align="absmiddle" /></a></td>
						<td width="110" align="right"><img
							src="<%=appPath%>/pages/menu/images/head_logo_neusoft.gif"
							width="103" height="68" /></td>
						<td width="37">&nbsp;</td>
					
				
			</tr>
		</table>
		</td>
	</tr>
</table>

</body>
</html>
