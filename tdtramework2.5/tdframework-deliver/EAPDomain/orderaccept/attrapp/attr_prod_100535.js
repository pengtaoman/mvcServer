BusCard.define('/orderaccept/attrapp/attr_prod_100535.js', function(_buscard,
		cardParam) {
	
	var prodOfferAcceptPageDispatch = function() {
		var Me = this;
		var parentDom = dijit.getEnclosingWidget(Me.getParent().dom);
		var model = parentDom.getModel();
    	var serviceCardWidgetMap =  prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_" + model.cardParam.uniqueId];
   		var busCardInstance = serviceCardWidgetMap.busCardInstance;
		var userId = busCardInstance.getCardRelationInfo().userId;
		if(((!!$ac$.get("orderChangeFlag")&&$ac$.get("orderChangeFlag")== 1))||userId==0){
			var unshiftNullSelectOption = function(list) {
				return [ {
					name : '\u8bf7\u9009\u62e9',
					id : '',
					ids : ''
				} ].concat(list || []);
			};
			var cityCode=BusCard.$session.homeCity;
			var promotion = Me.$("100535");
			BusCard.$rs(promotion,unshiftNullSelectOption( BusCard.$remote("custValueFacadeBO")
					.getThemeInfo({cityCode :cityCode}).list));
			promotion.value="";
			promotion.onchange = function() {
				var recommonded = Me.$("100537");
				var strategy = Me.$("100536");
				if (promotion.value == "") {
					if (null != recommonded) {
						recommonded.value = "";
						recommonded.disabled = true;
					}
					if (null != strategy) {
						BusCard.$rs(strategy, []);
					}
				} else {
					if (null != strategy) {
						BusCard.$rs(strategy, BusCard.$remote("custValueFacadeBO")
								.getStrategy({themeId:promotion.value}).list);
					}
					if (null != recommonded) {
						recommonded.disabled = false;
						recommonded.onblur = function() {
							if (recommonded.value) {
								var count = BusCard.$remote("prodInstCommFacadeBO")
										.getServiceRelationCount({
											cityCode:cityCode,
											serviceId : recommonded.value,
											ifValid:1
										});
								if (!(count > 0)) {
									recommonded.value = "";
									alert("您输入的号码有误，推介人应为电信在网有效用户!");
									recommonded.focus();
									return;
								}
							}
						};
					}
				}
			};
			promotion.onchange();
		}
		
		
		(function(){
			var parentDom = dijit.getEnclosingWidget(Me.getParent().dom);
			var model = parentDom.getModel();
	    	var serviceCardWidgetMap =  prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_" + model.cardParam.uniqueId];
			if($ac$.get("orderChangeFlag")== 1){
				var selectedMemb = dojo.filter($ac$.get("selectedMemberProdOfferList")||[], function(memb) {
                    return memb.uniqueId == model.cardParam.uniqueId;
                })[0];
                if(!!selectedMemb){
                	var prodItemVO = selectedMemb.prodItemVO;
                	var prodInstAttrList = prodItemVO.prodInstAttrList;
                	var targetAttrVO = BusCard.find(prodInstAttrList||[],function(info){
                		return info.attrId == 100535;
                	}); 
                	if(!!targetAttrVO){
                		if(Me.$('100535')&&Me.$('100535')){
	            			Me.$('100535').value = targetAttrVO.attrValue;
	            			BusCard.$rs(Me.$("100536"), BusCard.$remote("custValueFacadeBO")
							.getStrategy({themeId:targetAttrVO.attrValue}).list);
	            		}
                	}
                }
			}
		})();
		
	};
	
	
	var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	/**
	 * 综合查询页面处理分支
	 * @method
	 */
	var allInfoQueryPageDispatch = function() {
	};
	/**
	 * 二次业务处理分支
	 * @method
	 */
	var secondBusinessPageDispatch = function() {
	};
	/**
	 * 批量页面处理分支
	 * @method
	 */
	var batchPageDispatch = function() {
	};

	//调用具体分支处理逻辑
	return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
