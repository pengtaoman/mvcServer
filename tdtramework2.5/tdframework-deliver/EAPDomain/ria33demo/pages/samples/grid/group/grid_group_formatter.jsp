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
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushJScript.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/group/data.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/group/grid_group_formatter.js"></script>
        
    </head>
    <body class="unieap">
    	<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			配置group的formatter可自定义分组行显示，<br />
			formatter有两个参数：name和value。
		</div>
		<div id="grid" id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
			binding="{store:'empDataStore'}"
			group="{name:['attr_province','NAME'],autoApply:true,groupBar:true,formatter:groupFormatter}">
			<fixed>
				<cell label="员工编号" width="10%" name="attr_empno" ></cell>
			</fixed>
			<header>
				<cell width="150px" label="姓名" name="NAME" ></cell>
				<cell width="150px" label="部门" name="attr_deptno" decoder="{store:'DEPT'}"></cell>
				<cell width="150px" label="职位" name="attr_job" ></cell>
				<cell width="150px" label="所在省"  name="attr_province" decoder="{store:'p'}"></cell>
				<cell width="150px" label="所在市" name="attr_city"  decoder="{store:'c1'}"></cell>
				<cell width="150px" label="工资" name="attr_sal"></cell>
			</header>
		</div>
		
		<div dojoType="unieap.layout.TitlePane" open="open" title="说明">
			<textarea name="code" class="html">
				<span style="font-size:14px;">本样例给表格配置了名为groupFormatter的方法</span>
				<div id="grid" id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
					binding="{store:'empDataStore'}"
					group="{name:['attr_province','NAME'],autoApply:true,groupBar:true,formatter:groupFormatter}">
					<fixed>
						<cell label="员工编号" width="10%" name="attr_empno"></cell>
					</fixed>
					<header>
						<cell width="150px" label="姓名" name="NAME" ></cell>
						<cell width="150px" label="部门" name="attr_deptno" decoder="{store:'DEPT'}"></cell>
						<cell width="150px" label="职位" name="attr_job" ></cell>
						<cell width="150px" label="所在省"  name="attr_province" decoder="{store:'p'}"></cell>
						<cell width="150px" label="所在市" name="attr_city"  decoder="{store:'c1'}"></cell>
						<cell width="150px" label="工资" name="attr_sal"></cell>
					</header>
				</div>
			</textarea>
			<span style="font-size:14px;">groupFormatter方法</span>
			<textarea name="code" class="js">
				function groupFormatter(name, value) {
					if (name=="attr_province") {
						return "省份---"+ (value==12?"辽宁":"浙江");
					} else {
						return name+"+++"+value;
					}
				}
			</textarea>
		</div>
    </body>
</html>
