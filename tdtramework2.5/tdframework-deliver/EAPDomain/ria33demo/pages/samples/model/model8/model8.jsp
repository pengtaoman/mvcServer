<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"></meta>
	<title>模式8：查询+数据列表</title>
	<style type="text/css">
		@import "<%=appPath%>/pages/samples/form/style/MyClass.css";
	</style>
	<script type="text/javascript" src="<%=appPath%>/pages/samples/model/model8/model8.js"></script>
</head>
<body class="unieap">
	<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			Dialog + form + Grid实现数据的查询、增加、删除等功能。<br>
	</div>
	<div dojoType="unieap.layout.TitlePane" title="查询" >
		<div id="formQuery" dojoType="unieap.form.Form">
			<div dojoType="unieap.form.FieldSet" title="查询">
				<table width="100%">
					<tr>
						<td>
							<label for="query_empno" style="width:40px;">选择部门:</label>
						</td>
						<td>
							<div dojoType="unieap.form.TextBoxWithIcon" id="query_dept" 
								readOnly="true" iconClass="newIcon" style="float:left;">
							</div>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
	
	<div dojoType="unieap.layout.TitlePane" title="个人基本信息录入">
		<div id="editForm" dojoType="unieap.form.Form">
			<div dojoType="unieap.form.FieldSet" title="信息编辑">
				<table width="100%">
					<tr>
						<td>
							<label style="width:40px;">编号:</label>
						</td>
						<td>
							<div binding="{name:'attr_empno'}" dojoType="unieap.form.NumberTextBox" 
								id="attr_empno" maxLength="4" displayFormat="######">
							</div>
						</td>
						<td>
							<label style="width:40px;">姓名:</label>
						</td>
						<td>
							<div dojoType="unieap.form.TextBox" type="text" 
								id="attr_ename" binding="{name:'attr_ename'}">
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<label style="width:40px;">入司日期:</label>
						</td>
						<td>
							<div dojoType="unieap.form.DateTextBox" id="attr_hiredate" 
								binding="{name:'attr_hiredate'}">
							</div>
						</td>
						<td>
							<label style="width:40px;">职位:</label>
						</td>
						<td>
							<div dojoType="unieap.form.TextBox" id="attr_job" 
								binding="{name:'attr_job'}">
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<label style="width:40px;">工资:</label>
						</td>
						<td>
							<div dojoType="unieap.form.NumberTextBox" id="attr_sal" maxLength="7" 
								binding="{name:'attr_sal'}" value="" displayFormat="######">
							</div>
						</td>
						<td></td>
						<td></td>
					</tr>
				</table>
				<div align="right">
					<div id ="btnInsert" dojoType="unieap.form.Button" label="新增" width="60px"></div>
					<div id ="btnDelete" dojoType="unieap.form.Button" label="删除" width="60px"></div>
				</div>
			</div>
		</div>
	</div>
	
	<div dojoType="unieap.layout.TitlePane" title="人员信息">
		<div id="empGrid" dojoType="unieap.grid.Grid" width="auto" height="300px"
			binding="{store:'empDataStore'}"
			views="{rowBar:true,orderType:'client'}">
			<header>
				<cell name="attr_empno" label="编号" width="100px"></cell>
				<cell name="attr_job" label="职位" width="150px"></cell>
				<cell name="attr_ename" label="姓名" width="150px"></cell>
				<cell name="attr_sal" label="工资" width="150px"></cell>
				<cell name="attr_hiredate" label="日期" width="200px" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
			</header>
			<toolbar ></toolbar>
		</div>
		<div align="right" style="padding: 5px;">
			<div dojoType="unieap.form.Button" label="提交" id="btnUpdate" width="60px"></div>
		</div>
	</div>
</body>
</html>
