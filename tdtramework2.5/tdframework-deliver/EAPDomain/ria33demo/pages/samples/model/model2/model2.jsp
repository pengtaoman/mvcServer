 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<html>
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
        <title>模式二（列表式录入）</title>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/model/model2/model2.js"></script>
    </head>
    <body class="unieap">
         <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			表格式录入业务模式样例，样例持久层采用Hibernate。<br>
		 </div>
    	 <div dojoType="unieap.layout.TitlePane" title="查询条件" >
		      <form id="formQuery" dojoType="unieap.form.Form">
		       <fieldset dojoType="unieap.form.FieldSet" title="查询条件">
		          <table width="100%">
		          	<tr>
		              <td class="td">
		                <label for="EMPNO" style="width:40px;">编号:</label>
		              </td>
					  <td><input name="EMPNO" id="attr_empno" maxLength="4" binding="{name:'empno'}" dojoType="unieap.form.NumberTextBox" displayFormat="######"></input>  
					  </td>
					  <td class="td">                           
		                <label for="attr_ename" style="width:40px;">姓名:</label>
		              </td>
					   <td><input name="attr_ename" id="attr_ename" maxLength="32" binding="{name:'ename'}" dojoType="unieap.form.TextBox" />
					  </td>
		              <td class="td">
		                <label for="attr_job" style="width:40px;">职位:</label>
		              </td>
					  <td>
					   	<input name="attr_job" id="attr_job" maxLength="9"  binding="{name:'job'}" dojoType="unieap.form.TextBox" />
					  </td>

		            </tr>
		            <tr>
		              <td class="td">
		                <label for="attr_sal" style="width:40px;">工资:</label>
		 			  </td>
					  <td>
					   	<input name="attr_sal" id="attr_sal" maxLength="7" binding="{name:'sal'}" dojoType="unieap.form.NumberTextBox" value=""  displayFormat="######"/>
					  </td>
		              <td class="td">
		                 <label for="attr_hiredate" style="width:40px;">入司日期:</label>
		              </td>
		              <td>
		              	<input type="text" id="attr_hiredate" name="hiredate" binding="{name:'hiredate'}" dojoType="unieap.form.DateTextBox"/>
					  </td>
					  <td class="td">
		                 <label for="attr_deptno" style="width:40px;">部门:</label>
		              </td>
		              <td>
		              	<input type="text" id="attr_deptno" name="attr_deptno" binding="{name:'deptno'}" dojoType="unieap.form.ComboBox" dataProvider="{'store':'DEPT'}"/>
					  </td>
		            </tr>
		          </table>
		        </fieldset>
		        <div style="text-align: right">
		        	<input id="btnQuery" dojoType="unieap.form.Button" label="查询" class="formfield"/> 
		        	<input id="btnReset" dojoType="unieap.form.Button" label="重置" class="formfield"/>
		        </div>
			</form>
		</div>
		
		<div dojoType="unieap.layout.TitlePane" title="录入信息">
			<form id="inputForm" dojoType="unieap.form.Form">
			 <fieldset dojoType="unieap.form.FieldSet" title="录入信息">
				<table width="100%">
		          	<tr>
		              <td class="td">
		                <label for="insert_job" style="width:40px;">职位:</label>
		              </td>
					  <td>
					   	<input name="insert_job" id="insert_job" maxLength="9"  binding="{name:'job'}" dojoType="unieap.form.TextBox" />
					  </td>
		              <td class="td">
		                 <label for="insert_hiredate" style="width:40px;">入司日期:</label>
		              </td>
		              <td>
		              	<input type="text" id="insert_hiredate" name="insert_hiredate" binding="{name:'hiredate'}" dojoType="unieap.form.DateTextBox"/>
					  </td>
					  <td class="td">
		                 <label for="insert_deptno" style="width:40px;">部门:</label>
		              </td>
		              <td>
		              	<input type="text" id="insert_deptno" name="insert_deptno" binding="{name:'deptno'}" dojoType="unieap.form.ComboBox" dataProvider="{'store':'DEPT'}"/>
					  </td>
		            </tr>
		        </table>
		          </fieldset>
			<div style="text-align:right">
				<input id="insertSelected" dojoType="unieap.form.Button" label="选中行整列插入"/>
				<input id="insertAll" dojoType="unieap.form.Button" label="全部整列插入"/>
			</div>
			
		</form>
		</div>

		<div dojoType="unieap.layout.TitlePane" title="人员信息">
		  <div id="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
			binding="{store:'empDataStore'}" edit="{editType:'rowEdit',singleClickEdit:true}"
			views="{rowNumber:false,rowBar:true,orderType:'client'}" selection="{selectType:'m'}">
			<header> 
				<cell width="20%" label="编号" width="25%" name="empno" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left'}}"></cell>
				<cell width="15%" label="姓名" width="25%" name="ename" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left',maxLength:32}}"></cell>
				<cell width="15%" label="职位" width="25%" name="job" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left',maxLength:9}}"></cell>
				<cell width="20%" label="工资" width="25%" name="sal" editor="{editorClass:'unieap.form.NumberTextBox',editorProps:{textAlign:'left',precision:6,scale:2}}"></cell>
				<cell width="15%" label="入职日期" width="25%" name="hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}" editor="{editorClass:'unieap.form.DateTextBox',editorProps:{displayFormatter:{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}}}"></cell>
				<cell width="15%" label="部门" width="25%" name="deptno" editor="{editorClass:'unieap.form.ComboBox',editorProps:{id:'CODEVALUE',dataProvider:{store: 'DEPT'}}}"></cell>
			</header>
			<toolbar paging="{url:'/modelpojo.do?method=loadPojo',onPagingModified:onPM}"></toolbar>   
		</div>
		<DIV align="right">
			<input id ="btnAdd" dojoType="unieap.form.Button" label="增加" />
			<input id ="btnDelGrid" dojoType="unieap.form.Button" label="删除"/>
			<input id="btnSubmit" dojoType="unieap.form.Button" label="提交"/>
		</DIV>
	</body>
</html>
