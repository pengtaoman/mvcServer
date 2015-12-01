<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8" %>
<html style="height:100%">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>授权页面</title>
		<%@ include file="/unieap/ria3.3/pages/config.jsp" %>
		<link rel="stylesheet" type="text/css" href="<%=appPath%>/pages/samples/tree/style/treeTest.css">
		</link>
		<style>
			.bg_input {
				border: 0px;
				font-size: 12px;
				background-color: #f9f9f9;
			}
		</style>
		<script type="text/javascript" src="<%=appPath%>/pages/samples/integration/tree_form_grid/tree_form_grid.js">
		</script>
		</head>
		<body class="unieap" style="height:100%;width:100%;">
			<div dojoType="unieap.layout.TitlePane" title="说明" style="width:100%;height:80px">
			tree-form-grid组合样例：点击树节点时grid做数据绑定，显示对应节点的Database，点击"new"展开fieldset通过form修改grid的值，其中new一个Database时，Database对应下拉框触发onChange事件设置新的Privilege。
			</div>
			<table style="height:99%;width:100%;table-layout:fixed;">
				<tr>
					<td style="width:200px;height:100%;">
						<div style="height:100%;">
							<!-- ================================== 用户列表 ====================================================== -->
							<div dojoType="unieap.layout.TitlePane" title="用户列表" style="height:100%">
								<div dojoType="unieap.tree.Tree" id="userTree" getIconClass="selfDefineIconClass" onClick="treeNodeClick" loader="{'url':'tree_form_grid.do?method=getUserList'}" binding = "{store:'userDS','leaf':'leaf','label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:null}}">
								</div>
							</div>
						</div>
					</td>
					<td style="height:100%;">
						<div style="height:100%;">
							<div dojoType="unieap.layout.TitlePane" title="Privilege" style="width: 100%; height:100%">
								
								<!-- ================================== 用户已有的权限列表 BEGIN====================================================== -->
								<SPAN class="left">UserName：<INPUT class="bg_input" name='tree_root_title' id="tree_root_title" readOnly size="40" value="" />
									<br>
								</SPAN>
								<div id="userPrivilegeGrid" dojoType="unieap.grid.Grid" width="auto" height="200px" binding="{store:'userPrivilegeDS'}" views="{rowNumber:true,rowBar:true,orderType:'client'}" rows="{defaultRowHeight:21}" views="{rowNumber:true,rowBar:true,orderType:'none'}" selection="{selectType:'m'}" edit="{editType:'rowEdit',singleClickEdit:false}">
									<header>
										<cell width="30%" label="Database" name="database" headerStyles="text-align: left;" decoder="{store:'databaseDS',valueAttr:'id',displayAttr:'dbname'}" editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'databaseDS'},decoder:{valueAttr:'id',displayAttr:'dbname'}}}">
										</cell>
										<cell width="30%" label="Country" name="country" decoder="{store:'countryDS',valueAttr:'id',displayAttr:'cname'}" editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'countryDS'},decoder:{valueAttr:'id',displayAttr:'cname'}}}">
										</cell>
										<cell width="40%" label="Procedure" name="procedure" editor="{editorClass:'unieap.form.ComboBox',editorProps:{dataProvider:{store: 'procedureDS'},decoder:{valueAttr:'pname',displayAttr:'pname'}}}">
										</cell>
									</header>
									<toolbar>
										<button dojoType="unieap.form.Button" label=" New " onClick="doInsert()">
										</button>
										<button dojoType="unieap.form.Button" label=" Delete " onClick="doDelete()">
										</button>
										<button dojoType="unieap.form.Button" label=" Save " onClick="doSumbit()">
										</button>
									</toolbar>
								</div>
								<!-- ================================== 用户已有的权限列表 END ====================================================== -->
								<!-- ================================== 新增权限的查询部分 BEGIN====================================================== -->
								<div id="editDiv" style="display:none">
									<br/>
									<hr/>
									<fieldset dojoType="unieap.form.FieldSet" label="New Privilege" title="New Privilege">
										<form id='form' dojoType="unieap.form.Form" style="margin:0px;">
											<table style="table-layout:fixed;font-size:12px;height:68px;">
												<tr>
													<td style="width:13%;padding-left:5px;">
														Database：
													</td>
													<td style="width:20%;">
														<div style="width:100%;position:relative;">
															<div  style="width:100%;" popup="{height:'150px'}" id="db" dojoType="unieap.form.ComboBox" dataProvider="{store:'databaseDS'}" decoder="{displayAttr:'dbname',valueAttr:'id'}" onChange="dbOnChange">
															</div>
														</div>
													</td>
													<td style="width:13%;padding-left:5px;">
														Country：
													</td>
													<td style="width:20%;">
														<div style="width:100%;position:relative;">
															<div style="width:100%;" id="country" popup="{height:'150px'}" cascade="{primary:'db',filterAttr:'filter'}" dojoType="unieap.form.ComboBox" dataProvider="{store:'countryDS'}" decoder="{displayAttr:'cname',valueAttr:'id'}">
															</div>
														</div>
													</td>
													<td style="width:13%;padding-left:5px;">
														Year：
													</td>
													<td style="width:20%;">
														<div style="width:100%;position:relative;">
															<div style="width:100%;" id="year" popup="{height:'150px'}" cascade="{primary:'country',filterAttr:'filter'}" dojoType="unieap.form.ComboBox" dataProvider="{store:'yearDS'}" decoder="{displayAttr:'id',valueAttr:'year'}">
															</div>
														</div>
													</td>
												</tr>
											</table>
											<div id="queryDiv">
											</div>
											<div id="buttonDiv" style="display:none">
												<table style="table-layout:fixed;font-size:12px;height:68px;">
													<tr>
														<td align="right">
															<button dojoType="unieap.form.Button" label="Query New Privilege" onClick="queryPrivilege()">
															</button>
															<button dojoType="unieap.form.Button" label="   Cancel   " onClick="CancelNewPrivilege(1)">
															</button>
														</td>
													</tr>
												</table>
											</div>
										</form>
									</fieldset>
								</div>
								<!-- ================================== 新增权限的查询部分 END====================================================== -->
								
								<!-- ================================== 经过查询后的权限列表 ====================================================== -->
								<div id="privilegeListDiv" style="display:none">
									<hr/>New Privilege List
									<div id="privilegeListGrid" dojoType="unieap.grid.Grid" width="auto" height="200px" binding="{store:'privilegeListDS'}" views="{rowBar:true,rowNumber:true}">
										<fixed>
											<cell label="Procedure" width="200" name="procedureName">
											</cell>
										</fixed>
										<header>
											<row>
												<cell colSpan="3" isMulTitle="true" label="Privilege" headerStyles="color: red;">
												</cell>
											</row>
											<row>
												<cell label="Begin Time" width="150" name="beginTime" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}">
												</cell>
												<cell label="End Time" width="150" name="endTime" displayFormatter="{declaredClass:'unieap.form.DateDisplayFormatter',dataFormat:'yyyy-MM-dd'}">
												</cell>
												<cell label="Right" width="30%" name="rigth" editor="{editorClass:'unieap.form.CheckBox',editorProps:{checkedValue:1,uncheckedValue:0}}">
												</cell>
											</row>
										</header>
										<toolbar>
											<button dojoType="unieap.form.Button" label=" Submit " onClick="addNewPrivilege()">
											</button>
											<button dojoType="unieap.form.Button" label=" Cancel " onClick="CancelNewPrivilege(1)">
											</button>
										</toolbar>
									</div>
								</div>
								<!-- ================================== 经过查询后的权限列表 ====================================================== -->
								
								
							</div>
						</div>
					</td>
				</tr>
			</table>
		</body>
	</html>
