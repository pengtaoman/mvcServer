<%--
/***************************************************************
* 程序名 : query.jsp
* 日期  :2007-7-19 
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
<%String webpath = request.getContextPath();
  String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()  + webpath + "/";
  
  //String message=(String) request.getAttribute("message") == null ? "" : (String) request.getAttribute("message");
 %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
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
		<script language="javascript" src="<%=webpath%>/views/om/organ/checkPerson/js/query.js"></script>
		<script language="javascript">

</script>
	</head>

	<body class="mainBody" onload="init()">
		<unieap:form method="post" action="">
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
				<tr class="tableTitleTR2">
					<td colspan="4">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">
									&#160;
								</td>
								<td class="tableTitle2">
									审核信息
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
						<!--在list.jsp 中getResult()中用到 -->
						<input type="hidden" id="tableNames" name="tableNames" />
					</td>
					<td class="formTableC">
						<table border="0" cellpadding="0" cellspacing="2" class="formTableCore">
							<tr>
								<td align="left" class="formLabel">
									工 号
								</td>
								<td align="left" class="formField">
									<input type="text"  name="f_work_no"  id="f_work_no"  />
								</td>
								<td align="left" class="formLabel">
									审核状态
								</td>
								<td align="left" class="formField">
									
									<SELECT name="check_flag" id ="check_flag">
									<option value="">不区分</option>
									<option value="1">已审核</option>
									<option value="0">未审核</option>
									</SELECT>
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
			<div class="formButtonDIV" id="filebutton1">
				<button class="formButton" name="bSearch" id="bSearch" onclick="doSearch('<%=webpath%>')">
					查 询
				</button>
				<button class="formButton" name="bcheck" id="bcheck" onclick="docheck('<%=webpath%>')">
					审核
				</button>
				<button class="formButton" name="bback" id="bback" onclick="doBack('<%=webpath%>')">
					审核回退
				</button>
			</div>
			<div style="display:none ">
			<input type="text" name="fWorkNO" id="fWorkNO" />
			</div>
		</unieap:form>
	</body>
</html>
