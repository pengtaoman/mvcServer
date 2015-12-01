<%@ page contentType="text/html; charset=GBK"%>
<%@ page import="com.neusoft.unieap.form.manage.util.MessageUtil"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<html>
<head>
<META HTTP-EQUIV="MSThemeCompatible" CONTENT="No">
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<LINK href="unieap/pages/form/css/Style.css" rel=stylesheet>
<LINK href="<%=request.getContextPath()%>/unieap/pages/form/css/Style2.css" rel=stylesheet>
<base/>
<script>
 <!--
 function gotopage(str){
  location.href=str
 }
 -->
</script>
</head>
<body  bgcolor="white" background="images/bg.gif">
  
<table cellspacing="0" class="main_list" style="margin-top:40px">

  <tr >
    <td width="4%" class="main_list_th" nowrap>
      <%=MessageUtil.getString("form.symbol",session) %>
    </td>
    <td width="4%" class="main_list_th" nowrap>
     <%=MessageUtil.getString("form.index",session) %>
    </td>
    <td width="24%" class="main_list_th" nowrap>
     <%=MessageUtil.getString("form.name",session) %>
    </td>
    <td width="22%" class="main_list_th" nowrap>
      <%=MessageUtil.getString("form.description",session) %>
    </td>
  </tr>

<logic:iterate id="uploadsAttribute" name="fileList" property="fileList" indexId="index">
    <tr id="tr<%=index.intValue()%>" name="tr<%=index.intValue()%>" >
    <td align="center" class="main_list_td" nowrap>
     <logic:equal name="uploadsAttribute" property="state" value="true">
       <img src="<%=request.getContextPath()%>/unieap/pages/form/images/true.gif"/>
     </logic:equal>
     <logic:equal name="uploadsAttribute" property="state" value="false">
       <img src="<%=request.getContextPath()%>/unieap/pages/form/images/false.gif"/>
     </logic:equal>
     <logic:equal name="uploadsAttribute" property="state" value="warning">
       <img src="<%=request.getContextPath()%>/unieap/pages/form/images/warning.gif"/>
     </logic:equal>
    </td>
    <td align="center" class="main_list_td" nowrap><%=index.intValue()+1%></td>
    <td align="left">
      <bean:write name="uploadsAttribute" property="name"/>&nbsp;
    </td>
    <td align="left" class="main_list_td" nowrap>
      <bean:write name="uploadsAttribute" property="message" />&nbsp;
    </td>
  </tr>
</logic:iterate>
</table>
<table cellspacing="0" class="main_button">
  <tr>
    <td align="right" >
    <table class="button_table" cellspacing="0">
      <tr align="right">
        <td class="button_td" >
        <input type="button" name="setprv" value='<%=MessageUtil.getString("form.button.return",session) %>' class="button_normal" onclick="gotopage('<%=request.getContextPath()%>/unieap/pages/form/import.jsp')"/>
        </td>
      </tr>
    </table>
    </td>
  </tr>
</table>


</body>
</html>


