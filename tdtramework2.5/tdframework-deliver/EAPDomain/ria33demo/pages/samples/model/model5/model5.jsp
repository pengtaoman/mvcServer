<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"></meta>
	<title>模式5:一对多</title>
	<style type="text/css">
		@import "<%=appPath%>/pages/samples/form/style/MyClass.css";
	</style>
	<script type="text/javascript" src="<%=appPath%>/pages/samples/model/model5/model5.js"></script>
</head>
<body class="unieap">
	 <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			通过一个dialog查询数据对Form和Grid分别进行绑定<br>
	</div>
	<div dojoType="unieap.layout.TitlePane"  flexible="false" title="部门查询" >
		<div id="formQuery" dojoType="unieap.form.Form">
			<div dojoType="unieap.form.FieldSet" title="查询条件">
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
	
	<div dojoType="unieap.layout.TitlePane"  flexible="false" title="部门信息">
		<div id="deptInfoForm" id="deptInfoForm" dojoType="unieap.form.Form">
			<div dojoType="unieap.form.FieldSet" title="部门信息">
				<table width="100%">
					<tr>
						<td>
							<label style="width:40px;">部门编号:</label>
						</td>
						<td>
							<div dojoType="unieap.form.NumberTextBox" 
								readOnly="true" id="attr_deptno" displayFormat="######">
							</div>
						</td>
						<td>
							<label style="width:40px;">部门名称:</label>
						</td>
						<td>
							<div dojoType="unieap.form.TextBox" type="text" 
								readOnly="true" id="attr_dname">
							</div>
						</td>
						<td>
							<label style="width:40px;">部门所在地:</label>
						</td>
						<td>
							<div dojoType="unieap.form.TextBox" type="text" 
								readOnly="true" id="attr_dloc">
							</div>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
	
	<div dojoType="unieap.layout.TitlePane" flexible="false" title="部门人员信息">
		<div style="width:100%;margin-top:5px;margin-bottom:5px">
			<div dojoType="unieap.form.Button" label="增加" id="emp_add" style="width:100px;margin-right:5px"></div>
			<div dojoType="unieap.form.Button" label="删除" id="emp_del" style="width:100px;margin-right:5px"></div>
		</div>
		<div id="empGrid" dojoType="unieap.grid.Grid" width="auto" height="300px"
			views="{rowBar:true,orderType:'client'}" selection="{selectType:'multiple'}">
			<header>
				<cell name="attr_empno" label="编号" width="100px"></cell>
				<cell name="attr_job" label="职位" width="150px"></cell>
				<cell name="attr_ename" label="姓名" width="150px"></cell>
				<cell name="attr_sal" label="工资" width="150px"></cell>
				<cell name="attr_hiredate" label="日期" width="200px" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
			</header>
			<toolbar></toolbar>
		</div>
		<div align="right" style="padding: 5px;">
			<div dojoType="unieap.form.Button" label="提交" id="btnUpdate" width="60px"></div>
		</div>
	</div>
</body>
</html>
