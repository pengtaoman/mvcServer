<%
	 /* JSP�����Ҫ������Ϣ
	 **************************************************************
	 * ������	: PasswordValid.jsp
	 * ��������: 2011-05-18
	 * ����		: li.gx
	 * ģ��		: �ͻ�ʶ��
	 * ����		: �ͻ�ʶ��������֤ҳ��
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

<div class="checking_div">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td class="checking_div_title">
				�ͻ������֤
			</td>
		</tr>
		<tr>
			<td>
				<div class="checking_title">
					<p>
						<input name="check_radio" id="checking01" type="radio" value="custPassWordValid"  checked="checked"/>
						<label for="">
							���ݿͻ�������֤
						</label>
					</p>
					<p>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<label for="">
							�ͻ����룺
						</label>
						<input name="custPassWordValid" id="custPassWordValid" type="password"  maxlength="6"/>
					</p>
					<p>
						<input name="check_radio" id="checking02" type="radio" value="identityKindValid" />
						<label for="">
							����֤������
						</label>
					</p>
					<p>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<label for="">
							֤�����ͣ�
						</label>
						<cc:SelectTag4W3C selectFlag="" fixlength="125"
							selectColl="<%=mainIdentityKindColl%>" selectvalue=""
							tagName="identityKindValid" />
					</p>
					<p>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<label for="">
							֤�����룺
						</label>
						<input name="identityCodeValid" id="identityCodeValid" type="text" />
					</p>
					<div id='prodPassWord' style="display: none">
					<p>
						<input name="check_radio" id="checking03" type="radio" value="productPassWordValid" />
						<label for="">
							���ݲ�Ʒ������֤
						</label>
					</p>
					<p>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<label for="">
							��Ʒ���룺
						</label>
						<input name="productPassWordValid" id="productPassWordValid" type="password"  maxlength="6"/>
					</p>
					</div>
					<p>
						<input name="check_radio" id="checking04" type="radio" value="passCheck" />
						<label for="">
							ͨ����֤
						</label>
					</p>
				</div>
				<div align="center">
					<unieap:unieapbutton classname="button_s" name="" onclick="cust_Recognition_Head.BValid_OnClick()" value="ȷ ��" />
		        	<unieap:unieapbutton classname="button_s" name="" onclick="cust_Recognition_Head.closePage()" value="ȡ ��" />
				</div>
			</td>
		</tr>
	</table>
</div>
