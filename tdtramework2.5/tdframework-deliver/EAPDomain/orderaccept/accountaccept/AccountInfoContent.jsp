
<%
	/* 
	 **************************************************************
	 * 程序名		: AccountInfoContent.jsp
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
			.getAttribute("accountLevel");//帐户级别
	ParamObjectCollection groupPayWay = (ParamObjectCollection) request
			.getAttribute("groupPayWay");//集团收费方式
	ParamObjectCollection ifDefaultColl = (ParamObjectCollection) request
			.getAttribute("ifDefaultColl");//是否默认账户
	ParamObjectCollection ifCreditControlColl = (ParamObjectCollection) request
			.getAttribute("ifCreditControlColl");//是否信用控制
	ParamObjectCollection payCycleColl = (ParamObjectCollection) request
			.getAttribute("payCycleColl");//付款周期

	String accoWay = "4-0"; //储值方式
%>
<div id="accountInfoContent" style="width: 100%;">
	<input type="hidden" name="accountId" id="accountId" value="" />
	<input type="hidden" id="accoSId" name="accoSId" value="0" />
	<input type="hidden" id="llCust" name="llCust" value="1" />
	<input type="hidden" id="voiceCust" name="voiceCust" value="1" />
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td class="table_left">
				账户名称
				<span class="formRequested">*</span>
			</td>
			<td class="table_right">
				<unieap:input tcname="Text" id="accountName" name="accountName"
					prompt="账户名称" isnullable="false" tooltip="账户名称" maxlength="128" />
			</td>
			<td class="table_left">
				储值方式
				<span class="formRequested">*</span>
			</td>
			<td class="table_right">
				<cc:SelectTag selectFlag="false" selectColl="<%=payWayColl%>"
					selectvalue="<%=accoWay%>" tagName="accoWay" />
			</td>
			<td class="table_left">
				预存款(元)
				<span class="formRequested">*</span>
			</td>
			<td class="table_right">
				<unieap:input tcname="Money" id="leftFee" name="leftFee"
					prompt="预存款" tooltip="预存款" value="0.00" isnullable="false"
					pattern="####.00" maxlength="12" />
			</td>
			<td class="table_left">
				付款电话
			</td>
			<td class="table_right">
				<input type="text" id="accountServiceId" name="accountServiceId"
					value="" />
			</td>
		</tr>
		<tr>
			<td class="table_left">
				是否默认帐户
			</td>
			<td class="table_right">
				<cc:SelectTag selectFlag="false" selectColl="<%=ifDefaultColl%>"
					tagName="ifDefault" selectvalue="" />
			</td>
			<td class="table_left">
				是否信用控制
			</td>
			<td class="table_right">
				<cc:SelectTag selectFlag="false"
					selectColl="<%=ifCreditControlColl%>" tagName="creditControl"
					selectvalue="" />
			</td>
			<td class="table_left">
				付款周期
			</td>
			<td class="table_right">
				<cc:SelectTag selectFlag="false" selectColl="<%=payCycleColl%>"
					selectvalue="" tagName="payCycle" />
			</td>
			<td class="table_left">
				归属区域级别
			</td>
			<td class="table_right">
				<cc:SelectTag selectFlag="false" selectColl="<%=accountLevel%>"
					selectvalue="" tagName="accountLevel" />
			</td>
		</tr>
		<tr id="bankInfo1" style="display: none">
			<td class="table_left">
				银行名称
			</td>
			<td class="table_right">
				<cc:SelectTag selectFlag="" selectColl="<%=bankTypeColl%>"
					selectvalue="" tagName="nkId" />
			</td>
			<td class="table_left">
				银行帐号
				<span class="formRequested">*</span>
			</td>
			<td class="table_right">
				<unieap:input tcname="Text" id="nkAccount" name="nkAccount"
					prompt="银行帐号" tooltip="银行帐号" isnullable="true" value=""
					maxlength="128" />
			</td>
			<td class="table_left">
				开户名
			</td>
			<td class="table_right">
				<unieap:input tcname="Text" id="countName" name="countName"
					prompt="开户名" tooltip="开户名" isnullable="true" value=""
					maxlength="128" />
			</td>
			<td class="table_left">
				托收行使用区域
			</td>
			<td class="table_right">
				<cc:SelectTag selectFlag="true" selectColl="<%=belongCodeBCColl%>"
					selectvalue="" tagName="belongCodeBC" />
			</td>
		</tr>
		<tr id="bankInfo2" style="display: none">
			<td class="table_left">
				托收行
				<span class="formRequested">*</span>
			</td>
			<td class="table_right">
				<select id="nkCharge" name="nkCharge">
					<option value="">
						请选择
					</option>
				</select>
			</td>
			<td class="table_left">
				托收协议
			</td>
			<td class="table_right">
				<unieap:input tcname="Text" id="reementNo" name="reementNo"
					prompt="托收协议" tooltip="托收协议" isnullable="true" value=""
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
				集团收费方式
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