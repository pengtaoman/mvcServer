
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<script type="text/javascript" src="<%=appPath%>/pages/samples/model/model1/model1_query_dialog.js"></script>

<html>
	<head>
		<meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
		<title>综合样例</title>
	</head>
	<body class="unieap">
	  <div dojoType="unieap.layout.TitlePane" title="查询条件" >
		<form id="queryForm" dojoType="unieap.form.Form">
			<fieldset dojoType="unieap.form.FieldSet" title="查询条件">
				<table width="100%" style="table-laout:fixed;" cellspacing=0 cellpadding=0>
					<tr>
						<td class="td" height=35>
							<label for="attr_empno" style="width: 30px;">
								编号:
							</label>
						</td>
						<td>
							<div name="attr_empno" id="attr_empno" binding="{name:'empno'}"
								dojoType="unieap.form.NumberTextBox" displayFormat="######"
								width="90px"></div>
						</td>
						<td class="td">
							<label for="attr_ename" style="width: 30px;">
								姓名:
							</label>
						</td>
						<td>
							<div name="attr_ename" id="attr_ename" binding="{name:'ename'}"
								dojoType="unieap.form.TextBox" width="90px" ></div>
						</td>
						<td class="td">
							<label for="attr_job" style="width: 30px;">
								职位:
							</label>
						</td>
						<td>
							<div name="attr_job" id="attr_job" binding="{name:'job'}"
								dojoType="unieap.form.TextBox" width="90px" ></div>
						</td>
					</tr>
				</table>
			</fieldset>
			<div style="text-align: right">
				<div id="btnQuery" dojoType="unieap.form.Button" label="查询" class="formfield"></div>
				<input id ="btnReset" dojoType="unieap.form.Button" label="重置" />
			</div>
		</form>
	  </div>
	  <div dojoType="unieap.layout.TitlePane" title="人员信息">
		  <div id="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
			binding="{store:'empDataStore'}" views="{rowNumber:false,rowBar:true,orderType:'client'}" selection="{selectType:'s'}">
			<header> 
				<cell width="20%" label="编号" width="25%" name="empno" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}"></cell>
				<cell width="15%" label="姓名" width="25%" name="ename" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left',maxLength:32}}"></cell>
				<cell width="15%" label="职位" width="25%" name="job" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left',maxLength:9}}"></cell>
				<cell width="20%" label="工资" width="25%" name="sal" editor="{editorClass:'unieap.form.NumberTextBox',editorProps:{textAlign:'left',precision:6,scale:2}}"></cell>
				<cell width="15%" label="入职日期" width="25%" name="hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}" editor="{editorClass:'unieap.form.DateTextBox',editorProps:{displayFormatter:{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}}}"></cell>
				<cell width="15%" label="部门" width="25%" name="deptno" editor="{editorClass:'unieap.form.ComboBox',editorProps:{id:'CODEVALUE',dataProvider:{store: 'DEPT'}}}"></cell>
			</header>
			<toolbar paging="{url:'/modelpojo.do?method=loadPojo'}"></toolbar>   
		</div>
		<DIV align="right">
			<input id ="btnSelect" dojoType="unieap.form.Button" label="确定" />
			<input id ="btnClose" dojoType="unieap.form.Button" label="关闭" />
		</DIV>
		</div>
	</body>
</html>
