BusCard.define('/buscardapp/rela/js/quitServiceHandler.js', function(_buscard, cardParam) {
	var ConstantsPool = dojo.require("orderaccept.common.js.ConstantsPool");
	var ServingStatusConst = ConstantsPool.load("ServingStatusConst").ServingStatusConst;
	var ServiceOfferIdConst = ConstantsPool.load("ServiceOfferIDConst").ServiceOfferIDConst;
	var Me = this;
	var a = arguments[0];
	var b = arguments[1];
	// 如果是综合订单受理页面,不处理同拆相关逻辑
	if (window.prodOfferAcceptLoader) {
		var dom = Me.$("sameQuitNums"),
			label = Me.$("label_sameQuitNums");
		dom && dom.parentNode.parentNode.removeChild(dom.parentNode);
		label && label.parentNode.removeChild(label);
		return false;
	}
	try {
		try {
			if (!b.serviceRelation) {
				var prodInstList = BusCard.jsonPath($ac$.get("userHasProdOfferInfoList"),
				        "$[*].prodInstList[?(@.prodInstId==" + b.userId + ")]");
				if (prodInstList) {
					Me.getInitParamter().serviceRelation = b.serviceRelation = prodInstList[0].serviceRelationVO;
				}
				
			}
			
		}
		catch (e) {

		}
		
		var GetSameQuitNums = function() {};
		
		GetSameQuitNums.prototype = {
			getInnerHtml : function() {
				var tpParam = {};
				var data = BusCard.$remote("prodInstCommFacadeBO").getSameQuitNums(b.serviceRelation.userId,
				        b.serviceOfferId);
				if (data && data.length != 0) {
					var _sameQuitNumsList = [];
					BusCard.util.each(data, function(item) {
						var serviceRelaVO = BusCard.$remote("prodInstCommFacadeBO")
						        .getServiceRelationByUserId(item.prodInstId);
						//if (serviceRelaVO.servingStatus != ServingStatusConst.QUIT_STOP) {
							_sameQuitNumsList.push({
								        userId : item.prodInstId,
								        productId : item.productId,
								        serviceId : item.accNbr
							        });
						//}
					});
					tpParam.sameQuitNumsList = _sameQuitNumsList;
				};
				
				var tp = "<div >\
		              <tp:for ds='sameQuitNumsList'>\
		                <input type='checkbox' id='#{userId}' class = 'quit-prod-class'  value='#{userId}' productId='#{productId}' serviceId='#{serviceId}'/>\
		               <span>#{serviceId}</span>\
		             </tp:for>\
		            </div>";
				var innerStr = BusCard.Template.create(tp).apply(tpParam);
				return innerStr;
			},
			
			initCheckBox : function(flag) {
				var checkboxList = BusCard.query(".quit-prod-class", Me.dom);
				BusCard.util.each(checkboxList, function(dom) {
					        if (dom.type && dom.type.toUpperCase() == 'CHECKBOX') {
						        if (flag) {
							        dom.checked = true;
							        dom.disabled = true;
						        } else {
							        if (dom.value == b.serviceRelation.userId) {
								        dom.checked = true;
								        dom.disabled = true;
							        } else {
								        dom.checked = false;
								        dom.disabled = false;
							        }
						        }
					        }
				        });
			},
			
			collectData : function() {
				var data = [];
				var checkboxList = document.getElementsByTagName("input");
				BusCard.util.each(checkboxList, function(dom) {
					        if (dom.type && dom.type.toUpperCase() == 'CHECKBOX' && dom.checked) {
						        var obj = {};
						        obj.userId = dom.value;
						        obj.productId = dom.productId;
						        data.push(obj);
					        }
				        })
				return data;
			}
		};
		
		var getSameQuitNums = new GetSameQuitNums();
		this.$('sameQuitNums').innerHTML = getSameQuitNums.getInnerHtml();
		getSameQuitNums.initCheckBox(false);
		this.$('sameQuitNums').collectData = function() {
			return getSameQuitNums.collectData();
		}
	}
	catch (e) {
		alert(e.message);
	}
});