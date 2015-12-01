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
		
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushJScript.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/basic/grid_hrefformatter.js"></script>
    </head>
    <body class="unieap">
    	<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
    		cell上的formatter还可实现：<br />
			·图片内容；<br />
			·超链接内容；<br />
    	</div>
    	<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
			binding="{store:'empDataStore'}" views="{rowNumber:true,orderType:'client'}">
			<fixed>
				<cell label="操作(弹出行号)" width="100px" formatter="imgFormatter"></cell>
				<cell name="attr_empno" label="员工编号（超链接）" width="100px" formatter="linkFormatter"></cell>
			</fixed>
			<header>
				<cell name="attr_ename" label="姓名" width="100px"></cell>
				<cell name="attr_job" label="职位" width="150px"></cell>
				<cell name="attr_sal" label="工资" width="150px"></cell>
			</header>
		</div>
		<div dojoType="unieap.layout.TitlePane" open="open" title="代码">
			<textarea name="code" class="html">
				<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
					binding="{store:'empDataStore'}" views="{rowNumber:true,orderType:'client'}">
					<fixed>
						<cell label="操作(弹出行号)" width="100px" formatter="imgFormatter"></cell>
						<cell name="attr_empno" label="员工编号（超链接）" width="100px" formatter="linkFormatter"></cell>
					</fixed>
					<header>
						<cell name="attr_ename" label="姓名" width="100px"></cell>
						<cell name="attr_job" label="职位" width="150px"></cell>
						<cell name="attr_sal" label="工资" width="150px"></cell>
					</header>
				</div>
			</textarea>
			<span style="font-size:14px;">生成图片内容：</span>
			<textarea name="code" class="js">
				function imgFormatter(inValue, inRowIndex) {
					return "<img onclick='alert("+(inRowIndex+1)+")' src='" + unieap.appPath + "/pages/samples/grid/images/detail.gif'></img>";
				}
			</textarea>
			<span style="font-size:14px;">生成超链接内容：</span>
			<textarea name="code" class="js">
				function linkFormatter(inValue, inRowIndex) {
					return "<a href='"+unieap.appPath + "/pages/samples/grid/basic/grid_binding.jsp' target='_blank'>"+inValue+"</a>";
				}
			</textarea>
		</div>
    </body>
</html>
