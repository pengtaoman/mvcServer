 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<html>
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
        <title>综合样例</title>

		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
			@import "<%=appPath%>/pages/samples/blackbird/blackbird.css";
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/blackbird/blackbird.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/integration/grid_pojo.js"></script>
    </head>
    <body class="unieap">
    	<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			该样例展示了如何使用Grid组件进行POJO查询和持久化。<br>
		</div>
		<br />
    	 <div dojoType="unieap.layout.TitlePane" title="人员编辑" >
		      <form id="form" dojoType="unieap.form.Form" binding="{store:'empDataStore'}">
		        <fieldset>
		          <legend>人员编辑</legend>
		          <table width="100%">
		          	<tr>
		              <td class="td">
		                <label for="EMPNO" style="width:40px;">编号:</label>
		              </td>
					  <td><input name="EMPNO" id="attr_empno" maxlength="4" binding="{name:'empno'}" dojoType="unieap.form.NumberTextBox" displayFormat="######"></input>  
					  </td>
		              <td class="td">
		                <label for="attr_job" style="width:40px;">职位:</label>
		              </td>
					  <td>
					   	<input name="attr_job" id="attr_job" maxlength="4"  binding="{name:'job'}" dojoType="unieap.form.TextBox" />
					  </td>
		              <td class="td">                           
		                <label for="attr_ename" style="width:40px;">姓名:</label>
		              </td>
					   <td><input name="attr_ename" id="attr_ename" maxlength="4" binding="{name:'ename'}" dojoType="unieap.form.TextBox" />
					  </td>
		            </tr>
		            <tr>
		              <td class="td">
		                <label for="attr_sal" style="width:40px;">工资:</label>
		 			  </td>
					  <td>
					   	<input name="attr_sal" id="attr_sal" maxlength="6" binding="{name:'sal'}" dojoType="unieap.form.NumberTextBox" value=""  displayFormat="######"/>
					  </td>
		              <td class="td">
		                 <label for="attr_hiredate" style="width:40px;">日期:</label>
		              </td>
		              <td>
		              	<input type="text" id="attr_hiredate" name="hiredate" binding="{name:'hiredate'}" dojoType="unieap.form.DateTextBox"/>
					  </td>
		            </tr>
		          </table>
		        </fieldset>
		        <div style="text-align:right">
		        	<input id="open_query_dialog" dojoType="unieap.form.Button" label="查询" class="formfield"/>
		        	<input id="form_refresh" dojoType="unieap.form.Button" label="刷新" class="formfield"/>
		        	<input id="form_add" dojoType="unieap.form.Button" label="增加" class="formfield"/>
		        	<input id="form_del" dojoType="unieap.form.Button" label="删除" class="formfield"/>
		        	<input id="form_save" dojoType="unieap.form.Button" label="保存" class="formfield"/>
		        </div>
		       </form>
			   <div id="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
					binding="{store:'empDataStore'}" 
					views="{rowNumber:false,rowBar:true,orderType:'client'}" selection="{selectType:'s'}">
					<fixed>
						<cell label="员工编号" width="100px" name="empno"></cell>
					</fixed>
					<header>
						<cell width="25%" label="姓名" width="25%" name="ename"></cell>
						<cell width="25%" label="职位" width="25%" name="job"></cell>
						<cell width="25%" label="工资" width="25%" name="sal"></cell>
						<cell width="25%" label="入职日期" width="25%" name="hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
					</header>
					<toolbar paging="{url:'/RIATest.do?method=testLoadPoJo',onPagingModified:onPM}"></toolbar>   
				</div>
		</div>
		<br />
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="样例代码">
			<textarea name="code" class="html">
				<div dojoType="unieap.layout.TitlePane" title="人员编辑" >
			      <form id="org.form" dojoType="unieap.form.Form" binding="{store:'empDataStore'}">
			        <fieldset>
			          <legend>人员编辑</legend>
			          <table width="100%">
			          	<tr>
			              <td class="td">
			                <label for="EMPNO" style="width:40px;">编号:</label>
			              </td>
						  <td>
						  	<input name="EMPNO" id="attr_empno" binding="{name:'empno'}" dojoType="unieap.form.NumberTextBox" displayFormat="######"></input>  
						  </td>
			              <td class="td">
			                <label for="attr_job" style="width:40px;">职位:</label>
			              </td>
						   <td><input name="attr_job" id="attr_job" binding="{name:'job'}" dojoType="unieap.form.TextBox" />
						  </td>
			              <td class="td">
			                <label for="attr_ename" style="width:40px;">姓名:</label>
			              </td>
						   <td><input name="attr_ename" id="attr_ename" binding="{name:'ename'}" dojoType="unieap.form.TextBox" /></td>
			            </tr>
			            <tr>
			              <td class="td">
			                <label for="attr_sal" style="width:40px;">工资:</label>
			 			  </td>
						  <td>
						   	<input name="attr_sal" id="attr_sal" binding="{name:'sal'}" dojoType="unieap.form.NumberTextBox" value=""  displayFormat="######"/>
						  </td>
			              <td class="td">
			                 <label for="attr_hiredate" style="width:40px;">日期:</label>
			              </td>
			              <td>
			              	<input type="text" id="attr_hiredate" name="hiredate" binding="{name:'hiredate'}" dojoType="unieap.form.DateTextBox"/>
						  </td>
			            </tr>
			          </table>
			        </fieldset>
			        <div style="text-align:right">     
			          <input id="form_refresh" dojoType="unieap.form.Button" label="刷新" class="formfield"/>               	
			          <input id="form_add" dojoType="unieap.form.Button" label="增加" class="formfield"/>
			          <input id="form_del" dojoType="unieap.form.Button" label="删除" class="formfield"/>
			          <input id="form_save" dojoType="unieap.form.Button" label="保存" class="formfield"/>
			        </div>   
			       </form>
				   <div id="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
						binding="{store:'empDataStore'}" selection="{selectType:'s'}"
						views="{rowNumber:false,rowBar:true,orderType:'server'}" >
						<fixed>
							<cell label="员工编号" width="100px" name="empno"></cell>
						</fixed>
						<header>
							<cell width="25%" label="姓名" width="25%" name="ename"></cell>
							<cell width="25%" label="职位" width="25%" name="job"></cell>
							<cell width="25%" label="工资" width="25%" name="sal"></cell>
							<cell width="25%" label="入职日期" width="25%" name="hiredate" 
								displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}">
							</cell>
						</header>
						<toolbar paging="{url:'/RIATest.do?method=testLoadPoJo',onPagingModified:onPM}"></toolbar>   
					</div>
				</div>
			</textarea>
			<span style="font-size:14px;">本样例中的js代码：</span>
			<textarea name="code2" class="html">
				<script type="text/javascript">
					dojo.addOnLoad( function() {
						initialize();
					});

					function init() {
						var dataStore = new unieap.ds.DataStore("empDataStore");
						dataStore.setPageSize(20);
						dataStore.setRowSetName("com.neusoft.unieap.ria.pojo.entities.Emp");
						dataStore.addStatistic("empno", "max");
						dataStore.addStatistic("hiredate", "min");
						dataStore.addStatistic("sal", "avg");
						dataStore.addStatistic("sal", "sum");
						var dc = new unieap.ds.DataCenter();
						dc.addDataStore(dataStore);
						var newdc = unieap.Action.requestData( {
							url : unieap.WEB_APP_NAME + "/RIATest.do?method=testLoadPoJo",
							parameters : {
								"asynLoadStatistics" : true
							},
							sync : true,
							load : function(dc) {
							}
						}, dc);
						dataCenter.addDataStore(newdc.getDataStore("empDataStore"));
						var ds = new unieap.ds.DataStore("DEPT", [ {
							CODEVALUE : "10",
							CODENAME : "财务部"
						}, {
							CODEVALUE : "20",
							CODENAME : "人力资源部"
						}, {
							CODEVALUE : "30",
							CODENAME : "会计部"
						}, {
							CODEVALUE : "40",
							CODENAME : "文体部"
						} ]);
						dataCenter.addDataStore(ds);
					}

					init();

					function initialize() {
						var selection = unieap.byId("grid").getManager("SelectionManager");
						selection.setSelect(0);
						dojo.connect(selection, "onAfterSelect", afterSelected);
						dojo.connect(unieap.byId("form_save"), "onClick", this, save);
						dojo.connect(unieap.byId("form_add"), "onClick", this, add);
						dojo.connect(unieap.byId("form_del"), "onClick", this, del);
						dojo.connect(unieap.byId("form_refresh"), "onClick", this, refresh);
						dojo.connect(unieap.byId("open_query_dialog"), "onClick", this, openQueryDialog);
					}
		
					function afterSelected() {
						var rowIndex = unieap.byId("grid").getManager("SelectionManager")
								.getSelectedRowIndexs()[0];
						var row = unieap.byId("grid").getBinding().getRowSet().getRow(rowIndex);
						unieap.byId("form").getBinding().bind(row);
						return true;
					}

					function add() {
						var attr_empno = dojo.byId("attr_empno").value;
						var attr_ename = dojo.byId("attr_ename").value;
						var attr_job = dojo.byId("attr_job").value;
						var attr_sal = dojo.byId("attr_sal").value;
						var attr_hiredate = unieap.byId("attr_hiredate").getValue();
		
						var data = {
							attr_empno : attr_empno,
							attr_ename : attr_ename,
							attr_job : attr_job,
							attr_sal : attr_sal,
							attr_hiredate : attr_hiredate
						};
						unieap.byId("grid").getManager("EditManager").insertRow(data);

						unieap.byId("form").getBinding().unbind();
						unieap.byId("form").clear();

						unieap.byId("grid").getManager("SelectionManager").setSelect(0);
					}

					function save() {
						var dc = new unieap.ds.DataCenter();
						dc.addDataStore(dataCenter.getDataStore("empDataStore"));
						unieap.Action.requestData( {
							url : unieap.WEB_APP_NAME + "/RIATest.do?method=testSavePoJo",
							parameters : {
								"asynLoadStatistics" : false
							},
							sync : true,
							load : function(dc) {
								dataCenter.getDataStore("empDataStore").getRowSet().resetUpdate();
								alert("保存成功。");
							}
						}, dc);
					}

					function del() {
						var rowIndex = unieap.byId("grid").getManager("SelectionManager").getSelectedRowIndexs()[0];
						unieap.byId("grid").getManager("EditManager").deleteRow(rowIndex);
					}

					function refresh() {
						var dc = new unieap.ds.DataCenter();
						var datastore = dataCenter.getDataStore("empDataStore");
						datastore.setCondition("");
						datastore.removeConditionValues();
						datastore.setRecordCount(0);
						dc.addDataStore(datastore.collect("none"));
						
						var newdc = unieap.Action.requestData( {
							url : unieap.WEB_APP_NAME + "/RIATest.do?method=testLoadPoJo",
							sync : true,
							load : function(dc) {
							}
						}, dc);

						dataCenter.addDataStore(newdc.getDataStore("empDataStore"));
						var ds = new unieap.ds.DataStore("DEPT", [ {
							CODEVALUE : "10",
							CODENAME : "财务部"
						}, {
							CODEVALUE : "20",
							CODENAME : "人力资源部"
						}, {
							CODEVALUE : "30",
							CODENAME : "会计部"
						}, {
							CODEVALUE : "40",
							CODENAME : "文体部"
						} ]);
						dataCenter.addDataStore(ds);
						unieap.byId("grid").getBinding().setDataStore(newdc.getDataStore("empDataStore"));
						unieap.byId("grid").getManager("SelectionManager").setSelect(0);
					}

					function openQueryDialog() {
						var dialog = new unieap.dialog.Dialog({
							url : "<%=appPath%>/pages/samples/integration/grid_pojo_query_dialog.jsp",
							height : 180,
							onComplete : confirmReturn});
						dialog.show(unieap.byId("open_query_dialog").domNode);
					}

					function confirmReturn(value) {
						var dataStore = dataCenter.getDataStore("empDataStore");
						dataStore = dataStore.collect("none");
						dataStore.setCondition("");
						dataStore.removeConditionValues();
						dataStore.setRecordCount(0);

						var sql = "";
					    if (value[0] != null && value[0] != "") {
					    	sql = sql + " EMPNO = ? ";
					    	dataStore.insertConditionValue(value[0], "4", unieap.DATATYPES.INTEGER);
						}

						if (value[1] != null && value[1] != "") {
							if(sql == "") {
								sql = sql + " ENAME = ? ";
							}
							else {
								sql = sql + " AND ENAME = ? ";
							}
							dataStore.insertConditionValue(value[1], "100", unieap.DATATYPES.STRING);
						}

						if (value[2] != null && value[2] != "") {
							if(sql == "") {
								sql = sql + " JOB = ? ";
							}
							else {
								sql = sql + " AND JOB = ? ";
							}
							dataStore.insertConditionValue(value[2], "9", unieap.DATATYPES.TIMESTAMP);
						}

						if (value[3] != null && value[3] != "") {
							if(sql == "") {
								sql = sql + " SAL = ? ";
							}
							else {
								sql = sql + " AND SAL = ? ";
							}
							dataStore.insertConditionValue(value[3], "16", unieap.DATATYPES.DOUBLE);
						}

						dataStore.setCondition(sql);

						var dc = new unieap.ds.DataCenter();
						dc.addDataStore(dataStore);
						var newdc = unieap.Action.requestData({
							url:unieap.WEB_APP_NAME+ "/RIATest.do?method=testLoadPoJo", 
							parameters:{"asynLoadStatistics":true},
							sync:true,
							load:function(dc){
							}
						}, dc);
						dataCenter.addDataStore(newdc.getDataStore("empDataStore"));
						var ds = new unieap.ds.DataStore("DEPT",[{CODEVALUE:"10",CODENAME:"财务部"},{CODEVALUE:"20",CODENAME:"人力资源部"},{CODEVALUE:"30",CODENAME:"会计部"},{CODEVALUE:"40",CODENAME:"文体部"}]);
						dataCenter.addDataStore(ds);

						unieap.byId("grid").getBinding().setDataStore(newdc.getDataStore("empDataStore"));
						unieap.byId("grid").getManager("SelectionManager").setSelect(0);
					}
					function onPM(store,binding){
						if(confirm("保存修改？")){
							binding.save({url:'/RIATest.do?method=testSavePoJo'});
						}
					}
				</script>
			</textarea>
		</div>
	</body>
</html>
