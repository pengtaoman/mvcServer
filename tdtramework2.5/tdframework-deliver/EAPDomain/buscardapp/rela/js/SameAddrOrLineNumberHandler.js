BusCard.define('/buscardapp/rela/js/SameAddrOrLineNumberHandler.js', function(_buscard, cardParam) {
	try {
		// add by chuaizhw 20120416 FUN-ORDER-综合订单受理-0023 移机 start
		var unicoder = {
			//"sameLine" : "\u5171\u7ebf\u53f7\u7801",
			"sameAddr" : "\u540c\u5740\u53f7\u7801",
			"sameOffer" : "\u7ec4\u5408\u53f7\u7801"
		};
		// add by chuaizhw 20120416 FUN-ORDER-综合订单受理-0023 移机 end
		var Me = this;
		Me.$('sameAddrLineNum').onload = function(instance, buscard, info) {
			// 如果再销售品变更中触发退网
			if (window.prodOfferAcceptLoader && !info.serviceRelation) {
				var prodInst = BusCard.jsonPath($ac$.userHasProdOfferInfoList || [],
				        "$[*].prodInstList[?(@.prodInstId==" + info.userId + ")]")[0];
				Me.getInitParamter().serviceRelation = info.serviceRelation = (prodInst
				        ? prodInst.serviceRelationVO
				        : null);
			}
			var data = BusCard.$remote("prodInstCommFacadeBO").querySamelineOrAddrInfoById(info.serviceRelation.userId,
			        info.serviceRelation.productId, info.serviceRelation.serviceId);
			var tpParam = {};
			if (data && data.length != 0) {
				var _sameAddrList = [],
					_sameLineList = [];
				BusCard.util.each(data, function(item) {
					        /*if (item.relationType == 52) _sameLineList.push({
						                userId : item.userId,
						                productId : item.productId,
						                serviceId : item.serviceId,
						                serviceName : item.serviceName,
						                relType : item.relationType,
						                statusFlag : item.statusFlag
					                });
					        else if (item.relationType == 51)*/
					         _sameAddrList.push({
						                userId : item.userId,
						                productId : item.productId,
						                serviceId : item.serviceId,
						                serviceName : item.serviceName,
						                relType : item.relationType,
						                statusFlag : item.statusFlag
					                });
				        });
				tpParam.sameLineList = _sameLineList;
				tpParam.sameAddrList = _sameAddrList;
				
			}
			// add by chuaizhw 20120416 FUN-ORDER-综合订单受理-0023 移机 start
			var dataOffer = BusCard.$remote("prodInstCommFacadeBO").queryRelaInstByProdInstInfo(info.serviceRelation.userId);
			if (dataOffer && dataOffer.length != 0) {
				var _sameOfferList = [];
				BusCard.util.each(dataOffer, function(item) {
					        _sameOfferList.push({
						                userId : item.userId,
						                productId : item.productId,
						                serviceId : item.serviceId,
						                serviceName : item.serviceName,
						                relType : item.relationType,
						                statusFlag : item.statusFlag,
						                addFlag : item.addFlag
					                });
				        });
				tpParam.sameOfferList = _sameOfferList;
			}
			// add by chuaizhw 20120416 FUN-ORDER-综合订单受理-0023 移机 end
			
			var tp = "<fieldset style='margin:10px'><legend>"
			        + unicoder.sameAddr
			        + "</legend>\
				         		              <tp:for ds=sameAddrList>\
				         		                <input type='checkbox' id='same-addr-#{serviceId}'  productId='#{productId}' id='same-addr-#{serviceId}'  userId='#{userId}' relType='#{relType}' serviceId='#{serviceId}' statusFlag='#{statusFlag}'/>\
                                               <span>#{serviceName}-#{serviceId}</span>\
                                             </tp:for>\
                                         </fieldset>\
                                         ";
                                        /* <fieldset  style='margin:10px'><legend>"
			        + unicoder.sameLine
			        + "</legend>\
                                         		<tp:for ds=sameLineList>\
                                         			   <input type='checkbox' id='same-line-#{serviceId}'  productId='#{productId}' id='same-line-#{serviceId}'  userId='#{userId}' relType='#{relType}' serviceId='#{serviceId}'  statusFlag='#{statusFlag}'/>\
                                                      <span>#{serviceName}-#{serviceId}</span>\
                                                  </tp:for>\
                                          </fieldset>\
                                      ";*/
			// add by chuaizhw 20120416 FUN-ORDER-综合订单受理-0023 移机 start
			if (dataOffer && dataOffer.length > 1) {
				tp = tp
				        + "<fieldset  style='margin:10px'><legend>"
				        + unicoder.sameOffer
				        + "</legend>\
						                   		<tp:for ds=sameOfferList>\
						                   			   <input type='checkbox' id='same-offer-#{serviceId}'  productId='#{productId}' id='same-offer-#{serviceId}'  userId='#{userId}' relType='#{relType}' serviceId='#{serviceId}'  statusFlag='#{statusFlag}' />\
						                                <span>#{serviceName}-#{serviceId}</span>\
						                            </tp:for>\
						                    </fieldset>\
                						";
			}
			// add by chuaizhw 20120416 FUN-ORDER-综合订单受理-0023 移机 end
			this.innerHTML = buscard.Template.create(tp).apply(tpParam);
			
			// add-by-liurong-0606-beg
			Me.$('subpage_wrapper_sameAddrLineNum').style.overflow = 'hidden';
			var clearF = window.setInterval(function() {
				if (Me.isLoaded()) {
					window.clearInterval(clearF);
					var flag = BusCard.$remote("secondAcceptCommBO").getBusinessRelaInfo(info.serviceRelation.cityCode,
					        info.serviceOfferId, info.userId, info.serviceRelation.serviceId, info.productId);
					if (flag.replace(/"/g, "") == "have") {
						if (confirm("\u5b58\u5728\u540c\u5740\u5171\u7ebf\u53f7\u7801\u662f\u5426\u4e00\u8d77\u64cd\u4f5c!")) {
							Me.$('sameAddrLineNum').onclick();
							
						}
					}
					
				}
			}, 20);
			// add-by-liurong-0606-end
		};
		Me.$("sameAddrLineNum").collectData = function(cardInstance, _buscard, cardInfo) {
			var data = [];
			var checkboxList = this.getElementsByTagName("input");
			_buscard.util.each(checkboxList, function(dom) {
				        if (dom.type && dom.type.toUpperCase() == 'CHECKBOX' && dom.checked) {
					        var obj = {};
					        obj.relType = dom.relType;
					        obj.productId = dom.productId;
					        obj.serviceId = dom.serviceId;
					        obj.userId = dom.userId;
					        obj.statusFlag = dom.statusFlag;
					        data.push(obj);
				        }
			        });
			return data;
			
		};
	}
	catch (e) {
		alert(e.message);
	}
});
