<%@ page contentType="text/html; charset=utf-8"%>
<%@ page import="com.neusoft.unieap.form.manage.util.MessageUtil"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>

<%
String sortColumnName="";
sortColumnName=(String)request.getAttribute("sortColumnName");
String roleId =request.getParameter("form_prv_role_id");
if(sortColumnName==null)
sortColumnName="";
String buffer="";
if(request.getAttribute("isAsc")!=null)
  buffer="<img src='"+request.getContextPath()+"/unieap/pages/form/images/arrowhead_down.gif' width='7' height='7' align='absmiddle'/>";
else
  buffer="<img src='"+request.getContextPath()+"/unieap/pages/form/images/arrowhead_up.gif' width='7' height='7' align='absmiddle'/>";
%>
<html>
<head>
<META HTTP-EQUIV="MSThemeCompatible" CONTENT="No">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<LINK href="unieap/pages/form/css/Style.css" rel=stylesheet>
<LINK href="unieap/pages/form/css/Style2.css" rel=stylesheet>
<SCRIPT language="JavaScript" src="unieap/pages/form/jslib/list.js" >
</SCRIPT>
<script language="javascript">


function turnTo(total)
{
x=document.getElementById("number");
num=x.value;
var pattern=/^\d+$/
flag=pattern.test(num)
if(flag){
   if(num-total>0){
   	flag = false;
   }
}


if (flag)
 {
location.href="<%=request.getContextPath()%>/prvviewerturnPage.do?page="+num+"&isNowSession='true'&form_prv_role_id=<%=roleId%>";
 }

else{

 var msg = '<%=MessageUtil.getString("form.turnpage.error",session) %>'+"(1-"+total+")£¡";
 /*var styles="dialogWidth:426px;dialogHeight:240px;help:no;status:no;resizable:no"
 window.showModalDialog("<%=request.getContextPath()%>/unieap/pages/form/formErrorPage.jsp",msg,styles);*/
 alert(msg);
 num="";
}
}

function doSort(sortColumnName)
{
location.href="<%=request.getContextPath()%>/formviewerByrole.do?sortColumnName="+sortColumnName+"&isNowSession='true'&form_prv_role_id=<%=roleId%>";
}

function toPrivilegeList(){
var formID = getSelectedItemID();
if(formID==null){
var msg = '<%=MessageUtil.getString("form.error.noform",session) %>';
/*var styles="dialogWidth:426px;dialogHeight:240px;help:no;status:no;resizable:no"
window.showModalDialog("<%=request.getContextPath()%>/unieap/pages/form/formWarnPage.jsp",msg,styles);*/
alert(msg);
return;
}

location.href="<%=request.getContextPath()%>/prvbyrolefrmlist.do?formID="+getSelectedItemID()+"&form_prv_role_id=<%=roleId%>";
}

function goToPage(pageCode){

location.href="<%=request.getContextPath()%>/prvviewerturnPage.do?page="+pageCode+"&isNowSession='true'&form_prv_role_id=<%=roleId%>";
}

function gotoTurnTo(total){
  if(event.keyCode == 13){
  event.keyCode = 9;
  //turnTo(total,sortName)
 }
}

function displayPurviewInfo(role){
   var id=role.id;
   location.href="<%=request.getContextPath()%>/formviewerByrole.do?form_prv_role_id="+id;
}
</script>

<base/>
</head>
<body bgcolor="white" onload="findSelectedItem()" background="images/bg.gif">

<errors/>
<form action="<%=request.getContextPath()%>/prvviewerturnPage.do" method="POST">
</form>
<form></form>

<form action="<%=request.getContextPath()%>/formviewerByrole.do" method="POST">

