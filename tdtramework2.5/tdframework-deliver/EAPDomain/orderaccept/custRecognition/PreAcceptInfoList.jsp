<%
	 /* 
	 **************************************************************
	 * 程序名		: PreAcceptInfoList.jsp
	 * 建立日期  	: 2011年2月16日
	 * 作者		: RKligx
	 * 模块		: 客户预受理信息列表
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
<%@ page language="java" pageEncoding="GBK"%>
<%@ page import="java.util.List"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec"%>
<%
	String webPath = request.getContextPath();
	String preRgstNo = "";
	String firstName = "";
	String identityAddress = "";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
	<contextPath value="<%=webPath%>" />
	<link rel="stylesheet" href="<%=webPath%>/common/css/td_style_new.css" type="text/css" />
	<link href="<%=webPath%>/common/css/td_style_ec.css" rel="stylesheet">
	<!-- 公共js  -->
	<script language="javascript" src="<%=webPath%>/unieap/js/Globals.js"></script>
	<script language="javascript" src="<%=webPath%>/unieap/js/Common.js"></script>
	<script language="javascript" src="<%=webPath%>/custcontact/common/businessmodule/jscu/Jscu.js"></script>
	<script language="javascript" src="<%=webPath%>/custcontact/orderaccept/base/Common.js"></script>
	<script language="javascript" src="<%=webPath%>/orderaccept/common/js/CommonUtils.js"></script>	
	<script language="javascript" src="<%=webPath%>/common/js/td_common.js"></script>
	<script language="javascript" src="<%=webPath%>/common/js/prototypeajax.js"> </script>
	<script language="javascript" src="<%=webPath%>/common/js/eccn.js"> </script>
	<script language="javascript" src="<%=webPath%>/common/js/td_date.js" ></script>
	<script language="javascript" src="<%=webPath%>/custcontact/orderaccept/common/js/switchdown.js"></script>
	<script language="javascript" src="<%=webPath%>/orderaccept/custRecognition/js/PreAcceptInfoList.js"></script>
	<link rel="stylesheet" type="text/css" href="<%=webPath%>/unieap/ria3.3/unieap/themes/base/css/unieap.css" />
	<link rel="stylesheet" type="text/css" href="<%=webPath%>/unieap/ria3.3/unieap/themes/blue/css/unieap.css" />
	<script language="javascript" src="<%=webPath%>/buscard/common/js/buscard_2.0.js"></script>
	<script language="javascript" src="<%=webPath%>/unieap/ria3.3/dojo/dojo.js"></script>
	<script language="javascript" src="<%=webPath%>/orderaccept/riaconfig/crm1GlobalConfig.js"></script>
	<script language="javascript" src="<%=webPath%>/orderaccept/common/dialog/MessageBox.js"></script>
  </head>
  
  <body onload="init()">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" class="form_table">
    	<tr>
    		<td>
    			<ec:table items="preAcceptInfoVOList" var="vo" action="" rowsDisplayed="-1" paginationLocation="no" resizeColWidth="false" style="table-layout:auto;" >			
					<ec:row  style="cursor:hand"  >
						<ec:column property="preRgstNo" title="预受理单号" styleClass="eccolomntext" />
						<ec:column property="padNo" title="Pad版单号" styleClass="eccolomntext" />				
						<ec:column property="firstName" title="客户名称"  styleClass="eccolomntext" />	
						<ec:column property="serviceId" title="业务号码"  styleClass="eccolomntext" />
						<ec:column property="identityCode" title="证件号码"  styleClass="eccolomntext" />
						<ec:column property="identityAddress" title="证件地址"  styleClass="eccolomntext" />
						<ec:column property="contactPerson" title="联系人"  styleClass="eccolomntext" />
						<ec:column property="contactPhone" title="联系电话"  styleClass="eccolomntext" />
						<ec:column title="操作" styleClass="eccolomntext operating_area" property="radioBx">
							<button class="titleButton" onclick="onPreAcceptBtn('${vo.preRgstNo}');">预订单转正式</button>
						</ec:column>
					</ec:row>	 
				</ec:table>
    		</td>
    	</tr>
    </table>
  </body>
</html>
