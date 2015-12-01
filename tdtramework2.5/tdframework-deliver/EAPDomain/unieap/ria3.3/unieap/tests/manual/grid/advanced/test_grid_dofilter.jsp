<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        </meta>
		<title>Grid 过滤测试</title>
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

			function init(){
				unieap.Action.doQuery(ds);
				ds=dataCenter.getDataStore("empDs");
				unieap.byId("grid").getBinding().setDataStore(ds);
			}
			
			dojo.addOnLoad(init);
			
		
			function doFilter(){
				var filterMan=unieap.byId('grid').getManager("FilterManager");
				var jobCon={
					condition:{
						a:{name:'attr_job',relation:'=',value:'开发'},
						b:{name:'attr_job',relation:'=',value:'工程师'}
					},
					pattern:" ${a} || ${b} "
				};
				filterMan.setFilter('attr_job',jobCon);
				filterMan.doFilter();

			}
			
			function cancelFilter(){
				var filterMan=unieap.byId('grid').getManager("FilterManager");
				filterMan.cancelFilter('attr_job');
			}

			
			

        </script>
    </head>
    <body class="unieap">
	  	<div id="titlePane1" dojoType="unieap.layout.TitlePane" title="用例说明" height=100px>
			测试功能点：
				<li>点击过滤按钮会对grid进行数据过滤</li>
				<li>调用FilterManager的doFilter方法对数据进行过滤</li>
				<li>调用FilterManager的cancelFilter取消过滤</li>
	  	</div>
        <div id="titlePane2" dojoType="unieap.layout.TitlePane" title="测试用例" height="300px">
			<div dojoType="unieap.grid.Grid" id="grid" views="{rowBar:true}" filter="{}"  selection="{selectType:'m'}">
				<header>
					<cell name="attr_empno" label="编号" ></cell>
					<cell name="attr_job" label="职位" ></cell>
					<cell name="attr_ename" label="姓名"></cell>
					<cell name="attr_sal" label="工资"></cell>
					<cell name="attr_deptno" label="部门编号"></cell>
				</header>
				<toolbar >
					<div dojoType="unieap.form.Button" label="手动过滤" onClick="doFilter" style="margin-right:5px"></div>
					<div dojoType="unieap.form.Button" label="取消过滤" onClick="cancelFilter"></div>
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
					<td style="vertical-align:middle">手动过滤，即调用filterManager的doFilter方法</td>
					<td style="vertical-align:middle">
						点击<b>手动过滤</b>按钮
					</td>
					<td style="vertical-align:middle" id="feature1">
							"职位"列表头变黑,点表头上的过滤按钮能弹出过滤条件:职位等于"开发"或者"工程师"
					</td>
				</tr>
				<tr height="50px">
					<td style="vertical-align:middle">取消过滤</td>
					
					<td style="vertical-align:middle">
						点击<b>取消过滤</b>按钮
					</td>
					<td style="vertical-align:middle" id="feature2">
						"职位"表头变为正常，点表头上的过滤按钮查看过滤条件，发现为空
					</td>
				</tr>
			</table>
		</div>
    </body>
</html>