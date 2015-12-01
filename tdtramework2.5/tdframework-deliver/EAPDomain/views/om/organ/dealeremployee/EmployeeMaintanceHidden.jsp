<%@ page contentType="text/html; charset=gb2312" %>
<%@ page language="java" import="java.lang.*,java.util.*" %>
<%@ page import="com.neusoft.tdframework.common.util.NullProcessUtil"%>
<%
String path = request.getContextPath();
String message = (String)request.getAttribute("Message");
String operFlag =(String)request.getAttribute("OperFlag");
String operType = (String)request.getAttribute("OperType");
String oldOrganId = (String)NullProcessUtil.nvlToString(request.getAttribute("OldOrganId"),"");
String oldDutyId = (String)NullProcessUtil.nvlToString(request.getAttribute("OldDutyId"),"");
String areaId = (String)NullProcessUtil.nvlToString(request.getAttribute("AreaId"),"");
String employeeId = (String)NullProcessUtil.nvlToString(request.getAttribute("EmployeeId"),"");
message = NullProcessUtil.nvlToString(message,"");
if("".intern() != message.intern()){
	message = message.replaceAll(" ","");
	message = message.replaceAll("\"","'");
}
%>

<html>
  <head>
    <title></title>
  </head>
  <script>
  function initValues(){
	    parent.employeemaintance.myform.EmployeeId.value='';
	    parent.employeemaintance.myform.BusDutyId.value='';
	    parent.employeemaintance.myform.EmployeeName.value='';
		parent.employeemaintance.myform.DutyId.value='';
	    parent.employeemaintance.myform.OrganId.value='';
	    parent.employeemaintance.myform.ParentEmployeeId.value='';
	    parent.employeemaintance.myform.WorkNo.value='';
	    parent.employeemaintance.myform.WorkPwd.value='';
	    parent.employeemaintance.myform.WorkPwdConfirm.value='';
	    parent.employeemaintance.myform.InactiveDate.value='';
	    parent.employeemaintance.myform.InactivePwdDate.value='';
	    parent.employeemaintance.myform.InnerEmployee.value='';
	    parent.employeemaintance.myform.EducateLevel.value='';
	    parent.employeemaintance.myform.WorkAddress.value='';
	    parent.employeemaintance.myform.WorkTelephone.value='';
	    parent.employeemaintance.myform.Email.value='';
	    parent.employeemaintance.myform.HoneTelephone.value='';
	    parent.employeemaintance.myform.Mobile.value='';
	    parent.employeemaintance.myform.Fax.value='';
	    parent.employeemaintance.myform.HomeAddress.value='';
	    parent.employeemaintance.myform.Birthday.value='';
	    parent.employeemaintance.myform.Gender.value='';
	    parent.employeemaintance.myform.Income.value='';
	    parent.employeemaintance.myform.MarriageStatus.value='';
	    parent.employeemaintance.myform.HiredDate.value='';
	    parent.employeemaintance.myform.ContractDate.value='';
	    parent.employeemaintance.myform.ResignedDate.value='';
	    parent.employeemaintance.myform.UpdateDate.value='';
	    parent.employeemaintance.myform.LoginIp.value='';
	    parent.employeemaintance.myform.Mac.value='';
}

