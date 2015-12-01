BusCard.define('/buscardapp/protocol/js/card_pi_preInvoice.js',function(_buscard,cardParam){ 
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
	 * shouldPay input tempalte
	 * 
	 * @field
	 */

	var shouldPayValueTemplate = BusCard.Template
			.create("<span>#{shouldPayValue}</span>"||"<input type='text' value = '#{shouldPayValue}' onblur = 'return acceptpay.charge.gridHandler.shouldPayOnBlur(this,#{index});'/>")


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
	//alert(e.message)
	orderaccept.common.dialog.MessageBox.alert({busiCode:"08420015",infoList:[e.message]});
}
});
