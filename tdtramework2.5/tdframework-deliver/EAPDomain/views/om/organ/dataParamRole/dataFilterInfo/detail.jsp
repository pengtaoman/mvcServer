<%--
/***************************************************************
* ������ : query.jsp
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
<%@ page import="com.neusoft.om.dao.dataParamRole.DataFilterInfoVO" %>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<%  
	String webpath = request.getContextPath();
    DataFilterInfoVO vo = (DataFilterInfoVO) request.getAttribute("dataFilterInfoVO");
    ParamObjectCollection columnNameColl=(ParamObjectCollection)request.getAttribute("columnNameColl");
    
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
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
		<script language="javascript" src="<%=webpath%>/views/om/organ/dataParamRole/dataFilterInfo/js/detail.js"></script>
	</head>
	<body class="mainBody" onload="init()" >
		<unieap:form method="post" action="">
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
				<tr class="tableTitleTR2">
					<td colspan="4">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">&#160;</td>
								<td class="tableTitle2">
									������������Ϣ�޸�</td>
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
									<%=vo.getFilterInfo()%>
								</td>
								<td align="left" class="formLabel" style="width:20%">
									����������&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<input type="text" name="filterDesc" id="columnDesc" value="<%=vo.getFilterDesc()%>" style="width:200px"/>
								</td>
							</tr>
							<tr>
							<td align="left" class="formLabel" style="width:20%">
									ID�ֶ�&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectFlag="" selectColl="<%=columnNameColl%>" selectvalue="<%=vo.getFilterSelId()%>" 
												  tagName="filterSelId" title="ID�ֶ�"  />
								</td>
								<td align="left" class="formLabel" style="width:20%">
									NAME�ֶ�&#160;<span class="formRequested">*</span>
								</td>
								<td align="left" class="formField" style="width:30%">
									<td:SelectTag selectFlag="" selectColl="<%=columnNameColl%>" selectvalue="<%=vo.getFilterSelValue()%>" 
												  tagName="filterSelValue" title="Name�ֶ�"  />
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:20%">
									�������ݱ��ʽ
								</td>
								<td align="left" colspan="3" class="formField" style="width:80%">
									<input type="text" name="filterSelParam" id="filterSelParam" style="width:560px" 
										   value="<%=vo.getFilterSelParam()==null?"":vo.getFilterSelParam()%>"  />
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
				<button class="formButton" name="bBack" onclick="if(confirm('ȷ��Ҫ���з��ز�����'))window.close();">
					�� ��
				</button>
				<!-- ��ʼ�������б�ֵʹ��ѡ��-->
				<input type="hidden" name="filterSelIdHid" id="filterSelIdHid" value="<%=vo.getFilterSelId()%>" />
				<input type="hidden" name="filterSelValueHid" id="filterSelValueHid" value="<%=vo.getFilterSelValue()%>" />
				<input type="hidden" name="filterIdHid" id="filterIdHid"  value="<%=vo.getFilterId()%>"  />
			</div>
		</unieap:form>
	</body>
</html>
