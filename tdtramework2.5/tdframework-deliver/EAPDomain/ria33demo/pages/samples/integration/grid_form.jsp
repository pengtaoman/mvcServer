<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
    <head>
        <title>RIA综合样例</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
			@import "<%=appPath%>/pages/samples/blackbird/blackbird.css";
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/blackbird/blackbird.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
		<script type="text/javascript"
			src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushJScript.js"></script>
        <script type="text/javascript" src="<%=appPath%>/pages/samples/integration/grid_form.js"></script>
    </head>
    <body class="unieap">
    	<div style="line-height:20px;font-size:13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			该样例中，Form和Grid关联，选择Grid某条记录自动绑定Form，可以进行数据修改，并可删除和保存数据。<br>
		</div>
		<br />
	    <div dojoType="unieap.layout.TitlePane"   title="职工信息" style="width:100%;margin-bottom:3px;'">
	   		<div style="background-color:#dfe8f6;padding:5px;overflow:hidden;">
		   		<fieldset dojoType="unieap.form.FieldSet" title="编辑信息">
			   		<form id='form' dojoType="unieap.form.Form" style="margin:0px;">		   			
				   		<table style="table-layout:fixed;font-size:12px;height:68px;">
				   			<tr>
				   				<td width="50">编号：</td><td width="240"><div dojoType="unieap.form.NumberTextBox" binding="{name:'attr_empno'}" required = "true"></div></td>
				   				<td width="50">姓名：</td><td width="240"><div dojoType="unieap.form.TextBox" binding="{name:'attr_ename'}"></div></td>
				   			</tr>
				   			<tr>
				   				<td width="50">日期：</td><td width="240"><div dojoType="unieap.form.DateTextBox" binding="{name:'attr_hiredate'}" maxLength="30" displayFormatter="{dataFormat:'yyyy-MM-dd HH:mm:ss'}"></div></td>
				   				<td width="50">部门：</td><td width="240"><div dojoType="unieap.form.ComboBox" dataProvider="{store:'DEPT'}" binding="{name:'attr_deptno'}"></div></td>
				   			</tr>
				   			<tr>
				   				<td width="50">工资：</td><td width="240"><div dojoType="unieap.form.NumberTextBox" binding="{name:'attr_sal'}"></div></td>
				   				<td width="50">职务：</td><td width="240"><div dojoType="unieap.form.TextBox" binding="{name:'attr_job'}"></div></td>
				   			</tr>
				   		</table>
			   		</form>
			   	</fieldset>
	   		</div>
	    </div>
	    <div dojoType="unieap.layout.TabContainer"  style="height:350px">
	    	<div dojoType="unieap.layout.ContentPane" title="基本表格">
		        <div id="grid" dojoType="unieap.grid.Grid" 
			        width="auto"  height="300px" filter='{}' selection="{selectType:'s'}" 
					binding="{store:'empDataStore'}" views="{rowBar:true,rowNumber:true,orderType:'server'}" 
					lockedRow="{statistics:[{attr_sal:'max'},{attr_sal:'sum'}], getLockedRow:getLockedRow}"	>
		            <fixed>
		                <cell label="员工编号" width="200" name="attr_empno"></cell>
		            </fixed>
		            <header>
		                <row>
		                    <cell colSpan="2" isMulTitle="true" label="多标题一" headerStyles="text-align: center;color: red;" styles="text-align: center;color: red;"></cell>
		                    <cell colSpan="3" isMulTitle="true" label="多标题二" headerStyles="color: red;"></cell>
		                </row>
		                <row>
		                    <cell label="姓名" name="attr_ename" width="150" headerStyles="text-align: left;"></cell>
		                    <cell label="日期" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd HH:mm:ss'}"></cell>
		                    <cell label="工资" width="150" name="attr_sal" styles="text-align:right;"></cell>
		                    <cell label="部门" width="150" name="attr_deptno" decoder="{store:'DEPT'}"></cell>
		                    <cell label="职务" width="30%" name="attr_job"></cell>
		                </row>
		            </header>
		            <toolbar export="true" print="true">
		            	<button dojoType="unieap.form.Button" label=" 新增 " onClick="doInsert()"></button>&nbsp;
		            	<button dojoType="unieap.form.Button" label=" 删除 " onClick="doDelete()"></button>&nbsp;
		            	<button dojoType="unieap.form.Button" label=" 保存 " onClick="doSumbit()"></button>
		            </toolbar>
		            <foot style="text-align:center;">
						 最大薪资：<span style="color: #2748c2" express="max(attr_sal)"></span>；
						最小薪资：<span style="color: #2748c2" express="min(attr_sal)"></span>；
						行数：<span style="color: #2748c2" express="getRowCount()"></span>；
						自定义数据：<span style="color: #2748c2" express="getData()"></span>；
						测试上下文：<span style="color: #2748c2" express="${testContext}" context="myContext"></span>
		            </foot>
		        </div>
        	</div>
        </div>
        <br />
		<div dojoType="unieap.layout.TitlePane" open="open" title="代码">
			<textarea name="code" class="html">
				<!-- 表单控件 -->
				<div dojoType="unieap.form.Form" id="form">
				</div>
				
				<!-- grid控件 -->
				<div dojoType="unieap.grid.Grid" id="grid">
				</div>
			</textarea >
			<textarea name="code" class="js">
				<script type="text/javascript">
					dojo.addOnLoad(function(){
						//事件绑定
						dojo.connect(unieap.byId("grid").getManager("SelectionManager"),"onAfterSelect",function(rowIndex){
							unieap.byId("form").getBinding().setDataStore(dataCenter.getDataStore("empDataStore"),rowIndex);
						});
					});
					
					//保存grid中修改的数据
					function doSumbit(){
	 					unieap.byId("grid").getBinding().save();
					}
					
					//删除grid中的数据
					function doDelete(){
						var rowIndex = unieap.byId("grid").getManager("RowManager").getCurrentRowIndex();
						if(rowIndex<0) return ;
						unieap.byId("grid").getManager("EditManager").deleteRow(rowIndex);
					}
					
					//往grid中插入数据
					function doInsert(){
						var no = unieap.byId("grid").getBinding().getDataStore().getRecordCount()+3000;
						unieap.byId("grid").getBinding().insertRow({attr_empno:no,attr_ename:"新增记录"},0);
						unieap.byId("grid").getManager("SelectionManager").setSelect(0);
						unieap.byId("grid").getManager("ViewManager").scrollToRow(1);
					}
				</script>	     
			</textarea>
		</div>
    </body>
</html>
