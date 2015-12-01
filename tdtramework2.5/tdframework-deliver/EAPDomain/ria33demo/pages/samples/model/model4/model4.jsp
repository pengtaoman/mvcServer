<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"></meta>
<script type="text/javascript" src="<%=appPath%>/pages/samples/model/model4/model4.js"></script>
<title>个人基本信息管理</title>
</head>
<body class="unieap">
<div dojoType="unieap.layout.TitlePane" title="说明">
	 查询数据表格和表单录入样例    		
</div>
<div dojoType="unieap.layout.TitlePane" title="查询条件">
	<form id="formQuery"  dojoType="unieap.form.Form">
	 <fieldset dojoType="unieap.form.FieldSet" title="查询条件">
		<table width="100%">
			<tr>
				<td><label for="attr_empno"> 编号: </label></td>
				<td><div  id="attr_empno"  dojoType="unieap.form.TextBox" ></div></td>
				<td><label for="attr_ename"> 姓名: </label></td>
				<td><div  id="attr_ename"  dojoType="unieap.form.TextBox" /></div></td>
				<td><label for="attr_job"> 职位: </label></td>
				<td><div  id="attr_job" dojoType="unieap.form.TextBox"/></div></td>
			</tr>
		</table>
	 </fieldset>
	<div style="text-align: right">
		<div id="btnQuery" dojoType="unieap.form.Button" label="查询" ></div>
		<div id="btnReset" dojoType="unieap.form.Button" label="重置" ></div>
	</div>
	</form>
</div>
<div style="width:100%;">
  <div id="leftContent" style="float:left;width:65%;">
	     <div dojoType="unieap.layout.TitlePane" title="人员信息" style="height:400px">
	       <div id="empGrid"  dojoType="unieap.grid.Grid" width="auto" height="100%" binding={} views="{rowNumber:true}"  >
				<header>
					<cell label="编号" name="attr_empno" width="10%" ></cell>
					<cell label="职位" name="attr_job" width="20%" ></cell>
					<cell label="姓名" name="attr_ename" width="20%" >	</cell>
					<cell label="工资" name="attr_sal" width="20%" ></cell>
					<cell label="日期" name="attr_hiredate" width="20%" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
					<cell label="部门" name="attr_deptno" width="10%" decoder="{store:'DEPT'}"></cell>
				</header>
				<toolbar></toolar>
			</div>
			
		</div>
  </div>
  <div id="rightContent" style="float:right;width:34%;">
   		<div dojoType="unieap.layout.TitlePane" title="个人基本信息录入" style="height:400px">
	     	<form  id="infoForm" dojoType="unieap.form.Form">
				<fieldset dojoType="unieap.form.FieldSet" title="信息录入">
					<table width="100%" >
						<tr style="height:30px">
							<td><label> 编号: </label></td>
							<td><div binding="{name:'attr_empno'}" dojoType="unieap.form.TextBox" required="true"></div></td>
						</tr>
						<tr style="height:30px">
							<td><label> 职位: </label></td>
							<td><div binding="{name:'attr_job'}" dojoType="unieap.form.TextBox" required="true"></div></td>
						</tr>
						<tr style="height:30px">
							<td><label> 姓名: </label></td>
							<td><div binding="{name:'attr_ename'}" dojoType="unieap.form.TextBox" required="true"></div></td>
						</tr>
						<tr style="height:30px">
							<td><label> 日期: </label></td>
							<td><div binding="{name:'attr_hiredate'}" dojoType="unieap.form.DateTextBox" displayFormatter="{dataFormat:'yyyy-MM-dd'}"></div></td>
						</tr>
						<tr style="height:30px">
							<td><label> 工资: </label></td>
							<td><div binding="{name:'attr_sal'}" dojoType="unieap.form.NumberTextBox"  range="{allowDecimal:false}"
							></div></td>
						</tr>
						<tr style="height:30px">
							<td><label> 部门: </label></td>
							<td><div binding="{name:'attr_deptno'}" dojoType="unieap.form.ComboBox" dataProvider="{store:'DEPT'}" ></div></td>
						</tr>
					</table>
				</fieldset>
				<div style="text-align: right">
					<div  id="btnAdd" dojoType="unieap.form.Button" label="新增" ></div>
					<div  id="btnDelete" dojoType="unieap.form.Button" label="删除" ></div>
					<div  id="btnSubmit" dojoType="unieap.form.Button" label="提交" ></div>
				</div>
			</form>
		</div>
  </div>
</div>
</body>
</html>
