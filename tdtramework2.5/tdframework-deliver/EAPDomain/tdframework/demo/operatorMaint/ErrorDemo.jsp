<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page import="com.neusoft.tdframework.common.util.HttpObjectUtil" %>
<%@ page import="com.neusoft.tdframework.error.dao.ErrorVO" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>

<%
	String error_info = "";
	String error_code = "";
	
	String webpath = request.getContextPath();
	String message = (String)request.getAttribute("ErrorMessage");
	
	ErrorVO vo = (ErrorVO)request.getAttribute("errorVO");

	if(vo != null){
	    error_info = vo.getError_info();
	    error_code = String.valueOf(vo.getError_code());
	}
%>

<html>
<head>
<base target="_self">
<title>ErrorDemo</title>

<contextPath value="<%=webpath%>"/>

<meta http-equiv="Content-Type" content="text/html; charset=gbk">
<meta http-equiv="MSThemeCompatible" content="no" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="-1" />
<meta http-equiv="Cache-Control" content="no-cache" />

<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">  

<script  language=javascript src="<%=webpath%>/tdframework/demo/js/errorDemo.js"></script>
<script language="javascript" src="<%=webpath%>/common/js/td_common.js" ></script>

</head>

<body class="mainBody" onload="init();" >
	<unieap:form action="demoErrorAction.do?method=showAll">
    	<table cellspacing="0"  border="0" class="formTable" >
			<tr class="tableTitleTR2" > 
            	<td colspan="3" >
					<table width="100%" border="0" cellpadding="0" cellspacing="0" >
                    	<tr>
							<td class="tableTitleLeft2" >&#160;</td>
							<td class="tableTitle2">ErorDemo</td>
							<td class="tableTitleRight2" >&#160;</td>
			   			</tr>
					</table>
             	</td>
             </tr>
	         <tr> 
	         	<td valign="middle" nowrap colspan="3" align="center"> 
	            	<table  cellspacing="0" border="0" class="formTableCore">
	                	<tr> 
	                    	<td class="formLabel" width="30%" align="left">请选择错误号:<span class="formRequested" >*</span></td>
	                    	<td class="formField" width="20%" align="left"> 
	                      		<select name="error_code" onchange="query()">
	                         		<option value="" selected><%=error_code%></option>
	                        	 	<option value="1">1</option>
	                         		<option value="2">2</option>
	                         		<option value="3">3</option>
	                         		<option value="4">4</option>
	                         		<option value="5">5</option>
	                      		</select>
	                    	</td>      
	                    	<td class="formLabel" width="50%">&#160;&#160;</td>              
	                  	</tr>
	             	</table>
	        	</td>
	        </tr>
            <tr> 
				 <td width="50%"><input type="hidden" name="path" value="<%=webpath%>"></td>
			     <td width="50%"><input type="hidden" name="open" value="<%=message%>"></td>
			</tr>
			<tr><td colspan="3">&#160;</td></tr>
			<tr> 
				<td align="center" colspan="3">对应的错误信息:</td>
			</tr>
			<tr><td colspan="3">&#160;</td></tr>
			<tr>
				 <td align="center" colspan="3">
			     	<input name="error_info" type="text" size="25" value="<%=error_info%>"/>
			     </td>
			</tr>
       	</table>
        <div class="formButtonDIV">
	    	<button  class="formButton" name="" id="queryAll" disabled="true" onclick="showAll()">查 询 全 部</button>
	  	</div>
    	<div id="showAllErrorInfo" style="display:block;"></div>
	</unieap:form>  
</body>
</html>