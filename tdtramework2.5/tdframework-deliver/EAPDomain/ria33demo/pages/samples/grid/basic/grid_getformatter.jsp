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
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushJScript.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/basic/grid_getformatter.js"></script>
    </head>
    <body class="unieap">
	    <div dojoType="unieap.layout.TitlePane" title="说明">
			<span style="font-size:14px;">cell标签上可配置get方法或formatter方法实现自定义列；</span>
			<br>
			<span style="font-size:14px;">配置get方法的列可不绑定数据；</span><br>
			<span style="font-size:14px;">formatter方法比get方法多提供一个inValue的参数；</span><br>
			<span style="font-size:14px;">若同时配置两个方法，formatter方法在get之后被调用。</span>
		</div>
		<div dojoType="unieap.layout.TabContainer" style="height:700px;width:100%;">
			<div dojoType="unieap.layout.ContentPane" title="get方法">
				<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
					binding="{store:'empDataStore'}"
					views="{rowNumber:false,orderType:'none'}">
					<fixed>
						<cell label="行号(关注这一行)" get="getFunc" styles="color:red;" headerStyles="color:red;"></cell>
					</fixed>
					<header>
						<cell label="员工编号" width="150" name="attr_empno"></cell>
						<cell width="100px" label="姓名" name="attr_ename"></cell>
						<cell width="150px" label="职位" name="attr_job"></cell>
						<cell width="150px" label="工资" name="attr_sal"></cell>
					</header>
				</div>
				<div dojoType="unieap.layout.TitlePane" open="open" title="说明">
					<span style="font-size:14px;color:red;">“行号”</span>
					<span style="font-size:14px;">列是使用get方法自定义显示的列。</span>
					<br>
					<span style="font-size:14px;">get方法提供一个参数，即行号（从0开始）。</span>
					<br>
					<span style="font-size:14px;">列标签配置如下：</span>
					<textarea name="code" class="html">
						<!- getFunc为用户自定义的方法，有一个参数inRowIndex->
						<!- 使用get方法的列可以没有name属性->
						<cell label="行号" get="getFunc"></cell>
					</textarea>
					<span style="font-size:14px;">getFunc方法如下：</span>
					<textarea name="code" class="js">
						function getFunc(inRowIndex) {
							return "第"+ (inRowIndex+1) + "行";
						}
					</textarea>
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="formatter方法">
				<div id="grid1" dojoType="unieap.grid.Grid" width="100%" height="300px"
					binding="{store:'empDataStore'}"
					views="{rowNumber:false,orderType:'none'}">
					<fixed>
						<cell label="员工编号" width="150" name="attr_empno" formatter="formatterFunc"></cell>
					</fixed>
					<header>
						<cell width="100px" label="姓名" name="attr_ename"></cell>
						<cell width="150px" label="职位" name="attr_job"></cell>
						<cell width="150px" label="工资" name="attr_sal"></cell>
					</header>
				</div>
				<div dojoType="unieap.layout.TitlePane" open="open" title="说明">
					<span style="font-size:14px;color:red;">“员工编号”</span>
					<span style="font-size:14px;">列是使用formatter方法自定义显示的列。</span>
					<br>
					<span style="font-size:14px;">格式化方法将偶数行字体变为红色。</span>
					<br>
					<span style="font-size:14px;">列标签配置如下：</span>
					<textarea name="code" class="html">
						<!- formatterFunc为用户自定义的方法，有两个参数inValue,inRowIndex->
						<cell label="员工编号" width="150" name="attr_empno" formatter="formatterFunc"></cell>
					</textarea>
					<span style="font-size:14px;">formatterFunc方法如下：</span>
					<textarea name="code" class="js">
						function formatterFunc(inValue, inRowIndex){
							if ((inRowIndex-1)%2==0) {
								inValue = "<label style='color:red'>" + inValue + "</label>"
							}
							return inValue;
						}
					</textarea>
				</div>
			</div>
		</div>
    </body>
</html>
