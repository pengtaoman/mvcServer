<%
	 /* 
	 **************************************************************
	 * 程序名	: ChangeServiceoffer.jsp
	 * 建立日期  	: 2011年1月12日
	 * 作者		: liurong@neusoft.com
	 * 模块		: 业务变更页面
	 * 描述		: 
	 * 备注		: 
	 * ------------------------------------------------------------
	 * 修改历史
	 * 序号		日期		修改人	修改原因
	 * 1     2012-5-15   祝国军  UI调整：浮出页面样式修改，参考卡片展示样式。
	 * 2
	 **************************************************************
	 */
%>

<%@ page language="java" pageEncoding="GBK"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ page import="java.util.List"%>
<%@ page
	import="com.neusoft.crm.ordermgr.business.common.data.ServiceOfferVO"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%
	String webPath = request.getContextPath();
	String flag = NullProcessUtil.nvlToString(request
			.getAttribute("flag"), "");
	String prodOfferInstId = NullProcessUtil.nvlToString(request
			.getAttribute("prodOfferInstId"), "");
	String prodOfferId = NullProcessUtil.nvlToString(request
			.getAttribute("prodOfferId"), "");
	String custOrderId = NullProcessUtil.nvlToString(request
			.getAttribute("custOrderId"), "");
	List serviceOfferList = (List) request
			.getAttribute("serviceOfferList");
