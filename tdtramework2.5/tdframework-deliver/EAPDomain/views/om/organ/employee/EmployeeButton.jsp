<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap" %>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<%
String webpath = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+webpath+"/";
	ParamObjectCollection dutyColl = (ParamObjectCollection)request.getAttribute("dutyColl");
	ParamObjectCollection roleColl = (ParamObjectCollection)request.getAttribute("roleColl");
	String message = (String)request.getAttribute("message");
	//String uniAuth = (String)request.getAttribute("uniAuth");
	String ulp = (String) request.getAttribute("ulp");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>职员维护</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link   href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">
<script language="javascript" src="<%=webpath%>/common/js/td_date.js" ></script>
<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/EAPObjsMgr.js"> </script>
<script language="javascript" src="<%=webpath%>/unieap/js/BaseObj.js"> </script>		
<script language="javascript" src="<%=webpath%>/common/js/titlebar.js"> </script>
<script language="javascript" src="<%=webpath%>/views/common/js/nas_check_no_null.js"></script>
<script language="javascript" src="<%=webpath%>/views/common/js/nas_date_compare.js"></script>
<script language="javascript" src="<%=webpath%>/common/js/td_common.js" ></script>
<script language="javascript" src="<%=webpath%>/views/om/organ/employee/js/EmployeeButton.js"> </script>
<script language="javascript">
   var tempitem;
   
   function showDealerMsg(mgr){//参数都是封装好的不用自己定义
		var obj = document.getElementById('qd_mgr');
		obj.innerHTML = "职员维护 " + mgr;
	}	
</script>
</head>
  
