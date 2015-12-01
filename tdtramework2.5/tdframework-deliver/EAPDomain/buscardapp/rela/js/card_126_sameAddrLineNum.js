BusCard.define('/buscardapp/rela/js/card_126_sameAddrLineNum.js',function(_buscard,cardParam){ 
try { 
	var unicoder = {
	//"sameLine":"\u5171\u7ebf\u53f7\u7801",
	"sameAddr":"\u540c\u5740\u53f7\u7801",
	"sameOffer":"\u7ec4\u5408\u53f7\u7801"};
	var Me = this;
	 Me._sameAddrList = [];
	 Me._sameOfferList = [];
	//不应该显示的产品编码
	Me.$('sameAddrLineNum').onload = function(instance, buscard, info) {
	var data = BusCard.$remote("prodInstCommFacadeBO").querySamelineOrAddrInfoById(info.serviceRelation.userId,info.serviceRelation.productId,info.serviceRelation.serviceId);
		var tpParam = {};
		if (data && data.length != 0) {
			//var _sameAddrList = [];
			// _sameLineList = [];
			BusCard.util.each(data, function(item) {
						//if (item.relationType == 109998)
							Me._sameAddrList.push({
										userId : item.userId,
										productId:item.productId,
				 						serviceId : item.serviceId,
										serviceName : item.serviceName,
										relType : item.relationType,
										statusFlag : item.statusFlag
									});
						/*else if (item.relationType == 109999) _sameAddrList.push({
									userId : item.userId,
									productId:item.productId,
									serviceId : item.serviceId,
									serviceName : item.serviceName,
									relType : item.relationType,
									statusFlag : item.statusFlag
								});*/
					});
			//tpParam.sameLineList = _sameLineList;
			tpParam.sameAddrList =Me._sameAddrList;

		}
		//add by chuaizhw 20120416 FUN-ORDER-综合订单受理-0023 移机 start
		var dataOffer = BusCard.$remote("prodInstCommFacadeBO").queryRelaInstByProdInstInfo($("userId").value);
		if (dataOffer && dataOffer.length != 0) {
			//var _sameOfferList = [];
			BusCard.util.each(dataOffer, function(item) {
			  
				     if(item.userId!=$("userId").value)	{	
				    	Me._sameOfferList.push({
							userId : item.userId,
							productId:item.productId,
							serviceId : item.serviceId,
							serviceName : item.productName,
							relType : item.relationType,
							statusFlag : item.statusFlag,
							addFlag : item.addFlag
						});
				   }
			});
			tpParam.sameOfferList = Me._sameOfferList;
		}
		//add by chuaizhw 20120416 FUN-ORDER-综合订单受理-0023 移机 end
		
		var tp = "<fieldset style='margin:10px'><legend>"
				+ unicoder.sameAddr
				+ "</legend>\
				         		              <tp:for ds=sameAddrList>\
				         		                <input type='checkbox' id='same-addr-#{serviceId}'  productId='#{productId}' id='same-addr-#{serviceId}'  userId='#{userId}' relType='#{relType}' serviceId='#{serviceId}' statusFlag='#{statusFlag}' />\
                                               <span>#{serviceName}-#{serviceId}</span>\
                                             </tp:for>\
                                         </fieldset>\
                                         ";
                                         /*<fieldset  style='margin:10px'><legend>"
				+ unicoder.sameLine
				+ "</legend>\
                                         		<tp:for ds=sameLineList>\
                                         			   <input type='checkbox' id='same-line-#{serviceId}'  productId='#{productId}' id='same-line-#{serviceId}'  userId='#{userId}' relType='#{relType}' serviceId='#{serviceId}'  statusFlag='#{statusFlag}' />\
                                                      <span>#{serviceName}-#{serviceId}</span>\
                                                  </tp:for>\
                                          </fieldset>\
                                      "; */
          //add by chuaizhw 20120416 FUN-ORDER-综合订单受理-0023 移机 start                            
           if (dataOffer && dataOffer.length > 1) {        
          		tp = tp + "<fieldset  style='margin:10px'><legend>"                                      
                + unicoder.sameOffer
				+ "</legend>\
						                   		<tp:for ds=sameOfferList>\
						                   			   <input type='checkbox' id='same-offer-#{serviceId}'  productId='#{productId}' id='same-offer-#{serviceId}'  userId='#{userId}' relType='#{relType}' serviceId='#{serviceId}'  statusFlag='#{statusFlag}' />\
						                                <span>#{serviceName}-#{serviceId}</span>\
						                            </tp:for>\
						                    </fieldset>\
                						"; 
          }
         //add by chuaizhw 20120416 FUN-ORDER-综合订单受理-0023 移机 end
        
		this.innerHTML = buscard.Template.create(tp).apply(tpParam);
	     if(cardList.length>1){
	        Me.$('sameAddrLineNum').disabled=true;
	        var wrapperElem=Me.$('subpage_wrapper_sameAddrLineNum'); 
	        wrapperElem.parentNode.style.zIndex = 0;
			BusCard.fx.hidden(wrapperElem, 150, 1);
			//给标准地址增加事件
            /**var linkAddrIdFirstElem=cardList[0].dom.document.getElementById("link_addrId");
               var addrIdFirstElem=cardList[0].dom.document.getElementById("addrId");
               BusCard.addEventListener(linkAddrIdFirstElem, 'onclick', function() {
   		       for(var i=1; i<cardList.length;i++){
			     cardList[i].dom.document.getElementById("addrId").value=addrIdFirstElem.value;
			     cardList[i].dom.document.getElementById("addrId").rvalue=addrIdFirstElem.rvalue;
			    }
               });**/
	        }		
		//add-by-liurong-0606-beg
		Me.$('subpage_wrapper_sameAddrLineNum').style.overflow= 'hidden';
		var clearF = window.setInterval(function(){
			if(Me.isLoaded()){
				window.clearInterval(clearF);		
				var flag = BusCard.$remote("secondAcceptCommBO").getBusinessRelaInfo(info.serviceRelation.cityCode,info.serviceOfferId,info.userId,info.serviceRelation.serviceId,info.productId);
				if(flag.replace(/"/g,"")=="have"){
					if(confirm("\u5b58\u5728\u540c\u5740\u5171\u7ebf\u53f7\u7801\u662f\u5426\u4e00\u8d77\u64cd\u4f5c!")){
						Me.$('sameAddrLineNum').onclick();
						
					}
				}
				
						
			}		
		},20);
		 //add-by-liurong-0606-end
		Me.onClickForCheckBoxList(instance, buscard, info);
		Me.disableCheckBoxList();
		Me.bindAddrIdOnClick();
		
	};
	
	

	Me.bindAddrIdOnClick=function(){
		   BusCard.addEventListener(Me.$("addrId"),"propertychange",function(){
		   		var evt = window.event||arguments[0];
		   		var currentNode = evt.srcElement;
		   		var firstAddrId=BusCard.$("addrId",$("container"));
		   		var pName = evt.propertyName;
		   			if(!window.hasChangeAddrIdFlag&&pName=='rvalue'){
		   			   // if(currentNode==firstAddrId){
		   			   //  window.hasChangeAddrIdFlag = false;
		   			   // }else{
		   				window.hasChangeAddrIdFlag = true;
		   				//}
		   				BusCard.each(BusCard.query("[id=addrId]",document.body),function(node){
		   					if(node!==currentNode){
		   					 node.value = currentNode.value;
		   					 node.rvalue = currentNode.rvalue;
		   				   }
		   				});
		   				
		   				BusCard.each(BusCard.query("[id=addrDetail]",document.body),function(node){
		   					if(node!==currentNode){
		   					 node.value = currentNode.value;
		   				   }
		   				});		   				
		   			}		   
		   });
	   
	};
	
	
	
	
	
	Me.disableCheckBoxList=function(){
	 var arrResult=[];
	   for(var i=0;i<Me._sameOfferList.length;i++){
	     for(var j=0;j<Me._sameAddrList.length;j++){
	       if(Me._sameOfferList[i].serviceId==Me._sameAddrList[j].serviceId){
	           arrResult.push(Me._sameOfferList[i].serviceId);
	       }
	     }
	    var count1=BusCard.$remote("serviceParamBO").ifCanMove(Me._sameOfferList[i].productId);
	    var count=BusCard.toJson(count1);
	       if(count==0){
	        arrResult.push(Me._sameOfferList[i].serviceId);
	         /* _buscard.util.each(arrResult,function(serviceId){
	             
	             if(serviceId!=Me._sameOfferList[i].serviceId){
	               arrResult.push(Me._sameOfferList[i].serviceId);
	             }
	          
	          })*/
	      }
	     
	   }
	   for(var i=0;i<arrResult.length;i++){
	       var name="same-offer-"+arrResult[i];
	       if(!$(name).disabled){
	         $(name).disabled=true;
	       }
	   }
	};

	
	
	
	
	
	
	Me.onClickForCheckBoxList=function(cardInstance, _buscard, cardInfo){
	 // var checkboxList =$("container").childNodes;
	 var checkboxList =this.dom.getElementsByTagName("input");
	    _buscard.util.each(checkboxList, function(dom) {
					if (dom.type && dom.type.toUpperCase() == 'CHECKBOX') {
						dom.onclick=function(){
						if(dom.checked){
						  if(Me.getBindCardInfo(dom,cardInfo,_buscard,cardInstance)){
						     Me.getBindCardInfo(dom,cardInfo,_buscard,cardInstance)();
						  }
						 }else{
						    Me.cancleDiv("container_",dom.userId||dom.getAttribute("userId"));
						    Me.cancleDiv("prodAttrCardContainer_",dom.userId||dom.getAttribute("userId"));
						  }
						} 
					}
				});
				
	
            
	  };
	  
	Me.getBindCardInfo=function(dom,cardInfo,_buscard,cardInstance){
	    var serviceRelationVO=BusCard.$remote("secondAcceptCommBO").getBindServiceInfoAll(cardInfo.cityCode,dom.userId||dom.getAttribute("userId"));       
	    var data = {};
	      data.actionCD=null;
	      data.areaId=cardInfo.areaId;
	      data.cityCode=cardInfo.cityCode;
	      data.custOrderId=cardInfo.custOrderId;
	      data.operLevel=cardInfo.operLevel;
	      data.productId=dom.productId||dom.getAttribute("productId");
	      data.serviceOfferId=cardInfo.serviceOfferId;
	      data.serviceRelation=serviceRelationVO; 
	      data.userId=dom.userId||dom.getAttribute("userId");
	    //卡片信息
	    var newCardDivId=Me.createDiv("container_",dom.userId||dom.getAttribute("userId"));
	    var parentNode=Me.getParentNode();
 	        parentNode.insertBefore(newCardDivId,$("viaPersonInfoCardContainer"));
	    var card1 = BusCard.createInstance(data, BusCard.util.$(newCardDivId.id));
		    card1.init();
		    cardList.push(card1);
		 //产品信息
		  if(!$("prodAttrCardContainer_"+dom.userId||dom.getAttribute("userId"))){
		     var newProdDivId=Me.createDiv("prodAttrCardContainer_",dom.userId||dom.getAttribute("userId"));
		       parentNode.insertBefore(newProdDivId,$("viaPersonInfoCardContainer"));
     	       Me.initProdAttrWidget(newProdDivId.id,dom);
		     }
		
	};  
	Me.createDiv=function(name,id){
	 	var div=document.createElement("div");
 	    div.id=name+id;   
 	    return div;
      };
    Me.getParentNode=function(){
         return BusCard.find(document.body.getElementsByTagName("div"),function(node){
 	    	return (/card\-region/.test(node.className));
 	       });
     };      
      
   Me.cancleDiv=function(name,id){
      var divId=$(name+id);
      if(divId){
 	    Me.getParentNode().removeChild(divId);
 	  }
   };
   Me.$("sameAddrLineNum").collectData = function(cardInstance, _buscard, cardInfo) {
		var data = [];
		var checkboxList = this.getElementsByTagName("input");
		_buscard.util.each(checkboxList, function(dom) {
					if (dom.type && dom.type.toUpperCase() == 'CHECKBOX' && dom.checked) {
						var obj = {};
						obj.relType = dom.relType||dom.getAttribute("relType");
						obj.productId = dom.productId||dom.getAttribute("productId");
						obj.serviceId = dom.serviceId||dom.getAttribute("serviceId");
						obj.userId = dom.userId||dom.getAttribute("userId");
						obj.statusFlag = dom.statusFlag||dom.getAttribute("statusFlag");
						data.push(obj);
					}
				});
		return data;

	};
   Me.initProdAttrWidget=function(id,dom){
            dojo.require("unieap.layout.TitlePane");
			dojo.require("orderaccept.prodofferaccept.util");
			dojo.require("orderaccept.prodofferaccept.widget.attrcard.ProductAttrCardWidgetForSecond");
			var pane = new unieap.layout.TitlePane({
				        title : '\u4ea7\u54c1\u5c5e\u6027\u8868\u683c'
			        });
			dojo.place(pane.domNode,$(id), "first");
			var sf = orderaccept.prodofferaccept.util.ServiceFactory;
			sf.getService("url:orderDetailAction.do?method=getProductInfo&productId="+(dom.productId||dom.getAttribute("productId"))+"&userId="+dom.userId||dom.getAttribute("userId"),
						function(
			                productInfoVO) {
				        attrCardWidget = new orderaccept.prodofferaccept.widget.attrcard.ProductAttrCardWidgetForSecond(
				                {
					                productInfoVO : productInfoVO.productInfoVO,
					                prodInstVO : productInfoVO.prodInstVO,
					                prodOfferInfoVO : null
				                });
				        attrCardWidget.renderCard(pane.containerNode, "last");
				        
				        //add by chuaizhw 移机增加 20120419 start
					     BusCard.each(BusCard.query("[controlFieldName]",attrCardWidget.getCard().dom),function(node){
									node.disabled = true;
									}); 
						 //add by chuaizhw 移机增加 20120419 end   
				        
			        });  
			
			
   };
 

}
catch (e) {
	alert(e.message);
}
});
