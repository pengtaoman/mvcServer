<%@ page contentType="text/html; charset=utf-8"%>
<%@ page import="com.neusoft.unieap.form.manage.util.MessageUtil"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<html> 
<head>
<title><bean:message bundle="formResource" key="form.privilege.otherset"/></title>
<META HTTP-EQUIV="MSThemeCompatible" CONTENT="No">
<meta content="text/html; charset=utf-8">
<LINK href="<%=request.getContextPath()%>/unieap/pages/form/css/Style2.css" rel=stylesheet>
<style type="text/css">
<!--
 body{
   margin-left:0px;
   margin-right:0px;
   margin-top:0px;
   margin-bottom:0px;
 }
-->
</style>
</head>
<body onload="init('author','description')">
<center>
<table border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td ><table  cellspacing="0" class="main_title_table">
      <tr>
        <td nowrap class="text_title" ><%=MessageUtil.getString("form.othersets.title",session) %></td>
        <td align="right" class="main_table2_td2">&nbsp;</td>
      </tr>
    </table>
        <table border="0" cellpadding="0" cellspacing="10" class="main_label_outline">
          <tr>
            <td><table cellspacing="0"   class="main_label_table">
            	<tr>
                  <td class="main_label_td" valign="middle" nowrap> <%=MessageUtil.getString("form.author",session) %>£º</td>
                  <td class="main_label_td" valign="middle" nowrap><input type="text" id="author" maxlength="32"/>
	              </td>
                </tr>
                <tr>
                  <td class="main_label_td" valign="middle" nowrap> <%=MessageUtil.getString("form.description",session) %>£º</td>
                  <td class="main_label_td" valign="middle" nowrap><input type="text" id="description" maxlength="32"/>
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
                  <td class="button_td" ><input type="button" name="cancle" value=<%=MessageUtil.getString("form.button.cancel",session) %> class="button_normal" onclick="window.close()">
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
                  author : null,
                  description : null
               }
 function init(authorid,descriptionid)
  {
    var args = window.dialogArguments
    if(args==null)
      return;
    var author_text = args[0]
    var descri_text = args[1]
    Handlder.author = document.getElementById(authorid)
    Handlder.description = document.getElementById(descriptionid)
    Handlder.author.value        = author_text
    Handlder.description.value   = descri_text
  }
  
 function setValidate()
  {
    var returnV = new Array()
    returnV[0] = Handlder.author.value
    returnV[1] = Handlder.description.value
    window.returnValue = returnV
  }
-->
</SCRIPT>
