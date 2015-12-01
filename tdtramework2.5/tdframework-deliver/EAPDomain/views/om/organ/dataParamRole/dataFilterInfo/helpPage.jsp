<%--
/***************************************************************
* 程序名 : helpPage.jsp
* 日期  :  2007-8-16 
* 作者  :  yanglm@neusoft.com
* 模块  : 
* 描述  : 
* 备注  : 
* ------------------------------------------------------------
* 修改历史
* 序号  日期  修改人   修改原因
* 1
* 2
***************************************************************/
--%>
<%@ page contentType="text/html; charset=gb2312"%>
<%
	String webpath = request.getContextPath();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		
		<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">
	</head>

	<body class="mainBody" onload="">
		<form method="post" action="">
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
				<tr class="tableTitleTR2">
					<td colspan="4">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">&#160;</td>
								<td class="tableTitle2">动态参数使用说明</td>
								<td class="tableTitleRight2">&#160;</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td class="formTableL">&#160;</td>
					<td class="formTableC">
						<table border="0" cellpadding="0" cellspacing="0" class="formTableCore">
							<tr>
								<td align="left" class="formLabel" style="width:100%" colspan="4">
									目前系统提供的动态参数有两个，<font color="red">@area_id@</font>和<font color="red">@city_code@</font>。
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:10%" colspan="4">
									<font color="red">@area_id@</font>&#160;&#160;&#160;&#160;
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:10%" colspan="1"></td>
								<td align="left" class="formLabel" style="width:90%" colspan="3">
									区域代码动态参数，使用此参数系统会自动在session中获取当前操作员的区域代码信息，<br>
									并将数据值带入生成过滤器下拉框的SQL语句中，<br>
									这样就可以动态的限制过滤器下拉框中生成的数据内容，<br>
									例如我们需要一个&#160;om_area_t&#160;的过滤器下拉框，<br>
									想使用动态参数就可以在限制数据表达式中写入&#160;<font color="red">f_area_id like @area_id@</font>&#160;<br>
									注意：当操作员是一个省份用户，系统默认他为高权限用户，不会对数据进行任何限制。
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:10%" colspan="4">
									<font color="red">@city_code@</font>&#160;&#160;&#160;&#160;
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:10%" colspan="1"></td>
								<td align="left" class="formLabel" style="width:90%" colspan="3">
									地市代码动态参数，使用此参数系统会自动在session中获取当前操作员的地市代码信息，<br>
									并将数据值带入生成过滤器下拉框的SQL语句中，<br>
									这样就可以动态的限制过滤器下拉框中生成的数据内容，<br>
									例如我们需要一个&#160;bs_city_id_t&#160;的过滤器下拉框，<br>
									想使用动态参数就可以在限制数据表达式中写入&#160;<font color="red">city_code like @city_code@</font>&#160;<br>
									注意：当操作员是一个省份用户，系统默认他为高权限用户，不会对数据进行任何限制。
								</td>
							</tr>
							<tr>
								<td align="center" class="formLabel" colspan="4">
									<br>如有需要，我们会对动态参数进行补充，以满足用户的更多需求。
								</td>
							</tr>
						</table>
					</td>
					<td class="formTableR">&#160;</td>
				</tr>
				<tr>
					<td class="formTableLB">&#160;</td>
					<td class="formTableB">&#160;</td>
					<td class="formTableRB">&#160;</td>
				</tr>
			</table>
			<div class="formButtonDIV" id="filebutton1">
				<button class="formButton" name="doBack" id="doBack" onclick="window.close();">返&#160;&#160;回</button>
			</div>
		</form>
	</body>
</html>
