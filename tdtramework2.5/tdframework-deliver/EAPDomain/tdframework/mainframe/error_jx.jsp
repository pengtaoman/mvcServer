<%@ page contentType="text/html; charset=GBK" %>
<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<%
String path=EAPConfigHelper.getContextPath(request);
String message = NullProcessUtil.nvlToString((String) request.getAttribute("alertMsg"),"");
if(message=="")
	message="密码或用户名错误！请重新录入！";
String helpUri = request.getContextPath() + "/tdframework/mainframe/setting.html";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">

<title>欢迎登录 江西联通 BSS系统</title>
<link rel="stylesheet" href="<%=path%>/tdframework/mainframe/css/login_lt.css" type="text/css" />
<script type="text/javascript" >
function init(){
	var showAlert = document.all("showAlert").value;
	if(showAlert!="null"){
		document.getElementById("alertMessage").style.display="block";
	}
 }
 function doRelogin(){
	window.location.href='<%=response.encodeURL(path+"/login.do?method=begin") %>';

}
 
</script>
</head>

<body onLoad="init();" >
<form  name="logonform" method="post" action="<%=path%>/j_unieap_security_check.do">
<INPUT value=""  type="hidden" name="txtMACAddr"> 
<INPUT value="" type="hidden" name="txtIPAddr"> 
<INPUT value=""  type="hidden" name="txtDNSName">
<div id="index_box_error">
  <div id="comp"><span class="company_word">中国联通BSS系统|</span><span class="province_word">陕西分公司</span></div>
  <div id="ver">v2.0 </div>
  <div  id="login">
      <table border="0" width="200">
        <tr>
          <td height="110"><div style="display:block;" id="alertMessage" >
			"<%=message%>"
		  </div>
          </td>
        </tr>
        
        <tr>
          <td colspan="3" align="right" class="company"><input type="hidden" name="showAlert" value="<%=message%>"><input name="B1" type="button" class="Button"  value="重登录" onClick="doRelogin();" />
            &nbsp; </td>
        </tr>
      </table>

  </div>
  <div id="company">东软集团股份有限公司 Neusoft Group Ltd.</div>
</div> 

</form>
</body>
</html>
