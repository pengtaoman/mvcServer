<%
/* JSP�����Ҫ������Ϣ
**************************************************************
* ������	: ����Աά��ҳ��-��Ա��Ҫ��Ϣ�б�
* ��������: 
* ����		: zhaof@neusoft.com
* ģ��		: Ȩ��
* ����		: Ȩ��ϵͳ-ְԱά��-ת��Ȩ��
* ��ע		: 
* ------------------------------------------------------------
* �޸���ʷ
* ���		����		�޸���			�޸�ԭ��
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
	<title>Ȩ��ת��</title>
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
	 * ҳ���ʼ��
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
					e.title='����';
				}else if(eName == 1){
					e.src='<%=path%>/common/images/icon/icon_wljz1.gif';
					e.title='ͣ��';
				}
			}
		}	
		
		eccn.doPrep=false;
		eccn.ajaxSubmit=false;
		eccn.init();
	}
	/**
	 * �Խ�Ҫ�ύ�ı굥��ֵ
	 */
	function selectEmployee(workNo, employeeId)
	{
		var authId = OperForm.authId.value;
		OperForm.workNo.value = workNo;
		OperForm.employeeId.value = employeeId;
		OperForm.toId.value = employeeId;

	}
	/*
	* �ύ
	*/
	function doSubmit(){
		var toId = OperForm.toId.value;
		if(toId == null || toId == ""){
			alert("��ѡ��ת������Ա");
			return;
		}
		OperForm.action = "<%=path%>/EmployeeQueryAction.do";
		OperForm.OperType.value = "doDeliver";
		OperForm.submit();
	}

   
   // begin add by jialixin
   /**
    *����һ��ʱ��ѡ�е�ѡ��ť
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
								<div align='left'>ְԱά��</div>
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
					<ec:column property="employeeName" title="����" />
					<ec:column property="workNo" title="��½�ʺ�" />
					<ec:column property="organName" title="��֯����" />	
					<ec:column property="roleNum" title="��ɫ��" />
					<ec:column property="EMPstatus" title="ְԱ״̬" width="30" viewsDenied="xls">
						<input type="image" onclick="return false;" src="" name="img_${employee.status}" value="${employee.status}"/>				 
					</ec:column>
					<ec:column property="statusInfo" title="ְԱ״̬" viewsDenied="html"/>		
			    </ec:row>
			</ec:table>
		<%
		} else {
		%>

			<table class="tableType1" cellpadding="0" cellspacing="0">
				<tr class="trList">
					<TD align="center">
						�޷���������Ϣ
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
						<input type="button" name="bSubmit" value="�ύ" onclick=doSubmit() class="button1" />
					</TD>
				</tr>
			</table>
	</body>
</html>