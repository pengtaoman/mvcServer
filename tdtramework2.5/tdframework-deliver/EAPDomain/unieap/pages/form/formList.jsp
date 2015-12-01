<%@ page contentType="text/html; charset=utf-8"%>
<%@ page import="com.neusoft.form.manage.util.MessageUtil"%>
<%@ taglib uri="/WEB-INF/taglib/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/taglib/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/taglib/struts-logic.tld" prefix="logic" %>
<%
String sortColumnName="";
sortColumnName=(String)request.getAttribute("sortColumnName");
if(sortColumnName==null){
sortColumnName="";
}
String buffer="";
if(request.getAttribute("isAsc")!=null)
  buffer="<img src='"+request.getContextPath()+"/unieap/pages/form/css/images/arrowhead_down.gif' width='7' height='7' align='absmiddle'/>";
else
  buffer="<img src='"+request.getContextPath()+"/unieap/pages/form/css/images/arrowhead_up.gif' width='7' height='7' align='absmiddle'/>";
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

function toImport(){

   location.href="<%=request.getContextPath()%>/unieap/pages/form/import.jsp";
   //var styles="dialogWidth:360px;dialogHeight:400px;help:no;status:no;resizable:no"
   //window.showModalDialog("<%=request.getContextPath()%>/unieap/pages/form/import.jsp",window,styles);
}
function deleteForm(){

   if(confirm("\u662f\u5426\u5220\u9664\uff1f"))
      location.href="<%=request.getContextPath()%>/formManage.do?command=remove&formId="+getSelectedItemID()+"&isNowSession='true'";
}

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

location.href="<%=request.getContextPath()%>/turnPage.do?page="+num+"&isNowSession='true'";
 }

else{

 alert('<%=MessageUtil.getString("form.turnpage.error",session) %>'+'(1-'+total+')£¡')
 num="";
}
}

function doSort(sortColumnName)
{

   //document.forms[2].sortColumnName.value = sortColumnName;
   //document.forms[2].submit();
   location.href="<%=request.getContextPath()%>/formList.do?sortColumnName="+sortColumnName+"&isNowSession='true'";
   //isNowSession only a flag,
}

function goToPage(pageCode){

location.href="<%=request.getContextPath()%>/turnPage.do?page="+pageCode+"&isNowSession=true";
}

function gotoTurnTo(total,sortName){

  if(event.keyCode == 13){
  event.keyCode = 9;
 }
}
</script>

<base/>
</head>
<body  bgcolor="white" onload="findSelectedItem()" background="css/images/bg.gif">

<errors/>
<form action="<%=request.getContextPath()%>/turnPage.do" method="POST">
</form>
<form action="<%=request.getContextPath()%>/formManage.do" method="POST">
</form>

