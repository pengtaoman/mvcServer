<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        </meta>
		<title>Grid 翻页条测试</title>
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
			dojo.require("unieap.form.Button")
			unieap.WEB_APP_NAME="<%=request.getContextPath()%>";
			var ds=new unieap.ds.DataStore("empDs");
			ds.setRowSetName("emp");
			ds.setPageSize(50);
			ds.setOrder("[attr_empno] asc");

			function init(){
				unieap.Action.doQuery(ds);
				ds=dataCenter.getDataStore("empDs");
				unieap.byId("grid").getBinding().setDataStore(ds);
				unieap.byId("new_grid").getBinding().setDataStore(ds);
			}
			
			dojo.addOnLoad(init)
			
			function showPagingBar(){
				dojo.style("grid","display","block");
				dojo.style("new_grid","display","none");
				dojo.byId('feature1').innerHTML="翻页条显示了";
				unieap.byId("grid").getManager('PagingManager').showPagingBar();
				unieap.byId("btn1").setDisabled(true);
				unieap.byId('btn2').setDisabled(false);
			}
			
			function hidePagingBar(){
				dojo.style("grid","display","block");
				dojo.style("new_grid","display","none");
				dojo.byId('feature1').innerHTML="翻页条隐藏了"
				unieap.byId("grid").getManager('PagingManager').hidePagingBar();
				unieap.byId("btn1").setDisabled(false);
				unieap.byId('btn2').setDisabled(true);
			}
			
			
			function customPageSize(){
				dojo.style("grid","display","none");
				dojo.style("new_grid","display","block");
			}
			

        </script>
    </head>
    <body class="unieap">
	  	<div id="titlePane1" dojoType="unieap.layout.TitlePane" title="用例说明" height=100px>
			测试功能点：
				<li>隐藏翻页条,只显示toolbar</li>
				<li>定制每页显示多少条数据</li>
	  	</div>
        <div id="titlePane2" dojoType="unieap.layout.TitlePane" title="测试用例" height="300px">
			<div dojoType="unieap.grid.Grid" id="grid" >
				<header>
					<cell name="attr_empno" label="编号"></cell>
					<cell name="attr_job" label="职位"></cell>
					<cell name="attr_ename" label="姓名"></cell>
					<cell name="attr_sal" label="工资"></cell>
					<cell name="attr_deptno" label="部门编号"></cell>
				</header>
				<toolbar paging="{display:false}" ></toolbar>
			</div>	

			<div dojoType="unieap.grid.Grid" id="new_grid" style="display:none" >
				<header>
					<cell name="attr_empno" label="编号(新编号)"></cell>
					<cell name="attr_job" label="职位"></cell>
					<cell name="attr_ename" label="姓名"></cell>
					<cell name="attr_sal" label="工资"></cell>
					<cell name="attr_deptno" label="部门编号"></cell>
				</header>
				<toolbar paging="{userPageSize:true}" ></toolbar>
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
					<td style="vertical-align:middle">显示翻页条</td>
					<td style="vertical-align:middle">
						<div dojoType="unieap.form.Button" label="显示翻页条" id='btn1' onClick="showPagingBar" style="margin-right:5px"></div>
						<div dojoType="unieap.form.Button" disabled="true" id='btn2' onClick="hidePagingBar"label="隐藏翻页条"></div>
					</td>
					<td style="vertical-align:middle" id="feature1">翻页条处于隐藏状态</td>
				</tr>
				<tr height="50px">
					<td style="vertical-align:middle">动态设置每页显示页数</td>
					<td style="vertical-align:middle">
						<div dojoType="unieap.form.Button" label="设置每页显示" id="btn3" onClick="customPageSize"></div>
					</td>
					<td style="vertical-align:middle" id="feature2">a.每页显示的条数改变;<br/>b.翻页信息改变;<br/>c.翻页条会显示到第一页</td>
				</tr>
			</table>
		</div>
    </body>
</html>