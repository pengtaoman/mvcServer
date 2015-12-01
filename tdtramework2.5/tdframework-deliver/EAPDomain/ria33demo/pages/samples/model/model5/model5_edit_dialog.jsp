<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<script type="text/javascript" src="<%=appPath%>/pages/samples/model/model5/model5_edit_dialog.js"></script>

<html>
<head>
	<meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
	<title>修改人员信息</title>
</head>
<body class="unieap">
	<div dojoType="unieap.layout.TitlePane" title="人员信息" flexible="false">
		<div id="editForm" dojoType="unieap.form.Form">
			<div dojoType="unieap.form.FieldSet" title="修改人员信息">
				<table>
					<tr>
						<td>
							<label>编号:</label>
						</td>
						<td width="150px">
							<div dojoType="unieap.form.NumberTextBox" id="attr_empno" 
								binding="{name:'attr_empno'}" displayFormat="######" width="120px" disabled="true">
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<label>姓名:</label>
						</td>
						<td>
							<div dojoType="unieap.form.TextBox" id="attr_ename" width="120px"
								binding="{name:'attr_ename'}">
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<label>职位:</label>
						</td>
						<td>
							<div dojoType="unieap.form.TextBox" id="attr_job" width="120px"
								binding="{name:'attr_job'}">
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<label>工资:</label>
						</td>
						<td>
							<div dojoType="unieap.form.NumberTextBox" id="attr_sal" width="120px"
								binding="{name:'attr_sal'}">
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<label>入职日期:</label>
						</td>
						<td>
							<div dojoType="unieap.form.DateTextBox" id="attr_hiredate" width="120px"
								binding="{name:'attr_hiredate'}">
							</div>
						</td>
					</tr>
				</table>
			</div>
			<div style="text-align: right">
				<div id="btnCommit" dojoType="unieap.form.Button" label="确定" width="60px"></div>
			</div>
		</div>
	</div>
	
</body>
</html>
