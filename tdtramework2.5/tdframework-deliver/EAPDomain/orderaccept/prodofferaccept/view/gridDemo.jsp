<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String requestParam = (String) request.getAttribute("requestParam");
	String webPath = request.getContextPath();
	String delayInitPage = request.getParameter("delayInitPage") == null ? "0" : request
		.getParameter("delayInitPage").toString();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<style type="text/css">
.hidden-elem {
	display: none;
}
</style>
		<link rel="stylesheet"
			href="<%=webPath%>/custcontact/common/businessmodule/product/css/ProdOffer.css"
			type="text/css" />
		<link rel="stylesheet"
			href="<%=webPath%>/custcontact/common/businessmodule/product/css/ProdOfferAttr.css"
			type="text/css" />
		<link rel="stylesheet"
			href="<%=webPath%>/custcontact/orderaccept/common/css/style.css"
			type="text/css" />
		<link rel="stylesheet"
			href="<%=webPath%>/custcontact/orderaccept/budget/css/budget.css"
			type="text/css" />
		<link rel="stylesheet"
			href="<%=webPath%>/custcontact/orderaccept/base/tip/css/JTip.css"
			type="text/css" />
		<link rel="stylesheet"
			href="<%=webPath%>/custcontact/orderaccept/base/jwindow/css/JWindow.css"
			type="text/css" />
		<!-- /@comment-组合业务改造:引入新的样式/-->
		<link rel="stylesheet"
			href="<%=webPath%>/common/dx20/css/workarea_style.css"
			type="text/css" />
		<!-- /@comment-组合业务改造:引入的关于主销售品树的样式/ -->
		<link rel="stylesheet"
			href="<%=webPath%>/orderaccept/prodoffersale/css/ProdOfferTree.css"
			type="text/css" />
		<script type="text/javascript"
			src="<%=webPath%>/orderaccept/riaconfig/crm1GlobalConfig.js"></script>
		<script type="text/javascript"
			src="<%=webPath%>/buscard/common/js/buscard_2.0.js"></script>
		<!-- Jscu.js 和 GroupProdBuilder.js 纯粹为了卡片受理集团业务 目前开发节点先引入,后续一定改造掉 /begin-->
		<script type="text/javascript"
			src="<%=webPath%>/custcontact/orderaccept/base/jscu/Jscu.js"></script>
		<script type="text/javascript"
			src="<%=webPath%>/custcontact/businessaccept/js/GroupProdBuilder.js"></script>
		<!-- Jscu.js 和 GroupProdBuilder.js 纯粹为了卡片受理集团业务 目前开发节点先引入,后续一定改造掉 /end-->

		<%@ include file="/unieap/ria3.3/pages/config.jsp"%>
		<script type="text/javascript"
			src="<%=webPath%>/orderaccept/riaconfig/crm1InitConfig.js"></script>
		<script type="text/javascript">
			dojo.addOnLoad(function(){
			
			
					 var cm = new BusCard.widget.grid.ColumnModel({metaData:[
					 {name:'company',text:'公司',width:'20%'},
					 {name:'name',text:'名称',width:'20%'},
					 {name:'address',text:'地址',width:'20%'},
					 {name:'type',text:'类型',cssStyle:'width:40%',render:function(value,index){
					 	alert(this.getDataSource().getRawData()[index].name);
					 	var template = "<a href = '#' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/action'>click me</a>"
					 	return  template;
					 }}
					]});
			       
			       var ds = new BusCard.widget.grid.DataSource([{company:'neusoft',name:'neusoftgagag',address:'dalian',type:'it'},
			       {company:'neusoft',name:'neusoft2323',address:'dalian',type:'it'},
			       {company:'neusoft',name:'neusoft2323',address:'dalian',type:'it'}
			       ],cm);
			
				
					dojo.require("orderaccept.custom.BusCardGrid");
					var grid = new orderaccept.custom.BusCardGrid({cm:cm,ds:ds},dojo.byId("grid"));
					grid.add({company:'neusoft',name:'neusoft',address:'dalian',type:'it'});
					grid.add({company:'neusoft',name:'neusoft',address:'dalian1212',type:'it'});
					grid.add({company:'neusoft',name:'neusoft',address:'dalian3',type:'it'});
					grid.add({company:'neusoft',name:'neusoft',address:'dalian5',type:'it'});
					dojo.subscribe("/action/click",function(evt){
						evt.preventDefault();
						var index = evt.currentTarget.parentNode.parentNode.getAttribute("rindex");
						alert("click index with " +evt.currentTarget.parentNode.parentNode.getAttribute("rindex"));
						unieap.debug(grid.getData()[parseInt(index)]);
					
					});
			
			
			
			
			
			
			});
		</script>
	</head>
	<body class="unieap">
		<input type="hidden" value="<%=webPath%>" id='webPath'>
		<div id="grid" style="height: 100%"></div>
	</body>
</html>
