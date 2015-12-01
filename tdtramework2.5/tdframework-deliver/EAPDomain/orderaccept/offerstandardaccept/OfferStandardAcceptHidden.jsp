
<%
	 /* JSP程序简要描述信息
	 **************************************************************
	 * 程序名		: OfferStandardAcceptHidden.jsp
	 * 建立日期	: 2012-02-22
	 * 作者		: shaochangyuan@neusoft.com
	 * 模块		: orderaccept
	 * 描述		: 隐藏祯
	 * 备注		: 
	 * ------------------------------------------------------------
	 * 修改历史
	 * 序号		日期		修改人	修改原因
	 * 1
	 * 2
	 **************************************************************
	 */
%>
<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="/WEB-INF/taglib/unieap" prefix="unieap"%>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%
	String webpath = request.getContextPath();
	String strResult = (String) request.getAttribute("result");
	String strPrompt = (String) request.getAttribute("prompt");
	String custCity = (String) request.getAttribute("custCity");
	String custId = "";
	String cityCode = "";
	if (null != custCity && !"".equals(custCity)) {
		custId = custCity.split(",")[0];
		cityCode = custCity.split(",")[1];
	}

	String printInfo = NullProcessUtil.nvlToString(request
			.getAttribute("repeatPrintInfo"), "");
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
		<title>OfferStandardAcceptHidden.jsp</title>
		<script language="javascript">
			function init(){
			 <%if(!printInfo.equals("") ){%>
			    	alert("<%=printInfo%>");
			    <%}%>
				var reMsg = "<%=strResult%>";
				if(reMsg=="-1"){
					alert("<%=strPrompt%>");
					//var webpath=document.all("webpath").value;
					//window.open(webpath+"/orderaccept/offerstandardaccept/OfferStandardAcceptMain.jsp",'_parent');
				}
				else if(reMsg=="0"){
					alert("系统错误,<%=strPrompt%>");
				}
			}
		</script>
	</head>
	<body onload="init()">
	<input type="hidden" name="webpath" value="<%=webpath%>" />
	</body>
</html>
