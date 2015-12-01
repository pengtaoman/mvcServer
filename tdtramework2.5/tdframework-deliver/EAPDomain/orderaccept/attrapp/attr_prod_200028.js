BusCard.define('/orderaccept/attrapp/attr_prod_200028.js', function(_buscard,
		cardParam) {
	var prodOfferAcceptPageDispatch = function() {
		var Me = this;
		if (Me.$("200051").value != "90000001") {
			Me.$("200028").disabled = true;
		} else {
			dojo.byId("search_200028").style.display = "none";
		}

		this.addEventListener("oncomplete", function() {
			if (!!Me.$("200028")) {
				// 如果有实例数据
				// if($ac$.mainProdOfferInstVO){
				// BusCard.each($ac$.mainProdOfferInstVO.prodInstList,function(prodInstInfo){
				// return
				// dojo.some(prodInstInfo.prodInstAttrList,function(attrInst){
				// if(attrInst.attrCd=="200028"){
				// Me.$("200051").disabled = true;
				// Me.$("200028").rvalue = attrInst.attrValue;
				// return false;
				// }
				// })
				//				
				// })
				// }
				if ($ac$.mainProdOfferInstVO
						&& $ac$.selectedMainProdOfferInfoVO) {
					Me.$("200051").disabled = true;
					if (Me.$("200051").value != "90000001") {
						BusCard.each($ac$.selectedMainProdOfferInfoVO.offerProdRelaList,
							function(offerProdRela) {
								return dojo.some(offerProdRela.productInfoVO.attrList,function(attrInfo) {
											if (attrInfo.attrCd == "200028") {
												Me.$("200028").value = BusCard.jsonPath(attrInfo,
																"$.attrValueList[?(@.attrValue=="+ Me.$("200028").rvalue
																		+ ")]")[0].attrValueName;
												return false;
											}
										})
							})
					}
				}
				Me.$("200028").onquery = function() {
					// 取所属产品规格层面属性值集合
					var attrList = dijit.getEnclosingWidget(Me.dom).productInfoVO.attrList;
					var attrInfo = dojo.filter(attrList, function(attrInfo) {
								return attrInfo.attrCd == "200028";
							})[0];
					var attrValueList = [];
					if (Me.$("200051").value == "90000001") {
						return null;
					} else if (Me.$("200051").value == "90000005") {
						dojo.forEach(attrInfo.attrValueList, function(data) {
									var obj = {
										id : data.attrValue,
										name : data.attrValueName
									};
									attrValueList.push(obj);
								})
						// var checkbox = this, _card = arguments[0], _buscard =
						// arguments[1], _p = arguments[2];
						return attrValueList;
					} else {
						var newAttrInfo = dojo.filter(attrInfo.attrValueList,
								function(data) {
									return data.attrValue == "8";// 写死成60元/月/终端
								})[0];
						attrValueList.push({
									id : newAttrInfo.attrValue,
									name : newAttrInfo.attrValueName
								})
						return attrValueList;
					}
				};
				Me.$("200028").onblur = function() {
					if (Me.$("200028").value != "") {
						if (!/^\d+(\.\d+)?$/i.test(Me.$("200028").value)) {
							orderaccept.common.dialog.MessageBox.alert({
										busiCode : "08410218"
									});
							Me.$("200028").value = "";
						}
						dojo.byId("200028", Me.domNode).rvalue = Me.$("200028").value;
					}
				};
				// Me.$("200051").onchange = function(){
				// Me.$("200028").value="";
				// dojo.byId("200028",Me.domNode).rvalue="";
				// if(Me.$("200051").value!="1000000101"){
				// Me.$("200028").disabled = true;
				// dojo.byId("search_200028").style.display = "";
				// }else{
				// Me.$("200028").disabled = false;
				// dojo.byId("search_200028").style.display = "none";
				// }
				// }
			}
		});

	};
	var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	/**
	 * 综合查询页面处理分支
	 * 
	 * @method
	 */
	var allInfoQueryPageDispatch = function() {
	};
	/**
	 * 二次业务处理分支
	 * 
	 * @method
	 */
	var secondBusinessPageDispatch = function() {
	};
	/**
	 * 批量页面处理分支
	 * 
	 * @method
	 */
	var batchPageDispatch = function() {
	};

	// 调用具体分支处理逻辑
	return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
