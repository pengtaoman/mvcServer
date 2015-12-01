<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Grid样例</title>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/group/data.js"></script>
    	<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/group/grid_group_select.js"></script>
	</head>
    <body class="unieap">
    	<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" open="open" title="说明">
			·分组模块和选择模块可兼容并存；<br />
			·<span style='color:red'>分组后获得的选择行号不是表格的显示行，而是RowSet中的行号</span><br />
    	</div>
		<br>
    	<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
			binding="{store:'empDataStore'}"
			rows="{defaultRowHeight:21}"
			views="{rowNumber:true,rowBar:true,orderType:'client'}"
			selection="{selectType:'m'}"
			group="{autoApply:true,groupBar:true}">
			<fixed>
				<cell label="员工编号" width="10%" name="attr_empno" headerStyles="text-align: left;"></cell>
			</fixed>
			<header>
				<cell width="150px" label="姓名" name="NAME" headerStyles="text-align: left;"></cell>
				<cell width="150px" label="部门" name="attr_deptno" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
				<cell width="150px" label="职位" name="attr_job" headerStyles="text-align: left;"></cell>
				<cell width="150px" label="所在省"  name="attr_province" decoder="{store:'p',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
				<cell width="150px" label="所在市"  name="attr_city" decoder="{store:'c',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
				<cell width="150px" label="工资" name="attr_sal"></cell>
			</header>
		</div>
		<br>
		<table cellspacing="1" border="1">
			<tr>
				<th>输入</th>
				<th>操作</th>
				<th>说明</th>
			</tr>
			<tr>
				<td><div dojoType="unieap.form.TextBox" id="selectInput"></div></td>
				<td><div dojoType="unieap.form.Button"  style="width:100%" onClick="setSelect()" label="设置选中"></div></td>
				<td>分组展开后,输入要选择的行号</td>
			</tr>
			<tr>
				<td><div dojoType="unieap.form.TextBox"  id="selectType"></div></td>
				<td><div dojoType="unieap.form.Button"  style="width:100%" onClick="setSelectType()" label="setSelectType"></div></td>
				<td>输入"single","s","multiple","m"或"none"</td>
			</tr>
			<tr>
				<td><div dojoType="unieap.form.TextBox" id="setcheckable"></div></td>
				<td><div dojoType="unieap.form.Button" style="width:100%" onClick="setCheckedabled()" label="setcheckable"></div></td>
				<td>设置某行能被选中</td>
			</tr>
			<tr>
				<td><div dojoType="unieap.form.TextBox"  id="setuncheckable"></div></td>
				<td><div dojoType="unieap.form.Button" style="width:100%" onClick="setUncheckedabled()" label="setUncheckable"></div></td>
				<td>设置某行不能被鼠标点击选中</td>
			</tr>
		</table>
		<div dojoType="unieap.form.Button" onClick="getSelected()" label="取得选中行"></div>
		
    </body>
</html>
