<%/* 
             JSP程序简要描述信息
             **************************************************************
             * 程序名	    : blank.jsp
             * 建立日期   :2012-03-08
             * 作者		: 
             * 模块		: 
             * 描述		: 
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
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%
request.setCharacterEncoding("GBK");
String webpath = request.getContextPath();
String flag=(String)request.getAttribute("flag");
String prompt=(String)request.getAttribute("prompt");
String fchargeId=NullProcessUtil.nvlToString(request.getAttribute("fchargeId"),"");
String ffavourId=NullProcessUtil.nvlToString(request.getAttribute("ffavourId"),"");
String fbegReg=NullProcessUtil.nvlToString(request.getAttribute("fbegReg"),"");
String fbegDate=NullProcessUtil.nvlToString(request.getAttribute("fbegDate"),"");
String fproductCity=NullProcessUtil.nvlToString(request.getAttribute("fproductCity"),"");
%>

<html>
  <head>
   
    <title></title>
    
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    
    <script type="text/javascript"
			src="<%=webpath%>/orderaccept/favourplan/js/FavourPlanMainFail.js"></script>
  </head>
  
  <body onload="init();">
  <form>
  	<input type="hidden" name="flag" value="<%=flag%>">  
	<input type="hidden" name="prompt" value="<%=prompt%>">
	<input type="hidden" name="fchargeId" value="<%=fchargeId%>">  
	<input type="hidden" name="ffavourId" value="<%=ffavourId%>"> 
	<input type="hidden" name="fbegReg" value="<%=fbegReg%>">  
	<input type="hidden" name="fbegDate" value="<%=fbegDate%>">
	<input type="hidden" name="fproductCity" value="<%=fproductCity%>">
  </form>
  </body>
</html>
