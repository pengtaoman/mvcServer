defineModule("orderaccept.prodofferaccept.widget.commheader.AdvanceSearchWidget", ["orderaccept.custom.TooltipDialog",
                "orderaccept.prodofferaccept.util"], function(TooltipDialog, util) {
	        
	        /**
			 * 高级查询widget
			 * 
			 * @class
			 * @requires ["orderaccept.custom.TooltipDialog"]
			 * @module orderaccept.prodofferaccept.widget.commheader.AdvanceSearchWidget
			 */
	        dojo.declare("orderaccept.prodofferaccept.widget.commheader.AdvanceSearchWidget", [TooltipDialog], {
		                requestParam : null,
		                constructor : function() {
			                this.inherited(arguments);
			                
		                },
		                // 加载完页面后渲染数据
		                renderData : function() {
			                var self = this;
			                util.ServiceFactory.getService(
			                        "url:prodOfferSaleAction.do?method=initProdOfferAdvanceSearch", function() {
				                        self.requestParam = arguments[0];
				                        BusCard.$rs(dojo.query("[id=prodbigkind]", self.containerNode)[0],
				                                self.requestParam.prodBigKindColl.list);
				                        BusCard.$rs(dojo.query("[id=userType]", self.containerNode)[0],
				                                self.requestParam.userTypeColl.list);
				                        BusCard.$rs(dojo.query("[id=accessMode]", self.containerNode)[0],
				                                self.requestParam.accModeColl.list);
				                        BusCard.$rs(dojo.query("[id=bandwidth]", self.containerNode)[0],
				                                self.requestParam.bandWidthColl.list);
				                        BusCard.$rs(dojo.query("[id=cycleYear]", self.containerNode)[0],
				                                self.requestParam.cycleYearColl.list);
			                        });
			                
		                },
		                postscript : function() {
			                this.inherited(arguments);
			                var renderHtml = dojo.cache("orderaccept.prodofferaccept.widget.commheader",
			                        "template/advanceQueryTpl.html");
			                
			                dojo.place(renderHtml, this.containerNode, "first");
			                
			                this.renderData();
			                this.enableEvtMsgPropagation(this.containerNode);// 传播事件发布的信息
		                }
		                
	                });
	        
        });