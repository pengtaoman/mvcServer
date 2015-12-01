
<%
	 /* 
	 **************************************************************
	 * 程序名		: 资源确认页面
	 * 建立日期  	: 2012-10-02
	 * 作者		: shanpa
	 * 模块		:资源确认页面
	 * 描述		: 
	 * 备注		: 
	 * ------------------------------------------------------------
	 * 修改历史
	 * 序号		日期		修改人	修改原因
	 * 1
	 * 2
	 **************************************************************
	 */
%>
<%@ page language="java" pageEncoding="GBK"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<meta http-equiv="MSThemeCompatible" content="no" />
		<title>资源确认</title>
		<script language="javascript">
			function init(){
				document.getElementById("resConfirm").src = dialogArguments.resConfirmURL;
			}
		</script>
	</head>
    <body onload="init();">
		<iframe id="resConfirm" name="resConfirm" src="" style="width:100%;height:100%" scrolling="yes"  frameborder="0">
		</iframe>	
	</body>
</html>
