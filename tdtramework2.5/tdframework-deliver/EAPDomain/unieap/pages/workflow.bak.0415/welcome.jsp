<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/taglib/uniflow.tld" prefix="uniflow"%>
<%@ page import="com.neusoft.uniflow.web.util.WorkflowManager"%>
<%@ page import="com.neusoft.uniflow.web.util.MessageUtil"%>
<% 
	request.setCharacterEncoding("UTF-8");
	request.getSession().setAttribute("Style","CommonStyle");
	String msg = request.getParameter("msg");
 %>
<html>
<head>
<title><bean:message bundle="uniflow" key="workflow.title.window.main"/></title>
<LINK href='<%=request.getContextPath()%>/unieap/pages/workflow/stylesheet/Style.css' rel=stylesheet>
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
	location.href="welcome2009.jsp";
}
</script>
</head>
<body style="background-color: #d7d7d7;"leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onload="onload()">
<uniflow:m_form action="logon.do" focus="usrname">
<table width="100%" height="90%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td  align="center" valign="middle" bordercolor="#1A50B8">
	  <p>&nbsp;</p>
	  <p>&nbsp;</p>
	  <p>&nbsp;</p>
	  <table width="554" height="324" border="0" cellpadding="0" cellspacing="0" class="login_bg">
      <tr>
        <td align="center" valign="bottom"><table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td height="160" align="right" valign="bottom">
			<table width="407"  border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td width="50" height="28" align="left" class="Text_12_bk_B">用户名</td>
                <td height="28" align="left"><html:text tabindex="1" property="usrname" styleClass="input_login" size="20" onkeydown="keydowned(this)"/></td>
                <td width="60" rowspan="2"><a href="javascript:document.forms[0].submit();"><img tabindex="3" src="<%=request.getContextPath()%>/unieap/pages/workflow/stylesheet/style1/main_img/button_login.png" width="52" height="52" border="0" /></a></td>
                <td width="142" rowspan="2" align="right">&nbsp;</td>
              </tr>
              <tr>
                <td width="50" height="28" align="left" class="Text_12_bk_B">密&nbsp;&nbsp;&nbsp;码</td>
                <td height="28" align="left"><html:password tabindex="2" property="pwd" styleClass="input_login" size="20" onkeydown="keydowned(this)"/></td>
              </tr>
			  <tr>
				 <td width="50" height="28" align="left" class="Text_12_bk_B">风&nbsp;&nbsp;&nbsp;格</td>
				 <td colspan="3" class="Text_12_bk_B">
				 <input type="radio" name="StyleSet" value="CommonStyle" checked="checked"/>UniEAP 经典&nbsp;&nbsp;
				 <input type="radio" name="StyleSet" value="Style2009" onclick="onStyleChange()" />UniEAP 2009
				 </td>
			  </tr>		
              <tr>
                <td height="35" colspan="4" valign="middle" class="Text_12_bk_B">
                <html:radio property="language" value="zh"/>简体中文
                <html:radio property="language" value="en"/>English                
                <html:radio property="language" value="jp"/>日本語                 
                </td>
              </tr>	 
            </table>
			</td>
          </tr>
          <tr>
            <td height="50" align="center" class="Text_12_wt"><span class="Text_wt">&copy;版权所有 沈阳东软软件股份有限公司 Copyright By Neusoft Co.,Ltd.</span></td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table>
</uniflow:m_form>
</body>
</html>
<%
if(msg!=null&&msg.length()>0)
	{
 %>
<script language="javascript">
var msg = "<%=MessageUtil.getString(((String)session.getAttribute(msg)),request.getSession())%>";
alert(msg);
</script>
<%
	}
 %>