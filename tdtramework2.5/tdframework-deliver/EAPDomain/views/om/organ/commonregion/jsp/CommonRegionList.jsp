<%@ page language="java" contentType="text/html; charset=gb2312"%>
<%@ page import="com.neusoft.om.dao.region.CommonRegionVO"%>
<%@ page import="com.neusoft.om.dao.region.PoliticalLocationColl"%>
<%@ page import="com.neusoft.om.dao.region.PoliticalLocationVO"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%@ page import="com.neusoft.om.dao.region.AreaCodeColl"%>
<%@ page import="com.neusoft.om.dao.region.AreaCodeVO"%>
<%@ page import="com.neusoft.om.dao.region.CommonRegionData"%>

<html>
	<head>
		<META http-equiv="Content-Type" content="text/html; charset=GB2312">

		<%
			String path = request.getContextPath();
			String message = request.getAttribute("message")==null?"":(String)request.getAttribute("message");
			String operFlag = request.getAttribute("operFlag")==null?"showDetail":(String)request.getAttribute("operFlag");
			String commonRegionId = (String) request.getAttribute("commonRegionId");
			
			CommonRegionVO commonRegionVO =null;
			AreaCodeColl areaCodeColl=null;
			PoliticalLocationColl politicalLocationColl=null;
			boolean areaCodeFlag=false;
			if(!operFlag.equals("AFTER_STORE")){
				commonRegionVO = (CommonRegionVO) request.getAttribute("commonRegionVO");
				areaCodeColl=commonRegionVO.getAreaCodeColl()==null?null:(AreaCodeColl)commonRegionVO.getAreaCodeColl();
				politicalLocationColl = commonRegionVO.getPoliticalLocationColl();
				if(CommonRegionData.REGION_TYPE_2.equals(commonRegionVO.getRegionType())){
					areaCodeFlag=true;
				}
			}

		%>
		<script language=javascript src="<%=path%>/unieap/js/Globals.js"> </script>
		<script language=javascript src="<%=path%>/unieap/js/treehandle.js"> </script>
		<script language=javascript src="<%=path%>/unieap/js/Common.js"> </script>
		<link_rel ="stylesheet_href="<%=path%>/unieap/css/tab/unieapTab.css" type="text/css">
		<script type="text/javascript" src="<%=path%>/unieap/js/tab/tabApi.js"></script>
		<script type="text/javascript" src="<%=path%>/common/js/td_common.js"></script>

		<script type="text/javascript" src="<%=path%>/unieap/js/tab/unieapTab.js"></script>
		<script type="text/javascript" src="<%=path%>/views/om/organ/commonregion/js/CommonRegionList.js"></script>
		<link href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">
	</head>
	<body onload="init('<%=path%>','<%=operFlag%>')" class="mainBody">
	<form method="post" name="mainForm" id="mainForm">
		<div style="display:none">
			<input type="text" name="commonRegionId" id="commonRegionId" value="<%=commonRegionId%>" />
			<input type="text" name="message" id="message" value="<%=message%>" />
		</div>
		<%if(!operFlag.equals("AFTER_STORE")){ %>
		<!-- begin 查询条件表单 -->
		<table id="select_table" border="0" cellpadding="0" cellspacing="0"
			class="formTable">
			<tr class="tableTitleTR2">
				<td colspan="3">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td class="tableTitleLeft2">
								&#160;
							</td>
							<td class="tableTitle2">
								公共管理区域
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
					<!-- BEGIN 表单核心区域 -->
					<table align="center" border="0" cellpadding="0" cellspacing="2"
						class="formTableCore">
						<tr>
							<td class="formLabel">
								区域名称
							</td>
							<td class="formField">
								<input type="text" readOnly class="readOnly"
									value="<%=NullProcessUtil.nvlToString(commonRegionVO.getRegionName(), "")%>" />
							</td>
							<td class="formLabel">
								上级区域
							</td>
							<td class="formField">
								<input type="text" readOnly class="readOnly"
									value="<%=NullProcessUtil.nvlToString(commonRegionVO.getUpRegionName(), "")%>" />
							</td>
						</tr>
						<tr>
							<td class="formLabel">
								区域类型
							</td>
							<td class="formField">
								<input type="text" readOnly class="readOnly"
									value="<%=NullProcessUtil.nvlToString(commonRegionVO.getRegionTypeName(), "")%>" />
							</td>
							<td class="formLabel">
								地市编码
							</td>
							<td class="formField">
								<input type="text" readOnly class="readOnly"
									value="<%=NullProcessUtil.nvlToString(commonRegionVO.getCityCode(),"")%>" />
							</td>
						</tr>
						<tr>
							<td class="formLabel">
								区域描述
							</td>
							<td class="formField" colspan="3">
								<input type="text" readOnly class="readOnly"
									value="<%=NullProcessUtil.nvlToString(commonRegionVO.getRegionDesc(), "")%>"
									style="width:95%" />
							</td>
						</tr>
						<%
							if(areaCodeFlag){
							for (int i = 0; i < areaCodeColl.getRowCount(); i++) {
								AreaCodeVO areaCodeVO = areaCodeColl.getAreaCodeVO(i);
						%>
							<tr>
							<td colspan="4">
								<fieldset align="center">
									<legend>
										<em style="font-style:normal">区号信息 [ 区号标识 = <%=areaCodeVO.getAreaCodeId() %>  ]</em>
									</legend>
									<table align="center" border="0" cellpadding="0"
										cellspacing="2" class="formTableCore">
										<tr>
											<td class="formLabel">
												区号编码
											</td>
											<td class="formField">
												<input type="text" readOnly class="readOnly"
													value="<%=NullProcessUtil.nvlToString(areaCodeVO.getAreaNbr(), "")%>" />
											</td>
											<td class="formLabel">
												区号
											</td>
											<td class="formField">
												<input type="text" readOnly class="readOnly"
													value="<%=NullProcessUtil.nvlToString(areaCodeVO.getAreaCode(),"")%>" />
											</td>
										</tr>
									</table>
								</fieldset>
							</td>
						</tr>
						<%}} %>
						
					</table>
					<!-- END 表单核心区域 -->
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
		<!-- end 查询条件表单 -->
		<!-- begin 列表区域 -->

		<div id="buttondiv" class="formButtonDIV">
			<%
				if (commonRegionVO != null && commonRegionVO.getAddButtonViewFlag()) {
			%>
				<button class="formButton" name="AddNew" id="AddNew"
					onclick="return doAddNew();">
					新 增
				</button>
			<%
				} else {
			%>
				<button class="formButton" name="AddNew" id="AddNew"
					onclick="return doAddNew();" style="display:none">
					新 增
				</button>
			<%
				}
			%>		
		
			<button class="formButton" name="Modify" id="Modify"
				onclick="return doModify();">
				修 改
			</button>
			<button class="formButton" name="Delete" id="Delete"
				onclick="return doDelete('<%=path%>');">
				删 除
			</button>
		</div>
		<!-- END 按钮区域 -->
		<table width="100%" cellpadding="0" cellspacing="0" border="0" class="formTable">
			<tr class="tableTitleTR2">
				<td>
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td class="tableTitleLeft2">
								&#160;
							</td>
							<td class="tableTitle2">
								包含的行政区域
							</td>
							<td class="tableTitleRight2">
								&#160;
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td>
					<table id="mt1" border="0" align="center" cellpadding="0"
						cellspacing="1" class="listTable">
						<tr class="listTableHead">
							<td>
								行政区域编码
							</td>
							<td>
								行政区域名称
							</td>
							<td>
								上级行政区域
							</td>
							<td>
								行政区域简拼
							</td>
							<td>
								行政区域类型
							</td>
							<td>
								行政区域描述
							</td>
						</tr>

						<%
							for (int i = 0; i < politicalLocationColl.getRowCount(); i++) {
								PoliticalLocationVO vo = politicalLocationColl.getPoliticalLocationVO(i);
						%>
						<tr class=<%=(i % 2 == 0) ? "listTableRow" : "listTableRowDark"%>
							onmouseover="TableRow.lightMe(this);"
							onmouseout="TableRow.resetMe(this);"
							onclick="TableRow.selectMe(this);">
							<td>
								<%=NullProcessUtil.nvlToString(vo.getLocationCode(), "")%>
							</td>
							<td>
								<%=NullProcessUtil.nvlToString(vo.getLocationName(), "")%>
							</td>
							<td>
								<%=NullProcessUtil.nvlToString(vo.getUpLocationName(),"")%>
							</td>
							<td>
								<%=NullProcessUtil.nvlToString(vo.getLocationAbbr(), "")%>
							</td>
							<td>
								<%=NullProcessUtil.nvlToString(vo.getLocationTypeName(), "")%>
							</td>
							<td>
								<%=NullProcessUtil.nvlToString(vo.getLocationDesc(), "")%>
							</td>
						</tr>
						<%
						}
						%>
					</table>
				</td>
			</tr>
		</table>
<%} %>

</form>

	</body>
</html>



