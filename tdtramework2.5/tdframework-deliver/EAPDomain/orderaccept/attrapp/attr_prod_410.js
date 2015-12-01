BusCard.define("/orderaccept/attrapp/attr_prod_410.js", function (_buscard, cardParam) {
	var prodOfferAcceptPageDispatch = function () {
		var executeRequest = _buscard.executeRequest;
		var Me = this;
		/*1、区域下拉框查询时触发，加载符合条件的国家列表*/
		Me.$("410").onquery = function(){
			return Me.queryList(this);
		}
		Me.$("411").onquery = function(){
			return Me.queryList(this);
		}
		Me.$("412").onquery = function(){
			return Me.queryList(this);
		}
		Me.$("413").onquery = function(){
			return Me.queryList(this);
		}
		Me.$("414").onquery = function(){
			return Me.queryList(this);
		}
		/*2、区域下拉框值变更时触发，如果查询值为空清空下拉框的rvalue值*/
		Me.$("410").onchange = function(){
			if(this.value == ""){
				this.rvalue = "";
			}
		}
		Me.$("411").onchange = function(){
			if(this.value == ""){
				this.rvalue = "";
			}
		}
		Me.$("412").onchange = function(){
			if(this.value == ""){
				this.rvalue = "";
			}
		}
		Me.$("413").onchange = function(){
			if(this.value == ""){
				this.rvalue = "";
			}
		}
		Me.$("414").onchange = function(){
			if(this.value == ""){
				this.rvalue = "";
			}
		}
		/*3、区域下拉框选择一个国家后触发，判断是否重复选中*/
		Me.$("410").onafterclick = function(){
			var obj = $("410");
			var arrObj = [$("411"),$("412"),$("413"),$("414")];
			if(dojo.some(arrObj, function(item){return obj.rvalue == item.rvalue})){
				alert("\u6F2B\u6E38\u533A\u57DF\u91CD\u590D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9");
				obj.value = "";
				obj.rvalue = "";
				obj.focus();
			}
		}
		Me.$("411").onafterclick = function(){
			var obj = $("411");
			var arrObj = [$("410"),$("412"),$("413"),$("414")];
			if(dojo.some(arrObj, function(item){return obj.rvalue == item.rvalue})){
				alert("\u6F2B\u6E38\u533A\u57DF\u91CD\u590D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9");
				obj.value = "";
				obj.rvalue = "";
				obj.focus();
			}
		}
		Me.$("412").onafterclick = function(){
			var obj = $("412");
			var arrObj = [$("411"),$("410"),$("413"),$("414")];
			if(dojo.some(arrObj, function(item){return obj.rvalue == item.rvalue})){
				alert("\u6F2B\u6E38\u533A\u57DF\u91CD\u590D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9");
				obj.value = "";
				obj.rvalue = "";
				obj.focus();
			}
		}
		Me.$("413").onafterclick = function(){
			var obj = $("413");
			var arrObj = [$("411"),$("412"),$("410"),$("414")];
			if(dojo.some(arrObj, function(item){return obj.rvalue == item.rvalue})){
				alert("\u6F2B\u6E38\u533A\u57DF\u91CD\u590D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9");
				obj.value = "";
				obj.rvalue = "";
				obj.focus();
			}
		}
		Me.$("414").onafterclick = function(){
			var obj = $("414");
			var arrObj = [$("411"),$("412"),$("413"),$("410")];
			if(dojo.some(arrObj, function(item){return obj.rvalue == item.rvalue})){
				alert("\u6F2B\u6E38\u533A\u57DF\u91CD\u590D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9");
				obj.value = "";
				obj.rvalue = "";
				obj.focus();
			}
		}
		/*根据条件查询国家列表*/
		Me.queryList = function(obj){
			var value = obj.value;
			if (!value) {
				alert("\u8bf7\u8f93\u5165\u67e5\u8be2\u5173\u952e\u8bcd");
				obj.value = "";
				obj.rvalue = "";
				obj.focus();
				return false;
			}
			var param = "tableName=PROD_INST_ATTR&columnName=COUNTRY&queryStr=" + _buscard.native2ascii(value); 
			var resultJsonStr = executeRequest("paramValueAction", "getParamValue", param);
			var objResult = _buscard.parse(_buscard.native2ascii(resultJsonStr));
			return objResult;
		}
		/*4、如果不是新装，则把漫游区域1的必选属性去掉*/
		Me.getUniqueId = function(){ 
			var uniqueId = "";
			if($ac$.selectedMainProdOfferInfoVO.bindType == 2){
				var multipleMainProdOfferWidget =orderaccept.prodofferaccept.util.DomHelper.getParentWidget(Me.$("410"),"unieap.layout.ContentPane");
				uniqueId = multipleMainProdOfferWidget.uniqueId;                        
	        }else{
				var mainProdOfferWidget = prodOfferAcceptLoader.mainProdOfferWidget;
				if(!!mainProdOfferWidget){
					var prodBasicTRs = dojo.query(".main-product-basic",mainProdOfferWidget.domNode);
					if((!prodBasicTRs)||prodBasicTRs.length ==0){
						return;
					}
					//直接取第一个
					uniqueId = dojo.attr(prodBasicTRs[0],"uniqueId");
				}
	        }
			return uniqueId;
		};
		var uniqueId = Me.getUniqueId();
		var selectedMemb = dojo.filter($ac$.get("selectedMemberProdOfferList")||[], function(memb) {
			return memb.uniqueId == uniqueId;
		})[0];
		if(!!selectedMemb){
			if(!!selectedMemb.prodInstVO){
				Me.$("410").setAttribute('isnull',1);
	      		Me.$("410").removeAttribute('controlFieldName');
	      		dojo.destroy(Me.$("410").parentNode.parentNode.previousSibling.firstChild)
			}
		}
	};
	var attrUsedPage = window.attrUsedPage || 'prodOfferAcceptPage';
	/**
	 * 综合查询页面处理分支
	 * @method
	 */
	var allInfoQueryPageDispatch = function() {};
	/**
	 * 二次业务处理分支
	 * @method
	 */
	var secondBusinessPageDispatch = function() {};
	/**
	 * 批量页面处理分支
	 * @method
	 */
	var batchPageDispatch = function() {};
	
	//调用具体分支处理逻辑
	return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});

