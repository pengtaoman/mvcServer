BusCard.define('/orderaccept/attrapp/attr_prod_31.js',function(_buscard,cardParam){ 
	        var prodOfferAcceptPageDispatch=function(){
	var Me = this;	
	
	(function(){
		var tips = "说明：请仅输入包装盒上ESN或MEID数据，不要录入pESN数据，若MEID位数超过14位，则仅录入前14位。";
		var _span = document.createElement("SPAN");
		_span.innerHTML = tips;
		var itemLabel = document.createElement("DIV");
		itemLabel.className = "buscard-item-label";
		itemLabel.style.textAlign = "left";
		itemLabel.appendChild(_span);
		var rowLabel = document.createElement("DIV");
		rowLabel.appendChild(itemLabel);
		rowLabel.className = "buscard-row";
		rowLabel.appendChild(itemLabel);
		
		dojo.place(rowLabel,Me.$("31").parentNode.parentNode,"after");
		//Me.$("31").parentNode.parentNode.appendChild(_span);
		Me.$("31").title=tips;
	})();
	
	Me.$("31").onblur = function(){
		var hardwareIdType = Me.$("32").value;//Hardware Id类别
		if(Me.$("31").value == ""){
			return;
		}
		if(hardwareIdType == "ESN"){
			if(!/^[A-F0-9]{8}$/i.test(Me.$("31").value)){
				alert("ESN类型的Hardware ID必须为8位的十六进制数（输入字符为A~F和0~9的组合）");
				Me.$("31").value="";
			}
		}else if(hardwareIdType == "MEID"){	
			if(!/^[A-F0-9]{14}$/i.test(Me.$("31").value)){
				alert("MEID类型的Hardware ID必须为14位的十六进制数（输入字符为A~F和0~9的组合）");
				Me.$("31").value="";
			}
		}
	};
	if(!!Me.$("32")){
		Me.$("32").onchange = function(){
			Me.$("31").onblur();
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
	        var secondBusinessPageDispatch = function() {
	        	var Me = this;	
	
				(function(){
					var tips = "请仅输入包装盒上ESN或MEID数据，不要录入pESN数据，若MEID位数超过14位，则仅录入前14位。";
					var _span = document.createElement("SPAN");
					_span.innerHTML = tips;
					Me.$("31").parentNode.appendChild(_span);
					Me.$("31").title=tips;
				})();
	        };
	        /**
	         * 批量页面处理分支
	         * @method
	         */
	        var batchPageDispatch = function() {
	        	var Me = this;	
	
				(function(){
					var tips = "请仅输入包装盒上ESN或MEID数据，不要录入pESN数据，若MEID位数超过14位，则仅录入前14位。";
					var _span = document.createElement("SPAN");
					_span.innerHTML = tips;
					Me.$("31").parentNode.appendChild(_span);
					Me.$("31").title=tips;
				})();
	        };
	      
	        //调用具体分支处理逻辑
	        return eval(attrUsedPage + "Dispatch").apply(this, arguments);
});