<table cellspacing="0" class="main_list" style="margin-top:40px">
  <tr >
    <td width="2%" class="main_list_th" nowrap>
    </td>
    <td width="24%" onclick="doSort('name')" class="main_list_th" style="cursor:hand" nowrap>
      <%=MessageUtil.getString("form.name",session) %><%if(sortColumnName.equals("name"))out.print(buffer);%>     
    </td>
    <td name="description" width="24%" onclick="doSort('description')" class="main_list_th" style="cursor:hand" nowrap>
      <%=MessageUtil.getString("form.description",session) %><%if(sortColumnName.equals("description"))out.print(buffer);%>
    </td>
    <td  width="10%" onclick="doSort('author')" class="main_list_th" style="cursor:hand" nowrap>
      <%=MessageUtil.getString("form.author",session) %><%if(sortColumnName.equals("author"))out.print(buffer);%>
    </td>
    <td  width="10%" onclick="doSort('category')" class="main_list_th" style="cursor:hand" nowrap>
      <%=MessageUtil.getString("form.category",session) %><%if(sortColumnName.equals("category"))out.print(buffer);%>
    </td>
    <td width="20%" onclick="doSort('creationTime')"  class="main_list_th" style="cursor:hand" nowrap>
      <%=MessageUtil.getString("form.creationTime",session) %><%if(sortColumnName.equals("creationTime"))out.print(buffer);%>
    </td>
    <td width="20%" onclick="doSort('modifyTime')" class="main_list_th" style="cursor:hand" nowrap>
      <%=MessageUtil.getString("form.modifyTime",session) %><%if(sortColumnName.equals("modifyTime"))out.print(buffer);%>
    </td>
  </tr>

<logic:iterate id="formdef" name="formList" property="formList" indexId="index">

    <tr id="tr<%=index.intValue()%>" onclick="javascript:itemSelected(<%=index.intValue()%>)" >

    <td align="center" class="main_list_td" nowrap>
      <INPUT type=radio  value="<bean:write name="formdef" property="ID" filter="true"/>"
      <%if(index.intValue()==0) out.print("checked");%> name=selectedItem>
    </td>
    <td align="left" class="main_list_td" nowrap>
      <bean:write name="formdef" property="name" filter="true"/>&nbsp;
    </td>
    <td align="left" class="main_list_td" nowrap>
      <bean:write name="formdef" property="description" filter="true"/>&nbsp;
    </td>
    <td align="left" class="main_list_td" nowrap>
      <bean:write name="formdef" property="author"/>&nbsp;
    </td>
    <td align="left" class="main_list_td" nowrap>
      <bean:write name="formdef" property="category"/>&nbsp;
    </td>
    <td align="left" class="main_list_td" nowrap>
      <bean:write name="formdef" property="creationTime"/>&nbsp;
    </td>
    <td align="left" class="main_list_td" nowrap>
      <bean:write name="formdef" property="modifyTime"/>&nbsp;
    </td>
  </tr>
</logic:iterate>

