<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String procNum = (String)request.getAttribute("procNum");
String actNum = (String)request.getAttribute("actNum");
String workitemNum = (String)request.getAttribute("workitemNum");%>
<html>
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
        <title>运行中超时任务管理</title>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<script type="text/javascript">
		(function(){	
			var w = (window.innerWidth ||Math.max(document.documentElement.clientWidth , document.body && document.body.offsetWidth))+"px"  ;
			var h = (window.innerHeight ||Math.max( document.documentElement.clientHeight , document.body && document.body.offsetHeight)) +"px";
			var frm = ["<iframe id=\"unieap-loadingfrm\""];
			frm.push("style=\"z-index:1000;position:absolute;top:0px;left:0px;");
			frm.push("width:");
			frm.push(w);
			frm.push(";height:");
			frm.push(h);
			frm.push(";\" FRAMEBORDER=\"0\" "); 
			frm.push("src=\"<%=path%>/unieap/pages/workflow/extension/report/PreLoader.jsp\">");
			frm.push("</iframe>");
			document.write(frm.join(""));
			})();
		</script>
		<script type="text/javascript">
			unieap.WEB_APP_NAME = "<%=path%>";
			dojo.addOnLoad(function(){
				dojo.byId("unieap-loadingfrm").style.display="none";
				
			});
		</script>
		
    </head>
    <body class="unieap">
	<div dojoType="unieap.layout.AdaptiveContainer" height="100%">
		<div dojoType="unieap.layout.AdaptivePane" autoHeight=true height="100%">
			<div dojoType="unieap.layout.TitlePane" open="true" title="运行中超时任务管理" style="height:100%" jsId="MainContent"> 
				<div dojoType="unieap.layout.TabContainer" jsId="tabcontainer" style="height:100%;width:100%;">
					<div dojoType="unieap.layout.ContentPane" title="流程超时任务(<%=procNum%>)" href="<%=path%>/unieap/pages/workflow/management/timermgt/runningProctimertask.jsp"></div>
					<div dojoType="unieap.layout.ContentPane" title="节点超时任务(<%=actNum%>)" href="<%=path%>/unieap/pages/workflow/management/timermgt/runningActtimertask.jsp"></div>
					<div dojoType="unieap.layout.ContentPane" title="工作项超时任务(<%=workitemNum%>)" href="<%=path%>/unieap/pages/workflow/management/timermgt/runningWorkitemtimertask.jsp"></div>
				</div>
			</div>
		</div>
	</div>
	</body>
</html>