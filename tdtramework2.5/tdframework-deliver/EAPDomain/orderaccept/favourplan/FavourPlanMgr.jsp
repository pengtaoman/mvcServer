<%/* 
             JSP程序简要描述信息
             **************************************************************
             * 程序名	    : FavourPlanMgr.jsp
             * 建立日期   : 2012-03-03
             * 作者		: lianxu
             * 模块		: 优惠计划受理页面
             * 描述		: 查询有效的优惠计划信息
             * 备注		: 
             * ------------------------------------------------------------
             * 修改历史
             * 序号		日期		修改人			修改原因
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
<!-- 下拉框标签-->
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
	   paramObject.setName("请选择");
	   favourPlanColl.addElement(paramObject);
     }
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>
			优惠计划选择
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
		<!-- 公共css  -->
		<link rel="stylesheet" href="<%=webpath%>/common/css/td_style_new.css" type="text/css" />
		<!-- 等待条js-->
		<script language="javascript" src="<%=webpath%>/common/js/waitingbar.js"></script>
		<!-- title条js -->
		<script language="javascript" src="<%=webpath%>/common/js/titlebar.js"></script>
		<!-- cust公共css -->
		<!-- 密码验证公用js -->
		<script language="javascript" src="<%=webpath%>/custmgt/common/js/commonajx.js"></script>
		<!-- 公共js  -->
		<script language="javascript" src="<%=webpath%>/common/js/td_common.js"></script>
	    <script language="javascript" src="<%=webpath%>/common/js/td_date.js" ></script>
		<!-- 公共预算用的JS (密码验证用)-->
		<script language="javascript" src="<%=webpath%>/unieap/js/Common.js"></script>
		<script language="javascript" src="<%=webpath%>/unieap/js/Globals.js"></script>
		<!-- 输入文本框校验公用js -->
		<script language="javascript" src="<%=webpath%>/custcontact/common/js/crm_common.js"></script>
		<!-- 页面js -->
		<script type="text/javascript" src="<%=webpath%>/orderaccept/favourplan/js/FavourPlanMgr.js"></script>
		<!-- G网，C网-->
		<script language="javascript" src="<%=webpath%>/custmgt/common/js/nas_set_service_kind.js"></script>
		<!-- 根据业务类型控制业务号码的开关的js -->
		<script language="javascript" src="<%=webpath%>/custcontact/common/js/SwithValueCommon.js"> </script>
	</head>
	<body onload="init();" class="">
		<unieap:form method="post" action="">
		    <input type="hidden" id="webpath" value="<%=webpath%>">
			<table border="0" cellpadding="0" cellspacing="0" class="formTable">
				<!-- 表格标题行-->
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
							                      优惠计划名称			
						            </td>
						            <td class="formField">
							          <input type='text' id='favourName' name='favourName' maxlength="40" value="<%=favourName%>" />
 			                          <unieap:unieapbutton securityid="" classname="formButton" name="btn_query" value="查 询" onclick="onClick()" />
						            </td>
									<td class="formLabel">
									  优惠计划
									</td>
									<td colspan="3" class="formField">
										<td:SelectTag4W3C selectFlag="false" selectColl="<%=favourPlanColl%>" tagName="favourPlan" selectvalue=""/>
									</td>									
								</tr>								
								<tr>
									<td class="formLabel">
										起始时间
									</td>
									<td class="formField">
									  <unieap:input tcname="Text" id="begDate"  maxlength="16" name="begDate" value="<%=begDate%>" classname="dateField" prompt="起始时间" tooltip="起始时间" isnullable="false" style="width:105px"/>
							          <button class="calendarImgButton" id="calendarBt1"></button>
									</td>
									<td class="formLabel">
										终止时间
									</td>
									<td class="formField">
						              <unieap:input tcname="Text" id="endDate" maxlength="16" name="endDate" value="<%=endDate%>" classname="dateField" prompt="终止时间" tooltip="终止时间" isnullable="false" style="width:105px"/>
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
				<unieap:unieapbutton securityid="" classname="formButton" name="btn_save" value="保   存" onclick="favourplan_save()" />
				<unieap:unieapbutton securityid="" classname="formButton" name="btn_close" value="关   闭" onclick="favourplan_close()" />
			</div>
		</unieap:form>
	</body>
</html>