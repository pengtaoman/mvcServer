<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		
		<title>inlineEditBox</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/unieap/ria3.3/dijit/dijit.js"
			charset="utf-8"></script>
		<script type="text/javascript">
		 	dojo.require("unieap.form.InlineEditBox");
		 	dojo.addOnLoad(function(){
				dojo.parser.parse();
				dp.SyntaxHighlighter.HighlightAll('code');
			});
		 </script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单InlineEditBox控件说明">
			·从外表上看,InlineEditBox控件是一个只读文本;但当点击只读文本时,会弹出一个编辑器,它可以对文本进行编辑；<br>
			·InlineEditBox支持多种类型的编辑器；<br>
			·支持对鼠标事件、数据改变等事件的监听。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="表单InlineEditBox控件样例"
			style="width: 100%;">
			<table width="100%">
				<tr>
					<td style="font-size: 13px;font-family: 宋体; width:'400'">
						编辑类型为文本框的InlineEditBox:
					</td>
					<td>
						<div dojoType="unieap.form.InlineEditBox"
							 editor="{editorClass:'unieap.form.TextBox'}"></div>
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体; width:'400'">
						编辑类型为日期选择框的InlineEditBox:
					</td>
					<td>
						<div dojoType="unieap.form.InlineEditBox"
							 editor="{editorClass:'unieap.form.DateTextBox'}"></div>
					</td>
				</tr>
			</table>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单InlineEditBox控件源码">
			<textarea name="code" class="html">
				编辑类型为文本框的InlineEditBox:
				<div dojoType="unieap.form.InlineEditBox"
					 editor="{editorClass:'unieap.form.TextBox'}">
				</div>
				
				编辑类型为日期选择框的InlineEditBox:
				<div dojoType="unieap.form.InlineEditBox"
				 	 editor="{editorClass:'unieap.form.DateTextBox'}">
				</div>
			</textarea>
		</div>
	</body>
</html>