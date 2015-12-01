<%@ page contentType="text/html; charset=gb2312" %>
<%@ page language="java" import="com.neusoft.om.dao.powerlog.PowerLogVO" %>
<%
String path = request.getContextPath();
PowerLogVO logvo = (PowerLogVO)request.getAttribute("LogInfo");
%>
<html>
<head>
<link href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">
</head>
<body>
<form method="post" action="">
<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
	 <tr class="tableTitleTR2">
		<td colspan="4" >
		<table width="100%" border="0" cellpadding="0" cellspacing="0" >
            <tr>
			<td class="tableTitleLeft2" >&#160;</td>
			<td class="tableTitle2">日志详细信息</td>
			<td class="tableTitleRight2" >&#160;</td>
			</tr>
		 </table>
		 </td>
	</tr>
	<tr> 
       <td class="formTableL" >&#160;</td>
       <td class="formTableC">		 	 			
			<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
				<tr>
					<td class="formLabel" width="20%">日志编号&#160;</td>
					<td class="formField" width="30%" >
						<%=logvo.getLogId()%>
					</td>			
					<td class="formLabel" width="20%">操作时间&#160;</td>
					<td class="formField" width="30%">
						<%=logvo.getOperateTime()==null?"":logvo.getOperateTime() %>	
					</td>            
				</tr>
				<tr>
					<td class="formLabel" width="20%">系统名称&#160;</td>
					<td class="formField" width="30%" >
						<%=logvo.getSysName()==null?"":logvo.getSysName()%>
					</td>			
					<td class="formLabel" width="20%">服务名称&#160;</td>
					<td class="formField" width="30%">
						<%=logvo.getServiceName()==null?"":logvo.getServiceName()%>	
					</td>            
				</tr>
				<tr>
					<td class="formLabel" width="20%">输入参数&#160;</td>
					<td class="formField" width="30%">
						<%=logvo.getInputData()==null?"":logvo.getInputData()%>	
					</td> 			
					<td class="formLabel" width="20%">返回参数&#160;</td>
					<td class="formField" width="30%">
						<%=logvo.getReturnData()==null?"":logvo.getReturnData()%>	
					</td>            
				</tr>
				<tr>
					<td class="formLabel" width="20%">详细描述&#160;</td>
					<td class="formField" width="80%" colspan="3">
						<textarea name="detailDesc" cols="48" rows="8" readOnly="true" style="width:100%"><%=logvo.getNote()==null?"":logvo.getNote()%></textarea>
					</td>			           
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
	<button class="formButton" name="bQuery" onclick="window.close()">确&#160;&#160;定</button>
 </div>
</form>
</body>
</html>
