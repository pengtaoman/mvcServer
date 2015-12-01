
<%
	/* 
	 **************************************************************
	 * 程序名		: AccountInfoAll.jsp
	 * 建立日期  	: 2011年05月25日
	 * 作者		: maomq
	 * 模块		: 产品新装-账户信息
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
						<A id="showNewAccount" href="javascript:void(0)">新增账户信息</A>
					</LI>
					<LI class="selectTag">
						<A id="showInheritAccount" href="javascript:void(0)">继承账户信息</A>
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
								查询方式
							</td>
							<td class="table_right">
								<select id="queryFlag" name="queryFlag" onkeydown="enterJump();">
									<option value="1">
										客户资料
									</option>
									<option value="2">
										服务号码
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
								客户ID
							</td>
							<td class="table_right">
								<unieap:input tcname="Text" id="custIdQuery" name="custIdQuery"
									prompt="客户ID" isnullable="false" tooltip="客户ID" value=""
									maxlength="10" />
							</td>
							<td class="table_left">
								客户名称
							</td>
							<td class="table_right">
								<unieap:input tcname="Text" id="firstNameQuery"
									name="firstNameQuery" prompt="客户名称" isnullable="false"
									tooltip="客户名称" value="" maxlength="128" />
							</td>
							<td class="table_left">
								证件类型
							</td>
							<td class="table_right">
								<cc:SelectTag selectFlag="" fixlength="125"
									selectColl="<%=mainIdentityKindColl%>" selectvalue=""
									tagName="identityKindQuery" />
							</td>
							<td class="table_left">
								证件号码
							</td>
							<td class="table_right">
								<unieap:input tcname="Text" id="identityCodeQuery"
									name="identityCodeQuery" maxlength="30" prompt="证件号码"
									isnullable="false" value="" />
							</td>
						</tr>
						<tr id="serviceIdQueryFlag" style="display: none">
							<td class="table_left">
								产品实例号码
							</td>
							<td class="table_right">
								<unieap:input tcname="Text" id="phoneNumber" name="phoneNumber"
									prompt="产品实例号码" isnullable="false" tooltip="客户ID" value=""
									maxlength="30" />
							</td>
							<td class="table_left">
								产品名称
							</td>
							<td class="table_right">
								<select name="productId" id='productId'>
									<option value="">
										请选择
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
								<input type="button" name="accountQuery" id="accountQuery" value="查询客户账户信息" />
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
							账目类型组
						</td>
						<td class="table_right">
							<cc:SelectTag selectFlag="false"
								selectColl="<%=accTypeGroupColl%>" tagName="acctItemType"
								selectvalue="" />
						</td>
						<td class="table_left">
							支付额度类型
						</td>
						<td class="table_right">
							<cc:SelectTag selectFlag="false"
								selectColl="<%=paymentTypeColl%>" tagName="paymentLimitType"
								selectvalue="" />
						</td>
						<td class="table_left">
							支付额度
						</td>
						<td class="table_right">
							<unieap:input tcname="Number" id="paymentLimit"
								name="paymentLimit" prompt="支付额度" tooltip="支付额度"
								isnullable="true" value="0" maxlength="20" />
							<label id="sign" name="sign" style="display:none">%</label>
						</td>
						<td class="table_left">
							优先级
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
								<input type="button" name="addAccount" id="addAccount" value="新增账务关系" /> 
							</span>
							<span id="addAccountRelationSpan" style="display: none">
								<input type="button" name="addAccountRelation" id="addAccountRelation" value="新增账务关系" /> 
							</span>
						</td>
					</tr>
					<tr>
						<td class="table_left" colspan="8">
							<table width="100%" border="1" cellspacing="0" cellpadding="0"
								bordercolor="#bce2f5" style="border-collapse: collapse;">
								<tr class="float_td_title">
									<td>
										账户ID
									</td>
									<td>
										账户名称
									</td>
									<td>
										业务号码
									</td>

									<td>
										账目类型组
									</td>
									<td>
										支付额度类型
									</td>
									<td>
										支付额度
									</td>
									<td>
										优先级
									</td>
									<td>
										是否默认账务关系
									</td>
									<td>
										是否默认公共账户
									</td>
									<td>
										删除
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