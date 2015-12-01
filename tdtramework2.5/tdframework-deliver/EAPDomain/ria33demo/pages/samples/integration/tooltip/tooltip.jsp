<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
		<title>综合样例</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>

		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/integration/tooltip/tooltip.js"></script>
        <script type="text/javascript">
			dojo.require("unieap.Tooltip");
			dojo.addOnLoad(function() {
				dp.SyntaxHighlighter.HighlightAll('code');
			});
			
		</script>
	</head>
	<body class="unieap">
	    <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
	    	 Tooltip组件<br>
		</div>
		<div id="path" value="<%=appPath%>"></div>
		<br/>
		<div  dojoType="unieap.layout.TitlePane" title="tooltip样例" flexible="false">
		<div  dojoType="unieap.layout.TitlePane" title="根据点击事件确定显示位置" flexible="false">
       	<IMG SRC="<%=appPath%>/pages/samples/integration/tooltip/solarsys.bmp" WIDTH=504 HEIGHT=126 BORDER=0  USEMAP="#SystemMap" id="test1">
       	<MAP NAME="SystemMap">
        	<AREA SHAPE="rect" COORDS="0,0,82,126"  onmouseover="showSun(event);">
        	<AREA SHAPE="circle" COORDS="90,58,3"  onmouseover="showMerglobe(event);">
        	<AREA SHAPE="circle" COORDS="124,58,8" onmouseover="showVenglobe(event);">
        	<AREA SHAPE="circle" COORDS="162,58,10" onmouseover="showEarglobe(event);">
        	<AREA SHAPE="circle" COORDS="203,58,8" onmouseover="showMarglobe(event);">
        	<AREA SHAPE="poly" COORDS="221,34,238,37,257,32,278,44,284,60,281,75,288,91,267,87,253,89,237,81,229,64,228,54" onmouseover="showJupglobe(event);">
        	<AREA SHAPE="poly" COORDS="288,19,316,39,330,37,348,47,351,66,349,74,367,105,337,85,324,85,307,77,303,60,307,50" onmouseover="showSatglobe(event);">
        	<AREA SHAPE="poly" COORDS="405,39,408,50,411,57,410,71,404,78,393,80,383,86,381,75,376,69,376,56,380,48,393,44" onmouseover="showUraglobe(event);">
       		<AREA SHAPE="poly" COORDS="445,38,434,49,431,53,427,62,430,72,435,77,445,92,456,77,463,72,463,62,462,53,455,47" onmouseover="showNepglobe(event);">
       		<AREA SHAPE="circle" COORDS="479,66,3" onmouseover="showPluglobe(event);">
       	</MAP>
    	</div>
    	<p id="info">
    		鼠标移至每个星球可以通过tooltip显示星球的名称
    	</p>
    	<p>&nbsp;</p>
    	<div dojoType="unieap.layout.TitlePane" title="其它tooltip特性" flexible="false">
    	  <table width="384" height="65" border="10" bordercolor="#FFFFFF">
            <tr>
              <td width="187"><button id="showInner" dojoType="unieap.form.Button" width="187" label="提示信息来自HTML片段" onClick="showTooltipInner();"></button></td>
              <td width="187"><button id="showInnerDom" dojoType="unieap.form.Button" width="210" label="内容由Dom决定(获取上图DOM对象)" onClick="showTooltipDom();"></button> </td>
            </tr>
            <tr>
              <td><button id="showUrl" dojoType="unieap.form.Button" label="请求后台内容" width="187" onClick="showTooltipUrl();"></button>  </td>
              <td><button id="autoClose" dojoType="unieap.form.Button" label="不可自动关闭tooltip" width="187" onClick="autoCloseTooltip();"></button></td>
              <td><button id="hide" dojoType="unieap.form.Button" label="点击关闭已有tooltip" width="187"  onClick="hideTooltip();"></button></td>
            </tr>
          </table>	
		  </div>
		</div>
		<br>
		<div dojoType="unieap.layout.TitlePane" open="open" title="代码">
		<textarea name="code" class="html">
			<script type="text/javascript">
				
				function showTooltipInner(evt){
					var inner="<b>我是一段HTML片段信息</b>"
					unieap.showTooltip({inner:inner,autoClose:true},unieap.byId("showUrl").domNode)
				}
				function showTooltipDom(){
					var inner  = document.getElementById("info");
					unieap.showTooltip({inner:inner,autoClose:true},unieap.byId("showInnerDom").domNode)
				
				}
				function showTooltipUrl(){
					var appPath=document.getElementById("path").getAttribute("value");
					var path =appPath + "/pages/samples/integration/tooltip/content.txt"
					unieap.showTooltip({url:path,autoClose:true},unieap.byId("showUrl").domNode)
				}
				
				function autoCloseToolTip(){
				   var inner = "<table  vlign='center' ><tr>";
				   inner += "<td align='center'><span>提示框不会自动消失</span></td></tr></table>"
					unieap.showTooltip(inner,unieap.byId("autoClose").domNode,['above','below','after'])
				}
				function hideTooltip(){
					unieap.hideTooltip(unieap.byId("autoClose").domNode)
				}
			
			</script>
		</textarea>
	</body>
</html>