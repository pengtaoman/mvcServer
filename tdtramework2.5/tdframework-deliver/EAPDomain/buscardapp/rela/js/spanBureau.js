BusCard.define('/buscardapp/rela/js/spanBureau.js',function(_buscard,cardParam){ 
var Me = this;
var a = arguments[0];
var c = arguments[1];
var e = c.serviceRelation.cityCode;
var f = c.serviceRelation.subscriberId;
var g = c.serviceRelation.belongCode;
Me.status=Me.$('ifSpanBureau').value;//用来记录当前移机方式值的状态
var serviceParamBO = a.$remote("serviceParamBO");
Me.setDisabled=function(arg,info){
	if(arg){
		arg.disabled=info;
	}
};
Me.setDisabled(Me.$('serviceId'),true);
Me.setDisabled(Me.$('link_serviceId'),true);


if(c.serviceRelation){
	Me.oldAddressId=c.serviceRelation.addressId;
	Me.oldAddrDetail=c.serviceRelation.addrDetail;
	if(Me.$('addrId')){
		Me.oldDetailAddrValue=Me.$('addrId').value;
	}
	if(Me.$('addrDetail')){
	Me.$('addrDetail').value=Me.oldAddrDetail;
	}
	//if(Me.$('serviceId')){
	 //   Me.$('serviceId').value=c.serviceRelation.serviceId;
	//}
	
}
Me.$('ifSpanBureau').onchange = function(){
	Me.ifSpanBureauChange();
	
};


Me.ifSpanBureauChange=function(){
//变更移机方式时清除号码及号码资源实例
	if(Me.$('serviceId')){
		Me.$('serviceId').value="";
	}
	if(Me.$('resInstId')){
		Me.$('resInstId').value="";
	}
	
	var spanBureau = Me.$('ifSpanBureau').value;
	if(spanBureau=="0"){
		Me.setDisabled(Me.$('belongCode'),true);
		Me.setDisabled(Me.$('bureauId'),true);
		Me.setDisabled(Me.$('branchNo'),true);
		Me.setDisabled(Me.$('serviceId'),true);
        Me.setDisabled(Me.$('addrId'),false);
	    Me.setDisabled(Me.$('link_addrId'),false);
		Me.setCanNull("serviceId");
        Me.setCantNull("contcatPhone");
		 //给变量重新赋值：
		// alert(Me.$('belongCode').value!=c.serviceRelation.belongCode);
		 if (Me.$('belongCode').value!=g){
		    Me.$('belongCode').value=g;
		   	var cdata = serviceParamBO.getBureauId(4, g, e);
			if (cdata && cdata.list) a.$rs(Me.$('bureauId'), cdata.list);
			var branchData = serviceParamBO.getBureauId(5, g, e);
			if (branchData && branchData.list) a.$rs(Me.$('branchNo'), branchData.list);{
				if(Me.$("serviceId"))
				Me.$("serviceId").value="";
			}
		}
		if(Me.$('addrId')){
			if((Me.$('addrId')&&Me.oldAddressId&&(Me.oldAddressId!=Me.$('addrId').value))||(Me.$('addrDetail')&&Me.oldAddrDetail&&(Me.$('addrDetail').value!=Me.oldAddrDetail))){
				Me.$('addrId').value=Me.oldDetailAddrValue;
				Me.$('addrId').rvalue=Me.oldAddressId;
				Me.$('addrDetail').value=Me.oldAddrDetail;
				
			}
		}
	}else if(spanBureau=="1" ){
		Me.setDisabled(Me.$('belongCode'),true);
		Me.setDisabled(Me.$('bureauId'),true);
		Me.setDisabled(Me.$('branchNo'),true);
		Me.setDisabled(Me.$('serviceId'),true);
        Me.setDisabled(Me.$('addrId'),false);
	    Me.setDisabled(Me.$('link_addrId'),false);
		Me.setCanNull("serviceId");
        Me.setCantNull("contcatPhone");
		 //给变量重新赋值：
		// alert(Me.$('belongCode').value!=c.serviceRelation.belongCode);
		 if (Me.$('belongCode').value!=g){
		    Me.$('belongCode').value=g;
		   	var cdata = serviceParamBO.getBureauId(4, g, e);
			if (cdata && cdata.list) a.$rs(Me.$('bureauId'), cdata.list);
			var branchData = serviceParamBO.getBureauId(5, g, e);
			if (branchData && branchData.list) a.$rs(Me.$('branchNo'), branchData.list);{
				if(Me.$("serviceId"))
				Me.$("serviceId").value="";
			}
		}
	}else if(spanBureau=="2"){
	    Me.setDisabled(Me.$('belongCode'),false);
		Me.setDisabled(Me.$('bureauId'),false);
		Me.setDisabled(Me.$('branchNo'),false);
		Me.setDisabled(Me.$('serviceId'),false);
		Me.setDisabled(Me.$('link_serviceId'),false);
	    if(Me.$('serviceId')){
	    Me.$('serviceId').readOnly=false;
	    }
	    Me.setDisabled(Me.$('addrId'),false);
		Me.setDisabled(Me.$('link_addrId'),false);
        Me.setCantNull("serviceId");
        Me.setCantNull("contcatPhone");
        if(Me.$('addrId')){
	        if((Me.$('addrId')&&Me.oldAddressId&&(Me.oldAddressId!=Me.$('addrId').value))||(Me.$('addrDetail')&&Me.oldAddrDetail&&(Me.$('addrDetail').value!=Me.oldAddrDetail))){
				Me.$('addrId').value=Me.oldDetailAddrValue;
				Me.$('addrId').rvalue=Me.oldAddressId;
				Me.$('addrDetail').value=Me.oldAddrDetail;
				
			}
        }  
	}else if (spanBureau=="5"){
	    Me.setDisabled(Me.$('belongCode'),false);
		Me.setDisabled(Me.$('bureauId'),false);
		Me.setDisabled(Me.$('branchNo'),false);
		Me.setDisabled(Me.$('serviceId'),true);
		Me.setDisabled(Me.$('link_serviceId'),true);
		Me.setDisabled(Me.$('addrId'),false);
		Me.setDisabled(Me.$('link_addrId'),false);
		Me.setCanNull("serviceId");
		Me.setCanNull("contcatPhone");
		if(Me.$('addrId')){
			if((Me.$('addrId')&&Me.oldAddressId&&(Me.oldAddressId!=Me.$('addrId').value))||(Me.$('addrDetail')&&Me.oldAddrDetail&&(Me.$('addrDetail').value!=Me.oldAddrDetail))){
				Me.$('addrId').value=Me.oldDetailAddrValue;
				Me.$('addrId').rvalue=Me.oldAddressId;
				Me.$('addrDetail').value=Me.oldAddrDetail;
				
			}
		 }
	}else{
		Me.setDisabled(Me.$('belongCode'),true);
		Me.setDisabled(Me.$('bureauId'),true);
		Me.setDisabled(Me.$('branchNo'),true);
		Me.setDisabled(Me.$('serviceId'),true);
		Me.setDisabled(Me.$('link_serviceId'),true);
		Me.setDisabled(Me.$('addrId'),false);
		Me.setDisabled(Me.$('link_addrId'),false);
		Me.setCanNull("serviceId");
		Me.setCanNull("contcatPhone");
		if(Me.$('addrId')){
			if((Me.$('addrId')&&Me.oldAddressId&&(Me.oldAddressId!=Me.$('addrId').value))||(Me.$('addrDetail')&&Me.oldAddrDetail&&(Me.$('addrDetail').value!=Me.oldAddrDetail))){
				Me.$('addrId').value=Me.oldDetailAddrValue;
				Me.$('addrId').rvalue=Me.oldAddressId;
				Me.$('addrDetail').value=Me.oldAddrDetail;
				
			}
	   }
	}

    Me.status=Me.$('ifSpanBureau').value;

};







	Me.setCantNull=function(id){

		var labelObject=Me.$("label_"+id);
		if(Me.$(id)){
			Me.$(id).isNull=0;
		}
		if(labelObject){
			var text=labelObject.outerText;
			var txt='<span class="buscard-label"><span class="formRequested">*</span>'+Me.trim(text,"*")+'</span>';
			labelObject.innerHTML=txt;
		}
	};
	Me.setCanNull=function(id){
		var labelObject=Me.$("label_"+id);
		if(Me.$(id)){
			Me.$(id).isNull=1;
		}
		if(labelObject){
			var text=labelObject.outerText;
			var txt='<span class="buscard-label">'+Me.trim(text,"*")+'</span>';
			labelObject.innerHTML=txt;
		}
	};
	
	Me.trim=function(str, wh){
			if(typeof(str)!="string"){ return str; }
			if(!str.length){ return str; }
			return str.replace("*", "");
	};

	if(Me.$("contcatPhone")&&c.serviceRelation.contcatPhone!=undefined){
	    Me.$("contcatPhone").value=c.serviceRelation.contcatPhone;
	}
	var effectDate=dojo.query("[id='effectDate']",$("viaPersonInfoCardContainer"))[0];
	
	if(effectDate){
	 effectDate.disabled=true;
	}

	Me.$('ifSpanBureau').onchange();
	//获取产品大类,NGN产品使用区域，母局，子局为只读
 
  
    if(c.serviceRelation.serviceKind==14){
        Me.setDisabled(Me.$('belongCode'),true);
		Me.setDisabled(Me.$('bureauId'),true);
		Me.setDisabled(Me.$('branchNo'),true);
    }
});