</table>
<table cellspacing="0" class="main_button">
  <tr>
    <td ><table  cellspacing="0" class="icon_table " >
      <tr>
        <td class="icon_td" >
        <logic:equal name="pageController" property="hasPrevious" value="true">
          <a href="#"><img src="<%=request.getContextPath()%>/unieap/pages/form/images/button/top.gif" width="22" height="22" border="0" alt='<%=MessageUtil.getString("form.turnpage.first",session) %>' onclick='javascript:goToPage(1)'></a>
 		</logic:equal>
 		<logic:equal name="pageController" property="hasPrevious" value="false">
		<a href="#"><img src="<%=request.getContextPath()%>/unieap/pages/form/images/button/top2.gif" width="22" height="22" border="0" alt='<%=MessageUtil.getString("form.turnpage.first",session) %>'></a>
		</logic:equal>
        </td>
        <td class="icon_td" >
        <logic:equal name="pageController" property="hasPrevious" value="true">
		 <a href="#">
         <img src="<%=request.getContextPath()%>/unieap/pages/form/images/button/up.gif" width="22" height="22" border="0" alt='<%=MessageUtil.getString("form.turnpage.previous",session) %>' onclick='javascript:goToPage(<bean:write name="pageController" property="previousPage"/>)'>
         </a>
		</logic:equal>
		<logic:equal name="pageController" property="hasPrevious" value="false">
         <a href="#"><img src="<%=request.getContextPath()%>/unieap/pages/form/images/button/up2.gif" width="22" height="22" border="0" alt='<%=MessageUtil.getString("form.turnpage.previous",session) %>'></a>
		</logic:equal>
        </td>
        <td class="page_number" nowrap align="center">
          <bean:write name="pageController" property="currentPage"/>/<bean:write name="pageController" property="totalPages"/>
        </td>
        <td class="icon_td" >
        <logic:equal name="pageController" property="hasNext" value="true">
		<a href="#">
        <img src="<%=request.getContextPath()%>/unieap/pages/form/images/button/down.gif" width="22" height="22" border="0" alt='<%=MessageUtil.getString("form.turnpage.next",session) %>' onclick='javascript:goToPage(<bean:write name="pageController" property="nextPage"/>)'>
        </a>
		</logic:equal>
		<logic:equal name="pageController" property="hasNext" value="false">
        <a href="#"><img src="<%=request.getContextPath()%>/unieap/pages/form/images/button/down2.gif" width="22" height="22" border="0" alt='<%=MessageUtil.getString("form.turnpage.next",session) %>'></a>
		</logic:equal>
        </td>
		
        <td class="icon_td" >
        <logic:equal name="pageController" property="hasNext" value="true">
		<a href="#">
        <img src="<%=request.getContextPath()%>/unieap/pages/form/images/button/bottom.gif" width="22" height="22" border="0" alt='<%=MessageUtil.getString("form.turnpage.last",session) %>' onclick='javascript:goToPage(<bean:write name="pageController" property="totalPages"/>)'>
        </a>
		</logic:equal>
		<logic:equal name="pageController" property="hasNext" value="false">
        <a href="#"><img src="<%=request.getContextPath()%>/unieap/pages/form/images/button/bottom2.gif" width="22" height="22" border="0" alt='<%=MessageUtil.getString("form.turnpage.last",session) %>'></a>
		</logic:equal>     
        </td>
        <td nowrap  >
          <span class="page_number">
          <input id="number" type="text" name="no" onmouseover="this.onfocus()" onfocus="this.select()" class="input_goto" value="<bean:write name="pageController" property="currentPage"/>" size="2">
          <logic:equal name="pageController" property="onlyPage" value="false">
          <a href="#"><img src="<%=request.getContextPath()%>/unieap/pages/form/images/button/back.gif" alt='<%=MessageUtil.getString("form.turnpage.first",session) %>' onclick="turnTo('<bean:write name="pageController" property="totalPages"/>')" width="22" height="22" border="0" align="absmiddle"></a>
          </logic:equal>
          <logic:equal name="pageController" property="onlyPage" value="true">
           <a href="#"><img src="<%=request.getContextPath()%>/unieap/pages/form/images/button/back2.gif" alt='<%=MessageUtil.getString("form.turnpage.first",session) %>' width="22" height="22" border="0" align="absmiddle"></a>
          </logic:equal><%=MessageUtil.getString("form.turnpage.total",session) %><bean:write name="pageController" property="totalRowsAmount"/><%=MessageUtil.getString("form.turnpage.records",session) %>
          </span>
        </td>          
          
        </tr>
    </table></td>
    <td align="right" ><table class="button_table" cellspacing="0">
      <tr align="right">
        <td class="button_td" >
        <logic:equal name="pageController" property="hasData" value="true">
        <input type="button" name="setprv" value='<%=MessageUtil.getString("form.privilege.viewer",session) %>' class="button_normal" onclick="javascript:toPrivilegeList()"/>
        </logic:equal>
        <logic:equal name="pageController" property="hasData" value="false">
        <input type="button" name="setprv" value='<%=MessageUtil.getString("form.privilege.viewer",session) %>' class="button_normal" />
        </logic:equal>
        </td>
      </tr>
    </table></td>
  </tr>
</table>

</form>
</body>
</html>
