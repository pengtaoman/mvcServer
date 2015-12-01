<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Grid样例</title>
		<style type="text/css">
			@import "<%=appPath%>ria33demo/pages/samples/blackbird/blackbird.css";
			@import "<%=appPath%>ria33demo/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript" src="<%=appPath%>ria33demo/pages/samples/blackbird/blackbird.js"></script>
		<script type="text/javascript" src="<%=appPath%>ria33demo/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>ria33demo/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>ria33demo/pages/samples/grid/basic/grid_autoRender.js"></script>       

        <script type="text/javascript" src="<%=appPath%>ria33demo/pages/samples/grid/data.js"></script>       
    </head>
    
    <body class="unieap">
	     <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			该样例展示了数据表格（Grid）组件自动渲染的设置：<br />
			·配置ViewManager（views）的autoRender属性；<br />
			·当autoRender为false时，表格将不会自动渲染数据内容；<br />
			·ViewManager的setAutoRender方法可设置表格数据是否渲染。<br />
		</div>
		<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
			binding="{store:'empDataStore'}" 
			views="{autoRender:false}">
			<fixed>
				<cell label="员工编号" width="80px" name="attr_empno"></cell>
			</fixed>
			<header>
				<cell width="30%" label="姓名" name="attr_ename"></cell>
				<cell width="40%" label="职位" name="attr_job"></cell>
				<cell width="30%" label="工资" name="attr_sal" dataType="number"></cell>
			</header>
		</div>
		<button onclick="setRender()">渲染数据</button>
		<button onclick="setNorender()">隐藏数据</button>
		<div dojoType="unieap.layout.TitlePane" open="open" title="说明">
			<textarea name="code" class="html">
				<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
					binding="{store:'empDataStore'}" 
					views="{autoRender:false}">
					<fixed>
						<cell label="员工编号" width="80px" name="attr_empno"></cell>
					</fixed>
					<header>
						<cell width="30%" label="姓名" name="attr_ename"></cell>
						<cell width="40%" label="职位" name="attr_job"></cell>
						<cell width="30%" label="工资" name="attr_sal" dataType="number"></cell>
					</header>
				</div>
			</textarea>
			<span style="font-size:14px;">判断一个表格的autoRender属性：</span>
			<textarea name="code" class="html">
				if (unieap.byId("grid").getManager("ViewManager").autoRender==true) {
					...
				}
			</textarea>
			<span style="font-size:14px;">编码方式设置表格的autoRender属性：</span>
			<textarea name="code" class="html">
				unieap.byId("grid").getManager("ViewManager").setAutoRender(bool);
			</textarea>
		</div>
    </body>
</html>
