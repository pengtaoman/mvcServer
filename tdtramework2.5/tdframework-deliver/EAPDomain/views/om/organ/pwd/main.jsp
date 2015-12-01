<%--
/* JSP�����Ҫ������Ϣ
**************************************************************
* ������	: �����������
* ��������: 2008-06-24
* ����		: zhaof@neusoft.com
* ģ��		: Ȩ��
* ����		: Ȩ��ϵͳ-�����������
* ��ע		: 
* ------------------------------------------------------------
* �޸���ʷ
* ���		����		�޸���			�޸�ԭ��
* 1
* 2
**************************************************************
*/
--%>
<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap" %>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td" %>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om" %>
<%@ page import="com.neusoft.om.dao.pwd.PwdValidVO" %>
<%
	String webpath = request.getContextPath();
	PwdValidVO pwdValidVO = (PwdValidVO)request.getAttribute("pwdValidVO");	
	String minLength = 	String.valueOf(pwdValidVO.getPwdMinLength());
	String maxLength = String.valueOf(pwdValidVO.getPwdMaxLength());
	if(minLength == null || minLength.equals("0")){
		minLength = "8";		
	}
	if(maxLength == null || maxLength.equals("0")){
		maxLength = "8";		
	}
	String message = (String)request.getAttribute("message");
	
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>Ȩ��ά��</title>
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
<script  language=javascript src="<%=webpath%>/unieap/js/NumberObj.js"> </script>	
<script language="javascript" src="<%=webpath%>/common/js/titlebar.js"> </script>
<script language="javascript" src="<%=webpath%>/views/common/js/nas_check_no_null.js"></script>
<script language="javascript" src="<%=webpath%>/views/common/js/nas_date_compare.js"></script>
<script language="javascript" src="<%=webpath%>/common/js/td_common.js" ></script>
<script language="javascript">
	/*
	 *
	 */
	function load(){		
		var control = document.getElementById("control").value;
		document.getElementById("ifControl").value = control;		
		var message = document.getElementById("message").value;
		if(message != null && message != "" && message != "null"){
			alert(message);
		}
	}

	function doModify(path){
		var minLength = document.getElementById("pwdMinLength").value;
		var maxLength = document.getElementById("pwdMaxLength").value;
		if(Number(minLength) < 8){
			alert("���볤�Ȳ���С��8,��������д");
			document.getElementById("pwdMinLength").focus();
			return false;
		}
		if(Number(maxLength) < 8){
			alert("���볤�Ȳ���С��8,��������д");
			document.getElementById("pwdMaxLength").focus();
			return false;
		}
		if(Number(minLength) > Number(maxLength)){
			alert("������С���Ȳ��ܴ�����󳤶ȣ���������д");
			document.getElementById("pwdMinLength").focus();
			return false;
		}
		if(Number(maxLength) > 32){
			alert("������󳤶����ò��ܴ���32����������д");
			document.getElementById("pwdMaxLength").focus();
			return false;
		}
		var validDays = document.getElementById("invalidDays").value;
		var alertDays = document.getElementById("alertDays").value;
		if(Number(validDays) < 30){
			alert("������Ч�����Ϊ30��,��������д");
			document.getElementById("invalidDays").focus();
			return false;
		}
		if(Number(validDays) > 90){
			alert("������Ч���Ϊ90��,��������д");
			document.getElementById("invalidDays").focus();
			return false;
		}
		if(Number(alertDays) >= Number(validDays)){
			alert("����ʱ�䲻�ܴ���������Ч�ڣ���������д");
			document.getElementById("alertDays").focus();
			return false;
		}
		EAPForm.action = path+ '/om/pwdAction.do?method=doSave';
		EAPForm.submit();				
	}

		
</script>
</head>
  
<body onload="load()" class="mainBody">
<unieap:form method="POST" action="" >
	 <table border="0" cellpadding="0" cellspacing="2" class="formTableCore" id="QueryCondition">
		<tr>
			<td class="formLabel">
				�Ƿ���֤�������
			</td>
			<td class="formField">
				<select name="ifControl" id="ifControl" onkeydown="nas_enter();">
					<option value="1">��֤</option>
					<option value="0">����֤</option>
			  	</select>
            </td>
			<td class="formLabel">
				������Ч��
			</td>
			<td class="formField">
			<unieap:input tcname="Number"  id="invalidDays" name="invalidDays" prompt="������Ч��" 
				maxlength="4" isnullable="false" classname="textType" value="<%=String.valueOf(pwdValidVO.getInValidDays())%>"/>��
			</td>
		</tr>
		<tr>
			<td class="formLabel">
				ʧЧǰ������ʾ
			</td>
			<td class="formField">
				<unieap:input tcname="Number"  id="alertDays" name="alertDays" prompt="ʧЧǰ������ʾ" 
				maxlength="3" isnullable="false" classname="textType" value="<%=String.valueOf(pwdValidVO.getAlertDays())%>"/>��				
            </td>
			<td class="formLabel">
				���볤��
			</td>
			<td class="formField">
			<unieap:input tcname="Number"  id="pwdMinLength" name="pwdMinLength" prompt="������С����" 
				maxlength="2" isnullable="false" classname="textType" value="<%=minLength%>"/>λ ~ 
			<unieap:input tcname="Number"  id="pwdMaxLength" name="pwdMaxLength" prompt="������󳤶�" 
				maxlength="2" isnullable="false" classname="textType" value="<%=maxLength%>"/>λ
			</td>
		</tr>
	 </table>
	 <input type="hidden" name="control" value="<%= pwdValidVO.getIfCortrol()%>"/>
	 <input type="hidden" name="message" value="<%=message %>">
	 <div class="formButtonDIV" id="filebutton1" style="display:block"> 
		<button class="formButton" id="bModify" name="bModify" onclick="doModify('<%=webpath%>')">�� ��</button>
	 </div>
</unieap:form>
</body>
</html>
