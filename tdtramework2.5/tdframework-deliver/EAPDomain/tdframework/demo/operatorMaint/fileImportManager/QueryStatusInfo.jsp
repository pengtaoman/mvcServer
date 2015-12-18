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

<title>�����������ҳ��</title>

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
							<td class="tableTitle2">�����ļ�״̬��ѯ</td>
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
							<td align="center" class="formLabel">������Ա��¼�ʺ�</td>
							<td align="center" class="formField" >
								<input type="text" name="workNo" value=""/>
							</td>
							<td align="center" class="formLabel" >�����ļ�״̬&#160;&#160;</td>
							<td align="left" class="formField" >
								<select name="fileStatus">
									<option value="" selected>&#160;</option>
									<option value="0">δ����</option>
									<option value="1">���ڴ���</option>
									<option value="2">�������</option>
								</select>
							</td>
						</tr>
						<tr>
							<td align="center" class="formLabel">�����ļ������κ�</td>
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
			<button class="formButton"  onclick="queryStatus()">�� ѯ</button>
		</div>		
	</form>
</body>
</html>
