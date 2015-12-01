<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Grid样例</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/blackbird/blackbird.css";
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/data.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/dialog/innerSelect.js">
		</script>
	</head>
	<body class="unieap">
		<table style="width:100%;height:300px;">
			<tr style="height:300px;">
				<td  style="height:300px;">
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
				</td>
			</tr>
			<tr>
			   <td align="right">
			        <div dojoType="unieap.form.Button" id="confirmButton" label='确定' onClick = "select" ></div>&nbsp;&nbsp;
			       <div dojoType="unieap.form.Button" label='取消' id="toSelect" onClick = "close" ></div>
			   </td>
			</tr>
		</table>
		
	</body>
</html>
