<%@ page language="java" pageEncoding="GBK"%>
<%
String webpath = request.getContextPath();
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>销售品详情</title>
		<contextPath value="<%=webpath%>" />
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<link href="<%=webpath%>/common/css/workarea_style.css"
			rel="stylesheet" type="text/css">
		<link rel="stylesheet" href="<%=webpath%>/buscard/css/buscard_2.0.css"
			type="text/css" />
		<script language="javascript"
			src="<%=webpath%>/custcontact/common/businessmodule/extjs/adapter/ext/ext-base-debug.js"></script>
		<script language="javascript"
			src="<%=webpath%>/custcontact/common/businessmodule/extjs/ext-all-debug.js"></script>
		<script language="javascript"src="<%=webpath%>/common/js/td_common.js"></script>
		<script language=javascript src="<%=webpath%>/unieap/js/Globals.js"></script>
		<script language=javascript src="<%=webpath%>/unieap/js/Common.js"></script>
		<script language=javascript src="<%=webpath%>/orderaccept/prodoffersale/js/ProdOfferDetail.js"></script>
		<script language=javascript src="<%=webpath%>/custcontact/common/businessmodule/product/js/prodOffer/AttrCardBuilder.js"></script>
		<script language=javascript src="<%=webpath%>/buscard/common/js/buscard_2.0.js"></script>
		<script language=javascript src="<%=webpath%>/custcontact/common/businessmodule/product/js/prodOffer/ResRelaBuilder.js"></script>
		
	</head>
	<body>
		<div class="block_div">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td class="content_title">
						销售品信息
					</td>
				</tr>
				<tr>
					<td class="content_td">
						<div id="prodOfferDescDIV" style="display:none">
							<fieldset>
								<legend>
									销售品描述
								</legend>
								<textarea name="prodOfferDesc" id="prodOfferDesc" cols="" rows="5"></textarea>
							</fieldset>
						</div>
						<div id="prodOfferAttrDIV" style="display:none">
							<fieldset>
								<legend>
									销售品属性
								</legend>
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td class="table_left">
											<div id="prodOfferAttr"></div>
										</td>
									</tr>
								</table>
								<div style="float:right;">
									<a href="#" id="prodOfferAttrMoreHref" currentState="show" style="display:none">更多>></a>
								</div>
								<table width="100%" border="0" cellspacing="0" cellpadding="0" 
									id="prodOfferAttrMore_table" name="prodOfferAttrMore_table" style="display:none">
									<tr>
										<td class="table_left">
											<div id="prodOfferAttrMore"></div>
										</td>
									</tr>
								</table>
							</fieldset>
						</div>
						<div id="prodOfferResRelaDIV" style="display:none">
							<fieldset>
								<legend>
									销售品资源信息
								</legend>
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td class="table_left">
											<div id=prodOfferResRela></div>
										</td>
									</tr>
								</table>
								<div style="float:right;">
									<a href="#" id="prodOfferResRelaMoreHref" currentState="show" style="display:none">更多>></a>
								</div>
								<table width="100%" border="0" cellspacing="0" cellpadding="0" 
									id="prodOfferResRelaMore_table" name="prodOfferResRelaMore_table" style="display:none">
									<tr>
										<td class="table_left">
											<div id="prodOfferResRelaMore"></div>
										</td>
									</tr>
								</table>
							</fieldset>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div class="block_div">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td class="content_title">
						产品信息
					</td>
				</tr>
				<tr>
					<td class="content_td">
						<div id="productAttrDIV" style="display:none">
							<fieldset>
								<legend>
									产品属性
								</legend>
								<div id="showAttr">
									<table width="100%" border="0" cellspacing="0" cellpadding="0">
										<tr>
											<td class="table_left">
												<div id="productAttr"></div>
											</td>
										</tr>
									</table>
									<div style="float:right;">
										<a href="#" id="productAttrMoreHref" currentState="show" style="display:none">更多>></a>
									</div>
									<table width="100%" border="0" cellspacing="0" cellpadding="0" 
										id="productAttrMore_table" name="productAttrMore_table" style="display:none">
										<tr>
											<td class="table_left">
												<div id="productAttrMore"></div>
											</td>
										</tr>
									</table>
								</div>
							</fieldset>
						</div>
						<div id="productResRelaDIV" style="display:none">
							<fieldset>
								<legend>
									产品资源信息
								</legend>
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td class="table_left">
											<div id="productResRela"></div>
										</td>
									</tr>
								</table>
								<div style="float:right;">
									<a href="#" id="productResRelaMoreHref" currentState="show" style="display:none">更多>></a>
								</div>
								<table width="100%" border="0" cellspacing="0" cellpadding="0" 
									id="productResRelaMore_table" name="productResRelaMore_table" style="display:none">
									<tr>
										<td class="table_left">
											<div id="productResRelaMore"></div>
										</td>
									</tr>
								</table>
							</fieldset>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</body>
</html>
