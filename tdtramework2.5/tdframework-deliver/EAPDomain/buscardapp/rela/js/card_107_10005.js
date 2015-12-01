BusCard.define('/buscardapp/rela/js/card_107_10005.js',function(_buscard,cardParam){ 
	var Me = this;
	var a = arguments[0];
	var b = arguments[1];
	var c = b.serviceRelation.userId;
	var e = b.productId;
	var f = b.serviceOfferId;
	var executeRequest = _buscard.executeRequest;
	var card_flag;//原卡号的单双模类型
	var newCardFlag;//新卡号的单双模类型
	
	var cardId = "-1";
	var resId = "-1";
	var dataCardId="-1";
	var dataResId="-1";
	

//	//控制显示红*
//	Me.initElement=function(id){
//		var requestedSpanElem = document.createElement("span");
//		requestedSpanElem.innerHTML="*"
//		requestedSpanElem.className = "formRequested";
//		this.$("label_"+id).getElementsByTagName("span")[0].appendChild(requestedSpanElem);
//		//	this.$("label_newCardNum").getElementsByTagName("span")[0].appendChild(requestedSpanElem);	
//	}
//	Me.initElement("oldCardNum");
//	Me.initElement("newCardNum");
	
	//for compatibility
	Me.getOldCardNo = function () {
		var parameter = "userId=" + c;
		var resultJsonStr = executeRequest("secondAcceptAjaxAction", "getOldSimCard", parameter);
		try {
			var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
			if (jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1") {
				cardId = jsonResultObj.cardId;
				resId = jsonResultObj.resId;
			}
			if (jsonResultObj && jsonResultObj.dataFlag && jsonResultObj.dataFlag == "1") {
				dataCardId = jsonResultObj.dataCardId;
				dataResId = jsonResultObj.dataResId;
			}
		}catch (e) {
			alert("\u83b7\u53d6\u65e7\u5361\u4fe1\u606f\u5931\u8d25\uff0c\u8bf7\u6838\u67e5\u6570\u636e");
			return false;
		}
		if(Me.$("oldCardNum")){
			Me.$("oldCardNum").innerHTML = cardId;   //原卡号
		}
		Me.$("oldUimResInstId").value = resId;   //旧卡号资源实例ID
		if(b.cityCode!=b.serviceRelation.cityCode){
				Me.$('newCardNum').disabled= true;
				Me.$('remoteBtn').disabled= false;
		}
	};
	Me.getOldCardNo();//初始化获得原卡号，及旧卡号的资源实例ID

	//页面展现控制 語音卡+數據卡
	Me.doDisplayModeVC = function(){
			Me.display("changecardType");        //显示 换卡类型
			Me.display("acceptReason");          //显示 换卡补卡原因
			Me.display("newDataCard");           //新卡号（數據）
			Me.display("oldDataCard");           //原卡号（数据）
			Me.display("newVoiceCard");          //新卡号(語音)
			Me.display("oldVoiceCard");          //原卡号（语音）		
						
			Me.hidden("changecardMethod");      //显示 换卡方式	
			Me.hidden("oldCardNum");            //原卡号		
			Me.hidden("remoteBtn");             //远程写卡	
			Me.hidden("newCardNum");            //新卡号 
			Me.hidden("dataImsi");              //显示 IMIS（数据） 			
			Me.hidden("newDataCardType");       //显示 卡类型
			Me.hidden("newDataCardCapacity");   //显示 卡容量
			Me.hidden("newVoiceCardType");      //显示 卡类型
			Me.hidden("newVoiceCardCapacity");  //显示 卡容量									
			Me.hidden("imsi");                  //隐藏 IMIS
			Me.hidden("newCardType");           //隐藏 卡类型
			Me.hidden("newCardCapacity");       //隐藏 卡容量
			Me.hidden("voiceImsi");             //显示 IMIS（语音）
			Me.hidden("oldVoiceCardId");
			Me.hidden("oldUimResInstId");
			Me.hidden("oldDataCardId");
			Me.hidden("newVoiceCardId");
			Me.hidden("newUimResInstId");
			Me.hidden("newDataCardId");		
			if(Me.$('iccSerial')){
				Me.hidden("iccSerial");		
			}										
	}	
	
	//页面展现控制 非語音卡+ 數據卡
	Me.doDisplayMode = function(){
			Me.display("changecardType");        //显示 换卡类型
			Me.display("acceptReason");          //显示 换卡补卡原因
				

			Me.display("oldCardNum");            //原卡号		
			Me.display("remoteBtn");             //远程写卡	
			Me.display("newCardNum");            //新卡号 

			Me.hidden("changecardMethod");      //显示 换卡方式		
			Me.hidden("dataImsi");              //显示 IMIS（数据） 			
			Me.hidden("newDataCardType");       //显示 卡类型
			Me.hidden("newDataCardCapacity");   //显示 卡容量
			Me.hidden("newVoiceCardType");      //显示 卡类型
			Me.hidden("newVoiceCardCapacity");  //显示 卡容量						
			Me.hidden("newDataCard");           //新卡号（數據）
			Me.hidden("oldDataCard");           //原卡号（数据）
			Me.hidden("newVoiceCard");          //新卡号(語音)
			Me.hidden("oldVoiceCard");          //原卡号（语音）			
			Me.hidden("imsi");                  //隐藏 IMIS
			Me.hidden("newCardType");           //隐藏 卡类型
			Me.hidden("newCardCapacity");       //隐藏 卡容量
			Me.hidden("voiceImsi");             //显示 IMIS（语音）
			Me.hidden("oldVoiceCardId");
			Me.hidden("oldUimResInstId");
			Me.hidden("oldDataCardId");
			Me.hidden("newVoiceCardId");
			Me.hidden("newUimResInstId");
			Me.hidden("newDataCardId");
			if(Me.$('iccSerial')){
				Me.hidden("iccSerial");		
			}				
			Me.$("label_remoteBtn").style.visibility = "hidden";
//			Me.hidden("label_remoteBtn");
//			Me.$("label_remoteBtn").style.display = "none";
			Me.$("remoteBtn").disabled = false;		
			
	}
	Me.doDisplayMode();

	Me.checkUim = function () {                 //原来的新卡号资源监测
		var E = Me.$("newCardNum");
		var A = Me.$("newCardNum").value;
		
		Me.doDisplayMode();
		if (!A) {
			return true;
		}
		var cityCodeTemp = b.cityCode;
		if(!cityCodeTemp){
			cityCodeTemp = b.serviceRelation.cityCode;
		}
		var C = "uimId=" + A + "&serviceOfferId=" + f + "&productId=" + e + "&cityCode=" + cityCodeTemp+"&serviceId="+b.serviceRelation.serviceId;
		var D = executeRequest("prodOfferSaleAjaxAction", "checkChangeUimResource", C);
		var B = executeAjaxResult(D);
		if (B == false) { //没有通过资源监测
			Me.$("newCardNum").value="";
			return;
		}
		//如果是普通卡想更换RFID卡，需要检测该用户是否订购了“翼支付”功能，如果没有则不允许办理，提示需要先订购“翼支付”功能
		var paramater="cityCode="+cityCodeTemp+"&serviceOfferId=" + f+ "&productId=" + e+"&serviceId="+b.serviceRelation.serviceId+"&newCardNum="+Me.$("newCardNum").value;
		var resl=executeRequest("secondAcceptAjaxAction", "doCheckRFIDUseEPAY", paramater);
		var rr=executeAjaxResult(resl);
		var ra=rr.split(",");
//		if(ra[0]==27&&ra[1]!=1){
//			alert("普通卡想更换RFID卡，需要订购了“翼支付”功能")
//			Me.$("newCardNum").value="";
//			return;
//		};
		if(ra[0]!=44&&ra[0]!=50&&ra[1]==1){
			alert("订购了“翼支付”功能,必须更换RFID卡不能订购普通卡")
			Me.$("newCardNum").value="";
			return;
		}
		var uim_kind=executeRequest("prodOfferSaleAjaxAction", "getUIMKIND", C);
		var resultArray = B.split(",");
		if(resultArray&&resultArray.length>0){           //通过资源检测，实卡
			Me.$("newUimResInstId").value = resultArray[0];
			var pram="oldUimResInstId="+Me.$("oldUimResInstId").value+"&newUimResInstId="+Me.$("newUimResInstId").value+
					"&cityCode="+b.serviceRelation.cityCode+"&serviceId="+b.serviceRelation.serviceId;
			var flag=executeRequest("prodOfferSaleAjaxAction", "doChangeCardCheck", pram)
			if(flag=="1"){
				alert("双模换成单模卡时，需要先取消双模国际漫游业务再进行换成单模卡");
				Me.$("newCardNum").value="";
				return false;
			}
			var blackflag=executeRequest("prodOfferSaleAjaxAction", "doCheckBlackBerry", pram)
			if(flag=="1"){
				alert("用户是黑莓用户或者用户预约了黑莓业务，只能换EVDO双模卡");
				Me.$("newCardNum").value="";
				return false;
			}
			Me.display("imsi");
			Me.display("newCardType");
			Me.display("newCardCapacity");
			Me.$("imsi").innerHTML = resultArray[1];
			Me.$("newCardType").innerHTML =executeAjaxResult(uim_kind).split(",")[0] ;
			Me.$("newCardCapacity").innerHTML = resultArray[3];

		}	
	};
	
	Me.checkVoiceUim = function () {                 //檢測是否是語音卡，如果是刷新
		var E = Me.$("newVoiceCard");
		var A = Me.$("newVoiceCard").value;
		
		Me.doDisplayModeVC();
		if (!A) {
			return true;
		}
		var cityCodeTemp = b.cityCode;
		if(!cityCodeTemp){
			cityCodeTemp = b.serviceRelation.cityCode;
		}
		var C = "uimId=" + A + "&serviceOfferId=" + f + "&productId=" + e + "&cityCode=" + cityCodeTemp+"&serviceId="+b.serviceRelation.serviceId;
		var D = executeRequest("prodOfferSaleAjaxAction", "checkChangeUimResource", C);
		var B = executeAjaxResult(D);
		if (B == false) { //没有通过资源监测
			Me.$("newVoiceCard").value="";
			return;
		}
		//如果是普通卡想更换RFID卡，需要检测该用户是否订购了“翼支付”功能，如果没有则不允许办理，提示需要先订购“翼支付”功能
//		var paramater=
//		executeRequest("secondAcceptAjaxAction", "doCheckRFIDUseEPAY", C);
		var uim_kind=executeRequest("prodOfferSaleAjaxAction", "getUIMKIND", C);
		var resultArray = B.split(",");
		if(resultArray&&resultArray.length>0){           //通过资源检测，实卡
			Me.$("newVoiceCardId").value = resultArray[0];
			var pram="oldUimResInstId="+Me.$("oldVoiceCardId").value+"&newUimResInstId="+Me.$("newVoiceCardId").value+
					"&cityCode="+b.serviceRelation.cityCode+"&serviceId="+b.serviceRelation.serviceId;
			var flag=executeRequest("prodOfferSaleAjaxAction", "doChangeCardCheck", pram)
			if(flag=="1"){
				alert("双模换成单模卡时，需要先取消双模国际漫游业务再进行换成单模卡");
				Me.$("newCardNum").value="";
				return false;
			}
			var blackflag=executeRequest("prodOfferSaleAjaxAction", "doCheckBlackBerry", pram)
			if(flag=="1"){
				alert("用户是黑莓用户或者用户预约了黑莓业务，只能换EVDO双模卡");
				Me.$("newCardNum").value="";
				return false;
			}
			if(Me.$("dataImsi").innerHTML!=null&&Me.$("dataImsi")&&Me.$("dataImsi").innerHTML){
				Me.display("dataImsi");
				Me.display("newDataCardType");
				Me.display("newDataCardCapacity");
				if(Me.$("newVoiceCard").value==Me.$("newDataCard").value){
					Me.$("newVoiceCard").value="";
					alert("卡号重复，请重新输入");
					return;
				}
			}
			Me.display("voiceImsi");
			Me.display("newVoiceCardType");
			Me.display("newVoiceCardCapacity");
			Me.$("voiceImsi").innerHTML = resultArray[1];
			Me.$("newVoiceCardType").innerHTML =executeAjaxResult(uim_kind).split(",")[0] ;
			Me.$("newVoiceCardCapacity").innerHTML = resultArray[3];
		}	
	};	


	Me.checkDataUim = function () {                 //檢測是否是数据卡，如果是刷新
		var E = Me.$("newDataCard");
		var A = Me.$("newDataCard").value;
		
		Me.doDisplayModeVC();
		if (!A) {
			return true;
		}
		var cityCodeTemp = b.cityCode;
		if(!cityCodeTemp){
			cityCodeTemp = b.serviceRelation.cityCode;
		}
		var C = "uimId=" + A + "&serviceOfferId=" + f + "&productId=" + e + "&cityCode=" + cityCodeTemp+"&serviceId="+b.serviceRelation.serviceId;
		var D = executeRequest("prodOfferSaleAjaxAction", "checkChangeUimResource", C);
		var B = executeAjaxResult(D);
		if (B == false) { //没有通过资源监测
			Me.$("newDataCard").value="";
			return;
		}
		//如果是普通卡想更换RFID卡，需要检测该用户是否订购了“翼支付”功能，如果没有则不允许办理，提示需要先订购“翼支付”功能
//		var paramater=
//		executeRequest("secondAcceptAjaxAction", "doCheckRFIDUseEPAY", C);
		var uim_kind=executeRequest("prodOfferSaleAjaxAction", "getUIMKIND", C);
		var resultArray = B.split(",");
		if(resultArray&&resultArray.length>0){           //通过资源检测，实卡
			Me.$("newDataCardId").value = resultArray[0];
			if(Me.$("voiceImsi").value!=""&&Me.$("voiceImsi")&&Me.$("voiceImsi").value){
				Me.display("voiceImsi");
				Me.display("newVoiceCardType");
				Me.display("newVoiceCardCapacity");
				if(Me.$("newVoiceCard").value==Me.$("newDataCard").value){
					Me.$("newDataCard").value="";
					alert("卡号重复，请重新输入");
					return;
				}
			}
			Me.display("dataImsi");
			Me.display("newDataCardType");
			Me.display("newDataCardCapacity");
			Me.$("dataImsi").innerHTML = resultArray[1];
			Me.$("newDataCardType").innerHTML =executeAjaxResult(uim_kind).split(",")[0] ;
			Me.$("newDataCardCapacity").innerHTML = resultArray[3];
		}	
	};		
	
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
//		var changeCardMethod = Me.$("changecardMethod").value;
		var result = executeRequest("prodOfferSaleAjaxAction","getRemoteInfoIn","");
		var webPath=document.getElementById("webPath").value;
		if(result){
			var arrObj = result.split(",");
			var wideUrl = arrObj[0];
			var squenceId = arrObj[1];
//			var param = "SQUENCE=" + squenceId + "&ACC_NBR=" + serviceId + "&STAFF_ID=" + workNo  + "&STAFF_NAME=" + staffName + "&CHANNEL_ID=" + dealId + "&CHANNEL_NAME=" + dealName+"&new_flag=0"+"&src_org_id=609906"+"&dst_org_id=609906";
			var param = "SQUENCE=" + squenceId + "&ACC_NBR=" + serviceId + "&STAFF_ID=" + workNo  + "&STAFF_NAME=" + staffName + "&CHANNEL_ID=" + dealId + "&CHANNEL_NAME=" + dealName+"&new_flag=0";
			var localUrl = webPath+ "/custcontact/orderaccept/secondaccept/depchangecard/PopFrame.jsp";
			var aurl = encodeURI(wideUrl+param);
//			alert(aurl);
			var str=showModalDialog(localUrl,aurl, "DialogWidth:625px;DialogHeight:600px;status:no;location:no");
//			alert(str);
//			var str='&SQUENCE=00348720120905&RESULT_CODE=0&RESULT_MESSAGE=写卡成功&ACC_NBR=18031424402&IMSI=460030133240201&ICC_SERIAL=0310000006000004950D&ICCID=89860311003140005017&IN_OUT_FLAG=0';
			if(typeof str=="undefined"){
				alert("\u8fdc\u7a0b\u5199\u5361\u5931\u8d25\uff01\u8bf7\u91cd\u65b0\u5199\u5361");
				return false;
			}
			var tempArray=str.split("&");
//			alert(tempArray);
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
				Me.display("imsi");
				Me.display("newCardType");
				Me.display("newCardCapacity");
				Me.$('imsi').innerHTML = imsi;
				Me.$('newCardType').innerHTML = '\u7a7a\u767d\u5361';		
				Me.$('iccSerial').value=iccSerial;	
				Me.checkUim();
			}else{
				alert("\u8fdc\u7a0b\u5199\u5361\u5931\u8d25\uff01\u8bf7\u91cd\u65b0\u5199\u5361");
				}
			}
		}
	Me.checkTianYi = function(){             //判断是否为天翼UIM卡
		var cityCodeUim = b.serviceRelation.cityCode;
		//alert(cityCodeUim);
		var iccidUim = Me.$("newCardNum").value;
		//alert(iccidUim);
		if(iccidUim ==""){
			return;
		}else{
			var hashMapUim = BusCard.$remote("mktResInterfaceBO").getNewOldCardInfo(cityCodeUim,iccidUim);
			if(hashMapUim.NEWOLD_FLAG == "0"){
				alert("换补卡原因：更换天翼UIM卡，新卡必须为天翼UIM新卡");
				Me.$("newCardNum").value="";
			}
		}
	}
