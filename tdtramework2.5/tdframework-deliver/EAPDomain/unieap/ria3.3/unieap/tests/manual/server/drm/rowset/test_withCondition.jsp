<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>表格持久化</title>
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
         <script type="text/javascript" src="test_withCondition.js"></script>
	</head>
    <body class="unieap">
	     <div dojoType="unieap.layout.TitlePane" title="人员编辑" >
		      <form id="org.form" jsId="orgForm" dojoType="unieap.form.Form" binding="{store:'empDataStore'}">
		       	  <fieldset dojoType="unieap.form.FieldSet" title="人员编辑">
		          <table width="100%">
		          	<tr>
		              <td class="td">                            
		                <label for="attr_empno" style="width:40px;">编号:</label>
		              </td>
					  <td>
					  	<input name="attr_empno" id="attr_empno" binding="{name:'attr_empno'}" dojoType="unieap.form.NumberTextBox"   validator="{regExp:/^[1-9]+\d*$/,errorMsg:'只能输入正整数'}" displayFormat="######" required="true"></input>   
					  </td>
		              <td  class="td">                            
		                <label for="attr_job" style="width:40px;">职位:</label>
		              </td>
					  <td>
					  	<input name="attr_job" id="attr_job" binding="{name:'attr_job'}" dojoType="unieap.form.TextBox" />
					  </td>
		              <td  class="td">                           
		                <label for="attr_ename" style="width:40px;">姓名:</label>
		                
		              </td>
					  <td><input name="attr_ename" id="attr_ename" binding="{name:'attr_ename'}" dojoType="unieap.form.TextBox" />
					  	</td>
		            </tr>
		            <tr>
		              <td class="td">
		                <label for="attr_sal" style="width:40px;">工资:</label>
		 			  </td>
					  <td> <input name="attr_sal" id="attr_sal" binding="{name:'attr_sal'}" dojoType="unieap.form.NumberTextBox" value=""  displayFormat="######"/>
					  	</td>
		              <td  class="td"> 
		                 <label for="attr_hiredate" style="width:40px;">日期:</label>
		              </td>
		             <td> <input type="text" id="attr_hiredate" name="{name:'attr_hiredate'}" binding="{name:'attr_hiredate'}" dojoType="unieap.form.DateTextBox" />
					  	</td>
		            </tr>
		          </table>
		        </fieldset>
		        <div style="text-align:right">     
		          <input id="form_add" dojoType="unieap.form.Button" label=" 增加" class="formfield"/>
		          <input id="form_del" dojoType="unieap.form.Button" label=" 删除" class="formfield"/>
		          <input id="form_save" dojoType="unieap.form.Button" label=" 保存" class="formfield"/>
		        </div>   
				
		       </form>
			   <div id="grid" jsId="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
					binding="{store:'empDataStore'}"
					lockedRow="{statistics:{'attr_empno':'max','attr_hiredate':'min','attr_sal':'avg'}}"
					views="{rowNumber:false,rowBar:true,orderType:'none'}"
					selection="{selectType:'s'}">
					<fixed>
						<cell label="员工编号" width="150" name="attr_empno"></cell>
					</fixed>
					<header>
						<cell width="100px" label="姓名" width="25%" name="attr_ename"></cell>
						<cell width="150px" label="职位" width="25%" name="attr_job"></cell>
						<cell width="150px" label="工资" width="25%" name="attr_sal"></cell>
					</header>
				</div>
				
		</div>
    </body>
</html>