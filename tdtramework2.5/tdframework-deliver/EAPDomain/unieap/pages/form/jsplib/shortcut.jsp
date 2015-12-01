<%@ page contentType="text/html; charset=utf-8"%>
<%@ page import="com.neusoft.unieap.form.manage.util.MessageUtil"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<html>
<head>
<title><bean:message bundle="formResource" key="form.privilege.shortcut"/></title>
<META HTTP-EQUIV="MSThemeCompatible" CONTENT="No">
<meta content="text/html; charset=utf-8">
<LINK href="<%=request.getContextPath()%>/unieap/pages/form/css/Style2.css" rel=stylesheet>
<STYLE>

 body{
   margin-left:0px;
   margin-right:0px;
   margin-top:0px;
   margin-bottom:0px;
 }
</STYLE>

<script language="javascript" src="../jslib/shortcut.js"></script>
</head>
<body onload="init('currentuser','allroleslistId','radioGroup1');document.body.focus();">
<center>
<table border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td ><table  cellspacing="0" class="main_title_table">
      <tr>
        <td nowrap class="text_title" ><label id="currentuser"></label></td>
        <td align="right" class="main_table2_td2">&nbsp;</td>
      </tr>
    </table>
        <table border="0" cellpadding="0" cellspacing="10" class="main_label_outline">
          <tr>
            <td><table cellspacing="0"   class="main_label_table">
                <tr>
                  <td class="main_label_td" valign="middle" nowrap>
                  <input type="radio" name="radioGroup1" value="1" onclick="changeSelect(this);document.body.focus();"/>
                  <select id="allroleslistId" disabled="true" style="width:130px;font-size:12px;"><option /></select>
                  <label><%=MessageUtil.getString("form.shortcut.shortcut",session) %></label>
                  </td>
                </tr>
				<tr>
                  <td class="main_label_td" valign="middle" nowrap>
                  <input type="radio" name="radioGroup1" checked="true" value="0" onclick="changeSelect(this);document.body.focus();"/>
                  <label><%=MessageUtil.getString("form.shortcut.cancel",session) %></label>
                  </td>
                </tr>
            </table></td>
          </tr>
        </table>
      <table cellspacing="0" class="main_button">
          <tr>
            <td align="right" ><table class="button_table" cellspacing="0">
                <tr align="right">
                  <td class="button_td" ><input type="button" name="ok" value='<%=MessageUtil.getString("form.button.ok",session) %>' class="button_normal" onclick="setValidate();window.close()">
                  </td>
                  <td class="button_td" ><input type="button" name="cancle" value='<%=MessageUtil.getString("form.button.cancel",session) %>' class="button_normal" onclick="window.close()">
                  </td>
                </tr>
            </table></td>
          </tr>
      </table></td>
  </tr>
</table>
</center>
</body>
</html>
