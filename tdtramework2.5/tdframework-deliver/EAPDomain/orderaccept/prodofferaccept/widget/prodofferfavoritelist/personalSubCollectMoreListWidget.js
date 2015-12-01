defineModule(
		"orderaccept.prodofferaccept.widget.prodofferfavoritelist.personalSubCollectMoreListWidget",
		["orderaccept.custom._BaseWidget",
				"orderaccept.custom._BusCardTemplated"], function(_Widget,
				_Templated) {
			dojo
					.declare(
							"orderaccept.prodofferaccept.widget.prodofferfavoritelist.personalSubCollectMoreListWidget",
							[_Widget, _Templated], {
								templateString : "<div>\
										<ul id ='morePersonalSubProdOffer${uniqueId}' class='favori_ul' style='display:none'>\
										<tp:for ds='morePersonalProdOfferList'>\
										<li style='cursor:pointer;list-style-type:none;' prodOfferId='${prodOfferId}' class='personal-prodoffer-item' dojoAttachEvent='ondblclick:elementdblclick' dojoAttachTopic='/personalSubProdOfferItem'>\
										<a href='javascript:void(0);'>${prodOfferName}</a></li></tp:for></ul></div>\
										",
								postMixInProperties : function() {
									var modelData = this.params;
		        					var uniqueId = modelData.uniqueId;
		        					this.uniqueId = uniqueId;
									this.morePersonalProdOfferList = dojo.global.$appContext$
											.get("_morePersonalSubProdOfferList"+uniqueId);

								}
							});
		});