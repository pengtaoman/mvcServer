
<%
	 /* 
	 **************************************************************
	 * ������		: CustOrderList.jsp
	 * ��������  	: 2011��5��26��
	 * ����		: shanpa
	 * ģ��		: �ͻ�����������Ʒ�б�
	 * ����		: 
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
<div class="block_div" style="width:100%">
	<table width="100%" cellpadding="0" cellspacing="0" border="0">
		<tr>
			<td class="content_title">
				�����б�
			</td>
		</tr>
		<tr>
			<td class="content_td">
				<table width="100%" border="1" cellpadding="0" cellspacing="0"
					bordercolor="#d9d9d9" style="border-collapse:collapse;">
					<thead>
					<tr class="table_title">
						<td width="10%">
							�ͻ�������
						</td>
						<td width="10%">
							��������
						</td>
						<td width="10%">
							����������
						</td>
						<td width="20%">
							����Ʒ/��Ʒ����
						</td>
						<td width="10%">
							�����ṩ
						</td>
						<td width="10%">
							�������
						</td>
						<td width="20%">
							����ʱ��
						</td>
						<td width="10%">
							����״̬
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
				<a id="firstPage" href="#">��ҳ</a>&nbsp;&nbsp;
				<a id="frontPage" href="#">��һҳ</a>&nbsp;&nbsp;
				<a id="nextPage" href="#">��һҳ</a>&nbsp;&nbsp;
				<a id="lastPage" href="#">ĩҳ</a>&nbsp;&nbsp;
			</td>
		</tr>
	</table>
</div>