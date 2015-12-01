<%--
/* JSP程序简要描述信息
**************************************************************
* 程序名	: 密码参数设置
* 建立日期: 2008-06-24
* 作者		: zhaof@neusoft.com
* 模块		: 权限
* 描述		: 权限系统-密码参数设置
* 备注		: 
* ------------------------------------------------------------
* 修改历史
* 序号		日期		修改人			修改原因
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
<title>权限维护</title>
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
			alert("密码长度不能小于8,请重新填写");
			document.getElementById("pwdMinLength").focus();
			return false;
		}
		if(Number(maxLength) < 8){
			alert("密码长度不能小于8,请重新填写");
			document.getElementById("pwdMaxLength").focus();
			return false;
		}
		if(Number(minLength) > Number(maxLength)){
			alert("密码最小长度不能大于最大长度，请重新填写");
			document.getElementById("pwdMinLength").focus();
			return false;
		}
		if(Number(maxLength) > 32){
			alert("密码最大长度设置不能大于32，请重新填写");
			document.getElementById("pwdMaxLength").focus();
			return false;
		}
		var validDays = document.getElementById("invalidDays").value;
		var alertDays = document.getElementById("alertDays").value;
		if(Number(validDays) < 30){
			alert("密码有效期最短为30天,请重新填写");
			document.getElementById("invalidDays").focus();
			return false;
		}
		if(Number(validDays) > 90){
			alert("密码有效期最长为90天,请重新填写");
			document.getElementById("invalidDays").focus();
			return false;
		}
		if(Number(alertDays) >= Number(validDays)){
			alert("提醒时间不能大于密码有效期，请重新填写");
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
				是否验证密码过期
			</td>
			<td class="formField">
				<select name="ifControl" id="ifControl" onkeydown="nas_enter();">
					<option value="1">验证</option>
					<option value="0">不验证</option>
			  	</select>
            </td>
			<td class="formLabel">
				密码有效期
			</td>
			<td class="formField">
			<unieap:input tcname="Number"  id="invalidDays" name="invalidDays" prompt="密码有效期" 
				maxlength="4" isnullable="false" classname="textType" value="<%=String.valueOf(pwdValidVO.getInValidDays())%>"/>天
			</td>
		</tr>
		<tr>
			<td class="formLabel">
				失效前几天提示
			</td>
			<td class="formField">
				<unieap:input tcname="Number"  id="alertDays" name="alertDays" prompt="失效前几天提示" 
				maxlength="3" isnullable="false" classname="textType" value="<%=String.valueOf(pwdValidVO.getAlertDays())%>"/>天				
            </td>
			<td class="formLabel">
				密码长度
			</td>
			<td class="formField">
			<unieap:input tcname="Number"  id="pwdMinLength" name="pwdMinLength" prompt="密码最小长度" 
				maxlength="2" isnullable="false" classname="textType" value="<%=minLength%>"/>位 ~ 
			<unieap:input tcname="Number"  id="pwdMaxLength" name="pwdMaxLength" prompt="密码最大长度" 
				maxlength="2" isnullable="false" classname="textType" value="<%=maxLength%>"/>位
			</td>
		</tr>
	 </table>
	 <input type="hidden" name="control" value="<%= pwdValidVO.getIfCortrol()%>"/>
	 <input type="hidden" name="message" value="<%=message %>">
	 <div class="formButtonDIV" id="filebutton1" style="display:block"> 
		<button class="formButton" id="bModify" name="bModify" onclick="doModify('<%=webpath%>')">保 存</button>
	 </div>
</unieap:form>
</body>
</html>
