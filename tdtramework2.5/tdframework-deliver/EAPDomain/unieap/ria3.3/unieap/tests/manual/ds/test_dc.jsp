<%@ page contentType="text/html; charset=UTF-8" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </meta>
        <title>测试requestData的parameters属性</title>
        <%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<script type="text/javascript" src="data.js"></script>
	</head>
   <body class="unieap">
		<div dojoType ="unieap.layout.TitlePane" >
			<fieldset dojoType="unieap.form.FieldSet" title="编辑信息">
			   		<form id='form' jsId="form" dojoType="unieap.form.Form" style="margin:0px;">		   			
				   		<table style="table-layout:fixed;font-size:12px;height:68px;">
				   			<tr>
				   				<td width="50">编号：</td><td width="240"><div dojoType="unieap.form.NumberTextBox" binding="{name:'attr_empno'}" required = "true"></div></td>
				   				<td width="50">姓名：</td><td width="240"><div dojoType="unieap.form.TextBox" binding="{name:'NAME'}"></div></td>
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
		<div dojoType="unieap.layout.TitlePane">
			  <div id="grid" jsId="grid" dojoType="unieap.grid.Grid"  width="auto"  height="300px" 	binding="{store:'empDataStore'}"
			  lockedRow="{statistics:[{attr_empno:'max'},{attr_empno:'min'}]}">
		            <header>
		                <row>
		                	<cell label="员工编号" width="200" name="attr_empno"></cell>
		                    <cell label="姓名" name="NAME" width="150" headerStyles="text-align: left;"></cell>
		                    <cell label="日期" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd HH:mm:ss'}"></cell>
		                    <cell label="工资" width="150" name="attr_sal" styles="text-align:right;"></cell>
		                    <cell label="部门" width="150" name="attr_deptno" decoder="{store:'DEPT'}"></cell>
		                    <cell label="职务" width="30%" name="attr_job"></cell>
		                </row>
		            </header>
		            <toolbar > </toolbar>
		        </div>
		</div>
		<div dojoType="unieap.layout.TitlePane" title="appendTest">
			<div dojoType="unieap.form.FieldSet"   title="新DataStore覆盖原有同名DataStore">
					.调用DataCenter的append方法，第一个参数为新DataCenter<br>
					.第二个参数<br>
						 *	    replace : 替换<br>
						 *      discard : 抛弃，默认<br>
						 *      append : 追加记录<br>
						 *      union : 取记录数并集<br>
						 *		updateProps : 只改变属性，用于更新统计数
			</div>
				恢复初始的DataStore：
			<div dojoType="unieap.form.Button" onClick="reset" label="reset"></div><br></p>
			<div dojoType="unieap.form.Button" onClick="replaceTest" width ="100" label="replaceTest"></div><br></p>
			<div dojoType="unieap.form.Button" onClick="connectTest" width ="100"  label="appendTest"></div><br></p>
			<div dojoType="unieap.form.Button" onClick="unionTest" width ="100"  label="unionTest"></div><br></p>
			<div dojoType="unieap.form.Button" onClick="statisticTest" width ="100"  label="statisticTest"></div>
		</div>
	</body>
</html>