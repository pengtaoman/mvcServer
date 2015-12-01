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
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/selection/grid_selection.js"></script>

    </head>
    <body class="unieap">
	    <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			该样例展示了数据表格（Grid）组件中与选择相关的特性：<br>
			·单项选择；<br>
			·多项选择；<br>
			·设置某行不可选择，排序后可以保存状态 ；<br>
			·可以设置选择前和选择后等监听事件。<br>
		</div>
		<br />
		<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
			binding="{store:'empDataStore'}" views="{rowNumber:true,rowBar:true,orderType:'client'}" 
			selection="{selectType:'m',onBeforeSelect:beforeSelectHandler,onBeforeDeselect:beforeDeselectHandler,onAfterSelect:afterSelectHandler,onAfterDeselect:afterDeselectHandler,onBeforeAllSelect:beforeAllSelectHandler,onAfterAllSelect:afterAllSelectHandler}">
			<fixed>
				<cell label="员工编号" width="60" name="attr_empno"  styles="color:red;"></cell>
			</fixed>
			<header>
				<cell width="20%" label="姓名" name="NAME" headerStyles="text-align: left;"></cell>
				<cell width="20%" label="部门" name="attr_deptno" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
				<cell width="20%" label="入职日期" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
				<cell width="20%" label="职位" name="attr_job" headerStyles="text-align: left;"></cell>
				<cell width="20%" label="工资" name="attr_sal"></cell>
			</header>
		</div>
		<br />
		<table border="1" width="100%" cellspacing="0" cellpadding="0">
			<tr>
				<th >输入</th>
				<th >操作</th>
				<th >说明</th>
			</tr>
			<tr>
				<td ><div id="selectType" dojoType="unieap.form.TextBox" class="formfield" width="100%" ></div></td>
				<td ><div dojoType="unieap.form.Button" label="设置选择方式" width="100%"  class="formfield"  onclick="setSelectType()"></div></td>
				<td >请输入"s"（单选），"m"（多选），或"none"（禁止选择）。</td>
			</tr>
			<tr>
				<td ><div id="selectInput" dojoType="unieap.form.TextBox" class="formfield" width="100%" ></div></td>
				<td ><div dojoType="unieap.form.Button" label="设置选择某行" width="100%"  class="formfield"  onclick="setSelect()"></div></td>
				<td >请输入行号。</td>
			</tr>
			<tr>
				<td ><div id="setcheckable" dojoType="unieap.form.TextBox" class="formfield" width="100%" ></div></td>
				<td ><div dojoType="unieap.form.Button" label="设置允许选择" width="100%"  class="formfield"  onclick="setCheckedabled()"></div></td>
				<td >请输入行号（从0开始），设置该行允许被选中。</td>
			</tr>
			<tr>
				<td ><div id="setuncheckable" dojoType="unieap.form.TextBox" class="formfield" width="100%"></div></td>
				<td ><div dojoType="unieap.form.Button" label="设置禁止选择" width="100%"  class="formfield" onclick="setUncheckedabled()"></div></td>
				<td >请输入行号（从0开始），设置该行禁止被选中。</td>
			</tr>
		</table>
		<br/>
		<div dojoType="unieap.layout.TitlePane" open="open" title="代码">
			<textarea name="code" class="html">
				<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
					binding="{store:'empDataStore'}" views="{rowNumber:true,rowBar:true,orderType:'client'}" selection="{selectType:'m'}">
					<fixed>
						<cell label="员工编号" width="60" name="attr_empno"  styles="color:red;"></cell>
					</fixed>
					<header>
						<cell width="20%" label="姓名" name="NAME" headerStyles="text-align: left;"></cell>
						<cell width="20%" label="部门" name="attr_deptno" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
						<cell width="20%" label="入职日期" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
						<cell width="20%" label="职位" name="attr_job" headerStyles="text-align: left;"></cell>
						<cell width="20%" label="工资" name="attr_sal"></cell>
					</header>
				</div>
			</textarea>
			<span style="font-size:14px;">设置选择方式：</span>
			<textarea name="code2" class="html">
				var type = dojo.byId("selectType").value;
				grid.getManager("SelectionManager").setSelectType(type);
			</textarea>
			<span style="font-size:14px;">设置选择某行：</span>
			<textarea name="code3" class="html">
				grid.getManager("SelectionManager").setSelect(行号, true);
			</textarea>
			<span style="font-size:14px;">设置允许选择某行：</span>
			<textarea name="code4" class="html">
				grid.getManager("SelectionManager").setCheckabled(行号, true);	
			</textarea>
			<span style="font-size:14px;">设置禁止选择某行：</span>
			<textarea name="code5" class="html">
				grid.getManager("SelectionManager").setCheckabled(行号, false);	
			</textarea>
		</div>
    </body>
</html>
