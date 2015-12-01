<%--
/***************************************************************
* 程序名: addPage.jsp
* 日期  : 2007-8-11 
* 作者  : yanglm@neusoft.com
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
								<td class="tableTitle2">过滤器联动配置</td>
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
								<td align="left" class="formLabel" style="width:25%">数据源表<span class="formRequested">*</span></td>
								<td align="left" class="formField" style="width:25%">
									<td:SelectTag selectFlag="true" selectColl="<%=tableColl%>" selectvalue="<%=tableId%>" fixlength="180"
												  tagName="tableId" title="数据源表" onchange="getTableDesc();getFilterInfo();showMagInfo();"/>
								</td>
								<td align="left" class="formLabel" style="width:25%">数据源表描述</td>
								<td align="left" class="formField" style="width:25%">
									<input type="text"  name="tableDesc" id="tableDesc" title="数据源表描述" style="width:180px;" readonly="readonly"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel" style="width:25%">主过滤器<span class="formRequested">*</span></td>
								<td align="left" class="formField" style="width:25%">
									<select name="filterName" id="filterName" title="主过滤器" style="width:180px;">
			                       		<option value="">请选择</option>
			                      	</select>
								</td>
								<td align="left" class="formField" colspan="2" style="width:50%">
									<span id="alertMsg" style="display:none"><font color="red">请选择主过滤器，然后配置需要被联动的过滤器</font></span>
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
					查&#160;&#160;询
				</button>
				<button class="formButton" id="bSave" name="bSave" onclick="saveMethod('<%=webpath%>')" disabled="disabled">
					保&#160;&#160;存
				</button>
				<button class="formButton" id="bBack" name="bBack" onclick="goBack()">
					返&#160;&#160;回
				</button>
			</div>
		</form>
	</body>
</html>
