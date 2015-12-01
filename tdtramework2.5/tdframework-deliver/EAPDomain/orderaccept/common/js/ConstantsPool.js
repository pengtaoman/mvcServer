window.ConstantsPool = function() {
	var constantsTypeList = [],
		_constantsPool = {},
		load = function() {
			var protoSlice = Array.prototype.slice,
				args = protoSlice.apply(arguments),
				_typeList = [];
			if (arguments.length == 0) {
				alert("you must input the constant type you want to load");
				return;
			}
			BusCard.each(args,function(item){
				_typeList = _typeList.concat(item);
			
			});
			
			var needLoadList = BusCard.findAll(_typeList, function(value) {
				        if (BusCard.exist(constantsTypeList, function(exsitType) {
					                return exsitType == value
				                })) {
					        return false;
				        } else {
					        return true;
					        
				        }
				        
			        });
			constantsTypeList = constantsTypeList.concat(needLoadList);
			var remoteStub = BusCard
			        .$load("com.neusoft.crm.ordermgr.common.util.consts.ConstantsPool"),
				result;
			if(needLoadList.length!=0){
				result = remoteStub["export"](needLoadList);;
			}
			for (var index in result) {
				if (result.hasOwnProperty(index)) {
					this[index] = result[index];
				}
			}
			return this;
		};
	_constantsPool.load = load;
	return _constantsPool;
	
}();

if (typeof dojo != 'undefined' && dojo.global.defineModule) {
	
	defineModule("orderaccept.common.js.ConstantsPool", [], function() {
		        
		        orderaccept.common.js.ConstantsPool = window.ConstantsPool;
		        
	        });
	
}
