BusCard.define('/orderaccept/attrapp/attr_offer_22.js',function(_buscard,cardParam){ 
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;
	Me.$("22").onblur = function(){
		var currentValue = Me.$("22").value;
		if(currentValue==""){
			return;
		}
		var parentDom = orderaccept.prodofferaccept.util.DomHelper.getParentWidget(Me.$("22"),"orderaccept.custom.TooltipDialog");
		var rowData = parentDom.rowData;
		var attrList=rowData.subProdOfferInfo.attrList;
		for (var i=0;i<attrList.size();i++){
		 	if(attrList[i].attrCd=="22"){
		 		var valueFrom=attrList[i].valueFrom;
		 		var valueTo=attrList[i].valueTo;
		 		var  price=Me.$("22").value;
		 		//�ж��ǲ��Ǹ�����
				if(/^[0-9]*$/i.test(price)){
		       		 if(parseFloat(price)<parseFloat(valueFrom)||parseFloat(price)>parseFloat(valueTo)){
		       		 	alert("\u5468\u4ef7\u5e94\u8be5\u5728"+valueFrom+"\u548c"+valueTo+"\u4e4b\u95f4");
		       		 	Me.$("22").value="";
		       		 }			
				 }else{
				 		alert("\u5468\u4ef7\u5e94\u8be5\u5728"+valueFrom+"\u548c"+valueTo+"\u4e4b\u95f4");
		       		 	Me.$("22").value="";
				 }
			}
		}
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
