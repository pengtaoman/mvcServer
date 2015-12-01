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
		<title>MAC��ַά��</title>
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
		}
		/*
		 *����
		 */
		function bSaveClick(webpath){	
			var city = document.getElementById("city").value;
			var hallId = document.getElementById("hallId").value;
			var contactName = document.getElementById("contactName").value;
			var macAddress = document.getElementById("macAddress").value;
			var phoneNumber = document.getElementById("phoneNumber").value;

			if(contactName == null || contactName == "" || contactName == "null"){
				alert("��������ϵ����Ϣ");
				document.getElementById("contactName").focus();
				return;
			}
			if(macAddress == null || macAddress =="" || macAddress== "null"){
				alert("������MAC��ַ��Ϣ");
				document.getElementById("macAddress").focus();
				return;
			}
			if(phoneNumber == null || phoneNumber =="" || phoneNumber== "null"){
				alert("������绰����");
				document.getElementById("phoneNumber").focus();
				return;
			}			
			var oper = document.getElementById("oper").value;
			if(checkSegment() == 0){
				alert("������Ϸ��ĵ�ַ");
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
			if (!confirm('��ȷ���ر�ô��')) 
				return false;
			window.close();
		}
		/*
		 *���÷���
		 */
		function bResetClick(webpath)
		{
			if (!confirm('��ȷ��Ҫ����ô��')) 
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
									����&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:20%">
									<unieap:input  tcname="Text" id="cityName" name="cityName" prompt="����" readonly="true"
										maxlength="32" isnullable="true" classname="textType" value="<%=cityName%>"/>
									<input type="hidden" id="city" name="city" value="<%=macsPermittedVO.getCity()%>" />
								</td>
								<td align="left" class="formLabel" style="width:20%">
									Ӫҵ��;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input  tcname="Text" id="hallName" name="hallName" prompt="Ӫҵ��" readonly="true"
										maxlength="32" isnullable="true" classname="textType" value="<%=macsPermittedVO.getHallName()%>"/>
									<input type="hidden" id="hallId" name="hallId" value="<%=macsPermittedVO.getHallId() %>"/>									
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									��ϵ��&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input  tcname="Text" id="contactName" name="contactName" prompt="��ϵ��" 
										maxlength="32" isnullable="true" classname="textType" value="<%=macsPermittedVO.getContactName()%>"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									MAC��ַ;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<unieap:input  tcname="Text" id="macAddress" name="macAddress" prompt="MAC��ַ" 
										maxlength="32" isnullable="true" classname="textType" value="<%=macsPermittedVO.getMacAddress()%>" onblur="checkSegment()"/>									
									<input type="hidden" id="priAddress" name="priAddress" value="<%=macsPermittedVO.getMacAddress()%>"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									�绰����&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									 <unieap:input  tcname="Text" id="phoneNumber" name="phoneNumber" prompt="�绰����" 
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
