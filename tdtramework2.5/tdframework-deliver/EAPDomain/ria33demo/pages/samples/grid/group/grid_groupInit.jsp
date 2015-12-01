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
		<script type="text/javascript" src="<%=appPath%>/pages/samples/blackbird/blackbird.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/group/data.js"></script>
        <script type="text/javascript">
			dojo.addOnLoad(function(){
				dp.SyntaxHighlighter.HighlightAll('code');
			});
        </script>
    </head>
    <body class="unieap">
    	<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			在group内配置name属性，可设置表格初始化时分组。
		</div>
		<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
			binding="{store:'empDataStore'}"
			group="{name:['attr_deptno'],groupBar:true}">
			<fixed>
				<cell label="员工编号" width="10%" name="attr_empno" headerStyles="text-align: left;"></cell>
			</fixed>
			<header>
				<cell width="150px" label="姓名" name="NAME" headerStyles="text-align: left;"></cell>
				<cell width="150px" label="部门" name="attr_deptno" decoder="{store:'DEPT'}"></cell>
				<cell width="150px" label="职位" name="attr_job" headerStyles="text-align: left;"></cell>
				<cell width="150px" label="所在省"  name="attr_province" decoder="{store:'p'}"></cell>
				<cell width="150px" label="所在市" name="attr_city"  decoder="{store:'c1'}"></cell>
				<cell width="150px" label="工资" name="attr_sal"></cell>
			</header>
		</div>
		<div dojoType="unieap.layout.TitlePane" open="open" title="页面">
			<textarea name="code" class="html">
				<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
					binding="{store:'empDataStore'}"
					group="{name:['attr_deptno'],groupBar:true}">
					<fixed>
						<cell label="员工编号" width="10%" name="attr_empno" headerStyles="text-align: left;"></cell>
					</fixed>
					<header>
						<cell width="150px" label="姓名" name="NAME" headerStyles="text-align: left;"></cell>
						<cell width="150px" label="部门" name="attr_deptno" decoder="{store:'DEPT'}"></cell>
						<cell width="150px" label="职位" name="attr_job" headerStyles="text-align: left;"></cell>
						<cell width="150px" label="所在省"  name="attr_province" decoder="{store:'p'}"></cell>
						<cell width="150px" label="所在市" name="attr_city"  decoder="{store:'c1'}"></cell>
						<cell width="150px" label="工资" name="attr_sal"></cell>
					</header>
				</div>
			</textarea>
		</div>
    </body>
</html>
