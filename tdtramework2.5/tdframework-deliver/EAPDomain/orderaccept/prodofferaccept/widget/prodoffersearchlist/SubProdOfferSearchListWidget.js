defineModule("orderaccept.prodofferaccept.widget.prodoffersearchlist.SubProdOfferSearchListWidget", ["orderaccept.custom._BaseWidget",
                "orderaccept.custom._BusCardTemplated"], function(_Widget, _Templated) {
	        
	        dojo.declare("orderaccept.prodofferaccept.widget.prodoffersearchlist.SubProdOfferSearchListWidget", [_Widget, _Templated], {
		        templateString : "<div><ul class='favori_ul'>\
										<tp:for ds='prodOfferList'>\
										<li style='cursor:pointer;list-style-type:none;' prodOfferId='${prodOfferId}' class='prodoffer-search-item' dojoAttachEvent='ondblclick:elementdblclick,onmouseover:elementmouseover,onmouseout:elementmouseout' dojoAttachTopic='/searchSubProdOfferItem'>\
										<a href='javascript:void(0);'><span dojoAttachEvent='onmouseover:elementmouseover,onmouseout:elementmouseout' dojoAttachTopic='/searchProdItem-span'>${prodOfferName}</span></a></li></tp:for></ul></div>",
		        	postMixInProperties : function() {
		        		var modelData = this.params;
		        		var uniqueId = modelData.uniqueId;
			        	this.prodOfferList = $ac$.get("_searchSubProdOfferList"+uniqueId);
			        
		        }
		        
	        });
	        
        });