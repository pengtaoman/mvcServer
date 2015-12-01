<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%@ page import="com.neusoft.unieap.config.PageAuthConfig"%>
<% 
if (!PageAuthConfig.isEnabled||!PageAuthConfig.BASE_DOJO_UI||!PageAuthConfig.CIRCUMSTANCE_SUPPORT){
	out.println("页面权限场景切换功能没有启用，您无法访问此页面！");
    return;
}
%>
<html>
<head>
<title>页面权限 场景切换</title>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<style type="text/css">
	@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
</style>
<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
<script type="text/javascript">
	dojo.addOnLoad(function(){
		dp.SyntaxHighlighter.HighlightAll('code'); 
	});
</script>
	<script type="text/javascript"
		src="<%=appPath%>/pages/samples/pageauth/circumstance/circumstance.js">
	</script>
</head>
<unieap:pageauth circumstanceID="c1"/>
<body class="unieap">
<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
	·使用circumstanceID设置场景，在无场景的情况下可以不指定<br>
	·标签中使用securityId属性指定安全ID<br>
	·setPageAuthority指定场景 
</div>
<div dojoType="unieap.layout.TitlePane" title="选择场景">
    <table style="width:100%;table-layout:fixed;position:relative" >
		<tr>
			<td style="font-size: 13px;font-family: 宋体" width="120">
				场景选择:
			</td>
			<td>
	            <select dojoType="unieap.form.ComboBox" id="combobox" dataProvider="{staticData:'true'}" hasDefault="true" onChange="fn_onchange">
	                <option value="1">场景1</option>
	                <option value="2">场景2</option>
	                <option value="3">场景3</option>
	            </select>
			</td>
			<td style="font-size: 13px;font-family: 宋体" width="120">
				工资:
			</td>
			<td>
				<div dojoType="unieap.form.TextBox" securityId="circum_salary"
					validator="{regExp:/^\d+$/,errorMsg:'只能输入数字'}"></div>
			</td>
		</tr>
	</table>
</div>
<div dojoType="unieap.layout.TitlePane" title="使用方法">
	1,在EAPConfig.xml中将"pageAuth"组件的"isEnabled"属性以及其中"CIRCUMSTANCE_SUPPORT"和"BASE_DOJO_UI"属性设为true。
	<textarea name="code" class="xml"> 
		<component name="pageAuth" isEnabled="true"
			handler="com.neusoft.unieap.config.handler.PageAuthConfigHandler"
			description="页面权限">
			<BASE_DOJO_UI>true</BASE_DOJO_UI>
			<CIRCUMSTANCE_SUPPORT>true</CIRCUMSTANCE_SUPPORT>
						...
		</component>
	</textarea> 
	2,在页面中加入"unieap:pageauth"taglib。
	<br>
	3,在页面中加入带有安全ID的组件。
	<textarea  name="code" class="html"> 
		<div dojotype="unieap.form.TextBox" securityId="circum_salary"
					validator="{regExp:/^\d+$/,errorMsg:'只能输入数字'}"></div>
	</textarea >
	4,使用unieap.setPageAuthority()方法为页面设置场景。
	<textarea name="code" class="xml"> 
		function fn_onchange(){
			var value=combobox.getValue();
			switch(value){
				case "1":{
					unieap.setPageAuthority("c1");
					break;}
				case "2":{
					unieap.setPageAuthority("c2");
					break;}
				case "3":{
					unieap.setPageAuthority("c3");
					break;}						
			}
		}
	</textarea>
	5,在"管理控制台"中将不同场景相应的权限赋予业务角色。
</div>
</body>
</html>
