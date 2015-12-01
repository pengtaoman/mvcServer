BusCard.define('/buscardapp/protocol/js/card_pi_budget.js', function(_buscard, cardParam) {
	var actualAmountRenderTp = "<input type='text' value='#{value}' #{readOnly} ifModify='#{ifModify}' name = 'actualAmount'  onblur = 'return _budget_._temp_._update_.apply(this,[\"#{index}\",\"actualAmount\"])' />";
	var manualFavourReasonRenderTp = "<input type='text' value='#{value}' style='width:100%' onblur = 'return  _budget_._temp_._update_.apply(this,[\"#{index}\",\"manualFavourReason\"])'/>";
//	var manualFavourValueRenderTp = "<input type = 'text'  ifModify = '#{ifModify}' name = 'manualFavourValue' value = '0' DISABLED  onblur = 'return _budget_._temp_._update_.apply(this,[\"#{index}\",\"manualFavourValue\"]);' />";
	BusCard.Namespace.create("_budget_._temp_._update_");
	_budget_._temp_._update_ = function(index, fieldName) {
		var that = this;
		var value = that.value;
		var shouldAmount = _budget_._temp_._data_[index].amount;
		var favourValue = _budget_._temp_._data_[index].favourValue;
		if (fieldName == 'actualAmount') {
			value = rmoney(value);
			if (!/^(\-)?(\d+)(\.(\d+))?$/.test(value)) {
				// alert("实收金额必须为数字!");
				try{
					orderaccept.common.dialog.MessageBox.alert({
					        busiCode : "08420026"
				        });
				}catch(e){
					alert("\u5b9e\u6536\u91d1\u989d\u5fc5\u987b\u4e3a\u6570\u5b57!");
				}
				that.value = (parseFloat(shouldAmount.toString()).toFixed(2)
				       		 - parseFloat(favourValue.toString()).toFixed(2)).toFixed(2);
				this.focus();
				return false;
			} else {
				var manualFavourValue = (parseFloat(shouldAmount.toString()).toFixed(2)
				        - parseFloat(favourValue.toString()).toFixed(2) - parseFloat(value.toString()).toFixed(2))
				        .toFixed(2);
				if(value < 0){
					try{
						orderaccept.common.dialog.MessageBox.confirm({
						busiCode:'08510183',
						infoList:["\u786e\u5b9a\u4f18\u60e0\u91d1\u989d\u8981\u5927\u4e8e\u5b9e\u6536\u91d1\u989d\uff1f"],
						onComplete: function(returnValue){
										if(!returnValue){
											that.value = parseFloat(parseFloat(shouldAmount.toString()) - parseFloat(favourValue.toString())).toFixed(2);
											manualFavourValue = (parseFloat(shouldAmount.toString()).toFixed(2)
					        									- parseFloat(favourValue.toString()).toFixed(2)).toFixed(2);
					        				that.focus();
										}
										_budget_._temp_._data_[index].manualFavourValue = manualFavourValue;
										BusCard.util.find(that.parentNode.parentNode.cells, function(node) {
											        return node.name == 'manualFavourValue';
										        }).innerHTML = fmoney(manualFavourValue,2);
										_budget_._temp_._data_[index].actualAmount = parseFloat(that.value).toFixed(2);
										that.value = fmoney(that.value,2);
										updateTotalAmount(cardParam.totalAmountContainer, gridData);
									}
						});
					}catch(e){
						if(confirm("\u786e\u5b9a\u4f18\u60e0\u91d1\u989d\u8981\u5927\u4e8e\u5b9e\u6536\u91d1\u989d\uff1f")){
							_budget_._temp_._data_[index].manualFavourValue = manualFavourValue;
							BusCard.util.find(that.parentNode.parentNode.cells, function(node) {
						        return node.name == 'manualFavourValue';
					        }).innerHTML = fmoney(manualFavourValue,2);
							_budget_._temp_._data_[index].actualAmount = parseFloat(that.value).toFixed(2);
							that.value = fmoney(that.value,2);
							updateTotalAmount(cardParam.totalAmountContainer, gridData);
						}else{
							that.value = parseFloat(parseFloat(shouldAmount.toString()) - parseFloat(favourValue.toString())).toFixed(2);
											manualFavourValue = (parseFloat(shouldAmount.toString()).toFixed(2)
					        									- parseFloat(favourValue.toString()).toFixed(2)).toFixed(2);
	       					that.focus();
						}
					}
					return true;
				}
				_budget_._temp_._data_[index].manualFavourValue = manualFavourValue;
				BusCard.util.find(this.parentNode.parentNode.cells, function(node) {
					        return node.name == 'manualFavourValue';
				        }).innerHTML = fmoney(manualFavourValue,2);
				_budget_._temp_._data_[index].actualAmount = parseFloat(value).toFixed(2);
				that.value = fmoney(value,2);
				updateTotalAmount(cardParam.totalAmountContainer, gridData);
				return true;
			}
		} else if (fieldName == 'manualFavourValue') {
			// FIXME 待改提示信息
			if (parseFloat(value) < 0) {
				try{
					orderaccept.common.dialog.MessageBox.alert({
						busiCode:'08510183',
						infoList:["\u4f18\u60e0\u91d1\u989d\u4e0d\u53ef\u4ee5\u662f\u8d1f\u503c!"]
						});
				}catch(e){
					alert("\u4f18\u60e0\u91d1\u989d\u4e0d\u53ef\u4ee5\u662f\u8d1f\u503c!");
				}
				that.value = 0.00;
				this.focus();
				return false;
			}
			value = rmoney(value);
			if (!/^(\-)?(\d+)(\.(\d+))?$/.test(value)) {
				try{
					orderaccept.common.dialog.MessageBox.alert({
						        busiCode : "08420026"
					        });
				}catch(e){
					alert("实收金额必须为数字!");
				}
				that.value = 0.00;
				this.focus();
				return false;
			}else{
				var shouldAmount = _budget_._temp_._data_[index].amount;
				var favourValue = _budget_._temp_._data_[index].favourValue;
				var manualFavourValue = (parseFloat(shouldAmount.toString()).toFixed(2)
				        - parseFloat(favourValue.toString()).toFixed(2) - parseFloat(value.toString()).toFixed(2))
				        .toFixed(2);
				if(manualFavourValue < 0){
					try{
						orderaccept.common.dialog.MessageBox.alert({
							        busiCode : "08410227"
						        });
					}catch(e){
						alert("\u5b9e\u6536\u91d1\u989d\u4e0d\u80fd\u5c0f\u4e8e\u5e94\u6536\u91d1\u989d!");
					}
					that.value = 0.00;
					this.focus();
					return false;
				}
			}
			_budget_._temp_._data_[index][fieldName] = parseFloat(value).toFixed(2);
			that.value = fmoney(value,2);
			return true;
		}
		
		_budget_._temp_._data_[index][fieldName] = value;
	};
	var comfirmReturn = function(eventFlag){
		if(eventFlag){
			
		}else{
			
		}
	}
	//格式话金额    
	var fmoney = function(s, n){//保留两位小数s:value,n:小数位数      
		    n = n > 0 && n <= 20 ? n : 2;   
		    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
		    /*
		    var l = s.split(".")[0].split("").reverse(),   
		    r = s.split(".")[1];   
		    t = "";   
		    for(i = 0; i < l.length; i ++ )   
		    {   
		    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
		    }  
		    return t.split("").reverse().join("") + "." + r;   
		    */
		    return s;
		};  
	//还原金额   
	var rmoney = function(value){
	        if(value == "" || value == null){
				value = 0.00;
			}else{
				value =  parseFloat(value.replace(/[^\d\.-]/g, ""));	
			} 
			return value;
		};
	//更新合计
	var updateTotalAmount = function(totalAmountContainer, data) {
        var totalAmount = 0;
        for(var i = 0,j = data.length; i < j; i++){
			var actualAmount = parseFloat(data[i].actualAmount);
			totalAmount += actualAmount;
		}
		totalAmountContainer.innerHTML = "\u5408\u8ba1:"+fmoney(totalAmount,2)+"\u5143";
	};
	var gridData = this.getCardRelationInfo().gridData;
	this.gridConfig = {
		loadGridData : function() {
			var fGridData = gridData;
			for(var i = 0; i < fGridData.length; i++){
				fGridData[i].actualAmount = fmoney(fGridData[i].actualAmount, 2);
				fGridData[i].manualFavourValue = fmoney(fGridData[i].manualFavourValue, 2);
				fGridData[i].favourValue = fmoney(fGridData[i].favourValue, 2);
				fGridData[i].amount = fmoney(fGridData[i].amount, 2);
			}
			return fGridData;
		},
		columnRender : {
			actualAmount : function(value, index, record) {
				var tp = BusCard.Template.create(actualAmountRenderTp);
				// 初始化都不能修改
				var ifModify = "DISABLED" || (record.getByName("ifModify") ? "DISABLED" : "");
				var html = tp.apply({
					        readOnly : ifModify,
					        value : value + "",
					        index : index + "",
					        ifModify : record.getByName("ifModify") + ""
				        });
				return html;
			},
			
			favourReason : function(value, index, record) {
				return "<span>" + value + "</span>";
			},
			/*
			manualFavourValue : function(value, index, record) {
				return BusCard.Template.create(manualFavourValueRenderTp).apply({
					        index : index,
					        ifModify : record.getByName("ifModify") + ""
				        });
				
			},*/
			manualFavourReason : function(value, index, record) {
				var tp = BusCard.Template.create(manualFavourReasonRenderTp);
				return tp.apply({
					        index : index + "",
					        value : value
				        });
			}
		}
		
	};
});
