<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ page import="com.neusoft.unieap.service.orgnization.context.OrgnizationContext"%>
<%@ page import="com.neusoft.unieap.service.orgnization.model.User"%>
<%@ page import="com.neusoft.unieap.service.orgnization.context.OrgnizationContextHolder"%>

<%
	User user = ((OrgnizationContext) OrgnizationContextHolder.getContext()).getCurrentUser();
	String account = user.getAccount();
%>
 
<html >
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>用户密码修改</title>
		<script>
			dojo.require("unieap.form.InlineEditBox");
			dojo.require("unieap.dialog.MessageBox");
			var account="<%=account%>";
		</script>
		<script type="text/javascript" src="<%=appPath%>/pages/manager_ria/orgnization/userManager/modifyPassword/js/modifyPassword.js"></script>

			
	</head>
	<body class="unieap">
			<div dojoType="unieap.layout.TitlePane" title="功能说明" width="100%" height="50px">
				密码修改。
			</div>	
			<div dojoType="unieap.layout.TitlePane" title="密码修改" width="100%" height="250px">
			
			  <form jsId="userInfoForm" dojoType="unieap.form.Form" binding="{store:'userInfo'}">
			  <br />
				<div dojoType="unieap.form.FieldSet" title="密码信息" width="97%">
				
					<table cellspacing="10px">						
						<tr>
							<td width="55px">人员帐号:</td>
							<td width="240">
								<input jsId="userAccount" binding="{name:'userAccount'}" dojoType="unieap.form.InlineEditBox"  disabled="true" showUnderLine="false"/>
							</td>
							<td width="55px">旧密码:</td>
							<td width="240">
								<input jsId="oldPassword" binding="{name:'oldPassword'}" dojoType="unieap.form.TextBox" password="true"/>
							</td>
						</tr>
						
						<tr>
							<td width="70px">新密码:</td>
							<td width="240">
								<input jsId="newPassword" binding="{name:'newPassword'}" dojoType="unieap.form.TextBox" password="true"/>
							</td>
							
							<td width="70px">新密码确认:</td>
							<td width="240">
								<input jsId="repeatPassword" binding="{name:'repeatPassword'}" dojoType="unieap.form.TextBox" password="true"/>
							</td>
						</tr>
				   </table>
				   
				   
				</div>
				<table width="98%">
				  <tr align="right">
				    <td>
				    	<div dojoType="unieap.form.Button" label="修改" onClick="changePassword()" style="width:50px;"></div>
				    </td>
				  </tr>
				</table>
			  </form>	
			</div>
		
	</body>
</html>