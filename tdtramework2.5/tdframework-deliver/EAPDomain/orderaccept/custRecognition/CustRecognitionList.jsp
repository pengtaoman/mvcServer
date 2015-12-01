<%
	 /* 
	 **************************************************************
	 * 程序名 : CustAllInfoQueryContent.jsp
	 * 建立日期: 2011-05-12
	 * 作者 : liurong@neusoft.com
	 * 模块 : 客户接触
	 * 描述 : 综合客户查询
	 * 备注 : 
	 * ------------------------------------------------------------
	 * 修改历史
	 * 序号       日期    修改人    修改原因
	 *  1     2012-5-15  祝国军    UI调整
	 **************************************************************
	 */
%>
<%@ page language="java" pageEncoding="GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Map"%>
<%
			
	String custId = NullProcessUtil.nvlToString((String) request
			.getAttribute("custId"), "0");//客户Id
	String cityCode = NullProcessUtil.nvlToString((String) request
			.getAttribute("cityCode"), "0");//cityCode
	String webPath = request.getContextPath();

	String queryType = NullProcessUtil.nvlToString((String) request
			.getAttribute("queryType"), "0"); //查询方式
	String queryLevel = NullProcessUtil.nvlToString((String) request
			.getAttribute("queryLevel"), "0");//查询级别，客户级，用户级
	String serviceId = NullProcessUtil.nvlToString(request
			.getAttribute("serviceId"), "0"); //接入号码
	String npInfo = NullProcessUtil.nvlToString(request
					.getAttribute("npInfo"), "0"); //NP业务信息
	String preRgsNo = NullProcessUtil.nvlToString(request
			.getAttribute("preRgsNo"), "0"); //预约受理编号
			
	String preAcceptQueryFlag = NullProcessUtil.nvlToString(request.getAttribute("preAcceptQueryFlag"),"");//根据客户编号查询预受理信息标识	
	
	String preAcceptInfo = NullProcessUtil.nvlToString(request
					.getAttribute("preAcceptInfo"), "0"); //预受理查询是否用证件查询
	String protocalInfoCount=  NullProcessUtil.nvlToString(request
			.getAttribute("protocalInfoCount"), "0"); //协议信息数量
			
	String matureCount = NullProcessUtil.nvlToString(request
			.getAttribute("matureCount"), "0"); //到期提醒的销售品数量
	//客户订购信息
	String custOrderList = "/newCustRecognitionAction.do?method=getCustOrderList&cityCode="
			+ cityCode
			+ "&custId="
			+ custId
			+ "&queryType="
			+ queryType
			+ "&queryLevel="
			+ queryLevel
			+ "&serviceId="
			+ serviceId;

	//客户预约订购信息
	String preCustOrderList = "/newCustRecognitionAction.do?method=getPreCustOrderList&cityCode="
			+ cityCode
			+ "&custId="
			+ custId
			+ "&queryType="
			+ queryType
			+ "&queryLevel="
			+ queryLevel
			+ "&serviceId="
			+ serviceId;

	//我的账户信息
	String accountInfo = "/newCustRecognitionAction.do?method=getAccountInfoDetail&cityCode="
			+ cityCode + "&custId=" + custId;

	//销售机会
	List<Map> opportunityList = (List<Map>) request
			.getAttribute("opportunityList");
	int oppCount = 0;
	if(opportunityList != null && opportunityList.size() > 0){
		oppCount = opportunityList.size();
	}
	//NP信息
	String npList="/newCustRecognitionAction.do?method=getNPInfoDetail&cityCode="
		+ cityCode + "&custId=" + custId+"&npServiceId="+serviceId+"&npInfo="+npInfo;
	
	//预约受理信息
	String preAcceptList ="/newCustRecognitionAction.do?method=getPreAcceptDetail&cityCode="
		+ cityCode + "&custId=" + custId+"&preRgsNo="+preRgsNo+"&preAcceptInfo="+preAcceptInfo+"&preAcceptQueryFlag="+preAcceptQueryFlag;
	
	//到期提醒
	String matureList = "/newCustRecognitionAction.do?method=getDueQuery&cityCode="
		+ cityCode + "&custId=" + custId;

	
	//在途订单
	String myorderList = "/myorderQueryAction.do?method=doQuery&custId="+custId+
					"&cityCode="+ cityCode+"&queryWay=2";
	//协议信息
	String protocalInfoList ="/newCustRecognitionAction.do?method=getProtocalInfo&cityCode="+ cityCode + "&custId=" + custId+"&protocalInfoCount="+protocalInfoCount;
	//营销信息（用户已办理的促销政策列表）
	String salesPromotionInfoList="/newCustRecognitionAction.do?method=getSalesPromotionInfo&custId=" + custId;
	Boolean npVisible =false; //NP TAB页是否显示
	Boolean npActive =false;  //NP TAB页是否默认首页
	Boolean custOrderActive =false;	//客户订购信息页是否默认首页
	Boolean preAcceptVisible =false; //预受理 TAB页是否显示
	Boolean preAcceptActive =false;  //预受理 TAB页是否默认首页
	Boolean matureVisible =false; //销售品到期提醒页是否显示
	Boolean protocalVisible =true; //协议信息 TAB页是否显示

	//TAB页是否显示功能判断
	if(!"".equals(npInfo)){
		npVisible=true;
		npActive=true;
	}else if(!"".equals(preRgsNo)){
		preAcceptVisible=true;
		preAcceptActive=true;
	}else{
		custOrderActive=true;
	}
	if(!"0".equals(matureCount)){//则存在到期提醒信息
		matureVisible=true;
	}
	if(!"0".equals(protocalInfoCount)){ //则显示协议信息
		protocalVisible =true;
	}
