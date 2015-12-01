<%--
/***************************************************************
* 程序名: Detail.jsp
* 日期  : 2008-6-26
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
<%@ page import="com.neusoft.om.dao.empiplimit.EmpIpLimitVO"%>

<%
	String path = request.getContextPath();
	EmpIpLimitVO empIpLimitVO = (EmpIpLimitVO)request.getAttribute("empIpLimitVO");
	if(empIpLimitVO == null){
		empIpLimitVO = new EmpIpLimitVO();
	}
	String oper = (String) request.getAttribute("oper");
	String priStartAdd = (String) request.getAttribute("priStartAdd");
	String priEndAdd = (String) request.getAttribute("priEndAdd");
	
	int forceFlag = empIpLimitVO.getForceFlag();
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

		<script language="javascript">
		/*
		 *页面初始化方法
		 */
		function init()
		{		
			var priStartAdd = document.getElementById("priStartAdd").value;
			var forceFlag = document.getElementById("forceFlagHidden").value;
			if(priStartAdd != null && priStartAdd != "" && priStartAdd!= "null"){
				document.getElementById("forceFlag").value = forceFlag
			}
			var areaName = document.getElementById("areaName").value;
			if(areaName == "null"){
				document.getElementById("areaName").value = "";
			}
			var workNo = document.getElementById("workNo").value;
			if(workNo == "null"){
				document.getElementById("workNo").value = "";
			}
			var oper = document.getElementById("oper").value;
			if(oper == "modify"){
				document.getElementById("workNo").readOnly="true";
			}
		}
		/*
		 *保存
		 */
		function bSaveClick(webpath){
			var ipStartAdd = document.getElementById("ipStartAdd").value;
			var ipEndAdd = document.getElementById("ipEndAdd").value;
			if(ipStartAdd == null || ipStartAdd == "" || ipStartAdd == "null"){
				alert("ip起始地址不能为空");
				document.getElementById("ipStartAdd").focus();
				return;
			}
			if(ipEndAdd == null || ipEndAdd =="" || ipEndAdd== "null"){
				alert("ip终止地址不能为空");
				document.getElementById("ipEndAdd").focus();
				return;
			}
			var areaId = document.getElementById("areaId").value;
			
			if(areaId == null || areaId == "" || areaId == "null"){
				alert("请选择所属区域");
				return;
			}
			var oper = document.getElementById("oper").value;
			if(checkStartIp() == 0){
				alert("请输入合法的ip地址");
				document.getElementById("ipStartAdd").focus();
				return;
			}			
			if(checkEndIp() == 0){
				alert("请输入合法的ip地址");
				document.getElementById("ipEndAdd").focus();
				return;
			}					

			EAPForm.action = webpath+ '/om/empIpLimitAction.do?method=doModify&oper='+oper;
		    EAPForm.target='list';
		    EAPForm.submit();
		    window.close();
		}
		function checkStartIp() 
		{ 
			obj=document.getElementById("ipStartAdd").value 
			var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/; 
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
		function checkEndIp() 
		{ 
			obj=document.getElementById("ipEndAdd").value 
			var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/; 
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
								<td class="tableTitle2">员工登录ip信息</td>
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
									登录账号&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%" >
									<input type="text" id="workNo" name="workNo" value="<%=empIpLimitVO.getWorkNo() %>"/>									
	                       		</td>
								<td align="left" class="formLabel" style="width:20%">
									所属地域&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%" >
								<input type="text" id="areaName" name="areaName" value="<%=empIpLimitVO.getAreaName() %>" readonly="true" /> 
								<input type="hidden" id="areaId" name="areaId" value="<%=empIpLimitVO.getAreaId() %>" />
            					<unieap:innertree requestid="areaTree" id="areaTree" display="true" buttonCssClass="searchImgButton" 
            						valueBackInput="areaId" textBackInput="areaName" multiSelect="false"  treeImagePath="<%=path%>"/>
           						</td>								
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									ip起始地址&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input  tcname="Text" id="ipStartAdd" name="ipStartAdd" prompt="ip起始地址" 
										maxlength="15" isnullable="false" classname="textType" value="<%=empIpLimitVO.getIpStartAdd()%>"/>
									<input type="hidden" isnullable="false" id="priStartAdd" name="priStartAdd" value="<%=empIpLimitVO.getIpStartAdd()%>"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									ip终止地址<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input  tcname="Text" id="ipEndADD" name="ipEndAdd" prompt="ip终止地址" 
										maxlength="15" classname="textType" value="<%=empIpLimitVO.getIpEndAdd()%>" />
									<input type="hidden" isnullable="false" id="priEndAdd" name="priEndAdd" value="<%=empIpLimitVO.getIpEndAdd()%>"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									系统限制标记&#160;<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%" >									 
									<select name="forceFlag" id="forceFlag" >		
									<option value="1">是</option>
									<option value="0">否</option>	
									</select>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									备注&#160;<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%" >
									<unieap:input  tcname="Text" id="detailDesc" name="detailDesc" prompt="备注" 
										maxlength="32" classname="textType" value="<%=empIpLimitVO.getDetailDesc()%>"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									更新时间&#160;<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%" >
									 <unieap:input  tcname="Text" id="updateDate" name="updateDate" prompt="更新时间" 
										maxlength="32" classname="textType" value="<%=empIpLimitVO.getUpdateDate()%>" readonly="true"/>									 
								</td>
								<td align="left" class="formLabel" style="width:20%">
									更新操作员&#160;<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%" >
									<unieap:input  tcname="Text" id="updateEmp" name="updateEmp" prompt="更新操作员" 
										maxlength="32" classname="textType" value="<%=empIpLimitVO.getUpdaetEmployeeName()%>" readonly="true"/>
								</td>
							</tr>
						</table>
					</td>
					<td class="formTableR">&#160;</td>
				</tr>
			</table>
			<input type="hidden" name="path" value="<%=path%>" />
			<input type="hidden" name="oper" value="<%=oper%>" />
			<input type="hidden" name="priStartAdd" value="<%=priStartAdd %>" />
			<input type="hidden" name="priEndAdd" value="<%=priEndAdd %>" />
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
