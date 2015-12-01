<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<% 
	System.out.println("===================appPath:"+appPath);
System.out.println("===================path:"+path);
%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>xGrid样例</title>
 		<style type="text/css">
			@import "<%=appPath%>/ria33demo/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
        <script type="text/javascript" src="<%=appPath%>ria33demo/pages/samples/blackbird/blackbird.js"></script>
		<script type="text/javascript" src="<%=appPath%>ria33demo/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>ria33demo/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
        <script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/tests/manual/xgrid/data.js"></script>
        <script type="text/javascript" src="<%=path%>/unieap/ria3.3/unieap/tests/manual/xgrid/xgrid_displayFormatter_data.js"></script>
    </head>
    <body class="unieap">
    	 <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			支持通过设置decoder和cascade属性实现转义以及级联转义显示
		</div>
		<br />
		
		 <div id="grid" jsId="grid" dojoType="unieap.xgrid.Grid" height="150px"
			binding="{store:'empDataStore'}">
			<fixed>
				<cell label="员工编号" width="150" name="attr_empno"></cell>
				<cell width="150px" label="部门(转义值)" name="attr_deptno" headerStyles="color:red;" 
						decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
			</fixed>
			<header>
					<cell width="150px" label="姓名" name="NAME" headerStyles="text-align: left;"></cell>
					<cell width="150px" label="部门(真实值)" name="attr_deptno" headerStyles="color:red;"></cell>
					<cell width="150px" label="部门(转义值)" name="attr_deptno" headerStyles="color:red;" 
						decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
					<cell width="200px" label="职位" name="attr_job" headerStyles="text-align: left;"></cell>
					<cell width="200px" label="工资" name="attr_sal"></cell>
			</header>
		 </div>
		 
		 <div dojoType="unieap.xgrid.Grid" binding="{store:'ds1'}" height="100px">
			<header>
				<cell label="省份" name="province" decoder="{store:'province'}"></cell>
				<cell label="城市" name="city"
				 	  decoder="{}" cascade="{primary:'province',getCascadeStore:fn}"></cell>
			</header>
		 </div>
		
		</br>
		<div dojoType="unieap.layout.TitlePane" open="open" title="代码">
			<textarea name="code" class="html">
				<div id="grid" jsId="grid" dojoType="unieap.xgrid.Grid" height="150px"
					binding="{store:'empDataStore'}">
					<fixed>
						<cell label="员工编号" width="150" name="attr_empno"></cell>
					</fixed>
					<header>
						<cell width="150px" label="姓名" name="NAME" headerStyles="text-align: left;"></cell>
						<cell width="150px" label="部门(真实值)" name="attr_deptno" headerStyles="color:red;"></cell>
						<cell width="150px" label="部门(转义值)" name="attr_deptno" headerStyles="color:red;" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
						<cell width="200px" label="职位" name="attr_job" headerStyles="text-align: left;"></cell>
						<cell width="200px" label="工资" name="attr_sal"></cell>
					</header>
				</div>
             
			 <!-- cascade 属性动态 decode -->
				<div dojoType="unieap.xgrid.Grid" binding="{store:'ds1'}" height="100px">
					<header>
						<cell label="省份" name="province" decoder="{store:'province'}"></cell>
						<cell label="城市" name="city" decoder="{}" cascade="{primary:'province',getCascadeStore:fn}"></cell>
					</header>
				</div>
			</textarea>
		</div>
    </body>
</html>
