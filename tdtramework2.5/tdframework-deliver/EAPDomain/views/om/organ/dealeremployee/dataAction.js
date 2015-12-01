//定义数据变量
var strEmployeeId,strBusDutyId,strEmployeeName,strDutyId,strAreaId,strOrganId, strParentEmployee;
var strWorkNo , strWorkPwd, strInactiveDate, strInactivePwdDate, strInnerEmployee, strEducateLevel;
var strWorkAddress, strWorkTelephone, strEmail, strHoneTelephone, strMobile, strFax, strHomeAddress;
var strBirthday, strGender, strIncome, strMarriageStatus;
var strHiredDate, strContractDate, strResignedDate, strUpdateDate, strLoginIp, strMac;
//获取表单变量
function getValues(){
	//获取的变量都采用nas_trim函数去处空格
	    strEmployeeId=nas_trim(myform.EmployeeId.value);
	    strBusDutyId=nas_trim(myform.BusDutyId.value);
	    strEmployeeName=nas_trim(myform.EmployeeName.value);
	    strDutyId=nas_trim(myform.DutyId.value);
	    strAreaId=nas_trim(myform.AreaId.value);
	    strOrganId=nas_trim(myform.OrganId.value);
	    strParentEmployee=nas_trim(myform.ParentEmployeeId.value);
	    strWorkNo=nas_trim(myform.WorkNo.value);
	    strWorkPwd=nas_trim(myform.WorkPwd.value);
	    strInactiveDate=nas_trim(myform.InactiveDate.value);
	    strInactivePwdDate=nas_trim(myform.InactivePwdDate.value);
	    strInnerEmployee=nas_trim(myform.InnerEmployee.value);
	    strEducateLevel=nas_trim(myform.EducateLevel.value);
	    strWorkAddress=nas_trim(myform.WorkAddress.value);
	    strWorkTelephone=nas_trim(myform.WorkTelephone.value);
	    strEmail=nas_trim(myform.Email.value);
	    strHoneTelephone=nas_trim(myform.HoneTelephone.value);
	    strMobile=nas_trim(myform.Mobile.value);
	    strFax=nas_trim(myform.Fax.value);
	    strHomeAddress=nas_trim(myform.HomeAddress.value);
	    strBirthday=nas_trim(myform.Birthday.value);
	    strGender=nas_trim(myform.Gender.value);
	    strIncome=nas_trim(myform.Income.value);
	    strMarriageStatus=nas_trim(myform.MarriageStatus.value);
	    strHiredDate=nas_trim(myform.HiredDate.value);
	    strContractDate=nas_trim(myform.ContractDate.value);
	    strResignedDate=nas_trim(myform.ResignedDate.value);
	    strUpdateDate=nas_trim(myform.UpdateDate.value);
	    strLoginIp=nas_trim(myform.LoginIp.value);
	    strMac=nas_trim(myform.Mac.value);
}
//将表单的值写入隐藏页面
function writeValues(){
	    parent.employeemaintancehidden.myform.EmployeeId.value=strEmployeeId;
	    parent.employeemaintancehidden.myform.BusDutyId.value=strBusDutyId;
	    parent.employeemaintancehidden.myform.EmployeeName.value=strEmployeeName;
		parent.employeemaintancehidden.myform.DutyId.value=strDutyId;
	    parent.employeemaintancehidden.myform.AreaId.value=strAreaId;
	    parent.employeemaintancehidden.myform.OrganId.value=strOrganId;
	    parent.employeemaintancehidden.myform.ParentEmployeeId.value=strParentEmployee;
	    parent.employeemaintancehidden.myform.WorkNo.value=strWorkNo;
	    parent.employeemaintancehidden.myform.WorkPwd.value=strWorkPwd;
	    parent.employeemaintancehidden.myform.InactiveDate.value=strInactiveDate;
	    parent.employeemaintancehidden.myform.InactivePwdDate.value=strInactivePwdDate;
	    parent.employeemaintancehidden.myform.InnerEmployee.value=strInnerEmployee;
	    parent.employeemaintancehidden.myform.EducateLevel.value=strEducateLevel;
	    parent.employeemaintancehidden.myform.WorkAddress.value=strWorkAddress;
	    parent.employeemaintancehidden.myform.WorkTelephone.value=strWorkTelephone;
	    parent.employeemaintancehidden.myform.Email.value=strEmail;
	    parent.employeemaintancehidden.myform.HoneTelephone.value=strHoneTelephone;
	    parent.employeemaintancehidden.myform.Mobile.value=strMobile;
	    parent.employeemaintancehidden.myform.Fax.value=strFax;
	    parent.employeemaintancehidden.myform.HomeAddress.value=strHomeAddress;
	    parent.employeemaintancehidden.myform.Birthday.value=strBirthday;
	    parent.employeemaintancehidden.myform.Gender.value=strGender;
	    parent.employeemaintancehidden.myform.Income.value=strIncome;
	    parent.employeemaintancehidden.myform.MarriageStatus.value=strMarriageStatus;
	    parent.employeemaintancehidden.myform.HiredDate.value=strHiredDate;
	    parent.employeemaintancehidden.myform.ContractDate.value=strContractDate;
	    parent.employeemaintancehidden.myform.ResignedDate.value=strResignedDate;
	    parent.employeemaintancehidden.myform.UpdateDate.value=strUpdateDate;
	    parent.employeemaintancehidden.myform.LoginIp.value=strLoginIp;
	    parent.employeemaintancehidden.myform.Mac.value=strMac;
}
