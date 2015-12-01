/**
 * 改单保存订单后的受理完成
 */
window.onload=function(){
	var orderChgComplete = new OrderChgComplete();
	orderChgComplete.init();
}

var OrderChgComplete = function(){
	
	var Me = this;
	
	Me.init = function(){
		Me.initPageButtonCss();
		var custOrderId = $("custOrderId").value;
		var param = {
			"custOrderId" : custOrderId
		};
		var custOrderList = new CustOrderList(param);
		custOrderList.init();
		var budgetAcceptInfo = {
			custOrderId : parseInt(custOrderId),
			orderChangeFlag : 1
		};
		try{
			BudgetComponent.doBudget(budgetAcceptInfo).render($('budgetPage'));
		}catch(e){
			alert("预算失败,原因:" + e.message);
		}
		Me.initEvent();
	}
	
	Me.initPageButtonCss = function(){
		$("printBtn").disabled = true;
		$("submitBtn").disabled = true;
		$("chargeBtn").disabled = true;
	}
	
	Me.initEvent = function(){
		
		$("closePageBtn").onclick = function(){
			if(parent && parent.unieap && parent.unieap.getDialog() && parent.unieap.getDialog().getObject().opener)
		  	{	
		  		parent.unieap.getDialog().close();
		  	}
		}
	}
}