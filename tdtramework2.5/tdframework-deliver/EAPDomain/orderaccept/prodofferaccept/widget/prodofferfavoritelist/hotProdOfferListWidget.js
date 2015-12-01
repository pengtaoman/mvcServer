defineModule("orderaccept.prodofferaccept.widget.prodofferfavoritelist.hotProdOfferListWidget", [
                "orderaccept.custom._BaseWidget", "orderaccept.custom._BusCardTemplated"],
        function(_Widget, _Templated) {
	        dojo.declare("orderaccept.prodofferaccept.widget.prodofferfavoritelist.hotProdOfferListWidget", [_Widget,
	                        _Templated], {
		                templateString : "<div><ul class='favori_ul'>\
										<tp:for ds='prodOfferList'>\
										<li style='cursor:pointer;list-style-type:none;' prodOfferId='${productId}' class='hot-prodoffer-item' dojoAttachEvent='ondblclick:elementdblclick,onmouseover:elementmouseover,onmouseout:elementmouseout' dojoAttachTopic='/hotProdOfferItem'>\
										<a href='javascript:void(0);'><span dojoAttachEvent='onmouseover:elementmouseover,onmouseout:elementmouseout' dojoAttachTopic='/hotProdOfferItem-span'>${productName}</span></a></li></tp:for></ul>\
										<a href='javascript:void(0);' id='hotProdMoreHref' name='moreHotProdOffer' style='display:none' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/moreHotItem'>更多>></a>\
										<ul id ='moreHotProdOffer' class='favori_ul' style='display:none'>\
										</ul></div>",
		                moreTemplate : "<tp:for ds='moreHotProdOfferList'>\
										<li style='cursor:pointer;list-style-type:none;' prodOfferId='${prodOfferId}' class='personal-prodoffer-item' dojoAttachEvent='ondblclick:elementdblclick,onmouseover:elementmouseover,onmouseout:elementmouseout' dojoAttachTopic='/hotProdOfferItem'>\
										<a href='javascript:void(0);'><span dojoAttachEvent='onmouseover:elementmouseover,onmouseout:elementmouseout' dojoAttachTopic='/hotProdOfferItem-span'>${prodOfferName}</span></a></li></tp:for>",
		                hasRendering : false,
		                postMixInProperties : function() {
			                this.prodOfferList = dojo.global.$appContext$.get("_hotProdOfferList");
			                this.moreHotProdOfferList = [];
			                this.delayRenderingMoreHotProdOfferList = dojo.global.$appContext$
			                        .get("_moreHotProdOfferList");
			                
		                },
		                renderMore : function() {
			                if (!this.hasRendering) {
				                var innerHTML = BusCard.Template.create(this.moreTemplate).apply({
					                        moreHotProdOfferList : this.delayRenderingMoreHotProdOfferList
					                                || []
				                        });
				                var container = dojo.byId("moreHotProdOffer");
				                container.innerHTML = innerHTML;
				                this.enableEvtMsgPropagation(container);
				                this.hasRendering = true;
				                
			                }
			                
		                }
		                
	                });
        });