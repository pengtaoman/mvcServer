<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
	<meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
	<title>UniEAP Workflow 效率中心</title>
<script language="javascript">
function _showFullScreenPreLoader()
{
	
	var obj = document.getElementById("preLoader");
	if(obj!=null)
	{
		obj.style.display = "block";
		_resizePreLoader();
		var ht = "";
		ht += "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\" height=\"100%\">";
		ht += "<tr><td height=\"100%\" valign=\"middle\" align=\"center\">没有找到UniEAP Report产品，请先添加UniEAP Report.<\/td><\/tr>";
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
	window.onresize=function(){_resizePreLoader();}
	</script>
</head>
<body bgcolor="#ffffff" style="padding:0px; margin:0px; overflow-x: hidden; overflow-y: auto;">
<div id="preLoader" style="background-color:#E1EDFC;FILTER: alpha(opacity=95);position:absolute;left:0px;top:0px;z-index:9;"></div>
<script language="javascript">
	_showFullScreenPreLoader();
</script>
  </body>
</html>