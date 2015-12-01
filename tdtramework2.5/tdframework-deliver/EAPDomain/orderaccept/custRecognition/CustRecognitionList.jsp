<%
	 /* 
	 **************************************************************
	 * ������ : CustAllInfoQueryContent.jsp
	 * ��������: 2011-05-12
	 * ���� : liurong@neusoft.com
	 * ģ�� : �ͻ��Ӵ�
	 * ���� : �ۺϿͻ���ѯ
	 * ��ע : 
	 * ------------------------------------------------------------
	 * �޸���ʷ
	 * ���       ����    �޸���    �޸�ԭ��
	 *  1     2012-5-15  ף����    UI����
	 **************************************************************
	 */
%>
<%@ page language="java" pageEncoding="GBK"%>
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Map"%>
<%
			
	String custId = NullProcessUtil.nvlToString((String) request
			.getAttribute("custId"), "0");//�ͻ�Id
	String cityCode = NullProcessUtil.nvlToString((String) request
			.getAttribute("cityCode"), "0");//cityCode
	String webPath = request.getContextPath();

	String queryType = NullProcessUtil.nvlToString((String) request
			.getAttribute("queryType"), "0"); //��ѯ��ʽ
	String queryLevel = NullProcessUtil.nvlToString((String) request
			.getAttribute("queryLevel"), "0");//��ѯ���𣬿ͻ������û���
	String serviceId = NullProcessUtil.nvlToString(request
			.getAttribute("serviceId"), "0"); //�������
	String npInfo = NullProcessUtil.nvlToString(request
					.getAttribute("npInfo"), "0"); //NPҵ����Ϣ
	String preRgsNo = NullProcessUtil.nvlToString(request
			.getAttribute("preRgsNo"), "0"); //ԤԼ������
			
	String preAcceptQueryFlag = NullProcessUtil.nvlToString(request.getAttribute("preAcceptQueryFlag"),"");//���ݿͻ���Ų�ѯԤ������Ϣ��ʶ	
	
	String preAcceptInfo = NullProcessUtil.nvlToString(request
					.getAttribute("preAcceptInfo"), "0"); //Ԥ�����ѯ�Ƿ���֤����ѯ
	String protocalInfoCount=  NullProcessUtil.nvlToString(request
			.getAttribute("protocalInfoCount"), "0"); //Э����Ϣ����
			
	String matureCount = NullProcessUtil.nvlToString(request
			.getAttribute("matureCount"), "0"); //�������ѵ�����Ʒ����
	//�ͻ�������Ϣ
	String custOrderList = "/newCustRecognitionAction.do?method=getCustOrderList&cityCode="
			+ cityCode
			+ "&custId="
			+ custId
			+ "&queryType="
			+ queryType
			+ "&queryLevel="
			+ queryLevel
			+ "&serviceId="
			+ serviceId;

	//�ͻ�ԤԼ������Ϣ
	String preCustOrderList = "/newCustRecognitionAction.do?method=getPreCustOrderList&cityCode="
			+ cityCode
			+ "&custId="
			+ custId
			+ "&queryType="
			+ queryType
			+ "&queryLevel="
			+ queryLevel
			+ "&serviceId="
			+ serviceId;

	//�ҵ��˻���Ϣ
	String accountInfo = "/newCustRecognitionAction.do?method=getAccountInfoDetail&cityCode="
			+ cityCode + "&custId=" + custId;

	//���ۻ���
	List<Map> opportunityList = (List<Map>) request
			.getAttribute("opportunityList");
	int oppCount = 0;
	if(opportunityList != null && opportunityList.size() > 0){
		oppCount = opportunityList.size();
	}
	//NP��Ϣ
	String npList="/newCustRecognitionAction.do?method=getNPInfoDetail&cityCode="
		+ cityCode + "&custId=" + custId+"&npServiceId="+serviceId+"&npInfo="+npInfo;
	
	//ԤԼ������Ϣ
	String preAcceptList ="/newCustRecognitionAction.do?method=getPreAcceptDetail&cityCode="
		+ cityCode + "&custId=" + custId+"&preRgsNo="+preRgsNo+"&preAcceptInfo="+preAcceptInfo+"&preAcceptQueryFlag="+preAcceptQueryFlag;
	
	//��������
	String matureList = "/newCustRecognitionAction.do?method=getDueQuery&cityCode="
		+ cityCode + "&custId=" + custId;

	
	//��;����
	String myorderList = "/myorderQueryAction.do?method=doQuery&custId="+custId+
					"&cityCode="+ cityCode+"&queryWay=2";
	//Э����Ϣ
	String protocalInfoList ="/newCustRecognitionAction.do?method=getProtocalInfo&cityCode="+ cityCode + "&custId=" + custId+"&protocalInfoCount="+protocalInfoCount;
	//Ӫ����Ϣ���û��Ѱ���Ĵ��������б�
	String salesPromotionInfoList="/newCustRecognitionAction.do?method=getSalesPromotionInfo&custId=" + custId;
	Boolean npVisible =false; //NP TABҳ�Ƿ���ʾ
	Boolean npActive =false;  //NP TABҳ�Ƿ�Ĭ����ҳ
	Boolean custOrderActive =false;	//�ͻ�������Ϣҳ�Ƿ�Ĭ����ҳ
	Boolean preAcceptVisible =false; //Ԥ���� TABҳ�Ƿ���ʾ
	Boolean preAcceptActive =false;  //Ԥ���� TABҳ�Ƿ�Ĭ����ҳ
	Boolean matureVisible =false; //����Ʒ��������ҳ�Ƿ���ʾ
	Boolean protocalVisible =true; //Э����Ϣ TABҳ�Ƿ���ʾ

	//TABҳ�Ƿ���ʾ�����ж�
	if(!"".equals(npInfo)){
		npVisible=true;
		npActive=true;
	}else if(!"".equals(preRgsNo)){
		preAcceptVisible=true;
		preAcceptActive=true;
	}else{
		custOrderActive=true;
	}
	if(!"0".equals(matureCount)){//����ڵ���������Ϣ
		matureVisible=true;
	}
	if(!"0".equals(protocalInfoCount)){ //����ʾЭ����Ϣ
		protocalVisible =true;
	}
