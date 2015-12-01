<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<html>
	<head>
		<title>title</title>
		<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
		<script type="text/javascript" src="<%=appPath%>/pages/test/data0.js"></script>
		<script type="text/javascript">

dojo.addOnLoad(function(){
	var form=unieap.byId('form');
	var ds=new unieap.ds.DataStore('demo',[{lastName:'jack',firstName:'abc',lastLogin:11,age:22}]);
	//var ds=new unieap.ds.DataStore('demo');
	var row=ds.getRowSet().getRow(0);	
	form.getBinding().setDataStore(ds,0);;

});

function doInsert(){
	var grid = unieap.byId('grid');
	var form=unieap.byId('form');
	var lastName = unieap.byId("lastName").getValue();
	var firstName = unieap.byId("firstName").getValue();
	var lastLogin = unieap.byId("lastLogin").getValue();
	var age = unieap.byId("age").getValue();
	var data = {
		lastName : lastName,
		firstName : firstName,
		lastLogin : lastLogin,
		age : age
	};
	grid.getManager("EditManager").insertRow(data);
	//form.getBinding().unbind();
	form.clear();
	grid.getManager("SelectionManager").setSelect(0);

/*
	var form=unieap.byId('form');
	var binding=form.getBinding();
	var rs = binding.getDataStore("demo").getRowSet();
	var row = rs.addRow();
	form.getBinding().bind(row);
	form.clear();
	*/
	}

	function submit() {
		
		
		var grid = unieap.byId('grid');
		var binding = grid.getBinding();
		
		/*
		var form = unieap.byId('form');
		var binding = form.getBinding();*/
		var dataStore = binding.getDataStore().collect("all");
		
		/*
		var dataStore = new unieap.ds.DataStore('demo', [ {
			name : 'jack',
			age : 22
		}, {
			name : 'aaa',
			age : 44
		} ]);*/
		dataStore.setRowSetName("com.neusoft.td.pojo.Customer");
		dataStore.setPageSize(-1);
		var dc = new unieap.ds.DataCenter();
		dc.setParameter('addps2', 'neusoft2');

		dc.addDataStore(dataStore);
		var newdc = unieap.Action.requestData( {
			url : unieap.WEB_APP_NAME + "/test.do?method=update",
			parameters : {
				"synLoadStatistics" : true
			},
			sync : true,
			load : function(dc) {
			}
		}, dc);
		
		var ds = newdc.getDataStore("demo")
		
		
		
		grid.setDataStore(ds);
	}
	
	function query(){
		var form = unieap.byId('form');
		var binding = form.getBinding();
		var dataStore = binding.getDataStore().collect("all");
		
		dataStore.setRowSetName("com.neusoft.td.pojo.Customer");
		dataStore.setPageSize(-1);
		var dc = new unieap.ds.DataCenter();
		dc.setParameter('addps2', 'neusoft2');

		dc.addDataStore(dataStore);
		var newdc = unieap.Action.requestData( {
			url : unieap.WEB_APP_NAME + "/test.do?method=query",
			parameters : {
				"synLoadStatistics" : true
			},
			sync : true,
			load : function(dc) {
			}
		}, dc);
		//dataCenter.clear();
		//dataCenter.addDataStore(newdc.getDataStore("demo"));
		var ds = newdc.getDataStore("demo")
		
		
		var grid = unieap.byId('grid');
		
		grid.setDataStore(ds);
		
	};
</script>
	</head>
	<body class="unieap">

		<form dojoType="unieap.form.Form" id="form">
			lastName:<div dojoType="unieap.form.TextBox" binding="{name:'lastName'}" id="lastName"></div>
			firstName:<div dojoType="unieap.form.TextBox" binding="{name:'firstName'}" id="firstName"></div>
			lastLogin:<div dojoType="unieap.form.TextBox" binding="{name:'lastLogin'}" id="lastLogin"></div>
			age:<div dojoType="unieap.form.TextBox" binding="{name:'age'}" id="age"></div>
		</form>
		<button dojoType="unieap.form.Button" label=" 新增 "  onClick=doInsert();></button>
		&nbsp;
		<button dojoType="unieap.form.Button" label=" 提交 " onClick=submit();></button>
		&nbsp;
		<button dojoType="unieap.form.Button" label=" 查询 " onClick=query();></button>
		<div dojoType="unieap.grid.Grid" width="500px" height="300px"
			views="{rowNumber:false,orderType:'none',rowBar:true}" id="grid" 
			edit="{editType:'cellEdit',singleClickEdit:false}"
			selection="{selectType:'m'}" >
			<header> 
			<cell label="lastName" width="150" name="lastName" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}" ></cell>
			<cell width="100px" label="firstName" name="firstName" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}" ></cell> 
			<cell
				width="150px" label="lastLogin" name="lastLogin" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}" ></cell>
				 <cell width="150px"
				label="age" name="age" headerStyles="text-align: left;" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}" ></cell> 
				</header>
		</div>


	</body>
</html>