//本地换补卡	
	// a)	换卡类型的onchanget事件，处理远程写卡按钮和UIM卡号元素的可操作性
	Me.$("changecardType").onchange = function(){
		var changecardType= Me.$("changecardType").value;
		if(changecardType==1){
			Me.doDisplayMode();
			if(Me.$("oldCardNum")){
				Me.$("oldCardNum").innerHTML = cardId;   //旧语音卡
		    }
		    Me.$("oldUimResInstId").value = resId;   //旧语音卡资源实例ID
			Me.$("newCardNum").value = "";
		}else if(changecardType==2){                      //当选中数据卡之后默认为实卡换卡
			Me.doDisplayMode();
		    if(Me.$("oldCardNum")){
				Me.$("oldCardNum").innerHTML = dataCardId;   //旧语音卡
		    }
		    Me.$("oldUimResInstId").value = dataResId;   //旧语音卡资源实例ID
			Me.$("newCardNum").value = "";
			Me.$("remoteBtn").disabled = true;
		}else if(changecardType==3){                   //当选择语音卡和数据卡选项页面展示原卡号（语音）、新卡号（语音）；原卡号（数据）、新卡号（数据），获取的卡信息也是两份		
			Me.display("changecardType");        //显示 换卡类型
			Me.display("acceptReason");          //显示 换卡补卡原因
			Me.display("oldDataCard");           //原卡号（数据）
			Me.display("newDataCard");           //新卡号（數據）
			Me.display("newVoiceCard");          //新卡号(語音)
			Me.display("oldVoiceCard");          //原卡号（语音）
			
			Me.hidden("changecardMethod");      //显示 换卡方式				
			Me.hidden("oldCardNum");            //原卡号			
			Me.hidden("newCardNum");            //新卡号 
			Me.hidden("dataImsi");              //显示 IMIS（数据） 			
			Me.hidden("newDataCardType");       //显示 卡类型
			Me.hidden("newDataCardCapacity");   //显示 卡容量
			Me.hidden("newVoiceCardType");      //显示 卡类型
			Me.hidden("newVoiceCardCapacity");  //显示 卡容量								
			Me.hidden("imsi");                  //隐藏 IMIS
			Me.hidden("newCardType");           //隐藏 卡类型
			Me.hidden("newCardCapacity");       //隐藏 卡容量
			Me.hidden("voiceImsi");             //显示 IMIS（语音）
			Me.hidden("remoteBtn");             //远程写卡
		    if(Me.$("oldVoiceCard")){
				Me.$("oldVoiceCard").innerHTML = cardId;   //旧语音卡
		    }
		    Me.$("oldVoiceCardId").value = resId;   //旧语音卡资源实例ID
			if(Me.$("oldDataCard")){
				Me.$("oldDataCard").innerHTML = dataCardId;   //旧语音卡
		    }
		    Me.$("oldDataCardId").value = dataResId;   //旧语音卡资源实例ID
			Me.$("newDataCard").value = "";
			Me.$("newVoiceCard").value = "";
		}
 }
	//b)	远程写卡按钮的onclick事件，调用远程写卡系统接口，处理返回值；调用JAVA程序记录写卡信息
	Me.$("remoteBtn").onclick = function(){
		Me.WriteCardBtn_OnClick();
		Me.$("newCardNum").disabled=true;
	
	}
	
	//c)	新卡号的onblur事件，实体写卡的时候刷新卡类型、卡容量、IMSI信息  原来的新卡号资源监测	
	Me.$("newCardNum").onblur = function(){
		Me.checkUim();
		var acceptReason = Me.$("acceptReason").value;
		if(acceptReason == 10){
			Me.checkTianYi();
		}
	}
	//在换卡方式发生变化时判断和新的卡号是否相匹配
	//getdata前回调
	this.addPreDataBuilderAspect(function(_buscard,param){
		var changecardType= Me.$("changecardType").value;
		//是语音卡+数据卡
		if(changecardType==3){
			if(Me.$("newVoiceCard").value == ""){
				alert("\u65b0\u5361\u53f7\u4e0d\u80fd\u4e3a\u7a7a");
				return false;
			}
			if(Me.$("newDataCard").value == ""){
				alert("\u65b0\u5361\u53f7\u4e0d\u80fd\u4e3a\u7a7a");
				return false;
			}
			if(Me.$("voiceImsi").innerHTML==""||Me.$("dataImsi").innerHTML==""){
				alert("\u4fe1\u606f\u672a\u52a0\u8f7d\u5b8c\uff0c\u8bf7\u7a0d\u5019");
				return false;
			}
			
		}
		//是语言卡或数据卡
		if(changecardType==1||changecardType==2){
			if(Me.$("newCardNum").value == ""){
				alert("\u65b0\u5361\u53f7\u4e0d\u80fd\u4e3a\u7a7a");
				return false;
			}
			if(Me.$("imsi").innerHTML==""){
				alert("\u4fe1\u606f\u672a\u52a0\u8f7d\u5b8c\uff0c\u8bf7\u7a0d\u5019");
				return false;
			}
		}
	});
	

	//檢測是否是語音卡
	Me.$("newVoiceCard").onblur = function(){
		Me.checkVoiceUim();
	}
	
	//檢測是否是数据卡
	Me.$("newDataCard").onblur = function(){
		Me.checkDataUim();
	}
