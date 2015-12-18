<%@ page contentType="text/html; charset=GBK" %>
<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<%
String path=EAPConfigHelper.getContextPath(request);
String message = NullProcessUtil.nvlToString((String) request.getAttribute("alertMsg"),"");
System.out.println("message is " +message);
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<title>欢迎登录 陕西电信 BSS系统</title>
<style type="text/css">
<!--
.loginform {
	font-size: 14px;
}
.input {
	font-size: 16px;
	border: 1px solid #2d4c9c;
	height: 25px;
	width: 120px;
}
.button1 {
	background-image: url(<%=path%>/tdframework/mainframe/images/button_relogin_dx.gif);
	background-repeat: no-repeat;
	padding: 0px;
	height: 25px;
	width: 83px;
	border-top-width: 0px;
	border-right-width: 0px;
	border-bottom-width: 0px;
	border-left-width: 0px;
	border-top-style: none;
	border-right-style: none;
	border-bottom-style: none;
	border-left-style: none;
}
.button {
	padding-bottom: 90px;
	padding-left: 90px;
}
.error {
	font-size: 18px;
	font-weight: bolder;
	color: #FF0000;
}
.txt_sys {
	font-size: 32px;
	font-weight: bolder;
	text-align: center;
	vertical-align: top;
	margin-bottom: 130px;
	line-height: 40px;
}
-->
</style>

<script type="text/javascript">
<!--

var APP_PATH="<%=path%>";

if (top.location != self.location) top.location=self.location;

function init(){
	document.getElementById("relogin").focus();

	//var ht1 =  document.getElementById("headBg");
	//ht1.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)";
}

function doRelogin(){
	window.location.href='<%=response.encodeURL(path+"/login.do?method=begin") %>';

}

function reload()
{
	logonform.j_username.value='';
	logonform.j_password.value='';
	return;
}
function setClass(eleName,clsName) {
	document.all(eleName).className = clsName;
}


//-->
</script>

</head>
<body onload="init();" >
<form  name="logonform" method="post" action="<%=path%>/j_unieap_security_check.do">
<table align="center"  border="0" cellpadding="0" cellspacing="0" width="100%" height="100%">
<tr>
	<td id="headBg" width="100%"  valign="middle" height="100%">
	  <table width="598" height="368" border="0" align="center" cellpadding="0" cellspacing="0" bordercolor="#2882fa">

          <tr>
            <td colspan="3" height="128" background="<%=path%>/tdframework/mainframe/images/login_top_error_dx.gif">&nbsp;</td>
          </tr>
          <tr>
            <td width="310" rowspan="3" background="<%=path%>/tdframework/mainframe/images/login_bottom_error.gif">
			</td>
            <td width="57" background="<%=path%>/tdframework/mainframe/images/login_name_error_dx.gif"></td>
            <td width="231" background="<%=path%>/tdframework/mainframe/images/login_04_error_dx.gif"  class="error">
			<font color="red">用户名或密码不存在！</font>
			</td>
          </tr>

          <tr>
            <td width="57" height="42" background="<%=path%>/tdframework/mainframe/images/login_code_error_dx.gif"></td>
            <td width="231" height="42" background="<%=path%>/tdframework/mainframe/images/login_06_error_dx.gif">
              			<font color="red"><%=message%></font>
				</td>
          </tr>
          <tr>
            <td height="159" colspan="2" background="<%=path%>/tdframework/mainframe/images/login_button_error_dx.gif" class="button">
			    <input type="hidden" name="showAlert" value="<%=message%>">
				<button id="relogin" onclick="doRelogin();" class="button1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
            </td>
          </tr>
	  </table>
	</td>
	</tr>
</table>

</form>
</body>
</html>