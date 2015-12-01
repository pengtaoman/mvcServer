<%
/* 
JSP�����Ҫ������Ϣ
****************************************************************
* ������	: OfferStandardAcceptContent.jsp
* ��������: 2012-02-21
* ����		: Shaochy
* ģ��		: �����׼���ײ���Ϣ
* ����		: 
* ��ע		: 
* ------------------------------------------------------------
* �޸���ʷ
* ���		����		�޸���			�޸�ԭ��
* 1
* 2
****************************************************************
*/
%>
<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%@ page import="java.util.List"%>
<%@ page import="java.text.DecimalFormat"%>
<%@ page import="com.neusoft.crm.ordermgr.business.prodoffersale.data.ProdOfferAcceptInfoVO"%>
<%@ page import="com.neusoft.crm.ordermgr.common.productinst.data.OfferStandardInstVO"%>
<%
	String webpath = request.getContextPath();
	
	String jsonMap = (String)request.getAttribute("jsonMap");
	String jsonCustInfo = (String)request.getAttribute("jsonCustInfo");
	String jsonOfferAcceptInfoVOList = (String)request.getAttribute("jsonOfferAcceptInfoVOList");
	String strContactDefault = NullProcessUtil.nvlToString(
			request.getAttribute("strContactDefault"),"");//��ѡ��ϵ��
	List<ProdOfferAcceptInfoVO> returnOfferAcceptInfoVOList = 
			(List<ProdOfferAcceptInfoVO>)request.getAttribute("returnOfferAcceptInfoVOList");
	String acceptDay = NullProcessUtil.nvlToString(request.getAttribute("acceptDay"),"");
	String serviceOfferId = NullProcessUtil.nvlToString(request.getAttribute("serviceOfferId"),"");
	String queryServiceId = NullProcessUtil.nvlToString(request.getAttribute("serviceId"),"");
	String prodOfferInstId = "";
	String prodOfferId = "";
	String offerName = "";
	String serviceId = "";
	long prodInstId;
	String productId = "";
	String effDate = "";
	String expDate = "";

	
	String offerStandardInsteEffDate = "";
	String offerStandardInsteExpDate = "";
	String offerStandardInsteFeeValue = "";
