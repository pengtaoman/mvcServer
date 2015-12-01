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
        <script type="text/javascript" src="<%=appPath%>/pages/samples/grid/group/grid_group_autoApply.js"></script>
    </head>
    <body class="unieap">
    	<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			配置group的autoApply为false时，分组不会自动提交；<br />
			·使用groupBar拖曳进行的分组，可按表格右上角的按键提交；<br />
			·使用编辑方式的分组，可通过GroupManager的commit方法或ViewManager的refresh方法刷新视图提交；<br />
		</div>
		<br>
		<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
			binding="{store:'empDataStore'}"
			group="{groupBar:true,autoApply:false}">
			<fixed>
				<cell label="员工编号（attr_empno）" width="10%" name="attr_empno" ></cell>
			</fixed>
			<header>
				<cell width="150px" label="姓名（attr_ename）" name="NAME" headerStyles="text-align: left;"></cell>
				<cell width="150px" label="部门（attr_deptno）" name="attr_deptno" decoder="{store:'DEPT'}"></cell>
				<cell width="150px" label="职位（attr_job）" name="attr_job" ></cell>
				<cell width="150px" label="所在省（attr_province）"  name="attr_province" decoder="{store:'p'}"></cell>
				<cell width="150px" label="所在市（attr_city）" name="attr_city"  decoder="{store:'c1'}"></cell>
				<cell width="150px" label="工资（attr_sal）" name="attr_sal"></cell>
			</header>
		</div>
		<br>
		<div dojoType="unieap.layout.TitlePane" open="open" title="说明">
			<textarea name="code" class="html">
				<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
					binding="{store:'empDataStore'}"
					group="{groupBar:true,autoApply:false}">
					<fixed>
						<cell label="员工编号（attr_empno）" width="10%" name="attr_empno" ></cell>
					</fixed>
					<header>
						<cell width="150px" label="姓名（attr_ename）" name="NAME" headerStyles="text-align: left;"></cell>
						<cell width="150px" label="部门（attr_deptno）" name="attr_deptno" decoder="{store:'DEPT'}"></cell>
						<cell width="150px" label="职位（attr_job）" name="attr_job" ></cell>
						<cell width="150px" label="所在省（attr_province）"  name="attr_province" decoder="{store:'p'}"></cell>
						<cell width="150px" label="所在市（attr_city）" name="attr_city"  decoder="{store:'c1'}"></cell>
						<cell width="150px" label="工资（attr_sal）" name="attr_sal"></cell>
					</header>
				</div>
			</textarea>
			
		</div>
    </body>
</html>
