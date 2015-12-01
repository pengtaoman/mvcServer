<%/* 
             JSP�����Ҫ������Ϣ
             **************************************************************
             * ������	    : FavourPlanMgr.jsp
             * ��������   : 2012-03-03
             * ����		: lianxu
             * ģ��		: �Żݼƻ�����ҳ��
             * ����		: ��ѯ��Ч���Żݼƻ���Ϣ
             * ��ע		: 
             * ------------------------------------------------------------
             * �޸���ʷ
             * ���		����		�޸���			�޸�ԭ��
             * 1
             * 2
             **************************************************************
             */

            %>
<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page import="com.neusoft.tdframework.common.util.HttpObjectUtil"%>
<%@ page import="com.neusoft.tdframework.common.data.ParamObjectCollection"%>
<%@ page import="com.neusoft.tdframework.common.data.ParamObject"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%@ page import="java.text.DateFormat"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="com.neusoft.crm.ordermgr.common.util.dateutil.DateUtils"%>
<!-- �������ǩ-->
<!-- unieap-->
<%@ taglib uri="/WEB-INF/taglib/unieap.tld" prefix="unieap"%>
<%@ taglib uri="/WEB-INF/tld/td.tld" prefix="td"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%	
     request.setCharacterEncoding("GBK");
     String webpath = request.getContextPath();
     DateFormat dformat = new SimpleDateFormat("yyyy-MM-dd");
     String appContextPath = HttpObjectUtil.getApplicationContextPath(request);
     String favourName = NullProcessUtil.nvlToString(request.getAttribute("favourName"), "");
     String begDate = NullProcessUtil.nvlToString(request.getAttribute("begDate"), dformat.format(DateUtils.getSysdate()));
     String endDate = NullProcessUtil.nvlToString(request.getAttribute("endDate"), "2037-01-01");
     ParamObjectCollection favourPlanColl = (ParamObjectCollection) request.getAttribute("favourPlanColl");
     if (null == favourPlanColl){
       favourPlanColl = new ParamObjectCollection();
       ParamObject paramObject = new ParamObject();
	   paramObject.setId("");
	   paramObject.setName("��ѡ��");
	   favourPlanColl.addElement(paramObject);
     }
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>
			�Żݼƻ�ѡ��
		</title>
        <contextPath value="<%=webpath%>"/>
        <base target=_self/>
		<script  language=javascript src="<%=webpath%>/unieap/js/Globals.js"> </script>
		<script  language=javascript src="<%=webpath%>/unieap/js/Common.js"> </script>
		<script  language=javascript src="<%=webpath%>/unieap/js/BaseObj.js"> </script>
		<script  language=javascript src="<%=webpath%>/unieap/js/EAPObjsMgr.js"> </script>
		<script  language=javascript src="<%=webpath%>/unieap/js/NumberObj.js"> </script>
		<script  language=javascript src="<%=webpath%>/unieap/js/PasswordObj.js"> </script>
		<script  language=javascript src="<%=webpath%>/unieap/js/TextObj.js"> </script>
		<!-- ����css  -->
		<link rel="stylesheet" href="<%=webpath%>/common/css/td_style_new.css" type="text/css" />
		<!-- �ȴ���js-->
		<script language="javascript" src="<%=webpath%>/common/js/waitingbar.js"></script>
		<!-- title��js -->
		<script language="javascript" src="<%=webpath%>/common/js/titlebar.js"></script>
		<!-- cust����css -->
		<!-- ������֤����js -->
		<script language="javascript" src="<%=webpath%>/custmgt/common/js/commonajx.js"></script>
		<!-- ����js  -->
		<script language="javascript" src="<%=webpath%>/common/js/td_common.js"></script>
	    <script language="javascript" src="<%=webpath%>/common/js/td_date.js" ></script>
		<!-- ����Ԥ���õ�JS (������֤��)-->
		<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"></script>
		<!-- �����ı���У�鹫��js -->
		<script language="javascript" src="<%=webpath%>/custcontact/common/js/crm_common.js"></script>
		<!-- ҳ��js -->
		<script type="text/javascript" src="<%=webpath%>/orderaccept/favourplan/js/FavourPlanMgr.js"></script>
		<!-- G����C��-->
		<script language="javascript" src="<%=webpath%>/custmgt/common/js/nas_set_service_kind.js"></script>
		<!-- ����ҵ�����Ϳ���ҵ�����Ŀ��ص�js -->
		<script language="javascript" src="<%=webpath%>/custcontact/common/js/SwithValueCommon.js"> </script>
	</head>
	<body onload="init();" class="">
		<unieap:form method="post" action="">
		    <input type="hidden" id="webpath" value="<%=webpath%>">
			<table border="0" cellpadding="0" cellspacing="0" class="formTable">
				<!-- ��������-->
				<tr class="tableTitleTR2">
					<td colspan="6">
						<table width="100%" border="0" cellpadding="0" cellspacing="0" id="queryTable">
							<tr>
								<td class="tableTitleLeft2">
									&#160;
								</td>
								<td class="tableTitle2">
									&nbsp;
								</td>
								<td class="tableTitleRight2">
									&#160;
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td class="formTableC" colspan="6">
							<table align="center" border="0" cellpadding="0" cellspacing="0">
								<tr>
						            <td class="formLabel">
							                      �Żݼƻ�����			
						            </td>
						            <td class="formField">
							          <input type='text' id='favourName' name='favourName' maxlength="40" value="<%=favourName%>" />
 			                          <unieap:unieapbutton securityid="" classname="formButton" name="btn_query" value="�� ѯ" onclick="onClick()" />
						            </td>
									<td class="formLabel">
									  �Żݼƻ�
									</td>
									<td colspan="3" class="formField">
										<td:SelectTag4W3C selectFlag="false" selectColl="<%=favourPlanColl%>" tagName="favourPlan" selectvalue=""/>
									</td>									
								</tr>								
								<tr>
									<td class="formLabel">
										��ʼʱ��
									</td>
									<td class="formField">
									  <unieap:input tcname="Text" id="begDate"  maxlength="16" name="begDate" value="<%=begDate%>" classname="dateField" prompt="��ʼʱ��" tooltip="��ʼʱ��" isnullable="false" style="width:105px"/>
							          <button class="calendarImgButton" id="calendarBt1"></button>
									</td>
									<td class="formLabel">
										��ֹʱ��
									</td>
									<td class="formField">
						              <unieap:input tcname="Text" id="endDate" maxlength="16" name="endDate" value="<%=endDate%>" classname="dateField" prompt="��ֹʱ��" tooltip="��ֹʱ��" isnullable="false" style="width:105px"/>
							          <button class="calendarImgButton" id="calendarBt2"></button>
									</td>
									<td class="formLabel">
									</td>
									<td class="formField">
									</td>									
								</tr>
                         </table>
                   </td>
			     </tr>		
			</table>
			<div class="formButtonDIV">
				<unieap:unieapbutton securityid="" classname="formButton" name="btn_save" value="��   ��" onclick="favourplan_save()" />
				<unieap:unieapbutton securityid="" classname="formButton" name="btn_close" value="��   ��" onclick="favourplan_close()" />
			</div>
		</unieap:form>
	</body>
</html>