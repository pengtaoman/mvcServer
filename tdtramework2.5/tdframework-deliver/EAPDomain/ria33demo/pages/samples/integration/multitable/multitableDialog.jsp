<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>

<html>
	<head>
		<meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
		<title>对话框</title>
		 <script type="text/javascript" src="<%=appPath%>/pages/samples/integration/multitable/data.js"></script>
		 <script type="text/javascript" src="<%=appPath%>/pages/samples/integration/multitable/multitableDialog.js"></script>
	</head>
	<body class="unieap">
	  <div dojoType="unieap.layout.TitlePane" title="数据编辑" >
		<form id="form" dojoType="unieap.form.Form">
			<div dojoType="unieap.form.FieldSet" title="数据编辑">
				<table width="100%">
		          	<tr>
		              <td class="td">
		                <label for="attr_no" style="width:40px;">编号:</label>
		              </td>
					  <td><div   name="attr_no"  binding="{name:'attr_no'}" dojoType="unieap.form.NumberTextBox" displayFormat="######"></div>  
					  </td>
					  <td class="td">                           
		                <label for="attr_name" style="width:40px;">名称:</label>
		              </td>
					   <td><div   name="attr_name" binding="{name:'attr_name'}" dojoType="unieap.form.TextBox" ></div>
					  </td>
		            </tr>
		            <tr>
		            	<td class="td">
		                <label for="attr_method" style="width:40px;">缴存方式:</label>
		              </td>
					  <td>
					   	<div   name="attr_method"  binding="{name:'attr_method'}" dojoType="unieap.form.ComboBox" dataProvider = "{store:'method'}"></div>
					  </td>
		              <td class="td">
		                <label for="attr_bank" style="width:40px;">归集银行:</label>
		 			  </td>
					  <td>
					   	<div  name="attr_bank" binding="{name:'attr_bank'}" dojoType="unieap.form.ComboBox" dataProvider = "{store:'bank'}" decoder = "{valueAttr:'id',displayAttr:'name'}"></div>
					  </td>
		            </tr>
					<tr>
						  <td class="td">
			                 <label for="attr_personNumber" style="width:40px;">缴存人数:</label>
			              </td>
			              <td>
			              	<div type="text" name=attr_personNumber   binding="{name:'attr_personNumber'}" dojoType="unieap.form.NumberTextBox"></div>
						  </td>
							  <td class="td">
			                 <label for="attr_amount" style="width:40px;">缴存总额:</label>
			              </td>
			              <td>
			              	<div type="text" name="attr_amount"   binding="{name:'attr_amount'}" dojoType="unieap.form.NumberTextBox" ></div>
						  </td>
					</tr>
					
					<tr>
						  <td class="td">
			                 <label for="attr_startDate" style="width:40px;">开户日期:</label>
			              </td>
			              <td>
			              	<div type="text" name="attr_startDate"   binding="{name:'attr_startDate'}" dojoType="unieap.form.DateTextBox"></div>
						  </td>
							  <td class="td">
			                 <label for="attr_state" style="width:40px;">单位状态:</label>
			              </td>
			              <td>
			              	<div type="text" name="attr_state"   binding="{name:'attr_state'}" dojoType="unieap.form.ComboBox" dataProvider="{'store':'state'}"></div>
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
