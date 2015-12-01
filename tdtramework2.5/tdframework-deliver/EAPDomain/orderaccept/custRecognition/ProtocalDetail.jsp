<%
	 /* 
	 **************************************************************
	 * 程序名	: ProtocalDetail.jsp
	 * 建立日期  	: 2012年12月10日
	 * 作者		: zhuguojun@neusoft.com
	 * 模块		: 政企协议详情
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
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%@ page import="java.util.List"%>
<%@ page import="com.neusoft.crm.ordermgr.business.enterpriseprotocol.ProtocolAcceptInfoVO"%>

<%
	String webPath = request.getContextPath();
	String protocolAcceptInfoListJson = (String) request.getAttribute("protocolAcceptInfoListJson");
	List<ProtocolAcceptInfoVO> protocolAcceptInfoList = (List<ProtocolAcceptInfoVO>) request.getAttribute("protocolAcceptInfoList");
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>政企协议详情</title>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK"/>
		<!-- 禁止缓存 headers -->
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="Expires" content="-1" />
		<meta http-equiv="Cache-Control" content="no-cache" />
		<!-- end 禁止缓存 headers -->
		<link href="<%=webPath%>/common/css/td_style_new.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=webPath%>/unieap/ria3.3/unieap/themes/base/css/unieap.css"/>
		<link rel="stylesheet" type="text/css" href="<%=webPath%>/unieap/ria3.3/unieap/themes/blue/css/unieap.css"/> 
		<!-- 公用js -->
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
		<script type="text/javascript" src="<%=webPath%>/buscard/common/js/buscard_2.0.js"></script>
		<!-- 页面级js -->
		<script language="javascript" src="<%=webPath%>/orderaccept/custRecognition/js/ProtocalDetail.js"></script>
		<script type="text/javascript">
			var protocolAcceptInfoListJsonStr = <%=protocolAcceptInfoListJson%>;
			var protocolAcceptInfoListObj = (typeof protocolAcceptInfoListJsonStr == 'string')
				                        ? eval("(" + protocolAcceptInfoListJsonStr + ")")
				                        : protocolAcceptInfoListJsonStr;
		</script>
	</head>
	<body class="unieap mainBody">
		<input type="hidden" id="webPath" name="webPath" value="<%=webPath %>" />
		<input type="hidden" id="protocolAcceptInfoListJson" name="protocolAcceptInfoListJson" value="<%=protocolAcceptInfoListJson %>" />
		<input type="hidden" id="selectProdOfferId"  />
		<input type="hidden" id="webPath"  value = "<%=webPath %>"/>
		
		<div class="tooltip-wrapper">
			<div class="tooltip-title">
				<span class="tooltip-title-text">协议包含销售品信息</span>
			</div>
			<div class="tooltip-content" style="padding-bottom: 0px;">
				<table height="60px">
				<%boolean isFirst = true;
					boolean isHaveWaitForNew = false;
					int leftCnt = 0;
				for(ProtocolAcceptInfoVO vo : protocolAcceptInfoList){
					leftCnt = vo.getProdOfferMaxNum() - vo.getProdOfferNum();%>
					<tr>
						<td><%if(leftCnt > 0){ 
							isHaveWaitForNew = true;%>
							<span style="cursor: hand;"  onclick="changeOffer(this,'<%=vo.getProtocolProdOfferInfoVO().getProdOfferId()%>')">
								<input type="radio" name="serviceOffer" <%if(isFirst){ %>checked="checked"<%} %>/> 
								<label><%=vo.getProtocolProdOfferInfoVO().getProdOfferName() %> &nbsp;&nbsp;【剩余<font color="red" style="font-weight: bold;"><%=leftCnt %></font>个待新装】</label>
								<%if(isFirst){%>
								<script type="text/javascript">changeOffer(null, '<%=vo.getProtocolProdOfferInfoVO().getProdOfferId()%>');</script>
								<%isFirst = false;} %>
							</span>
							<%} else{ %>
							<span>
								<label><%=vo.getProtocolProdOfferInfoVO().getProdOfferName() %> &nbsp;&nbsp;【剩余<font color="red" style="font-weight: bold;"><%=leftCnt %></font>个待新装】</label>
							</span>
							<%} %>
						</td>
					</tr>
				<%
				}
				%>
					<tr><td>&nbsp;</td></tr>
				</table>
				
			</div>
			<div align="center" style="padding-top: 10px;">
				<%if(isHaveWaitForNew){ %>
				<unieap:unieapbutton classname="bubbleButton" name="btnOfferSubmit" value="确认" onclick="turnOrder()"/>
				<%} %>
				<unieap:unieapbutton classname="bubbleButton" name="btnClose" value="关闭" onclick="parent.unieap.hideTooltip();"/>
			</div>
		</div>
	</body>
</html>