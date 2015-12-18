<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>

<%
	String webpath = request.getContextPath();
%>

<html>
<head>
	<title>��������ѡ���</title>
	<link rel="stylesheet" href="<%=webpath%>/unieap/css/standard/Style.css" type="text/css" ></link>
	<script type="text/javascript" src="<%=webpath%>/unieap/js/combobox/doubleCombo.js"></script>
</head>

<body class="main_body_bg">

<h1>˫��������ѡ���</h1>

<table width="95%" bordercolordark="#FFFFFF" bordercolorlight="#E8E8E8" cellspacing="0" class="main_table3_4">
	<tr>
		<td class="main_table3_3_td" valign="middle" nowrap width="90">
			<table cellspacing="0" class="main_table5">
				<tr>
					<td class="main_table5_td1" valign="middle" nowrap>
						<table>
							<tr>
								<td valign="middle" nowrap>
									<span style="font-family:����;font-size: 12px">ʡ��</span>
								</td>
								<td valign="middle" nowrap>
									<spanstyle="font-family:����;font-size: 12px">
										<SELECT id="masterSelect" >
											<option value="">��ѡ��</option>
											<option value="1">����</option>
											<option value="2">�Ϻ�</option>
											<option value="3">����</option>
											<option value="4">����</option>
											<option value="5">�㶫</option>
											<option value="6">�Ĵ�</option>
										</SELECT>
									</span>
								</td>
							</tr>
						</table>
					</td>
					<td class="main_table5_td1" valign="middle" nowrap>
						<table>
							<tr>
								<td valign="middle" nowrap>
									<span style="font-family:����;font-size: 12px">����</span>
								</td>
								<td valign="middle" nowrap>
									<span style="font-family:����;font-size: 12px">
										<SELECT id="slaveSelect" />
									</span>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>

<unieap:doublecombo id="t1" master="masterSelect" slave="slaveSelect" url="demoPartRefresh.do" options="method=doubleCombo"/>

<h1>����������ѡ���</h1>

<table width="50%" bordercolordark="#FFFFFF" bordercolorlight="#E8E8E8" cellspacing="0" class="main_table3_4">
	<tr>
		<td class="main_table3_3_td" valign="middle" nowrap width="90">
			<table cellspacing="0" class="main_table5">
				<tr>
					<td class="main_table5_td1" valign="middle" nowrap>
						<table>
							<tr>
								<td valign="middle" nowrap>&nbsp;
									<span style="font-family:����;font-size: 12px">ʡ��</span>
								</td>
								<td valign="middle" nowrap>
									<span style="font-family:����;font-size: 12px">
										<SELECT id="s1" >
											<option value="">��ѡ��</option>
											<option value="����" selected="selected">����</option>
											<option value="����">����</option>
						    				<option value="�Ϻ�">�Ϻ�</option>
										</SELECT>
									</span>
								</td>
							</tr>
						</table>
					</td>
					<td class="main_table5_td1" valign="middle" nowrap>
						<table>
							<tr>
								<td valign="middle" nowrap>
									<span style="font-family:����;font-size: 12px">����</span>
								</td>
								<td valign="middle" nowrap>
									<span style="font-family:����;font-size: 12px"><SELECT id="s2" /></span>
								</td>
							</tr>
						</table>
					</td>
					<td class="main_table5_td1" valign="middle" nowrap>
						<table>
							<tr>
								<td valign="middle" nowrap>
									<span style="font-family:����;font-size: 12px">ѧУ</span>
								</td>
								<td valign="middle" nowrap>
									<span style="font-family:����;font-size: 12px">
										<SELECT id="s3" />
									</span>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>

<unieap:doublecombo id="t2" master="s1" slave="s2:s3" url="demoPartRefresh.do" options="method=selectCity&slaveSelect=s2:s3" initLoadData="true" />
<unieap:doublecombo id="t3" master="s2" slave="s3" url="demoPartRefresh.do" options="method=selectCollege&slaveSelect=s3"/>

</body>
</html>