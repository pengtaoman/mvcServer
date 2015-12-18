<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om"%>	

<%
	String webpath = request.getContextPath();	
	String message = (String)request.getAttribute("message");	
	String batchNo = NullProcessUtil.nvlToString((String)request.getAttribute("batchNo"),"");
%>

<html>
<head>

<title>批量导入测试页面</title>

<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<meta http-equiv="MSThemeCompatible" content="no" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="-1" />
<meta http-equiv="Cache-Control" content="no-cache" />

<contextPath value="<%=webpath%>"/>

<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">

<script language="javascript" src="<%=webpath%>/common/js/td_common.js"> </script>
<script language="javascript" src="<%=webpath%>/tdframework/demo/js/queryStatusInfo.js"></script>

</head>

<body onload="" class="mainBody">
	<form name="myform" method="post" action="">
		<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
			<tr class="tableTitleTR2">
				<td colspan="4" >
					<table width="100%" border="0" cellpadding="0" cellspacing="0" >
               	 		<tr>
							<td class="tableTitleLeft2" >&#160;</td>
							<td class="tableTitle2">导入文件状态查询</td>
							<td class="tableTitleRight2" >&#160;</td>
						</tr>
					</table>
			 	</td>
			</tr>
        	<tr> 
           		<td class="formTableL" >&#160;
           			<input type="hidden" name="showAlert" value="<%=message%>">
           		</td>
           		<td class="formTableC">		 	 			
					<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
						<tr>
							<td align="center" class="formLabel">操作人员登录帐号</td>
							<td align="center" class="formField" >
								<input type="text" name="workNo" value=""/>
							</td>
							<td align="center" class="formLabel" >导入文件状态&#160;&#160;</td>
							<td align="left" class="formField" >
								<select name="fileStatus">
									<option value="" selected>&#160;</option>
									<option value="0">未处理</option>
									<option value="1">正在处理</option>
									<option value="2">处理完成</option>
								</select>
							</td>
						</tr>
						<tr>
							<td align="center" class="formLabel">导入文件的批次号</td>
							<td align="center" class="formField" >
								<input type="text" name="batchNo" value=""/>
							</td>
							<td align="left" class="formField" colspan="2">&#160;&#160;</td>
						</tr>		
					</table>
				</td>
           		<td class="formTableR" >&#160;</td>
         	</tr> 
		 	<tr> 
		    	<td class="formTableLB">&#160;</td>
		   		<td class="formTableB">&#160;</td>
		   		<td class="formTableRB">&#160;</td>
	     	</tr>        
		</table>				 
		<div class="formButtonDIV" id="filebutton" style="display:block"> 
			<button class="formButton"  onclick="queryStatus()">查 询</button>
		</div>		
	</form>
</body>
</html>
