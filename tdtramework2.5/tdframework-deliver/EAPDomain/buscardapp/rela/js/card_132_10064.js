BusCard.define('/buscardapp/rela/js/card_132_10064.js',function(_buscard,cardParam){ 
	Me = this;
	var a = arguments[0];
	var b = arguments[1];
	var e = b.serviceRelation.accessLevel;
	var f = b.productId;
	Me.$("accessLevel").value = e;
	if(Me.$("townCode")){
	Me.$("townCode").disabled=true;
	}
	if(b.serviceRelation.note!=undefined){
	 if(Me.$("note")){
	  Me.$("note").onblur=function(){
		 if(Me.$("note")!=""){
		     if(!checkSp(Me.$("note"),"\u5ba2\u6237\u7559\u8a00")){
	         Me.$("note").value="";
	         return false;
		   }
		}
	 }
	  Me.$("note").value=b.serviceRelation.note;
	 
	  }
	 // alert(b.serviceRelation.note);
	}
	
	//for compatibility
	var executeRequest = _buscard.executeRequest;
	var param = "userId="+b.serviceRelation.userId+"&cityCode="+a.$session.cityCode+"&productId="+b.productId;
	var result = executeRequest("secondAcceptAjaxAction", "doGetServiceGroup", param);
	if(result)
	{
		var arrObj = result.split(',');
		Me.$("serviceGroupId").rvalue = arrObj[0];
		Me.$("serviceGroupId").value = arrObj[1];
	}
	
	/*var executeRequest = _buscard.executeRequest;
	var param = "userId="+b.serviceRelation.userId+"&cityCode="+a.$session.cityCode+"&relationTypeCd=03";
	var result = executeRequest("secondAcceptAjaxAction", "getChannelInfo", param);
	//var jsonObject=_buscard.toJson(result);
	if(result!="")
	{
	 var arr=result.split("~");
      Me.$("serverChannel").value=arr[1];
      Me.$("serverChannel").rvalue=arr[0];
	}
	var executeRequest = _buscard.executeRequest;
	var param = "userId="+b.serviceRelation.userId+"&cityCode="+a.$session.cityCode+"&relationTypeCd=04";
	var result = executeRequest("secondAcceptAjaxAction", "getChannelInfo", param);
	  //jsonObject=_buscard.toJson(result);
	if(result!="")
	{
	 var arr=result.split("~");
      Me.$("maintChannel").value=arr[1];
      Me.$("maintChannel").rvalue=arr[0];
	}*/

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
	
	/*Me.$("serverChannel").onquery = function () {
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
	Me.$("maintChannel").onquery = function () {
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
		};*/
	Me.$("belongCode").onchange = function(){
		var belongCode = Me.$("belongCode").value;
		try {
			if(Me.$('bureauId')){
				var serviceParamBO = a.$remote("serviceParamBO");
				var data = serviceParamBO.getBureauId(4, belongCode, a.$session.cityCode);
				if (data && data.list) a.$rs(Me.$('bureauId'), data.list);
				Me.$('bureauId').onchange = function() {
					var branchData = serviceParamBO.getBureauId(5, belongCode, a.$session.cityCode);
					if (branchData && branchData.list) a.$rs(Me.$('branchNo'), branchData.list);
				};
				Me.$('bureauId').onchange();
			 }
			  //检测使用区域和主销售品之前关系    
			     /*var parameter="belongCode="+Me.$("belongCode").value+"&prodInstId="+b.serviceRelation.userId;
		         var resultJsonStr=executeRequest("orderDetailAction", "checkBelongCode", parameter);
		         var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
				 if (jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "-1") {
				      Me.$("belongCode").value=b.serviceRelation.belongCode;
				       alert("\u6b64\u7528\u6237\u8ba2\u8d2d\u7684\u4e3b\u9500\u552e\u54c1\u4e0d\u9002\u7528\u8981\u53d8\u66f4\u7684\u4f7f\u7528\u533a\u57df\uff0c\u8bf7\u5148\u53d8\u66f4\u4e3b\u9500\u552e\u54c1\u3002");
				        return false;
			       }*/
			  if(Me.$("townCode")){
			     Me.$("townCode").value="";
			  }     
			   
		}
		catch (e) {
			alert(e.message);
		} 
	};
	
	
	
	
	
    if(Me.$("dealerKind")){
      var userInstallInfoVO= a.$remote("prodInstCommFacadeBO").getUserInstallInfo({userId:b.userId,attrId:'50195'});
      if(userInstallInfoVO[0]!=undefined){
          var result=a.$remote("commDealerAPIBO").doGetChannelTypeAndName(userInstallInfoVO[0].infoValue);
          Me.$("dealerKind").value =result.dealerKind;
          var id=userInstallInfoVO[0].infoValue;
          var name=result.dealerName;
          var param=[{"id":id,"name":name}];
          a.$rs(Me.$('sourceId'),param);
      }
      Me.$("dealerKind").disabled=true;
      Me.$("sourceId").disabled=true;
    }
      if(Me.$("townCode")){
         //Me.$("townCode").value=b.serviceRelation.belongCode;
        
          try {
				var serviceParamBO = a.$remote("serviceParamBO");
				var data = serviceParamBO.getAreaIdByOperLevel(b.serviceRelation.belongCode,5);
				if (data && data.list) a.$rs(Me.$('townCode'), data.list);
				//if(data&&data.list&&data.list.length>0){
				//var data1 = serviceParamBO.getParentArea(b.serviceRelation.belongCode,5);
				//if (data1 && data1.list) a.$rs(Me.$("belongCode"), data1.list);
			    // }
			}
			catch (e) {
				alert(e.message);
			} 
		 
     }
     
});
