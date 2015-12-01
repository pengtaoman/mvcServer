BusCard.define('/buscardapp/rela/js/ChangeServiceHandler.js',function(_buscard,cardParam){ 
try {
	var card = this;
	var param = arguments[1];
	card.ChangeServiceHandler = (function() {
		var productServiceKindMap = {};
		var loadDataByServiceKind = function(serviceKind) {
			if (!productServiceKindMap[serviceKind]) {
				var resultList = BusCard.$remote("productToServiceDAO").query({
							serviceKind : parseInt(serviceKind.toString())
						});
				productServiceKindMap[serviceKind] = resultList;
			}
			return productServiceKindMap[serviceKind];
		};
		var loadDataByProductId = function(productId) {

			var resultList = BusCard.$remote("productToServiceDAO").query({
						productId : parseInt(productId.toString())
					});
			return resultList;

		};
		var renderProdListByServiceKind = function(serviceKind, dom) {
			var list = loadDataByServiceKind(serviceKind);
			BusCard.$rs(dom, BusCard.map(list, function(item) {
								return {
									name : item.productName,
									id : item.productId
								};
							}));

		};
		var getRelaServiceKind = function(serviceKind) {
			var _map = this.serviceKindRelaMap;
			for (var index in _map) {
				if (_map.hasOwnProperty(index)) {
					var value = _map[index];
					if (index == serviceKind)
						return value;
					else if (value == serviceKind) return index;
				}
			}
		};
		return {
			serviceKindRelaMap : {
				"11" : "55"
			},
			changeMap:{
				"11":{
					checkboxValue:'\u662f\u5426\u6539\u4e3aLAN\u4e1a\u52a1',
					selectValue:'LAN\u4ea7\u54c1'
				},
				"55":{
					checkboxValue:'\u662f\u5426\u6539\u4e3aADSL\u4e1a\u52a1',
					selectValue:'ADSL\u4ea7\u54c1'
				}
			},
			getRelaServiceKind : getRelaServiceKind,
			loadDataByServiceKind : loadDataByServiceKind,
			loadDataByProductId : loadDataByProductId,
			renderProdListByServiceKind : renderProdListByServiceKind

		};

	})();
	var changedProductIdElem = card.$("changedProductId");
	if (changedProductIdElem) {
		var vo = card.ChangeServiceHandler.loadDataByProductId(param.productId)[0];
		var changedServiceKind = card.ChangeServiceHandler.getRelaServiceKind(vo.serviceKind);
		if (changedServiceKind) {
			card.ChangeServiceHandler.renderProdListByServiceKind(changedServiceKind, changedProductIdElem);
		}
		//add-by-liurong-beg
		card.$('label_changedProductId').firstChild.innerHTML =  card.ChangeServiceHandler.changeMap[vo.serviceKind].selectValue;
		card.$('label_ifChangeService').firstChild.innerHTML = card.ChangeServiceHandler.changeMap[vo.serviceKind].checkboxValue;
		//add-by-liurong-end
		
		card.addPreDataBuilderAspect(function() {
					if (card.$('ifChangeService').checked) {
						var newProductId = parseInt(changedProductIdElem.value);
						var serviceRelationVO = card.getCardRelationInfo().serviceRelation;
						var oldProductId = parseInt(serviceRelationVO.productId.toString());
						var prodOfferId = BusCard.$remote("prodInstCommFacadeBO").queryQfferInstByProdRel(serviceRelationVO.userId)[0].prodOfferId;
						var checkFlagStr = BusCard.$remote("innerInterfaceBO").doCheckProdOfferChangeProd({
									prodOfferId : prodOfferId,
									cancelProdID : oldProductId,
									changePordID : newProductId
								});
						var checkFlag = BusCard.parse(checkFlagStr);
						var tp = BusCard.Template.create("\u6b64\u9500\u552e\u54c1\u4e0b\u4ea7\u54c1\u4e0d\u5141\u8bb8\u6362\u5230\u4ea7\u54c1[#{productName}]");
						if (checkFlag === false) {
							alert(tp.apply({productName:changedProductIdElem.options[0].text}));
							return false;
						}
					}
					return true;
				});

	}

}
catch (e) {

	alert(e.message)

}
});
