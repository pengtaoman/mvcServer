<%--
/***************************************************************
* ������ : helpPage.jsp
* ����  :  2007-8-16 
* ����  :  yanglm@neusoft.com
* ģ��  : 
* ����  : 
* ��ע  : 
* ------------------------------------------------------------
* �޸���ʷ
* ���  ����  �޸���   �޸�ԭ��
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
								<td class="tableTitle2">��̬����ʹ��˵��</td>
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
									Ŀǰϵͳ�ṩ�Ķ�̬������������<font color="red">@area_id@</font>��<font color="red">@city_code@</font>��
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
									������붯̬������ʹ�ô˲���ϵͳ���Զ���session�л�ȡ��ǰ����Ա�����������Ϣ��<br>
									��������ֵ�������ɹ������������SQL����У�<br>
									�����Ϳ��Զ�̬�����ƹ����������������ɵ��������ݣ�<br>
									����������Ҫһ��&#160;om_area_t&#160;�Ĺ�����������<br>
									��ʹ�ö�̬�����Ϳ������������ݱ��ʽ��д��&#160;<font color="red">f_area_id like @area_id@</font>&#160;<br>
									ע�⣺������Ա��һ��ʡ���û���ϵͳĬ����Ϊ��Ȩ���û�����������ݽ����κ����ơ�
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
									���д��붯̬������ʹ�ô˲���ϵͳ���Զ���session�л�ȡ��ǰ����Ա�ĵ��д�����Ϣ��<br>
									��������ֵ�������ɹ������������SQL����У�<br>
									�����Ϳ��Զ�̬�����ƹ����������������ɵ��������ݣ�<br>
									����������Ҫһ��&#160;bs_city_id_t&#160;�Ĺ�����������<br>
									��ʹ�ö�̬�����Ϳ������������ݱ��ʽ��д��&#160;<font color="red">city_code like @city_code@</font>&#160;<br>
									ע�⣺������Ա��һ��ʡ���û���ϵͳĬ����Ϊ��Ȩ���û�����������ݽ����κ����ơ�
								</td>
							</tr>
							<tr>
								<td align="center" class="formLabel" colspan="4">
									<br>������Ҫ�����ǻ�Զ�̬�������в��䣬�������û��ĸ�������
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
				<button class="formButton" name="doBack" id="doBack" onclick="window.close();">��&#160;&#160;��</button>
			</div>
		</form>
	</body>
</html>
