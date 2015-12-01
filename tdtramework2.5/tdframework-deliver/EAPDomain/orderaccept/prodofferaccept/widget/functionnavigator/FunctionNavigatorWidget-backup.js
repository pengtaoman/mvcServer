defineModule("orderaccept.prodofferaccept.widget.functionnavigator.FunctionNavigatorWidget", [
                "orderaccept.custom._BaseWidget", "orderaccept.custom._BusCardTemplated"],
        function(_Widget, _Templated) {
	        
	        dojo.declare("orderaccept.prodofferaccept.widget.functionnavigator.FunctionNavigatorWidget", [_Widget,
	                        _Templated], {
		                templateString : "<div class='function-menu-ctn'>\
								<div class='function-menu-list' id='function-menu-list'>\
									<div class='function-menu-first-line'>\
										<input type='button'  class='buscard_half_opacity' title='点击跳转到客户识别页面' groupId ='0' value = '客户识别' DISABLED dojoAttachEvent = 'onclick:elementclick' dojoAttachTopic='/custRecognitionPage'/>\
										<input type = 'button' class = 'buscard_half_opacity' value = '订单详情' title='点击跳转到订单详情页面' DISABLED groupId = '0'  dojoAttachEvent = 'onclick:elementclick' dojoAttachTopic='/orderDetailPage'/>\
										<input type = 'button'  title='点击进行免提单打印操作' value = '免提单打印' groupId ='1' />\
										<input type = 'button' value = '提交订单' class='commitOrderClass' DISABLED title='点击进行提交操作' groupId = '1' dojoAttachEvent = 'onclick:elementclick' dojoAttachTopic='/completeorder' />\
										<input type = 'button' value = '提交' class='commitOrderClass' title='点击进行提交操作' groupId = '2' dojoAttachEvent = 'onclick:elementclick' dojoAttachTopic='/saveBatch' />\
										</div>\
									<div class='function-menu-line'>\
										<input type = 'button'  value = '订单暂存' title='点击进行订单暂存操作' groupId = '0' />\
										<input type = 'button'  value = '保存订单' title='点击进行保存订单操作' groupId ='0' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/saveorder' />\
										<input type = 'button'  value = '缴费' title='点击进行订单暂存操作' groupId = '1'  dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/doCharge' />\
										<input type = 'button'  value = '继续受理' title='点击进行保存订单操作' groupId ='1' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/coutinueorder' />\
									</div>\
								</div>\
								<div class='function-menu-link' id='function-menu-link' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/functionmenulink'>\
									<span>订</span>\
									<span>单</span>\
									<span>操</span>\
									<span>作</span>\
								</div>\
							</div>",
		                postCreate : function() {
			                // 先加载css文件
			                loadCssModule("orderaccept.prodofferaccept.widget.functionnavigator.resources.css.function-navigator");
			                var self = this;
			                this.switchGroup(0);
			                
		                },
		                switchGroup : function(index) {
			                var _index = index + "",
				                list = dojo.query("[groupId]", this.domNode);
			                dojo.forEach(list, function(node) {
				                        if (dojo.attr(node, "groupId") == _index) {
					                        node.style.display = "";
				                        } else {
					                        node.style.display = "none";
				                        }
				                        
			                        });
			                
		                }
		                
	                })
	        
        });