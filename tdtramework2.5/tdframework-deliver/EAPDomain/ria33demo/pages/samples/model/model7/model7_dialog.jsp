<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
		<title>业务模式6</title>
	</head>
	<script type="text/javascript" src="<%=appPath%>/pages/samples/model/model7/model17_dialog.js"></script>
	<script type="text/javascript">
	</script>
	<body class="unieap">
		<div dojoType="unieap.layout.TitlePane" title="部门信息查询" >
			<table style="tab-layout:fixed;position:relative">
				<tr>
					<td>部门编号:</td>
					<td><div dojoType="unieap.form.NumberTextBox" id="deptNo" style="margin-right:20px"></div></td>
					<td>部门名称:</td>
					<td><div dojoType="unieap.form.TextBox" id="deptName"></div></td>
				</tr>
			</table>
			<div align="right">
				<div dojoType="unieap.form.Button" label="查询" onClick="query" style="margin-right:5px"></div>
				<div dojoType="unieap.form.Button" label="清空" onClick="reset"></div>
			</div>
		</div>
		
		<div dojoType="unieap.layout.TitlePane" title="部门信息" >
			<div dojoType="unieap.grid.Grid" width="100%" id="grid">
				<header>
					<cell label="编号" name="attr_deptno"></cell>
					<cell label="名称" name="attr_dname"></cell>
					<cell label="所在地" name="attr_loc"></cell>
				</header>
				<toolbar></toolbar>
			</div>
		</div>
		
		<div align="right">
			<div dojoType="unieap.form.Button" label="确定" onClick="confirm" style="margin-right:5px;width:50px"></div>
		</div>
		

	</body>
</html>
