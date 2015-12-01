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
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/app/grid_datamove.js">
		</script>
	</head>
	<body class="unieap">
		<div dojoType="unieap.layout.TitlePane" title="说明">
			1.选中左边grid行 点击'移到右'按钮
			<br/>
			2.选中右边grid行 点击'移到左'按钮
			<br/>
			3.点击'自动'按钮 自动演示数据转移
			<br/>
			4.点击'停止'按钮 停止自动演示
			<br/>
			5.数据转移不改变选中状态
		</div>
		<table style="width:100%;height:300px;table-layout:fixed;">
			<tr style="height:300px;">
				<td  style="height:300px;">
				<div id="grid1" dojoType="unieap.grid.Grid" width="auto" height="300px"  binding="{store:'empDataStore'}" views="{rowNumber:true,rowBar:true,orderType:'client'}" selection="{selectType:'m'}">
					<fixed>
						<cell label="员工编号" width="80px" name="attr_empno">
						</cell>
					</fixed>
					<header>
						<cell width="30%" label="姓名" name="attr_ename">
						</cell>
						<cell width="40%" label="职位" name="attr_job">
						</cell>
						<cell width="30%" label="工资" name="attr_sal" dataType="number">
						</cell>
					</header>
				</div>
				
				</td>
				<td  style="height:300px;width:100px;">
					<div dojoType="unieap.form.Button" label='移到右' onclick='toRight()' style='width:80px;margin-top:5px;margin-left:10px;'></div>
					<div dojoType="unieap.form.Button" label='移到左' onclick='toLeft()' style='width:80px;margin-top:5px;margin-left:10px;'></div>
					<div dojoType="unieap.form.Button" label='自动' onclick='auto()' style='width:80px;margin-top:5px;margin-left:10px;'></div>
					<div dojoType="unieap.form.Button" label='停止' onclick='stop()' style='width:80px;margin-top:5px;margin-left:10px;'></div>
				</td>
				<td  style="height:300px;">
					<div id="grid2" dojoType="unieap.grid.Grid" width="auto"  height="300px" binding="{store:'store2'}" views="{rowNumber:true,rowBar:true,orderType:'client'}" selection="{selectType:'m'}">
						<fixed>
							<cell label="员工编号" width="80px" name="attr_empno">
							</cell>
						</fixed>
						<header>
							<cell width="30%" label="姓名" name="attr_ename">
							</cell>
							<cell width="40%" label="职位" name="attr_job">
							</cell>
							<cell width="30%" label="工资" name="attr_sal" dataType="number">
							</cell>
						</header>
					</div>
				</td>
			</tr>
		</table>
		<div dojoType="unieap.layout.TitlePane"  open="false" title="代码">
			<textarea name="code" class="html">
				function toRight(){
				var indexs = grid1.getManager('SelectionManager').getSelectedRowIndexs();
				var rowset1 = grid1.getBinding().getDataStore().getRowSet();
				var rowset2 = grid2.getBinding().getDataStore().getRowSet();
				if(!indexs||indexs.length==0){
					alert('没有选择的数据')
				}
				move(rowset1, rowset2, indexs);
			}
			
			function toLeft(){
				var indexs = grid2.getManager('SelectionManager').getSelectedRowIndexs();
				var rowset1 = grid1.getBinding().getDataStore().getRowSet();
				var rowset2 = grid2.getBinding().getDataStore().getRowSet();
				if(!indexs||indexs.length==0){
					alert('没有选择的数据')
				}
				move(rowset2, rowset1, indexs);
			}
			
			function move(rowset1, rowset2, indexs){
				var rows = [];
				dojo.forEach(indexs, function(index){
					var row = rowset1.getRow(index);
					rows.push(row.data);
				})
				rowset2.addRows(rows);
				rowset1.deleteRows(indexs);
			}
			
			var jobs = {};
			function auto(){
				var indexs = grid1.getManager('SelectionManager').getSelectedRowIndexs();
				var rowset1 = grid1.getBinding().getDataStore().getRowSet();
				var rowset2 = grid2.getBinding().getDataStore().getRowSet();
				
				var autofunction = function(){
					jobs.timeout && clearTimeout(jobs.timeout)
					jobs.timeout = setTimeout(function(){
						var row = rowset1.getRow(0);
						if (row) {
							rowset2.addRow(row.data)
							rowset1.deleteRow(0)
							autofunction.call();
						}
						else {
							autofunction2()
						}
					}, 400)
				}
				var autofunction2 = function(){
					jobs.timeout && clearTimeout(jobs.timeout)
					jobs.timeout = setTimeout(function(){
						var row = rowset2.getRow(0);
						if (row) {
							rowset1.addRow(row.data)
							rowset2.deleteRow(0)
							autofunction2.call();
						}
						else {
							autofunction();
						}
					}, 400)
				}
				autofunction();
			}
			
			function stop(){
				jobs.timeout && clearTimeout(jobs.timeout);
			}
			</textarea>
		</div>
	</body>
</html>
