<%@ page contentType="text/html; charset=GBK" %>
<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<%
String path=EAPConfigHelper.getContextPath(request);
String message = NullProcessUtil.nvlToString((String) request.getAttribute("alertMsg"),"");
String helpUri = request.getContextPath() + "/tdframework/mainframe/setting.html";
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<META content="MSHTML 6.00.2800.1106" name=GENERATOR></HEAD>
<title>欢迎登录 中国电信 BSS系统</title>
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
	background-image: url(<%=path%>/tdframework/mainframe/images/button_login_dx.gif);
	background-repeat: no-repeat;
	padding: 0px;
	height: 25px;
	width: 72px;
	border-top-width: 0px;
	border-right-width: 0px;
	border-bottom-width: 0px;
	border-left-width: 0px;
	border-top-style: none;
	border-right-style: none;
	border-bottom-style: none;
	border-left-style: none;
}
.button2 {
	background-image: url(<%=path%>/tdframework/mainframe/images/button_reset_dx.gif);
	background-repeat: no-repeat;
	height: 25px;
	width: 72px;
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
	padding-bottom: 100px;
	padding-left: 20px;
}
.txt_sys {
	font-size: 32px;
	font-weight: bolder;
	text-align: center;
	vertical-align: top;
	margin-bottom: 130px;
	line-height: 40px;
}
.bk {
	background-image: url(<%=path%>/tdframework/mainframe/images/login_ok.gif);
	font-size: 14px;
}
input.default {
	border:1px solid #bbbbbb;
	font-size:14px;
	height:22px;
	margin:2px;
	padding:2px 2px 2px 2px;
	width:130px;
}
input.focus {
	border:1px solid #ffbbaa;
	background-color:#fce5e5;
	font-size:14px;
	height:22px;
	margin:2px;
	padding:2px 2px 2px 2px;
	width:130px;
}
.STYLE2 {
	font-weight: bold;
	color: #000000;
	font-size: 14px;
}
-->
</style>
<script type="text/javascript" src="<%=path%>/tdframework/mainframe/js/login.js" ></script>

</head>
<body onLoad="init();" >

<form  name="logonform" method="post" action="<%=path%>/j_unieap_security_check.do">
<table align="center"  border="0" cellpadding="0" cellspacing="0" width="100%" height="100%">
<tr>
	<td id="headBg" height="100%"  valign="middle">
      <table width="598" height="368" border="0" align="center" cellpadding="0" cellspacing="0" bordercolor="#2882fa">
        <tr>
          <td colspan="3" height="128" background="<%=path%>/tdframework/mainframe/images/login_top_dx.gif">&nbsp;</td>
        </tr>
          <tr>
            <td width="310" rowspan="4" background="<%=path%>/tdframework/mainframe/images/login_bottom.gif"></td>
            <td width="57" height="39" background="<%=path%>/tdframework/mainframe/images/login_name_dx.gif"></td>
            <td width="231" background="<%=path%>/tdframework/mainframe/images/login_04_dx.gif">
          	<label>
			&nbsp;
 				<input type="text"  class="default" name="j_username" onKeyDown="enterToTab()" 
					onfocus="inputTextFocus()" onBlur="inputTextBlur()">
           		</label>
 		  <div style="display:none;" id="alertMessage" >
			<font color="red"><%=message%></font>
		  </div>
          </tr>

          <tr>
            <td width="57" height="42" background="<%=path%>/tdframework/mainframe/images/login_code_dx.gif"></td>
            <td width="231" background="<%=path%>/tdframework/mainframe/images/login_06_dx.gif"><label>&nbsp;
	   			<input type="password"  class="default" name="j_password" onKeyDown="enterToSubmit()" 
				onfocus="inputTextFocus()" onBlur="inputTextBlur()">
          </label></td>
          </tr>
		  <tr>
            <td height="30" colspan="2" background="<%=path%>/tdframework/mainframe/images/login_double_dx.gif">&nbsp;&nbsp;
              &nbsp;&nbsp;
            <input type="checkbox" name="double_screen" id="double_screen"><span class="STYLE2">开启双屏功能</span></td>
          </tr>
          <tr>
            <td height="129" colspan="2" background="<%=path%>/tdframework/mainframe/images/login_button_dx.gif" class="button">
              	  <input type="hidden" name="showAlert" value="<%=message%>">
				   <button onClick="doSubmit();"  id="sub" class="button1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>&nbsp;&nbsp;
				   <button onClick="reload();"  class="button2"></button>
			</td>
          </tr>
		
	  </table>
	</td>
	</tr>
</table>

</form>
</body>
</html>