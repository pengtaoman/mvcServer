
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<script type="text/javascript" src="<%=appPath%>/pages/samples/dialog/dialogData_dialog.js"></script>

<html>
	<head>
		<meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
		<title>dialog样例</title>
	</head>
	<body class="unieap">
	  <div dojoType="unieap.layout.TitlePane" title="查询条件" >
		<form id="form" dojoType="unieap.form.Form">
			<div dojoType="unieap.form.FieldSet" title="查询条件">
				<table width="100%">
		          	<tr>
		              <td class="td">
		                <label for="EMPNO" style="width:40px;">编号:</label>
		              </td>
					  <td><div   name="empno" maxlength="4" binding="{name:'attr_empno'}" dojoType="unieap.form.NumberTextBox" displayFormat="######"></div>  
					  </td>
					  <td class="td">                           
		                <label for="NAME" style="width:40px;">姓名:</label>
		              </td>
					   <td><div   name="ename" maxlength="32" binding="{name:'NAME'}" dojoType="unieap.form.TextBox" ></div>
					  </td>
		            </tr>
		            <tr>
		            	<td class="td">
		                <label for="attr_job" style="width:40px;">职位:</label>
		              </td>
					  <td>
					   	<div   name="job" maxlength="9"  binding="{name:'attr_job'}" dojoType="unieap.form.TextBox" ></div>
					  </td>
		              <td class="td">
		                <label for="attr_sal" style="width:40px;">工资:</label>
		 			  </td>
					  <td>
					   	<div  name="sal" maxlength="7" binding="{name:'attr_sal'}" dojoType="unieap.form.NumberTextBox" value=""  displayFormat="######"></div>
					  </td>
		            </tr>
		          </table>
			</div>
		</form>
		  <div style="text-align: right">
		        	<div  dojoType="unieap.form.Button" label="确定" class="formfield" onClick="complete"> </div>
		        	<div  dojoType="unieap.form.Button" label="取消" class="formfield" onClick="close"></div>
		  </div>
	  </div>
	</body>
</html>