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
			
			var gridStore01 = new unieap.ds.DataStore('grid_data01', dojo.fromJson(gridData));
			//gridStore01.se
			dataCenter.addDataStore(gridStore01);
			
			var gridStore02 = new unieap.ds.DataStore('grid_data02', dojo.fromJson(gridData));
			dataCenter.addDataStore(gridStore02);
			
			var gridStore03 = new unieap.ds.DataStore('grid_data03', dojo.fromJson(gridData));
			dataCenter.addDataStore(gridStore03);
			
			var gridStore04 = new unieap.ds.DataStore('grid_data04', dojo.fromJson(gridData));
			dataCenter.addDataStore(gridStore04);
			
			function serverExport() {
				alert("doServerExport");
			}
			
			function clientExport() {
				alert("doClientExport");
			}
			
			function beforePage(store){
				
				var pagenumber = store.getPageNumber();
				var pagesize = store.getPageSize();

				var rowset = new unieap.ds.RowSet(dojo.fromJson(gridData));
				store.setRowSet(rowset);

				unieap.byId('empGrid').setDataStore(store);
				//unieap.byId('empGrid').getToolBar().update();
				return true;
			}

			function headerCellClick() {
				alert("headerCellClick");
			}
			
			function formatterFunc(inValue, inRowIndex) {
			    
			    var ed = inValue.split("|");
				if (ed.length > 1) {
			        return "<div align='center'><a href='#' target='_blank'>"+ed[0]+"</a>&nbsp;&nbsp;&nbsp;<a href='#' target='_blank'>"+ed[1]+"</a></div>";
				} else {
				    return "";
				}
			}
		
		</script>
		
	</head>
<body class="unieap">

<div dojoType="unieap.layout.TitlePane"  width="800px" height="350px" title="列固定">
    “员工编号”和“姓名”两列固定<font color='red'> </font>
	<div dojoType="unieap.xgrid.Grid" id="empGrid" width="400px" height="300px"
		 binding="{store:'grid_data'}"
		 views="{rowNumber:true,orderType:'none'}">
		 <fixed>
			<cell label="员工编号" width="150" name="attr_empno"></cell>
			<cell width="100px" label="姓名" name="NAME"></cell>
		 </fixed>
		 <header>
			<cell width="150px" label="职位" name="attr_job"></cell>
			<cell width="150px" label="工资" name="attr_sal" headerStyles="text-align: left;"></cell>
		</header>
		<toolbar id="toolbar01" paging='{clientPaging:true,userPageSize:[5],onBeforePaging:beforePage}' 
		    export="{options:['server','client'],doServerExport:serverExport,doClientExport:clientExport}"
		    >
		</toolbar>
		
	</div>
</div>
<div dojoType="unieap.layout.TitlePane"  width="800px" height="270px" title="表格排序">
      <font color="red"> </font>
	<div dojoType="unieap.xgrid.Grid" id="empGrid01" width="600px" height="220px"
		 binding="{store:'grid_data01'}"
		 views="{rowNumber:true,orderType:'client',onHeaderCellClick:headerCellClick}">
		<header>
			<cell label="员工编号" width="150" name="attr_empno"></cell>
			<cell width="100px" label="姓名" name="NAME"></cell>
		
		 
			<cell width="150px" label="职位" name="attr_job"></cell>
			<cell width="150px" label="工资" name="attr_sal" headerStyles="text-align: left;"></cell>
		</header>
		
	</div>
</div>
<div dojoType="unieap.layout.TitlePane"  width="800px" height="270px" title="合并单元格">
      <font color="red">xgrid不支持合并单元格,grid控件支持</font>
	<div dojoType="unieap.grid.Grid" id="empGrid02" width="600px" height="220px"
		 binding="{store:'grid_data02'}"
		 views="{rowNumber:true,orderType:'client'}"
		 unitedCell="{unite:['attr_job','attr_sal']}">
		<header>
			<cell label="员工编号" width="150" name="attr_empno"></cell>
			<cell width="100px" label="姓名" name="NAME"></cell>
			<cell width="150px" label="职位" name="attr_job"></cell>
			<cell width="150px" label="工资" name="attr_sal" headerStyles="text-align: left;"></cell>
		</header>
		
	</div>
</div>

<div dojoType="unieap.layout.TitlePane"  width="800px" height="270px" title="复杂表头">
      <font color="red">xgrid不支持复杂表头,grid控件支持</font>
	<div dojoType="unieap.grid.Grid" id="empGrid03" width="600px" height="220px"
		 binding="{store:'grid_data03'}"
		 views="{rowNumber:true,orderType:'client'}"
		 unitedCell="{unite:['attr_job','attr_sal']}">
		<header>
		   <row>
			<cell label="员工编号" width="150" name="attr_empno" rowspan=2></cell>
			<cell width="100px" label="姓名" name="NAME" colspan=2></cell>
			</row>
			<row>
			<cell width="150px" label="职位" name="attr_job"></cell>
			<cell width="150px" label="工资" name="attr_sal" headerStyles="text-align: left;"></cell>
			</row>
		</header>
		
	</div>
</div>

<div dojoType="unieap.layout.TitlePane"  width="800px" height="270px" title="带操作列和复选框的表格">
      <font color="red"></font>
<div id="grid" jsId="grid" dojoType="unieap.xgrid.Grid" height="95%"
			binding="{store:'grid_data'}"
			rows="{defaultRowHeight:21}"
			views="{rowBar:true}"
			selection="{selectType:'multiple'}">
			
			<header>
				<row>
					<cell label="员工编号"  name="attr_empno" width="10%"></cell>
					<cell label="姓名" name="NAME"  styles="text-align: center;" width="10%"></cell>
					<cell label="工资" name="attr_sal" styles="text-align: center;" width="20%"></cell>
					<cell label="职务"  name="attr_job" styles="text-align: center;" width="20%"></cell>
					<cell label="入司时间"  name="attr_hiredate" styles="text-align: center;" width="20%"></cell>
				    <cell label="操作" name="edit" formatter="formatterFunc"></cell>
				</row>
			</header>

			<foot style="text-align:center;">
			最大薪资：<span  express="max(attr_sal)"></span>
			最小薪资：<span  express="min(attr_sal)"></span>
			行数：<span  express="getRowCount()"></span>
			自定义数据：<span  express="getData()"></span>

		   </foot>
		<div>
			<toolbar export='{}'>
			
		    </toolbar>
		</div>
	</div>
</div>

</body>
</html>	
	