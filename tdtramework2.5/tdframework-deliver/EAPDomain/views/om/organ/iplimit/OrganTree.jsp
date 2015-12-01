<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ page import="java.util.Vector"%>
<%
String webpath=request.getContextPath();
Vector organTree=(Vector)request.getAttribute("organTree");
String organId = (String)request.getAttribute("organId");
String organName = (String) request.getAttribute("organName");
%>
<html>
<head>
<title>´Ó¶¯Ê÷</title>
<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">
<script language="javascript">
function openOrganTree(obj){
   var rqid = document.all("organId").value;
   if(rqid==null){
     return;
   }
   showTree_second(obj,'NULL','organName');
}
function init(){
	var organName = document.getElementById("organName").value;
	if(organName=="null"){
		document.getElementById("organName").value= "";
		document.getElementById("organName").readOnly="true";
	}
}
</script>
</head>
<body topmargin="0" leftmargin="0" onload="init()">
<table>
<tr>
  <td class="main_table5_td1" valign="middle" nowrap> 
    <input type="hidden"  id="organId" name="organId"  value="<%=organId%>" />
  	<input type="text" name="organName" value="<%=organName %>"/> 
  </td>
  <td class="main_table5_td1" valign="middle" nowrap> 
      
     <%if(organTree!=null && organTree.size() != 0){   %>
     	
       <unieap:innertree requestid="organTree" id="organTree" display="true" buttonCssClass="searchImgButton" 
            valueBackInput="organId" textBackInput="organName" multiSelect="false"  treeImagePath="<%=webpath%>" />
     <%}%>
   </td>
</tr>
</table>
</body>
</html>
