<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
		<title>页面权限</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/data.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/integration/pageauth.js"></script>
        
	</head>
	<body class="unieap">
	    <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			页面权限说明:每执行一次页面权限操作,程序都会还原控件状态到初始状态，然后再控制控件的权限。
		</div>
		<br/>
		<div dojoType="unieap.layout.TitlePane" title="页面权限样例">
		<fieldset dojoType="unieap.form.FieldSet" title="编辑信息">
		   		<form id='form' dojoType="unieap.form.Form" style="margin:0px;">		   			
			   		<table style="table-layout:fixed;font-size:12px;height:68px;">
			   			<tr>
			   				<td width="50">编号：</td><td width="240"><div dojoType="unieap.form.NumberTextBox" securityId="empno" ></div></td>
			   				<td width="50">姓名：</td><td width="240"><div dojoType="unieap.form.TextBox" securityId="ename" disabled="true"></div></td>
			   			</tr>
			   			<tr>
			   				<td width="50">日期：</td><td width="240"><div  dojoType="unieap.form.DateTextBox" securityId="hiredate"></div></td>
			   				<td width="50">部门：</td><td width="240"><div dojoType="unieap.form.ComboBox" securityId="deptno" dataProvider="{store:'DEPT'}"></div></td>
			   			</tr>
			   			<tr>
			   				<td width="50">工资：</td><td width="240"><div dojoType="unieap.form.NumberTextBox" securityId="salary"></div></td>
			   				<td width="50">职务：</td><td width="240"><div dojoType="unieap.form.TextBox" securityId="job"></div></td>
			   			</tr>
			   		</table>
		   		</form>
		   		</fieldset>
			<br>
			<p style="clear:both"></p>
			<div dojoType="unieap.grid.Grid" binding="{store:'demo'}" id='grid' edit="{editType:'cellEdit',singleClickEdit:false}"  width="100%" height="100px">
				<header>
					<cell label="姓名" name="name"  securityId="name" editor="{editorClass:'unieap.form.TextBox'}" enable="true" ></cell>
					<cell label="年龄" name="age" id="age" securityId="age"></cell>
					<cell label="性别" name="sex" id="sex111" securityId="sex"></cell>
				</header>
			</div>
			<br>
			<div>
				<div dojoType="unieap.form.Button" label="页面授权(无场景模式)" style="float:left" onClick="fn_noScene"></div>
				<div dojoType="unieap.form.Button" label="页面权限修改(场景模式)" style="float:left;margin-left:10px" onClick="fn_scene"></div>
				<div dojoType="unieap.form.Button" label="还原到初始页面(场景模式)" style="float:left;margin-left:10px" onClick="fn_reset"></div>
			</div>
			<p style="clear:both"></p>
			<div id="info" style="margin-top:5px;"></div>
		</div>
		<br>
		<div dojoType="unieap.layout.TitlePane" open="open" title="代码">
		<textarea name="code" class="html">
		var noScene={'empno':'disabled','ename':'writely'};
		var haveScene={
			'a':{
				'hiredate':'disabled',
				'deptno':'disabled',
				'salary':'hidden',
				'job':'hidden',
				'name':'disabled',
				'age':'hidden'
				},
			'b':{}
		}
		
		//无场景
		function fn_noScene(){
			window['unieap.pageAuthList']=noScene;
			unieap.setPageAuthority();
		}
		
		//切换到场景a
		function fn_scene(){
			window['unieap.pageAuthList']=haveScene;
			unieap.setPageAuthority('a');
		}
		
		//切换到场景b
		function fn_reset(){
			window['unieap.pageAuthList']=haveScene;
			unieap.setPageAuthority('b');
		}
		
		</script>
		
		<div dojoType="unieap.form.NumberTextBox" securityId="empno" ></div>
		
		<!-- 初始时 姓名文本框处于禁用状态 -->
		<div dojoType="unieap.form.TextBox" securityId="ename" disabled="true"></div>
		
		<div dojoType="unieap.form.DateTextBox" securityId="hiredate"></div>
		
		<div dojoType="unieap.form.ComboBox" securityId="detpno" dataProvider="{store:'DEPT'}"></div>
		
		<div dojoType="unieap.form.NumberTextBox" securityId="salary" ></div>
		
		<div dojoType="unieap.form.TextBox" securityId="job"></div>
		
		<div dojoType="unieap.grid.Grid" binding="{store:'demo'}" id='grid' edit="{editType:'cellEdit'}"  width="600px" height="100px">
			<header>
				<cell label="姓名" name="name"  securityId="name" editor="{editorClass:'unieap.form.TextBox'}" enable="true" ></cell>
				<cell label="年龄" name="age"  securityId="age"></cell>
				<cell label="性别" name="sex"  securityId="sex"></cell>
			</header>
		</div>
		</textarea>
	</body>
</html>