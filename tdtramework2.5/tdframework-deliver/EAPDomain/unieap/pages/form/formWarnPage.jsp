<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>

<html> 
<head>
<title><bean:message bundle="formResource" key="form.privilege.new"/></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<LINK href="<%=request.getContextPath()%>/unieap/pages/form/css/Style2.css" rel=stylesheet>
<STYLE>
label{
    font: 12px ;
    font-family: Verdana, Arial, "ËÎÌå";
    color: #000000;
	text-decoration: none;
	margin-left: 0px;
}
</STYLE>
</head>
<body onload="initMsg()">
<center>
<table border="0" cellpadding="0"   cellspacing="0">
  <tr>
    <td ><table  cellspacing="0" class="main_title_table">
      <tr>
        <td nowrap class="text_title" ></td>
        </tr>
    </table>
        <table width="366" height="119" border="0" cellpadding="0" cellspacing="0" class="warn_bg">
          <tr>
            <td align="center"><table border="0" cellpadding="0" cellspacing="0" class="table_base">
              <tr>
                <td width="50" height="50"><img src="<%=request.getContextPath()%>/unieap/pages/form/css/images/icon/j1.gif" width="33" height="33"/></td>
                <td nowrap><label class="input_text" id="msg"></label></td>
                </tr>
            </table></td>
          </tr>
        </table>
        <table cellspacing="0" class="main_button">
          <tr>
            <td align="right" ><table class="button_table" cellspacing="0">
                <tr align="right">
                  <td class="button_td" ><input name="close" type="button" class="button_normal" value="¹Ø±Õ" onclick="window.close()"/>
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
<script>
<!--
var Handlder= {
                  msg : null
               }
 function initMsg()
  {
       Handlder.msg = document.getElementById("msg");
       Handlder.msg.innerHTML = window.dialogArguments;
     
  }
-->
</script>
