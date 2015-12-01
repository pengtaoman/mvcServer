defineModule("orderaccept.prodofferaccept.widget.promotionsearchlist.PromotionSearchListWidget", ["orderaccept.custom._BaseWidget",
                "orderaccept.custom._BusCardTemplated"], function(_Widget, _Templated) {
	        
	        dojo.declare("orderaccept.prodofferaccept.widget.promotionsearchlist.PromotionSearchListWidget", [_Widget, _Templated], {
		        templateString : "<div><ul class='favori_ul'>\
										<tp:for ds='promotionList'>\
										<li style='cursor:pointer;list-style-type:none;' promotionId='${nodeId}' class='promotion-search-item' dojoAttachEvent='ondblclick:elementdblclick,onmouseover:elementmouseover,onmouseout:elementmouseout' dojoAttachTopic='/searchPromotionItem'>\
										<a href='javascript:void(0);'><span dojoAttachEvent='onmouseover:elementmouseover,onmouseout:elementmouseout' dojoAttachTopic='/searchPromotionItem-span'>${catalogItemName}</span></a></li></tp:for></ul></div>",
		        	postMixInProperties : function() {
		        		var modelData = this.params;
		        		//var uniqueId = modelData.uniqueId;
			        	this.promotionList = $ac$.get("_promotionSearchList");
		        }
	        });
        });