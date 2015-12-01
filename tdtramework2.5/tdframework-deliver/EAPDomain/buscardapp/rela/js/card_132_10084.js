BusCard.define('/buscardapp/rela/js/card_132_10084.js',function(_buscard,cardParam){ 
	Me = this;
	var a = arguments[0];
	var b = arguments[1];
	var c = b.serviceRelation.belongCode;
	var e = b.serviceRelation.accessLevel;
	Me.$("belongCode").value = c;
	Me.$("accessLevel").value = e;
	if(b.serviceRelation.note!=undefined){
	  Me.$("note").value=b.serviceRelation.note;
	  //alert(b.serviceRelation.note);
	}
	Me.$("note").onblur=function(){
		 if(Me.$("note")!=""){
		     if(!checkSp(Me.$("note"),"\u5ba2\u6237\u7559\u8a00")){
	         Me.$("note").value="";
	         return false;
		   }
		}
	}
	
	
	//if(Me.$("belongCode")){
	  //Me.$("belongCode").disabled=true;
	//}
	//if(Me.$("bureauId")){
	 // Me.$("bureauId").disabled=true;
	//}
	//if(Me.$("branchNo")){
	  //Me.$("branchNo").disabled=true;
	//}
	
	
	
	
	var executeRequest = _buscard.executeRequest;
	var param = "userId="+b.serviceRelation.userId+"&cityCode="+a.$session.cityCode+"&productId="+b.productId;
	var result = executeRequest("secondAcceptAjaxAction", "doGetServiceGroup", param);
	if(result)
	{
		var arrObj = result.split(',');
		Me.$("serviceGroupId").rvalue = arrObj[0];
		Me.$("serviceGroupId").value = arrObj[1];
	}
	Me.$("serviceGroupId").onquery = function () {
			var checkbox = this, _card = arguments[0], _buscard = arguments[1], _p = arguments[2];
			var value = _buscard.util.trim(this.value);
			if (!value) {
				alert("\u8bf7\u8f93\u5165\u67e5\u8be2\u5173\u952e\u8bcd");
				this.focus();
				return;
			}
			var data = {productId:_p.productId, name:value, fieldId:this.getAttribute("fieldId")};
			var jsonData = _buscard.toJson(data);
			var requestParam = {jsonData:jsonData, method:"query"};
			return _buscard.util.doGet(_buscard.path.initPath, requestParam);
		};
	Me.$("belongCode").onchange = function(){
		var belongCode = Me.$("belongCode").value;
		try {
			var serviceParamBO = a.$remote("serviceParamBO");
			var data = serviceParamBO.getBureauId(4, belongCode, a.$session.cityCode);
			if (data && data.list) a.$rs(Me.$('bureauId'), data.list);
			Me.$('bureauId').onchange = function() {
				var branchData = serviceParamBO.getBureauId(5, belongCode, a.$session.cityCode);
				if (branchData && branchData.list) a.$rs(Me.$('branchNo'), branchData.list);
			};
			Me.$('bureauId').onchange();
		}
		catch (e) {
			alert(e.message);
		} 
	};
	if(Me.$("addrDetail")){
	    Me.$("addrDetail").value=b.serviceRelation.addrDetail;
	    Me.$('addrDetail').onmouseover=function(){
	      Me.$('addrDetail').title=Me.$('addrDetail').value;
	    };
	}
	
	
});
