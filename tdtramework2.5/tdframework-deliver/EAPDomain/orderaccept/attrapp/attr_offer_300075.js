BusCard.define('/orderaccept/attrapp/attr_offer_300075.js',function(_buscard,cardParam){ 
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	//根据销售品的操作类型，判断销售品的属性周期价格的生效时间是否可以修改
	//新装不可以修改
	var uniqueId = "";
	var ifChangeMainFlag = false;
	var selectedMemberProdOfferList = $ac$.selectedMemberProdOfferList;
	if($ac$.selectedMainProdOfferInfoVO.bindType == 2){
		var multipleMainProdOfferWidget =orderaccept.prodofferaccept.util.DomHelper.
							getParentWidget(Me.$("300075"),"unieap.layout.ContentPane");
			uniqueId = multipleMainProdOfferWidget.uniqueId;			
	}else{
		var mainProdOfferWidget = prodOfferAcceptLoader.mainProdOfferWidget;
		if(!!mainProdOfferWidget){
			var prodBasicTRs = dojo.query(".main-product-basic",mainProdOfferWidget.domNode);
			if((!prodBasicTRs)||prodBasicTRs.length ==0){
				return;
			}
			//直接取第一个
			uniqueId = dojo.attr(prodBasicTRs[0],"uniqueId");
		}
	}
	var targetSelectMem = dojo.filter(selectedMemberProdOfferList||[],function(_data){
		return _data.uniqueId == uniqueId;
	});
	var targetSelectMem = dojo.filter(selectedMemberProdOfferList||[],function(_data){
		return _data.uniqueId == uniqueId;
	});
	if(targetSelectMem.length>0){
		if(!!(targetSelectMem[0].offerInstVO)){
			//说明是主销售品变更
			if(targetSelectMem[0].offerInstVO.prodOfferId != targetSelectMem[0].prodOfferId){
				ifChangeMainFlag = true;
			}
		}
	}
	if(ifChangeMainFlag){
		Me.$('300075').value = '2';
		Me.$('300075').disabled = true;
	}else if(targetSelectMem&&targetSelectMem[0]&&targetSelectMem[0].action == "new"){
		Me.$('300075').value = '1';
		Me.$('300075').disabled = true;
	}
	/*
	 * add by yintj@neusoft.com 20120828
	 * 换业务要立即生效
	 * */
	if($ac$&&$ac$.requestParam&&$ac$.requestParam.actionCD==93){
		Me.$('300075').value = '1';
		Me.$('300075').disabled = true;
	}
	
	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
	         * 综合查询页面处理分支
	         * @method
	         */
	        var allInfoQueryPageDispatch = function() {};
	        /**
	         * 二次业务处理分支
	         * @method
	         */
	        var secondBusinessPageDispatch = function() {};
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {};
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});