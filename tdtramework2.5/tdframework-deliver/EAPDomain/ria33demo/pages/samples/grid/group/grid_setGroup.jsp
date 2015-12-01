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
				<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/group/grid_setGroup.js"></script>
    </head>
    <body class="unieap">
    	<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			该样例展示了数据表格分组方法：<br />
			·setName(/*array*/ name)；<br />
			·getName()；<br />
			·clear()；<br />
		</div>
		<br>
		<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
			binding="{store:'empDataStore'}"
			group="{groupBar:true}">
			<fixed>
				<cell label="员工编号（attr_empno）" width="10%" name="attr_empno" headerStyles="text-align: left;"></cell>
			</fixed>
			<header>
				<cell width="150px" label="姓名（NAME）" name="NAME" headerStyles="text-align: left;"></cell>
				<cell width="150px" label="部门（attr_deptno）" name="attr_deptno" decoder="{store:'DEPT'}"></cell>
				<cell width="150px" label="职位（attr_job）" name="attr_job" headerStyles="text-align: left;"></cell>
				<cell width="150px" label="所在省（attr_province）"  name="attr_province" decoder="{store:'p'}"></cell>
				<cell width="150px" label="所在市（attr_city）" name="attr_city"  decoder="{store:'c1'}"></cell>
				<cell width="150px" label="工资（attr_sal）" name="attr_sal"></cell>
			</header>
		</div>
		<br>
		<label>分组名称</label><input id="nameInput">（输入表格列标题括号内字符串。若是多条，以半角逗号隔开，区分大小写。）</input>
		<br>
		<button onclick="doGroup()">分组</button>
		<button onclick="getGroup()">取得分组名</button>
		<button onclick="cancelGroup()">取消分组</button>
		<br>
		<br>
		<div dojoType="unieap.layout.TitlePane" open="open" title="说明">
			<span style="font-size:14px;">分组方法：</span>
			<textarea name="code" class="js">
				grid.getManager("GroupManager").setName(/*array*/ name);
			</textarea>
			<br>
			<span style="font-size:14px;">取得分组方法：</span>
			<textarea name="code" class="js">
				grid.getManager("GroupManager").getName();
			</textarea>
			<br>
			<span style="font-size:14px;">取消分组方法：</span>
			<textarea name="code" class="js">
				grid.getManager("GroupManager").clear();
			</textarea>
		</div>
    </body>
</html>
