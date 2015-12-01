<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ page import="com.neusoft.unieap.config.PageAuthConfig"%>
<% 
if (!PageAuthConfig.isEnabled||!PageAuthConfig.BASE_DOJO_UI){
	out.println("页面权限没有启用，您无法访问此页面！");
    return;
}
%>
<html>
<head>
<title>页面权限 基本用法</title>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<style type="text/css">
	@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
</style>
<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
<script type="text/javascript" src="<%=appPath%>/pages/samples/pageauth/basic/basic.js"></script>
</head>
<unieap:pageauth/>
<body class="unieap">
<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
	·对于一般的组件有三种状态：可用，不可用，隐藏<br>
	·对于容器控件，只有可用与不显示两种状态
</div>
<div dojoType="unieap.layout.TitlePane" title="编辑信息" securityId="basic_container">
	<form id='form' dojoType="unieap.form.Form" style="margin:0px;">		   			
		<table style="table-layout:fixed;font-size:12px;height:68px;">
			<tr>
				<td width="50">编号：</td><td width="240"><div dojoType="unieap.form.NumberTextBox" securityId="basic_form_number" binding="{name:'attr_empno'}"></div></td>
				<td width="50">姓名：</td><td width="240"><div dojoType="unieap.form.TextBox" securityId="basic_form_name" binding="{name:'attr_ename'}"></div></td>
			</tr>
			<tr>
				<td width="50">日期：</td><td width="240"><div id="datetextbox" dojoType="unieap.form.DateTextBox" securityId="basic_form_date" displayFormatter="{dataFormat:'yyyy/MM/dd'}" valueFormatter="{dataFormat:'yyyyMMdd'}"></div></td>
				<td width="50">部门：</td><td width="240"><div dojoType="unieap.form.ComboBox" securityId="basic_form_dept" dataProvider="{store:'DEPT'}" binding="{name:'attr_deptno'}"></div></td>
			</tr>
			<tr>
				<td width="50">工资：</td><td width="240"><div dojoType="unieap.form.NumberTextBox" securityId="basic_form_salary" binding="{name:'attr_sal'}"></div></td>
				<td width="50">职务：</td><td width="240"><div dojoType="unieap.form.TextBox" securityId="basic_form_job" binding="{name:'attr_job'}"></div></td>
			</tr>
		</table>
	</form>
</div>
<div dojoType="unieap.layout.TitlePane" title="表格信息">
	<div dojoType="unieap.grid.Grid" binding="{store:'demo'}" id='grid' edit="{editType:'cellEdit'}"  width="100%" height="90px">
		<header>
			<cell label="姓名" name="name"  securityId="basic_grid_name" editor="{editorClass:'unieap.form.TextBox'}"></cell>
			<cell label="年龄" name="age" id="age" securityId="basic_grid_age" editor="{editorClass:'unieap.form.TextBox'}"></cell>
			<cell label="性别" name="sex" id="sex" securityId="basic_grid_sex" editor="{editorClass:'unieap.form.TextBox'}"></cell>
		</header>
	</div>
<div>
<div  dojoType="unieap.layout.TitlePane" title="使用方法">
		1,在EAPConfig.xml中将"pageAuth"组件"isEnabled"属性以及其中的"BASE_DOJO_UI"属性设为true。
		<textarea name="code" class="xml"> 
			<component name="pageAuth" isEnabled="true"	handler="com.neusoft.unieap.config.handler.PageAuthConfigHandler"
				description="页面权限">
				<BASE_DOJO_UI>true</BASE_DOJO_UI>
				...
			</component>
		</textarea >
		2,在页面中加入"unieap:pageauth"taglib。
		<br>
		3,在页面中加入带有安全ID的组件。
		<textarea  name="code" class="html"> 
			<div dojoType="unieap.form.NumberTextBox" securityId="basic_form_number" binding="{name:'attr_empno'}"></div>
		</textarea>		
		4,在"管理控制台"中将安全组件相应的权限赋予业务角色。	
	<br>
</div>
</body>
</html>
