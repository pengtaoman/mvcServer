<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Grid</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
			@import "<%=appPath%>/pages/samples/blackbird/blackbird.css";
		</style>
		
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushJScript.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/edit/grid_onBeforeEdit.js"></script>

    </head>
    <body class="unieap">
	    <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明"> 
			该样例展示了数据表格（Grid）编辑前事件：<br>
			·“姓名”列上配置了onBeforeEdit事件；<br>
			·样例演示了偶数行时，“姓名”列不可编辑；<br>
		</div>
		<br />
		<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
			binding="{store:'empDataStore'}" views="{rowNumber:true}"
			edit="{editType:'rowEdit'}">
			<fixed>
				<cell label="员工编号" width="10%" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}" name="attr_empno" headerStyles="text-align: left;"></cell>
			</fixed>
			<header>
				<cell width="150px" label="职位" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}" name="attr_job" headerStyles="text-align: left;"></cell>
				<cell width="150px" label="姓名" name="attr_ename" onBeforeEdit="beforeEdit" editor="{editorClass:'unieap.form.TextBox'}" headerStyles="text-align: left;"></cell>
				<cell width="150px" label="部门" editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'DEPT'},decoder:{valueAttr:'CODEVALUE',displayAttr:'CODENAME'}}}" name="attr_deptno" ></cell>
				<cell width="150px" label="入职日期" editor="{editorClass:'unieap.form.DateTextBox'}" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
				<cell width="150px" label="工资" name="attr_sal"></cell>
			</header>
		</div>
		<div dojoType="unieap.layout.TitlePane" open="open" title="代码">
			数据表格：
			<textarea name="code" class="html">
				<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
					binding="{store:'empDataStore'}" views="{rowNumber:true}"
					edit="{editType:'rowEdit'}">
					<fixed>
						<cell label="员工编号" width="10%" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}" name="attr_empno" headerStyles="text-align: left;"></cell>
					</fixed>
					<header>
						<cell width="150px" label="职位" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}" name="attr_job" headerStyles="text-align: left;"></cell>
						<cell width="150px" label="姓名" name="attr_ename" onBeforeEdit="beforeEdit" editor="{editorClass:'unieap.form.TextBox'}" headerStyles="text-align: left;"></cell>
						<cell width="150px" label="部门" editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'DEPT'},decoder:{valueAttr:'CODEVALUE',displayAttr:'CODENAME'}}}" name="attr_deptno" ></cell>
						<cell width="150px" label="入职日期" editor="{editorClass:'unieap.form.DateTextBox'}" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
						<cell width="150px" label="工资" name="attr_sal"></cell>
					</header>
				</div>
			</textarea>
			<br>
			beforeEdit事件：
			<textarea name="code" class="js">
				function beforeEdit(inRowIndex) {
					if (inRowIndex%2==1) {
						return false;
					} else {
						return true;
					}
				}
			</textarea>
		</div>
		
		
    </body>
</html>
