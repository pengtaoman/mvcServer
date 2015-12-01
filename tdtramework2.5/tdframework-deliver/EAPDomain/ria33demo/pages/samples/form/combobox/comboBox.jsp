<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>comboBox</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/form/combobox/comboBox.js">
		</script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单下拉框控件说明">
			·表单下拉框支持的数据源包括unieap.ds.DataStore和html的option节点；
			<br>
			·输入框支持模糊匹配，支持拼音查询；
			<br>
			·支持根据指定数据列排序；
			<br>
			·支持ComboBox组件间的级联；
			<br>
			·支持多种展现风格，包括列表，表格，多选列表；
			<br>
			·支持数据过滤。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="表单下拉框控件样例" style="width: 100%;">
			<table style="width:100%;table-layout:fixed;position:relative" >
				<tr>
					<td style="font-size: 13px;font-family: 宋体" width="120">
						表格下拉列表:
					</td>
					<td>
						<div dojoType="unieap.form.ComboBox" popup="{displayStyle:'table'}" dataProvider="{'store':'city_store'}">
						</div>
					</td>
				</tr>
				<tr width="120">
					<td style="font-size: 13px;font-family: 宋体">
						多选下拉列表:
					</td>
					<td>
						<div popup="{displayStyle:'multi'}" dojoType="unieap.form.ComboBox" dataProvider="{'store':'city_store'}">
						</div>
					</td>
				</tr>
				<tr width="120">
					<td style="font-size: 13px;font-family: 宋体">
						自定义下拉列表:
					</td>
					<td>
						<div dojoType="unieap.form.ComboBox" popup="{structure:structure,getInnerHTML:getInnerHTML}" dataProvider="{'store':'mysearch'}">
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单下拉框控件源码">
			<textarea name="code" class="html">
				表格下拉列表:
				<div dojoType="unieap.form.ComboBox" popup="{displayStyle:'table'}" dataProvider="{'store':'city_store'}">
				</div>
				多选下拉列表:
				<div popup="{displayStyle:'multi'}" dojoType="unieap.form.ComboBox" dataProvider="{'store':'city_store'}">
				</div>
				自定义下拉列表:
				<script type="text/javascript">
					var	structure = {
							rows : [{
								field :"CODEVALUE",
								width : "30%"
							}, {
								"title" : "代码标题",
								field : "CODENAME",
								width : "70%"
							}]
						}
					var imgPath=unieap.appPath + "/pages/samples/form/images/";
					function getInnerHTML(value, item, field, text, matchReg){
						if (field == 'CODEVALUE') {
							if (item.CODEVALUE == "baidu") {
								return "<img style='display:block;height:16px;width:16px' src='"+imgPath+"baidu.bmp"+"' />"
							}else{
								return "<img style='display:block;height:16px;width:16px' src='"+imgPath+"google.bmp"+"' />"
							}
						}
						return "<span>" + value + "</span>";
					}
				</script>
				<div dojoType="unieap.form.ComboBox" popup="{structure:structure,getInnerHTML:getInnerHTML}" dataProvider="{'store':'mysearch'}">
				</div>
			</textarea>
		</div>
	</body>
</html>
