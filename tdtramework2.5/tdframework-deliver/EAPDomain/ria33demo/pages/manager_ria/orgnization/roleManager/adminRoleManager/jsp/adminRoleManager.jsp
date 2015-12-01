<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>

<html >
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>管理角色管理</title>
		<script>
			dojo.require("unieap.dialog.MessageBox");
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/manager_ria/orgnization/roleManager/adminRoleManager/js/adminRoleManager.js"></script>			
	</head>
	<body class="unieap">
	
		<div dojoType="unieap.layout.AdaptiveContainer"  height="100%" width="100%" style='float:left'>
			<div dojoType="unieap.layout.AdaptivePane" autoHeight=true onHeightChange="ggg.resize()">
				<div jsId="ggg" dojoType="unieap.layout.TitlePane" style="height:100%;" title="可管理的子安全管理角色列表">
				
				 	<div id="adminRoleGrid" jsId="adminRoleGrid" dojoType="unieap.grid.Grid"  binding="{store:'adminRoleDS'}" width="100%" height="100%" views="{rowNumber:true,rowBar:true,orderType:'client'}" selection="{selectType:'m'}">
   						<header>
							<cell label="名称" name="roleName" width="30%"></cell>
							<cell label="描述" name="description" width="70%" ></cell>
    					</header>
	                    <toolbar>
	    					<input dojoType="unieap.form.Button" label="增加" id="add" jsId="add" onClick="addAdminRole()" style="width:50px;margin-right:5px"/>
							<input dojoType="unieap.form.Button" label="修改" id="modify" jsId="modify" onClick="modifyAdminRole()" style="width:50px;margin-right:5px"/>
							<input dojoType="unieap.form.Button" label="删除" id="delete" jsId="delete" onClick="deleteAdminRole()" style="width:50px;margin-right:5px"/>
						</toolbar>
 					</div>
				
				</div>
			</div>
		</div>
	</body>
</html>