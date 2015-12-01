<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>fieldSet</title>
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
		<script type="text/javascript" src="<%=appPath%>/pages/samples/form/textbox/richTextEditor.js">
		 </script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="富文本编辑器说明">
			·富文本编辑器基于开源组件FCKeditor进行封装实现；<br>
			·支持数据绑定；<br>
			·支持设置ToolBar，默认提供了FCKeditor的两套实现即Default和Basic两种类型；<br>
			·支持文件上传：包括image、flash等。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="富文本编辑器样例" style="width: 100%;">
			<form  style="border: 1px solid gray; width: 99%"
				   dojoType="unieap.form.Form"
				   binding="{store:'des_store',bindIndex:0}">
				<div dojoType="unieap.form.RichTextEditor" binding="{name:'description'}" imageUploadURL="<%=appPath%>/ria_richEditor.do?Type=Image&method=upload"></div>
			</form>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="富文本编辑器源码">
			<textarea name="code" class="html">
				<div dojoType="unieap.form.RichTextEditor" 
					 binding="{name:'description'}" 
					 imageUploadURL="<%=appPath%>/ria_richEditor.do?Type=Image&method=upload">
				</div>
			</textarea>
		</div>
	</body>
</html>