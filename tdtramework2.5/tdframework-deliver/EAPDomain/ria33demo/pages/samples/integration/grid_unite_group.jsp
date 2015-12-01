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
		<script type="text/javascript" src="<%=appPath%>/pages/samples/integration/grid_unite_group.js"></script>

    </head>
    <body class="unieap">
    	<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			该样例展示了合并单元格与分组的联合使用
		</div>
		<br />
		<div dojoType='unieap.grid.Grid' id='grid' width="100%" height="300px" 
			 views="{rowBar:true,rowNumber:true}" 
			 unitedCell="{unite:['attr_deptno','attr_job']}"
			 group="{groupBar:true}"
			 >
			<header>
			 	<cell name='attr_empno'  label='编号' ></cell>
				<cell name='attr_sal' id='attr_sal' label='工资' editor="{editorClass:'unieap.form.TextBox'}"></cell>
				<cell name='attr_deptno' label='部门' decoder="{store:'deptStore',valueAttr:'attr_deptno',displayAttr:'attr_dname'}" ></cell>
				<cell name='attr_job' label='职位' ></cell>
			</header>
			<toolbar></toolbar>
		</div>
		<br />
		<div dojoType="unieap.layout.TitlePane" open="open" title="代码">
			<textarea name="code" class="html">
				<div dojoType="unieap.grid.Grid" unitedCell="{unite:['attr_deptno','attr_job']}" group="{groupBar:true}">
					。。。
				</div>
			</textarea>
		</div>
    </body>
</html>
