<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection" %>
<%@ page import="com.neusoft.om.dao.pwd.PwdComplexityVO" %>
<%
	String path = request.getContextPath();
	PwdComplexityVO vo = (PwdComplexityVO)request.getAttribute("pwdVO");
	String operType = "modify";
	if(vo == null ){
		vo = new PwdComplexityVO();
		operType = "add";		
	}
	String message = (String)request.getAttribute("message");
%>
<html>
	<head>
	<unieap:base />
		<title>���븴�Ӷ�����</title>
		<contextPath value="<%=path%>"/>
		<LINK REL="stylesheet" HREF="<%=path%>/views/common/css/pubstyle.css" TYPE="text/css"/>
		<link href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">
		<script language="JavaScript" src="<%=path%>/unieap/js/Globals.js"></script>
 		<script language="JavaScript" src="<%=path%>/unieap/js/Common.js"></script>
 		<script language="javascript" src="<%=path%>/views/common/js/nas_check_no_null.js"></script>
		<script language="javascript" src="<%=path%>/views/common/js/nas_date_compare.js"></script>
		<script language="javascript" src="<%=path%>/common/js/td_common.js" ></script>
		<script language="javascript" src="<%=path%>/common/js/td_date.js" ></script>
		<SCRIPT language="JavaScript">
		/*
		 *�رշ���
		 */
		function bBackClick()
		{
			if (!confirm('��ȷ���ر�ô��')) 
				return false;
			window.close();
		}
		/*
		 *���÷���
		 */
		function bResetClick()
		{
			if (!confirm('��ȷ��Ҫ����ô��')) 
				return false;
			OperForm.reset();
			setNull("lowercase");
			setNull("upperCase");
			setNull("specialChar");
			setNull("number");
		}
		/*
		 *������Ϣ
		 */
		function bSaveClick(webpath){	
			var operType = document.getElementById("operType").value;
		    OperForm.action=webpath+ '/om/pwdComplexityAction.do?method=doModifyPwdComplexity&operType='+operType+"";
		    OperForm.submit();	
		}
		/*
		 *ҳ���ʼ������
		 */
		function init(){
			setNull("lowercase");
			setNull("upperCase");
			setNull("specialChar");
			setNull("number");
			var message = document.getElementById("message").value;			
			if(message != null && message!= "" && message != 'null'){				
				alert(message);
			    window.opener.location.reload();
			    window.close();
			}	
		}
		function setNull(inputName){
			var value = document.getElementById(inputName).value;
			if(value== 'null'){
				document.getElementById(inputName).value = '*';
			}
		}
		function checkchar(obj){
			var s = document.getElementById(obj).value;
			var patrn=/^[0-9]{1,20}$/; 
			if(s!="*" && s!=""){
				if (!patrn.exec(s)) {
					alert("�˴�ֻ���������ֻ�'*',���޸�");
					document.getElementById(obj).focus();
				}
			}		
		}
		</SCRIPT>
	</head>
	<body class="mainBody" onload="init()">
		<form action="" method="post" onload="init();" name="OperForm">
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
				<tr class="tableTitleTR2">
					<td colspan="4">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">&#160;</td>
								<td class="tableTitle2">���븴�Ӷ���Ϣ</td>
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
									Сд��ĸ����<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<input  tcname="Text" id="lowercase" name="lowercase" prompt="Сд��ĸ����" 
										maxlength="2" isnullable="true" classname="textType" value="<%=vo.getLowercase() %>"
										title="������Сд��ĸ����С���� * Ϊ������" onblur="checkchar('lowercase')"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									��д��ĸ����<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<input  tcname="Text" id="uppercase" name="uppercase" prompt="��д��ĸ����" 
										maxlength="2" isnullable="true" classname="textType" value="<%=vo.getUppercase() %>"
										title="�������д��ĸ����С���� * Ϊ������" onblur="checkchar('uppercase')"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									�����ַ�����<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<input  tcname="Text" id="specialChar" name="specialChar" prompt="�����ַ�����" 
										maxlength="2" isnullable="true" classname="textType" value="<%=vo.getSpecialChar() %>"
										title="�����������ַ�����С���� * Ϊ������" onblur="checkchar('specialChar')"/>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									��������<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<input  tcname="Text" id="number" name="number" prompt="��������" 
										maxlength="2" isnullable="true" classname="textType" value="<%=vo.getNumber() %>"
										title="�����������ַ�����С���� * Ϊ������" onblur="checkchar('number')"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									����<span class="formRequested"></span>
								</td>
								<td align="left" class="formField" style="width:80%" colspan="3">
									<input  tcname="Text" id="desc" name="desc" prompt="����" 
										maxlength="64" isnullable="true" classname="textType" value="<%=vo.getDesc() %>" />
								</td>								
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<div class="formButtonDIV" id="formButton">
				<button class="formButton" id="bSave" name="bSave" onclick="return bSaveClick('<%=path%>');">
					��&#160;&#160;��
				</button>
				<button class="formButton" id="bReset" name="bReset" onclick="return bResetClick();">
					��&#160;&#160;��
				</button>
				<button class="formButton" id="bBack" name="bBack" onclick="return bBackClick();">
					��&#160;&#160;��
				</button>
				<input type="hidden" name="operType" value="<%=operType %>" />
				<input type="hidden" name="pwdId" value="<%=vo.getId() %>">
				<input type="hidden" name="message" value="<%=message %>">
			</div>
		</form>
	</body>
</html>
