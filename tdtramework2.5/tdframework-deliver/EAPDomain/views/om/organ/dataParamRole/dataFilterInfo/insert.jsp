<%--
/***************************************************************
* ������ : insert.jsp
* ����  :  2007-8-11 
* ����  :  sunchonggui@neusoft.com
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
<%@ taglib uri="/WEB-INF/tld/crm_taglibs.tld" prefix="crm"%>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ taglib prefix="unieap" uri="/WEB-INF/taglib/unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<%
	String path = request.getContextPath();
    ParamObjectCollection filterColl = (ParamObjectCollection) request.getAttribute("filterColl");
    String flagDisplay = (String) request.getAttribute("flagDisplay") == null ? "" : (String) request
            .getAttribute("flagDisplay");
    String tableName = (String) request.getAttribute("tableName") == null ? "" : (String) request
            .getAttribute("tableName");
    String tableDesc = (String) request.getAttribute("tableDesc") == null ? "" : (String) request
            .getAttribute("tableDesc");
%>
<html>
	<head>
		<link href="<%=path%>/common/css/td_style.css" rel=stylesheet></link>
		<link href="<%=path%>/common/css/td_style_ec.css" rel=stylesheet></link>

		<script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=path%>/common/js/waitingbar.js"></script>
		<script language="javascript" src="<%=path%>/common/js/titlebar.js"></script>
		<script language="javascript" src="<%=path%>/unieap/js/Common.js"></script>
		<script language="javascript" src="<%=path%>/unieap/js/Globals.js"></script>
		<script language="javascript" src="<%=path%>/common/js/eccn.js"></script>
		<script language="javascript" src="<%=path%>/views/om/organ/dataParamRole/dataFilterInfo/js/insert.js"></script>		
	</head>
	<body onLoad="init('<%=flagDisplay%>','<%=tableName%>','<%=tableDesc%>')" class="mainBody">
		<div>
			<unieap:form method="post" action="">
				<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
					<tr class="tableTitleTR2">
						<td colspan="4">
							<table width="100%" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td class="tableTitleLeft2">&#160;</td>
									<td class="tableTitle2">����������������Ϣ</td>
									<td class="tableTitleRight2">&#160;</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td class="formTableL">&#160;</td>
						<td class="formTableC">
							<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
								<tr>
									<td align="left" class="formLabel" style="width:20%">
										����������&#160;<span class="formRequested">*</span>
									</td>
									<td align="left" class="formField" style="width:30%">
										<input type="text" name="filterInfo" id="filterInfo" onchange="getPartRefresh(this.value)" style="width:200px;"/>
									</td>
									<td align="left" class="formLabel" style="width:20%">
										����������&#160;<span class="formRequested">*</span>
									</td>
									<td align="left" class="formField" style="width:30%">
										<input type="text" name="filterDesc" id="filterDesc" style="width:200px;"/>
									</td>	
								</tr>
								<tr>
									<td align="left" class="formLabel" style="width:20%">
										ID�ֶ�&#160;<span class="formRequested">*</span>
									</td>
									<td align="left" class="formField" style="width:30%">
										<SELECT name="columnId" id="columnId">
											<option value="">��ѡ��</option>
										</SELECT>
									</td>
									<td align="left" class="formLabel" style="width:20%">
										NAME�ֶ�&#160;<span class="formRequested">*</span>
									</td>
									<td align="left" class="formField" style="width:30%">
										<SELECT name="columnName" id="columnName">
											<option value="">��ѡ��</option>
										</SELECT>
									</td>
								</tr>
								<tr>
									<td align="left" class="formLabel" style="width:20%">�������ݱ��ʽ</td>
									<td align="left" colspan="3" class="formField" style="width:80%">
										<input type="text" name="filterParam" id="filterParam" style="width:560px"/>
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
			</unieap:form>
		</div>
		<div class="formButtonDIV" id="filebutton2" style="display: block">
			<button class="formButton" name="bSearch" id="bSearch" onclick="doSave('<%=path%>')">
				�� ��
			</button>
			<button class="formButton" name="bBack" id="bBack" onclick="if(confirm('ȷ��Ҫ���з��ز�����'))window.close()">
				�� ��
			</button>
		</div>
	</body>
</html>
