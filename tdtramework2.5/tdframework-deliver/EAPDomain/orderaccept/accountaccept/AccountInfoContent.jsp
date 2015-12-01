
<%
	/* 
	 **************************************************************
	 * ������		: AccountInfoContent.jsp
	 * ��������  	: 2011��05��25��
	 * ����		: maomq
	 * ģ��		: ��Ʒ��װ-�˻���Ϣ
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
<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="cc"%>
<%
	ParamObjectCollection payWayColl = (ParamObjectCollection) request
			.getAttribute("payWayColl");
	ParamObjectCollection bankTypeColl = (ParamObjectCollection) request
			.getAttribute("bankTypeColl");
	ParamObjectCollection belongCodeBCColl = (ParamObjectCollection) request
			.getAttribute("belongCodeColl");
	ParamObjectCollection accountLevel = (ParamObjectCollection) request
			.getAttribute("accountLevel");//�ʻ�����
	ParamObjectCollection groupPayWay = (ParamObjectCollection) request
			.getAttribute("groupPayWay");//�����շѷ�ʽ
	ParamObjectCollection ifDefaultColl = (ParamObjectCollection) request
			.getAttribute("ifDefaultColl");//�Ƿ�Ĭ���˻�
	ParamObjectCollection ifCreditControlColl = (ParamObjectCollection) request
			.getAttribute("ifCreditControlColl");//�Ƿ����ÿ���
	ParamObjectCollection payCycleColl = (ParamObjectCollection) request
			.getAttribute("payCycleColl");//��������

	String accoWay = "4-0"; //��ֵ��ʽ
%>
<div id="accountInfoContent" style="width: 100%;">
	<input type="hidden" name="accountId" id="accountId" value="" />
	<input type="hidden" id="accoSId" name="accoSId" value="0" />
	<input type="hidden" id="llCust" name="llCust" value="1" />
	<input type="hidden" id="voiceCust" name="voiceCust" value="1" />
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td class="table_left">
				�˻�����
				<span class="formRequested">*</span>
			</td>
			<td class="table_right">
				<unieap:input tcname="Text" id="accountName" name="accountName"
					prompt="�˻�����" isnullable="false" tooltip="�˻�����" maxlength="128" />
			</td>
			<td class="table_left">
				��ֵ��ʽ
				<span class="formRequested">*</span>
			</td>
			<td class="table_right">
				<cc:SelectTag selectFlag="false" selectColl="<%=payWayColl%>"
					selectvalue="<%=accoWay%>" tagName="accoWay" />
			</td>
			<td class="table_left">
				Ԥ���(Ԫ)
				<span class="formRequested">*</span>
			</td>
			<td class="table_right">
				<unieap:input tcname="Money" id="leftFee" name="leftFee"
					prompt="Ԥ���" tooltip="Ԥ���" value="0.00" isnullable="false"
					pattern="####.00" maxlength="12" />
			</td>
			<td class="table_left">
				����绰
			</td>
			<td class="table_right">
				<input type="text" id="accountServiceId" name="accountServiceId"
					value="" />
			</td>
		</tr>
		<tr>
			<td class="table_left">
				�Ƿ�Ĭ���ʻ�
			</td>
			<td class="table_right">
				<cc:SelectTag selectFlag="false" selectColl="<%=ifDefaultColl%>"
					tagName="ifDefault" selectvalue="" />
			</td>
			<td class="table_left">
				�Ƿ����ÿ���
			</td>
			<td class="table_right">
				<cc:SelectTag selectFlag="false"
					selectColl="<%=ifCreditControlColl%>" tagName="creditControl"
					selectvalue="" />
			</td>
			<td class="table_left">
				��������
			</td>
			<td class="table_right">
				<cc:SelectTag selectFlag="false" selectColl="<%=payCycleColl%>"
					selectvalue="" tagName="payCycle" />
			</td>
			<td class="table_left">
				�������򼶱�
			</td>
			<td class="table_right">
				<cc:SelectTag selectFlag="false" selectColl="<%=accountLevel%>"
					selectvalue="" tagName="accountLevel" />
			</td>
		</tr>
		<tr id="bankInfo1" style="display: none">
			<td class="table_left">
				��������
			</td>
			<td class="table_right">
				<cc:SelectTag selectFlag="" selectColl="<%=bankTypeColl%>"
					selectvalue="" tagName="nkId" />
			</td>
			<td class="table_left">
				�����ʺ�
				<span class="formRequested">*</span>
			</td>
			<td class="table_right">
				<unieap:input tcname="Text" id="nkAccount" name="nkAccount"
					prompt="�����ʺ�" tooltip="�����ʺ�" isnullable="true" value=""
					maxlength="128" />
			</td>
			<td class="table_left">
				������
			</td>
			<td class="table_right">
				<unieap:input tcname="Text" id="countName" name="countName"
					prompt="������" tooltip="������" isnullable="true" value=""
					maxlength="128" />
			</td>
			<td class="table_left">
				������ʹ������
			</td>
			<td class="table_right">
				<cc:SelectTag selectFlag="true" selectColl="<%=belongCodeBCColl%>"
					selectvalue="" tagName="belongCodeBC" />
			</td>
		</tr>
		<tr id="bankInfo2" style="display: none">
			<td class="table_left">
				������
				<span class="formRequested">*</span>
			</td>
			<td class="table_right">
				<select id="nkCharge" name="nkCharge">
					<option value="">
						��ѡ��
					</option>
				</select>
			</td>
			<td class="table_left">
				����Э��
			</td>
			<td class="table_right">
				<unieap:input tcname="Text" id="reementNo" name="reementNo"
					prompt="����Э��" tooltip="����Э��" isnullable="true" value=""
					maxlength="32" />
			</td>
			<td class="table_left">
				&nbsp;
			</td>
			<td class="table_right">
				&nbsp;
			</td>
			<td class="table_left">
				&nbsp;
			</td>
			<td class="table_right">
				&nbsp;
			</td>
		</tr>
		<tr id="payMethodName" style="display: none">
			<td class="table_left">
				�����շѷ�ʽ
			</td>
			<td class="table_right">
				<cc:SelectTag selectFlag="false" selectColl="<%=groupPayWay%>"
					selectvalue="" tagName="groupPayWay" />
			</td>
			<td class="table_left">
				&nbsp;
			</td>
			<td class="table_right">
				&nbsp;
			</td>
			<td class="table_left">
				&nbsp;
			</td>
			<td class="table_right">
				&nbsp;
			</td>
			<td class="table_left">
				&nbsp;
			</td>
			<td class="table_right">
				&nbsp;
			</td>
		</tr>
	</table>
</div>