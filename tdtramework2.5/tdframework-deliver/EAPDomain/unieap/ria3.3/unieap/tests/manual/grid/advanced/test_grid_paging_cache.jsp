<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        </meta>
		<title>Grid 翻页条缓存测试</title>
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
			}
			
			dojo.addOnLoad(init);
			
			
			function doExport(){
				unieap.byId("grid").getManager('PagingManager').exportSelectedData();
			}

			
			

        </script>
    </head>
    <body class="unieap">
	  	<div id="titlePane1" dojoType="unieap.layout.TitlePane" title="用例说明" height=100px>
			测试功能点：
				<li>只缓存带有选中记录的页面</li>
				<li>导出选中的记录</li>
				<li>检查过滤后数据是否正确</li>
	  	</div>
        <div id="titlePane2" dojoType="unieap.layout.TitlePane" title="测试用例" height="300px">
			<div dojoType="unieap.grid.Grid" id="grid" views="{rowBar:true}" filter="{}" selection="{selectType:'m'}">
				<header>
					<cell name="attr_empno" label="编号" ></cell>
					<cell name="attr_job" label="职位" ></cell>
					<cell name="attr_ename" label="姓名"></cell>
					<cell name="attr_sal" label="工资"></cell>
					<cell name="attr_deptno" label="部门编号"></cell>
				</header>
				<toolbar paging="{pageCache:true}" ></toolbar>
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
						1.不选中任何记录并翻页，然后翻页返回上一页 <br />
						2.选中一(多)条记录后翻页，然后翻页返回上一页
					</td>
					<td style="vertical-align:middle" id="feature1">
						1.返回上一页时,会往后台发送请求；<br />
						2.返回上一页时,不往后台发送请求
					</td>
				</tr>
				<tr height="50px">
					<td style="vertical-align:middle">导出选中记录</td>
					<td style="vertical-align:middle">
						<div dojoType="unieap.form.Button" label="导出选中记录" id="btn2" onClick="doExport"></div>
					</td>
					<td style="vertical-align:middle" id="feature2">导出一个csv文件</td>
				</tr>
			</table>
		</div>
    </body>
</html>