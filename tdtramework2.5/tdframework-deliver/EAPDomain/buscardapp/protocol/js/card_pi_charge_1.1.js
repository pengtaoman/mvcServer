BusCard.define('/buscardapp/protocol/js/card_pi_charge_1.1.js', function(_buscard, cardParam) {
	try {
		var card = this;
		var gridData = this.getCardRelationInfo().gridData;
		// hebei-crm2.0/处理赠送费用,赠送费用不用缴费/add by yusong/@20120707
		BusCard.each(gridData || [], function(shouldPayVO) {
			        // 如果是赠送类型
			        if (shouldPayVO.acctItemType == 4) {
				        // 如果是赠送设置成已缴费
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
		 * hebei-crm2.0/获取一条账目条目应缴费信息 /add by yusong/@20120707
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
		 * hebei-crm2.0/唯一索引种子 /add by yusong/@20120707
		 */
		
		var uniqueIdSeed = 1;
		
		/**
		 * hebei-crm2.0/缴费明细模板 /add by yusong/@20120707
		 */
		var shouldPayInfoTemplate = "<div paymentDetailIndex='#{index}'><label>\u7f34\u8d39\u65b9\u5f0f:</label><select class='payment-method-select' #{paymentMethodDisabled} onchange = 'return acceptpay.charge.gridHandler.onPaymentMethodChange.apply(this,[#{index}]);'><tp:for ds='paymentMethodList'>\
		<option value='#{id}'>${name}</option></tp:for></select>\
		<label>\u7f34\u8d39\u91d1\u989d:</label><input type='text' class='payment-value-input' #{DISABLED} value='#{shouldPayValue}' uniqueId='#{uniqueId}' maxlength='8' onblur='return acceptpay.charge.gridHandler.onPaymentValueBlur.apply(this,[#{index}])'/>\
		<img src='#{addIconUrl}' #{editFeeDisabled} class = '#{imgClass}' style='margin-bottom:-5px' onclick = 'return acceptpay.charge.gridHandler.addPaymentDetail.apply(this,[#{index}]);'/>\
		</div>\
		";
		/**
		 * hebei-crm2.0/增加和删除费用明细按钮URL /add by yusong/@20120707
		 */
		var addIconUrl = BusCard.path.contextPath + "/common/images/button/add_button.png";
		var reduceIconUrl = BusCard.path.contextPath + "/common/images/button/reduce_button.png";
		
		/**
		 * hebei-crm2.0/获取所有缴费方式 /add by yusong/@20120707
		 */
		var allPaymentMethodList = BusCard.$remote("paymentMethodDAO").query({});
		
		/**
		 * hebei-crm2.0/计算应缴费用合计 /add by yusong/@20120707
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
		 * hebei-crm2.0/构建所有缴费方式合计 /add by yusong/@20120707
		 */
		var paymentTotalView = BusCard.map(allPaymentMethodList, function(paymentMethodVO) {
			// 如果不需要展现这么多 可以过滤掉对应的缴费选择合计
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
		 * hebei-crm2.0/获取一条账目非现金缴费总和 /add by yusong/@20120707
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
		 * hebei-crm2.0/获取一条账目非现金缴费总和 /add by yusong/@20120707
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
		 * hebei-crm2.0/设置正在处理blur事件的元素,主要为了解决IE能同时响应focus()方法而导致页面死锁
		 * /add by yusong/@20120707
		 */
		var setBlurElement = function(index) {
			this.blurElementUniqueId = index;
		};
		/**
		 * hebei-crm2.0/获取正在响应blur事件的元素唯一索引 /add by yusong/@20120707
		 */
		var getBlurElement = function() {
			return this.blurElementUniqueId;
		};
		/**
		 * hebei-crm2.0/根据付费方式计算并设置付费总额 /add by yusong/@20120707
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
		 * hebei-crm2.0/计算并且设置找零费用 /add by yusong/@20120707
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
		 * hebei-crm2.0/设置全局范围内展示信息 /add by yusong/@20120707
		 */
		var setGlobalInfomation = function() {
			computeAndSetPaymentValueByMethod();
			computeAndSetDibsPay();
			
		};
		
		//判断是否选择了银行分期付款，如果是，判断是否显示终端类型和终端串号
		var setPosBankInfomation = function(){
			var paymentDetailWrapperNodeList = BusCard.query("DIV[paymentDetailIndex]", card.dom);
			var posPaymentDetailWrapperNodeList = dojo.filter(paymentDetailWrapperNodeList, function(wrapperNode) {
					return BusCard.query(".payment-method-select", wrapperNode)[0].value==13;
		        });
			//默认不展现终端编号和终端类型
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
		 * FIXME 效率待优化 hebei-crm2.0/增加一条新的付费明细 /add by yusong
		 * 
		 * @param {String|Number} acct_item集合索引
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
				// FIXME 可以缓存这样的数据
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
		 * FIXME 效率待优化 hebei-crm2.0/付费金额失去焦点触发的检测 /add by yusong
		 * 
		 * @param {String|Number} acct_item集合索引
		 * 
		 */
		acceptpay.charge.gridHandler.onPaymentValueBlur = function(index) {
			var uniqueId = this.getAttribute("uniqueId");
			var obj = this;
			var blurElementUniqueId = getBlurElement();
			// 当前正在响应blur事件的元素和当前元素不一致时,直接返回
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
				// check-1:如果不是现金,保证当前缴费不大于应缴
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
				// check-2:保证当前费用项非现金缴费不大于应缴
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
				// check-3:保证缴费金额不小于应缴,不focus让用户有机会修改
				// 应缴小于缴费不再提示,提交时提示/modified by yusong @ 20120724 
				if (false&&getAllPaymentValue(index) < shouldPayValue) {
					orderaccept.common.dialog.MessageBox.alert({
				        busiCode : "08420015",
				        infoList : ["\u7f34\u8d39\u91d1\u989d\u4e0d\u80fd\u5c0f\u4e8e\u5e94\u7f34"]
			        });
					setBlurElement(null);
					setGlobalInfomation();
					return false;
				}
				//check-4:不允许输入负数
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
				// check-2:保证当前费用项非现金缴费不大于应缴
				var totalNotCashPaymentValue = getNotCashPaymentValue(index);
				if (totalNotCashPaymentValue > shouldPayValue) {
					orderaccept.common.dialog.MessageBox.alert({
				        busiCode : "08420015",
				        infoList : ["\u53ea\u6709\u73b0\u91d1\u7f34\u8d39\u5141\u8bb8\u5b9e\u7f34\u5927\u4e8e\u5e94\u7f34"]
			        });
					this.value = 1;
				}
				
			}
			//银行分期付款显示相应信息
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
			// 3:银行,2:支票,13银行分期付款
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
						// hebei-crm2.0/从元素数据取值,而不从格式化后的表格数据取值,因为表格中
						// 有些列模型中有些列已经不存在了,后续需要优化,减少对全局的依赖性 add by
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
				 * hebei-crm2.0/包含缴费方式和缴费费用 /add by yusong
				 * 
				 * @date 20120707
				 */
				shouldPayInfo : function(value, index, record) {
					if (index != lastIndex) {
						var acctItemTypeId = record.getByName("acctItemTypeId");
						// FIXME
						// 过于耦合全局数据,可以为表格增加acctItemType列,从而可以从record中取得
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
		 * FIXME 构建缴费提交数据,暂时忽略性能和安全性问题,调用后台的java程序以后可以平移到服务器端执行
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
			
			// 构建赠送类型payment表数据
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
			
			// 构建其他类型payment信息
			var paymentMethodIdWrapperNodeList = BusCard.findAll(BusCard.query("DIV[paymentMethodId]", card.dom),
			        function(wrapperNode) {
				        var paymentMethodId = wrapperNode.getAttribute("paymentMethodId");
				        var spanNode = BusCard.$("paymentTotal_" + paymentMethodId, wrapperNode);
				        var value = parseFloat(BusCard.trim(spanNode.innerHTML) || "0");
				        if (value > 0||value<0) { return true; }else{//如果费用是0，判断如果缴费方式有选择了的情况，才生成
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
			// 构建billVO
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
			
			// 构建Payment_detail数据
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
			// 构建赠送费用对应的payment_detail表数据
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
			// 第三步,构建转账务收取对应的acct_item
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
			
			// 第四步,构建付费方式对应的详细信息
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
				        // 不处理赠送费用
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
