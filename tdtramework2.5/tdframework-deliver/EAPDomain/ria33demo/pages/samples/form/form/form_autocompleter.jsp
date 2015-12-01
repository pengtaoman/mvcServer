<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>form_autocompleter</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/form/js/editClassDemo.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/form/form/form_autocompleter.js"></script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单form控件自动请求数据说明">
			·Form控件自动向服务端请求数据获得CodeList。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="表单form控件自动请求数据样例">
			<form id="form" dojoType="unieap.form.Form" binding="{store:'emp_store',bindIndex:1}">
				<div dojoType="unieap.form.FieldSet" title="form自动请求数据">
					<table>
						<tr>
							<td style="font-size: 13px;font-family: 宋体">
								员工编号:
							</td>
							<td>
								<div dojoType="unieap.form.TextBox"
									binding="{name:'UP_FORM_TEST_ID'}"></div>
							</td>
							<td style="font-size: 13px;font-family: 宋体">
								部门编号:
							</td>
							<td>
								<div dojoType="unieap.form.TextBox"
									binding="{name:'UP_FORM_TEST_DEPARTID'}"></div>
							</td>
						</tr>
						<tr>
							<td style="font-size: 13px;font-family: 宋体">
								员工姓名:
							</td>
							<td>
								<div dojoType="unieap.form.TextBox"
									binding="{name:'UP_FORM_TEST_NAME'}"></div>

							</td>
							<td style="font-size: 13px;font-family: 宋体">
								员工薪资:
							</td>
							<td>
								<div dojotype="unieap.form.TextBox" binding="{name:'UP_FORM_TEST_SALARY'}"
									 editFormatter="{dataFormat:'USA',declaredClass:'unieap.formdemo.editClassDemo'}"
									 displayFormatter="{dataFormat:'###,###.00',declaredClass:'unieap.form.NumberDisplayFormatter'}"
									 validator="{regExp:/^\d+$/,errorMsg:'只能输入数字'}"></div>
							</td>
						</tr>
						<tr>
							<td style="font-size: 13px;font-family: 宋体">
								民族标识:
							</td>
							<td>
								<div dojoType="unieap.form.TextBox" binding="{name:'UP_FORM_TEST_PROVINCEID'}"></div>
							</td>
							<td style="font-size: 13px;font-family: 宋体">
								民族名称:
							</td>
							<td>
								<div dojoType="unieap.form.ComboBox" binding="{name:'UP_FORM_TEST_PROVINCEID'}"  popup="{height:'300'}" dataProvider="{store:'AAC005'}"></div>
							</td>
						</tr>
					</table>
				</div>
			</form>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单form控件自动请求数据源码">
			<textarea name="code" class="html">
				<form id="form"  dojoType="unieap.form.Form" binding="{store:'emp_store',bindIndex:1}">
					  <div dojoType="unieap.form.ComboBox" 
					  	   binding="{name:'UP_FORM_TEST_PROVINCEID'}" 
					  	   dataProvider="{store:'AAC005'}"> <!-- AAC005来自于服务端中缓存的CodeList -->
					  </div>
				</form>
			</textarea>
		</div>
	</body>
</html>