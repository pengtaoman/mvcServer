<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Grid样例</title>
        <script type="text/javascript">
			dojo.addOnLoad(function(){
				var store = new unieap.ds.DataStore("empDataStore");
		        store.setRowSetName("emp");
		        unieap.Action.doQuery(store);
		        unieap.byId('grid').getBinding().setDataStore(dataCenter.getDataStore("empDataStore"));
			});
			
			function setRowStyles(){
				var grid=unieap.byId("grid");
				grid.getManager("ViewManager").setRowStyles(0,{background:'yellow'});
			}
			
			function setRowStyles2(){
				var grid=unieap.byId("grid");
				grid.getManager("ViewManager").setRowStyles(0,{'backgroundColor':'red'});
			}
			
			
			function setCellStyles(){
				var grid=unieap.byId("grid");
				grid.getManager("ViewManager").setCellStyles(0,"attr_empno",{'backgroundColor':'pink',fontWeight:'bold'});	
			}
			
			function setSecondCellStyles(){
				var grid=unieap.byId("grid");
				grid.getManager("ViewManager").setCellStyles(0,"attr_job",{'backgroundColor':'gray',fontWeight:'bold'});	
			}
			
        </script>
    </head>
    <body class="unieap">
<body class="unieap">
	  	<div id="titlePane1" dojoType="unieap.layout.TitlePane" title="用例说明" height=100px>
			测试功能点：
				<li>ViewManager模块的setRowStyles方法</li>
				<li>ViewManager模块的setCellStyles方法</li>
	  	</div>
        <div id="titlePane2" dojoType="unieap.layout.TitlePane" title="测试用例" height="300px">
			<div dojoType="unieap.grid.Grid" id="grid" views="{rowBar:true}">
				<header>
					<cell name="attr_empno" label="编号" styles="background-color:orange;"></cell>
					<cell name="attr_job" label="职位" ></cell>
					<cell name="attr_ename" label="姓名"></cell>
					<cell name="attr_sal" label="工资"></cell>
					<cell name="attr_deptno" label="部门编号"></cell>
				</header>
				<toolbar  individual="{}"></toolbar>
			</div>	

        </div>
		<div id="titlePane3" dojoType="unieap.layout.TitlePane" title="说明" height="350px">
			<table border="1" bordercolor="#99BBE8" style="margin-top:20px;">
				<colgroup>
					<col style="width:300px"></col>
					<col style="width:300px"></col>
					<col style="width:300px"></col>
				</colgroup>
				<tr height="50px">
					<td><strong>功能点描述</strong></td>
					<td><strong>操作过程</strong></td>
					<td><strong>预期结果</strong></td>
				</tr>
				<tr height="50px">
					<td style="vertical-align:middle">setRowStyles</td>
					<td style="vertical-align:middle">
						<div dojoType="unieap.form.Button" label="给第一行加上背景色" onClick="setRowStyles"></div>
					</td>
					<td style="vertical-align:middle" id="feature1">
						1.第一行的背景色为黄色<br />
						2.拖动滚动条重新渲染数据，然后再回到最初的第一行,背景色依然存在
					</td>
				</tr>
				<tr height="50px">
					<td style="vertical-align:middle">setRowStyles(使用background-color改变背景色)</td>
					<td style="vertical-align:middle">
						<div dojoType="unieap.form.Button" label="使用background-color改变背景色" onClick="setRowStyles2"></div>
					</td>
					<td style="vertical-align:middle" id="feature1">
						1.改变第一行的背景色为红色<br />
						2.拖动滚动条重新渲染数据，然后再回到最初的第一行,背景色依然存在
					</td>
				</tr>
				<tr height="50px">
					<td style="vertical-align:middle">setCellStyles</td>
					<td style="vertical-align:middle">
						<div dojoType="unieap.form.Button" label="给第一行第一个单元格加上背景色" id="btn2" onClick="setCellStyles"></div>
					</td>
					<td style="vertical-align:middle" id="feature2">
						1.第一行第一个单元格的背景色为粉红色，字体为粗体<br />
						2.拖动滚动条重新渲染数据，然后再回到最初的第一行,背景色依然存在
					</td>
				</tr>
				<tr height="50px">
					<td style="vertical-align:middle">一列中两个单元格用setCellStyle方法设置样式后二次渲染问题</td>
					<td style="vertical-align:middle">
						<div dojoType="unieap.form.Button" label="给第一行第二个单元格加上背景色" id="btn3" onClick="setSecondCellStyles"></div>
					</td>
					<td style="vertical-align:middle" id="feature2">
						1.第一行第二个单元格的背景色为灰色，字体为粗体<br />
						2.分别渲染第一和第二个单元格，拖动滚动条重新渲染数据，然后再回到最初的第一行,两个单元格样式存在
					</td>
				</tr>
			</table>
		</div>
    </body>
</html>
