BusCard.define('/buscardapp/rela/js/remoteWriteCard.js',function(_buscard,cardParam){ 
try{
	var Me = this;
	var a = arguments[0];
	var b = arguments[1];
	//for compatibility
	var executeRequest = _buscard.executeRequest;
	Me.productId = b.productId;
	Me.cityCode = b.cityCode;
	Me.serviceOfferId = b.serviceOfferId;
	
	
	Me.$("writeCardBtn").onclick = function () {
		//业务校验
		if(!Me.check()){
           return false; 		
		}
	  
	  	var serviceId = Me.$("serviceId").value;
		var workNo = a.$session.workNo;
		var staffName = a.$session.staffName;
		var dealId = a.$session.departmentId;
		var dealName= a.$session.deptName;
		var result = executeRequest("prodOfferSaleAjaxAction","getRemoteInfoIn","");
		var webPath=document.getElementById("webPath").value;
		if(result){
			var arrObj = result.split(",");
			var wideUrl = arrObj[0];
			var squenceId = arrObj[1];
			var param = "SQUENCE=" + squenceId + "&ACC_NBR=" + serviceId + "&STAFF_ID=" + workNo  + "&STAFF_NAME=" + staffName + "&CHANNEL_ID=" + dealId + "&CHANNEL_NAME=" + dealName+"&new_flag=1";
			var localUrl = webPath+ "/custcontact/orderaccept/secondaccept/depchangecard/PopFrame.jsp";
			var aurl = encodeURI(wideUrl+param);
			var str=showModalDialog(localUrl,aurl, "DialogWidth:625px;DialogHeight:600px;status:no;location:no");
		}	  
		//获得远程写卡请求参数
//		var param = executeRequest("prodOfferSaleAjaxAction","getWriteCardParam","serviceId="+Me.$("serviceId").value);
//		var aurl = encodeURI(param);		
		//远程写卡本地页面地址
//		var localUrl = Me.$('webPath').value; + "/custcontact/orderaccept/secondaccept/depchangecard/PopFrame.jsp";		
	    //调用远程写卡页面,进行写卡操作
//		var str  = showModalDialog(localUrl,aurl, "DialogWidth:625px;DialogHeight:600px;status:no;location:no");		
	    //处理远程写卡结果
	    return Me.dealResult(str);
	};
	
	Me.check = function(){
		if(Me.$("serviceId").value==""){
			//alert("请您先选择号码,然后在进行远程写卡操作")
			alert("\u8bf7\u60a8\u5148\u9009\u62e9\u53f7\u7801,\u7136\u540e\u5728\u8fdb\u884c\u8fdc\u7a0b\u5199\u5361\u64cd\u4f5c")
			return false;
		}
		
		if(Me.$("uimId").disabled){
		   	//alert("请您选择非预配号码。")
			alert("\u8bf7\u60a8\u9009\u62e9\u975e\u9884\u914d\u53f7\u7801");
			return false;
		}
		
		return true;
	}
	
	Me.dealResult = function(str){
		 //var str="&SQUENCE=1234&RESULT_CODE=0&RESULT_MESSAGE=success&ACC_NBR=13301230436&IMSI=460030903031515&ICC_SERIAL=1206112251000004&ICCID=460030903031515&IN_OUT_FLAG=0";
		if(typeof str == "undefined"){
			//alert("远程写卡失败！请重新写卡!");
			return;
		}
		
		var tempArray =str.split("&");
		var squence = Me.getValue(tempArray[1]);
		var resultCode = Me.getValue(tempArray[2]);
		var resultMessage = Me.getValue(tempArray[3]);
		var accNbr = Me.getValue(tempArray[4]);
		var imsi = Me.getValue(tempArray[5]);
		var iccSerial = Me.getValue(tempArray[6]);
		var iccid = Me.getValue(tempArray[7]);
		    iccid = iccid.substring(0,iccid.length-1); 
		var inOutFlag = Me.getValue(tempArray[8]);
		
		var tempParam = "&squence="+squence+"&serviceId="+accNbr+"&imsi="+imsi+"&iccSerial="+iccSerial+"&iccid="+iccid+"&inOutFlag="+inOutFlag;
		if(resultCode == "0"){
			Me.$("uimId").value = iccid;
			Me.$("uimId").onblur();
			Me.$("uimId").readOnly=true;
			Me.$("imsi").value = imsi;
			Me.$("iccSerial").value = iccSerial;
			Me.$("writeCardBtn").disabled= true;
			return true;
		}else{
			//alert("远程写卡失败,请重新写卡");
			alert("\u8fdc\u7a0b\u5199\u5361\u5931\u8d25,\u8bf7\u91cd\u65b0\u5199\u5361");
			return false;
		}
	}
	
	Me.getValue=function(tempArray){
		var tempArray1 = tempArray.split("=");
		var result = tempArray1[1];
		return 	result;
	};

}catch(e){
	alert(e.message);
}

});
