
<%@ page language="java"  pageEncoding="GBK"%>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td" %>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>

<%/* 
   **************************************************************
   * ������ : FavourPlanHead.jsp
   * ��������: 2009��3��11��17:11:06
   * ���� : lingchen@neusoft.com
   * ģ�� : ��������-�Żݼƻ�����
   * ���� : �ṩ��ѯʱ�����봰��
   * ��ע : version20100427001
   * ------------------------------------------------------------
   * �޸���ʷ
   * ��� ���� �޸��� �޸�ԭ��
   * 1   20100426 ���ٻ� �������ر�����¼��ѯ����
   * 2
   **************************************************************
   */%>
<%
	String webPath = request.getContextPath();
	ParamObjectCollection cityCodeColl = (ParamObjectCollection) request.getAttribute("cityCodeColl");//ҵ������
	ParamObjectCollection identityKindcoll = (ParamObjectCollection) request.getAttribute("identityKindcoll");//֤������2009��3��9��14:24:26
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gbk">
		<title>
			�Żݼƻ��������
		</title>
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="Expires" content="-1" />
		<meta http-equiv="Cache-Control" content="no-cache" />
		<!-- end ��ֹ���� headers -->
		<link rel="stylesheet" href="<%=webPath%>/common/css/td_style_new.css" type="text/css" />
		<!-- title��js -->
		<script language="javascript" src="<%=webPath%>/common/js/titlebar.js" ></script>
		<!-- ����js  -->
		<script language="javascript" src="<%=webPath%>/custcontact/common/js/td_operation.js"></script>
		<script language="javascript" src="<%=webPath%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=webPath%>/custmgt/common/js/nas_set_service_kind.js" ></script>
		<script language="javascript" src="<%=webPath%>/custcontact/common/js/SwithValueCommon.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/Globals.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/Common.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/BaseObj.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/EAPObjsMgr.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/PasswordObj.js"> </script>
		<script  language=javascript src="<%=webPath%>/unieap/js/TextObj.js"> </script>   
		<script language="javascript" src="<%=webPath%>/custcontact/common/js/crm_common.js"> </script>
		<!-- ҳ�漶js -->
		<script language="javascript" src="<%=webPath%>/orderaccept/favourplanquery/js/FavourPlanHead.js"></script>
		
	</head>

	<body class="mainBody">
		<unieap:form action=""  >
			<input type="hidden" id="IfAuthor" name="IfAuthor" value="0" />
			<input type="hidden" id="WebPath" name="WebPath" value="<%=webPath%>" />
			<!-- ���� ���ٻ� 20100427 �������ر�����¼��ѯ����(��ѯ��ʽ,��ѯ����) -->
			<input type="hidden" id="hiddenSelType" name="hiddenSelType" value="" />
			<input type="hidden" id="hiddenQueryNo" name="hiddenQueryNo" value="" />
			<!-- end ���ٻ� 20100427 -->
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
									�Żݼƻ�
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
								<td class="formLabel" width="5%">
									����
								</td>
								<td class="formField" width="10%">
									<td:SelectTag selectFlag="false" tagName="cityCode" selectColl="<%=cityCodeColl%>" selectvalue="" />
								</td>
								
								<td class="formLabel" width="5%">
									ҵ�����
								</td>
								<td class="formField" width="10%">
                                    <unieap:input tcname="Text" id="serviceId" name="serviceId" prompt="ҵ�����" isnullable="true" maxlength="30"  onblur="getProductIdList(this);" />	 
								</td>
								
								<td class="formLabel" width="5%">
									��Ʒ����
								</td>
								<td class="formField" width="10%">
								    <span class="selectDiv">
									<select name="productId"  id="productId">
											<option value="-1">��ѡ��</option>
								 	</select>	
								 	</span> 
								</td>
								
								<td class="formLabel" width="10%">
								<button class="formButton" onClick="Query_OnClick()"  >�� ѯ</button>
						        <button class="formButton" onClick="Refresh_OnClick()">�� ��</button>
								</td>
								<td class="formLabel" width="60%">&nbsp;</td>					
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
			</table>
		</unieap:form>
	</body>
</html>
