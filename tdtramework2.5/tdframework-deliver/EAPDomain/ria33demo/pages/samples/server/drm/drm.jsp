<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>drm实现</title>
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
         <script type="text/javascript" src="<%=appPath%>/pages/samples/server/drm/drm.js"></script>
	</head>
    <body class="unieap">
    	<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			用户交互层 + 业务逻辑层 + 持久层样例，其中持久层用DRM实现。<br/>
		</div>
		<div dojoType="unieap.layout.TitlePane" title="查询条件">
			<form id="queryForm"  dojoType="unieap.form.Form">
			 <fieldset dojoType="unieap.form.FieldSet" title="查询条件" width="95%">
				<table width="100%">
					<tr>
						<td><label for="attr_empno"> 编号: </label></td>
						<td><div  id="attr_empno"  dojoType="unieap.form.NumberTextBox" ></div></td>
						<td><label for="attr_ename"> 姓名: </label></td>
						<td><div  id="attr_ename"  dojoType="unieap.form.TextBox" /></div></td>
						<td><label for="attr_deptno"> 部门: </label></td>
						<td><div  id="attr_deptno" dojoType="unieap.form.ComboBox" dataProvider="{store:'DEPT'}"></div></td>
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
		  <div id="rightContent" style="float:left;width:25%;">
		   		<div dojoType="unieap.layout.TitlePane" title="基本信息录入" style="height:350px">
			     	<form  id="empForm" dojoType="unieap.form.Form">
						<fieldset dojoType="unieap.form.FieldSet" title="信息录入">
							<table width="100%" style="table-layout:fixed" >
								<colgroup>
									<col style="width:70px;"></col>
									<col style="width:auto;"></col>
									<col style="width:20px;"></col>
								</colgroup>
								<tr style="height:40px">
									<td><label> 编号: </label></td>
									<td><div id="empNo4Check" binding="{name:'attr_empno'}" dojoType="unieap.form.NumberTextBox" width="100%" required=true></div></td>
									<td><img id="btnCheck" src="<%=appPath%>/pages/samples/server/images/find.gif" hspace="5px" title="检查ID是否可用" onclick="checkExist()"></img></td>
								</tr>
								<tr style="height:40px">
									<td><label> 姓名: </label></td>
									<td colspan="2"><div binding="{name:'attr_ename'}" dojoType="unieap.form.TextBox" width="100%"></div></td>
								</tr>
								<tr style="height:40px">
									<td><label> 职位: </label></td>
									<td colspan="2"><div binding="{name:'attr_job'}" dojoType="unieap.form.TextBox" width="100%"></div></td>
								</tr>
								<tr style="height:40px">
									<td><label> 工资: </label></td>
									<td colspan="2"><div binding="{name:'attr_sal'}" dojoType="unieap.form.NumberTextBox"  range="{allowDecimal:false}" width="100%"
									></div></td>
								</tr>
								<tr style="height:40px">
									<td><label> 入职时间: </label></td>
									<td colspan="2"><div binding="{name:'attr_hiredate'}" dojoType="unieap.form.DateTextBox" displayFormatter="{dataFormat:'yyyy-MM-dd'}" width="100%"></div></td>
								</tr>
								<tr style="height:40px">
									<td><label> 部门: </label></td>
									<td colspan="2"><div binding="{name:'attr_deptno'}" dojoType="unieap.form.ComboBox" dataProvider="{store:'DEPT'}" width="100%" required=true></div></td>
								</tr>
							</table>
						</fieldset>
					</form>
				</div>
		  </div>
		  <div id="leftContent" style="float:right;width:74%;">
			     <div dojoType="unieap.layout.TitlePane" title="人员信息" style="height:350px">
			       <div id="empGrid" dojoType="unieap.grid.Grid" width="auto" height="280px" 
				   			binding="{store:'emp'}" 
							views="{rowNumber:false,rowBar:true,orderType:'client'}" 
							selection="{selectType:'s',onAfterSelect:bindForm}">
						<header>
							<cell label="编号" name="attr_empno" width="10%" ></cell>
							<cell label="姓名" name="attr_ename" width="20%" >	</cell>
							<cell label="职位" name="attr_job" width="20%" ></cell>
							<cell label="工资" name="attr_sal" width="20%" ></cell>
							<cell label="入职时间" name="attr_hiredate" width="20%" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
							<cell label="部门" name="attr_deptno" width="10%" decoder="{store:'DEPT'}"></cell>
						</header>
						<toolbar paging="{onAfterPaging:onAfterPaging}"></toolar>
					</div>
					<div style="text-align:right">
							<div  id="btnAdd" dojoType="unieap.form.Button" label="新增"></div>
							<div  id="btnDelete" dojoType="unieap.form.Button" label="删除" ></div>
							<div  id="btnSubmit" dojoType="unieap.form.Button" label="提交" ></div>
					</div>
				</div>
		  </div>
		</div>
    </body>
</html>