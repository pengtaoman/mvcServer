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
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/basic/grid_binding.js"></script>      
    </head>
    <body class="unieap">
	    <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			该样例展示了数据表格（Grid）组件中与数据绑定相关的特性：<br />
			·初始化绑定DataStore（10000条数据）；<br />
			·动态设置DataStore；<br />
		</div>
		<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
			binding="{store:'largedata'}">
			<fixed>
				<cell label="员工编号" width="150" name="attr_empno"></cell>
			</fixed>
			<header>
				<cell width="250px" label="姓名" name="NAME"></cell>
				<cell width="250px" label="职位" name="attr_job"></cell>
				<cell width="200px" label="工资" name="attr_sal" dataType="number"></cell>
			</header>
		</div>
		<br />
		<table border="0" cellspacing="5" cellpadding="0">
			<tr>
				<td><div dojoType="unieap.form.Button" label="切换DataStore" class="formfield" onclick="setDataStore" style="text-align: left;"></div>
				</td>
				<td>
					<div dojoType='unieap.form.Button' label='获得表格记录数' onClick='getRowCount'></div>
				</td>
			</tr>
		</table>
		<div dojoType="unieap.layout.TitlePane" open="open" title="说明">
			<textarea name="code" class="html">
				<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
					binding="{store:'largedata'}">
						
				    <!-- fixed表示锁定列,当调整表头宽度时该列不会出现横向滚动条,始终在用户视线内 -->
					<fixed>
						<cell label="员工编号" width="150" name="attr_empno"></cell>
					</fixed>
					<header>
						<cell width="250px" label="姓名" name="NAME"></cell>
						<cell width="250px" label="职位" name="attr_job"></cell>
						<cell width="200px" label="工资" name="attr_sal" dataType="number"></cell>
					</header>
				</div>
			</textarea>
			<span style="font-size:14px;">动态设置DataStore：</span>
			<textarea name="code1" class="js">
				
				var binding=unieap.byId("grid").getBinding();
				
				binding.setDataStore(unieap.getDataStore("empDataStore"));
				
			</textarea>
			<span style="font-size:14px;">取得表格数据行数：</span>
			<textarea name="code2" class="js">
				
				var rowCount=unieap.byId("grid").getBinding().getRowCount();
				
			</textarea>
		</div>
    </body>
</html>
