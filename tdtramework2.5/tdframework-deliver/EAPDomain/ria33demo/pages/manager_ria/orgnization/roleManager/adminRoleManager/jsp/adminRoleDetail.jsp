<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>


<html >
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>管理员管理</title>
		<style>
		.unieap .unitNode{
			background-image: url('../../../images/unit.gif');
			width : 16px;
		}
		
		.unieap .dimensionNode{
			background-image: url('../../../images/dimension.gif');
			width : 16px;
		}
		</style>
					
		<script>
			dojo.require("unieap.dialog.MessageBox");	  
			

			  
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/manager_ria/orgnization/roleManager/adminRoleManager/js/adminRoleDetail.js"></script>
	</head>
	
	<body class="unieap">
	
	     <form jsId="adminRoleInfoForm" id="adminRoleInfoForm" dojoType="unieap.form.Form" style="width:98%">
	<br />
	     <div dojoType="unieap.form.FieldSet" title="查询条件" >
	     	
			<table cellspacing="10px">								
				<tr>
					<td width="70px">名称:</td>
					<td>
						<input jsId="roleName" name="roleName" binding="{name:'roleName'}"  dojoType="unieap.form.TextBox" required="true"/>
					</td>
				</tr>
				
				<tr>
					<td width="70px">描述:</td>
					<td>
						<input jsId="description" name="description" binding="{name:'description'}" dojoType="unieap.form.TextBox"/>
					</td>
				</tr>
				
				<tr>
					<td class="label_field" width="70px">包含人员:</td>
					<td class="label_field">
						<input jsId="containPsns" name="containPsns" id="containPsns" binding="{name:'containPsns'}" dojoType="unieap.form.ComboBox"  decoder="{displayAttr:'account',valueAttr:'id'}" dataProvider="{store:'usersDS'}"  popup="{displayStyle:'multi',height:'200px',width:'200px'}"/>
					</td>
				</tr>
				
				<tr>
				<td width="70px">组织单元:</td>
				<td>
					<div dojoType="unieap.form.ComboBoxTree" 
					     jsId="managedUnitIDs" 
					     name="managedUnitIDs"
						 readOnly="true"
						 expandTree="false"
					     binding="{name:'managedUnitIDs'}"
    					 dataProvider="{label:'managedUnitNames'}"    
    					 treeJson="{label:'可管理的组织单元选择树',
    							 	animate:'false',
    							 	checkLogic:{model:'multiple'},
									getIconClass:selfDefineIconClass,
    							    loader:{url:unieap.WEB_APP_NAME+'/ria_org_adminrole.do?method=getManagedUnits','getPostData':getPostData},   
    								binding:{store:'managedUnitsDS',
    								         label:'label',
    								         parent:'parentID',
    								         query:{name:'parentID',relation:'=',value:''}
    							   }
    						      }">
             		</div>  
				</td>
				</tr>
				
				<tr>
					<td width="70px">业务角色:</td>
					<td>
						<input jsId="busRoles" name="busRoles" id="busRoles" binding="{name:'busRoles'}" dojoType="unieap.form.ComboBox" decoder="{displayAttr:'name',valueAttr:'id'}" dataProvider="{store:'adminedBusRolesDS'}" popup="{displayStyle:'multi',height:'200px',width:'200px'}" />
					</td>
				</tr>
				
				<tr>
					<td width="70px">动态角色:</td>
					<td>
						<input jsId="dynimicRoles" name="dynimicRoles" id="dynimicRoles" binding="{name:'dynimicRoles'}" dojoType="unieap.form.ComboBox" decoder="{displayAttr:'name',valueAttr:'id'}" dataProvider="{store:'adminedDynamicRolesDS'}" popup="{displayStyle:'multi',height:'200px',width:'200px'}"/>
					</td>
				</tr>
			</table>
			
		</div>
        	
		</form>	
       
		<br>
		<br> 
		<table width="98%">
	        	<tr align="right">
	        	  <td >
	        	  	<input dojoType="unieap.form.Button" label="提交" id="submitInfo" jsId="submitInfo" onClick="submitAdminRoleInfo()" style="width:50px;margin-right:5px"/>
			  		<input dojoType="unieap.form.Button" label="关闭" id="closeDialog" jsId="closeDialog" onClick="close_Dialog()" style="width:50px;"/>        	  
	        	  </td>
	        	</tr>
        </table>

	</body>
</html>