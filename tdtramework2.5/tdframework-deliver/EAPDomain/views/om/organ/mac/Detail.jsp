<%--
/***************************************************************
* 程序名: Detail.jsp
* 日期  : 2008-3-10 
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
<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ page import="com.neusoft.om.dao.mac.MacsPermittedVO"%>
<%
	String path = request.getContextPath();
	MacsPermittedVO macsPermittedVO = (MacsPermittedVO)request.getAttribute("macPermittedVO");
	if(macsPermittedVO == null){
		macsPermittedVO = new MacsPermittedVO();
	}
	String oper = (String) request.getAttribute("oper");
	String cityName = (String) request.getAttribute("cityName");
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>MAC地址维护</title>
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
		}
		/*
		 *保存
		 */
		function bSaveClick(webpath){	
			var city = document.getElementById("city").value;
			var hallId = document.getElementById("hallId").value;
			var contactName = document.getElementById("contactName").value;
			var macAddress = document.getElementById("macAddress").value;
			var phoneNumber = document.getElementById("phoneNumber").value;

			if(contactName == null || contactName == "" || contactName == "null"){
				alert("请输入联系人信息");
				document.getElementById("contactName").focus();
				return;
			}
			if(macAddress == null || macAddress =="" || macAddress== "null"){
				alert("请输入MAC地址信息");
				document.getElementById("macAddress").focus();
				return;
			}
			if(phoneNumber == null || phoneNumber =="" || phoneNumber== "null"){
				alert("请输入电话号码");
				document.getElementById("phoneNumber").focus();
				return;
			}			
			var oper = document.getElementById("oper").value;
			if(checkSegment() == 0){
				alert("请输入合法的地址");
				document.getElementById("macAddress").focus();
				return;
			}					
			EAPForm.action = webpath+ '/om/macsPermittedAction.do?method=doModify&oper='+oper;
		    EAPForm.target='list';
		    EAPForm.submit();
		    window.close();
		}
		function checkSegment() 
		{ 
			obj=document.getElementById("macAddress").value; 			
			var exp=/^((\d|[A-F]|[a-f])(\d|[A-F]|[a-f]):(\d|[A-F]|[a-f])(\d|[A-F]|[a-f]):(\d|[A-F]|[a-f])(\d|[A-F]|[a-f]):(\d|[A-F]|[a-f])(\d|[A-F]|[a-f]):(\d|[A-F]|[a-f])(\d|[A-F]|[a-f]):(\d|[A-F]|[a-f])(\d|[A-F]|[a-f]))$/;
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
								<td class="tableTitle2">受限网段信息</td>
								<td class="tableTitleRight2">&#160;</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td class="formTableL">
						<input type="hidden" id="tableNames" name="tableNames" />
					</td>
					<td class="formTableC">
						<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									区域&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:20%">
									<unieap:input  tcname="Text" id="cityName" name="cityName" prompt="区域" readonly="true"
										maxlength="32" isnullable="true" classname="textType" value="<%=cityName%>"/>
									<input type="hidden" id="city" name="city" value="<%=macsPermittedVO.getCity()%>" />
								</td>
								<td align="left" class="formLabel" style="width:20%">
									营业厅;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input  tcname="Text" id="hallName" name="hallName" prompt="营业厅" readonly="true"
										maxlength="32" isnullable="true" classname="textType" value="<%=macsPermittedVO.getHallName()%>"/>
									<input type="hidden" id="hallId" name="hallId" value="<%=macsPermittedVO.getHallId() %>"/>									
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									联系人&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input  tcname="Text" id="contactName" name="contactName" prompt="联系人" 
										maxlength="32" isnullable="true" classname="textType" value="<%=macsPermittedVO.getContactName()%>"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									MAC地址;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input  tcname="Text" id="macAddress" name="macAddress" prompt="MAC地址" 
										maxlength="32" isnullable="true" classname="textType" value="<%=macsPermittedVO.getMacAddress()%>" onblur="checkSegment()"/>									
									<input type="hidden" id="priAddress" name="priAddress" value="<%=macsPermittedVO.getMacAddress()%>"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									电话号码&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									 <unieap:input  tcname="Text" id="phoneNumber" name="phoneNumber" prompt="电话号码" 
										maxlength="32" isnullable="true" classname="textType" value="<%=macsPermittedVO.getPhoneNumber()%>"/>
								</td>
							</tr>
						</table>
					</td>
					<td class="formTableR">&#160;</td>
				</tr>
				<tr>
					<td class="formTableLB">&#160;</td>
					<td class="formTableB">&#160;
						<input type="hidden" name="oper" value="<%=oper%>" />
						<input type="hidden" name="canDel" value="" />
					</td>
					<td class="formTableRB">&#160;</td>
				</tr>
			</table>
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
