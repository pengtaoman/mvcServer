<%
	 /* JSP程序简要描述信息
	 **************************************************************
	 * 程序名	: PasswordValid.jsp
	 * 建立日期: 2011-05-18
	 * 作者		: li.gx
	 * 模块		: 客户识别
	 * 描述		: 客户识别密码验证页面
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

<div class="checking_div">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td class="checking_div_title">
				客户身份验证
			</td>
		</tr>
		<tr>
			<td>
				<div class="checking_title">
					<p>
						<input name="check_radio" id="checking01" type="radio" value="custPassWordValid"  checked="checked"/>
						<label for="">
							根据客户密码验证
						</label>
					</p>
					<p>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<label for="">
							客户密码：
						</label>
						<input name="custPassWordValid" id="custPassWordValid" type="password"  maxlength="6"/>
					</p>
					<p>
						<input name="check_radio" id="checking02" type="radio" value="identityKindValid" />
						<label for="">
							根据证件号码
						</label>
					</p>
					<p>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<label for="">
							证件类型：
						</label>
						<cc:SelectTag4W3C selectFlag="" fixlength="125"
							selectColl="<%=mainIdentityKindColl%>" selectvalue=""
							tagName="identityKindValid" />
					</p>
					<p>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<label for="">
							证件号码：
						</label>
						<input name="identityCodeValid" id="identityCodeValid" type="text" />
					</p>
					<div id='prodPassWord' style="display: none">
					<p>
						<input name="check_radio" id="checking03" type="radio" value="productPassWordValid" />
						<label for="">
							根据产品密码验证
						</label>
					</p>
					<p>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<label for="">
							产品密码：
						</label>
						<input name="productPassWordValid" id="productPassWordValid" type="password"  maxlength="6"/>
					</p>
					</div>
					<p>
						<input name="check_radio" id="checking04" type="radio" value="passCheck" />
						<label for="">
							通过验证
						</label>
					</p>
				</div>
				<div align="center">
					<unieap:unieapbutton classname="button_s" name="" onclick="cust_Recognition_Head.BValid_OnClick()" value="确 认" />
		        	<unieap:unieapbutton classname="button_s" name="" onclick="cust_Recognition_Head.closePage()" value="取 消" />
				</div>
			</td>
		</tr>
	</table>
</div>
