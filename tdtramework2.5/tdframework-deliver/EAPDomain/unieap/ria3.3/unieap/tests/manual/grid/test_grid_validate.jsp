<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>测试将查询结果放入DataStore中</title>
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
	</head>
	<script type = "text/javascript">
		function validate(){
			var bool=unieap.byId("grid").getBinding().validate();
		}
		
		dojo.addOnLoad(function(){
			var ds = new unieap.ds.DataStore("empDataStore");
			ds.setRowSetName("emp");
			ds.setPageSize(20);
			var dc =new unieap.ds.DataCenter();
			dc.addDataStore(ds);
			unieap.Action.requestData({
				url:unieap.WEB_APP_NAME+ "/DCTest.do?method=testLoad", 
				load:function(dc){
					unieap.byId('grid').getBinding().setDataStore(dc.getSingleDataStore());
				}
			},dc);
		})
	</script>
    <body class="unieap">
			 <div dojoType="unieap.form.Button" label="校验" onClick="validate"></div>
			<div dojoType="unieap.layout.TitlePane" title="Grid" height="400px" >
	    		<div dojoType="unieap.grid.Grid" width="100%" height="300px" id="grid"
					 views="{rowBar:true,rowNumber:true}" edit="{editType:'rowEdit'}">
					<header>
							<cell label="员工编号" name="attr_empno"></cell>
							<cell label="职位" name="attr_job" editor="{editorClass:'unieap.form.TextBox',editorProps:{required:true}}"></cell>
							<cell label="工资" name="attr_sal" editor="{editorClass:'unieap.form.NumberTextBox'}"></cell>
							<cell label="部门" name="attr_deptno"></cell>
					</header>
				</div>
    		</div>
    </body>
</html>