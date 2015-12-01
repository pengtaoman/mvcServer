<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>

<html >
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>管理员管理</title>
		<script>
			dojo.require("unieap.dialog.MessageBox");
			var appPath="<%=appPath%>";
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/manager_ria/orgnization/userManager/adminManager/js/adminManager.js"></script>			
	</head>
	<body class="unieap">
	
		<div dojoType="unieap.layout.TitlePane" title="安全管理员详细信息" width="100%" height="600px">
				
 			<div id="adminUserGrid" jsId="adminUserGrid" dojoType="unieap.grid.Grid" width="auto" height="100%" binding="{store:'adminUserDS'}" views="{rowNumber:true,rowBar:true,orderType:'client'}" selection="{selectType:'m'}">
				<header>
					<cell label="名称" name="fullName"  width="25%"></cell>
					<cell label="帐号" name="account" width="25%"  ></cell>
					<cell label="描述" name="description" width="50%" ></cell>
	 			</header>
				<toolbar>
	  				<input dojoType="unieap.form.Button" label="增加" id="add" jsId="add" onClick="addAdminUser()" style="width:50px;margin-right:5px"/>
					<input dojoType="unieap.form.Button" label="修改" id="modify" jsId="modify" onClick="modifyAdminUser()" style="width:50px;margin-right:5px"/>
					<input dojoType="unieap.form.Button" label="删除" id="delete" jsId="delete" onClick="deleteAdminUser()" style="width:50px;margin-right:5px"/>
				</toolbar>
			</div>

		</div>
		

	</body>
</html>