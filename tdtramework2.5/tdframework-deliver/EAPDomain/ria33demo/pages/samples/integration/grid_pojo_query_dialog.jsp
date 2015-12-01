
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<html>
	<head>
		<meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
		<title>综合样例</title>

		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
			@import "<%=appPath%>/pages/samples/blackbird/blackbird.css";
		</style>

		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/blackbird/blackbird.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>

		<script type="text/javascript" src="<%=appPath%>/pages/samples/integration/grid_pojo_query_dialog.js"></script>
	</head>
	<body class="unieap">
		<form id="org.form" dojoType="unieap.form.Form"
			binding="{store:'empDataStore'}">
			<fieldset dojoType="unieap.form.FieldSet" title="人员信息">
				<table width="100%" style="table-laout:fixed;" cellspacing=0 cellpadding=0>
					<tr>
						<td class="td" height=35>
							<label for="EMPNO" style="width: 30px;">
								员工编号:
							</label>
						</td>
						<td>
							<div name="EMPNO" id="attr_empno" binding="{name:'empno'}"
								dojoType="unieap.form.NumberTextBox" displayFormat="######"
								width="90px"></div>
						</td>
						<td class="td">
							<label for="attr_ename" style="width: 30px;">
								员工姓名:
							</label>
						</td>
						<td>
							<div name="attr_ename" id="attr_ename" binding="{name:'ename'}"
								dojoType="unieap.form.TextBox" width="90px" ></div>
						</td>
					</tr>
					<tr>
						<td class="td">
							<label for="attr_sal" style="width: 30px;">
								工资:
							</label>
						</td>
						<td>
							<div name="attr_sal" id="attr_sal" binding="{name:'sal'}"
								dojoType="unieap.form.NumberTextBox" value=""
								displayFormat="######" width="90px" ></div>
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
				<div id="confirm" dojoType="unieap.form.Button" label="查询" class="formfield" onclick="click()"></div>
			</div>
		</form>
	</body>
</html>
