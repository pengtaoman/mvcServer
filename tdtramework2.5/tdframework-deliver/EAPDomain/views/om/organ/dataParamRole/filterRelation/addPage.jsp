<%--
/***************************************************************
* ������: addPage.jsp
* ����  : 2007-8-11 
* ����  : yanglm@neusoft.com
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
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<%
	String webpath = request.getContextPath();
    ParamObjectCollection tableColl=(ParamObjectCollection)request.getAttribute("tableColl");
    String operType = (String) request.getAttribute("operType")==null? "":(String) request.getAttribute("operType");
    String tableId = (String) request.getAttribute("tableId")==null? "":(String) request.getAttribute("tableId");
    String mainColumn = (String) request.getAttribute("mainColumn")==null? "":(String) request.getAttribute("mainColumn");
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<contextPath value="<%=webpath%>"/>
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
		<script language="javascript" src="<%=webpath%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=webpath%>/views/om/organ/dataParamRole/filterRelation/js/addPage.js"></script>
		<script language="javascript">
		</script>
	</head>

	<body class="mainBody" onload="init('<%=tableId%>','<%=mainColumn%>')">
		<form method="post" action="">
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
				<tr class="tableTitleTR2">
					<td colspan="4">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">&#160;</td>
								<td class="tableTitle2">��������������</td>
								<td class="tableTitleRight2">&#160;</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td class="formTableL">
						<input type="hidden" id="operType" name="operType" value="<%=operType%>"/>
						<input type="hidden" id="table_id" name="table_id" value="<%=tableId%>"/>
					</td>
					<td class="formTableC">
						<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
							<tr>
								<td align="left" class="formLabel" style="width:25%">����Դ��<span class="formRequested">*</span></td>
								<td align="left" class="formField" style="width:25%">
									<td:SelectTag selectFlag="true" selectColl="<%=tableColl%>" selectvalue="<%=tableId%>" fixlength="180"
												  tagName="tableId" title="����Դ��" onchange="getTableDesc();getFilterInfo();showMagInfo();"/>
								</td>
								<td align="left" class="formLabel" style="width:25%">����Դ������</td>
								<td align="left" class="formField" style="width:25%">
									<input type="text"  name="tableDesc" id="tableDesc" title="����Դ������" style="width:180px;" readonly="readonly"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:25%">��������<span class="formRequested">*</span></td>
								<td align="left" class="formField" style="width:25%">
									<select name="filterName" id="filterName" title="��������" style="width:180px;">
			                       		<option value="">��ѡ��</option>
			                      	</select>
								</td>
								<td align="left" class="formField" colspan="2" style="width:50%">
									<span id="alertMsg" style="display:none"><font color="red">��ѡ������������Ȼ��������Ҫ�������Ĺ�����</font></span>
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
			<div class="formButtonDIV" id="formButton">
				<button class="formButton" id="bSearch" name="bSearch" id="bSearch" onclick="doSearch('<%=webpath%>')">
					��&#160;&#160;ѯ
				</button>
				<button class="formButton" id="bSave" name="bSave" onclick="saveMethod('<%=webpath%>')" disabled="disabled">
					��&#160;&#160;��
				</button>
				<button class="formButton" id="bBack" name="bBack" onclick="goBack()">
					��&#160;&#160;��
				</button>
			</div>
		</form>
	</body>
</html>
