<%@ page contentType="text/html; charset=utf-8"%>
<%@ page import="com.neusoft.form.manage.util.MessageUtil"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>

<html>
<head>
<META HTTP-EQUIV="MSThemeCompatible" CONTENT="No">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<LINK href="unieap/pages/form/css/Style.css" rel=stylesheet>
<LINK href="unieap/pages/form/css/Style2.css" rel=stylesheet>
<SCRIPT language="JavaScript" src="unieap/pages/form/jslib/list.js" >
</SCRIPT>
<script language="javascript">
function viewFormPage()
 {
   location.href="unieap/pages/form/privilegeview.html?formID=<%=request.getAttribute("formID")%>&prvID="+getSelectedItemID();
 }
</script>

<base/>
</head>
<body bgcolor="white" onload="findSelectedItem()" background="css/images/bg.gif">

<errors/>
<form action="<%=request.getContextPath()%>/privilegeviewerturnPage.do" method="POST">
</form>
<form></form>

<form action="<%=request.getContextPath()%>/privilegeFormList.do" method="POST">

 <table cellspacing="0" class="main_list" style="margin-top:40px">

  <tr>
  <td width="2%" class="main_list_th">
    </td>
    <td width="22%" class="main_list_th">
      <%=MessageUtil.getString("form.author",session) %>
    </td>
    <td width="25%" class="main_list_th">
     <%=MessageUtil.getString("form.description",session) %>
    </td>
    <td width="25%" class="main_list_th">
     <%=MessageUtil.getString("form.creationTime",session) %>
    </td>
    <td name="description" width="25%" class="main_list_th">
      <%=MessageUtil.getString("form.modifyTime",session) %>
    </td>
  </tr>

<logic:iterate id="formPrivilege" name="privilegeList" property="privilegeList" indexId="index">
    
    <tr id="tr<%=index.intValue()%>" onclick="javascript:itemSelected(<%=index.intValue()%>)" >

    <td align="center" class="main_list_td">
      <INPUT type=radio  value="<bean:write name="formPrivilege" property="ID" filter="true"/>"
      <%if(index.intValue()==0) out.print("checked");%> name=selectedItem>
    </td>
    <td align="left" class="main_list_td">
      <bean:write name="formPrivilege" property="author"/>&nbsp;
    </td>
    <td align="left" class="main_list_td">
      <bean:write name="formPrivilege" property="description" />&nbsp;
    </td>
    <td align="left" class="main_list_td">
      <bean:write name="formPrivilege" property="creationTime"/>&nbsp;
    </td>
    <td align="left" class="main_list_td">
      <bean:write name="formPrivilege" property="modifyTime"/>&nbsp;
    </td>
  </tr>
</logic:iterate>
</table>
<table cellspacing="0" class="main_button">
  <tr>
    <td align="right" ><table class="button_table" cellspacing="0">
      <tr align="right">
      	<td class="button_td" >
        <input type="button" name="priview" value='<%=MessageUtil.getString("form.privilege.viewer",session) %>' class="button_normal" onclick="viewFormPage()"/>
        </td>
        <td class="button_td" >
        <input type="button" name="back" value='<%=MessageUtil.getString("form.privilege.returnback",session) %>' class="button_normal" onclick="javascript:history.back()"/>
        </td>      
      </tr>
    </table></td>
  </tr>
</table>
</form>
</body>
</html>
