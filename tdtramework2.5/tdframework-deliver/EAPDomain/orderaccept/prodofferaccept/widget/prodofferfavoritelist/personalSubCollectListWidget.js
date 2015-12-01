defineModule(
		"orderaccept.prodofferaccept.widget.prodofferfavoritelist.personalSubCollectListWidget",
		["orderaccept.custom._BaseWidget",
				"orderaccept.custom._BusCardTemplated"], function(_Widget,
				_Templated) {
			dojo
					.declare(
							"orderaccept.prodofferaccept.widget.prodofferfavoritelist.personalSubCollectListWidget",
							[_Widget, _Templated], {
								templateString : "<div><ul class='favori_ul'>\
										<tp:for ds='prodOfferList'>\
										<li style='cursor:pointer;list-style-type:none;' prodOfferId='${prodOfferId}' class='personal-prodoffer-item' dojoAttachEvent='ondblclick:elementdblclick' dojoAttachTopic='/personalSubProdOfferItem'>\
										<a href='javascript:void(0);'>${prodOfferName}</a></li></tp:for></ul>\
										<a href='javascript:void(0);' id='pcSubProdMoreHref${uniqueId}' name='morePersonalSubProdOffer${uniqueId}' subUniqueId='${uniqueId}'  style='display:none' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/morePersonalSubItem'>更多>></a>\
										<div id='subCollect${uniqueId}'></div></div>\
										",
								postMixInProperties : function() {
									var modelData = this.params;
		        					var uniqueId = modelData.uniqueId;
		        					this.uniqueId = uniqueId;
									this.prodOfferList = dojo.global.$appContext$
											.get("_personalSubProdOfferList"+uniqueId);
									

								}
							});
		});