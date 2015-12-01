<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>测试将查询结果放入DataStore中</title>
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
	</head>
	<script type = "text/javascript">
		function test(){
			grid.getBinding().save();
		}
		function init(){
			var ds = new unieap.ds.DataStore("empDataStore");
			ds.setRowSetName("emp");
			var dc =new unieap.ds.DataCenter();
			dc.addDataStore(ds);
			unieap.Action.requestData({
				url:unieap.WEB_APP_NAME+ "/DCTest.do?method=testLoad", 
				sync:true,
				load:function(dc){
					
				}
			},dc);
		}
		init();
		dojo.addOnLoad(function(){
			grid.getBinding().onAfterSave = function(){
				alert("after save");
			}
		})
	</script>
    <body class="unieap">
    	<div dojoType="unieap.layout.TitlePane" title="">
    		点击按钮调用grid的save方法，保存后自动调用grid的onAfterSave方法。
			 <div dojoType="unieap.form.Button" label="save" onClick="test"></div>
		</div>
			<div dojoType="unieap.layout.TitlePane" title="Panel: Grid" open="true" height="400px">
    		
    		<div dojoType="unieap.grid.Grid" width="100%" height="200px" jsId="grid"
				binding="{store:'empDataStore'}" views="{rowBar:true,rowNumber:true}">
				<header>
						<cell label="员工编号" name="attr_empno">
						</cell>
						<cell label="员工编号" name="attr_empno">
						</cell>
						<cell label="职位" name="attr_job"></cell>
						<cell label="工资" name="attr_sal"></cell>
						<cell label="部门" name="attr_deptno"></cell>
				</header>
			</div>
    	</div>
    </body>
</html>