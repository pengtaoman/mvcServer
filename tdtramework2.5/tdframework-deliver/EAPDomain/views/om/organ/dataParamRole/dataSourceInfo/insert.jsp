<%--
/***************************************************************
* 程序名 : insert.jsp
* 日期  :  2007-8-11 
* 作者  :  sunchonggui@neusoft.com
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
    String showNewData = (String) request.getAttribute("showNewData") == null ? "" : (String) request
            .getAttribute("showNewData");
%>
<html>
	<head>
	<base target="_self">
		<link href="<%=path%>/common/css/td_style.css" rel=stylesheet></link>
		<link href="<%=path%>/common/css/td_style_ec.css" rel=stylesheet></link>

		<script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=path%>/common/js/waitingbar.js"></script>
		<script language="javascript" src="<%=path%>/common/js/titlebar.js"></script>
		<script language="javascript" src="<%=path%>/unieap/js/Common.js"></script>
		<script language="javascript" src="<%=path%>/unieap/js/Globals.js"></script>
		<script language="javascript" src="<%=path%>/common/js/eccn.js"></script>
		<script language="javascript" src="<%=path%>/views/om/organ/dataParamRole/dataSourceInfo/js/insert.js"></script>
	</head>
	<body onLoad="init('<%=flagDisplay%>','<%=tableName%>','<%=tableDesc%>','<%=showNewData%>')" class="mainBody">
		<div id="queryInfo" style="display:block">
			<unieap:form method="post" action="">
				<table cellspacing="0" border="0" width="100%" cellpadding="0" class="formTable">
					<tr class="tableTitleTR2">
						<td colspan="4">
							<table width="100%" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td class="tableTitleLeft2">&#160;</td>
									<td class="tableTitle2">新增数据源表配置</td>
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
										数据源表名&#160;<span class="formRequested">*</span>
									</td>
									<td align="left" class="formField" style="width:30%">
										<input type="text" name="tableName" id="tableName" style="width:180"/>
									</td>
									<td align="left" class="formLabel" style="width:20%">
										数据源表描述&#160;<span class="formRequested">*</span>
									</td>
									<td align="left" class="formField" style="width:30%">
										<input type="text" name="tableDesc" id="tableDesc"  style="width:180"/>
									</td>
								</tr>
								<tr>
									<td align="left" class="formLabel">新增数据是否可见&#160;<span class="formRequested">*</span>
									</td>
									<td align="left" class="formField" >
										<select name="showNewData" id="showNewData" onkeydown="">
											<option value="-100">请选择</option>
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
					<button class="formButton" name="bSearch" id="bSearch" onclick="getTablleInfo('<%=path%>')">
						提取表内信息
					</button>
					<button class="formButton" name="bSave" id="bSave" onclick="doSave('<%=path%>')" style="display:none">
						保 存
					</button>
					<button class="formButton" name="bBack" id="bBack" onclick="if(confirm('确定要进行返回操作吗？'))window.close();">
						返 回
					</button>
				</div>
				<span style="display:inline">&#160;</span>
			</unieap:form>
		</div>
		<div id="tableInfo" style="display:none">
			<ec:table items="colsInfoObjs" var="colsObj" paginationLocation="false" rowsDisplayed="-1">
				<ec:parameter name="tableId" />
				<ec:row>
					<ec:column property="recordId" title="<input type='checkbox' name='allcheck' class='checkbox' onclick='allCheck(this)' /> " width="15">
						<input type="checkbox" class="checkbox" name="checkboxs" id="${colsObj.columnName}~${colsObj.dataType}" />
					</ec:column>
					<ec:column property="columnName" title="字段信息" width="15%" />
					<ec:column property="columnDesc" title="字段描述" width="25%">
						<input type="text" name="${colsObj.columnName}colDesc" id="${colsObj.columnName}colDesc" style="width:100%" />
					</ec:column>
					<ec:column property="dataType" title="字段类型" width="15%" />
					<ec:column property="columnEffect" width="15%" title="字段作用">
						<select name="colEffect" id="${colsObj.columnName}colEffect" style="width:100%">
							<option value="">请选择</option>
							<option value="1">ID</option>
							<option value="2">NAME</option>
							<option value="3">PK</option>
							<option value="4">FK</option>
						</select>
					</ec:column>
					<ec:column property="columnOrder" title="字段顺序">
						<input type="text" name="${colsObj.columnName}colOrder" id="${colsObj.columnName}colOrder" style="width:100%" onkeypress="return checkNum(window.event.keyCode)" />
					</ec:column>
					<ec:column property="filIdEff" width="15%" title="关联过滤器">
						<td:SelectTag selectFlag="" selectColl="<%=filterColl%>" selectvalue="" fixlength="100%" tagName="${colsObj.columnName}fillterEff" title="过滤器" myOptionValue="不关联过滤器" />
					</ec:column>
				</ec:row>
			</ec:table>
		</div>
	</body>
</html>
