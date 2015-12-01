<%
/* JSP程序简要描述信息
**************************************************************
* 程序名	: 操作员维护页面-人员概要信息列表
* 建立日期: 
* 作者		: zhaof@neusoft.com
* 模块		: 权限
* 描述		: 权限系统-职员维护-转交权限
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
<%@ taglib prefix="unieap" uri="/WEB-INF/taglib/unieap"%>
<%@ taglib uri="http://www.extremecomponents.org" prefix="ec" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<%@ page import="java.util.List" %>

<% 
	String path = request.getContextPath();
	String message = (String)request.getAttribute("Message");
	String authId = (String)request.getAttribute("authId");
	String size = String.valueOf(((List)request.getAttribute("EmployeeList")).size());
	if(message == null){
		message = "";
	}
	String fromId = (String)request.getAttribute("fromId");
%>
<html>
	<head>
	<title>权限转交</title>
	<link href="<%=path%>/common/css/td_style_ec.css" rel=stylesheet>
	<LINK REL="stylesheet" HREF="<%=path%>/views/common/css/pubstyle.css" TYPE="text/css"/>
	<!-- begin add by jialixin -->
	<script language="javascript" src="<%=path%>/common/js/td_common.js"></script>
	<script language="javascript" src="<%=path%>/common/js/waitingbar.js"></script>
	<script language="javascript" src="<%=path%>/common/js/titlebar.js"></script>
	<!-- end add by jialixin-->
	
	<script  language=javascript src="<%=path%>/unieap/js/Common.js"> </script>
	<script  language=javascript src="<%=path%>/unieap/js/Globals.js"> </script>
	<script  language=javascript src="<%=path%>/common/js/prototypeajax.js"> </script>
	<script  language=javascript src="<%=path%>/common/js/eccn.js"> </script>
	<script language="JavaScript">
	/**
	 * 页面初始化
	 */
	var eccn=new ECCN("ec");
	function initial(){
		var allElements = document.body.getElementsByTagName("INPUT");
		for (var i = 0; i < allElements.length; i ++) {
			var e = allElements[i];
			if (e.type == 'image') {
				var eName = e.name.substring(4,5);
				//alert(eName);
				if(eName == 0){
					e.src='<%=path%>/common/images/icon/time.gif';
					e.title='正常';
				}else if(eName == 1){
					e.src='<%=path%>/common/images/icon/icon_wljz1.gif';
					e.title='停用';
				}
			}
		}	
		
		eccn.doPrep=false;
		eccn.ajaxSubmit=false;
		eccn.init();
	}
	/**
	 * 对将要提交的标单赋值
	 */
	function selectEmployee(workNo, employeeId)
	{
		var authId = OperForm.authId.value;
		OperForm.workNo.value = workNo;
		OperForm.employeeId.value = employeeId;
		OperForm.toId.value = employeeId;

	}
	/*
	* 提交
	*/
	function doSubmit(){
		var toId = OperForm.toId.value;
		if(toId == null || toId == ""){
			alert("请选择转交的人员");
			return;
		}
		OperForm.action = "<%=path%>/EmployeeQueryAction.do";
		OperForm.OperType.value = "doDeliver";
		OperForm.submit();
	}

   
   // begin add by jialixin
   /**
    *单击一行时候选中单选按钮
    */
   function doOnClickEvent(workNo, employeeId){
   		var cb = document.getElementById("idx_" + employeeId);
		cb.checked = "checked";
		selectEmployee(workNo, employeeId);
   }
   //end add by jialixin
   
	</script>
	</head>
	<body onLoad="initial();">
		<%
		if(!((List)request.getAttribute("EmployeeList")).isEmpty()) {
		%>

			<ec:table items="EmployeeList" nearPageNum="0" var="employee" action="${pageContext.request.contextPath}/EmployeeQueryAction.do?OperType=deliverEmp" >
				<ec:parameter name="beforetable" value="">
					<table border='0' cellpadding='0' cellspacing='0' width='100%'>
						<tr class="trType">
							<td width='34' height="26" align='center' valign='middle' background="<%=path%>/views/common/images/top_line1.jpg">
							</td>
							<td align='center' height="26" valign='middle' background='<%=path%>/views/common/images/top_line_bg.jpg'>
								<div align='left'>职员维护</div>
							</td>
						</tr>
					</table>
				</ec:parameter>
				<ec:parameter name="radio"   value=""/>
				<ec:parameter name="img_1.x" value=""/>
				<ec:parameter name="img_1.y" value=""/>
				<ec:parameter name="img_0.x" value=""/>
				<ec:parameter name="img_0.y" value=""/>
				<ec:row  onclick="doOnClickEvent('${employee.workNo}','${employee.employeeId}');">
				    <ec:column property="recordId" title=" " width="15px" filterable="false" sortable="false" viewsDenied="xls">
	                   <input type="radio" class="radiobox" id="idx_${employee.employeeId}" name="radio" onClick="selectEmployee('${employee.workNo}','${employee.employeeId}')" />
	                </ec:column>
					<ec:column property="employeeName" title="姓名" />
					<ec:column property="workNo" title="登陆帐号" />
					<ec:column property="organName" title="组织机构" />	
					<ec:column property="roleNum" title="角色数" />
					<ec:column property="EMPstatus" title="职员状态" width="30" viewsDenied="xls">
						<input type="image" onclick="return false;" src="" name="img_${employee.status}" value="${employee.status}"/>				 
					</ec:column>
					<ec:column property="statusInfo" title="职员状态" viewsDenied="html"/>		
			    </ec:row>
			</ec:table>
		<%
		} else {
		%>

			<table class="tableType1" cellpadding="0" cellspacing="0">
				<tr class="trList">
					<TD align="center">
						无符合条件信息
					</TD>
				</tr>
			</table>
		<%
		}
		%>
		<form name="OperForm" id="OperForm" action="" method="POST">
			<input type="hidden" name="OperType" value="" />
			<input type="hidden" name="workNo" value="" />
			<INPUT type="hidden" name="employeeId" value="" />
			<input type="hidden" name="authId" value="<%=authId%>" />
			<input type="hidden" name="size" value="<%=size%>" />
			<input type="hidden" name="fromId" value="<%=fromId%>" />
			<input type="hidden" name="toId" value="" />
		</form>
		<table class="tableType1" cellpadding="0" cellspacing="0">
			<tr>
			</tr>
				<tr class="trList">
					<TD>
						<input type="button" name="bSubmit" value="提交" onclick=doSubmit() class="button1" />
					</TD>
				</tr>
			</table>
	</body>
</html>