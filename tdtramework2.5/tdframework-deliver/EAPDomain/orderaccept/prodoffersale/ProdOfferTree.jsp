
<%
	 /* ����Ʒ��״�ṹ������ѡ������Ʒ��
	 **************************************************************
	 * ������		: ProdOfferTree.jsp
	 * ��������  	: 2011��5��25��
	 * ����		: li.gx
	 * ģ��		: ��Ʒ��װ
	 * ����		: ����Ʒչʾ
	 * ��ע		: 
	 * ------------------------------------------------------------
	 * �޸���ʷ
	 * ���		����		�޸���	�޸�ԭ��
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
	String cityCode = (String)request.getAttribute("cityCode");//���������������װΪ����Ա�����������Ϊ�ӷ�����Ϣ��ȡ
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