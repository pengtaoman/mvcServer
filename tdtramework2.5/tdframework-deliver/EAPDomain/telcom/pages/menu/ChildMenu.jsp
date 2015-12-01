<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>
<%
	String path = request.getContextPath();
    String appPath = EAPConfigHelper.getApplicationContextPath(request);
    
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
<title>MenuTree</title>
<link rel="stylesheet" type="text/css"
	href="<%=appPath%>/pages/menu/themes/navigator.css" ></link>
<link rel="stylesheet" type="text/css"
	href="<%=path%>/unieap/ria3.3/unieap/themes/default/css/common.css"></link>
<link rel="stylesheet" type="text/css"
	href="<%=path%>/unieap/ria3.3/unieap/themes/default/css/tree.css"></link>

<script type="text/javascript" src="<%=path%>/unieap/ria3.3/dojo/dojo.js" djConfig="parseOnLoad: true,locale:'zh'" ></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/patch/dojo-patch.js"></script>
<script type="text/javascript" src="<%=path%>/unieap/ria3.3/dijit/dijit.js"  charset="utf-8"></script>
<script type="text/javascript">
	if (!window.unieap) {
		unieap = {};
	}
	unieap.WEB_APP_NAME = "<%=path%>";
	unieap.appPath = "<%=appPath%>";
	dojo.require("unieap.rpc");
	dojo.require("unieap.tree.Tree");
</script>
<script type="text/javascript"
	src="<%=appPath%>/pages/menu/ChildMenu.js"></script>


</head>
<body class="unieap" >
	<div class="u-ngt">
			<table class="u-ngt-tab" cellspacing="0" cellpadding="0">				
					<tr>
						<td id="nvgcontenttd">	
							<table  width="100%" height="100%" cellspacing="0" cellpadding="0">
								<tr>
									<td id="u-navigator"></td>	
								</tr>
								<tr>
									<td style="height:25px;">
										<div id="ngtmenus" style="display:block;">
											<table width="100%" cellspacing="0" cellpadding="0">
												<tr>
													<td class="u-ngt-btm">
													</td>
												</tr>
												<tr>
													<td class="u-ngt-btm">
													</td>
												</tr>
											</table>
										</div>
										<div class="u-ngt-btm">
											<div class="u-ngt-favorite" title="历史记录" onClick="openFavorite()"></div>
											<div class="u-ngt-display" title="展开" onclick="openMenus(this)"></div>
										</div>
									</td>	
								</tr>
							</table>
						</td>
						<td class="u-ngt-drag" onmousedown="dragNavigator(event,this)">
							<div onClick="zoomNavigator(this)" class="u-ngt-dragproxy"></div>
						</td>
					</tr>				
			</table>
	</div>
</body>
</html>
