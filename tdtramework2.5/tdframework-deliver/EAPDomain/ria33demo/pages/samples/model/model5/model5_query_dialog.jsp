<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<script type="text/javascript" src="<%=appPath%>/pages/samples/model/model5/model5_query_dialog.js"></script>

<html>
<head>
	<meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
	<title>综合样例</title>
</head>
<body class="unieap">
	<div dojoType="unieap.layout.TitlePane" title="查询条件" flexible="false">
		<div id="queryForm" dojoType="unieap.form.Form">
			<div dojoType="unieap.form.FieldSet" title="查询条件">
				<table>
					<tr>
						<td>
							<label>部门编号:</label>
						</td>
						<td width="150px">
							<div dojoType="unieap.form.NumberTextBox" id="deptno_box" displayFormat="######" width="120px">
							</div>
						</td>
						<td>
							<label>部门名称:</label>
						</td>
						<td>
							<div dojoType="unieap.form.TextBox" id="dname_box" width="120px">
							</div>
						</td>
					</tr>
				</table>
			</div>
			<div style="text-align: right">
				<div id="btnQuery" id="btnQuery" dojoType="unieap.form.Button" label="查询" width="60px"></div>
				<div id="btnReset" id="btnReset" dojoType="unieap.form.Button" label="重置" width="60px"></div>
			</div>
		</div>
	</div>
	
	<div dojoType="unieap.layout.TitlePane" id="deptPane" title="部门信息" flexible="false">
		<div id="query_grid" dojoType="unieap.grid.Grid" width="auto" height="300px"
			views="{rowNumber:false,rowBar:true,orderType:'client'}">
			<header>
				<cell label="编号" width="33%" name="attr_deptno"></cell>
				<cell label="名称" width="33%" name="attr_dname"></cell>
				<cell label="所在地" width="33%" name="attr_loc"></cell>
			</header>
			<toolbar></toolbar>
		</div>
	</div>
	<div align="right" style="padding:5px;">
		<div id ="btnSelect" dojoType="unieap.form.Button" label="确定" width="60px"></div>
	</div>
</body>
</html>
