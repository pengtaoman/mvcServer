 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>
<%@ page import="org.apache.struts.Globals" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<html>
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
        <title></title>
		<script type="text/javascript" src="<%=appPath%>/pages/app.js"></script>
    </head>
    <body class="unieap">
         <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			表格式录入业务模式样例，样例持久层采用Ibatis。<br>
		 </div>
    	 <div dojoType="unieap.layout.TitlePane" title="查询条件" >
		      <form id="formQuery" jsId="form" dojoType="unieap.form.Form">
		       <fieldset dojoType="unieap.form.FieldSet" title="查询条件">
		          <table width="100%">
		          	<tr>
		              <td class="td">
		                <label for="attr_userId" style="width:40px;">用户ID:</label>
		              </td>
					  <td><input type="text" name="attr_userId" id="attr_userId" maxLength="32" binding="{name:'userId'}" dojoType="unieap.form.TextBox" />
					  </td>
					  <td class="td">                           
		                <label for="attr_fullName" style="width:40px;">用户全名:</label>
		              </td>
					   <td><input type="text" name="attr_fullName" id="attr_fullName" maxLength="32" binding="{name:'fullName'}" dojoType="unieap.form.TextBox" />
					  </td>
		              <td class="td">
		                <label for="attr_registerDate" style="width:40px;">注册日期:</label>
		              </td>
					  <td>
					    <input type="text" id="attr_registerDate" name="attr_registerDate" binding="{name:'registerDate'}" dojoType="unieap.form.DateTextBox" />
					  </td>

		            </tr>
		            <tr>
		              <td class="td">
		                <label for="attr_orderId" style="width:40px;">订单ID:</label>
		 			  </td>
					  <td>
					   	<input type="text" name="attr_orderId" id="attr_orderId" maxLength="32" binding="{name:'orderId'}" dojoType="unieap.form.TextBox" />
					  </td>
		              <td class="td">
		                 <label for="attr_orderName" style="width:40px;">订单名称:</label>
		              </td>
		              <td>
		              	<input type="text" id="attr_orderName" name="attr_orderName" maxLength="32" binding="{name:'orderName'}" dojoType="unieap.form.TextBox" />
					  </td>
					  <!-- 
					  <td class="td">
		                 <label for="attr_deptNo" style="width:40px;">用户所属部门:</label>
		              </td>
		              <td>
		              	<input type="text" id="attr_deptNo" name="attr_deptNo" binding="{name:'deptNo'}" dojoType="unieap.form.ComboBox" dataProvider="{'store':'DEPT'}" />
					  </td>
					   -->
					   <td class="td">
		                 <label for="attr_createDate" style="width:40px;">下单日期:</label>
		              </td>
		              <td>
		                <input type="text" id="attr_createDate" name="attr_createDate" binding="{name:'createDate'}" dojoType="unieap.form.DateTextBox" />
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
		
		<!-- div dojoType="unieap.layout.TitlePane" title="录入信息">
			<form id="inputForm" jsId="inputForm" dojoType="unieap.form.Form">
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
		</div-->

		<div dojoType="unieap.layout.TitlePane" title="人员信息">
		  <div id="grid" jsId="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
			binding="{store:'usersAndOrdersDataStore'}" edit="{editType:'cellEdit',singleClickEdit:false}"
			views="{rowNumber:false,rowBar:true,orderType:'client'}" selection="{selectType:'m'}"
			group="{autoApply:true,groupBar:true,statistic:{registerDate:'max'}}">>
			<header> 
				<cell width="20%" label="用户ID" width="25%" name="userId" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left',maxLength:32}}"></cell>
				<cell width="15%" label="用户全名" width="25%" name="fullName" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left',maxLength:32}}"></cell>
				<cell width="15%" label="订单ID" width="25%" name="orderId" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left',maxLength:32}}"></cell>
				<cell width="20%" label="订单名称" width="25%" name="orderName" editor="{editorClass:'unieap.form.TextBox',editorProps:{textAlign:'left',maxLength:32}}"></cell>
				<cell width="15%" label="注册日期" width="25%" name="registerDate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}" editor="{editorClass:'unieap.form.DateTextBox',editorProps:{displayFormatter:{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}}}"></cell>
				<cell width="15%" label="下单日期" width="25%" name="createDate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}" editor="{editorClass:'unieap.form.DateTextBox',editorProps:{displayFormatter:{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}}}"></cell>
				<!-- 
				<cell width="15%" label="用户所属部门" width="25%" name="deptNo" editor="{editorClass:'unieap.form.ComboBox',editorProps:{id:'CODEVALUE',dataProvider:{store: 'DEPT'}}}"></cell>
				 -->
			</header>
			<toolbar paging="{url:'/test.do?method=query'}">
				<DIV align="right">
			<input id ="btnAdd" dojoType="unieap.form.Button" label="增加" />
			<input id ="btnDelGrid" dojoType="unieap.form.Button" label="删除"/>
			<input id="btnSubmit" dojoType="unieap.form.Button" label="提交"/>
		</DIV>
			</toolbar>   
		</div>
		
	</body>
</html>