function init(){
//增加操作

	if( document.myform.OperType.value == 'add'){
		if (document.myform.OperFlag.value == '1'){
			window.opener.parent.employeelist.location.reload();
		}
	    window.close();
	}
//修改操作
	if(document.myform.OperFlag.value == '1'&& document.myform.OperType.value == 'modify'){
		window.opener.parent.employeelist.location.reload();
		window.close();

	}
//删除操作
	if(document.myform.OperFlag.value == '1'&& document.myform.OperType.value == 'delete'){
		
		
		OrganKind=parent.organdisplayhidden.document.myform.CurrentSelectOrganKind.value;
		OrganId=parent.organdisplayhidden.document.myform.CurrentSelectOrganId.value;
		DutyId=parent.organdisplayhidden.document.myform.CurrentSelectDutyId.value;
		BelongArea=parent.organdisplayhidden.document.myform.CurrentSelectBelongArea.value;
		
        if(OrganKind =="area"){
            parent.employeelist.location.href = "EmployeeQueryAction.do?"+"&OrganKind='area'"+"&BelongArea="+BelongArea+"&AreaId= " + OrganId + "&OperType=employeeList";
        }else if(OrganKind =="organ"){
            parent.employeelist.location.href = "EmployeeQueryAction.do?"+"&OrganKind='organ'"+"&BelongArea="+BelongArea+"&OrganId=" + OrganId + "&OperType=employeeList";
        }
        else{
            parent.employeelist.location.href = "EmployeeQueryAction.do?"+"&OrganKind='duty'"+"&BelongArea="+BelongArea+"&OrganId=" + OrganId + "&DutyId= " +DutyId + "&OperType=employeeList";
        }
	    parent.mainFrameset.cols="27%,*,0,0,0,0";
	}
	if(document.myform.OperFlag.value != '1'&& document.myform.OperType.value == 'delete'){
		
		
		OrganKind=parent.organdisplayhidden.document.myform.CurrentSelectOrganKind.value;
		OrganId=parent.organdisplayhidden.document.myform.CurrentSelectOrganId.value;
		DutyId=parent.organdisplayhidden.document.myform.CurrentSelectDutyId.value;
		BelongArea=parent.organdisplayhidden.document.myform.CurrentSelectBelongArea.value;
		
        if(OrganKind =="area"){
            parent.employeelist.location.href = "EmployeeQueryAction.do?"+"&OrganKind='area'"+"&BelongArea="+BelongArea+"&AreaId= " + OrganId + "&OperType=employeeList";
        }else if(OrganKind =="organ"){
            parent.employeelist.location.href = "EmployeeQueryAction.do?"+"&OrganKind='organ'"+"&BelongArea="+BelongArea+"&OrganId=" + OrganId + "&OperType=employeeList";
        }
        else{
            parent.employeelist.location.href = "EmployeeQueryAction.do?"+"&OrganKind='duty'"+"&BelongArea="+BelongArea+"&OrganId=" + OrganId + "&DutyId= " +DutyId + "&OperType=employeeList";
        }
	    parent.mainFrameset.cols="27%,*,0,0,0,0";
	}
//恢复密码操作
	if(document.myform.OperFlag.value == '1'&& document.myform.OperType.value == 'renewPwd'){
		OrganKind=parent.organdisplayhidden.document.myform.CurrentSelectOrganKind.value;
		OrganId=parent.organdisplayhidden.document.myform.CurrentSelectOrganId.value;
		DutyId=parent.organdisplayhidden.document.myform.CurrentSelectDutyId.value;
		BelongArea=parent.organdisplayhidden.document.myform.CurrentSelectBelongArea.value;
        if(OrganKind =="area"){
            parent.employeelist.location.href = "EmployeeQueryAction.do?"+"&OrganKind='area'"+"&BelongArea="+BelongArea+"&AreaId= " + OrganId + "&OperType=employeeList";
        }else if(OrganKind =="organ"){
            parent.employeelist.location.href = "EmployeeQueryAction.do?"+"&OrganKind='organ'"+"&BelongArea="+BelongArea+"&OrganId=" + OrganId + "&OperType=employeeList";
        }
        else{
            parent.employeelist.location.href = "EmployeeQueryAction.do?"+"&OrganKind='duty'"+"&BelongArea="+BelongArea+"&OrganId=" + OrganId + "&DutyId= " +DutyId + "&OperType=employeeList";
        }
	    parent.mainFrameset.cols="27%,*,0,0,0,0";
	}
	if(document.myform.OperFlag.value != '1'&& document.myform.OperType.value == 'renewPwd'){
		OrganKind=parent.organdisplayhidden.document.myform.CurrentSelectOrganKind.value;
		OrganId=parent.organdisplayhidden.document.myform.CurrentSelectOrganId.value;
		DutyId=parent.organdisplayhidden.document.myform.CurrentSelectDutyId.value;
		BelongArea=parent.organdisplayhidden.document.myform.CurrentSelectBelongArea.value;
        if(OrganKind =="area"){
            parent.employeelist.location.href = "EmployeeQueryAction.do?"+"&OrganKind='area'"+"&BelongArea="+BelongArea+"&AreaId= " + OrganId + "&OperType=employeeList";
        }else if(OrganKind =="organ"){
            parent.employeelist.location.href = "EmployeeQueryAction.do?"+"&OrganKind='organ'"+"&BelongArea="+BelongArea+"&OrganId=" + OrganId + "&OperType=employeeList";
        }
        else{
            parent.employeelist.location.href = "EmployeeQueryAction.do?"+"&OrganKind='duty'"+"&BelongArea="+BelongArea+"&OrganId=" + OrganId + "&DutyId= " +DutyId + "&OperType=employeeList";
        }
	    parent.mainFrameset.cols="27%,*,0,0,0,0";
	}
//赋权操作
	if( document.myform.OperType.value == 'makeDuty' && document.myform.OperFlag.value == '1'){
		window.close();
	}
	if (document.myform.errorInfo.value != ''){
		alert(document.myform.errorInfo.value);
	}
	window.close();
}
</script>
  <body onload="init()">
  <form name="myform">
    <input type="hidden" name="EmployeeId"/>
		<input type="hidden" name="BusDutyId"/>
		<input type="hidden" name="EmployeeName"/>
		<input type="hidden" name="DutyId"/>
		<input type="hidden" name="AreaId"/>
		<input type="hidden" name="OrganId"/>
		<input type="hidden" name="ParentEmployeeId"/>
		<input type="hidden" name="WorkNo"/>
		<input type="hidden" name="WorkPwd"/>
		<input type="hidden" name="InactiveDate"/>
		<input type="hidden" name="InactivePwdDate"/>
		<input type="hidden" name="InnerEmployee"/>
		<input type="hidden" name="EducateLevel"/>
		<input type="hidden" name="WorkAddress"/>
		<input type="hidden" name="WorkTelephone"/>
		<input type="hidden" name="Email"/>
		<input type="hidden" name="HoneTelephone"/>
		<input type="hidden" name="Mobile"/>
		<input type="hidden" name="Fax"/>
		<input type="hidden" name="HomeAddress"/>
		<input type="hidden" name="Birthday"/>
		<input type="hidden" name="Gender"/>
		<input type="hidden" name="Income"/>
		<input type="hidden" name="MarriageStatus"/>
		<input type="hidden" name="HiredDate"/>
		<input type="hidden" name="ContractDate"/>
		<input type="hidden" name="ResignedDate"/>
		<input type="hidden" name="UpdateDate"/>
		<input type="hidden" name="LoginIp"/>
		<input type="hidden" name="Mac"/>
		<!--修改时需要用这两个变量来记录未修改之前的值-->
		<input type="hidden" name="OldOrganId" value="<%=oldOrganId%>"/>
		<input type="hidden" name="OldDutyId"value="<%=oldDutyId%>" />
		<input type="hidden" name="OldAreaId" value="<%=areaId%>" />
		<input type="hidden" name="OldEmployeeId" value="<%=employeeId%>" />
		<!--页面操作-->
		<input type="hidden" name="errorInfo" value="<%=message%>"/>
		<input type="hidden" name="OperType" value="<%=operType%>"/>
		<input type="hidden" name="OperFlag" value="<%=operFlag%>"/>
  </form>
  </body>
</html>
