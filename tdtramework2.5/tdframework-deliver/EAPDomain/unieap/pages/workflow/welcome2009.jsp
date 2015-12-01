<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<% request.getSession().setAttribute("Style","Style2009"); %>
<%
 String picBase = request.getContextPath() + "/unieap/pages/workflow/stylesheet/style2009/";
 %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title><bean:message bundle="uniflow" key="workflow.title.window.main"/></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style type="text/css">td img {display: block;}</style>
<LINK href='<%=request.getContextPath()%>/unieap/pages/workflow/stylesheet/Style.css' rel="stylesheet">
<script language="JavaScript">
function keydowned(element)
{
  if(event.keyCode==13)
  {
    if(element==(document.forms[0].usrname))
    {
	document.forms[0].pwd.focus();
    }
    else
    {
	document.forms[0].pwd.blur();
	document.forms[0].submit();
    }
  }
}
function onload()
{  
  document.forms[0].usrname.focus();
}

function onStyleChange()
{
	location.href="welcome.jsp";
}
</script>
</head>
<body style="background-color: #5e96c5;background-image: url(<%=picBase%>login_img/bg.gif);background-position: left top; background-repeat: no-repeat;" onload="onload()">
<uniflow:m_form action="logon.do" focus="usrname">
<table border="0" cellpadding="0" cellspacing="0" width="100%" height="90%">
<tr><td valign="middle" align="center">
	<p>&nbsp;</p>
	<p>&nbsp;</p>
	<p>&nbsp;</p>
	<p>&nbsp;</p>
<table border="0" cellpadding="0" cellspacing="0" width="560" height="330">
  <tr>
   <td><img src="<%=picBase%>login_img/spacer.gif" width="5" height="1" border="0" alt="" /></td>
   <td><img src="<%=picBase%>login_img/spacer.gif" width="549" height="1" border="0" alt="" /></td>
   <td><img src="<%=picBase%>login_img/spacer.gif" width="6" height="1" border="0" alt="" /></td>
   <td><img src="<%=picBase%>login_img/spacer.gif" width="1" height="1" border="0" alt="" /></td>
  </tr>

  <tr>
   <td colspan="3"><img name="LoginWinOut_r1_c1" src="<%=picBase%>login_img/LoginWinOut_r1_c1.png" width="560" height="143" border="0" id="LoginWinOut_r1_c1" alt="" /></td>
   <td><img src="<%=picBase%>login_img/spacer.gif" width="1" height="143" border="0" alt="" /></td>
  </tr>
  <tr>
   <td rowspan="2"><img name="LoginWinOut_r2_c1" src="<%=picBase%>login_img/LoginWinOut_r2_c1.png" width="5" height="187" border="0" id="LoginWinOut_r2_c1" alt="" /></td>
   <td height="147" background="<%=picBase%>login_img/LoginWinOut_r2_c2.png">
   <table width="407"  border="0" cellpadding="0" cellspacing="0" align="center">
			  <tr>
				<td>
				<table  border="0" cellpadding="0" cellspacing="0" align="center">
					<tr>
		                <td width="50" height="28" align="left" class="Text_12_bk_Dark">用户名</td>
		                <td height="28" align="left"><html:text tabindex="1" property="usrname" styleClass="input_login" size="20" onkeydown="keydowned(this)"/></td>
		                <td width="60" rowspan="2"><a href="javascript:document.forms[0].submit();"><img tabindex="3" src="<%=request.getContextPath()%>/unieap/pages/workflow/stylesheet/style1/main_img/button_login.png" width="52" height="52" border="0" /></a></td>
		              </tr>
		              <tr>
		                <td width="50" height="28" align="left" class="Text_12_bk_Dark">密&nbsp;&nbsp;&nbsp;码</td>
		                <td height="28" align="left"><html:password tabindex="2" property="pwd" styleClass="input_login" size="20" onkeydown="keydowned(this)"/></td>
		              </tr>
					  <tr>
						 <td width="50" height="28" align="left" class="Text_12_bk_Dark">风&nbsp;&nbsp;&nbsp;格</td>
						 <td colspan="3" class="Text_12_bk_Dark">
						 <input type="radio" name="StyleSet" value="CommonStyle" onclick="onStyleChange()"/>UniEAP 经典&nbsp;&nbsp;
						 <input type="radio" name="StyleSet" value="Style2009" checked="checked" />UniEAP 2009
						 </td>
					  </tr>	
				</table>
                </td>
			  </tr>
              
              <tr>
                <td height="35" colspan="4" valign="middle" class="Text_12_bk_Dark" align="center">
                <html:radio property="language" value="zh"/>简体中文
                <html:radio property="language" value="en"/>English                
                <html:radio property="language" value="jp"/>日本語                 
                &nbsp;</td>
              </tr>
   </table>
   </td>
   <td rowspan="2"><img name="LoginWinOut_r2_c3" src="<%=picBase%>login_img/LoginWinOut_r2_c3.png" width="6" height="187" border="0" id="LoginWinOut_r2_c3" alt="" /></td>
   <td><img src="<%=picBase%>login_img/spacer.gif" width="1" height="147" border="0" alt="" /></td>
  </tr>
  <tr>
   <td height="40" background="<%=picBase%>login_img/LoginWinOut_r3_c2.png" valign="top">
   <table cellpadding="0" cellspacing="0" border="0" width="100%">
   <tr><td align="center" style="font-size:12px;color:#FFFFFF;padding-top:8px">东软集团股份有限公司 版权所有 Copyright© 1999-2009 All rights reserved.</td></tr>
   </table>
   </td>
   <td><img src="<%=picBase%>login_img/spacer.gif" width="1" height="40" border="0" alt="" /></td>
  </tr>
</table>

</td></tr>
</table>
</uniflow:m_form>
</body>
</html>