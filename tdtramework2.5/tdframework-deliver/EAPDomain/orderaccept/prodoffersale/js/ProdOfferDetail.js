window.onload = function(){
	new ProdOfferDetail().init();
}

var ProdOfferDetail = function(args){
	var Me = this;
	var prodOfferId = "30095";//测试，先写死
//	var prodOfferId = args.prodOfferId;
	var prodOfferInfoVO = null;
	//var prodOfferResRelaBuilder = null;//销售品营销资源
	var prodOfferInfo = null;
	
	Me.$ = function(id){
		return document.getElementById(id);
	}
	
	/**
	 * 初始化函数
	 */
	Me.init = function(){
		prodOfferInfo = executeRequest("orderDetailAction","getProdOfferDetail","prodOfferId="+prodOfferId);
		prodOfferInfoVO = Ext.decode(prodOfferInfo);
		if(!(prodOfferInfoVO && prodOfferInfoVO.prodOfferId)){
			alert("销售品信息不存在!");
			return;
		}
		Me.showProdOfferDesc();
		Me.showProductAttr();
		Me.showProdOfferAttr();
		Me.showProdOfferResRela();
		Me.showProdcutResRela();
		Me.initEvent();
	};
	
	/**
	 * 展示销售品描述信息
	 */
	Me.showProdOfferDesc = function(){
		var prodOfferDesc = prodOfferInfoVO.prodOfferDesc;
		if(prodOfferDesc && prodOfferDesc != ""){
			Me.showDiv("prodOfferDescDIV");
		}
		Me.$("prodOfferDesc").innerHTML = prodOfferDesc;
	};
	
	/**
	 * 展示销售品属性
	 */
	Me.showProdOfferAttr = function(){
		var ProdOfferAttrList = prodOfferInfoVO.attrList;//销售品属性集合
		Me.showAttr("销售品","属性",ProdOfferAttrList,"prodOfferAttrDIV","prodOfferAttrMoreHref","prodOfferAttr","prodOfferAttrMore");
	}
	
	/**
	 * 展示产品属性
	 */
	Me.showProductAttr = function(){
		var offerProdRelaList = prodOfferInfoVO.offerProdRelaList;//销售品关联产品集合
		for(var p in offerProdRelaList){
			var offerProdRela = offerProdRelaList[p];
			if(offerProdRela && offerProdRela.productInfoVO && offerProdRela.productInfoVO.attrList && 
						offerProdRela.productInfoVO.attrList.length>0){
				if(!isNaN(p)){
					var productName = offerProdRela.productInfoVO.productName;
					var productId = offerProdRela.productInfoVO.productId;
					var productAttrList = offerProdRela.productInfoVO.attrList;
					if(p == 0){
						Me.showAttr(productName,"属性",productAttrList,"productAttrDIV","productAttrMoreHref","productAttr","productAttrMore");
					}else{
						var table1 = Me.createTable(null,null,"productAttr"+productId);
						var div = document.createElement("DIV");
						div.align = "right";
						var alink = document.createElement("A");
						alink.href = "#";
						alink.id = "productAttrMoreHref"+productId;
						alink.setAttribute("currentState","show");
						alink.style.display = "none";
						alink.innerText = "更多>>";
						div.appendChild(alink);
						var table2 = Me.createTable("productAttrMore_table"+productId,"none","productAttrMore"+productId);
						Me.$("showAttr").appendChild(table1);
						Me.$("showAttr").appendChild(div);
						Me.$("showAttr").appendChild(table2);
						Me.showAttr(productName,"属性",productAttrList,"productAttrDIV","productAttrMoreHref"+productId,"productAttr"+productId,"productAttrMore"+productId);
						alink.onclick = (function(hrefId,tableId,id){
							return function(){
								Me.attrMoreHrefOnclick(hrefId,tableId,id);
							}
						})("productAttrMoreHref","productAttrMore_table",productId);
					}
				}
			}
		}
	};
	
	/**
	 * 展示属性,公共方法
	 */
	Me.showAttr = function(attrOwner,attrKind,attrList,showAttrDiv,attrMoreHref,showDiv,showMoreDiv){
		if(!attrList){
			return;
		}
		var requiredAttrList = [];//必填属性集合
		var generalAttrList = [];//非必填属性集合
		var requiredIndex = 0;
		var generalIndex = 0;
		Me.showDiv(showAttrDiv);
		if(attrList.length>6){
			Me.showDiv(attrMoreHref);
			for(var p in attrList){
				var attrVO = attrList[p];
				if(attrVO.nullable == false || attrVO.nullable == "false"){//必填项
					requiredAttrList[requiredIndex] = attrVO;
					requiredIndex++;
				}else if(attrVO.nullable == true || attrVO.nullable == "true"){//非必填项
					generalAttrList[generalIndex] = attrVO;
					generalIndex++;
				}
			}
			//创建必填项展示
			Me.createAttrCardBuilder(requiredAttrList,Me.$(showDiv),attrOwner+"基本"+attrKind+"信息").init();
			//创建非必填项展示
			Me.createAttrCardBuilder(generalAttrList,Me.$(showMoreDiv),attrOwner+"扩展"+attrKind+"信息").init();
		}else{
			Me.createAttrCardBuilder(attrList,Me.$(showDiv),attrOwner+attrKind+"信息").init();
		}
	};
	
	/**
	 * 展示销售品营销资源
	 */
	Me.showProdOfferResRela = function(){
		var resRelaList = prodOfferInfoVO.ResRelaList;
		Me.showResRela(prodOfferInfoVO,resRelaList,"prodOfferResRelaDIV","prodOfferResRelaMoreHref","prodOfferResRela","prodOfferResRelaMore");
	};
	
	/**
	 * 展示营销资源，公用方法
	 */
	Me.showResRela = function(infoVO,resRelaList,showResRelaDiv,moreResRelaHref,firstDiv,secondDiv){
		if(!resRelaList){
			return;
		}
		var resRelaListLength = resRelaList.length;
		Me.showDiv(showResRelaDiv);
		if(resRelaListLength>6){
			Me.showDiv(moreResRelaHref);
			var firstHalfList = [];
			var secondHalfList = [];
			var firstHalfIndex = 0;
			var secondHalfIndex = 0;
			for(var p in resRelaList){
				if(!isNaN(p)){
					if(p<=6){
						firstHalfList[firstHalfIndex] = resRelaList[p];
						firstHalfIndex++;
					}else{
						secondHalfList[secondHalfIndex] = resRelaList[p];
						secondHalfIndex++;
					}
				}
			}
			//创建默认展示的销售品营销资源卡片
			Me.createResRelaCard(infoVO,firstHalfList,Me.$(firstDiv)).init();
			//创建默认隐藏的销售品营销资源卡片
			Me.createResRelaCard(infoVO,secondHalfList,Me.$(secondDiv)).init();
		}else{
			Me.createResRelaCard(infoVO,resRelaList,Me.$(firstDiv)).init();
		}
	};
	
	/**
	 * 展示产品的资源信息
	 */
	Me.showProdcutResRela = function(){
		var offerProdRelaList = prodOfferInfoVO.offerProdRelaList;//销售品关联产品集合
		for(var p in offerProdRelaList){
			var offerProdRela = offerProdRelaList[p];
			if(offerProdRela && offerProdRela.productInfoVO && offerProdRela.productInfoVO.resRelaList &&
					offerProdRela.productInfoVO.resRelaList.length>0){
				if(!isNaN(p)){
					var productName = offerProdRela.productInfoVO.productName;
					var productId = offerProdRela.productInfoVO.productId;
					var productInfoVO = offerProdRela.productInfoVO;
					if(p == 0){
						Me.showResRela(productInfoVO,productInfoVO.resRelaList,"productResRelaDIV","productResRelaMoreHref","productResRela","productResRelaMore");
					}else{
						var table1 = Me.createTable(null,null,"productResRela"+productId);
						var div = document.createElement("DIV");
						div.align = "right";
						var alink = document.createElement("A");
						alink.href = "#";
						alink.id = "productResRelaMoreHref"+productId;
						alink.setAttribute("currentState","show");
						alink.style.display = "none";
						alink.innerText = "更多>>";
						div.appendChild(alink);
						var table2 = Me.createTable("productResRelaMore_table"+productId,"none","productResRelaMore"+productId);
						Me.$("showAttr").appendChild(table1);
						Me.$("showAttr").appendChild(div);
						Me.$("showAttr").appendChild(table2);
						Me.showResRela(productInfoVO,productInfoVO.resRelaList,"productResRelaDIV","productResRelaMoreHref"+productId,"productResRela"+productId
							,"productResRelaMore"+productId);
						alink.onclick = (function(hrefId,tableId,id){
							return function(){
								Me.attrMoreHrefOnclick(hrefId,tableId,id);
							}
						})("productResRelaMoreHref","productResRelaMore_table",productId);
					}
				}
			}
		}
	};
	
	/**
	 * 创建卡片生成对象
	 */
	Me.createAttrCardBuilder = function(attrList,container,attrName){
		var attrCardBuilder  = new AttrCardBuilder({
					"prodOfferInfoVO" : null,
					"attrListJson" : BusCard.toJson(attrList),
					"attrList" : attrList,
					"container" : container,
					"attrName":attrName,
					"attrInstList" : null,//Me.prodInstAttrList,
					"style" : {
						"itemStyle" : "attrItemStyle",
						"labelStyle" : "attrLabelStyle",
						"inputStyle" : "attrInputStyle"
					},
					"protocolAttrList" : null,
					"upSpeedArgs" : null
				});
		return attrCardBuilder;
	};
	
	/**
	 * 生成营销资源卡片
	 */
	Me.createResRelaCard = function(infoVO,resRelaList,container){
		var prodOfferResRelaBuilder  = new ResRelaBuilder({
			"prodOfferInfoVO" : infoVO,
			"resRelaList" : resRelaList,
			"productInfoVO" : "",
			"resRelaKind" : resRelaConst.PROD_OFFER_RES_RELA,
			"resRelaInstList" : null,
			"hasResRelaItemList" : null,
			"container" : container
		});
		return prodOfferResRelaBuilder;
	};
	
	/**
	 * 创建表格方法
	 */
	Me.createTable = function(id,style,divId){
		var _table = document.createElement("TABLE");
		_table.setAttribute("width","100%");
		_table.setAttribute("border","0");
		_table.setAttribute("cellspacing","0");
		_table.setAttribute("cellpadding","0");
		if(id && style){
			_table.setAttribute("id",id);
			_table.setAttribute("name",id);
			_table.style.display = style;
		}
		var _tr=_table.insertRow(_table.rows.length);
		var _td=_tr.insertCell(_tr.cells.length);
		_td.className = "table_left";
		var div = document.createElement("DIV");
		div.id = divId;
		_td.appendChild(div);
		return _table;
	};
	
	/**
	 * 展示div
	 */
	Me.showDiv = function(divId){
		Me.$(divId).style.display = "";
	};
	
	/**
	 * 隐藏div
	 */
	Me.hideDiv = function(divId){
		Me.$(divId).style.display = "none";
	};
	
	/**
	 * 事件初始化
	 */
	Me.initEvent = function(){
		//展示更多产品属性
		Me.$("productAttrMoreHref").onclick = function(){
			Me.attrMoreHrefOnclick("productAttrMoreHref","productAttrMore_table",null);
		};
		//展示更多产品营销资源
		Me.$("productResRelaMoreHref").onclick = function(){
			Me.attrMoreHrefOnclick("productResRelaMoreHref","productResRelaMore_table",null);
		};
		//展示更多销售品属性
		Me.$("prodOfferAttrMoreHref").onclick = function(){
			Me.attrMoreHrefOnclick("prodOfferAttrMoreHref","prodOfferAttrMore_table",null);
		};
		//展示更多销售品营销资源
		Me.$("prodOfferResRelaMoreHref").onclick = function(){
			Me.attrMoreHrefOnclick("prodOfferResRelaMoreHref","prodOfferResRelaMore_table",null);
		};
		
	};
	
	/**
	 * 更多链接点击处理事件
	 */
	Me.attrMoreHrefOnclick = function(hrefId,tableId,id){
		if(Me.$(hrefId+id).currentState == "show"){
			Me.$(hrefId+id).currentState="hidden";
			Me.$(hrefId+id).innerText = "隐藏<<";
			Me.$(tableId+id).style.display = "";
		}else{
			Me.$(hrefId+id).currentState="show";
			Me.$(hrefId+id).innerText = "更多>>";
			Me.$(tableId+id).style.display = "none";
		}
	};
}