<%@ page contentType="text/html; charset=gb2312" %>
<%@ page language="java" import="com.neusoft.om.dao.log.LogVO" %>
<%
String path = request.getContextPath();
LogVO logvo = (LogVO)request.getAttribute("LogInfo");
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
			<td class="tableTitle2">��־��ϸ��Ϣ</td>
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
					<td class="formLabel" width="20%">��������&#160;</td>
					<td class="formField" width="30%" >
						<%=logvo.getAreaName()==null?"":logvo.getAreaName()%>
					</td>			
					<td class="formLabel" width="20%">��������&#160;</td>
					<td class="formField" width="30%">
						<%=logvo.getOperateDate()==null?"":logvo.getOperateDate()%>	
					</td>            
				</tr>
				<tr>
					<td class="formLabel" width="20%">ְԱ����&#160;</td>
					<td class="formField" width="30%" >
						<%=logvo.getEmployeeName()==null?"":logvo.getEmployeeName() %>
					</td>			
					<td class="formLabel" width="20%">��½�ʺ�&#160;</td>
					<td class="formField" width="30%">
						<%=logvo.getWorkNo()==null?"":logvo.getWorkNo() %>	
					</td>            
				</tr>
				<tr>
					<td class="formLabel" width="20%">ϵͳ�˵�&#160;</td>
					<td class="formField" width="30%" >
						<%=logvo.getSystemName()==null?"":logvo.getSystemName() %>
					</td>			
					<td class="formLabel" width="20%">���ܲ˵�&#160;</td>
					<td class="formField" width="30%">
						<%=logvo.getMenuName()==null?"":logvo.getMenuName() %>	
					</td>            
				</tr>
				<tr>
					<td class="formLabel" width="20%">��&#160;&#160;&#160;&#160;ť&#160;</td>
					<td class="formField" width="30%" >
						<%=logvo.getBottomName()==null?"":logvo.getBottomName() %>
					</td>			
					<td class="formLabel" width="20%">��½��ַ&#160;</td>
					<td class="formField" width="30%">
						<%=logvo.getLoginHost()==null?"":logvo.getLoginHost() %>	
					</td>            
				</tr>
				<tr>
					<td class="formLabel" width="20%">��ϸ����&#160;</td>
					<td class="formField" width="80%" colspan="3">
						<textarea name="detailDesc" cols="48" rows="8" readOnly="true" style="width:100%"><%=logvo.getOperateDesc()==null?"":logvo.getOperateDesc()%></textarea>
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
	<button class="formButton" name="bQuery" onclick="window.close()">ȷ&#160;&#160;��</button>
 </div>
</form>
</body>
</html>
