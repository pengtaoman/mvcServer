<%--
/***************************************************************
* 程序名: CityColl.jsp
* 日期  : 2008-9-26
* 作者  : zhaof@neusoft.com
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
<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection" %>
<%
	String path = request.getContextPath();

	ParamObjectCollection cityColl = (ParamObjectCollection)request.getAttribute("cityColl");
	String treeTab = path+"/views/om/organ/organ/treeTab.jsp";
	String areaTree  = path+"/om/OrganDisplayAction.do?OperType=init";
%>
<html>
	<head>
	<unieap:base />
		<title>区域信息</title>
		<LINK REL="stylesheet" HREF="<%=path%>/views/common/css/pubstyle.css" TYPE="text/css"/>
		<link href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">
		<script language="javascript" src="<%=path%>/unieap/js/tab/tabApi.js"></script>
		<SCRIPT language="JavaScript">
		function doChange(){
			var areaId = document.getElementById("areaId").value;
			var treeTab = document.getElementById("treeTab").value;
			var areaTree = document.getElementById("areaTree").value;
			var src = areaTree+"&changArea="+areaId;
			parent.organdisplay.tabForm.document.all("tab").contentWindow.document.all("tab_page_1").src=src;
			
		}
		</SCRIPT>
	</head>
	<body class="mainBody">
		<unieap:form action="" method="post">
			<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
				<tr>
					<td align="left" class="formLabel" style="width:20%">
										请选择区域&#160;<span class="formRequested">*</span>
					</td>
					<td align="left" class="formField" style="width:30%">
					<td:SelectTag selectColl="<%=cityColl%>"  selectFlag="true" selectvalue="" tagName="areaId" onchange="doChange()"/>
					</td>				
				</tr>
			</table>
			<input type="hidden" id="treeTab" value="<%=treeTab %>">
			<input type="hidden" id="areaTree" value="<%=areaTree %>">
		</unieap:form>
	</body>
</html>
