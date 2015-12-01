<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
		<title>业务模式6</title>
		<link rel="stylesheet" href="<%=appPath%>/pages/samples/model/style/MyClass.css"></link>
	</head>
	<script type="text/javascript" src="<%=appPath%>/pages/samples/model/model6/model6.js"></script>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			通过一个dialog查询数据对多个tab页的控件进行绑定。<br>
		</div>
		<div dojoType="unieap.layout.TitlePane" title="查询">
			<table style="width:100%;tab-layout:fixed;position:relative">
				<tr>
					<td style="width:20%">选择部门:</td>
					<td><div dojoType="unieap.form.TextBoxWithIcon" iconClass="newIcon" id="dept" onEnter="doQuery" onIconClick="doQuery"></div></td>
				</tr>
			</table>
		</div>
		
		<div dojoType="unieap.layout.TitlePane" title="部门信息">
			<table style="width:100%;tab-layout:fixed;position:relative">
				<tr>
					<td>部门编号:</td>
					<td><div dojoType="unieap.form.NumberTextBox" id="deptNo" readOnly="true"></div></td>
					<td>部门名称:</td>
					<td><div dojoType="unieap.form.TextBox" id="deptName" readOnly="true"></div></td>
					<td>部门所在地:</td>
					<td><div dojoType="unieap.form.TextBox" id="deptLoc" readOnly="true"></div></td>
				</tr>
			</table>
		</div>
		
		<div dojoType="unieap.layout.TabContainer" style="width:100%;height:400px">
			<div dojoType="unieap.layout.ContentPane" title="人员信息">
				<div style="width:100%;margin-top:5px;margin-bottom:5px">
					<div dojoType="unieap.form.Button" label="增加" onClick="emp_add" style="width:100px;margin-right:5px"></div>
					<div dojoType="unieap.form.Button" label="删除" onClick="emp_del" style="width:100px;margin-right:5px"></div>
					<div dojoType="unieap.form.Button" label="保存" onClick="emp_save" style="width:100px;"></div>
				</div>
				<div dojoType="unieap.grid.Grid" width="100%" height="300px" id="empGrid" edit="{editType:'rowEdit'}" views="{rowBar:true}" selection="{selectType:'m'}">
					<header>
						<cell name="attr_empno" width="20%" label="编号" editor="{editorClass:'unieap.form.NumberTextBox'}"></cell>
						<cell name="attr_job" width="20%" label="职位" editor="{editorClass:'unieap.form.TextBox'}" ></cell>
						<cell name="attr_ename" width="20%" label="姓名" editor="{editorClass:'unieap.form.TextBox'}"></cell>
						<cell name="attr_sal" width="20%" label="工资" editor="{editorClass:'unieap.form.NumberTextBox'}"></cell>
						<cell name="attr_hiredate" width="20%" label="日期" editor="{editorClass:'unieap.form.DateTextBox'}" displayFormatter="{cls:'unieap.form.DateDisplayFormatter'}"></cell>
					</header>
					<toolbar></toolbar>
				</div>
			</div>

			<div dojoType="unieap.layout.ContentPane" title="资产信息">
				<div style="width:100%;margin-bottom:5px">
					<div dojoType="unieap.form.Button" label="增加" onClick="asset_add" style="width:100px;margin-right:5px"></div>
					<div dojoType="unieap.form.Button" label="删除" onClick="asset_del" style="width:100px;margin-right:5px"></div>
					<div dojoType="unieap.form.Button" label="保存" onClick="asset_save" style="width:100px;"></div>
				</div>
					<div dojoType="unieap.grid.Grid" width="100%" height="300px" id="assetGrid" edit="{editType:'rowEdit'}" views="{rowBar:true}" selection="{selectType:'m'}">
						<header>
							<cell name="attr_assetno" width="16%" label="编号" editor="{editorClass:'unieap.form.NumberTextBox'}"></cell>
							<cell name="attr_name" width="16%" label="名称"  editor="{editorClass:'unieap.form.TextBox'}"></cell>
							<cell name="attr_type" width="16%" label="类型"  editor="{editorClass:'unieap.form.TextBox',editorProps:{maxLength:2}}"></cell>
							<cell name="attr_limit" width="16%" label="使用年限"  editor="{editorClass:'unieap.form.NumberTextBox'}"></cell>
							<cell name="attr_start_date" width="16%"  editor="{editorClass:'unieap.form.DateTextBox'}" label="开始日期" displayFormatter="{cls:'unieap.form.DateDisplayFormatter'}"></cell>
							<cell name="attr_quantity" label="数量"  editor="{editorClass:'unieap.form.NumberTextBox'}"></cell>
						</header>
						<toolbar></toolbar>
					</div>
				</div>
			</div>
	</body>
</html>
