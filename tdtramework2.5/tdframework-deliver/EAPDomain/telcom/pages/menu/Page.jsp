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
		  	<tr>
		  		<td width="20"></td>
		    	<td  class="Tab" ><table border="0" cellspacing="0" cellpadding="0" onclick=menuClick(event) oncontextmenu="menuContextClick(event)">
		    	<tr id="unieap_menus"></tr></table>
		    	</td>
		    	
		    	<td style="padding-left:5px;" width="45" id="favorite"></td>
   				<td  width="45" id="docbook"></td>
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