BusCard.define('/buscardapp/rela/js/card_cust_create.js',function(_buscard,cardParam){ 
	
//try{
	
var Me = this;
//重构
var custMainInfoHeadID = Me.getSubGroupById("custMainInfoHeadID");
//start
var custBaseHeadID = Me.getSubGroupById("custBaseHeadID");
var custExtHeadID = Me.getSubGroupById("custExtHeadID");
var custChannelHeadID = Me.getSubGroupById("custChannelHeadID");
var custDetailHeadID = Me.getSubGroupById("custDetailHeadID");
//end

var indInfoHeadID = Me.getSubGroupById("indInfoHeadID");
var orgInfoHeadID = Me.getSubGroupById("orgInfoHeadID");
var connectInfoHeadID = Me.getSubGroupById("connectInfoHeadID");
var addressInfoHeadID = Me.getSubGroupById("addressInfoHeadID");
var viaInfoHeadID = Me.getSubGroupById("viaInfoHeadID");

var custMainInfoHeader = document.getElementById("custMainInfoHeader");
//start
var custBaseHeader = document.getElementById("custBaseHeader");
var custExtHeader = document.getElementById("custExtHeader");
var custChannelHeader = document.getElementById("custChannelHeader");
var custDetailHeader = document.getElementById("custDetailHeader");
//end
var indInfoHeader = document.getElementById("indInfoHeader");
var indInfoHeader = document.getElementById("indInfoHeader");
var orgInfoHeader = document.getElementById("orgInfoHeader");
var connectInfoHeader = document.getElementById("connectInfoHeader");
var addressInfoHeader = document.getElementById("addressInfoHeader");
var viaInfoHeader = document.getElementById("viaInfoHeader");
var indTriangle = document.getElementById("indTriangle");
var orgTriangle = document.getElementById("orgTriangle");
var conTriangle = document.getElementById("conTriangle");
var addTriangle = document.getElementById("addTriangle");
var viaTriangle = document.getElementById("viaTriangle");
var custMainInfo = Me.getSubGroupById("custMainInfo");
//start
var custChannel = Me.getSubGroupById("custChannel");
var custDetail = Me.getSubGroupById("custDetail");
//end
var indInfo = Me.getSubGroupById("indInfo");
var orgInfo = Me.getSubGroupById("orgInfo");
var connectInfo = Me.getSubGroupById("connectInfo");
var addressInfo = Me.getSubGroupById("addressInfo");
var viaInfo = Me.getSubGroupById("viaInfo");

custMainInfoHeader.style.textAlign = "right";
custMainInfoHeader.style.color = "blue";
custMainInfoHeader.style.cursor = "pointer";
//start
label_custBaseHeader.style.textAlign = "left";
label_custBaseHeader.style.fontWeight="bold";
label_custExtHeader.style.textAlign = "left";
label_custExtHeader.style.fontWeight="bold";
label_custChannelHeader.style.textAlign = "left";
label_custChannelHeader.style.fontWeight="bold";
label_custDetailHeader.style.textAlign = "left";
label_custDetailHeader.style.fontWeight="bold";
//end
label_indInfoHeader.style.textAlign = "left";
label_indInfoHeader.style.fontWeight="bold";
label_orgInfoHeader.style.textAlign = "left";
label_orgInfoHeader.style.fontWeight="bold";
label_connectInfoHeader.style.textAlign = "left";
label_connectInfoHeader.style.fontWeight="bold";
label_addressInfoHeader.style.textAlign = "left";
label_addressInfoHeader.style.fontWeight="bold";
label_viaInfoHeader.style.textAlign = "left";
label_viaInfoHeader.style.fontWeight="bold";

//start
custExtTriangle.style.textAlign = "right";
custExtTriangle.style.color = "blue";
custChannelTriangle.style.textAlign = "right";
custChannelTriangle.style.color = "blue";
custDetailTriangle.style.textAlign = "right";
custDetailTriangle.style.color = "blue";
//end
indTriangle.style.textAlign = "right";
indTriangle.style.color = "blue";
orgTriangle.style.textAlign = "right";
orgTriangle.style.color = "blue";
conTriangle.style.textAlign = "right";
conTriangle.style.color = "blue";
addTriangle.style.textAlign = "right";
addTriangle.style.color = "blue";
viaTriangle.style.textAlign = "right";
viaTriangle.style.color = "blue";


//头事件
Me.headerEvent = function(header,subGroupId,displayId){
	header.style.cursor = "pointer";
	
	header.onclick = function(){
		Me.toggleSubGroup(Me.getSubGroupById(subGroupId));
		var displayLogo = document.getElementById(displayId).innerHTML;
		if(displayLogo.substring(2)=="△")
			document.getElementById(displayId).innerHTML = "隐藏▽";
		else
			document.getElementById(displayId).innerHTML = "显示△";
		if(subGroupId=='connectInfo')
		{
			if(Me.isHiddenSubGroup(Me.getSubGroupById(subGroupId))){
				Me.hiddenSubGroup(Me.getSubGroupById("linkManInfo"));
			}else
				Me.displaySubGroup(Me.getSubGroupById("linkManInfo"));
		}
		//add by liu-hp 添加关键人信息展现列表 beg
		if(subGroupId=='orgInfo'&&document.getElementById("ifNoShow").value == '1'){
			Me.displaySubGroup(Me.getSubGroupById("grpImpPersonInfo"));
			var grpImpPersonStr = document.getElementById("impPersonTable").value;
			Me.$("subgroup_grpImpPersonInfo").innerHTML =grpImpPersonStr ;
			if(Me.isHiddenSubGroup(Me.getSubGroupById(subGroupId))){
				Me.hiddenSubGroup(Me.getSubGroupById("grpImpPersonInfo"));
			}else
				Me.displaySubGroup(Me.getSubGroupById("grpImpPersonInfo"));
		}
		//add by liu-hp 添加关键人信息展现列表 end
	};
};

Me.headerEvent(custChannelHeadID,"custChannel","custChannelTriangle");
Me.headerEvent(custDetailHeadID,"custDetail","custDetailTriangle");

Me.headerEvent(indInfoHeadID,"indInfo","indTriangle");
Me.headerEvent(orgInfoHeadID,"orgInfo","orgTriangle");
Me.headerEvent(connectInfoHeadID,"connectInfo","conTriangle");
Me.headerEvent(addressInfoHeadID,"addressInfo","addTriangle");
Me.headerEvent(viaInfoHeadID,"viaInfo","viaTriangle");

//隐藏所有组
Me.hiddenAllSubGroup = function(){
	//start
	Me.hiddenSubGroup(custChannel);
	Me.hiddenSubGroup(custDetail);
	//end
	Me.hiddenSubGroup(indInfo);
	Me.hiddenSubGroup(orgInfo);
	Me.hiddenSubGroup(connectInfo);
	Me.hiddenSubGroup(addressInfo);
	Me.hiddenSubGroup(viaInfo);
	Me.hiddenSubGroup(Me.getSubGroupById("linkManInfo"));
};

//更多信息事件
custMainInfoHeader.onclick = function(){
	if(!Me.isHiddenSubGroup(custMainInfo)){
		custMainInfoHeader.innerHTML = "更多信息△";
		Me.hiddenAllSubGroup();
		//start
		Me.hiddenSubGroup(custExtHeadID);
		Me.hiddenSubGroup(custChannelHeadID);
		Me.hiddenSubGroup(custDetailHeadID);
		//end
		Me.hiddenSubGroup(indInfoHeadID);
		Me.hiddenSubGroup(orgInfoHeadID);
		Me.hiddenSubGroup(connectInfoHeadID);
		Me.hiddenSubGroup(addressInfoHeadID);
		Me.hiddenSubGroup(viaInfoHeadID);
		
		Me.hiddenSubGroup(custMainInfo);
	}else{
		custMainInfoHeader.innerHTML = "更多信息▽";
		//start
		//custExtTriangle.innerHTML = "显示△";
		custChannelTriangle.innerHTML = "显示△";
		custDetailTriangle.innerHTML = "显示△";
		//end
		indTriangle.innerHTML = "显示△";
		orgTriangle.innerHTML = "显示△";
		conTriangle.innerHTML = "显示△";
		addTriangle.innerHTML = "显示△";
		viaTriangle.innerHTML = "显示△";
		Me.displaySubGroup(custMainInfo);
		Me.hiddenAllSubGroup();
		var custType = document.getElementById("custType").value;
		if(custType=='1'){
			Me.displaySubGroup(indInfoHeadID);
		}else{
			Me.displaySubGroup(orgInfoHeadID);
		}
		Me.displaySubGroup(connectInfoHeadID);
		Me.displaySubGroup(addressInfoHeadID);
		Me.displaySubGroup(viaInfoHeadID);
		//start
		Me.displaySubGroup(custExtHeadID);
		Me.displaySubGroup(custChannelHeadID);
		Me.displaySubGroup(custDetailHeadID);
		//end
	}
};

Me.linkManStyle = function(contactLabel){
	contactLabel.style.textAlign = "right";
	contactLabel.style.color = "blue";
	contactLabel.href = "#";
};
var addContact = document.getElementById("addContact");
var modifyContact = document.getElementById("modifyContact");
Me.linkManStyle(addContact);
Me.linkManStyle(modifyContact);

//客户标示 事件
document.getElementById("custType").onchange = function(){
	var custType = $("custType").value;
	// 个人客户
	if(custType=='1')
	{
		document.getElementById("indTriangle").innerHTML = "隐藏▽";
		Me.displaySubGroup(indInfoHeadID);
		Me.displaySubGroup(indInfo);
		Me.hiddenSubGroup(orgInfoHeadID);
		Me.hiddenSubGroup(orgInfo);
		document.getElementById("identityKindColl").value = "1";
		document.getElementById("identityKindColl").disabled = false;
		document.getElementById("label_certificateMature").innerHTML="证件到期：";
	}
	// 单位客户
	else if(custType=='2')
	{
		document.getElementById("orgTriangle").innerHTML = "隐藏▽";
		Me.hiddenSubGroup(indInfoHeadID);
		Me.hiddenSubGroup(indInfo);
		Me.displaySubGroup(orgInfoHeadID);
		Me.displaySubGroup(orgInfo);
		document.getElementById("identityKindColl").value = "6";
		//document.getElementById("identityKindColl").disabled = true;
		document.getElementById("label_certificateMature").innerHTML="<span class='formRequested'>*</span>证件到期：";
	}
};

document.getElementById("custBrand").onchange = function(){
	CustManager.create.getCustSubBrand();
};
document.getElementById("strateGroup").onchange = function(){
	CustManager.create.getStrateDivision();
};
document.getElementById("industryType").onchange = function(){
	CustManager.create.getBigIndustryType();
};
document.getElementById("bigIndustryType").onchange = function(){
	CustManager.create.getSmallIndustryType();
};
document.getElementById("smallIndustryType").onchange = function(){
	CustManager.create.getSaleOrganise();
};

document.getElementById("manageType").onchange = function(){
	CustManager.create.getGroupKind();
};

document.getElementById("linkPhone").onblur = function(){
	Me.vilidateTel(document.getElementById("linkPhone"),'【联系电话】');
};
document.getElementById("linkPhoneDefault").onblur = function(){
	Me.vilidateTel(document.getElementById("linkPhoneDefault"),'【联系电话】');
};
document.getElementById("corporationPhone").onblur = function(){
	Me.vilidateTel(document.getElementById("corporationPhone"),'【单位关键人电话】');
};
document.getElementById("artificialPhone").onblur = function(){
	Me.vilidateTel(document.getElementById("artificialPhone"),'【法人代表电话】');
};
document.getElementById("developerPhone").onblur = function(){
	Me.vilidateTel(document.getElementById("developerPhone"),'【单位发展人电话】');
};
document.getElementById("homePhone").onblur = function(){
	Me.vilidateTel(document.getElementById("homePhone"),'【住宅电话】');
};
document.getElementById("fax").onblur = function(){
	Me.vilidateTel(document.getElementById("fax"),'【传真号码】');
};
document.getElementById("email").onblur = function(){
	Me.vilidateEmail(document.getElementById("email"),'【Email地址】');
};

document.getElementById("identityKindColl").onchange = function(){
	Me.checkIden(document.getElementById("identityKindColl"));
	Me.indCommLience(document.getElementById("identityKindColl"));
};
document.getElementById("identityCode").onchange = function(){
	var identityKind = document.getElementById("identityKindColl");
	var identityCode = document.getElementById("identityCode");
	var custBirthday = document.getElementById("custBirthday");
	
	if(identityCode.readOnly || identityCode.value=='')
		return;
	var identityCodeTemp = identityCode.value;
	var gender = document.getElementById("gender");
	if(checkid_iden_new('【证件号码】',identityKind,identityCode)){
		if(identityKind.value=='1' ){//身份证18位  校验最后一位是否合法，公共方法中没有校验
			var identityCodeValue = identityCode.value;
			var lastChar = identityCodeValue.substring(identityCodeValue.length-1).toUpperCase();
			if(!/\d|x|X/.test(lastChar)){
				//alert('【证件号码】输入错误！');
				orderaccept.common.dialog.MessageBox.alert({busiCode:"08510139"});
				//identityCode.value = '';
				identityCode.value = identityCodeTemp;
				identityCode.focus();
				return;
			}
		}		
		get_birthday(identityKind,identityCode,custBirthday);
		identity_generate_sex(identityKind,identityCode,gender)
	}else{
		identityCode.value = identityCodeTemp;
	}
	Me.checkIden(identityCode);
};
document.getElementById("identityCode").onfocus = function(){
	setlength(document.getElementById("identityKindColl"),document.getElementById("identityCode"));
};
document.getElementById("identityCode").onkeypress = function(){
	return on_key_id_check(document.getElementById("identityKindColl"),document.getElementById("identityCode"),document.getElementById("identityCode"));
};
document.getElementById("viaPersonCertNumber").onblur = function(){
	checkid_iden_new('证件号码',document.getElementById("viaPersonCertKind"),document.getElementById("viaPersonCertNumber"));
};
document.getElementById("viaPersonCertNumber").onfocus = function(){
	setlength(document.getElementById("viaPersonCertKind"),document.getElementById("viaPersonCertNumber"));
};
document.getElementById("viaPersonCertNumber").onkeypress = function(){
	return on_key_id_check(document.getElementById("viaPersonCertKind"),document.getElementById("viaPersonCertNumber"));
};

document.getElementById("identityAddress").onblur = function(){
	Me.copyValue(document.getElementById("identityAddress"),document.getElementById("commuAddress"));
};
document.getElementById("custName").onblur = function(){
	Me.copyValue(document.getElementById("custName"),document.getElementById("linkManNameDefault"));

};

document.getElementById("commuAddress").onkeydown = function(){
	if(event.keyCode == 13){
		return false;
	}
};

document.getElementById("identityAddress").onkeydown = function(){
	if(event.keyCode == 13){
		return false;
	}
};


document.getElementById("passwd").onblur = function(){
	var passwd = document.getElementById("passwd");
	if(passwd.value!='')
	{
		var len = passwd.value.length;
		if(len!=6)
		{
			//alert("【密码】长度只能为6位！");
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08510140"});
			passwd.value = "";
			passwd.focus();
			return;
		}
		var passValidate = document.getElementById("passValidate");
		if(passValidate.value)
		{
			var result = check_password(passwd,passValidate);
			if(!result)
			{
				passValidate.value = '';
				passValidate.select();
			}
		}
	}
};
document.getElementById("passValidate").onblur = function(){
	var passValidate = document.getElementById("passValidate");
	if(passValidate.value!='')
	{
		var len = passValidate.value.length;
		if(len!=6)
		{
			//alert("【密码】长度只能为6位！");
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08510140"});
			passValidate.value = "";
			passValidate.focus();
			return;
		}
		
		
		var result = check_password(document.getElementById("passwd"),passValidate);
		if(!result)
		{
			passValidate.value = '';
		}
	}
};
document.getElementById("certificateMature").onblur = function(){
    // 证件到期日期格式校验
    if(!isdate(document.getElementById("certificateMature"),'【证件到期日期】')){
    	return false;
    }
    // 单位客户校验
    if(document.getElementById("custType").value == '2'){
    	var t1 = document.getElementById("certificateMature").value;
    	var t2 = Me.formatDate(new Date());
    	var l1 = "【证件到期】";
    	var l2 = "【当前时间】";
    	
    	if(t1==''||t2==''){
			return true;
		}
		var va1 = formatDate(t1);
		var va2 = formatDate(t2);
		if((va2.replace("-","").replace("-",""))/1>(va1.replace("-","").replace("-",""))/1){
			// 清空文本框
			document.getElementById("certificateMature").value='';
			if(typeof(window.orderaccept)!= 'undefined'){
		  		orderaccept.common.dialog.MessageBox.alert({busiCode:"08510160",infoList:[l1,l2]});
		    }else{
		    	alert(l1+"不能早于"+l2+"！");
		    }
			return false;		
		}
    }
};
document.getElementById("certificateMature").onkeypress = function(){
	if(document.getElementById("certificateMature").value!=''){
		return !Me.check_date(); 
	}
};
document.getElementById("custBirthday").onblur = function(){
	Me.Date_OnBlur(document.getElementById("custBirthday"),'【出生日期】');
};
document.getElementById("custBirthday").onkeypress = function(){
	if(document.getElementById("custBirthday").value!=''){
		return !Me.check_date(); 
	}
};
document.getElementById("homePostalcode").onblur = function(){
	if(!isNumber(document.getElementById("homePostalcode"),'【家庭邮编】'))
	{
		document.getElementById("homePostalcode").value = '';
		document.getElementById("homePostalcode").focus();
		return;
	}
	var homePostalcode = document.getElementById("homePostalcode").value;
	if(homePostalcode&&homePostalcode.length!=6)
	{
		if(homePostalcode.length>6)
			document.getElementById("homePostalcode").value = homePostalcode.substring(0,6);
		else{
			//alert("【家庭邮编】长度应该是6位，请重新输入！");
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08510141"});
			document.getElementById("homePostalcode").value = '';
			document.getElementById("homePostalcode").focus();
			return;
		}
	}
};
document.getElementById("commuPostalcode").onblur = function(){
	if(!isNumber(document.getElementById("commuPostalcode"),'【通信邮编】'))
	{
		document.getElementById("commuPostalcode").value = '';
		document.getElementById("commuPostalcode").focus();
		return;
	}
	var commuPostalcode = document.getElementById("commuPostalcode").value;
	if(commuPostalcode&&commuPostalcode.length!=6)
	{
		if(commuPostalcode.length>6)
			document.getElementById("commuPostalcode").value = commuPostalcode.substring(0,6);
		else{
			//alert("【通信邮编】长度应该是6位，请重新输入！");
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08510142"});
			document.getElementById("commuPostalcode").value = '';
			document.getElementById("commuPostalcode").focus();
			return;
		}
	}
};

//日期格式化
Me.formatDate  = function(obj){
	var year = obj.getFullYear();
	var month = obj.getMonth() + 1;
	var date = obj.getDate();
	return year + "-" + month + "-" + date; 
}

//电话验证֤
Me.vilidateTel = function(obj,str){
	if(!isTelString(obj,str)){
		obj.value='';
		obj.focus();
	}
};
//Email验证֤
Me.vilidateEmail = function(obj,str){
	if(!nas_email_check_sirp(str,obj,'')){
		obj.value='';
		obj.focus();
	}
};
//复制属性值
Me.copyValue = function(obj,obj1){
	//if(obj1.value == ""){
		obj1.value = obj.value;
	//}
};
/*校验证件号码是否在黑名单*/
Me.checkIden = function(obj){
	
	var IdentityKind = document.getElementById('identityKindColl').value;
	var identityCode = document.getElementById('identityCode').value;
	
	if(IdentityKind=="" || identityCode==""){
		return;
	}
	
	//校验是否输入的证件类型和号码已存在，已存在的用户档案是否可以继续新建
	var paramters ="QueryValue="+identityCode;
		paramters = paramters+"&QueryKind="+IdentityKind;
	var	result = executeRequest("custAcceptAjaxAction","doCheckIdentityIfExist",paramters);
	if(result.length>0){
		if(!confirm(result))
		{
			$('custBirthday').value='';
			$('identityCode').value='';
			$('identityCode').focus();
			return false;
		}
	}
	//检测已存在的15位身份证和18位身份证比较
	/**result = executeRequest("custAcceptAjaxAction","doCheckIdentityNumber",paramters);
	if(result.length>0){
		//alert(result);
		orderaccept.common.dialog.MessageBox.alert({busiCode:"08510143",infoList:[result]});
		$('custBirthday').value='';
		$('identityCode').value='';
		$('identityCode').focus();
		return false;
	}*/
	
	//黑名单校验需要调用客户维系接口
	var paramtersIfBlackCust = "&queryValue="+identityCode;	
	paramtersIfBlackCust = paramtersIfBlackCust+"&queryIdentityKind="+IdentityKind;	
	var resultIfBlackCust;
   	resultIfBlackCust = executeRequest("custAcceptAjaxAction","doCheckIfBlackCust",paramtersIfBlackCust);
	if(resultIfBlackCust.length>0){
		//alert(resultIfBlackCust);
		orderaccept.common.dialog.MessageBox.alert({busiCode:"08510143",infoList:[resultIfBlackCust]});
		$('custBirthday').value='';
		$('identityCode').value='';
		$('identityCode').focus();
		return false;
	}
};

//证件类型为工商管理执照
Me.indCommLience = function(obj)
{
	if($('strateGroup'))
		{
			var param = "certType="+obj.value;
			//1000政企客户、1100公众客户、9900其他客户、-1不区分' 
			var result = executeRequest("custAcceptAjaxAction","getCustTypeByCertType",param);
			
			if(result=="1000" && $('strateGroup').value !='1000')
			{
				$('strateGroup').value='1000';
				//级联改变相应的值
				CustManager.create.getStrateDivision();
				
			}else if(result == "1100" && $('strateGroup').value !='1100')
			{
				$('strateGroup').value='11';
				//级联改变相应的值
				CustManager.create.getStrateDivision();
			}else if(result == "9900" && $('strateGroup').value !='9900')
			{
				$('strateGroup').value='9900';
				//级联改变相应的值
				CustManager.create.getStrateDivision();
			}
		}
};

/**
*描述:出生日期onblur事件,判断是否为yyyy-mm-dd格式
 */
Me.Date_OnBlur = function(obj,message)
{
	isdate(obj,message);
};

/**
 * 描述:出生日期onkeyup事件
 */
Me.check_date = function()
{
	var mm=document.all.custBirthday.value; 
    var month1=new Array(1,3,5,7,8);
    var month2=new Array(4,6,9);          
    var StartTime = document.all.custBirthday.value+"";
    var ss=event.keyCode;
    if(StartTime.length==4  || (StartTime.length==7 && StartTime.charAt(4)=="-" && StartTime.indexOf("-")==4) )
	{   /*日期年*/
        document.all.custBirthday.value=StartTime+"-";
	}  
    if(StartTime.length==6 && StartTime.charAt(4)=="-")
    { /*日期月*/
        if(StartTime.substr(5,1)>1)
         {
         	 document.all.custBirthday.value=StartTime.substr(0,5)+"0"+StartTime.substr(5,1)+"-";
         }
    } 
    if (StartTime.length==9 && StartTime.charAt(4)=="-" && StartTime.charAt(7)=="-")
    {/*日期日*/
		var x=StartTime.substr(8,1);
		var y=StartTime.substring(0,8);
		x=parseInt(x);
		if (x>3)
		{
			document.all.custBirthday.value=y+"0"+x;
		}
	}
	if (ss==8)
	{
		if (StartTime.length==4)
        {
            var x=StartTime.substring(0,3);
            document.all.custBirthday.value=x;
        }
        if (StartTime.length==7)
        {
      	     var x=StartTime.substring(0,6);
      	     document.all.custBirthday.value=x;
        }
    }
};


window.initPage();
	


//this.enableAllSubGroupHeaders();

});
