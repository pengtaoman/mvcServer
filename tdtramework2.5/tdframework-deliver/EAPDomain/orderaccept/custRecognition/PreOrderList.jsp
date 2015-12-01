<%
	 /* 
	 **************************************************************
	 * 程序名	: PreOrderList.jsp
	 * 建立日期  	: 2012年9月3日
	 * 作者		: du-x@neusoft.com
	 * 模块		: 客户预约订购列表
	 * 描述		: 
	 * 备注		: 
	 * ------------------------------------------------------------
	 * 修改历史
	 * 序号		日期		修改人	修改原因
	 * 1     2012-5-15  祝国军    UI调整：采用unieap.tooltip展示弹出框
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
<%@ page
	import="com.neusoft.crm.ordermgr.common.util.consts.instance.OfferStatusCDConst"%>	

<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="cc"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ page import="com.neusoft.tdframework.common.util.PageCheck"%>

<%
	String webPath = request.getContextPath();
	List<ProdOfferAcceptInfoVO> pOfferInfoVOList = (List<ProdOfferAcceptInfoVO>) request
			.getAttribute("pOfferInfoVOList");
	/* delete by zhuguojun 20120517: 此部分在页面不显示
	List<RelaProdInfoVO> relaProdInfoList = (List<RelaProdInfoVO>) request
			.getAttribute("relaProdInfoList"); */

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
	String offerStatusCd="";
	String prodStatus = "";
	String paymentModeCd = "";
	String baseProdOfferName = "";
	String  ifBundle =""; //0-单一销售品 1-组合销售品  
	String productId="-1";//单销售品时使用
	String serviceKind="";//业务类型
	

	boolean changeButton1 = PageCheck.ifHaveRight(request,"841ABE");//变更:销售品
	boolean changeButton2 = PageCheck.ifHaveRight(request,"841ABF");//变更:组合或接入类产品
	boolean changeButton3 = PageCheck.ifHaveRight(request,"841ABG");//变更:接入类
	boolean changeButton4 = PageCheck.ifHaveRight(request,"841ABH");//变更:功能类
	boolean changeButton6 = PageCheck.ifHaveRight(request,"841ABI");//变更:E9下接入类
	
	String governmentCustCount= NullProcessUtil.nvlToString(request
			.getAttribute("governmentCustCount"), "0");	//查询客户是否是存政企客户。存政企客户只展现下面的用户，不能够办理业务。
	String custId= NullProcessUtil.nvlToString(request
			.getAttribute("custId"), "-1");	//客户Id
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<meta http-equiv="MSThemeCompatible" content="no" />
		<title>客户订购信息</title>
		<style type="text/css">
			@import "<%=webPath%>/unieap/ria3.3/unieap/themes/default/css/unieap.css";
		</style>
		<link href="<%=webPath%>/common/dx20/css/workarea_style.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=webPath%>/unieap/ria3.3/unieap/themes/base/css/unieap.css"/>
		<link rel="stylesheet" type="text/css" href="<%=webPath%>/unieap/ria3.3/unieap/themes/blue/css/unieap.css"/> 
		
		<link href="<%=webPath%>/common/css/td_style_new.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=webPath %>/unieap/ria3.3/dojo/dojo.js" djConfig="isDebug: false, parseOnLoad: true"></script>

		<script language=javascript src="<%=webPath%>/unieap/js/Common.js"></script>
		<script language="javascript"
			src="<%=webPath%>/common/js/td_common.js"></script>
		<script language=javascript src="<%=webPath%>/unieap/js/Globals.js"></script>
		<script language="javascript" src="<%=webPath%>/orderaccept/common/js/CommonUtils.js"></script>
		<script language="javascript"
			src="<%=webPath%>/orderaccept/common/js/switchdown.js"></script>
		<script language="javascript"
			src="<%=webPath%>/custcontact/orderaccept/base/jutil/JUtil.js"></script>
		<script type="text/javascript">
			dojo.require("unieap.layout.TitlePane");
		    dojo.require("unieap.form.Button");
			dojo.require("unieap.Tooltip");
		</script>
		<script language="javascript" src="<%=webPath%>/orderaccept/riaconfig/crm1GlobalConfig.js"></script>
		<script language="javascript" src="<%=webPath%>/orderaccept/common/dialog/MessageBox.js"></script>
		<script language="javascript" src="<%=webPath%>/orderaccept/custRecognition/js/OrderList.js"></script>
		
	</head>
	<body class="unieap mainBody">
		<input type="hidden" id="webPath" name="webPath" value="<%=webPath %>" />
		<input type="hidden" id="queryType" name="queryType"
			value="<%=queryType %>" />
		<input type="hidden" id="serviceIdShow" name="serviceIdShow"
			value="<%=serviceIdShow %>" />
		<input type="hidden" id="governmentCustCount" name="governmentCustCount"
			value="<%=governmentCustCount%>" />
		<input type="hidden" id="custId" name="custId"
			value="<%=custId%>" />
		<input type="hidden" id="custId" name="custId"
			value="<%=custId%>" />	
			
		<table width="100%" cellpadding="0" cellspacing="0" border="0"
			class="content_td">
			<tr>
				<td>
					<table align="center" border="0" cellpadding="0" cellspacing="2" class="formTableCore">
						<tr>
							<td class="formLabel" style="width: 5%">业务号码：</td>
							<td class="formField1">
								<span>
									<input id="serviceIdSearchInput" name="serviceIdSearchInput" type="text"  class="NEUHTCInput" maxlength="30"  prompt="业务号码" onblur="trimField(this);" onkeydown="enterSearch()" />
								</span>
								<input id="custOrderSearchDiv" type="button" class="searchBtnButton" onclick="searchOrderByServiceId()" />
							</td>
						</tr>
						<tr>
							<td colspan="2">
								<div id="prodWindow" style="display: none;position: absolute; z-index: 99;width: 100%;">
									<iframe allowtransparency="true" frameborder="0" id="offerList" 
										scrolling="no" width="100%" src="" ></iframe>
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
							<td width="31%" colspan="4">
								销售品/产品名称
							</td>
							<td width="11%">
								接入号码
							</td>
							<td width="12%">
								状态
							</td>
							<td width="8%">
								付费方式
							</td>
							<td width="9%">
								生效时间
							</td>
							<td width="9%">
								失效时间
							</td>
							<td width="18%">
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
								offerProdStatus = NullProcessUtil.nvlToString(pOfferInfoVOList.get(i).getStatusCdDesc(), "&nbsp;");
								offerStatusCd = NullProcessUtil.nvlToString(pOfferInfoVOList.get(i).getStatusCd(), "&nbsp;");
								ifBundle  = NullProcessUtil.nvlToString(pOfferInfoVOList.get(i).getIfBundle(), "&nbsp;");
								//如果是单销售品需要取出接入类的产品ID
								if(("0").equals(ifBundle)){
									List<RelaProdInfoVO> relaProdInfoList=pOfferInfoVOList.get(i).getRelaProdInfoList();
									if(null!=relaProdInfoList &&relaProdInfoList.size()>0){
										for(RelaProdInfoVO tempVO: relaProdInfoList){
											if(tempVO.getProdFuncType().equals(ConstantsPool.get(ProductFuncTypeConst.ACCESS))){
												productId = NullProcessUtil.nvlToString(tempVO.getProdId(), "&nbsp;");
												serviceKind  =  NullProcessUtil.nvlToString(tempVO.getServiceKind(), "&nbsp;");
												break;
											}
										}
									}
								}	
								
								
								//如果是预约则不展示变更按钮   //governmentCustCount不等于说明是存政企客户 则只能展示  //serviceKind等于12说明是集团业务s
							    if((offerStatusCd.equals(ConstantsPool.get(OfferStatusCDConst.RESERVE)) ||!governmentCustCount.equals("0"))&& !("12").equals(serviceKind)){
							    	changeButton1=false;
									changeButton2=false;
									changeButton3=false;
									changeButton4=false;
									changeButton6=false;
							    }else{
							    	changeButton1=true;
									changeButton2=true;
									changeButton3=true;
									changeButton4=true;
									changeButton6=true;
							    }
									
						%>
						<tr class="table_top" onmouseover='setColor(this)'
							onmouseout='resetColor(this)'>
							<td width="2%">
								<img src="common/dx20/images/down_2.gif" width="16" height="18"
									style="cursor:hand"
									onclick="switchdown(this,'tr0<%=i%>','trP<%=i%>')" />
							</td>
							<td width="31%" colspan="4">
								<%=offerName%>
							</td>
							<td width="11%">
								&nbsp;
							</td>
							<td width="12%">
								<%=offerProdStatus%>
							</td>
							<td width="8%">
								&nbsp;
							</td>
							<td width="9%">
								<%=effDate%>
							</td>
							<td width="9%">
								<%=expDate%>
							</td>
							<td width="17%">
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
									<tr class="table_content" onmouseover='setColor(this)'
										onmouseout='resetColor(this)'>
										<td width="2%">
											&nbsp;
										</td>
										<td width="31%" colspan="4">
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
											<%=prodName%>
										</td>
										<td width="11%" id="serviceId-<%=serviceId%>">
											<%=serviceId%>
										</td>
										<td width="12%">
											<%=prodStatus%>
										</td>
										<td width="8%">
											<%=paymentModeCd%>
										</td>
										<td width="9%">
											<%=effDate%>
										</td>
										<td width="9%">
											<%=expDate%>
										</td>
										<td width="17%">
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
												<tr class="table_content" onmouseover='setColor(this)'
													onmouseout='resetColor(this)'>
													<td width="2%">
														&nbsp;
													</td>
													<td width="31%" colspan="4">
														&nbsp;
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
														<%=prodName%>
													</td>
													<td width="11%" id="serviceId-<%=serviceId%>">
														<%=serviceId%>
													</td>
													<td width="12%">
														<%=prodStatus%>
													</td>
													<td width="8%">
														<%=paymentModeCd%>
													</td>
													<td width="9%">
														<%=effDate%>
													</td>
													<td width="9%">
														<%=expDate%>
													</td>
													<td width="17%">
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
																onmouseover='setColor(this)'
																onmouseout='resetColor(this)'>
																<td width="2%">
																	&nbsp;
																</td>
																<td width="31%" colspan="4">
																	&nbsp;&nbsp;
																	<img src="common/dx20/images/down_3.gif" width="16"
																		height="18" style="cursor:hand"/>
																	<%=prodName%>
																</td>
																<td width="11%" id="serviceId-<%=serviceId%>">
																	<%=serviceId%>
																</td>
																<td width="12%">
																	<%=prodStatus%>
																</td>
																<td width="8%">
																	<%=paymentModeCd%>
																</td>
																<td width="9%">
																	<%=effDate%>
																</td>
																<td width="9%">
																	<%=expDate%>
																</td>
																<td width="17%">
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
												offerProdStatus = NullProcessUtil.nvlToString(pOfferInfoVOListTwo.get(k).getStatusCdDesc(), "&nbsp;");
												offerStatusCd = NullProcessUtil.nvlToString(pOfferInfoVOListTwo.get(k).getStatusCd(), "&nbsp;");
												//如果是预约则不展示变更按钮
											    if(offerStatusCd.equals(ConstantsPool.get(OfferStatusCDConst.RESERVE)) ||!governmentCustCount.equals("0")){//不等于说明是存政企客户 则只能展示
											    	changeButton1=false;
													changeButton2=false;
													changeButton3=false;
													changeButton4=false;
													changeButton6=false;
											    }else{
											    	changeButton1=true;
													changeButton2=true;
													changeButton3=true;
													changeButton4=true;
													changeButton6=true;
											    }
													
									%>
									<tr class="table_content"  style="background-color: #E7F1D8">
										<td width="2%" >
											&nbsp;
										</td>
										<td width="31%" colspan="4">
											<img src="common/dx20/images/down_2.gif" width="16"
												height="18" style="cursor:hand"
												onclick="switchdown(this,'trC<%=i%><%=k%>')" />
											<%=offerName%>
										</td>
										<td width="11%">
											&nbsp;
										</td>
										<td width="12%">
											<%=offerProdStatus%>
										</td>
										<td width="8%">
											&nbsp;
										</td>
										<td width="9%">
											<%=effDate%>
										</td>
										<td width="9%">
											<%=expDate%>
										</td>
										<td width="17%">
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
												<tr class="table_content" onmouseover='setColor(this)'
													onmouseout='resetColor(this)'>
													<td width="2%">
														&nbsp;
													</td>
													<td width="31%" colspan="4">
														&nbsp;
														<img src="common/dx20/images/down_3.gif" width="16"
															height="18" style="cursor:hand"/>
														<%=prodName%>
													</td>
													<td width="11%" id="serviceId-<%=serviceId%>">
														<%=serviceId%>
													</td>
													<td width="12%">
														<%=prodStatus%>
													</td>
													<td width="8%">
														<%=paymentModeCd%>
													</td>
													<td width="9%">
														<%=effDate%>
													</td>
													<td width="9%">
														<%=expDate%>
													</td>
													<td width="17%">												
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
			<input type="hidden" id="serviceKindHidden" name="serviceKindHidden" value="<%=serviceKind%>" />
		</table>
		
	</body>
</html>