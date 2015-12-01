<%@ page language="java" pageEncoding="UTF-8" %> 
<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>
<html>
<head>
<title>UniEAP 3.3</title>
<%
	String webPath = request.getContextPath();
	String appPath=EAPConfigHelper.getApplicationContextPath(request);


%>
<link rel="stylesheet" href="<%=appPath %>/pages/menu/themes/frame.css" type="text/css"></link> 
<link rel="stylesheet" href="<%=appPath %>/pages/menu/themes/tab.css" type="text/css"></link> 
<link rel="stylesheet" href="<%=webPath%>/unieap/ria3.3/unieap/themes/default/css/menu.css" type="text/css"></link> 
<script language="javascript">
		var appPath = "<%= appPath %>";
		temppath=appPath.split("/");
 		actionpath="/"+temppath[temppath.length-1];	
 		function refreshWorkArea(){
			refresh();
		}
</script>

<script type="text/javascript" src="<%=webPath%>/unieap/ria3.3/dojo/dojo.js" djConfig="parseOnLoad: false,locale:'zh'"></script>
<script type="text/javascript" src="<%=webPath%>/unieap/ria3.3/unieap/patch/dojo-patch.js"></script>

<script type="text/javascript" src="<%=appPath %>/pages/menu/Tab.js"></script>

</head>
<body rightmargin="0" leftmargin="0" scroll="no" class="unieap">

<table style="width:100%;height:100%;" border="0" cellspacing="0" cellpadding="0" >   
  <tr>
  	<td style="height:30px;">
		<table width="100%"  border="0" cellspacing="0" cellpadding="0" class="tab_bg">   
		  	<tr class="tab_bg_tr">
		  		<td style="padding-right:3px;width:25px;" align="right"><div id="forwardBtn" class="btn_forward" title="前移" onclick="forward()"></div></td>
		    	<td class="Tab" ><div id="tabContent" style="width:100%;overflow:hidden;"><div style="width:200000px;overflow:hidden;"><table border="0" cellspacing="0" cellpadding="0" onclick=menuClick(event) oncontextmenu="menuContextClick(event)">
		    	<tr id="unieap_menus"></tr></table></div></div>
		    	</td>
		    	<td style="padding-left:3px;width:25px;"><div id="backBtn" class="btn_back" title="后移" onclick="back()"></div></td>
		    	<td style="width:35px;"></td>
		   	</tr>
		 </table>
  	</td>
 </tr>
 <tr> 
 	<td style="height:100%;">
 		<div style="height:100%;" id="unieap_pages"></div>
 	</td>
 </tr>
</table>
</body>
</html>