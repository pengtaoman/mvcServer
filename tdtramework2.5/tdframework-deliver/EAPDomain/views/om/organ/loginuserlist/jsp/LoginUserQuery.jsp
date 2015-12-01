<%@ page language="java" pageEncoding="GBK"%>
<%@page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<%@taglib prefix="unieap" uri="/WEB-INF/taglib/unieap.tld"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%
String path = request.getContextPath();
String beginDate = (String)request.getAttribute("beginDate");
String endDate = (String)request.getAttribute("endDate");
String operatorCity = (String)request.getAttribute("cityCode");
ParamObjectCollection areaColl = (ParamObjectCollection)request.getAttribute("AreaColl");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
	    <ContextPath value=<%= path %> />
		<!-- ��ֹ windows ������ -->
		<meta http-equiv="MSThemeCompatible" content="no" />
		<!-- ��ֹ���� headers -->
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="Expires" content="-1" />
		<meta http-equiv="Cache-Control" content="no-cache" />
		<!-- end ��ֹ���� headers -->
		<!-- ����CSS -->
		<link rel="stylesheet"
			href="<%=request.getContextPath()%>/common/css/td_style.css"
			type="text/css" />
		<!-- ����js  -->	
		<script language="javascript"
			src="<%=request.getContextPath()%>/common/js/td_common.js"></script>
		<script language="javascript"
			src="<%=request.getContextPath()%>/common/js/td_date.js"></script>
		<!-- title��js -->
		<script language="javascript"
			src="<%=request.getContextPath()%>/common/js/titlebar.js"></script>
			
        <script language="javascript"
            src="<%=request.getContextPath()%>/views/om/organ/loginuserlist/js/LoginUserQuery.js" charset="UTF-8"></script>
	</head>

	<body class="mainBody" onload="init('<%=beginDate %>','<%=endDate %>')">
		<form action="" method="post">
			<table border="0" cellpadding="0" cellspacing="0" class="formTable">
				<tr class="tableTitleTR2">
					<td colspan="3">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">
									&#160;
								</td>
								<td class="tableTitle2">
									��¼ϵͳ��Ա��־��ѯ
								</td>
								<td class="tableTitleRight2">
									&#160;
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td class="formTableL">
						&#160;
					</td>
					<td class="formTableC">
						<table align="center" border="0" cellpadding="0" cellspacing="2"
							class="formTableCore">
							<tr>
								<td class="formLabel">
									��¼�ʺ�
								</td>
								<td class="formField">
									<input type="Text" id="workNo" name="workNo"></input>
								</td>
								<td class="formLabel">
									IP��ַ
								</td>
								<td class="formField">
									<input type="Text" id="ipAddress" name="ipAddress"></input>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" >
                                        ��¼ʱ��<span class="formRequested">*</span>
                                </td>
                                <td align="left" class="formField" style="width: 30%">
                                    <input type="text" name="beginLoginTime" id="beginLoginTime" value="" />
                                   	<button class="calendarImgButton" id="beginLoginDate" ></button>��
                                   	<input type="text" name="endLoginTime" id="endLoginTime" value="" />
                                   	<button class="calendarImgButton" id="endLoginDate" ></button>
                                </td>
								<td class="formLabel" width="13%" align="left">��&#160;&#160;��&#160;&#160;<span class="formRequested" >*</span></td>
								<td align="left" class="formField" >
								<td:SelectTag selectFlag="" selectColl="<%=areaColl%>" selectvalue="<%=operatorCity%>" tagName="area" title="��������" onchange=""/>
								</td>			
							</tr>
						</table>
					</td>
					<td class="formTableR">
						&#160;
					</td>
				</tr>
				<tr>
					<td class="formTableLB">
						&#160;
					</td>
					<td class="formTableB">
						&#160;
					</td>
					<td class="formTableRB">
						&#160;
					</td>
				</tr>
			</table>
			<div class="formButtonDIV" id="filebutton1" style="display:block">
			     <button class="formButton" id="queryBtn" onclick="doQuery()">��ѯ</button>
			</div>
		</form>
	</body>
</html>
