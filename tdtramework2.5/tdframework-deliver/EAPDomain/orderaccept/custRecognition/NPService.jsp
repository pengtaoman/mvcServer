<%
	/* 
	 **************************************************************
	 * 程序名		: NPService.jsp
	 * 建立日期  	: 2011年5月10日
	 * 作者		: liurong@neusoft.com
	 * 模块		: np携号入网
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
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%@ page import="com.neusoft.crm.custmgr.common.custinfomgr.data.CustIdentVO"%>
<%
	String webPath = request.getContextPath();
	String npServiceId = NullProcessUtil.nvlToString(request.getAttribute("npServiceId"),"");//np携入号码
	CustIdentVO cIndentVO = (CustIdentVO) request.getAttribute("cIdentVO");
	String custName = "";
	String identCode = "";
	if(cIndentVO != null){
		custName = cIndentVO.getCustName();
		identCode = cIndentVO.getIdentityCode();
	}
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
   		<link href="<%=webPath%>/common/dx20/css/workarea_style.css"
			rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=webPath%>/custcontact/orderaccept/common/js/switchdown.js"></script>
  </head>
  
  <body>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" class="form_table">
    	<tr>
    		<td>
    			<table width="100%" border="1" cellpadding="0" cellspacing="0" bordercolor="#d9d9d9" style="border-collapse:collapse;">
    				<tr class="table_title">
    					<td width="30%">np携入号码</td>
    					<td width="30%">客户名称</td>
    					<td width="30%">证件号码</td>
    					<td width="10%">选择</td>
    				</tr>
    				<tr class="table_top">
    					<td><%=npServiceId%></td>
    					<td><%=custName%></td>
    					<td><%=identCode%></td>
    					<td><a href="#" onclick="parent.parent.parent.npDeal(<%=npServiceId%>);">选择</a></td>
    				</tr>
    			</table>
    		</td>
    	</tr>
    </table>
  </body>
</html>
