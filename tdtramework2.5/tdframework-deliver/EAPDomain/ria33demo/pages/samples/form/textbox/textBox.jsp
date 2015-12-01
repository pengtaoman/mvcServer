<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>textbox</title>
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
			src="<%=appPath%>/pages/samples/form/textbox/textBox.js"></script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单文本框控件说明">
			·表单文本框控件支持自定义校验器功能，业务可以根据需要设置校验逻辑；<br>
			·支持文本编辑格式化，显示格式化，保存值的格式化。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="表单文本框控件样例"
			style="width: 100%;">
			<table  style="width:100%;table-layout:fixed;position:relative;">
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:400px">
						只允许输入数字的文本框（焦点离开文本框后执行校验逻辑）:
					</td>
					<td>
						<div dojoType="unieap.form.TextBox"
						     minLength="3"
							 maxLength="20"
							 editFormatter="{dataFormat:'USA',declaredClass:'unieap.formdemo.editClassDemo'}"
							 displayFormatter="{dataFormat:'￥###,###.00',declaredClass:'unieap.form.NumberDisplayFormatter'}"
							 validator="{regExp:/^(-)?\d+\.?\d*$/,errorMsg:'只能输入数字'}"
							 value="2000"
							 required="true"
							 textAlign="right"
							 >
						</div>
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:400px">
						控件只读:
					</td>
					<td>
						<div dojoType="unieap.form.TextBox" readOnly="true" value="我是只读的"
						</div>
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:400px" >
						控件禁用:
					</td>
					<td>
						<div dojoType="unieap.form.TextBox" disabled="true" value="我是禁用的"
						</div>
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:400px" >
						密码框:
					</td>
					<td>
						<div dojoType="unieap.form.TextBox" password="true" value="password">
						</div>
					</td>
				</tr>
				
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:400px" >
						数据过滤、及时校验(只能通过键盘输入数字):
					</td>
					<td>
						<div dojoType="unieap.form.TextBox" inputFilter="{filterRule:/[0-9]/}" 
						      validator="{regExp:/^\d+$/,errorMsg:'该输入项只能输入数字',instanceCheck:true}" 
						      id="filterBox" >
						</div>
					</td>
				</tr>
				
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:400px" >
						宽度百分比(width='80%')
					</td>
					<td>
						<div dojoType="unieap.form.TextBox" width="80%"></div>
					</td>
				</tr>
				
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:400px" >
						onClick、onChange事件：
					</td>
					<td>
						<div dojoType="unieap.form.TextBox"  id="evtBox" onClick="evt_click" onChange="evt_change">
						</div>
					</td>
				</tr>
				
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:400px" >
						onBeforeClick事件：
					</td>
					<td>
						<div dojoType="unieap.form.TextBox" onBeforeClick="evt_beforeClick" >
						</div>
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:400px" >
						onEnter、onFocus、onBlur事件：
					</td>
					<td>
						<div dojoType="unieap.form.TextBox" onEnter="evt_enter" onBlur="evt_blur" onFocus="evt_focus">
						</div>
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:400px" >
						onTab事件(默认情况下直接回车也会触发该事件)：
					</td>
					<td>
						<div dojoType="unieap.form.TextBox" onTab="evt_tab" nextFocusId='ccp'>
						</div>
					</td>
				</tr>
				<tr>
					<td style="font-size: 13px;font-family: 宋体;width:400px" >
						onCopy、onCut、onPaste事件：
					</td>
					<td>
						<div dojoType="unieap.form.TextBox" onCopy="evt_copy" onCut="evt_cut" onPaste="evt_paste" id="ccp">
						</div>
					</td>
				</tr>
			</table>
			
			<div id="info" style="font-size:13px;margin-top:5px"></div>
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单文本框控件源码">
			<textarea name="code" class="html">
				<div dojoType="unieap.form.TextBox"
				     minLength="3" 
					 maxLength="20"
					 validator="{regExp:/^\d+$/,errorMsg:'只能输入数字'}"
					 value="2000"
					 required="true"
					 textAlign="right">
				</div>
				
				<div dojoType="unieap.form.TextBox" readOnly="true" value="我是只读的"
				</div>
				
				<div dojoType="unieap.form.TextBox" disabled="true" value="我是禁用的"
				</div>
			
				<div dojoType="unieap.form.TextBox" password="true" value="password">
				</div>
			
				<div dojoType="unieap.form.TextBox" inputFilter="{filterRule:/[0-9]/}" 
				      validator="{regExp:/^\d+$/,errorMsg:'该输入项只能输入数字',instanceCheck:true}" 
				      id="filterBox" >
				</div>
				
				<div dojoType="unieap.form.TextBox" width="80%"></div>
				
				//事件测试
				<div dojoType="unieap.form.TextBox"  id="evtBox" onClick="evt_click" onChange="evt_change">
				</div>
				
				<div dojoType="unieap.form.TextBox" onBeforeClick="evt_beforeClick">
				</div>

				<div dojoType="unieap.form.TextBox" onEnter="evt_enter" onBlur="evt_blur" onFocus="evt_focus">
				</div>
				
				<div dojoType="unieap.form.TextBox" onTab="evt_tab" nextFocusId='ccp'>
				</div>

				<div dojoType="unieap.form.TextBox" onCopy="evt_copy" onCut="evt_cut" onPaste="evt_paste" id="ccp">
				</div>
			</textarea>
		</div>
	</body>
</html>