//	Me.$("remoteBtn").onclick = function(){
		//Me.WriteCardBtn_OnClick();
//	}
   //换卡原因的处理
   Me.$("acceptReason").onchange=function(){
    Me.changeAcceptReason();
   }
   
   Me.changeAcceptReason=function(){   
       if($("acceptReason").value!=9){//会员用户换卡补卡
         return true;
       }
			   para={partCity:b.serviceRelation.cityCode,memberId:b.serviceRelation.customerId};
			   var cmvo =BusCard.$remote("custInfoBO").getClubberInfoByCustomerId(para);
			     if(cmvo){
			     
				          var para={serviceId:b.serviceRelation.serviceId ,serviceKind:b.serviceRelation.serviceKind+"",memberId:b.serviceRelation.customerId+"",serveKind:"100500"};
				          var number=BusCard.$remote("clubMemberService").getIfCanService(para);
				      	           //1000 钻石卡 1100 金卡 1200 银卡
						            if(number>0){
							            if(cmvo.membershipLevel=='1000'){
							            	   alert("钻石卡会员免费换卡"+Me.getClubCount(cmvo.membershipLevel)+"次，剩余"+number+"次。");
							            	   return true;	
							            }else if(cmvo.membershipLevel=='1100'){
			    		            		   alert("金卡会员免费换卡"+Me.getClubCount(cmvo.membershipLevel)+"次，剩余"+number+"次。");
					                           return true;	
							            	
							            }else if(cmvo.membershipLevel=='1200'){
							            	      alert("银卡会员免费换卡"+Me.getClubCount(cmvo.membershipLevel)+"次，剩余"+number+"次。");
							            	      return true;
							            } 
						            }
				 
				          }
   
                    alert("服务号码所归客户是非会员客户或未领取会员卡！");
			       return true;
}

 Me.getClubCount=function(cardLevel){
     var para={serveKind:"100500",cardType:cardLevel};
	 var number=BusCard.$remote("clubMemberService").getServiceNumByCardType(para);
      return number
 }

});
