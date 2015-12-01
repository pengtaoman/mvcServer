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
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/advanced/grid_individual.js"></script>
        
    </head>
    <body class="unieap">
	    <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			该样例展示了数据表格（Grid）组件的个性化设置特性。<br />
			·在<toolbar>标签上配置individual="true"，可打开表格个性化功能；<br />
			·点击工具条上的个性化按钮，在弹出的个性化设置窗口中，您可以设置某些列隐藏或锁定，还可以调整列的顺序。<br />
		</div>
		<br />
		<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="250px" binding="{store:'empDataStore'}" views="{rowBar:true,rowNumber:true}">
            <fixed>
				<cell label="员工编号(attr_empno)" width="20%" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}" name="attr_empno" headerStyles="text-align: left;"></cell>
			</fixed>
			<header>
				<cell width="200px" label="职位(attr_job)" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}" name="attr_job" headerStyles="text-align: left;"></cell>
				<cell width="200px" label="姓名(NAME)" name="attr_ename" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}" headerStyles="text-align: left;"></cell>
				<cell width="200px" label="部门(attr_deptno)" name="attr_deptno" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
				<cell width="200px" label="工资(attr_sal)" name="attr_sal"></cell>
			</header>
            <toolbar individual="true"></toolbar>
        </div>
		<br />
		<div dojoType="unieap.layout.TitlePane" open="open" title="代码">
			<!--span style="font-size:14px;">1、设置Rowbar并显示序号：views="{rowNumber:true}</span-->
			<textarea name="code" class="html">
				<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="250px" binding="{store:'empDataStore'}" views="{rowBar:true,rowNumber:true}">
		            <fixed>
						<cell label="员工编号(attr_empno)" width="20%" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}" name="attr_empno" headerStyles="text-align: left;"></cell>
					</fixed>
					<header>
						<cell width="200px" label="职位(attr_job)" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}" name="attr_job" headerStyles="text-align: left;"></cell>
						<cell width="200px" label="姓名(NAME)" name="attr_ename" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}" headerStyles="text-align: left;"></cell>
						<cell width="200px" label="部门(attr_deptno)" name="attr_deptno" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
						<cell width="200px" label="工资(attr_sal)" name="attr_sal"></cell>
					</header>
		            <toolbar individual="true"></toolbar>
		        </div>
			</textarea>
		</div>
    </body>
</html>
