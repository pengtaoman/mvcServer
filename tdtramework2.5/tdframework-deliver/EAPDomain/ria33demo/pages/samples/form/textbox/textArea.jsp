<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>textarea</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript">

			dojo.addOnLoad(function(){
				dp.SyntaxHighlighter.HighlightAll('code');
				
			});
	
		 </script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 12px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="多行文本框控件说明">
			·支持设置控件的宽度(百分比)、高度(百分比)。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="多行文本框控件样例"
			style="width: 100%;">
			<table  style="width:100%;">
				<tr>
					<td style="font-size: 12px;font-family: 宋体;width:400px;height:84px">
					   多行文本框展示(width=200,height=80):
					</td>
					<td>
						<div dojoType="unieap.form.Textarea" width="200px" height="80">
						</div>
					</td>
				</tr>
				
				<tr>
					<td style="font-size: 12px;font-family: 宋体;width:400px;height:84px">
					   多行文本框展示(width=100%,height=100%):
					</td>
					<td style="height:80px">
						<div dojoType="unieap.form.Textarea" width="100%" height="100%">
						</div>
					</td>
				</tr>
			</table>
			
			<div id="info" style="font-size:12px;margin-top:5px"></div>
		</div>
		<div style="line-height:20px;font-size: 12px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单文本框控件源码">
			<textarea name="code" class="html">
				<div dojoType="unieap.form.Textarea" width="200" height="80">
				</div>
				
				<td style="height:80px">
					<div dojoType="unieap.form.Textarea" width="100%" height="100%">
					</div>
				</td>
				
				
			</textarea>
		</div>
	</body>
</html>