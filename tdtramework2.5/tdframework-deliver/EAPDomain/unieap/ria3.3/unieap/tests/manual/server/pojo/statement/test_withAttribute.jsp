 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></meta>
        <title>statement-complex</title>
		<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
		<script type="text/javascript" src="test_withAttribute.js"></script>
    </head>
    <body class="unieap">
    	 <div dojoType="unieap.layout.TitlePane" title="人员编辑" >
     <form id="org.form" jsId="orgForm" dojoType="unieap.form.Form" binding="{store:'queryForm'}">
        <fieldset dojoType="unieap.form.FieldSet" title="人员编辑">
          <table width="100%">
          	<tr>
            	<td class="td" >                            
	                <label for="EMPNO" style="width:80px;">
	                 		  雇员编号:
	                </label>
			  </td>
			  <td class="td" align="center">                            
	                <label for="EMPNO" style="width:80px;">
	                 		  =
	                </label>
			  </td>
			  <td>
			  	 <input name="EMPNO" id="EMPNO" binding="{name:'empNo'}" dojoType="unieap.form.NumberTextBox" ></input> 
			  </td>
			   <td  class="td" > 
                        <label for="HIREDATE" style="width:80px;">
                     	       入职时间:
                        </label>
			  	</td>
				<td class="td" align="center">                            
	                <label for="EMPNO" style="width:80px;">
	                 		=
	                </label>
			  </td>
				<td> <input type="text" id="attr_hiredate" name="{name:'hiredate'}" binding="{name:'attr_hiredate'}" dojoType="unieap.form.DateTextBox" />
					</td>
			  
            </tr>
            <tr>
            	<td  class="td">
            		<label for="HIREDATE" style="width:80px;">
                     	        工  资: 
                        </label>
			  	</td>
				<td  class="td" align="center">
					<select  id="compara" dojoType="unieap.form.ComboBox" readonly=true width="60px" dataProvider="{staticData:true}">
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
     <div id="grid" jsId="grid" dojoType="unieap.grid.Grid" width="100%" height="300px"
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
				</div>
	</body>
</html>
