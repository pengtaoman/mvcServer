<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>textBoxWithIcon</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/form/style/MyClass.css";
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/form/js/textBoxWithIconDemo.js"></script>
			<script type="text/javascript"
			src="<%=appPath%>/pages/samples/form/js/popupDemo.js"></script>
		<script type="text/javascript">
			dojo.addOnLoad(function(){
					dp.SyntaxHighlighter.HighlightAll('code');
				});

		
			//下拉箭头事件
			function evt_iconClick(){
				alert('您点击了下拉按钮')
			}
		 </script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单带图标文本框控件说明">
			·带图标文本框控件可以方便的更改控件右侧下拉按钮的图标；<br>
			·支持自定义下拉内容。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="表单带图标文本框控件样例"
			style="width: 100%;">
			
			<table style="width:100%;table-layout:fixed;position:relative;">
				<tr>
					<td style="width:20%">普通图片文本框:</td>
					<td><div dojoType="unieap.form.TextBoxWithIcon"></div></td>
				</tr>

				<tr>
					<td style="width:20%">不显示下拉按钮:</td>
					<td><div dojoType="unieap.form.TextBoxWithIcon" showIcon="false" required="true"></div></td>
				</tr>
				
				<tr>
					<td style="width:20%">修改按钮的图标:</td>
					<td><div dojoType="unieap.form.TextBoxWithIcon" iconClass="newIcon"></div></td>
				</tr>
				
				<tr>
					<td style="width:20%">下拉事件:</td>
					<td><div dojoType="unieap.form.TextBoxWithIcon" onIconClick="evt_iconClick"></div></td>
				</tr>

				<tr>
					<td style="width:20%">自定义弹出窗口:</td>
					<td><div dojoType="unieap.formdemo.textBoxWithIconDemo" style="float:left" iconClass="newIcon"></div></td>
				</tr>
			</table>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单带图标文本框控件源码">
			<textarea name="code" class="html">
				<!-- 普通图片文本框-->
				<div dojoType="unieap.form.TextBoxWithIcon">
				</div>
				
				<!-- 不显示下拉按钮 -->
				<div dojoType="unieap.form.TextBoxWithIcon"  value='hello' 
					  showIcon="false" required="true">
			    </div>
				
				<!-- 修改下拉按钮样式  -->
				<div dojoType="unieap.form.TextBoxWithIcon"  iconClass="newIcon"></div>
				
				<!-- 下拉按钮点击事件 -->
				<div dojoType="unieap.form.TextBoxWithIcon" onIconClick="evt_iconClick"></div>
				
				<!-- 自定义弹出窗口 -->
				<div dojoType="unieap.formdemo.textBoxWithIconDemo"></div>

			</textarea>
		</div>
	</body>
</html>