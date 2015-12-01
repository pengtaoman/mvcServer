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
		<script type="text/javascript" src="<%=appPath%>/pages/samples/layout/titlepane/titlepaneHide.js">
		</script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			TitlePane组件处于隐藏状态，通过调用组件的show和hide方法，实现TitlePane的显示与隐藏
		</div>
		<div dojoType="unieap.layout.TitlePane" id="titlepane" style="height:450px;display:none" title="TitlePane控件样例">
			content
		</div>
		<div dojoType="unieap.form.Button" id="toggleButton" onClick="show" label="显示TitlePane"></div>	
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" open="false" dojoType="unieap.layout.TitlePane" title="TitlePane控件源码">
			<textarea name="code" class="html">
			<div dojoType="unieap.layout.TitlePane" id="titlepane" style="height:450px;display:none" title="TitlePane控件样例">
			   content
			 </div>
			</textarea>
			<textarea name="code" class="js">
			var showOrNot = false;
			function show(){
			   if(showOrNot){
				   unieap.byId("titlepane").hide();
				   unieap.byId("toggleButton").setLabel("显示TitlePane");
				   showOrNot=false;
			   }else{
			       unieap.byId("titlepane").show();
			       unieap.byId("toggleButton").setLabel("隐藏TitlePane");
			       showOrNot=true;
			   }
		    }
			</textarea>
		</div>
	</body>
</html>
