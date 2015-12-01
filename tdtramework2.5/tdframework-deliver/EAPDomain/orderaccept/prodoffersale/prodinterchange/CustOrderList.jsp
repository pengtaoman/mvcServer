
<%
	 /* 
	 **************************************************************
	 * 程序名		: OrderList.jsp
	 * 建立日期  	: 2011年1月7日
	 * 作者		: liurong@neusoft.com
	 * 模块		: 客户订购列表
	 * 描述		: 
	 * 备注		: 
	 * ------------------------------------------------------------
	 * 修改历史
	 * 序号		日期		修改人	修改原因
	 * 1
	 * 2
	 **************************************************************
	 */
%>
<%@ page language="java" pageEncoding="GBK"%>
<%@ page import="java.util.List"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%@ page
	import="com.neusoft.crm.ordermgr.business.prodoffersale.data.RelaProdInfoVO"%>
<%@ page
	import="com.neusoft.crm.ordermgr.business.prodoffersale.data.ProdOfferAcceptInfoVO"%>
<%@ page
	import="com.neusoft.crm.ordermgr.business.prodoffersale.data.ProdOfferAcceptInfoVO"%>
<%@ page
	import="com.neusoft.crm.ordermgr.common.util.consts.ConstantsPool"%>
<%@ page
	import="com.neusoft.crm.ordermgr.common.util.consts.instance.ProductFuncTypeConst"%>	
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="cc"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>


