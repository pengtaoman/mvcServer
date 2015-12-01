BusCard.define('/buscardapp/rela/js/getFusionNums.js',function(_buscard,cardParam){ 
var Me = this;
var a = arguments[0];
var b = arguments[1];
var servingStatus ;

if(b.serviceRelation){
   	servingStatus = b.serviceRelation.servingStatus;
   	
   	}else{
   	servingStatus=b.prodInst.stateCd;	
   		
   	}
var ConstantsPool = dojo.require("orderaccept.common.js.ConstantsPool");
 var servingStatusConst = ConstantsPool.load("ServingStatusConst").ServingStatusConst;
 var productTypeConst= ConstantsPool.load("ProductTypeConst").ProductTypeConst;
var GetFusionNums = function(){	
}
GetFusionNums.prototype = {
	getInnerHtml : function(){	
		var tpParam = {};
		var data = BusCard.$remote("prodInstCommFacadeBO").getCombMemberProdInstList(b.userId);	
		if (data && data.length != 0) {
			var _fusionNumsList = [];
			BusCard.util.each(data, function(item) {
				if(item.prodTypeCd!=productTypeConst.COMPOSE){
					_fusionNumsList.push({
						userId : item.prodInstId,
						productId:item.productId,
						serviceId : item.accNbr
					});
			   }
			});
			tpParam.fusionNumsList = _fusionNumsList;
		};
		
		var tp = "<div >\
	              <tp:for ds='fusionNumsList'>\
	                <input type='checkbox' id='#{userId}' value='#{userId}' productId='#{productId}' serviceId='#{serviceId}'/>\
	               <span>#{serviceId}</span>\
	             </tp:for>\
	            </div>";
	     var innerStr = BusCard.Template.create(tp).apply(tpParam);     
	     return innerStr;
	},

	initCheckBox : function(flag){
		var checkboxList = document.getElementsByTagName("input");
		BusCard.util.each(checkboxList, function(dom) {
			if (dom.type && dom.type.toUpperCase() == 'CHECKBOX') {
				if(flag){
					dom.checked = true;	
					dom.disabled = true;
				}else{
					if(dom.value == b.userId){
						dom.checked = true;	
						dom.disabled = true;	
					}else{
				       var serviceRelaVO=BusCard.$remote("prodInstCommFacadeBO").getServiceRelationByUserId(dom.value);
					  
				
					   if(serviceRelaVO&&serviceRelaVO.servingStatus==servingStatus){
					       dom.checked = true;	
					       dom.disabled = false;
					   }else{
					    var prodInstVO=BusCard.$remote("prodInstCommFacadeBO").getProdInst(dom.value);
                             if(prodInstVO&&prodInstVO.statusCd==servingStatus){
					            		dom.checked = true;	
					            		dom.disabled = false;
					            }else{
						       			dom.checked = false;	
						                dom.disabled = false;
						       }
					   
					   
					   } 
					}
				}			
			}
		})
	},
	
	collectData : function(){
		var data = [];
		var checkboxList = document.getElementsByTagName("input");
		BusCard.util.each(checkboxList, function(dom) {
			if (dom.type && dom.type.toUpperCase() == 'CHECKBOX' && dom.checked) {
				var obj = {};
				obj.userId = dom.value;
				obj.productId = dom.productId;
				data.push(obj);
			}
		})
		return data;
	}
};

var getFusionNums = new GetFusionNums();
BusCard.Namespace.create("ordermgr.accept.comp");
ordermgr.accept.comp.getFusionNums = getFusionNums;
});
