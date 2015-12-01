 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<html>
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
        <title>主从表持久化</title>
        <script type="text/javascript" src="<%=appPath%>/pages/samples/integration/multitable/data.js"></script>
         <script type="text/javascript" src="<%=appPath%>/pages/samples/integration/multitable/multitable.js"></script>
    </head>
    <body class="unieap">
    	 <div dojoType="unieap.layout.TitlePane" title="功能说明" style="height:50px">
    	 	主从表的操作及持久化样例
    	 </div>	
		 	<div dojoType="unieap.layout.TitlePane" title="查询条件">
		 		<form id="formQuery" dojoType="unieap.form.Form">
		    	<div dojoType="unieap.form.FieldSet" title="FieldSet控件">
		          <table style="width:100%;tab-layout:fixed;position:relative">
		          	<tr>
		              <td class="td">
		                <label for="no" style="width:40px;">编号:</label>
		              </td>
					  <td><div  id="no" dojoType="unieap.form.NumberTextBox" ></div>  
					  </td>
					  <td class="td">                           
		                <label for="name" style="width:40px;">名称:</label>
		              </td>
					   <td><div  id="name" dojoType="unieap.form.TextBox" ></div>
					  </td>
		            </tr>
		            <tr>
		              <td class="td">
		                <label for="state" style="width:40px;">单位状态:</label>
		 			  </td>
					  <td>
					   	<div  id="state" dojoType="unieap.form.ComboBox" dataProvider="{'store':'state'}"></div>
					  </td>
		              <td class="td">
		                 <label for="method" style="width:40px;">缴存方式:</label>
		              </td>
		              <td>
		              	<div  id="method"  dojoType="unieap.form.ComboBox" dataProvider="{'store':'method'}"></div>
					  </td>
		            </tr>
		          </table>
		        </div>
		        <div style="text-align: right">
		        	<div id="btnQuery" dojoType="unieap.form.Button" label="查询" class="formfield" onClick = "query"> </div>
		        	<div id="btnReset" dojoType="unieap.form.Button" label="重置" class="formfield"  onClick = "reset"></div>
		        </div>
			</form>
		  </div>

		
		  <div id="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
			binding="{store:'company'}" views="{rowNumber:false,rowBar:true,orderType:'client'}"  selection="{selectType:'s'}">
			<header> 
				<cell width="10%" label="编号"  name="attr_no"  ></cell>
				<cell width="10%" label="名称"  name="attr_name"  ></cell>
				<cell width="10%" label="缴存方式"  name="attr_method" decoder="{store:'method',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}" ></cell>
				<cell width="10%" label="归集银行"  name="attr_bank" decoder="{store:'bank',valueAttr:'id',displayAttr:'name'}"></cell>
				<cell width="15%" label="缴存人数"  name="attr_personNumber"></cell>
				<cell width="15%" label="缴存总额" name="attr_amount" ></cell>
			   
			   <cell width="15%" label="开户日期"  name="attr_startDate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}" ></cell>
			   <cell width="15%" label="单位状态"  name="attr_state" decoder = "{store:'state',valueArr:'CODEVALUE',dispalyAttr:'CODENAME'}"></cell>
			</header> 
			<toolbar></toolbar>
		</div>
		<div align="right">
			<input id ="btnAdd" dojoType="unieap.form.Button" label="增加" onClick="add"/>
			<input id ="btnMod" dojoType="unieap.form.Button" label="修改" onClick="modify"/>
			<input id ="btnDelGrid" dojoType="unieap.form.Button" label="删除" onClick="deleteData"/>
			<input id="btnSubmit" dojoType="unieap.form.Button" label="提交" onClick="save"/>
		</div>
	</body>
</html>
