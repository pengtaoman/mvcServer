BusCard.define('/buscardapp/protocol/js/card_pi_charge_1.1.js', function(_buscard, cardParam) {
	try {
		var card = this;
		var gridData = this.getCardRelationInfo().gridData;
		// hebei-crm2.0/�������ͷ���,���ͷ��ò��ýɷ�/add by yusong/@20120707
		BusCard.each(gridData || [], function(shouldPayVO) {
			        // �������������
			        if (shouldPayVO.acctItemType == 4) {
				        // ������������ó��ѽɷ�
				        shouldPayVO.havePayValue = ((shouldPayVO.feeValue || 0) - (shouldPayVO.perferFee || 0));
				        shouldPayVO.feeSum = shouldPayVO.feeAmount = 0;
			        }
			        
		        });
		var tempGridData = BusCard.parse(BusCard.toJson(gridData));
		
		var numberPattern = /^(\-)?(\d+)(\.\d+|\d*)$/;;
		
	  var movePointR = function(value){
		  value = value.toString();
		  return parseFloat(value)*100;
	  };
	  
		/**
		 * hebei-crm2.0/��ȡһ����Ŀ��ĿӦ�ɷ���Ϣ /add by yusong/@20120707
		 */
		var getShouldPayByIndex = function(index) {
			var record = gridData[index];
			var favourValue = record["perferFee"] || 0;
			favourValue = movePointR(favourValue);
			var havePayValue = record["havePayValue"] || 0;
			havePayValue = movePointR(havePayValue);
			var feeValue = record["feeValue"] || 0;
			feeValue = movePointR(feeValue);
			var shouldPayValue = (feeValue - havePayValue - favourValue)/100;
			if(null!=shouldPayValue){
				shouldPayValue = parseFloat(shouldPayValue.toFixed(2));
			}
			return shouldPayValue;
		};
		
		/**
		 * compute total shouldpay
		 * 
		 * @private
		 * @method
		 */
		card.computeTotalValue = function() {
			var serviceId = "\u5408\u8ba1";
			var shouldPayValueTotal = 0;
			var feeValueTotal = 0;
			BusCard.each(gridData, function(index, record) {
				        if (record.acctItemType == 4) { return true; }
				        shouldPayValueTotal += (getShouldPayByIndex(index) || 0);
				        feeValueTotal += record.feeValue;
			        }, true);
			
			return {
				serviceId : serviceId,
				feeValue : feeValueTotal.toFixed(2),
				feeSum : shouldPayValueTotal.toFixed(2)
			};
		};
		tempGridData.push(card.computeTotalValue());
		var lastIndex = gridData.length;
		
		BusCard.Namespace.create("acceptpay.charge.gridHandler");
		var serviceParamBO = BusCard.$remote("serviceParamBO");
		
		/**
		 * hebei-crm2.0/Ψһ�������� /add by yusong/@20120707
		 */
		
		var uniqueIdSeed = 1;
		
		/**
		 * hebei-crm2.0/�ɷ���ϸģ�� /add by yusong/@20120707
		 */
		var shouldPayInfoTemplate = "<div paymentDetailIndex='#{index}'><label>\u7f34\u8d39\u65b9\u5f0f:</label><select class='payment-method-select' #{paymentMethodDisabled} onchange = 'return acceptpay.charge.gridHandler.onPaymentMethodChange.apply(this,[#{index}]);'><tp:for ds='paymentMethodList'>\
		<option value='#{id}'>${name}</option></tp:for></select>\
		<label>\u7f34\u8d39\u91d1\u989d:</label><input type='text' class='payment-value-input' #{DISABLED} value='#{shouldPayValue}' uniqueId='#{uniqueId}' maxlength='8' onblur='return acceptpay.charge.gridHandler.onPaymentValueBlur.apply(this,[#{index}])'/>\
		<img src='#{addIconUrl}' #{editFeeDisabled} class = '#{imgClass}' style='margin-bottom:-5px' onclick = 'return acceptpay.charge.gridHandler.addPaymentDetail.apply(this,[#{index}]);'/>\
		</div>\
		";
		/**
		 * hebei-crm2.0/���Ӻ�ɾ��������ϸ��ťURL /add by yusong/@20120707
		 */
		var addIconUrl = BusCard.path.contextPath + "/common/images/button/add_button.png";
		var reduceIconUrl = BusCard.path.contextPath + "/common/images/button/reduce_button.png";
		
		/**
		 * hebei-crm2.0/��ȡ���нɷѷ�ʽ /add by yusong/@20120707
		 */
		var allPaymentMethodList = BusCard.$remote("paymentMethodDAO").query({});
		
		/**
		 * hebei-crm2.0/����Ӧ�ɷ��úϼ� /add by yusong/@20120707
		 */
		var totalShouldPay = BusCard.map(gridData, function(record) {
			        var favourValue = record["perferFee"] || 0;
			        var havePayValue = record["havePayValue"] || 0;
			        var feeValue = record["feeValue"] || 0;
			        var shouldPayValue = (feeValue - havePayValue - favourValue);
			        return shouldPayValue;
			        
		        }).inject(0, function(seed, value) {
			        return seed + value;
		        }).toFixed(2);
		
		/**
		 * hebei-crm2.0/�������нɷѷ�ʽ�ϼ� /add by yusong/@20120707
		 */
		var paymentTotalView = BusCard.map(allPaymentMethodList, function(paymentMethodVO) {
			// �������Ҫչ����ô�� ���Թ��˵���Ӧ�Ľɷ�ѡ��ϼ�
			var tp = "<div paymentMethodId='#{paymentMethodId}' class='#{totalClass}'>\
					 <label>#{paymentMethodName}\u7f34\u8d39\u5408\u8ba1\uff1a</label>\
					 <span  id = 'paymentTotal_#{paymentMethodId}'>#{value}</span></div>",
				_tempObj = Object.clone(paymentMethodVO);
			_tempObj.value = "0";
			if (paymentMethodVO.paymentMethodId == 1) {
				_tempObj.value = totalShouldPay;
			} else {
				_tempObj.totalClass = "hidden-elem";
			}
			return BusCard.Template.create(tp).apply(_tempObj);
			
		}).join("");
		/**
		 * hebei-crm2.0/��ȡһ����Ŀ���ֽ�ɷ��ܺ� /add by yusong/@20120707
		 */
		var getNotCashPaymentValue = function(index) {
			var wrapperList = BusCard.query("[paymentDetailIndex=" + index + "]", card.dom);
			var totalNotCashPaymentValue = BusCard.map(wrapperList, function(wrapperNode) {
				        var paymentMethodNode = BusCard.query(".payment-method-select", wrapperNode)[0],
					        paymentValueNode = BusCard.query(".payment-value-input", wrapperNode)[0];
				        if (paymentMethodNode.value == 1) {
					        return 0;
				        } else {
					        return parseFloat(paymentValueNode.value);
				        }
				        
			        }).inject(0, function(seed, value) {
				        return seed + value;
			        });
			
			return totalNotCashPaymentValue;
			
		};
		
		/**
		 * hebei-crm2.0/��ȡһ����Ŀ���ֽ�ɷ��ܺ� /add by yusong/@20120707
		 */
		var getAllPaymentValue = function(index) {
			var wrapperList = BusCard.query("[paymentDetailIndex=" + index + "]", card.dom);
			var totalNotCashPaymentValue = BusCard.map(wrapperList, function(wrapperNode) {
				        var paymentMethodNode = BusCard.query(".payment-method-select", wrapperNode)[0],
					        paymentValueNode = BusCard.query(".payment-value-input", wrapperNode)[0];
				        return parseFloat(paymentValueNode.value);
				        
			        }).inject(0, function(seed, value) {
				        return seed + value;
			        });
			
			return totalNotCashPaymentValue;
			
		};
		/**
		 * hebei-crm2.0/�������ڴ���blur�¼���Ԫ��,��ҪΪ�˽��IE��ͬʱ��Ӧfocus()����������ҳ������
		 * /add by yusong/@20120707
		 */
		var setBlurElement = function(index) {
			this.blurElementUniqueId = index;
		};
		/**
		 * hebei-crm2.0/��ȡ������Ӧblur�¼���Ԫ��Ψһ���� /add by yusong/@20120707
		 */
		var getBlurElement = function() {
			return this.blurElementUniqueId;
		};
		/**
		 * hebei-crm2.0/���ݸ��ѷ�ʽ���㲢���ø����ܶ� /add by yusong/@20120707
		 */
		var computeAndSetPaymentValueByMethod = function() {
			var paymentDetailWrapperNodeList = BusCard.query("DIV[paymentDetailIndex]", card.dom);
			var totoalObj = allPaymentMethodList.inject({}, function(totalObj, methodVO) {
				        totalObj[methodVO.paymentMethodId] = 0;
				        return totalObj;
			        });
			BusCard.each(paymentDetailWrapperNodeList, function(wrapperNode) {
				        var payMethodNode = BusCard.query(".payment-method-select", wrapperNode)[0];
				        var payValueNode = BusCard.query(".payment-value-input", wrapperNode)[0];
				        totoalObj[payMethodNode.value] = (parseFloat(payValueNode.value) + totoalObj[payMethodNode.value]);
			        });
			BusCard.each(totoalObj, function(index, value) {
				        var node = BusCard.query("[paymentMethodId=" + index + "]", card.dom)[0];
				        if (value > 0) {
					        BusCard.removeClass(node, "hidden-elem");
					        BusCard.$("paymentTotal_" + index).innerHTML = value.toFixed(2);
				        } else {
					        BusCard.addClass(node, "hidden-elem");
					        BusCard.$("paymentTotal_" + index).innerHTML = "0";
				        }
			        }, true);
			
		};
		/**
		 * hebei-crm2.0/���㲢������������� /add by yusong/@20120707
		 */
		var computeAndSetDibsPay = function() {
			var commCard = PayBusFeeManager.getCommCard();
			var otherTotalPay = BusCard.map(BusCard.findAll(BusCard.map(allPaymentMethodList, function(vo) {
				                        return vo.paymentMethodId;
			                        }), function(paymentMethodId) {
				                return paymentMethodId != "1";
				                
			                }), function(index) {
				        return parseFloat(BusCard.$("paymentTotal_" + index).innerHTML || "0");
			        }).inject(0, function(seed, value) {
				        return seed + value;
			        });
			var cashPaymentValue = parseFloat(BusCard.$("paymentTotal_" + 1).innerHTML || "0");
			var dibsPayTotal = (cashPaymentValue - (parseFloat(totalShouldPay) - otherTotalPay));
			commCard.assignValue(commCard.$("dibs_pay"), dibsPayTotal < 0 ? "0" : dibsPayTotal.toFixed(2));
		};
		
		/**
		 * hebei-crm2.0/����ȫ�ַ�Χ��չʾ��Ϣ /add by yusong/@20120707
		 */
		var setGlobalInfomation = function() {
			computeAndSetPaymentValueByMethod();
			computeAndSetDibsPay();
			
		};
		
		//�ж��Ƿ�ѡ�������з��ڸ������ǣ��ж��Ƿ���ʾ�ն����ͺ��ն˴���
		var setPosBankInfomation = function(){
			var paymentDetailWrapperNodeList = BusCard.query("DIV[paymentDetailIndex]", card.dom);
			var posPaymentDetailWrapperNodeList = dojo.filter(paymentDetailWrapperNodeList, function(wrapperNode) {
					return BusCard.query(".payment-method-select", wrapperNode)[0].value==13;
		        });
			//Ĭ�ϲ�չ���ն˱�ź��ն�����
			BusCard.addClass(BusCard.$('deviceNo'), "hidden-elem");
			BusCard.addClass(BusCard.$('deviceNoDesc'), "hidden-elem");
			BusCard.$('label_deviceNo').style.display="none";
			BusCard.$('label_deviceNoDesc').style.display="none";
			if(posPaymentDetailWrapperNodeList){
				for(var i=0;i<posPaymentDetailWrapperNodeList.length;i++){
					var record = posPaymentDetailWrapperNodeList[i];
					var orderItemId = record.parentNode.parentNode.childNodes[1].innerHTML;
					var resultObj = BusCard.doPost(BusCard.path.contextPath + "/payBusFeeAction.do?method=doGetDeviceInfo&orderItemId="+orderItemId,
					        "");
					if(resultObj.flag==1){
						BusCard.$('label_deviceNo').style.display="";
						BusCard.$('label_deviceNoDesc').style.display="";
						BusCard.removeClass(BusCard.$('deviceNo'), "hidden-elem");
						BusCard.removeClass(BusCard.$('deviceNoDesc'), "hidden-elem");
						BusCard.$('deviceNo').value=resultObj.deviceNo;
						BusCard.$('deviceNoDesc').value=resultObj.deviceType;
						break;
					}
		        }
			}
		};
		
		/**
		 * FIXME Ч�ʴ��Ż� hebei-crm2.0/����һ���µĸ�����ϸ /add by yusong
		 * 
		 * @param {String|Number} acct_item��������
		 * 
		 */
		acceptpay.charge.gridHandler.addPaymentDetail = function(index) {
			if (BusCard.hasClass(this, "reduce-img")) {
				this.parentNode.parentNode.removeChild(this.parentNode);
				setGlobalInfomation();
				return;
			}
			var divNodeList = BusCard.query("DIV[paymentDetailIndex=" + index + "]", card.dom);
			if (divNodeList.length >= 2) {
				orderaccept.common.dialog.MessageBox.alert({
			        busiCode : "08420015",
			        infoList : ["\u6bcf\u6761\u8d39\u7528\u9879\u6700\u591a\u652f\u6301\u4e24\u79cd\u4ed8\u8d39\u65b9\u5f0f"]
		        });
				return false;
			} else {
				var record = gridData[index];
				var acctItemTypeId = record["acctItemTypeId"];
				var preChargedValue = parseFloat(BusCard.query(".payment-value-input", divNodeList[0])[0].value)|| 0;
				var favourValue = record["perferFee"] || 0;
				var havePayValue = record["havePayValue"] || 0;
				var feeValue = record["feeValue"] || 0;
				var shouldPayValue = (feeValue - havePayValue - favourValue)||0;
				if (preChargedValue >= shouldPayValue) {
					shouldPayValue = "0";
				} else {
					shouldPayValue = (shouldPayValue - preChargedValue).toFixed(2);
				}
				// FIXME ���Ի�������������
				var paymentMethodColl = serviceParamBO.getPaymentMethodColl(acctItemTypeId);
				paymentMethodColl = BusCard.$remote("commDealerAPIBO").doFilterPaymentMethod(BusCard.$session.acceptDealer,BusCard.$session.cityCode,paymentMethodColl);
				if (paymentMethodColl.list) {
					paymentMethodColl.list.sort(function(v1, v2) {
						        var p1 = parseInt("" + v1.id);
						        var p2 = parseInt("" + v2.id);
						        if (p1 > p2) {
							        return 1;
						        } else if (p1 < p2) {
							        return -1;
						        } else {
							        return 0;
						        }
					        });
				}
				var tp = BusCard.Template.create(shouldPayInfoTemplate).apply({
					        index : index,
					        paymentMethodList : paymentMethodColl.list,
					        shouldPayValue : shouldPayValue,
					        addIconUrl : reduceIconUrl,
					        imgClass : 'reduce-img',
					        uniqueId : uniqueIdSeed++
				        });
				var _div = document.createElement("div");
				_div.innerHTML = tp;
				this.parentNode.parentNode.appendChild(_div.childNodes[0]);
				_div = null;
				
			}
			setGlobalInfomation();
		};
		/**
		 * FIXME Ч�ʴ��Ż� hebei-crm2.0/���ѽ��ʧȥ���㴥���ļ�� /add by yusong
		 * 
		 * @param {String|Number} acct_item��������
		 * 
		 */
		acceptpay.charge.gridHandler.onPaymentValueBlur = function(index) {
			var uniqueId = this.getAttribute("uniqueId");
			var obj = this;
			var blurElementUniqueId = getBlurElement();
			// ��ǰ������Ӧblur�¼���Ԫ�غ͵�ǰԪ�ز�һ��ʱ,ֱ�ӷ���
			if ((blurElementUniqueId != null) && (blurElementUniqueId != uniqueId)) { return true; }
			if (!numberPattern.test(this.value)) {
				orderaccept.common.dialog.MessageBox.alert({
			        busiCode : "08420015",
			        infoList : ["\u7f34\u8d39\u91d1\u989d\u53ea\u80fd\u8f93\u5165\u6570\u5b57"],
			        onComplete : function(){
			        	obj.focus();
			        }
		        });
				return false;
			} else {
				var paymentValueList = BusCard.query(".payment-value-select", this.parentNode.parentNode);
				var currentValue = parseFloat(BusCard.trim(this.value)).toFixed(2);
				var shouldPayValue = getShouldPayByIndex(index);
				var paymentMethodNode = BusCard.query(".payment-method-select", this.parentNode)[0];
				// check-1:��������ֽ�,��֤��ǰ�ɷѲ�����Ӧ��
				if (paymentMethodNode.value != 1 && (currentValue > shouldPayValue)) {
					orderaccept.common.dialog.MessageBox.alert({
				        busiCode : "08420015",
				        infoList : ["\u53ea\u6709\u73b0\u91d1\u7f34\u8d39\u5141\u8bb8\u5b9e\u7f34\u5927\u4e8e\u5e94\u7f34"],
				        onComplete : function(){
				        	obj.focus();
				        }
			        });
					setBlurElement(uniqueId);
					return false;
				}
				// check-2:��֤��ǰ��������ֽ�ɷѲ�����Ӧ��
				else if (paymentMethodNode.value != 1) {
					var totalNotCashPaymentValue = getNotCashPaymentValue(index);
					if (totalNotCashPaymentValue > shouldPayValue) {
						orderaccept.common.dialog.MessageBox.alert({
					        busiCode : "08420015",
					        infoList : ["\u53ea\u6709\u73b0\u91d1\u7f34\u8d39\u5141\u8bb8\u5b9e\u7f34\u5927\u4e8e\u5e94\u7f34"],
					        onComplete : function(){
					        	obj.focus();
					        }
				        });
						setBlurElement(uniqueId);
						return false;
					}
				}
				// check-3:��֤�ɷѽ�С��Ӧ��,��focus���û��л����޸�
				// Ӧ��С�ڽɷѲ�����ʾ,�ύʱ��ʾ/modified by yusong @ 20120724 
				if (false&&getAllPaymentValue(index) < shouldPayValue) {
					orderaccept.common.dialog.MessageBox.alert({
				        busiCode : "08420015",
				        infoList : ["\u7f34\u8d39\u91d1\u989d\u4e0d\u80fd\u5c0f\u4e8e\u5e94\u7f34"]
			        });
					setBlurElement(null);
					setGlobalInfomation();
					return false;
				}
				//check-4:���������븺��
				if(currentValue<0){
					orderaccept.common.dialog.MessageBox.alert({
				        busiCode : "08420015",
				        infoList : ["\u7f34\u8d39\u91d1\u989d\u4e0d\u80fd\u8f93\u5165\u8d1f\u6570\uff01"]
			        });
					this.value=shouldPayValue;
					setBlurElement(null);
					setGlobalInfomation();
					return false;
				}
			}
			setBlurElement(null);
			setGlobalInfomation();
		};
		
		acceptpay.charge.gridHandler.onPaymentMethodChange = function(index) {
			handlePaymentInfo();
			if (this.value != 1) {
				var paymentValueList = BusCard.query(".payment-value-select", this.parentNode.parentNode);
				var shouldPayValue = getShouldPayByIndex(index);
				// check-2:��֤��ǰ��������ֽ�ɷѲ�����Ӧ��
				var totalNotCashPaymentValue = getNotCashPaymentValue(index);
				if (totalNotCashPaymentValue > shouldPayValue) {
					orderaccept.common.dialog.MessageBox.alert({
				        busiCode : "08420015",
				        infoList : ["\u53ea\u6709\u73b0\u91d1\u7f34\u8d39\u5141\u8bb8\u5b9e\u7f34\u5927\u4e8e\u5e94\u7f34"]
			        });
					this.value = 1;
				}
				
			}
			//���з��ڸ�����ʾ��Ӧ��Ϣ
			setPosBankInfomation();
			setGlobalInfomation();
		};
		
		/**
		 * handle paymentMethod ,mainly hidden paymethod information
		 * 
		 * @function
		 * @private
		 */
		var handlePaymentInfo = function() {
			var grid = card.getGrid();
			var dom = grid.getDomElement();
			var rows = dom.rows;
			// 3:����,2:֧Ʊ,13���з��ڸ���
			var paymentMethodList = BusCard.map(BusCard.query(".payment-method-select", card.dom), function(dom) {
				        return dom.value;
			        });
			var bankFlag = BusCard.find(paymentMethodList, function(paymentMethodId) {
				        return paymentMethodId == 3;
			        });
			
			var checkFlag = BusCard.find(paymentMethodList, function(paymentMethodId) {
				        return paymentMethodId == 2;
			        });
			var tsFlag = BusCard.find(paymentMethodList, function(paymentMethodId) {
				        return paymentMethodId == 6;
			        });
			var posFlag = BusCard.find(paymentMethodList, function(paymentMethodId) {
		        return paymentMethodId == 13;
	        });
			var commCard = PayBusFeeManager.getCommCard();
			var bankSubGroup = commCard.getSubGroupById("paymentMethod_" + 3);
			var checkSubGroup = commCard.getSubGroupById("paymentMethod_" + 2);
			var tsSubGroup = commCard.getSubGroupById("paymentMethod_" + 6);
			var posSubGroup = commCard.getSubGroupById("paymentMethod_" + 13);
			commCard[bankFlag ? "displaySubGroup" : "hiddenSubGroup"](bankSubGroup);
			commCard[checkFlag ? "displaySubGroup" : "hiddenSubGroup"](checkSubGroup);
			commCard[tsFlag ? "displaySubGroup" : "hiddenSubGroup"](tsSubGroup);
			commCard[posFlag ? "displaySubGroup" : "hiddenSubGroup"](posSubGroup);
		};
		
		/**
		 * configure data for charge grid
		 * 
		 * @public
		 * @config
		 * @field
		 */
		this.gridConfig = {
			/**
			 * define data access method of charge grid
			 * 
			 * @method
			 */
			loadGridData : function() {
				return tempGridData;
			},
			/**
			 * define column render for charge grid
			 * 
			 * @field
			 */
			columnRender : {
				feeValue : function(value, index, record) {
					if (index != lastIndex) {
						var feeValue = record.getByName("feeValue") || 0;
						var shouldPayValue = feeValue.toFixed(2);
						return shouldPayValue;
					} else {
						return value;
					}
					
				},
				feeSum : function(value, index, record) {
					if (index != lastIndex) {
						// FIXME
						// hebei-crm2.0/��Ԫ������ȡֵ,�����Ӹ�ʽ����ı������ȡֵ,��Ϊ�����
						// ��Щ��ģ������Щ���Ѿ���������,������Ҫ�Ż�,���ٶ�ȫ�ֵ������� add by
						// yusong
						var record = gridData[index];
						var favourValue = record["perferFee"] || 0;
						var havePayValue = record["havePayValue"] || 0;
						var feeValue = record["feeValue"] || 0;
						var shouldPayValue = (feeValue - havePayValue - favourValue).toFixed(2);
						return shouldPayValue;
					} else {
						return value;
					}
				},
				havePayValue : function(value, index, record) {
					if (index != lastIndex) {
						var havePayValue = record.getByName("havePayValue") || 0;
						return havePayValue.toFixed(2);
					} else {
						
						return value;
						
					}
					
				},
				relaFeeInfo : function(value, index, record) {
					if (index != lastIndex) {
						var favourValue = record.getByName("perferFee") || 0;
						return "\u603b\u4f18\u60e0:" + favourValue.toFixed(2);
					}
					
				},
				transBill : function(value, index, record) {
					return value == 0 ? '\u4e0d\u53ef\u4ee5' : '\u53ef\u4ee5';
				},
				/**
				 * hebei-crm2.0/�����ɷѷ�ʽ�ͽɷѷ��� /add by yusong
				 * 
				 * @date 20120707
				 */
				shouldPayInfo : function(value, index, record) {
					if (index != lastIndex) {
						var acctItemTypeId = record.getByName("acctItemTypeId");
						// FIXME
						// �������ȫ������,����Ϊ�������acctItemType��,�Ӷ����Դ�record��ȡ��
						var acctItemType = gridData[index]["acctItemType"];
						var shouldPayValue = getShouldPayByIndex(index);
						var paymentMethodColl = serviceParamBO.getPaymentMethodColl(acctItemTypeId);
						paymentMethodColl = BusCard.$remote("commDealerAPIBO").doFilterPaymentMethod(BusCard.$session.acceptDealer,BusCard.$session.cityCode,paymentMethodColl);
						if (paymentMethodColl.list) {
							paymentMethodColl.list.sort(function(v1, v2) {
								        var p1 = parseInt("" + v1.id);
								        var p2 = parseInt("" + v2.id);
								        if (p1 > p2) {
									        return 1;
								        } else if (p1 < p2) {
									        return -1;
								        } else {
									        return 0;
								        }
							        });
						}
						return BusCard.Template.create(shouldPayInfoTemplate).apply({
							        index : index,
							        paymentMethodList : paymentMethodColl.list,
							        shouldPayValue : acctItemType == 4 ? "0" : shouldPayValue,
							        addIconUrl : addIconUrl,
							        uniqueId : uniqueIdSeed++,
							        DISABLED : shouldPayValue < 0 ? "DISABLED" : (acctItemType == 4 ? "DISABLED" : ''),
							        imgClass : shouldPayValue < 0 ? "hidden-elem" : (acctItemType == 4 ? "hidden-elem" : ''),
							        paymentMethodDisabled : shouldPayValue < 0 ? "DISABLED" : (acctItemType == 4 ? "DISABLED" : ''),
							        editFeeDisabled : shouldPayValue < 0 ? "DISABLED" : ''
						        });
						
					} else {
						return paymentTotalView;
					}
					
				}
				
			}
			
		};
		/**
		 * FIXME �����ɷ��ύ����,��ʱ�������ܺͰ�ȫ������,���ú�̨��java�����Ժ����ƽ�Ƶ���������ִ��
		 * 
		 * @method
		 */
		card.collectData = function() {
			if (!this.doCheck()) { return false; }
			var commCard = PayBusFeeManager.getCommCard();
			var IdGeneratorBOStaticFacade = BusCard
			        .$load("com.neusoft.crm.ordermgr.common.idgenerator.bo.IdGeneratorBOStaticFacade");
			var DateUtils = BusCard.$load("com.neusoft.crm.ordermgr.common.util.dateutil.DateUtils");
			var currentTime = DateUtils.getSysdate().replace(/"/g,"");
			var billId = IdGeneratorBOStaticFacade.generateSequenceLong("billId");
			var operatedPaymentSerialNbr = IdGeneratorBOStaticFacade.generateSequenceLong("operatedPaymentSerialNbr");
			var paymentList = [];
			var custOrderId = gridData[0].custOrderId;
			var sessionInfo = {
				cityCode : BusCard.$session.cityCode,
				commonRegionId : BusCard.$session.commRegionId,
				acceptCity : BusCard.$session.cityCode,
				dealerId :   BusCard.$session.acceptDealer||BusCard.$session.dealerId,
				belongCode : BusCard.$session.areaId,
				regionCode : BusCard.$session.areaId,
				staffId : BusCard.$session.staffId
			};
			var commPaymentVO = {
				// FIXME
				custOrderId : gridData[0].custOrderId,
				createdDate : currentTime,
				paymentDate : currentTime,
				// FIXME
				statusCd : 10,
				statusDate : currentTime,
				billId : billId,
				operatedPaymentSerialNbr : operatedPaymentSerialNbr
				
			};
			var findPaymentMethodVO = function(paymentMethodId) {
				return BusCard.find(allPaymentMethodList, function(vo) {
					        return vo.paymentMethodId == paymentMethodId;
				        });
				
			};
			
			// ������������payment������
			var givenPaymentValue = BusCard.map(BusCard.findAll(gridData, function(shouldPayVO) {
				                return shouldPayVO.acctItemType == 4;
			                }), function(shouldPayVO) {
				        return shouldPayVO.feeValue;
			        }).inject(0, function(seed, value) {
				        return seed + value;
			        });
			
			if (givenPaymentValue > 0) {
				var givenPaymentMethodCd = findPaymentMethodVO(12).paymentMethodCd;
				paymentList.push(Object.extend(Object.extend({
					                paymentMethodCD : givenPaymentMethodCd,
					                paymentId : IdGeneratorBOStaticFacade.generateSequenceLong("paymentId"),
					                amount : givenPaymentValue
					                
				                }, sessionInfo), commPaymentVO));
			}
			
			// ������������payment��Ϣ
			var paymentMethodIdWrapperNodeList = BusCard.findAll(BusCard.query("DIV[paymentMethodId]", card.dom),
			        function(wrapperNode) {
				        var paymentMethodId = wrapperNode.getAttribute("paymentMethodId");
				        var spanNode = BusCard.$("paymentTotal_" + paymentMethodId, wrapperNode);
				        var value = parseFloat(BusCard.trim(spanNode.innerHTML) || "0");
				        if (value > 0||value<0) { return true; }else{//���������0���ж�����ɷѷ�ʽ��ѡ���˵������������
				        	var paymentMethodNodeList = BusCard.query(".payment-method-select", card.dom);
				        	if(BusCard.find(paymentMethodNodeList,function(paymentMethodNode){
				        		return paymentMethodId == paymentMethodNode.value;
				        	})){
				        		return true;
				        	}
				        }
			        });
			Array.prototype.push.apply(paymentList, BusCard.map(paymentMethodIdWrapperNodeList, function(wrapperNode) {
				                var paymentMethodId = wrapperNode.getAttribute("paymentMethodId");
				                var spanNode = BusCard.$("paymentTotal_" + paymentMethodId, wrapperNode);
				                var value = parseFloat(BusCard.trim(spanNode.innerHTML) || "0");
				                var paymentVO = {};
				                var paymentMethodCD = findPaymentMethodVO(paymentMethodId).paymentMethodCd;
				                Object.extend(paymentVO, {
					                        paymentId : IdGeneratorBOStaticFacade.generateSequenceLong("paymentId"),
					                        amount : value,
					                        paymentMethodCD : paymentMethodCD
				                        });
				                if(value >= 0){
				                	Object.extend(paymentVO, {
				                        operationType : '1000'
			                        });
				                }else{
				                	Object.extend(paymentVO, {
				                        operationType : '1100'
			                        });
				                }
				                Object.extend(paymentVO, sessionInfo);
				                Object.extend(paymentVO, commPaymentVO);
				                return paymentVO;
				                
			                }));
			// ����billVO
			var billAmount = BusCard.map(paymentList, function(paymentVO) {
				        return paymentVO.amount;
				        
			        }).inject(0, function(seed, value) {
				        return seed + value;
			        });
			var billVO = {};
			Object.extend(billVO, sessionInfo);
			Object.extend(billVO, {
				        billId : billId,
				        billAmount : billAmount,
				        createdDate : currentTime,
				        paymentDate : currentTime,
				        statusCd : 10,
				        statusDate : currentTime
			        });
			
			// ����Payment_detail����
			var findPaymentVO = function(paymentMethodCd) {
				return BusCard.find(paymentList, function(paymentVO) {
					        return paymentVO.paymentMethodCD == paymentMethodCd;
					        
				        });
			};
			var paymentDetailList = BusCard.map(gridData, function(index, shouldPayVO) {
				var trNode = BusCard.query("tr[rindex=" + index + "]", card.dom)[0];
				var paymentDetailWrapperNode = BusCard.query("[paymentDetailIndex]", trNode);
				var list = [];
				BusCard.each(paymentDetailWrapperNode, function(wrapperNode) {
					var paymentMethodNode = BusCard.query(".payment-method-select", wrapperNode)[0];
					var paymentValueNode = BusCard.query(".payment-value-input", wrapperNode)[0];
					var amount = paymentValueNode.value;
					var paymentMethodId = paymentMethodNode.value;
//					if (parseFloat(amount || "0") != 0) {
						var paymentDetailVO = {};
						Object.extend(paymentDetailVO, shouldPayVO);
						var paymentMethodCd = findPaymentMethodVO(paymentMethodId).paymentMethodCd;
						Object.extend(paymentDetailVO, {
							        paymentDate : currentTime,
							        paymentMethodCd : paymentMethodCd,
							        amount : parseFloat(amount),
							        paymentDetailId : IdGeneratorBOStaticFacade.generateSequenceLong("paymentDetailId"),
							        paymentId : findPaymentVO(paymentMethodCd).paymentId
						        });
						Object.extend(paymentDetailVO, sessionInfo);
						list.push(paymentDetailVO);
						
//					}
				});
				return list;
				
			}, true).inject([], function(seed, value) {
				        return seed.concat(value);
			        });
			// �������ͷ��ö�Ӧ��payment_detail������
			var givenPaymentDetailList = BusCard.map(BusCard.findAll(gridData, function(shouldPayVO) {
				                return shouldPayVO.acctItemType == 4;
				                
			                }), function(shouldPayVO) {
				        var paymentDetailVO = {};
				        Object.extend(paymentDetailVO, shouldPayVO);
				        var paymentMethodCd = findPaymentMethodVO(12).paymentMethodCd;
				        Object.extend(paymentDetailVO, {
					                paymentDate : currentTime,
					                paymentMethodCd : paymentMethodCd,
					                amount : shouldPayVO.feeValue,
					                paymentDetailId : IdGeneratorBOStaticFacade.generateSequenceLong("paymentDetailId"),
					                paymentId : findPaymentVO(paymentMethodCd).paymentId
				                });
				        Object.extend(paymentDetailVO, sessionInfo);
				        return paymentDetailVO;
				        
			        });
			Array.prototype.push.apply(paymentDetailList, givenPaymentDetailList);
			// ������,����ת������ȡ��Ӧ��acct_item
			var preStoreAcctItemVO = null;
			if (BusCard.$("back_fee_mode").value == '2') {
				var amount = parseFloat(BusCard.$("dibs_pay").value);
				if (amount > 0) {
					preStoreAcctItemVO = {
						amount : amount,
						custOrderId : custOrderId
					};
				}
			}
			
			// ���Ĳ�,�������ѷ�ʽ��Ӧ����ϸ��Ϣ
			var paymentMethodInfo = {};
			var assertSucc = true;
			var needBuildPaymentMethodInfo = false;
			BusCard.each(paymentMethodIdWrapperNodeList, function(wrapperNode) {
				        var paymentMethodId = wrapperNode.getAttribute("paymentMethodId");
				        var commCard = PayBusFeeManager.getCommCard();
				        var subGroupElem = commCard.getSubGroupById("paymentMethod_"+paymentMethodId);
				        if (subGroupElem) {
					        var checkResult = commCard.checkNotNull(subGroupElem);
					        if (checkResult === false) {
						        assertSucc = false;
						        return false;
					        }
					        var rawData = BusCard.util.collectData(subGroupElem, function(el) {
						                return el.getAttribute('controlFieldName') || el.controlFieldName;
					                }, function() {
						                return commCard.buildNodeData.apply(commCard, arguments);
					                });
					        paymentMethodInfo[paymentMethodId] = rawData;
					        needBuildPaymentMethodInfo = true;
					        
				        }
				        
			        });
			
			if (assertSucc === false) {
				return false;
			} else {
				return {
					preStoreAcctItemVO : preStoreAcctItemVO,
					custOrderId : gridData[0].custOrderId,
					billVO : billVO,
					paymentList : paymentList,
					paymentDetailList : paymentDetailList,
					paymentMethodInfo : needBuildPaymentMethodInfo ? paymentMethodInfo : null
					
				};
				
			}
			
		};
		
		/**
		 * export check logic to outside
		 */
		card.doCheck = function() {
			var idList = BusCard.map(gridData, function(index, item) {
				        return index;
			        }, true);
			
			var assertSucc = true;
			BusCard.each(idList, function(index) {
				        // ���������ͷ���
				        if (gridData[index].acctItemType == 4) {
					        return true;
				        } else {
					        var paymentDetailWrapperNodeList = dojo.query("div[paymentDetailIndex=" + index + "]",
					                this.dom);
					        var shouldPay = getShouldPayByIndex(index);
					        var inputNode = null;
					        var hasPaymentValue = dojo.map(paymentDetailWrapperNodeList, function(wrapperNode) {
						                inputNode = BusCard.query(".payment-value-input", wrapperNode)[0];
						                return parseFloat(inputNode.value || "0");
					                }).inject(0, function(seed, value) {
						                return seed + value;
					                });
					        if (hasPaymentValue < shouldPay) {
					        	orderaccept.common.dialog.MessageBox.alert({
							        busiCode : "08420015",
							        infoList : ["\u7f34\u8d39\u91d1\u989d\u4e0d\u80fd\u5c0f\u4e8e\u5e94\u7f34"]
						        });
						        assertSucc = false;
						        inputNode.focus();
						        return false;
						        
					        }
					        
				        }
				        
			        });
			
			return assertSucc;
			
		};
		
	}
	catch (e) {
		orderaccept.common.dialog.MessageBox.alert({
	        busiCode : "08420015",
	        infoList : [e.message]
        });
	}
});
