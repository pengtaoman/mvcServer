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
		<script type="text/javascript" src="<%=appPath%>/pages/samples/blackbird/blackbird.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/syntaxHighlighter/Scripts/shBrushXml.js"></script>
        <script type="text/javascript" src="<%=appPath%>/pages/samples/integration/grid_tree.js"></script>
    </head>
    <body class="unieap">
	    <div style="line-height:20px;font-size: 13px;font-family: 宋体" dojoType="unieap.layout.TitlePane" title="说明">
			该样例结合了Tree和Grid，通过点击Tree的节点可以动态改变Grid的DataStore、隐藏和显示Grid。<br />
		</div>
		<br />
		<table  style="width:auto;table-layout:fixed;">
			<tr>
				<td valign="top" style="width:30%;">
					<div dojoType="unieap.tree.Tree" getLabelStyle="selfDefineLabelStyle" id="basicTree" label="RIA" onClick="treeNodeClick" binding = "{'leaf':'leaf','store':treegrid,'label':'label','parent':'parent',query:{name:'parent',relation:'=',value:''}}">
					</div>
				</td>
				<td style="width:70%">
					<div id="gridContainer"  style="display:block;">
						<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
							binding="{store:'empDataStore'}" views="{rowNumber:true,orderType:'client'}">
							<fixed>
								<cell label="员工编号" width="60" name="attr_empno"  styles="color:red;"></cell>
							</fixed>
							<header>
								<cell width="12%" label="姓名" name="NAME" headerStyles="text-align: left;"></cell>
								<cell width="12%" label="部门(转义值)" name="attr_deptno" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
								<cell width="22%" label="入职日期(已格式化的列)" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
								<cell width="12%" label="职位" name="attr_job" headerStyles="text-align: left;"></cell>
								<cell width="8%" label="工资" name="attr_sal"></cell>
							</header>
						</div>
					</div>
				</td>
			</tr>
		</table>
		<br />
		<div dojoType="unieap.layout.TitlePane" open="open" title="代码">
			<textarea name="code" class="html">
				<table width="100%">
					<tr>
						<td valign="top">
							<div dojoType="unieap.tree.Tree" getLabelStyle="selfDefineLabelStyle" id="basicTree" label="RIA" onClick="treeNodeClick" binding = "{'leaf':'leaf','store':treegrid,'label':'label','parent':'parent',query:{name:'parent',relation:'=',value:''}}">
							</div>
						</td>
						<td>
							<div id="gridContainer" style="display:block;">
								<div id="grid" dojoType="unieap.grid.Grid" width="100%" height="200px"
									binding="{store:'empDataStore'}" views="{rowNumber:true,orderType:'client'}">
									<fixed>
										<cell label="员工编号" width="60" name="attr_empno"  styles="color:red;"></cell>
									</fixed>
									<header>
										<cell width="12%" label="姓名" name="NAME" headerStyles="text-align: left;"></cell>
										<cell width="12%" label="部门(转义值)" name="attr_deptno" decoder="{store:'DEPT',valueAttr:'CODEVALUE',displayAttr:'CODENAME'}"></cell>
										<cell width="22%" label="入职日期(已格式化的列)" name="attr_hiredate" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}"></cell>
										<cell width="12%" label="职位" name="attr_job" headerStyles="text-align: left;"></cell>
										<cell width="8%" label="工资" name="attr_sal"></cell>
									</header>
								</div>
							</div>
						</td>
					</tr>
				</table>
			</textarea>
			<span>js代码：</span>
			<textarea name="code2" class="html">
				var storeChanged = false;
				function changeDataStore() {
					if (storeChanged) {
						unieap.byId("grid").getBinding().setDataStore(unieap.getDataStore("empDataStore"));
					} else {
						unieap.byId("grid").getBinding().setDataStore(unieap.getDataStore("empDataStore2"));
					}
					storeChanged = !storeChanged;
				}
				
				function treeNodeClick(treenode) {
					if(treenode.getLabel()=="切换Datastore") {
						changeDataStore();
					}
					else if(treenode.getLabel()=="显示Grid") {
						dojo.byId("gridContainer").style.display="block";
					}
					else if(treenode.getLabel()=="隐藏Grid") {
						dojo.byId("gridContainer").style.display="none"
					}
					else {
						
					}
					return true;
				}
			</textarea>
		</div>
    </body>
</html>
