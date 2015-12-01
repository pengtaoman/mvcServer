<%--
/***************************************************************
* ������: Detail.jsp
* ����  : 2008-3-10 
* ����  : zhaof@neusoft.com
* ģ��  : 
* ����  : 
* ��ע  : 
* ------------------------------------------------------------
* �޸���ʷ
* ���  ����  �޸���   �޸�ԭ��
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
		<title>����������Ϣ</title>
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
		 *ҳ���ʼ������
		 */
		function init()
		{		
			var address = document.getElementById("ipSegmentAddress");
			address.title="����*��β����192.168.212.*";
		}
		/*
		 *����
		 */
		function bSaveClick(webpath){	
			var address = document.getElementById("ipSegmentAddress").value;
			var id = document.getElementById("ipSegmentId").value;
			if(address == null || address == "" || address == "null"){
				alert("���β���Ϊ��");
				document.getElementById("ipSegmentAddress").focus();
				return;
			}
			if(id == null || id =="" || id== "null"){
				alert("��ʶ����Ϊ��");
				document.getElementById("ipSegmentId").focus();
				return;
			}
			var oper = document.getElementById("oper").value;
			if(checkSegment() == 0){
				alert("������Ϸ�������");
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
				return 0;//���Ϸ�
			} 
			else 
			{ 
				return 1; //�Ϸ�
			} 
		} 
		/*
		 *�رշ���
		 */
		function bBackClick(webpath)
		{
			if (!confirm('��ȷ���ر���')) 
				return false;
			window.close();
		}
		/*
		 *���÷���
		 */
		function bResetClick(webpath)
		{
			if (!confirm('��ȷ��Ҫ������')) 
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
								<td class="tableTitle2">����������Ϣ</td>
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
									���α�ʶ&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input  tcname="Text" id="ipSegmentId" name="ipSegmentId" prompt="���α�ʶ" 
										maxlength="32" isnullable="false" classname="textType" value="<%=ipsInvpnVO.getIpSegmentId()%>"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									���ε�ַ<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input  tcname="Text" id="ipSegmentAddress" name="ipSegmentAddress" prompt="���ε�ַ" 
										maxlength="32" classname="textType" value="<%=ipsInvpnVO.getIpSegmentAddress()%>" />
									<input type="hidden" isnullable="false" id="priAddress" name="priAddress" value="<%=ipsInvpnVO.getIpSegmentAddress()%>"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									����&#160;<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%" >
									 <unieap:input  tcname="Text" id="ipSegmentDesc" name="ipSegmentDesc" prompt="����" 
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
					��&#160;&#160;��
				</button>
				<button class="formButton" id="bReset" name="bReset" onclick="return bResetClick();">
					��&#160;&#160;��
				</button>
				<button class="formButton" id="bBack" name="bBack" onclick="return bBackClick('<%=path%>');">
					��&#160;&#160;��
				</button>
			</div>
		</unieap:form>
	</body>
</html>
