<%@ page contentType="text/html;charset=GBK" language="java" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>

<%
	String webpath = request.getContextPath();
%>

<html>
<head>
	<title>级联下拉选择框</title>
	<link rel="stylesheet" href="<%=webpath%>/unieap/css/standard/Style.css" type="text/css" ></link>
	<script type="text/javascript" src="<%=webpath%>/unieap/js/combobox/doubleCombo.js"></script>
</head>

<body class="main_body_bg">

<h1>双级联下拉选择框</h1>

<table width="95%" bordercolordark="#FFFFFF" bordercolorlight="#E8E8E8" cellspacing="0" class="main_table3_4">
	<tr>
		<td class="main_table3_3_td" valign="middle" nowrap width="90">
			<table cellspacing="0" class="main_table5">
				<tr>
					<td class="main_table5_td1" valign="middle" nowrap>
						<table>
							<tr>
								<td valign="middle" nowrap>
									<span style="font-family:宋体;font-size: 12px">省份</span>
								</td>
								<td valign="middle" nowrap>
									<spanstyle="font-family:宋体;font-size: 12px">
										<SELECT id="masterSelect" >
											<option value="">请选择</option>
											<option value="1">北京</option>
											<option value="2">上海</option>
											<option value="3">辽宁</option>
											<option value="4">江苏</option>
											<option value="5">广东</option>
											<option value="6">四川</option>
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
									<span style="font-family:宋体;font-size: 12px">市县</span>
								</td>
								<td valign="middle" nowrap>
									<span style="font-family:宋体;font-size: 12px">
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

<h1>三级联下拉选择框</h1>

<table width="50%" bordercolordark="#FFFFFF" bordercolorlight="#E8E8E8" cellspacing="0" class="main_table3_4">
	<tr>
		<td class="main_table3_3_td" valign="middle" nowrap width="90">
			<table cellspacing="0" class="main_table5">
				<tr>
					<td class="main_table5_td1" valign="middle" nowrap>
						<table>
							<tr>
								<td valign="middle" nowrap>&nbsp;
									<span style="font-family:宋体;font-size: 12px">省份</span>
								</td>
								<td valign="middle" nowrap>
									<span style="font-family:宋体;font-size: 12px">
										<SELECT id="s1" >
											<option value="">请选择</option>
											<option value="北京" selected="selected">北京</option>
											<option value="辽宁">辽宁</option>
						    				<option value="上海">上海</option>
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
									<span style="font-family:宋体;font-size: 12px">市县</span>
								</td>
								<td valign="middle" nowrap>
									<span style="font-family:宋体;font-size: 12px"><SELECT id="s2" /></span>
								</td>
							</tr>
						</table>
					</td>
					<td class="main_table5_td1" valign="middle" nowrap>
						<table>
							<tr>
								<td valign="middle" nowrap>
									<span style="font-family:宋体;font-size: 12px">学校</span>
								</td>
								<td valign="middle" nowrap>
									<span style="font-family:宋体;font-size: 12px">
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