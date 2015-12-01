defineModule("orderaccept.prodofferaccept.formatter.PromotionFormatterProvider",
	["orderaccept.custom._BusCardTemplated","../util"],function(_template,util){
		var promotionFormatter = {
			
			PageInfoInit : {},
			/**
			 * 创建促销政策表格中第一列(名称)
			 */
			createPromotionNameDetail : function(rowIndex,bindingData){
				var promotionNameHTML = BusCard.Template
							.create("<div class='promotionNameDetail-#{rowIndex}'><input type='checkbox' #{disabledOption} #{checkedOption} rowIndex='#{rowIndex}' id='#{viewId}' name='promotionChecked' value='#{promotionInfo.promotionId}' promotionStyle='#{promotionStyle}' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/promotionChecked'/>"
							+ "&nbsp;&nbsp;&nbsp;<span id='promotionName-#{viewId}' style='color:red;cursor:pointer' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/promotionName'>#{promotionName}</span>&nbsp;&nbsp;"
							+ "<tp:if $$.promotionStyle=='promotion-change'>"
							+ "<a href='javascript:void(0);' id='promotionDetailLink-#{viewId}' style='color:#3399cc;font-weight:bold;cursor:pointer' rowIndex='#{rowIndex}' name='promotionDetailLink' value='#{promotionInfo.promotionId}' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/promotionChangeDetailLink'>[\u4fc3\u9500\u653f\u7b56\u8be6\u60c5]</a>"
							+ "</tp:if>"
							+ "<tp:if $$.promotionStyle=='promotion-new'>"
							+ "<a href='javascript:void(0);' id='promotionDetailLink-#{viewId}' style='color:#3399cc;font-weight:bold;cursor:pointer' rowIndex='#{rowIndex}' name='promotionDetailLink' value='#{promotionInfo.promotionId}' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/promotionDetailLink'>[\u4fc3\u9500\u653f\u7b56\u8be6\u60c5]</a>"
							+ "</tp:if>"
							+ "&nbsp;<img id='finishPage-#{rowIndex}' style='display:none' src='"+BusCard.path.contextPath+"/common/images/icon/finish_icon.png'></img>"
							+ "</div>");
				bindingData.showData.rowIndex = rowIndex;
				return promotionNameHTML.apply(bindingData.showData);
			},
			/**
			 * 创建促销政策表格中的开始时间一列
			 */
			createPromotionStartDate : function(rowIndex, bindingData) {
				var promotionStartDateHtml = BusCard.Template
						.create("<div class='promotionStartDate-#{rowIndex}'><span class='start_date_class'>#{startDate}</span><div id='promotionStartDateView-#{viewId}' style='#{dateStyle.startDateView}'><span class='promotionStartDateStyle#{promotionStartDate.style.hiddenStyleOption}'>"
								+ "<input type='hidden' id='delayTime-#{viewId}' value = '#{promotionStartDate.data.time}'/>"
								+ "#{promotionStartDate.data.delayUnitViewInstance}</span></div></div>");
				return promotionStartDateHtml.apply(bindingData.showData);
			},
			/**
			 * 创建促销政策表格中的结束时间一列
			 */
			createPromotionEndDate : function(rowIndex, bindingData) {
				var promotionEndDateHtml = BusCard.Template
						.create("<div class='promotionEndDate-#{rowIndex}'><span id='promotionEndDateDisplay-#{viewId}' class='end_date_class'>#{endDate}</span><div id='promotionEndDateView-#{viewId}' style='#{dateStyle.endDateView}'><span class='promotionEndDateStyle#{promotionEndDate.style.hiddenStyleOption}'>\u6709\u6548\u671f:<select id='validPeriod-#{viewId}'> #{promotionEndDate.data.validPeriodOption}</select>"
								+ "<select id='validType-#{viewId}'>#{promotionEndDate.data.validTypeOption}</select>"
								+ " <input type='hidden' id='prodCycleSize-#{viewId}' value = '#{promotionEndDate.data.prodCycleSize}'/></span></div><div>");
				return promotionEndDateHtml.apply(bindingData.showData);
			},
			/**
			 * 创建促销政策表格中状态一列
			 */
			createPromotionTargetObject : function(rowIndex,bindingData){
				var promotionStatusHtml = BusCard.Template
						.create("<div class='promotionTargetType-#{rowIndex}'><span style='color:red;'><tp:if $$.statusObj==1>销售品</tp:if>" 
								+ "<tp:if $$.statusObj==2>产品</tp:if></span></div>");
				return promotionStatusHtml.apply(bindingData.showData);
			},
			/**
			 * 创建促销政策表格中状态一列
			 */
			createPromotionStatus : function(rowIndex,bindingData){
				return "<div class='promotionStatus-"+rowIndex+"'>"+bindingData.showData.promotionStatus+"</div>";
			},
			
			/**
			 * 创建促销政策作用对象一列
			 */
			createPromotionTargetNum : function(rowIndex,bindingData){
				return "<div class='promotionTargetNum-"+ rowIndex +"'></div>";
			},
			
			/**
			 * 创建促销收藏列
			 */
			 createPromotonCollect : function(rowIndex,bindingData){
			 	var prodOfferList = dojo.global.$appContext$.get("prodOfferList");
			 	var prodOfferInfoVO = util.ProdOfferHelper.getMainProdOffer(prodOfferList)[0];
			 	bindingData.showData.mainProdOfferId = prodOfferInfoVO.prodOfferId;//主套餐id
			 	return BusCard.Template
					.create("<div class='collect_promotion_#{rowIndex}' style='text-align:center'>"
							+ "<img class='collect-#{rowIndex}' name='collectPromotion' src='"
							+ BusCard.path.contextPath
							+ "/common/images/button/button_addFav.png' value='#{promotionInfo.promotionId}~#{promotionName}~13~#{mainProdOfferId}'"
							+ "style='cursor: pointer; width: 20px; height: 20px;margin-right:10px' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/promotionCollect' title='收藏'/>&nbsp;&nbsp;"
							+ "<img class='cancelCollect-#{rowIndex}' name='cancelCollectPromotion' src='"
							+ BusCard.path.contextPath
							+ "/common/images/button/button_cancelFav.png' value='#{promotionInfo.promotionId}~13~#{mainProdOfferId}'"
							+ "style='cursor: pointer; width: 20px; height: 20px;' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/promotionCancelCollect' title='取消收藏'/></div>")
					.apply(bindingData.showData);
			 }
		}
		
		orderaccept.prodofferaccept.formatter.PromotionFormatterProvider.promotionFormatter = promotionFormatter;
	}
);