<%
	String webPath = request.getContextPath();
	List<ProdOfferAcceptInfoVO> pOfferInfoVOList = (List<ProdOfferAcceptInfoVO>) request
			.getAttribute("pOfferInfoVOList");
	List<RelaProdInfoVO> relaProdInfoList = (List<RelaProdInfoVO>) request
			.getAttribute("relaProdInfoList");

	String queryType = NullProcessUtil.nvlToString(request
			.getAttribute("queryType"), "0"); //查询方式

	String serviceIdShow = NullProcessUtil.nvlToString(request
			.getAttribute("serviceId"), "0");//接入号码

	String prodOfferInstId = "";
	String prodOfferId = "";
	String offerName = "";
	String prodName = "";
	String prodId = "";
	String serviceId = "";
	String effDate = "";
	String expDate = "";
	String productInstId = "";
	String cityCode = "";
	String offerProdStatus = "";
	String prodStatus = "";
	String paymentModeCd = "";
	String baseProdOfferName = "";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<meta http-equiv="MSThemeCompatible" content="no" />
		<title>客户订购的销售品及产品列表</title>
		<link href="<%=webPath%>/common/dx20/css/workarea_style.css"
			rel="stylesheet" type="text/css" />
		<script language="javascript"
			src="<%=webPath%>/orderaccept/common/js/switchdown.js"></script>
		<script language="javascript"
			src="<%=webPath%>/orderaccept/custRecognition/js/OrderList.js"></script>
		<script language="javascript"
			src="<%=webPath%>/custcontact/orderaccept/base/jutil/JUtil.js"></script>
		<script language="javascript">
			function showProdOrderDetail(prodOfferInstId,prodOfferId,prodId,productInstId,serviceId,cityCode){
				var obj={};
				obj.prodOfferInstId = prodOfferInstId;
				obj.prodOfferId = prodOfferId;
				obj.prodId = prodId;
				obj.productId = prodId;
				obj.prodInstId = productInstId;
				obj.productInstId = productInstId;
				obj.serviceId = serviceId;
				obj.cityCode = cityCode;
				window.returnValue = obj;
				this.close();
			}
		</script>
	</head>
	<body onload="checkedOrder()" onmousedown="floatDivNone();">
		<input type="hidden" id="webPath" name="webPath" value="<%=webPath %>" />
		<input type="hidden" id="queryType" name="queryType"
			value="<%=queryType %>" />
		<input type="hidden" id="serviceIdShow" name="serviceIdShow"
			value="<%=serviceIdShow %>" />
		<table width="100%" cellpadding="0" cellspacing="0" border="0"
			class="form_table">
			<tr>
				<td>
					<table width="100%" cellpadding="0" cellspacing="0" border="0"
						class="form_table">
						<tr>
							<td width="30px">
								<div class="search_div"></div>
							</td>
							<td width="400px">
								输入业务号码在结果列表中进行过滤查询： &nbsp;&nbsp;
								<input id="serviceIdSearchInput" name="serviceIdSearchInput"
									type="text" />
							</td>
							<td>
								<input id="custOrderSearchDiv" type="button" value="查询"
									class="button_s" onclick="searchOrderByServiceId()" />
							</td>
						</tr>
						<tr>
							<td colspan="3">
								<div id="prodWindow"
									style="display: none;position: absolute; z-index: 99;width: 100%;">
									<iframe allowtransparency="true" frameborder="0" id="offerList"
										scrolling="no" width="100%" height="200px" src=""></iframe>
								</div>
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td>
					<table width="100%" border="1" cellpadding="0" cellspacing="0"
						bordercolor="#d9d9d9" style="border-collapse:collapse;">
						<tr class="table_title">
							<td width="2%">
								&nbsp;
							</td>
							<td width="25%" colspan="4">
								销售品/产品名称
							</td>
							<td width="10%">
								接入号码
							</td>
							<td width="6%">
								状态
							</td>
							<td width="7%">
								付费方式
							</td>
							<td width="15%">
								基础销售品
							</td>
							<td width="10%">
								购买时间
							</td>
							<td width="10%">
								失效时间
							</td>
							<td width="15%">
								操作
							</td>
						</tr>
						<%
						if (null != pOfferInfoVOList && pOfferInfoVOList.size() > 0) {
							int len = pOfferInfoVOList.size();
							for (int i = 0; i < len; i++) {
								offerName = NullProcessUtil.nvlToString(pOfferInfoVOList.get(i).getProdOfferName(), "&nbsp;");
								effDate = NullProcessUtil.nvlToString(pOfferInfoVOList.get(i).getEffDate(), "&nbsp;");
								expDate = NullProcessUtil.nvlToString(pOfferInfoVOList.get(i).getExpDate(), "&nbsp;");
								prodOfferInstId = NullProcessUtil.nvlToString(pOfferInfoVOList.get(i).getProdOfferInstId(),"&nbsp;");
								prodOfferId = NullProcessUtil.nvlToString(pOfferInfoVOList.get(i).getProdOfferId(), "&nbsp;");
								offerProdStatus = NullProcessUtil.nvlToString(pOfferInfoVOList.get(i).getStatusCd(), "&nbsp;");
						%>
						<tr class="table_top" onmouseover='mouseoverevent(this)'
							onmouseout='mouseoutevent(this)'>
							<td width="2%">
								<img src="common/dx20/images/down_2.gif" width="16" height="18"
									style="cursor:hand"
									onclick="switchdown(this,'tr0<%=i%>','trP<%=i%>')" />
							</td>
							<td width="25%" colspan="4">
								<%=offerName%>
							</td>
							<td width="10%">
								&nbsp;
							</td>
							<td width="6%">
								<%=offerProdStatus%>
							</td>
							<td width="7%">
								&nbsp;
							</td>
							<td width="15%">
								&nbsp;
							</td>
							<td width="10%">
								<%=effDate%>
							</td>
							<td width="10%">
								<%=expDate%>
							</td>
							<td width="15%">
							</td>
						</tr>

						<tr id="tr0<%=i%>">
							<td colspan="12">
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<%
									List<RelaProdInfoVO> relaProdInfoVOList = pOfferInfoVOList.get(i).getRelaProdInfoList();
									if (null != relaProdInfoVOList&& relaProdInfoVOList.size() > 0) {
										int size = relaProdInfoVOList.size();
										for (int j = 0; j < size; j++) {
											serviceId = NullProcessUtil.nvlToString(relaProdInfoVOList.get(j).getServiceId(),"&nbsp;");
											if (serviceId == null || "".equals(serviceId)) {
												continue;
											}
											prodName = NullProcessUtil.nvlToString(relaProdInfoVOList.get(j).getProdName(),"&nbsp;");
											prodId = NullProcessUtil.nvlToString(relaProdInfoVOList.get(j).getProdId(),"&nbsp;");
											effDate = NullProcessUtil.nvlToString(relaProdInfoVOList.get(j).getEffDate(),"&nbsp;");
											expDate = NullProcessUtil.nvlToString(relaProdInfoVOList.get(j).getExpDate(),"&nbsp;");
											productInstId = NullProcessUtil.nvlToString(relaProdInfoVOList.get(j).getProdInstId(),"&nbsp;");
											cityCode = NullProcessUtil.nvlToString(relaProdInfoVOList.get(j).getCityCode(), "");
											prodStatus = NullProcessUtil.nvlToString(relaProdInfoVOList.get(j).getStatusCd(), "");
											paymentModeCd = NullProcessUtil.nvlToString(relaProdInfoVOList.get(j).getPaymentModeDesc(), "");
											baseProdOfferName = NullProcessUtil.nvlToString(relaProdInfoVOList.get(j).getBaseProdOfferName(), "");
									%>
									<tr class="table_content" onmouseover='mouseoverevent(this)'
										onmouseout='mouseoutevent(this)'>
										<td width="2%">
											&nbsp;
										</td>
										<td width="2%">
										<%
											List<RelaProdInfoVO> relaProdInfoVOListTwo = relaProdInfoVOList
												.get(j).getRelaProdInfoList();
											if (null != relaProdInfoVOListTwo&& relaProdInfoVOListTwo.size() > 0) {
										%>
											<img src="common/dx20/images/down_2.gif" width="16"
												height="18" style="cursor:hand"
												onclick="switchdown(this,'trA<%=i%><%=j%>')" />
										<%
											}else{
										%>
											<img src="common/dx20/images/down_3.gif" width="16"
																		height="18" style="cursor:hand"/>
										<%
											}
										%>
										</td>
										<td width="23%" colspan="3">
											<%=prodName%>
										</td>
										<td width="10%" id="serviceId-<%=serviceId%>">
											<%=serviceId%>
										</td>
										<td width="6%">
											<%=prodStatus%>
										</td>
										<td width="7%">
											<%=paymentModeCd%>
										</td>
										<td width="15%">
											<%=baseProdOfferName %>
										</td>
										<td width="10%">
											<%=effDate%>
										</td>
										<td width="10%">
											<%=expDate%>
										</td>
										<td width="15%">
										<% 
											if(!ConstantsPool.get(ProductFuncTypeConst.SERVICE).equals(relaProdInfoVOList.get(j).getProdFuncType()) && !ConstantsPool.get(ProductFuncTypeConst.ADDRESOURCE).equals(relaProdInfoVOList.get(j).getProdFuncType())){	
										%>
											<a id="A-<%=productInstId %>-<%=serviceId%>" href="#"
												onclick="return showProdOrderDetail('<%=prodOfferInstId %>','<%=prodOfferId %>','<%=prodId %>','<%=productInstId %>','<%=serviceId%>','<%=cityCode %>');">选择</a>
										<%
											}
										%>
										</td>
									</tr>
									<tr id="trA<%=i%><%=j%>">
										<td colspan="12">
											<table width="100%" border="0" cellspacing="0"
												cellpadding="0">
												<%
													
													if (null != relaProdInfoVOListTwo&& relaProdInfoVOListTwo.size() > 0) {
														int relaSizeTwo = relaProdInfoVOListTwo.size();
														for (int m = 0; m < relaSizeTwo; m++) {
															serviceId = NullProcessUtil.nvlToString(relaProdInfoVOListTwo.get(m).getServiceId(), "&nbsp;");
															if (serviceId == null || "".equals(serviceId)) {
																continue;
															}
															prodName = NullProcessUtil.nvlToString(relaProdInfoVOListTwo.get(m).getProdName(), "&nbsp;");
															prodId = NullProcessUtil.nvlToString(relaProdInfoVOListTwo.get(m).getProdId(), "&nbsp;");
															effDate = NullProcessUtil.nvlToString(relaProdInfoVOListTwo.get(m).getEffDate(), "&nbsp;");
															expDate = NullProcessUtil.nvlToString(relaProdInfoVOListTwo.get(m).getExpDate(), "&nbsp;");
															productInstId = NullProcessUtil.nvlToString(relaProdInfoVOListTwo.get(m).getProdInstId(),"&nbsp;");
															cityCode = NullProcessUtil.nvlToString(relaProdInfoVOListTwo.get(m).getCityCode(), "");
															prodStatus = NullProcessUtil.nvlToString(relaProdInfoVOListTwo.get(m).getStatusCd(), "");
															paymentModeCd = NullProcessUtil.nvlToString(relaProdInfoVOListTwo.get(m).getPaymentModeDesc(), "");
															baseProdOfferName = NullProcessUtil.nvlToString(relaProdInfoVOListTwo.get(m).getBaseProdOfferName(), "");
												%>
												<tr class="table_content" onmouseover='mouseoverevent(this)'
													onmouseout='mouseoutevent(this)'>
													<td width="2%">
														&nbsp;
													</td>
													<td width="2%">
														&nbsp;
													</td>
													<td width="2%">
													<%
														List<RelaProdInfoVO> relaProdInfoVOListThree = relaProdInfoVOListTwo
															.get(m).getRelaProdInfoList();
														if (null != relaProdInfoVOListThree
															&& relaProdInfoVOListThree.size() > 0){
													%>
														<img src="common/dx20/images/down_2.gif" width="16"
															height="18" style="cursor:hand"
															onclick="switchdown(this,'trB<%=i%><%=m%>')" />
													<%
														}else{
													%>
														<img src="common/dx20/images/down_3.gif" width="16"
																		height="18" style="cursor:hand"/>
													<%
														}
													%>
													</td>
													<td width="21%" colspan="2">
														<%=prodName%>
													</td>
													<td width="10%" id="serviceId-<%=serviceId%>">
														<%=serviceId%>
													</td>
													<td width="6%">
														<%=prodStatus%>
													</td>
													<td width="7%">
														<%=paymentModeCd%>
													</td>
													<td width="15%">
														<%=baseProdOfferName %>
													</td>
													<td width="10%">
														<%=effDate%>
													</td>
													<td width="10%">
														<%=expDate%>
													</td>
													<td width="15%">
													<% 
													if(!ConstantsPool.get(ProductFuncTypeConst.SERVICE).equals(relaProdInfoVOListTwo.get(m).getProdFuncType()) && !ConstantsPool.get(ProductFuncTypeConst.ADDRESOURCE).equals(relaProdInfoVOListTwo.get(m).getProdFuncType()) ){	
													%>
														<a id="A-<%=productInstId %>-<%=serviceId%>" href="#"
															onclick="return showProdOrderDetail('<%=prodOfferInstId %>','<%=prodOfferId %>','<%=prodId %>','<%=productInstId %>','<%=serviceId%>','<%=cityCode %>');">选择</a>
													<%
													}
													%>
													</td>
												</tr>
												<tr id="trB<%=i%><%=m%>">
													<td colspan="12">
														<table width="100%" border="0" cellspacing="0"
															cellpadding="0">
															<%	
																if (null != relaProdInfoVOListThree && relaProdInfoVOListThree.size() > 0) {
																	int relaSizeThree = relaProdInfoVOListThree.size();
																	for (int n = 0; n < relaSizeThree; n++) {
																		serviceId = NullProcessUtil.nvlToString(relaProdInfoVOListThree.get(n).getServiceId(),"&nbsp;");
																		if (serviceId == null || "".equals(serviceId)) {
																			continue;
																		}
																		prodName = NullProcessUtil.nvlToString(relaProdInfoVOListThree.get(n).getProdName(),"&nbsp;");
																		prodId = NullProcessUtil.nvlToString(relaProdInfoVOListThree.get(n).getProdId(),"&nbsp;");
																		effDate = NullProcessUtil.nvlToString(relaProdInfoVOListThree.get(n).getEffDate(),"&nbsp;");
																		expDate = NullProcessUtil.nvlToString(relaProdInfoVOListThree.get(n).getExpDate(),"&nbsp;");
																		productInstId = NullProcessUtil.nvlToString(relaProdInfoVOListThree.get(n).getProdInstId(),"&nbsp;");
																		cityCode = NullProcessUtil.nvlToString(relaProdInfoVOListThree.get(n).getCityCode(),"");
																		prodStatus = NullProcessUtil.nvlToString(relaProdInfoVOListThree.get(n).getStatusCd(),"");
																		paymentModeCd = NullProcessUtil.nvlToString(relaProdInfoVOListThree.get(n).getPaymentModeDesc(),"");
																		baseProdOfferName = NullProcessUtil.nvlToString(relaProdInfoVOListThree.get(n).getBaseProdOfferName(),"");
															%>
															<tr class="table_content"
																onmouseover='mouseoverevent(this)'
																onmouseout='mouseoutevent(this)'>
																<td width="2%">
																	&nbsp;
																</td>
																<td width="2%">
																	&nbsp;
																</td>
																<td width="2%">
																	&nbsp;
																</td>
																<td width="2%">
																	<img src="common/dx20/images/down_3.gif" width="16"
																		height="18" style="cursor:hand"/>
																</td>
																<td width="19%" colspan="2">
																	<%=prodName%>
																</td>
																<td width="10%" id="serviceId-<%=serviceId%>">
																	<%=serviceId%>
																</td>
																<td width="6%">
																	<%=prodStatus%>
																</td>
																<td width="7%">
																	<%=paymentModeCd%>
																</td>
																<td width="15%">
																	<%=baseProdOfferName %>
																</td>
																<td width="10%">
																	<%=effDate%>
																</td>
																<td width="10%">
																	<%=expDate%>
																</td>
																<td width="15%">
																<% 
																	if(!ConstantsPool.get(ProductFuncTypeConst.SERVICE).equals(relaProdInfoVOListThree.get(n).getProdFuncType()) && !ConstantsPool.get(ProductFuncTypeConst.ADDRESOURCE).equals(relaProdInfoVOListThree.get(n).getProdFuncType())){
																%>
																	<a id="A-<%=productInstId %>-<%=serviceId%>" href="#"
																		onclick="return showProdOrderDetail('<%=prodOfferInstId %>','<%=prodOfferId %>','<%=prodId %>','<%=productInstId %>','<%=serviceId%>','<%=cityCode %>');">选择</a>
																<%
																	}
																%>
																</td>
															</tr>
															<%
																		}
																	}
															%>
														</table>
													</td>
												</tr>
												<%
															}
														}
												%>
											</table>
										</td>
									</tr>
									<%
												}
											}
									%>
								</table>
							</td>
						</tr>

						<tr id="trP<%=i%>">
							<td colspan="12">
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<%
										List<ProdOfferAcceptInfoVO> pOfferInfoVOListTwo = pOfferInfoVOList.get(i).getProdOfferAcceptList();
										if (null != pOfferInfoVOListTwo && pOfferInfoVOListTwo.size() > 0) {
											int size = pOfferInfoVOListTwo.size();
											for (int k = 0; k < size; k++) {
												offerName = NullProcessUtil.nvlToString(pOfferInfoVOListTwo.get(k).getProdOfferName(), "&nbsp;");
												effDate = NullProcessUtil.nvlToString(pOfferInfoVOListTwo.get(k).getEffDate(),"&nbsp;");
												expDate = NullProcessUtil.nvlToString(pOfferInfoVOListTwo.get(k).getExpDate(),"&nbsp;");
												prodOfferInstId = NullProcessUtil.nvlToString(pOfferInfoVOListTwo.get(k).getProdOfferInstId(), "&nbsp;");
												prodOfferId = NullProcessUtil.nvlToString(pOfferInfoVOListTwo.get(k).getProdOfferId(), "&nbsp;");
												offerProdStatus = NullProcessUtil.nvlToString(pOfferInfoVOListTwo.get(k).getStatusCd(),"&nbsp;");
									%>
									<tr class="table_content" onmouseover='mouseoverevent(this)'
										onmouseout='mouseoutevent(this)'>
										<td width="2%">
											&nbsp;
										</td>
										<td width="2%">
											<img src="common/dx20/images/down_2.gif" width="16"
												height="18" style="cursor:hand"
												onclick="switchdown(this,'trC<%=i%><%=k%>')" />
										</td>
										<td width="23%" colspan="3">
											<%=offerName%>
										</td>
										<td width="10%">
											&nbsp;
										</td>
										<td width="6%">
											<%=offerProdStatus%>
										</td>
										<td width="7%">
											&nbsp;
										</td>
										<td width="15%">
											&nbsp;
										</td>
										<td width="10%">
											<%=effDate%>
										</td>
										<td width="10%">
											<%=expDate%>
										</td>
										<td width="15%">
										</td>
									</tr>
									<tr id="trC<%=i%><%=k%>">
										<td colspan="12">
											<table width="100%" border="0" cellspacing="0"
												cellpadding="0">
												<%
													List<RelaProdInfoVO> relaOfferInfoList = pOfferInfoVOListTwo.get(k).getRelaProdInfoList();
													if (null != relaOfferInfoList && relaOfferInfoList.size() > 0) {
														int relaSize = relaOfferInfoList.size();
														for (int j = 0; j < relaSize; j++) {
															serviceId = NullProcessUtil.nvlToString(relaOfferInfoList.get(j).getServiceId(), "&nbsp;");
															if (serviceId == null || "".equals(serviceId)) {
																continue;
															}
															prodName = NullProcessUtil.nvlToString(relaOfferInfoList.get(j).getProdName(), "&nbsp;");
															prodId = NullProcessUtil.nvlToString(relaOfferInfoList.get(j).getProdId(), "&nbsp;");
															effDate = NullProcessUtil.nvlToString(relaOfferInfoList.get(j).getEffDate(), "&nbsp;");
															expDate = NullProcessUtil.nvlToString(relaOfferInfoList.get(j).getExpDate(), "&nbsp;");
															productInstId = NullProcessUtil.nvlToString(relaOfferInfoList.get(j).getProdInstId(),"&nbsp;");
															cityCode = NullProcessUtil.nvlToString(relaOfferInfoList.get(j).getCityCode(), "");
															prodStatus = NullProcessUtil.nvlToString(relaOfferInfoList.get(j).getStatusCd(), "");
															paymentModeCd = NullProcessUtil.nvlToString(relaOfferInfoList.get(j).getPaymentModeDesc(), "");
															baseProdOfferName = NullProcessUtil.nvlToString(relaOfferInfoList.get(j).getBaseProdOfferName(), "");
												%>
												<tr class="table_content" onmouseover='mouseoverevent(this)'
													onmouseout='mouseoutevent(this)'>
													<td width="2%">
														&nbsp;
													</td>
													<td width="2%">
														&nbsp;
													</td>
													<td width="2%">
														<img src="common/dx20/images/down_3.gif" width="16"
															height="18" style="cursor:hand"/>
													</td>
													<td width="21%" colspan="2">
														<%=prodName%>
													</td>
													<td width="10%" id="serviceId-<%=serviceId%>">
														<%=serviceId%>
													</td>
													<td width="6%">
														<%=prodStatus%>
													</td>
													<td width="7%">
														<%=paymentModeCd%>
													</td>
													<td width="15%">
														<%=baseProdOfferName %>
													</td>
													<td width="10%">
														<%=effDate%>
													</td>
													<td width="10%">
														<%=expDate%>
													</td>
													<td width="15%">
													<% 
													if(!ConstantsPool.get(ProductFuncTypeConst.SERVICE).equals(relaOfferInfoList.get(j).getProdFuncType()) && !ConstantsPool.get(ProductFuncTypeConst.ADDRESOURCE).equals(relaOfferInfoList.get(j).getProdFuncType())){
													%>
													 <a id="A-<%=productInstId %>-<%=serviceId%>" href="#" onclick="return showProdOrderDetail('<%=prodOfferInstId %>','<%=prodOfferId %>','<%=prodId %>','<%=productInstId %>','<%=serviceId%>','<%=cityCode %>');">选择</a> 	
													<%
														}
													%>													
													</td>
												</tr>
												<%
															}
														}
												%>
											</table>
										</td>
									</tr>
									<%
												}
											}
									%>
								</table>
							</td>
						</tr>

						<%
							}
						}
						if (relaProdInfoList != null) {
								for (int i = 0, len = relaProdInfoList.size(); i < len; i++) {
									RelaProdInfoVO relaProdInfoVO = relaProdInfoList.get(i);
									serviceId = NullProcessUtil.nvlToString(relaProdInfoVO
									.getServiceId(), "&nbsp;");
									if (serviceId == null || "".equals(serviceId)) {
								continue;
									}
									prodName = NullProcessUtil.nvlToString(relaProdInfoVO
									.getProdName(), "&nbsp;");
									prodId = NullProcessUtil.nvlToString(relaProdInfoVO
									.getProdId(), "&nbsp;");
									paymentModeCd = NullProcessUtil.nvlToString(relaProdInfoVO.getPaymentModeDesc(), "");
									baseProdOfferName = NullProcessUtil.nvlToString(relaProdInfoVO.getBaseProdOfferName(), "");
									effDate = NullProcessUtil.nvlToString(relaProdInfoVO
									.getEffDate(), "&nbsp;");
									expDate = NullProcessUtil.nvlToString(relaProdInfoVO
									.getExpDate(), "&nbsp;");
									productInstId = NullProcessUtil.nvlToString(relaProdInfoVO
									.getProdInstId(), "&nbsp;");
									cityCode = NullProcessUtil.nvlToString(relaProdInfoVO
									.getCityCode(), "");
									prodStatus = NullProcessUtil.nvlToString(relaProdInfoVO
									.getStatusCd(), "");
						%>
						<tr class="table_content" onmouseover='mouseoverevent(this)'
							onmouseout='mouseoutevent(this)'>
							<td width="2%">
								<img src="common/dx20/images/down_3.gif" width="16"
															height="18" style="cursor:hand"/>
							</td>
							<td width="25%" colspan="4">
								<%=prodName%>
							</td>
							<td width="10%" id="serviceId-<%=serviceId%>">
								<%=serviceId%>
							</td>
							<td width="6%">
								<%=prodStatus%>
							</td>
							<td width="7%">
								<%=paymentModeCd%>
							</td>
							<td width="15%">
								<%=baseProdOfferName %>
							</td>
							<td width="10%">
								<%=effDate%>
							</td>
							<td width="10%">
								<%=expDate%>
							</td>
							<td width="15%">
								<a id="B-<%=productInstId %>-<%=serviceId%>" href="#"
									onclick="return showProdOrderDetail('','','<%=prodId %>','<%=productInstId %>','<%=serviceId%>','<%=cityCode %>');">选择</a>
							</td>
						</tr>
							<%
							}
						}
						%>
					</table>
				</td>
			</tr>
		</table>
	</body>
</html>
