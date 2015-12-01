<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Grid样例</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		
		<script type="text/javascript" src="<%=appPath%>/pages/samples/blackbird/blackbird.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/basic/grid_displayformatter.js"></script>
    </head>
    <body class="unieap">
	    <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			支持通过设置decoder、cascade和displayFormatter等属性格式化显示值；<br>
		</div>
		<br />
		<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
			binding="{store:'empDataStore'}" views="{rowNumber:true,orderType:'client'}">
			<fixed>
				<cell label="员工编号" width="150px" name="attr_empno"></cell>
			</fixed>
			<header>
				<cell width="150px" label="姓名" name="attr_ename"></cell>
				<cell width="150px" label="部门(真实值)" name="attr_deptno" headerStyles="color:red;"></cell>
				<cell width="150px" label="部门(转义值)" name="attr_deptno" headerStyles="color:red;" decoder="{store:'DEPT'}"></cell>
				<cell width="150px" label="入职日期(未格式化的列)" name="attr_hiredate" headerStyles="color:red;"></cell>
				<cell width="150px" label="入职日期(已格式化的列)" name="attr_hiredate" headerStyles="color:red;" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
			</header>
		</div>

		<div dojoType="unieap.grid.Grid" binding="{store:'ds1'}" edit="{editType:'rowEdit'}" height="80px" >
			<header>
				<cell label="省份" name="province" editor="{editorClass:'unieap.form.ComboBox',editorProps:{id:'province',dataProvider:{store:'province'}}}"></cell>
				<cell label="城市" name="city" decoder="{}" cascade="{primary:'province',getCascadeStore:fn}" ></cell>
			</header>
		</div>
		
		

		<br />
		<div dojoType="unieap.layout.TitlePane" open="open" title="代码">
			<textarea name="code" class="html">
				<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
					binding="{store:'empDataStore'}" views="{rowNumber:true,orderType:'client'}">
					<fixed>
						<cell label="员工编号" width="150px" name="attr_empno"></cell>
					</fixed>
					<header>
						<cell width="150px" label="姓名" name="attr_ename"></cell>
						<cell width="150px" label="部门(真实值)" name="attr_deptno"></cell>
						<cell width="150px" label="部门(转义值)" name="attr_deptno" decoder="{store:'DEPT'}"></cell>
						<cell width="150px" label="入职日期(未格式化的列)" name="attr_hiredate"></cell>
						<cell width="150px" label="入职日期(已格式化的列)" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
					</header>
				</div>
             
			 <!-- cascade 属性动态 decode -->
			<div dojoType="unieap.grid.Grid" binding="{store:'ds1'}" edit="{editType:'rowEdit'}" height="80px" >
				<header>
					<cell label="省份" name="province" editor="{editorClass:'unieap.form.ComboBox',editorProps:{id:'province',dataProvider:{store:'province'}}}"></cell>
					<cell label="城市" name="city" decoder="{}" cascade="{primary:'province',getCascadeStore:fn}" ></cell>
				</header>
			</div>
			
			</textarea>
		</div>
    </body>
</html>
