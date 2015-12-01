<%@ page contentType="text/html; charset=GBK" %>
<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>
<html>
<head>
<title>首页</title>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<link rel="stylesheet" href="unieap/images/style.css" type="text/css">
<script language="javascript">
<!--
if (top.location != self.location)top.location=self.location;

//设置页面元素的CSS
//eleName 页面元素名称
//className 要切换的CSS名称
function setClass(eleName,clsName) {
	document.all(eleName).className = clsName;
}

function onsubmit(){
  document.all("logonform").submit();
}


function enterToTab(){
  if(event.srcElement.type != 'button' && event.srcElement.type != 'textarea' && event.keyCode == 

13){
    event.keyCode = 9;
  }
}

function enterToSubmit(){
  if (event.keyCode == 13){
    onsubmit();
  }
}
//下面的fullscreen()可以实现全屏功能
//function fullscreen(){
//  if (this.name!='fullscreen'){ 
//         window.open(location.href,'fullscreen','fullscreen=no, resizable=yes, status=yes, menubar=yes, location=no');
//        window.opener=null;window.close();
//  }
//}
 
//-->
</script>
</head>

<body bgcolor="#F4F3E7" text="#000000" leftmargin="0" topmargin="0" marginwidth="0" 

marginheight="0">
<p><br>
<br>
<br>
<br>
</p>
<br>
<br>
<form  name="logonform" method="post" action="<%= 

EAPConfigHelper.getContextPath(request)%>/j_unieap_security_check.do">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="23%" background="unieap/images/img_bg_a.gif"><img src="unieap/images/img_l.gif" width="259" 

height="261"></td>
    <td width="43%" background="unieap/images/img_bg_a.gif">　</td>
    <td width="34%" background="unieap/images/img_bg_a.gif">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" height="261">
        <tr>
          <td height="221" background="unieap/images/img_bg.gif"> <p><br>
            <br>
            </p><p>&nbsp;</p><table width="239" border="0" cellspacing="4" cellpadding="0" 

align="center">
              <tr> 
                <td width="66"> 
                  <div align="right" class="cn_12px_white"><b>用户名：</b></div>
                </td>
                <td width="171"> 
                  <input type="text" name="j_username" class="Menu120"

onkeydown="enterToTab()">
                </td>
              </tr>
              <tr> 
                <td width="66"> 
                  <div align="right" class="cn_12px_white"><b>密 码：</b></div>
                </td>
                <td width="171"> 
                  <input type="password" name="j_password" class="Menu120" onkeydown="enterToTab()">
                </td>
              </tr>
              <tr align="center"> 
                <td colspan="2"> <br>
                  <table width="、" border="0" cellspacing="3" cellpadding="0">
                    <tr> 
                      <td><a href="javascript:onsubmit()" class="link3_song12" 

target="_self"><img src="unieap/images/login.gif" width="86" height="24" border="0"></a></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td height="40"><img src="unieap/images/img_r.gif" width="466" height="40"></td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<br>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr> 
    <td height="8" width="98%"> 
      <div align="right"><b><font color="#999999" class="en_12px"><span class="en_12">&copy; 
        2004 Neusoft Corporation. All rights reserved.&nbsp;</span></font><font color="#FFFFFF" 

class="en_12px">&nbsp;&nbsp;</font></b></div>
    </td>
  </tr>
</table>
</form>
</body>
</html>