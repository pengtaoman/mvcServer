defineModule("orderaccept.prodofferaccept.widget.prodofferfavoritelist.personalCollectListWidget", [
                "orderaccept.custom._BaseWidget", "orderaccept.custom._BusCardTemplated"],
        function(_Widget, _Templated) {
	        dojo.declare("orderaccept.prodofferaccept.widget.prodofferfavoritelist.personalCollectListWidget", [
	                        _Widget, _Templated], {
		                templateString : "<div><ul class='favori_ul'>\
										<tp:for ds='prodOfferList'>\
										<li style='cursor:pointer;list-style-type:none;' prodOfferId='${prodOfferId}' class='personal-prodoffer-item' dojoAttachEvent='ondblclick:elementdblclick,onmouseover:elementmouseover,onmouseout:elementmouseout' dojoAttachTopic='/personalProdOfferItem'>\
										<a href='javascript:void(0);'><span dojoAttachEvent='onmouseover:elementmouseover,onmouseout:elementmouseout' dojoAttachTopic='/personalProdOfferItem-span'>${prodOfferName}</span></a></li></tp:for></ul>\
										<a href='javascript:void(0);' id='pcProdMoreHref' name='morePersonalProdOffer' style='display:none' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/morePersonalItem'>更多>></a>\
										<ul id ='morePersonalProdOffer' class='favori_ul' style='display:none'>\
										</ul></div>\
										",
		                moreTemplate : "<tp:for ds='morePersonalProdOfferList'>\
										<li style='cursor:pointer;list-style-type:none;' prodOfferId='${prodOfferId}' class='personal-prodoffer-item' dojoAttachEvent='ondblclick:elementdblclick,onmouseover:elementmouseover,onmouseout:elementmouseout' dojoAttachTopic='/personalProdOfferItem'>\
										<a href='javascript:void(0);'><span dojoAttachEvent='onmouseover:elementmouseover,onmouseout:elementmouseout' dojoAttachTopic='/personalProdOfferItem-span'>${prodOfferName}</span></a></li></tp:for>",
		                hasRendering : false,
		                postMixInProperties : function() {
			                this.prodOfferList = dojo.global.$appContext$.get("_personalProdOfferList");
			                this.morePersonalProdOfferList = [];
			                this.delayRenderingMorePersonalProdOfferList = dojo.global.$appContext$
			                        .get("_morePersonalProdOfferList");
			                
		                },
		                renderMore : function() {
			                if (!this.hasRendering) {
				                var innerHTML = BusCard.Template.create(this.moreTemplate).apply({
					                        morePersonalProdOfferList : this.delayRenderingMorePersonalProdOfferList
					                                || []
				                        });
				                var container   = dojo.byId("morePersonalProdOffer");
				                container.innerHTML = innerHTML;
				                this.enableEvtMsgPropagation(container);
				                this.hasRendering = true;
				                
			                }
		                }
		                
	                });
        });