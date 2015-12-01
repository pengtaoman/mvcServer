 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<html>
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
        <title>模式一（表单式录入）</title>

		<style type="text/css">
			@import "<%=appPath%>/pages/samples/form/style/MyClass.css";
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/model/model1/model1.js"></script>
   </head>
    <body class="unieap">
        <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			表单式录入业务模式样例，样例持久层采用Hibernate。<br>
		</div>
    	 <div dojoType="unieap.layout.TitlePane" title="查询条件" >
		      <form id="formQuery" dojoType="unieap.form.Form">
		        <fieldset dojoType="unieap.form.FieldSet" title="查询条件">
		          <table width="100%">
		          	<tr>
		              <td class="td">
		                <label for="query_empno" style="width:40px;">编号:</label>
		              </td>
					  <td><input name="query_empno" id="query_empno" maxLength="4" binding="{name:'empno'}" dojoType="unieap.form.TextBoxWithIcon" displayFormat="######" iconClass="newIcon" focusShift="true" style="float:left" ></input>  
					  </td>
		            </tr>
		          </table>
		        </fieldset>
			</form>
		</div>
		
		<div dojoType="unieap.layout.TitlePane" title="人员信息编辑">
			<form id="inputForm" dojoType="unieap.form.Form">
			  <fieldset dojoType="unieap.form.FieldSet" title="信息编辑">
				<table width="100%" >
					<tr>
					  <td class="td">
		                <label for="attr_empno" style="width:40px;">编号:</label>
		              </td>
					  <td>
					   	<input name="attr_empno" id="attr_empno" maxLength="4"  binding="{name:'empno'}" dojoType="unieap.form.NumberTextBox" displayFormat="######" required="true"/>
					  </td>
		              <td class="td">
		                 <label for="attr_ename" style="width:40px;">姓名:</label>
		              </td>
		              <td>
		              	<input type="text" id="attr_ename" name="attr_ename" binding="{name:'ename'}" dojoType="unieap.form.TextBox" required="true"/>
					  </td>
					</tr>
					<tr>
					  <td class="td">
		                 <label for="attr_hiredate" style="width:40px;">入司日期:</label>
		              </td>
		              <td>
		              	<input type="text" id="attr_hiredate" name="attr_hiredate" binding="{name:'hiredate'}" dojoType="unieap.form.DateTextBox" required="true"/>
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
		                 <label for="attr_deptno" style="width:40px;">部门:</label>
		              </td>
		              <td>
		              	<input type="text" id="attr_deptno" name="attr_deptno" binding="{name:'deptno'}" dojoType="unieap.form.ComboBox" dataProvider="{'store':'DEPT'}"/>
					  </td>
		            </tr>
		        </table>
			<DIV align="right">
				<input id ="btnAdd" dojoType="unieap.form.Button" label="新增" />
				<input id ="btnDelGrid" dojoType="unieap.form.Button" label="删除"/>
				<input id="btnSubmit" dojoType="unieap.form.Button" label="保存"/>
			</DIV>
			</fieldset>
		</form>
		</div>
	</body>
</html>
