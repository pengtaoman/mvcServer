<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Grid样例</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";		</style>
		
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushJScript.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/basic/grid_title.js"></script>
    </head>
    <body class="unieap">
    	<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表单下拉框控件级联功能说明">
			·通过setTitle和getTitle方法可以设置和取得列标题。			
		</div>
    	<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="表格">
			<div dojoType="unieap.grid.Grid" id="grid" width="auto" height="250px" 
        		binding="{store:'empDataStore'}" views="{rowBar:true,rowNumber:true}">
            	<header>
                	<cell label="姓名" name="attr_ename"></cell>
                	<cell label="部门" name="attr_empno"></cell>
                	<cell label="职位" name="attr_job"></cell>
                	<cell label="工资" name="attr_sal"></cell>
            	</header>
        	</div>
		</div>
		<br>
		<table cellspacing="1" border="1">
			<tr>
				<td>
					<label>选择列：</label>
				</td>
				<td>
					<div popup="{displayStyle:'table'}" id="nameCombo" dojoType="unieap.form.ComboBox" dataProvider="{'store':'cells'}"></div>
				</td>
			</tr>
			<tr>
				<td colSpan="2">
					<button  dojoType='unieap.form.Button' onClick="getTitle" label='取得列标题'></button>
				</td>
			</tr>
			<tr>
				<td>
					<button  dojoType='unieap.form.Button' onClick="setTitle" label='设置列标题'></button>
				</td>
				<td>
					<div dojoType='unieap.form.TextBox' id="myTitle"></input>
				</td>
			</tr>
		</table>
		<br>
		<div dojoType="unieap.layout.TitlePane" open="open" title="说明">
			<span style="font-size:14px;">取得和设置列标题的方法：</span>
			<textarea name="code" class="js">
				function getTitle() {
					var value = unieap.byId("nameCombo").getValue();
					var layout = unieap.byId("grid").getManager("ViewManager");
					//获得列标题值
					alert(layout.getHeaderName(value));
				}
				function setTitle() {
					var value = unieap.byId("nameCombo").getValue();
					var title = dojo.byId("myTitle").value;
					//设置列标题值
					unieap.byId("grid").getManager("ViewManager").setHeaderName(value,title);
				}
			</textarea>
		</div>
    </body>
</html>
