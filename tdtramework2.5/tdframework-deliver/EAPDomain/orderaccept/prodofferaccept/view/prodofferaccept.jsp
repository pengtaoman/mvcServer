<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String requestParam = (String) request.getAttribute("requestParam");
	String webPath = request.getContextPath();
	String delayInitPage = request.getParameter("delayInitPage") == null ? "0" : request
		.getParameter("delayInitPage").toString();
	String actionName = request.getAttribute("actionName") == null ? "销售品订购" : request
		.getAttribute("actionName").toString();
	String loadImgPath = webPath + "/common/images/loading.gif";
	//复用框架配置,但另外使用一个引用名
	java.util.Properties _evnPropProdOfferCopy = (java.util.Properties) request
		.getSession().getServletContext().getAttribute("ENVCONF");
	//System.out.println("???????????????????????????????????    " + envProp.getProperty("td.jscompress.flag"));
	boolean isCompressProdOfferAcceptJs = false;
	if (!"0".equals(_evnPropProdOfferCopy.getProperty("td.usejscompress.flag"))) {
		isCompressProdOfferAcceptJs = true;
	}
	//hebei-crm2.0/系统优化/是否使用合并压缩后的js/2012-08-09/begin
	Object dojomodulecc = request.getAttribute("dojomodulecc");
	Object attrcardcc = request.getAttribute("attrcardcc");
	Object servicecardcc = request.getAttribute("servicecardcc");
	String dojomoduleccFlag = dojomodulecc == null ? "1" : dojomodulecc.toString();
	String attrcardccFlag = attrcardcc == null ? "1" : attrcardcc.toString();
	String servicecardccFlag = servicecardcc == null ? "1" : servicecardcc.toString();
	//hebei-crm2.0/系统优化/是否使用合并压缩后的js/2012-08-09/end
	String debugModule = request.getParameter("debugModule");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=8" />
		<style type="text/css">
.hidden-elem {
	display: none;
}

.main-prodoffer-intro {
	color: #FF6005;
}

.mainprodoffer-intro-wrapper {
	
}

.shoppingcart-initpage-prompt {
	color: #FF6005;
	font-size: 13px;
}

.buscard-legend {
	height: 20px;
	font-size: 12px;
	padding: 0px 0px 0 4px;
	vertical-align: middle;
	background-image: url(../../common/images/bg/bg_card01.png);
	background-repeat: no-repeat;
	background-position: right top;
	font-weight: normal;
	color: #00577F;
}

.waitingBarNewBox {
	position: fixed;
	top: 500px;
	left: 0px;
	width: 100%;
	height: 60px;
	z-index: 99;
	display: none;
	filter: Alpha(opacity = 75); /* -moz-opacity:0.75; */
}

.waitingBarNew {
	background-color: #e3e9f3;
	width: 200px;
	height: 60px;
	border: 1px solid #335566;
}

