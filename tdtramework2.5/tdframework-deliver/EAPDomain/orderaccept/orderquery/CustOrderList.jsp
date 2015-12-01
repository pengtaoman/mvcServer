
<%
	 /* 
	 **************************************************************
	 * 程序名		: CustOrderList.jsp
	 * 建立日期  	: 2011年5月26日
	 * 作者		: shanpa
	 * 模块		: 客户订购的销售品列表
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
<div class="block_div" style="width:100%">
	<table width="100%" cellpadding="0" cellspacing="0" border="0">
		<tr>
			<td class="content_title">
				订单列表
			</td>
		</tr>
		<tr>
			<td class="content_td">
				<table width="100%" border="1" cellpadding="0" cellspacing="0"
					bordercolor="#d9d9d9" style="border-collapse:collapse;">
					<thead>
					<tr class="table_title">
						<td width="10%">
							客户订单号
						</td>
						<td width="10%">
							订单项编号
						</td>
						<td width="10%">
							订单项类型
						</td>
						<td width="20%">
							销售品/产品名称
						</td>
						<td width="10%">
							服务提供
						</td>
						<td width="10%">
							接入号码
						</td>
						<td width="20%">
							受理时间
						</td>
						<td width="10%">
							订单状态
						</td>
					</tr>
					</thead>
					<tbody id="orderConfirmProdOfferList">
					</tbody>
					<tbody id="orderConfirmProdList">
					</tbody>
					<tbody id="orderConfirmAccountList">
					</tbody>
				</table>
			</td>
		</tr>
		<tr style="margin-left: 5px">
			<td>
				<a id="firstPage" href="#">首页</a>&nbsp;&nbsp;
				<a id="frontPage" href="#">上一页</a>&nbsp;&nbsp;
				<a id="nextPage" href="#">下一页</a>&nbsp;&nbsp;
				<a id="lastPage" href="#">末页</a>&nbsp;&nbsp;
			</td>
		</tr>
	</table>
</div>