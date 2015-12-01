<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>dialog样例</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/dialog/dialogData.js"></script>
    </head>
    <body class="unieap">
	 	<div style="line-height:20px;font-size: 13px;font-family: 宋体;" dojoType="unieap.layout.TitlePane" title="说明">
			·父页面向dialog传值，关闭dialog后传递给父页面值。<p>
			·点增加按钮打开dialog页面，增加数据，点确定关闭dialog后，grid数据对应增加。<p>
			·选中dialog中的一行。点修改按钮打开dialog页面，修改数据，点确定关闭dialog后，grid对应行的数据修改。<p>	
		</div>
		<div style="line-height:20px;font-size: 13px;font-family: 宋体;" dojoType="unieap.layout.TitlePane" title="展示">
			<div id="grid" dojoType="unieap.grid.Grid" width="auto" height="220px" rows="{defaultRowHeight:30}"
				binding="{store:'empDataStore'}" views="{rowNumber:false,rowBar:true}" selection="{selectType:'s'}"> 
						<header>
							<cell name="attr_empno" label="员工编号" width="10%" ></cell>
							<cell name="NAME" label="姓名" width="25%"></cell>
							<cell name="attr_job" label="职位" width="40%"></cell>
							<cell name="attr_sal" label="工资" width="25%"></cell>
						</header>
						<toolbar></toolbar>
			</div>
		<div align="right">
			<input id ="btnAdd" dojoType="unieap.form.Button" label="增加" />
			<input id ="btnMod" dojoType="unieap.form.Button" label="修改" />
		</div>
		</div>
		<div dojoType="unieap.layout.TitlePane" width="100%" open="true" title="代码说明">
			<textarea name="code" class="html">
				<script type="text/javascript">
					//通过Dialog增加数据
					function add(){
						var dialog = DialogUtil.showDialog({
						url : unieap.appPath+"/pages/samples/dialog/dialogData_dialog.jsp",
						height : 450,
						width: 600,
						onComplete : addComplete
						},dojo.byId("btnAdd"));
					}
					function addComplete(value){
						grid.getBinding().insertRow(dojo.fromJson(value),0);
					}
					//通过Dialog修改数据
					function mod(value){
						var rowindex = grid.getManager("SelectionManager").getSelectedRowIndexs()[0];
						if(rowindex==undefined||rowindex<0){
							alert("请选择要修改行");
						return;
					}
					var row = grid.getBinding().getRow(rowindex);
					var dialog = DialogUtil.showDialog({
						url : unieap.appPath+"/pages/samples/dialog/dialogData_dialog.jsp",
						height : 450,
						width: 600,
						dialogData:dojo.toJson(row),
						onComplete : modComplete
						},dojo.byId("btnMod"));
					}
					function modComplete(value){
						var rowindex = grid.getManager("SelectionManager").getSelectedRowIndexs()[0];
						if(rowindex==undefined||rowindex<0){
						return;
						}
						grid.getBinding().getRowSet()["primary"][rowindex] = dojo.fromJson(value);
						grid.getManager("ViewManager").refreshRow(rowindex);
					}				
				</script>	
			</textarea>
		</div>
    </body>
</html>
