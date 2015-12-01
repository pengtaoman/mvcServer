<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Grid样例</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/app/grid_condition.js">
		</script>		
	</head>
	<body class="unieap">
		<div dojoType="unieap.layout.TitlePane" title="条件" style="margin-bottom:10px;">
			<table style="width:100%;table-layout:fixed;position:relative;">
				<tr>
					<td style="width:60px;">
						姓名
					</td>
					<td style="width:60px;">
						<select style="width:50px;"  value='like' id="empnameCondition" id="empnameCondition" dojoType="unieap.form.ComboBox" dataProvider="{staticData:true}" onChange="fn" >
							<option value="=">=</option>
							<option  value="like">like</option>
							<option value="null">为空</option>
						</select>
					</td>
					<td style="width:220px;">
						<div dojoType="unieap.form.TextBox" id="empname" required="true"></div>
					</td>
					<td style="width:60px;">
						员工编号
					</td>
					<td style="width:60px;">
						<select style="width:50px;"  value='>' id="empnoCondition" dojoType="unieap.form.ComboBox" dataProvider="{staticData:true}" >
							<option value="=">=</option>
							<option  value=">">></option>
							<option  value="<"><</option>
						</select>
					</td>
					<td style="width:220px;">
						<div  dojoType="unieap.form.TextBox" id="empno" required="true"></div>
					</td>
				</tr>
				<tr>
					<td colspan="5">
					</td>
					<td>
						<div dojoType="unieap.form.Button" onClick="query()" label="查询"></div>
					</td>
				</tr>
			</table>
		</div>
		<div id="grid1" dojoType="unieap.grid.Grid" width="auto" height="300px" binding="{store:'empDataStore'}" views="{rowNumber:true,rowBar:true,orderType:'client'}">
			<header>
				<cell label="员工编号" width="25%" name="attr_empno">
				</cell>
				<cell width="25%" label="姓名" name="attr_ename">
				</cell>
				<cell width="25%" label="职位" name="attr_job">
				</cell>
				<cell width="25%" label="工资" name="attr_sal" dataType="number">
				</cell>
			</header>
		</div>
		<div dojoType="unieap.layout.TitlePane" style="margin-top:10px;" open="false" title="代码">
			<textarea name="code" class="html">
				function query(){
					//用户名
					var name=unieap.byId("empname").getValue();
					
					//用户编号
					var number=unieap.byId("empno").getValue();
					
					//用户名为空或者用户编号为空
					if((name==""&&!unieap.byId("empname").disabled)||number==""){
						alert('输入查询条件');
						return;
					}
					//用户名查询条件,是否是等于、like或者非空
					var nameCon=unieap.byId("empnameCondition").getValue();
					
					//用户编号查询条件,是否是大于、等于等
					var numberCon=unieap.byId("empnoCondition").getValue();
					
					var ds=dataCenter.getDataStore('empDataStore');
					
					if(nameCon=="null"){ //如果用户过滤条件为空,即NULL
						ds.setCondition("[attr_ename] is NULL "+" and [attr_empno] "+numberCon+" ? ");
					}else{
						ds.setCondition("[attr_ename] "+nameCon+" ? and [attr_empno] "+numberCon+" ? ");
					}
					
					if(nameCon=='like'){ //如果用户名过滤条件为like
						name='%'+name+'%';
					}
					
					ds.removeConditionValues(); 
					
					if(nameCon!="null"){  //如果用户名过滤条件不为空
						ds.insertConditionValue(name,unieap.DATATYPES.STRING,0);
					}
					ds.insertConditionValue(number,unieap.DATATYPES.INTEGER,1);
					unieap.Action.doQuery(ds,{
						load:function(ds){
							grid1.getBinding().setDataStore(ds);
						}
					});
				}
			</textarea>
		</div>
	</body>
</html>
