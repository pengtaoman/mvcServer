BusCard.define('/buscardapp/rela/js/displayOneStopCardHandler.js',function(_buscard,cardParam){ 
var Me = this;
var card = this;
//for compatibility purpose
var customerData =function(){
	if(window.customerData){
		return window.customerData;
	}else{
		return dojo.global.$appContext$.get("requestParam").customerData;
	}

}();
var param = "custId="+ customerData.custId ;
var custInfoData = _buscard.doGet(_buscard.path.contextPath + "/prodOfferSaleAjaxAction.do?method=getCustInfo&" + param);
var custData = custInfoData;
Me._onstopFlag_ = (custData.onestopFlag == 1);
					
 if(custData.onestopFlag != 1){
						if(card.$('oneStop')){
							card.$('label_oneStop').style.display="none";
							card.$('oneStop').parentNode.parentNode.style.display="none";
						}
		}

if(Me._onstopFlag_ !== false)
{
	try { 
	var unicoderStr = {"sureBtn":"\u786e\u5b9a"};
	Me.oneStopXml = null;
	Me.oneStopJson = null;
	var aElement =Me.$('oneStop'); 
	var closeEvent = null;
	aElement.onload = function(instance, buscard, info) {
		var subPage = this;
		subPage.parentNode.style.width = "600px";
		subPage.style.overflow = "hidden";
		 var container = document.createElement("div");
		 container.id="oneStopHtml";
		 subPage.appendChild(container);
		 var buttonHtml = document.createElement("input");
		 buttonHtml.setAttribute("type", "button");
		 buttonHtml.setAttribute("name", "sureBtn");
		 buttonHtml.setAttribute("id", "sureBtn");
		 buttonHtml.value= unicoderStr.sureBtn;
		 buttonHtml.className="button_s";
		 buttonHtml.style.marginLeft="300px";
		 subPage.appendChild(buttonHtml);
		 Me.oneStopCustInfoBusCard = BusCard.createInstance({
			level : 4
	    },container,{gType:2,cardId:201});
	    Me.oneStopCustInfoBusCard.init(function(){
	    	closeEvent = Me.$("subpage_close_oneStop").onclick ;
	    	Me.$("subpage_close_oneStop").onclick = Me.closeOneStop;
	    	//初始化订单暂存的值
	    	//this.renderDefaultValue(Me.initTempSaveInfo());
	    }); 
	    BusCard.addEventListener(Me.$('sureBtn'),"click",function(){
		 	Me.getOneStopData();
		 }); 
	};
	
	Me.initTempSaveInfo = function(){
		var tempSaveOneStopInfo = card.serviceInfoNewBuilder.tempOneStopCustInfoVO;
		if(tempSaveOneStopInfo){
			return {
				balanceCity : tempSaveOneStopInfo[0].balanceCity,
				balanceSide : tempSaveOneStopInfo[0].balanceSide,
				circuitNumber : tempSaveOneStopInfo[0].circuitNumber,
				oneStopLevel : tempSaveOneStopInfo[0].oneStopLevel,
				oneStopPoint : tempSaveOneStopInfo[0].oneStopPoint,
				oneStopPointSide : tempSaveOneStopInfo[0].oneStopPointSide,
				oneStopSend : tempSaveOneStopInfo[0].oneStopSend,
				serialNumber : tempSaveOneStopInfo[0].serialNumber
			}
		}
		return null;
	}
	/**
	 * 收集数据
	 */
	aElement.collectData = function(cardInstance, _buscard, cardInfo) {
		Me.oneStopJson = Me.oneStopCustInfoBusCard.getData(function(data){
				data.balanceCity = Me.$("balanceCity").value;
				return data;
			});
		return Me.oneStopJson;
	};
	/**
	 * 转换数据信息,转换成xml串
	 */
	Me.convertOneStopJsonTOXml = function(data){
		 var parts = [];
		if (!data) return false;
		var extendProperty = {};
		var voObj = pageDataOparate.getDomJson("oneStopCustInfoVO");
		for (index in data) {
			if(data[index] != null){
				if (voObj.hasOwnProperty(index)){
					parts.push(pageDataOparate.insertCDATAStr(index, data[index]));
				}else{
					extendProperty[index] = data[index];
				}
			}
		}
		return parts.join("");
	};
	/**
	 * 确定按钮的点击事件
	 */
	Me.getOneStopData = function(){
		Me.oneStopJson = Me.oneStopCustInfoBusCard.getData(function(data){
				data.balanceCity = Me.$("balanceCity").value;
				return data;
			});
		if(Me.oneStopJson == false){
			Me.oneStopJson = null;
			return false;
		}
//		var oneStopMsg = pageDataOparate.insertStr("oneStopCustInfoVO", Me.convertOneStopJsonTOXml(oneStopJson));
//		Me.oneStopXml = oneStopMsg;
		//Me.$("subpage_close_oneStop").onclick();
		closeEvent.apply(this,[]);
	}; 
	Me.closeOneStop = function(){
		if(Me.oneStopCustInfoBusCard.$('serialNumber').value == ""||Me.oneStopCustInfoBusCard.$('serialNumber').value == null){
			Me.oneStopJson = null;
		}
		closeEvent.apply(this,[]);
	};
}
catch (e) {
	alert(e.message);
}
	
}




});
