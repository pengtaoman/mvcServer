<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>comboBox_autocompleter</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/form/combobox/comboBox_autocompleter.js"></script>
	</head>
	<body class="unieap">
		<div  style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单下拉框控件说明">
			·表单下拉框控件支持自动发请求匹配数据，您可以简单配置autoCompleter属性实现表单下拉框控件的自动匹配数据功能；<br />
			·自动请求提交前后事件。
		</div>
		<div dojoType="unieap.layout.TitlePane" title="表单下拉框控件样例"
			style="width: 100%;">
			<table style="width:100%;position:relative">
				<colgroup>
					<col style="font-size: 13px;font-family: 宋体;width:15%"></col>
					<col style="width:18%"></col>
					<col style="font-size: 13px;font-family: 宋体;width:67%"></col>
				</colgroup>
				<tr>
					<td>
						自动匹配数据:
					</td>
					<td>
						<div dojoType="unieap.form.ComboBox" autoCompleter="{url:'/getComboboxData.do',onBeforeSendQuery:beforeSend,queryName:'autoQuery'}" popup="{animate:false}"></div>
					</td>
					<td>
						操作说明：在下拉框中输入字母d、s、j分别匹配不同的城市，每次输入都向后台发送请求匹配新的数据
					</td>
				</tr>
				 
				<tr>
					<td>
						自动请求数据回调前后事件：
					</td>
					<td>
						<div dojoType="unieap.form.ComboBox" autoCompleter="{url:'/getComboboxData.do',onBeforeSendQuery:beforeSendQuery,onAfterSendQuery:afterSendQuery,queryName:'autoQuery'}" popup="{animate:false}"></div>
					</td>
					<td>
						操作说明：在下拉框中输入字母 d 或 s 或 j，然后自动弹出的dataCenter（后事件），查看dataCenter中的parameters属性（前事件）
					</td>
				</tr>
			</table>
				
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单下拉框控件源码">
			<textarea name="code" class="html">
				<!--自动匹配数据-->
				<div dojoType="unieap.form.ComboBox" autoCompleter="{url:'/comboBox_auto.do'}">
				</div>
				
				<!--自动请求回调事件-->
				<div dojoType="unieap.form.ComboBox" 
				     autoCompleter="{url:'/getComboboxData.do',onBeforeSendQuery:beforeSendQuery,onAfterSendQuery:afterSendQuery}"
				     popup="{animate:false}"></div>
				
				<!-- 回调事件 -->
				<script type="text/javascript">
					//往服务端发送数据前触发
					function beforeSendQuery(params,dc){
						params.info="Welcome to PSD";
					}
					
					//获得服务端返回的数据后触发
					function afterSendQuery(dc){
						setTimeout(function(){unieap.debug(dc)},1000);
					}
				</script>
				
				 
			</textarea>
		</div>
	</body>
</html>