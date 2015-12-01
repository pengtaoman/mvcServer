defineModule("orderaccept.prodofferaccept.widget.functionnavigator.CrossModuleFunctionNavigator", [
                "orderaccept.custom._BaseWidget", "orderaccept.custom._BusCardTemplated"],
        function(_Widget, _Templated) {
	        
	        dojo.declare("orderaccept.prodofferaccept.widget.functionnavigator.CrossModuleFunctionNavigator", [_Widget,
	                        _Templated], {
		                templatePath : dojo.moduleUrl("orderaccept.prodofferaccept.widget.functionnavigator",
		                        "template/crossModuleFunctionNavigator.html"),
		                getNode : function() {
			                return dojo.query(".bubbleRight_div", this.domNode)[0];
		                },
		                hidden : function() {
			                this.getNode().style.display = "none";
		                },
		                display : function() {
			                this.getNode().style.display = "block";
		                },
		                toggle : function() {
			                var node = this.getNode();
			                if (node.style.display == 'none') {
				                this.display();
				                this.resetDisplay();
				                
			                } else {
				                this.hidden();
			                }
			                
		                },
		                _getCustOrderId : function() {
			                if ($ac$.get("_hasSaveOrder")) {
				                return ($ac$.get("_currentCustOrderId") + "") || "";
			                } else {
				                return (prodOfferAcceptLoader.getCustOrderId()) || "";
			                }
			                
		                },
		                _getCustId : function() {
			                
			                if ($ac$.requestParam && $ac$.requestParam.customerData) {
				                return $ac$.requestParam.customerData.custId;
			                } else {
				                return "";
			                }
		                },
		                resetDisplay : function() {
			                this.custOrderIdNode.innerText = this._getCustOrderId();
			                if ($ac$.requestParam && $ac$.requestParam.customerData) {
				                this.custNameNode.innerHTML = $ac$.requestParam.customerData.custName;
			                }
			                if ($ac$.get("selectedMainProdOfferInfoVO")) {
				                this.prodOfferNameNode.innerText = $ac$.get("selectedMainProdOfferInfoVO").prodOfferName;
			                }
			                
		                },
		                buildPassedParam : function() {
			                var param = {
				                custOrderId : this._getCustOrderId(),
				                custId : this._getCustId(),
				                customerId : this._getCustId(),
				                cityCode : BusCard.$session.cityCode
			                }
			                return param;
			                
		                },
		                postCreate : function() {
							this.toggle();
		                },
		                getMenuWindow : function() {
			                
			                return opener.top.top_page;
			                
		                },
		                /**
						 * 点击综合订单受理事件处理
						 */
		                onClickOrderAcceptHandle : function(evt) {
			                
			                try {
				                this.getMenuWindow().MenuBar.activeTopMenuById('System84', '841', '841AB', BusCard
				                                .buildParam(this.buildPassedParam()));
				                window.close();
			                }
			                catch (e) {

			                }
			                
		                },
		                /**
						 * 点击缴费退费跳转处理
						 */
		                onClickChargeHandle : function(evt) {
			                try {
				                this.getMenuWindow().MenuBar.activeTopMenuById('System84', '842', '842AA', BusCard
				                                .buildParam(this.buildPassedParam()));
				                window.close();
			                }
			                catch (e) {

			                }
		                },
		                /**
						 * 点击订单稽核跳转处理
						 * 
						 * @event
						 */
		                onClickOrderCheckHandle : function(evt) {
			                try {
				                this.getMenuWindow().MenuBar.activeTopMenuById('System84', '841', '841BA', BusCard
				                                .buildParam(this.buildPassedParam()));
				                window.close();
			                }
			                catch (e) {

			                }
		                },
		                /**
						 * 点击订单监控跳转处理
						 */
		                onClickOrderMonitorHandle : function(evt) {
			                try {
				                this.getMenuWindow().MenuBar.activeTopMenuById('System84', '843', '843B', BusCard
				                                .buildParam(this.buildPassedParam()));
				                window.close();
			                }
			                catch (e) {

			                }
		                }
		                
	                })
	        
        });