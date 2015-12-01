<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<contextPath value="<%=path%>"/>
		<script type="text/javascript">
			var gridData = '[{attr_empno:"250",NAME:"张XX",attr_job:"项目经理",attr_sal:"1080", attr_deptno:"10",edit:"编辑|删除"},'+
			        '{attr_empno:"319",NAME:"王XX",attr_job:"软件工程师",attr_hiredate:"1205917947270",attr_sal:"50000", attr_deptno:"10"},'+
			        '{attr_empno:"216",NAME:"李XX",attr_job:"软件工程师",attr_hiredate:"1205917947270", attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},'+
			        '{attr_empno:"100",NAME:"孙XX",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},'+
			        '{attr_empno:"101",NAME:"孙01",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},'+
			        '{attr_empno:"102",NAME:"孙02",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},'+
			        '{attr_empno:"103",NAME:"孙03",attr_job:"RIA主架构师",attr_hiredate:"1205917947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},'+
			        '{attr_empno:"10000",NAME:"赵XX",attr_job:"产品经理",attr_hiredate:"1205917947270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"}]';
					//document.write(gridData);
			var gridStore = new unieap.ds.DataStore('grid_data', dojo.fromJson(gridData));
			//gridStore.setRecordCount(20);//如果要显示翻页必须知道一共有多少条记录，每页显示多少条记录，然后自动计算一共有多少页。
			//gridStore.setPageSize(5);
			dataCenter.addDataStore(gridStore);
			
			function serverExport() {
				alert("doServerExport");
			}
			
			function clientExport() {
				alert("doClientExport");
			}
			
			function beforePage(store){
			
				var pagenumber = store.getPageNumber();
				var pagesize = store.getPageSize();
				//alert(pagesize + "    " + pagenumber);
				var rowset = new unieap.ds.RowSet(dojo.fromJson(gridData));
				store.setRowSet(rowset);
				
				unieap.byId('empGrid').setDataStore(store);
				unieap.byId('empGrid').getToolBar().update();
				unieap.byId('empGrid').refresh();
				//unieap.debug(store);
				return true;
			}
		    
			function doServerPrint() {
				alert("打印方法开始执行");
			}
				
		</script>
		
	</head>
<body class="unieap">
<div dojoType="unieap.layout.TitlePane" width="1000px" height="480px" title="">
<font color="red">表格打印具体实现方式待与基础软件交流。服务器端打印可自己开发。XGrid的工具栏不支持打印，后续调查</font>
<div dojoType="unieap.grid.Grid" id="empGrid" width="600px" height="300px"
	 binding="{store:'grid_data'}"
	 views="{rowNumber:true,orderType:'none'}">
	 <fixed>
		<cell label="员工编号" width="150" name="attr_empno"></cell>
	 </fixed>
	 <header>
		<cell width="100px" label="姓名" name="NAME"></cell>
		<cell width="150px" label="职位" name="attr_job"></cell>
		<cell width="150px" label="工资" name="attr_sal" headerStyles="text-align: left;"></cell>
	</header>
	<toolbar id="toolbar01" paging='{clientPaging:true,userPageSize:[5],onBeforePaging:beforePage}' 
	    export="{options:['server','client'],doServerExport:serverExport,doClientExport:clientExport}"
	    print="{doPrint:doServerPrint}">
	</toolbar>
</div>
</body>
</html>	
	