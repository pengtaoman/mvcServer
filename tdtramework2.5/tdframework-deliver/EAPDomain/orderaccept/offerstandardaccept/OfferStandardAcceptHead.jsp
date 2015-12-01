<%@ page language="java" pageEncoding="GBK"%>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%
/* 
 JSP�����Ҫ������Ϣ
 **************************************************************
 * ������	: CustInfoMgtHead.jsp
 * ��������: 2012-02-18
 * ����		: Shaochy
 * ģ��		: ������������
 * ����		: �����׼���ײ�
 * ��ע		: 
 * ------------------------------------------------------------
 * �޸���ʷ
 * ���		����		�޸���	�޸�ԭ��
 * 1
 * 2
 **************************************************************
 */
%>
<%
	String webPath = request.getContextPath();
	ParamObjectCollection certcoll = (ParamObjectCollection) request.getAttribute("certcoll");//֤������
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>
			�����׼���ײ�
		</title>
		<!-- ��ֹ���� headers -->
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="Expires" content="-1" />
		<meta http-equiv="Cache-Control" content="no-cache" />
		<!-- end ��ֹ���� headers -->
		<!-- ����css  -->
		<link rel="stylesheet" href="<%=webPath%>/common/css/td_style_new.css" type="text/css" />
		<!-- ����js  -->
		<script language="javascript" src="<%=webPath%>/custcontact/common/js/td_operation.js"></script>
		<script language="javascript" src="<%=webPath%>/common/js/td_common.js"></script>
		<script  language=javascript src="<%=webPath%>/unieap/js/Globals.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/Common.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/BaseObj.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/EAPObjsMgr.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/TextObj.js"> </script> 
		<script  language=javascript src="<%=webPath%>/unieap/js/PasswordObj.js"> </script>
		<script language=javascript src="<%=webPath%>/orderaccept/common/js/CommonUtils.js"></script>
		<!-- title��js -->
		<script language="javascript" src="<%=webPath%>/common/js/titlebar.js"></script>
		<script language="javascript" src="<%=webPath%>/common/js/waitingbar.js"></script>
		<script language="javascript" src="<%=webPath%>/custcontact/common/businessmodule/base/Common.js"></script>	
		<link rel="stylesheet" type="text/css" href="<%=webPath%>/unieap/ria3.3/unieap/themes/base/css/unieap.css"/>
		<link rel="stylesheet" type="text/css" href="<%=webPath%>/unieap/ria3.3/unieap/themes/blue/css/unieap.css"/>	
		<script language="javascript" src="<%=webPath%>/unieap/ria3.3/dojo/dojo.js"></script>
		<script language="javascript" src="<%=webPath%>/orderaccept/riaconfig/crm1GlobalConfig.js"></script>
		<script language="javascript" src="<%=webPath%>/orderaccept/common/dialog/MessageBox.js"></script>
    	<!-- �����׼���ײ�js -->
    	<script language="javascript" src="<%=webPath%>/orderaccept/offerstandardaccept/js/OfferStandardAcceptHead.js"></script>
	</head>
	<body class="mainBody" onload="init();">
		<unieap:form action=""  >		
			<input type="hidden" name="webpath" id="webpath" value="<%=webPath%>" />
			<input type="hidden" id="QueryMet" name="QueryMet" value="1" />
			<table border="0" cellpadding="0" cellspacing="0" class="formTable">
				<!-- ��������-->
				<tr class="tableTitleTR2">
					<td colspan="3">
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="tableTitleLeft2">
									&#160;
								</td>
								<td class="tableTitle2">
									�����׼���ײͲ�ѯ
								</td>
								<td class="tableTitleRight2">
									&#160;
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td class="formTableL">
						&#160;
					</td>
					<td class="formTableC">
						<!-- BEGIN ���������� -->
						<table align="center" border="0" cellpadding="0" cellspacing="2" class="formTableCore">					
							<tr>
								<td class="formLabel">
									<span class="formRequested">*</span>��ѯ��ʽ:
								</td>
								<td class="formField" colspan="7" >
									<input name="QueryFlag" type="radio" value="1" checked id="queryByServiceId" onclick="changeQuery(this)">
									<label for="queryByServiceId">ҵ������ѯ</label>
									<input name="QueryFlag" type="radio" value="2" id="queryByCertId" onclick="changeQuery(this)">
									<label for="queryByCertId">֤�������ѯ</label>
									<input name="QueryFlag" type="radio" value="3" id="queryByCertId" onclick="changeQuery(this)">
									<label for="queryByFirstName">�ͻ����Ʋ�ѯ</label>									
             					 </td>
							</tr>	
								
							<tr id="trServiceId">
								<td class="formLabel">
									<span class="formRequested">*</span><span id="condition1">ҵ�����:</span>
								</td>
								<td class="formField">
									<unieap:input tcname="Text" id="serviceId" name="serviceId" prompt="ҵ�����" isnullable="false" 
										onblur="trimField(this);getProductIdList(this);" 
										maxlength="30" onfocus="focusEnd();"  />										
								</td>
								<td class="formLabel">
									<span class="formRequested">*</span><span id="condition2">��Ʒ����:</span>
								</td>
								<td class="formField">
									<select name="productId" id='productId'>
										<option value="">
											��ѡ��
										</option>
									</select>
				             	</td>							
								<td class="formField2">
									<unieap:unieapbutton classname="formButton" name="BQuery" onclick="BQuery_OnClick()" value="�� ѯ" />
									<unieap:unieapbutton classname="formButton" name="BReset" onclick="BReset_OnClick()" value="�� ��" />								
								</td>	
								<td class="formLabel" ></td>
								<td class="formField" ></td>																
							</tr>
															
													
							<tr id="trIdentity" style="display: none;">
								<td class="formLabel">
									<span class="formRequested">*</span>֤������:
								</td>
								<td class="formField">
									<td:SelectTag selectFlag="" selectColl="<%=certcoll%>" selectvalue="" tagName="identityKind"/>	
								</td>
								<td class="formLabel">
									<span class="formRequested">*</span>֤������:
								</td>
								<td class="formField">
									<unieap:input tcname="Text" id="identityCode" name="identityCode" prompt="֤������" isnullable="true" 
										value="" maxlength="30" onkeypress="return on_key_id_check(document.forms[0].identityKind,this,this)"
										onblur="trimField(this);checkid_iden_new('֤������',document.forms[0].identityKind,this)" 
										onfocus="setlength(document.forms[0].identityKind,this);" />
								</td>
								<td class="formField2">
									<unieap:unieapbutton classname="formButton" name="BQuery" onclick="BQuery_OnClick()" value="�� ѯ" />
									<unieap:unieapbutton classname="formButton" name="BReset" onclick="BReset_OnClick()" value="�� ��" />								
								</td>	
								<td class="formLabel" ></td>
								<td class="formField" ></td>																
							</tr>
								
							<tr id="trFirstName" style="display: none;">
								<td class="formLabel" >
									<span class="formRequested">*</span>�ͻ�����:
								</td>
								<td class="formField" >
									<unieap:input tcname="Text"id="firstName" name="firstName" prompt="�ͻ�����" isnullable="true" maxlength="30"
									onblur="trimField(this);" />	
									<input type="checkbox" name="checkbox" id="checkbox" onclick="changeQueryMet(this);">
									<img src="common/images/icon/jqcx_icon.png" width="20" height="20">							
								</td>	
								<td class="formLabel" >&#160;</td>
								<td class="formField" >&#160;</td>																
								<td class="formField2">
									<unieap:unieapbutton classname="formButton" name="BQuery" onclick="BQuery_OnClick()" value="�� ѯ" />
									<unieap:unieapbutton classname="formButton" name="BReset" onclick="BReset_OnClick()" value="�� ��" />							
								</td>									
								<td class="formLabel" ></td>
								<td class="formField" ></td>																			
							</tr>
						</table>
					</td>
					<td class="formTableR">
						&#160;
					</td>
				</tr>
				<tr>
					<td class="formTableLB">
						&#160;
					</td>
					<td class="formTableB">
						&#160;
					</td>
					<td class="formTableRB">
						&#160;
					</td>
				</tr>
				<tr>
					<td colspan="3" class="formButtonTD" align="center">

					</td>
				</tr>
			</table>
		</unieap:form>
	</body>
</html>