%>
<html>
	<head>
		<title>�û���ϸ��Ϣ</title>
		<link rel="stylesheet"
			href="<%=webPath%>/unieap/css/tab/unieapTab.css" type="text/css"></link>
		<link rel="stylesheet" href="<%=webPath%>/common/css/td_style_tab.css"
			type="text/css"></link>
		<link href="<%=webPath%>/common/css/td_style_new.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript"
			src="<%=webPath%>/unieap/js/tab/tabApi.js"></script>
		<script language=javascript src="<%=webPath%>/unieap/js/Globals.js"></script>
		<script language=javascript
			src="<%=webPath%>/unieap/js/tab/unieapTab.js"></script>
		<script language=javascript src="<%=webPath%>/unieap/js/Common.js"></script>
		<script language=javascript
			src="<%=webPath%>/views/om/common_css_js/double_screen_js/double_screen.js"></script>
		<script language=javascript
			src="<%=webPath%>/custcontact/statisticquery/allinfoquery/js/AllInfoQueryContent.js"></script>
	</head>
	<body onLoad="" class="mainBody" style="padding: 0px;" >
		<form action="" name="subForm" id="subForm" method="post" >
			<input type="hidden" name="custXml" id="custXml" value="">
			<input type="hidden" name="hahaha" id="hahaha" value="hahaha">
			<input type="hidden" name="tempSaveOrderXML" id="tempSaveOrderXML" value="">
			<input type="hidden" name="protocolProdOffer" id="protocolProdOffer" value="" />
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
									<img src="<%=webPath%>/common/images/icon/information_icon.png" width="16" height="16" />��ѯ���
									<span class="tableTitle_span" style="margin-left:10px;">[ ���ۻ���<font face="Arial">(<%=oppCount %>)</font>
										<%if(oppCount > 0){
											Map tempMap = null;%>��&nbsp;&nbsp;
										<span id="saleOpperDiv">
											<%for(int i = 0; i < oppCount; i++){
												tempMap = opportunityList.get(i); %>
											<span id='oppor_<%=tempMap.get("oppId") %>' prodId='<%=tempMap.get("prodId") %>'>
												<a href="#"><%=tempMap.get("oppName")%>��<%=tempMap.get("prodName")%></a>
												<%if(i < oppCount - 1){out.write("|&nbsp;");} %>
											</span>
										<%	}%>
										</span>
										<%}%>]
									</span>
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
					<td class="formTableC" style="vertical-align: top;" height="430px;">
						<!-- BEGIN ���������� -->
						<table align="center" border="0" cellpadding="0" cellspacing="2" class="formTableCore" height="100%">
							<tr>
								<td>
									<unieap:Tab name="tabPage" tabMode="1" design="1" width="100%" cellWidth="95">
										<unieap:TabPage securityid="" text="������Ϣ" title="������Ϣ"
											url="<%=custOrderList%>" height="100%" active="<%=custOrderActive%>"
											autoCheckEAP="false" />
										<unieap:TabPage securityid="" text="�˻���Ϣ" title="�˻���Ϣ"
											url="<%=accountInfo%>" height="100%" />
										<unieap:TabPage securityid="" text="Ԥ������Ϣ" title="Ԥ������Ϣ"
											url="<%=preAcceptList%>" height="100%" visible="<%=preAcceptVisible%>" active="<%=preAcceptActive%>"/>
										<unieap:TabPage securityid="" text="NP��Ϣ" title="NP��Ϣ"
											url="<%=npList%>" height="100%" visible="<%=npVisible%>" active="<%=npActive%>"/>
										<unieap:TabPage securityid="" text="���۵�������" title="���۵�������"
											url="<%=matureList%>" height="100%" visible="<%=matureVisible%>" />
										<unieap:TabPage securityid="" text="��;����" title="��;����"
											url="<%=myorderList%>" height="100%" visible="true" />
										<unieap:TabPage securityid="" text="Э����Ϣ" title="Э����Ϣ"
											url="<%=protocalInfoList%>" height="100%"  visible="<%=protocalVisible%>"/>
										<unieap:TabPage securityid="" text="������Ϣ" title="������Ϣ"
											url="<%=salesPromotionInfoList%>" height="100%"/>
										<unieap:TabPage securityid="" text="ԤԼ��Ϣ" title="ԤԼ��Ϣ"
											url="<%=preCustOrderList%>" height="100%"/>
									</unieap:Tab>
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
		</form>
	</body>
</html>
