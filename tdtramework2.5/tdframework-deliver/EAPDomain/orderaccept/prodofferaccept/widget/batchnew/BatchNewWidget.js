defineModule("orderaccept.prodofferaccept.widget.batchnew.BatchNewWidget",["orderaccept.prodofferaccept.util","orderaccept.custom._BaseWidget","orderaccept.custom._BusCardTemplated","orderaccept.prodofferaccept.widget.budget.BudgetWidget"],function(util,_Widget,_Templated,BudgetWidget){
	
	 dojo.declare("orderaccept.prodofferaccept.widget.batchnew.BatchNewWidget", [_Widget,_Templated], {
	 	
		 templatePath : dojo.moduleUrl("orderaccept.prodofferaccept.widget.batchnew",
		                "template/batchNew.html"),
		/**
		 * 模板中是否使用widgets
		 * 
		 * @field
		 */
		widgetsInTemplate : true,
		postMixInProperties : function(){
			var columns = null;
			if(this.checkHaveOMRight("841ABR") == true){
				columns = [{CODEVALUE: 1,CODENAME: '同客户'},{CODEVALUE: 0,CODENAME: '不同客户'}];
			}else{
				columns = [{CODEVALUE: 0,CODENAME: '不同客户'}];
			}
       	 	var relationGroup = new unieap.ds.DataStore('relation_group_store', columns);
   	        dataCenter.addDataStore(relationGroup);
           	this.inherited(arguments);
       },
       postCreate : function(){
    	    unieap.byId("relationGroup").setValue (0);
			var batchRegNo = dojo.global.$appContext$.get("_batchRegNo");
			var productId = dojo.global.$appContext$.get("_productId");
			var serviceOfferId = dojo.global.$appContext$.get("_serviceOfferId");
	        var _budgetGridContainer = "<div  id='_budgetGridContainer'></div>";
	        dojo.place(_budgetGridContainer, unieap.byId("budgetHeadPane").containerNode, "last");
			var budgetAcceptInfo = {"batchBudget":1};
	        var budgetComponent = new BudgetWidget({
		                "batchRegNo" : batchRegNo,
		                "custOrderId" : 0,
		                "batchBudgetAcceptInfo" : budgetAcceptInfo
	                }, dojo.query("[id=_budgetGridContainer]",unieap.byId("budgetHeadPane").containerNode)[0]);	                
	        // 6.打开预算面板	        
			var paneId = "budgetHeadPane";
			var pane = unieap.byId(paneId);
			if (pane && !pane.open) {
				pane.toggle();
			}
       },       
		checkHaveOMRight : function(menuId){
			try{
				var webPath = dojo.byId("webPath").value;
				if(menuId){
					var result = dojo._getText(webPath + "/orderDetailAction.do?method=checkHasOMRight&menuId="+menuId);
					var resObj = eval("("+result+")");
					return (resObj.flag=="1");
				}else{
					return true;
				}
			}catch(e){
				return true;
			}
		}
	 });
});