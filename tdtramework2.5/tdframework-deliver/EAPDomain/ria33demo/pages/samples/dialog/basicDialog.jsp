<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>basicDialog</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/dialog/basicdialog.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/unieap/ria3.3/dijit/dijit.js"
			charset="utf-8"></script>
		
		</script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="模态对话框控件说明">
			·模态对话框控件支持拖拽操作、最大化和设置弹出位置；<br>
			·模态对话框控件内容支持指定HTML内容、domNode或URL连接；<br>
			·模态对话框控件支持在窗口内部弹出其他模态对话框；
		</div>
		<div dojoType="unieap.layout.TitlePane" title="模态对话框控件样例" style="width: 100%;">
			<table width="100%">
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:200px">
						弹出预先定义内容的对话框:
					</td>
					<td>
						<div id="btn1" dojoType="unieap.form.Button" label="弹出对话框" onclick="showInner()"></div>
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:200px">
						弹出指向某一连接的对话框:
					</td>
					<td>
						<div id="btn2" dojoType="unieap.form.Button" label="弹出对话框" onclick="showUrl()"></div>
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:200px">
						弹出内容是一个domNode的对话框:
					</td>
					<td>
						<div id="btn3" dojoType="unieap.form.Button" label="弹出对话框" onclick="showDomNode()"></div>
					</td>
				</tr>
			</table>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="模态对话框控件源码">
			<textarea name="code" class="html">
				弹出预先定义内容的对话框:
				var inner = "对话框显示的内容是预先定义，该对话框可以最大化和拖拽改变位置。"
				var dialog = new unieap.dialog.Dialog({inner:inner});
				dialog.show(document.getElementById("btn1")); 
				
				弹出指向某一连接的对话框:
				var dialog = new unieap.dialog.Dialog({url:"<%=appPath%>/pages/samples/dialog/inner.html"});
				dialog.show(document.getElementById("btn2")); 
				
				弹出内容是一个domNode的对话框:
				var node= document.createElement('p');
				var browser = navigator.userAgent.toLowerCase();
				if(browser.indexOf("firefox") != -1){
					node.textContent="对话框显示的内容是一个domNode";
				}else{
					node.innerText="对话框显示的内容是一个domNode";
				}
				var dialog = new unieap.dialog.Dialog({inner:node});
				dialog.show(document.getElementById("btn3"));
			</textarea>
		</div>
	</body>
</html>