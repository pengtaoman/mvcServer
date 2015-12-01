<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Grid样例</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
			@import "<%=appPath%>/pages/samples/blackbird/blackbird.css";
		</style>
		
		<script type="text/javascript" src="<%=appPath%>/pages/samples/blackbird/blackbird.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/basic/grid_style.js"></script>
    </head>
    <body class="unieap">
	    <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			静态列样式：<br>
			·通过styles设置列样式(列文字默认居左显示，黑色字体)；<br />
			·通过headerStyles设置列标题样式(列标题默认居中显示，黑色字体)<br />
		</div>
		<br />
		<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
			binding="{store:'empDataStore'}" views="{rowNumber:true,orderType:'client'}">
			<header>
				<cell name="attr_empno" label="员工编号(红色字体)" width="150px" styles="color:red;" headerStyles="color:red;"></cell>
				<cell name="attr_ename" label="姓名(居左)" width="200px" styles="text-align:left;" headerStyles="text-align:left;"></cell>
				<cell name="attr_ename" label="姓名(居中)" width="200px" styles="text-align:center;" headerStyles="text-align:center;"></cell>
				<cell name="attr_ename" label="姓名(居右)" width="200px" styles="text-align:right;" headerStyles="text-align:right;"></cell>
				<cell name="attr_job" label="职位(黄色背景)" width="150px" styles="background-color:yellow;"></cell>
				<cell name="attr_sal" label="工资(正常列)" width="150px"></cell>
			</header>
		</div>
		<br />
		<div dojoType="unieap.layout.TitlePane" open="open" title="代码">
			<textarea name="code" class="html">
				<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
					binding="{store:'empDataStore'}" views="{rowNumber:true,orderType:'client'}">
					<header>
						<cell name="attr_empno" label="员工编号(红色字体)" width="150px" styles="color:red;" headerStyles="color:red;"></cell>
						<cell name="attr_ename" label="姓名(居左)" width="200px" styles="text-align:left;" headerStyles="text-align:left;"></cell>
						<cell name="attr_ename" label="姓名(居中)" width="200px" styles="text-align:center;" headerStyles="text-align:center;"></cell>
						<cell name="attr_ename" label="姓名(居右)" width="200px" styles="text-align:right;" headerStyles="text-align:right;"></cell>
						<cell name="attr_job" label="职位(黄色背景)" width="150px" styles="background-color:yellow;"></cell>
						<cell name="attr_sal" label="工资(正常列)" width="150px"></cell>
					</header>
				</div>
			</textarea>
		</div>
    </body>
</html>
