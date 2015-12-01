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
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushJScript.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/app/grid_grid.js"></script>
    </head>
    <body class="unieap">
    	<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="主表格">
	    	<div dojoType="unieap.grid.Grid" id="deptGrid" width="auto" height="100px"
				binding="{store:deptStore}"
				views="{rowNumber:true,onRowClick:changeStore}">
				<header>
					<cell label="部门名称" name="attr_deptno" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
					<cell label="部门编号" name="attr_deptno"></cell>
				</header>
	    	</div>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="从表格">
	        <div dojoType="unieap.grid.Grid" id="empGrid" width="auto" height="200px" 
	        	binding="{}" views="{rowNumber:true}">
	            <header>
	            	<cell label="编号" name="attr_empno"></cell>
	                <cell label="姓名" name="NAME"></cell>
	                <cell label="职位" name="attr_job"></cell>
	                <cell label="工资" name="attr_sal"></cell>
					<cell label="部门编号" name="attr_deptno"></cell>
	            </header>
	        </div>
		</div>
		<br>
		<div dojoType="unieap.layout.TitlePane" open="open" title="说明">
			<span style="font-size:14px;">主表格上监听onRowClick事件：</span>
			<textarea name="code" class="html">
				<div dojoType="unieap.grid.Grid" id="deptGrid" width="auto" height="250px"
					binding="{store:deptStore}"
					views="{rowNumber:true,onRowClick:changeStore}">
					<header>
						<cell label="部门名称" name="attr_deptno" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
						<cell label="部门编号" name="attr_deptno"></cell>
					</header>
		    	</div>
			</textarea>
			<br>
			<span style="font-size:14px;">changeStore方法：</span>
			<textarea name="code" class="js">
				function changeStore(inRowIndex) {
					var dept = deptGrid.getBinding().getRowSet().getItemValue(inRowIndex, "attr_deptno");
					if (dept=="30") {
						unieap.byId("empGrid").getBinding().setDataStore(unieap.getDataStore("emp2"));
					} else if (dept=="10") {
						unieap.byId("empGrid").getBinding().setDataStore(unieap.getDataStore("emp1"));
					}
				}
			</textarea>
		</div>
    </body>
</html>