%>
<html>
	<head>
		<link href="<%=webPath%>/common/css/td_style_new.css" rel="stylesheet" type="text/css" />
		<script language="javascript"
			src="<%=webPath%>/orderaccept/custRecognition/js/ChangeServiceOffer.js"></script>
			
		<link rel="stylesheet" type="text/css" href="<%=webPath%>/unieap/ria3.3/unieap/themes/base/css/unieap.css"/>
		<link rel="stylesheet" type="text/css" href="<%=webPath%>/unieap/ria3.3/unieap/themes/blue/css/unieap.css"/> 
		<script language="javascript" src="<%=webPath%>/custcontact/orderaccept/base/Common.js" ></script>
		<script language="javascript" src="<%=webPath%>/unieap/js/Globals.js"></script>
		<script language="javascript" src="<%=webPath%>/unieap/js/Common.js" ></script>
		<script language="javascript" src="<%=webPath%>/common/js/td_common.js" ></script>
		<script language="javascript" src="<%=webPath%>/unieap/ria3.3/dojo/dojo.js"></script>
		<script language="javascript" src="<%=webPath%>/orderaccept/riaconfig/crm1GlobalConfig.js"></script>
		<script language="javascript" src="<%=webPath%>/orderaccept/common/dialog/MessageBox.js"></script>
	</head>
	<body class="mainBody" style="padding: 0px;">
		<input type="hidden" name="flag" id="flag" value="<%=flag %>" />
		<input type="hidden" name="prodOfferInstId" id="prodOfferInstId" value="<%=prodOfferInstId %>" />
		<input type="hidden" name="actionName" id="actionName" value="" />
		<input type="hidden" name="prodOfferId" id="prodOfferId"  value="<%=prodOfferId %>" />
		<input type="hidden" name="custOrderId" id="custOrderId" value="<%=custOrderId %>" />
		<input type="hidden" name="prodServiceOfferId" id="prodServiceOfferId" value="" />
		<input type="hidden" name="serviceOfferId" id="serviceOfferId" value="" />
		<input type="hidden" name="webPath" id="webPath" value="<%=webPath%>" />
		<input type="hidden" name="hServiceOfferId" id="hServiceOfferId" value=""/>
		<input type="hidden" name="hProdServiceOfferId" id="hProdServiceOfferId" value=""/>
		<input type="hidden" name="hMenuId" id="hMenuId" value=""/>
		<input type="hidden" name="ruleEventId" id="ruleEventId" value=""/>
		<div class="tooltip-wrapper">
			<div class="tooltip-title">
				<span class="tooltip-title-text">销售品受理</span>
			</div>
			<div class="tooltip-content" style="padding-bottom: 0px;">
				<table width="370px" border="0" cellspacing="0" cellpadding="0">
					<%
					for(int i = 0;i<serviceOfferList.size();i++){
						ServiceOfferVO vo = (ServiceOfferVO)serviceOfferList.get(i);
						if(i==0){
					%>
					 <tr>
						<td >
							<span style="cursor: hand;" onclick="onChangProdOfferClick('<%=vo.getActionName() %>','<%=vo.getServiceOfferId() %>','<%=vo.getProdServiceOfferId() %>','<%=vo.getMenuId() %>','<%=NullProcessUtil.nvlToString(vo.getRuleEventId(),"") %>', this)">
								<input type="radio" name="serviceOffer" checked="checked"/> 
								<label ><%=vo.getActionName() %></label>
								<script type="text/javascript">onChangProdOfferClick('<%=vo.getActionName() %>','<%=vo.getServiceOfferId() %>','<%=vo.getProdServiceOfferId() %>','<%=vo.getMenuId() %>','<%=NullProcessUtil.nvlToString(vo.getRuleEventId(),"") %>',null);</script>
							</span>
						</td>
						<%
							if(i==serviceOfferList.size()-1){
						%>	
							<script language='javascript'>
									var index=<%=i%>;
									var j = 3-(index+1)%3;
									for ( var tem = 0; tem < j; tem++) {
										document.write("<td >&#160</td>");
									}
							</script>
							</tr>		
						<%  }%>
					<%	    
						}else if(i==serviceOfferList.size()-1){//判断是否是最后一个
					%>
						<td>
							<span style="cursor: hand;" onclick="onChangProdOfferClick('<%=vo.getActionName() %>','<%=vo.getServiceOfferId() %>','<%=vo.getProdServiceOfferId() %>','<%=vo.getMenuId() %>','<%=NullProcessUtil.nvlToString(vo.getRuleEventId(),"") %>',this)">
								<input type="radio" name="serviceOffer" /> 
								<label ><%=vo.getActionName() %></label>
							</span>
						</td>
					
						<!-- 判断是否是表格的最后一个,是：加尾;不是：补齐表格，加尾-->
							<%
								if((i+1)%3==0){
							%>
									</tr>
							<%
								}else{
							%>
								<script language='javascript'>
									var index = <%=i%>;
									var j = 3-(index+1)%3;
									for ( var tem = 0; tem < j; tem++) {
										document.write("<td >&#160</td>");
									}
								</script>
								</tr>		
												
						<%
								}
						%>
					<%	
						}else if((i+1)%3==0){
					%>
						<td>
							<span style="cursor: hand;" onclick="onChangProdOfferClick('<%=vo.getActionName() %>','<%=vo.getServiceOfferId() %>','<%=vo.getProdServiceOfferId() %>','<%=vo.getMenuId() %>','<%=NullProcessUtil.nvlToString(vo.getRuleEventId(),"") %>', this)">
								<input type="radio" name="serviceOffer" /> 
								<label ><%=vo.getActionName() %></label>
							</span>
						</td>
						</tr>
						<tr >
					<%	    
						}else{
					%>
						<td >
							<span style="cursor: hand;" onclick="onChangProdOfferClick('<%=vo.getActionName() %>','<%=vo.getServiceOfferId() %>','<%=vo.getProdServiceOfferId() %>','<%=vo.getMenuId() %>','<%=NullProcessUtil.nvlToString(vo.getRuleEventId(),"") %>', this)">
								<input type="radio" name="serviceOffer" /> 
								<label ><%=vo.getActionName() %></label>
							</span>
						</td>
					<%	    
						}
					}	
					%>			
					
					<%-- 
					<tr class="table_content_left">
						<td width="33%">
							<td:Radio name="serviceOffer" title="变更可选包"
								securityid="btnChangeOptionalPack"
								onclick="changeProdOfferCRM();" value="变更可选包" />
						</td>
						<td width="33%">
							<td:Radio name="serviceOffer" title="变更主销售品"
								securityid="btnChangeMainProd"
								onclick="changeProdOfferMainCRM();" value="变更主销售品" />
						</td>
						<td widthl="33%">
							<td:Radio name="serviceOffer" title="销售品续订"
								securityid="btnConProdOffer" onclick="conProdOffer();"
								value="销售品续订" />
						</td>
					</tr>
					<tr class="table_content_left">
						<!--晓凤屏蔽“套餐注销和销售品退订”
						<td width="33%">
							<td:Radio name="serviceOffer" title="退订销售品"
								securityid="btnCancelProdOffer" onclick="cancelProdOffer();"
								value="退订销售品" />
						</td>
						-->
						<%
								for (int i = 0; i < serviceOfferList.size(); i++) {
								ServiceOfferVO vo = (ServiceOfferVO) serviceOfferList.get(i);
						%>
						<td width="33%">
							<input type="radio" name="serviceOffer"
								onclick="cancelCombo('<%=vo.getServiceOfferId()%>','<%=vo.getProdServiceOfferId() %>')" />
							<label>
								<%=vo.getRemark()%>
							</label>
						</td>
						<%
						}
						%>
					</tr>--%>
				</table>
				<div align="center" style="padding-top: 10px;">
					<unieap:unieapbutton securityid="" classname="bubbleButton"
							name="btnOfferSubmit" value="确认" onclick="doSubmitServiceOffer()"/>
					<unieap:unieapbutton securityid="" classname="bubbleButton"
							name="BQuery" onclick="" value="关闭" onclick="parent.unieap.hideTooltip();"/>
				</div>
			</div>
		</div>
	</body>
</html>