%>
<html>
	<head>
		<title>�����׼���ײ���Լ</title>
		<contextPath value="<%=webpath%>" />
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
		<link rel="stylesheet" type="text/css" href="<%=webpath%>/buscard/css/buscard_2.0.css">
		<link rel="stylesheet" type="text/css" href="<%=webpath%>/common/css/td_style_new.css"  />
		<link rel="stylesheet" type="text/css" href="<%=webpath%>/common/dx20/css/workarea_style.css" />		
		<link rel="stylesheet" type="text/css" href="<%=webpath%>/unieap/ria3.3/unieap/themes/base/css/unieap.css"/>
		<link rel="stylesheet" type="text/css" href="<%=webpath%>/unieap/ria3.3/unieap/themes/blue/css/unieap.css"/> 
		
		<script language="javascript" src="<%=webpath%>/unieap/ria3.3/dojo/dojo.js"></script>	
		<script type="text/javascript" src="<%=webpath%>/buscard/common/js/buscard_2.0.js"></script>			
		<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"> </script>
		<script language="javascript" src="<%=webpath%>/unieap/js/BaseObj.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/EAPObjsMgr.js"></script>
		<script language="javascript" src="<%=webpath%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=webpath%>/custcontact/common/js/crm_common.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/PasswordObj.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/PasswordConfirmObj.js"></script>
		<script language="javascript" src="<%=webpath%>/custcontact/common/businessmodule/jscu/Jscu.js"></script>
		<script language="javascript" src="<%=webpath%>/orderaccept/common/js/switchdown.js"></script>
		<!-- �������֤ -->
		<script language="javascript" src="<%=webpath%>/custcontact/businessaccept/js/CheckIdHandler.js"></script>
		<script language="javascript" src="<%=webpath%>/custcontact/common/js/td_operation.js"></script>
		<!-- �ȴ���js-->
		<script language="javascript" src="<%=webpath%>/common/js/waitingbar.js"></script>
		<script language="javascript" src="<%=webpath%>/custcontact/common/js/commonPattern.js"></script>
		<script type="text/javascript" src="<%=webpath%>/orderaccept/riaconfig/crm1GlobalConfig.js"></script>
		<script language="javascript" src="<%=webpath%>/orderaccept/common/dialog/MessageBox.js"></script>
		<%@ include file="/unieap/ria3.3/pages/config.jsp"%>		
		<script type="text/javascript" src="<%=webpath%>/orderaccept/riaconfig/crm1InitConfig.js"></script>
		<script language="javascript" src="<%=webpath%>/orderaccept/prodofferaccept/behavior/ProdOfferNewBehavior.js"></script>
		<!-- �����׼���ײ�js -->		
		<script language="javascript" src="<%=webpath%>/orderaccept/offerstandardaccept/js/OfferStandardAcceptContent.js"></script>
	</head>
	
	<body onload="OfferStandard.create.init();" onbeforeunload="removeDataStoreFromSession();" 
			class="mainBody">
		<unieap:form method="post" action="">
			<input type="hidden" name="webpath" value="<%=webpath%>" />
			<input type="hidden" id="jsonMap" name="jsonMap" value='<%=jsonMap%>' />
			<input type="hidden" id="jsonCustInfo" name="jsonCustInfo" value='<%=jsonCustInfo%>' />
			<input type="hidden" id="jsonOfferAcceptInfoVOList" name="jsonOfferAcceptInfoVOList" value='<%=jsonOfferAcceptInfoVOList%>' />
			<input type="hidden" id="newJsonInfo" name="newJsonInfo" value='' />
			<input type="hidden" name="strContactDefault" id="strContactDefault" value="<%=strContactDefault%>" />
			<input type="hidden" name="acceptDay" id="acceptDay" value="<%=acceptDay%>" />
			<input type="hidden" name="acceptWay" id="acceptWay" value="1" />
			<input type="hidden" name="serviceOfferId" id="serviceOfferId" value="<%=serviceOfferId%>" />
			<table border="0" cellpadding="0" cellspacing="0" class="formTable">
				<tr>
					<td>
						<div id = "custInfoDiv"></div>
					</td>
				</tr>
			</table>
			<br>
			<table border="0" cellpadding="0" cellspacing="0" class="formTable">
				<tr>
					<td colspan="3">
						<table width="100%" border="1" cellpadding="0" cellspacing="0"
						bordercolor="#d9d9d9" style="border-collapse:collapse;">
							<tr class="tableTitleTR2">
								<td colspan="8">
									<table width="100%" border="0" cellpadding="0" cellspacing="0"
										id="queryTable">
										<tr>
											<td class="tableTitleLeft2">
												&#160;
											</td>
											<td class="tableTitle2">
												��������Ʒ��Ϣ
											</td>
											<td class="tableTitleRight2">
												&#160;
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr class="table_title">
								<td width="2%">
									&nbsp;
								</td>
								<td width="20%">
									����Ʒ/Э������Ϣ
								</td>
								<td width="13%">
									����ʱ��
								</td>
								<td width="13%">
									ʧЧʱ��
								</td>
								<td width="13%">
									Э���ڿ�ʼʱ��
								</td>
								<td width="13%">
									Э����ʧЧʱ��
								</td>
								<td width="13%">
									�����ڷ��ã�Ԫ��
								</td>
								<td width="13%">
									����
								</td>
							</tr>
						
							<%
							if (null != returnOfferAcceptInfoVOList && returnOfferAcceptInfoVOList.size() > 0) {
								int len = returnOfferAcceptInfoVOList.size();
								String color = "";
								for (int i = 0; i < len; i++) {
									ProdOfferAcceptInfoVO returnOfferAcceptInfoVO = returnOfferAcceptInfoVOList.get(i);
									offerName = NullProcessUtil.nvlToString(returnOfferAcceptInfoVO.getProdOfferName(), "&nbsp;");
									effDate = NullProcessUtil.nvlToString(returnOfferAcceptInfoVO.getEffDate(), "&nbsp;");
									expDate = NullProcessUtil.nvlToString(returnOfferAcceptInfoVO.getExpDate(), "&nbsp;");
									prodOfferInstId = NullProcessUtil.nvlToString(returnOfferAcceptInfoVO.getProdOfferInstId(),"&nbsp;");
									prodOfferId = NullProcessUtil.nvlToString(returnOfferAcceptInfoVO.getProdOfferId(), "&nbsp;");
									//offerProdStatus = NullProcessUtil.nvlToString(returnOfferAcceptInfoVO.getStatusCd(), "&nbsp;");
									serviceId = returnOfferAcceptInfoVO.getRelaProdInfoList().get(0).getServiceId();
									prodInstId = returnOfferAcceptInfoVO.getRelaProdInfoList().get(0).getProdInstId();
									productId = returnOfferAcceptInfoVO.getRelaProdInfoList().get(0).getProdId();
									if(offerName.indexOf(queryServiceId)!=-1){
										color = "color='red'";
									}else{
										color = "color='black'";
									}
							%>
							<tr class="table_top" id="trA<%=prodOfferId%>">
								<td width="2%">
									<img src="common/dx20/images/down_2.gif" width="16" height="18"
										style="cursor:hand"
										onclick="switchdown(this,'trB<%=i%>','')">
								</td>
								<td width="20%"  >
									<font <%=color%> ><%=offerName%></font>
								</td>
								<td width="13%">
									<font <%=color%> ><%=effDate%></font>
								</td>
								<td width="13%">
									<font <%=color%> ><%=expDate%></font>
								</td>
								<td width="13%" align="center">
									&nbsp;--
								</td>
								<td width="13%">
									&nbsp;--
								</td>
								<td width="13%">
									&nbsp;--
								</td>
								<td width="13%">
									<font <%=color%> >
									<a onclick="addNewOfferStandardInst('<%=i%>','<%=prodOfferInstId%>','<%=serviceId%>','<%=prodInstId%>','<%=productId%>','<%=prodOfferId%>')" 
										style="cursor: pointer;">��Լ</a>
									<a id="<%="deleteOfferStandardInst"+i %>" onclick="deleteOfferStandardInst('<%=i%>','<%=prodOfferInstId%>')" style="cursor: pointer;" disabled >ɾ��</a>
									<a href="javascript:void(0)" id="<%="detailOfferStandardInst"+i %>" onmouseover="detailOfferStandardInst(this,'<%=i%>','<%=prodOfferId%>')"  value="" style="cursor: pointer;">Э����Ϣ</a>
									</font>
									<div style="border-bottom-color: blue;border: 1px"></div>
								</td>
							</tr>
							<tr id="trB<%=i%>">
								<td colspan="8">
									<table id="trT<%=i%>" width="100%" border="0" cellspacing="0" cellpadding="0">
										<%
										List<OfferStandardInstVO> offerStandardInstVOList = returnOfferAcceptInfoVO.getRelaOfferStandardInstList();
										if (null != offerStandardInstVOList && offerStandardInstVOList.size() > 0 ) {
											int len1 = offerStandardInstVOList.size();
											DecimalFormat df1 = new DecimalFormat("0.00"); 
											for (int j = 0; j < len1; j++) {												
												OfferStandardInstVO offerStandardInstVO =  offerStandardInstVOList.get(j);
												offerStandardInsteEffDate = NullProcessUtil.nvlToString(offerStandardInstVO.getSEffDate(), "&nbsp;");
												offerStandardInsteExpDate = NullProcessUtil.nvlToString(offerStandardInstVO.getSExpDate(), "&nbsp;");
												offerStandardInsteFeeValue = NullProcessUtil.nvlToString(offerStandardInstVO.getFeeValue(), "&nbsp;");
												if(offerStandardInsteFeeValue!=null && !"".equals(offerStandardInsteFeeValue)){
													offerStandardInsteFeeValue = df1.format(Double.parseDouble(offerStandardInsteFeeValue)/100)+"Ԫ";
												}		
										%>
										<thead>
										<tr id="trC<%=j%>" class="table_content" onmouseover='mouseoverevent(this)'
										onmouseout='mouseoutevent(this)'>
											<td width="2%">
												&nbsp;
											</td>
											<td width="20%">
												<img src="common/dx20/images/down_3.gif" width="16" height="18"
													style="cursor:hand">
											</td>
											<td width="13%">
												&nbsp;
											</td>
											<td width="13%">
												&nbsp;
											</td>
											<td width="13%">
												<%=offerStandardInsteEffDate%>
											</td>
											<td width="13%">
												<%=offerStandardInsteExpDate%>
											</td>
											<td width="13%">
												<%=offerStandardInsteFeeValue%>
											</td>
											<td width="13%">
												&nbsp;
											</td>
										</tr>
										</thead>
									<% 
										}
									}
									%>
									<tbody id="newOfferStandardInst<%=i%>">
									</tbody>
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
			</table>

			<div class="formButtonDIV">
				<unieap:unieapbutton securityid="print" classname="formButton" name="BPrint" value="�����ӡ"/>
				<unieap:unieapbutton securityid="sub" classname="formButtonL" id="BSubmit" name="BSubmit" value="��������/Ԥ��"/>				
				<unieap:unieapbutton securityid="sub" classname="formButton" id="BComplete" name="BComplete" value="�������"/>	
				<unieap:unieapbutton securityid="pay" classname="formButton" id="BPay" name="BPay" value="�ɷ�"/>
			</div>
		</unieap:form>
	</body>
</html>