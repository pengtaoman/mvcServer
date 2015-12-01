BusCard.define('/buscardapp/rela/js/card_107_10006.js',function(_buscard,cardParam){ 
	var Me = this;
	var a = arguments[0];
	var b = arguments[1];
	var c = b.serviceRelation.userId;
	var e = b.productId;
	var f = b.serviceOfferId;
	//for compatibility
	var executeRequest = _buscard.executeRequest;
	Me.getOldCardNo = function () {
		var parameter = "userId=" + c;
		var resultJsonStr = executeRequest("secondAcceptAjaxAction", "getOldSimCard", parameter);
		var cardId = "-1";
		var resId = "-1";
		try {
			var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
			if (jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1") {
				cardId = jsonResultObj.cardId;
				resId = jsonResultObj.resId;
			}
		}catch (e) {
			alert("\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u53d6\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7\u539f\u951f\u65a4\u62f7\u4e3a\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u6377\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7");
			return false;
		}
		Me.$("oldCardNum").innerHTML = cardId;
		Me.$("oldUimResInstId").value = resId;
	};
	Me.getOldCardNo();
	
//ʡ�ʻ�����	
	
	//a)Զ��д����ť��onclick�¼�������Զ��д��ϵͳ�ӿڣ�������ֵ������JAVA�����¼д����Ϣ
	Me.$("remoteBtn").onchange = function(){
	
	}
	
	//b)	Ԥ��ؼ������Ԥ�㹦��
	
	//c)	�ύ�ؼ�����ɶ����ύ������д����Ϣ
		
	//d)	�ɷѿؼ������ӽɷ�ҳ����ɽɷѹ���
	
	
	
	
	
	
	
	Me.checkUim = function () {
	var E = Me.$("newCardNum");
	var A = Me.$("newCardNum").value;
	if (!A) {
		return true;
	}
	var cityCodeTemp = b.cityCode;
	if(!cityCodeTemp){
		cityCodeTemp = b.serviceRelation.cityCode;
	}
	var C = "uimId=" + A + "&serviceOfferId=" + f + "&productId=" + e + "&cityCode=" + cityCodeTemp;
	var D = executeRequest("prodOfferSaleAjaxAction", "checkUimResource", C);
	var B = executeAjaxResult(D);
	if (B == false) {
		Me.$("newCardNum").value="";
		return;
	}
	var resultArray = B.split(",");
	if(resultArray&&resultArray.length>0){
		Me.$("newUimResInstId").value = resultArray[0];
		Me.setDisplayNomal("imis");
		Me.setDisplayNomal("newCardType");
		Me.setDisplayNomal("newCardCapacity");
		Me.$("imis").innerHTML = resultArray[1];
		Me.$("newCardType").innerHTML = resultArray[2];
		Me.$("newCardCapacity").innerHTML = resultArray[3];
	}
	
	};
	//ҳ��չ�ֿ���
	Me.doDisplayMode = function(obj){
		if(obj.value == 3){
			Me.setDisplayNomal("changecardType");
			Me.setDisplayNomal("acceptReason");
			Me.setDisplayNomal("changecardMethod");
			Me.setDisplayNone("oldCardNum");
			Me.setDisplayNone("remoteBtn");
			Me.setDisplayNone("newCardNum");
			Me.setDisplayNone("imis");
			Me.setDisplayNone("newCardType");
			Me.setDisplayNone("newCardCapacity");
			Me.setDisplayNomal("oldVoiceCard");
			Me.setDisplayNomal("newVoiceCard");
			Me.setDisplayNomal("voiceImis");
			Me.setDisplayNomal("newVoiceCardType");
			Me.setDisplayNomal("newVoiceCardCapacity");
			Me.setDisplayNomal("oldDataCard");
			Me.setDisplayNomal("newDataCard");
			Me.setDisplayNomal("dataImis");
			Me.setDisplayNomal("newDataCardType");
			Me.setDisplayNomal("newDataCardCapacity");
		}else{
			Me.setDisplayNomal("changecardType");
			Me.setDisplayNomal("acceptReason");
			Me.setDisplayNomal("changecardMethod");
			Me.setDisplayNomal("oldCardNum");
			Me.setDisplayNomal("remoteBtn");
			Me.setDisplayNomal("newCardNum");
			Me.setDisplayNomal("imis");
			Me.setDisplayNomal("newCardType");
			Me.setDisplayNomal("newCardCapacity");
			Me.setDisplayNone("oldVoiceCard");
			Me.setDisplayNone("newVoiceCard");
			Me.setDisplayNone("voiceImis");
			Me.setDisplayNone("newVoiceCardType");
			Me.setDisplayNone("newVoiceCardCapacity");
			Me.setDisplayNone("oldDataCard");
			Me.setDisplayNone("newDataCard");
			Me.setDisplayNone("dataImis");
			Me.setDisplayNone("newDataCardType");
			Me.setDisplayNone("newDataCardCapacity");
		}
	}
	
	//���ؿؼ�
	Me.setDisplayNone = function (name) {
		Me.$(name).style.display = "none";
		Me.$("label_" + name).style.display = "none";
	};
	//��ԭ�ؼ�
	Me.setDisplayNomal = function (name) {
		Me.$(name).style.display = "";
		Me.$("label_" + name).style.display = "";
	};
	//Զ��д����ť�û�
	Me.setRemoteBtn = function(obj){
		if(obj.value == 2){
			Me.$("remoteBtn").disabled = true;
		}else{
			Me.$("remoteBtn").disabled = false;
		}
	};
	//������ʽΪ"˫ģ�䵥ģ"ֻ�ܽ���ʵ������
	/*
	Me.setWriteCardType = function(obj){
		var selectObj = Me.$("writecardType");
		if(obj.value == 3){
			for(var i=0;i<selectObj.length;i++){  
			  if(selectObj.options[i].value=="2"){  
			  	selectObj.options[i].selected=true;  
			  	break;  
			 	}  
			 }
			 selectObj.disabled = true; 
		}else{
			for(var i=0;i<selectObj.length;i++){  
			  if(selectObj.options[i].value=="1"){  
			  	selectObj.options[i].selected=true;  
			  	break;  
			 	}  
			 } 
			 selectObj.disabled = false;   
		}
	};*/
	
	function getValue(tempArray){
		var tempArray1=tempArray.split("=");
		var result=tempArray1[1];
		return 	result;
	}
	
	Me.WriteCardBtn_OnClick = function(){
		var serviceId = b.serviceRelation.serviceId;
		var workNo = a.$session.workNo;
		var staffName = a.$session.staffName;
		var dealId = a.$session.departmentId;
		var dealName= a.$session.deptName;
		var changeCardMethod = Me.$("changecardMethod").value;
		var result = executeRequest("prodOfferSaleAjaxAction","getRemoteInfo","");
		if(result){
			var arrObj = result.split(',');
			var wideUrl = arrObj[0];
			var squenceId = arrObj[1];
			var param = "SQUENCE=" + squenceId + "&ACC_NBR=" + serviceId + "&STAFF_ID=" + workNo  + "&STAFF_NAME=" + staffName + "&CHANNEL_ID=" + dealId + "&CHANNEL_NAME=" + dealName+"&new_flag=0";
			var localUrl = "";
			var aurl = encodeURI(wideUrl+param);
			var str=showModalDialog(localUrl,aurl, "DialogWidth:625px;DialogHeight:600px;status:no;location:no");
			if(typeof str=="undefined"){
				alert("\u8fdc\u7a0b\u5199\u5361\u5931\u8d25\uff01\u8bf7\u91cd\u65b0\u5199\u5361");
				return false;
			}
			var tempArray=str.split("&");
			var i=0;
			var squence = getValue(tempArray[1]);
			var resultCode = getValue(tempArray[2]);
			var resultMessage = getValue(tempArray[3]);
			var accNbr = getValue(tempArray[4]);
			var imsi = getValue(tempArray[5]);
			var iccSerial = getValue(tempArray[6]);
			var iccid = getValue(tempArray[7]);
			iccid = iccid.substring(0,iccid.length-1); 
			var inOutFlag = getValue(tempArray[8]);
			var tempParam = "&squence="+squence+"&serviceId="+accNbr+"&imsi="+imsi+"&iccSerial="+iccSerial+"&iccid="+iccid+"&inOutFlag="+inOutFlag;
			if(resultCode=="0"){
				Me.$('newCardNum').value = iccid;
				Me.$('newCardNum').disabled= true;
				Me.$('remoteBtn').disabled= true;
				Me.setDisplayNomal("imis");
				Me.setDisplayNomal("newCardType");
				Me.setDisplayNomal("newCardCapacity");
				Me.$('imis').innerHTML = imsi;
				Me.$('newCardType').innerHTML = '\u7a7a\u767d\u5361';
			}else{
				alert("\u8fdc\u7a0b\u5199\u5361\u5931\u8d25\uff01\u8bf7\u91cd\u65b0\u5199\u5361");
				}
			}
		}
	
	//ԭ�����¿�����Դ���
	Me.$("newCardNum").onblur = function(){
		Me.checkUim();
	}
	//�������;���ҳ��չ���Լ�Ĭ�ϳ�ʼ��ҳ��  
	Me.$("changecardType").onchange = function(){
		Me.doDisplayMode(Me.$("changecardType"));
	}
	Me.doDisplayMode(Me.$("changecardType"));
	
	//д����ʽ����Զ��д����ť�Լ�Ĭ�ϳ�ʼ��ҳ��
	//Me.$("writecardType").onchange = function(){
	//	Me.setRemoteBtn(Me.$("writecardType"));
	//}
	//Me.setRemoteBtn(Me.$("writecardType"));
	
	//������ʽΪ"˫ģ�䵥ģ"ֻ�ܽ���ʵ������
	Me.$("changecardMethod").onchange = function(){
		//Me.setWriteCardType(Me.$("changecardMethod"));
		//Me.setRemoteBtn(Me.$("writecardType"));
	}
	
	//Զ��д��չʾ���
	Me.$("label_remoteBtn").innerHTML = "";
	
	//IMIS�ȳ�ʼ��ʱ����
	Me.setDisplayNone("imis");
	Me.setDisplayNone("newCardType");
	Me.setDisplayNone("newCardCapacity");
	Me.$("remoteBtn").onclick = function(){
		Me.WriteCardBtn_OnClick();
	}
});
