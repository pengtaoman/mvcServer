<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>button</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/form/style/MyClass.css";
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/form/button/button.js"></script>

	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单复选按钮组控件说明">
			·设置按钮的点击事件；<br>
			·设置按钮快捷键；<br>
			·设置按钮样式；<br>
			·下拉按钮。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="按钮控件样例"
			style="width: 100%;">
				<table>
					<tr>
						<td style="font-size: 13px;font-family: 宋体;width:110px">
							点击事件:
						</td>
						<td>
							<div dojoType="unieap.form.Button" label="点击按钮(onClick)" onClick="evt_click"></div>
						</td>
					</tr>
					
					<tr>
						<td style="font-size: 13px;font-family: 宋体;width:110px">
							快捷键:
						</td>
						<td>
							<div dojoType="unieap.form.Button" label="点击按钮(alt+s)" accessKey="s" id="keyBtn" onClick="evt_click"></div>
						</td>
					</tr>

					<tr>
						<td style="font-size: 13px;font-family: 宋体;width:110px">
							禁用控件:
						</td>
						<td>
							<div dojoType="unieap.form.Button" label="禁用按钮" disabled="true" onClick="evt_click"></div>
						</td>
					</tr>

					<tr>
						<td style="font-size: 13px;font-family: 宋体;width:110px">
							设置图标:
						</td>
						<td>
							<div dojoType="unieap.form.Button" label="设置图标" iconClass="newBtn"></div>
						</td>
					</tr>
					
					<tr>
						<td style="font-size: 13px;font-family: 宋体;width:110px">
							下拉按钮:
						</td>
						<td>
							<div dojoType="unieap.form.DropDownButton" label="带图片的下拉按钮" iconClass="newBtn" onClick="evt_dropBtnClick" onArrowClick="evt_dropBtnArrowClick">
								<div dojoType="unieap.menu.Menu">
									<div dojoType="unieap.menu.MenuItem">平台</div>
									<div dojoType="unieap.menu.MenuItem">工作流</div>
									<div dojoType="unieap.menu.MenuItem">报表</div>
								</div>
							</div>
						</td>
					</tr>
				</table>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单复选按钮组控件源码">
			<textarea name="code" class="html">
				<style type="text/css">
					.unieap .newBtn{
						display:inline-block;
						width:16px;
						height:16px;
						background:url("../images/find.gif") no-repeat;
					}
				</style>
				
				<div dojoType="unieap.form.Button" label="点击按钮(onClick)" onClick="evt_click"></div>
				
				<div dojoType="unieap.form.Button" label="点击按钮(alt+s)" accessKey="s"  onClick="evt_click"></div>
				
				<div dojoType="unieap.form.Button" label="禁用按钮" disabled="true" onClick="evt_click"></div>
				
				<div dojoType="unieap.form.Button" label="设置图标" iconClass="newBtn"></div>
				
				<div dojoType="unieap.form.DropDownButton" label="带图片的下拉按钮" iconClass="newBtn" onClick="evt_dropBtnClick" onArrowClick="evt_dropBtnArrowClick">
					<div dojoType="unieap.menu.Menu">
						<div dojoType="unieap.menu.MenuItem">平台</div>
						<div dojoType="unieap.menu.MenuItem">工作流</div>
						<div dojoType="unieap.menu.MenuItem">报表</div>
					</div>
				</div>
				
			</textarea>
		</div>
	</body>
</html>