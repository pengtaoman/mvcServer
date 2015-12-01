<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
/*
	工作流统计分析模块
	
	查询入口页
	
	@author yuyang
	@since  2009.09.23
*/
 String path = request.getContextPath();%>
<html>
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
        <title>UniEAP Workflow 效率中心</title>
		<style type="text/css">
			@import "<%=path%>/unieap/ria3.3/unieap/themes/default/css/unieap-all.css";
		</style>
		<script type="text/javascript" src="<%=path%>/unieap/ria3.3/dojo/dojo.js" djConfig="parseOnLoad: true,locale:'zh'" ></script>
		<script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/unieap-all.js" ></script>
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
				//_resizeFullScrContainer();
				dojo.byId("unieap-loadingfrm").style.display="none";
				
			});
		</script>
		
    </head>
    <body class="unieap">
	<div dojoType="unieap.layout.AdaptiveContainer" height="100%">
		<div dojoType="unieap.layout.AdaptivePane" >
			<div dojoType="unieap.layout.TitlePane" open="false" style="height:528px;" title="欢迎使用UniEAP Workflow 效率中心" jsId="Logo"> 
			<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">
			<tr>
				<td style="background-image:url(<%=path%>/unieap/pages/workflow/stylesheet/images/efficiencyCenter/EfficiencyCenter.png); background-repeat:no-repeat; background-attachment:fixed; background-position: 50% 15%;"></td>
			</tr>
			</table>
			</div>
    	</div>
		<div dojoType="unieap.layout.AdaptivePane" autoHeight=true height="100%">
			<div dojoType="unieap.layout.TitlePane" open="true" title="统计分析" style="height:100%" jsId="MainContent"> 
				<div dojoType="unieap.layout.TabContainer" jsId="tabcontainer" style="height:100%;width:100%;">
					<div dojoType="unieap.layout.ContentPane" title="流程模板运行统计分析" href="<%=path%>/unieap/pages/workflow/extension/report/QueryPage_WFTemplate.jsp"></div>
					<!--
					==================================================================================================================
					
					
																	流程实例运行统计分析
					
					
					==================================================================================================================
					  -->
					<div dojoType="unieap.layout.ContentPane" title="流程实例运行统计分析" href="<%=path%>/unieap/pages/workflow/extension/report/QueryPage_WFInstance.jsp"></div>
					<div dojoType="unieap.layout.ContentPane" title="人员工作统计分析" href="<%=path%>/unieap/pages/workflow/extension/report/QueryPage_PersonalWork.jsp"></div>
				</div>
			</div>
		</div>
	</div>
	</body>
</html>