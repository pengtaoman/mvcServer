defineModule(
		"orderaccept.prodofferaccept.widget.memberordergroupproduct.MemberOrderGroupOfferInstWidget",
		["orderaccept.custom._BaseWidget",
				"orderaccept.custom._BusCardTemplated"], function(_Widget,
				_Templated) {
			dojo
					.declare( 
							"orderaccept.prodofferaccept.widget.memberordergroupproduct.MemberOrderGroupOfferInstWidget",
							[_Widget, _Templated], {
								templateString : "<div><ul class='favori_ul'>\
										<tp:for ds='prodOfferInstList'>\
										<li style='cursor:pointer;list-style-type:none;' prodOfferId='${prodOfferId}' prodOfferInstId='${prodOfferInstId}' class='personal-prodoffer-item' dojoAttachEvent='ondblclick:elementdblclick' dojoAttachTopic='/groupOfferInstItem'>\
										<a href='javascript:void(0);' onclick = 'return false;'>${prodOfferName}--${prodInstList[0].accNbr}</a></li></tp:for></ul>\
										</div>\
										",
								postMixInProperties : function() {
									this.prodOfferInstList = dojo.global.$appContext$
											.get("_groupProdOfferInstList");

								}
							});
		});