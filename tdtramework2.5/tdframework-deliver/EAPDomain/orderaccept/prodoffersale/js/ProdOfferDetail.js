window.onload = function(){
	new ProdOfferDetail().init();
}

var ProdOfferDetail = function(args){
	var Me = this;
	var prodOfferId = "30095";//���ԣ���д��
//	var prodOfferId = args.prodOfferId;
	var prodOfferInfoVO = null;
	//var prodOfferResRelaBuilder = null;//����ƷӪ����Դ
	var prodOfferInfo = null;
	
	Me.$ = function(id){
		return document.getElementById(id);
	}
	
	/**
	 * ��ʼ������
	 */
	Me.init = function(){
		prodOfferInfo = executeRequest("orderDetailAction","getProdOfferDetail","prodOfferId="+prodOfferId);
		prodOfferInfoVO = Ext.decode(prodOfferInfo);
		if(!(prodOfferInfoVO && prodOfferInfoVO.prodOfferId)){
			alert("����Ʒ��Ϣ������!");
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
	 * չʾ����Ʒ������Ϣ
	 */
	Me.showProdOfferDesc = function(){
		var prodOfferDesc = prodOfferInfoVO.prodOfferDesc;
		if(prodOfferDesc && prodOfferDesc != ""){
			Me.showDiv("prodOfferDescDIV");
		}
		Me.$("prodOfferDesc").innerHTML = prodOfferDesc;
	};
	
	/**
	 * չʾ����Ʒ����
	 */
	Me.showProdOfferAttr = function(){
		var ProdOfferAttrList = prodOfferInfoVO.attrList;//����Ʒ���Լ���
		Me.showAttr("����Ʒ","����",ProdOfferAttrList,"prodOfferAttrDIV","prodOfferAttrMoreHref","prodOfferAttr","prodOfferAttrMore");
	}
	
	/**
	 * չʾ��Ʒ����
	 */
	Me.showProductAttr = function(){
		var offerProdRelaList = prodOfferInfoVO.offerProdRelaList;//����Ʒ������Ʒ����
		for(var p in offerProdRelaList){
			var offerProdRela = offerProdRelaList[p];
			if(offerProdRela && offerProdRela.productInfoVO && offerProdRela.productInfoVO.attrList && 
						offerProdRela.productInfoVO.attrList.length>0){
				if(!isNaN(p)){
					var productName = offerProdRela.productInfoVO.productName;
					var productId = offerProdRela.productInfoVO.productId;
					var productAttrList = offerProdRela.productInfoVO.attrList;
					if(p == 0){
						Me.showAttr(productName,"����",productAttrList,"productAttrDIV","productAttrMoreHref","productAttr","productAttrMore");
					}else{
						var table1 = Me.createTable(null,null,"productAttr"+productId);
						var div = document.createElement("DIV");
						div.align = "right";
						var alink = document.createElement("A");
						alink.href = "#";
						alink.id = "productAttrMoreHref"+productId;
						alink.setAttribute("currentState","show");
						alink.style.display = "none";
						alink.innerText = "����>>";
						div.appendChild(alink);
						var table2 = Me.createTable("productAttrMore_table"+productId,"none","productAttrMore"+productId);
						Me.$("showAttr").appendChild(table1);
						Me.$("showAttr").appendChild(div);
						Me.$("showAttr").appendChild(table2);
						Me.showAttr(productName,"����",productAttrList,"productAttrDIV","productAttrMoreHref"+productId,"productAttr"+productId,"productAttrMore"+productId);
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
	 * չʾ����,��������
	 */
	Me.showAttr = function(attrOwner,attrKind,attrList,showAttrDiv,attrMoreHref,showDiv,showMoreDiv){
		if(!attrList){
			return;
		}
		var requiredAttrList = [];//�������Լ���
		var generalAttrList = [];//�Ǳ������Լ���
		var requiredIndex = 0;
		var generalIndex = 0;
		Me.showDiv(showAttrDiv);
		if(attrList.length>6){
			Me.showDiv(attrMoreHref);
			for(var p in attrList){
				var attrVO = attrList[p];
				if(attrVO.nullable == false || attrVO.nullable == "false"){//������
					requiredAttrList[requiredIndex] = attrVO;
					requiredIndex++;
				}else if(attrVO.nullable == true || attrVO.nullable == "true"){//�Ǳ�����
					generalAttrList[generalIndex] = attrVO;
					generalIndex++;
				}
			}
			//����������չʾ
			Me.createAttrCardBuilder(requiredAttrList,Me.$(showDiv),attrOwner+"����"+attrKind+"��Ϣ").init();
			//�����Ǳ�����չʾ
			Me.createAttrCardBuilder(generalAttrList,Me.$(showMoreDiv),attrOwner+"��չ"+attrKind+"��Ϣ").init();
		}else{
			Me.createAttrCardBuilder(attrList,Me.$(showDiv),attrOwner+attrKind+"��Ϣ").init();
		}
	};
	
	/**
	 * չʾ����ƷӪ����Դ
	 */
	Me.showProdOfferResRela = function(){
		var resRelaList = prodOfferInfoVO.ResRelaList;
		Me.showResRela(prodOfferInfoVO,resRelaList,"prodOfferResRelaDIV","prodOfferResRelaMoreHref","prodOfferResRela","prodOfferResRelaMore");
	};
	
	/**
	 * չʾӪ����Դ�����÷���
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
			//����Ĭ��չʾ������ƷӪ����Դ��Ƭ
			Me.createResRelaCard(infoVO,firstHalfList,Me.$(firstDiv)).init();
			//����Ĭ�����ص�����ƷӪ����Դ��Ƭ
			Me.createResRelaCard(infoVO,secondHalfList,Me.$(secondDiv)).init();
		}else{
			Me.createResRelaCard(infoVO,resRelaList,Me.$(firstDiv)).init();
		}
	};
	
	/**
	 * չʾ��Ʒ����Դ��Ϣ
	 */
	Me.showProdcutResRela = function(){
		var offerProdRelaList = prodOfferInfoVO.offerProdRelaList;//����Ʒ������Ʒ����
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
						alink.innerText = "����>>";
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
	 * ������Ƭ���ɶ���
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
	 * ����Ӫ����Դ��Ƭ
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
	 * ������񷽷�
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
	 * չʾdiv
	 */
	Me.showDiv = function(divId){
		Me.$(divId).style.display = "";
	};
	
	/**
	 * ����div
	 */
	Me.hideDiv = function(divId){
		Me.$(divId).style.display = "none";
	};
	
	/**
	 * �¼���ʼ��
	 */
	Me.initEvent = function(){
		//չʾ�����Ʒ����
		Me.$("productAttrMoreHref").onclick = function(){
			Me.attrMoreHrefOnclick("productAttrMoreHref","productAttrMore_table",null);
		};
		//չʾ�����ƷӪ����Դ
		Me.$("productResRelaMoreHref").onclick = function(){
			Me.attrMoreHrefOnclick("productResRelaMoreHref","productResRelaMore_table",null);
		};
		//չʾ��������Ʒ����
		Me.$("prodOfferAttrMoreHref").onclick = function(){
			Me.attrMoreHrefOnclick("prodOfferAttrMoreHref","prodOfferAttrMore_table",null);
		};
		//չʾ��������ƷӪ����Դ
		Me.$("prodOfferResRelaMoreHref").onclick = function(){
			Me.attrMoreHrefOnclick("prodOfferResRelaMoreHref","prodOfferResRelaMore_table",null);
		};
		
	};
	
	/**
	 * �������ӵ�������¼�
	 */
	Me.attrMoreHrefOnclick = function(hrefId,tableId,id){
		if(Me.$(hrefId+id).currentState == "show"){
			Me.$(hrefId+id).currentState="hidden";
			Me.$(hrefId+id).innerText = "����<<";
			Me.$(tableId+id).style.display = "";
		}else{
			Me.$(hrefId+id).currentState="show";
			Me.$(hrefId+id).innerText = "����>>";
			Me.$(tableId+id).style.display = "none";
		}
	};
}