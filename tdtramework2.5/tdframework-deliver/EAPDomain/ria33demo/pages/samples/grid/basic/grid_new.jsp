<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Grid样例</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushJScript.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/data.js"></script>
    	<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/basic/grid_new.js"></script>
	</head>
    <body class="unieap">
		<table border="1">
			<tr>
				<td><button  dojoType='unieap.form.Button' id="btn_newGrid" onClick="newGrid" label='点击在此处创建Grid'></button></td>
			</tr>
		</table>
		<div dojoType="unieap.layout.TitlePane" title="创建Grid代码" open="true">
			<span style="font-size:14px;">动态创建Grid:单击按钮后，下面代码将被执行。</span>
			<textarea name="code" class="js">
			function newGrid() {
				//是否显示行号
				var vm = {rowNumber: true}; 
				//锁定列数据
				var fixedColumns=[
					{label: "员工编号",name: "attr_empno",width: "150px"}
				]
				//非锁定列数据
				var columns=[
			 		{label: "姓名",name: "NAME",width: "100px"},
					{label: "职位",name: "attr_job",width: "150px"},
					{label: "工资",name : "attr_sal",width : "150px"}
				]
				var fixed={noscroll: true,rows:[fixedColumns]};
				var header={rows:[columns]}
				var layout = [fixed, header];
				//数据绑定
				var binding = {store:'empDataStore'};
				var grid = new unieap.grid.Grid({
					views: vm,
					layout: {structure:layout},
					binding: binding,
					width: 700,
					height: 250
				});
				grid.placeAt('btn_newGrid','before');
				unieap.byId('btn_newGrid').setDisabled(true);
			}
			</textarea>
		</div>
    </body>
</html>
