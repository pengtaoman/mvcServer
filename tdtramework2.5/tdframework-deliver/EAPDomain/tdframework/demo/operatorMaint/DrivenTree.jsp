<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>

<%
	String webpath=request.getContextPath();
	String requestid=request.getParameter("requestid");
%>

<html>
<head>
<title>´Ó¶¯Ê÷</title>
<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">
<script language=javascript src="<%=webpath%>/tdframework/demo/js/drivenTree.js"></script>
</head>

<body topmargin="0" leftmargin="0">
	<table>
		<tr>
 			<td class="main_table5_td1" valign="middle" nowrap> 
    			<input type="hidden"  name="requestid"  value="<%=requestid%>" />
  				<input type="text" name="driven" value=""/> 
  			</td>
  			<td class="main_table5_td1" valign="middle" nowrap> 
     			<input type="button" class="searchImgButton" onclick="openDrivenTree(this)" />
     		<%if(requestid!=null){%>
       			<unieap:innertree id="second" display="false" treeImagePath="<%=request.getContextPath()%>" requestid="requestid" laterFunction="saveDrivenTree()" />
     		<%}%>
   			</td>
		</tr>
	</table>
</body>
</html>