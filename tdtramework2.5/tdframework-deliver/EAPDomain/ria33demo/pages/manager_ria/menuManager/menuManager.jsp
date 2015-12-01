<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
 
<html style="height:100%">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>菜单树</title>
		<style>
        	.label_field {
				word-break:break-all;
				padding:5px 0 5px 5px;
				font-size: 13px;
				font-family: 宋体
			}
			
			.button_field {
				width:100%;
				text-align:right;
				padding:4px 10;
			}
        </style>
        <script type="text/javascript">
        	dojo.require("unieap.dialog.MessageBox");
        </script>
        
		<script type="text/javascript" src="<%=appPath%>/pages/manager_ria/menuManager/menuManager.js"></script>

			
	</head>
	<body class="unieap" style="height:100%;width:100%;">
	
		<table style="height:99%;width:100%;">
			<tr>
			
				<td style="width:25%;height:100%;" align="top">
					<div style="height:100%;">					
						<div dojoType="unieap.layout.TitlePane" title="菜单树" style="width: 98%;height:680px">
							<div dojoType="unieap.tree.Tree" animate = "false" id="menuTree"  jsId="menuTree" onContextMenu="onContextMenu" onAfterExpand="onAfterMenuTreeExpand"  onClick="treeNodeClick"  loader="{'url':'ria_menumanager.do?method=getMenuTree','getPostData':getPostData}" binding = "{store:'appStore','leaf':'leaf','label':'label','parent':'parentID',query:{name:'parentID',relation:'=',value:null}}"></div>
						</div>	
					</div>
				</td>
				
				<td style="height:100%;width:75%" align="top">
					<div style="height:100%;">
						<!-- =================================================右侧Form域 begin====================================== -->		
						<div dojoType="unieap.layout.TitlePane" title="菜单详细信息" style="width: 100%;height:680px">		
							
							<div dojoType="unieap.form.FieldSet" title="详细信息" >
							  <form id="menuInfoForm" jsId="menuInfoForm" dojoType="unieap.form.Form">
								<table style="table-layout:fixed;font-size:12px;height:68px;width: 100%;">
									<tr>
										<td width="50" >
											名称
										</td>
										<td width="240">
											<div dojoType="unieap.form.TextBox"  jsId="menuName" id="menuName" binding="{name:'name'}" readOnly="true"></div>
										</td>
										<td width="70" >
											请求对象
										</td>
										<td width="240" >
											<div dojoType="unieap.form.TextBox" jsId="url" id="url" binding="{name:'location'}"></div>
										</td>
									</tr>
									
									<tr>
										<td width="50">
											题目
										</td>
										<td width="240">
											<div dojoType="unieap.form.TextBox" jsId="title" id="title" binding="{name:'title'}"  required="true"></div>
										</td>
										<td width="70">
											目标区域
										</td>
										<td width="240">
											<div dojotype="unieap.form.TextBox" jsId="target" id="target" binding="{name:'target'}">
											</div>
										</td>
									</tr>
									
									<tr>
										<td width="50">
											图片
										</td>
										<td width="240">
											<input dojotype="unieap.form.TextBox" jsId="pic" id="pic" binding="{name:'image'}"/>
										</td>
										<td width="70">
											图片描述
										</td>
										<td width="240">
											<input jsId="picDesc" id="picDesc" dojotype="unieap.form.TextBox" binding="{name:'imageAlt'}"/>
										</td>
									</tr>
									
									<tr>
										<td width="50">
											描述
										</td>
										<td width="240">
											<input dojotype="unieap.form.TextBox" jsId="desc" id="desc" binding="{name:'desciption'}"/>
										</td>
										<td width="70">
											默认显示
										</td>
										<td width="240">
										    <select dojoType="unieap.form.ComboBox" dataProvider="{staticData:true}" jsId="defaultShow" id="defaultShow" binding="{name:'chief'}"> 
												<option value="false" selected>否</option>
												<option value="true">是</option> 
											</select>
										</td>
									</tr>
								</table>
							  </form>	
							</div>
							<div  class="button_field" >
								<button dojoType="unieap.form.Button" label="重置" onClick="resetMenuInfo()" style="width:50px;margin-right:5px"></button>
								<button dojoType="unieap.form.Button" label="刷新" onClick="refresh()" style="width:50px;margin-right:5px"></button>
								<button dojoType="unieap.form.Button" label="保存" onClick="saveMenuInfo()" style="width:50px;"></button>
							</div>
						</div>
						
						<!-- =================================================右侧Form域 end====================================== -->
					</div>
				</td>
				
				
			</tr>
		</table>
		
		
	</body>
</html>