BusCard.define('/buscardapp/protocol/js/card_pi_charge.js',function(_buscard,cardParam){ 
try {
	var card = this;
	var gridData = this.getCardRelationInfo().gridData;
	var tempGridData = BusCard.parse(BusCard.toJson(gridData));
	var numberPattern = /^(\-)?(\d+)(\.)?(\d*)$/;
	var firstCall = true;
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
		var havePayValueTotal = 0;

		BusCard.each(gridData, function(record) {
					var favourValue = (record.perferFee || 0);
					var feeValue = (record.feeValue || 0);
					var havePayValue = (record.havePayValue || 0);
					var shouldPayValue = record.shouldPayValue;
					if (firstCall) {
						shouldPayValue = feeValue - havePayValue - favourValue;
						record.shouldPayValue = shouldPayValue;
					}
					shouldPayValueTotal += shouldPayValue;
					feeValueTotal += feeValue;
					havePayValueTotal += havePayValue;
				});
		firstCall = false;
		return {
			serviceId : serviceId,
			shouldPayValue : shouldPayValueTotal.toFixed(2),
			feeValue : feeValueTotal.toFixed(2),
			havePayValue : havePayValueTotal.toFixed(2),
			feeSum : shouldPayValueTotal.toFixed(2)
		};
	};
	tempGridData.push(card.computeTotalValue());
	var lastIndex = gridData.length;

	BusCard.Namespace.create("acceptpay.charge.gridHandler");
	var serviceParamBO = BusCard.$remote("serviceParamBO");
	/**
	var paymentMethodColl = serviceParamBO.getPaymentMethodColl();

	var allSelectMethodOptionList = BusCard.Template.create("<tp:for ds='list'><option value='#{id}'>#{name}</option></tp:for>")
			.apply(paymentMethodColl);

	var allSelectMethodOptionExceptTransBillList = BusCard.Template
			.create("<tp:for ds='list'><tp:if $$.id != '4'><option value='#{id}'>#{name}</option></tp:if></tp:for>").apply(paymentMethodColl);
	
	*/
	/**
	 * paymethod select template
	 * 
	 * @field
	 */
	/** 
	var allSelectMethodTemplate = BusCard.Template
			.create("<select onchange='return acceptpay.charge.gridHandler.paymentMethodOnChange(this,#{index});'>" + allSelectMethodOptionList
					+ "</select>");*/
	/**
	 * payemthod select template except trans bill
	 * 
	 * @field
	 */
	/**
	var exceptTBTemplate = BusCard.Template.create("<select onchange='return acceptpay.charge.gridHandler.paymentMethodOnChange(this,#{index});'>"
			+ allSelectMethodOptionExceptTransBillList + "</select>");*/
	/**
	 * shouldPay input tempalte
	 * 
	 * @field
	 */

	var shouldPayValueTemplate = BusCard.Template
			.create("<input type='text' value = '#{shouldPayValue}' onblur = 'return acceptpay.charge.gridHandler.shouldPayOnBlur(this,#{index});'/>")

	/**
	 * update feeSum element,used by ifCheck listener and shouldPayValue listener
	 * 
	 * @private
	 * @function
	 */
	var updateFeeSumView = function() {
		getTotalShouldPayElem().innerHTML = compluteCheckedTotal().toFixed(2);
	};
	/**
	 * update dibs_pay element,used by ifCheck listener and shouldPayValue listener
	 * 
	 * @private
	 * @function
	 * 
	 */
	var updateDibsPayView = function() {
		var grid = card.getGrid();
		var commCard = PayBusFeeManager.getCommCard();
		var back_fee_mode = commCard.$("back_fee_mode");
		var checkedRows = getCheckedRows();
		var dibsPayTotal = 0;
		var shouldPayTotal = 0;
		var sumTotal = 0;
		BusCard.each(checkedRows, function(row) {
					var paymentMethodElem = grid.findCellByName(row, "paymentMethodId").getElementsByTagName("SELECT")[0];
					var feeSumElem = grid.findCellByName(row, "feeSum");
					var shouldPayElem = grid.findCellByName(row, "shouldPayValue").getElementsByTagName("INPUT")[0];
					var paymentMethodId = parseInt(paymentMethodElem.value);
					if (paymentMethodId == 1) {
						var feeSumValue = parseFloat(BusCard.trim(feeSumElem.innerHTML));
						var shouldPayValue = parseFloat(shouldPayElem.value.toString());
						shouldPayTotal += shouldPayValue;
						sumTotal += feeSumValue;
						//if (shouldPayValue > feeSumValue) {
						//	dibsPayTotal += parseFloat((shouldPayValue - feeSumValue).toFixed(2));
						//}
					}
				});
		if(shouldPayTotal>0&&shouldPayTotal>sumTotal){
			dibsPayTotal += parseFloat((shouldPayTotal - sumTotal).toFixed(2));
		}
		if(shouldPayTotal<0){
			dibsPayTotal -= shouldPayTotal;
		}
		commCard.assignValue(commCard.$("dibs_pay"), dibsPayTotal.toFixed(2));
	};

	/**
	 * get all checked rows
	 */
	var getCheckedRows = function() {
		var grid = card.getGrid();
		var rows = grid.getDomElement().rows;
		return BusCard.findAll(rows, function(row) {
					var ifCheckTdElem = grid.findCellByName(row, "ifCheck");
					var inputElemList = ifCheckTdElem.getElementsByTagName("INPUT");
					return (inputElemList.length > 0) && inputElemList[0].checked;
				});
	};

	/**
	 * compute total fee for checked item
	 * 
	 * @private
	 * @field
	 * @function
	 */
	var compluteCheckedTotal = function() {
		var gridRows = card.getGrid().getDomElement().rows;
		var value = 0;
		var totalShouldPayElem = BusCard.each(gridRows, function(row) {
					var feeValue = 0;
					var cells = row.cells;
					var checkboxElemList = cells[0].getElementsByTagName("INPUT");
					if (checkboxElemList.length > 0) {
						var checkboxElem = checkboxElemList[0];
						if (checkboxElem.checked) {
							var shouldPayElem = BusCard.find(cells, function(tdElem) {
										return BusCard.$attr(tdElem, 'name') == 'shouldPayValue';
									}).getElementsByTagName("INPUT")[0];
							value += parseFloat(parseFloat(shouldPayElem.value.toString()).toFixed(2));

						}

					}
				});
		return value;

	};

	/**
	 * get total should pay element
	 * 
	 * @private
	 * @function
	 */
	var getTotalShouldPayElem = function() {
		var gridRows = card.getGrid().getDomElement().rows;
		return BusCard.find(gridRows[gridRows.length - 1].cells, function(tdElem) {
					return BusCard.$attr(tdElem, 'name') == 'shouldPayValue';
				});

	};

	var checkAllowChargeMore = function(row) {
		var grid = card.getGrid();
		var feeSum = parseFloat(grid.findCellByName(row, "feeSum").innerHTML);
		var shouldPayValueElem = grid.findCellByName(row, "shouldPayValue").getElementsByTagName("INPUT")[0];
		var paymentMethodIdElem = grid.findCellByName(row, "paymentMethodId").getElementsByTagName("SELECT")[0];
		var shouldPayValue = parseFloat(shouldPayValueElem.value.toString());
		if (paymentMethodIdElem.value != 1 && (shouldPayValue > feeSum)) {
			alert("\u53ea\u6709\u73b0\u91d1\u7f34\u8d39\u5141\u8bb8\u5b9e\u7f34\u5927\u4e8e\u5e94\u7f34");
			shouldPayValueElem.focus();
			return false;
		}
		return true;

	};

	/**
	 * define listener listening onblur event of shouldPayValue
	 * 
	 * @function
	 */

	acceptpay.charge.gridHandler.shouldPayOnBlur = function(elem, index) {
		var trElem = elem.parentNode.parentNode;
		var value = elem.value;
		var shouldPayValue = parseFloat(parseFloat(value.toString()).toFixed(2));
		var checkboxElem = trElem.cells[0].getElementsByTagName("INPUT")[0];
		if (!numberPattern.test(value)) {
			alert("\u8bf7\u8f93\u5165\u6570\u5b57");
			elem.focus();
			return false;
		}
		if (!checkAllowChargeMore(trElem)) {
			return;
		}
		if (!checkboxElem.checked) {
			return;
		}
		gridData[index].shouldPayValue = shouldPayValue;
		updateFeeSumView();
		updateDibsPayView();

	};
	/**
	 * define listener listening onclick event of ifCheck
	 * 
	 * @function
	 */
	acceptpay.charge.gridHandler.clickIfCheck = function(elem, index) {
		updateFeeSumView();
		updateDibsPayView();
	};
	/**
	 * define listener listening onchange event of paymentMethodId
	 * 
	 * @function
	 */
	acceptpay.charge.gridHandler.paymentMethodOnChange = function(elem, index) {
		var paymentMethodId = parseInt(elem.value.toString());
		try {
			checkAllowChargeMore(elem.parentNode.parentNode);
			gridData[index].paymentMethodId = paymentMethodId;
			var commCard = PayBusFeeManager.getCommCard();
			var subGroup = commCard.getSubGroupById("paymentMethod_" + paymentMethodId);
			try {
				commCard.displaySubGroup(subGroup);
				BusCard.fx.shade(subGroup, null, 600);
			}
			catch (e) {

			}
			handlePaymentInfo();
			updateDibsPayView();
		}
		catch (e) {
			alert(e.message)
		}

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
		// 3:ÒøÐÐ,2:Ö§Æ±
		var paymentMethodList = [];
		BusCard.each(rows, function(row) {
					var paymentMethodTdElem = grid.findCellByName(row, "paymentMethodId");
					var selectElems = paymentMethodTdElem.getElementsByTagName("SELECT");
					if (selectElems.length > 0) {
						paymentMethodList.push(parseInt(selectElems[0].value.toString()));
					}
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
		var commCard = PayBusFeeManager.getCommCard();
		if (!bankFlag) {
			var bankSubGroup = commCard.getSubGroupById("paymentMethod_" + 3);
			commCard.hiddenSubGroup(bankSubGroup);
		}
		if (!checkFlag) {
			var checkSubGroup = commCard.getSubGroupById("paymentMethod_" + 2);
			commCard.hiddenSubGroup(checkSubGroup);
		}
		if(!tsFlag){
			var checkSubGroup = commCard.getSubGroupById("paymentMethod_" + 6);
			commCard.hiddenSubGroup(checkSubGroup);
		
		}

	};

	/**
	 * define ifCheck render template
	 * 
	 * @field
	 */
	var ifCheckTp = BusCard.Template
			.create("<input type='checkbox' name='ifCheck' CHECKED onclick = 'return acceptpay.charge.gridHandler.clickIfCheck(this,#{index});'/>")
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
			ifCheck : function(value, index) {
				if (index != lastIndex) return ifCheckTp.apply({
							index : index
						});
			},
			paymentMethodId : function(value, index, record) {
				var transBill = record.getByName("transBill");
				var acctItemTypeId = record.getByName("acctItemTypeId");
				var paymentMethodColl = serviceParamBO.getPaymentMethodColl(acctItemTypeId);
				if (index != lastIndex) {
					if (transBill == 0){
						var allSelectMethodOptionExceptTransBillList = BusCard.Template
                        .create("<tp:for ds='list'><tp:if $$.id != '4'><option value='#{id}'>#{name}</option></tp:if></tp:for>").apply(paymentMethodColl);
						var exceptTBTemplate = BusCard.Template.create("<select onchange='return acceptpay.charge.gridHandler.paymentMethodOnChange(this,#{index});'>"
                        + allSelectMethodOptionExceptTransBillList + "</select>");
						return exceptTBTemplate.apply({
									index : index
								});
					}else{
						var allSelectMethodOptionList = BusCard.Template.create("<tp:for ds='list'><option value='#{id}'>#{name}</option></tp:for>")
                        .apply(paymentMethodColl);
						var allSelectMethodTemplate = BusCard.Template
                        .create("<select onchange='return acceptpay.charge.gridHandler.paymentMethodOnChange(this,#{index});'>" + allSelectMethodOptionList
                                        + "</select>");
						return allSelectMethodTemplate.apply({
									index : index
								});
					}
						

				}
				else
					return "";
			},
			feeValue : function(value, index, record) {
				if (index != lastIndex) {
					var feeValue = record.getByName("feeValue") || 0;
					var shouldPayValue = feeValue.toFixed(2);
					return shouldPayValue;
				}
				else {
					return value;
				}

			},
			shouldPayValue : function(value, index, record) {
				if (index != lastIndex) {
					var favourValue = record.getByName("perferFee") || 0;
					var havePayValue = record.getByName("havePayValue") || 0;
					var feeValue = record.getByName("feeValue") || 0;
					var shouldPayValue = (feeValue - havePayValue - favourValue).toFixed(2);
					return shouldPayValueTemplate.apply({
								shouldPayValue : shouldPayValue,
								index : index
							});
				}
				else {
					return value;
				}

			},
			feeSum : function(value, index, record) {
				if (index != lastIndex) {
					var favourValue = record.getByName("perferFee") || 0;
					var havePayValue = record.getByName("havePayValue") || 0;
					var feeValue = record.getByName("feeValue") || 0;
					var shouldPayValue = (feeValue - havePayValue - favourValue).toFixed(2);
					return  shouldPayValue;
				}
				else {
					return value;
				}
			},
			havePayValue : function(value, index, record) {
				if (index != lastIndex) {
					var havePayValue = record.getByName("havePayValue") || 0;
					return havePayValue.toFixed(2);
				}
				else {

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
			}

		}

	};
	/**
	 * collect selected data
	 * 
	 * @method
	 */
	card.collectData = function() {
		var rows = getCheckedRows();
		var filterData = BusCard.map(rows, function(row) {
					var acctItemId = parseInt(card.getGrid().findCellByName(row, "acctItemId").innerHTML);
					return BusCard.find(gridData, function(record) {
								return record.acctItemId == acctItemId;
							});

				});
		return filterData;

	};

}catch (e) {
	alert(e.message)
}
});
