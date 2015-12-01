<%--
/***************************************************************
* ������ : detail.jsp
* ����  :  2007-8-14 
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
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om"%>
<%@ page import="com.neusoft.om.dao.dataParamRole.DataSourceInfoVO"%>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<%
	String webpath = request.getContextPath();
    String ifUsed = (String)request.getAttribute("ifUsed");//�����ж�����Դ���Ƿ��ѱ�ʹ��          
    DataSourceInfoVO vo = (DataSourceInfoVO) request.getAttribute("dataSourceInfoVO");
    ParamObjectCollection filterColl = (ParamObjectCollection) request.getAttribute("filterColl");
%>
<html>
	<head>
		<title>��Ϣ�޸�ҳ��</title>
		<base target="_self">

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		
		<link href="<%=webpath%>/common/css/td_style.css" rel=stylesheet type="text/css">
		
		<script language="javascript" src="<%=webpath%>/common/js/td_date.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/EAPObjsMgr.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/BaseObj.js"> </script>
		<script language="javascript" src="<%=webpath%>/common/js/titlebar.js"> </script>
		<script language="javascript" src="<%=webpath%>/views/common/js/nas_check_no_null.js"></script>
		<script language="javascript" src="<%=webpath%>/views/common/js/nas_date_compare.js"></script>
		<script language="javascript" src="<%=webpath%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=webpath%>/views/om/organ/dataParamRole/dataSourceInfo/js/detail.js"></script>
	</head>
	<body class="mainBody" onload="init('<%=ifUsed%>')">

		<unieap:form method="post" action="">
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
				<tr class="tableTitleTR2">
					<td colspan="4">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">&#160;</td>
								<td class="tableTitle2">����Դ��������Ϣ�޸�</td>
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
								<td align="left" class="formLabel" style="width:20%">����Դ����</td>
								<td align="left" class="formField" style="width:30%">
									<%=vo.getTableName()%>
								</td>
								<td align="left" class="formLabel" style="width:20%">����Դ������</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" name="tableDesc" id="tableDesc" value="<%=vo.getTableDesc()%>" style="width:180px;"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">�ֶ���Ϣ</td>
								<td align="left" class="formField" style="width:30%">
									<%=vo.getColumnInfo()%>
								</td>
								<td align="left" class="formLabel" style="width:20%">�ֶ�����</td>
								<td align="left" class="formField" style="width:30%">
									<%=vo.getColumnKind()%>
								</td>

							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">�ֶ�����</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" name="columnDesc" id="columnDesc" value="<%=vo.getColumnDesc()==null?"":vo.getColumnDesc()%>" />
								</td>
								<td align="left" class="formLabel" style="width:20%">�ֶ�˳��</td>
								<td align="left" class="formField" style="width:30%">
									<input id="columnOrder" name="columnOrder" prompt="�ֶ�˳��" isnullable="true" value="<%=String.valueOf(vo.getColumnOrder())%>" onkeypress="return checkNum(window.event.keyCode)"/>
								</td>

							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">�ֶ�����</td>
								<td align="left" class="formField" style="width:30%">
									<select name="columnType" id="columnType">
										<option value="1">ID</option>
										<option value="2">NAME</option>
										<option value="3">PK</option>
										<option value="4">FK</option>
									</select>
								</td>
								<td align="left" class="formLabel" style="width:20%">����������</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectFlag="" selectColl="<%=filterColl%>" selectvalue="" tagName="filterEff" title="����������" myOptionValue="������������" fixlength="180px"/>
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
				<button class="formButton" name="modiBtn" id="modiBtn" onclick="modify('<%=webpath%>')">
					�� ��
				</button>
				<button class="formButton" name="bBack" onclick="if(confirm('ȷ��Ҫ���з��ز�����'))window.close()">
					�� ��
				</button>
				<!-- ��ʼ�������б�ֵʹ��ѡ��-->
				<input type="hidden" name="columnTypeHid" id="columnTypeHid" value="<%=vo.getColumnType()%>" />
				<input type="hidden" name="filterIdHid" id="filterIdHid" value="<%=vo.getFilterId()==null?"noFilter":vo.getFilterId()%>" />
				<input type="hidden" name="tableId" id="tableId" value="<%=vo.getTableId()%>" />
				<input type="hidden" name="columnInfo" id="columnInfo" value="<%=vo.getColumnInfo()%>" />
			</div>
		</unieap:form>
	</body>
</html>
