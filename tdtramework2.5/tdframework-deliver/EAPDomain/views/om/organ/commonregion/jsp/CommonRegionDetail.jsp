<%@ page language="java" contentType="text/html; charset=gb2312"%>
<%@ page import="com.neusoft.om.dao.region.CommonRegionVO"%>
<%@ page import="com.neusoft.om.dao.region.PoliticalLocationColl"%>
<%@ page import="com.neusoft.om.dao.region.PoliticalLocationVO"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%@ page import="com.neusoft.om.dao.region.AreaCodeColl"%>
<%@ page import="com.neusoft.om.dao.region.AreaCodeVO"%>
<%@ page import="com.neusoft.om.dao.region.CommonRegionData"%>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap" %>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td" %>
<html>
	<head>
		<META http-equiv="Content-Type" content="text/html; charset=GB2312">

		<%
			String path = request.getContextPath();
			CommonRegionVO commonRegionVO = (CommonRegionVO) request.getAttribute("commonRegionVO");
			String message = request.getAttribute("message")==null?"":(String)request.getAttribute("message");
			String operFlag = request.getAttribute("operFlag")==null?"":(String)request.getAttribute("operFlag");
			String commonRegionId = (String) request.getAttribute("commonRegionId");
			ParamObjectCollection regionTypeColl = (ParamObjectCollection) request.getAttribute("regionTypeColl");
			
			AreaCodeColl areaCodeColl=commonRegionVO.getAreaCodeColl();
			PoliticalLocationColl politicalLocationColl = commonRegionVO.getPoliticalLocationColl();
			String needCheckBox="true";
			
			boolean areaCodeFlag=false;
			
			String areaCodeStr="";
			if(areaCodeColl!=null){
				for(int i=0;i<areaCodeColl.getRowCount();i++){
					AreaCodeVO areaCodeVO = areaCodeColl.getAreaCodeVO(i);
					areaCodeStr+="["+areaCodeVO.getAreaCode()+","+areaCodeVO.getAreaNbr()+"]";
				}
			}
			if(regionTypeColl.getRowCount()>0){
				if(CommonRegionData.REGION_TYPE_2.equals(regionTypeColl.getParamObjectByIndex(0).getId())){
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
		<script  language=javascript src="<%=path%>/unieap/js/treeAPI.js"> </script>  
		<script  language=javascript src="<%=path%>/common/js/tree/fw_menu.js"></script>
   		<script  language=javascript src="<%=path%>/common/js/tree/fw_menuEvent.js"> </script>

		<script type="text/javascript" src="<%=path%>/unieap/js/tab/unieapTab.js"></script>
		<script type="text/javascript" src="<%=path%>/views/om/organ/commonregion/js/CommonRegionDetail.js"></script>
		<script type="text/javascript" src="<%=path%>/views/om/organ/commonregion/js/CommonTree.js"></script>
		<link href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">
		<link href="<%=path%>/common/css/td_style_tab.css" rel=stylesheet type="text/css">
		<style>
			.TreeNode {
				padding:0px;
				margin:0px;
			}
			.TreeNode img { 
				border:0px
			}
			.TreeNode a:link {COLOR: Black; TEXT-DECORATION: none}
			.TreeNode a:hover {COLOR: Yellow!important; TEXT-DECORATION: underline}
			.TreeNode a:visited {COLOR: Black; TEXT-DECORATION: none}
			.TreeNode a:active {COLOR: Green; TEXT-DECORATION: none}
			.mainDiv
			{
  				background-color:#f3f3f3;
  				margin:2px 2px 2px 2px;
  				padding:2px 2px 2px 0px;
  				width:350px;
  				height:10px;
  				float:left;
  
			}
			.xDiv
			{
				height:10px;
				margin:0px 2px 0px 335px;
				color:red;
				font-size:12px;
				border:1px solid white;
				padding:0px 0px 0px 2px;
				cursor:hand;
				font-weight:bold;
			}
			.iDiv
			{
				padding:1px 1px;
				float:left;
				padding:2px 2px 2px 10px;
			}
			.bSpan
			{
				font-weight:bold;
				cursor:hand;
				margin:1px 1px 1px 1px ;
				background-color:white;
				color:red;
				font-size:13px;
				border:1px solid #f3f3f3;
				padding:1px 2px 0px 2px;
			}
			.iInput
			{
				width:95px;
			}
			INPUT
			{
				font-size:12px;
				width: 20px;
			}
		</style>
	</head>
	<body onload="init('<%=path%>')" class="mainBody">
	<form method="post" name="mainForm" id="mainForm">
		<div style="display:none">
			<input type="text" name="commonRegionId" id="commonRegionId" value="<%=commonRegionId%>" />
			<input type="text" name="message" id="message" value="<%=message%>" />
			<input type="text" name="operFlag" id="operFlag" value="<%=operFlag%>" />
			<input type="text" name="areaCodeStr" id="areaCodeStr" value="<%=areaCodeStr %>" />
			<input type="text" name="areaCodeFlag" id="areaCodeFlag" value="<%=areaCodeFlag %>" />
		</div>

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
							<td class="tableTitle2" align="right">
								<span id="storeButton" name="storeButton" class="formRequested" style="cursor:hand;" onclick="return doStore();">[保存]</span>
								<span id="goBackButton" name="goBackButton" class="formRequested" style="cursor:hand;" onclick="return goBack();">[返回]</span>
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
								<input type="text" id="s_region_name" name="s_region_name" style="width:125px"
									value="<%=NullProcessUtil.nvlToString(commonRegionVO.getRegionName(), "")%>" />
							</td>
							<td class="formLabel">
								上级区域
							</td>
							<td class="formField">
								<input type="text"  style="display:none" id="s_up_region_id" name="s_up_region_id" 
									value="<%=NullProcessUtil.nvlToString(Long.valueOf(commonRegionVO.getUpRegionId()), "")%>" />
								<input type="text"  readOnly class="readOnly"  style="width:125px"
									value="<%=NullProcessUtil.nvlToString(commonRegionVO.getUpRegionName(), "")%>" />
							</td>
						</tr>
						<tr>
							<td class="formLabel">
								区域类型
							</td>
							<td class="formField">
								<td:SelectTag selectFlag="" selectColl="<%=regionTypeColl%>" selectvalue="" tagName="s_region_type" title="区域类型" />
							</td>
							<td class="formLabel">
								&#160;
							</td>
							<td class="formField">
								&#160;
							</td>
						</tr>
						<tr>
							<td class="formLabel">
								区域描述
							</td>
							<td class="formField" colspan="3">
								<input type="text" id="s_region_desc" name="s_region_desc"
									value="<%=NullProcessUtil.nvlToString(commonRegionVO.getRegionDesc(), "")%>"
									style="width:95%" />
							</td>
						</tr>
						<%if(areaCodeFlag){ %>
						<tr>
							<td colspan="4">
								<fieldset align="center">
									<legend>
										<em style="font-style:normal">区号信息 <span onclick="addAreaCode('','');" class="bSpan">+</span></em>
									</legend>
									<div style="width:100%;clear:none;float:right;" id="bodyDiv" name="bodyDiv">
									<div></div>
									</div>
								</fieldset>
							</td>
						</tr>
						<%} %>
						
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
								行政管理区域
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
				<div id="treediv">
				<unieap:tree  tree='politicalLocationTree' includeRootNode="false" readOnly="true" needCheckBox='<%=needCheckBox%>' textClass="TreeNode" 
              jsMethodForOnclick="clicknodeforexpandorcollapse" checkboxLogical="3" />  
              </div> 
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
</form>

	</body>
</html>



