<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
		<title>综合样例</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/blackbird/blackbird.css";
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/blackbird/blackbird.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/data.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/integration/tab_grid_dialog.js"></script>
        
	</head>
	<body class="unieap">
	    <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			·Tab与Grid结合，在点击Tab的时候在初始化Grid组件；<br>
			·TitlePane嵌套Tab容器，高度设置100%；<br>
			·Dialog中展示Grid，并在关闭的时候返回选中记录。<br>
		</div>
		<br/>
		<div dojoType="unieap.layout.TitlePane" title="titlepane嵌套tab容器">
			<div dojoType="unieap.layout.TabContainer" style="height:300px;width:100%">
 		    	<div dojoType="unieap.layout.ContentPane" title="titlepane嵌套tab容器">
 		    		点击下一tab标签可初始化grid组件
			    </div>
           		<div dojoType="unieap.layout.ContentPane" onInit="fn" title="点击初始化grid组件">
           			<div dojoType="unieap.grid.Grid" id="grid" width="100%" height="300px"
						binding="{store:'empDataStore'}"
						selection="{selectType:'m'}" 
						views="{rowBar:true,rowNumber:false,orderType:'none'}" edit="{editType:'rowEdit',singleClickEdit:false}">
						<fixed>
							<cell label="员工编号" width="150" name="attr_empno" formatter="formatterFunc"></cell>
						</fixed>
						<header>
							<cell width="100px" label="姓名" name="NAME" headerStyles="text-align: left;"  editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}"></cell>
							<cell width="150px" label="职位" name="attr_job"></cell>
							<cell width="150px" label="工资" name="attr_sal"></cell>
						</header>
           			</div>
        		</div>
        	</div>
        	<hr>
        	<input dojoType="unieap.form.Button" label="弹出对话框" width="20%" class="formfield" onclick="testInner()" id="test1">
			<br>
		</div>
		<div dojoType="unieap.layout.TitlePane" open="open" title="代码">
		<textarea name="code" class="html">
			<div dojoType="unieap.layout.TitlePane" title="titlepane嵌套tab容器">
				<div dojoType="unieap.layout.TabContainer" style="height:300px;width:100%">
	 		    	<div dojoType="unieap.layout.ContentPane" title="titlepane嵌套tab容器">
	 		    		点击下一tab标签可初始化grid组件
				    </div>
	           		<div dojoType="unieap.layout.ContentPane" onInit="fn" title="点击初始化grid组件">
	           			<div dojoType="unieap.grid.Grid"  width="100%" height="300px"
							binding="{store:'empDataStore'}"
							views="{rowNumber:false,orderType:'none'}">
							<fixed>
								<cell label="员工编号" width="150" name="attr_empno" formatter="formatterFunc"></cell>
							</fixed>
							<header>
								<cell width="100px" label="姓名" name="NAME"></cell>
								<cell width="150px" label="职位" name="attr_job"></cell>
								<cell width="150px" label="工资" name="attr_sal"></cell>
							</header>
	           			</div>
	        		</div>
	        	</div>
	        	<hr>
	        	<input type="button" value="弹出对话框" onclick="testInner()" id="test1">
				<br>
			</div>
		</textarea>
	</body>
</html>