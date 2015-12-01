 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<html>
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
        <title>模式三（表格与对话框）</title>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/model/model3/model3.js"></script>
    </head>
    <body class="unieap">
         <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			表格与对话框业务模式样例，样例持久层采用Hibernate。<br>
		 </div>
    	 <div dojoType="unieap.layout.TitlePane" title="查询条件" >
		      <form id="formQuery" dojoType="unieap.form.Form">
		        <div dojoType="unieap.form.FieldSet" title="FieldSet控件">
		          <legend>查询条件</legend>
		          <table style="width:100%;tab-layout:fixed;position:relative">
		          	<tr>
		              <td class="td">
		                <label for="EMPNO" style="width:40px;">编号:</label>
		              </td>
					  <td><div name="EMPNO" id="attr_empno" maxlength="4" binding="{name:'empno'}" dojoType="unieap.form.NumberTextBox" displayFormat="######"></div>  
					  </td>
					  <td class="td">                           
		                <label for="attr_ename" style="width:40px;">姓名:</label>
		              </td>
					   <td><div name="attr_ename" id="attr_ename" maxlength="32" binding="{name:'ename'}" dojoType="unieap.form.TextBox" ></div>
					  </td>
		              <td class="td">
		                <label for="attr_job" style="width:40px;">职位:</label>
		              </td>
					  <td>
					   	<div name="attr_job" id="attr_job" maxlength="9"  binding="{name:'job'}" dojoType="unieap.form.TextBox" ></div>
					  </td>

		            </tr>
		            <tr>
		              <td class="td">
		                <label for="attr_sal" style="width:40px;">工资:</label>
		 			  </td>
					  <td>
					   	<div name="attr_sal" id="attr_sal" maxlength="7" binding="{name:'sal'}" dojoType="unieap.form.NumberTextBox" value=""  displayFormat="######"></div>
					  </td>
		              <td class="td">
		                 <label for="attr_hiredate" style="width:40px;">入司日期:</label>
		              </td>
		              <td>
		              	<div type="text" id="attr_hiredate" name="hiredate" binding="{name:'hiredate'}" dojoType="unieap.form.DateTextBox"></div>
					  </td>
					  <td class="td">
		                 <label for="attr_deptno" style="width:40px;">部门:</label>
		              </td>
		              <td>
		              	<div type="text" id="attr_deptno" name="attr_deptno" binding="{name:'deptno'}" dojoType="unieap.form.ComboBox" dataProvider="{'store':'DEPT'}"></div>
					  </td>
		            </tr>
		          </table>
		        </div>
		        <div style="text-align: right">
		        	<div id="btnQuery" dojoType="unieap.form.Button" label="查询" class="formfield"> </div>
		        	<div id="btnReset" dojoType="unieap.form.Button" label="重置" class="formfield"></div>
		        </div>
			</form>
		</div>
		<div dojoType="unieap.layout.TitlePane" title="人员信息">
		  <div id="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
			binding="{store:'empDataStore'}" views="{rowNumber:false,rowBar:true,orderType:'client'}" selection="{selectType:'s'}">
			<header> 
				<cell width="20%" label="编号" width="25%" name="empno"  ></cell>
				<cell width="15%" label="姓名" width="25%" name="ename"  ></cell>
				<cell width="15%" label="职位" width="25%" name="job" ></cell>
				<cell width="20%" label="工资" width="25%" name="sal" ></cell>
				<cell width="15%" label="入职日期" width="25%" name="hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}" ></cell>
				<cell width="15%" label="部门" width="25%" name="deptno" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}" ></cell>
			</header>
			<toolbar paging="{url:'/modelpojo.do?method=loadPojo',onPagingModified:onPM}"></toolbar>   
		</div>
		<div align="right">
			<input id ="btnAdd" dojoType="unieap.form.Button" label="增加" />
			<input id ="btnMod" dojoType="unieap.form.Button" label="修改" />
			<input id ="btnDelGrid" dojoType="unieap.form.Button" label="删除"/>
			<input id="btnSubmit" dojoType="unieap.form.Button" label="提交"/>
		</div>
	</body>
</html>
