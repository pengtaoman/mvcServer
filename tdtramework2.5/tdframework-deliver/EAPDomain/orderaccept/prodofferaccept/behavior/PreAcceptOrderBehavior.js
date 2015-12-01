defineModule("orderaccept.prodofferaccept.behavior.PreAcceptOrderBehavior", [
                "./ProdOfferNewBehavior", "../util"], function(ProdOfferNewBehavior, util) {
                	
	        dojo.declare("orderaccept.prodofferaccept.behavior.PreAcceptOrderBehavior", [ProdOfferNewBehavior], {
		                
                postscript : function() {
	                this.subscribe();
                },
                /**
				 * 订阅各种消息
				 * 
				 * @method
				 */
                subscribe : function() {
	                this.inherited(arguments);
                },
                onMainProdOfferConfirm : function(event) {
                	
			        var widget = dijit.getEnclosingWidget(event.currentTarget),
				        self = this,
				        prodOfferId = dojo.query(".prodofferid-input", widget.domNode)[0].value,
				        _sortMap = {
					        "new" : 0,
					        nochange : 1,
					        change : 2,
					        split : 3,
					        quit : 4
					        
				        },
				        selectedMemberProdOfferList = this._getSelectedMemberInfoList(event);
			        if (this.controller.route("/checkInstance/doCheckMemberProdOfferSelect", [{
				                        selectedMemberProdOfferList : selectedMemberProdOfferList,
				                        widget : widget
			                        }]) === false) {
				        return false;
				        
			        } else {
				        // add by chuaizhw
				        // FUN-ORDER-综合订单受理-0018(集团建立子群)
				        // start
				        if (this.controller.route("/checkInstance/doCheckSubGroupProdOffer", [{}]) == false) { return false; }
				        // add by chuaizhw
				        // FUN-ORDER-综合订单受理-0018(集团建立子群)
				        // end
				        
				        // 排序
				        selectedMemberProdOfferList.sort(function(s1, s2) {
					                if (_sortMap[s1.action] > _sortMap[s2.action]) {
						                return 1;
					                } else if (_sortMap[s1.action] < _sortMap[s2.action]) {
						                return -1;
					                } else {
						                return 0;
					                }
				                });
				        selectedMemberProdOfferList.selectedBelongCode = this.controller.getBelongCode();
				        this.assertSeletedChanged(selectedMemberProdOfferList, function() {
					                $ac$.set("selectedMainProdOfferInfoVO", $ac$.get("currentMainProdOfferInfoVO"));
					                $ac$.set("prodOfferList", [$ac$.get("currentMainProdOfferInfoVO")]);
					                $ac$.set("selectedMemberProdOfferList", selectedMemberProdOfferList);
					                $ac$.set("subGroupProdInfo", $ac$.get("subGroupProdInfo"));
					                $ac$.set("processId", $ac$.get("currentProcessId") || $ac$.get("processId"));
					                self.controller.beginOrder(prodOfferId);
				                }, function() {
					                util.navigatorManager.to("prodOfferAcceptPane")(function() {
						                        dojo.byId("function-navigator-root").style.display = "block";
		                                		unieap.byId("shoppingCartPane").domNode.style.display = 'none';
					                        });
					                
				                });
				        
			        }
                }
            });
	        
        });