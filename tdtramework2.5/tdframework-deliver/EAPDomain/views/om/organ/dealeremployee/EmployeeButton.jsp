
<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<%
String webpath = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+webpath+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'EmployeeButton.jsp' starting page</title>
    
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <LINK REL="stylesheet" HREF="<%=webpath%>/views/common/css/pubstyle.css" TYPE="text/css"/>
    <script  language=javascript src="<%=webpath%>/views/om/organ/dealeremployee/js/EmployeeButton.js"> </script>
  </head>
  
  <body onload="load()" class="body">
  	<table width="100%" border="0" cellspacing="0" cellpadding="5">
		<tr class="trType">
			<td class="tdType4"></td>
	    </tr>
  		<form method="POST" name="myform">
	    <tr>
	    	<td>
			    <table width="90%" border="0" cellspacing="0" cellpadding="2" align="center" class="tableType1">
					<tr class="trType">
						<td width="25" align="right" class="tdType3">
							<input type="radio" name="opt" value="workNo" onclick="changeCondition(this)" checked="checked" />
						</td>
						<td align="right" class="tdType3">
							登陆账号<input type="text" name="workNo" class="textType" onkeydown="nas_enter('<%=webpath%>');" />
						</td>
					    <td rowspan="2" align="right">
						    <table width="100%" border="0" cellspacing="0" cellpadding="0">
				              <tr class="trType">
				                <td colspan="3" align="right">
				                	<input type="button" name="bSearch" value="查找" class="button1" onclick="doSearch('<%=webpath%>')" />
				                    <input type="button" name="bAdd" value="增加" class="button1" onclick="doAdd('<%=webpath%>')" disabled="disabled" />
				                </td>
				                <td>&nbsp;</td>
				              </tr>
				            </table>
			            </td>
					</tr>
					<tr class="trType">
						<td width="25" align="right" class="tdType3">
							<input type="radio" name="opt" value="employeeName" onclick="changeCondition(this)" />
						</td>
						<td align="right" class="tdType3">
							姓名<input type="text" name="employeeName"  class="textType" onkeydown="nas_enter('<%=webpath%>');" disabled="disabled" />
						</td>
				    </tr>
				</table>
			</td>
		</tr>
		</form>
		<tr class="trType">
			<td class="tdType4"></td>
	    </tr>
	</table>
	<table width="100%" border="0" cellpadding="3" cellspacing="0">
		<tr class="trType">
			<TD align="center" width="100%">
				<input type="button" name="bModify" value="修改" class="button1" onclick="doModify('<%=webpath%>')"/>
				<input type="button" name="bDelete" value="删除" class="button1" onclick="doDelete('<%=webpath%>')" />
				<!-- 
				<input type="button" name="bInching" value="权限微调" class="button2" onclick="showDuty('<%=webpath%>','true')" />
				<input type="button" name="bRenewPassword" value="密码恢复" class="button2" onclick="doRenewPwd('<%=webpath%>')" />
				<input type="button" name="bShowPermission" value="查看权限" class="button2" onclick="showDuty('<%=webpath%>','false')" />
				<input type="button" name="bGrant" value="功能赋权" class="button2" onclick="makeDuty('<%=webpath%>')" />
				<input type="button" name="bGrantParamDuty" value="数据赋权" class="button2" onclick="makeParamDuty('<%=webpath%>')" />				
				-->
			</TD>
		</tr> 
	</table>
  </body>
</html>





























