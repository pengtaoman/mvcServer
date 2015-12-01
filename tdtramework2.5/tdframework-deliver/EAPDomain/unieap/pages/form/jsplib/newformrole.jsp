<%@ page contentType="text/html; charset=utf-8"%>
<%@ page import="com.neusoft.unieap.form.manage.util.MessageUtil"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<html> 
<head>
<title><bean:message bundle="formResource" key="form.privilege.new"/></title>
<META HTTP-EQUIV="MSThemeCompatible" CONTENT="No">
<meta content="text/html; charset=utf-8">
<LINK href="<%=request.getContextPath()%>/unieap/pages/form/css/Style2.css" rel=stylesheet>
</head>
<body onload="init('newname')">
<center>
<table border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td ><table  cellspacing="0" class="main_title_table">
      <tr>
        <td nowrap class="text_title" ><%=MessageUtil.getString("form.role.new",session) %></td>
        <td align="right" class="main_table2_td2">&nbsp;</td>
      </tr>
    </table>
        <table border="0" cellpadding="0" cellspacing="10" class="main_label_outline">
          <tr>
            <td><table cellspacing="0"   class="main_label_table">
                <tr>
                  <td class="main_label_td" valign="middle" nowrap> <bean:message bundle="formResource" key="form.name"/>£º</td>
                  <td class="main_label_td" valign="middle" nowrap><input type="text" name="newname" maxlength="32"/>
                  </td>
                </tr>

            </table></td>
          </tr>
        </table>
      <table cellspacing="0" class="main_button">
          <tr>
            <td align="right" ><table class="button_table" cellspacing="0">
                <tr align="right">
                  <td class="button_td" ><input type="button" name="ok" value='<%=MessageUtil.getString("form.button.ok",session) %>' class="button_normal" onclick="setValidate();">
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
<SCRIPT>
<!--
 var Handlder= {
                  newname : null
               }
 function init(newname)
  {
    Handlder.newname = document.getElementById(newname)
  }
  
 function setValidate()
  {
    var valid = true;
    if(Handlder.newname.value.indexOf(">")!=-1)
     {
       valid = false;
     }
    else if(Handlder.newname.value.indexOf("<")!=-1)
     {
       valid = false;
     }
    else if(Handlder.newname.value.indexOf("&")!=-1)
     {
       valid = false;
     }
    if(!valid)
     {
       var msg = '<%=MessageUtil.getString("form.name.error",session) %>';
       /*var styles="dialogWidth:426px;dialogHeight:240px;help:no;status:no;resizable:no"
       window.showModalDialog("formWarnPage.jsp",msg,styles);*/
       alert(msg);
       return false;
     }
    else
     {
       window.returnValue = Handlder.newname.value;
       window.close();
     }
  }
-->
</SCRIPT>
