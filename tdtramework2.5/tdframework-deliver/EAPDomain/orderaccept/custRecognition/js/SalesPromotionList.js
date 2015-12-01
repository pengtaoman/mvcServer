var eccn = new ECCN("ec");
var webpath = document.getElementsByTagName("contextPath")[0].value;
//var PromotionTypeConst = ConstantsPool.load("PromotionTypeConst").PromotionTypeConst;//促销政策类型常量类
var SalesPromotion ={
	newWin : null,
	init : function(){
		eccn.init();
		//var changeBtns = document.getElementsByName("btnChange");//get change buttons
		var modifyBtns = document.getElementsByName("btnModify");//get modify buttons
		var deleteBtns = document.getElementsByName("btnDelete");//get delete buttons
		/**
		if(changeBtns && changeBtns.length>0){
			var changeBtn = changeBtns[0];
			if(!this.checkHaveOMRight(changeBtn)){
				for(var i=0;i<changeBtns.length;i++){
					changeBtns[i].style.display = "none";
				}
			}
		}
		*/
		if(modifyBtns && modifyBtns.length>0){
			var modifyBtn = modifyBtns[0];
			if(!this.checkHaveOMRight(modifyBtn)){
				for(var i=0;i<modifyBtns.length;i++){
					modifyBtns[i].style.display = "none";
				}
			}
			for(var j=0;j<modifyBtns.length;j++){
				var promotionStatus = modifyBtns[j].getAttribute("promotionStatus");
				if(promotionStatus == 1299){//预约状态
					modifyBtns[j].style.display = "none";
				}
			}
		}
		if(deleteBtns && deleteBtns.length>0){
			for(var i=0;i<deleteBtns.length;i++){
				var promotionType = deleteBtns[i].getAttribute("promotionType");
				//if(promotionType != 4){
				//辽宁电信租机、话费补贴和补贴卷类型都需要支持退订操作
				deleteBtns[i].parentNode.style.display = "";
				//}
			}
		}
	},	
	
	checkHaveOMRight : function(button){
		try{
			var menuId = button.getAttribute("menuId");
			if(menuId){
				var result = dojo._getText(webpath + "/orderDetailAction.do?method=checkHasOMRight&menuId="+menuId);
				var resObj = eval("("+result+")");
				return (resObj.flag=="1");
			}else{
				return true;
			}
		}catch(e){
			return true;
		}
	},
	
	getPathValue : function() {
		return document.getElementsByTagName("contextPath")[0].value;
	},
	
	showPromotion : function(flag, promotionId, promotionInstId,promotionType,effDate,createDate){
		if(this.isOcs(promotionInstId)){//OCS用户不能做换促销操作
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410078"});
			return;
		}
		
		/** 跨月规则屏蔽掉
		if(promotionType != 5 && !this.doCheckIfCanChg(effDate)){//针对非分月转兑类型进行验证
			alert("\u8de8\u6708\u4e0d\u5141\u8bb8\u8fdb\u884c\u4fc3\u9500\u653f\u7b56\u53d8\u66f4,\u8bf7\u786e\u8ba4!");
			return false;
		}
		*/
		
		//分月转兑促销不能做修改操作
		if(flag == 'modify' && promotionType == 5){
			alert("\u5206\u6708\u8f6c\u5151\u4e0d\u80fd\u505a\u4fee\u6539\u64cd\u4f5c");
			return false;
		}
		
		//分月转兑不能退订
		if(flag == 'delete' && promotionType == 5){
			alert("\u5206\u6708\u8f6c\u5151\u653f\u7b56\u4e0d\u80fd\u505a\u9000\u8ba2\u64cd\u4f5c");
			return false;
		}
		
		//辽宁电信促销政策退订操作改造 beg
		if(flag == "delete"){//&& promotionType == 5){
			var validDays = "7";//退订政策限制天数
			var para = "&ServiceKind=-1&apply_event=-1";
			/** 跨月规则检测屏蔽掉
			if(!this.doCheckIfCanChg(createDate)){
				alert("\u8de8\u6708\u5206\u6708\u8f6c\u5151\u4e0d\u80fd\u9000\u8ba2\uff0c\u8bf7\u786e\u8ba4");
				return false;
			}
			*/
			//租机或话费补贴退订规则检测
			if(promotionType == 1 || promotionType == 6){
				var custGroup = "";
				var queryParam = "promotionInstId="+promotionInstId;
				var resultData = executeRequest('promotionChangeAction','doGetDeviceInfo',queryParam);
				if(resultData){
					var deviceList = dojo.fromJson(resultData);
					if(deviceList && deviceList.length>0){
						custGroup = deviceList[0].custComunity;
					}
				}
				if(custGroup == 1){//公众客户
					para += "&infoId=230";
				}else if(custGroup == 2){//政企客户
					para += "&infoId=231";
				}
				
				var res = executeRequest("businessAcceptAction","getCityBusinessParamValue",para);
				if(res){
					if(res != '-1'){
						validDays = res;
					}
					if(!this.doCheckIfCanChg(createDate,validDays)){
						alert("\u8d85\u8fc7\u6709\u6548\u65f6\u95f4\u9650\u5236\uff0c\u4e0d\u5141\u8bb8\u505a\u9000\u8ba2\u6216\u53d8\u66f4\u64cd\u4f5c");
						return false;
					}
				}else{//开关表没有配置限制天数，不能退订
					alert("\u8d85\u8fc7\u6709\u6548\u65f6\u95f4\u9650\u5236\uff0c\u4e0d\u5141\u8bb8\u505a\u9000\u8ba2\u6216\u53d8\u66f4\u64cd\u4f5c");
					return false;
				}	
			}else if(promotionType == 4){//补贴卷退订
				//补贴卷退订之前先验证补贴卷使用状态
				var param = "promotionInstId="+promotionInstId;
				var result = executeRequest("promotionChangeAction","getRentSubsidyInfo",param);
				if(result){
					var rentSubsidyInfoVO = eval('('+ result +')');
					if(rentSubsidyInfoVO.printStatus == 1){//补贴卷已打印
						if(rentSubsidyInfoVO.sellStatus == 1){//补贴卷已使用
							alert("\u5206\u6708\u8f6c\u5151\u5e26\u6709\u8865\u8d34\u5377\u4e14\u5df2\u4f7f\u7528\uff0c\u4e0d\u80fd\u505a\u9000\u8ba2\u64cd\u4f5c");
							return false;
						}else{//补贴卷打印但未使用
							//调用资源接口，判断补贴卷是否已作废
							var cityCode = rentSubsidyInfoVO.cityCode;
							var objectId = rentSubsidyInfoVO.listNo;
							var param = "cityCode="+cityCode+"&objectId="+objectId;
							var resultstr = executeRequest("promotionChangeAction","getSubsidyResInfo",param);
							if(resultstr){
								var infovo = eval('('+ resultstr +')');
								if(infovo.resourceInfo.STOCK_STATUS != 32){//补贴卷作废状态
									alert("\u5206\u6708\u8f6c\u5151\u5e26\u6709\u8865\u8d34\u5377\u4e14\u5df2\u6253\u5370\uff0c\u8bf7\u5148\u5c06\u8865\u8d34\u5377\u4f5c\u5e9f");
									return false;
								}
							}
						}
					}
				}
			}
		}
		
		/** 辽宁电信不支持换促销政策操作,换政策的相关规则检测屏蔽掉
		if(flag == "change"){//变更
			//针对分月转兑的变更操作，添加跨月限制
			if(promotionType == 5 && !this.doCheckIfCanChg(createDate)){//跨月分月转兑不能变更
				alert("\u8de8\u6708\u5206\u6708\u8f6c\u5151\u4e0d\u80fd\u53d8\u66f4");
				return false;
			}
			
			var param = "ServiceKind=-1&apply_event=-1&infoId=227";
			var result = executeRequest("businessAcceptAction","getCityBusinessParamValue",param);
			if(result && result == "0"){//不允许变更除分月转兑外的促销
				if(promotionType != 5){//非分月转兑促销
					alert("\u975e\u5206\u6708\u8f6c\u5151\u4fc3\u9500\u4e0d\u80fd\u505a\u53d8\u66f4\u64cd\u4f5c");
					return false;
				}
			}
			
			//添加规则-->划拨类型为顺序划拨的政策不能做变更操作
			if(promotionType == 1 || promotionType == 4 || promotionType == 6){//针对租机和补贴卷两类政策-->辽宁电信增加话费补贴类型
				var params = "promotionInstId="+promotionInstId;
				var itemInstStr = executeRequest("promotionChangeAction","getPromotionItemInstList",params);
				if(itemInstStr){
					var itemInstList = dojo.fromJson(itemInstStr);
					//划拨类型为按顺序划拨
					var checkFlag = dojo.some(itemInstList||[],function(oneItemInst){
						return oneItemInst.itemAttrId == "10512" && oneItemInst.attrValue == 4;
					});
					if(checkFlag){
						alert("\u5212\u62e8\u7c7b\u578b\u4e3a\u6309\u987a\u5e8f\u5212\u62e8\u7684\u65b9\u6848\u4e0d\u80fd\u505a\u53d8\u66f4\u64cd\u4f5c");
						return false;
					}
				}
			}
			
			if(promotionType == 4 || promotionType == 5){//换补贴卷操作，需要验证原促销补贴卷状态
				var param = "promotionInstId="+promotionInstId;
				var result = executeRequest("promotionChangeAction","getRentSubsidyInfo",param);
				if(result){
					var rentSubsidyInfoVO = eval('('+ result +')');
					if(rentSubsidyInfoVO.printStatus == 1){//补贴卷已打印
						if(rentSubsidyInfoVO.sellStatus == 1){//补贴卷已使用
							alert("\u8865\u8d34\u5377\u5df2\u4f7f\u7528,\u4e0d\u80fd\u505a\u6362\u8865\u8d34\u5377\u64cd\u4f5c");
							return false;
						}else{//补贴卷打印但未使用
							//调用资源接口，判断补贴卷是否已作废
							var cityCode = rentSubsidyInfoVO.cityCode;
							var objectId = rentSubsidyInfoVO.listNo;
							var param = "cityCode="+cityCode+"&objectId="+objectId;
							var resultstr = executeRequest("promotionChangeAction","getSubsidyResInfo",param);
							if(resultstr){
								var infovo = eval('('+ resultstr +')');
								if(infovo.resourceInfo.STOCK_STATUS != 32){//补贴卷作废状态
									alert("\u8865\u8d34\u5377\u5df2\u6253\u5370\uff0c\u8bf7\u5148\u5c06\u8865\u8d34\u5377\u4f5c\u5e9f");
									return false;
								}
							}
						}
					}
				}
			}
		}
		*/
		
		var parameter = "&promotionId="+promotionId+"&promotionInstId="+promotionInstId
			+"&flag="+flag+"&promotionType="+promotionType;
		var url= this.getPathValue()+ "/promotionChangeAction.do?method=init"+parameter;
		window.open(url, '',
		        'status=1,resizable=0,scrollbars=yes,top=10,left=10,width='
		                + (window.screen.width- 20) + ',height='
		                + (window.screen.height - 100));
	},
	doCheckIfCanChg : function(createDate,validDays){
		var _falg = true;
		var parameters = "";
		var result = executeRequest("promotionChangeAction", "doCheck", parameters);
		var resultVO = dojo.fromJson(result);
		//if(resultVO.objectValue == 1){
		var sysDate = resultVO.today;
//		var cdate = new Date(createDate);
//		cdate = cdate.setDate(cdate.getDay()+validDays);
//		var sdate = new Date(sysDate);
		var cdate = DateHelper.getDateFromString(createDate);
		cdate = cdate.setDate(cdate.getDate()+parseInt(validDays));
		if(typeof cdate == 'number'){
			cdate = new Date(cdate);
		}
		cdate = DateHelper.formatDate(cdate);
		var sdate = DateHelper.formatDate(DateHelper.getDateFromString(sysDate));
//		if(dojo.date.compare(cdate,sdate)<0){
//			_falg = false;
//		}
		
		if(!DateHelper.compareDateValue(cdate,sdate)){
			_falg = false;
		}
		/**
		if(!this.compareDateValue(sysDate,new Date(effDate))){
			_falg = false;
		}
		
		}else if(resultVO.objectValue == 0){
			_falg = true;
		}
		*/
		return _falg;
	},
	
	compareDateValue : function(sysDate,effDate){
		var dateArr = sysDate.split(" ");
		var dateYMD = dateArr[0].split("-");
		var year = parseInt(dateYMD[0], 10);
		var month = parseInt(dateYMD[1], 10);
		if(effDate.getFullYear()<year){
			return false;
		}else{
			var effMonth = effDate.getMonth() + 1;
			if(effMonth<month){
				return false;
			}
		}
		return true;
	},
	isOcs : function(promotionInstId){
		var parameters = "promotionInstId="+promotionInstId;
		var result = executeRequest("promotionChangeAction", "doCheckIsOCS", parameters);
		if(result && result == "1"){
			return true;
		}
		return false;
	},
	changeSecurityInfo : function (promotionInstId){
		parent.parent.document.getElementById("custXml").value =parent.parent.parent.document.getElementById("custXml").value;
		var parameter =	"&flag="+parent.parent.parent.document.getElementById("batchFlag").value+
				"&prodOfferInstId="+promotionInstId + "&custXml=" + parent.parent.document.getElementById("custXml").value;
		var url = this.getPathValue() + "/prodOfferSaleAction.do?method=initPromotionAssureModify"+parameter;
		window.open(url, '',
		        'status=1,resizable=1,fullscreen=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
	}
}

var DateHelper = function() {
    var append = function(s) {
        return s.length == 1 ? "0" + s : s;
    };
    var format = function(date, simple) {
        var type = Object.prototype.toString.apply(date);
        if (/Number/i.test(type)) {
	        date = new Date(date);
	        
        } else if (/String/i.test(type) && /^\d+$/.test(date)) {
	        date = new Date(parseInt(date))
        } else if (/Date/i.test(type)) {
	        
	        date = date;
        }
        
        if (date instanceof Date) {
	        var y = "" + date.getFullYear(),
		        M = "" + (date.getMonth() + 1),
		        d = "" + (date.getDate()),
		        h = "" + (date.getHours()),
		        m = "" + (date.getMinutes()),
		        s = "" + (date.getSeconds()),
		        firstPart = y + "-" + append(M) + "-" + append(d),
		        lastPart = " " + append(h) + ":" + append(m) + ":" + append(s);
	        return simple ? firstPart : (firstPart + lastPart);
	        
        } else {
	        return date;
	        
        }
        
    };
    
    return {
        format : format,
        formatDate : function(date) {
	        var iMonth = date.getMonth() + 1;
	        var sMonth = new String(iMonth);
	        if (sMonth.length == 1) {
		        sMonth = "0" + sMonth;
	        }
	        var iDate = date.getDate();
	        var sDate = new String(iDate);
	        if (sDate.length == 1) {
		        sDate = "0" + sDate;
	        }
	        var iHour = date.getHours();
	        var sHour = new String(iHour);
	        if (sHour.length == 1) {
		        sHour = "0" + sHour;
	        }
	        var iMin = date.getMinutes();
	        var sMin = new String(iMin);
	        if (sMin.length == 1) {
		        sMin = "0" + sMin;
	        }
	        var iSec = date.getSeconds();
	        var sSec = new String(iSec);
	        if (sSec.length == 1) {
		        sSec = "0" + sSec;
	        }
	        return date.getFullYear() + '-' + sMonth + '-' + sDate + ' ' + sHour + ':' + sMin + ':' + sSec;
        },
        getDateFromString : function(dateString, flag) {
	        if (!dateString) { return null; }
	        var oDate;
	        if (typeof dateString == 'number') {
		        oDate = new Date(dateString);
	        } else {
		        var dateArr = dateString.split(" ");
		        var dateYMD = dateArr[0].split("-");
		        var year = parseInt(dateYMD[0], 10);
		        var month = parseInt(dateYMD[1], 10) - 1;
		        var date = parseInt(dateYMD[2], 10);
		        var hour = "";
		        var min = "";
		        var sec = "";
		        if (dateArr[1] != null && dateArr[1] != undefined) {
			        var dateHMS = dateArr[1].split(":");
			        hour = parseInt(dateHMS[0], 10);
			        min = parseInt(dateHMS[1], 10);
			        sec = parseInt(dateHMS[2], 10);
		        }
		        if (flag && flag == 1) {// 预约销售品，开始时间只保留年月日
			        oDate = new Date(year, month, date);
		        } else {
			        oDate = new Date(year, month, date, hour, min, sec);
		        }
	        }
	        return oDate;
        },
        getFirstDayAfterPeriod : function() {
	        var today = dojo.global.$appContext$.requestParam.today;
	        // 获取当前系统时间
	        var todayDateType = this.getDateFromString(today, 1);
	        todayDateType.setDate(1);
	        return this.getDateFromString(this.format(todayDateType["setMonth"](todayDateType["getMonth"]()
	                + parseInt(1, 10))));
        },
        getStringFirstDayOFNextMonth : function() {
	        var today = dojo.global.$appContext$.requestParam.today;
	        // 获取当前系统时间
	        var todayDateType = this.getDateFromString(today, 1);
	        todayDateType.setDate(1);
	        return this.format(todayDateType["setMonth"](todayDateType["getMonth"]() + parseInt(1, 10)));
        },
        getPreTimeOfTargetTime : function(targetTime, preDays) {
	        var targetTimeDate = this.getDateFromString(targetTime);
//				        var timeString = Date.UTC(targetTimeDate.getFullYear(), targetTimeDate.getMonth(),
//				                targetTimeDate.getDate(), targetTimeDate.getHours(), targetTimeDate.getMinutes(),
//				                targetTimeDate.getSeconds());
	        var timeString = targetTimeDate.getTime();
	        var preString = parseInt(preDays, 10) * 1000 * 3600 * 24;
	        return this.format(timeString - preString);
        },
        compareDateValue : function(firstDate, secondDate) {
	        // 该方法用来比较两个时间值的大小，返回true，则传入的第一个时间大，返回false，则第二个时间大
	        if (this.getDateFromString(firstDate, true) > this.getDateFromString(secondDate, true)) { return true; }
	        return false;
        }
    }
    
}();
