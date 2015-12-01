<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<%
	String path = request.getContextPath();
	List paramRoleList = (List) request.getAttribute("ParamRoleColl");
	
	String flag = (String) request.getAttribute("OperFlag");
	String message = (String) request.getAttribute("OperMessage");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>ParamRolelist.jsp</title>   
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
    
<link href="<%=path%>/common/css/td_style.css"    rel=stylesheet></link>
<link href="<%=path%>/common/css/td_style_ec.css" rel=stylesheet></link>
<script  language=javascript src="<%=path%>/common/js/eccn.js"></script>
<script language="JavaScript">
    <!--
    	/**
    	 * 页面初始化
    	 */
    	var eccn=new ECCN("ec");
    	function load()
    	{
    		eccn.doPrep=false;
			eccn.doPrepPrev=false;
			eccn.init();
			var path = document.getElementById("path").value;
    		parent.ParamRoleAdjust.location.href= path + '/blank.html';
    		var flag = myform.flag.value;
    		var message = myform.message.value;
    		//if (flag == '1' || flag == '0')
    		//{
    		if(message != null && message != 'null'){
    			parent.RoleManage.load();
    			alert(message);
    			}
    		//}

    	}
    	
    	/**
    	 * 选择Radio动作
    	 */
    	function radioOnclick(ifCreater, roleId, roleName)
    	{
    		parent.RoleManage.makeMyForm();
    		var EAPForm = parent.RoleManage.EAPForm;
    		if(ifCreater == "0")
	        {
	           EAPForm.bView.disabled=false;
	           EAPForm.bModify.disabled=true;
	           EAPForm.bDelete.disabled=true;
	           EAPForm.bGrant.disabled=true;
	        }
	        else
	        {
	           EAPForm.bModify.disabled=false;
	           EAPForm.bDelete.disabled=false;
	           EAPForm.bGrant.disabled=false;
	           EAPForm.bView.disabled=false;
	        }
	        myform.roleId.value = roleId;
	        myform.roleName.value = roleName;
	        myform.ifCreater.value = ifCreater;
    	}
    	
   // begin add by jialixin
   /**
    *单击一行时候选中单选按钮
    */
   function doOnClickEvent(ifCreater, roleId, roleName){
   		var cb =document.getElementById("radio_" + roleId);
		cb.checked = "checked";
		radioOnclick(ifCreater, roleId, roleName);
   }
   //  end add by jialixin
    	
    -->
    </script>
  </head>
  
  <body onLoad="load();">
  	<form id="myform" name="myform" action="" method="">
  		<input type="hidden" name="OperType" />
  		<input type="hidden" name="roleId" />
  		<input type="hidden" name="roleName" />
  		<input type="hidden" name="queryName" />
  		<input type="hidden" name="ifCreater" />
  		<input type="hidden" name="view" />
  		<input type="hidden" id="flag" name="flag" value="<%=flag%>" />
  		<input type="hidden" id="message" name="message" value="<%=message%>" />
  	</form>
  <table width="100%" height="105" border="0" cellpadding="2" cellspacing="0">
    <tr>
    	<td width="100%">
  	<%
  		if (paramRoleList.size() > 0) {
  	%>
	<ec:table items="ParamRoleColl" rowsDisplayed="-1" var="role" paginationLocation="false">
		<ec:row onclick="doOnClickEvent('${role.ifCreater}','${role.roleId}','${role.roleName}');">
		    <ec:column property="recordId" title=" " width="15px" style="text-align:center">
	        	<input type="radio" class="radio" name="radio" id="radio_${role.roleId}"  onclick="radioOnclick('${role.ifCreater}','${role.roleId}','${role.roleName}')" />
	        </ec:column>
			<ec:column property="roleName" title="角色名称"/>
			<ec:column property="ifCreater" title="创建" style="text-align:center">
				<c:if test="${role.ifCreater == 0}">
					<input type="checkbox" class="checkbox" disabled="disabled" id="u_${role.roleId}" name="uf_${role.roleId}" value="1" onClick="usebleFlagChangeStat('${role.roleId}')" />
				</c:if>
				<c:if test="${role.ifCreater == 1}">
					<input type="checkbox" class="checkbox" disabled="disabled" id="u_${role.roleId}" name="uf_${role.roleId}" value="1" onClick="usebleFlagChangeStat('${role.roleId}')" checked="checked" />
				</c:if>
			</ec:column>
			<ec:column property="usableFlag" title="使用" style="text-align:center">
				<c:if test="${role.usableFlag == 0}">
					<input type="checkbox" class="checkbox" disabled="disabled" id="u_${role.roleId}" name="uf_${role.roleId}" value="1" onClick="usebleFlagChangeStat('${role.roleId}')" />
				</c:if>
				<c:if test="${role.usableFlag == 1}">
					<input type="checkbox" class="checkbox" disabled="disabled" id="u_${role.roleId}" name="uf_${role.roleId}" value="1" onClick="usebleFlagChangeStat('${role.roleId}')" checked="checked" />
				</c:if>
			</ec:column>
			<ec:column property="adminFlag" title="管理" style="text-align:center">
				<c:if test="${role.adminFlag == 0}">
					<input type="checkbox" class="checkbox" disabled="disabled" id="a_${role.roleId}" name="af_${role.roleId}" value="1" onClick="adminFlagChangeStat('${role.roleId}')" />
				</c:if>
				<c:if test="${role.adminFlag == 1}">
					<input type="checkbox" class="checkbox" disabled="disabled" id="a_${role.roleId}" name="af_${role.roleId}" value="1" onClick="adminFlagChangeStat('${role.roleId}')" checked="checked" />
				</c:if>
			</ec:column>
	   </ec:row>
	</ec:table>
	<%
		}
		else {
	%>
		<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
			<tr class="tableTitleTR2">
				<td colspan="4" >
				<table width="100%" border="0" cellpadding="0" cellspacing="0" >
		            <tr>
					<td class="tableTitleLeft2" >&#160;</td>
					<td class="tableTitle2">角色信息&#160;</td>
					<td class="tableTitleRight2" >&#160;</td>
					</tr>
				 </table>
				 </td>
			</tr>
		    <tr> 
		       <td class="formTableL" >&#160;</td>
		       <td class="formTableC" align="center">
					<span style="font-size:20px;color:red;">无符合条件的角色信息</span>
			   </td>
		       <td class="formTableR" >&#160;</td>
		    </tr> 
			<tr> 
			    <td class="formTableLB">&#160;</td>
			    <td class="formTableB">&#160;</td>
			    <td class="formTableRB">&#160;</td>
			</tr>        
		</table>		
	<%
		}
	%>
	</td>
    </tr>
  </table>
  <input type='hidden' name='path' value=<%=path%> />
  </body>
</html>
