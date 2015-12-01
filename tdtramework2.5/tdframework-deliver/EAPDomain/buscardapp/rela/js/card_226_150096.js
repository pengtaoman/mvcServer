BusCard.define('/buscardapp/rela/js/card_226_150096.js',function(_buscard,cardParam){ 
	var Me = this;
	var serviceRealtion = Me.getCardRelationInfo().serviceRelation;
	var solutionName = "";
	if(null!=serviceRealtion.creditSolution){
		var param="productId="+serviceRealtion.productId
					+"&cityCode="+serviceRealtion.cityCode
					+"&solutionId="+serviceRealtion.creditSolution;
		solutionName = executeRequest("secondAcceptAjaxAction", "getCreditSolutionName", param);
	}
	Me.$("oldCreditSolution").value=solutionName;
	Me.$("oldCreditSolution").readOnly = true;
});
