BusCard.define('/buscardapp/rela/js/card_140_14001.js',function(_buscard,cardParam){ 

	Me = this;
	var op = document.createElement("option");
	op.value=0;
	op.text='\u8bf7\u9009\u62e9';
	var arrayObj = new Array();
	var index = 0;
	
	arrayObj.push($("customerKind"));
	arrayObj.push($("customerGrade"));
	arrayObj.push($("importantLevel"));
	arrayObj.push($("belongCode"));
	arrayObj.push($("customerType"));
	arrayObj.push($("secrecyLevel"));
	arrayObj.push($("serviceLevel"));
	arrayObj.push($("custAreaGrade"));
	arrayObj.push($("dealerKind"));
	arrayObj.push($("dealerKind1"));
	arrayObj.push($("brandInd"));
	arrayObj.push($("custType"));
	arrayObj.push($("custTrenType"));
	arrayObj.push($("townType"));
	arrayObj.push($("preserve04"));
	arrayObj.push($("lieuType"));
	arrayObj.push($("onestopFlag"));
	initDefault(arrayObj);
	
	Me.$("custType").onchange = function (){
		getstrateDivision();	
	}
	
	Me.$("custAreaGrade").onchange = function (){
		getSaleOrganise();
	}
	
	Me.$("brandInd").onchange = function (){
		getCustSubBrand();
	}
	
	Me.$("industryCd").onchange = function (){
		getSaleOrganise();
	}
	
	Me.$("bigIndustryType").onchange = function (){
		getSmallIndustryType();
	}
	
	Me.$("smallIndustryType").onchange = function (){
		getIndustryType();
	}
	Me.$("customerType").value="1";
	
	Me.$("secrecyLevel").value="1";
	
	Me.$("custTrenType").value="1";
	
	
	
	
	Me.setDisplayNone = function(name) {
	
		Me.$(name).parentNode.style.display = "none";
	
		Me.$("label_" + name).style.display = "none";
	
	};
	Me.setDisplayNone("customerType");//客户类型
	Me.setDisplayNone("secrecyLevel");
	Me.setDisplayNone("custTrenType");
	Me.$("label_developerDealer").style.display = "none";
	Me.$("label_developerDealer").nextSibling.style.display = "none";
	Me.$("label_belongDealer").style.display = "none";
	Me.$("label_belongDealer").nextSibling.style.display = "none";
	
	
	
	function initDefault(obj){
	
		for(var i=0;i<obj.length;i++){
			var options = obj[i].options;
			var op = document.createElement("option");
			op.value='';
			op.text='\u8bf7\u9009\u62e9';
			options.add(op,0);
			obj[i].selectedIndex = 0;
		}
	}
	//权限控制
	var pageRight = $("pageRight").value;
	if(!eval(pageRight)){
		$("custType").disabled=true;
	
		$("custSubType").disabled=true;
	
		$("bigIndustryType").disabled=true;
		
		$("smallIndustryType").disabled=true;
	
		$("industryCd").disabled=true;
	
		$("saleOrganise").disabled=true;
	}

});



