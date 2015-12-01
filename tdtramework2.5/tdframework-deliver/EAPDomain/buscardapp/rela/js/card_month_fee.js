/*
*chuaizhw 
*20121126
*REQ2011080583075_XQ-20110802-0033
*/
BusCard.define('/buscardapp/rela/js/card_month_fee.js',function(_buscard,cardParam){ 
	var Me = this;//busCard实例为Me
	var a = arguments[0];
    var b = arguments[1];
	var serviceRealtion = b.serviceRelation;
	var executeRequest = _buscard.executeRequest;
	var offerInstVO=a.$remote('prodInstCommFacadeBO').getOfferInstByProductId(serviceRealtion.userId);
	//周期生效时间
	if(Me.$("300075")){
 
		    var param="cityCode="+serviceRealtion.cityCode+"&serviceKind="+serviceRealtion.serviceKind;
	    	var switch3008 =("prodOfferSaleAjaxAction", "getSwitchForMonthFeeActive", param);
		    if(switch3008!=-1){
		          var arr=switch3008.split("-");
		          var element=Me.$("300075").options;
			          element.length=0;
			      var option = document.createElement("OPTION");
		              option.text = "本周期生效";
		              option.value =0;
		              element.add(option);
		          for(var i=0;i<arr.length;i++){
		              option = document.createElement("OPTION");
		              option.text = "延迟"+i+1+"个周期生效";
		              option.value =i+1;
			          element.add(option);
		          }
		   }
		   // var offerInstAttrList=BusCard.$remote("prodInstCommFacadeBO").getOfferInstAttrByProperties({prodOfferInstId:offerInstVO.prodOfferInstId,attrId:"300075"});
		   //if(offerInstAttrList.length>0){
		   //   Me.$("300075").value=offerInstAttrList[0].attrValue;
		   //}
	}
//周价
	Me.$("300003").value = parseFloat(Me.$("300003").value,10);
	var offerInstAttrList=BusCard.$remote("prodInstCommFacadeBO").getOfferInstAttrByProperties({prodOfferInstId:offerInstVO.prodOfferInstId,attrId:"300003",statusCd:'1000',cityCode:serviceRealtion.cityCode});
	if(offerInstAttrList){
		if(offerInstAttrList.length>0){
			Me.$("300003").value=parseFloat(offerInstAttrList[0].attrValue+"")/100;
		}
	}
//周价的触发事件	
	Me.$("300003").onblur = function(){
		var currentValue = Me.$("300003").value;
		if(currentValue==""){
			return;
		}
		if(!/^\d+(\.\d+)?$/.test(currentValue)){
			orderaccept.common.dialog.MessageBox.alert({
				message:"请输入正确的价格！"
			});
			Me.$("300003").value="";
			return false;
		}
		var userTypeValue;
		BusCard.each(BusCard.query("[controlFieldName]",$("prodAttrCardContainer")),function(node){
							if(node.id=='300000'){
							   userTypeValue=node.value;
							}
						});
		var param="prodInstId="+serviceRealtion.userId+"&productId="+b.productId+"&attrId=300000"+"&monthFeeValue="+Me.$("300003").value+"&userTypeValue="+userTypeValue;
	    var result=executeRequest("secondAcceptAjaxAction", "ifChangeMonthFee", param);
	     var arr=result.split("~");
	     if(arr[0]==0){
	        return true;
	     }else{
	        alert(arr[1]);
	        Me.$("300003").value="";
	        return false;
	     }
        
       
	
	 }
});