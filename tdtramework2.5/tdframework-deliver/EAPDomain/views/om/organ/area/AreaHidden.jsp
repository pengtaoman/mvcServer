<%
/* JSP程序简要描述信息
**************************************************************
* 程序名	: 区域详细信息
* 建立日期: 2007-04-06
* 作者		: zhaof@neusoft.com
* 模块		: 权限
* 描述		: 权限系统-区域维护
* 备注		: 
* ------------------------------------------------------------
* 修改历史
* 序号		日期		修改人			修改原因
* 1
* 2
**************************************************************
*/
%>
<%@ page contentType="text/html; charset=gb2312" %>
<%@ taglib uri="/WEB-INF/tld/crm_taglibs.tld" prefix="crm" %>
<%@ taglib uri="/WEB-INF/tld/om.tld" prefix="om" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>

<% 
	String path = request.getContextPath();	
	String operFlag = (String)request.getAttribute("operFlag");
	String message = (String) request.getAttribute("message");
	String areaId = (String)request.getAttribute("areaId");
	
	String parentAreaId = (String)request.getAttribute("parentAreaId");
	String parentAreaName = (String)request.getAttribute("parentAreaName");
	String priAreaId = (String)request.getAttribute("priAreaId");
%>
<html>
	<head>
	<unieap:base />
		<title></title>
		<link href="<%=path%>/common/css/td_style.css" rel=stylesheet type="text/css">
		<SCRIPT language="JavaScript">
			/*
			 *ylm
			 */
			function load(flag){
				var message = document.getElementById("message").value;
				if(message!=null && message!=''){
					alert(message);
				}
				var operFlag = document.getElementById("operFlag").value;
				if(operFlag == 'delete'){
					var parentObj = parent.params.document.queryPage.document;					
					parentObj.getElementById("bSearch").click();
					var path = document.getElementById("path").value;
					var priAreaId = document.getElementById("priAreaId").value;
					var parentAreaId = document.getElementById("parentAreaId").value;
					var parentAreaName = document.getElementById("parentAreaName").value;
					parentObj.location=path+"/om/areaaction.do?OperType=initQueryPage&areaIdValue="+priAreaId
					+"&parentAreaId="+parentAreaId+"&parentAreaName="+parentAreaName;
				}
			}
		</SCRIPT>
	</head>
	<body onload="load()">
		<form action="" method="post">
			<input type="hidden" name="path" value="<%=path%>"/>
			<input type="hidden" name="operFlag" value="<%=operFlag%>" />
			<input type="hidden" name="message" value="<%=message%>" />
			<input type="hidden" name="areaId" value="<%=areaId%>" />
			<input type="hidden" name="parentAreaId" value="<%=parentAreaId%>" />
			<input type="hidden" name="parentAreaName" value="<%=parentAreaName%>" />
			<input type="hidden" name="priAreaId" value="<%=priAreaId%>" />
		</form>
	<body>
</html>
