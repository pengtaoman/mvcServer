<%-- 
/***************************************************************
* 程序名: Detail.jsp
* 日期  : 2008-7-9
* 作者  : zhaof@neusoft.com
* 模块  : 
* 描述  : 
* 备注  : 
* ------------------------------------------------------------
* 修改历史
* 序号  日期  修改人   修改原因
* 1
* 2
***************************************************************/
--%>
<%@ page language="java"  pageEncoding="GB2312"%>
<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ page import="com.neusoft.om.dao.emplogintime.EmpLoginTimeVO"%>

<%
	String path = request.getContextPath();
	EmpLoginTimeVO empLoginTimeVO = (EmpLoginTimeVO)request.getAttribute("empLoginTimeVO");
	if(empLoginTimeVO == null){
		empLoginTimeVO = new EmpLoginTimeVO();
	}
	String oper = (String) request.getAttribute("oper");
	String priWorkNo = empLoginTimeVO.getWorkNo();
	String priLogId = empLoginTimeVO.getLogId();
	int forceFlag = empLoginTimeVO.getForceFlag();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>登录ip信息</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		
		<link href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">
		
		<script  language=javascript src="<%=path%>/unieap/js/Globals.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/Common.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/BaseObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/EAPObjsMgr.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/TextObj.js"> </script>
		<script language="javascript" src="<%=path%>/common/js/titlebar.js"> </script>
		<script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=path%>/views/common/js/nas_check_no_null.js"></script>
		
		<script language="javascript" src="<%=path%>/common/js/td_date.js"></script>
		<script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=path%>/views/common/js/nas_check_no_null.js"></script>
		<script language="javascript">
		/*
		 *页面初始化方法
		 */
		function init()
		{		
			DateUtil.addDateArea("startDate","startDateButton",false);
			DateUtil.addDateArea("endDate","endDateButton",false);
			var priLogId = document.getElementById("priLogId").value;
			var forceFlag = document.getElementById("forceFlagHidden").value;
			if(priLogId != null && priLogId != "" && priLogId!= "null"){
				document.getElementById("forceFlag").value = forceFlag
			}
			var workNo = document.getElementById("workNo").value;
			if(workNo == "null"){
				document.getElementById("workNo").value = "";
			}			
			var logId = document.getElementById("logId").value;
			if(logId == "null"){
				document.getElementById("logId").value = "";
			}	
			var startDate = document.getElementById("startDate").value;
			if(startDate =="null"){
				 document.getElementById("startDate").value = "";
			}
			var endDate =  document.getElementById("endDate").value;
			if(endDate == "null"){
				 document.getElementById("endDate").value = "";
			}
		}
		/*
		 *保存
		 */
		function bSaveClick(webpath){
			var logId = document.getElementById("logId").value;
			var workNo = document.getElementById("workNo").value;
			if(logId == null || logId == "" || logId == "null"){
				alert("标识不能为空");
				document.getElementById("logId").focus();
				return;
			}
			if(workNo == null || workNo =="" || workNo== "null"){
				alert("员工工号不能为空");
				document.getElementById("workNo").focus();
				return;
			}
			var oper = document.getElementById("oper").value;
			EAPForm.action = webpath+ '/om/empLoginTimeAction.do?method=doModify&oper='+oper;
		    EAPForm.target='list';
		    EAPForm.submit();
		    window.close();
		}

		/*
		 *关闭方法
		 */
		function bBackClick(webpath)
		{
			if (!confirm('您确定关闭么？')) 
				return false;
			window.close();
		}
		/*
		 *重置方法
		 */
		function bResetClick(webpath)
		{
			if (!confirm('您确定要重置么？')) 
				return false;
			EAPForm.reset();
		}		
		function checkStartTime(){			
			var startTime = document.getElementById("startTime").value;
			if(startTime!= null && startTime!="" && !checkTime(startTime)){
				alert("请输入合法的开始时间,如 13:30");
				document.getElementById("startTime").focus();
			}			
		}
		function checkEndTime(){
			var endTime = document.getElementById("endTime").value;
			if(endTime!=null && endTime != "" && !checkTime(endTime)){
				alert("请输入合法的开始时间,如 13:30");
				document.getElementById("endTime").focus();
			}
		}
		function checkTime(obj) 
		{ 
			var exp=/^(\d{1}|0\d|1\d|2[0-3])\:(\d{1}|0\d|1\d|2\d|3\d|4\d|5\d)$/; 
			var reg = obj.match(exp); 
			if(reg==null) 
			{ 
				return 0;//不合法
			} 
			else 
			{ 
				return 1; //合法
			} 
		} 
		</script>
	</head>
	<body class="mainBody" onload="init()">
		<unieap:form action="" method="post">
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
				<tr class="tableTitleTR2">
					<td colspan="4">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">&#160;</td>
								<td class="tableTitle2">员工登录时间信息</td>
								<td class="tableTitleRight2">&#160;</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td class="formTableC">
						<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
							<tr>
							<td align="left" class="formLabel" style="width:20%">
									标识&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%" >
									<input type="text" id="logId" name="logId" value="<%=empLoginTimeVO.getLogId() %>"/>	
									<input type="hidden" id="priLogId" name="priLogId" value="<%=empLoginTimeVO.getLogId() %>"/>									
	                       		</td>	
								<td align="left" class="formLabel" style="width:20%">
									登录账号&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%" >
									<input type="text" id="workNo" name="workNo" value="<%=empLoginTimeVO.getWorkNo() %>"/>									
									<input type="hidden" id="priWorkNo" name="priWorkNo" value="<%=empLoginTimeVO.getWorkNo() %>"/>	
	                       		</td>														
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									开始日期&#160;<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" name="startDate" id="startDate" value="<%=empLoginTimeVO.getStartDate()%>" />
									<button class="calendarImgButton" id="startDateButton" ></button>	
								</td>
								<td align="left" class="formLabel" style="width:20%">
									开始时间<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input  tcname="Text" id="startTime" name="startTime" prompt="开始时间" 
										maxlength="15" classname="textType" value="<%=empLoginTimeVO.getStartTime()%>" onblur="checkStartTime()" />
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									结束日期&#160;<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" name="endDate" id="endDate" value="<%=empLoginTimeVO.getEndDate()%>"/>
									<button class="calendarImgButton" id="endDateButton" ></button>	
								</td>
								<td align="left" class="formLabel" style="width:20%">
									结束时间<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input  tcname="Text" id="endTime" name="endTime" prompt="结束时间" 
										maxlength="15" classname="textType" value="<%=empLoginTimeVO.getEndTime()%>" onblur="checkEndTime()" />
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									限制类型&#160;<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%" >									 
									<select name="forceFlag" id="forceFlag" >		
									<option value="1">允许登录</option>
									<option value="0">不允许登录</option>	
									</select>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									备注&#160;<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%" >
									<unieap:input  tcname="Text" id="detailDesc" name="detailDesc" prompt="备注" 
										maxlength="32" classname="textType" value="<%=empLoginTimeVO.getDetailDesc()%>"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									更新时间&#160;<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%" >
									 <unieap:input  tcname="Text" id="updateDate" name="updateDate" prompt="更新时间" 
										maxlength="32" classname="textType" value="<%=empLoginTimeVO.getUpdateDate()%>" readonly="true"/>									 
								</td>
								<td align="left" class="formLabel" style="width:20%">
									更新操作员&#160;<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%" >
									<unieap:input  tcname="Text" id="updateEmp" name="updateEmp" prompt="更新操作员" 
										maxlength="32" classname="textType" value="<%=empLoginTimeVO.getUpdaetEmployeeName()%>" readonly="true"/>
								</td>
							</tr>
							<tr>								
								<td align="left" class="formLabel" style="width:20%">
									更新部门&#160;<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%" >
									<unieap:input  tcname="Text" id="updOrganName" name="updOrganName" prompt="更新部门" 
										maxlength="32" classname="textType" value="<%=empLoginTimeVO.getUpdOrganName()%>" readonly="true"/>
								</td>
							</tr>
						</table>
					</td>
					<td class="formTableR">&#160;</td>
				</tr>
			</table>
			<input type="hidden" name="path" value="<%=path%>" />
			<input type="hidden" name="oper" value="<%=oper%>" />
			<input type="hidden" name="priWorkNo" value="<%=priWorkNo %>" />
			<input type="hidden" name="priLogId" value="<%=priLogId %>" />
			<input type="hidden" name="forceFlagHidden" value="<%=forceFlag %>" />
			<div class="formButtonDIV" id="formButton">
				<button class="formButton" id="bSave" name="bSave" onclick="return bSaveClick('<%=path%>');">
					保&#160;&#160;存
				</button>
				<button class="formButton" id="bReset" name="bReset" onclick="return bResetClick();">
					重&#160;&#160;置
				</button>
				<button class="formButton" id="bBack" name="bBack" onclick="return bBackClick('<%=path%>');">
					关&#160;&#160;闭
				</button>
			</div>
		</unieap:form>
	</body>
</html>
