<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>fieldSet</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript">
			 dojo.addOnLoad(function(){
				dp.SyntaxHighlighter.HighlightAll('code');
			});
		 </script>
		 

		 
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单fieldset控件说明">
			·fieldset控件可以显示或隐藏标签的内容；<br>
			·FieldSet控件的高度随着FieldSet中内容的增多而增大。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="表单fieldset控件样例"
			style="width: 100%;" class>
			<div dojoType="unieap.form.FieldSet" title="FieldSet控件" width="660px" >
				<table width="100%">
					<colgroup>
						<col width="80px"></col>
						<col width="250px"></col>
						<col width="80px"></col>
						<col width="250px"></col>
					</colgroup>
					<tr>
						<td style="font-size: 13px;font-family: 宋体;"  >
							员工编号:
						</td>
						<td>
							<div dojoType="unieap.form.TextBox" nextFocusId="a"></div>
						</td>
						<td style="font-size: 13px;font-family: 宋体">
							部门编号:
						</td>
						<td>
							<div dojoType="unieap.form.TextBox" id='a' nextFocusId='b'></div>
						</td>
					</tr>
					<tr>
						<td style="font-size: 13px;font-family: 宋体">
							员工姓名:
						</td>
						<td>
							<div dojoType="unieap.form.TextBox" id='b' nextFocusId='c'></div>
						</td>
						<td style="font-size: 13px;font-family: 宋体">
							员工薪资:
						</td>
						<td>
							<div dojotype="unieap.form.TextBox" id='c' nextFocusId='unieap_for_focus'></div>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单fieldset控件源码">
			<textarea name="code" class="html">
				<div dojoType="unieap.form.FieldSet" title="FieldSet控件演示">
					<div dojoType="unieap.form.FieldSet" title="FieldSet控件">
					</div>
				</div>
			</textarea>
		</div>
	</body>
</html>