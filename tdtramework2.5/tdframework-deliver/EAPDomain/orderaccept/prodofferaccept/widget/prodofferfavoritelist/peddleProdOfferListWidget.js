defineModule("orderaccept.prodofferaccept.widget.prodofferfavoritelist.peddleProdOfferListWidget", [
                "orderaccept.custom._BaseWidget", "orderaccept.custom._BusCardTemplated"],
        function(_Widget, _Templated) {
	        dojo.declare("orderaccept.prodofferaccept.widget.prodofferfavoritelist.peddleProdOfferListWidget", [
	                        _Widget, _Templated], {
		                templateString : "<div><ul class='favori_ul'>\
										<tp:for ds='prodOfferList'>\
										<li style='cursor:pointer;list-style-type:none;' prodOfferId='${prodOfferId}' class='peddle-prodoffer-item' dojoAttachEvent='ondblclick:elementdblclick' dojoAttachTopic='/peddleProdOfferItem'>\
										<a href='javascript:void(0);'><span dojoAttachEvent='onmouseover:elementmouseover,onmouseout:elementmouseout' dojoAttachTopic='/peddleProdOfferItem-span'>${prodOfferName}</span></a></li></tp:for></ul>\
										<a href='javascript:void(0);' id='peddleProdOfferMoreHref' name='morePeddleProdOffer'  style='display:none' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/morePeddleItem'>更多>></a>\
										<ul id ='morePeddleProdOffer' class='favori_ul' style='display:none'>\
										</ul></div>",
		                moreTemplate : "<tp:for ds='morePeddleProdOfferList'>\
										<li style='cursor:pointer;list-style-type:none;' prodOfferId='${prodOfferId}' class='personal-prodoffer-item' dojoAttachEvent='ondblclick:elementdblclick,onmouseover:elementmouseover,onmouseout:elementmouseout' dojoAttachTopic='/peddleProdOfferItem'>\
										<a href='javascript:void(0);'><span dojoAttachEvent='onmouseover:elementmouseover,onmouseout:elementmouseout' dojoAttachTopic='/peddleProdOfferItem-span'>${prodOfferName}</span></a></li></tp:for>",
		                hasRendering : false,
		                postMixInProperties : function() {
			                this.prodOfferList = dojo.global.$appContext$.get("_peddleProdOfferList");
			                this.morePeddleProdOfferList = [];
			                this.delayRenderingMorePeddleProdOfferList = dojo.global.$appContext$
			                        .get("_morePeddleProdOfferList");
		                },
		                renderMore : function() {
			                if (!this.hasRendering) {
				                var innerHTML = BusCard.Template.create(this.moreTemplate).apply({
					                        morePeddleProdOfferList : this.delayRenderingMorePeddleProdOfferList
					                                || []
				                        });
				                var container =  dojo.byId("morePeddleProdOfferList");
				              	container.innerHTML = innerHTML;
				                this.enableEvtMsgPropagation(container);
				                this.hasRendering = true;
				                
			                }
			                
		                }
	                });
        });