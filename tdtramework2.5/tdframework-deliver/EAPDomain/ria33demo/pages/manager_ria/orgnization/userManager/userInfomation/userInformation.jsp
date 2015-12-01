<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
<%@ page import="java.util.Set"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="com.neusoft.unieap.service.orgnization.context.OrgnizationContext"%>
<%@ page import="com.neusoft.unieap.service.orgnization.model.User"%>
<%@ page import="com.neusoft.unieap.service.orgnization.model.BusinessOperator"%>
<%@ page import="com.neusoft.unieap.service.orgnization.model.Administrator"%>
<%@ page import="com.neusoft.unieap.service.orgnization.model.UserInUnit"%>
<%@ page import="com.neusoft.unieap.service.orgnization.model.StationedUser"%>
<%@ page import="com.neusoft.unieap.service.orgnization.context.OrgnizationContextHolder"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>

<%
	User user = ((OrgnizationContext) OrgnizationContextHolder.getContext()).getCurrentUser();
	
	String account = user.getAccount();
	String name = user.getFullName();
	String desc = user.getDescription();
	String userID = user.getId();
	
	String unit = "";
	
	Set userInUnitList = user.getUserInUnits();
	if(!userInUnitList.isEmpty()){
		Iterator iter = userInUnitList.iterator();
		int i=0;
		while(iter.hasNext()){
			if(i!=0)
				unit+=",";
			unit+=((UserInUnit) iter.next()).getUnit().getName(); 
			i++;
		}
	}
	
	String station = "";
	Set userStation = user.getStationedUsers();
	if(!userStation.isEmpty()){
		Iterator iter = userStation.iterator();
		int i=0;
		while(iter.hasNext()){
			if(i!=0)
				station+=",";
			station+=((StationedUser) iter.next()).getStation().getName();
			i++;
		}
	}
	
	String adminRole = "";
	
	Set administrativeRole = user.getAdministrators();
	if(!administrativeRole.isEmpty()){
		int i=0;
		Iterator iter = administrativeRole.iterator();
		while (iter.hasNext()) {
			Administrator adRole = (Administrator) iter.next();
			if(i!=0)
				adminRole+=",";
			adminRole+=adRole.getRole().getName();	
			i++;	
		}
	}
	
	String busRoles = "";
	Set businessRole = user.getBusinessOperators();
	if(!businessRole.isEmpty()){
		int i=0;
		Iterator iter = businessRole.iterator();
		while (iter.hasNext()) {
			BusinessOperator busRole = (BusinessOperator) iter.next();
			if(i!=0)
				busRoles+=",";
			busRoles+=busRole.getRole().getName();		
			i++;
		}
	}
		
%>

 
<html >
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		</meta>
		<title>用户信息</title>
		
		<script>
		    var webpath="<%=path%>";
		    var userID = "<%= userID %>";
			var account = "<%= account %>";
			var name = "<%= name %>";
			var desc = "<%= desc %>";
			var unit = "<%= unit %>";
			var station = "<%= station %>";
			var adminRole = "<%= adminRole %>";
			var busRoles = "<%= busRoles %>";
			
			dojo.addOnLoad(init);
			dojo.require("unieap.form.InlineEditBox");
			function init(){
				var ds = new unieap.ds.DataStore("userInfo",[
					{
						"userID":userID,
						"userAccount":account,
						"userName":name,
						"description":desc,
						"unit":unit,
						"station":station,
						"adminRole":adminRole,
						"businessRole":busRoles				
					}			
				]);
				
				dwCondition.getBinding().setDataStore(ds);
			
			}
		</script>
			
	</head>
	<body class="unieap">
	
		<div dojoType="unieap.layout.TitlePane" title="当前登陆人员信息" width="100%" height="250px">

		  <form jsId="dwCondition" dojoType="unieap.form.Form" binding="{store:'userInfo'}">
			<div dojoType="unieap.form.FieldSet" title="人员详细信息" width="50%">
			
				<table class="table_container">
					<tr>
						<td class="label_field" width="55px">人员ID:</td>
						<td class="label_field">
							<input binding="{name:'userID'}" dojoType="unieap.form.InlineEditBox" disabled="true" showUnderLine="false"/>
						</td>
					</tr>
					
					<tr>
						<td class="label_field" width="55px">人员帐号:</td>
						<td class="label_field">
							<input binding="{name:'userAccount'}" dojoType="unieap.form.InlineEditBox" disabled="true" showUnderLine="false"/>
						</td>
					</tr>
					
					<tr>
						<td class="label_field" width="55px">人员姓名:</td>
						<td class="label_field">
							<input binding="{name:'userName'}" dojoType="unieap.form.InlineEditBox" disabled="true" showUnderLine="false"/>
						</td>
					</tr>
					
					<tr>
						<td class="label_field" width="55px">描述信息:</td>
						<td class="label_field">
							<input binding="{name:'description'}" dojoType="unieap.form.InlineEditBox" disabled="true" showUnderLine="false"/>
						</td>
					</tr>
					
					<tr>
						<td class="label_field" width="55px">组织单元:</td>
						<td class="label_field">
							<input binding="{name:'unit'}" dojoType="unieap.form.InlineEditBox" disabled="true" showUnderLine="false"/>
						</td>
					</tr>
					
					<tr>
						<td class="label_field" width="55px">岗位信息:</td>
						<td class="label_field">
							<input  binding="{name:'station'}" dojoType="unieap.form.InlineEditBox" disabled="true" showUnderLine="false"/>
						</td>
					</tr>
					
					<tr>
						<td class="label_field" width="55px">管理角色:</td>
						<td class="label_field">
							<input binding="{name:'adminRole'}" dojoType="unieap.form.InlineEditBox"  disabled="true" showUnderLine="false"/>
						</td>
					</tr>
					
					<tr>
						<td class="label_field" width="55px">业务角色:</td>
						<td class="label_field">
							<input binding="{name:'businessRole'}" dojoType="unieap.form.InlineEditBox" disabled="true" showUnderLine="false"/>
						</td>
					</tr>
				</table>
			</div>
		  </form>	
		</div>

		
	</body>
</html>