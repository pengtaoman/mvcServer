<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<contextPath value="<%=path%>"/>
		<script type="text/javascript">
			var gridData = '[{attr_empno:"250",NAME:"张XX",attr_job:"1",attr_sal:"1080", attr_deptno:"10",edit:"编辑|删除"},'+
			                 '{attr_empno:"319",NAME:"王XX",attr_job:"2",attr_hiredate:"1205917944270",attr_sal:"50000", attr_deptno:"10"},'+
			                 '{attr_empno:"216",NAME:"李XX",attr_job:"3",attr_hiredate:"305917948270", attr_sal:"3200",attr_deptno:"40",attr_unitid:"0711281110"},'+
			                 '{attr_empno:"100",NAME:"孙XX",attr_job:"4",attr_hiredate:"605912947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},'+
			                 '{attr_empno:"101",NAME:"孙01",attr_job:"1",attr_hiredate:"705911947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},'+
			                 '{attr_empno:"102",NAME:"孙02",attr_job:"2",attr_hiredate:"305915947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},'+
			                 '{attr_empno:"103",NAME:"孙03",attr_job:"3",attr_hiredate:"905910947270",attr_sal:"5432",attr_deptno:"30",attr_unitid:"0711281110"},'+
			                 '{attr_empno:"10000",NAME:"赵XX",attr_job:"4",attr_hiredate:"1005917247270",attr_sal:"2222",attr_deptno:"30",attr_unitid:"0711281110"}]';
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

			var comboxData = new unieap.ds.DataStore('job', dojo.fromJson("[" + 
              		"{CODEVALUE: 1,CODENAME: '项目经理'}," + 
              		"{CODEVALUE: 2,CODENAME: '软件工程师'}," + 
              		"{CODEVALUE: 3,CODENAME: 'RIA主架构师'}," + 
              		"{CODEVALUE: 4,CODENAME: '产品经理'}" +
              	"]"));
           dataCenter.addDataStore(comboxData);   
		
		</script>
		
	</head>
<body class="unieap">
<font color="red">编辑是ComboBox时，总多一个选择项</font>
<div dojoType="unieap.xgrid.Grid" id="empGrid" width="800px" height="250px"
	 binding="{store:'grid_data'}"
	 views="{rowNumber:true,orderType:'none'}"
	 edit="{editType:'rowEdit',singleClickEdit:false}">
	 <header>
	   <cell label="员工编号" width="150" name="attr_empno"></cell>
		<cell width="100px" label="姓名" name="NAME" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}"></cell>
		
		<cell width="150px" label="职位" name="attr_job" decoder="{store:'job',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"
		        editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'job'},decoder:{valueAttr:'CODEVALUE',displayAttr:'CODENAME'}}}"></cell>
		
		<cell width="150px" label="入职日期" name="attr_hiredate" 
		        displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"
		        editor="{editorClass:'unieap.form.DateTextBox',editorProps:{textAlign:'left'}}"></cell>
		
		<cell width="150px" label="工资" name="attr_sal" headerStyles="text-align: left;" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}"></cell>
	</header>
	
</div>


<div dojoType="unieap.grid.Grid" id="empGrid01" width="800px" height="250px"
	 binding="{store:'grid_data'}"
	 views="{rowNumber:true,orderType:'none'}"
	 edit="{editType:'rowEdit',singleClickEdit:false}">
	 <header>
	   <cell label="员工编号" width="150" name="attr_empno"></cell>
		<cell width="100px" label="姓名" name="NAME" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}"></cell>
		
		<cell width="150px" label="职位" name="attr_job" 
		        editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'job'},decoder:{valueAttr:'CODEVALUE',displayAttr:'CODENAME'}}}"></cell>
		
		<cell width="150px" label="入职日期" name="attr_hiredate" 
		        displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"
		        editor="{editorClass:'unieap.form.DateTextBox',editorProps:{textAlign:'left'}}"></cell>
		
		<cell width="150px" label="工资" name="attr_sal" headerStyles="text-align: left;" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}"></cell>
	</header>

	
</div>

</body>
</html>	
	