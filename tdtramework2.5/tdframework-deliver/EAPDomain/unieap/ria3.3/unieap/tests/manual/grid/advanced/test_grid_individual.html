<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        </meta>
		<title>Grid 个性化测试</title>
        <style>
            @import "../../../../themes/default/css/unieap.css";
        </style>
        <script type="text/javascript" src="../../../../../dojo/dojo.js" djConfig=" parseOnLoad: true,locale:'zh'">
        </script>
        <script type="text/javascript" src="../../../../../dijit/dijit.js" djConfig=" parseOnLoad: true,locale:'zh'">
        </script>
        <script type="text/javascript">
        	dojo.require("unieap.rpc");
            dojo.require("unieap.layout.TitlePane");
			dojo.require("unieap.grid.Grid");
			dojo.require("unieap.form.Button");
			dojo.require("unieap.form.ComboBox")
			unieap.WEB_APP_NAME="<%=request.getContextPath()%>";
			var ds=new unieap.ds.DataStore("empDs");
			ds.setRowSetName("emp");
			ds.setPageSize(50);

			function init(){
				unieap.Action.doQuery(ds);
				ds=dataCenter.getDataStore("empDs");
				unieap.byId("grid").getBinding().setDataStore(ds);
			}
			
			dojo.addOnLoad(init);
			
			
			function doExport(){
				unieap.byId("grid").getManager('PagingManager').exportSelectedData();
			}
			
			var ds_col=new unieap.ds.DataStore('grid_col',[
				{CODEVALUE:'empno',CODENAME:'编号'},
				{CODEVALUE:'job',CODENAME:'职位'},
				{CODEVALUE:'ename',CODENAME:'姓名'},
				{CODEVALUE:'salary',CODENAME:'工资'},
				{CODEVALUE:'deptno',CODENAME:'部门编号'}
			]);
			dataCenter.addDataStore(ds_col);
			
			//显示列
			function show(){
				var value=unieap.byId('grid_col').getValue();
				if(value==null){
					alert("请先选中值");
					return;
				}
				value=value.split(',');
				unieap.byId("grid").getManager("LayoutManager").showCell(value);
			}
			
			//隐藏列
			function hide(){
				var value=unieap.byId('grid_col').getValue();
				if(value==null){
					alert("请先选中值");
					return;
				}
				value=value.split(',');
				if(value.length==5){
					alert("不能全部隐藏，至少得保留一列!");
					return;
				}
				unieap.byId("grid").getManager("LayoutManager").hideCell(value);
			}
			
			function lock(){
				var value=unieap.byId('grid_col').getValue();
				if(value==null){
					alert("请先选中值");
					return;
				}
				value=value.split(',');
				unieap.byId("grid").getManager("LayoutManager").lockCell(value);
				
			}
			
			function unlock(){
				var value=unieap.byId('grid_col').getValue();
				if(value==null){
					alert("请先选中值");
					return;
				}
				value=value.split(',');
				unieap.byId("grid").getManager("LayoutManager").lockCell(value,false);
				
			}

			
			

        </script>
    </head>
    <body class="unieap">
	  	<div id="titlePane1" dojoType="unieap.layout.TitlePane" title="用例说明" height=100px>
			测试功能点：
				<li>通过个性化按钮隐藏、显示或者锁定列</li>
				<li>通过个性化按钮改变列的顺序</li>
				<li>通过API来隐藏、显示某些列</li>
	  	</div>
        <div id="titlePane2" dojoType="unieap.layout.TitlePane" title="测试用例" height="300px">
			<div dojoType="unieap.grid.Grid" id="grid"  >
				<header>
					<cell name="attr_empno" label="编号" id='empno' ></cell>
					<cell name="attr_job" label="职位" id='job' ></cell>
					<cell name="attr_ename" label="姓名" id='ename'></cell>
					<cell name="attr_sal" label="工资" id='salary'></cell>
					<cell name="attr_deptno" label="部门编号" id='deptno'></cell>
				</header>
				<toolbar individual="{}">
					<div dojoType="unieap.form.ComboBox" id='grid_col' popup="{displayStyle:'multi'}" dataProvider="{store:'grid_col'}"></div>
				</toolbar>
			</div>	

        </div>
		<div id="titlePane3" dojoType="unieap.layout.TitlePane" title="说明" height="250px">
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
					<td style="vertical-align:middle">只缓存带有选中记录的页面</td>
					<td style="vertical-align:middle">
						<div dojoType="unieap.form.Button" label="隐藏" onClick="hide" style='margin-right:10px'></div>
						<div dojoType="unieap.form.Button" label="显示" onClick="show" style='margin-right:10px'></div>
						<div dojoType="unieap.form.Button" label="锁定" onClick="lock" style='margin-right:10px'></div>
						<div dojoType="unieap.form.Button" label="解锁" onClick="unlock"></div>
					</td>
					<td style="vertical-align:middle" id="feature1">
						1.隐藏某些列；<br />
						2.显示某些列:<br />
						3.锁定某些列:<br />
						4.解锁某些列
					</td>
				</tr>

			</table>
		</div>
    </body>
</html>