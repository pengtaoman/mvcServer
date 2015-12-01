
<%@ page language="java"  pageEncoding="GBK"%>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>

<%/* 
   **************************************************************
   * 程序名 : FavourPlanHead.jsp
   * 建立日期: 2009年3月11日17:11:06
   * 作者 : lingchen@neusoft.com
   * 模块 : 订单受理-优惠计划受理
   * 描述 : 提供查询时的输入窗口
   * 备注 : version20100427001
   * ------------------------------------------------------------
   * 修改历史
   * 序号 日期 修改人 修改原因
   * 1   20100426 程荣华 增加隐藏变量记录查询条件
   * 2
   **************************************************************
   */%>
<%
	String webPath = request.getContextPath();
	ParamObjectCollection cityCodeColl = (ParamObjectCollection) request.getAttribute("cityCodeColl");//业务类型
	ParamObjectCollection identityKindcoll = (ParamObjectCollection) request.getAttribute("identityKindcoll");//证件类型2009年3月9日14:24:26
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gbk">
		<title>
			优惠计划受理界面
		</title>
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="Expires" content="-1" />
		<meta http-equiv="Cache-Control" content="no-cache" />
		<!-- end 禁止缓存 headers -->
		<link rel="stylesheet" href="<%=webPath%>/common/css/td_style_new.css" type="text/css" />
		<!-- title条js -->
		<script language="javascript" src="<%=webPath%>/common/js/titlebar.js" ></script>
		<!-- 公共js  -->
		<script language="javascript" src="<%=webPath%>/custcontact/common/js/td_operation.js"></script>
		<script language="javascript" src="<%=webPath%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=webPath%>/custmgt/common/js/nas_set_service_kind.js" ></script>
		<script language="javascript" src="<%=webPath%>/custcontact/common/js/SwithValueCommon.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/Globals.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/Common.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/BaseObj.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/EAPObjsMgr.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/PasswordObj.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/TextObj.js"> </script>   
		<script language="javascript" src="<%=webPath%>/custcontact/common/js/crm_common.js"> </script>
		<!-- 页面级js -->
		<script language="javascript" src="<%=webPath%>/orderaccept/favourplanquery/js/FavourPlanHead.js"></script>
		
	</head>

	<body class="mainBody">
		<unieap:form action=""  >
			<input type="hidden" id="IfAuthor" name="IfAuthor" value="0" />
			<input type="hidden" id="WebPath" name="WebPath" value="<%=webPath%>" />
			<!-- 增加 程荣华 20100427 增加隐藏变量记录查询条件(查询方式,查询条件) -->
			<input type="hidden" id="hiddenSelType" name="hiddenSelType" value="" />
			<input type="hidden" id="hiddenQueryNo" name="hiddenQueryNo" value="" />
			<!-- end 程荣华 20100427 -->
			<table border="0" cellpadding="0" cellspacing="0" class="formTable">
				<!-- 表格标题行-->
				<tr class="tableTitleTR2">
					<td colspan="3">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">
									&#160;
								</td>
								<td class="tableTitle2">
									优惠计划
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
						<table align="center" border="0" cellpadding="0" cellspacing="2" class="formTableCore">
							<tr>
								<td class="formLabel" width="5%">
									地市
								</td>
								<td class="formField" width="10%">
									<td:SelectTag selectFlag="false" tagName="cityCode" selectColl="<%=cityCodeColl%>" selectvalue="" />
								</td>
								
								<td class="formLabel" width="5%">
									业务号码
								</td>
								<td class="formField" width="10%">
                                    <unieap:input tcname="Text" id="serviceId" name="serviceId" prompt="业务号码" isnullable="true" maxlength="30"  onblur="getProductIdList(this);" />	 
								</td>
								
								<td class="formLabel" width="5%">
									产品名称
								</td>
								<td class="formField" width="10%">
								    <span class="selectDiv">
									<select name="productId"  id="productId">
											<option value="-1">请选择</option>
								 	</select>	
								 	</span> 
								</td>
								
								<td class="formLabel" width="10%">
								<button class="formButton" onClick="Query_OnClick()"  >查 询</button>
						        <button class="formButton" onClick="Refresh_OnClick()">重 置</button>
								</td>
								<td class="formLabel" width="60%">&nbsp;</td>					
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
		</unieap:form>
	</body>
</html>
