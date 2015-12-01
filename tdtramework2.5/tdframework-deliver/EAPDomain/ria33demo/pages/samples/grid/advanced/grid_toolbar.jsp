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
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/advanced/grid_toolbar.js"></script>

    </head>
    <body class="unieap">
	    <div dojoType="unieap.layout.TitlePane" title="toolbar" open="true">
            <div dojoType="unieap.grid.Grid" id="grid" width="100%" height="250px" 
            	binding="{store:'empDataStore'}" views="{rowBar:true,rowNumber:true}">
                <header>
                    <cell label="姓名" name="attr_ename"></cell>
                    <cell label="部门" name="attr_empno"></cell>
                    <cell label="职位" name="attr_job"></cell>
                    <cell label="工资" name="attr_sal"></cell>
                </header>
				<toolbar>
					<div dojoType="unieap.form.Button" width="75px" label="增加行" onClick="insertRow"></div>
					<div dojoType="unieap.form.Button" width="75px" label="删除当前行" onClick="deleteRow"></div>
				</toolbar>
            </div>
		</div>
		<div dojoType="unieap.layout.TitlePane" open="open" title="说明">
			<textarea name="code" class="html">
				<div dojoType="unieap.grid.Grid" id="grid" width="600px" height="250px" 
	            	binding="{store:'empDataStore'}" views="{rowBar:true,rowNumber:true}">
	                <header>
	                    <cell label="姓名" name="attr_ename"></cell>
	                    <cell label="部门" name="attr_empno"></cell>
	                    <cell label="职位" name="attr_job"></cell>
	                    <cell label="工资" name="attr_sal"></cell>
	                </header>
					<toolbar>
						<div dojoType="unieap.form.Button" width="75px" label="增加行" onClick="insertRow"></div>
						<div dojoType="unieap.form.Button" width="75px" label="删除当前行" onClick="deleteRow"></div>
					</toolbar>
	            </div>
			</textarea>
		</div>
    </body>
</html>
