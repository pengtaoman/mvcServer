<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>checkboxGroup</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/buttonGroup/checkboxGroup.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/unieap/ria3.3/dijit/dijit.js"
			charset="utf-8"></script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单复选按钮组控件说明">
			·复选按钮组本身作为一个FormWidget，支持绑定数据源的方式来动态生成复选按钮组；<br>
			·支持组内按钮的获取；<br>
			·用户可通过设置cols值来控制按钮组布局。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="表单复选按钮组控件样例"
			style="width: 100%;">
			<div dojoType="unieap.form.FieldSet" title="表单复选按钮组控件">
				<table>
					<tr>
						<td colspan="2">
							<div id="CheckboxGroup" cols="3" labelAlign="left"
								dojoType="unieap.form.CheckBoxGroup"
								dataProvider="{'store':'city_store'}"></div>
						</td>
					</tr>
					<tr>
						<td style="font-size: 13px;font-family: 宋体;width:110px">
							获得选中标签值:
						</td>
						<td>
							<div dojoType="unieap.form.Button" label="getValue"
								onclick="get_value()"/>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单复选按钮组控件源码">
			<textarea name="code" class="html">
				<div id="CheckboxGroup" 
					 cols="3"
					 labelAlign="left"
					 dojoType="unieap.form.CheckBoxGroup"
					 dataProvider="{'store':'city_store'}">
				</div>
				
				反选JavaScript：
				unieap.byId('CheckboxGroup').checkReverse();
			</textarea>
		</div>
	</body>
</html>