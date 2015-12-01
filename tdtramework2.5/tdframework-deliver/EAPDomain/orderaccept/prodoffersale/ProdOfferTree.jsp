
<%
	 /* 销售品树状结构。用于选择销售品。
	 **************************************************************
	 * 程序名		: ProdOfferTree.jsp
	 * 建立日期  	: 2011年5月25日
	 * 作者		: li.gx
	 * 模块		: 产品新装
	 * 描述		: 销售品展示
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
<%@ page
	import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="cc"%>

<%
	String webPath = request.getContextPath();
	ParamObjectCollection regionCodeColl = (ParamObjectCollection) request
			.getAttribute("regionCodeColl");
	String label1 = (String)request.getAttribute("label1");
	String orderAllTree = (String)request.getAttribute("orderAllTree");
	String cityCode = (String)request.getAttribute("cityCode");//号码的所属区域，新装为操作员所属，变更则为从服务信息中取
%>
	<div>
		<input type="hidden" id="orderAllTree" name="orderAllTree"
			value="<%=orderAllTree %>" />
		<input type="hidden" id="cityCode" name="cityCode"
			value="<%=cityCode %>" />
		<div class="treePanel">
			<div id='comm_AllSaleWorkTree'>
			</div>
		</div>
	</div>