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
<%@ page import="com.neusoft.om.dao.invpn.IpsInvpnVO"%>
<%
	String path = request.getContextPath();
	IpsInvpnVO ipsInvpnVO = (IpsInvpnVO)request.getAttribute("invpnVO");
	if(ipsInvpnVO == null){
		ipsInvpnVO = new IpsInvpnVO();
	}
	String oper = (String) request.getAttribute("oper");
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>受限网段信息</title>
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
			var address = document.getElementById("ipSegmentAddress");
			address.title="需以*结尾，如192.168.212.*";
		}
		/*
		 *保存
		 */
		function bSaveClick(webpath){	
			var address = document.getElementById("ipSegmentAddress").value;
			var id = document.getElementById("ipSegmentId").value;
			if(address == null || address == "" || address == "null"){
				alert("网段不能为空");
				document.getElementById("ipSegmentAddress").focus();
				return;
			}
			if(id == null || id =="" || id== "null"){
				alert("标识不能为空");
				document.getElementById("ipSegmentId").focus();
				return;
			}
			var oper = document.getElementById("oper").value;
			if(checkSegment() == 0){
				alert("请输入合法的网段");
				document.getElementById("ipSegmentAddress").focus();
				return;
			}					
			EAPForm.action = webpath+ '/om/ipsInvpnAction.do?method=doModify&oper='+oper;
		    EAPForm.target='list';
		    //document.getElementById("ipSegmentAddress").value = transfer(document.getElementById("ipSegmentAddress").value);
		    EAPForm.submit();
		    window.close();
		}
		function checkSegment() 
		{ 
			obj=document.getElementById("ipSegmentAddress").value 
			var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\*)$/; 
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
			if (!confirm('您确定关闭吗？')) 
				return false;
			window.close();
		}
		/*
		 *重置方法
		 */
		function bResetClick(webpath)
		{
			if (!confirm('您确定要重置吗？')) 
				return false;
			EAPForm.reset();
		}		
		
			function transfer(ipadd) {
				var returnIpAdd = '';
				var num = ipadd.split('.');
				for (var i = 0; i < num.length; i++) {
					if (num[i] == '*') {
						returnIpAdd += '*';
						continue;
					}
					var n = 3 - num[i].length;
					for (var j = 0; j < n; j++) {
						returnIpAdd += '0';
					}
					returnIpAdd += num[i];
					if (i + 1 < num.length) {
						returnIpAdd += '.';
					}
				}
				return returnIpAdd;
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
									网段标识&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input  tcname="Text" id="ipSegmentId" name="ipSegmentId" prompt="网段标识" 
										maxlength="32" isnullable="false" classname="textType" value="<%=ipsInvpnVO.getIpSegmentId()%>"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									网段地址<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input  tcname="Text" id="ipSegmentAddress" name="ipSegmentAddress" prompt="网段地址" 
										maxlength="32" classname="textType" value="<%=ipsInvpnVO.getIpSegmentAddress()%>" />
									<input type="hidden" isnullable="false" id="priAddress" name="priAddress" value="<%=ipsInvpnVO.getIpSegmentAddress()%>"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									描述&#160;<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%" >
									 <unieap:input  tcname="Text" id="ipSegmentDesc" name="ipSegmentDesc" prompt="描述" 
										maxlength="32" classname="textType" value="<%=ipsInvpnVO.getIpSegmentDesc()%>"/>
									 
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
