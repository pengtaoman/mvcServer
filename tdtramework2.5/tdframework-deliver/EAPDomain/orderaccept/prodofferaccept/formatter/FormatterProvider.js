defineModule("orderaccept.prodofferaccept.formatter.FormatterProvider", [
				"orderaccept.custom._BusCardTemplated", "../util"], function(
				_Templated, util) {
			var SubProdOfferHelper = {

				/**
				 * 创建可选包表格中的第一列
				 */
				createSubProdOfferDetail : function(rowIndex, bindingData) {
					var subProdOfferCell0Html = BusCard.Template
							.create("<div class='subProdOfferDetail-#{rowIndex}'><input type='checkbox' #{disabledOption} #{checkedOption} rowIndex='#{rowIndex}' id='#{viewId}' name='prodOfferCheck' value='#{subProdOfferInfo.prodOfferId}' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/subProdOfferCheck'/>"
									+ "&nbsp;&nbsp;<span id='prodOfferName-#{viewId}' rowIndex='#{rowIndex}' style='color:red;cursor:pointer' dojoAttachEvent='onclick:elementclick,onmouseover:elementmouseover,onmouseout:elementmouseout' dojoAttachTopic='/prodOfferName'>#{subProdOfferInfo.prodOfferName}</span>"
									+ "<tp:if $$.prodOfferDetailFlag==1>"
									+ "<a href='javascript:void(0);' id='prodOfferLink-key-#{rowIndex}' class='sub-prodoffer-detail' rowIndex='#{rowIndex}' name='productLink' value='#{subProdOfferInfo.prodOfferId}' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/prodOfferLink'>[\u9500\u552e\u54c1\u8be6\u60c5"
									+ "<img id='finishImg-#{rowIndex}' class='#{finishImg}' src='"+BusCard.path.contextPath+"/common/images/icon/finish_icon.png'></img><span class='formRequested #{detailNotNull}'>*</span>]</a>"
									+ "</tp:if></div>");
					bindingData.showData.rowIndex = rowIndex;
					return subProdOfferCell0Html.apply(bindingData.showData);
				},
				/**
				 * 创建可选包表格中的开始时间一列
				 */
				createSubProdOfferStartDate : function(rowIndex, bindingData) {
					var subProdOfferCell1Html = BusCard.Template
							.create("<div class='subProdOfferStartDate-#{rowIndex}'><span class='start_date_class'>#{startDate}</span><div id='productStartDateView-#{viewId}' style='#{dateStyle.startDateView}'><span class='productStartDateStyle#{productStartDateHtml.style.hiddenStyleOption}'>"
									+ "<input type='hidden' id='delayTime-#{viewId}' value = '#{productStartDateHtml.data.time}'/>"
									+ "#{productStartDateHtml.data.delayUnitViewInstance}</span></div></div>");
					return subProdOfferCell1Html.apply(bindingData.showData);
				},
				/**
				 * 创建可选包表格中的结束时间一列
				 */
				createSubProdOfferEndDate : function(rowIndex, bindingData) {
					//退订可选包的时间控件
					var cancelTimeHtml = "<span class='delay_date_class'>#{delayEndDate}</span>" +
							"<span class='prodDelayEndDateStyle#{prodOfferEndDateView.style.hiddenStyleOption}'>"
							+ "<input type='hidden' id='delayEndTime-#{viewId}' value = '#{prodOfferEndDateView.data.time}'/>"
							+ "#{prodOfferEndDateView.data.delayUnitViewInstance}</span>";
					var subProdOfferCell2Html = BusCard.Template
							.create("<div class='subProdOfferEndDate-#{rowIndex}'><span id='offerEndDateDisplay-#{viewId}' class='end_date_class'>#{endDate}</span><div id='productEndDateView-#{viewId}' style='#{dateStyle.endDateView}'><span class='productEndDateStyle#{productEndDateHtml.style.hiddenStyleOption}'>\u6709\u6548\u671f:<select id='validPeriod-#{viewId}' style='width:20%'> #{productEndDateHtml.data.validPeriodOption}</select>"
									+ "<select id='validType-#{viewId}' style='width:25%'>#{productEndDateHtml.data.validTypeOption}</select>"
									+ " <input type='hidden' id='prodCycleSize-#{viewId}' value = '#{productEndDateHtml.data.prodCycleSize}'/></span>"
									+ "<span class='offerEndDateCycleStyle#{productEndDateHtml.style.cycleStyleOption}'>\u6709\u6548\u671f:<select id='cyclePeriod-#{viewId}'> #{productEndDateHtml.data.cycleOption}</select>"
									+ "</span></div>"
									+ "<div id='offerDelayEndDateView-#{viewId}' style='#{dateStyle.delayEndDateView}'>"+cancelTimeHtml+"</div><div>");
					return subProdOfferCell2Html.apply(bindingData.showData);
				},
				/**
				 * 创建可选包表格中的状态一列
				 */
				createSubProdOfferStatus : function(rowIndex, bindingData) {
					var orderStatusHtml = BusCard.Template
							.create("<div class='orderStatus_#{rowIndex}'>#{orderStatus}</div>");
					return orderStatusHtml.apply(bindingData.showData);
				},
				/**
				 * 创建可选包表格中使用号码一列
				 */
				createSubProdOfferServiceIdList : function(rowIndex,
						bindingData) {
					var serviceIdHtml = BusCard.Template
							.create("<div class ='choose_number_class_#{rowIndex}'><tp:if $$.chooseNumberObj!=null><span  serviceKind='#{chooseNumberObj.serviceKind}' serviceKindIndex='#{chooseNumberObj.serviceKindIndex}' name ='#{rowIndex}' id='selected_number_#{chooseNumberObj.serviceKind}_#{chooseNumberObj.serviceKindIndex}'>#{chooseNumberObj.serviceId}</span></tp:if><span>&nbsp;&nbsp;</span></div>");
					return serviceIdHtml.apply(bindingData.showData);
				},
				/**
				 * 创建可选包收藏和取消
				 */
				createSubProdOfferCollect : function(rowIndex, bindingData) {
					var selectedMainProdOfferInfoVO = $ac$.selectedMainProdOfferInfoVO;
					if(selectedMainProdOfferInfoVO.bindType == 2){
						var prodOfferList = dojo.global.$appContext$
								.get("prodOfferList"+bindingData.uniqueId), 
						prodOfferInfoVO = util.ProdOfferHelper
								.getMainProdOffer(prodOfferList)[0];
						bindingData.showData.mainProdOfferId = prodOfferInfoVO.prodOfferId;
					}else{
						var prodOfferList = dojo.global.$appContext$
								.get("prodOfferList"), 
						prodOfferInfoVO = util.ProdOfferHelper
								.getMainProdOffer(prodOfferList)[0];
						bindingData.showData.mainProdOfferId = prodOfferInfoVO.prodOfferId;
					}
					return BusCard.Template
							.create("<div class='collect_prodOffer_#{rowIndex}' style='text-align:center'>"
									+ "<img class='collect-#{rowIndex}' name='collectProdOffer' src='"
									+ BusCard.path.contextPath
									+ "/common/images/button/button_addFav.png' value='#{subProdOfferInfo.prodOfferId}~#{subProdOfferInfo.prodOfferName}~#{subProdOfferInfo.prodOfferType}~#{mainProdOfferId}'"
									+ "style='cursor: pointer; width: 20px; height: 20px;margin-right:10px' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/prodOfferCollect' title='收藏'/>&nbsp;&nbsp;"
									+ "<img class='cancelCollect-#{rowIndex}' name='cancelCollectProdOffer' src='"
									+ BusCard.path.contextPath
									+ "/common/images/button/button_cancelFav.png' value='#{subProdOfferInfo.prodOfferId}~#{subProdOfferInfo.prodOfferType}~#{mainProdOfferId}'"
									+ "style='cursor: pointer; width: 20px; height: 20px;' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/prodOfferCancelCollect' title='取消收藏'/></div>")
							.apply(bindingData.showData);
				},
				/**
				 * 创建可选包表格中的删除按钮
				 */
				createSubProdOfferDelView : function(rowIndex,
						bindingData) {
					var delViewHtml = BusCard.Template
							.create("<div class ='offer_del_class_#{rowIndex}'><img class='sub-prodoffer-del-img_#{rowIndex}' #{disabledDelViewOption} rowIndex='#{rowIndex}'"
									+"src='" 
									+BusCard.path.contextPath
									+"/common/images/button/reduce_button.png'"
									+"style='cursor: pointer; width: 15px; height: 15px;'"
									+"dojoAttachEvent='onclick:elementclick'"
									+"dojoAttachTopic='/delSubProdOfferView' /></div>");
					return delViewHtml.apply(bindingData.showData);
				}

			};
			orderaccept.prodofferaccept.formatter.FormatterProvider.SubProdOfferHelper = SubProdOfferHelper;

		});