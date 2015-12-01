BusCard.define('/orderaccept/attrapp/attr_prod_100400.js',function(_buscard,cardParam){
	        var prodOfferAcceptPageDispatch=function(){
	        	var Me = this;
				var session = BusCard.$session;
				var cityCode = BusCard.$session.cityCode;
				var widget = dijit.getEnclosingWidget(this.dom);
				var productInfoVO = widget.productInfoVO;
				var netType=productInfoVO.netType;
		        Me.$("100400").onquery = function () {
					var checkbox = this, _card = arguments[0], _buscard = arguments[1], _p = arguments[2];
					var value = _buscard.util.trim(this.value);
					return BusCard.$remote("serviceParamDAO").getDealerMethodByName(netType,cityCode,value).list;
				};
			
				(function(){
					var parentDom = dijit.getEnclosingWidget(Me.getParent().dom);
					var model = parentDom.getModel();
			    	var serviceCardWidgetMap =  prodOfferAcceptLoader.serviceCardWidgetMap["serviceCardWidget_" + model.cardParam.uniqueId];
			   		var busCardInstance = serviceCardWidgetMap.busCardInstance;
					var userId = busCardInstance.getCardRelationInfo().userId;
					if(userId){
						var dealerMethodList = BusCard.$remote("serviceParamDAO").getDealerMethodAll(cityCode,netType).list;
						var userInstallInfoList= BusCard.$remote("prodInstCommFacadeBO").getUserInstallInfo({userId:userId,attrId:'100400',cityCode:cityCode});
				      	if(!!userInstallInfoList[0]){
				      		var dealerMethod = dojo.filter(dealerMethodList||[],function(temp){
				      			return temp.id == userInstallInfoList[0].infoValue;
				      		});
				      		if(dealerMethod && dealerMethod.length > 0){
				      			Me.$("100400").value= dealerMethod[0].name;
				      			Me.$("100400").rvalue = userInstallInfoList[0].infoValue;
				      			Me.$("100400").setAttribute('isnull',1);
	      						Me.$("100400").removeAttribute('controlFieldName');
				      		}
				      	}
					}
					if($ac$.get("orderChangeFlag")== 1){
						 var selectedMemb = dojo.filter($ac$.get("selectedMemberProdOfferList")||[], function(memb) {
	                        return memb.uniqueId == model.cardParam.uniqueId;
                        })[0];
                        if(!!selectedMemb){
                        	//获取产品订单项
                        	var prodItemVO = selectedMemb.prodItemVO;
                        	var prodInstAttrList = prodItemVO.prodInstAttrList;
                        	//获取结算入网方式的值
                        	var targetAttrVO = BusCard.find(prodInstAttrList||[],function(info){
                        		return info.attrId == 100400;
                        	}); 
                        	if(!!targetAttrVO){
                        		var _dealerMethodList = BusCard.$remote("serviceParamDAO").getDealerMethodAll(cityCode,netType).list;
                        		var dealerMethod = dojo.filter(_dealerMethodList||[],function(temp){
					      			return temp.id == targetAttrVO.attrValue;
					      		});
					      		if(dealerMethod){
					      			Me.$("100400").value= dealerMethod[0].name;
					      			Me.$("100400").rvalue = targetAttrVO.attrValue;
					      		}
                        	}
                        }
					}
					
				})();
	        };
	        var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	        /**
	         * 缁煎悎鏌ヨ椤甸潰澶勭悊鍒嗘敮
	         * @method
	         */
	        var allInfoQueryPageDispatch = function() {
	        	var prodInstVO = cardParam.prodInstVO;
	        	var prodInstAttrList = prodInstVO.prodInstAttrList;
	        	var instVO = prodInstAttrList.find(function(inst) {
	                return inst.attrId == 100400;
                });
	        	var cityCode = prodInstVO.cityCode;
	        	var productInfoVO = cardParam.productInfoVO;
	        	var netType=productInfoVO.netType;
		        var list = BusCard.$remote("serviceParamDAO")
		                        .getDealerMethod(cityCode,netType).list;
		        var attrValName = dojo.filter(list,function(obj){
		        	return obj.id == instVO.attrValue;
		        })[0];
		        $('100400').innerHTML=attrValName.name;
	        };
	        /**
	         * 浜屾涓氬姟澶勭悊鍒嗘敮
	         * @method
	         */
	        var secondBusinessPageDispatch = function() {
	            var Me=this;
	            var cityCode = BusCard.$session.homeCity;
	           	var widget = dijit.getEnclosingWidget(this.dom);
	            var productInfoVO = widget.productInfoVO;
	            var netType=productInfoVO.netType;
	            /*Me.$("100400").onquery = function () {
	            	var value = _buscard.util.trim(this.value);
					return BusCard.$remote("serviceParamDAO").getDealerMethodByName(netType,cityCode,value).list;
	            }*/
	            (function(){
					var dealerMethodList = BusCard.$remote("serviceParamDAO").getDealerMethodAll(cityCode,netType).list;
					var userInstallInfoList= BusCard.$remote("prodInstCommFacadeBO").getUserInstallInfo({userId:$("userId").value,attrId:'100400',cityCode:cityCode});
			      	if(!!userInstallInfoList[0]){
			      		var dealerMethod = dojo.filter(dealerMethodList||[],function(temp){
			      			return temp.id == userInstallInfoList[0].infoValue;
			      		});
			      		if(dealerMethod){
			      			Me.$("100400").value= dealerMethod[0].name;
			      			Me.$("100400").rvalue = userInstallInfoList[0].infoValue;
			      		}
			      	}
				})();
	        
	        
	         return true;
	        };
	        /**
	         * 鎵归噺椤甸潰澶勭悊鍒嗘敮
	         * @method
	         */
	        var batchPageDispatch = function() {};
	      
	        //璋冪敤鍏蜂綋鍒嗘敮澶勭悊閫昏緫
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
})
