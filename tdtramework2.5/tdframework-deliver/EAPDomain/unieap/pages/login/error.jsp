<%@ page contentType="text/html; charset=GBK" %>
<%@ page import="com.neusoft.unieap.config.EAPConfigHelper" %>
<html>
<head>
<title>首页</title>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<link rel="stylesheet" href="unieap/images/style.css" type="text/css">
</head>

<body bgcolor="#F4F3E7" text="#000000" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<p><br>
<br>
<br>
<br>
</p>
<br>
<br>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr><td height="3"></td></tr>
  <tr>
    <td width="23%" background="unieap/images/img_bg_a.gif"><img src="unieap/images/img_l.gif" width="259" height="261"></td>
    <td width="43%" background="unieap/images/img_bg_a.gif">　</td>
    <td width="34%" background="unieap/images/img_bg_a.gif">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" height="261">
        
        <tr>
          <td height="221" background="unieap/images/img_bg.gif"> 
            <p><br>
              <br>
            </p>
            <table width="400" border="0" cellspacing="5" cellpadding="0" align="center">
              <tr>
                <td>
                  <div align="center"><img src="unieap/images/err.gif" width="173" height="45"></div>
                </td>
              </tr>
              <tr>
                <td class="cn_12px_white">
                  <div align="center"><br>
                    用户名不存在或密码错误 <b>[ <a href='<%= response.encodeURL(EAPConfigHelper.getContextPath(request)+"/login.do?method=begin") %>' class="cn_12px_white">重新登录</a> 
                    ]</b></div>
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
        2004 Neusoft Corporation. All rights reserved.&nbsp;</span></font><font color="#FFFFFF" class="en_12px">&nbsp;&nbsp;</font></b></div>
    </td>
  </tr>
</table>
</body>
</html>