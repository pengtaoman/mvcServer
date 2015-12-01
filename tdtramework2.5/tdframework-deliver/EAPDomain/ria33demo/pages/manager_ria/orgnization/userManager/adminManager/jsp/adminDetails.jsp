<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="org.w3c.dom.Element"%>
<%@ page import="com.neusoft.unieap.ria_manager.orgnization.util.ExtendInfoUtil"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>

 <% 
 	//是否包含扩展属性

    boolean hasExtendInfo = ExtendInfoUtil.hasExtInfo("user");

    
 	String url1 = appPath+"/pages/orgnization/userManager/adminManager/jsp/baseInfo.jsp";
 	String url2 = path+"/ria_org_user.do?method=getExtendInfoPage";
 	
 %> 

<html >
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>管理员管理</title>
					
		<script>
			dojo.require("unieap.form.InlineEditBox");
			dojo.require("unieap.dialog.MessageBox");
		    var hasExtendInfo = "<%=hasExtendInfo%>";
	
			//function initBaseInfoIframe(){
		    //	unieap.byId("baseInfo").setHref("<%=url1%>");
			//}
			
			//function initExtendInfoIframe(){
		    //	unieap.byId("extendInfo").setHref("<%=url2%>");
		    //}		    
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/manager_ria/orgnization/userManager/adminManager/js/adminDetails.js"></script>
	</head>
	
	<%
		System.out.println(request.getAttribute("extendInfoForm"));
	%>
	<body class="unieap">
	
		<div dojoType="unieap.layout.TabContainer" jsId="tab" style="width: 98%;height:320px;background-color:#f9f9f9;" tabPosition="top">  						   
			<div dojoType="unieap.layout.ContentPane" title="基本属性" jsId="baseInfo" id="baseInfo" >
			
				<form jsId="userInfoForm" id="userInfoForm" dojoType="unieap.form.Form" binding="{store:'baseInfoDS'}">
					<table CELLSPACING="10px">								
						<tr>
							<td width="70px">管理员名称:</td>
							<td>
								<input id="fullName" jsId="fullName" binding="{name:'fullName'}" dojoType="unieap.form.TextBox" required="true" invalidMessage="管理员名称必填"/>
							</td>
						</tr>
						
						<tr>
							<td width="70px">管理员密码:</td>
							<td width="200px">
								<input id="adminPass" jsId="adminPass" binding="{name:'adminPass'}" dojoType="unieap.form.TextBox" password="true" required="true" invalidMessage="管理员密码必填"/>
							</td>
						</tr>
						
						<tr>
							<td></td>
							<td width="200px">
								<!-- <td class="label_field" width="70px">&nbsp;&nbsp;&nbsp;&nbsp;</td> -->
								<input id="passwordStrong" jsId="passwordStrong" dojoType="unieap.form.InlineEditBox" disabled="true" showUnderLine="false"/>
							</td>
							
						</tr>
						
						<tr>
							<td width="70px">管理员帐号:</td>
							<td width="200px">
								<input id="account" jsId="account" binding="{name:'account'}" dojoType="unieap.form.TextBox" required="true" invalidMessage="管理员密码帐号"/>
							</td>
						</tr>
						
						<tr>
							<td width="70px">描述信息:</td>
							<td width="200px">
								<input id="description" jsId="description" binding="{name:'description'}" dojoType="unieap.form.TextBox" />
							</td>
						</tr>
				 		
						<tr>
							<td class="label_field" width="70px">管理角色:</td>
							<td class="label_field">
								<div id="adminRoleID" jsId="adminRoleList" binding="{name:'adminRoleID'}" dojoType="unieap.form.ComboBox" decoder="{displayAttr:'label',valueAttr:'id'}" dataProvider="{store:'adminRoles'}" dropWidth="200"></div>
							</td>
						</tr>
			
					</table>
				</form>	
			
			
			
			
			
			</div>
			<%
			if(hasExtendInfo){
			%>
		    <div dojoType="unieap.layout.ContentPane" title="扩展属性" jsId="extendInfo" id="extendInfo">
		    
		    <%=request.getAttribute("extendInfoForm")%>
		    
		    </div>
		    <%}%>
		</div>
		 
		<br> 
        <table width=100%>
        	<tr align="right">
        	  <td >
        	  	<input dojoType="unieap.form.Button" label="提交" id="submitInfo" jsId="submitInfo" onClick="submit_AdminInfo()" style="width:50px;margin-right:5px"/>
		  		<input dojoType="unieap.form.Button" label="关闭" id="closeDialog" jsId="closeDialog" onClick="close_Dialog()" style="width:50px;margin-right:5px"/>        	  
        	  </td>
        	</tr>
        </table>
	</body>
</html>