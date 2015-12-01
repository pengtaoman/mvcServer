<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Grid样例</title>
		<style type="text/css">
			@import "<%=appPath%>/pages/samples/syntaxHighlighter/Styles/SyntaxHighlighter.css";
			@import "<%=appPath%>/pages/samples/blackbird/blackbird.css";
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/blackbird/blackbird.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/data.js">
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/grid/advanced/grid_masterdetail.js">
		</script>
	</head>
	<body class="unieap">
		<div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			该样例展示了数据表格（Grid）组件中与Master Detail相关的特性。
			<br>
			通过配置“detail”属性，数据表格的每一条记录都可以展开并显示详细信息。
		</div>
		<br/>
		<div dojoType="unieap.layout.TabContainer" style="height:600px">
			<div dojoType="unieap.layout.ContentPane" title='自定义detail'>
				<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="300px" binding="{store:'largedata'}" views="{rowBar:true,orderType:'client'}" detail='{expandAll:false,getMasterDetail:getMasterDetail}'>
					<fixed>
						<cell label="员工编号" width="60" name="attr_empno" styles="color:red;">
						</cell>
					</fixed>
					<header>
						<cell width="20%" label="姓名" name="NAME" headerStyles="text-align: left;">
						</cell>
						<cell width="20%" label="部门" name="attr_deptno" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}">
						</cell>
						<cell width="20%" label="入职日期" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}">
						</cell>
						<cell width="20%" label="职位" name="attr_job" headerStyles="text-align: left;">
						</cell>
						<cell width="20%" label="工资" name="attr_sal">
						</cell>
					</header>
				</div>
				<br/>
				<div dojoType="unieap.layout.TitlePane"   style="height:250px" title="代码">
					<textarea name="code" class="html">
						<div  dojoType="unieap.grid.Grid" detail='{expandAll:false,getMasterDetail:getMasterDetail}'>
						</div>
						function getMasterDetail(inRowIndex){
							var store = dataCenter.getDataStore("empDataStore");
							var result = ["<div style=\"width:auto;border-top:1px solid #dddddd;height:120px\">"];
							result.push("<table width=\"469\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr>  <td width=\"124\" rowspan=\"4\">");
							result.push("<img  border=0 src=\"");
							result.push(unieap.appPath + "/pages/samples/grid/advanced/images/");
							result.push(inRowIndex % 4);
							result.push(".jpeg\"></img>");
							result.push("</td>  <td width=\"85\" align=\"center\">工作单位：</td>  <td width=\"252\"><strong>东软集团</strong></td></tr><tr>  <td align=\"center\">政治面貌：</td>  <td>");
							var mianmao = getMianmao(inRowIndex);
							result.push(mianmao);
							result.push("</td></tr><tr>  <td align=\"center\">家庭住址：</td>  <td><u>");
							var addr = getAddress(inRowIndex);
							result.push(addr);
							result.push("</u></td></tr><tr>  <td align=\"center\"><em>联系电话：</em></td>  <td style=\"color:blue;\">");
							result.push("13322299999");
							result.push("</td></tr></table>");
							result.push("</div>");
							return result.join("");
						}
						
						function getMianmao(inRowIndex){
							switch (inRowIndex% 4) {
								case 0:
									return "团员";
								case 1:
									return "党员";
								case 2:
									return "群众";
								case 3:
									return "群众";
								default:
									return "党员";
							}
						}
						
						function getAddress(inRowIndex){
							switch (inRowIndex% 4) {
								case 0:
									return "辽宁 大连  沙河口区 XX路901号";
								case 1:
									return "辽宁 大连  中山区 YY路251号";
								case 2:
									return "辽宁 大连  甘井子区 ZZ路71号";
								case 3:
									return "辽宁 大连  西岗区 XXX路202号";
								default:
									return "辽宁 大连  沙河口区 XX路901号";
							}
						}
					</textarea>
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title='自定义detail-form'>
				<div dojoType="unieap.grid.Grid" width="100%" height="300px" binding="{store:'empFilterDataStore2'}"  
				views="{rowBar:true}"
				detail='{expandAll:false,getMasterDetail:getMasterDetailForm}'>
					<header>
						<cell width="20%" label="工资" name="attr_sal" headerStyles="text-align: left;">
						</cell>
						<cell width="20%" label="入职日期" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}">
						</cell>
						<cell width="20%" label="姓名" name="NAME" headerStyles="text-align: left;">
						</cell>
						<cell width="20%" label="部门" name="attr_deptno" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}">
						</cell>
						<cell width="20%" label="职位" name="attr_job" headerStyles="text-align: left;">
						</cell>
					</header>
				</div>

						<br/>
					<div dojoType="unieap.layout.TitlePane"   style="height:250px" title="代码">
						<textarea name="code" class="html">
						function getMasterDetailForm(index){
							var f=dojo.create('div',{
							innerHTML:"<div dojoType='unieap.form.Form' binding='{store:\"empFilterDataStore2\",bindIndex:"+index+"}'>"+
								"<div dojoType='unieap.form.FieldSet' title='编辑'>"+
								"<table><tr>"+
									"<td>工资</td><td><div dojoType='unieap.form.TextBox' binding='{name:\"attr_sal\"}'></div></td>"+
									"<td>入职日期</td><td><div dojoType='unieap.form.DateTextBox' binding='{name:\"attr_hiredate\"}'></div></td>"+
								"</tr></table>"+
								"</div>"+
							"</div>"
						});
						dojo.parser.parse(f);
						return f;
						};
						</textarea>
					</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title='自定义detail-嵌套grid'>
				<div dojoType="unieap.grid.Grid" width="100%" height="300px" binding="{store:'empLockDataStore'}" views="{rowBar:true,orderType:'client'}" detail='{expandAll:false,getMasterDetail:getMasterDetailGrid}'>
					<fixed>
						<cell label="员工编号" width="60" name="attr_empno" styles="color:red;">
						</cell>
					</fixed>
					<header>
						<cell width="20%" label="姓名" name="NAME" headerStyles="text-align: left;">
						</cell>
						<cell width="20%" label="部门" name="attr_deptno" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}">
						</cell>
						<cell width="20%" label="入职日期" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}">
						</cell>
						<cell width="20%" label="职位" name="attr_job" headerStyles="text-align: left;">
						</cell>
						<cell width="20%" label="工资" name="attr_sal">
						</cell>
					</header>
				</div>
				<br/>
				<div dojoType="unieap.layout.TitlePane"   style="height:250px" title="代码">
					<textarea name="code" class="html">
						<div dojoType="unieap.grid.Grid"  detail='{expandAll:false,getMasterDetail:getMasterDetailGrid}'>
						</div>
						function getMasterDetailGrid(){
						var grid = new unieap.grid.Grid({
							layout: {
								structure: [{
									rows: [[{
										label: "员工编号",
										name: "attr_empno",
										width: "150px",
										editor: {
											editorClass: 'unieap.form.TextBox'
										}
									}, {
										label: "员工姓名",
										name: "NAME",
										width: "150px",
										editor: {
											editorClass: 'unieap.form.TextBox'
										}
									}]]
								}]
							},
							edit: {
								editType: 'rowEdit',
								singleClickEdit: false
							},
							binding: {
								store: 'empFilterDataStore'
							},
							height: '145px',
							width: '326px'
						});
						return grid.domNode;
					}
					</textarea>
				</div>
			</div>
			<div dojoType="unieap.layout.ContentPane" title="全展开">
				<div dojoType="unieap.grid.Grid" width="100%" height="300px" detail='{expandAll:true,getMasterDetail:getMasterDetail}' views="{rowBar:true,orderType:'client'}" binding="{store:'empDataStore'}">
					<fixed>
						<cell label="员工编号" width="60" name="attr_empno" styles="color:red;">
						</cell>
					</fixed>
					<header>
						<cell width="20%" label="姓名" name="NAME" headerStyles="text-align: left;">
						</cell>
						<cell width="20%" label="部门" name="attr_deptno" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}">
						</cell>
						<cell width="20%" label="入职日期" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}">
						</cell>
						<cell width="20%" label="职位" name="attr_job" headerStyles="text-align: left;">
						</cell>
						<cell width="20%" label="工资" name="attr_sal">
						</cell>
					</header>
				</div>
				<br/>
				<div dojoType="unieap.layout.TitlePane"   style="height:250px" title="代码">
					<textarea name="code" class="html">
						<div dojoType="unieap.grid.Grid"  detail='{expandAll:true,getMasterDetail:getMasterDetail}'>
							...
						</div>
					</textarea>
				</div>
			</div>
		</div>
	</body>
</html>
