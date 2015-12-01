BusCard.define('/buscardapp/rela/js/moveSpecialDeal.js',function(_buscard,cardParam){ 
 var ConstantsPool = dojo.require("orderaccept.common.js.ConstantsPool");
 var ServingStatusConst = ConstantsPool.load("ServingStatusConst").ServingStatusConst;
var Me = this;//相当于busCardInstanse
var a = arguments[0];
var b = arguments[1];
var oldBranchNo=b.serviceRelation.branchNo
 if(b.serviceRelation){
	Me.oldAddressId=b.serviceRelation.addressId;
	Me.oldAddrDetail=b.serviceRelation.addrDetail;
	if(Me.$('addrId')){
		Me.oldDetailAddrValue=Me.$('addrId').value;
	}
  }
//外移, 不改号不改端口,不改号改端口
//'1', '外移','2', '跨局移改号''3', '不改号不改端口', '4', '不改号改端口','5', '跨局移不改号'

var arr1=[{id:2,name:'\u8de8\u5c40\u79fb\u6539\u53f7'},{id:5,name:'\u8de8\u5c40\u79fb\u4e0d\u6539\u53f7'}];
var arr2=[{id:1,name:'\u5916\u79fb'},{id:3,name:'\u4e0d\u6539\u53f7\u4e0d\u6539\u7aef\u53e3'},{id:4,name:'\u4e0d\u6539\u53f7\u6539\u7aef\u53e3'}];
var prodChgClass = "orderaccept.prodofferaccept.loader.ProductChangeAcceptLoader";
var prodOfferAcceptLoader = dojo.getObject("prodOfferAcceptLoader");
if(!!prodOfferAcceptLoader && prodOfferAcceptLoader.declaredClass == prodChgClass){
	arr1[2] = {id:0,name:"\u4e0d\u79fb\u673a"};
	arr2[3] = {id:0,name:"\u4e0d\u79fb\u673a"};
}
Me.$("ifSpanBureau").disabled = true; 

var doMoveSpecialHandler=function(){
      var element=Me.$("ifSpanBureau");
      var oldSwitchNo;
      var switchNo;
      
       BusCard.each(BusCard.query("[controlFieldName]",$("prodAttrCardContainer")),function(node){
							if(node.id=='60056'){
							  switchNo=node.value;
							}
						  });
						  
      var param={prodInstId:b.serviceRelation.userId,
                 cityCode:b.serviceRelation.cityCode,
                 stateCd:ServingStatusConst.ON_USING,
                 attrId:'60056'
      
      }
      var attrlist=a.$remote("prodInstCommFacadeBO").getProdInstAttrByProperties(param);
      if(attrlist&&attrlist[0]){
        oldSwitchNo=attrlist[0].attrValue;
      }
      
	  if(oldSwitchNo==switchNo){
	            element.length=0;
				for(var i = 0, len = arr2.length; i < len; i++) {
				    var info=arr2[i];
				    var option = document.createElement("OPTION");
					    option.text = info.name;
					    option.value = info.id;
					    element.add(option);
				}		
		}else{
				element.length=0;
				for(var i = 0, len = arr1.length; i < len; i++) {
				    var info=arr1[i];
				    var option = document.createElement("OPTION");
					    option.text = info.name;
					    option.value = info.id;
					    element.add(option);
				}
  
	    }
	    
	  for(var i=0, len=element.length;i<len;i++){
           if(Me.status==element.options[i].value && Me.status != "0"){
             element.options[i].selected=true; 
             break;
           }
        }
	    
    Me.$("ifSpanBureau").disabled = false; 
    var spanBureau = Me.$('ifSpanBureau').value;
	if(spanBureau=="1"){
		Me.setDisabled(Me.$('belongCode'),true);
		Me.setDisabled(Me.$('bureauId'),true);
		Me.setDisabled(Me.$('branchNo'),true);
		Me.setDisabled(Me.$('serviceId'),true);
		Me.setDisabled(Me.$('link_serviceId'),true);
        Me.setDisabled(Me.$('addrId'),false);
	
	    Me.setDisabled(Me.$('link_addrId'),false);
		Me.setDisabled(Me.$('addrDetail'),false);
		Me.setCanNull("serviceId");
        Me.setCantNull("contcatPhone");
	}else if(spanBureau=="2"){
		Me.$('belongCode').disabled =false;
		Me.setDisabled(Me.$('bureauId'),false);
		Me.setDisabled(Me.$('branchNo'),false);
		
		Me.setDisabled(Me.$('serviceId'),false);
		
		Me.setDisabled(Me.$('link_serviceId'),false);
	    if(Me.$('serviceId')){
	    Me.$('serviceId').readOnly=false;
	    }
		if(Me.$('addrId')){
			Me.$('addrId').disabled=false;
		}
		Me.$('link_addrId').disabled=false;
		Me.$('addrDetail').disabled=false;
        Me.setCantNull("serviceId");
        Me.setCantNull("contcatPhone");
        
         
	}else if (spanBureau=="5"){
		Me.$('belongCode').disabled =false;
		Me.setDisabled(Me.$('bureauId'),false);
		Me.setDisabled(Me.$('branchNo'),false);
		Me.setDisabled(Me.$('serviceId'),true);
		Me.setDisabled(Me.$('link_serviceId'),true);
		if(Me.$('addrId')){
			Me.$('addrId').disabled=false;
		}
		Me.$('link_addrId').disabled=false;
		Me.$('addrDetail').disabled=true;
		Me.setCanNull("serviceId");
		Me.setCanNull("contcatPhone");
		
	}else{
		Me.$('belongCode').disabled =true;
		Me.setDisabled(Me.$('bureauId'),true);
		Me.setDisabled(Me.$('branchNo'),true);
		Me.setDisabled(Me.$('serviceId'),true);
		Me.setDisabled(Me.$('link_serviceId'),true);
		if(Me.$('addrId')){
			Me.$('addrId').disabled=false;
		}
		Me.$('link_addrId').disabled=false;
		Me.$('addrDetail').disabled=true;
		Me.setCanNull("serviceId");
		Me.setCanNull("contcatPhone");
		
	}
       

}  
  
  
  
Me.doMoveSpecialHandler = doMoveSpecialHandler;





});