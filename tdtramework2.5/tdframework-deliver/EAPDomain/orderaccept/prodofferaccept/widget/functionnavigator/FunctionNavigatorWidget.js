defineModule("orderaccept.prodofferaccept.widget.functionnavigator.FunctionNavigatorWidget", [
                "orderaccept.custom._BaseWidget", "orderaccept.custom._BusCardTemplated"],
        function(_Widget, _Templated) {
	        
	        dojo.declare("orderaccept.prodofferaccept.widget.functionnavigator.FunctionNavigatorWidget", [_Widget,
	                        _Templated], {
		                templateString : "<div class='function-menu-ctn'>\
										<input type='button'    class = 'formButton' title='跳转到套餐选择页面' groupId ='0' value = '上一步'  dojoAttachEvent = 'onclick:elementclick' dojoAttachTopic='/toMainProdOfferSelectPane'/>\
										<input type = 'button'  class = 'formButton' value = '订单暂存' title='点击进行订单暂存操作' groupId = '100'/>\
										<input type = 'button'  class = 'formButton' value = '订单预览' title='点击进行订单预览操作' groupId = '0'  dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/ordershow' />\
										<input type = 'button'  class = 'formButtonL' value = '订单保存/预算'  title='点击进行保存订单操作' groupId ='0' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/saveorder' />\
										<input type = 'button'  class = 'formButton toOrderDetailClass' title='返回订单详情' value = '上一步' groupId ='1'  dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/toOrderDetailPage' />\
										<input type = 'button'  class = 'formButton' title='点击进行免填单打印操作'  value = '免填单打印' groupId ='1' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/doPrint' />\
										<input type = 'button'  class = 'formButton continueAcceptClass' value = '继续受理'  title='点击进行继续受理操作' groupId ='1' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/coutinueorder' />\
										<input type = 'button'  class='formButton commitOrderClass' value = '受理完成' menuId='841ABXD'  DISABLED title='点击进行受理完成操作' groupId = '1' dojoAttachEvent = 'onclick:elementclick' dojoAttachTopic='/completeorder' />\
										<input type = 'button'  class='formButton chargeClass'  value = '结算' title='点击进行结算操作' DISABLED groupId = '1'  dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/doCharge' />\
										<input type='button'   class='formButton commitOrderClass' value='上一步' groupId = '2' dojoAttachEvent='onclick:elementclick' id='batchBackButton' dojoAttachTopic='/backBatch'  />\
										<input type='button'  class='formButton commitOrderClass' id='batchExpBtn' value='生成模板' groupId = '2' dojoAttachEvent='onclick:elementclick'dojoAttachTopic='/generationTemplate'  />\
										<input type = 'button'  class='formButtonL commitOrderClass'  value = '批量订单提交' DISABLED title='点击进行批量提交操作' groupId = '2'id='batchSubmitButton' dojoAttachEvent = 'onclick:elementclick' dojoAttachTopic='/saveBatch' />\
										<input type = 'button'  class='formButtonL' value = '改单保存/预算'   title='点击保存改单内容' groupId = '3' dojoAttachEvent = 'onclick:elementclick' dojoAttachTopic='/saveorder' />\
										<input type = 'button'  class='formButton' value = '改单完成'  menuId='841ABXD'  title='点击完成改单' groupId = '4' dojoAttachEvent = 'onclick:elementclick' dojoAttachTopic='/completeorder' />\
										<input type = 'button'  class='formButton' value = '返回'   title='返回订单变更初始化页面' groupId = '4' dojoAttachEvent = 'onclick:elementclick' dojoAttachTopic='/back2OrderChangePage' />\
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