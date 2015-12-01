
BusCard.define("/orderaccept/attrapp/attr_prod_100401.js", function (_buscard, cardParam) {
	var prodOfferAcceptPageDispatch = function () {
		var Me = this;
		if (!!Me.$("100401")) {
			Me.$("100401").onquery = function () {
				var checkbox = this, _card = arguments[0], _buscard = arguments[1], _p = arguments[2];
				var value = _buscard.util.trim(this.value);
				if (!value) {
					Me.$("100401").value = "";
					alert("\u8bf7\u8f93\u5165\u67e5\u8be2\u5173\u952e\u8bcd");
					this.focus();
					return false;
				}
				if (!!prodOfferAcceptLoader && !!prodOfferAcceptLoader.requestParam) {
					var cityCode = prodOfferAcceptLoader.requestParam.customerData.cityCode;
					var developerDealer = prodOfferAcceptLoader.orderInfoCardWidget.busCardInstance.$("developerDealer").rvalue;
					var dealerId = !!developerDealer?developerDealer:BusCard.$session.acceptDealer;
					var projectList = BusCard.$remote("commDealerAPIBO").doGetProjctCollection(cityCode, dealerId, value);
					if (!!projectList && !!projectList.list) {
						return projectList.list;
					}
				}
			};
			
			(function(){
				if($ac$.get("orderChangeFlag")== 1){
					var parentDom = dijit.getEnclosingWidget(Me.getParent().dom);
					var model = parentDom.getModel();
					 var selectedMemb = dojo.filter($ac$.get("selectedMemberProdOfferList")||[], function(memb) {
                        return memb.uniqueId == model.cardParam.uniqueId;
                    })[0];
                    if(!!selectedMemb){
                    	//获取产品订单项
                    	var prodItemVO = selectedMemb.prodItemVO;
                    	var prodInstAttrList = prodItemVO.prodInstAttrList;
                    	//获取项目的值
                    	var targetAttrVO = BusCard.find(prodInstAttrList||[],function(info){
                    		return info.attrId == 100401;
                    	}); 
                    	if(!!targetAttrVO){
                    		var projectName=BusCard.$remote("commDealerAPIBO").doGetProjectName(targetAttrVO.attrValue);
			      			Me.$("100401").value= projectName.replace(/\"/g, "");
			      			Me.$("100401").rvalue = targetAttrVO.attrValue;
                    	}
                    }
				}
			})();
		}
	};
	var attrUsedPage = window.attrUsedPage || "prodOfferAcceptPage";
	/**
	         * 缁煎悎鏌ヨ椤甸潰澶勭悊鍒嗘敮
	         * @method
	         */
	var allInfoQueryPageDispatch = function () {
	};
	/**
	         * 浜屾涓氬姟澶勭悊鍒嗘敮
	         * @method
	         */
	var secondBusinessPageDispatch = function () {
		var Me = this;
		var cityCode = BusCard.$session.homeCity;
		if (!!Me.$("100401")) {
		    var userInstallInfoVO= BusCard.$remote("prodInstCommFacadeBO").getUserInstallInfo({userId:$("userId").value,attrId:'100401'});
              if(userInstallInfoVO[0]!=undefined){
              var projectName=BusCard.$remote("commDealerAPIBO").doGetProjectName(userInstallInfoVO[0].infoValue);
              Me.$("100401").value=projectName;
		      Me.$("100401").rvalue=userInstallInfoVO[0].infoValue;
		      }
		
			Me.$("100401").onquery = function () {
				var checkbox = this, _card = arguments[0], _buscard = arguments[1], _p = arguments[2];
				var value = _buscard.util.trim(this.value);
				if (!value) {
					alert("\u8bf7\u8f93\u5165\u67e5\u8be2\u5173\u952e\u8bcd");
					this.focus();
					return false;
				}
					
					var projectList = BusCard.$remote("commDealerAPIBO").doGetProjctCollection(cityCode, BusCard.$session.acceptDealer, value);
					if (!!projectList && !!projectList.list) {
						return projectList.list;
					}
			};
		}
		 
		
	};
	/**
	         * 鎵归噺椤甸潰澶勭悊鍒嗘敮
	         * @method
	         */
	var batchPageDispatch = function () {
	};
	      
	        //璋冪敤鍏蜂綋鍒嗘敮澶勭悊閫昏緫
	return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});

