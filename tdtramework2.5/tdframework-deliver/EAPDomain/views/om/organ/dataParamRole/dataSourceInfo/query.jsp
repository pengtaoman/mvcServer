<%--
/***************************************************************
* 程序名 : query.jsp
* 日期  :2007-8-11 
* 作者  : 孙崇贵 sunchonggui@neusoft.com
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
<%String webpath = request.getContextPath();
  String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()  + webpath + "/";
  ParamObjectCollection tableColl=(ParamObjectCollection)request.getAttribute("tableColl");
 %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">

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
		<script language="javascript" src="<%=webpath%>/views/om/organ/dataParamRole/dataSourceInfo/js/query.js"></script>
		<script language="javascript">

</script>
	</head>

	<body class="mainBody" onload="init()">
		<form method="post" action="">
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
				<tr class="tableTitleTR2">
					<td colspan="4">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">&#160;</td>
								<td class="tableTitle2">数据源表信息维护</td>
								<td class="tableTitleRight2">&#160;</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td class="formTableL">
						&#160;
						<!--在list.jsp 中getResult()中用到 -->
						<input type="hidden" id="tableNames" name="tableNames" />
					</td>
					<td class="formTableC">
						<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
							<tr>
								<td align="left" class="formLabel">数据源表名</td>
								<td align="left" class="formField">
									<td:SelectTag selectFlag="true" selectColl="<%=tableColl%>" selectvalue="" 
												  tagName="tableId" title="数据源表名" fixlength="200px"/>
								</td>
								<td align="left" class="formLabel">数据源表描述</td>
								<td align="left" class="formField">
									<input type="text"  name="tableDesc" id="tableDesc" title="根据数据表描述信息进行模糊查询" style="width:200px;"/>
								</td>
							</tr>
							<tr>
								<td align="left" class="formLabel">新增数据是否可见</td>
								<td align="left" class="formField" >
									<select name="showNewData" id="showNewData" onkeydown="">
										<option value="-1">请选择</option>
										<option value="1">可见</option>
										<option value="0">不可见</option>
								  	</select>
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
				<button class="formButton" name="bSearch" id="bSearch" onclick="doSearch('<%=webpath%>')">
					查 询
				</button>
				<button class="formButton" name="bAdd" onclick="doAdd('<%=webpath%>')">
					增 加
				</button>
				<button class="formButton" name="bDelete" id="bDelete" onclick="doDelete('<%=webpath%>')" disabled="disabled">
					删 除
				</button>
			</div>
		</form>
	</body>
</html>
