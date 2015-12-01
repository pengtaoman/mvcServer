<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ page import="com.neusoft.om.dao.employee.EmployeeVO" %>

<%
	String path = request.getContextPath();
	EmployeeVO vo = (EmployeeVO)request.getAttribute("employeeVO");
 	if(vo == null){
 		vo = new EmployeeVO();
 	}
	//�õ�ҳ������Ҫ����������Ϣ	
	String message = (String)request.getAttribute("message");
	String operType = (String)request.getAttribute("operType");
	String password = (String)request.getAttribute("password");
	if(password == null){
		password = "";
	}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
	<base target="_self">
		<title>������������</title>
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
		<script  language=javascript src="<%=path%>/unieap/js/NumberObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/IDCardObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/IntegerObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/MoneyObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/PasswordConfirmObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/PasswordObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/PosIntegerObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/ReadOnlyFieldObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/ReadOnlyObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/TextObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/TextAreaObj.js"> </script>
		<script  language=javascript src="<%=path%>/unieap/js/EmailObj.js"> </script>		
		<script language="javascript" src="<%=path%>/common/js/td_date.js"></script>
		<script language="javascript" src="<%=path%>/common/js/titlebar.js"> </script>
		<script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=path%>/views/common/js/nas_check_no_null.js"></script>

		<script language="javascript">
		function initial(){		
			var message = document.getElementById("message").value;
			if(message != null && message != '' && message != 'null'){
				alert(message);
			}
		}
		/*
		 * ����
		 */
		function bSaveClick(webpath){				
			var passwd = document.getElementById("pwd").value;				
			var workPwdConfirm = EAPForm.confirmPwd.value;
			if (passwd != workPwdConfirm){
				document.getElementById("pwd").focus();
				alert("������������벻���");
				return;
			}
			
		    EAPForm.action = webpath+ '/om/EmployeeMaintanceAction.do?OperType=resetPassword&pwd='+passwd;					
		    EAPForm.submit();
		}

		/*
		 * ����
		 */
		function bBackClick()
		{
			window.close();
		}

		</script>
		<style>
			em { color: red;
				font-style: normal;
				font-family: Courier; }
			fieldset { 
				width: 100%;
		}
		</style>
	</head>
	<body class="mainBody"  onLoad="initial();"  >
		<unieap:form action="" method="post">
			<fieldset align="center">
			<legend>
				<em>������������</em>
			</legend>
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
				<tr>
					<td class="formTableL">
						<input type="hidden" id="tableNames" name="tableNames" />
					</td>
					<td class="formTableC">
						<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
							<tr>
								<td align="right" class="formLabel" style="width:50%">
									Ա�����&#160;
								</td>
								<td align="left" class="formLabel" style="width:50%">
									<%=vo.getEmployeeId()==null?"":vo.getEmployeeId() %>									
								</td>								
							</tr>	
							<tr>
								<td align="right" class="formLabel" style="width:50%">
									Ա������&#160;
								</td>
								<td align="left" class="formLabel" style="width:50%">
									<%=vo.getEmployeeName()==null?"":vo.getEmployeeName() %>
								</td>								
							</tr>	
							<tr>
								<td align="right" class="formLabel" style="width:50%">
									��¼�˺�&#160;
								</td>
								<td align="left" class="formLabel" style="width:50%">
									<%=vo.getWorkNo() %>									
								</td>	
								<input type="hidden" name="workNo" value="<%=vo.getWorkNo()%>" />							
							</tr>
							<tr>
								<td align="right" class="formLabel" style="width:50%" >
									��&#160;��&#160;��&#160;
								</td>
								<td align="left" class="formLabel" style="width:50%">
									<unieap:input type="text" id="pwd" name="pwd" value="<%=password %>"  tcname="Password" prompt="��¼����" />
									<span class="formRequested">����������Ĭ������Ϊ'111111'</span>
								</td>
							</tr>
							<tr>
								<td align="right" class="formLabel" style="width:50%" >
									ȷ������&#160;
								</td>
								<td align="left" class="formLabel" style="width:50%" >
									<unieap:input type="text" id="confirmPwd" name="confirmPwd" value="<%=password %>" tcname="Password" prompt="ȷ������"/>
								</td>								
							</tr>
							
						</table>
					</td>
					<td class="formTableR">&#160;</td>
				</tr>
				<tr>
					<td class="formTableLB">&#160;</td>
					<td class="formTableB">&#160;
						<input type="hidden" name="message" value="<%=message %>" />
					</td>
					<td class="formTableRB">&#160;</td>
				</tr>
			</table>	
			</fieldset>
			<%if(operType != null && operType.equals("save")){ %>
			<div class="formButtonDIV" id="formButton">				
				<button class="formButton" id="bBack" name="bBack" onclick="return bBackClick();">
					��&#160;&#160;��
				</button>
			</div>			
			<%}else{ %>
			<div class="formButtonDIV" id="formButton">
				<button class="formButton" id="bSave" name="bSave" onclick="return bSaveClick('<%=path%>');">
					��&#160;&#160;��
				</button>
				<button class="formButton" id="bBack" name="bBack" onclick="return bBackClick();">
					��&#160;&#160;��
				</button>
			</div>
			<%} %>
		</unieap:form>
	</body>
</html>
