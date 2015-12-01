<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>numbertextbox</title>
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
		<div style="line-height:20px;font-size: 12px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单数字文本框控件说明">
			·只允许输入负号、数字和小数点；<br />
			·数字格式化；<br />
			·设置数字的范围；<br />
			·设置数字的精度限制。<br />
		</div>
		<div dojoType="unieap.layout.TitlePane" title="数字文本框控件样例"
			style="width: 100%;">
			<table style="width:100%;position:relative;table-layout:fixed">
				<tr>
					<td style="font-size: 12px;font-family: 宋体;width:30%">
						数字文本框:
					</td>
					<td>
						<div dojoType="unieap.form.NumberTextBox" required="true">
						</div>
					</td>
				</tr>
				
				<tr>
					<td style="font-size: 12px;font-family: 宋体;width:30%">
						数字格式化($###,###,00):
					</td>
					<td>
						<div dojoType="unieap.form.NumberTextBox" maxLength='5' displayFormatter="{dataFormat:'$###,###.00'}" value="5000">
						</div>
					</td>
				</tr>
				
				<tr>
					<td style="font-size: 12px;font-family: 宋体;width:30%">
						数字格式化(###,###,00%):
					</td>
					<td>
						<div dojoType="unieap.form.NumberTextBox" displayFormatter="{dataFormat:'###,###.00%'}" value="2">
						</div>
					</td>
				</tr>

				<tr>
					<td style="font-size: 12px;font-family: 宋体;width:30%">
						设置数字的范围(数字范围为5～10):
					</td>
					<td>
						<div dojoType="unieap.form.NumberTextBox" validator="{errorMsg:'只能输入5～10之间的浮点数'}" range="{max:10,min:5}">
						</div>
					</td>
				</tr>
				
					<td style="font-size: 12px;font-family: 宋体;width:30%">
						设置数字的范围(数字范围为5～10,不允许出现小数点):
					</td>
					<td>
						<div dojoType="unieap.form.NumberTextBox" range="{max:10,min:5,allowDecimal:false}"
							 validator="{errorMsg:'只能输入5～10之间的整数,不允许出现小数点'}"
						>
						</div>
					</td>
				</tr>
				<tr>
					<td style="font-size: 12px;font-family: 宋体;width:30%">
						设置数字的精度(最多能输入4位整数，3位小数):
					</td>
					<td>
						<div dojoType="unieap.form.NumberTextBox" validator="{errorMsg:'只能输入数字(整数最多4位，小数最多3位)'}" scale="3" precision="7">
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div style="line-height:20px;font-size: 12px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单数字文本框控件源码">
			<textarea name="code" class="html">
				<div dojoType="unieap.form.NumberTextBox"></div>

				<!-- 数字格式化 -->
				<div dojoType="unieap.form.NumberTextBox" displayFormatter="{dataFormat:'$###,###.00'}" value="5000">
				</div>
				<div dojoType="unieap.form.NumberTextBox" displayFormatter="{dataFormat:'###,###.00%'}" value="2">
				</div>

				
				<!-- 数字范围为5～10 -->
				<div dojoType="unieap.form.NumberTextBox" validator="{errorMsg:'只能输入5～10之间的浮点数'}" range="{max:10,min:5}"></div>
				
				<!--  数字范围为5～10之间的整数 -->
				<div dojoType="unieap.form.NumberTextBox" range="{max:10,min:5,allowDecimal:false}"
					 validator="{errorMsg:'只能输入5～10之间的整数,不允许出现小数点'}">
				</div>
				
				<!-- 数字的整数部分只能为3位 -->
				<div dojoType="unieap.form.NumberTextBox" validator="{errorMsg:'只能输入数字(整数最多4位，小数最多3位)'}" scale="3" precision="7"></div>
				
			</textarea>
		</div>
	</body>
</html>