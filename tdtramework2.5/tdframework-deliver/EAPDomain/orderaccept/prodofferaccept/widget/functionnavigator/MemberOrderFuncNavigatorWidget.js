defineModule("orderaccept.prodofferaccept.widget.functionnavigator.MemberOrderFuncNavigatorWidget", [
                "orderaccept.custom._BaseWidget", "orderaccept.custom._BusCardTemplated","./FunctionNavigatorWidget"],
        function(_Widget, _Templated,FunctionNavigatorWidget) {
	        
	        dojo.declare("orderaccept.prodofferaccept.widget.functionnavigator.MemberOrderFuncNavigatorWidget", [_Widget,
	                        _Templated,FunctionNavigatorWidget], {
		                templateString : "<div class='function-menu-ctn'>\
										<input type = 'button'  class = 'formButtonL' value = '订单保存/预算' title='点击进行保存订单操作' groupId ='0' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/saveorder' />\
										<input type = 'button'  class = 'formButton' title='点击进行免提单打印操作' value = '免提单打印' groupId ='1' dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/doPrint' />\
										<input type = 'button'  class='formButton commitOrderClass' value = '受理完成'  DISABLED title='点击进行受理完成操作' groupId = '1' dojoAttachEvent = 'onclick:elementclick' dojoAttachTopic='/completeorder' />\
										<input type = 'button'  class='formButton chargeClass' value = '结算' title='点击进行结算操作' DISABLED groupId = '1'  dojoAttachEvent='onclick:elementclick' dojoAttachTopic='/doCharge' />\
										</div>"
		                
	                })
	        
        });