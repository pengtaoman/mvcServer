<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>TitlePane样例</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
			@import "<%=appPath%>/pages/samples/blackbird/blackbird.css";
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/blackbird/blackbird.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushJScript.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/layout/basecontainer/container.js">
		</script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			外层的容器大小发生变化的时候，会自动改变关联容器的大小
		</div>	
		<div dojoType="unieap.layout.Container" id="baseContainer" style="height:300px">
		  <div dojoType="unieap.layout.TitlePane" id="titlepane" style="height:100%;" title="容器控件样例">
			content
		  </div>
		</div>
		<div dojoType="unieap.form.Button" onClick="resize" label="设置外层容器的高度"></div>	
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" open="false" dojoType="unieap.layout.TitlePane" title="容器控件源码">
			<textarea name="code" class="html">
		       <div dojoType="unieap.layout.Container" id="baseContainer" style="height:300px">
		           <div dojoType="unieap.layout.TitlePane" id="titlepane" style="height:100%;" title="容器控件样例">
			         content
		           </div>
		       </div>
		       <div dojoType="unieap.form.Button" onClick="resize" label="设置外层容器的高度"></div>	
			</textarea>
			<textarea name="code" class="js">
			function resize(){
               unieap.byId("baseContainer").setHeight("500px");
			}
			</textarea>
		</div>
	</body>
</html>