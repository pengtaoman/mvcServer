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
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushJScript.js"></script>	
		<script type="text/javascript" src="<%=appPath%>/pages/samples/integration/grid_statement.js"></script>
    </head>
    <body class="unieap">
    	<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			该样例是Grid组件Statement查询的例子。<br>
		</div>
		<br />
    	 <div dojoType="unieap.layout.TitlePane" title="人员编辑" >
		     <form id="org.form" dojoType="unieap.form.Form" binding="{store:'queryForm'}">
		        <fieldset dojoType="unieap.form.FieldSet" title="人员编辑">
		          <table width="100%" style="font-size:12px;" cellspacing=0 cellpadding=0>
		          	<tr>
		            	<td class="td" >
			                <label for="EMPNO" style="width:80px;">雇员编号:</label>
					 	</td>
					 	<td class="td" align="center">
			                <label for="EMPNO" style="width:80px;">=</label>
					  	</td>
					  	<td>
					  		<input name="EMPNO" id="EMPNO" binding="{name:'empNo'}" dojoType="unieap.form.NumberTextBox" displayFormat="######"></input> 
					  	</td>
					   	<td class="td" >
		                	<label for="HIREDATE" style="width:80px;">入职时间:</label>
					  	</td>
						<td class="td" align="center">
			                <label for="EMPNO" style="width:80px;">=</label>
					  	</td>
						<td>
							<input type="text" id="attr_hiredate" name="{name:'hiredate'}" binding="{name:'attr_hiredate'}" dojoType="unieap.form.DateTextBox" />
						</td>
		            </tr>
		            <tr>
		            	<td  class="td">
		            		<label for="HIREDATE" style="width:80px;">工  资: </label>
					  	</td>
						<td class="td" align="center">
							<select id="compara" dojoType="unieap.form.ComboBox" width="60px" dataProvider="{staticData:true}">
							    <option  value="=" >=</option>
		                        <option  value=&gt>&gt;</option>
		                        <option value=&lt>&lt;</option>
							</select>
						</td>
						<td>
					  		<input name="attr_sal" id="attr_sal" binding="{name:'salary'}" dojoType="unieap.form.NumberTextBox" value=""  displayFormat="######"/>
					  	</td>
		            </tr>
		          </table>
		        </fieldset>
					<div style="text-align:right">
		     			<input dojoType="unieap.form.Button" label=" 查询" onclick="setStore" class="formfield"/>           
		         	</div>
		      </form>
	  	</div>
		<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
					binding="{store:'empDataStore'}"
					lockedRow="{statistics:{'EMPNO':'max','SAL':'avg'}}"
					views="{rowNumber:false,rowBar:true,orderType:'none'}"
					selection="{selectType:'s'}">
					<fixed>
						<cell label="员工编号" width="150" name="EMPNO"></cell>
					</fixed>
					<header>
						<cell width="100px" label="姓名" width="25%" name="ENAME"></cell>
						<cell width="150px" label="职位" width="25%" name="JOB"></cell>
						<cell width="150px" label="工资" width="25%" name="SAL"></cell>
					</header>
					<toolbar export="true"></toolbar>   
		</div>
		<br/>
		<div dojoType="unieap.layout.TitlePane" open="open" title="代码">
			<textarea name="code" class="js">
					var dataCenter;
					var ds_dept;
					var ds;
					function init(){
						//form绑定的store
						var queryForm = new unieap.ds.DataStore("queryForm");
						queryForm.getRowSet().addRow();
						//严格按照配置文件中参数的顺序
						queryForm.addMetaData("empNo",{dataType:4,precision:5});
						queryForm.addMetaData("deptno",{dataType:4});
					    queryForm.addMetaData("hiredate",{dataType:93}); 
						queryForm.addMetaData("salary",{dataType:8,precision:6,scale:2});	
						
						dataCenter.addDataStore(queryForm);
						
						//部门的transcode("DEPT")中用到dataCenter所以此处一定用全局变量dataCenter，同时保证DEPT一定存在。
						ds_dept = new unieap.ds.DataStore("DEPT",[{CODEVALUE:"10",CODENAME:"财务部"},{CODEVALUE:"20",CODENAME:"采购部"},{CODEVALUE:"30",CODENAME:"销售部"},{CODEVALUE:"40",CODENAME:"开发部"}]);
						dataCenter.addDataStore(ds_dept);
						
					    //empDataStore为grid使用的store保证其一定存在
						ds = new unieap.ds.DataStore("empDataStore");
						ds.setPageSize(10);
						ds.setStatementName("emp");
					}
					
					init();
					
					function query(){
						var queryForm = dataCenter.getDataStore("queryForm");
						var meta = queryForm.getMetaData();
						var empValue=queryForm.getRowSet().getItemValue(0,"empNo");
						var deptValue=queryForm.getRowSet().getItemValue(0,"deptno");
						var salValue=queryForm.getRowSet().getItemValue(0,"salary");
						var hiredateValue = queryForm.getRowSet().getItemValue(0,"attr_hiredate");
					    ds.parameters=[];
					    ds.removeAttributes();
						ds.removeConditionValues();
					    if(empValue!=null&&empValue!=""){
							ds.addAttribute("emp","EMPNO",unieap.DATATYPES.INTEGER);
							ds.insertConditionValue(empValue,unieap.DATATYPES.INTEGER);
						}
						if(deptValue!=null&&deptValue!=""){
							ds.addAttribute("dept","DEPTNO",unieap.DATATYPES.INTEGER);
							ds.insertConditionValue(deptValue,unieap.DATATYPES.INTEGER);
						}
						if(hiredateValue!=null&&hiredateValue!=""){
							ds.addAttribute("hiredate","HIREDATE",unieap.DATATYPES.TIMESTAMP);
						 		ds.insertConditionValue(hiredateValue,unieap.DATATYPES.TIMESTAMP);
						}
						if(salValue!=null&&salValue!=""){
							ds.addAttribute("salary","SAL",unieap.DATATYPES.DOUBLE);
							var com=unieap.byId("compara").getValue();
							ds.addAttribute("comp",com,"12");
							ds.insertConditionValue(salValue,unieap.DATATYPES.DOUBLE);
						}
						var dc = new unieap.ds.DataCenter();
						dc.addDataStore(ds);
						var ddc=unieap.Action.requestData({
							url:unieap.WEB_APP_NAME+ "/RIATest.do?method=testLoadPoJo",
							parameters:{"asynLoadStatistics":true},
							sync:true,
							load:function(dc){}
							},dc);
						dataCenter.addDataStore(ddc.getDataStore("empDataStore"));
					}
					
					query();
					
					function setStore(){
						query();
						unieap.byId("grid").getBinding().setDataStore(dataCenter.getDataStore("empDataStore"));
					}
					
					dojo.addOnLoad(function(){
						unieap.byId("grid").getBinding().setDataStore(dataCenter.getDataStore("empDataStore"));
					});
			</textarea>
		</div>
	</body>
</html>
