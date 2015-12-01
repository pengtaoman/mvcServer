
<%
	/* 
	 **************************************************************
	 * ������		: AccountInfoAll.jsp
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
<%
	ParamObjectCollection paymentTypeColl = (ParamObjectCollection) request
			.getAttribute("paymentTypeColl");
	ParamObjectCollection accTypeGroupColl = (ParamObjectCollection) request
			.getAttribute("accTypeGroupColl");
	ParamObjectCollection mainIdentityKindColl = (ParamObjectCollection) request
			.getAttribute("mainIdentityKindColl");
	ParamObjectCollection priorityColl = (ParamObjectCollection) request
			.getAttribute("priorityColl");
%>
<div id="accountInfo" class="block_div">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td class="tags_td">
				<UL id="tags" class="tags">
					<LI>
						<A id="showNewAccount" href="javascript:void(0)">�����˻���Ϣ</A>
					</LI>
					<LI class="selectTag">
						<A id="showInheritAccount" href="javascript:void(0)">�̳��˻���Ϣ</A>
					</LI>
				</UL>
			</td>
		</tr>
		<tr>
			<td class="selectTag_td">
				<div id="accouInfoVO" style="display: none;width: 100%;">
					<%@include file="/orderaccept/accountaccept/AccountInfoContent.jsp"%>
				</div>
				<div id="inheritAccountInfoDiv" style="width: 100%;">
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td class="table_left">
								��ѯ��ʽ
							</td>
							<td class="table_right">
								<select id="queryFlag" name="queryFlag" onkeydown="enterJump();">
									<option value="1">
										�ͻ�����
									</option>
									<option value="2">
										�������
									</option>
								</select>
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
						<tr id="custQueryFlag">
							<td class="table_left">
								�ͻ�ID
							</td>
							<td class="table_right">
								<unieap:input tcname="Text" id="custIdQuery" name="custIdQuery"
									prompt="�ͻ�ID" isnullable="false" tooltip="�ͻ�ID" value=""
									maxlength="10" />
							</td>
							<td class="table_left">
								�ͻ�����
							</td>
							<td class="table_right">
								<unieap:input tcname="Text" id="firstNameQuery"
									name="firstNameQuery" prompt="�ͻ�����" isnullable="false"
									tooltip="�ͻ�����" value="" maxlength="128" />
							</td>
							<td class="table_left">
								֤������
							</td>
							<td class="table_right">
								<cc:SelectTag selectFlag="" fixlength="125"
									selectColl="<%=mainIdentityKindColl%>" selectvalue=""
									tagName="identityKindQuery" />
							</td>
							<td class="table_left">
								֤������
							</td>
							<td class="table_right">
								<unieap:input tcname="Text" id="identityCodeQuery"
									name="identityCodeQuery" maxlength="30" prompt="֤������"
									isnullable="false" value="" />
							</td>
						</tr>
						<tr id="serviceIdQueryFlag" style="display: none">
							<td class="table_left">
								��Ʒʵ������
							</td>
							<td class="table_right">
								<unieap:input tcname="Text" id="phoneNumber" name="phoneNumber"
									prompt="��Ʒʵ������" isnullable="false" tooltip="�ͻ�ID" value=""
									maxlength="30" />
							</td>
							<td class="table_left">
								��Ʒ����
							</td>
							<td class="table_right">
								<select name="productId" id='productId'>
									<option value="">
										��ѡ��
									</option>
								</select>
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
						<tr>
							<td colspan="8" align="right">
								<input type="button" name="accountQuery" id="accountQuery" value="��ѯ�ͻ��˻���Ϣ" />
							</td>
						</tr>
						<tr>
							<td colspan="8">
								<iframe name="accountInfoListFrame" src="" scrolling="yes"
									height="180" width="100%" frameborder="0" marginwidth="0"
									marginheight="0"></iframe>
							</td>
						</tr>
					</table>
				</div>
			</td>
		</tr>
		<tr>
			<td class="selectTag_td">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td colspan="8">
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tbody id="serviceIdTbody">
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td class="table_left">
							��Ŀ������
						</td>
						<td class="table_right">
							<cc:SelectTag selectFlag="false"
								selectColl="<%=accTypeGroupColl%>" tagName="acctItemType"
								selectvalue="" />
						</td>
						<td class="table_left">
							֧���������
						</td>
						<td class="table_right">
							<cc:SelectTag selectFlag="false"
								selectColl="<%=paymentTypeColl%>" tagName="paymentLimitType"
								selectvalue="" />
						</td>
						<td class="table_left">
							֧�����
						</td>
						<td class="table_right">
							<unieap:input tcname="Number" id="paymentLimit"
								name="paymentLimit" prompt="֧�����" tooltip="֧�����"
								isnullable="true" value="0" maxlength="20" />
							<label id="sign" name="sign" style="display:none">%</label>
						</td>
						<td class="table_left">
							���ȼ�
						</td>
						<td class="table_right">
							<cc:SelectTag selectFlag="false" selectColl="<%=priorityColl%>"
								tagName="priority" selectvalue="" />
						</td>
					</tr>
					<tr>
						<td colspan="8" align="right">
							<input type="hidden" name="listAccountId" id="listAccountId"
								value="" />
							<input type="hidden" name="listAccountName" id="listAccountName"
								value="" />
							<span id="addAccountSpan"> 
								<input type="button" name="addAccount" id="addAccount" value="���������ϵ" /> 
							</span>
							<span id="addAccountRelationSpan" style="display: none">
								<input type="button" name="addAccountRelation" id="addAccountRelation" value="���������ϵ" /> 
							</span>
						</td>
					</tr>
					<tr>
						<td class="table_left" colspan="8">
							<table width="100%" border="1" cellspacing="0" cellpadding="0"
								bordercolor="#bce2f5" style="border-collapse: collapse;">
								<tr class="float_td_title">
									<td>
										�˻�ID
									</td>
									<td>
										�˻�����
									</td>
									<td>
										ҵ�����
									</td>

									<td>
										��Ŀ������
									</td>
									<td>
										֧���������
									</td>
									<td>
										֧�����
									</td>
									<td>
										���ȼ�
									</td>
									<td>
										�Ƿ�Ĭ�������ϵ
									</td>
									<td>
										�Ƿ�Ĭ�Ϲ����˻�
									</td>
									<td>
										ɾ��
									</td>
								</tr>
								<tbody id="dataTbody">
								</tbody>
							</table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</div>