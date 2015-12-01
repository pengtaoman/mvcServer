<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page import="java.lang.*,java.util.*" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>

<%
	String webpath = request.getContextPath();
%>

<html>
<head>

<title></title>

<link  rel="stylesheet" href="<%=webpath%>/unieap/css/UniEAP.css" type="text/css"></link>
<link href="<%=webpath%>/unieap/css/standard/Style.css" rel=stylesheet> 

<unieap:base/>

<script type="text/javascript" src="<%=webpath%>/unieap/js/tab/tabApi.js"></script>
<script  language=javascript src="<%=webpath%>/tdframework/demo/js/tab2.js"></script>

</head>
  
<body class="main_body_bg" leftmargin="20" onload="init();">

<%
	HashMap president = (HashMap)request.getAttribute("president");
	String term = president.get("term").toString();
	System.out.println("term="+term);
%>
	<unieap:form action="null" >
		<table bordercolordark="#FFFFFF" bordercolorlight="#E8E8E8" cellspacing="0"  class="main_table3_4" border="0" width="95%" align="left">
	    	<tr> 
	        	<td class="main_table3_3_td" valign="middle" nowrap width="80"> 
	            	<table cellspacing="0" class="main_table5">
	                	<tr> 
	                    	<td class="main_table5_td1" valign="middle" nowrap> &nbspTerm</td>
	                    	<td class="main_table5_td1" valign="middle" nowrap> 
	                        	<unieap:input tcname="Text" id="term" name="term" prompt="昵称" isnullable="false" tooltip="nickname" value='<%=term%>'/>*
	                    	</td>
	                    	<td class="main_table5_td1" valign="middle" nowrap> &nbsp;部门&nbsp;&nbsp;&nbsp;</td>
	                    	<td class="main_table5_td1" valign="middle" nowrap> 
	                       		<unieap:input tcname="Text" id="deptname" name="deptname" prompt="部门" isnullable="false" onkeydown=" foucsto()"/>*
	                   	 	</td>
	                  	</tr>
	             	</table>
	        	</td>
	    	</tr>
		</table>
	</unieap:form>   
</body>
</html>