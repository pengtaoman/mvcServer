<%
	/* 
	 **************************************************************
	 * ������		: Serviceoffer.jsp
	 * ��������  	: 2011��1��10��
	 * ����		: rkchenll
	 * ģ��		: ҵ����ҳ��
	 * ����		: 
	 * ��ע		: 
	 * ------------------------------------------------------------
	 * �޸���ʷ
	 * ���		����		�޸���	�޸�ԭ��
	 * 1     2012-5-15  ף����    UI����
	 * 2
	 **************************************************************
	 */
%>

<%@ page language="java" pageEncoding="GBK"%>
<%@ page import="java.util.List"%>
<%@ page import="com.neusoft.crm.ordermgr.business.common.data.ServiceOfferVO"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%
	String webPath = request.getContextPath();	
	List serviceOfferList=(List)request.getAttribute("serviceOfferList");
	String serviceId = NullProcessUtil.nvlToString(request.getAttribute("serviceId"),"");
	String userId = NullProcessUtil.nvlToString(request.getAttribute("userId"),"");
	String productId = NullProcessUtil.nvlToString(request.getAttribute("productId"),"");
	String custOrderId = NullProcessUtil.nvlToString(request.getAttribute("custOrderId"),"");
	String custXml = NullProcessUtil.nvlToString(request.getAttribute("custXml"),"");
	String cityCode = NullProcessUtil.nvlToString(request.getAttribute("cityCode"),"");
	String prodOfferInstId = NullProcessUtil.nvlToString(request.getAttribute("prodOfferInstId"), "");
	String prodOfferId = NullProcessUtil.nvlToString(request.getAttribute("prodOfferId"), "");	
	String custId = NullProcessUtil.nvlToString(request.getParameter("custId"), "");	
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK"/>
		<contextPath value="<%=webPath%>" />
		<!-- ��ֹ���� headers -->
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="Expires" content="-1" />
		<meta http-equiv="Cache-Control" content="no-cache" />
		<!-- end ��ֹ���� headers -->
		<link href="<%=webPath%>/common/css/td_style_new.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=webPath%>/unieap/ria3.3/unieap/themes/base/css/unieap.css"/>
		<link rel="stylesheet" type="text/css" href="<%=webPath%>/unieap/ria3.3/unieap/themes/blue/css/unieap.css"/> 
		
		<!-- ҳ�漶js -->
		<script language="javascript" src="<%=webPath%>/orderaccept/custRecognition/js/ServiceOffer.js"></script>
		<!-- ����js -->
		<script language="javascript" src="<%=webPath%>/custcontact/common/js/td_operation.js"></script>
		<script language="javascript" src="<%=webPath%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=webPath%>/custcontact/common/js/crm_common.js"> </script>
		<script language="javascript" src="<%=webPath%>/unieap/js/Globals.js"> </script>
		<script language="javascript" src="<%=webPath%>/unieap/js/Common.js"> </script>
		<script language="javascript" src="<%=webPath%>/custcontact/orderaccept/base/jscu/Jscu.js"> </script>
		<script language="javascript" src="<%=webPath%>/custcontact/orderaccept/base/Common.js"> </script>
		<script language="javascript" src="<%=webPath%>/unieap/ria3.3/dojo/dojo.js"></script>
		<script language="javascript" src="<%=webPath%>/orderaccept/riaconfig/crm1GlobalConfig.js"></script>
		<script language="javascript" src="<%=webPath%>/orderaccept/common/dialog/openWinDialog.js"></script>
		<script language="javascript" src="<%=webPath%>/orderaccept/common/dialog/MessageBox.js"></script>
		<title>ҵ����</title>
	</head>
	<body style="padding: 0px;" >
		<input type="hidden" name="custXml" id="custXml" value="<%=custXml %>" />
		<input type="hidden" name="cityCode" id="cityCode" value="<%=cityCode %>" />
		<input type="hidden" name="prodOfferInstId" id="prodOfferInstId" value="<%=prodOfferInstId %>" />
		<input type="hidden" name="prodOfferId" id="prodOfferId"  value="<%=prodOfferId %>" />
		<input type="hidden" name="custOrderId" id="custOrderId" value="<%=custOrderId %>" />
		<input type="hidden" name="custId" id="custId" value="<%=custId%>" />
		<input type="hidden" name="hiddenChooseOffer" id="hiddenChooseOffer" value=""/>
		<div class="tooltip-wrapper">
			<div class="tooltip-title">
				<span class="tooltip-title-text">��Ʒ���</span>
			</div>
			<div class="tooltip-content" style="padding-bottom: 0px;">
				<table align="center" border="0" cellspacing="0" cellpadding="0" width="370px" height="130px;">
		                        <!-- ������һ���ɱ��ҵ��-->
							<%
								for(int i = 0;i<serviceOfferList.size();i++)
								{
									ServiceOfferVO vo = (ServiceOfferVO)serviceOfferList.get(i);
							%>
									<!-- �ж��Ƿ��ǵ�һ�����ǵ�һ����ͷ-->
								<%
									if(i==0)
									{
								%>				
									<tr>
										<td width="33%">
											<span style="cursor: hand;"  onclick="changeOffer(this,'<%=vo.getServiceOfferId()%>#<%=userId%>#<%=vo.getActionCd()%>#<%=serviceId%>#<%=productId%>#<%=custOrderId %>#<%=vo.getIfDisplay()%>#<%=vo.getActionName()%>')">
												<input type="radio" name="serviceOffer" checked="checked"/>
												<label><%=vo.getActionName() %></label>
											</span>
										</td>
										<script type="text/javascript">changeOffer(null, '<%=vo.getServiceOfferId()%>#<%=userId%>#<%=vo.getActionCd()%>#<%=serviceId%>#<%=productId%>#<%=custOrderId %>#<%=vo.getIfDisplay()%>#<%=vo.getActionName()%>');</script>
										<!-- ���ͬʱ�����һ�������β��-->
									<%
										if(i==serviceOfferList.size()-1)
										{
									%>	
												<script language='javascript'>
														var index=<%=i%>;
														var j = 3-(index+1)%3;
														for ( var tem = 0; tem < j; tem++) {
															document.write("<td width='33%'>&#160</td>");
														}
												</script>
												</tr>
									<%
										}
									%>
								<%
									}
									else if(i==serviceOfferList.size()-1)//�ж��Ƿ������һ��
									{
								%>	
											<td width="33%" >
												<span style="cursor: hand;"  onclick="changeOffer(this,'<%=vo.getServiceOfferId()%>#<%=userId%>#<%=vo.getActionCd()%>#<%=serviceId%>#<%=productId%>#<%=custOrderId %>#<%=vo.getIfDisplay()%>#<%=vo.getActionName()%>')">
													<input type="radio" name="serviceOffer" />
													<label><%=vo.getActionName() %></label>
												</span>
											</td>
										<!-- 
											�ж��Ƿ��Ǳ������һ��
											�ǣ���β
											���ǣ������񣬼�β		
										-->
										<%
											if((i+1)%3==0)
											{
										%>
												</tr>
										<%
											}
											else
											{
										%>
									
													<script language='javascript'>
														var index = <%=i%>;
														var j = 3-(index+1)%3;
														for ( var tem = 0; tem < j; tem++) {
															document.write("<td width='33%' >&#160</td>");
														}
													</script>
												</tr>		
															
									<%
											}
										}
										else if((i+1)%3==0){
									%>	

										<td width="33%">
											<span style="cursor: hand;" onclick="changeOffer(this,'<%=vo.getServiceOfferId()%>#<%=userId%>#<%=vo.getActionCd()%>#<%=serviceId%>#<%=productId%>#<%=custOrderId %>#<%=vo.getIfDisplay()%>#<%=vo.getActionName()%>')">
												<input type="radio" name="serviceOffer" />
												<label ><%=vo.getActionName() %></label>
											</span>
										</td>
									</tr>
									<tr >
									<%
										}
										else 
										{
									%>	
										<td width="33%" >
											<span style="cursor: hand;" onclick="changeOffer(this,'<%=vo.getServiceOfferId()%>#<%=userId%>#<%=vo.getActionCd()%>#<%=serviceId%>#<%=productId%>#<%=custOrderId %>#<%=vo.getIfDisplay()%>#<%=vo.getActionName()%>')" >
												<input type="radio" name="serviceOffer" />
												<label ><%=vo.getActionName() %></label>
											</span>
										</td>
									<%
										}
									%>
							<%
								}
							%>
		                      </table>
		                      <div align="center" style="padding-top: 10px;">
		                      	<unieap:unieapbutton securityid="" classname="bubbleButton"
														name="btnOfferSubmit" value="ȷ��" onclick="doSubmitOffer()"/>
										<unieap:unieapbutton securityid="" classname="bubbleButton"
														name="BQuery" onclick="" value="�ر�" onclick="parent.unieap.hideTooltip();"/>
		                      </div>
			</div>
		</div>
	</body>
</html>