.waitingBarNewTD {
	background-image: url(<%=loadImgPath%>);
	background-position: 8px 13px;
	background-repeat: no-repeat;
}
</style>
		<title>综合订单受理</title>
		<link rel="stylesheet"
			href="<%=webPath%>/custcontact/common/businessmodule/product/css/ProdOffer.css"
			type="text/css" />
		<link rel="stylesheet"
			href="<%=webPath%>/custcontact/orderaccept/budget/css/budget.css"
			type="text/css" />

		<!-- crm2.0新样式 yintj@neusoft.com begin -->
		<link rel="stylesheet" href="<%=webPath%>/common/css/td_style_new.css"
			type="text/css" />
		<!-- crm2.0新样式  yintj@neusoft.com end -->

		<!-- /@comment-组合业务改造:引入新的样式/-->
		<link rel="stylesheet"
			href="<%=webPath%>/orderaccept/base/resources/css/workarea_style.css"
			type="text/css" />
		<!-- /@comment-组合业务改造:引入的关于主销售品树的样式/ -->


		<script type="text/javascript"
			src="<%=webPath%>/orderaccept/riaconfig/crm1GlobalConfig.js"></script>
		<script type="text/javascript"
			src="<%=webPath%>/buscard/common/js/buscard_2.0.js"></script>
		<!--  using raw unieap version-->
		<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
		<!--  using compressed unieap  version -->
		<%-- 
		<%@ include file="/orderaccept/custom/unieapconfig/config.jsp"%>
		--%>
		<script type="text/javascript">
			var asyncLoadScriptList = [];
			dojo.global.mendScrollProblem  = function(){
				var contentNode = dojo.query(".step_content",document.body);
				contentNode&&(contentNode.length!=0)&&(contentNode[0].style.styleFloat ='left')&&(contentNode[0].style.cssFloat ='left');
				dojo.byId("divGuide").style.clear ='both';
			};
			dojo.global.initOrderAcceptPage = function(requestParam){
				 if(dojo.global.prodOfferAcceptLoader){
				 	dojo.global.prodOfferAcceptLoader.destroy();
				 	dojo.global.prodOfferAcceptLoader = null;
				 }
				 if(dojo.isString(requestParam)){
				 	requestParam  = dojo.fromJson(requestParam);
				 }
				 //窗口最大化
				 //alert(requestParam.actionCD)
				 if(requestParam.actionCD!='100'){
				 	//alert(requestParam.actionCD)
				 	try{
						window.moveTo(0, 0);
						window.resizeTo( screen.availWidth, screen.availHeight);
			
					}catch(e){
					}
				 }
				 (function(){{
					for(var index in requestParam){
						try{
							if(requestParam[index]==null||dojo.trim(requestParam[index].toString())==''){
								delete requestParam[index];
							}		
						}catch(e){
						}
					}
				
				}}());
				dojo.global.$appContext$.set("requestParam",requestParam); 
			 	requestParam.customerData = dojo.fromJson(requestParam.customerXml);
			  	dojo.require("orderaccept.prodofferaccept.main").dispatch(requestParam);	
		  };
		</script>
		
		<script type="text/javascript"
			src="<%=webPath%>/orderaccept/riaconfig/crm1InitConfig.js"></script>

		<script type="text/javascript"
			src="<%=webPath%>/orderaccept/custom/_BaseWidget.js"></script>

		<%
			if (isCompressProdOfferAcceptJs && !"0".equals(dojomoduleccFlag)) {
		%>
			<script type="text/javascript">
					asyncLoadScriptList.push("<%=webPath%>/orderaccept/prodofferaccept/module-comb.js");	
			</script>

		<%
			}
		%>
		<%
			if (isCompressProdOfferAcceptJs && !"0".equals(attrcardccFlag)) {
		%>
			<script type="text/javascript">
					asyncLoadScriptList.push("<%=webPath%>/orderaccept/attrapp/attrcard-plugin-comb.js");
			</script>

		<%
			}
		%>
		<%
			if (isCompressProdOfferAcceptJs && !"0".equals(servicecardccFlag)) {
		%>
		<script type="text/javascript">
				asyncLoadScriptList.push("<%=webPath%>/buscardapp/rela/js/servicecard-plugin-comb.js");	
		</script>

		<%
			}
		%>
	</head>
	<body class="unieap" style="height: auto;"
		onload="loadGuide('OfferAccept',2,'<%=actionName%>');	dojo.global.mendScrollProblem();">
		<input type="hidden" value="<%=webPath%>" id="webPath" />
		<%@ include file="/orderaccept/common/guide/LoadGuide.jsp"%>
		<div id="prodoffer-accept-root"></div>
		<div id="order-show-root" style="display: none;"></div>
		<div id='function-navigator-root' class='function-navigator-container'></div>
		<div id='scrollController'
			style="position: fixed; bottom: 223px; right: 10px; z-index: 1000000; display: none;">
			<div id='scrollUp'
				style="cursor: pointer; position: static; margin-bottom: 5px"></div>
			<div id='scrollDown' style="cursor: pointer; position: static;"></div>
		</div>
		<script type="text/javascript">
			dojo.connect(dojo.byId("scrollUp"),"onclick",function(){
				document.body.scrollTop =	document.documentElement.scrollTop = 0;
			});
			dojo.connect(dojo.byId("scrollDown"),"onclick",function(){
				document.body.scrollTop =document.documentElement.scrollTop = Math.max(document.body.scrollHeight,document.documentElement.scrollHeight||0);
			});
			!function(){
					var layer  = BusCard.createCoverLayer();
					var msgContainerNode = document.createElement("div");
					msgContainerNode.className = "waitingBarNew";
					msgContainerNode.innerHTML = "<div class='waitingBarNewTD' style='width:32px;height:32px;float:left'></div><div style='margin-left:20px;float:left;line-height:60px;font-size:13px;font-weight:bold;font-family: Verdana, Arial, Helvetica, sans-serif'>\u7cfb\u7edf\u8fd0\u884c\u4e2d,\u8bf7\u7a0d\u5019...</div>";
					dojo.style(msgContainerNode,{position:'absolute',left:(layer.offsetWidth/2-100)+"px",top:layer.offsetHeight/2+"px"});
					layer.appendChild(msgContainerNode);
			}();
			var mainEntryCallback = function(){
					<%if("1".equals(debugModule)){%>
						dojo.require("orderaccept.tester.aop");
					<%}%>
					if("<%=delayInitPage%>"=='0'){
			  			 dojo.global.initOrderAcceptPage(<%=requestParam%>);
					}
			};
			setTimeout(function(){
				BusCard.ScriptLoader.asynLoad(asyncLoadScriptList,mainEntryCallback);
			},1);
	</script>
	</body>
</html>
