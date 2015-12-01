<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Grid样例</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
			@import "<%=appPath%>/pages/samples/blackbird/blackbird.css";
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/blackbird/blackbird.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/advanced/grid_complexcell.js"></script>
        
    </head>
    <body class="unieap">
	    <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			该样例展示了数据表格（Grid）组件的复杂表头特性。<br>
		</div>
		<br />
		<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="250px"
			binding="{store:'empDataStore'}" rows="{defaultRowHeight:21}" views="{rowBar:true}">
			<fixed>
				<cell label="员工编号" width="150" name="attr_empno"></cell>
			</fixed>
			<header>
				<row>
					<cell rowSpan="2" label="员工编号" width="25%" name="attr_empno"></cell>
					<cell colSpan="2" label="姓名" name="NAME"  width="65%" headerStyles="text-align: center;color: red;" styles="text-align: center;color: red;"></cell>
				</row>
				<row>
					<cell label="工资" width="30%" name="attr_sal" styles="text-align: center;"></cell>
					<cell label="职务" width="35%" name="attr_job" styles="text-align: center;"></cell>
				</row>
			</header>
		</div>
		<br />
		<div dojoType="unieap.layout.TitlePane" open="open" title="代码">
			<textarea name="code" class="html">
				<div id="grid" dojoType="unieap.grid.Grid" width="900px" height="250px"
					binding="{store:'empDataStore'}" rows="{defaultRowHeight:21}" views="{rowBar:true}">
					<fixed>
						<cell label="员工编号" width="150" name="attr_empno"></cell>
					</fixed>
					<header>
						<row>
							<cell rowSpan="2" label="员工编号" width="150" name="attr_empno"></cell>
							<cell colSpan="2" label="姓名" name="NAME"  width="150" headerStyles="text-align: center;color: red;" styles="text-align: center;color: red;"></cell>
						</row>
						<row>
							<cell label="工资" width="250" name="attr_sal" styles="text-align: center;"></cell>
							<cell label="职务" width="300" name="attr_job" styles="text-align: center;"></cell>
						</row>
					</header>
				</div>
			</textarea>
		</div>
    </body>
</html>
