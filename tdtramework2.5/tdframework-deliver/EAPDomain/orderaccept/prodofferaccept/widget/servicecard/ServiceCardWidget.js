defineModule("orderaccept.prodofferaccept.widget.servicecard.ServiceCardWidget", ["../../../custom/_BaseWidget",
                "../../../custom/_BusCardTemplated", "dijit._Contained"], function(_Widget, _Templated, _Contained) {
	        dojo.declare("orderaccept.prodofferaccept.widget.servicecard.ServiceCardWidget", [_Widget, _Templated,
	                        _Contained], {
		                delayCreateBeforeBindModel : true,
		                templateString : 'buscard://www.crm1.com',
		                attrCardWidget : null,
		                postMixInProperties : function() {
			                var modelData = this.getModel();
			                this.cardParam = modelData.cardParam;
			                this.metaData = modelData.metaData;
			                this.id = this.metaData.id;
		                },
		                destroy : function() {
			                if (this.attrCardWidget) {
				                this.attrCardWidget.destroy();
			                }
			                this.inherited(arguments);
		                },
		                completeRequiredState : function() {
			                var serviceCard = this.busCardInstance,
				                attrCard = this.busCardInstance.getChildren()[0],
				                serviceRequireElemList = dojo.query("[isnull=0]", serviceCard.dom) || [],
				                attrRequireElemList = [];
			                if (attrCard) {
				                attrRequireElemList = dojo.query("[isnull=0]", attrCard.dom) || [];
			                }
			                var hasNullElem = dojo.some([].concat(serviceRequireElemList).concat(attrRequireElemList),
			                        function(dom) {
				                        var type = (dom.type || "").toUpperCase();
				                        return !dom.value && !(type == 'RADIO' || type == 'CHECKBOX');
			                        });
			                
			                var uniqueId = serviceCard.getCardRelationInfo().uniqueId;
			                if (uniqueId) {
				                var productTrNode = dojo.query("TR[uniqueId=" + uniqueId + "]")[0];
				                var requireElemCtn = dojo.query(".complete-flag-div", productTrNode)[0];
				                if (requireElemCtn) {
					                var initElem = dojo.query(".complete-init-flag", requireElemCtn)[0];
					                var spanElem = dojo.query(".complete-flag-span", requireElemCtn)[0];
					                var imgElem = dojo.query(".complete-flag-img", requireElemCtn)[0];
					                initElem && (initElem.style.display = "none");
					                if (hasNullElem) {
						                spanElem.style.display = "";
						                imgElem.style.display = "none";
					                } else {
						                spanElem.style.display = "none";
						                imgElem.style.display = "";
					                }
				                }
				                
			                }
			                
		                },
		                getPageData : function() {
			                var serviceInfoPageData = this.inherited(arguments),
				                prodAttrPageData = null,
				                assurePageData = null;
			                if (serviceInfoPageData === false) { return false; }
			                if (this.attrCardWidget) {
				                prodAttrPageData = this.attrCardWidget.getPageData
				                        .apply(this.attrCardWidget, arguments);
			                }
			                if (prodAttrPageData === false) { return false; }
			                
			                var assureNodes = dojo.query("[groupId=1002]", this.domNode);
			                dojo.forEach(assureNodes, function(node) {
				                        var controlfieldname = node.getAttribute("controlfieldname");
				                        if (controlfieldname == null || controlfieldname == "") { return; }
				                        if (!!serviceInfoPageData && !!serviceInfoPageData[controlfieldname]) {
					                        assurePageData = !!assurePageData ? assurePageData : {};
					                        assurePageData[controlfieldname] = serviceInfoPageData[controlfieldname];
					                        delete serviceInfoPageData[controlfieldname];
					                        return;
				                        }
				                        if (!!prodAttrPageData && !!prodAttrPageData[controlfieldname]) {
					                        assurePageData = !!assurePageData ? assurePageData : {};
					                        assurePageData[controlfieldname] = prodAttrPageData[controlfieldname];
					                        delete prodAttrPageData[controlfieldname];
					                        return;
				                        }
			                        });
			                var _cardParam = this.cardParam;
			                for (var name in _cardParam) {
				                if (_cardParam.hasOwnProperty(name)) {
					                if (!serviceInfoPageData[name]) {
						                serviceInfoPageData[name] = _cardParam[name];
					                }
				                }
				                
			                }
			              //  dojo.mixin(serviceInfoPageData, this.cardParam);
			                
			                return {
				                serviceInfo : serviceInfoPageData,
				                prodAttrInfo : prodAttrPageData,
				                assureInfo : assurePageData
			                }
			                
		                }
		                
	                });
        });