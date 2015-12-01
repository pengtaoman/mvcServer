BusCard.define('/orderaccept/attrapp/attr_prod_100862.js', function(_buscard,
		cardParam) {
	
	var prodOfferAcceptPageDispatch = function() {
		var Me = this;
		if(Me.$("100861")){
			var belongCode = prodOfferAcceptLoader.getBelongCode();
			var commDealerAPIBO = BusCard.$remote("commDealerAPIBO");
			var businessQueryBO = BusCard.$remote("businessQueryBO");
			var data = commDealerAPIBO.doGetExtentInfo(belongCode);
			if(data && data.list){
				BusCard.$rs(Me.$('100861'), data.list||[]);
			}
			
			Me.$('100861').onchange = function(){
				var targetAttrValue = Me.$("100861").value;
				if(targetAttrValue==""){
					return ;
				}
		     	try {
					var resultData = commDealerAPIBO.doGetRetailInfo(BusCard.$session.cityCode,targetAttrValue);
					if (resultData && resultData.list && Me.$('100862')){
						BusCard.$rs(Me.$('100862'), resultData.list||[]);
					}
				}
				catch (e) {
					if (window.console && window.console.warn) {
						window.console.warn("warn in /orderaccept/attrapp/attr_prod_100862.js:" + e.message);
					}
				} 
			}
			
			Me.$('100861').onchange();
		}
		
		(function(){
			var parentDom = dijit.getEnclosingWidget(Me.getParent().dom);
			var model = parentDom.getModel();
	    	var serviceCardWidgetMap =  prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_" + model.cardParam.uniqueId];
	   		var busCardInstance = serviceCardWidgetMap.busCardInstance;
			var userId = busCardInstance.getCardRelationInfo().userId;
			if($ac$.get("orderChangeFlag")== 1){
				var selectedMemb = dojo.filter($ac$.get("selectedMemberProdOfferList")||[], function(memb) {
                    return memb.uniqueId == model.cardParam.uniqueId;
                })[0];
                if(!!selectedMemb){
                	//��ȡ��Ʒ������
                	var prodItemVO = selectedMemb.prodItemVO;
                	var prodInstAttrList = prodItemVO.prodInstAttrList;
                	//��ȡ����������ʽ��ֵ
                	var targetAttrVO = BusCard.find(prodInstAttrList||[],function(info){
                		return info.attrId == 100862;
                	}); 
                	if(!!targetAttrVO){
                		if(Me.$('100861')&&Me.$('100862')){
                			Me.$('100862').value = targetAttrVO.attrValue;
	                		//TODO �������۵���Ϣ��ȡ������Ϣ
	                		var dataResult = businessQueryBO.doGetRetailExtent(BusCard.$session.cityCode,targetAttrVO.attrValue);
	                		Me.$('100861').value = dataResult['extent_id'];
                		}
                	}
                }
			}else{
				var selectedMemb = dojo.filter($ac$.get("selectedMemberProdOfferList")||[], function(memb) {
	                return memb.uniqueId == model.cardParam.uniqueId;
	            })[0];
	            if(!!selectedMemb){
	            	var prodInstVO = selectedMemb.prodInstVO;
	            	if(!!prodInstVO){
	            		var prodInstAttrList = prodInstVO.prodInstAttrList;
	                	//��ȡ����������ʽ��ֵ
	                	var targetAttrVO = BusCard.find(prodInstAttrList||[],function(info){
	                		return info.attrId == 100862;
	                	}); 
	                	if(!!targetAttrVO){
	                		if(Me.$('100861')&&Me.$('100862')){
	                			Me.$('100862').value = targetAttrVO.attrValue;
		                		//�������۵���Ϣ��ȡ������Ϣ
		                		var dataResult = businessQueryBO.doGetRetailExtent(BusCard.$session.cityCode,targetAttrVO.attrValue);
	                			Me.$('100861').value = dataResult['extent_id'];
	                		}
	                	}
	            	}
	            }
			}
		})();
		
		
        
	};
	
	
	var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	/**
	 * �ۺϲ�ѯҳ�洦���֧
	 * @method
	 */
	var allInfoQueryPageDispatch = function() {
		var prodInstVO = cardParam.prodInstVO;
    	var prodInstAttrList = prodInstVO.prodInstAttrList;
	    var userId=prodInstVO.prodInstId;
	    var commDealerAPIBO = BusCard.$remote("commDealerAPIBO");
	    var businessQueryBO = BusCard.$remote("businessQueryBO");
	    //ȡb.serviceRelation.belongCode
	    var serviceRela=BusCard.$remote("serviceRelationDAO").query({userId:userId,ifValue:1});
	    var data = commDealerAPIBO.doGetExtentInfo(serviceRela.belongCode);
	    //�������۵���Ϣ��ȡ������Ϣ
	    var targetAttrVO = prodInstAttrList.find(function(inst) {
	          return inst.attrId == 100862;
	      });
	    if(targetAttrVO){
		  var dataResult = businessQueryBO.doGetRetailExtent(prodInstVO.cityCode,targetAttrVO.attrValue);
	      var extemtIdvalue = dataResult['extent_id']; 
	      var list = commDealerAPIBO.doGetRetailInfo(prodInstVO.cityCode,extemtIdvalue).list;
    	  var attrValueName = list.find(function(retailInfo){
    		  return retailInfo.id==targetAttrVO.attrValue;
    	  });
    	  $('100862').innerHTML=attrValueName.name;
	    }
	};
	/**
	 * ����ҵ�����֧
	 * @method
	 */
	var secondBusinessPageDispatch = function() {
	    var Me=this;
	    var widget = dijit.getEnclosingWidget(Me.dom);
	    var prodInstVO=widget.prodInstVO;
	    var prodInstAttrList = prodInstVO.prodInstAttrList;
	    var userId=$("userId").value;
	    var commDealerAPIBO = BusCard.$remote("commDealerAPIBO");
	    var businessQueryBO = BusCard.$remote("businessQueryBO");
	    //ȡb.serviceRelation.belongCode
	    var serviceRela=BusCard.$remote("serviceRelationDAO").query({userId:userId,ifValue:1});
	    if(serviceRela.length>0){
		      var data = commDealerAPIBO.doGetExtentInfo(serviceRela[0].belongCode);
		      if(data && data.list){
					BusCard.$rs(Me.$('100861'), data.list||[]);
				}
				
			  //�������۵���Ϣ��ȡ������Ϣ
		      var targetAttrVO = prodInstAttrList.find(function(inst) {
		                  return inst.attrId == 100862;
	                  });
			    if(targetAttrVO){
				  Me.$('100862').value = targetAttrVO.attrValue;
				  var dataResult = businessQueryBO.doGetRetailExtent(BusCard.$session.homeCity,targetAttrVO.attrValue);
			       Me.$('100861').value = dataResult['extent_id']; 
			    }
			      Me.$("100861").onchange=function(){
				     var extentInfo = Me.$("100861").value;
				     try {
							var data = commDealerAPIBO.doGetRetailInfo(BusCard.$session.homeCity,extentInfo);
							if (data && data.list) BusCard.$rs(Me.$('100862'), data.list);
						}
						catch (e) {
							alert(e.message);
						} 
			     }
	          Me.$("100861").onchange();	
	    }
	    
	   
	};
	/**
	 * ����ҳ�洦���֧
	 * @method
	 */
	var batchPageDispatch = function() {
	};

	//���þ����֧�����߼�
	return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