%>
<html>
	<head>
		<title>用户详细信息</title>
		<link rel="stylesheet"
			href="<%=webPath%>/unieap/css/tab/unieapTab.css" type="text/css"></link>
		<link rel="stylesheet" href="<%=webPath%>/common/css/td_style_tab.css"
			type="text/css"></link>
		<link href="<%=webPath%>/common/css/td_style_new.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript"
			src="<%=webPath%>/unieap/js/tab/tabApi.js"></script>
		<script language=javascript src="<%=webPath%>/unieap/js/Globals.js"></script>
		<script language=javascript
			src="<%=webPath%>/unieap/js/tab/unieapTab.js"></script>
		<script language=javascript src="<%=webPath%>/unieap/js/Common.js"></script>
		<script language=javascript
			src="<%=webPath%>/views/om/common_css_js/double_screen_js/double_screen.js"></script>
		<script language=javascript
			src="<%=webPath%>/custcontact/statisticquery/allinfoquery/js/AllInfoQueryContent.js"></script>
	</head>
	<body onLoad="" class="mainBody" style="padding: 0px;" >
		<form action="" name="subForm" id="subForm" method="post" >
			<input type="hidden" name="custXml" id="custXml" value="">
			<input type="hidden" name="hahaha" id="hahaha" value="hahaha">
			<input type="hidden" name="tempSaveOrderXML" id="tempSaveOrderXML" value="">
			<input type="hidden" name="protocolProdOffer" id="protocolProdOffer" value="" />
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
									<img src="<%=webPath%>/common/images/icon/information_icon.png" width="16" height="16" />查询结果
									<span class="tableTitle_span" style="margin-left:10px;">[ 销售机会<font face="Arial">(<%=oppCount %>)</font>
										<%if(oppCount > 0){
											Map tempMap = null;%>：&nbsp;&nbsp;
										<span id="saleOpperDiv">
											<%for(int i = 0; i < oppCount; i++){
												tempMap = opportunityList.get(i); %>
											<span id='oppor_<%=tempMap.get("oppId") %>' prodId='<%=tempMap.get("prodId") %>'>
												<a href="#"><%=tempMap.get("oppName")%>－<%=tempMap.get("prodName")%></a>
												<%if(i < oppCount - 1){out.write("|&nbsp;");} %>
											</span>
										<%	}%>
										</span>
										<%}%>]
									</span>
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
					<td class="formTableC" style="vertical-align: top;" height="430px;">
						<!-- BEGIN 表单核心区域 -->
						<table align="center" border="0" cellpadding="0" cellspacing="2" class="formTableCore" height="100%">
							<tr>
								<td>
									<unieap:Tab name="tabPage" tabMode="1" design="1" width="100%" cellWidth="95">
										<unieap:TabPage securityid="" text="订购信息" title="订购信息"
											url="<%=custOrderList%>" height="100%" active="<%=custOrderActive%>"
											autoCheckEAP="false" />
										<unieap:TabPage securityid="" text="账户信息" title="账户信息"
											url="<%=accountInfo%>" height="100%" />
										<unieap:TabPage securityid="" text="预受理信息" title="预受理信息"
											url="<%=preAcceptList%>" height="100%" visible="<%=preAcceptVisible%>" active="<%=preAcceptActive%>"/>
										<unieap:TabPage securityid="" text="NP信息" title="NP信息"
											url="<%=npList%>" height="100%" visible="<%=npVisible%>" active="<%=npActive%>"/>
										<unieap:TabPage securityid="" text="销售到期提醒" title="销售到期提醒"
											url="<%=matureList%>" height="100%" visible="<%=matureVisible%>" />
										<unieap:TabPage securityid="" text="在途订单" title="在途订单"
											url="<%=myorderList%>" height="100%" visible="true" />
										<unieap:TabPage securityid="" text="协议信息" title="协议信息"
											url="<%=protocalInfoList%>" height="100%"  visible="<%=protocalVisible%>"/>
										<unieap:TabPage securityid="" text="促销信息" title="促销信息"
											url="<%=salesPromotionInfoList%>" height="100%"/>
										<unieap:TabPage securityid="" text="预约信息" title="预约信息"
											url="<%=preCustOrderList%>" height="100%"/>
									</unieap:Tab>
								</td>
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
		</form>
	</body>
</html>
