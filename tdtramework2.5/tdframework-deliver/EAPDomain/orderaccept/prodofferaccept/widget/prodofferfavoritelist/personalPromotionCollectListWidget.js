defineModule(
		"orderaccept.prodofferaccept.widget.prodofferfavoritelist.personalPromotionCollectListWidget",
		["orderaccept.custom._BaseWidget",
				"orderaccept.custom._BusCardTemplated"], function(_Widget,
				_Templated) {
			dojo
					.declare(
							"orderaccept.prodofferaccept.widget.prodofferfavoritelist.personalPromotionCollectListWidget",
							[_Widget, _Templated], {
								templateString : "<div><ul class='favori_ul'>\
										<tp:for ds='prodOfferList'>\
										<li style='cursor:pointer;list-style-type:none;' prodOfferId='${prodOfferId}' class='personal-promotion-item' dojoAttachEvent='ondblclick:elementdblclick' dojoAttachTopic='/personalPromotionItem'>\
										<a href='javascript:void(0);'>${prodOfferName}</a></li></tp:for></ul>\
										<a href='javascript:void(0);' id='pcPromotionMoreHref' name='morePersonalPromotion' style='display:none' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/morePersonalPromotionItem'>更多>></a>\
										<ul id ='morePersonalPromotion' class='favori_ul' style='display:none'>\
										<tp:for ds='morePersonalProdOfferList'>\
										<li style='cursor:pointer;list-style-type:none;' prodOfferId='${prodOfferId}' class='personal-promotion-item' dojoAttachEvent='ondblclick:elementdblclick' dojoAttachTopic='/personalPromotionItem'>\
										<a href='javascript:void(0);'>${prodOfferName}</a></li></tp:for></ul></div>\
										",
								postMixInProperties : function() {
									this.prodOfferList = dojo.global.$appContext$
											.get("_personalPromotionList");
									this.morePersonalProdOfferList = dojo.global.$appContext$
											.get("_morePersonalPromotionList");

								}
							});
		});