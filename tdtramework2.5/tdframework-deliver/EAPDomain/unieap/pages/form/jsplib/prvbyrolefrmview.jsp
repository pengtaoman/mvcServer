<%@ page contentType="text/html; charset=utf-8"%>
<%@ page import="com.neusoft.unieap.form.manage.util.MessageUtil"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>

<html>
<head>
<META HTTP-EQUIV="MSThemeCompatible" CONTENT="No">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<LINK href="unieap/pages/form/css/Style.css" rel=stylesheet>
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
<body bgcolor="white" onload="findSelectedItem()" background="images/bg.gif">

<errors/>
<form action="<%=request.getContextPath()%>/privilegeviewerturnPage.do" method="POST">
</form>
<form></form>

<form action="<%=request.getContextPath()%>/privilegeFormList.do" method="POST">

 <table border="1" align="center"  bordercolordark="#FFFFFF" bordercolorlight="#cccccc" cellpadding="2"

cellspacing="0" width="95%" class="T_song12bk2" style="margin-top:25px">

  <tr class=th>
  <th align="center" width="5%">
    </th>
    <th align="center" width="20%" class="T_song12wt2">
      <%=MessageUtil.getString("form.name",session) %>
    </th>
    <th align="center" width="25%" class="T_song12wt2">
     <%=MessageUtil.getString("form.description",session) %>
    </th>
    <th align="center" width="25%" class="T_song12wt2">
     <%=MessageUtil.getString("form.creationTime",session) %>
    </th>
    <th name="description" align="center" width="25%" class="T_song12wt2">
      <%=MessageUtil.getString("form.modifyTime",session) %>
    </th>
  </tr>

<logic:iterate id="formPrivilege" name="privilegeList" property="privilegeList" indexId="index">
    
    <tr class=td<%=((index.intValue()%2)*2+2)%>  id="tr<%=index.intValue()%>"

onmouseover="javascript:itemMouseOver(<%=index.intValue()%>)"

onclick="javascript:itemSelected(<%=index.intValue()%>)"

onmouseout="javascript:itemMouseOut(<%=index.intValue()%>)" name="tr<%=index.intValue()%>"

height=18>

    <td align="center">
      <INPUT type=radio  value="<bean:write name="formPrivilege" property="ID" filter="true"/>"
      <%if(index.intValue()==0) out.print("checked");%> name=selectedItem>
    </td>
    <td align="left">
      <bean:write name="formPrivilege" property="author"/>&nbsp;
    </td>
    <td align="left">
      <bean:write name="formPrivilege" property="description" />&nbsp;
    </td>
    <td align="left">
      <bean:write name="formPrivilege" property="creationTime"/>&nbsp;
    </td>
    <td align="left">
      <bean:write name="formPrivilege" property="modifyTime"/>&nbsp;
    </td>
  </tr>
</logic:iterate>
</table>

<table width="95%" border="0" cellpadding="0" cellspacing="0" height="48"
class="T_song12bk1" align="center">
<tr valign="middle"> 
<td align="right">
<img src="<%=request.getContextPath()%>/unieap/pages/form/images/button_priview.gif" onclick="viewFormPage()"/>
<img src="<%=request.getContextPath()%>/unieap/pages/form/images/button_back.gif" onclick="javascript:history.back()"/>

</td>
</tr>
</table>
</form>
</body>
</html>

