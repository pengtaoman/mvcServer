<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>form</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
				<script type="text/javascript"
			src="<%=appPath%>/pages/samples/form/form/form.js"></script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 12px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单form控件说明">
			·Form控件和HTML中的form标签类似，可以内嵌其它表单控件；<br>
			·支持动态进行数据绑定；<br>
			·支持Form中控件值的重置和清空操作；<br />
			·支持对Form中的控件进行校验；<br />
			·收集绑定控件中的数据。
			
		</div>
		<div dojoType="unieap.layout.TitlePane" title="表单form控件样例"
			style="width: 100%;">
			    
			    <!-- 表单数据绑定 -->
				<form id="form" dojoType="unieap.form.Form" binding="{store:'emp_store',bindIndex:1}" id="form">
					<div dojoType="unieap.form.FieldSet" title="表单form控件">
						<table  >
							<tr style="margin-right:20px">
								<td style="font-size: 12px;font-family: 宋体">
									员工编号:
								</td>
								<td>
									<div id="empNo" dojoType="unieap.form.TextBox"
										binding="{name:'emoloyeeNum'}" required="true" style="margin-right:20px"></div>
								</td>
								<td style="font-size: 12px;font-family: 宋体;">
									部门编号:
								</td>
								<td>
									<div dojoType="unieap.form.TextBox"
										binding="{name:'departmentNum'}" required="true"></div>
								</td>
							</tr>
							<tr>
								<td style="font-size: 12px;font-family: 宋体">
									员工姓名:
								</td>
								<td>
									<div dojoType="unieap.form.TextBox"
										binding="{name:'emoloyeeName'}"></div>
	
								</td>
								<td style="font-size: 12px;font-family: 宋体">
									员工薪资:
								</td>
								<td>
									<div dojotype="unieap.form.TextBox" binding="{name:'salary'}"
										validator="{regExp:/^\d+$/,errorMsg:'只能输入数字'}"></div>
								</td>
							</tr>
						</table>
					</div>
					
					<div id="info" style="margin:5px 0px 5px 5px;font-size:14px"></div>
				</form>
				
		  <!-- 按钮控件 -->
		  <table>
				<tr>
					<td>
						<div dojoType="unieap.form.Button" label="更改数据源" id="form_ds" onclick="changeDS()"></div>&nbsp;
						<div dojoType="unieap.form.Button" label="重置" onclick="form_reset()"></div>&nbsp;
						<div dojoType="unieap.form.Button" label="清空" onclick="form_clear()"></div>&nbsp;
						<div dojoType="unieap.form.Button" label="校验" onclick="form_validate()"></div>&nbsp;
						<div dojoType="unieap.form.Button" label="判断控件是否修改" onclick="form_isModified()"></div>&nbsp;
						<div dojoType="unieap.form.Button" label="清除修改标记" onclick="form_resetUpdate()"></div>&nbsp;
						<div dojoType="unieap.form.Button" label="收集数据" onclick="form_collectData"></div>&nbsp;
						<div dojoType="unieap.form.Button" label="强制保存" accessKey="s" id='force_save' onclick="form_forceSave"></div>
					</td>
				</tr>
		  </table>
		</div>
		<div style="line-height:20px;font-size: 12px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单form控件源码">
			<textarea name="code" class="html">
				<form name="form"
					  dojoType="unieap.form.Form"
					  binding="{store:'emp_store',bindIndex:1}">
				</form>
				
				更改数据源JavaScript：
				var row=emp.getRowSet().getRow(0);
				unieap.byId("form").getBinding().bind(row);
				
				重置JavaScript：
				unieap.byId("form").reset();
				
				清空JavaScript：
				unieap.byId("form").clear();
				
				对form中的控件进行校验
				unieap.byId('form').validate();
				
				判断Form中控件的值是否被修改
				unieap.byId('form').isModified();
				
				清除更新标记
				unieap.byId('form').getBinding().getRow().getRowSet().resetUpdate();
				
				搜集控件中的数据，返回一个对象
				unieap.byId('form').getHelper().collectData()
				
				强制保存数据,用于当光标置入编辑框时就提交数据
				unieap.byId('form').getHelper().apply();
				
				
			</textarea>
		</div>
	</body>
</html>