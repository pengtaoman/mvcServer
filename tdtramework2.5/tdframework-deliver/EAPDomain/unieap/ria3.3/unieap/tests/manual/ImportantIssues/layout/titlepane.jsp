<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<TITLE>TitlePane样例</TITLE>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
			@import "<%=appPath%>/pages/samples/blackbird/blackbird.css";
			@import "../../../../../unieap/ria3.3/unieap/themes/default/form/form.css";
			@import "../../../../../unieap/ria3.3/unieap/themes/default/layout/layout.css";
		</style>
	</head>
	<script type="text/javascript" src="../../../../../unieap/ria3.3/dojo/dojo.js" djConfig="isDebug: false, parseOnLoad: true">
	</script>
	<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js">
	</script>
	<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js">
	</script>
	<script type="text/javascript" src="<%=appPath%>/pages/samples/layout/titlepane/multi-titlepane.js"></script>
	<script>
		function setContent(){
			//var content="<div dojoType='unieap.form.Button' label='取消'></div>"
			unieap.byId("test").setContent(unieap.byId("grid").domNode);
			}
	</script>
	<body class="unieap">

<div id="grid" dojoType="unieap.grid.Grid" width="auto" height="300px"  binding="{store:'empDataStore'}" views="{rowNumber:true,rowBar:true,orderType:'client'}" selection="{selectType:'s'}">
					<fixed>
						<cell label="员工编号" width="80px" name="attr_empno">
						</cell>
					</fixed>
					<header>
						<cell width="30%" label="姓名" name="NAME">
						</cell>
						<cell width="40%" label="职位" name="attr_job">
						</cell>
						<cell width="30%" label="工资" name="attr_sal" dataType="number">
						</cell>
					</header>
				</div>
<div dojoType="unieap.layout.TitlePane" id="test" >
					你好，测试TitlePane
				</div>
				 <div dojoType="unieap.form.Button" label='取消' id="toSelect" onClick = "setContent" ></div>
</body>
</html>
