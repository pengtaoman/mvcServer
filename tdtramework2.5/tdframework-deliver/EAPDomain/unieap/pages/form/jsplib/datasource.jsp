<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ page import="com.neusoft.unieap.form.manage.util.MessageUtil"%>

<html>
<head>
<title><bean:message bundle="formResource" key="form.privilege.setdatasource"/></title>
<META HTTP-EQUIV="MSThemeCompatible" CONTENT="No">
<meta content="text/html; charset=utf-8">
<LINK href="<%=request.getContextPath()%>/unieap/pages/form/css/Style2.css" rel=stylesheet>
<SCRIPT language="javascript" src="../jslib/datasets.js"></SCRIPT>
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
<body onload="init('leftList','rightList')">
<center>
<table border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td ><table  cellspacing="0" class="main_title_table">
      <tr>
        <td nowrap class="text_title" ><%=MessageUtil.getString("form.privilege.setdatasource",session) %></td>
        <td align="right" class="main_table2_td2">&nbsp;</td>
      </tr>
    </table>
        <table border="0" cellpadding="0" cellspacing="10" class="main_label_outline">
         <tr><td>
          <table cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <select id="leftList" MULTIPLE style="width:200px;height:200"></select>
            </td>
            <td >
                <TABLE>
                  <TR>
                    <td class="main_label_td" valign="middle" nowrap><span class="button_td">
                    <input type="button" name="addto" value='<%=MessageUtil.getString("form.datasource.add",session) %>' class="button_normal" onclick="addDataSet()">
                    <br>
                    <br>
                    </span>
                    <br>
                    <span class="button_td">
                    <input type="button" name="delfrom" value='<%=MessageUtil.getString("form.datasource.delete",session) %>' class="button_normal" onclick="removeDataSet()">
                    </span>
                    </td>
                  </TR>
                </TABLE>
             </td>
             <td>
               <select id="rightList" MULTIPLE style="width:200px;height:200"></select>
             </td>
           
           </tr>
           </table>  
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