<body onload="load();init()">
<form method="POST" name="myform">
	<input type="hidden" id="dealerId" name="dealerId" value="" />
	<input type="hidden" id="dealerId" name="dealerId" value="" />
	<input type="hidden" id="message" name="message" value="<%=message%>" />
	<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
		 <tr class="tableTitleTR2">
			<td colspan="4" >
				<table width="100%" border="0" cellpadding="0" cellspacing="0" >
		            <tr>
					<td class="tableTitleLeft2" >&#160;</td>
					<td class="tableTitle2" id="qd_mgr">职员维护</td>
					<td class="tableTitle2" align="right">
						<span id="detailOper" onclick="setParentFrameSetSize()" style="cursor:hand;display:none;" title="详细查询">[详]</span>
						<input type="hidden" id="detailFlag" name="detailFlag" value="0" />
						<span id="hideOper" onclick="setParentFrameSetSize()" style="cursor:hand;" title="隐藏查询条件">[隐藏]</span>
						<input type="hidden" id="hideFlag" name="hideFlag" value="0" />
					</td>
					<td class="tableTitleRight2" >&#160;</td>
					</tr>
				 </table>
			 </td>
		</tr>
		<tr> 
	       <td class="formTableL" >&#160;</td>
	       <td class="formTableC">		 	 			
				<table border="0" cellpadding="0" cellspacing="2" class="formTableCore" id="QueryCondition">
					<tr>
						<td class="formLabel">
							登陆帐号
						</td>
						<td class="formField">
							<input type="text" id="workNo" name="workNo" />
						</td>
						<td class="formLabel">
							职员姓名
						</td>
						<td class="formField">
							<input type="text" id="employeeName" name="employeeName" />
						</td>
					</tr>
					<tr>
						<td class="formLabel">
							职员编号
						</td>
						<td class="formField">
							<input type="text" id="employeeId" name="employeeId" />
						</td>
						<td class="formLabel">
							状态
						</td>
						<td class="formField">
							<select id="status" name="status">
								<option value="">不区分</option>
								<option value="0">正常</option>
								<option value="1">停用</option>
							</select>
						</td>						
						<td class="formLabel" style="display:none">
							职务
						</td>
						<td class="formField" style="display:none">
							<td:SelectTag selectFlag="true" selectColl="<%=dutyColl%>" selectvalue="" tagName="dutyId" title="职位" onchange=""/>
						</td>
					</tr>
					<tr style="display:none">
						<td class="formLabel">
							操作员类型
						</td>
						<td class="formField">
							<select id="adminType" name="adminType">
								<option value="">不区分</option>
								<option value="0">普通操作员</option>
								<option value="1">特权管理员</option>
								<option value="2">普通管理员</option>
							</select>
						</td>
						<td class="formLabel">
							状态
						</td>
						<td class="formField">
							<select id="status" name="status">
								<option value="">不区分</option>
								<option value="0">正常</option>
								<option value="1">停用</option>
							</select>
						</td>
					</tr>
					<tr style="display:none">
						<td class="formLabel">
							角色
						</td>
						<td class="formField" colspan="3">
							<td:SelectTag selectFlag="true" fixlength="200" selectColl="<%=roleColl%>" selectvalue="" tagName="roleId" title="角色" onchange=""/>
							<input type="radio" name="flagTypeShow" class="radio" value="adminFlag" checked="checked" onclick="setFlagType(this.value)" />管理角色
							<input type="radio" name="flagTypeShow" class="radio" value="usableFlag" onclick="setFlagType(this.value)" />使用角色
							<input type="hidden" id="flagType" name="flagType" value="adminFlag" />
						</td>
					</tr>
					<tr style="display:none">
						<td class="formLabel">
							密码修改时间
						</td>
						<td class="formField" colspan="3">
							<input type="text" id="pwdUpdateDateBegin" name="pwdUpdateDateBegin" />
							<button class="calendarImgButton" id="chooseDate1"></button>
							&nbsp;&nbsp;至&nbsp;&nbsp;
							<input type="text" id="pwdUpdateDateEnd" name="pwdUpdateDateEnd" />
							<button class="calendarImgButton" id="chooseDate2"></button>
						</td>
					</tr>
				</table>
		   </td>
	       <td class="formTableR" >&#160;</td>
	    </tr> 
	    <tr> 
		   <td class="formTableLB">&#160;</td>
		   <td class="formTableB">&#160;</td>
		   <td class="formTableRB">&#160;</td>
	    </tr>
	 </table>
	 <div class="formButtonDIV" id="filebutton1" style="display:block"> 
	 	<button class="formButton" name="bSearch" onclick="doSearch('<%=webpath%>')">查 询</button>
	 	<button class="formButton" name="bAdd" onclick="doAdd('<%=webpath%>')" disabled="disabled">增 加</button>
		<button class="formButton" name="bModify" onclick="doModify('<%=webpath%>')">修 改</button>
		<button class="formButton" name="bDelete" onclick="doDelete('<%=webpath%>')">删 除</button>
		<button class="formButton" name="bRenewPassword" onclick="doRenewPwd('<%=webpath%>')">密码重置</button>
		<button class="formButton" name="bShowPermission" onclick="showDuty('<%=webpath%>','false')">查看权限</button>	
	 </div>
	 <div class="formButtonDIV" id="filebutton2" style="display:block"> 
	 	<button class="formButton" name="bGrant" onclick="makeDuty('<%=webpath%>')">功能赋权</button>
		<button class="formButton" name="bGrantParamDuty" onclick="makeParamDuty('<%=webpath%>')">数据赋权</button>
	 	<button class="formButton" name="bInching" onclick="showDuty('<%=webpath%>','true')">功能权限微调</button>
		<button class="formButton" id="dataPowerAdjust" name="dataPowerAdjust" onclick="dataPowerAdjust3('<%=webpath%>');" disabled="disabled">数据权限微调</button>
		<button class="formButton" name="bDeliverPower" onclick="deliverPower('<%=webpath%>')">转交管理权</button>
		<button class="formButton" name="bCancelInching" onclick="cancelInching('<%=webpath%>')">取消微调</button>
		<input type='hidden' id="ifShowTree" name="ifShowTree" value=""/>
		<input type="hidden" id="ulp" name="ulp" value="<%=ulp %>" />
	 </div>
</form>
</body>
</html>
