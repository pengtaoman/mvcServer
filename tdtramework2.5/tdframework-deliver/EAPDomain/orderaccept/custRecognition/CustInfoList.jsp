<%
	/* JSP�����Ҫ������Ϣ
	 **************************************************************
	 * ������	: CustInfoList.jsp
	 * ��������: 2011-1-09
	 * ����		:liurong@neusoft.com
	 * ģ��		: �ͻ�ʶ��
	 * ����		: �ͻ�ʶ����ʾҳ��
	 * ��ע		: 
	 * ------------------------------------------------------------
	 * �޸���ʷ
	 * ���		����		�޸���			�޸�ԭ��
	 * 1
	 * 2
	 **************************************************************
	 */
%>
<%@ page contentType="text/html; charset=GBK" language="java"
	isELIgnored="false"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%
	String webpath = request.getContextPath();
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<contextPath value="<%=webpath%>" />
		<applyEvent value="${param.applyEvent}" />
		<title>�ͻ���Ϣ�б�</title>
		<!-- ����css  -->
		<link href="<%=webpath%>/common/css/td_style_ec.css" rel=stylesheet>
		<link href="<%=webpath%>/common/css/td_style_new.css" rel="stylesheet" type="text/css" />
		<!-- ����js  -->
		<script language="javascript"
			src="<%=webpath%>/common/js/td_common.js"></script>
		<script language="javascript" src="<%=webpath%>/common/js/eccn.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"></script>
		<script language="javascript"
			src="<%=webpath%>/orderaccept/custRecognition/js/CustInfoList.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/ria3.3/dojo/dojo.js"></script>
		<script language="javascript" src="<%=webpath%>/orderaccept/riaconfig/crm1GlobalConfig.js"></script>
		<script language="javascript" src="<%=webpath%>/orderaccept/common/dialog/MessageBox.js"></script>
	</head>
	<body class="mainBody" onload="init();" style="padding: 0px;">
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
								<img src="<%=webpath%>/common/images/icon/information_icon.png" width="16" height="16" />��ѯ���
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
				<td class="formTableC" style="vertical-align: top;">
					<!-- BEGIN ���������� -->
					<table align="center" border="0" cellpadding="0" cellspacing="2" class="formTableCore" height="100%">
						<tr>
							<td>
								<ec:table items="optrs" var="pre" style="table-layout:fixed;" 
									action="${pageContext.request.contextPath}/ordermgr/newCustRecognitionAction.do?method=doQuery">
									<ec:row>
										<ec:column property="checkBx" title="ѡ��" width="40px"
											filterable="false" sortable="false" style="text-align:center">
											<input type="radio" name="Cust" id="Cust"
												value="${pageScope.pre.custId}" onclick="onRadio('${pageScope.pre.custId}','${pageScope.pre.identityKind}','${pageScope.pre.identityCode}','${pageScope.pre.groupFlag}','${pageScope.pre.cityCode}','${pageScope.pre.serviceId}','${pageScope.pre.productId}')"
												style="width: 40">							
										</ec:column>
										<ec:column property="cityCodeDesc" title="����" 
											style="text-align:center" />
										<ec:column property="custId" title="�ͻ����" 
											style="text-align:center" />
										<ec:column property="custName" title="�ͻ�����" 
											style="text-align:center" />
										<ec:column property="identityKindDesc" title="֤������" 
											style="text-align:center" />
										<ec:column property="identityCode" title="֤������" 
											style="text-align:center" />
										<ec:column property="productName" title="����Ʒ����" ellipsis="true" styleClass="eccolomntext"
											style="text-align:center" />
										<ec:column property="productIdDesc" title="��Ʒ����"  ellipsis="true" styleClass="eccolomntext"
											style="text-align:center" />
										<ec:column property="serviceId" title="ҵ�����" 
											style="text-align:center" />
										<ec:column property="custAddress" title="�ͻ���ַ" ellipsis="true" styleClass="eccolomntext"
											style="text-align:left" />
										<ec:column property="stateDesc" title="�ͻ�״̬" 
											style="text-align:center" />
										<ec:column property="groupId" title="�ͻ����ű��" 
											style="text-align:center" />
										<ec:column property="ifExistShopingCart" title="�Ƿ��й��ﳵ��¼" width="100"
											style="text-align:center" />
									</ec:row>
								</ec:table>
							</td>
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
		<div align="center" style="padding-top: 3px;">
			<button name="btnClose" class="formButton" onclick="parent.unieap.getDialog().close();" style="text-align: center;line-height: 18px;">�� ��</button>
		</div>
	</body>
</html>