<form action="<%=request.getContextPath()%>/formList.do" method="POST">

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
          <a href="#"><img src="<%=request.getContextPath()%>/unieap/pages/form/css/images/button/top.gif" width="22" height="22" border="0" alt='<%=MessageUtil.getString("form.turnpage.first",session) %>' onclick='javascript:goToPage(1)'></a>
 		</logic:equal>
 		 <logic:equal name="pageController" property="hasPrevious" value="false">
		<a href="#"><img src="<%=request.getContextPath()%>/unieap/pages/form/css/images/button/top2.gif" width="22" height="22" border="0" alt='<%=MessageUtil.getString("form.turnpage.first",session) %>'></a>
		</logic:equal>
        </td>
        <td class="icon_td" >
        <logic:equal name="pageController" property="hasPrevious" value="true">
		 <a href="#">
         <img src="<%=request.getContextPath()%>/unieap/pages/form/css/images/button/up.gif" width="22" height="22" border="0" alt='<%=MessageUtil.getString("form.turnpage.previous",session) %>' onclick='javascript:goToPage(<bean:write name="pageController" property="previousPage"/>)'>
         </a>
		</logic:equal>
		<logic:equal name="pageController" property="hasPrevious" value="false">
         <a href="#"><img src="<%=request.getContextPath()%>/unieap/pages/form/css/images/button/up2.gif" width="22" height="22" border="0" alt='<%=MessageUtil.getString("form.turnpage.previous",session) %>'></a>
		</logic:equal>
        </td>
        <td class="page_number" nowrap align="center">
          <bean:write name="pageController" property="currentPage"/>/<bean:write name="pageController" property="totalPages"/>
        </td>
        <td class="icon_td" >
        <logic:equal name="pageController" property="hasNext" value="true">
		<a href="#">
        <img src="<%=request.getContextPath()%>/unieap/pages/form/css/images/button/down.gif" width="22" height="22" border="0" alt='<%=MessageUtil.getString("form.turnpage.next",session) %>' onclick='javascript:goToPage(<bean:write name="pageController" property="nextPage"/>)'>
        </a>
		</logic:equal>
		<logic:equal name="pageController" property="hasNext" value="false">
        <a href="#"><img src="<%=request.getContextPath()%>/unieap/pages/form/css/images/button/down2.gif" width="22" height="22" border="0" alt='<%=MessageUtil.getString("form.turnpage.next",session) %>'></a>
		</logic:equal>
        </td>
		
        <td class="icon_td" >
        <logic:equal name="pageController" property="hasNext" value="true">
		<a href="#">
        <img src="<%=request.getContextPath()%>/unieap/pages/form/css/images/button/bottom.gif" width="22" height="22" border="0" alt='<%=MessageUtil.getString("form.turnpage.last",session) %>' onclick='javascript:goToPage(<bean:write name="pageController" property="totalPages"/>)'>
        </a>
		</logic:equal>
		<logic:equal name="pageController" property="hasNext" value="false">
        <a href="#"><img src="<%=request.getContextPath()%>/unieap/pages/form/css/images/button/bottom2.gif" width="22" height="22" border="0" alt='<%=MessageUtil.getString("form.turnpage.last",session) %>'></a>
		</logic:equal>     
        </td>
        <td nowrap  >
          <span class="page_number">
          <input id="number" type="text" name="no" onmouseover="this.onfocus()" onfocus="this.select()" class="input_goto" value="<bean:write name="pageController" property="currentPage"/>" size="2">
          <logic:equal name="pageController" property="onlyPage" value="false">
          <a href="#"><img src="<%=request.getContextPath()%>/unieap/pages/form/css/images/button/back.gif" alt='<%=MessageUtil.getString("form.turnpage.first",session) %>' onclick="turnTo('<bean:write name="pageController" property="totalPages"/>')" width="22" height="22" border="0" align="absmiddle"></a>
          </logic:equal>
          <logic:equal name="pageController" property="onlyPage" value="true">
           <a href="#"><img src="<%=request.getContextPath()%>/unieap/pages/form/css/images/button/back2.gif" alt='<%=MessageUtil.getString("form.turnpage.first",session) %>' width="22" height="22" border="0" align="absmiddle"></a>
          </logic:equal><%=MessageUtil.getString("form.turnpage.total",session) %><bean:write name="pageController" property="totalRowsAmount"/><%=MessageUtil.getString("form.turnpage.records",session) %>
          </span>
        </td>          
        </tr>
    </table></td>
    <td align="right" ><table class="button_table" cellspacing="0">
      <tr align="right">
        <td class="button_td" >
           <input type="button" name="setprv" value='<%=MessageUtil.getString("form.privilege.new",session) %>' class="button_normal" onclick="javascript:toImport();"/>
        </td>
        <logic:equal name="pageController" property="hasData" value="true">
         <td class="button_td" >
           <input type="button" name="setprv" value='<%=MessageUtil.getString("form.privilege.delete",session) %>' class="button_normal" onclick="deleteForm()"/>
         </td>
        </logic:equal>
      </tr>
    </table></td>
  </tr>
</table>

<input TYPE="hidden" NAME="sortColumnName" VALUE="<%=sortColumnName%>">
</form>
</body>
</html>


